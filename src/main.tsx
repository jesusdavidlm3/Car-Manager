import React from 'react'
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContextProvider from './context/ContextProvider'
import './style.scss'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Regs from './pages/Regs'
import Actives from './pages/Actives'

const router = createBrowserRouter([{
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [{
        path: '/home',
        element: <Home/>
    },{
        path: '/regs',
        element: <Regs/>
    },{
        path: '/actives',
        element: <Actives/>
    }]
}])

createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={router}/>
    </ContextProvider>
)