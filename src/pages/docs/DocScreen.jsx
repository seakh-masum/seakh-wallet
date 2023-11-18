/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, div, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import ViewDocScreen from './ViewDocScreen';
import { deleteFirestoreData } from '../../services/firestore';
import { FIRESTORE_PATH } from '../../shared/constant';
import Card from '../../components/Card';
import BottomSheet from '../../components/BottomSheet';
import { Colors } from '../../styles/colors';

const DocScreen = ({ navigation }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('docs')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setDocs(users);
        setLoading(false);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

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
      navigation.navigate('AddDoc', { data });
    }, 100);
  };

  const onDeleteCard = id => {
    closeViewModal();
    Alert.alert('Update Card', 'Card updated successfully', [
      {
        text: 'Cancel',
        onClick: () => console.log('first'),
        style: 'cancel',
      },
      {
        text: 'Yes, Delete',
        onClick: () => deletCard(id),
      },
    ]);
  };

  const deletCard = id => {
    deleteFirestoreData(FIRESTORE_PATH.doc, id)
      .then(() => {
        navigation.navigate('Docs');
      })
      .catch(err => console.log(err));
  };

  const onAddDoc = () => {
    navigation.navigate('AddDoc');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <div className="flex-col flex-1 px-3 bg-neutral-100 dark:bg-neutral-950">
      <div className="py-5">
        <Header title="Docs" onAdd={onAddDoc} />
      </div>
      <BottomSheet modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <ViewDocScreen
          modalData={modalData}
          onEdit={() => onEditCard(modalData)}
          onDelete={() => onDeleteCard(modalData.id)}
        />
      </BottomSheet>
      {loading ?
        <div className="flex-1 justify-center align-center">
          <ActivityIndicator size="large" color={Colors.blue} />
        </div> :
        <FlatList
          data={docs}
          renderItem={({ item, index }) => (
            <Card
              key={index}
              data={item}
              index={index}
              onView={() => onViewCard(item)}
              isDoc
            />
          )}
          keyExtractor={item => item.id}
        />}
    </div>
  );
};

export default DocScreen;
