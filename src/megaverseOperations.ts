import { EntityOperations } from "./entityOperations";
import { AdditionalParamsTypes, EntityDataTypes, SoloonColor, ComethDirection } from "./types";
import { handleError } from "./utils/errorHandler";

export class MegaverseOperations {

    // Type guard to check if additionalParams is of type AdditionalParamsTypes
    private isValidAdditionalParams(params: any): params is AdditionalParamsTypes {
        if (params.color && !this.isValidSoloonColor(params.color)) {
            return false;
        }
        if (params.direction && !this.isValidComethDirection(params.direction)) {
            return false;
        }
        return true;
    }

    // Helper method to validate SoloonColor
    private isValidSoloonColor(color: any): color is SoloonColor {
        return ['white', 'blue', 'purple', 'red'].includes(color);
    }

    // Helper method to validate ComethDirection
    private isValidComethDirection(direction: any): direction is ComethDirection {
        return ['up', 'down', 'left', 'right'].includes(direction);
    }

    // Implement createMegaverse method
    async createMegaverse(parsedGoalMapData: EntityDataTypes[]): Promise<void> {
        if (!Array.isArray(parsedGoalMapData) || parsedGoalMapData.length === 0) {
            handleError(new Error("Invalid or empty parsedGoalMapData"), "Failed to create megaverse");
            return;
        }

        try {
            for (const entityData of parsedGoalMapData) {
                const { entityType, row, column, additionalParams } = entityData;

                // Ensure additionalParams is of type AdditionalParamsTypes
                if (additionalParams && !this.isValidAdditionalParams(additionalParams)) {
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

    // Implement cleanupMegaVerse method
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