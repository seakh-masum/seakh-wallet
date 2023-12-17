import { useEffect, useState } from "react";
import ListLayout from "@layouts/ListLayout";
import { API_PATH } from "@shared/constant";
import { Outlet, useNavigate } from "react-router-dom";
import { getMockArray } from "@shared/utils";
import BoxCard from "@features/BoxCard";
import useAPI from "@hooks/useApi";

const AccountList = () => {
  const [account, setAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getAPI } = useAPI();

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    try {
      await getAPI(API_PATH.account)
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
      <ListLayout title="Accounts" addPath='/account/add'>
        <div className="grid grid-cols-2 gap-3">
          {
            isLoading ?
              <>
                {getMockArray().map((item, idx) => (
                  <BoxCard key={idx} isLoading={isLoading} />
                ))}
              </> :
              <>
                {account.map((item, idx) => (
                  <BoxCard key={idx} item={item} handleClick={() => onView(item)} />
                ))}
              </>
          }
        </div>
      </ListLayout>
      <Outlet />
    </>
  );
};

export default AccountList;
