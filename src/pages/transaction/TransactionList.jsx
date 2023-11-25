import { useEffect, useState } from "react";
import { FIRESTORE_PATH, TRANSACTION_TYPE } from "../../shared/constant";
import { getFirestoreData } from "../../services/firebase";
import ListLayout from "../../layouts/ListLayout";

const TransactionList = () => {

  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const transactionData = await getFirestoreData(FIRESTORE_PATH.transaction);
      const accountsData = await getFirestoreData(FIRESTORE_PATH.account);

      transactionData.forEach((e) => {
        if (accountsData && accountsData.length > 0) {
          const fromAccountFound = accountsData.find(
            (x) => x.id == e.fromAccount
          );
          e.fromAccountColor = fromAccountFound?.color;
          e.fromAccountName = fromAccountFound?.name;
          if (e.toAccount && e.transactionType == TRANSACTION_TYPE.Transfer) {
            const toAccountFound = accountsData.find(
              (x) => x.id == e.toAccount
            );
            e.toAccountColor = toAccountFound?.color;
            e.toAccountName = toAccountFound?.name;
          }
        }
      });

      setTransaction(transactionData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getColorOfTransactionType = (value) => {
    return value == TRANSACTION_TYPE.Expense
      ? "text-red-500 dark:text-red-400"
      : value == TRANSACTION_TYPE.Income
        ? "text-green-500 dark:text-green-400"
        : "text-cyan-500 dark:text-cyan-400";
  };

  const getAmountWithSign = (transactionType, amount) => {
    return transactionType == TRANSACTION_TYPE.Expense ? (
      `-${amount}`
    ) : transactionType == TRANSACTION_TYPE.Income ? (
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
              {item.transactionType !== TRANSACTION_TYPE.Transfer && (
                <p className="mb-3 text-slate-700 dark:text-neutral-200">
                  {item.category}
                </p>
              )}
              <div className="flex flex-row items-center">
                {item.fromAccount && (
                  <p
                    style={{ backgroundColor: item.fromAccountColor }}
                    className={`text-xs text-black py-1 px-2 rounded-md block w-fit`}
                  >
                    {item.fromAccountName}
                  </p>
                )}
                {item.transactionType == TRANSACTION_TYPE.Transfer && (
                  <>
                    <SwapIcon />
                    <p
                      style={{ backgroundColor: item.toAccountColor }}
                      className={`
                        ${item.toAccountColor} 
                        text-xs text-white py-1 px-2 rounded-md `}
                    >
                      {item.toAccountName}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="inline-flex gap-2 items-center text-right mb-2">
                <b
                  className={`text-3xl ${getColorOfTransactionType(
                    item.transactionType
                  )}`}
                >
                  {getAmountWithSign(item.transactionType, item.amount)}
                </b>
              </div>
              <p className="text-sm text-slate-400 text-right">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </ListLayout>
  );
};

export default TransactionList;


