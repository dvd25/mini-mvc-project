const API_HELPER = require("../apiHelper/api_helper")

const fetchAllCountries = (req, res) => {
    API_HELPER.make_api_call('https://api.covid19api.com/countries')
        .then(response => {
            console.log("getAllCountries API called successfully.")
            res.status(200)
            res.json(response)
        }).catch(error => {
            res.send(error)
        })
}

const fetchCountry = (req, res) => {
    const COUNTRY_NAME = String(req.query.name);
    const COUNTRY_URL = `https://api.covid19api.com/live/country/${COUNTRY_NAME}/status/confirmed/date/2022-01-01T13:13:30Z`
    API_HELPER.make_api_call(COUNTRY_URL)
        .then(response => {
            console.log("getCountry API called successfully.")
            res.status(200)
            res.json(response)
        }).catch(error => {
            res.send(error)
        })
}

module.exports = {
    fetchAllCountries,
    fetchCountry
}