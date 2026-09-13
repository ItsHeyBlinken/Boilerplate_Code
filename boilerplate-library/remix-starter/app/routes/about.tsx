import type { MetaFunction } from "@remix-run/node";
import { AppHeader } from "~/components/AppHeader";

export const meta: MetaFunction = () => [{ title: "About | Remix Starter" }];

export default function About() {
  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="mt-4 text-slate-600">
          This boilerplate includes Remix routes, Tailwind styling, and a Prisma
          Post model so you can start with real data loading patterns immediately.
        </p>
      </main>
    </div>
  );
}
