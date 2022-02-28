const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bitMoneySchema = new Schema({
   question : {
      type : String,
      required : true
   },
   option : {
      type : String,
      required : true
   },
   mainBitMoney :{
      type : Number,
      required : true
   },
   estReturn : {
      type : Number,
      required : true
   },
   date : {
      type : String
   }
})

const BitMoney = mongoose.model('BitMoney',bitMoneySchema)
module.exports = BitMoney