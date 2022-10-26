"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResponseLogger = void 0;
const uuid_1 = require("uuid");
const node_smart_log_1 = require("node-smart-log");
const log_utils_1 = require("../log-utils");
class RequestResponseLogger {
    logRequest(rawRequest) {
        var _a;
        node_smart_log_1.LoggerContext.setCorrelationId((_a = rawRequest.requestId) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)());
        const log = {
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
        log_utils_1.LogUtils.doLog(log);
    }
    logResponse(rawRequest, response, start) {
        const log = {
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
        log_utils_1.LogUtils.doLog(log);
    }
}
exports.RequestResponseLogger = RequestResponseLogger;
