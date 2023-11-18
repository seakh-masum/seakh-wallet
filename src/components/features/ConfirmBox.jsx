import React from 'react'

const ConfirmBox = ({title, onYes, onNo}) => {
  return (
    <div className='backdrop-blur shadow-2xl dark:bg-neutral-950 bg-white/95 supports-backdrop-blur:bg-white/60 rounded-t-xl'>
        <p className='text-3xl pl-5 py-8 dark:text-white'>{title}</p>
        <div className='flex flex-row h-14 text-xl rounded-xl'>
            <button onClick={onNo} className='basis-1/2 bg-neutral-700 text-white rounded-es-xl'>No</button>
            <button onClick={onYes} className='basis-1/2 bg-red-400 rounded-ee-xl text-white'>Yes</button>
        </div>
    </div>
  )
}

export default ConfirmBox;