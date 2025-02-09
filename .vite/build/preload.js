"use strict";
const electron = require("electron");
const sqlite3 = require("sqlite3");
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = { randomUUID };
function v4(options, buf, offset) {
  var _a;
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
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
          console.log(res);
          resolve(res);
        }
      }
    });
  });
};
const registerCar$1 = async (data) => {
  return new Promise((resolve, reject) => {
    const newId = v4();
    const plates = data.plates;
    const brandId = data.brandId;
    const modelId = data.modelId;
    const year = data.year;
    db.run("INSERT INTO cars(id, plates, brandId, modelId, year) VALUES(?, ?, ?, ?, ?)", [newId, plates, brandId, modelId, year], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({
          result: true,
          carId: newId
        });
      }
    });
  });
};
const registerEntry$1 = async (data) => {
  return new Promise((resolve, reject) => {
    const newId = v4();
    const carId = data.carId;
    const clientId = data.clientId;
    const checkingDate = data.checkingDate;
    const checkoutDate = data.checkoutDate;
    const entranceState = data.entranceState;
    db.run("INSERT INTO Checkin(id, carId, clientId, checkinDate, checkoutDate, entranceState) VALUES(?, ?, ?, ?, ?, ?)", [newId, carId, clientId, checkingDate, checkoutDate, entranceState], (err, res) => {
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
