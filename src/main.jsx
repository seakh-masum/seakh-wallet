import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { getTodaysData } from './shared/utils';
import Loading from './components/features/Loading';


const CardListPage = lazy(() => import('./pages/cards/CardList'));
const CardUpsertPage = lazy(() => import('./pages/cards/CardUpsert'));
const CardViewPage = lazy(() => import('./pages/cards/CardView'));
const PasscodePage = lazy(() => import('./pages/passcode/PasscodePage'));
const DocListPage = lazy(() => import('./pages/docs/DocList'));
const DocUpsertPage = lazy(() => import('./pages/docs/DocUpsert'));
const AccountUpsertPage = lazy(() => import('./pages/account/AccountUpsert'));
const AccountListPage = lazy(() => import('./pages/account/AccountList'));
const TransactionListPage = lazy(() => import('./pages/transaction/TransactionList'));
const TransactionUpsertPage = lazy(() => import('./pages/transaction/TransactionUpsert'));

const existingPassword = localStorage.getItem('seakh_passcode') || '';

const checkLoggedIn = () => {
  return Number(existingPassword) == Number(getTodaysData());
}

console.log(checkLoggedIn())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={<Navigate replace to={"/card"} />} />

          {/* Card */}
          <Route path="/card"
            element={checkLoggedIn() ? (<CardListPage />
            ) : (<PasscodePage />)} />
          <Route path="/card/add"
            element={<CardUpsertPage />} />
          <Route path="/card/edit"
            element={<CardUpsertPage />} />
          <Route path="/card/view"
            element={<CardViewPage />} />

          {/* Account */}
          <Route path="/account"
            element={<AccountListPage />} />
          <Route path="/account/add"
            element={<AccountUpsertPage />} />
          <Route path="/account/edit"
            element={<AccountUpsertPage />} />

          {/* Transaction */}
          <Route path="/transaction"
            element={<TransactionListPage />} />
          <Route path="/transaction/add"
            element={<TransactionUpsertPage />} />
          <Route path="/transaction/edit"
            element={<TransactionUpsertPage />} />

          {/* Docs */}
          <Route path="/docs"
            element={<DocListPage />} />
          <Route path="/docs/add"
            element={<DocUpsertPage />} />
          <Route path="/docs/edit"
            element={<DocUpsertPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)

