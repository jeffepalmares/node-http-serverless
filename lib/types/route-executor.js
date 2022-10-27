"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteExecutor = void 0;
const node_smart_log_1 = require("node-smart-log");
const constants_1 = require("../constants");
const regex_utils_1 = require("../utils/regex-utils");
const route_parameter_1 = require("./route-parameter");
class RouteExecutor {
    constructor(controllerName, method, route, functionName) {
        this.parameters = [];
        this.controllerName = controllerName;
        this.method = method;
        this.functionName = functionName;
        this.generateRoute(route);
    }
    generateRoute(path) {
        if (!path || path == '') {
            path = '/';
        }
        if (!regex_utils_1.RegexUtils.extract(path, /\//)) {
            node_smart_log_1.Logger.error('Invalid path, all path should start with: /');
            throw new Error('Invalid path, all path should start with: /');
        }
        this.route = path;
        this.loadParameters(path);
    }
    loadParameters(source) {
        if (!source)
            return;
        const pathParameter = regex_utils_1.RegexUtils.extract(source, constants_1.AppConstants.DEFAULT_API_PARAMETER_REGEX);
        if (pathParameter == null)
            return;
        this.parameters.push(new route_parameter_1.RouteParameter(pathParameter));
        this.path = regex_utils_1.RegexUtils.replace(pathParameter, source, constants_1.AppConstants.PARAMETER_REGEX_HOLDER);
        return this.loadParameters(this.path);
    }
    buildUriRegex() {
        var _a;
        let path = this.path || '';
        if (path == '') {
            this.uriRegexKey = `${this.controllerPath}((/|(\\?.*$))?)$`;
            this.uriRegex = new RegExp(this.uriRegexKey);
            this.route = `${this.controllerPath}${this.route}`;
            return;
        }
        path = (_a = regex_utils_1.RegexUtils.replace(constants_1.AppConstants.PARAMETER_REGEX_HOLDER, path, constants_1.AppConstants.PARAMETER_REGEX, true)) !== null && _a !== void 0 ? _a : path;
        this.uriRegexKey = `^${this.controllerPath}${path}$`;
        this.uriRegex = new RegExp(this.uriRegexKey);
        this.route = `${this.controllerPath}${this.route}`;
    }
    setController(controller, controllerPath) {
        this.controller = controller;
        this.controllerPath = controllerPath;
        this.buildUriRegex();
        this.parameters.forEach((p) => p.setRoute(this.route));
        node_smart_log_1.Logger.debug(this.uriRegex);
    }
    getController() {
        return this.controller;
    }
    getUriRegex() {
        return this.uriRegex;
    }
    getControllerName() {
        return this.controllerName;
    }
    getMethod() {
        return this.method;
    }
    getFunctionName() {
        return this.functionName;
    }
    getRoute() {
        return this.route;
    }
    getRouteKey() {
        return `${this.method}_${this.route}`;
    }
    getParameters() {
        return this.parameters;
    }
}
exports.RouteExecutor = RouteExecutor;
