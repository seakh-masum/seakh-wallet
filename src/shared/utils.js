const showAlert = (title, message, btnText, onClick) => {
  // Alert.alert(title, message, [
  //   {
  //     text: btnText,
  //     onClick: onClick,
  //     style: 'cancel',
  //   },
  // ]);
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
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
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
}

const getTodaysData = () => {
  const date = new Date();

  const month = date.getMonth();
  const day = date.getDate();

  return Number(`${day}${month + 1}`);
}

const moveElementToFirst = (arr, element) => {
  if(arr && arr.length > 0) {
    const index = arr.findIndex(x=> x == element);
    arr.splice(index, 1);
    arr.unshift(element);
  }
  return arr;
}


export { moveElementToFirst, getTodaysData, makeExpiryDate, cardNumber, xxxCardNumber, showAlert, copyToClipboard, transformTitleCase, shuffleArray, removeSpace };
