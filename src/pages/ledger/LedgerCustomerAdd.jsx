import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@ui/InputBox";
import FormLayout from "@layouts/FormLayout";
import { LEDGER_TYPE } from "@shared/constant";
import { useNavigate } from "react-router-dom";
import useAPI from "@hooks/useApi";

const ledgerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s\-']+$/, "Customer Name is invalid")
    .min(2, "Customer Name must be more than 2 characters")
    .max(70, "Customer Name must be less than 70 characters")
    .required("Customer Name is required"),
  details: Yup.string()
    .matches(/^[A-Za-z\s\-']+$/, "Details is invalid")
    .min(2, "Details must be more than 2 characters")
    .max(70, "Details must be less than 70 characters")
    .required("Details is required"),
  balance: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Balance is invalid")
    .required("Balance is required"),
});

const inputFields = [
  {
    label: "Customer Name",
    type: "text",
    name: "name",
  },
  {
    label: "Balance",
    type: "number",
    name: "balance",
  },
  {
    label: "Details",
    type: "text",
    name: "details",
  },
];

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
    <FormLayout handleSubmit={() => onSave(LEDGER_TYPE.borrow)} title={'Add Customer'} buttonTitle="You Gave" buttonType="success" hasAnotherButton secondBtnTitle="You Get" secondBtnType='error' handleSecondBtn={() => onSave(LEDGER_TYPE.owe)}>
      {inputFields.map((field, idx) => (
        <InputBox
          key={idx}
          label={field.label}
          type={field.type}
          name={field.name}
          placeholder={`Enter ${field.label}`}
          value={form.values[field.name]}
          onChange={form.handleChange}
          errors={form.errors[field.name]}
        />
      ))}
    </FormLayout>
  );
};

export default LedgerCustomerAdd;
