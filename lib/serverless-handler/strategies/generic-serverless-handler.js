"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericServerlessHandler = void 0;
const node_smart_log_1 = require("node-smart-log");
const core_1 = require("../../core");
const default_error_success_handler_1 = require("./default-error-success-handler");
const node_http_helper_1 = require("node-http-helper");
class GenericServerlessHandler extends default_error_success_handler_1.DefaultErrorSuccessResponseHandler {
    constructor(Injector) {
        super();
        this.Injector = Injector;
    }
    applyCall(p0, p1, start, dbConnection) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputRequest = this.getRawRequest(p0, p1);
            try {
                const route = this.findRouteByRequest(inputRequest);
                yield this.conectDb(dbConnection);
                node_smart_log_1.Logger.debug(`Getting ${route.getController().name} instance`);
                const controller = this.Injector.get(route.getController());
                node_smart_log_1.Logger.debug(`Invoking ${route.getController().name}.${route.getFunctionName()}`);
                const response = yield controller[route.getFunctionName()](inputRequest);
                return this.defaultHandleSuccessResponse(response, inputRequest, start);
            }
            catch (err) {
                node_smart_log_1.Logger.error(err);
                const httpResponse = this.defaultHandlerError(err);
                this.logResponse(inputRequest, httpResponse, start);
                return this.handleHttpResponse(httpResponse);
            }
        });
    }
    findRouteByRequest(inputRequest) {
        var _a;
        const route = (_a = this.findRouteByPath(inputRequest)) !== null && _a !== void 0 ? _a : this.findRouteByRegex(inputRequest);
        if (route) {
            node_smart_log_1.Logger.debug('Route Found');
            inputRequest.route = route.getRoute();
            this.loadPathParameters(inputRequest, route);
            this.logRequest(inputRequest);
            return route;
        }
        node_smart_log_1.Logger.debug(`No route found for ${inputRequest.path}`);
        this.logRequest(inputRequest);
        throw new node_http_helper_1.NotFoundError(`Route not found: ${inputRequest.path}`);
    }
    findRouteByPath(inputRequest) {
        const route = core_1.RouteMetadata.getRoutes().find((r) => r.getRoute() == inputRequest.path && r.getMethod() == inputRequest.method);
        return route;
    }
    findRouteByRegex(inputRequest) {
        var _a;
        for (const route of core_1.RouteMetadata.getRoutes()) {
            if ((_a = inputRequest.path) === null || _a === void 0 ? void 0 : _a.match(route.getUriRegex())) {
                if (route.getMethod() == inputRequest.method) {
                    return route;
                }
            }
        }
        return null;
    }
    loadPathParameters(inputRequest, route) {
        var _a;
        if (route.getParameters().length == 0)
            return;
        inputRequest.pathParams = (_a = inputRequest.pathParams) !== null && _a !== void 0 ? _a : {};
        const parameters = inputRequest.pathParams['any'];
        if (!parameters)
            return;
        let params = {};
        for (const p of route.getParameters()) {
            const v = p.getParamValue(inputRequest.path);
            params = Object.assign(Object.assign({}, params), v);
        }
        inputRequest.pathParams = params;
    }
    conectDb(connect) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connect) {
                    node_smart_log_1.Logger.debug('Connecting to Database');
                    yield connect();
                    node_smart_log_1.Logger.debug('Database successfully connected');
                }
                else {
                    node_smart_log_1.Logger.debug('No Database to connect');
                }
            }
            catch (err) {
                node_smart_log_1.Logger.error('Error while connecting to database', err);
                throw err;
            }
        });
    }
}
exports.GenericServerlessHandler = GenericServerlessHandler;
