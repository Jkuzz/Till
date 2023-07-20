import { useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { UpArrowFlat } from '../assets/up-arrow-flat'

const MAX_VERTICAL_OFFSET = 200

const FarmTile = () => {
  return <div className="h-16 w-16 rounded-lg bg-yellow-800"></div>
}

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
        className="absolute bottom-0 left-0 flex w-full flex-col items-center gap-4 transition-all"
      >
        <button className="absolute -top-12" onClick={expandFarmOverlay}>
          <UpArrowFlat className="w-12 opacity-75" />
        </button>
        <div className="mx-auto flex w-full max-w-5xl justify-around rounded-t-xl bg-gray-900 p-2 pb-0">
          <div className="p-2">Inventory</div>
          <div className="h-48 w-full max-w-[60%] rounded-t-lg bg-green-600 p-4">
            <div className="mx-auto flex w-full max-w-md flex-row flex-wrap justify-center gap-4">
              {[...Array(10).keys()].map((i) => (
                <FarmTile key={i} />
              ))}
            </div>
          </div>
          <div className="p-2">Seeds</div>
        </div>
      </div>
    </TransitionGroup>
  )
}
