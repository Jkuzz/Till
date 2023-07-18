import Head from 'next/head'
import { api } from '~/utils/api'
import type { NextPage, GetStaticProps } from 'next'
import { PageLayout } from '~/components/layout'
import Image from 'next/image'
import { LoadingPage } from '~/components/loading'
import { generateSSGHelper } from '~/server/helpers/ssgHelper'
import { PostView } from '~/components/postView'
import { useUser } from '@clerk/nextjs'

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSGHelper()

  const slug = context.params?.slug
  if (typeof slug !== 'string') throw new Error('No slug')
  const username = slug.replace('@', '')

  await helpers.profile.getUserByUsername.prefetch({ username })

  return {
    props: { trpcState: helpers.dehydrate(), username },
  }
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  })
  if (isLoading) return <LoadingPage />
  if (!data || data.length === 0) return <div>User has not posted</div>
  return (
    <div className="flex flex-col gap-4">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  )
}

const ResourcesDisplay = () => {
  const { user } = useUser()
  const userProfile = api.profile.getProfileById.useQuery({ userId: user?.id || '' })

  return (
    <div className='flex gap-2'>
      <div>🥕{userProfile.data?.carrots}</div>
      <div>🥔{userProfile.data?.potatoes}</div>
    </div>
  )


}

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({ username })
  const { user } = useUser()
  if (!data) return <div>404</div>

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative mb-16 flex h-32 justify-end rounded-lg bg-gray-900">
          <Image
            className="absolute -bottom-10 left-4 rounded-full border-4 border-slate-900 bg-slate-900"
            src={data.profileImageUrl}
            alt={`${data.username ?? ''}'s profile picture`}
            width={128}
            height={128}
          />
          <div className='flex flex-col justify-between items-end p-4'>

          {user?.id && user?.id === data?.id && <ResourcesDisplay />}
          <div className="text-2xl font-bold">{data.username}</div>
          </div>
        </div>
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  )
}
export default ProfilePage
