import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../layouts/ListLayout';
import { API_PATH } from '../../shared/constant';
import useAPI from '../../hooks/useApi';

const DocList = () => {
  const { getAPI } = useAPI();

  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    getDocList();
  }, []);


  const getDocList = async () => {
    try {
      await getAPI(API_PATH.doc)
        .then((res) => setDocs(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onView = data => {
    navigate(`/docs/${data._id}`, { state: data })
  };

  return (
    <>
      <ListLayout title="Docs" addPath='/docs/add' loading={loading}>
        <div>
          {docs.map((item, index) => (
            <div style={{ backgroundColor: item.color }}
              key={index}
              className="bg-white shadow-sm p-4 rounded-lg mb-3"
              onClick={() => onView(item)}
            >
              <p className="mb-3 text-slate-900">{item.title}</p>
              <b className="text-xl text-slate-950" >{item.details}</b>
            </div>
          ))}
        </div>
      </ListLayout>
    </>
  );
};

export default DocList;
