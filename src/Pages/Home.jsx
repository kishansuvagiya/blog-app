import React from 'react'
import TopContent from '../Components/TopContent'
import Blogs from '../Components/Blogs'
import FeaturedPost from '../Components/FeaturedPost'
import Category from '../Components/Category'
import SearchBlog from '../Components/SearchBlog'
import { useSelector } from 'react-redux'
import SearchInput from '../Components/SearchInput'

function Home() {
  const { searchText } = useSelector((state) => state.blog)
  return (
    <div className='min-h-screen'>
      <div className='pt-28 '>
        <SearchInput />
        {searchText.trim().length >= 3 ?
          <SearchBlog /> :
          <>
            <TopContent />
            <Category />
            <FeaturedPost />
            <Blogs />
          </>
        }
      </div>
    </div>
  )
}

export default Home