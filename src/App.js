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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlog } from './store/BlogSlice';
import MaybeNavbar from './Components/MaybeNavbar';
import CreateBlog from './Pages/CreateBlog';
import Protect from './Protect';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBlog())
  }, [])

  return (
    <div className="bg-white dark:bg-[#0f172a]">
      <BrowserRouter>
        <MaybeNavbar>
          <Navbarr />
        </MaybeNavbar>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignUpLogin />} />
          <Route path='/blog/:id' element={<SingleBlog />} />
          <Route path='/category/:name' element={<BlogCategory />} />
          <Route path='/myblog' element={<Protect><MyBlog /></Protect>} />
          <Route path='/createblog' element={<CreateBlog />} />
        </Routes>
        <MaybeNavbar>
          <Footer />
        </MaybeNavbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
