const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/database');
const swaggerUi = require('swagger-ui-express');  
const swaggerSpecs = require('./utils/swagger');
const { 
  userRouter, 
  authRouter, 
  clientRouter, 
  costProjectRouter, 
  projectRouter, 
  assetRouter, 
  vendorRouter 
} = require('./routers/Routers'); // Import consolidated routers from Routers.js

const app = express();

app.use(bodyParser.json());

// Use the consolidated routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/client', clientRouter);
app.use('/api/costproject', costProjectRouter);
app.use('/api/project', projectRouter);
app.use('/api/asset', assetRouter);
app.use('/api/vendor', vendorRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

const PORT = process.env.PORT || config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
