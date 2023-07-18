import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== 'POST') {
  //   res.status(400)
  //   return
  // }

  console.log(req.body)
  res.status(200).json({ status: 'ok' })
}
