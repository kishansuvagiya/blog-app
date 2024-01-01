import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [logindata, setLogindata] = useState({
        username: '',
        password: ''
    })

    const loginHandler = (e) => {
        const { name, value } = e.target
        setLogindata({
            ...logindata, [name]: value
        })
    }
    const adminLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            const res = await axios.post("https://blog-api-azqx.onrender.com/admin/login", logindata)
            localStorage.setItem('admin-token', res.data.token)
            toast.success(res.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            if (res.data.status == 'success') {
                navigate('/admin/data')
            }
            console.log(res);
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='h-screen'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                        Admin Login
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={adminLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    name="username"
                                    type="text"
                                    value={logindata.username}
                                    onChange={loginHandler}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-4"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={logindata.password}
                                    onChange={loginHandler}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-4"
                                />
                            </div>
                        </div>

                        <div>
                            {isLoading ?
                                <Button disabled className='w-full bg-indigo-700'>loading . . . </Button>
                                :
                                <Button type='submit' className='w-full bg-indigo-700 hover:bg-indigo-500'>login</Button>
                            }
                        </div>
                    </form>


                </div>
            </div>

        </div>
    )
}

export default Login