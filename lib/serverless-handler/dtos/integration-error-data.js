"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationErrorData = void 0;
class IntegrationErrorData {
    constructor(url, baseUrl, errorCode, statusCode, errorMessage, curl, response, originData) {
        this.url = url;
        this.baseUrl = baseUrl;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.curl = curl;
        this.response = response;
        this.originData = originData;
    }
}
exports.IntegrationErrorData = IntegrationErrorData;
