import { initTRPC, TRPCError } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { getSessionFromCookieHeader, type SessionUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function createTRPCContext(opts: FetchCreateContextFnOptions) {
  const session = await getSessionFromCookieHeader(opts.req.headers.get('cookie'))
  return {
    prisma,
    session,
    resHeaders: opts.resHeaders,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session as SessionUser,
    },
  })
})
