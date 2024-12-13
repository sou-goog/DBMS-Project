const fs = require('fs');
const { Sequelize } = require("sequelize");

const logStream = fs.createWriteStream('sequelize.log', {flags: 'a'});
const DB_NAME = "BookShopDB";
const DB_USER = "root";
const DB_PASSWORD = "dbms1234";
const DB_HOST = "localhost"; // Replace with your host if different

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql", // Use your database dialect (e.g., 'postgres', 'sqlite', etc.)
    //logging: console.log, // Enable logging to see queries in the console
    logging: (msg) => logStream.write(msg + '\n')
});

module.exports = sequelize;
