let passwordChangeValidation = (user) => {
   let error = {}
   let newArray = []
   let chr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


   if (!user.currentPassword) {
      error.currentPassword = `Please enter the current password please`
   }
   if (!user.newPassword) {
      error.newPassword = `Please enter the new password please`
   } else {
      let kip = user.newPassword.split('')

      kip.forEach(value1 => {
         chr.forEach(value2 => {
            if (value1 == value2) {
               newArray.push(value1)
            }
         })
         return newArray
      })
      if (newArray.length === 0) {
         error.newPassword = `Please enter a character please`
      }
   }

   if (!user.confirmPassword) {
      error.confirmPassword = `Please enter the confirm password please`
   } else if (user.newPassword !== user.confirmPassword) {
      error.confirmPassword = `Confirm Password does not match with new password.`
   }

   return {
      error,
      isValid: Object.keys(error).length === 0
   }
}

module.exports = passwordChangeValidation