import React from 'react'
import { createRoot } from "react-dom/client"
import RouterContextProvider from './context/RouterContextProvider'
import App from './App'
import './style.scss'

createRoot(document.getElementById('root')).render(
    <RouterContextProvider>
        <App/>
    </RouterContextProvider>
)