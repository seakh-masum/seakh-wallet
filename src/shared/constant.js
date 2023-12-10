/* eslint-disable prettier/prettier */
const initialFormData = {
  cardName: '',
  cardNo: '',
  cardType: 'credit',
  color: '#fecaca',
  holderName: '',
  expiryYear: '',
  expiryMonth: '',
  cvv: '',
  network: 'rupay',
};

const CARD_TYPE = [
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' },
];

const CARD_NETWORK = [
  { label: 'Rupay', value: 'rupay' },
  { label: 'VISA', value: 'visa' },
  { label: 'Master Card', value: 'master_card' },
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
  card: 'cards',
  doc: 'docs',
  transaction: 'transactions',
  account: 'account'
}

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
export { initialFormData, CARD_TYPE, CARD_NETWORK, COLORS, INITIAL_DOC_VALUES, FIRESTORE_PATH, TRANSACTION_TYPE, LEDGER_TYPE, CARD_TYPES, NETWORK_TYPES };
