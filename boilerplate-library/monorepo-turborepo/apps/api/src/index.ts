import cors from "cors";
import express from "express";
import { APP_NAME, ok } from "@repo/shared";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json(
    ok({
      status: "ok",
      service: APP_NAME,
      timestamp: new Date().toISOString(),
    }),
  );
});

app.get("/api/hello", (_req, res) => {
  res.json(
    ok({
      message: `Hello from ${APP_NAME} API`,
    }),
  );
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
