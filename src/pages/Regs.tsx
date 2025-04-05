import React, { useState } from 'react'
import { Input, List } from 'antd';
import { CheckRegs } from '../components/Modals';

interface checkModel{
    checkinDate: Date,
    checkinId: string,
    checkoutDate: Date,
    entranceState: string
}

interface listItem{
    id: string,
    title: string
}

const Regs: React.FC = () => {

    const [items, setItems] = useState<listItem[]>([])
    const [regModal, setRegModal] = useState<boolean>(false)
    const [selectedCheck, setSelectedCheck] = useState<string>("")

    const handleSearch = async(e: string) => {
        const res: checkModel[] = await window.api.getAllCarChecks(e)
        const temp: listItem[] = res.map(item => ({
            id: item.checkinId,
            title: `Ingreso: ${new Date(item.checkinDate).toLocaleString()} Retiro: ${new Date(item.checkoutDate).toLocaleString()}`,
        }))
        setItems(temp)
    }

    return(
        <div className='Regs'>
            <Input.Search placeholder='Numero de placa' onSearch={e => handleSearch(e)}/>

            <div className='ListContainer'>
                {items.length != 0 ? (
                    <List 
                        bordered
                        
                    >
                        {items.map(item => (
                            <List.Item onClick={() => {setRegModal(true); setSelectedCheck(item.id)}}>
                                <List.Item.Meta
                                    title={item.title}
                                />
                            </List.Item>
                        ))}
                    </List>
                ):(<h1>Ingrese un numero de placa</h1>)}
            </div>
            <CheckRegs
                checkinId={selectedCheck}
                open={regModal}
                onCancel={() => setRegModal(false)}
            />
        </div>    
    )
}

export default Regs;