import { LoggerConstants } from 'node-smart-log';

import { LoggerContext } from 'node-smart-log';
import { InputRequest, HttpResponse } from '../dtos';

import { HttpMethod } from '../../types';
import { AwsContext, AwsHttpEvent, AwsHttpResponse } from '../types';
import { GenericServerlessHandler } from './generic-serverless-handler';

export class AwsServerlessHandler extends GenericServerlessHandler<AwsHttpEvent, AwsContext> {
    protected handleHttpResponse(response: HttpResponse): AwsHttpResponse {
        return {
            statusCode: response.status,
            body: response.data ? (typeof response.data == 'object' ? JSON.stringify(response.data) : (response.data as string)) : null,
            headers: {
                'x-correlation-id': LoggerContext.getCorrelationId(),
            },
        };
    }

    protected getRawRequest(event: AwsHttpEvent, context: AwsContext): InputRequest {
        return {
            requestId: (event.headers[LoggerConstants.CorrelationIdHeader] ?? context.awsRequestId) as string,
            method: event.httpMethod as HttpMethod,
            path: event.path,
            host: event.requestContext.identity.sourceIp,
            userAgent: event.requestContext.identity.userAgent,
            body: this.getBody(event),
            pathParams: event.pathParameters,
            queryParams: event.queryStringParameters,
            headers: event.headers,
            rawRequest: event,
        };
    }

    private getBody(event: AwsHttpEvent): unknown {
        if (!event.body) return event.body;
        event.headers = event.headers || {};
        const contentType = event.headers['Content-Type'] || event.headers['content-type'] || null;
        if (contentType == 'application/json') {
            return typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        }
        return event.body;
    }
}
