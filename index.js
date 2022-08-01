const express = require('express')
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');


let homeRoute = require('./routes/homePageRoute');

port = 3000;
app = express();
app.use('/', express.static('public'))
app.use('/api', homeRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})