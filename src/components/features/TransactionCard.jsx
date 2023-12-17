import React from 'react'
import { RUPEE_SYMBOL, TRANSACTION_TYPE } from '@shared/constant'
import { SyncIcon, SwapIcon } from '@icon/'
import { timeAgo } from '@shared/utils'

const TransactionCard = ({ item }) => {
  const getColorOfTransactionType = (value) => {
    return value == TRANSACTION_TYPE.Expense
      ? 'text-red-500 dark:text-red-400'
      : value == TRANSACTION_TYPE.Income
        ? 'text-green-500 dark:text-green-400'
        : 'text-cyan-500 dark:text-cyan-400'
  }

  const getAmountWithSign = (type, amount) => {
    return type == TRANSACTION_TYPE.Expense ? (
      `-${RUPEE_SYMBOL}${amount}`
    ) : type == TRANSACTION_TYPE.Income ? (
      `+${RUPEE_SYMBOL}${amount}`
    ) : (
      <div className='inline-flex items-center'>
        <SyncIcon /> {RUPEE_SYMBOL}{amount}
      </div>
    )
  }
  return (
    <div className='flex flex-row items-center justify-between bg-white dark:bg-neutral-900 shadow-sm p-4 rounded-lg mb-3 h-20'>
      <div>
        {item.type !== TRANSACTION_TYPE.Transfer && (
          <p className='mb-3 text-slate-700 dark:text-neutral-200'>
            {item.category}
          </p>
        )}
        <div className='flex flex-row items-center'>
          {item.fromAccount && (
            <p
              style={{ backgroundColor: item.fromAccount.color }}
              className={`text-xs text-black py-1 px-3 rounded-md`}
            >
              {item.fromAccount.name}
            </p>
          )}
          {item.type == TRANSACTION_TYPE.Transfer && (
            <>
              <SwapIcon />
              <p
                style={{ backgroundColor: item.toAccount.color }}
                className={`text-xs text-black py-1 px-3 rounded-md `}
              >
                {item.toAccount.name}
              </p>
            </>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-1 items-end text-right'>
        <b className={`text-3xl ${getColorOfTransactionType(item.type)}`}>
          {getAmountWithSign(item.type, item.amount)}
        </b>
        <p className='text-sm text-neutral-400 text-right'>
          {timeAgo(item.updatedAt)}
        </p>
      </div>
    </div>
  )
}

export default TransactionCard
