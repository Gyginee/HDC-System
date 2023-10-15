const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/database');
const swaggerUi = require('swagger-ui-express');  // Import swagger-ui-express
const swaggerSpecs = require('./utils/swagger'); // Đường dẫn đến file cấu hình Swagger

const app = express();


app.use(bodyParser.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {   explorer: true }));

console.log(swaggerSpecs);
console.log(`${__dirname}/routers/*.js`);



const PORT = process.env.PORT || config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
