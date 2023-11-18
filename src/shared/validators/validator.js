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
        .matches( /^[0-9]+$/, 'Expiry Month should be number')
        .required('Expiry Month is required'),
    expiryYear: Yup.string()
        .max(2, 'Expiry Year should be 2 characters')
        .min(2, 'Expiry Year should be 2 characters')
        .matches( /^[0-9]+$/, 'Expiry Month should be number')
        .required('Expiry Year is required'),
    cvv: Yup.string()
        .max(3, 'CVV should be 3 characters')
        .min(3, 'CVV should be 3 characters')
        .matches( /^[0-9]+$/, 'Expiry Month should be number')
        .required('CVV is required'),
    holderName: Yup.string()
        .matches(/^[A-Za-z-']+( [A-Za-z-']+)*$/, 'Holder Name is invalid')
        .min(2, 'Holder Name must be more than 2 characters')
        .max(30, 'Holder Name must be upto 30 characters')
});

export { CardValidationSchema };