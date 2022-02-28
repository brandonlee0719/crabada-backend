const validator = require('validator')

let logInValidator=(user)=>{
   let error = {}

   if(!user.email){
      error.email = "Please enter your email please"
   }else if(!validator.isEmail(user.email)){
      error.email = "Please enter the correct format of email please"
   }

   if (!user.password) {
      error.password = `Please enter the password please`
   }else if(user.password.length < 3){
      error.password = `Password must be longer then 3 characters`
   }

   
   return {
      error,
      isValid : Object.keys(error).length === 0
   }
}

module.exports = logInValidator