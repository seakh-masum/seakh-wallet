import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import FooterAction from '../../components/features/FooterAction';
import ConfirmBox from '../../components/features/ConfirmBox';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '../../components/features/BottomSheet';
import { FIRESTORE_PATH } from '../../shared/constant';
import { deleteAPI } from '../../shared/utils';

const AccountView = () => {
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
    navigate(`/account/edit`, { state: data });
  };

  const onDeleteAccount = async () => {
    setModalVisible(false);
    console.log(data)
    await deleteAPI(FIRESTORE_PATH.account, data._id)
      .then((res) => {
        console.log(res)
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
              {/* <Card data={data} isShowCVV={isShowCVV} index={0} isView /> */}
              <div
                style={{ backgroundColor: data.color }}
                className="bg-white shadow-sm p-4 rounded-lg"
              >
                <div>
                  <p className="mb-2 text-slate-900">{data.name}</p>
                  <b className="text-3xl text-slate-950">{data.balance}</b>
                </div>
                {data.accountNo &&
                  <div className='grid grid-cols-2 gap-3 border-t pt-5 mt-5 border-neutral-700'>
                    <div>
                      <p className="text-neutral-600 text-xss">Account Number</p>
                      <b className="text-slate-950">{data.accountNo}</b>
                    </div>
                    <div>
                      <p className="text-neutral-600 text-xss">Holder Name</p>
                      <b className="text-slate-950">{data.holderName}</b>
                    </div>
                    <div>
                      <p className="text-neutral-600 text-xss">Branch Name</p>
                      <b className="text-slate-950">{data.branch}</b>
                    </div>
                    <div>
                      <p className="text-neutral-600 text-xss">IFSC Code</p>
                      <b className="text-slate-950">{data.ifsc}</b>
                    </div>
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
