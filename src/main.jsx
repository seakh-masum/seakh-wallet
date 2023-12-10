import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'
import { getTodaysData } from './shared/utils'
import Loading from './components/features/Loading'

const CardListPage = lazy(() => import('./pages/cards/CardList'))
const CardUpsertPage = lazy(() => import('./pages/cards/CardUpsert'))
const CardViewPage = lazy(() => import('./pages/cards/CardView'))
const PasscodePage = lazy(() => import('./pages/passcode/PasscodePage'))
const DocListPage = lazy(() => import('./pages/docs/DocList'))
const DocUpsertPage = lazy(() => import('./pages/docs/DocUpsert'))
const DocDeletePage = lazy(() => import('./pages/docs/DocDelete'))
const AccountUpsertPage = lazy(() => import('./pages/account/AccountUpsert'))
const AccountListPage = lazy(() => import('./pages/account/AccountList'))
const TransactionListPage = lazy(() =>
  import('./pages/transaction/TransactionList')
)
const TransactionUpsertPage = lazy(() =>
  import('./pages/transaction/TransactionUpsert')
)
const LedgerListPage = lazy(() => import('./pages/ledger/LedgerList'))
const LedgerCustomerAddPage = lazy(() =>
  import('./pages/ledger/LedgerCustomerAdd')
)
const LedgerTransactionAddPage = lazy(() =>
  import('./pages/ledger/LedgerTransactionAdd')
)
const LedgerDetailsPage = lazy(() => import('./pages/ledger/LedgerDetails'))

const checkAuthorize = () => {
  const existingPassword = localStorage.getItem('seakh_passcode') || ''
  return Number(existingPassword) == Number(getTodaysData());
}


const router = createBrowserRouter([
  { path: '/', element: <Navigate replace to={'/card'} /> },
  {
    path: '/card',
    element: checkAuthorize() ? (
      <CardListPage />
    ) : (
      <PasscodePage />
    ),
    children: [
      { path: 'view', element: <CardViewPage /> }
    ]
  },
  { path: '/card/add', element: <CardUpsertPage /> },
  { path: '/card/edit', element: <CardUpsertPage /> },
  // { path: '/card/view', element: <CardViewPage /> },

  {
    path: '/account',
    element: <AccountListPage />,
  },
  { path: '/account/add', element: <AccountUpsertPage /> },
  { path: '/account/edit', element: <AccountUpsertPage /> },

  {
    path: '/transaction',
    element: <TransactionListPage />,
  },
  { path: '/transaction/add', element: <TransactionUpsertPage /> },
  { path: '/transaction/edit', element: <TransactionUpsertPage /> },

  {
    path: '/docs',
    element: <DocListPage />,
  },
  { path: '/docs/add', element: <DocUpsertPage /> },
  {
    path: '/docs/edit', element: <DocUpsertPage />, children: [
      { path: 'delete', element: <DocDeletePage /> }
    ]
  },

  {
    path: '/ledger',
    element: <LedgerListPage />,
  },
  {
    path: '/ledger/add',
    element: <LedgerCustomerAddPage />,
  },
  {
    path: '/ledger/details/:id',
    element: <LedgerDetailsPage />,
  },
  {
    path: '/ledger/:customerId/:ledgerType',
    element: <LedgerTransactionAddPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
)
