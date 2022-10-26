import { InputRequest } from '../serverless-handler/dtos';
export declare class RequestProcessor {
    static process(key: string, args: InputRequest): Array<unknown>;
    private static getParameterOurce;
    private static validateArgument;
    private static getParameterSourceDesc;
}
