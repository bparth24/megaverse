import express from 'express';
import { createXShape, cleanupXShape } from './XShapeOperations'; // Phase 1
import { EntityOperations } from './entityOperations'; // Phase 2
import { getParsedGoalMap } from './mapOperations'; // Phase 2
import { MegaverseOperations } from './megaverseOperations'; // Phase 2

const routes = express.Router();

// Phase 2 Create Megaverse Route
routes.post("/create-megaverse", async (_req, res) => {
    try {
        const parsedGoalMap = await getParsedGoalMap();
        const megaverseOps = new MegaverseOperations();
        await megaverseOps.createMegaverse(parsedGoalMap);
        res.status(200).json({ message: "Megaverse created successfully" });
    } catch (error) {
        console.error("Error creating megaverse:", error);
        res.status(500).json({ message: "Failed to create megaverse", error: (error as Error).message });
    }
});

// Phase 2 Cleanup Megaverse Route
routes.post("/cleanup-megaverse", async (_req, res) => {
    try {
        const parsedGoalMap = await getParsedGoalMap();
        const megaverseOps = new MegaverseOperations();
        await megaverseOps.cleanupMegaverse(parsedGoalMap);
        res.status(200).json({ message: "Megaverse cleaned up successfully" });
    } catch (error) {
        console.error("Error cleaning up megaverse:", error);
        res.status(500).json({ message: "Failed to clean up megaverse", error: (error as Error).message });
    }
});

// Phase 2 Get Goal Map Route
routes.get("/goal-map", async (_req, res) => {
    try {
        const parsedGoalMap = await getParsedGoalMap();
        res.status(200).json(parsedGoalMap);
    } catch (error) {
        console.error("Error fetching goal map:", error);
        res.status(500).json({ message: "Failed to fetch goal map", error: (error as Error).message });
    }
});

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