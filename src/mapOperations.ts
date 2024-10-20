import axios from "axios";
import { config } from "./config";
import { handleError } from "./utils/errorHandler";
import { SoloonColor, ComethDirection, EntityDataTypes, AdditionalParamsTypes } from "./types";

export async function fetchGoalMap(): Promise<any> {
    try {
        const crossmintApiUrl = `${config.crossmintApiUrl}/map/${config.candidateId}/goal`;
        const response = await axios.get(crossmintApiUrl);

        // Check if response data is not empty
        if (!response.data) {
            handleError(new Error("Empty response data"), "Failed to fetch goal map");
            return;
        }

        // Check if the goal key is present in the response data
        if (!response.data.goal) {
            handleError(new Error("Goal key not found in response data"), "Failed to fetch goal map");
            return;
        }

        // Validate the response format for goal key
        if (!Array.isArray(response.data.goal) || !response.data.goal.every((row: any) => Array.isArray(row))) {
            handleError(new Error("Invalid goal map format"), "Failed to fetch goal map");
            return;
        }

        return response.data.goal;
    } catch (error) {
        handleError(error, "Failed to fetch goal map");
        throw error;
    }
}

export function parseGoalMap(goalMap: any): EntityDataTypes[] {
    const entities: EntityDataTypes[] = [];

    for (let row = 0; row < goalMap.length; row++) {
        for (let column = 0; column < goalMap[row].length; column++) {
            const cell = goalMap[row][column];

            // Ensure the cell value is a string
            if (typeof cell !== "string") {
                handleError(new Error(`Invalid cell value at row ${row}, column ${column}`), "Failed to parse goal map");
                continue;
            }

            if (cell === "POLYANET") {
                entities.push({ entityType: "polyanets", row, column });
            } else if (cell.endsWith("SOLOON")) {
                const color = cell.split("_")[0].toLowerCase() as SoloonColor;
                const additionalParams: AdditionalParamsTypes = { color };
                
                if (['white', 'blue', 'purple', 'red'].includes(color)) {
                    entities.push({ entityType: "soloons", row, column, additionalParams });
                } else {
                    handleError(new Error(`Invalid SOLOON color "${color}" at row ${row}, column ${column}`), "Failed to parse goal map");
                }
            } else if (cell.endsWith("COMETH")) {
                const direction = cell.split("_")[0].toLowerCase() as ComethDirection;
                const additionalParams: AdditionalParamsTypes = { direction };
                
                if (['up', 'down', 'left', 'right'].includes(direction)) {
                    entities.push({ entityType: "comeths", row, column, additionalParams });
                } else {
                    handleError(new Error(`Invalid COMETH direction "${direction}" at row ${row}, column ${column}`), "Failed to parse goal map");
                }
            } else if (cell !== "SPACE") {
                // Handle unexpected cell values
                handleError(new Error(`Unexpected cell value "${cell}" at row ${row}, column ${column}`), "Failed to parse goal map");
            }
        }
    }
    return entities;
}

export async function getParsedGoalMap(): Promise<EntityDataTypes[]> {
    try {
        const goalMap = await fetchGoalMap();
        return parseGoalMap(goalMap);
    } catch (error) {
        handleError(error, "Failed to get parsed goal map");
        throw error;
    }
}