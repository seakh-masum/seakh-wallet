import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@ui/InputBox";
import FormLayout from "@layouts/FormLayout";
import { LEDGER_TYPE } from "@shared/constant";
import { useNavigate } from "react-router-dom";
import useAPI from "@hooks/useApi";

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
  const navigate = useNavigate();
  const { postAPI } = useAPI();

  const form = useFormik({
    initialValues: {
      name: "",
      balance: "",
      details: "",
    },
    validationSchema: ledgerValidationSchema,
  });

  const onSave = async (ledgerType) => {
    try {
      await postAPI(`ledger-customer/${ledgerType}`, form.values)
        .then((data) => { alert(data.message); navigate('/ledger') })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  return (
    <FormLayout handleSubmit={() => onSave(LEDGER_TYPE.borrow)} title={'Add Customer'} buttonTitle="You Gave" buttonType="success" hasAnotherButton secondBtnTitle="You Get" secondBtnType='error' secondBtnValid={() => onSave(LEDGER_TYPE.borrow)}>
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
