import { addDoc, collection } from "firebase/firestore";
// import { db } from "./firebase";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
// import InputBox from "./InputBox";
// import ColorBox from "./ColorBox";
// import { COLORS, LEDGER_TYPE } from "./data";
import { useMemo, useState } from "react";
import { Switch } from "@headlessui/react";
// import { getISODate, postAPI } from "./Utils";
// import Button from "./Button";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import { LEDGER_TYPE } from "../../shared/constant";
import FormLayout from "../../layouts/FormLayout";

const ledgerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s\-']+$/, "Account Name is invalid")
    .min(2, "Account Name must be more than 2 characters")
    .max(70, "Account Name must be less than 70 characters")
    .required("Account Name is required"),
  details: Yup.string()
    .matches(/^[A-Za-z\s\-']+$/, "Account Name is invalid")
    .min(2, "Account Name must be more than 2 characters")
    .max(70, "Account Name must be less than 70 characters")
    .required("Account Name is required"),
  balance: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Balance is invalid")
    .required("Balance is required"),
});

const LedgerCustomerAdd = () => {
  const form = useFormik({
    initialValues: {
      name: "",
      balance: "",
      details: "",
    },
    validationSchema: ledgerValidationSchema,
  });

  const onSave = async (formValues, ledgerType) => {
    // const { name, balance, details } = formValues;
    // const amount = ledgerType === LEDGER_TYPE.borrow ? -balance : balance;

    // let data = {
    //   name,
    //   balance: amount,
    //   details:
    //   // lastUpdated: getISODate(),
    // };

    // const transactionData = {
    //   details,
    //   ledgerType,
    //   amount,
    //   created: getISODate(),
    // };

    // if (form.isValid) {
    //   try {
    //     await addDoc(
    //       collection(db, `ledger-customer/${ledgerType}`),
    //       data
    //     ).then(async (doc) => {
    //       await addTransaction(doc.id, transactionData).then(() =>
    //         alert("Customer Added!!")
    //       );
    //     });
    //   } catch (err) {
    //     alert(err);
    //   }
    // }

    try {
      await postAPI(`ledger-customer/${ledgerType}`, formValues)
        .then((data) => alert(data.message))
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  // const addTransaction = async (customerId, data) => {
  //   let newData = {
  //     ...data,
  //     customerId,
  //   };
  //   await addDoc(collection(db, "ledger-transaction"), newData);
  // };

  return (
    <FormLayout handleSubmit={() => onSave()} title={'Add Customer'} buttonTitle="You Gave" buttonType="success" hasAnotherButton secondBtnTitle="You Get" secondBtnType='error'>
      <InputBox
        label="Customer Name"
        type="text"
        name="name"
        placeholder="Enter Customer Name"
        value={form.values.name}
        onChange={form.handleChange}
        errors={form.errors.name}
      />
      <InputBox
        label="Balance"
        type="number"
        name="balance"
        placeholder="Enter Balance"
        value={form.values.balance}
        onChange={form.handleChange}
        errors={form.errors.balance}
      />
      <InputBox
        label="Details"
        type="text"
        name="details"
        placeholder="Enter Details"
        value={form.values.details}
        onChange={form.handleChange}
        errors={form.errors.details}
      />
    </FormLayout>
  );
};

export default LedgerCustomerAdd;
