import { v4 as uuid } from 'uuid';
import { LoggerConstants } from 'node-smart-log';

import { HttpResponse, InputRequest } from '../dtos';
import { GenericServerlessHandler } from './generic-serverless-handler';

import { GcpEvent, GcpResponse } from '../types/gcp';
import { HttpMethod } from '../../types';

export class GcpServerlessHandler extends GenericServerlessHandler<unknown, unknown> {
    private resp: GcpResponse;

    protected handleHttpResponse(response: HttpResponse): unknown {
        return this.resp.status(response.status).send(response.data);
    }

    protected getRawRequest(event: GcpEvent, response: GcpResponse): InputRequest {
        this.resp = response;
        return {
            requestId: (event.headers[LoggerConstants.CorrelationIdHeader] ?? uuid()) as string,
            method: event.method as HttpMethod,
            path: event.path,
            host: event.hostname,
            userAgent: event.get('User-Agent'),
            body: event.body,
            pathParams: event.params,
            queryParams: event.query,
            headers: event.headers,
            rawRequest: event,
        };
    }
}
