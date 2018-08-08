const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema({
  name: {
    type: String,
    required: [true,'El nombre es obligatorio']
  }
});
module.exports = mongoose.model('Company', companySchema);