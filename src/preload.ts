import { contextBridge } from "electron";
import * as db from "../db"
import { newClient, newCar, newEntry, newReg } from '../db.ts'

async function getAllCarBrands(){
    return await db.getAllCarBrands()
}

async function getAllCarModels(){
    return await db.getAllCarModels()
}

async function checkIdentification(identification: string){
    return await db.checkIdentification(identification)
}

async function registerClient(data: newClient){
    return await db.registerClient(data)
}

async function checkCarPlate(plate: string){
    return await db.checkCarPlate(plate)   
}

async function registerCar(data: newCar){
    return await db.registerCar(data)
}

async function registerEntry(data: newEntry){
    return await db.registerEntry(data)
}

async function getActiveCars(){
    return await db.getActiveCars()
}

async function getEntries(entryId: String){
    return await db.getEntries(entryId)
}

contextBridge.exposeInMainWorld("api", {
    getAllCarBrands: getAllCarBrands,
    getAllCarModels: getAllCarModels,
    checkIdentification: checkIdentification,
    registerClient: registerClient,
    checkCarPlate: checkCarPlate,
    registerCar: registerCar,
    registerEntry: registerEntry,
    getActiveCars: getActiveCars,
    getEntries: getEntries
})