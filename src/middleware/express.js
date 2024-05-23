const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser'); we dont need
const env = require('../config').env;

module.exports = async (app) => {
    const { PUBLIC_FOLDER } = env;

    // console.log("PUBLİCFOLDER",PUBLIC_FOLDER )

    app.use(express.json({ limit: '50MB' }));
    app.use(express.static(path.join(__dirname, PUBLIC_FOLDER)));
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
};
