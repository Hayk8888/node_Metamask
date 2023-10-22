const  mongoose = require('mongoose');


const  dbConnect = async () => {
    try {
        await  mongoose.connect(process.env.MONGO);
        console.log('mongoose is  connected');
    }catch(err){
        console.log(err)
        console.log('error  to connect  mongoose');
    }

}

module.exports = dbConnect
