import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import FooterAction from '../../components/features/FooterAction';
import ConfirmBox from '../../components/features/ConfirmBox';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '../../components/features/BottomSheet';
import { API_PATH } from '../../shared/constant';
import { deleteAPI } from '../../shared/utils';

const CardView = () => {
  const { state } = useLocation();
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
