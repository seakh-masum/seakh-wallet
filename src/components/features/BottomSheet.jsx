import React from 'react';
import { CloseIcon } from '../icon';


const BottomSheet = ({ modalVisible, closeModal, children }) => {
  return (
    <div className='relative z-50'>
      {modalVisible &&
        <div className="fixed inset-0 flex justify-end bg-transparent supports-backdrop-blur:bg-white/60 backdrop-blur dark:bg-black/80">
          <div className="flex flex-1 flex-col bg-transparent rounded-2xl justify-end">
            <div className="flex flex-row items-center justify-center p-4">
              <button className="flex justify-center items-center w-10 h-10 rounded-3xl bg-black dark:bg-white" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            <div className="p-2">{children}</div>
          </div>
        </div>
      }
    </div>
  );
};

export default BottomSheet;
