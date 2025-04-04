import React, { useState } from 'react'
import { Input, Collapse } from 'antd';
import type { CollapseProps } from 'antd';

interface checkModel{
    checkinDate: Date,
    checkinId: string,
    checkoutDate: Date,
    entranceState: string
}

const Regs: React.FC = () => {

    const [items, setItems] = useState<CollapseProps['items']>([])

    const handleSearch = async(e: string) => {
        const res: checkModel[] = await window.api.getAllCarChecks(e)
        const temp: CollapseProps['items'] = res.map(item => ({
            key: item.checkinId,
            label: `Ingreso: ${new Date(item.checkinDate).toLocaleString()} Retiro: ${new Date(item.checkoutDate).toLocaleString()}`,
            Children: "hola"
        }))
        setItems(temp)
    }

    return(
        <div className='Regs'>
            <Input.Search placeholder='Numero de placa' onSearch={e => handleSearch(e)}/>

            <div className='ListContainer'>
                {items.length != 0 ? (<Collapse items={items}/>):(<h1>Ingrese un numero de placa</h1>)}
            </div>
        </div>    
    )
}

export default Regs;