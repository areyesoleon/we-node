const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema({
  name: {
    type: String,
    unique:true,
    required: [true,'El nombre es obligatorio']
  },
  state: {
    type: Boolean,
    required: [true,'El estado es obligatorio']
  }
});
module.exports = mongoose.model('Company', companySchema);