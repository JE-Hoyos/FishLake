const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    date: { type: Date, required: true, default: () => Date.now() },
    userType: { type: String, required: true },
    name: { type: String, required: true },
    given_name: { type: String },
    family_name: { type: String, required: true },
    gender: { type: String },
    profession: { type: String },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean, default: 'false' },
    telphone: { type: String },
    photo: { type: String },
    invitation: {},
    idSystem: {},
    encryptedPass: {}
});

//Extensión de metodo de encriptado de contraseña
userSchema.methods.encryptPassword = async(password) => {
    let salt = await bcrypt.genSalt(15);
    return bcrypt.hash(password, salt);
};

//Extensión de metodo de comparación de contraseñas

userSchema.methods.comparePassword = async(password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword);

}

module.exports = mongoose.model('User', userSchema);