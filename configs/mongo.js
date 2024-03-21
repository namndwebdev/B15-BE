const mongoose = require('mongoose');


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connect MONGO !');
}

main().catch(err => console.log(err));

module.exports = mongoose
