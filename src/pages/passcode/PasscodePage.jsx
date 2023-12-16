import { Fragment, useEffect, useState } from "react";
import { getTodaysData, shuffleArray } from "../../shared/utils";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import LoginIcon from "../../components/icon/LoginIcon";
import BackspaceIcon from '../../components/icon/BackspaceIcon'

const passcodeArr = [
  { position: 1, isFilled: false, value: null },
  { position: 2, isFilled: false, value: null },
  { position: 3, isFilled: false, value: null },
  { position: 4, isFilled: false, value: null },
];

const PasscodePage = () => {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    "ok",
    "X",
  ]);
  const [passcode, setPasscode] = useState(passcodeArr);
  const [keyIndex, setKeyIndex] = useState(0);
  const [isPasswordMatched, setPasswordMatch] = useState(null);
  const [existingPasscode, setExisitingPasscode] = useLocalStorage("seakh_passcode", "1");

  useEffect(() => {
    const newArray = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    setNumbers([...newArray, "X"]);
    setDefaultValue();
  }, []);

  const onClickKey = (item) => {
    let copyPasscode = passcode;
    if (keyIndex >= 0 && keyIndex <= 4) {
      copyPasscode[keyIndex].value = item;
      setKeyIndex((prevState) => prevState + 1);
    }

    setPasscode(copyPasscode);
  };

  const handleDoneKey = () => {
    const isAllValueFilled = passcode.every((x) => x.value !== null);
    if (isAllValueFilled) {
      const passcodeValue = Number(passcode.map((x) => x.value).join(""));
      console.log({ passcodeValue, today: getTodaysData() })
      if (passcodeValue == getTodaysData()) {
        console.log('if')
        setExisitingPasscode(passcodeValue);
        setPasswordMatch("yes");
        navigate('/card');
      } else {
        setPasswordMatch("no");
        setTimeout(() => {
          setDefaultValue();
        }, 1000);
      }
    }
  };

  const handleBackspaceKey = () => {
    let copyPasscode = passcode;
    if (keyIndex >= 0 && keyIndex <= 4) {
      copyPasscode[keyIndex - 1].value = null;
      setKeyIndex((prevState) => prevState - 1);
    }

    setPasscode(copyPasscode);
  };

  const setDefaultValue = () => {
    setKeyIndex(0);
    setPasswordMatch(null);
    setPasscode([
      { position: 1, isFilled: false, value: null },
      { position: 2, isFilled: false, value: null },
      { position: 3, isFilled: false, value: null },
      { position: 4, isFilled: false, value: null },
    ]);
  };

  const NumberKey = (props) => {
    const { handleClick, bgColor = "bg-white dark:bg-slate-800", ...otherProps } = props;
    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center shadow-md border-slate-200 dark:border-slate-700 border rounded-3xl w-16 h-16 disabled:bg-slate-100 dark:disabled:bg-slate-900 ${bgColor}`}
        {...otherProps}
      >
        <label className="text-slate-700 dark:text-slate-100 text-2xl">{props.children}</label>
      </button>
    );
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-end h-screen">
      <div className="flex flex-col justify-center items-center">
        <p className="text-slate-700 dark:text-slate-200 text-lg text-center mb-5">
          Enter Passcode
        </p>
        <div
          className={`flex flex-row items-center justify-center gap-2 mb-16 ${isPasswordMatched == "no" && keyIndex == 4 ? "animate-shake" : ""
            }`}
        >
          {passcode.map((item, index) => (
            <div
              key={index}
              className={`border-2 border-slate-800 w-4 h-4 rounded-lg ${item.value !== null ? "bg-slate-700" : "bg-slate-100"
                }`}
            />
          ))}
        </div>
        <div className="flex flex-row items-center justify-center flex-wrap gap-5 max-h-96 max-w-[300px] p-6">
          {numbers.map((item, index) => (
            <Fragment key={index}>
              {item == "ok" ? (
                <NumberKey
                  disabled={keyIndex != 4}
                  handleClick={handleDoneKey}
                  bgColor={keyIndex == 4 && "bg-lime-400"}
                >
                  <LoginIcon width={32} height={32} />
                </NumberKey>
              ) : item == "X" ? (
                <NumberKey
                  disabled={keyIndex < 1}
                  handleClick={handleBackspaceKey}
                >
                  <BackspaceIcon width={36} height={36} />
                </NumberKey>
              ) : (
                <NumberKey
                  handleClick={() => onClickKey(item)}
                  disabled={keyIndex == 4}
                >
                  {item}
                </NumberKey>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasscodePage;
