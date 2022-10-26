/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BaseHttpMethodDecorator } from './base-http-method-decorator';

class HttpMethodDecorator extends BaseHttpMethodDecorator {
    /**
     * Set method as a Http Get Method
     * @param statusCode {number} Response status code
     */
    Get = (path?: string) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'GET', path);

    /**
     * Set method as a Http Post Method
     * @param statusCode {number} Response status code
     */
    Post = (path?: string) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'POST', path);

    /**
     * Set method as a Http Put Method
     * @param statusCode {number} Response status code
     */
    Put = (path?: string) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PUT', path);

    /**
     * Set method as a Http Patch Method
     * @param statusCode {number} Response status code
     */
    Patch = (path?: string) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'PATCH', path);

    /**
     * Set method as a Http Delete Method
     * @param statusCode {number} Response status code
     */
    Delete = (path?: string) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'DELETE', path);

    /**
     * Set method as a Http Options Method
     * @param statusCode {number} Response status code
     */
    Options = (path?: string) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'OPTIONS', path);

    /**
     * Set method as a Http Head Method
     * @param statusCode {number} Response status code
     */
    Head = (path?: string) => (target: object, propertyKey: string, propDesc: PropertyDescriptor) => HttpMethodDecorator.request(target, propertyKey, propDesc, 'HEAD', path);
}
const base = new HttpMethodDecorator();
export const { Get, Post, Put, Delete, Head, Options, Patch } = base;
