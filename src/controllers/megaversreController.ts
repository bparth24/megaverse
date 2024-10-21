import { Request, Response } from 'express';
import { getParsedGoalMap } from '../services/mapOperations';
import { MegaverseOperations } from '../services/megaverseOperations';

/**
 * Handles the creation of a new Megaverse.
 * 
 * It retrieves the parsed goal map, initializes the Megaverse operations, and attempts to create
 * the Megaverse based on the parsed goal map. If successful, it sends a 200 status response with a success message. If an error
 * occurs, it logs the error and sends a 500 status response with an error message.
 * 
 * @param _req - The incoming request object (not used in this handler).
 * @param res - The response object used to send back the HTTP response.
 * @returns A promise that resolves to void.
 */
export const createMegaverseHandler = async (_req: Request, res: Response): Promise<void> => {
    try {
        const parsedGoalMap = await getParsedGoalMap();
        const megaverseOps = new MegaverseOperations();
        await megaverseOps.createMegaverse(parsedGoalMap);
        res.status(200).json({ message: "Megaverse created successfully" });
    } catch (error) {
        console.error("Error creating megaverse:", error);
        res.status(500).json({ message: "Failed to create megaverse", error: (error as Error).message });
    }
};

/**
 * Handles the cleanup of the Megaverse.
 *
 * 1. Retrieves the parsed goal map using `getParsedGoalMap`.
 * 2. Creates an instance of `MegaverseOperations`.
 * 3. Calls the `cleanupMegaverse` method on the `MegaverseOperations` instance, passing the parsed goal map.
 * 4. Sends a success response with a status code of 200 if the cleanup is successful.
 * 5. Catches any errors that occur during the process, logs the error, and sends a failure response with a status code of 500.
 *
 * @param _req - The incoming request object (unused in this handler).
 * @param res - The response object used to send the response.
 * @returns A promise that resolves to void.
 */
export const cleanupMegaverseHandler = async (_req: Request, res: Response): Promise<void> => {
    try {
        const parsedGoalMap = await getParsedGoalMap();
        const megaverseOps = new MegaverseOperations();
        await megaverseOps.cleanupMegaverse(parsedGoalMap);
        res.status(200).json({ message: "Megaverse cleaned up successfully" });
    } catch (error) {
        console.error("Error cleaning up megaverse:", error);
        res.status(500).json({ message: "Failed to clean up megaverse", error: (error as Error).message });
    }
};