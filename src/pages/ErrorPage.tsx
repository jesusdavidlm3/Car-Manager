import React from 'react'
import { WarningOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

    const navigate = useNavigate()

    return(
        <div className='ErrorPage'>
            <WarningOutlined />
            <h1>Ah ocurrido un error</h1>
            <h3 onClick={() => navigate('/home')}>Presiona aqui para volver a empezar</h3>
        </div>
    )
}

export default ErrorPage