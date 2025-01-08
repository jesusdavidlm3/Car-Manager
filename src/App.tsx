import React, { useContext } from 'react'
import Router from './components/Router';
import NavBar from './components/NavBar';
import { routerContext } from './context/routerContext';

const App: React.FC = () => {

    const {view} = useContext(routerContext)

    return(
        <div className='Root'>
            {(view == 'Home' || view == 'Actives' || view == 'Regs') && <NavBar/>}
            <Router />
        </div>
    )
}

export default App;