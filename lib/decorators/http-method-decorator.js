"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Options = exports.Head = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const base_http_method_decorator_1 = require("./base-http-method-decorator");
class HttpMethodDecorator extends base_http_method_decorator_1.BaseHttpMethodDecorator {
    constructor() {
        super(...arguments);
        /**
         * Set method as a Http Get Method
         * @param statusCode {number} Response status code
         */
        this.Get = (path, statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', statusCode, path);
        /**
         * Set method as a Http Post Method
         * @param statusCode {number} Response status code
         */
        this.Post = (path, statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', statusCode, path);
        /**
         * Set method as a Http Put Method
         * @param statusCode {number} Response status code
         */
        this.Put = (path, statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', statusCode, path);
        /**
         * Set method as a Http Patch Method
         * @param statusCode {number} Response status code
         */
        this.Patch = (path, statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', statusCode, path);
        /**
         * Set method as a Http Delete Method
         * @param statusCode {number} Response status code
         */
        this.Delete = (path, statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', statusCode, path);
        /**
         * Set method as a Http Options Method
         * @param statusCode {number} Response status code
         */
        this.Options = (path, statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', statusCode, path);
        /**
         * Set method as a Http Head Method
         * @param statusCode {number} Response status code
         */
        this.Head = (path, statusCode) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', statusCode, path);
    }
}
const base = new HttpMethodDecorator();
exports.Get = base.Get, exports.Post = base.Post, exports.Put = base.Put, exports.Delete = base.Delete, exports.Head = base.Head, exports.Options = base.Options, exports.Patch = base.Patch;
