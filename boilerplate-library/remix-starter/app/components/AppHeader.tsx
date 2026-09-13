import { Link } from "@remix-run/react";

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-indigo-700">
          Remix Starter
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link to="/posts" className="hover:text-slate-900">
            Posts
          </Link>
          <Link to="/about" className="hover:text-slate-900">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
