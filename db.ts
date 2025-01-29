import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.db")

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