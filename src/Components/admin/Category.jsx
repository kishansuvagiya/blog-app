import {
    Button, IconButton, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { deleteCat, fetchBlog, setStatus, STATUSES } from '../../store/BlogSlice'

function Category() {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [catName, setCatName] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [editID, setEditID] = React.useState(-1);
    const [updateID, setUpdateID] = React.useState(-1);
    const { category, status } = useSelector(state => state.blog)
    const token = localStorage.getItem('admin-token')
    const handleOpen = () => {
        setEditID(-1)
        setCatName('')
        setOpen(!open)
    };

    const deleteCategory = async (id, index) => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await axios.delete(`https://blog-api-azqx.onrender.com/category?id=${id}`, {
                headers: { Authorization: token }
            })
            dispatch(deleteCat(index))
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

    const addCategory = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            let catForm = new FormData();
            catForm.append('name', catName)
            catForm.append('image', image)
            const res = await axios.post('https://blog-api-azqx.onrender.com/category', catForm, {
                headers: { "Content-Type": "multipart/form-data", Authorization: token }
            })
            dispatch(fetchBlog())
            // dispatch(setStatus(STATUSES.IDLE))
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

        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    const updateCategory = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            let catForm = new FormData();
            catForm.append('name', catName)
            catForm.append('image', image)
            const res = await axios.put(`https://blog-api-azqx.onrender.com/category?id=${updateID}`, catForm, {
                headers: { "Content-Type": "multipart/form-data", Authorization: token }
            })
            dispatch(fetchBlog())
            // dispatch(setStatus(STATUSES.IDLE))
            setUpdateID(-1)
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

        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }

    const editCatHandler = (item, index) => {
        handleOpen()
        setCatName(item.name)
        setEditID(index)
        setUpdateID(item._id)
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        if (editID == -1) {
            await addCategory()
        } else {
            await updateCategory()
        }
        setEditID(-1)
        setCatName('')
    }
    return (
        <div>
            <h2 className='font-medium text-black dark:text-white text-3xl'>Categories</h2>
            <div className="sm:text-right">
                <Button onClick={handleOpen} className="mt-4 sm:mt-0">Add category</Button>
            </div>
            <table className='w-full  mt-6 text-black dark:text-white text-lg table-auto'>
                <thead>
                    <tr className='border-2'>
                        <th className='py-3'>Image</th>
                        <th className='py-3'>Name</th>
                        <th className='py-3'>Edit</th>
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
                        category.map((item, index) => {
                            return (
                                <tr className='border-2 text-center'>
                                    <td className='py-2'>
                                        <img src={`https://blog-api-azqx.onrender.com/images/${item.image}`} alt="" className='w-20 h-16 mx-auto' />
                                    </td>
                                    <td className='py-2'>{item.name}</td>
                                    <td className='py-2'>
                                        <IconButton className="rounded-full hover:bg-blue-800"
                                            onClick={() => editCatHandler(item, index)}>
                                            <i className="fa-solid fa-pen"></i></IconButton>
                                    </td>
                                    <td className='py-2'>
                                        <IconButton className="rounded-full  hover:bg-red-600" onClick={() => deleteCategory(item._id, index)}><i className="fa-solid fa-trash"></i></IconButton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{editID == -1 ? 'Add Category' : 'Update Category'}</DialogHeader>
                <form onSubmit={formSubmit}>
                    <DialogBody>
                        <Input label="Category name" className="focus:text-black" value={catName} onChange={(e) => setCatName(e.target.value)} />
                        <div className='border-2 px-2 py-1 mt-4 rounded '>
                            <label htmlFor="" className="text-sm pe-3 text-gray-700 dark:text-white">Category Image</label>
                            <input type="file" name="image" className=' file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-1 file:text-sm file:font-semibold'
                                onChange={(event) => {
                                    setImage(event.target.files[0]);
                                }}
                            />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        {editID == -1 ?
                            <Button type="submit" variant="gradient" color="green" onClick={handleOpen}>
                                <span>Add</span>
                            </Button> :
                            <Button type="submit" variant="gradient" color="blue" onClick={handleOpen}>
                                <span>update</span>
                            </Button>
                        }
                    </DialogFooter>
                </form>
            </Dialog>
        </div>
    )
}

export default Category