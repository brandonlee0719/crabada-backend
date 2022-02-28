const mongoose = require('mongoose')
const Schema = mongoose.Schema

const makeDepositSchema = new Schema({
   paymentMethod : {
      type : String,
      required : true
   },
   numberOfCoin : {
      type : Number
   },
   phoneForm : {
      type : String
   },
   phoneTo : {
      type : String
   },
   date : {
      type : String
   }
})

const MakeDeposit = mongoose.model('MakeDeposit',makeDepositSchema)
module.exports = MakeDeposit 