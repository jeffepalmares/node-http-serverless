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
        const router = core_1.RouteMetadata.getRouter();
        for (const [key, route] of router) {
            node_smart_log_1.Logger.debug({ route: route.getRoute(), uriRegex: key });
            if ((_a = inputRequest.path) === null || _a === void 0 ? void 0 : _a.match(route.getUriRegex())) {
                if (route.getMethod() == inputRequest.method) {
                    node_smart_log_1.Logger.debug('Route Found');
                    inputRequest.route = route.getRoute();
                    this.logRequest(inputRequest);
                    return route;
                }
            }
        }
        node_smart_log_1.Logger.debug(`No route found for ${inputRequest.path}`);
        this.logRequest(inputRequest);
        throw new Error('Route not found');
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
