import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import InputBox from "../../components/ui/InputBox";
import ColorBox from "../../components/features/ColorBox";
import { COLORS, FIRESTORE_PATH } from "../../shared/constant";
import FormLayout from "../../layouts/FormLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { postAPI, putAPI } from "../../shared/utils";
import { accountValidationSchema } from "../../shared/validator";


const AccountUpsert = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [color, setColor] = useState("#fecaca");
  const [enabled, setEnabled] = useState(false);
  const [title, setTitle] = useState('Add Account');
  const [values, setValues] = useState({
    name: "",
    balance: "",
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      balance: "",
      branch: "",
      accountNo: "",
      ifsc: "",
      holderName: "",
    },
    validationSchema: accountValidationSchema,
  });


  useEffect(() => {
    if (state) {
      formik.setValues(state);
      if ('accountNo' in state) {
        setEnabled(true);
      }
      // setValues(prevState => ({ ...prevState, ...state }));
      setTitle('Edit Account');
      setId(state._id);
      setColor(state.color);
    }
  }, []);

  const onSave = async () => {
    const formValues = formik.values;
    let data = {
      name: formValues.name,
      balance: formValues.balance,
      color
    };


    if (enabled) {
      data = {
        ...data,
        accountNo: formValues.accountNo,
        branch: formValues.branch,
        holderName: formValues.holderName,
        ifsc: formValues.ifsc,
      };
    }

    try {
      if (id) {
        await putAPI(FIRESTORE_PATH.account, data, id)
          .then((res) => {
            navigate('/account');
          })
          .catch((err) => console.log(err));
      } else {
        await postAPI(FIRESTORE_PATH.account, data)
          .then((res) => navigate('/account'))
          .catch((error) => console.error("Error:", error));
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  return (
    <FormLayout handleSubmit={() => onSave()} title={title}>
      <InputBox
        label="Account Name"
        type="text"
        name="name"
        placeholder="Enter Account Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        errors={formik.errors.name}
      />
      <InputBox
        label="Current Balance"
        type="number"
        name="balance"
        placeholder="Enter Current Balance"
        value={formik.values.balance}
        onChange={formik.handleChange}
        errors={formik.errors.balance}
      />
      <div className="flex flex-row gap-2 items-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? "bg-neutral-900 dark:bg-neutral-700" : "bg-slate-500 dark:bg-neutral-400"}
              relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-5" : "translate-x-0"}
                pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <span className="dark:text-white">Bank Account</span>
      </div>
      {enabled && (
        <>
          <InputBox
            label="Account Number"
            type="number"
            name="accountNo"
            placeholder="Enter Account Number"
            value={formik.values.accountNo}
            onChange={formik.handleChange}
            errors={formik.errors.accountNo}
          />
          <InputBox
            label="IFSC Code"
            type="text"
            name="ifsc"
            placeholder="Enter IFSC Code"
            value={formik.values.ifsc}
            onChange={formik.handleChange}
            errors={formik.errors.ifsc}
          />

          <InputBox
            label="Branch Name"
            type="text"
            name="branch"
            placeholder="Enter Branch Name"
            value={formik.values.branch}
            onChange={formik.handleChange}
            errors={formik.errors.branch}
          />
          <InputBox
            label="Holder Name"
            type="text"
            name="holderName"
            placeholder="Enter Account Holder Name"
            value={formik.values.holderName}
            onChange={formik.handleChange}
            errors={formik.errors.holderName}
          />
        </>
      )}

      <ColorBox data={COLORS} setValue={setColor} value={color} />
    </FormLayout>
  )
};

export default AccountUpsert;
