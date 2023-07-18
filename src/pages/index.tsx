import { SignInButton, useUser } from '@clerk/nextjs'
import Head from 'next/head'
import Link from 'next/link'
import { api } from '~/utils/api'

export default function Home() {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' })
  const { isSignedIn } = useUser()

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col gap-y-4 items-center bg-gradient-to-b from-[#461985] to-[#014128]">
        <div className="container flex flex-row items-center justify-between gap-12 px-4 py-4 ">
          <h1 className="text-4xl font-bold text-white sm:text-6xl">Till 🥕</h1>
          <div>{!isSignedIn && <SignInButton />}</div>
        </div>
        <div className='rounded-lg bg-gray-900 mx-16 p-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus recusandae maiores deleniti, commodi praesentium neque obcaecati iure quos excepturi, odio odit distinctio error molestiae illum inventore esse nulla aut laboriosam?</div>
      </main>
    </>
  )
}
