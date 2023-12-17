import React from 'react';


const Chips = ({ data, setValue, value }) => {
  const onSelect = x => {
    setValue(x);
  };

  return (
    <div>
      {data.map((item, idx) => (
        <button key={idx} onClick={() => onSelect(item.value)}
          className={`px-4 py-1 rounded-2xl border border-neutral-800 mr-3 dark:border-white ${item.value == value ? 'dark:bg-white bg-neutral-800 text-white dark:text-black' : 'bg-transparent text-black dark:text-white'}`}>
          <p>{item.label}</p>
        </button>
      ))}
    </div>
  );
};
export default Chips;
