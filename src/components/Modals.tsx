import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Input, Form, Select, DatePicker, InputNumber, List, Space } from "antd";
import type { DatePickerProps } from 'antd';
import { appContext } from '../context/appContext'
import { carModel, carBrand } from '../context/ContextProvider'
import { newCheckin, newCar, newClient } from 'db/db';

declare global {
    interface Window {
        api? : any
    }
}

interface GenericModalProps {
    open: boolean,
    onCancel: () => void
}


interface handleRegsProps extends GenericModalProps{
    checkinId: string,
    entrance?: string
}

export const NewCheckin: React.FC<GenericModalProps> = ({open, onCancel}) => {
    //Control de las listas mostradas en selectores
    const { carBrandsList, carModelsList, messageApi } = useContext(appContext)
    const [showListModels, setShowListModels] = useState([])
    
    //Datos captados para ser enviados
    // const [carPlate, setCarPlate] = useState<string>()
    const [selectedBrand, setSelectedBrand] = useState<number>()
    const [selectedModel, setSelectedModel] = useState<number>()
    const [selectedYear, setSelectedYear] = useState<string>()
    // const [clientIdentification, setClientIdentification] = useState<string>()
    const [clientName, setClientName] = useState<string>()
    const [clientPhone, setClientPhone] = useState<string>()
    const [clientAddress, setClientAddress] = useState<string>()
    const [foundCarId, setFoundCarId] = useState<string>(null)
    const [carColor, setCarColor] = useState<string>()

    //Control de carros y clientes ya registrados
    const [carFound, setCarFound] = useState<boolean>(false)
    const [clientFound, setClientFound] = useState<boolean>(false)
    const [disablePlate, setDisablePlate] = useState<boolean>(false)
    const [disableIdentification, setDisableIdentification] = useState<boolean>(false)

    //control de actualizacion para pagina de activos
    const {setUpdateActivesList} = useContext(appContext)

    const closeModal = () => {
        setCarFound(false)
        setClientFound(false)
        setDisableIdentification(false)
        setDisablePlate(false)
        onCancel()
    }

    const filterModels = (e: number) => {
        setShowListModels( carModelsList.filter((item:carModel) => item.brand == e))
    }

    const checkPlate = async(e: string) => {
        const res: car | false = await window.api.checkCarPlate(e)
        if(res != false){
            setDisablePlate(true)
            setCarFound(true)
            setSelectedBrand(res.brandId)
            setSelectedModel(res.modelId)
            setCarColor(res.color)
            setFoundCarId(res.id)
        }else{
            setDisablePlate(true)
        }
    } 

    const checkId = async(e: string) => {
        const res: client | false = await window.api.checkIdentification(e)
        if(res != false){
            setDisableIdentification(true)
            setClientFound(true)
            setClientName(res.name)
            setClientPhone(res.phone)
            setClientAddress(res.address)
        }else{
            setDisableIdentification(true)
        }
    }

    const submitCheckin = async() => {
        let carResult
        const clientId = document.getElementById("idInput").value
        const clientName = document.getElementById("nameInput").value
        const clientPhone = document.getElementById("phoneInput").value
        const clientAddress = document.getElementById("addressInput").value
        const aditionalNotes = document.getElementById("aditionalNotes").value
        const currentDate = new Date()

        if(clientFound == false){
            const data: newClient = {
                id: clientId,
                name: clientName,
                address: clientAddress,
                phone: clientPhone
            }
            window.api.registerClient(data)
        }

        if(carFound == false){
            const plates = document.getElementById("plateInput").value
            const carColor = document.getElementById("carColor").value

            const data: Omit<newCar, "id"> = {
                plates: plates,
                brandId: selectedBrand,
                modelId: selectedModel,
                year: selectedYear,
                color: carColor,
            }
            carResult = await window.api.registerCar(data)
        }

        const data: newCheckin = {
            carId: foundCarId || carResult.carId,
            clientId: clientId,
            checkingDate: currentDate,
            checkoutDate: null,
            entranceState: aditionalNotes
        }
        console.log(carResult)
        const asignedCHeckin = await window.api.registerCheckin(data)
        if(asignedCHeckin == true){
            setUpdateActivesList(1)
            closeModal()
            messageApi.open({
                type: 'success',
                content: "Entrada registrada"
            })
        }else{
            messageApi.open({
                type: "error",
                content: "ah ocurrido un error"
            })
        }
    }

    return(
        <Modal
            destroyOnClose
            title="Ingreso al taller"
            onCancel={closeModal}
            open={open}
            footer={[
                <Button variant='solid' color='danger' onClick={closeModal}>Cancelar</Button>,
                <Button variant='solid' color='primary' onClick={submitCheckin}>Ingresar al taller</Button>
            ]}
        >
            <Form>
                <Form.Item label="Numero de placa">
                    <Input.Search onSearch={checkPlate} disabled={disablePlate || carFound} id='plateInput'/>
                </Form.Item>
                { disablePlate && (
                    <>
                        <Form.Item label="Marca">
                            <Select value={selectedBrand} options={carBrandsList} onChange={(e) => {setSelectedBrand(e), filterModels(e)}} disabled={carFound}/>
                        </Form.Item>
                        <Form.Item label="Modelo">
                            <Select value={selectedModel} options={showListModels} disabled={carFound} onChange={(e) => setSelectedModel(e)}/>
                        </Form.Item>
                        <Space align='center'>
                            <Form.Item label='Año'>
                                <DatePicker picker='year' disabled={carFound} onChange={(e) => setSelectedYear(`${e.$y}`)}/>
                            </Form.Item>
                            <Form.Item label="Color">
                                <Input value={carColor} id='carColor' disabled={carFound}/>
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <Input.TextArea id="aditionalNotes" placeholder='Notas Adicionales' autoSize={true}/>
                        </Form.Item>
                    </>
                ) }
                <Form.Item label="Cedula del cliente">
                    <Input.Search id='idInput' disabled={disableIdentification} onSearch={checkId}/>
                </Form.Item>
                { disableIdentification && (<>
                    <Form.Item label="Nombre del cliente">
                        <Input value={clientName} id='nameInput' disabled={clientFound}/>
                    </Form.Item>
                    <Form.Item label="Telefono">
                        <Input value={clientPhone} id='phoneInput' disabled={clientFound}/>
                    </Form.Item>
                    <Form.Item label="Direccion">
                        <Input value={clientAddress} id='addressInput' disabled={clientFound}/>
                    </Form.Item>
                </>)}
            </Form>
        </Modal>
    )
}

