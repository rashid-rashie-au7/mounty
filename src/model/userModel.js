const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    mobile: {
        type:String,
        required: true,
        unique:[true,"This Mobile is already Created! Please try another Mobile "]
        },
    email: String,
    address: {
        street: String,
        locality: String,
        city: String,
        state: String,
        pincode: String,
        cordinate_type: {type:String,enum:['Point']},
        coordinates:{
            type:[Number],
            index: '2dsphere'
        }
    }

},{ timestamps: true });

module.exports = mongoose.model('users',userSchema);