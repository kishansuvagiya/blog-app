import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../store/BlogSlice";

export function Navbarr() {
  const { darkMode } = useSelector((state) => state.blog)
  const [openNav, setOpenNav] = React.useState(false);
  const [token, settoken] = React.useState(localStorage.getItem('token'));
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let user = localStorage.getItem('user')
  
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const logOut = () => {
    settoken(localStorage.removeItem('token'))
    localStorage.removeItem('author')
    localStorage.removeItem('user')
    toast.success("LogOut Successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate('/')
  }

  const login = () => {
    navigate('/login')
  }
  const myBlog = () => {
    navigate('/myblog')
  }
  const darkTheme = () => {
    document.documentElement.classList.toggle('dark')
    dispatch(setDarkMode(!darkMode))
  }

  return (
    <>
      <Navbar variant="gradient" color="blue-gray" className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-4 from-blue-gray-900 to-blue-gray-800 rounded-none rounded-b-xl fixed top-0 z-50">
        <div className="container mx-auto flex items-center justify-between text-white">
          <Link to='/'>
            <Typography
              as="a"
              className="mr-4 cursor-pointer py-1.5 font-bold text-2xl"
            >
              Blog App
            </Typography>
          </Link>
          {
            token ?
              <Typography className="inline text-base font-normal italic font-mono mx-4 flex-grow xl:flex-grow-0 text-center"><i className="fa-solid fa-hand"></i> Hello {user} ! </Typography>
              : null
          }
        
          <div className="hidden lg:block ">
            <Tooltip content={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} placement="bottom">
              <span className="me-2"><Switch onClick={darkTheme} ripple={false}
                className="h-full w-full checked:bg-[#0f172a]"
                containerProps={{
                  className: "w-11 h-6 pt-2",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none mt-2",
                }} /></span>
            </Tooltip>
            <Button variant="gradient" size="sm" className="mx-2" onClick={() => navigate('/createblog')}>
              <i className="fa-solid fa-circle-plus"></i>
              <span className="ps-2">Create Blog</span>
            </Button>
            {
              token ?
                <>
                  <Button variant="gradient" size="sm" className="me-2" onClick={myBlog}>
                    <span>My Blog</span>
                  </Button>
                  <Button variant="gradient" size="sm" className="" onClick={logOut}>
                    <span>LogOut</span>
                  </Button>
                </>
                :
                <Button variant="gradient" size="sm" className="" onClick={login}>
                  <span>Login</span>
                </Button>
            }
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            <Button variant="outlined" color="white" size="sm" fullWidth className="mb-4 mt-6" onClick={() => navigate('/createblog')}>
              <i className="fa-solid fa-circle-plus"></i>
              <span className="ps-2">Create Blog</span>
            </Button>
            {
              token ?
                <>
                  <Button variant="outlined" color="white" size="sm" fullWidth className="mb-4" onClick={myBlog}>
                    <span>My Blog</span>
                  </Button>
                  <Button variant="outlined" color="white" size="sm" fullWidth className="mb-2 " onClick={logOut}>
                    <span>LogOut</span>
                  </Button>
                </>
                :
                <Button variant="gradient" size="sm" fullWidth className="mb-2 " onClick={login}>
                  <span>Login</span>
                </Button>
            }
          </div>
        </MobileNav>
      </Navbar>

      <ToastContainer />
    </>
  );
}
