/* eslint-disable prettier/prettier */
// import { Alert } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';

const showAlert = (title, message, btnText, onClick) => {
//   Alert.alert(title, message, [
//     {
//       text: btnText,
//       onClick: onClick,
//       style: 'cancel',
//     },
//   ]);
};

const makeExpiryDate = date => {
  if (date) {
    const [year, month] = date.split('-');
    return `${month}/${year.slice(-2)}`;
  }
};

const cardNumber = value => {
  return value
    ?.replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

const removeSpace = value => {
  return value.replace(/\s/g, '');
};

const xxxCardNumber = value => {
  const lastFourChars = value.substr(value.length - 4);
  const xChars = Array(13).join('X');

  return cardNumber(xChars + lastFourChars);
};

const copyToClipboard = text => {
  Clipboard.setString(text);
};

const transformTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  array[10] = array[9];
  array[9] = 'ok';

  return array;
  // return array
  //   .map(value => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value)
}


export { makeExpiryDate, cardNumber, xxxCardNumber, showAlert, copyToClipboard, transformTitleCase, shuffleArray, removeSpace };
