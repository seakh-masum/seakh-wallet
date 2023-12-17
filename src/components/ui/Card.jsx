import React from 'react';
import { cardNumber, xxxCardNumber, copyToClipboard } from '../../shared/utils';
import { RupayIcon, VisaIcon, MastercardIcon } from '../icon';
import { NETWORK_TYPES } from '../../shared/constant';
import SkeletonLine from '../features/SkeletonLine';


const Card = ({ data, index, isShowCVV, isView = false, onView, isDoc, isLoading }) => {
  const getNetworkIcon = () => {
    switch (data?.network) {
      case NETWORK_TYPES.Visa:
        return <VisaIcon />;

      case NETWORK_TYPES.MasterCard:
        return <MastercardIcon />;

      case NETWORK_TYPES.Rupay:
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
    backgroundColor: data?.color,
    marginTop: index == 0 ? 0 : -140,
  };

  return (
    <div onClick={() => pressCard()} style={cardStyles} className={`${isLoading && 'animate-pulse bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'}  flex flex-col justify-between p-4 h-56 w-full shadow-xl ${isView ? 'z-50' : `z-[${index}]`}  ${isView ? 'rounded-t-3xl' : 'rounded-3xl'}`}>
      {
        isLoading ?
          (
            <div>
              <SkeletonLine width={30} className={'mb-3'} />
              <SkeletonLine width={75} />
            </div>
          ) :
          (
            <div className="flex flex-row items-center justify-between">
              <p className="text-black text-xl">{data?.cardName}</p>
              {getNetworkIcon()}
            </div>
          )
      }
      {isView &&
        <>
          <div className="block mt-8" onClick={() => copyToClipboard(data?.cardNo)}>
            <p className="text-black text-3xl">
              {isView ? (cardNumber(data?.cardNo)) : xxxCardNumber(data?.cardNo)}
            </p>
          </div>
          <div className="flex flex-row justify-between item-end mt-2">
            <div >
              <p className="text-neutral-600 text-xss">Holder Name</p>
              <button onClick={() => copyToClipboard(data?.holderName)}>
                <p className="text-black text-base">
                  {data?.holderName}
                </p>
              </button>
            </div>
            {!isDoc &&
              <div className="flex flex-row items-center self-center">
                <div className="block">
                  <p className="text-neutral-600 text-xss">Valid Thru</p>
                  <button onClick={() => copyToClipboard(`${data?.expiryMonth}/${data?.expiryYear}`)}>
                    <p className="text-black text-xs">
                      {data?.expiryMonth}/{data?.expiryYear}
                    </p>
                  </button>
                </div>
                {isShowCVV && (
                  <div className="block ml-3">
                    <p className="text-neutral-600 text-xss">CVV</p>
                    <button onClick={() => copyToClipboard(data?.cvv)}>
                      <p className="text-black text-xs">{data?.cvv}</p>
                    </button>
                  </div>
                )}
              </div>
            }
          </div>
        </>
      }
    </div>
  );
};

export default Card;
