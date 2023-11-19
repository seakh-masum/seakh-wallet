import * as React from "react"


function CloseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={36}
      viewBox="0 96 960 960"
      width={36}
      className="fill-white dark:fill-black"
      {...props}
    >
      <path d="M480 618L270 828q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522 576l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480 618z" />
    </svg>
  )
}

export default CloseIcon
