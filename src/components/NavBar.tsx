import React, { useContext, useState } from 'react'
import { Button } from 'antd'
import { NewCheckin } from './Modals'
import { routerContext } from '../context/routerContext'

const NavBar: React.FC = () => {

    const [newCheckinModal, setNewCheckinModal] = useState(false)
    const {setView} = useContext(routerContext)

    return(
        <>
            <div className='NavBar'>
                <Button variant='solid' color='primary' onClick={() => setNewCheckinModal(true)}>Registrar ingreso</Button>
                <Button variant='solid' color='primary' onClick={() => setView('Actives')}>Activos</Button>
                <Button variant='solid' color='primary' onClick={() => setView('Regs')}>Registros</Button>
                <Button variant='solid' color='primary'>Administrar</Button>
            </div>

            <NewCheckin open={newCheckinModal} onCancel={() => setNewCheckinModal(false)}/>
        </>
    )
}

export default NavBar