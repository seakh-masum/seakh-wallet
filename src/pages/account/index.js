import { lazy } from 'react'

const AccountUpsertPage = lazy(() => import('./AccountUpsert'));
const AccountListPage = lazy(() => import('./AccountList'));
const AccountViewPage = lazy(() => import('./AccountView'));

export { AccountUpsertPage, AccountListPage, AccountViewPage };