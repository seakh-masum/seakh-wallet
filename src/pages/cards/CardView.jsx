import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import FooterAction from '../../components/features/FooterAction';
import ConfirmBox from '../../components/features/ConfirmBox';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '../../components/features/BottomSheet';
import { deleteFirestoreData } from '../../services/firebase';
import { FIRESTORE_PATH } from '../../shared/constant';

const CardView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isShowCVV, setIsShowCVV] = useState(false);
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(data)
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
    await deleteFirestoreData(FIRESTORE_PATH.card, data.id)
      .then(() => {
        navigate('/card');
      })
      .catch(err => console.log(err));
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
          (<ConfirmBox title='Delete Card' onYes={onDeleteCard} onNo={() => setShowDeletePopup(false)} />)
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
