import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function MaybeNavbar({ children }) {
    const location = useLocation()
    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/forgot-password'){
            setShowNavbar(false)
        } else{
            setShowNavbar(true)
        }
    }, [location])
    return (
        <div>{showNavbar && children} </div>
    )
}

export default MaybeNavbar