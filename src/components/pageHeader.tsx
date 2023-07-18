import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

export const PageHeader = () => {
  const { isSignedIn } = useUser()

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Link href="/">
        <h1 className="select-none text-4xl font-bold text-white sm:text-6xl">
          Till🥕
        </h1>
      </Link>
      <div>{!isSignedIn ? <SignInButton /> : <SignOutButton />}</div>
    </div>
  )
}
