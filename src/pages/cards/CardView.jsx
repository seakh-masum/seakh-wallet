import React, { useEffect, useState } from 'react';
import Card from '@ui/Card';
import FooterAction from '@features/FooterAction';
import ConfirmBox from '@features/ConfirmBox';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '@features/BottomSheet';
import { API_PATH } from '@shared/constant';
import useAPI from '@hooks/useApi';

const CardView = () => {
  const { state } = useLocation();
  const { deleteAPI } = useAPI();
  const navigate = useNavigate();

  const [isShowCVV, setIsShowCVV] = useState(false);
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, []);

  const onEditCard = () => {
    setModalVisible(false);
    navigate(`/card/edit`, { state: data });
  };

  const onDeleteCard = async () => {
    setModalVisible(false);
    await deleteAPI(API_PATH.card, data._id)
      .then((res) => {
        navigate('/card');
      })
      .catch((err) => console.log(err));
  };

  const onClosePage = () => {
    navigate('/card');
  }

  return (
    <>
      <BottomSheet
        modalVisible={modalVisible}
        closeModal={onClosePage}>
        {isShowDeletePopup ?
          (<ConfirmBox title='Card' onYes={onDeleteCard} />)
          : (
            <>
              <Card data={data} isShowCVV={isShowCVV} index={0} isView />
              <FooterAction hasCvv isShowCVV={isShowCVV} setIsShowCVV={setIsShowCVV} onDelete={() => setShowDeletePopup(true)} onEdit={onEditCard} />
            </>
          )
        }
      </BottomSheet>
    </>
  );
};

export default CardView;
