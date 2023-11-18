import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const CardPage = lazy(()=> import('./pages/cards/CardPage'))
const AddCardPage = lazy(()=> import('./pages/cards/AddCardPage'));
const PasscodePage = lazy(()=> import('./pages/passcode/PasscodePage'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PasscodePage />,
  },
  {
    path: "/card",
    element: <CardPage />,
  },
  {path: '/card/add', element: <AddCardPage />},
  {path: '/card/edit', element: <AddCardPage />},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<>...Loading</>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)

