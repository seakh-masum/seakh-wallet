import React from 'react';
import { VisibilityOffIcon, VisibilityIcon, DeleteIcon, EditIcon } from '../icon';

const FooterAction = ({ setIsShowCVV, isShowCVV, onEdit, onDelete, hasCvv = false }) => {
  return (
    <div className="relative flex flex-row justify-around p-3 backdrop-blur shadow-2xl dark:bg-neutral-800 bg-white/50 supports-backdrop-blur:bg-white/60 rounded-b-xl z-50">
      {hasCvv && (
        <button
          onClick={() => setIsShowCVV(!isShowCVV)}
          className="items-center p-2 rounded-2xl">
          {!isShowCVV ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      )}
      <button onClick={onEdit} className="items-center p-2 rounded-2xl">
        <EditIcon />
      </button>
      <button onClick={onDelete} className="items-center p-2 rounded-2xl">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default FooterAction;
