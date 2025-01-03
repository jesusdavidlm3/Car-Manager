import React from 'react'
import logo from '../img/logo.jpg'

const Home = () => {
    return(
        <div className='Home'>
            <img src={logo} className='logo'/>
            <h1>Bienvenido a taller Manager</h1>
            <h2>Seleccione una opcion en la barra superior para empezar</h2>
        </div>
    )
}

export default Home