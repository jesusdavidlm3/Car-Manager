import { contextBridge } from "electron";
import * as db from "../db"

const getAllCarBrands = async () => {
    return await db.getAllCarBrands()
}

contextBridge.exposeInMainWorld("api", {
    gerAllCarBrands: getAllCarBrands()
})