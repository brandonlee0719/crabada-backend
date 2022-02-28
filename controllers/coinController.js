const User = require('../models/User')
const bcrypt = require('bcrypt')
const MakeDeposit = require('../models/MakeDeposit')
const CoinTransfer = require('../models/CoinTransfer')
const CoinWithdraw = require('../models/CoinWithdraw')
const BitMoney = require('../models/BitMoney')
const makeDepositValidator = require('../validator/makeDepositValidator')
const coinTransferValidator = require('../validator/coinTransferValidator')
const coinWithdrawValidator = require('../validator/coinWithdrawValidator')
const bitMoneyValidator = require('../validator/bitMoneyValidator')


makeDeposit = (req, res) => {
   let {
      paymentMethod,
      numberOfCoin,
      phoneForm,
      phoneTo,
      password,
      date
   } = req.body
   let valid = makeDepositValidator({
      paymentMethod,
      numberOfCoin,
      phoneForm,
      phoneTo,
      password,
      date
   })
   if (!valid.isValid) {
      res.status(400).json(valid.error)
   } else {
      bcrypt.compare(password, req.user.password, (err, result) => {
         if (err) {
            return res.status(400).json({
               message: "Password compare error occurred.",
               error: err
            })
         } else if (!result) {
            return res.status(200).json({
               message: "Password does not matched.",
            })
         } else if (result) {
            let makeDeposit = new MakeDeposit({
               paymentMethod,
               numberOfCoin,
               phoneForm,
               phoneTo,
               date
            })

            makeDeposit.save()
               .then((response) => {
                  console.log(response)
                  updatedUser = {
                     ...req.user._doc
                  }
                  updatedUser.deposit = updatedUser.deposit + numberOfCoin
                  updatedUser.makeDeposit.unshift(response)

                  User.findByIdAndUpdate(updatedUser._id, {
                        $set: updatedUser
                     }, {
                        new: true
                     })
                     .then((updateUser) => {
                        res.status(200).json({
                           message: "User updated successfully..",
                           updateUser
                        })
                     })
                     .catch((error) => {
                        res.status(400).json({
                           message: "User Update Error Occurred",
                           error
                        })
                     })
               })
               .catch((error) => {
                  console.log(error)
                  res.status(500).json({
                     message: "Server error occurred 1",
                     error
                  })
               })
         }
      })
   }

}

coinTransfer = (req, res) => {
   let {
      userName,
      numberOfCoin,
      password
   } = req.body
   let valid = coinTransferValidator({
      userName,
      numberOfCoin,
      password
   })
   if (!valid.isValid) {
      res.status(200).json(valid.error)
   } else {
      bcrypt.compare(password, req.user.password, (err, result) => {
         if (err) {
            return res.status(400).json({
               message: "Password compare error occurred.",
               error: err
            })
         } else if (!result) {
            return res.status(400).json({
               message: "Password does not matched"
            })
         } else if (result) {
            let coinTransfer = new CoinTransfer({
               userName,
               numberOfCoin
            })

            coinTransfer.save()
               .then((response) => {
                  let updatedUser = {
                     ...req.user._doc
                  }
                  if (updatedUser.deposit > numberOfCoin) {
                     updatedUser.deposit = updatedUser.deposit - numberOfCoin
                     updatedUser.haveCoin = updatedUser.haveCoin + numberOfCoin
                     updatedUser.coinTransfer.unshift(response)
                     User.findByIdAndUpdate(req.user._id, {
                           $set: updatedUser
                        }, {
                           new: true
                        })
                        .then((response) => {
                           res.status(200).json({
                              message: "User update successfully",
                              response
                           })
                        })
                        .catch((error) => {
                           res.status(400).json({
                              message: "User update error occurred..",
                              error
                           })
                        })
                  } else {
                     return res.status(200).json({
                        message: "Number of coin must be less the amount"
                     })
                  }


               })
               .catch((error) => {
                  res.status(500).json({
                     message: "Server error occurred..",
                     error
                  })
               })
         }
      })
   }
}

