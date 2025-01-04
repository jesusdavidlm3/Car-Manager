

CREATE TABLE cars (
  id text NOT NULL PRIMARY KEY,
  plates text NOT NULL,
  brandId integer NOT NULL,
  modelId integer NOT NULL,
  year text NOT NULL
);


CREATE TABLE carBrands (
  id integer NOT NULL PRIMARY KEY,
  name text
);


CREATE TABLE carModels (
  id integer NOT NULL PRIMARY KEY,
  brandId integer,
  name text
);


CREATE TABLE clients (
  id text NOT NULL PRIMARY KEY,
  name integer NOT NULL
);


CREATE TABLE Checkin (
  id text NOT NULL PRIMARY KEY,
  carId text NOT NULL,
  clientId text NOT NULL,
  chekinDate datetime NOT NULL,
  chekoutDate datetime,
  entranceState text
);


CREATE TABLE regs (
  id text NOT NULL PRIMARY KEY,
  chekinId text NOT NULL,
  quantity integer,
  description text NOT NULL
);


ALTER TABLE cars ADD CONSTRAINT cars_brandId_fk FOREIGN KEY (brandId) REFERENCES carBrands (id);
ALTER TABLE cars ADD CONSTRAINT cars_modelId_fk FOREIGN KEY (modelId) REFERENCES carModels (id);
ALTER TABLE carModels ADD CONSTRAINT carModels_brandId_fk FOREIGN KEY (brandId) REFERENCES carBrands (id);
ALTER TABLE Checkin ADD CONSTRAINT Checkin_clientId_fk FOREIGN KEY (clientId) REFERENCES clients (id);
ALTER TABLE Checkin ADD CONSTRAINT Checkin_carId_fk FOREIGN KEY (carId) REFERENCES cars (id);
ALTER TABLE regs ADD CONSTRAINT regs_chekinId_fk FOREIGN KEY (chekinId) REFERENCES Checkin (id);
