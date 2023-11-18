/* eslint-disable prettier/prettier */
import React, { forwardRef } from 'react';
import Label from './Label';

const InputBox = forwardRef((props, ref) => {
  const colorScheme = 'dark';
  const {
    name,
    label,
    value,
    onChange,
    placeholder,
    keyboardType,
    hideLabel,
    hasWrapperStyle,
    ...restProps
  } = props;
  return (
    <div style={hasWrapperStyle ? {marginBottom: '12px'} : {}}>
      {!hideLabel && <Label>{label}</Label>}
      <input ref={ref} className={`w-full p-3 text-neutral-800 text-sm bg-neutral-200 rounded-lg border-2 dark:bg-neutral-800 dark:text-white`}
        onChange={onChange}
        value={value}
        name={name}
        // placeholder={placeholder}
        // placeholderTextColor={colorScheme == 'dark' ? '#fff' : "#000"}
        // keyboardType={keyboardType || 'default'}
        {...restProps}
      />
    </div>
  );
});

export default InputBox;
