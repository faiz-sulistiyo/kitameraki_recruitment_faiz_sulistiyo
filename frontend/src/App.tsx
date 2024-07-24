import {RouterProvider, createBrowserRouter} from "react-router-dom"
import {routes} from "./routes"
import {ToastContainer} from "react-toastify"
import React from "react"
import "react-toastify/dist/ReactToastify.css"
import {FormSettingsProvider} from "./context/formSettingsContext"
import {FluentProvider, webLightTheme} from "@fluentui/react-components"

function App() {
  const router = createBrowserRouter(routes)
  return (
    <React.Fragment>
      <ToastContainer />
      <FluentProvider theme={webLightTheme}>
        <FormSettingsProvider>  
          <RouterProvider router={router} />
        </FormSettingsProvider>
      </FluentProvider>
    </React.Fragment>
  )
}

export default App
