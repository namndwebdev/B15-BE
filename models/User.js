const mongoose = require('../configs/mongo')
const {validateEmail} = require('../helper/validateData')

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
                return validateEmail(value)
            },
            message: 'Dinh dang phai la email va phai la duy nhat'
        }
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user'
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