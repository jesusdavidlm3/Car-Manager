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

    const [selectedBrand, setSelectedBrand] = useState()
    const [selectedModel, setSelectedModel] = useState()

    const { carBrandsList, carModelsList } = useContext(appContext)
    const [showListModels, setShowListModels] = useState([])

    const filterModels = (e: string) => {
        setShowListModels( carModelsList.filter((item:carModel) => item.brand == e))
    }

    return(
        <Modal
            destroyOnClose
            title="Ingreso al taller"
            onCancel={onCancel}
            open={open}
            footer={[
                <Button variant='solid' color='danger' onClick={onCancel}>Cancelar</Button>,
                <Button variant='solid' color='primary'>Ingresar al taller</Button>
            ]}
        >
            <Form>
                <Form.Item label="Numero de placa">
                    <Input.Search/>
                </Form.Item>
                <Form.Item label="Marca">
                    <Select options={carBrandsList} onChange={(e) => {setSelectedBrand(e), filterModels(e)}}/>
                </Form.Item>
                <Form.Item label="Modelo">
                    <Select options={showListModels}/>
                </Form.Item>
                <Form.Item label='Año'>
                    <DatePicker picker='year'/>
                </Form.Item>
                <Form.Item label="Cedula del cliente">
                    <Input.Search/>
                </Form.Item>
                <Form.Item label="Nombre del cliente">
                    <Input/>
                </Form.Item>
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