import React, { useContext, useEffect } from 'react'
import logo from '../img/logo.jpg'
import { appContext } from '../context/appContext'

const Home: React.FC = () => {

    const { setCarBrandsList, setCarModelsList } = useContext(appContext)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const resBrands = await window.api.getAllCarBrands()
        const brandList = resBrands.map((item: {name: String, id: Number}) => ({label: item.name, value: item.id}))
        setCarBrandsList(brandList)

        const resModels = await window.api.getAllCarModels()
        const modelList = resModels.map((item: {name: String, id: Number, brandId: Number}) => ({label: item.name, value: item.id, brand: item.brandId}))
        setCarModelsList(modelList)
    }

    return(
        <div className='Home'>
            <img src={logo} className='logo'/>
            <h1>Bienvenido a taller Manager</h1>
            <h2>Seleccione una opcion en la barra superior para empezar</h2>
        </div>
    )
}

export default Home