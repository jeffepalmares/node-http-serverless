/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpStatusCode } from 'node-http-helper';
import { BaseHttpMethodDecorator } from './base-http-method-decorator';

class HttpMethodDecorator extends BaseHttpMethodDecorator {
    /**
     * Set method as a Http Get Method
     * @param path {string} Path
     * @param statusCode {number} Response status code
     */
    Get =
        (path: string = '', statusCode: number = HttpStatusCode.OK) =>
        (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
            HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', statusCode, path);

    /**
     * Set method as a Http Post Method
     * @param path {string} Path
     * @param statusCode {number} Response status code
     */
    Post =
        (path: string = '', statusCode: number = HttpStatusCode.CREATED) =>
        (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
            HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', statusCode, path);

    /**
     * Set method as a Http Put Method
     * @param path {string} Path
     * @param statusCode {number} Response status code
     */
    Put =
        (path: string = '', statusCode: number = HttpStatusCode.OK) =>
        (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
            HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', statusCode, path);

    /**
     * Set method as a Http Patch Method
     * @param path {string} Path
     * @param statusCode {number} Response status code
     */
    Patch =
        (path: string = '', statusCode: number = HttpStatusCode.OK) =>
        (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
            HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', statusCode, path);

    /**
     * Set method as a Http Delete Method
     * @param path {string} Path
     * @param statusCode {number} Response status code
     */
    Delete =
        (path: string = '', statusCode: number = HttpStatusCode.NO_CONTENT) =>
        (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
            HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', statusCode, path);

    /**
     * Set method as a Http Options Method
     * @param path {string} Path
     * @param statusCode {number} Response status code
     */
    Options =
        (path: string = '', statusCode: number = HttpStatusCode.OK) =>
        (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
            HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', statusCode, path);

    /**
     * Set method as a Http Head Method
     * @param path {string} Path
     * @param statusCode {number} Response status code
     */
    Head =
        (path: string = '', statusCode: number = HttpStatusCode.OK) =>
        (target: object, propertyKey: string, propDesc: PropertyDescriptor) =>
            HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', statusCode, path);
}
const base = new HttpMethodDecorator();
export const { Get, Post, Put, Delete, Head, Options, Patch } = base;
