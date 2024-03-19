const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb+srv://admin:Admin%401234@cluster0.njqgn0s.mongodb.net/B15_BE');
}

main().catch(err => console.log(err));

module.exports = mongoose
