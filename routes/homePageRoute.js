var express = require('express')
var homepageController = require('../controllers/homepageController')
var router = express.Router();

router.get('/getAllCountries', (req, res) => {
    homepageController.fetchAllCountries(req, res)
})

router.get('/getCountry', (req, res) => {
    homepageController.fetchCountry(req, res)
})

module.exports = router;