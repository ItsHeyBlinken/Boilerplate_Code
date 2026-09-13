import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">PERN Starter</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        PostgreSQL + Express + React + Node starter with Prisma, JWT auth, and post CRUD.
      </p>
      <div className="mt-6 flex gap-3">
        <Link className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white" to="/posts">
          Browse Posts
        </Link>
        <Link className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium" to="/login">
          Login
        </Link>
      </div>
    </section>
  )
}
