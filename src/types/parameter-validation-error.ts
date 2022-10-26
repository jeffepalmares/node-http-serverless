export interface ParameterValidationError {
    source: string;
    message: string;
    fieldName: string | number;
    detail?: unknown;
}
