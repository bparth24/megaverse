import express from 'express';
import routes from './routes';
import axiosRetry from "axios-retry";
import axios from "axios";

const app = express();
const PORT = 3000;
// const GRID_SIZE = 11;

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

// app.post("/create-x-shape", async (req, res) => {
//     try {
//         await createXShape(req.body.gridSize);
//         res.status(200).json({ message: "X-shape created successfully" });
//     } catch (error) {
//         console.error("Error creating X-shape:", error);
//         res.status(500).json({ message: "Failed to create X-shape" });
//     }
// });

// app.post("/cleanup-x-shape", async (req, res) => {
//     try {
//         await cleanupXShape(req.body.gridSize);
//         res.status(200).json({ message: "X-shape cleaned up successfully" });
//     } catch (error) {
//         console.error("Error cleaning up X-shape:", error);
//         res.status(500).json({ message: "Failed to clean up X-shape" });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});