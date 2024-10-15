import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";


const router = createBrowserRouter([
  {path: '/', element: <Signup />}

])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
