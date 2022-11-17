/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpGenericError, HttpStatusCode } from 'node-http-helper';
import { HttpResponse } from '../serverless-handler/dtos';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export abstract class BaseDecorator {
    private static defaultHandleError(err: unknown): any {
        if (err instanceof HttpGenericError) {
            return new HttpResponse(err.statusCode, err.message, err['originData'] ?? err.data);
        }
        return new HttpResponse(err['statusCode'] ?? HttpStatusCode.INTERNAL_SERVER_ERROR, null, err);
    }

    private static defaultHandleSuccess(result: any, statusCode: number): HttpResponse {
        statusCode = statusCode == HttpStatusCode.OK || !statusCode ? (result ? statusCode : HttpStatusCode.NO_CONTENT) : statusCode;
        return new HttpResponse(statusCode, result);
    }

    protected static applyOriginal(source: any, originalFunction: any, args: Array<unknown>, statusCode: number) {
        try {
            const result = originalFunction.apply(source, args);

            if (result instanceof Promise) {
                return BaseDecorator.handleAsyncFunction(result, statusCode);
            }

            return BaseDecorator.defaultHandleSuccess(result, statusCode);
        } catch (err) {
            return BaseDecorator.defaultHandleError(err);
        }
    }

    protected static handleAsyncFunction(result: any, statusCode: number): Promise<unknown> {
        return new Promise((resolve) => {
            result
                .then((funcResult: any) => {
                    const resp = BaseDecorator.defaultHandleSuccess(funcResult, statusCode);
                    resolve(resp);
                })
                .catch((err: Error | undefined) => {
                    resolve(BaseDecorator.defaultHandleError(err));
                });
        });
    }

    protected static generateKey(target: Object, propertyKey: string | symbol): string {
        return `${target?.constructor?.name ?? 'default'}.${propertyKey as string}`;
    }
}
