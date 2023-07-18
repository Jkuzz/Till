import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"

export const PageHeader = () => {
  const { isSignedIn } = useUser()

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <h1 className="cursor-default select-none text-4xl font-bold text-white sm:text-6xl">
        Till 🥕
      </h1>
      <div>{!isSignedIn ? <SignInButton /> : <SignOutButton />}</div>
    </div>
  )
}
