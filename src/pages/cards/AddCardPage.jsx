/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import Chips from '../../components/ui/Chips';
import InputBox from '../../components/ui/InputBox';
import { cardNumber, moveElementToFirst, removeSpace, showAlert } from '../../shared/utils';
import ColorBox from '../../components/features/ColorBox';
import {
  initialFormData,
  COLORS,
  CARD_TYPE,
  CARD_NETWORK,
  FIRESTORE_PATH,
} from '../../shared/constant';
import Label from '../../components/ui/Label';
import FormWrapper from '../../components/features/FormWrapper';
import { addFirestoreData, updateFireStoreData } from '../../services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { CardValidationSchema } from '../../shared/validators/validator';
import Snackbar from '../../components/features/Snackbar';

const AddCardPage = () => {
  const expiryMonthRef = useRef();
  const expiryYearRef = useRef();
  const cvvRef = useRef();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [title, setTitle] = useState('Add Card');
  const [id, setId] = useState('');
  const [cardType, setCardType] = useState(initialFormData.cardType);
  const [network, setNetwork] = useState(initialFormData.network);
  const [color, setColor] = useState(initialFormData.color);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('Something went wrong');

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema: CardValidationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  useEffect(() => {
    if (state) {
      formik.setValues(state);
      setTitle('Edit Card');
      setId(state.id);
      setColor(state.color);
      setNetwork(state.network);
      setCardType(state.cardType);
    }
  }, []);

  const handleKeyUp = (event, values) => {
    const { expiryMonth, expiryYear, cardNo } = values;
    const { target: { name }, key } = event;
    if (key != 'Backspace') {
      if (name === 'cardNo' && cardNo.length == 19) {
        expiryMonthRef.current?.focus();
      }

      if (name === 'expiryMonth' && expiryMonth.length === 2) {
        expiryYearRef.current?.focus();
      }

      if (name === 'expiryYear' && expiryYear.length === 2) {
        cvvRef.current?.focus();
      }
    }
  }

  const onSave = async (props) => {
    const { values, isValid } = props;
    const cardNo = removeSpace(values.cardNo);
    const data = {
      ...values,
      network,
      cardType,
      color,
      cardNo
    };

    if (isValid) {
      if (id) {
        await updateFireStoreData(FIRESTORE_PATH.card, data, id).then(() => {
          setSnackbarMsg('Card updated successfully!')
          setShowSnackbar(true);
          navigate('/card');
        }).catch();
      } else {
        await addFirestoreData(FIRESTORE_PATH.card, data)
          .then(() => {
            setSnackbarMsg('Card updated successfully!')
            setShowSnackbar(true);
            navigate('/card');
          })
          .catch();
      }
    } else {
      setSnackbarMsg('Please fill all the required fields');
      setShowSnackbar(true);
    }

  };

  return (
    <>
      <FormWrapper handleSubmit={() => onSave(formik)} title={title}>
        <form onSubmit={formik.handleSubmit}>
          {/* Card Name */}
          <InputBox
            key={1}
            name="cardName"
            label="Card Name"
            onChange={formik.handleChange}
            value={formik.values.cardName}
            errors={formik.errors.cardName}
            placeholder="e.g. Amazon ICICI"
            hasWrapperStyle={{ marginBottom: 12 }}
          />
          {/* Card Type */}
          <div key={3} style={{ marginBottom: 12 }}>
            <Label>Card Type</Label>
            <Chips
              data={CARD_TYPE}
              setValue={setCardType}
              value={cardType}
              isFilter={false}
            />
          </div>
          {/* Card Number */}
          <InputBox name='cardNo'
            key={2}
            label="Card Number"
            onChange={formik.handleChange}
            onKeyUp={(e) => handleKeyUp(e, formik.values)}
            value={cardNumber(formik.values.cardNo)}
            errors={formik.errors.cardNo}
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength={19}
            hasWrapperStyle={{ marginBottom: 12 }}
          />
          {/* Expiry Date */}
          <div key={5} className="flex flex-row justify-between mb-3 gap-5">
            <div className='basis-2/3'>
              <Label>Expiry Date</Label>
              <div className="flex flex-row justify-center">
                <InputBox ref={expiryMonthRef} name='expiryMonth'
                  onChange={formik.handleChange}
                  onKeyUp={(e) => handleKeyUp(e, formik.values)}
                  value={formik.values.expiryMonth}
                  errors={formik.errors.expiryMonth}
                  hideLabel
                  maxLength={2}
                  placeholder="MM"
                />
                <p className="text-black text-2xl mx-3 pt-2 dark:text-neutral-200">/</p>
                <InputBox ref={expiryYearRef} name='expiryYear'
                  onChange={formik.handleChange}
                  onKeyUp={(e) => handleKeyUp(e, formik.values)}
                  value={formik.values.expiryYear}
                  errors={formik.errors.expiryYear}
                  hideLabel
                  maxLength={2}
                  placeholder="YYYY"
                />
              </div>
            </div>
            <InputBox ref={cvvRef} name='cvv'
              label="CVV"
              onChange={formik.handleChange}
              onKeyUp={(e) => handleKeyUp(e, formik.values)}
              value={formik.values.cvv}
              errors={formik.errors.cvv}
              maxLength={3}
              placeholder="XXX"
            />
          </div>

          {/* Holder Name */}
          <InputBox
            key={4} name='holderName'
            label="Holder Name"
            onChange={formik.handleChange}
            value={formik.values.holderName}
            errors={formik.errors.holderName}
            placeholder="e.g. Sk Masum"
            hasWrapperStyle={{ marginBottom: 12 }}
          />
          {/* Networks */}
          <div key={6} className="mb-3">
            <Label>Networks</Label>
            <Chips
              data={CARD_NETWORK}
              setValue={setNetwork}
              value={network}
              isFilter={false}
            />
          </div>
          {/* Colors */}
          <div key={7}>
            <Label>Color</Label>
            <ColorBox data={state ? moveElementToFirst(COLORS, color) : COLORS} setValue={setColor} value={color} />
          </div>
        </form>
      </FormWrapper>
      {showSnackbar && (
        <Snackbar message={snackbarMsg} duration={2000} onClose={() => setShowSnackbar(false)} />
      )}
    </>

  );
};

export default AddCardPage;
