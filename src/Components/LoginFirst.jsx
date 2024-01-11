import React from 'react'
import {
    Button
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const LoginFirst = () => {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen'>
            <div className='pt-40'>
                <div >
                    <h2 className='text-center text-3xl font-semibold mb-8  dark:text-white'>For Create Blog, You need to Login First</h2>
                </div>
                <div className='text-center'>
                    <Button onClick={() => navigate('/login')}>Login Here</Button>
                </div>
            </div>
        </div>
    )
}

export default LoginFirst