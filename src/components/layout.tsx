import type { PropsWithChildren } from 'react'
import { PageHeader } from "./pageHeader"

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-4 bg-gradient-to-b from-[#461985] to-[#014128] p-4">
      <PageHeader />
      <div className="flex flex-col gap-y-4 p-4 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full">
        {props.children}
      </div>
    </main>
  )
}
