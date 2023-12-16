import { useEffect, useState } from "react";
import ColorBox from "../../components/features/ColorBox";
import { COLORS, FIRESTORE_PATH } from "../../shared/constant";
import ArrowBackIcon from "../../components/icon/ArrowBackIcon";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { deleteAPI, postAPI, putAPI } from "../../shared/utils";
import DeleteIcon from "../../components/icon/DeleteIcon";



const DocUpsert = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [color, setColor] = useState("#fff");
  const [form, setForm] = useState({
    title: '',
    details: ''
  });
  const { state } = useLocation();
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    if (state) {
      setForm({ title: state?.title, details: state?.details });
      setId(state._id);
      setColor(state.color);
    }
  }, []);


  const handleBack = async () => {
    let data = {
      ...form,
      color,
    };

    const newData = { ...data, id: id }

    if (id !== '') { //for Edit
      if (newData.title === state?.title && newData.details === state?.details && newData.color == state?.color) {
        navigate(-1);
      } else {
        await putAPI(FIRESTORE_PATH.doc, data, id)
          .then((res) => {
            navigate('/docs');
          })
          .catch((err) => console.log(err));
      }
    } else { //for Add
      if (form.details != '') { // if there are no detailsription it will not saved
        try {
          await postAPI(FIRESTORE_PATH.doc, data)
            .then((res) => {
              navigate('/docs');
            })
            .catch((err) => console.log(err));
        } catch (err) {
          alert(err);
        }
      } else {
        navigate('/docs');
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const onDeleteDoc = async (id) => {
    await deleteAPI(FIRESTORE_PATH.doc, id)
      .then((res) => {
        navigate('/docs');
      })
      .catch((err) => console.log(err));
  };



  return (
    <div style={{ background: color }} className="relative flex flex-col h-screen bg-neutral-100 px-3 py-5 dark:bg-neutral-950">
      <div className="inline-flex justify-between">
        <button className="-ml-2" onClick={handleBack}>
          <ArrowBackIcon className='fill-black' />
        </button>
        {id != '' && <button onClick={() => navigate(`/docs/${id}/delete`, { state: id })} className="items-center p-2 rounded-2xl">
          <DeleteIcon className='fill-black' />
        </button>}

      </div>

      <div className="flex-col py-5 h-">
        <div className="flex flex-col gap-5 mb-8">
          <input name='title' placeholder="Title" className="outline-none bg-transparent text-2xl font-bold" value={form.title} onChange={handleInput} />
          <textarea name='details' placeholder="Description" className="outline-none bg-transparent" value={form.details} onChange={handleInput}></textarea>
          <div className="absolute bottom-3 left-3 right-3">
            <ColorBox data={COLORS} setValue={setColor} value={color} />
          </div>
        </div>
      </div>

      <>
        {/* {isShowDeletePopup && <ConfirmBox title='Delete Docs' onYes={() => onDeleteDoc(id)} onNo={() => setShowDeletePopup(false)} />} */}
        <Outlet />
      </>
    </div>
  );
};

export default DocUpsert;
