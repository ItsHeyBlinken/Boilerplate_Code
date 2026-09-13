import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AppHeader } from "~/components/AppHeader";
import { db } from "~/utils/db.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data?.post ? `${data.post.title} | Remix Starter` : "Post" },
];

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const post = await db.post.findUnique({ where: { slug } });
    if (!post) {
      throw new Response("Not Found", { status: 404 });
    }
    return json({ post });
  } catch (error) {
    if (error instanceof Response) throw error;
    if (slug === "demo") {
      return json({
        post: {
          id: "demo-1",
          title: "Connect Postgres to load real posts",
          slug: "demo",
          content:
            "This demo post appears when Prisma cannot reach the database. Once DATABASE_URL is set and migrations are applied, real posts will load here.",
          createdAt: new Date().toISOString(),
        },
      });
    }
    throw new Response("Not Found", { status: 404 });
  }
}

export default function PostDetail() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <Link to="/posts" className="text-sm font-medium text-indigo-700">
          ← Back to posts
        </Link>
        <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
        <p className="mt-6 whitespace-pre-wrap text-slate-700">{post.content}</p>
      </main>
    </div>
  );
}
