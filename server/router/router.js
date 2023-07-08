import express from 'express'
import handlers from '../handlers/handlers.js'
import middlewares from '../middlewares/middlewares.js'
const router = express.Router()

// owner routes
router.post('/login/owner', handlers.loginOwner)
router.post('/register/owner', handlers.registerOwner)

router.post('/createroom',middlewares.authOwner, handlers.createRoom)
router.put('/updateroom',middlewares.authOwner, handlers.updateRoom)
router.delete('/deleteroom',middlewares.authOwner, handlers.deleteRoom)
router.get('/getrooms', handlers.getRooms)

router.post('/uploading', middlewares.upload.single('file'), (req, res) => {
    res.json({file : req.file})
} )


// customer routes
router.post('/login/customer', handlers.loginCustomer)
router.post('/register/customer', handlers.registerCustomer)
router.post('/booking',middlewares.authCustomer,  handlers.booking)

export default router