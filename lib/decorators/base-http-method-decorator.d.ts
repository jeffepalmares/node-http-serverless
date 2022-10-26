import { HttpMethod } from '../types';
import { BaseDecorator } from './base-decorator';
export declare class BaseHttpMethodDecorator extends BaseDecorator {
    protected static handleError(err?: any): unknown;
    protected static handleSuccess(result: any, statusCode?: number): unknown;
    static request(target: object, propertyKey: string, propDesc: PropertyDescriptor, method: HttpMethod, statusCode?: number, route?: string): PropertyDescriptor;
}
