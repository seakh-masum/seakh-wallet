/* eslint-disable prettier/prettier */
import React from 'react';
import EditIcon from '../styles/icon/EdiIcon';
import DeleteIcon from '../styles/icon/DeleteIcon';
import VisibilityOffIcon from '../styles/icon/VisibiltyOffIcon';
import VisibilityIcon from '../styles/icon/VisibilityIcon';

const FooterAction = ({ setIsShowCVV, isShowCVV, onEdit, onDelete, hasCvv }) => {
  return (
      <div className="flex flex-row justify-around p-3 backdrop-blur shadow-2xl dark:bg-neutral-800 bg-white/50 supports-backdrop-blur:bg-white/60 rounded-b-xl">
        {hasCvv && (
          <button
            onClick={() => setIsShowCVV(!isShowCVV)}
            className="items-center p-2 rounded-2xl">
            {!isShowCVV ? <VisibilityIcon /> : <VisibilityOffIcon  />}
          </button>
        )}
        <button onClick={onEdit} className="items-center p-2 rounded-2xl">
          <EditIcon  />
        </button>
        <button onClick={onDelete} className="items-center p-2 rounded-2xl">
          <DeleteIcon  />
        </button>
      </div>
  );
};

export default FooterAction;
