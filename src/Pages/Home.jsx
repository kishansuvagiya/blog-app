import React from 'react'
import TopContent from '../Components/TopContent'
import Blogs from '../Components/Blogs'
import FeaturedPost from '../Components/FeaturedPost'
import Category from '../Components/Category'

function Home() {
  return (
    <div>
      <div className='pt-28'>
        <TopContent />
        <Category />
        <FeaturedPost />
        <Blogs />
      </div>
    </div>
  )
}

export default Home