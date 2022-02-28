const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registrationValidator = require('../validator/registrationValidator')
const logInValidator = require('../validator/logInValidator')
const passwordChangeValidation = require('../validator/passwordChangeValidator')
const editProfile = require('../validator/editProfileValidator')
const changeClubValidator = require('../validator/changeClubValidator')
const { response } = require('express')


registration = (req, res) => {
   let {
      userName,
      email,
      country,
      sponsor,
      phNo,
      club,
      password,
      confirmPassword
   } = req.body
   let valid = registrationValidator({
      userName,
      email,
      country,
      phNo,
      password,
      confirmPassword
   })
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   } else {
      User.findOne({
            email
         })
         .then((user) => {
            if (user) {
               res.status(200).json({
                  message: "Email already exist.Please enter a new email"
               })
            } else {
               bcrypt.hash(req.body.password, 12, (err, hash) => {
                  if (err) {
                     res.status(400).json({
                        message: "Password hash error occurred.",
                        error: err
                     })
                  } else {
                     let user = new User({
                        userName,
                        email,
                        country,
                        sponsor,
                        phNo,
                        club,
                        password: hash,
                        makeDeposit: [],
                        coinTransfer: [],
                        coinWithdraw: [],
                        haveCoin: 0,
                        deposit : 0,
                        bitHistory : []
                     })
                     user.save()
                        .then((response) => {
                           res.status(201).json({
                              message: "User saved Successfully..",
                              response
                           })
                        })
                        .catch((error) => {
                           res.status(400).json({
                              message: "User Saved Error Occurred",
                              error
                           })
                        })
                  }
               })
            }
         })
         .catch((error) => {
            res.status(500).json({
               message: "Server Error Occurred",
               error
            })
         })
   }
}

logIn = (req, res) => {
   let {
      email,
      password
   } = req.body
   let validator = logInValidator({
      email,
      password
   })
   if (!validator.isValid) {
      res.status(400).json(validator.error)
   } else {
      User.findOne({
            email
         })
         .then((user) => {
            if (!user) {
               res.status(400).json({
                  message: "User not found"
               })
            }

            bcrypt.compare(password, user.password, (err, result) => {
               if (err) {
                  res.status(400).json({
                     message: "Hash Password Compare error Occurred.."
                  })
               }
               if (!result) {
                  return res.status(400).json({
                     message: "Password not matched."
                  })
               }

               if (result) {
                  let token = jwt.sign({
                     _id: user._id,
                     name: user.name,
                     email: user.email,
                     country: user.country,
                     sponsor: user.sponsor,
                     phNo: user.phNo,
                     club: user.phNo,
                     makeDeposit: user.makeDeposit,
                     coinTransfer: user.coinTransfer,
                     coinWithdraw: user.coinWithdraw,
                     haveCoin: user.haveCoin,
                     deposit : user.deposit,
                     bitHistory : user.bitHistory
                  }, 'SECRET_KEY', {
                     expiresIn: '6h'
                  })
                  res.status(200).json({
                     message: "Login successfully..",
                     token: `Bearer ${token}`
                  })
               }
            })
         })
         .catch((error) => {
            res.status(500).json({
               message: "Server Error Occurred",
               error
            })
         })
   }
}

getAllUser = (req, res) => {
   User.find()
      .then((users) => {
         if (users.length === 0) {
            res.status(200).json({
               message: "No user found.",
            })
         } else {
            res.status(200).json({
               message: "Get all registered user",
               users
            })
         }

      })
      .catch((error) => {
         res.status(500).json({
            message: "Get all user error occurred",
            error
         })
      })
}

getSingleUser=(req,res)=>{
   User.findOne({_id : req.user._id})
      .then((response)=>{
         res.status(200).json({
            message : "Single user data is.",
            response
         })
      })
      .catch((error)=>{
         res.status.json({
            message : "Server error occurred",
            error
         })
      })
}

deleteUser = (req, res) => {
   let {userId} = req.params

   User.findOneAndDelete({_id: userId})
      .then((response) => {
         console.log(response)
         res.status(200).json({
            message: "User deleted Successfully.",
            response
         })
      })
      .catch((error) => {
         res.status(500).json({
            message: "Server Error Occurred",
            error
         })
      })
}

changePassword=(req,res)=>{
   let {currentPassword,newPassword,confirmPassword} = req.body
   let valid = passwordChangeValidation({currentPassword,newPassword,confirmPassword})
   let userEmail = req.user.email
   let password = req.user.password
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   } else {
      User.findOne({email : userEmail})
      .then((response)=>{
         bcrypt.compare(currentPassword,password,(err,result)=>{
            if (err) {
              return res.status(400).json({
                 message : "Password compare error occurred.",
                 error : err
              })
            }else if(!result){
              return res.status(400).json({
                 message : "Password does not matched"
              })
            }else if(result){
               bcrypt.hash(newPassword,12,(err,hash)=>{
                  if (err) {
                    res.status(400).json({
                       message: "Password Change Hash error Occurred.."
                    })
                  } else {
                     let updatePassword = {
                        ...req.body,
                        password : hash
                     }
                     User.findOneAndUpdate({_id : req.user._id},{$set : updatePassword},{new : true})
                        .then((response)=>{
                           res.status(200).json({
                              message : "Password Change Successfully..",
                              response
                           })
                        })
                        .catch((error)=>{
                          res.status(500).json({
                             message: "Final Password Update Error Occurred",
                             error
                          })
                        })
                  }
               })
            }
         })
      })
      .catch((error) => {
        res.status(500).json({
           message: "Server Error Occurred",
           error
        })
     }) 
   }
}

editUserProfile=(req,res)=>{
   let { email,country,phNo } = req.body
   let validator = editProfile({email,country,phNo})

   if (!validator.isValid) {
      res.status(400).json(validator.error)
   } else {
      User.findOne({email})
       .then((response)=>{
         if (!response) {
            res.status(400).json({
               message : "User does not found"
            })
         } else {
            let updateUser = {
               ...req.user._doc,
               country,
               phNo 
            }
            User.findOneAndUpdate({_id : response._id},{$set : updateUser},{new : true})
            .then((response1)=>{
               res.status(200).json({
                 message : "User Updated Successfully..",
                 response1
               })
            })
            .catch((error) => {
                res.status(400).json({
                   message: "Server Error Occurred",
                   error
               })
            })
         }
       })
       .catch((error) => {
         res.status(500).json({
            message: "Server Error Occurred",
            error
        })
     })
   }
   
}

changeClub=(req,res)=>{
   let {club,password} = req.body
   let valid = changeClubValidator({club,password})
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   }else{
      bcrypt.compare(password,req.user.password,(err,result)=>{
         if (err) {
            return res.status(400).json({
               message : "Password compare error occurred.",
               error : err
            })
         } else if(!result){
            return res.status(400).json({
               message : "Password does not matched"
            })
         }else if(result){
            let updateClub= {
               ...req.user._doc,
               club
            }
            User.findOneAndUpdate({_id : req.user._id},{$set : updateClub},{new : true})
                .then((response)=>{
                   res.status(200).json({
                      message : "Club Updated Successfully..",
                      response
                   })
                })
                .catch((error) => {
                  res.status(500).json({
                     message: "Server Error Occurred",
                     error
                 })
              })
         }
      })
   }
}

module.exports = {
   registration,
   logIn,
   getAllUser,
   deleteUser,
   changePassword,
   editUserProfile,
   changeClub,
   getSingleUser
}