import {placePolyanet} from "../src/api/polyanet";
import {createXShape} from "../src/XShapeOperations";

jest.mock("../src/api/polyanet");

describe("createXShape", () => {
    it('should place POLYanets in an X shape', async () => {
        const gridSize = 11;
        await createXShape(gridSize);
        expect(placePolyanet).toHaveBeenCalledTimes(gridSize * 2);
        for (let i = 0; i < gridSize; i++) {
            expect(placePolyanet).toHaveBeenNthCalledWith(i + 1, i, i);
            expect(placePolyanet).toHaveBeenNthCalledWith(gridSize + i + 1, i, gridSize - i - 1);
        }
    });
});