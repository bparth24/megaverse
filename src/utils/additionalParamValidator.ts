import { SoloonColor, ComethDirection, AdditionalParamsTypes } from "../types";

// Type guard to check if additionalParams is of type AdditionalParamsTypes
export function isValidAdditionalParams(params: any): params is AdditionalParamsTypes {
    if (params.color && !isValidSoloonColor(params.color)) {
        return false;
    }
    if (params.direction && !isValidComethDirection(params.direction)) {
        return false;
    }
    return true;
}

// Helper method to validate SoloonColor
export function isValidSoloonColor(color: any): color is SoloonColor {
    return ['white', 'blue', 'purple', 'red'].includes(color);
}

// Helper method to validate ComethDirection
export function isValidComethDirection(direction: any): direction is ComethDirection {
    return ['up', 'down', 'left', 'right'].includes(direction);
}