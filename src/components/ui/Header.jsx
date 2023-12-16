import React from 'react';
import ArrowBackIcon from '../icon/ArrowBackIcon';
import { useNavigate } from 'react-router-dom';
import AddIcon from '../icon/AddIcon';


const Header = ({ title, isAddPage, onAdd, noTitle = false }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between py-5">
      <div className="flex flex-row gap-1 items-center">
        {isAddPage && (
          <button className='mt-1' onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        )}
        {!noTitle &&
          <p className="text-4xl font-semibold text-black dark:text-neutral-200">{title}</p>
        }
      </div>
      {!isAddPage &&
        <button className="bg-black p-1 rounded-full dark:bg-white" onClick={onAdd}>
          <AddIcon height={24} width={24} />
        </button>
      }
    </div>
  );
};

export default Header;
