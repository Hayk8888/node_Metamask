const express = require("express");
require("dotenv").config();
const router = require('./routes/auth')
const dbConnect = require("./db/dbconnect");



const app = express();
app.use('/', router);
app.use(express.json());

const PORT = process.env.port || 5000;


const start = async() => {
    try{
        await  dbConnect()
        app.listen(PORT, () => console.log(`server listen on ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start();