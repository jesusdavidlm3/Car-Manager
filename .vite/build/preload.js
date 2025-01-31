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
const checkIdentification$1 = async (identification) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM clients WHERE id = ?", [identification], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (res == void 0) {
          resolve(false);
        } else {
          resolve(res);
        }
      }
    });
  });
};
const registerClient$1 = async (data) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO clients(id, name) VALUES(?, ?)", [data.id, data.name], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
const checkCarPlate$1 = async (plate) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM cars WHERE plates = ?", [plate], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (res == void 0) {
          resolve(false);
        } else {
          resolve(res);
        }
      }
    });
  });
};
const registerCar$1 = async (data) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO cars(plates, brandId, modelId, year) VALUES(?, ?, ?, ?)", [{ data }], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
const registerEntry$1 = async (data) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO Cheking(carId, clientId, chekingDate, checkoutDate, entranceState)", [{ data }], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
const getActiveCars$1 = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM cars WHERE checkoutDate = null", (err, list) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
};
const getEntries$1 = async (entryId) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM regs WHERE cheingId = ?", [entryId], (err, list) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
};
async function getAllCarBrands() {
  return await getAllCarBrands$1();
}
async function getAllCarModels() {
  return await getAllCarModels$1();
}
async function checkIdentification(identification) {
  return await checkIdentification$1(identification);
}
async function registerClient(data) {
  return await registerClient$1(data);
}
async function checkCarPlate(plate) {
  return await checkCarPlate$1(plate);
}
async function registerCar(data) {
  return await registerCar$1(data);
}
async function registerEntry(data) {
  return await registerEntry$1(data);
}
async function getActiveCars() {
  return await getActiveCars$1();
}
async function getEntries(entryId) {
  return await getEntries$1(entryId);
}
electron.contextBridge.exposeInMainWorld("api", {
  getAllCarBrands,
  getAllCarModels,
  checkIdentification,
  registerClient,
  checkCarPlate,
  registerCar,
  registerEntry,
  getActiveCars,
  getEntries
});
