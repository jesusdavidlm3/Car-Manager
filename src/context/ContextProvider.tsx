import { appContext } from "./appContext"
import React from 'react'
import { useState } from "react"

interface contextProviderInterface{
    children: React.ReactNode
}

const ContextProvider: React.FC<contextProviderInterface> = ({children}) => {

    return(
        <appContext.Provider
            value={{
                
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default ContextProvider