import axios from "axios";
import { config } from "./config";
import { AdditionalParamsTypes } from "./types";
import { handleError } from "./utils/errorHandler";

// an EntityOperation class that encapsulates all CRUD operations for different entities (polyanets, soloons, comeths)
export class EntityOperations {
    entityType: string;

    constructor(entityType: string) {
        this.entityType = entityType;
    }

    private getCrossmintApiUrl(): string {
        switch (this.entityType) {
            case 'polyanets':
                return `${config.crossmintApiUrl}/polyanets`;
            case 'soloons':
                return `${config.crossmintApiUrl}/soloons`;
            case 'comeths':
                return `${config.crossmintApiUrl}/comeths`;
            default:
                throw new Error(`Unknown entity type: ${this.entityType}`);
        }
    }

    // Implement the placeEntity method
    async placeEntity(row: number, column: number, additionalParams: AdditionalParamsTypes): Promise<void> {
        try{
            let crossmintApiUrl = this.getCrossmintApiUrl();
            let payload: any = {
                candidateId: config.candidateId,
                row,
                column,
                ...additionalParams
            };

            // Check & Validate entity specific conditions
            if(this.entityType === 'soloons'){
                if (!additionalParams.hasOwnProperty('color')) {
                    throw new Error("Color is required for placing Soloons");
                }
                const validColors = ["blue", "red", "purple", "white"];
                if (typeof additionalParams['color'] !== 'string' || !validColors.includes(additionalParams['color'])) {
                    throw new Error("Invalid color provided for placing Soloons");
                }
            } else if (this.entityType === 'comeths') {
                if (!additionalParams.hasOwnProperty('direction')) {
                    throw new Error("Direction is required for placing Comeths");
                }
                const validDirections = ["up", "down", "right", "left"];
                if (typeof additionalParams['direction'] !== 'string' || !validDirections.includes(additionalParams['direction'])) {
                    throw new Error("Invalid direction provided for placing Comeths");
                }
            }

            await axios.post(crossmintApiUrl, payload);
            console.log(`Successfully placed ${this.entityType} at (${row}, ${column})`);
        } catch (error) {
            handleError(error, `Failed to place ${this.entityType} at (${row}, ${column})`);
        }
    }

    // Implement the deleteEntity method
    async deleteEntity(row: number, column: number): Promise<void> {
        try {
            const crossmintApiUrl = this.getCrossmintApiUrl();
            await axios.delete(crossmintApiUrl, {
                data: {
                    candidateId: config.candidateId,
                    row,
                    column,
                },
            });
        } catch (error) {
            handleError(error, `Failed to delete ${this.entityType} at (${row}, ${column})`);
        }
    }
}