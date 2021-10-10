const mongoose = require("mongoose");

const connectToDB = async () => {
    mongoose.connect(process.env.mongodb_url, {
        useNewUrlParser: true,
     // useFindAndModify: false,
        useUnifiedTopology: true,
    });
}

module.exports = connectToDB;