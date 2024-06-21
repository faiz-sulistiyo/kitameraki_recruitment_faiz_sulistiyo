import React from 'react'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'
import { Outlet } from 'react-router-dom'

const BaseLayout:React.FC = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default BaseLayout