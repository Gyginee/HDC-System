const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers/routers');
const config = require('./config/config');

const app = express();


app.use(bodyParser.json());

// Sử dụng các tệp định tuyến
app.use(routers);  // Ví dụ cho đối tượng người dùng

const PORT = process.env.PORT || config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
