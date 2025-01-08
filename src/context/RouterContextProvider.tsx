import { routerContext } from "./routerContext";
import React, { useState } from "react";

interface routerInterface{
    children: React.ReactNode
}

const RouterProvider: React.FC<routerInterface> = ({children}) => {

    const [view, setView] = useState('Home')

    return(
        <routerContext.Provider
            value={{
                view,
                setView
            }}
        >
            {children}
        </routerContext.Provider>
    )
}

export default RouterProvider;