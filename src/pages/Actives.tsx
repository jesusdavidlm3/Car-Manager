import React, { useState, useEffect, useContext } from 'react'
import { Button, Tooltip } from 'antd'
import { PlusOutlined, FileTextOutlined, CheckOutlined } from '@ant-design/icons'
import { AddEntry, CheckRegs, ConfirmCheckout } from '../components/Modals'
import { getOnList } from '../lib/functions'
import { appContext } from '../context/appContext'

const Actives: React.FC = () => {

    const { carBrandsList, carModelsList } = useContext(appContext)

    const [addEntryModal, setAddEntryModal] = useState(false)
    const [checkRegsModal, setCheckRegsModal] = useState(false)
    const [confirmCheckoutModal, setConfirmCheckOutModal] = useState(false)

    const [showList, setShowList] = useState([])

    useEffect(() => {
        getActives()
    }, [])

    const getActives = async() => {
        const res = await window.api.getActiveCars()
        console.log(res)
        setShowList(res)
    }

    return(
        <>
            <div className='Actives'>
                {showList.map(item => (
                    <div className='listItem' key={item.id}>
                        <h3>{`${getOnList(carBrandsList, item.brandId)} ${getOnList(carModelsList, item.modelId)} ${item.year}`}</h3>
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