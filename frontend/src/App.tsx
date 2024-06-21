import {RouterProvider, createBrowserRouter} from "react-router-dom"
import {routes} from "./routes"
import {ToastContainer} from "react-toastify"
import React from "react"
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter(routes)
  initializeIcons();
  return (
    <React.Fragment>
      <ToastContainer />
      <RouterProvider router={router} />
    </React.Fragment>
  )
}

export default App
