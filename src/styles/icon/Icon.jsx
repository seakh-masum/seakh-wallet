/* eslint-disable prettier/prettier */
import React from 'react';
import AddIcon from './AddIcon';

const Icon = props => {
  const {name, ...otherProps} = props;
  const getIcon = () => {
    switch (name) {
      case 'add':
        return <AddIcon {...otherProps} />;

      default:
        break;
    }
  };

  return <>{getIcon()}</>;
};

export default Icon;
