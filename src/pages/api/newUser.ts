import { TRPCError } from '@trpc/server'
import { getHTTPStatusCodeFromError } from '@trpc/server/http'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { z } from 'zod'
import { appRouter } from '~/server/api/root'
import { createTRPCContext } from '~/server/api/trpc'

export const requestSchema = z.object({
  data: z.object({
    client_id: z.string().min(7),
    created_at: z.number(),
  }),
})

const newUserHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = createTRPCContext({ req, res })
  const caller = appRouter.createCaller(ctx)
  try {
    if (!req.body) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }
    const requestBody = requestSchema.parse(req.body)
    console.log(requestBody)
    void caller.profile.createProfile(requestBody)
    res.status(200) //.json(user)
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause)
      return res.status(httpCode).json(cause)
    }
    // Another error occured
    console.error(cause)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default newUserHandler
