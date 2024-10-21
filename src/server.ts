import express from 'express';
import routes from './routes';
import axiosRetry from "axios-retry";
import axios from "axios";
import { config } from './config';

const app = express();

//add middleware to parse json
app.use(express.json());

//add routes
app.use('/api', routes);

// Retry Logic: The axios-retry library is used to automatically retry failed requests up to 3 times with exponential backoff.
axiosRetry(axios, {
  retries: 5,
  retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
  retryCondition(error) {
    console.log("retry?", error.response?.status);
    return error.response?.status === 429;
  },
  onRetry(retryCount) {
    console.log("Retrying...", retryCount);
  }
});

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});