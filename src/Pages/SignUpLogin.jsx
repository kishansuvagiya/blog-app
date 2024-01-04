import React, { useState } from 'react'
import '../styles/SignUpLogin.css'
import loginimg from './other/loginimg.svg'
import signupimg from './other/signupimg.svg'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@material-tailwind/react';

const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Fullname is Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is Required'),
    password: Yup.string()
        .min(6, 'Minimum 6 character required')
        .required('Password is Required'),
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{6,99}$/,
    //     'Must contain at least 6 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number'
    //   ),
    cpassword: Yup.string()
        .required('Confirm Password is Required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Email is Required'),
    password: Yup.string()
        .min(6, 'Minimum 6 character required')
        .required('Password is Required')
});

function SignUpLogin() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [signUpValue, setSignUpValues] = useState({
        fullname: '',
        email: '',
        password: '',
    })
    const [loginValue, setLoginValue] = useState({
        email: '',
        password: '',
    })

    const createNewUser = async (values) => {
        setIsLoading(true);
        try {
            const res = await axios.post('https://blog-api-azqx.onrender.com/user/signup', values)
            if (res.data.status == 'success') {
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('author', res.data.data._id)
            localStorage.setItem('user', res.data.data.fullname)
            console.log(res);
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
            setIsLoading(false);
        }
    }

    const loginUser = async (values) => {
        setIsLoading(true);
        try {
            const res = await axios.post('https://blog-api-azqx.onrender.com/user/login', values)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('author', res.data.data._id)
            localStorage.setItem('user', res.data.data.fullname)
            if (res.data.status == 'success') {
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
            // console.log(res.data.token);
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
        }
        catch (error) {
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

    const signUp = () => {
        const container = document.getElementById("container");
        container.classList.add("sign-up-mode");
    }
    const Login = () => {
        const container = document.getElementById("container");
        container.classList.remove("sign-up-mode");
    }

    return (
        <div>
            <div className="signUpLogin" id='container'>
                <div className="forms-container">
                    <div className="signin-signup">

                        {/* ----------------------Login--------------------------- */}
                        <Formik
                            initialValues={loginValue}
                            validationSchema={loginSchema}
                            onSubmit={async (values) => {
                                await loginUser(values)
                                // action.resetForm()
                                setLoginValue({
                                    email: '',
                                    password: '',
                                })
                            }}
                        >
                            <Form className="sign-in-form">
                                <h2 className="title ml-32">Sign in</h2>
                                <div className="input-field">
                                    <i className="fas fa-user" />
                                    <Field type="text" name='email' placeholder="Email" />
                                </div>
                                <div className='errormsg'><ErrorMessage name='email' /></div>
                                <div className="input-field">
                                    <i className="fas fa-lock" />
                                    <Field type="password" name='password' placeholder="Password" />
                                </div>
                                <div className='errormsg'><ErrorMessage name='password' /></div>
                                <br />
                                <div className=' -mt-4'>
                                    <Link to='/forgot-password' className='text-[#583bc4] font-semibold hover:text-[#402d85]'>Forgot Password ?</Link>
                                </div>
                                <div className='ml-32'>
                                    {isLoading ?
                                        <Button disabled className="btn bg-[#4212ee]"><i className="fa-solid fa-circle-notch fa-spin"></i> loading</Button> :
                                        <Button type="submit" defaultValue="Login" className="btn bg-[#4212ee] hover:bg-[#583bc4]"> sign in </Button>}
                                </div>
                            </Form>
                        </Formik>

                        {/* ------------------------Sign up-------------------------------- */}
                        <Formik
                            initialValues={signUpValue}
                            validationSchema={SignupSchema}
                            onSubmit={async (values) => {
                                await createNewUser(values)
                                // action.resetForm()
                                setSignUpValues({
                                    fullname: '',
                                    email: '',
                                    password: '',
                                })
                            }}
                        >
                            <Form className="sign-up-form">
                                <h2 className="title ml-32">Sign up</h2>
                                <div className="input-field">
                                    <i className="fas fa-user" />
                                    <Field type="text" name='fullname' placeholder="Fullname" />
                                </div>
                                <div className='errormsg'><ErrorMessage name='fullname' /></div>
                                <div className="input-field">
                                    <i className="fas fa-user" />
                                    <Field type="text" name='email' placeholder="Email" />
                                </div>
                                <div className='errormsg'><ErrorMessage name='email' /></div>

                                <div className="input-field">
                                    <i className="fas fa-lock" />
                                    <Field type="password" name='password' placeholder="Password" />
                                </div>
                                <div className='errormsg'><ErrorMessage name='password' /></div>
                                <div className="input-field">
                                    <i className="fas fa-lock" />
                                    <Field type="password" name='cpassword' placeholder="Confirm Password" />
                                </div>
                                <div className='errormsg'><ErrorMessage name='cpassword' /></div>
                                <br />
                                <div className='ml-32'>
                                    {isLoading ?
                                        <Button disabled className="btn bg-[#4212ee]"><i className="fa-solid fa-circle-notch fa-spin"></i> loading</Button> :
                                        <Button type="submit" defaultValue="Login" className="btn bg-[#4212ee] hover:bg-[#583bc4]"> sign up </Button>}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p className='text-lg'>
                                Join us today! Create your account to get started.
                            </p>
                            <button className="btn transparent" id="sign-up-btn" onClick={signUp}>
                                Sign up
                            </button>
                        </div>
                        <img src={signupimg} className="image" alt />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p className='text-lg'>
                                Unlock the possibilities. Log in to your account.
                            </p>
                            <button className="btn transparent mb-5" id="sign-in-btn" onClick={Login}>
                                Sign in
                            </button>
                        </div>
                        <img src={loginimg} className="image" alt />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUpLogin