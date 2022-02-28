const validator = require('validator')

let bitMoneyValidator=(coin)=>{
   let error = {}
   if (!coin.question) {
      error.question =`Please enter the question first`
   }
   if (!coin.option) {
      error.option =`Please select your option please`
   } 
   if (!coin.mainBitMoney) {
      error.mainBitMoney =`Please input your main bitting money please`
   } 
   if (!coin.date) {
      error.date = `Please enter the date please`
   }
   return {
      error,
      isValid : Object.keys(error).length === 0
   }
} 

module.exports = bitMoneyValidator