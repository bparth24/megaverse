import { Request, Response } from "express";
import { createXShape, cleanupXShape } from "../services/xShapeOperations";

/**
 * Handles the creation of an X-shape for Phase 1.
 *
 * @param req - The request object containing the grid size in the body.
 * @param res - The response object used to send back the HTTP response.
 * @returns A promise that resolves to void.
 *
 */
export const createXShapeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        await createXShape(req.body.gridSize);
        res.status(200).json({ message: "X-shape created successfully" });
    } catch (error) {
        console.error("Error creating X-shape:", error);
        res.status(500).json({ message: "Failed to create X-shape" });
    }
};

/**
 * Handles the cleanup of X-shape structures.
 *
 * @param req - The request object containing the grid size in the body.
 * @param res - The response object used to send back the status and message.
 * @returns A promise that resolves to void.
 *
 */
export const cleanupXShapeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        await cleanupXShape(req.body.gridSize);
        res.status(200).json({ message: "X-shape cleaned up successfully" });
    } catch (error) {
        console.error("Error cleaning up X-shape:", error);
        res.status(500).json({ message: "Failed to clean up X-shape" });
    }
};