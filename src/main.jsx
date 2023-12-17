import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'
import { checkAuthorize } from '@shared/utils'
import Loading from '@features/Loading'
import { AccountListPage, AccountUpsertPage, AccountViewPage } from '@pages/account'
import { CardListPage, CardUpsertPage, CardViewPage } from '@pages/cards';
import { DocDeletePage, DocListPage, DocUpsertPage } from '@pages/docs'
import PasscodePage from '@pages/passcode/PasscodePage'
import { TransactionListPage, TransactionUpsertPage } from '@pages/transaction'
import { LedgerCustomerAddPage, LedgerDetailsPage, LedgerListPage, LedgerTransactionAddPage } from '@pages/ledger'


const router = createBrowserRouter([
  {
    path: '/', element: checkAuthorize() ? (
      <Navigate replace to={'/card'} />
    ) : (
      <PasscodePage />
    )
  },
  {
    path: '/card',
    element: <CardListPage />,
    children: [
      { path: 'view', element: <CardViewPage /> }
    ]
  },
  { path: '/card/add', element: <CardUpsertPage /> },
  { path: '/card/edit', element: <CardUpsertPage /> },

  {
    path: '/account',
    element: <AccountListPage />,
    children: [
      { path: 'view', element: <AccountViewPage /> }
    ]
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
    path: '/docs/:id', element: <DocUpsertPage />, children: [
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
