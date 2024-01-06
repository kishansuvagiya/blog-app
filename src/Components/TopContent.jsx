import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Sliderr() {
    const navigate = useNavigate()
    const data = useSelector(state => state.blog.data)
    const [randomBlog, setRandomBlog] = useState([])
    
    useEffect(() => {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const newShuffledArray = shuffleArray([...data]);
        setRandomBlog(newShuffledArray);
    }, [data]);
    const blog1 = randomBlog.slice(0, 1)
    const blog2 = randomBlog.slice(1, 3)
    const gotoBlog = (item) => {
        navigate('/blog/'+ item._id)
      }
    return (
        <div>
            <div className="container mt-4">
                <div className="grid lg:grid-cols-2 gap-4">
                    {
                        blog1.map((item) => {
                            return <div className='relative image-part group overflow-hidden '>
                                <img src={`https://blog-api-azqx.onrender.com/images/${item.image}`} className='w-full !rounded-lg h-[300px] lg:h-[610px]  object-fill ' alt="" />
                                <h3 className='absolute bottom-5 px-6 text-xl lg:text-3xl text-white font-bold group-hover:underline cursor-pointer' onClick={() => gotoBlog(item)}>{item.title}</h3>
                            </div>
                                    
                        })
                    }

                    <div className="grid lg:grid-rows-2 gap-4">
                    {
                        blog2.map((item) => {
                            return <div className='relative image-part group overflow-hidden'>
                                <img src={`https://blog-api-azqx.onrender.com/images/${item.image}`} className='w-full !rounded-lg object-fill h-[300px]' alt="" />
                                <h3 className='absolute bottom-5 px-6 cursor-pointer text-xl lg:text-3xl text-white font-bold group-hover:underline' onClick={() => gotoBlog(item)}>{item.title}</h3>
                            </div>
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sliderr