import { useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { UpArrowFlat } from '../assets/up-arrow-flat'

const MAX_VERTICAL_OFFSET = 130

export const FarmDrawer = () => {
  const [verticalOffset, setVerticalOffset] = useState(MAX_VERTICAL_OFFSET)

  const expandFarmOverlay = () => {
    setVerticalOffset(
      verticalOffset === MAX_VERTICAL_OFFSET ? 0 : MAX_VERTICAL_OFFSET
    )
  }

  return (
    <TransitionGroup>
      <div
        style={{ transform: `translate(0, ${verticalOffset}px)` }}
        className="absolute bottom-0 left-0 flex w-full flex-col items-center gap-4 rounded-t-xl bg-gray-900 p-4 transition-all"
      >
        <button className="absolute -top-12" onClick={expandFarmOverlay}>
          <UpArrowFlat className="w-12 opacity-75" />
        </button>
        <div className="h-24 w-full rounded-lg bg-green-900"></div>
      </div>
    </TransitionGroup>
  )
}
