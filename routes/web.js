const express = require('express');
const Admincontroller = require('../controllers/Admincontroller');
const Contactcontroller = require('../controllers/Contactcontroller');
const Imagecontroller=require('../controllers/Imagecontroller')
const router=express.Router();


//contact page 
router.post('/contactinsert',Contactcontroller.contactinsert)
router.get('/contactall',Contactcontroller.contactall)


//image
router.post('/imageinsert',Imagecontroller.imageinsert)
router.put('/imageupdate/:id',Imagecontroller.imageupdate)
router.delete('/deleteimage/:id',Imagecontroller.imagedelete)

//admin
router.post('/adminregistration',Admincontroller.adminregistration)
router.post('/adminlogin',Admincontroller.adminlogin)
router.post('/adminpasswordupdate',Admincontroller.adminPasswordupdate)


module.exports=router;