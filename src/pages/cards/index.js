import { lazy } from 'react'

const CardListPage = lazy(() => import('./CardList'))
const CardUpsertPage = lazy(() => import('./CardUpsert'))
const CardViewPage = lazy(() => import('./CardView'))

export { CardListPage, CardUpsertPage, CardViewPage };