"use strict";
const electron = require("electron");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("db.db");
const getAllCarBrands$1 = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM carBrands", (err, list) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
};
const getAllCarModels$1 = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM carModels", (err, list) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
};
const getAllCarBrands = async () => {
  return await getAllCarBrands$1();
};
const getAllCarModels = async () => {
  return await getAllCarModels$1();
};
electron.contextBridge.exposeInMainWorld("api", {
  getAllCarBrands: getAllCarBrands(),
  getAllCarModels: getAllCarModels()
});
