import { lazy } from 'react'

const LedgerListPage = lazy(() => import('./LedgerList'))
const LedgerCustomerAddPage = lazy(() =>
  import('./LedgerCustomerAdd')
)
const LedgerTransactionAddPage = lazy(() =>
  import('./LedgerTransactionAdd')
)
const LedgerDetailsPage = lazy(() => import('./LedgerDetails'))

export {
  LedgerListPage,
  LedgerCustomerAddPage,
  LedgerTransactionAddPage,
  LedgerDetailsPage,
}
