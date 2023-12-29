import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { editData, fetchBlog } from '../store/BlogSlice';
import parse from 'html-react-parser';

export function MyBlogCard({ item }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [openedit, setOpenedit] = React.useState(false);
  const gotoBlog = () => {
    navigate('/blog/' + item._id)
  }
  const handleOpen = () => setOpen(!open);
  const handleOpenedit = () => setOpenedit(!openedit);
  const deleteBlog = () => {
    let token = localStorage.getItem('token')
    axios.delete(`https://blog-api-azqx.onrender.com/blog?id=${item._id}`, {
      headers: { authorization: token }
    })
      .then((res) => {
        handleOpen()
        dispatch(fetchBlog())
        toast.error(res.data.message, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(err);
      })
  }
  const editBlog = () => {
    navigate('/createblog')
    handleOpenedit()
    dispatch(editData({ item: item, id: item._id}))
  }
  return (
    <>
      <Card className="max-w-[24rem] overflow-hidden BlogCard hover:scale-105 mt-6 duration-500 dark:bg-black" >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
          onClick={gotoBlog}
        >
          <img
            src={`https://blog-api-azqx.onrender.com/images/${item.image}`}
            alt="ui/ux review check"
            className="w-full h-72"
          />
        </CardHeader>
        <CardBody>
          <div className="border-2 inline-block px-2 py-1 rounded-full text-xs text-black border-black hover:bg-black hover:text-white font-medium cursor-pointer dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black" >{item.category.name}</div>
          <div className="line-clamp-2">
            <Typography variant="h5" color="blue-gray" className="mt-4 hover:text-black cursor-pointer dark:text-white" onClick={gotoBlog}>
              {item.title}
            </Typography>
          </div>
          <div className="line-clamp-4">
            <Typography variant="lead" color="text-white" className="mt-3 font-normal text-base  text-justify dark:text-white">
              {parse(item.description)}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between pt-0">
          <div className="flex items-center">
            <Tooltip content="Edit Blog" placement="bottom">
              <IconButton className="rounded-full hover:bg-black hover:text-cyan-600 dark:hover:bg-white" onClick={handleOpenedit}>
                <i className="fa-solid fa-pen"></i>
              </IconButton>
            </Tooltip>
            <Tooltip content="Delete Blog" placement="bottom">
              <IconButton className="rounded-full ml-3 hover:bg-black hover:text-red-600 dark:hover:bg-white" onClick={handleOpen}>
                <i className="fa-solid fa-trash"></i>
              </IconButton>
            </Tooltip>
          </div>
          <Typography className="font-normal dark:text-white"><i class="fa-solid fa-calendar"></i> {new Date(item.date).toLocaleDateString()}</Typography>
        </CardFooter>
      </Card>

      {/* -----------  edit blog Dialog box ----------------- */}
      <Dialog open={openedit} handler={handleOpenedit}>
        <DialogHeader>Edit Blog</DialogHeader>
        <DialogBody className="text-xl pt-0">
          Are you sure want to edit?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenedit}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={editBlog}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* -----------  delete blog Dialog box ----------------- */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Blog</DialogHeader>
        <DialogBody className="text-xl pt-0">
          Are you sure want to delete?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={deleteBlog}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* <ToastContainer /> */}
    </>
  );
}