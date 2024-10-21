import { Request, Response } from "express";
import { EntityOperations } from "../services/entityOperations";
import { isValidAdditionalParams } from "../utils/additionalParamValidator";

/**
 * Handles the placement of an entity on a grid.
 * 
 * @param req - The request object containing the entity type, row, column, and additional parameters.
 * @param res - The response object used to send back the status and message.
 * 
 * @returns A promise that resolves to void.
 * 
 */
export const placeEntityHandler = async (req: Request, res: Response): Promise<void> => {
    const { entityType, row, column, additionalParams } = req.body;
    const entityOperations = new EntityOperations(entityType);

    // Validate additionalParams
    if (additionalParams && !isValidAdditionalParams(additionalParams)) {
        res.status(400).json({ message: "Invalid additionalParams" });
        return;
    }

    try {
        await entityOperations.placeEntity(row, column, additionalParams);
        res.status(200).json({ message: `Successfully placed ${entityType} at row: ${row} & column: ${column}` });
    } catch (error) {
        console.error("Error placing entity:", error);
        res.status(500).json({ message: `Failed to place ${entityType}`, error: (error as Error).message });
    }
};

/**
 * Handles the deletion of an entity based on the provided entity type, row, and column.
 * 
 * @param req - The request object containing the entity type, row, and column in the body.
 * @param res - The response object used to send back the status and result of the deletion operation.
 * @returns A promise that resolves to void.
 * 
 */
export const deleteEntityHandler = async (req: Request, res: Response): Promise<void> => {
    const { entityType, row, column } = req.body;
    const entityOperations = new EntityOperations(entityType);
    try {
        await entityOperations.deleteEntity(row, column);
        res.status(200).json({ message: `Successfully deleted ${entityType} at row: ${row} & column: ${column}` });
    } catch (error) {
        console.error("Error deleting entity:", error);
        res.status(500).json({ message: `Failed to delete ${entityType}`, error: (error as Error).message });
    }
};