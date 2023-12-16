import { lazy } from 'react'

const DocListPage = lazy(() => import('./DocList'))
const DocUpsertPage = lazy(() => import('./DocUpsert'))
const DocDeletePage = lazy(() => import('./DocDelete'))

export { DocListPage, DocDeletePage, DocUpsertPage }