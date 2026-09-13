import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { protectedProcedure, router } from '../trpc'

export const postsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: { authorId: ctx.session.id },
      orderBy: { createdAt: 'desc' },
    })
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: ctx.session.id,
        },
      })
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({ where: { id: input.id } })
      if (!post || post.authorId !== ctx.session.id) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      return ctx.prisma.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
        },
      })
    }),

  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({ where: { id: input.id } })
    if (!post || post.authorId !== ctx.session.id) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }
    await ctx.prisma.post.delete({ where: { id: input.id } })
    return { success: true }
  }),
})
