const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
   userName : {
      type : String,
      required : true,
      trim : true
   },
   email : {
      type : String,
      required : true,
      trim : true,
      validate : {
         validator : (email)=>{
            return validator.isEmail(email)
         },
         message : "This email is not correct.Please Enter the Correct Email Please..."
      }
   },
   country : {
      type : String,
      required : true,
      trim : true
   },
   sponsor : {
      type : String,
   },
   phNo : {
      type : String,
      required : true,
      trim : true
   },
   club :{
      type : String,
      trim : true
   },
   password : {
      type : String
   }, 
   makeDeposit : [
      {
         type : Object
      }
   ],
   coinTransfer : [
      {
         type : Object
      }
   ],
   coinWithdraw : [
      {
         type : Object
      }
   ],
   haveCoin : {
      type : Number
   },
   deposit : {
      type : Number
   },
   bitHistory : [
      {
         type : Object
      }
   ]

})

const User = mongoose.model('User', userSchema)
module.exports = User