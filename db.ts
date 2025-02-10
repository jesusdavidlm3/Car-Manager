import sqlite3 from "sqlite3";
import { v4 as idGenerator } from "uuid";

const db = new sqlite3.Database("db.db")

export  interface newClient{
    id: string,
    name: string
}

export interface newCar{
    plates: string,
    brandId: number,
    modelId: number,
    year: string 
}

export interface newCheckin{
    carId: string,
    clientId: string,
    checkingDate: Date,
    checkoutDate: Date | null,
    entranceState: string
}

export interface newReg{
    quantity: number | null,
    description: string,
    entryId: string
}

export const getAllCarBrands = async() => {     //Devuelve la lista de todas las marcas de carros
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM carBrands", (err, list) => {
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
        db.all("SELECT * FROM carModels", (err, list) => {
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
        db.get("SELECT * FROM clients WHERE id = ?", [identification], (err, res) => {
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
        db.run("INSERT INTO clients(id, name) VALUES(?, ?)", [data.id, data.name], (err, res) => {
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
            db.get("SELECT * FROM cars WHERE plates = ?", [plate], (err, res) => {
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

        db.run("INSERT INTO cars(id, plates, brandId, modelId, year) VALUES(?, ?, ?, ?, ?)", [newId, plates, brandId, modelId, year], (err, res) => {
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

        db.run("INSERT INTO Checkin(id, carId, clientId, checkinDate, checkoutDate, entranceState) VALUES(?, ?, ?, ?, ?, ?)", [newId, carId, clientId, checkingDate, checkoutDate, entranceState], (err, res) => {
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
        db.all(`SELECT * FROM Checkin INNER JOIN cars ON cars.id = Checkin.carId WHERE checkoutDate IS NULL`, (err, list) => {
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
        db.all("SELECT * FROM regs WHERE cheingId = ?", [checkinId], (err, list) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(list)
            }
        })
    })
}

export const newReg = async(data: newReg) => {  //Agrega un registro al historial de un carro durante un ingreso especifico al taller
    const id = idGenerator()
    const checkinId = data.entryId
    const quantity = data.quantity
    const description = data.description
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO regs(id, checkinId, quantity, description) VALUES(?, ?, ?, ?)", [id, checkinId, quantity, description], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}