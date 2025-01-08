import React, { useContext, useState } from 'react'
import RouterProvider from '../context/RouterContextProvider';
import { routerContext } from '../context/routerContext';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Actives from '../pages/Actives';
import Regs from '../pages/Regs';
import NavBar from './NavBar';

const Router: React.FC = () => {

    const {view} = useContext(routerContext)

    try{
        switch(view){
            case 'Home':
                return <Home/>
            case 'Actives': 
                return <Actives/>
            case 'Regs':
                return <Regs/>
            default:
                return <ErrorPage/>
        }
    }catch(err){
        return <ErrorPage/>
    }    
}

export default Router;