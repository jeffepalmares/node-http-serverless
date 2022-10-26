"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParamDecorator = void 0;
const base_decorator_1 = require("../base-decorator");
const core_1 = require("../../core");
class BaseParamDecorator extends base_decorator_1.BaseDecorator {
    static setParamMetadata(target, propertyKey, index, paramOptions, type, paramName) {
        const key = BaseParamDecorator.generateKey(target, propertyKey);
        let definition = core_1.RequestStorage.storage.get(key);
        paramOptions = paramOptions || {};
        const inputArgument = Object.assign(Object.assign({}, paramOptions), { index,
            type,
            paramName });
        if (!definition) {
            definition = {
                method: propertyKey,
                target,
                arguments: new Set(),
            };
        }
        if (!definition.arguments.has(inputArgument)) {
            definition.arguments.add(inputArgument);
            core_1.RequestStorage.storage.set(key, definition);
        }
    }
}
exports.BaseParamDecorator = BaseParamDecorator;
