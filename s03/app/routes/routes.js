const express = require("express");
const router = express.Router();
const {getData,addData,updateData,deleteData} = require('../controllers/appControllers');

router.get('/getData',getData);
router.post('/addData',addData);
router.put('/updateData/:index',updateData);
router.delete('/deleteData',deleteData);

module.exports = router;