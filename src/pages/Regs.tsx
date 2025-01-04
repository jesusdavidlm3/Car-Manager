import React from 'react'
import { Input, Collapse } from 'antd';
import type { CollapseProps } from 'antd';

const Regs: React.FC = () => {

    const items: CollapseProps['items'] = [{
        key: '1',
        label: 'Entrada - Salida',
        children: 'Descripcion + cantidad'
    },{
        key: '2',
        label: 'Entrada - Salida',
        children: 'Descripcion + cantidad'
    },{
        key: '3',
        label: 'Entrada - Salida',
        children: 'Descripcion + cantidad'
    }]

    return(
        <div className='Regs'>
            <Input.Search placeholder='Numero de placa'/>

            <div className='ListContainer'>
                <Collapse items={items}/>
            </div>
        </div>    
    )
}

export default Regs;