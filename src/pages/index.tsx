import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { PageLayout } from '~/components/layout'
import { LoadingSpinner } from '~/components/loading'
import { PostFeed } from '~/components/postFeed'
import { api } from '~/utils/api'

const CreatePostWizard = () => {
  const { user } = useUser()
  const [input, setInput] = useState('')
  const ctx = api.useContext()
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput('')
      void ctx.posts.getAll.invalidate()
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error('Failed to post, please try again later')
      }
    },
  })

  if (!user) return null
  return (
    <div className="flex w-full gap-3 rounded-lg bg-gray-900 p-4 mb-4">
      <Link href={'/' + (user.username || '')}>
        <Image
          className="h-14 w-14 rounded-full"
          src={user.profileImageUrl}
          alt="Profile image"
          width={56}
          height={56}
        />
      </Link>
      <input
        placeholder="What's on your mind?"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (input !== '') {
              mutate({ content: input })
            }
          }
        }}
        disabled={isPosting}
      ></input>
      {input !== '' && !isPosting && (
        <button disabled={isPosting} onClick={() => mutate({ content: input })}>
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const { isSignedIn } = useUser()

  return (
    <PageLayout>
      {isSignedIn && <CreatePostWizard />}
      <PostFeed />
    </PageLayout>
  )
}
