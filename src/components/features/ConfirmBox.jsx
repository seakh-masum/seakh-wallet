import React from 'react'
import ErrorIcon from '../icon/ErrorIcon';

const ConfirmBox = ({ title, onYes }) => {
  return (
    <div className='backdrop-blur shadow-2xl dark:bg-neutral-950 bg-white supports-backdrop-blur:bg-white/60 rounded-xl p-3'>
      <div className="flex flex-col justify-center items-center max-w-[250px] mx-auto py-5">
        <ErrorIcon height={60} width={60} />
        <p className="py-5 text-lg text-center dark:text-neutral-300">
          Are you sure want to delete the {title}?
        </p>
      </div>
      <button
        onClick={onYes}
        className=" w-full h-14 text-xl bg-red-500 dark:bg-red-400 text-white rounded-xl "
      >
        Delete {title}
      </button>
    </div>
  )
}

export default ConfirmBox;