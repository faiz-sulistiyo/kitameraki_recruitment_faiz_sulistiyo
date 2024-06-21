import React from "react"
import Header from "../common/Header"
import Sidebar from "../common/Sidebar"
import {Outlet} from "react-router-dom"

const BaseLayout: React.FC = () => {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="relative flex-1 min-h-screen">
        <Header />
        <main className="p-4 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default BaseLayout
