import { useEffect, useState } from "react";
import { addFirestoreData, db, deleteFirestoreData, updateFireStoreData } from "../../services/firebase";
import { addDoc, collection } from "firebase/firestore";
import ColorBox from "../../components/features/ColorBox";
import { COLORS, FIRESTORE_PATH } from "../../shared/constant";
import ArrowBackIcon from "../../components/icon/ArrowBackIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { areObjectsEqual } from "../../shared/utils";
import DeleteIcon from "../../components/icon/DeleteIcon";
import ConfirmBox from "../../components/features/ConfirmBox";



const DocUpsert = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [color, setColor] = useState("#fff");
  const [form, setForm] = useState({
    title: '',
    desc: ''
  });
  const { state } = useLocation();
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    if (state) {
      setForm({ title: state?.title, desc: state?.desc });
      setId(state.id);
      setColor(state.color);
    }
  }, []);


  const handleBack = async () => {
    let data = {
      ...form,
      color,
      created: new Date().toISOString(),
    };

    const newData = { ...data, id: id }
    console.log({ newData, state });


    if (id !== '') { //for Edit
      if (newData.title === state?.title && newData.desc === state?.desc && newData.color == state?.color) {
        navigate(-1);
      } else {
        await updateFireStoreData(FIRESTORE_PATH.doc, data, id).then(() => {
          // setSnackbarMsg('Docs updated successfully!')
          // setShowSnackbar(true);
          navigate('/docs');
        }).catch();
      }
    } else { //for Add
      if (form.desc != '') { // if there are no description it will not saved
        try {
          await addFirestoreData(FIRESTORE_PATH.doc, data)
            .then(() => {
              // setSnackbarMsg('Card updated successfully!')
              // setShowSnackbar(true);
              navigate('/docs');
            })
            .catch();
        } catch (err) {
          alert(err);
        }
      } else {
        navigate('/docs');
      }
    }

    if (newData.title === state?.title && newData.desc === state?.desc && newData.color == state?.color) {
      console.log(true);
    } else {
      console.log(false);

    }


  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    console.log({ name, value });
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const onDeleteDoc = async (id) => {
    await deleteFirestoreData(FIRESTORE_PATH.doc, id)
      .then(() => {
        navigate('/docs');
      })
      .catch(err => console.log(err));
  };



  return (
    <div style={{ background: color }} className="relative flex flex-col h-screen bg-neutral-100 px-3 py-5 dark:bg-neutral-950">
      <div className="inline-flex justify-between">
        <button className="-ml-2" onClick={handleBack}>
          <ArrowBackIcon className='fill-black' />
        </button>
        {id != '' && <button onClick={() => setShowDeletePopup(true)} className="items-center p-2 rounded-2xl">
          <DeleteIcon className='fill-black' />
        </button>}

      </div>

      <div className="flex-col py-5 h-">
        <div className="flex flex-col gap-5 mb-8">
          <input name='title' placeholder="Title" className="outline-none bg-transparent text-2xl font-bold" value={form.title} onChange={handleInput} />
          <textarea name='desc' placeholder="Description" className="outline-none bg-transparent" value={form.desc} onChange={handleInput}></textarea>
          <div className="absolute bottom-3 left-3 right-3">
            <ColorBox data={COLORS} setValue={setColor} value={color} />
          </div>
        </div>
      </div>

      <>
        {isShowDeletePopup && <ConfirmBox title='Delete Docs' onYes={() => onDeleteDoc(id)} onNo={() => setShowDeletePopup(false)} />}
      </>
    </div>
  );
};

export default DocUpsert;
