import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
// import { db } from "./firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
// import InputBox from "./InputBox";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postAPI } from "../../shared/utils";
import InputBox from "../../components/ui/InputBox";
import { LEDGER_TYPE } from "../../shared/constant";
import FormLayout from "../../layouts/FormLayout";

const ledgerValidationSchema = Yup.object().shape({
  details: Yup.string()
    .matches(/^[A-Za-z\s\-']+$/, "Details is invalid")
    .min(2, "Details must be more than 2 characters")
    .max(70, "Details must be less than 70 characters")
    .required("Details is required"),
  amount: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Balance is invalid")
    .required("Balance is required"),
});

const LedgerTransactionAdd = () => {
  const { customerId, ledgerType } = useParams();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const form = useFormik({
    initialValues: {
      details: "",
      amount: "",
    },
    validationSchema: ledgerValidationSchema,
  });
  const isoDate = new Date().toISOString();

  useEffect(() => {
    setTitle("check");
    if (state) {
      const title =
        ledgerType == LEDGER_TYPE.borrow
          ? `Give $${form.values.amount}`
          : `Get $${form.values.amount}`;
      setTitle(title);
    }

    return () => { };
  }, [form.values.amount]);

  const onSave = async () => {
    // const { accountNo, branch, holderName, ifsc, name, amount } = formValues;
    // console.log(params);

    // const { amount } = form.values;
    // let balance = 0;
    // let data = {
    //   ...form.values,
    //   customerId,
    //   ledgerType,
    //   created: isoDate,
    // };

    // if (ledgerType == LEDGER_TYPE.borrow) {
    //   balance = state.balance - amount;
    // } else {
    //   balance = state.balance + amount;
    // }
    // console.log({ data, balance, stateBalance: state.balance });
    // transactionBalance(amount);

    if (form.isValid) {
      // try {
      //   await addDoc(collection(db, "ledger-transaction"), data).then(
      //     transactionBalance(balance)
      //   );
      // } catch (err) {
      //   alert(err);
      // }
      try {
        await postAPI(
          `ledger-transaction/${ledgerType}/${customerId}`,
          form.values
        )
          .then((data) => alert(data.message))
          .catch((error) => console.error("Error:", error));
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    }
  };

  const transactionBalance = (amount) => {
    // const fromAccountRef = doc(db, "ledger-customer", customerId);
    // updateDoc(fromAccountRef, {
    //   balance: amount,
    //   lastUpdated: isoDate,
    // });
  };

  return (
    <FormLayout handleSubmit={() => onSave()} title={state} buttonTitle={title} buttonType={ledgerType == LEDGER_TYPE.borrow ? "error" : "success"}>
      <InputBox
        label="Balance"
        type="number"
        name="amount"
        placeholder="Enter Balance"
        value={form.values.amount}
        onChange={form.handleChange}
        errors={form.errors.amount}
      />
      {form.values.amount != 0 && (
        <InputBox
          label="Details"
          type="text"
          name="details"
          placeholder="Enter Details"
          value={form.values.details}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          onKeyUp={form.handleChange}
          errors={form.errors.details}
        />
      )}
    </FormLayout>
  );
};

export default LedgerTransactionAdd;
