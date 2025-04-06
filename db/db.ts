import sqlite3 from "sqlite3";
import { v4 as idGenerator } from "uuid";
import * as queries from './queries'

const db = new sqlite3.Database("./db.db")
db.exec(queries.creationQuery)

export  interface newClient{
    id: string,
    name: string,
    phone: string,
    address: string
}

export interface newCar{
    id: string,
    plates: string,
    brandId: number,
    modelId: number,
    year: string ,
    color: string
}

export interface newCheckin{
    carId: string,
    clientId: string,
    checkingDate: Date,
    checkoutDate: Date | null,
    entranceState: string
}

export interface newRegData{
    quantity: number | null,
    description: string,
    entryId: string,
    date: Date
}

export const getAllCarBrands = async() => {     //Devuelve la lista de todas las marcas de carros
    return new Promise((resolve, reject) => {
        db.all(queries.getAllCarBrands, (err, list) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(list)
            }
        })
    })
}

export const getAllCarModels = async() => {     //Devuelve la lista de todos los modelos de carros
    return new Promise((resolve, reject) => {
        db.all(queries.getAllCarModels, (err, list) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(list)
            }
        })
    })
}

export const checkIdentification = async(identification: string) => {       //Revisa si un cliente esta registrado y devuelve su info
    return new Promise((resolve, reject) => {
        db.get(queries.checkIdentification, [identification], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                if(res == undefined){
                    resolve(false)
                }else{
                    resolve(res)
                }
            }
        })
    })
}

export const registerClient = async(data: newClient) => {       //Registra un cliente nuevo
    return new Promise((resolve, reject) => {
        db.run(queries.registerClient, [data.id, data.name, data.phone, data.address], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}

export const checkCarPlate = async (plate: string) => {     //Revisa si un carro esta registrado y devuelve su info
    return new Promise((resolve, reject) => {
            db.get(queries.checkCarPlate, [plate], (err, res) => {
                if(err){
                    console.log(err)
                    reject(err)
                }else{
                    if(res == undefined){
                        resolve(false)
                    }else{
                        console.log(res)
                        resolve(res)
                    }
                }
            })
        })
}

export const registerCar = async(data: newCar) => {     //registra la informacion de un carro nuevo
    return new Promise((resolve, reject) => {

        const newId = idGenerator()
        const plates = data.plates
        const brandId = data.brandId
        const modelId = data.modelId
        const year = data.year
        const color = data.color

        db.run(queries.registerCar, [newId, plates, brandId, modelId, year, color], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve({
                    result: true,
                    carId: newId
                }) 
            }
        })
    })
}

export const registerCheckin = async(data: newCheckin) => {     //Registra el ingreso al taller de un carro registrado
    return new Promise((resolve, reject) => {

        const newId = idGenerator()
        const carId = data.carId
        const clientId = data.clientId
        const checkingDate = data.checkingDate
        const checkoutDate = data.checkoutDate
        const entranceState = data.entranceState

        db.run(queries.registerCheckin, [newId, carId, clientId, checkingDate, checkoutDate, entranceState], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}

export const getActiveCars = async() => {       //Devuelve una lista de los carros ingreados al taller que aun no se hayan entregado
    return new Promise((resolve, reject) => {
        db.all(queries.getActiveCars, (err, list) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(list)
            }
        })
    })
}

export const getRegs = async(checkinId: string) => {   //Devuelve el historial de un carro durante in ingreso especifico al taller
    return new Promise((resolve, reject) => {
        db.all(queries.getRegs, [checkinId], (err, list) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(list)
            }
        })
    })
}

export const newReg = async(data: newRegData) => {  //Agrega un registro al historial de un carro durante un ingreso especifico al taller
    const id = idGenerator()
    const checkinId = data.entryId
    const quantity = data.quantity
    const description = data.description
    const date = data.date
    
    return new Promise((resolve, reject) => {
        db.run(queries.newReg, [id, checkinId, quantity, description, date], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}

export const getAllCarChecks = async(plates: string) => {
    return new Promise((resolve, reject) => {
        db.all(queries.getAllCarChecks, [plates], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
} 

export const checkout = async(checkId: string) => {
    const currentDate = new Date()
    console.log(currentDate, checkId)
    return new Promise((resolve, reject) => {
        db.run(queries.checkout, [currentDate, checkId], (err) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}