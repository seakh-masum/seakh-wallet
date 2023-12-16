import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMockArray, timeAgo } from "../../shared/utils";
import LedgerCard from "../../components/ui/LedgerCard";
import ListLayout from "../../layouts/ListLayout";
import SkeletonCard from "../../components/features/SkeletonCard";
import useAPI from "../../hooks/useApi";

const LeadgerList = () => {
  const navigate = useNavigate();
  const { getAPI } = useAPI();

  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      await getAPI("ledger-customer")
        .then((res) => setCustomer(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <ListLayout title="Customer" addPath='/ledger/add'>
      {isLoading ?
        <>
          {getMockArray().map((item, idx) => (<SkeletonCard key={idx} />))}
        </> :
        <>
          {customer.map((item, idx) => (
            <LedgerCard
              key={idx}
              title={item.name}
              date={timeAgo(item.updatedAt)}
              amount={item.balance}
              transactionType={`You'll ${item.balance < 0 ? "get" : "give"}`}
              handleClick={() => navigate(`/ledger/details/${item._id}`)}
            />
          ))}
        </>
      }
    </ListLayout>
  );
};

export default LeadgerList;
