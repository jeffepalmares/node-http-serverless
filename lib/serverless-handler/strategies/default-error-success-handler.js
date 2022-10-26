"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorSuccessResponseHandler = void 0;
const node_http_helper_1 = require("node-http-helper");
const dtos_1 = require("../dtos");
const request_log_1 = require("./request-log");
class DefaultErrorSuccessResponseHandler extends request_log_1.RequestResponseLogger {
    defaultHandlerError(err) {
        if (err && err.statusCode) {
            if (err.data instanceof dtos_1.IntegrationErrorData) {
                return new dtos_1.HttpResponse(err.statusCode, { message: err.message, error: err.data.originData });
            }
            return new dtos_1.HttpResponse(err.statusCode, { message: err.message, error: err.data });
        }
        if (err instanceof dtos_1.HttpResponse) {
            return err;
        }
        return new dtos_1.HttpResponse(node_http_helper_1.HttpStatusCode.INTERNAL_SERVER_ERROR, node_http_helper_1.HttpStatusCode.parse(node_http_helper_1.HttpStatusCode.INTERNAL_SERVER_ERROR), err);
    }
    defaultHandleSuccessResponse(response, rawRequest, start) {
        let httpResponse;
        if (response instanceof dtos_1.HttpResponse) {
            httpResponse = response;
        }
        else if (response) {
            httpResponse = new dtos_1.HttpResponse(node_http_helper_1.HttpStatusCode.OK, response);
        }
        else {
            httpResponse = new dtos_1.HttpResponse(node_http_helper_1.HttpStatusCode.NO_CONTENT);
        }
        this.logResponse(rawRequest, httpResponse, start);
        return this.handleHttpResponse(httpResponse);
    }
}
exports.DefaultErrorSuccessResponseHandler = DefaultErrorSuccessResponseHandler;
