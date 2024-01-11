import { Input } from '@material-tailwind/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchText } from '../store/BlogSlice';
import { useState } from 'react';

function SearchInput() {
    const { searchText, darkMode } = useSelector((state) => state.blog)
    const [close, setClose] = useState(false)
    const dispatch = useDispatch()

    const searchHandler = (e) => {
      dispatch(setSearchText(e.target.value))
      setClose(true)
    }
    const clearSearchText = () => {
      dispatch(setSearchText(''))
      setClose(false)
    }
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
              icon={close ? <i className="fa-solid fa-xmark cursor-pointer" onClick={clearSearchText}></i> :<i class="fa-solid fa-magnifying-glass"></i>}
              value={searchText}
              onChange={searchHandler}
            />    
        </div>
    </div>
  )
}

export default SearchInput