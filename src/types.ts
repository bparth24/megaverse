// Define the possible colors for Soloons
export type SoloonColor = 'white' | 'blue' | 'purple' | 'red';

// Define the possible directions for Comeths
export type ComethDirection = 'up' | 'down' | 'left' | 'right';

export type AdditionalParamsTypes = {
    color?: SoloonColor;
    direction?: ComethDirection;
};

export type EntityDataTypes = {
    entityType: 'polyanets' | 'soloons' | 'comeths';
    row: number;
    column: number;
    additionalParams?: AdditionalParamsTypes;
};