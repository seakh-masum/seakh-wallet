import React from 'react'

const SkeletonLine = ({ className, height = 'xs', width }) => {
  const heightClass = height == 'xs' ? 'h-3' : 'h-5'
  return (
    <div style={{ width: `${width}%` }} className={`${heightClass} bg-neutral-200 dark:bg-neutral-700 rounded-lg ${className}`}></div>
  )
}

export default SkeletonLine