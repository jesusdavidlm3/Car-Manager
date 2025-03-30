import React, { useState, useEffect, useContext } from 'react'
import { Button, Tooltip } from 'antd'
import { PlusOutlined, FileTextOutlined, CheckOutlined } from '@ant-design/icons'
import { AddReg, CheckRegs, ConfirmCheckout } from '../components/Modals'
import { getOnList } from '../lib/functions'
import { appContext } from '../context/appContext'

const Actives: React.FC = () => {

    const { carBrandsList, carModelsList, updateActivesList } = useContext(appContext)

    const [addEntryModal, setAddEntryModal] = useState(false)
    const [checkRegsModal, setCheckRegsModal] = useState(false)
    const [confirmCheckoutModal, setConfirmCheckOutModal] = useState(false)
    const [selectedActive, setSelectedActive] = useState<string>()

    const [showList, setShowList] = useState([])

    useEffect(() => {
        getActives()
    }, [updateActivesList])

    const getActives = async() => {
        const res = await window.api.getActiveCars()
        console.log(res)
        setShowList(res)
    }

    return(
        <>
            <div className='Actives'>
                { showList.length == 0 && <h1 className='emptyMessage'>El taller esta vacio en este momento</h1> }
                {showList.map(item => (
                    <div className='listItem' key={item.id}>
                        <h3>{`${getOnList(carBrandsList, item.brandId)} ${getOnList(carModelsList, item.modelId)} ${item.year} Placa: ${item.plates}`}</h3>
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
                                    onClick={() => {setSelectedActive(item.id); setCheckRegsModal(true)}}
                                />
                            </Tooltip>
                            <Tooltip title="Agregar Registro">
                                <Button
                                    variant='solid'
                                    shape='circle'
                                    color='primary'
                                    icon={<PlusOutlined />}
                                    size='large'
                                    onClick={() => {setSelectedActive(item.id); setAddEntryModal(true)}}
                                />
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmCheckout open={confirmCheckoutModal} onCancel={() => setConfirmCheckOutModal(false)}/>
            <AddReg open={addEntryModal} onCancel={() => setAddEntryModal(false)} checkinId={selectedActive}/>
            <CheckRegs open={checkRegsModal} onCancel={() => setCheckRegsModal(false)} checkinId={selectedActive}/>

        </>
    )
}

export default Actives;