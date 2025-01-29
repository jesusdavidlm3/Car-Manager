import { contextBridge } from "electron";
import * as db from "../db"

const getAllCarBrands = async () => {
    return await db.getAllCarBrands()
}

const getAllCarModels = async () => {
    return await db.getAllCarModels()
}

contextBridge.exposeInMainWorld("api", {
    getAllCarBrands: getAllCarBrands(),
    getAllCarModels: getAllCarModels()
})