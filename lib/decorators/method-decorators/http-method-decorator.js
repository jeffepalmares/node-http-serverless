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
        this.Get = (path) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', path);
        /**
         * Set method as a Http Post Method
         * @param statusCode {number} Response status code
         */
        this.Post = (path) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', path);
        /**
         * Set method as a Http Put Method
         * @param statusCode {number} Response status code
         */
        this.Put = (path) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', path);
        /**
         * Set method as a Http Patch Method
         * @param statusCode {number} Response status code
         */
        this.Patch = (path) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', path);
        /**
         * Set method as a Http Delete Method
         * @param statusCode {number} Response status code
         */
        this.Delete = (path) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', path);
        /**
         * Set method as a Http Options Method
         * @param statusCode {number} Response status code
         */
        this.Options = (path) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', path);
        /**
         * Set method as a Http Head Method
         * @param statusCode {number} Response status code
         */
        this.Head = (path) => (target, propertyKey, propDesc) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', path);
    }
}
const base = new HttpMethodDecorator();
exports.Get = base.Get, exports.Post = base.Post, exports.Put = base.Put, exports.Delete = base.Delete, exports.Head = base.Head, exports.Options = base.Options, exports.Patch = base.Patch;
