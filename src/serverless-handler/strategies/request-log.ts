import { v4 as uuid } from 'uuid';
import { LoggerContext } from 'node-smart-log';
import { HttpResponse, InputRequest } from '../dtos';
import { LogUtils } from '../log-utils';
import { RequestLog, ResponseLog } from '../types';

export abstract class RequestResponseLogger {
    protected logRequest(rawRequest: InputRequest): void {
        LoggerContext.setCorrelationId(rawRequest.requestId ?? uuid());
        const log: RequestLog = {
            action: 'request',
            host: rawRequest.host,
            headers: rawRequest.headers,
            method: rawRequest.method,
            path: rawRequest.path,
            route: rawRequest.route,
            pathParams: rawRequest.pathParams,
            queryString: rawRequest.queryParams,
            userAgent: rawRequest.userAgent,
            requestId: rawRequest.requestId,
        };
        LogUtils.doLog(log);
    }

    protected logResponse(rawRequest: InputRequest, response: HttpResponse, start: Date): void {
        const log: ResponseLog = {
            action: 'response',
            statusCode: response.status,
            duration: `${new Date().getTime() - start.getTime()}`,
            method: rawRequest.method,
            path: rawRequest.path,
            route: rawRequest.route,
            userAgent: rawRequest.userAgent,
            host: rawRequest.host,
            headers: rawRequest.headers,
            pathParams: rawRequest.pathParams,
            queryString: rawRequest.queryParams,
            requestId: rawRequest.requestId,
        };
        LogUtils.doLog(log);
    }
}
