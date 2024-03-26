const mongoose = require('../configs/mongo')
let emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/img

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50,
        require: true,
        default: ''
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: (value)=>{
                return emailRegex.test(value)
            },
            message: 'Dinh dang phai la email va phai la duy nhat'
        }
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
      next(new Error('email must be unique'));
    } else {
      next(error);
    }
});

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel