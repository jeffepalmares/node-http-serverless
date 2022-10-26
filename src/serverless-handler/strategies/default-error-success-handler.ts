import { HttpStatusCode } from 'node-http-helper';
import { Logger } from 'node-smart-log';
import { HttpResponse, InputRequest, IntegrationErrorData } from '../dtos';
import { RequestResponseLogger } from './request-log';

export abstract class DefaultErrorSuccessResponseHandler extends RequestResponseLogger {
    protected abstract handleHttpResponse(response: HttpResponse): unknown;

    protected defaultHandlerError(err: any): HttpResponse {
        if (err && err.statusCode) {
            if (err.data instanceof IntegrationErrorData) {
                return new HttpResponse(err.statusCode, { message: err.message, error: err.data.originData });
            }
            return new HttpResponse(err.statusCode, { message: err.message, error: err.data });
        }
        if (err instanceof HttpResponse) {
            return err;
        }
        return new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusCode.parse(HttpStatusCode.INTERNAL_SERVER_ERROR), err);
    }

    protected defaultHandleSuccessResponse(response: unknown, rawRequest: InputRequest, start: Date): unknown {
        let httpResponse: HttpResponse;

        if (response instanceof HttpResponse) {
            httpResponse = response;
        } else if (response) {
            httpResponse = new HttpResponse(HttpStatusCode.OK, response);
        } else {
            httpResponse = new HttpResponse(HttpStatusCode.NO_CONTENT);
        }

        this.logResponse(rawRequest, httpResponse, start);

        return this.handleHttpResponse(httpResponse);
    }
}