coinWithdraw = (req,res) => {
   let {
      withDrawAmount,
      phnNo,
      paymentType,
      password,
      date
   } = req.body
   let valid = coinWithdrawValidator({
      withDrawAmount,
      phnNo,
      paymentType,
      password,
      date
   })
   if (!valid.isValid) {
      res.status(200).json(valid.error)
   } else {
      bcrypt.compare(password, req.user.password, (err, result) => {
         if (err) {
            return res.status(400).json({
               message: "Password compare error occurred.",
               error: err
            })
         } else if (!result) {
            return res.status(400).json({
               message: "Password does not matched"
            })
         } else if (result) {
            let coinWithdraw = new CoinWithdraw({
               withDrawAmount,
               phnNo,
               paymentType,
               date
            })

            coinWithdraw.save()
               .then((response) => {
                  let updatedUser = {
                     ...req.user._doc
                  }
                  if (updatedUser.haveCoin > withDrawAmount) {
                     updatedUser.haveCoin = updatedUser.haveCoin - withDrawAmount
                     updatedUser.deposit = updatedUser.deposit + withDrawAmount
                     updatedUser.coinWithdraw.unshift(response)
                     User.findByIdAndUpdate(updatedUser._id,{$set : updatedUser},{new : true})
                        .then((response) => {
                           res.status(200).json({
                              message: "User update successfully",
                              response
                           })
                        })
                        .catch((error) => {
                           res.status(400).json({
                              message: "User update error occurred..",
                              error
                           })
                        })
                  } else {
                     return res.status(200).json({
                        message: "Number of coin must be less the present coin"
                     })
                  }
               })
               .catch((error) => {
                  res.status(500).json({
                     message: "Server error occurred..",
                     error
                  })
               })
         }
      })
   }
}

bitHistory=(req,res)=>{
   let { question,option,mainBitMoney,estReturn,date } = req.body
   let valid = bitMoneyValidator({question,option,mainBitMoney,date})
   if (!valid.isValid) {
      res.status(200).json(valid.error)
   } else {
      let bitMoney = new BitMoney({
         question,option,mainBitMoney,estReturn,date
      })

      if (mainBitMoney < req.user.haveCoin) {
         bitMoney.save()
          .then((response)=>{
            let updatedUser = {...req.user._doc}
            updatedUser.bitHistory.unshift(response)

            User.findByIdAndUpdate(updatedUser._id,{$set:updatedUser},{new : true})
               .then((response)=>{
                  res.status(200).json({
                     message : "User updated successfully with bit history",
                     response
                  })
               })
               .catch((error)=>{
                  res.status(400).json({
                     message : "User updated error occurred..",
                     error
                  })
               })
         })
         .catch((error)=>{
            res.status(500).json({
               message : "Server Error Occurred",
               error
            })
         })
      }else{
         return res.status(200).json({
            message : "First transfer the money to the coin"
         })
      }
      
   }
}

accountHandling=(req,res)=>{
   let {correctOption} = req.body
   let {mainBitId} = req.params
   User.find()
      .then((bigResponse) => {
            bigResponse.forEach((singleResponse) => {
               singleResponse.bitHistory.map((returnSingleBit) => {
                  let singleBitId = String(returnSingleBit._id)
                  if (singleBitId === mainBitId) {
                     if (correctOption == 'win') {
                        singleResponse.deposit = singleResponse.deposit + returnSingleBit.estReturn
                     } else if (correctOption == 'loss') {
                        singleResponse.deposit = singleResponse.deposit - returnSingleBit.estReturn
                     }
                     User.findByIdAndUpdate(singleResponse._id, {
                           $set: singleResponse
                        }, {
                           new: true
                        })
                        .then((response) => {
                           res.status(200).json({
                              message: "User updated successfully with amount",
                              response
                           })
                        })
                        .catch((error) => {
                           res.status(400).json({
                              message: "User amount update error occurred..",
                              error
                           })
                        })
                  }
               })
            });
         })
         .catch((error) => {
            res.status(500).json({
               message: "Server error occurred..",
               error
            })
         })
}

module.exports = {
   makeDeposit,
   coinTransfer,
   coinWithdraw,
   bitHistory,
   accountHandling
}