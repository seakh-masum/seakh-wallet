import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { convertUTCtoLocalDate, getColorOfTransactionType, getMockArray } from "@shared/utils";
import LedgerCard from "@ui/LedgerCard";
import Button from "@ui/Button";
import { LEDGER_TYPE } from "@shared/constant";
import Header from "@ui/Header";
import SkeletonCard from "@features/SkeletonCard";
import useAPI from "@hooks/useApi";


const buttons = [
  { variant: 'error', ledgerType: LEDGER_TYPE.borrow, message: 'Give' },
  { variant: 'success', ledgerType: LEDGER_TYPE.owe, message: 'Get' },
];

const LedgerDetails = () => {
  const navigate = useNavigate();
  const { getAPI } = useAPI();

  const { id } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const getCustomerDetails = async () => {
    try {
      await getAPI(`ledger-customer/${id}`)
        .then(async (res) => { setCustomerDetails(res); await getTransactions(); })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      await getAPI(`ledger-transaction/customer/${id}`)
        .then((res) => setTransaction(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full flex-col flex-1 px-3 bg-neutral-100 dark:bg-neutral-950 py-4">
      <div className="fixed top-0 right-0 left-0 bg-white dark:bg-neutral-950">
        <div className="p-3">
          <Header isAddPage title={customerDetails.name} />
          <div
            className={`flex flex-row items-center justify-between mb-3 pt-1 pb-2 px-3 rounded-lg ${getColorOfTransactionType(
              customerDetails?.balance,
              true
            )}`}
          >
            <p className="leading-10">
              You'll {customerDetails.balance < 0 ? "get" : "give"}
            </p>
            <b className={`text-4xl font-bold `}>
              {Math.abs(customerDetails?.balance)}
            </b>
          </div>
        </div>
      </div>
      <div>
        <div className="pb-20 pt-44">
          <p className="text-sm text-slate-500 dark:text-neutral-300 mb-3">
            Transactions
          </p>
          {isLoading ?
            <>
              {getMockArray().map((item, idx) => (<SkeletonCard key={idx} />))}
            </> :
            <>
              {transaction.map((item, idx) => (
                <LedgerCard
                  key={idx}
                  title={item.details}
                  date={convertUTCtoLocalDate(item.createdAt)}
                  amount={item.amount}
                  transactionType={`You ${item.amount > 0 ? "got" : "gave"}`}
                />
              ))}
            </>
          }
        </div>
        <FixedBottombar>
          {buttons.map((btn, idx) => (
            <Button key={idx}
              type={btn.variant}
              onClick={() =>
                navigate(
                  `/ledger/${customerDetails._id}/${btn.ledgerType}`,
                  { state: customerDetails.name }
                )
              }
              title={`You ${btn.message}`}
            />
          ))}
        </FixedBottombar>
      </div>
    </div>
  );
};

export default LedgerDetails;


