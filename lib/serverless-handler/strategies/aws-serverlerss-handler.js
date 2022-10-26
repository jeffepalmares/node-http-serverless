"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsServerlessHandler = void 0;
const node_smart_log_1 = require("node-smart-log");
const node_smart_log_2 = require("node-smart-log");
const generic_serverless_handler_1 = require("./generic-serverless-handler");
class AwsServerlessHandler extends generic_serverless_handler_1.GenericServerlessHandler {
    handleHttpResponse(response) {
        return {
            statusCode: response.status,
            body: response.data ? JSON.stringify(response.data) : null,
            headers: {
                'x-correlation-id': node_smart_log_2.LoggerContext.getCorrelationId(),
            },
        };
    }
    getRawRequest(event, context) {
        var _a;
        return {
            requestId: ((_a = event.headers[node_smart_log_1.LoggerConstants.CorrelationIdHeader]) !== null && _a !== void 0 ? _a : context.awsRequestId),
            method: event.httpMethod,
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
    getBody(event) {
        if (!event.body)
            return event.body;
        event.headers = event.headers || {};
        const contentType = event.headers['Content-Type'] || event.headers['content-type'] || null;
        if (contentType == 'application/json') {
            return typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        }
        return event.body;
    }
}
exports.AwsServerlessHandler = AwsServerlessHandler;
