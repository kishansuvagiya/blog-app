import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import axios from "axios";
import { toast } from "react-toastify";
import { fetchBlog } from "../../store/BlogSlice";
import { useDispatch } from "react-redux";

export function BlogCard({ item }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const gotoCategory = () => {
        navigate('/category/' + item.category.name)
    }
    const gotoBlog = () => {
        navigate('/blog/' + item._id)
    }

    const deleteBlog = () => {
        let adminToken = localStorage.getItem('admin-token')
        axios.delete(`https://blog-api-azqx.onrender.com/blog/admin/delete?id=${item._id}`, {
          headers: { authorization: adminToken }
        })
          .then((res) => {
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

    return (
        <Card className="max-w-[24rem] overflow-hidden mt-6 duration-500 dark:bg-black" >
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
                    className="w-full h-[150px]"
                />
            </CardHeader>
            <CardBody className="py-1 px-4">
                <div className="border-2 inline-block px-[4px] py-[2px] mt-2 rounded-full text-xs text-black border-black hover:bg-black hover:text-white font-medium cursor-pointer dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black" >{item.category.name}</div>
                <div className="line-clamp-2">
                    <Typography variant="h6" color="blue-gray" className="mt-4 hover:text-black cursor-pointer dark:text-white" onClick={gotoBlog}>
                        {item.title}
                    </Typography>
                </div>
                <div className="line-clamp-3">
                    <Typography variant="lead" color="text-white" className="mt-3 font-normal text-sm  text-justify dark:text-white">
                        {parse(item.description)}
                    </Typography>
                </div>
            </CardBody>
            <hr className="my-1" />
            <CardFooter className="py-2 px-4">
                <div className="flex items-center justify-between pt-0">
                    <div className="flex  flex-col justify-start">
                            <Typography className="font-normal dark:text-white capitalize text-sm">
                                <i class="fa-solid fa-circle-user"></i> &nbsp;
                                 {item.author.fullname}
                            </Typography>
                            <Typography className="font-normal dark:text-white text-sm mt-1"><i class="fa-solid fa-calendar"></i> &nbsp;{new Date(item.date).toLocaleDateString()}</Typography>
                    </div>
                    <Tooltip content="Delete Blog" placement="bottom">
                        <IconButton className="rounded-full hover:bg-black hover:text-red-600 dark:hover:bg-white" onClick={deleteBlog} size="md">
                            <i className="fa-solid fa-trash"></i>
                        </IconButton>
                    </Tooltip>
                </div>

            </CardFooter>
        </Card>
    );
}