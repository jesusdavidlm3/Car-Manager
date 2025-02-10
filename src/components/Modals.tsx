import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Input, Form, Select, DatePicker, InputNumber, message } from "antd";
import type { DatePickerProps } from 'antd';
import { appContext } from '../context/appContext'
import { carModel, carBrand } from '../context/ContextProvider'
import { newCheckin, newReg } from 'db';

declare global {
    interface Window {
        api? : any
    }
}

interface GenericModalProps {
    open: boolean,
    onCancel: () => void
}


interface CheckRegsProps {
    open: boolean,
    onCancel: () => void,
    CheckinId: string
}

interface AddRegProps{
    open: boolean,
    onCancel: () => void,
    carId: string
}

export const NewCheckin: React.FC<GenericModalProps> = ({open, onCancel}) => {
    //Control de las listas mostradas en selectores
    const { carBrandsList, carModelsList, messageApi } = useContext(appContext)
    const [showListModels, setShowListModels] = useState([])
    
    //Datos captados para ser enviados
    const [carPlate, setCarPlate] = useState<string>()
    const [selectedBrand, setSelectedBrand] = useState<number>()
    const [selectedModel, setSelectedModel] = useState<number>()
    const [selectedYear, setSelectedYear] = useState<string>()
    const [clientIdentification, setClientIdentification] = useState<string>()
    const [clientName, setClientName] = useState<string>()
    const [foundCarId, setFoundCarId] = useState<string>(null)

    //Control de carros y clientes ya registrados
    const [carFound, setCarFound] = useState<boolean>(false)
    const [clientFound, setClientFound] = useState<boolean>(false)
    const [disablePlate, setDisablePlate] = useState<boolean>(false)
    const [disableIdentification, setDisableIdentification] = useState<boolean>(false)

    const filterModels = (e: number) => {
        setShowListModels( carModelsList.filter((item:carModel) => item.brand == e))
    }

    const checkPlate = async(e: string) => {
        const res = await window.api.checkCarPlate(e)
        if(res != false){
            setDisablePlate(true)
            setCarFound(true)
            setSelectedBrand(res.brandId)
            setSelectedModel(res.modelId)
            setFoundCarId(res.id)
        }else{
            setDisablePlate(true)
        }
    } 

    const checkId = async(e: string) => {
        const res = await window.api.checkIdentification(e)
        if(res != false){
            setDisableIdentification(true)
            setClientFound(true)
            setClientName(res.name)
        }else{
            setDisableIdentification(true)
        }
    }

    const submitCheckin = async() => {
        let carResult
        const clientId = document.getElementById("idInput").value
        const clientName = document.getElementById("nameInput").value
        const aditionalNotes = document.getElementById("aditionalNotes").value
        const currentDate = new Date()

        if(clientFound == false){
            const data = {
                id: clientId,
                name: clientName
            }
            window.api.registerClient(data)
        }

        if(carFound == false){
            const plates = document.getElementById("plateInput").value

            const data = {
                plates: plates,
                brandId: selectedBrand,
                modelId: selectedModel,
                year: selectedYear
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
            onCancel()
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
            onCancel={onCancel}
            open={open}
            footer={[
                <Button variant='solid' color='danger' onClick={onCancel}>Cancelar</Button>,
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
                        <Form.Item label='Año'>
                            <DatePicker picker='year' disabled={carFound} onChange={(e) => setSelectedYear(`${e.$y}`)}/>
                        </Form.Item>
                        <Form.Item>
                            <Input.TextArea id="aditionalNotes" placeholder='Notas Adicionales' autoSize={true}/>
                        </Form.Item>
                    </>
                ) }
                <Form.Item label="Cedula del cliente">
                    <Input.Search id='idInput' disabled={disableIdentification} onSearch={checkId}/>
                </Form.Item>
                { disableIdentification && (
                    <Form.Item label="Nombre del cliente">
                        <Input value={clientName} id='nameInput' disabled={clientFound}/>
                    </Form.Item>
                ) }
            </Form>
        </Modal>
    )
}

export const ConfirmCheckout: React.FC<GenericModalProps> = ({open, onCancel}) => {
    return(
        <Modal
            title='Confirmar retiro del taller?'
            open={open}
            onCancel={onCancel}
            footer={[
                <Button variant='solid' color='danger' onClick={onCancel}>Cancelar</Button>,
                <Button variant='solid' color='primary'>Confirmar</Button>
            ]}
        >
        </Modal>
    )
}

export const AddReg: React.FC<AddRegProps> = ({open, onCancel, carId}) => {

    const { messageApi } = useContext(appContext)

    const submitNewReg = async() => {
        const quantity = document.getElementById("quantityField").value
        const description = document.getElementById("descriptionField").value

        const data: newReg = {
            quantity: quantity,
            description: description,
            entryId: carId
        }

        const res = await window.api.newReg(data)
        if(res == true){
            messageApi.open({
                type: "success",
                content: "Agregado con exito"
            })
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

export const CheckRegs: React.FC<CheckRegsProps> = ({open, onCancel, CheckinId}) => {
    return(
        <Modal
            title="Registros"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button variant='solid' color='primary' onClick={onCancel}>Cerrar</Button>
            ]}
        >
        </Modal>    
    )
}