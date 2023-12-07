import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

const BlogSlice = createSlice({
    name: "Blog",
    initialState: {
        data: [],
        category: [],
        status: STATUSES.IDLE,
        blogValue: {
            title: '',
            category: '',
            image: null,
            description: '',
        },
        editID: -1,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
            // console.log(action.payload);
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        seteditID: (state, action) => {
            state.editID = -1
            state.blogValue = {
                title: '',
                category: '',
                image: null,
                description: '',
            }
        },
        editData(state, action) {
            state.blogValue = action.payload.item
            state.editID = action.payload.id
        },
    },
})
export const { setData, setCategory, setStatus, editData, seteditID } = BlogSlice.actions
export default BlogSlice.reducer

//Thunks
export function fetchBlog() {
    return async function fetchBlogThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await axios.get('http://localhost:3001/blog')
            dispatch(setData(res.data.data))
            const res2 = await axios.get('http://localhost:3001/category')
            dispatch(setCategory(res2.data.data))
            setTimeout(() => {
                dispatch(setStatus(STATUSES.IDLE))
            }, 1500);
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}