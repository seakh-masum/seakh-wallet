import React from 'react';
import Button from '../ui/Button';
import Header from '../ui/Header';

const FormWrapper = ({ title, children, handleSubmit }) => {
  return (
    <div className="relative flex flex-col h-screen bg-neutral-100 px-3 py-5 dark:bg-neutral-950">
      <Header isAddPage title={title} />
      <div className="flex-col py-5">{children}</div>
      <div className="fixed z-50 bottom-3 left-0 right-0 p-3 dark:bg-neutral-950">
        <Button onClick={handleSubmit} title={'Save'} type='submit' />
      </div>
    </div>
  );
};

export default FormWrapper;
