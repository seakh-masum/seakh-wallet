/* eslint-disable prettier/prettier */

import React from 'react';
import { Fonts } from '../../styles/typography';

const Button = ({ onClick, title }) => {

  return (
    <button className="bg-black p-5 rounded-3xl justify-center items-center dark:bg-white w-full" onClick={onClick}>
      <p 
      // style={{ fontFamily: Fonts.montserratSemiBold }} 
      className="text-white text-xl dark:text-black">{title}</p>
    </button>
  );
};

export default Button;
