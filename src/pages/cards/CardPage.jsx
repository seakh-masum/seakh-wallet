import React, { startTransition, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Chips from '../../components/Chips';
import ViewCardPage from './ViewCardPage';
import Card from '../../components/Card';
import { FIRESTORE_PATH } from '../../shared/constant';
import BottomSheet from '../../components/BottomSheet';
import { useNavigate } from 'react-router-dom';
import { db, deleteFirestoreData } from '../../services/firebase';
import { collection, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import Loading from '../../components/features/Loading';

const CARD_TYPE = [
  { label: 'All', value: '' },
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' },
];

const CardPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [filterValue, setFilterValue] = useState(['credit', 'debit']);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'cards'), orderBy('cardName', 'asc'))
    const subscriber = onSnapshot(q, (querySnapshot) => {
      let cardArr = [];
      querySnapshot.forEach((doc) => {
        cardArr.push({ ...doc.data(), id: doc.id });
      });
      startTransition(() => {
        setCards(cardArr);
        // setLoading(false);
      });
    })

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'cards'), where('cardType', 'in', filterValue))
    const subscriber = onSnapshot(q, (querySnapshot) => {
      let cardArr = [];
      querySnapshot.forEach((doc) => {
        cardArr.push({ ...doc.data(), id: doc.id });
      });
      setCards(cardArr);
      setLoading(false);
    })

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [filterValue]);

  const onViewCard = data => {
    setModalData(data);
    setModalVisible(true);
  };

  const closeViewModal = () => {
    setModalVisible(!modalVisible);
  };

  const onEditCard = data => {
    closeViewModal();
    setTimeout(() => {
      navigate(`/card/edit`, {state: data})
    }, 100);
  };

  const onDeleteCard = async id => {
    closeViewModal();
    await deleteFirestoreData(FIRESTORE_PATH.card, id)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const onAddCard = () => {
    navigate('/card/add');
  }

  // if(loading) {
  //   return <Loading />
  // }

  return (
    <>
      {loading ? 
        <Loading />  :
        <div className="min-h-screen h-full flex-col flex-1 px-3 bg-slate-100 dark:bg-neutral-950 py-4">
          <div className="py-5">
            <Header title="Cards" onAdd={onAddCard} />
            <div className='py-3'>
              <Chips
                data={CARD_TYPE}
                setValue={setCardType}
                setFilterValue={setFilterValue}
                value={cardType}
                isFilter
              />
            </div>
          </div>
          
          <>
            <BottomSheet
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}>
              <ViewCardPage
                modalData={modalData}
                onEdit={() => onEditCard(modalData)}
                onDelete={() => onDeleteCard(modalData.id)}
              />
            </BottomSheet>
            <>
              {cards.map(( item, index ) => (
                <Card
                  key={index}
                  data={item}
                  index={index}
                  onView={() => onViewCard(item)}
                  isShowCVV={false}
                />
              ))}
              </>
          </>
        </div>
      }
    </>
  );
};

export default CardPage;
