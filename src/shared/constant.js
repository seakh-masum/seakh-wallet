/* eslint-disable prettier/prettier */

const TRANSACTION_TYPE = {
  Income: 0,
  Expense: 1,
  Transfer: 2,
};

const LEDGER_TYPE = {
  owe: 0,
  borrow: 1,
}

const CARD_TYPES = {
  Debit: 0,
  Credit: 1,
}

const NETWORK_TYPES = {
  Visa: 0,
  Rupay: 1,
  MasterCard: 2,
}

const initialFormData = {
  cardName: '',
  cardNo: '',
  type: CARD_TYPES.Credit,
  color: '#fecaca',
  holderName: '',
  expiryYear: '',
  expiryMonth: '',
  cvv: '',
  network: NETWORK_TYPES.Rupay,
};


const CARD_TYPE = [
  { label: 'Credit', value: CARD_TYPES.Credit },
  { label: 'Debit', value: CARD_TYPES.Debit },
];

const CARD_NETWORK = [
  { label: 'Rupay', value: NETWORK_TYPES.Rupay },
  { label: 'VISA', value: NETWORK_TYPES.Visa },
  { label: 'Master Card', value: NETWORK_TYPES.MasterCard },
];

const COLORS = [
  '#fecaca',
  '#fed7aa',
  '#fde68a',
  '#fef08a',
  '#d9f99d',
  '#bbf7d0',
  '#a7f3d0',
  '#99f6e4',
  '#a5f3fc',
  '#bae6fd',
  '#bfdbfe',
  '#c7d2fe',
  '#ddd6fe',
  '#e9d5ff',
  '#f5d0fe',
  '#fbcfe8',
  '#fecdd3',
];

const INITIAL_DOC_VALUES = {
  docName: '',
  docType: '',
  docNumber: '',
  color: '#fecaca',
};

const FIRESTORE_PATH = {
  card: 'card',
  doc: 'doc',
  transaction: 'transaction',
  account: 'account',
  ledgerCustomer: 'ledger-customer',
  ledgerTransaction: 'ledger-transaction'
}


export { initialFormData, CARD_TYPE, CARD_NETWORK, COLORS, INITIAL_DOC_VALUES, FIRESTORE_PATH, TRANSACTION_TYPE, LEDGER_TYPE, CARD_TYPES, NETWORK_TYPES };
