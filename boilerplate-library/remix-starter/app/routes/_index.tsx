import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppHeader } from "~/components/AppHeader";

export const meta: MetaFunction = () => [
  { title: "Remix Starter" },
  {
    name: "description",
    content: "Lean Remix starter with TypeScript, Tailwind, and Prisma",
  },
];

export default function Index() {
  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Remix Starter</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Full-stack React with loaders, actions, and progressive enhancement.
          Use this as a base for SEO-friendly apps that talk to Postgres via Prisma.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            to="/posts"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View Posts
          </Link>
          <Link
            to="/about"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            About
          </Link>
        </div>
      </main>
    </div>
  );
}
