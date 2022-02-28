const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const coinWithdraw = new Schema({
   withDrawAmount : {
      type : Number
   },
   phnNo : {
      type : String
   },
   paymentType : {
      type : String
   },
   password : {
      type : String
   },
   date : {
      type : String
   }
})

const CoinWithdraw = mongoose.model('CoinWithdraw',coinWithdraw)
module.exports = CoinWithdraw 