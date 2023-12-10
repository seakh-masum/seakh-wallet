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
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
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
  if (arr && arr.length > 0) {
    const index = arr.findIndex(x => x == element);
    arr.splice(index, 1);
    arr.unshift(element);
  }
  return arr;
}

function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

const getAmountWithSign = (transactionType, amount) => {
  return transactionType == LEDGER_TYPE.borrow ? `-${amount}` : `+${amount}`;
};


const getISODate = () => new Date().toISOString();

function timeAgo(date) {
  const timestamp = new Date(date).getTime();
  const seconds = Math.floor((new Date() - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [key, value] of Object.entries(intervals)) {
    const timeAgo = Math.floor(seconds / value);
    if (timeAgo >= 1) {
      return `${timeAgo} ${key}${timeAgo === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
}

const postAPI = async (url, data) => {
  return await fetch(import.meta.env.VITE_API_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
}

const getAPI = async (url) => {
  return await fetch(import.meta.env.VITE_API_URL + url)
    .then((response) => response.json())
}


const getColorOfTransactionType = (value, hasBackground = false) => {
  let className = value < 0
    ? "text-red-500 dark:text-red-400"
    : "text-green-500 dark:text-green-400";

  if (hasBackground) {
    className = className + ' ' + (value < 0
      ? "bg-red-200 dark:bg-red-100"
      : "bg-green-200 dark:bg-green-100")
  }

  return className;
};

function convertUTCtoLocalDate(utcDateString) {
  // Parse the UTC date string
  const utcDate = new Date(utcDateString);

  // Convert UTC date to local date string
  const localDateString = utcDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return localDateString;
}


export { moveElementToFirst, getTodaysData, makeExpiryDate, cardNumber, xxxCardNumber, showAlert, copyToClipboard, transformTitleCase, shuffleArray, removeSpace, areObjectsEqual, getAPI, postAPI, convertUTCtoLocalDate, getColorOfTransactionType, timeAgo, getISODate, getAmountWithSign };
