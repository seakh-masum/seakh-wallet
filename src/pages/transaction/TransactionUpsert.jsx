import { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TabGroup from "../../components/ui/TabGroup";
import Select from "../../components/ui/Select";
import InputBox from "../../components/ui/InputBox";
import { FIRESTORE_PATH, TRANSACTION_TYPE } from "../../shared/constant";
import FormLayout from "../../layouts/FormLayout";
import { getAPI, postAPI } from "../../shared/utils";

const amountSchema = Yup.number()
  .required("Balance is required")
  .positive("Balance should be positive")
  .min(1, "Balance must be more than zero");

let transactionSchema = Yup.object().shape({
  category: Yup.string()
    .matches(/^[A-Za-z\s\-']+$/, "Account Name is invalid")
    .min(2, "Account Name must be more than 2 characters")
    .max(70, "Account Name must be less than 70 characters")
    .required("Account Name is required"),

  amount: amountSchema,
});

const TransactionUpsert = () => {
  const [title, setTitle] = useState('Add Transaction');
  const [fromAccountList, setFromAccountList] = useState([]);
  const [toAccountList, setToAccountList] = useState([]);
  const [fromAccount, setFromAccount] = useState({});
  const [toAccount, setToAccount] = useState({});
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    getAccountList();
  }, []);

  const getAccountList = async () => {
    try {
      await getAPI(FIRESTORE_PATH.account)
        .then((res) => {
          setFromAccountList(res);
          setToAccountList(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useMemo(() => {
    if (selectedTabIndex != TRANSACTION_TYPE.Income) {
      transactionSchema = transactionSchema.concat(
        Yup.object().shape({
          amount: amountSchema.max(
            fromAccount.balance,
            "Balance should be less than bank balance"
          ),
        }),
        transactionSchema
      );

      if (selectedTabIndex === TRANSACTION_TYPE.Transfer) {
        let data = toAccountList;
        if (fromAccountList.length > toAccountList.length) {
          data = fromAccountList;
        }
        const filteredList = data.filter((x) => x._id !== fromAccount._id);
        setToAccountList(filteredList);
      }
    } else {
      transactionSchema = transactionSchema.concat(
        Yup.object().shape({
          amount: amountSchema,
        }),
        transactionSchema
      );
    }
  }, [fromAccount, selectedTabIndex]);

  const onSave = async (values) => {
    const data = {
      ...values,
      type: selectedTabIndex,
      fromAccount: fromAccount._id,
    };

    if (selectedTabIndex == TRANSACTION_TYPE.Transfer)
      data.toAccount = toAccount._id;

    try {
      await postAPI(FIRESTORE_PATH.transaction, data)
        .then((data) => alert(data.message))
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const onChangeAccount = (value, type) => {
    if (type == "from") {
      setFromAccount(value);
      setToAccount({});
    } else {
      setToAccount(value);
    }
  };

  const checkAccountSelected = (obj) => {
    return "_id" in obj;
  };

  const checkFormValidation = (isValid) => {
    const commonValidation = !isValid || !checkAccountSelected(fromAccount);
    if (selectedTabIndex == TRANSACTION_TYPE.Transfer) {
      return commonValidation || !checkAccountSelected(toAccount);
    }

    return commonValidation;
  };

  return (
    <Formik
      initialValues={{ category: "", amount: "" }}
      validationSchema={transactionSchema}
    >
      {({ values, handleChange, errors, isValid }) => (
        <FormLayout handleSubmit={() => onSave(values)} title={title} isValid={checkFormValidation(isValid)}>
          <TabGroup
            tabs={Object.keys(TRANSACTION_TYPE)}
            setSelectedTabIndex={setSelectedTabIndex}
          >
            <div className="flex flex-col gap-5 mb-8">
              <Select
                selected={fromAccount}
                options={fromAccountList}
                label="From"
                onChange={(e) => onChangeAccount(e, "from")}
                hasError={!checkAccountSelected(fromAccount)}
                errorMessage={"Please select an account"}
              />
              {selectedTabIndex == TRANSACTION_TYPE.Transfer && (
                <>
                  <Select
                    selected={toAccount}
                    options={toAccountList}
                    label="To"
                    onChange={(e) => onChangeAccount(e, "to")}
                    hasError={!checkAccountSelected(toAccount)}
                    errorMessage={"Please select an account"}
                  />
                </>
              )}
              <InputBox
                name="category"
                label="Category"
                placeholder="Enter Category"
                value={values.category}
                onChange={handleChange}
                errors={errors.category}
              />
              <InputBox
                label="Amount"
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={values.amount}
                onChange={handleChange}
                errors={errors.amount}
              />
            </div>
          </TabGroup>
        </FormLayout>
      )}
    </Formik>
  );
};

export default TransactionUpsert;
