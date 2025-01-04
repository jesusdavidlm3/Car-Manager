import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { PlusOutlined, FileTextOutlined, CheckOutlined } from '@ant-design/icons'
import { AddEntry, CheckRegs, ConfirmCheckout } from '../components/Modals'

const Actives: React.FC = () => {

    const [addEntryModal, setAddEntryModal] = useState(false)
    const [checkRegsModal, setCheckRegsModal] = useState(false)
    const [confirmCheckoutModal, setConfirmCheckOutModal] = useState(false)

    const items = [{
        id: '1',
        brand: "Mitsubishi",
        model: "Lancer",
        year: "2017",
        plates: "jjs7f6"
    },{
        id: '2',
        brand: "Toyota",
        model: "Corola",
        year: "2007",
        plates: "k34iw8s"
    },{
        id: '3',
        brand: "Chevrolet",
        model: "Camaro",
        year: "2012",
        plates: "k39ds2"
    }]

    return(
        <>
            <div className='Actives'>
                {items.map(item => (
                    <div className='listItem' key={item.id}>
                        <h3>{`${item.brand} - ${item.model} - ${item.year}`}</h3>
                        <div className='Buttons'>
                            <Tooltip title="Retirar del taller">
                                <Button
                                    variant='solid'
                                    shape='circle'
                                    color='primary'
                                    icon={<CheckOutlined />}
                                    size='large'
                                    onClick={() => setConfirmCheckOutModal(true)}
                                />
                            </Tooltip>
                            <Tooltip title="Revisar registro">
                                <Button
                                    variant='solid'
                                    shape='circle'
                                    color='primary'
                                    icon={<FileTextOutlined />}
                                    size='large'
                                    onClick={() => setCheckRegsModal(true)}
                                />
                            </Tooltip>
                            <Tooltip title="Agregar Registro">
                                <Button
                                    variant='solid'
                                    shape='circle'
                                    color='primary'
                                    icon={<PlusOutlined />}
                                    size='large'
                                    onClick={() => setAddEntryModal(true)}
                                />
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmCheckout open={confirmCheckoutModal} onCancel={() => setConfirmCheckOutModal(false)}/>
            <AddEntry open={addEntryModal} onCancel={() => setAddEntryModal(false)}/>
            <CheckRegs open={checkRegsModal} onCancel={() => setCheckRegsModal(false)} CheckinId='hola'/>

        </>
    )
}

export default Actives;