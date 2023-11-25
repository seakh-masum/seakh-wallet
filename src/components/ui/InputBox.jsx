/* eslint-disable prettier/prettier */
import React, { forwardRef } from 'react';
import Label from './Label';
import { useField } from 'formik';

const InputBox = forwardRef((props, ref) => {
  const {
    name,
    label,
    value,
    onChange,
    placeholder,
    keyboardType,
    hideLabel,
    hasWrapperStyle,
    errors,
    ...restProps
  } = props;

  return (
    <div style={hasWrapperStyle ? { marginBottom: '12px' } : {}}>
      {!hideLabel && <Label>{label}</Label>}
      <input ref={ref} className={`w-full p-3 text-neutral-800 bg-neutral-200 rounded-lg outline-2 outline-neutral-800  dark:bg-neutral-700 dark:text-white focus:shadow-md`}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        {...restProps}
      />
      {errors && <div id="feedback" className='text-red-500 text-xs'>{errors}</div>}
    </div>
  );
});

export default InputBox;