export const ConfirmCheckout: React.FC<handleRegsProps> = ({open, onCancel, checkinId}) => {

    const {setUpdateActivesList} = useContext(appContext)

    const handleConfirm = async() => {
        const res = await window.api.checkout(checkinId)
        setUpdateActivesList(1)
        onCancel()
    }

    return(
        <Modal
            title='Confirmar retiro del taller?'
            open={open}
            onCancel={onCancel}
            footer={[
                <Button variant='solid' color='danger' onClick={onCancel}>Cancelar</Button>,
                <Button variant='solid' color='primary' onClick={handleConfirm}>Confirmar</Button>
            ]}
        >
        </Modal>
    )
}

export const AddReg: React.FC<handleRegsProps> = ({open, onCancel, checkinId}) => {

    const { messageApi, setUpdateActivesList } = useContext(appContext)

    const submitNewReg = async() => {
        const quantity = document.getElementById("quantityField").value
        const description = document.getElementById("descriptionField").value
        const currentDate = new Date()

        const data: newReg = {
            quantity: quantity,
            description: description,
            entryId: checkinId,
            date: currentDate
        }
        const res = await window.api.newReg(data)
        if(res == true){
            messageApi.open({
                type: "success",
                content: "Agregado con exito"
            })
            setUpdateActivesList(1)
            onCancel()
        }else{
            messageApi.open({
                type: "error",
                content: "ah ocurrido un error"
            })
        }
    }

    return(
        <Modal
            destroyOnClose
            title="Agregar entrada al registro"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button variant='solid' color='danger' onClick={onCancel}>Cancelar</Button>,
                <Button variant='solid' color='primary' onClick={submitNewReg}>Aceptar</Button>
            ]}
        >
            <Form>
                <Form.Item label="Cantidad (Opcional)">
                    <InputNumber id="quantityField"/>
                </Form.Item>
                <Form.Item label="Descripcion">
                    <Input.TextArea autoSize={true} id="descriptionField"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const CheckRegs: React.FC<handleRegsProps> = ({open, onCancel, checkinId, entrance}) => {

    const [results, setResults] = useState<object>([])

    useEffect(() => {
        getInfo()
    }, [open])

    const getInfo = async() => {
        const res: object = await window.api.getRegs(checkinId)
        setResults(res)
        console.log(res)
    }

    return(
        <Modal
            title="Registros"
            open={open}
            onCancel={onCancel}
            width={700}
            footer={[
                <Button variant='solid' color='primary' onClick={onCancel}>Cerrar</Button>
            ]}
        >
            <div className='modalRegItemContainer'>
            {entrance && (<h4>Estado de entrada: {entrance}</h4>)}
            <List bordered >
            {results.map(item => {
                const date = new Date(item.date)
                const toShow = date.toDateString()
                
                return(
                    <List.Item>
                        <List.Item.Meta 
                            title={item.description}
                            description={(<>
                                {`Fecha: ${toShow}. `}
                                {item.quantity != "" && `Cantidad: ${item.quantity}`}
                            </>)}
                        />
                    </List.Item>
                )
            })}
            </List>
            </div>
        </Modal>    
    )
}