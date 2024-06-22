import {RouterProvider, createBrowserRouter} from "react-router-dom"
import {routes} from "./routes"
import {ToastContainer} from "react-toastify"
import React from "react"
import {initializeIcons} from "@fluentui/font-icons-mdl2"
import "react-toastify/dist/ReactToastify.css"
import {FormSettingsProvider} from "./context/formSettingsContext"

function App() {
  const router = createBrowserRouter(routes)
  initializeIcons()
  return (
    <React.Fragment>
      <ToastContainer />
      <FormSettingsProvider>
        <RouterProvider router={router} />
      </FormSettingsProvider>
    </React.Fragment>
  )
}

export default App
