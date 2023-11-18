/* eslint-disable prettier/prettier */
import React from 'react';
import Card from '../../components/Card';
import FooterAction from '../../components/FooterAction';

const ViewDocScreen = ({modalData, onEdit, onDelete}) => {
  return (
    <>
      <Card data={modalData} index={0} isView isDoc />
      <FooterAction onDelete={onDelete} onEdit={onEdit} />
    </>

  );
};

export default ViewDocScreen;
