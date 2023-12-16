import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Chips from '../../components/ui/Chips';
import ListLayout from '../../layouts/ListLayout';
import { getAPI } from '../../shared/utils';
import { CARD_TYPES, FIRESTORE_PATH } from '../../shared/constant';

const CARD_TYPE = [
  { label: 'All', value: null },
  { label: 'Credit', value: CARD_TYPES.Credit },
  { label: 'Debit', value: CARD_TYPES.Debit },
];

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    getCardList();
  }, []);

  useEffect(() => {
    getCardList(cardType);
  }, [cardType]);


  const getCardList = async (type = null) => {
    const safeType = type ?? ''
    try {
      await getAPI(FIRESTORE_PATH.card + '?type=' + safeType)
        .then((res) => setCards(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onViewCard = data => {
    navigate(`/card/view`, { state: data })
  };

  return (
    <>
      <ListLayout title="Cards" addPath='/card/add' loading={loading}>
        <div className='pb-5'>
          <Chips
            data={CARD_TYPE}
            setValue={setCardType}
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
      <Outlet />
    </>
  );
};

export default CardList;
