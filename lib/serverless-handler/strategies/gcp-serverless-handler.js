"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpServerlessHandler = void 0;
const uuid_1 = require("uuid");
const node_smart_log_1 = require("node-smart-log");
const generic_serverless_handler_1 = require("./generic-serverless-handler");
class GcpServerlessHandler extends generic_serverless_handler_1.GenericServerlessHandler {
    handleHttpResponse(response) {
        return this.resp.status(response.status).send(response.data);
    }
    getRawRequest(event, response) {
        var _a;
        this.resp = response;
        return {
            requestId: ((_a = event.headers[node_smart_log_1.LoggerConstants.CorrelationIdHeader]) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)()),
            method: event.method,
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
exports.GcpServerlessHandler = GcpServerlessHandler;
