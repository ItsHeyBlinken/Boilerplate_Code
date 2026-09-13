import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { comparePassword, hashPassword } from '@/lib/password'
import { COOKIE, signSession } from '@/lib/auth'
import { publicProcedure, router } from '../trpc'

function setAuthCookie(resHeaders: Headers, token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  resHeaders.append(
    'Set-Cookie',
    `${COOKIE}=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${secure}`,
  )
}

function clearAuthCookie(resHeaders: Headers) {
  resHeaders.append('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`)
}

export const authRouter = router({
  me: publicProcedure.query(({ ctx }) => ctx.session),

  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const email = input.email.toLowerCase()
      const existing = await ctx.prisma.user.findUnique({ where: { email } })
      if (existing) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Email already registered' })
      }

      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email,
          password: await hashPassword(input.password),
        },
      })

      const token = await signSession({ id: user.id, email: user.email, name: user.name })
      setAuthCookie(ctx.resHeaders, token)
      return { id: user.id, email: user.email, name: user.name }
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email.toLowerCase() },
      })
      if (!user || !(await comparePassword(input.password, user.password))) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' })
      }
      const token = await signSession({ id: user.id, email: user.email, name: user.name })
      setAuthCookie(ctx.resHeaders, token)
      return { id: user.id, email: user.email, name: user.name }
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    clearAuthCookie(ctx.resHeaders)
    return { success: true }
  }),
})
