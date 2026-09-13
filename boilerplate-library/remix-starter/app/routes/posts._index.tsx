import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AppHeader } from "~/components/AppHeader";
import { db } from "~/utils/db.server";

export const meta: MetaFunction = () => [{ title: "Posts | Remix Starter" }];

export async function loader() {
  try {
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return json({ posts, dbAvailable: true as const });
  } catch {
    return json({
      posts: [
        {
          id: "demo-1",
          title: "Connect Postgres to load real posts",
          slug: "demo",
          content: "Set DATABASE_URL and run prisma migrate + seed.",
          createdAt: new Date().toISOString(),
        },
      ],
      dbAvailable: false as const,
    });
  }
}

export default function PostsIndex() {
  const { posts, dbAvailable } = useLoaderData<typeof loader>();

  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold">Posts</h1>
        {!dbAvailable && (
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Database not connected — showing demo data. Copy `.env.example` to
            `.env`, then run `npm run db:migrate` and `npm run db:seed`.
          </p>
        )}
        <ul className="mt-8 space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <Link to={`/posts/${post.slug}`} className="text-xl font-semibold text-indigo-700">
                {post.title}
              </Link>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.content}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
