import { appContext } from "./appContext"
import React from 'react'
import { useState } from "react"

const ContextProvider = ({children}) => {


    return(
        <appContext.Provider>
            {children}
        </appContext.Provider>
    )
}

export default ContextProvider