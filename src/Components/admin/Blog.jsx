import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { deleteCat, fetchBlog, setStatus, STATUSES } from '../../store/BlogSlice'
import { BlogCard } from "./BlogCard";

function Blog() {
    const dispatch = useDispatch()
    const [catName, setCatName] = React.useState('');
    const [image, setImage] = React.useState(null);
    const { status, data } = useSelector(state => state.blog)
    const token = localStorage.getItem('admin-token')
   
    return (
        <div>
            <h2 className='font-medium text-black dark:text-white text-3xl'>Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-4">
                {
                    status === STATUSES.LOADING ?
                        <>
                            <div className="loader-container">
                                <span class="loader"></span>
                            </div>
                        </>
                        :
                        [...data].reverse().map((item, inx) => {
                            return <BlogCard item={item} />
                        })
                }
            </div>

        </div>
    )
}

export default Blog