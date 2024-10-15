import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/Signup";
import Signin from "./components/Signin";
import ForgotPasswordPage from "./components/ForgotPassword";


const router = createBrowserRouter([
  {path: '/', element: <Signin />},
  {path: '/signup', element: <SignUp />},
  {path: '/forgotpassword', element: <ForgotPasswordPage />}

])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
