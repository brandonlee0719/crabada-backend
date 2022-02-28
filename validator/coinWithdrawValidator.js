let coinWithdrawValidator = (coin) => {
   let error = {}
   if (!coin.withDrawAmount) {
      error.withDrawAmount = `Please enter the number of coin you want to withdraw please`
   } else if (coin.withDrawAmount < 300 && coin.withDrawAmount > 25000) {
      error.numberOfCoin = `Number of coin  must be greater then 300 and smaller then 250000`
   }
   if (!coin.phnNo) {
      error.phnNo = `Please enter the phone number please`
   }
   if (!coin.paymentType) {
      error.paymentType = `Please enter the payment type please`
   }
   if (!coin.password) {
      error.password = `Please enter the password please`
   }
   if (!coin.date) {
      error.date = `Please enter the date please`
   }
   return {
      error,
      isValid: Object.keys(error).length == 0
   }
}

module.exports = coinWithdrawValidator