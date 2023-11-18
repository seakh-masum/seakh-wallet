/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import Chips from '../../components/Chips';
import InputBox from '../../components/InputBox';
import { cardNumber, removeSpace, showAlert } from '../../shared/utils';
import ColorBox from '../../components/ColorBox';
import {
  initialFormData,
  COLORS,
  CARD_TYPE,
  CARD_NETWORK,
  FIRESTORE_PATH,
} from '../../shared/constant';
import Button from '../../components/ui/Button';
import Label from '../../components/Label';
import FormWrapper from '../../components/ui/FormWrapper';
import { addFirestoreData, updateFireStoreData } from '../../services/firebase';
import { useNavigate,  useLocation } from 'react-router-dom';

const AddCardPage = () => {
  const expiryMonthRef = useRef();
  const expiryYearRef = useRef();
  const cvvRef = useRef();
  const navigate = useNavigate();
  const {state} = useLocation();

  const [title, setTitle] = useState('Add Card');
  const [id, setId] = useState('');
  const [formValue, setFormValue] = useState(initialFormData);
  const [cardType, setCardType] = useState(initialFormData.cardType);
  const [network, setNetwork] = useState(initialFormData.network);
  const [color, setColor] = useState(initialFormData.color);

  useEffect(() => {
    console.log(state)
    if (state) {
      setFormValue(state);
      setTitle('Edit Card');
      setId(state.id);
      setColor(state.color);
      setNetwork(state.network);
      setCardType(state.cardType);
    }
  }, []);



  const handleChange = (e) => {
    const {value, name} = e.target;
    const {expiryMonth, expiryYear, cardNo} = formValue;

    e.preventDefault();
    if (name === 'cardNo') {
      if (cardNo.length === 19) {
        expiryMonthRef.current?.focus();
      }
    }

    if (name === 'expiryMonth') {
      if (expiryMonth.length === 2) {
        expiryYearRef.current?.focus();
      }
    }

    if (name === 'expiryYear') {
      if (expiryYear.length === 2) {
        cvvRef.current?.focus();
      }
    }
    setFormValue(state => ({ ...state, [name]: value }));
  };

  const onSave = async() => {
    const cardNo = removeSpace(formValue.cardNo);
    const data = {
      ...formValue,
      network,
      cardType,
      color,
      cardNo
    };

    console.log(data);

    if (id) {
      await updateFireStoreData(FIRESTORE_PATH.card, data, id).then(() => {
        // showAlert('Update Card', 'Card updated successfully', 'Ok', navigate('Cards'));
      }).catch();
    } else {
      await addFirestoreData(FIRESTORE_PATH.card, data)
        .then(() => {
          // showAlert('Add Card', 'Card added successfully', 'Ok', navigate('Cards'));
        })
        .catch();
    }
  };

  const navigation = (path) => {
    navigate.reset({
      index: 0,
      routes: [{ name: path }]
    })
  };

  return (
    <FormWrapper title={title} btn={<Button onClick={onSave} title={'Save'} />}>
      {/* Card Name */}
      <InputBox
        key={1}
        name="cardName"
        label="Card Name"
        onChange={handleChange}
        value={formValue.cardName}
        placeholder="e.g. Amazon ICICI"
        hasWrapperStyle={{marginBottom: 12}}
        // autoFocus={true}
      />
      {/* Card Type */}
      <div key={3} style={{marginBottom: 12}}>
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
        // keyboardType="number-pad"
        onChange={handleChange}
        value={cardNumber(formValue.cardNo)}
        placeholder="XXXX XXXX XXXX XXXX"
        maxLength={19}
        hasWrapperStyle={{marginBottom: 12}}
      />
      {/* Expiry Date */}
      <div key={5} className="flex flex-row justify-between mb-3 gap-5">
        <div className='basis-2/3'>
          <Label>Expiry Date</Label>
          <div className="flex flex-row justify-center">
            <InputBox ref={expiryMonthRef} name='expiryMonth'
              onChange={handleChange}
              value={formValue.expiryMonth}
              hideLabel
              maxLength={2}
              // keyboardType="number-pad"
              placeholder="MM"
            />
            <p className="text-black text-2xl mx-3 pt-2 dark:text-neutral-200">/</p>
            <InputBox ref={expiryYearRef} name='expiryYear'
              onChange={handleChange}
              value={formValue.expiryYear}
              hideLabel
              maxLength={2}
              // keyboardType="number-pad"
              placeholder="YYYY"
            />
          </div>
        </div>
        <InputBox ref={cvvRef} name='cvv'
          label="CVV"
          onChange={handleChange}
          value={formValue.cvv}
          maxLength={3}
          // keyboardType="number-pad"
          placeholder="XXX"
        />
      </div>

      {/* Holder Name */}
      <InputBox
        key={4} name='holderName'
        label="Holder Name"
        onChange={handleChange}
        value={formValue.holderName}
        placeholder="e.g. Sk Masum"
        hasWrapperStyle={{marginBottom: 12}}
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
        <ColorBox data={COLORS} setValue={setColor} value={color} />
      </div>
    </FormWrapper>
  );
};

export default AddCardPage;
