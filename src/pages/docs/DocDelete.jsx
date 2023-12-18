import React from 'react';
import ConfirmBox from '@features/ConfirmBox';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '@features/BottomSheet';
import { API_PATH } from '@shared/constant';
import useAPI from '@hooks/useApi';

const DocDelete = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { deleteAPI } = useAPI();

  const onDeleteDoc = async () => {
    await deleteAPI(API_PATH.doc, state)
      .then((res) => {
        onClosePage();
      })
      .catch((err) => console.log(err));
  };

  const onClosePage = () => {
    navigate('/docs');
  }

  return (
    <>
      <BottomSheet
        modalVisible={true}
        closeModal={onClosePage}>
        <ConfirmBox title='Doc' onYes={onDeleteDoc} />
      </BottomSheet>
    </>
  );
};

export default DocDelete;
