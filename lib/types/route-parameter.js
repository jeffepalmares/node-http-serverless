"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteParameter = void 0;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
class RouteParameter {
    constructor(parameter) {
        this.parameter = parameter;
        this.loadName();
    }
    loadName() {
        if (!this.parameter)
            return;
        this.name = utils_1.RegexUtils.replace(constants_1.AppConstants.CURLY_BRACKETS, this.parameter, '', true);
    }
    getName() {
        return this.name;
    }
    getParameter() {
        return this.parameter;
    }
}
exports.RouteParameter = RouteParameter;
