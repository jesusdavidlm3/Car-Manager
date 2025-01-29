import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.db")

export  interface newClient{
    id: String,
    name: String
}

export interface newCar{
    plates: String,
    brandId: Number,
    modelId: Number,
    year: String 
}

export interface newEntry{
    carId: String,
    clientId: String,
    checkingDate: String,
    checkoutDate: String | null,
    entranceState: String
}

export interface newReg{
    quantity: Number | null,
    description: String,
    entryId: String
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
                console.log(res)
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

export const checkCarPlate = async (plate: String) => {
    return new Promise((resolve, reject) => {
            db.get("SELECT * FROM cars WHERE plates = ?", [plate], (err, res) => {
                if(err){
                    console.log(err)
                    reject(err)
                }else{
                    console.log(res)
                }
            })
        })
}

export const registerCar = async(data: newCar) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO cars(plates, brandId, modelId, year) VALUES(?, ?, ?, ?)", [{data}], (err, res) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(true)  //Hay que devolver el ID del carro porque se usara para registrar el ingreso
            }
        })
    })
}

export const registerEntry = async(data: newEntry) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Cheking(carId, clientId, chekingDate, checkoutDate, entranceState)", [{data}], (err, res) => {
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
        db.all("SELECT * FROM cars WHERE checkoutDate = null", (err, list) => {
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