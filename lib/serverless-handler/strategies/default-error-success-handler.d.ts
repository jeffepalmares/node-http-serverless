import { HttpResponse, InputRequest } from '../dtos';
import { RequestResponseLogger } from './request-log';
export declare abstract class DefaultErrorSuccessResponseHandler extends RequestResponseLogger {
    protected abstract handleHttpResponse(response: HttpResponse): unknown;
    protected defaultHandlerError(err: any): HttpResponse;
    protected defaultHandleSuccessResponse(response: unknown, rawRequest: InputRequest, start: Date): unknown;
}
