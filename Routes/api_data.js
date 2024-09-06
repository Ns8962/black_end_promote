const express = require('express');
const {add} = require('../Controllers/api_data');
const router = express.Router();
router.post('/add', add);
module.exports = router;