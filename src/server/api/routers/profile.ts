import { clerkClient } from '@clerk/nextjs'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { requestSchema } from '~/pages/api/newUser'
import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import { filterUserForClient } from '~/server/helpers/filterUserForclient'

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      })
      if (!user) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'User not found',
        })
      }
      return filterUserForClient(user)
    }),
  getProfileById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.user.findFirst({
        where: { id: input.userId },
      })
    ),
  createProfile: publicProcedure
    .input(requestSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.user.create({
        data: { id: input.data.client_id, carrots: 10 },
      })
      console.log(post)
      return post
    }),
})
