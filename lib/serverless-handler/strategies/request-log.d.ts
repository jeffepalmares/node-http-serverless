import { HttpResponse, InputRequest } from '../dtos';
export declare abstract class RequestResponseLogger {
    protected logRequest(rawRequest: InputRequest): void;
    protected logResponse(rawRequest: InputRequest, response: HttpResponse, start: Date): void;
}
