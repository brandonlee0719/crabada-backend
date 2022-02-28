let coinTransferValidator = (coin) => {
   let error = {}
   if (!coin.userName) {
      error.userName = `Please enter the user name please`
   }
   if (!coin.numberOfCoin) {
      error.numberOfCoin = `Please enter the number of coin you want to transfer please`
   }
   if (!coin.password) {
      error.password = `Please enter the password please`
   }
   return {
      error,
      isValid: Object.keys(error).length == 0
   }
}

module.exports = coinTransferValidator