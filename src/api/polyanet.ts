import axios from "axios";
// import axiosRetry from "axios-retry";
import { config } from "../config";
import { handleError } from "../utils/errorHandler";

// Retry Logic: The axios-retry library is used to automatically retry failed requests up to 3 times with exponential backoff.
// axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export const placePolyanet = async(row: number, column: number): Promise<void> => {
    try {
        // console.log("crossmintApiUrl", `${config.crossmintApiUrl}/polyanets`);
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