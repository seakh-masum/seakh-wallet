import React from 'react'

const TextGroup = ({ title, value }) => {
  return (
    <div>
      <p className="text-neutral-600 text-xss">{title}</p>
      <b className="text-slate-950">{value}</b>
    </div>
  )
}

export default TextGroup