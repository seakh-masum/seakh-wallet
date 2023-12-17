import React from 'react';
import { CheckCircleIcon } from '../icon';

const ColorBox = ({ data, setValue, value }) => {
  return (
    <div className='overflow-x-scroll'>
      <div className='inline-flex flex-row'>
        {data.map((item, idx) => (
          <div key={idx} onClick={() => setValue(item)} className="block rounded-full h-12 w-12 mr-3" style={{ backgroundColor: item }} >
            {item === value ? <CheckCircleIcon /> : <></>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorBox;