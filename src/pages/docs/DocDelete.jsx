import React, { useEffect, useState } from 'react';
import ConfirmBox from '../../components/features/ConfirmBox';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '../../components/features/BottomSheet';
import { API_PATH } from '../../shared/constant';
import useAPI from '../../hooks/useApi';

const DocDelete = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { deleteAPI } = useAPI();
  const [data, setData] = useState({});

  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, []);

  const onDeleteDoc = async () => {
    await deleteAPI(API_PATH.doc, state)
      .then((res) => {
        navigate('/docs');
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
