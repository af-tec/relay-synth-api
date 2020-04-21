const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    

    email: {
        type: String, 
        required: true,
        unique: true,
        min: 6,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },

    totalScore: {
        type: Number,
        default: 0
    },
    tutorialsCompleted: [{
        type: Number,
        ref: 'Tutorial',
        default: []
    }],
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isNew) { 
        this.password = await this.hashPassword(user.password);
    }
    next();

});


userSchema.methods.hashPassword = async function(password) {
    let salt;
    /* istanbul ignore else */
    if(process.env.NODE_ENV = 'test') {
        salt =  await bcrypt.genSalt(1);
    } else {
        salt =  await bcrypt.genSalt(10);
    }
    let hashedPassword  = await bcrypt.hash(password, salt);
    return hashedPassword
}

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}


module.exports = mongoose.model('Users', userSchema);