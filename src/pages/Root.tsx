import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect, useContext } from 'react'
import { appContext } from '../context/appContext'

const Root = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home')
    }, [])

    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default Root