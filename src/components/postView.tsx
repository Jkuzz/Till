import type { RouterOutputs } from '~/utils/api'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type PostWithUser = RouterOutputs['posts']['getAll'][number]

export const PostView = (props: PostWithUser) => {
  const { post, author } = props
  return (
    <div key={post.id} className="flex gap-3 rounded-lg bg-gray-900 p-4">
      <Link href={`/${author.username}`}>
        <Image
          src={author.profileImageUrl}
          alt={`@${author.username} profile picture`}
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-100">
          <Link href={`/${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>
          <span>·</span>
          <Link href={`/post/${post.id}`}>
            <span className="text-sm font-thin">
              {dayjs(post.createdAt).fromNow()}
            </span>
          </Link>
        </div>
        <span className="text-lg">{post.content}</span>
      </div>
    </div>
  )
}
