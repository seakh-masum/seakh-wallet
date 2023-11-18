import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Retrieve the item from local storage if it exists, otherwise use the initial value
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  // State to hold the current value
  const [value, setValue] = useState(storedValue);

  // Update local storage when the state changes
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};

export default useLocalStorage;