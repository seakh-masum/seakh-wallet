import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import { Switch } from "@headlessui/react";
import InputBox from "../../components/ui/InputBox";
import ColorBox from "../../components/features/ColorBox";
import { COLORS, FIRESTORE_PATH } from "../../shared/constant";
import FormLayout from "../../layouts/FormLayout";
import { accountValidationSchema, bankValidationSchema } from "../../shared/validator";
import { useLocation } from "react-router-dom";
import { updateFireStoreData } from "../../services/firebase";
import { postAPI } from "../../shared/utils";

// let newSchema = Yup.object().shape({
//   name: Yup.string()
//     .matches(/^[A-Za-z\s\-']+$/, "Account Name is invalid")
//     .min(2, "Account Name must be more than 2 characters")
//     .max(70, "Account Name must be less than 70 characters")
//     .required("Account Name is required"),
//   balance: Yup.string()
//     .matches(/^\d+(\.\d{1,2})?$/, "Balance is invalid")
//     .required("Balance is required"),
//   accountNo: Yup.string()
//     .matches(/^\d{9,18}$/, "Account No should be 9-18 digits"),
//   // .required("Account No is required"),
//   holderName: Yup.string()
//     .matches(/^[A-Za-z\s\-']+$/, "Holder name is invalid")
//     .min(2, "Holder Name must be more than 2 characters")
//     .max(70, "Holder Name must be less than 70 characters"),
//   ifsc: Yup.string()
//     .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "IFSC Code is invalid")
//   // .required("IFSC Code is required"),
// });

const AccountUpsert = () => {
  const { state } = useLocation();
  const [id, setId] = useState('');
  const [color, setColor] = useState("#fecaca");
  const [enabled, setEnabled] = useState(false);
  const [title, setTitle] = useState('Add Account');
  const [values, setValues] = useState({
    name: "",
    balance: "",
  });


  useEffect(() => {
    if (state) {
      setValues(prevState => ({ ...prevState, ...state }));
      setTitle('Edit Account');
      setId(state.id);
      setColor(state.color);
    }

  }, []);

  // useMemo(() => {
  //   if (enabled) {
  //     setValues((prevState) => ({
  //       ...prevState,
  //       branch: "",
  //       accountNo: "",
  //       ifsc: "",
  //       holderName: "",
  //     }));
  //     newSchema = newSchema.concat(
  //       bankValidationSchema,
  //       accountValidationSchema
  //     );
  //   } else {
  //     newSchema = accountValidationSchema;
  //     setValues({
  //       name: "",
  //       balance: "",
  //     });
  //   }
  // }, [enabled]);

  const onSave = async (formValues) => {
    console.log(formValues)
    // const { accountNo, branch, holderName, ifsc, name, balance } = formValues;

    let data = {
      name: formValues.name,
      balance: formValues.balance,
      color: formValues.color,
      created: new Date().toISOString(),
    };

    // if (enabled) {
    //   data = {
    //     ...data,
    //     accountNo: formValues.accountNo,
    //     branch: formValues.branch,
    //     holderName: formValues.holderName,
    //     ifsc: formValues.ifsc,
    //   };
    // }

    // try {
    //   if (id) {
    //     await updateFireStoreData(FIRESTORE_PATH.account, data, id).then(() => {
    //       // setSnackbarMsg('Card updated successfully!')
    //       // setShowSnackbar(true);
    //       navigate('/account');
    //     }).catch();
    //   }
    //   else {
    //     await addFirestoreData(FIRESTORE_PATH.account, data)
    //       .then(() => {
    //         // setSnackbarMsg('Account added successfully!')
    //         // setShowSnackbar(true);
    //         navigate('/account');
    //       })
    //       .catch();
    //   }
    // } catch (err) {
    //   alert(err);
    // }
    console.log(data)

    // try {
    //   await postAPI(FIRESTORE_PATH.account, data)
    //     .then((data) => navigate('/account'))
    //     .catch((error) => console.error("Error:", error));
    // } catch (error) {
    //   console.error("Error during POST request:", error);
    // }
  };

  return (
    <Formik initialValues={{
      name: "",
      balance: "",
      branch: "",
      accountNo: "",
      ifsc: "",
      holderName: "",
    }}
    // validationSchema={newSchema}
    >
      {({ values, errors, handleChange, isValid }) => (
        <FormLayout handleSubmit={() => onSave(values)} title={title} isValid={isValid}>
          <InputBox
            label="Account Name"
            type="text"
            name="name"
            placeholder="Enter Account Name"
            value={values.name}
            onChange={handleChange}
            errors={errors.name}
          />
          <InputBox
            label="Current Balance"
            type="number"
            name="balance"
            placeholder="Enter Current Balance"
            value={values.balance}
            onChange={handleChange}
            errors={errors.balance}
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
                value={values.accountNo}
                onChange={handleChange}
                errors={errors.accountNo}
              />
              <InputBox
                label="IFSC Code"
                type="text"
                name="ifsc"
                placeholder="Enter IFSC Code"
                value={values.ifsc}
                onChange={handleChange}
                errors={errors.ifsc}
              />

              <InputBox
                label="Branch Name"
                type="text"
                name="branch"
                placeholder="Enter Branch Name"
                value={values.branch}
                onChange={handleChange}
                errors={errors.branch}
              />
              <InputBox
                label="Holder Name"
                type="text"
                name="holderName"
                placeholder="Enter Account Holder Name"
                value={values.holderName}
                onChange={handleChange}
                errors={errors.holderName}
              />
            </>
          )}

          <ColorBox data={COLORS} setValue={setColor} value={color} />
        </FormLayout>
      )}
    </Formik>
  );
};

export default AccountUpsert;
