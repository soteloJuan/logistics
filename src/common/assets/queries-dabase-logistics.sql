create database logistic;

USE logistic;

CREATE TABLE users(
    idUser VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    createDate DATE NOT NULL,
    role VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE origins(
    idOrigin VARCHAR(50) PRIMARY KEY NOT NULL,
    address VARCHAR(50) NOT NULL,
    zipcode INT NOT NULL,
    extNum INT NOT NULL,
    intNum INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    reference VARCHAR(50) NOT NULL
);

CREATE TABLE destinations(
    idDestination VARCHAR(50) PRIMARY KEY NOT NULL,
    address VARCHAR(50) NOT NULL,
    zipcode INT NOT NULL,
    extNum INT NOT NULL,
    intNum INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    reference VARCHAR(50) NOT NULL
);

CREATE TABLE standarSizes(
    idStandarSize VARCHAR(50) PRIMARY KEY NOT NULL,
    weight FLOAT NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE statusOrders(
    idStatusOrder VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE orders(
    idOrder VARCHAR(50)  PRIMARY KEY NOT NULL,
    idUser VARCHAR(50) NOT NULL,
    idOrigin VARCHAR(50) NOT NULL,
    idDestination VARCHAR(50) NOT NULL,
    idStatusOrder VARCHAR(50) NOT NULL,
    idStandarSize VARCHAR(50) NOT NULL,
    totalPrice FLOAT NOT NULL,
    totalProduct INT NOT NULL,
    createDate DATETIME NOT NULL,

    CONSTRAINT fk_orders_users_idUser FOREIGN KEY (idUser) REFERENCES users(idUser),
    CONSTRAINT fk_orders_origins_idOrigin FOREIGN KEY (idOrigin) REFERENCES origins(idOrigin),
    CONSTRAINT fk_orders_destinations_idDestinations FOREIGN KEY (idDestination) REFERENCES destinations(idDestination),
    CONSTRAINT fk_orders_statusOrder_idStatusOrder FOREIGN KEY (idStatusOrder) REFERENCES statusOrders(idStatusOrder),
    CONSTRAINT fk_orders_standarSize_idStandarSize FOREIGN KEY (idStandarSize) REFERENCES standarSizes(idStandarSize)
);

CREATE TABLE productOrders(
    idProductOrder VARCHAR(50) PRIMARY KEY NOT NULL,
    idOrder VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    weight FLOAT NOT NULL,
    
    CONSTRAINT fk_productOrders_orders_idOrder FOREIGN KEY (idOrder) REFERENCES productOrders(idProductOrder)
);
