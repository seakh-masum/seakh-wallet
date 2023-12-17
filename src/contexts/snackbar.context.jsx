import React, { createContext, useContext, useState } from 'react';
import Snackbar from '../components/features/Snackbar';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
    setSnackbarMessage('');
  };

  return (
    <>
      <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
        {children}
        {snackbarVisible && <Snackbar message={snackbarMessage} duration={2000} onClose={hideSnackbar} />}
      </SnackbarContext.Provider>
    </>
  );
};