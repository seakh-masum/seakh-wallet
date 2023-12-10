import * as Yup from "yup";

const CardValidationSchema = Yup.object().shape({
    cardName: Yup.string()
        .min(2, 'Card Name must be upto 30 characters')
        .max(30, 'Card Name must be upto 30 characters')
        .matches(/^[A-Za-z-']+( [A-Za-z-']+)*$/, 'Card Name is invalid')
        .required('Card Name is required'),
    cardNo: Yup.string().min(19, 'Card Number should be 16 characters')
        .max(19, 'Card Number should be 16 characters')
        .required('Card Number is required'),
    expiryMonth: Yup.string()
        .max(2, 'Expiry Month should be 2 characters')
        .min(2, 'Expiry Month should be 2 characters')
        .matches(/^[0-9]+$/, 'Expiry Month should be number')
        .required('Expiry Month is required'),
    expiryYear: Yup.string()
        .max(2, 'Expiry Year should be 2 characters')
        .min(2, 'Expiry Year should be 2 characters')
        .matches(/^[0-9]+$/, 'Expiry Month should be number')
        .required('Expiry Year is required'),
    cvv: Yup.string()
        .max(3, 'CVV should be 3 characters')
        .min(3, 'CVV should be 3 characters')
        .matches(/^[0-9]+$/, 'Expiry Month should be number')
        .required('CVV is required'),
    holderName: Yup.string()
        .matches(/^[A-Za-z-']+( [A-Za-z-']+)*$/, 'Holder Name is invalid')
        .min(2, 'Holder Name must be more than 2 characters')
        .max(30, 'Holder Name must be upto 30 characters')
});

const accountValidationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-z\s\-']+$/, "Account Name is invalid")
        .min(2, "Account Name must be more than 2 characters")
        .max(70, "Account Name must be less than 70 characters")
        .required("Account Name is required"),
    balance: Yup.string()
        .matches(/^\d+(\.\d{1,2})?$/, "Balance is invalid")
        .required("Balance is required"),
    accountNo: Yup.string()
        .matches(/^\d{9,18}$/, "Account No should be 9-18 digits"),
    holderName: Yup.string()
        .matches(/^[A-Za-z\s\-']+$/, "Holder name is invalid")
        .min(2, "Holder Name must be more than 2 characters")
        .max(70, "Holder Name must be less than 70 characters"),
    ifsc: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "IFSC Code is invalid")
});

const bankValidationSchema = Yup.object().shape({
    accountNo: Yup.string()
        .matches(/^\d{9,18}$/, "Account No should be 9-18 digits")
        .required("Account No is required"),
    holderName: Yup.string()
        .matches(/^[A-Za-z\s\-']+$/, "Holder name is invalid")
        .min(2, "Holder Name must be more than 2 characters")
        .max(70, "Holder Name must be less than 70 characters"),
    ifsc: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "IFSC Code is invalid")
        .required("IFSC Code is required"),
})

export { CardValidationSchema, accountValidationSchema, bankValidationSchema };