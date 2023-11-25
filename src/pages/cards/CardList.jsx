import React, { startTransition, useEffect, useState } from 'react';
import Chips from '../../components/ui/Chips';
import Card from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { db, } from '../../services/firebase';
import { collection, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import ListLayout from '../../layouts/ListLayout';

const CARD_TYPE = [
  { label: 'All', value: '' },
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' },
];

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState('');
  const [filterValue, setFilterValue] = useState(['credit', 'debit']);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'cards'), orderBy('cardName', 'asc'))
    const subscriber = getCardList(q);

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'cards'), where('cardType', 'in', filterValue), orderBy('cardName', 'asc'))
    const subscriber = getCardList(q);

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [filterValue]);


  const getCardList = (query) => {
    return onSnapshot(query, (querySnapshot) => {
      let cardArr = [];
      querySnapshot.forEach((doc) => {
        cardArr.push({ ...doc.data(), id: doc.id });
      });
      startTransition(() => {
        setCards(cardArr);
        setLoading(false);
      });
    })
  }

  const onViewCard = data => {
    navigate(`/card/view`, { state: data })
  };

  return (
    <ListLayout title="Cards" addPath='/card/add' loading={loading}>
      <div className='pb-5 pt-3'>
        <Chips
          data={CARD_TYPE}
          setValue={setCardType}
          setFilterValue={setFilterValue}
          value={cardType}
          isFilter
        />
      </div>
      <>
        {cards.map((item, index) => (
          <Card
            key={index}
            data={item}
            index={index}
            onView={() => onViewCard(item)}
            isShowCVV={false}
          />
        ))}
      </>
    </ListLayout>
  );
};

export default CardList;
