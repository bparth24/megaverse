import { Request, Response } from 'express';
import { getParsedGoalMap } from '../services/mapOperations';

/**
 * Handler to fetch the goal map.
 * 
 * This function handles the request to fetch the goal map by calling the `getParsedGoalMap` function.
 * If successful, it responds with a status of 200 and the parsed goal map in JSON format.
 * If an error occurs, it logs the error and responds with a status of 500 and an error message.
 * 
 * @param _req - The request object (not used in this handler).
 * @param res - The response object used to send the response.
 * @returns A promise that resolves to void.
 */
export const fetchGoalMapHandler = async (_req: Request, res: Response): Promise<void> => {
    try {
        const parsedGoalMap = await getParsedGoalMap();
        res.status(200).json(parsedGoalMap);
    } catch (error) {
        console.error("Error fetching goal map:", error);
        res.status(500).json({ message: "Failed to fetch goal map", error: (error as Error).message });
    }
};