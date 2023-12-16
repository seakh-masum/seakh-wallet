import { useEffect, useState } from "react";
import ListLayout from "../../layouts/ListLayout";
import { FIRESTORE_PATH } from "../../shared/constant";
import { Outlet, useNavigate } from "react-router-dom";
import { getAPI } from "../../shared/utils";

const AccountList = () => {
  const [account, setAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    try {
      await getAPI(FIRESTORE_PATH.account)
        .then((res) => setAccount(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onView = data => {
    navigate(`/account/view`, { state: data })
  };

  return (
    <>
      <ListLayout title="Accounts" addPath='/account/add' loading={isLoading}>
        <div className="grid grid-cols-2 gap-3">
          {account.map((item, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: item.color }}
              className="bg-white shadow-sm p-4 rounded-lg"
              onClick={() => onView(item)}
            >
              <p className="mb-5 text-slate-900">{item.name}</p>
              <b className="text-3xl text-slate-950">{item.balance}</b>
            </div>
          ))}
        </div>
      </ListLayout>
      <Outlet />
    </>
  );
};

export default AccountList;
