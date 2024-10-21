import { placePolyanet, deletePolyanet } from "../services/polyanetOperations";

/**
 * Creates an X-shape structure in the grid for Phase 1.
 *
 * @param gridSize - The size of the grid.
 * @returns A promise that resolves to void.
 *
 */
const createXShape = async (gridSize: number): Promise<void> => {
    const placedPolyanets: { row: number, column: number }[] = [];

    try{
        for(let row = 2; row < gridSize - 2; row++){
            for(let column =2; column < gridSize - 2; column++){
                if(row === column || row + column === gridSize - 1){
                    await placePolyanet(row, column);
                    placedPolyanets.push({ row, column });
                }
            }
        }
    } catch (error) {
        console.error("Error occurred while placing Polyanets:", error);
    }
};

/**
 * Cleans up the X-shape structure from the grid for Phase 1.
 *
 * @param gridSize - The size of the grid.
 * @returns A promise that resolves to void.
 *
 */
const cleanupXShape = async (gridSize: number): Promise<void> => {
    for (let row = 0; row < gridSize; row++) {
        for (let column = 0; column < gridSize; column++) {
            await deletePolyanet(row, column);
        }
    }
};

export { createXShape, cleanupXShape };