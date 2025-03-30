import { contextBridge } from "electron";
import * as db from "../db/db"
import { newClient, newCar, newCheckin, newReg } from '../db/db'

async function getAllCarBrands(){       //Devuelve la lista de marcas de carros
    return await db.getAllCarBrands()
}

async function getAllCarModels(){       //Devuelve la lista de modelos en general
    return await db.getAllCarModels()
}

async function checkIdentification(identification: string){     //Revisa si un cliente esta registrado y devuelve sus datos
    return await db.checkIdentification(identification)
}

async function registerClient(data: newClient){     //Guarda la informacion de un cliente nuevo
    return await db.registerClient(data)
}

async function checkCarPlate(plate: string){        //Revisa si un carro esta registrado y devuelve su informacion
    return await db.checkCarPlate(plate)   
}

async function registerCar(data: newCar){       //Guarda la informacion de un carro nuevo
    return await db.registerCar(data)
}

async function registerCheckin(data: newCheckin){     //registra el ingreso al taller de un carro ya agregado
    return await db.registerCheckin(data)
}

async function getActiveCars(){                 //Devuelve una lista de los carros ingresados al taller que no se han entregado
    return await db.getActiveCars()
}

async function getRegs(checkinId: string){     //Devuelve el historial de un carro durante un ingreso especifico al taller
    return await db.getRegs(checkinId)
}

async function newReg(data: newReg){                        //Agrega registros nuevos al historial de un carro durante un ingreso especifico al taller
    return await db.newReg(data)
}

contextBridge.exposeInMainWorld("api", {
    getAllCarBrands: getAllCarBrands,
    getAllCarModels: getAllCarModels,
    checkIdentification: checkIdentification,
    registerClient: registerClient,
    checkCarPlate: checkCarPlate,
    registerCar: registerCar,
    registerCheckin: registerCheckin,
    getActiveCars: getActiveCars,
    getRegs: getRegs,
    newReg: newReg
})