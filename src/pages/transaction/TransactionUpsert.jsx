import { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TabGroup from "../../components/ui/TabGroup";
import Select from "../../components/ui/Select";
import InputBox from "../../components/ui/InputBox";
import { FIRESTORE_PATH, TRANSACTION_TYPE } from "../../shared/constant";
import { addFirestoreData, getFirestoreData, updateFireStoreData } from "../../services/firebase";
import FormLayout from "../../layouts/FormLayout";

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
    const data = await getFirestoreData(FIRESTORE_PATH.account, 'name');
    setFromAccountList(data);
    setToAccountList(data);
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
        const filteredList = data.filter((x) => x.id !== fromAccount.id);
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
      created: new Date().toISOString(),
      transactionType: selectedTabIndex,
      fromAccount: fromAccount.id,
    };

    if (selectedTabIndex == TRANSACTION_TYPE.Transfer)
      data.toAccount = toAccount.id;

    try {
      await addFirestoreData(FIRESTORE_PATH.transaction, data)
        .then(() => {
          if (selectedTabIndex == TRANSACTION_TYPE.Income) {
            transactionBalance(
              parseInt(fromAccount.balance) + parseInt(values.amount)
            );
          } else if (selectedTabIndex == TRANSACTION_TYPE.Expense) {
            transactionBalance(
              parseInt(fromAccount.balance) - parseInt(values.amount)
            );
          } else {
            transactionBalance(
              parseInt(fromAccount.balance) - parseInt(values.amount)
            );
            transactionBalance(
              parseInt(toAccount.balance) + parseInt(values.amount),
              true
            );
          }
          alert("Transaction Successfull!!");
        })
        .catch((error) => {
        });
    } catch (err) {
      alert(err);
    }
  };

  const transactionBalance = async (amount, isToAccount = false) => {
    await updateFireStoreData(FIRESTORE_PATH.account, { balance: amount }, isToAccount ? toAccount.id : fromAccount.id)
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
    return "id" in obj;
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
            {/* <button
              disabled={checkFormValidation(isValid)}
              className="bg-neutral-950 dark:bg-white text-white dark:text-black uppercase w-full p-4 rounded-full shadow-2xl text-xl font-semibold disabled:bg-slate-700 disabled:text-slate-300 disabled:shadow-none dark:shadow-none"
              type="submit"
              onClick={() => onSave(values)}
            >
              Save
            </button> */}
          </TabGroup>
        </FormLayout>
      )}
    </Formik>
  );
};

export default TransactionUpsert;
