/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { MethodNotAllowed } from 'node-http-helper';
import { RouteMetadata } from '../../core';
import { RequestProcessor } from '../../core/request-processor';
import { HttpMethod } from '../../types';
import { BaseDecorator } from '../base-decorator';

export class BaseHttpMethodDecorator extends BaseDecorator {
    protected static handleError(err?: any): unknown {
        return {
            statusCode: err.status,
            data: err.data,
        };
    }

    protected static handleSuccess(result: any, statusCode?: number): unknown {
        const status = statusCode || (result !== null && result !== undefined && result !== '' ? 200 : 204);
        return { statusCode: status, data: result };
    }

    static request(target: object, propertyKey: string, propDesc: PropertyDescriptor, method: HttpMethod, route?: string) {
        const originalFunction: Function = propDesc.value;
        const originalTarget = target;
        const originalKey = propertyKey;
        RouteMetadata.register(target, propertyKey, method, route);

        propDesc.value = function (rawRequest: any) {
            BaseHttpMethodDecorator.validateMethod(method, rawRequest.method);

            const key = BaseHttpMethodDecorator.generateKey(originalTarget, originalKey);

            const args = RequestProcessor.process(key, rawRequest);

            return BaseHttpMethodDecorator.applyOriginal(this, originalFunction, args);
        };
        return propDesc;
    }
    protected static validateMethod(expected: HttpMethod, found: HttpMethod) {
        if (expected !== found) {
            throw new MethodNotAllowed(`${found} - Method not allowed!`);
        }
    }
}
