import { appContext } from "./appContext"
import React from 'react'
import { useState } from "react"

interface contextProviderInterface{
    children: React.ReactNode
}

export interface carBrand{
    value: Number,
    label: String,
}

export interface carModel extends carBrand{
    brand: Number
}

const ContextProvider: React.FC<contextProviderInterface> = ({children}) => {

    const [carBrandsList, setCarBrandsList] = useState<carBrand[]>([])
    const [carModelsList, setCarModelsList] = useState<carModel[]>([])

    return(
        <appContext.Provider
            value={{
                carBrandsList,
                setCarBrandsList,
                carModelsList,
                setCarModelsList
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default ContextProvider