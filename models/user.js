const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String, required: [true, 'La contreaseña es necesaria']
  },
  companyDefault: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  state:{
    type: Boolean,
    required: [true,'El estado es obligatorio']
  }
});
module.exports = mongoose.model('User', userSchema);