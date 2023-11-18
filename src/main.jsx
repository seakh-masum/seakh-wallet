import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { getTodaysData } from './shared/utils';
import Loading from './components/features/Loading';
// import SnackbarProvider from './contexts/snackbar.context';


const CardPage = lazy(() => import('./pages/cards/CardPage'))
const AddCardPage = lazy(() => import('./pages/cards/AddCardPage'));
const PasscodePage = lazy(() => import('./pages/passcode/PasscodePage'));

const existingPassword = localStorage.getItem('seakh_passcode') || '';
const checkLoggedIn = () => {
  return Number(existingPassword) == Number(getTodaysData());
}

console.log(checkLoggedIn())

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PasscodePage />,
//   },
//   {
//     path: "/card",
//     element: { existingPassword == getTodaysData() ? (<CardPage />
//     ) : (<Navigate replace to={"/"} />)
//   },
//   },
// { path: '/card/add', element: <AddCardPage /> },
// { path: '/card/edit', element: <AddCardPage /> },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      {/* <SnackbarProvider> */}
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={<PasscodePage />} />
          <Route path="/card"
            element={checkLoggedIn() ? (<CardPage />
            ) : (<Navigate replace to={"/"} />)} />
          <Route path="/card/add"
            element={<AddCardPage />} />
          <Route path="/card/edit"
            element={<AddCardPage />} />
        </Routes>
      </BrowserRouter>
      {/* </SnackbarProvider> */}
    </Suspense>
  </React.StrictMode>,
)

