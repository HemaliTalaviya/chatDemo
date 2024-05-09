
const mongoose = require('mongoose');

async function mongoCon(params){

    mongoose.connect(process.env.MONGO_URL).then(() => console.log("connected...!!!")).catch(err => console.error('could not connected...'))

}

module.exports = mongoCon;