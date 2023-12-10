import Header from '../components/ui/Header';
import Button from '../components/ui/Button';

const FormLayout = ({ title, children, handleSubmit, isValid, buttonTitle = 'Save', buttonType, hasAnotherButton = false, secondBtnTitle = 'Save', secondBtnValid, secondBtnType, handleSecondBtn }) => {
  return (
    <div className="relative flex flex-col min-h-screen h-full bg-neutral-100 px-3 py-5 dark:bg-neutral-950">
      <Header isAddPage title={title} />
      <div className="flex flex-col pb-20 pt-3 gap-5">{children}</div>
      <div className="fixed z-50 bottom-0 left-0 right-0 p-3 dark:bg-neutral-950">
        <div className='flex flex-row gap-2'>
          <Button onClick={handleSubmit} disabled={isValid} title={buttonTitle} type={buttonType} />
          {hasAnotherButton && <Button onClick={handleSecondBtn} disabled={secondBtnValid} title={secondBtnTitle} type={secondBtnType} />}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
