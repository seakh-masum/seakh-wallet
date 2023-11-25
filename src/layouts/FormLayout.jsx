import React from 'react';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';

const FormLayout = ({ title, children, handleSubmit, isValid }) => {
  return (
    <div className="relative flex flex-col min-h-screen h-full bg-neutral-100 px-3 py-5 dark:bg-neutral-950">
      <Header isAddPage title={title} />
      <div className="flex flex-col pb-20 pt-3 gap-5">{children}</div>
      <div className="fixed z-50 bottom-0 left-0 right-0 p-3 dark:bg-neutral-950">
        <Button onClick={handleSubmit} title={'Save'} disabled={isValid} type='submit' />
      </div>
    </div>
  );
};

export default FormLayout;
