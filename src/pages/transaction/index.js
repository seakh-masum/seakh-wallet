import { lazy } from 'react'

const TransactionListPage = lazy(() => import('./TransactionList'))
const TransactionUpsertPage = lazy(() => import('./TransactionUpsert'))

export { TransactionListPage, TransactionUpsertPage }
