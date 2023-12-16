import React from 'react';

const Button = (props) => {
  const { onClick, title, type, ...otherProps } = props;
  const buttonColor =
    type == "success"
      ? "bg-gradient-to-b from-green-600 to-green-500 outline-green-400"
      : type == "error" ? "bg-gradient-to-b from-red-600 to-red-500 outline-red-400" : "bg-black dark:bg-white"

  return (
    <button className={`${buttonColor}  p-4 rounded-2xl justify-center items-center  w-full shadow-xl`} onClick={onClick} aria-label={title} {...otherProps}>
      <p className="text-white text-xl dark:text-black">{title}</p>
    </button>
  );
};

export default Button;
