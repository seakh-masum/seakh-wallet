import React, { startTransition, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, } from '../../services/firebase';
import { collection, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import ListLayout from '../../layouts/ListLayout';
import { FIRESTORE_PATH } from '../../shared/constant';

const DocList = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, FIRESTORE_PATH.doc), orderBy('title', 'asc'))
    const subscriber = getCardList(q);

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);


  const getCardList = (query) => {
    return onSnapshot(query, (querySnapshot) => {
      let cardArr = [];
      querySnapshot.forEach((doc) => {
        cardArr.push({ ...doc.data(), id: doc.id });
      });
      startTransition(() => {
        setDocs(cardArr);
        setLoading(false);
      });
    })
  }

  const onView = data => {
    navigate(`/docs/edit`, { state: data })
  };

  return (
    <ListLayout title="Docs" addPath='/docs/add' loading={loading}>
      <div>
        {docs.map((item, index) => (
          <div style={{ backgroundColor: item.color }}
            key={index}
            className="bg-white shadow-sm p-4 rounded-lg mb-3"
            onClick={() => onView(item)}
          >
            <p className="mb-3 text-slate-900">{item.title}</p>
            <b className="text-xl text-slate-950" >{item.desc}</b>
          </div>
        ))}
      </div>
    </ListLayout>
  );
};

export default DocList;
