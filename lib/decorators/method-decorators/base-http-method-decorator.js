"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpMethodDecorator = void 0;
const node_http_helper_1 = require("node-http-helper");
const core_1 = require("../../core");
const request_processor_1 = require("../../core/request-processor");
const base_decorator_1 = require("../base-decorator");
class BaseHttpMethodDecorator extends base_decorator_1.BaseDecorator {
    static handleError(err) {
        return {
            statusCode: err.status,
            data: err.data,
        };
    }
    static handleSuccess(result, statusCode) {
        const status = statusCode || (result !== null && result !== undefined && result !== '' ? 200 : 204);
        return { statusCode: status, data: result };
    }
    static request(target, propertyKey, propDesc, method, statusCode, route) {
        const originalFunction = propDesc.value;
        const originalTarget = target;
        const originalKey = propertyKey;
        core_1.RouteMetadata.register(target, propertyKey, method, route);
        propDesc.value = function (rawRequest) {
            BaseHttpMethodDecorator.validateMethod(method, rawRequest.method);
            const key = BaseHttpMethodDecorator.generateKey(originalTarget, originalKey);
            const args = request_processor_1.RequestProcessor.process(key, rawRequest);
            return BaseHttpMethodDecorator.applyOriginal(this, originalFunction, args, statusCode);
        };
        return propDesc;
    }
    static validateMethod(expected, found) {
        if (expected !== found) {
            throw new node_http_helper_1.MethodNotAllowed(`${found} - Method not allowed!`);
        }
    }
}
exports.BaseHttpMethodDecorator = BaseHttpMethodDecorator;
