import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Input, Form, Select, DatePicker, InputNumber, message } from "antd";
import type { DatePickerProps } from 'antd';
import { appContext } from '../context/appContext'
import { carModel, carBrand } from '../context/ContextProvider'
import { newCheckin, newReg } from 'db/db';

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
    checkinId: string
}

interface AddRegProps{
    open: boolean,
    onCancel: () => void,
    checkinId: string
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

export const AddReg: React.FC<AddRegProps> = ({open, onCancel, checkinId}) => {

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

export const CheckRegs: React.FC<CheckRegsProps> = ({open, onCancel, checkinId}) => {

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
            {results.map(item => {
                const date = new Date(item.date)
                console.log(date)
                const toShow = date.toDateString()
                
                return(
                    <div className="registerItemForModalRegs">
                        <h3>Descripcion: {item.description}</h3>
                        {item.quantity != "" && <h4>Cantidad: {item.quantity}</h4>}
                        <h4>Fecha: {toShow}</h4>
                    </div>
                )
            })}
            </div>
        </Modal>    
    )
}