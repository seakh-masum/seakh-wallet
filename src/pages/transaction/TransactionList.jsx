import { useEffect, useState } from "react";
import { API_PATH } from "../../shared/constant";
import ListLayout from "../../layouts/ListLayout";
import { getAPI, getMockArray } from "../../shared/utils";
import TransactionCard from "../../components/features/TransactionCard";
import SkeletonCard from "../../components/features/SkeletonCard";

const TransactionList = () => {
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      await getAPI(API_PATH.transaction)
        .then((res) => setTransaction(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListLayout title="Transactions" addPath='/transaction/add'>
      {isLoading ?
        <>
          {getMockArray().map((item, idx) => (<SkeletonCard key={idx} />))}
        </> :
        <>
          {transaction.map((item, idx) => (
            <TransactionCard key={idx} item={item} />
          ))}
        </>
      }
    </ListLayout>
  );
};

export default TransactionList;


