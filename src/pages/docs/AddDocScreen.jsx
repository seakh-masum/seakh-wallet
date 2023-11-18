/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import InputBox from '../../components/InputBox';
import { showAlert } from '../../shared/utils';
import ColorBox from '../../components/ColorBox';
import {
  INITIAL_DOC_VALUES,
  COLORS,
  FIRESTORE_PATH,
} from '../../shared/constant';
import { addFirestoreData, updateFireStoreData } from '../../services/firestore';
import Button from '../../components/ui/Button';
import FormWrapper from '../../components/ui/FormWrapper';

const AddDocScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState('Add Doc');
  const [id, setId] = useState('');
  const [formValue, setFormValue] = useState(INITIAL_DOC_VALUES);
  const [color, setColor] = useState(INITIAL_DOC_VALUES.color);

  useEffect(() => {
    if (route.params) {
      const data = route.params.data;
      setFormValue(data);
      setTitle('Edit Doc');
      setId(data.id);
      setColor(data.color);
    }
  }, []);

  const handleChange = (e, name) => {
    setFormValue(state => ({ ...state, [name]: e }));
  };

  const onSave = () => {
    const data = {
      ...formValue,
      color,
    };

    if (id) {
      updateFireStoreData(FIRESTORE_PATH.doc, data, id).then(() => {
        showAlert('Update Card', 'Document has updated successfully', 'Ok', navigate('Docs'));
      }).catch();
    } else {
      addFirestoreData(FIRESTORE_PATH.doc, data)
        .then(() => {
          showAlert('Add Card', 'Document has added successfully', 'Ok', navigate('Docs'));
        })
        .catch();
    }
  };
  1
  const navigate = (path) => {
    navigation.navigate(path);
  };

  return (
    <FormWrapper title={title} btn={<Button onClick={onSave} title={'Save'} />}>
      <InputBox
        key={1}
        name="docType"
        label="Document Type"
        onChange={e => handleChange(e, 'docType')}
        value={formValue.docType}
        placeholder="e.g. Amazon ICICI"
        hasWrapperStyle={{marginBottom: 12}}
      />
      <InputBox
        key={2}
        name="docNumber"
        label="Document Number"
        onChange={e => handleChange(e, 'docNumber')}
        value={formValue.docNumber}
        placeholder="XXXX XXXX XXXX XXXX"
        hasWrapperStyle={{marginBottom: 12}}
      />
      <InputBox
        key={3}
        name="docName"
        label="Additional Info"
        onChange={e => handleChange(e, 'docName')}
        value={formValue.docName}
        placeholder="Enter any additional information"
        hasWrapperStyle={{marginBottom: 12}}
      />
      <div key={4}>
        <p style={FormStyles.inputLabel}>Color</p>
        <ColorBox data={COLORS} setValue={setColor} value={color} />
      </div>

    </FormWrapper>
  );
};

export default AddDocScreen;
