import { useFormik } from "formik";
import * as Yup from "yup";
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
    if (form.isValid) {
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
