const router = require('express').Router()
let { registration,getAllUser,deleteUser,logIn,editUserProfile,changeClub,getSingleUser } = require('../controllers/userController')
const authenticate = require('../authenticate')

router.post('/registration',registration)
router.post('/logIn',logIn)
router.get('/usersInfo',authenticate,getAllUser)
router.delete('/delete/:userId',authenticate,deleteUser)
router.put('/changePassword',authenticate,changePassword)
router.put('/updateProfile',authenticate,editUserProfile)
router.put('/changeClub',authenticate,changeClub)
router.get('/singleUser',authenticate,getSingleUser)

module.exports = router