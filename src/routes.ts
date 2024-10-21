import express from 'express';
import { createXShapeHandler, cleanupXShapeHandler } from './controllers/xShapeController'; // Phase 1
import { placeEntityHandler, deleteEntityHandler } from './controllers/entityController'; // Phase 2
import { fetchGoalMapHandler } from './controllers/mapController'; // Phase 2
import { createMegaverseHandler, cleanupMegaverseHandler } from './controllers/megaversreController';


const routes = express.Router();

// Phase 2 Create Megaverse Route & Cleanup Megaverse Route
routes.post("/create-megaverse", createMegaverseHandler);
routes.post("/cleanup-megaverse", cleanupMegaverseHandler);

// Phase 2 Get Goal Map Route
routes.get("/goal-map", fetchGoalMapHandler);

// Phase 2 Place Entity Route & Delete Entity Route - Testing Purpose Only
routes.post("/place-entity", placeEntityHandler);
routes.post("/delete-entity", deleteEntityHandler);

// Phase 1 Create X Shape Route & Cleanup X Shape Route
routes.post("/create-x-shape", createXShapeHandler);
routes.post("/cleanup-x-shape", cleanupXShapeHandler);

export default routes;