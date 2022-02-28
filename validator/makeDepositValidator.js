
let makeDepositValidator=(coin)=>{
   let error = {}

   if (!coin.paymentMethod) {
      error.paymentMethod = `Please enter the payment method please`
   }

   if (!coin.numberOfCoin) {
      error.numberOfCoin = `Please enter the number of coin please`
   }else if(coin.numberOfCoin < 300 && coin.numberOfCoin > 25000){
      error.numberOfCoin = `Number of coin  must be greater then 300 and smaller then 250000`
   }
   if (!coin.phoneForm) {
      error.phoneForm = `Please enter the phone number of (Phone Form) please`
   }
   if (!coin.phoneTo) {
      error.phoneTo = `Please enter the phone number of (Phone To) please`
   }
   if (!coin.password) {
      error.password = `Please enter the password please`
   }
   if (!coin.date) {
      error.date = `Please enter the date please`
   }
   return {
      error,
      isValid : Object.keys(error).length === 0
   }
} 

module.exports = makeDepositValidator