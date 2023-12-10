import { useEffect, useState } from "react";
import { FIRESTORE_PATH, TRANSACTION_TYPE } from "../../shared/constant";
import ListLayout from "../../layouts/ListLayout";
import { getAPI, timeAgo } from "../../shared/utils";
import SwapIcon from "../../components/icon/SwapIcon";
import SyncIcon from "../../components/icon/SyncIcon";

const TransactionList = () => {

  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      await getAPI(FIRESTORE_PATH.transaction)
        .then((res) => setTransaction(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getColorOfTransactionType = (value) => {
    return value == TRANSACTION_TYPE.Expense
      ? "text-red-500 dark:text-red-400"
      : value == TRANSACTION_TYPE.Income
        ? "text-green-500 dark:text-green-400"
        : "text-cyan-500 dark:text-cyan-400";
  };

  const getAmountWithSign = (type, amount) => {
    return type == TRANSACTION_TYPE.Expense ? (
      `-${amount}`
    ) : type == TRANSACTION_TYPE.Income ? (
      `+${amount}`
    ) : (
      <div className="inline-flex items-center">
        <SyncIcon /> {amount}
      </div>
    );
  };

  return (
    <ListLayout title="Transactions" addPath='/transaction/add' loading={isLoading}>
      <div className="">
        {transaction.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center justify-between bg-white dark:bg-neutral-900 shadow-sm p-4 rounded-lg mb-3 h-20"
          >
            <div>
              {item.type !== TRANSACTION_TYPE.Transfer && (
                <p className="mb-3 text-slate-700 dark:text-neutral-200">
                  {item.category}
                </p>
              )}
              <div className="flex flex-row items-center">
                {item.fromAccount && (
                  <p
                    style={{ backgroundColor: item.fromAccount.color }}
                    className={`text-xs text-black py-1 px-2 rounded-md block w-fit`}
                  >
                    {item.fromAccount.name}
                  </p>
                )}
                {item.type == TRANSACTION_TYPE.Transfer && (
                  <>
                    <SwapIcon />
                    <p
                      style={{ backgroundColor: item.toAccount.color }}
                      className={`
                        ${item.toAccount.color} 
                        text-xs text-white py-1 px-2 rounded-md `}
                    >
                      {item.toAccount.name}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="inline-flex gap-2 items-center text-right mb-2">
                <b
                  className={`text-3xl ${getColorOfTransactionType(
                    item.type
                  )}`}
                >
                  {getAmountWithSign(item.type, item.amount)}
                </b>
              </div>
              <p className="text-sm text-slate-400 text-right">{timeAgo(item.updatedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </ListLayout>
  );
};

export default TransactionList;


