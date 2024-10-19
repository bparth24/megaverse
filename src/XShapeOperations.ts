import { placePolyanet, deletePolyanet } from "./api/polyanet";

// Define the grid size (11 x 11)
// const GRID_SIZE = 11;

const createXShape = async (gridSize: number): Promise<void> => {
    const placedPolyanets: { row: number, column: number }[] = [];

    // 3rd Try
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

    // 2nd Try
    // for (let row = 2; row < gridSize - 2; row++) {
    //     for (let column = 2; column < gridSize - 2; column++) {
    //         if (row === column || row + column === gridSize - 1) {
    //             await placePolyanet(row, column);
    //         }
    //     }
    // }
};

// createXShape(GRID_SIZE).catch((error) => {
//     console.error(error);
// });

const cleanupXShape = async (gridSize: number): Promise<void> => {
    for (let row = 0; row < gridSize; row++) {
        for (let column = 0; column < gridSize; column++) {
            await deletePolyanet(row, column);
        }
    }
};

// Call cleanupXShape when needed
// cleanupXShape(GRID_SIZE).catch((error) => {
//     console.error(error);
// });

export { createXShape, cleanupXShape };