
const router = require('express').Router()
let { makeDeposit,coinTransfer,coinWithdraw,bitHistory,accountHandling } = require('../controllers/coinController')
const authentication = require('../authenticate')

router.post('/makeDeposit',authentication,makeDeposit)
router.post('/coinTransfer',authentication,coinTransfer)
router.post('/coinWithdraw',authentication,coinWithdraw)
router.post('/bitHistory',authentication,bitHistory)
router.post('/maintainAccount/:mainBitId',authentication,accountHandling)

module.exports = router 