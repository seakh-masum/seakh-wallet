import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import FooterAction from '../../components/features/FooterAction';
import ConfirmBox from '../../components/features/ConfirmBox';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '../../components/features/BottomSheet';
import { API_PATH } from '../../shared/constant';
import TextGroup from '../../components/ui/TextGroup';
import useAPI from '../../hooks/useApi';

const AccountView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { deleteAPI } = useAPI();

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
    navigate(`/account/edit`, { state: data });
  };

  const onDeleteAccount = async () => {
    setModalVisible(false);
    await deleteAPI(API_PATH.account, data._id)
      .then((res) => {
        navigate('/account');
      })
      .catch((err) => console.log(err));
  };

  const onClosePage = () => {
    navigate('/account');
  }

  return (
    <>
      <BottomSheet
        modalVisible={modalVisible}
        closeModal={onClosePage}>
        {isShowDeletePopup ?
          (<ConfirmBox title='Account' onYes={onDeleteAccount} />)
          : (
            <>
              <div
                style={{ backgroundColor: data.color }}
                className="bg-white shadow-sm p-4 rounded-t-xl"
              >
                <div>
                  <p className="mb-2 text-slate-900">{data.name}</p>
                  <b className="text-3xl text-slate-950">{data.balance}</b>
                </div>
                {data.accountNo &&
                  <div className='grid grid-cols-2 gap-3 border-t pt-5 mt-5 border-black/10'>
                    <TextGroup title='Account Number' value={data.accountNo} />
                    <TextGroup title='Holder Name' value={data.holderName} />
                    <TextGroup title='Branch Number' value={data.branch} />
                    <TextGroup title='IFSC Code' value={data.ifsc} />
                  </div>
                }
              </div>

              <FooterAction hasCvv isShowCVV={isShowCVV} setIsShowCVV={setIsShowCVV} onDelete={() => setShowDeletePopup(true)} onEdit={onEditCard} />
            </>
          )
        }
      </BottomSheet>
    </>
  );
};

export default AccountView;
