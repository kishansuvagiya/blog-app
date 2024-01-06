import { Input } from '@material-tailwind/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchText } from '../store/BlogSlice';

function SearchInput() {
    const { searchText, darkMode } = useSelector((state) => state.blog)
    const dispatch = useDispatch()
  return (
    <div>
        <div className=' mx-9 mb-8 lg:w-[46%] lg:ms-auto '>
            <Input
              variant="outlined"
              color={darkMode ? 'white' : ''}
              label="Search by Title, Author, Category"
              size='lg'
              // placeholder='Search'
              className="dark:text-white "
              icon={<i class="fa-solid fa-magnifying-glass"></i>}
              value={searchText}
              onChange={(e) => dispatch(setSearchText(e.target.value))}
            />    
        </div>
    </div>
  )
}

export default SearchInput