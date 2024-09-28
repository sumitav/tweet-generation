import * as dotenv from 'dotenv';
import express from 'express';
import logger from './config/logger';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.listen(port, () => {
    
    logger.info(`Your wonderful server is running in port: ${port} !!!`);
  });
