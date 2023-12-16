import React from 'react'
import SkeletonLine from './SkeletonLine'

const BoxCard = ({ item, isLoading, handleClick }) => {
  return (
    <div
      style={{ backgroundColor: item?.color }}
      className={`bg-white shadow-sm p-4 rounded-xl ${isLoading && 'animate-pulse bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 h-28'}`}
      onClick={handleClick}
    >
      {isLoading ?
        <>
          <SkeletonLine width={30} className={'mb-7'} />
          <SkeletonLine width={75} height='xl' />
        </> :
        <>
          <p className="mb-5 text-slate-900">{item?.name}</p>
          <b className="text-3xl text-slate-950">{item?.balance}</b>
        </>
      }
    </div>
  )
}

export default BoxCard