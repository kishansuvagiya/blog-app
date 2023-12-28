import React from 'react'
import { useSelector } from 'react-redux'
import { MyBlogCard } from '../Components/MyBlogCard'
import { useNavigate } from 'react-router-dom'
import { STATUSES } from '../store/BlogSlice'
import SkeletonCard from '../Components/Skeleton/SkeletonCard'
import { Button } from '@material-tailwind/react'

function MyBlog() {
    const navigate = useNavigate()
    let author = localStorage.getItem('author')
    const { data, status } = useSelector(state => state.blog)
    const userBlog = data.filter((el) => {
        return author === el.author._id
    })
    return (
        <div>
            <div className="container pt-28">
                <h2 className=' text-3xl md:text-4xl lg:text-5xl font-bold mb-5 dark:text-white'>My Blog</h2>
                {
                    userBlog.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-4">
                            <>
                               { status === STATUSES.LOADING ?
                                <>
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                </>
                                :
                                userBlog.map((item, inx) => {
                                    return <MyBlogCard item={item} />
                                })}
                            </>
                        </div>
                        :
                        <>
                            <div style={{ height: "333px" }} className='dark:text-white'>
                                <h1 className='text-3xl font-semibold text-center pt-5'>Create your First Blog</h1>
                                <div className='text-center mt-7'>
                                    <Button onClick={() => navigate('/createblog')}>create blog</Button>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default MyBlog