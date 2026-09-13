import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Shop Starter</h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        Lean ecommerce boilerplate with PostgreSQL, Prisma, products, cart, and orders.
      </p>
      <Link className="mt-6 inline-block rounded bg-amber-700 px-4 py-2 text-sm text-white" to="/products">
        Browse products
      </Link>
    </section>
  )
}
