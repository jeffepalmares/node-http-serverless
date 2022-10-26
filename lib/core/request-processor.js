"use strict";
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProcessor = void 0;
const node_http_helper_1 = require("node-http-helper");
const node_smart_log_1 = require("node-smart-log");
const param_type_enum_1 = require("../types/param-type-enum");
const request_storage_1 = require("./request-storage");
class RequestProcessor {
    static process(key, args) {
        var _a;
        const definition = request_storage_1.RequestStorage.storage.get(key);
        if (!definition)
            return;
        const parameters = [(_a = definition.arguments) === null || _a === void 0 ? void 0 : _a.size];
        const errors = [];
        definition.arguments.forEach((argument) => {
            RequestProcessor.validateArgument(argument, args, parameters, errors);
        });
        if (errors.length > 0) {
            throw new node_http_helper_1.BadRequestError('Invalid request', errors);
        }
        return parameters;
    }
    static getParameterOurce(param, arg) {
        switch (param === null || param === void 0 ? void 0 : param.type) {
            case param_type_enum_1.ParamType.Body:
                if (param.paramName) {
                    return (arg === null || arg === void 0 ? void 0 : arg.body) ? arg === null || arg === void 0 ? void 0 : arg.body[param.paramName] : undefined;
                }
                return arg.body;
            case param_type_enum_1.ParamType.Header:
                if (param.paramName) {
                    return (arg === null || arg === void 0 ? void 0 : arg.headers) ? arg === null || arg === void 0 ? void 0 : arg.headers[param.paramName] : undefined;
                }
                return arg.headers;
            case param_type_enum_1.ParamType.Query:
                if (param.paramName) {
                    return (arg === null || arg === void 0 ? void 0 : arg.queryParams) ? arg === null || arg === void 0 ? void 0 : arg.queryParams[param.paramName] : undefined;
                }
                return arg.queryParams;
            case param_type_enum_1.ParamType.Params:
                if (param.paramName) {
                    return (arg === null || arg === void 0 ? void 0 : arg.pathParams) ? arg === null || arg === void 0 ? void 0 : arg.pathParams[param.paramName] : undefined;
                }
                return arg.pathParams;
            default:
                return arg;
        }
    }
    static validateArgument(param, arg, parameters, errors) {
        var _a;
        let parameterValue = RequestProcessor.getParameterOurce(param, arg);
        if (param.paramName) {
            parameterValue = { [param.paramName]: parameterValue };
        }
        if (param.validateSchema) {
            const abortEarly = param.abortEarly != null && param.abortEarly !== undefined ? param.abortEarly : false;
            const result = param.validateSchema.validate(parameterValue || {}, Object.assign(Object.assign({}, param), { allowUnknown: param.allowAditionalProperties || false, abortEarly: abortEarly }));
            if (result.error && result.error.details && result.error.details.length > 0) {
                for (const error of result.error.details) {
                    errors.push({
                        source: RequestProcessor.getParameterSourceDesc(param.type),
                        message: (_a = error.context.name) !== null && _a !== void 0 ? _a : error.message,
                        fieldName: error.path[0],
                    });
                }
                return;
            }
            if (result.value) {
                parameterValue = result.value;
            }
            if (result.warning) {
                node_smart_log_1.Logger.warn(result.warning.details);
            }
        }
        parameters[param.index] = param.paramName ? parameterValue[param.paramName] : parameterValue;
        return parameters;
    }
    static getParameterSourceDesc(type) {
        switch (type) {
            case param_type_enum_1.ParamType.Body:
                return 'Request Body';
            case param_type_enum_1.ParamType.Header:
                return 'Request header';
            case param_type_enum_1.ParamType.Query:
                return 'Query String Params';
            case param_type_enum_1.ParamType.Params:
                return 'Path Parameters';
            default:
                return 'Request';
        }
    }
}
exports.RequestProcessor = RequestProcessor;
