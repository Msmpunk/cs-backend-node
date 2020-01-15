"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import path from 'path'
import fs from "fs";

import { port, db_name, db_host} from './api/config/config'
import router from './api/routes/routes';
import pkg from "./package.json";


const app = express();
const models_path = path.join(__dirname, './api/models');  

fs.readdirSync(models_path).forEach((file) => {
    require(models_path+'/'+file)
})

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);

// Conexión a la base de datos
mongoose.connect(`mongodb://${db_host}:27017/${db_name}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log('* Base de datos: \x1b[32m%s\x1b[0m', 'online'))


app.listen(port, () => {
    const banner = `
*********************************************************************************************
*
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author}
*
* Server listening on port: ${port}
* DB: mongodb://${db_host}:27017/${db_name}
* http://${db_host}:${port}/
*
*********************************************************************************************`;
    console.debug(banner);
    console.log('* Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})