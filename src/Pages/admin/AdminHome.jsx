import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
} from "@material-tailwind/react";
import Userdata from '../../Components/admin/Userdata';
import Category from '../../Components/admin/Category';
import { useNavigate } from 'react-router-dom';
import Blog from '../../Components/admin/Blog';

function AdminHome() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('admin-token')
        navigate('/')
    }
    return (
        <div>
            <div className="container pt-24 min-h-screen">
            <div className="text-right mb-4"><Button variant='filled' size='sm' onClick={logout}>admin logout</Button></div>
                <Tabs value="user" orientation="vertical" >
                    <TabsHeader className="w-40 ">
                        <Tab value='user'>
                            Users
                        </Tab>
                        <Tab value='Category'>
                            Category
                        </Tab>
                        <Tab value='blog'>
                            Blogs
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel value='user' className="py-0">
                            <Userdata />
                        </TabPanel>
                        <TabPanel value='Category' className="py-0">
                            <Category />
                        </TabPanel>
                        <TabPanel value='blog' className="py-0">
                            <Blog />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
              
            </div>
        </div>
    )
}

export default AdminHome