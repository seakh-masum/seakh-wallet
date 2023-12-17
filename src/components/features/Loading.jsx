import React from 'react'
import { LoadingIcon } from '../icon'

const Loading = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-neutral-950'>
      <LoadingIcon />
    </div>
  )
}

export default Loading