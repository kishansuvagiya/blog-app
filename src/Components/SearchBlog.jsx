import React, { useEffect, useState } from 'react'
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchBlog, setStatus, STATUSES } from '../store/BlogSlice';
import axios from 'axios';
import { BlogCard } from './BlogCard';

function SearchBlog() {
    const { searchText, searchBlog } = useSelector((state) => state.blog)
    const { status } = useSelector(state => state.blog)
    const dispatch = useDispatch()
    const controller = new AbortController();

    const searchHandler = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await axios.get(`https://blog-api-azqx.onrender.com/blog/search?q=${searchText}`, {
                signal: controller.signal
            })
            dispatch(setSearchBlog(res.data.data))
            dispatch(setStatus(STATUSES.IDLE))
            console.log(res);
        } catch (error) {
            // Only handle errors if this is the latest request
            if (error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                dispatch(setStatus(STATUSES.ERROR))
            }
        }

    }
    useEffect(() => {
        dispatch(setSearchBlog([]))
        if (searchText.trim() !== '' && searchText.length >= 3) {
            searchHandler()
        }
        // Cleanup function to cancel the request when the component unmounts
        return () => {
            if (searchText.length > 3) {
                controller.abort()
            }
        };
    }, [searchText])
    return (
        <div className=''>
            <div className="container mt-16">
                {status === STATUSES.LOADING ?
                    <>
                        <div className="loader-container_search ">
                            <span class="loader_search"></span>
                        </div>
                    </> :
                    searchBlog.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-4">
                            {searchBlog.map((item, inx) => {
                                return <BlogCard key={inx} item={item} />
                            })}
                        </div>
                        :
                        <>
                            <div className='dark:text-white flex justify-center items-center'>
                                <h1 className='text-2xl'>No Blogs found.</h1>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default SearchBlog