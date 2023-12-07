import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import {
    Button
} from "@material-tailwind/react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlog, seteditID } from '../store/BlogSlice';
import LoginFirst from '../Components/LoginFirst';

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp', 'jfif'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const blogSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is Required'),
    category: Yup.string()
        .required('Please select Category'),
    image: Yup.mixed()
        .required('Please upload Image')
        .test("is-valid-type", "Not a valid image type",
            value => isValidFileType(value && value.name?.toLowerCase(), "image")),
    description: Yup.string()
        .required('Description is Required')
});

function CreateBlog() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { category, blogValue, editID } = useSelector(state => state.blog)
    const editor = useRef(null);

    // const config = useMemo(
    //   {
    //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    //     placeholder: placeholder || 'Start typings...'
    //   },
    //   [placeholder]
    // );
    let token = localStorage.getItem('token')
    let author = localStorage.getItem('author')

    const createBlog = async (values) => {
        try {
            let blogForm = new FormData()
            blogForm.append('title', values.title)
            blogForm.append('category', values.category)
            blogForm.append('image', values.image)
            blogForm.append('description', values.description)
            blogForm.append('author', author)
            
            const res = await axios.post('https://blog-api-azqx.onrender.com/blog', blogForm, {
                headers: { "Content-Type": "multipart/form-data", authorization: token }
            })
            console.log(res);
            navigate('/')
            dispatch(fetchBlog())
            toast.success(res.data.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        catch (error) {
            toast.error(error.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
    }
    const updateBlog = async (values) => {
        console.log(values);
        try {
            let blogForm = new FormData()
            blogForm.append('id', values._id)
            blogForm.append('title', values.title)
            blogForm.append('category', values.category)
            blogForm.append('image', values.image)
            blogForm.append('description', values.description)
            blogForm.append('author', author)

            const res = await axios.put('https://blog-api-azqx.onrender.com/blog', blogForm, {
                headers: { "Content-Type": "multipart/form-data", authorization: token }
            })
            navigate('/myblog')
            dispatch(fetchBlog())
            toast.info(res.data.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        catch (error) {
            toast.error(error.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
    }
    const closeBlog = () => {
        dispatch(seteditID())
        navigate('/')
    }

    return (
        <div className='pt-24'>
            <div className='container w-5/6'>
                {token ?
                    <>
                        <div className="flex items-center justify-between">
                            {editID == -1 ?
                                <h1 className='text-3xl font-semibold mb-5 dark:text-white'>Create Blog</h1> :
                                <h1 className='text-3xl font-semibold mb-5 dark:text-white'>Update Blog</h1>}
                        </div>
                        <div >
                            <Formik
                                initialValues={blogValue}
                                validationSchema={blogSchema}
                                onSubmit={async (values, action) => {
                                    console.log(values);
                                    if (editID == -1) {
                                        await createBlog(values)
                                    } else {
                                        await updateBlog(values)
                                    }
                                    dispatch(seteditID())
                                    // console.log(values.image);
                                    action.resetForm()
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form>

                                        <div className="grid gap-4">
                                            {/* <input type="text" autofocus="autofocus" style={{display: "none"}} /> */}
                                            <div>
                                                <Field placeholder="Blog Title" name='title' className=' w-full border-2 p-2 rounded border-black placeholder:text-gray-700 text-black font-medium' />
                                                <div className='text-red-700'><ErrorMessage name='title' /></div>
                                            </div>

                                            <div>
                                                <Field name="category" className=' w-full border-2 px-2 py-2.5 rounded border-black text-black ' as='select'>
                                                    <option  >-- Select Category --</option>
                                                    {category.map((item, inx) => {
                                                        return <option value={item._id} className='text-black'>{item.name}</option>
                                                    })}
                                                </Field>
                                                <div className='text-red-700'><ErrorMessage name='category' /></div>
                                            </div>

                                            <div>
                                                <div className='border-2 px-2 py-1 rounded border-black dark:border-white'>
                                                    <label htmlFor="" className="text-md pe-3 text-gray-700 dark:text-white">Blog Image</label>
                                                    <input type="file" name="image" className=' file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-1 file:text-sm file:font-semibold'
                                                        onChange={(event) => {
                                                            setFieldValue('image', event.currentTarget.files[0]);
                                                        }} />
                                                </div>
                                                <div className='text-red-700'><ErrorMessage name='image' /></div>
                                            </div>

                                            <div>
                                                {/* <Field placeholder="Blog Content" name='description' className='block w-full border-2 p-2 rounded border-black placeholder:text-gray-700 text-black' as="textarea" rows='4' /> */}
                                                <JoditEditor
                                                    ref={editor}
                                                    value={blogValue.description}
                                                    // config={config}
                                                    name='description'
                                                    onChange={(data) => {
                                                        setFieldValue('description', data);
                                                        console.log(data);
                                                    }}
                                                />
                                                <div className='text-red-700'><ErrorMessage name='description' /></div>
                                            </div>

                                        </div>

                                        <div className="space-x-2 mt-4 text-right">
                                            <Button type='button' variant="outlined" color="red" onClick={closeBlog}>
                                                close
                                            </Button>
                                            {editID == -1 ? <Button variant="gradient" color="green" type='submit'>
                                                Create Blog
                                            </Button> :
                                                <Button variant="gradient" color="blue" type='submit'>
                                                    Update Blog
                                                </Button>}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </>
                    :
                    <>
                        <LoginFirst />
                    </>
                }
            </div>

            <ToastContainer />
        </div>
    )
}

export default CreateBlog