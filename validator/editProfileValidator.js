const validator = require('validator')

let editProfile=(user)=>{
   let error = {}
   if (!user.email) {
      error.email =`Please enter the email please`
   }
   if (!user.country) {
      error.country =`Please enter the country please`
   } 
   if (!user.phNo) {
      error.phNo = `Please enter the phone number please`
   }

   return {
      error,
      isValid : Object.keys(error).length === 0
   }
} 

module.exports = editProfile