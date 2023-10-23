const express = require("express");
require("dotenv").config();
const router = require('./routes/auth')
const dbConnect = require("./db/dbconnect");
const path = require("path");
const  cors = require("cors");




const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
const PORT = process.env.port || 5000;

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'views', 'index.html');

    res.sendFile(indexPath);
});

const start = async() => {
    try{
        await  dbConnect()
        app.listen(PORT, () => console.log(`server listen on ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start();