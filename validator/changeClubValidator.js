const validator = require('validator')

let changeClubValidator=(user)=>{
   let error = {}
   if (!user.club) {
      error.club =`Please enter the club name please`
   }

   if (!user.password) {
      error.password = `Please enter the password please`
   }

   return {
      error,
      isValid : Object.keys(error).length === 0
   }
} 

module.exports = changeClubValidator