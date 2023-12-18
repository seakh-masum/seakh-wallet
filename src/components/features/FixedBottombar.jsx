import React from 'react'

const FixedBottombar = (props) => {
  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 p-3 dark:bg-neutral-950">
      <div className='flex flex-row gap-2'>
        {props.children}
      </div>
    </div>
  )
}

export default FixedBottombar