/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import Card from '../../components/Card';
import FooterAction from '../../components/FooterAction';
import ConfirmBox from '../../components/features/ConfirmBox';

const ViewCardPage = ({modalData, onEdit, onDelete}) => {
  const [isShowCVV, setIsShowCVV] = useState(false);
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);
  return (
    <>
    {isShowDeletePopup ? 
      (<ConfirmBox title='Delete Card' onYes={onDelete} onNo={()=> setShowDeletePopup(false)}/>)
      : (
        <>
          <Card data={modalData} isShowCVV={isShowCVV} index={0} isView />
          <FooterAction hasCvv isShowCVV={isShowCVV} setIsShowCVV={setIsShowCVV} onDelete={()=> setShowDeletePopup(true)}  onEdit={onEdit} />
        </>
      )
    }
    </>
  );
};

export default ViewCardPage;
