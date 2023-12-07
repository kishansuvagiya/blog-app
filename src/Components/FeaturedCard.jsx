import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from '@chakra-ui/react'
import parse from 'html-react-parser';

export function FeaturedCard({ item }) {
  const navigate = useNavigate()
  const gotoBlog = () => {
    navigate('/blog/' + item._id)
  }
  const gotoCategory = () => {
    navigate('/category/' + item.category.name)
  }

  return (
    <Card className="w-full max-w-[48rem] flex-row mt-6 group dark:bg-black">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={`https://blog-api-azqx.onrender.com/images/${item.image}`}
          alt="card-image"
          className="h-full w-full object-cover group-hover:scale-110 duration-500"
        />
      </CardHeader>
      <CardBody className="p-3 relative">
        <div className="border-2 inline-block px-2 py-1 rounded-lg mb-3 text-xs text-black border-black hover:bg-black hover:text-white font-medium cursor-pointer dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white" onClick={gotoCategory}>{item.category.name}</div>
        <div className="line-clamp-2 mb-3" onClick={gotoBlog}>
          <Typography variant="h4" color="blue-gray" className="hover:underline cursor-pointer dark:text-white">
            {item.title}
          </Typography>
        </div>
        <div className="line-clamp-3 mb-3">
          <Typography color="gray" className="font-normal dark:text-white">
            {parse(item.description)}
          </Typography>
        </div>

        <Button variant="text" className="flex items-center gap-2 dark:text-white dark:hover:bg-[#0f172a]" onClick={gotoBlog}>
          More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
        <div className="flex items-center justify-between -space-x-3 mt-2 ">
          <Typography className="font-normal dark:text-white leading-8">
            <Avatar name={item.author.fullname} size='sm' />
            {/* <i class="fa-solid fa-circle-user"></i>  */}
            &nbsp; {item.author.fullname}</Typography>
        <Typography className="font-normal dark:text-white"><i class="fa-solid fa-calendar"></i> {new Date(item.date).toLocaleDateString()}</Typography>
        </div>
      </CardBody>
    </Card>
  );
}