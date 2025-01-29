import React, { useContext } from 'react'
import Router from './components/Router';
import NavBar from './components/NavBar';
import { routerContext } from './context/routerContext';
import ContextProvider from './context/ContextProvider';

const App: React.FC = () => {

    const {view} = useContext(routerContext)

    return(
        <ContextProvider>
            <div className='Root'>
                {(view == 'Home' || view == 'Actives' || view == 'Regs') && <NavBar/>}
                    <Router />
            </div>
        </ContextProvider>
    )
}

export default App;