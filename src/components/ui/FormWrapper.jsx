import React from 'react';
import Header from '../Header';

const FormWrapper = ({ title, btn, children }) => {
  return (
    <div className="relative flex flex-col h-screen bg-neutral-100 px-3 py-5 dark:bg-neutral-950">
      <Header isAddPage title={title} />
      <div className="flex-col py-5">{children}</div>
      <div className="fixed z-50 bottom-3 left-3 right-3 dark:bg-neutral-950">
        {btn}
      </div>
    </div>
  );
};

export default FormWrapper;
