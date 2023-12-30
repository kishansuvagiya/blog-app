import { IconButton } from "@material-tailwind/react";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { setStatus, STATUSES } from '../../store/BlogSlice'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";

function Userdata() {
    const [data, setData] = useState([])
    const { status } = useSelector(state => state.blog)
    const dispatch = useDispatch()
    const token = localStorage.getItem('admin-token')
    useEffect(() => {
        fetchUserdata()
    }, [])
    const fetchUserdata = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await axios.get("https://blog-api-azqx.onrender.com/admin/users", {
                headers: { Authorization: token }
            })
            setData(res.data.data)
            dispatch(setStatus(STATUSES.IDLE))
            console.log(res);
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    const deleteUser = async (id, index) => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await axios.delete(`https://blog-api-azqx.onrender.com/admin/userdelete?id=${id}`, {
                headers: { Authorization: token }
            })
            const copyData = [...data]
            copyData.splice(index, 1)
            setData(copyData)
            dispatch(setStatus(STATUSES.IDLE))
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(res);
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    return (
        <div>
            <h2 className='font-medium text-black dark:text-white text-3xl'>Userdata</h2>
            <table className='w-full table-auto  mt-6 text-black dark:text-white text-lg'>
                <thead>
                    <tr className='border-2'>
                        <th className='py-3'>Username</th>
                        <th className='py-3'>Full name</th>
                        <th className='py-3'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {status === STATUSES.LOADING ?
                        <>
                            <div className="loader-container">
                                <span class="loader"></span>
                            </div>
                        </> :
                        data.map((item, index) => {
                            return (
                                <tr className='border-2 text-center' key={index}>
                                    <td className='py-2'>{item.username}</td>
                                    <td className='py-2'>{item.fullname}</td>
                                    <td className='py-2'> <IconButton className="rounded-full  hover:bg-red-600" onClick={() => deleteUser(item._id, index)}><i className="fa-solid fa-trash"></i></IconButton> </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Userdata