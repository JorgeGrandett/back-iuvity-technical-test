const dotenv = require('dotenv');

if (process.env.NODE_ENV != 'production') {
    dotenv.config();
}

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const uri = process.env.DB_URI || '';

async function connect_to_database() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(`Error connecting to uri: ${uri}`);
        console.error(error);
    }
}
  
const db = mongoose.connection;
  
db.once('open', () => {
    console.log(`Connected to mongoDB successfully`);
});

module.exports = connect_to_database;