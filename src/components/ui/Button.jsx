/* eslint-disable prettier/prettier */

import React from 'react';

const Button = (props) => {

  const { onClick, title } = props;

  return (
    <button className="bg-black p-5 rounded-3xl justify-center items-center dark:bg-white w-full shadow-xl" onClick={onClick} {...props}>
      <p className="text-white text-2xl dark:text-black">{title}</p>
    </button>
  );
};

export default Button;
