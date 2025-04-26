import React from 'react'
import Header from '../Others/Header'
import AdminDisplay from '../AdminComponents/AdminDisplay'

const Admin = ({logout}) => {
  return (
    <>
      <Header logout = {logout} userData={"Admin"}/>
      <AdminDisplay />
    </>
  )
}

export default Admin