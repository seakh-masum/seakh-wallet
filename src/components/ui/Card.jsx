import React from 'react';
import { cardNumber, xxxCardNumber, copyToClipboard } from '../../shared/utils';
import MastercardIcon from '../icon/MastercardIcon';
import VisaIcon from '../icon/VisaIcon';
import RupayIcon from '../icon/RupayIcon';


const Card = ({ data, index, isShowCVV, isView, onView, isDoc }) => {
  const { network } = data;

  const getNetworkIcon = () => {
    switch (network) {
      case 'visa':
        return <VisaIcon />;

      case 'master_card':
        return <MastercardIcon />;

      case 'rupay':
        return <RupayIcon />;

      default:
        return '';
    }
  };

  const pressCard = () => {
    if (!isView) {
      onView();
    }
  };

  const cardStyles = {
    backgroundColor: data.color,
    marginTop: index == 0 ? 0 : -140,
  };

  return (
    <div onClick={() => pressCard()} style={cardStyles} className={`flex flex-col justify-between p-4 h-56 w-full shadow-xl z-[${index}] ${isView ? 'rounded-t-3xl' : 'rounded-3xl'}`}>
      <div className="flex flex-row items-center justify-between">
        <p className="text-black text-xl">{isDoc ? data.docType : data.cardName}</p>
        {!isDoc && getNetworkIcon()}
      </div>
      {isView && <>
        <div className="block mt-8" onClick={() => copyToClipboard(isDoc ? data.docNumber : data.cardNo)}>
          <p className="text-black text-3xl -z-10">
            {isView ? (isDoc ? data.docNumber : cardNumber(data.cardNo)) : xxxCardNumber(isDoc ? data.docNumber : data.cardNo)}
          </p>
        </div>
        <div className="flex flex-row justify-between item-end mt-2">
          <div >
            <p className="text-neutral-600 text-xss">Holder Name</p>
            <button onClick={() => copyToClipboard(isDoc ? data.docName : data.holderName)}>
              <p className="text-black text-base">
                {isDoc ? data.docName : data.holderName}
              </p>
            </button>
          </div>
          {!isDoc &&
            <div className="flex flex-row items-center self-center">
              <div className="block">
                <p className="text-neutral-600 text-xss">Valid Thru</p>
                <button
                  onClick={() =>
                    copyToClipboard(`${data.expiryMonth}/${data.expiryYear}`)
                  }>
                  <p className="text-black text-xs">
                    {data.expiryMonth}/{data.expiryYear}
                  </p>
                </button>
              </div>
              {isShowCVV && (
                <div className="block ml-3">
                  <p className="text-neutral-600 text-xss">CVV</p>
                  <button onClick={() => copyToClipboard(data.cvv)}>
                    <p className="text-black text-xs">{data.cvv}</p>
                  </button>
                </div>
              )}
            </div>
          }
        </div></>}
    </div>
  );
};

export default Card;
