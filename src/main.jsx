import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CardPage from './pages/CardPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/card",
    element: <CardPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
