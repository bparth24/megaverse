import express from 'express';
import { createXShape, cleanupXShape } from './XShapeOperations';

const routes = express.Router();

routes.post("/create-x-shape", async (req, res) => {
    try {
        await createXShape(req.body.gridSize);
        res.status(200).json({ message: "X-shape created successfully" });
    } catch (error) {
        console.error("Error creating X-shape:", error);
        res.status(500).json({ message: "Failed to create X-shape" });
    }
});

routes.post("/cleanup-x-shape", async (req, res) => {
    try {
        await cleanupXShape(req.body.gridSize);
        res.status(200).json({ message: "X-shape cleaned up successfully" });
    } catch (error) {
        console.error("Error cleaning up X-shape:", error);
        res.status(500).json({ message: "Failed to clean up X-shape" });
    }
});

export default routes;