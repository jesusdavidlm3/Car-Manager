import React, {useContext} from 'react'
import { WarningOutlined } from '@ant-design/icons'
import { routerContext } from '../context/routerContext'

const ErrorPage: React.FC = () => {

    const {setView} = useContext(routerContext)

    return(
        <div className='ErrorPage'>
            <WarningOutlined className='icon' style={{fontSize: '300px', color: 'white'}}/>
            <h1>Ah ocurrido un error</h1>
            <h3 onClick={() => setView('Home')}>Presiona aqui para volver a empezar</h3>
        </div>
    )
}

export default ErrorPage