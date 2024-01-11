import './App.css';
import { Navbarr } from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpLogin from './Pages/SignUpLogin';
import Home from './Pages/Home';
import { Footer } from './Components/Footer';
import SingleBlog from './Pages/SingleBlog';
import BlogCategory from './Pages/BlogCategory';
import MyBlog from './Pages/MyBlog';
import ScrollToTop from './Components/ScrollToTop';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlog } from './store/BlogSlice';
import MaybeNavbar from './Components/MaybeNavbar';
import CreateBlog from './Pages/CreateBlog';
import Protect from './Protect';
import Login from './Pages/admin/Login';
import AdminHome from './Pages/admin/AdminHome';
import ForgotPassword from './Pages/ForgotPassword';
import ScrollToTopButton from './Components/ScrollToTopButton';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBlog())
  }, [])

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <BrowserRouter>
        <MaybeNavbar>
          <Navbarr />
        </MaybeNavbar>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignUpLogin />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/blog/:id' element={<SingleBlog />} />
          <Route path='/category/:name' element={<BlogCategory />} />
          <Route path='/myblog' element={<Protect><MyBlog /></Protect>} />
          <Route path='/createblog' element={<CreateBlog />} />
          <Route path='/admin' element={<Login />} />
          <Route path='/admin/data' element={<AdminHome />} />
        </Routes>
        <MaybeNavbar>
          <Footer />
        </MaybeNavbar>
        <ScrollToTopButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
