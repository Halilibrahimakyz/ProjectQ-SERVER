require("dotenv").config();
const express = require("express");
const multer = require("../../utils/multer");
const accessMW = require("../../middleware/access");
const { protect } = require("../../middleware/auth")

const {
    httpTest
} = require("../../controllers/test");

const router = express.Router();


router.route('/').get(httpTest);

module.exports = router;