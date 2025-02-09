import React, { useContext } from 'react'
import Router from './components/Router';
import NavBar from './components/NavBar';
import { routerContext } from './context/routerContext';
import ContextProvider from './context/ContextProvider';
import { appContext } from './context/appContext';

const App: React.FC = () => {

    // const {contextHolder} = useContext(appContext)
    const {view} = useContext(routerContext)

    return(
        <ContextProvider>
            <div className='Root'>
                {/* {contextHolder} */}
                {(view == 'Home' || view == 'Actives' || view == 'Regs') && <NavBar/>}
                    <Router />
            </div>
        </ContextProvider>
    )
}

export default App;