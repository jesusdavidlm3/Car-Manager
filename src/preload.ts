import { contextBridge } from "electron";
import * as db from "../db"
import { newClient, newCar, newEntry, newReg } from '../db.ts'

const getAllCarBrands = async () => {
    return await db.getAllCarBrands()
}

const getAllCarModels = async () => {
    return await db.getAllCarModels()
}

const checkIdentification = async (identification: String) => {
    return await db.checkIdentification(identification)
}

const registerClient = async (data: newClient) => {
    return await db.registerClient(data)
}

const checkCarPlate = async (plate: String) => {
    return await db.checkCarPlate(plate)   
}

const registerCar = async (data: newCar) => {
    return await db.registerCar(data)
}

const registerEntry = async (data) => {
    return await db.registerEntry(data)
}

const getActiveCars = async () => {
    return await db.getActiveCars()
}

const getEntries = async (entryId) => {
    return await db.getEntries(entryId)
}

contextBridge.exposeInMainWorld("api", {
    getAllCarBrands: getAllCarBrands(),
    getAllCarModels: getAllCarModels(),
    checkIdentification: checkIdentification(),
    registerClient: registerClient(),
    checkCarPlate: checkCarPlate(),
    registerCar: registerCar(),
    registerEntry: registerEntry(),
    getActiveCars: getActiveCars(),
    getEntries: getEntries()
})