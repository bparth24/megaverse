import axios from "axios";
import { config } from "../config";
import { handleError } from "../utils/errorHandler";


/**
 * Places a POLYanet at the specified row and column coordinates.
 *
 * @param row - The row coordinate where the POLYanet should be placed.
 * @param column - The column coordinate where the POLYanet should be placed.
 * @returns A promise that resolves when the POLYanet has been successfully placed.
 * @throws Will throw an error if the placement operation fails.
 */
export const placePolyanet = async(row: number, column: number): Promise<void> => {
    try {
        await axios.post(`${config.crossmintApiUrl}/polyanets`, {
            candidateId: config.candidateId,
            row,
            column,
        });
        console.log(`Successfully placed POLYanet at (${row}, ${column})`);
    } catch (error) {
        handleError(error, `Failed to place POLYanet at (${row}, ${column})`);
    }
}

/**
 * Deletes a POLYanet at the specified row and column coordinates.
 *
 * @param row - The row coordinate where the POLYanet should be deleted.
 * @param column - The column coordinate where the POLYanet should be deleted.
 * @returns A promise that resolves when the POLYanet has been successfully deleted.
 * @throws Will throw an error if the deletion operation fails.
 */
export const deletePolyanet = async(row: number, column: number): Promise<void> => {
    try {
        const apiUrl = `${config.crossmintApiUrl}/polyanets`;
        const response = await axios.delete(apiUrl, {
            data: {
                candidateId: config.candidateId,
                row,
                column,
            },
        });
        console.log(`Successfully deleted POLYanet at (${row}, ${column})`);
        console.log(response.data);
    } catch (error) {
        handleError(error, `Failed to delete POLYanet at (${row}, ${column})`);
    }
};