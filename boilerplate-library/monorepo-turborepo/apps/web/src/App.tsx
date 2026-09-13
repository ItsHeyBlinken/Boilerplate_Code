import { useEffect, useState } from "react";
import { APP_NAME, type ApiSuccess } from "@repo/shared";

type HelloData = { message: string };

export function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((payload: ApiSuccess<HelloData>) => {
        if (payload.success) {
          setMessage(payload.data.message);
        } else {
          setMessage("API returned an error");
        }
      })
      .catch(() => {
        setMessage("Start the API with npm run dev from the monorepo root");
      });
  }, []);

  return (
    <main className="page">
      <h1>{APP_NAME}</h1>
      <p>Vite React web app sharing types/utils with the Express API.</p>
      <div className="card">
        <strong>API says:</strong>
        <p>{message}</p>
      </div>
    </main>
  );
}
