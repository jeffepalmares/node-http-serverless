export declare class IntegrationErrorData {
    url: string;
    baseUrl: string;
    errorCode: string;
    statusCode: number;
    errorMessage: string;
    curl: string;
    response: unknown;
    originData?: string;
    constructor(url: string, baseUrl: string, errorCode: string, statusCode: number, errorMessage: string, curl: string, response: unknown, originData?: string);
}
