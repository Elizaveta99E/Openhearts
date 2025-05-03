const Router = require('express')
const router = new Router()
const StaffController = require('../controller/staff.controller')
router.post('/staff', StaffController.createStaff)
router.get('/staff', StaffController.getStaff)
router.get('/staff/:id', StaffController.getOneStaff)
router.put('/staff', StaffController.updateStaff)
router.delete('/staff/:id', StaffController.deleteStaff)

module.exports = router