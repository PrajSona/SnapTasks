import React, { useState } from 'react'

const Login = ({ loginUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(email, password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className='bg-[#263339] h-screen w-screen flex items-center justify-center'>
            <div className='bg-white shadow-xl h-3/6 w-1/4 rounded-xl'>
                <form onSubmit={handleSubmit} className='h-full w-full flex flex-col justify-center'>
                    <div className='h-1/3 flex justify-center items-center text-3xl'><h1>Login</h1></div>
                    <div className='flex-1 flex flex-col items-center gap-5'>
                        <div className='flex border border-[#263339] rounded-md shadow-md p-2 w-10/12'>
                            <img src="loginUser.svg" alt="user" />
                            <input type="email" placeholder='Username' required value={email} onChange={(e) => {
                                setEmail(e.target.value);
                            }} className='border outline-none p-1 border-none w-full' />
                        </div>
                        <div className='flex border border-[#263339] rounded-md shadow-md p-2 w-10/12'>
                            <img src="loginPassword.svg" alt="user" />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => {
                                setPassword(e.target.value);
                            }} required className='border outline-none p-1 border-none w-full' />
                        </div>
                        <input type="submit" value={"Login"} className='bg-[#fb841f] shadow-xl rounded-md text-white cursor-pointer p-2 w-10/12' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login