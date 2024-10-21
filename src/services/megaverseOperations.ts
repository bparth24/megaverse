import { EntityOperations } from "./entityOperations";
import { AdditionalParamsTypes, EntityDataTypes } from "../types";
import { handleError } from "../utils/errorHandler";
import { isValidAdditionalParams } from "../utils/additionalParamValidator";


export class MegaverseOperations {
    
    /**
     * Creates a megaverse by processing an array of parsed goal map data.
     * 
     * @param parsedGoalMapData - An array of entity data objects to be processed.
     * @returns A promise that resolves when the megaverse has been successfully created.
     * 
     * @throws Will handle and log errors if the parsedGoalMapData is invalid or empty,
     *         or if there are issues during the creation of entities.
     * 
     */
    async createMegaverse(parsedGoalMapData: EntityDataTypes[]): Promise<void> {
        if (!Array.isArray(parsedGoalMapData) || parsedGoalMapData.length === 0) {
            handleError(new Error("Invalid or empty parsedGoalMapData"), "Failed to create megaverse");
            return;
        }

        try {
            for (const entityData of parsedGoalMapData) {
                const { entityType, row, column, additionalParams } = entityData;

                // Ensure additionalParams is of type AdditionalParamsTypes
                if (additionalParams && !isValidAdditionalParams(additionalParams)) {
                    handleError(new Error("Invalid additionalParams"), `Failed to create entity at row ${row}, column ${column}`);
                    continue;
                }

                const entityOperation = new EntityOperations(entityType);
                await entityOperation.placeEntity(row, column, additionalParams as AdditionalParamsTypes);
            }
            console.log("Megaverse created successfully.");
        } catch (error) {
            console.error("Error creating megaverse:", error);
            handleError(error, "Error creating megaverse");
        }
    }

    /**
     * Cleans up the megaverse by deleting entities based on the parsed goal map data.
     * 
     * @param parsedGoalMapData - An array of entity data objects to be processed for cleanup.
     * @returns A promise that resolves when the megaverse has been successfully cleaned up.
     * 
     * @throws Will handle and log errors if the parsedGoalMapData is invalid or empty,
     *         or if there are issues during the deletion of entities.
     * 
     */
    async cleanupMegaverse(parsedGoalMapData: EntityDataTypes[]): Promise<void> {
        if (!Array.isArray(parsedGoalMapData) || parsedGoalMapData.length === 0) {
            handleError(new Error("Invalid or empty parsedGoalMapData"), "Failed to clean up megaverse");
            return;
        }

        try {
            for (const entityData of parsedGoalMapData) {
                const { entityType, row, column } = entityData;
                const entityOperation = new EntityOperations(entityType);
                await entityOperation.deleteEntity(row, column);
            }
            console.log("Megaverse cleaned up successfully.");
        } catch (error) {
            console.error("Error cleaning up megaverse:", error);
            handleError(error, "Error cleaning up megaverse");
        }
    }
}