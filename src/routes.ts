import express from 'express';
import { createXShape, cleanupXShape } from './XShapeOperations';
import { EntityOperations } from './entityOperations';

const routes = express.Router();

// Phase 2 Place Entity Route - Testing Purpose Only
routes.post("/place-entity", async (req, res) => {
    // Place Entity Logic
    const { entityType, row, column, additionalParams } = req.body;
    const entityOperations = new EntityOperations(entityType);
    try {
        await entityOperations.placeEntity(row, column, additionalParams);
        res.status(200).json({ message: `Successfully placed ${entityType} at row: ${row} & column: ${column}` });
    } catch (error) {
        console.error("Error placing entity:", error);
        res.status(500).json({ message: `Failed to place ${entityType}`, error: (error as Error).message });
    }
});

// Phase 2 Delete Entity Route - Testing Purpos Only
routes.post("/delete-entity", async (req, res) => {
    // Delete Entity Logic
    const { entityType, row, column } = req.body;
    const entityOperations = new EntityOperations(entityType);
    try {
        await entityOperations.deleteEntity(row, column);

        res.status(200).json({ message: `Successfully deleted ${entityType} at row: ${row} & column: ${column}` });
    } catch (error) {
        console.error("Error deleting entity:", error);
        res.status(500).json({ message: `Failed to delete ${entityType}`, error: (error as Error).message });
    }
});

// Phase 1 Create X Shape Route
routes.post("/create-x-shape", async (req, res) => {
    try {
        await createXShape(req.body.gridSize);
        res.status(200).json({ message: "X-shape created successfully" });
    } catch (error) {
        console.error("Error creating X-shape:", error);
        res.status(500).json({ message: "Failed to create X-shape" });
    }
});

// Phase 1 Cleanup X Shape Route
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