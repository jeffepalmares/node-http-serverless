/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */

import { BadRequestError } from 'node-http-helper';
import { Logger } from 'node-smart-log';
import { InputRequest } from '../serverless-handler/dtos';
import { InputArgumentParam, ParameterValidationError } from '../types';

import { ParamType } from '../types/param-type-enum';

import { RequestStorage } from './request-storage';

export class RequestProcessor {
    static process(key: string, args: InputRequest): Array<unknown> {
        const definition = RequestStorage.storage.get(key);
        if (!definition) return;

        const parameters = [definition.arguments?.size];
        const errors: Array<ParameterValidationError> = [];

        definition.arguments.forEach((argument) => {
            RequestProcessor.validateArgument(argument, args, parameters, errors);
        });
        if (errors.length > 0) {
            throw new BadRequestError('Invalid request', errors);
        }
        return parameters;
    }

    private static getParameterOurce(param: InputArgumentParam, arg: InputRequest): unknown {
        switch (param?.type) {
            case ParamType.Body:
                if (param.paramName) {
                    return arg?.body ? arg?.body[param.paramName] : undefined;
                }
                return arg.body;
            case ParamType.Header:
                if (param.paramName) {
                    return arg?.headers ? arg?.headers[param.paramName] : undefined;
                }
                return arg.headers;
            case ParamType.Query:
                if (param.paramName) {
                    return arg?.queryParams ? arg?.queryParams[param.paramName] : undefined;
                }
                return arg.queryParams;
            case ParamType.Params:
                if (param.paramName) {
                    return arg?.pathParams ? arg?.pathParams[param.paramName] : undefined;
                }
                return arg.pathParams;
            default:
                return arg;
        }
    }

    private static validateArgument(param: InputArgumentParam, arg: InputRequest, parameters: Array<unknown>, errors: Array<ParameterValidationError>): Array<unknown> {
        let parameterValue = RequestProcessor.getParameterOurce(param, arg);
        if (param.paramName) {
            parameterValue = { [param.paramName]: parameterValue };
        }
        if (param.validateSchema) {
            const abortEarly = param.abortEarly != null && param.abortEarly !== undefined ? param.abortEarly : false;
            const result = param.validateSchema.validate(parameterValue || {}, { ...param, allowUnknown: param.allowAditionalProperties || false, abortEarly: abortEarly });
            if (result.error && result.error.details && result.error.details.length > 0) {
                for (const error of result.error.details) {
                    errors.push({
                        source: RequestProcessor.getParameterSourceDesc(param.type),
                        message: error.context.name ?? error.message,
                        fieldName: error.path[0],
                    });
                }

                return;
            }
            if (result.value) {
                parameterValue = result.value;
            }

            if (result.warning) {
                Logger.warn(result.warning.details);
            }
        }

        parameters[param.index] = param.paramName ? parameterValue[param.paramName] : parameterValue;
        return parameters;
    }

    private static getParameterSourceDesc(type: ParamType): string {
        switch (type) {
            case ParamType.Body:
                return 'Request Body';
            case ParamType.Header:
                return 'Request header';
            case ParamType.Query:
                return 'Query String Params';
            case ParamType.Params:
                return 'Path Parameters';
            default:
                return 'Request';
        }
    }
}
