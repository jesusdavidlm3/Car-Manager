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
        console.log(res);
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
        console.log(res);
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
const getAllCarBrands = async () => {
  return await getAllCarBrands$1();
};
const getAllCarModels = async () => {
  return await getAllCarModels$1();
};
const checkIdentification = async (identification) => {
  return await checkIdentification$1(identification);
};
const registerClient = async (data) => {
  return await registerClient$1(data);
};
const checkCarPlate = async (plate) => {
  return await checkCarPlate$1(plate);
};
const registerCar = async (data) => {
  return await registerCar$1(data);
};
const registerEntry = async (data) => {
  return await registerEntry$1(data);
};
const getActiveCars = async () => {
  return await getActiveCars$1();
};
const getEntries = async (entryId) => {
  return await getEntries$1(entryId);
};
electron.contextBridge.exposeInMainWorld("api", {
  getAllCarBrands: getAllCarBrands(),
  getAllCarModels: getAllCarModels(),
  checkIdentification: checkIdentification(),
  registerClient: registerClient(),
  checkCarPlate: checkCarPlate(),
  registerCar: registerCar(),
  registerEntry: registerEntry(),
  getActiveCars: getActiveCars(),
  getEntries: getEntries()
});
