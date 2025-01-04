import React, { useState } from 'react'
import { Button } from 'antd'
import { NewCheckin } from './Modals'
import { useNavigate } from 'react-router-dom'

const NavBar: React.FC = () => {

    const navigate = useNavigate()
    const [newCheckinModal, setNewCheckinModal] = useState(false)

    return(
        <>
            <div className='NavBar'>
                <Button variant='solid' color='primary' onClick={() => setNewCheckinModal(true)}>Registrar ingreso</Button>
                <Button variant='solid' color='primary' onClick={() => navigate('/actives')}>Activos</Button>
                <Button variant='solid' color='primary' onClick={() => navigate('/regs')}>Registros</Button>
                <Button variant='solid' color='primary'>Administrar</Button>
            </div>

            <NewCheckin open={newCheckinModal} onCancel={() => setNewCheckinModal(false)}/>
        </>
    )
}

export default NavBar