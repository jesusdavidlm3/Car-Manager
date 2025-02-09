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

export interface newEntry{
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

export const getAllCarBrands = async() => {
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

export const getAllCarModels = async() => {
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

export const checkIdentification = async(identification: string) => {
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

export const registerClient = async(data: newClient) => {
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

export const checkCarPlate = async (plate: string) => {
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

export const registerCar = async(data: newCar) => {
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

export const registerEntry = async(data: newEntry) => {
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

export const getActiveCars = async() => {
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

export const getEntries = async(entryId) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM regs WHERE cheingId = ?", [entryId], (err, list) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(list)
            }
        })
    })
}