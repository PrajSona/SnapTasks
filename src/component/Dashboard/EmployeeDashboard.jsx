import React, { useContext, useEffect, useState } from 'react'
import Header from '../Others/Header'
import EmployeeDisplay from '../EmployeeComponents/EmployeeDisplay'
import { Data } from '../../Context/DataProvider';

const Employee = ({ logout }) => {

  const { getUserDetails, userId, dbReady } = useContext(Data);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("login") == "Admin") {
        setUserData("Admin")
      } else {
        const id = JSON.parse(localStorage.getItem("login")).id
        const data = await getUserDetails(id);
        await setUserData(data);
      }
    };
    fetchUser();
  }, [userId, getUserDetails, dbReady]);

  return (
    <>
      <Header logout={logout} userData = {userData}/>
      <EmployeeDisplay userData = {userData}/>
    </>
  )
}

export default Employee