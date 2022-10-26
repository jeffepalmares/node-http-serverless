"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpMethodDecorator = void 0;
const node_smart_log_1 = require("node-smart-log");
const core_1 = require("../core");
const base_decorator_1 = require("./base-decorator");
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
        const successHandle = (result) => BaseHttpMethodDecorator.handleSuccess(result, statusCode);
        const errorHandle = (err) => BaseHttpMethodDecorator.handleError(err);
        node_smart_log_1.Logger.debug(route);
        core_1.RouteMetadata.register(target, propertyKey, method, route);
        propDesc.value = function (rawRequest) {
            // BaseHttpMethodDecorator.validateMethod(method, rawRequest.method);
            node_smart_log_1.Logger.debug(route);
            const key = BaseHttpMethodDecorator.generateKey(originalTarget, originalKey);
            node_smart_log_1.Logger.debug(key);
            return BaseHttpMethodDecorator.applyOriginal(this, originalFunction, rawRequest, successHandle, errorHandle);
        };
        return propDesc;
    }
}
exports.BaseHttpMethodDecorator = BaseHttpMethodDecorator;
