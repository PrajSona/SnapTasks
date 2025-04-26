import React, { useContext, useState } from 'react'
import { Data } from '../../Context/DataProvider'

const createMember = () => {
  const [empName, setEmpName] = useState("")
  const [empEmail, setEmpEmail] = useState("")
  const [empPw, setEmpPw] = useState("")
  const {createEmployee} = useContext(Data)

  const handleCreateMember = (e) => {
    e.preventDefault();

    if(empEmail === "praj@admin.com") {
      alert("Can't use admin email")
      setEmpName("")
      setEmpEmail("")
      setEmpPw("")
      return 
    } else {
      createEmployee(empName, empEmail, empPw);
      setEmpName("")
      setEmpEmail("")
      setEmpPw("")
    }
  }

  return (
    <div className='bg-transparent w-full flex justify-center items-center py-16'>
      <div className='bg-[#ffffff] shadow-xl w-2/5 rounded-lg flex flex-col p-9 gap-8'>
        <div className='text-3xl'>Create Member</div>

        <form onSubmit={handleCreateMember} className='flex gap-9 w-full'>
          <div className='flex flex-col gap-5 w-full'>
            <div className='w-full '>
              <h1 className=''>Name</h1>
              <input type="text" placeholder='Enter name' value={empName} onChange={(e) => {
                setEmpName(e.target.value)
              }} required className='w-full shadow-sm border border-[#c4b199] p-1.5 outline-none' />
            </div>
            <div>
              <h1 className=''>Email</h1>
              <input type="email" placeholder='Enter email' value={empEmail} onChange={(e) => {
                setEmpEmail(e.target.value)
              }} required className='w-full shadow-sm border border-[#c4b199] p-1.5 outline-none' />
            </div>
            <div>
              <h1 className=''>Password</h1>
              <input type="text" placeholder='Enter password' value={empPw} onChange={(e) => {
                setEmpPw(e.target.value)
              }} required className='w-full shadow-sm border border-[#c4b199] p-1.5 outline-none' />
            </div>
            <div>
              <input type="submit" value='Add' className='w-full bg-[#F4A300] shadow-md text-white p-1.5 rounded-md' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default createMember