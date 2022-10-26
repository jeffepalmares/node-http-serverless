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
    setRoute(route) {
        this.route = route;
    }
    getParamValue(path) {
        try {
            const result = {};
            if (!path)
                return result;
            const paramRegex = this.getParamRegx();
            if (!paramRegex)
                return result;
            if (path.charAt(0) != '/') {
                path = `/${path}`;
            }
            const value = this.getValue(path, paramRegex);
            result[this.name] = value;
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    getParamRegx() {
        const paramReg = '(.*?)($|/)';
        let paramRegex = utils_1.RegexUtils.replace(`${this.parameter}(.*)`, this.route, paramReg);
        paramRegex = utils_1.RegexUtils.replace(new RegExp('{(.*?)}', 'g'), paramRegex, '(.*?)');
        return paramRegex;
    }
    getValue(path, stringReg) {
        let rawValue = utils_1.RegexUtils.extract(path, new RegExp(stringReg));
        if (!rawValue)
            return null;
        if (rawValue.charAt(rawValue.length - 1) == '/') {
            rawValue = utils_1.RegexUtils.replace(new RegExp('.$'), rawValue, '');
        }
        return utils_1.RegexUtils.replace(new RegExp('.*\\/'), rawValue, '');
    }
}
exports.RouteParameter = RouteParameter;
