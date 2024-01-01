import { Button } from '@material-tailwind/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import forgotSVG from './other/forgot_password.svg'

function ForgotPassword() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: ''
    })
    const [newData, setNewData] = useState({
        email: data.email,
        otp: '',
        newPassword: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validateOTP, setValidateOTP] = useState(false);

    // ________________ send OTP ________________
    const dataHandler = (e) => {
        const { name, value } = e.target
        setData({
            ...data, [name]: value
        })
        setErrorMessage('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!data.email) {
            setErrorMessage('Email is required.')
            return
        }
        setIsLoading(true)
        try {
            const res = await axios.post('https://blog-api-azqx.onrender.com/user/forgot-password', data)
            if (res.data.status == 'success') {
                setValidateOTP(true)
                setNewData({ email: data.email })
                setErrorMessage('')
            }
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
            setIsLoading(false)
        }

    }

      // ________________ verify OTP and new password ________________
    const newDataHandler = (e) => {
        const { name, value } = e.target
        setNewData({
            ...newData, [name]: value
        })
        setErrorMessage('')
    }
    const otpHandler = async (e) => {
        e.preventDefault()
        if (!newData.otp || !newData.newPassword) {
            setErrorMessage('Otp and New Password are required.')
            return
        }
        setIsLoading(true)
        try {
            const res = await axios.post('https://blog-api-azqx.onrender.com/user/verify-otp', newData)
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
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
            }

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
            setIsLoading(false)
        }

    }
    return (
        <div className="signUpLogin" id='container'>
            <div className='forms-container text-center'>
                <div className="signin-signup">
                    {validateOTP ? null :
                        <form onSubmit={handleSubmit} >
                            <h2 className="title">Forgot Password</h2>
                            <div className="forgot-input-field ">
                                <i className="fas fa-user" />
                                <input type="email" name='email' placeholder="Email" value={data.email} onChange={dataHandler} />
                            </div>
                            {errorMessage && <div className='errormsg'><span>{errorMessage}</span></div>}
                            <div className="text-center">
                                {isLoading ?
                                    <Button disabled className="btn"><i className="fa-solid fa-circle-notch fa-spin"></i> loading</Button> :
                                    <Button type="submit" className="btn"> submit </Button>}
                            </div>
                        </form>}

                    {validateOTP ?
                        <form onSubmit={otpHandler}>
                            <h2 className="title !mb-12">Forgot Password</h2>
                            <div className="forgot-input-field ">
                                <i className="fas fa-user" />
                                <input type="text" name='email' placeholder="Email" value={newData.email} onChange={newDataHandler} disabled />
                            </div>
                            <div className="forgot-input-field">
                                <i className="fas fa-key" />
                                <input type="number" name='otp' placeholder="OTP" value={newData.otp} onChange={newDataHandler} />
                            </div>
                            <div className="forgot-input-field">
                                <i className="fas fa-lock" />
                                <input type="password" name='newPassword' placeholder="New Password" value={newData.newPassword} onChange={newDataHandler} />
                            </div>
                            {errorMessage && <div className='errormsg'><span>{errorMessage}</span></div>}
                            <div className="text-center">
                                {isLoading ?
                                    <Button disabled className="btn"><i className="fa-solid fa-circle-notch fa-spin"></i> loading</Button> :
                                    <Button type="submit" className="btn"> submit </Button>}
                            </div>
                        </form>
                        : null}
                   
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Remember password ?</h3>
                        <p className='text-lg'>
                            Log in to your account.
                        </p>
                        <button className="btn transparent" onClick={() => navigate('/login')} >
                            Sign in
                        </button>
                    </div>
                    <img src={forgotSVG} className="image" alt />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword