"use strict";
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDecorator = void 0;
const node_http_helper_1 = require("node-http-helper");
const dtos_1 = require("../serverless-handler/dtos");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class BaseDecorator {
    static defaultHandleError(err) {
        var _a;
        if (err instanceof node_http_helper_1.HttpGenericError) {
            return new dtos_1.HttpResponse(err.statusCode, err.message, err);
        }
        return new dtos_1.HttpResponse((_a = err['statusCode']) !== null && _a !== void 0 ? _a : node_http_helper_1.HttpStatusCode.INTERNAL_SERVER_ERROR, null, err);
    }
    static defaultHandleSuccess(result, statusCode) {
        statusCode = statusCode == node_http_helper_1.HttpStatusCode.OK || !statusCode ? (result ? statusCode : node_http_helper_1.HttpStatusCode.NO_CONTENT) : statusCode;
        return new dtos_1.HttpResponse(statusCode, result);
    }
    static applyOriginal(source, originalFunction, args, statusCode) {
        try {
            const result = originalFunction.apply(source, args);
            if (result instanceof Promise) {
                return BaseDecorator.handleAsyncFunction(result, statusCode);
            }
            return BaseDecorator.defaultHandleSuccess(result, statusCode);
        }
        catch (err) {
            return BaseDecorator.defaultHandleError(err);
        }
    }
    static handleAsyncFunction(result, statusCode) {
        return new Promise((resolve) => {
            result
                .then((funcResult) => {
                const resp = BaseDecorator.defaultHandleSuccess(funcResult, statusCode);
                resolve(resp);
            })
                .catch((err) => {
                resolve(BaseDecorator.defaultHandleError(err));
            });
        });
    }
    static generateKey(target, propertyKey) {
        var _a, _b;
        return `${(_b = (_a = target === null || target === void 0 ? void 0 : target.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'default'}.${propertyKey}`;
    }
}
exports.BaseDecorator = BaseDecorator;
