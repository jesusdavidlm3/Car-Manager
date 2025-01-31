import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Input, Form, Select, DatePicker, InputNumber } from "antd";
import type { DatePickerProps } from 'antd';
import { appContext } from '../context/appContext'
import { carModel, carBrand } from '../context/ContextProvider'

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

export const NewCheckin: React.FC<GenericModalProps> = ({open, onCancel}) => {
    //Control de las listas mostradas en selectores
    const { carBrandsList, carModelsList } = useContext(appContext)
    const [showListModels, setShowListModels] = useState([])
    
    //Datos captados para ser enviados
    const [carPlate, setCarPlate] = useState<string>()
    const [selectedBrand, setSelectedBrand] = useState<number>()
    const [selectedModel, setSelectedModel] = useState<number>()
    const [selectedYear, setSelectedYear] = useState<string>()
    const [clientIdentification, setClientIdentification] = useState<string>()
    const [FoundCarId, setFoundCarId] = useState<string>("Prueba")

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
            // setSelectedBrand(res.brandId)
            // setSelectedModel(res.modelId)
            // setFoundCarId(res.carId)
        }else{
            setDisablePlate(true)
        }
    } 

    const checkId = async(e: string) => {
        const res = await window.api.checkIdentification(e)
        if(res != false){
            setDisableIdentification(true)
            setClientFound(true)
        }else{
            setDisableIdentification(true)
        }
    }

    const submitEntry = () => {
        if(carFound == false){
            const plates = document.getElementById("plateInput").value

            const data = {
                plates: plates,
                brandId: selectedBrand,
                modelId: selectedModel,
                year: selectedYear
            }
            // window.api.registerCar(data)
            console.log(data)
        }

        if(clientFound == false){
            const id = document.getElementById("idInput").value
            const name = document.getElementById("nameInput").value

            const data = {
                id: id,
                name: name
            }
            // window.api.registerClient(data)
            console.log(data)
        }

        const data = {

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
                <Button variant='solid' color='primary' onClick={submitEntry}>Ingresar al taller</Button>
            ]}
        >
            <Form>
                <Form.Item label="Numero de placa">
                    <Input.Search onSearch={checkPlate} disabled={disablePlate || carFound} id='plateInput'/>
                </Form.Item>
                { disablePlate && (
                    <>
                        <Form.Item label="Marca">
                            <Select options={carBrandsList} onChange={(e) => {setSelectedBrand(e), filterModels(e)}} disabled={carFound}/>
                        </Form.Item>
                        <Form.Item label="Modelo">
                            <Select options={showListModels} disabled={carFound} onChange={(e) => setSelectedModel(e)}/>
                        </Form.Item>
                        <Form.Item label='Año'>
                            <DatePicker picker='year' disabled={carFound} onChange={(e) => setSelectedYear(`${e.$y}`)}/>
                        </Form.Item>
                    </>
                ) }
                <Form.Item label="Cedula del cliente">
                    <Input.Search id='idInput' disabled={disableIdentification} onSearch={checkId}/>
                </Form.Item>
                { disableIdentification && (
                    <Form.Item label="Nombre del cliente">
                        <Input id='nameInput' disabled={clientFound}/>
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

export const AddEntry: React.FC<GenericModalProps> = ({open, onCancel}) => {
    return(
        <Modal
            title="Agregar entrada al registro"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button variant='solid' color='danger' onClick={onCancel}>Cancelar</Button>,
                <Button variant='solid' color='primary'>Aceptar</Button>
            ]}
        >
            <Form>
                <Form.Item label="Cantidad (Opcional)">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Descripcion">
                    <Input.TextArea autoSize={true} />
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