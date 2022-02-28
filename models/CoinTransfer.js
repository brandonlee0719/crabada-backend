const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coinTransfer = new Schema({
   userName : {
      type : String,
      required : true,
      trim : true
   },
   numberOfCoin : {
      type : Number,
      required : true,
      trim : true
   },
   password : {
      type : String
   }
})
const CoinTransfer = mongoose.model('CoinTransfer',coinTransfer)
module.exports = CoinTransfer 