const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/B15_BE');
    console.log("da thanh cong")
}

main().catch(err => console.log(err));

module.exports = mongoose
