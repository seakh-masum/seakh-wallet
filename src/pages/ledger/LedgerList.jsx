import { useEffect, useState } from "react";
// import { LEDGER_TYPE, TRANSACTION_TYPE } from "./data";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
// import { db } from "./firebase";
import { Outlet, useNavigate } from "react-router-dom";
import { getAPI, timeAgo } from "../../shared/utils";
import LedgerCard from "../../components/ui/LedgerCard";
import ListLayout from "../../layouts/ListLayout";

const LeadgerList = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    // try {
    //   const transactionQuery = await getDocs(
    //     query(collection(db, "ledger-customer"))
    //   );

    //   const transactionData = [];
    //   transactionQuery.forEach((doc) => {
    //     transactionData.push({ id: doc.id, ...doc.data() });
    //   });

    //   console.log(transactionData);

    //   setCustomer(transactionData);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.error(error);
    // }
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

    <ListLayout title="Customer" addPath='/ledger/add' loading={isLoading}>
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
    </ListLayout>
  );
};

export default LeadgerList;
