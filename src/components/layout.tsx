import type { PropsWithChildren } from 'react'
import { PageHeader } from './pageHeader'
import { FarmDrawer } from './farmDrawer'

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="relative flex h-screen flex-col items-center gap-y-4 overflow-clip bg-gradient-to-b from-indigo-800 to-emerald-500 p-4">
      <PageHeader />
      <div className="flex w-full flex-col gap-y-4 p-4 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
        {props.children}
      </div>
      <FarmDrawer />
    </main>
  )
}
