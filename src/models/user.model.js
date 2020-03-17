const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const UserSchema = new Schema({
    name: { type: String, required: true } ,
    username: { type: String, required: true },
    password: { type: String, required: true }
});

//para que los usuarios no vean la contraseña
UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
};

// metodo para comparar contraseñas
UserSchema.methods.comparePasswords = function(password){
    return compareSync(password, this.password);
};

// cada vez que se vaya a guardar un usuario se le aplica la logica para hashear el password
UserSchema.pre("save", async function(next){
    const user = this; // this hace referencia al usuario que se esta guardando

    if (!user.isModified("password")) {
        return next();   
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();

});


module.exports = mongoose.model("user", UserSchema);

