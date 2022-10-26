"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteMetadata = void 0;
const node_smart_log_1 = require("node-smart-log");
const types_1 = require("../types");
class RouteMetadata {
    static register(targetClass, functionName, method, route) {
        RouteMetadata.rawRoutes.push(new types_1.RouteExecutor(targetClass.constructor.name, method, route, functionName));
    }
    static registerController(controller, path) {
        const routes = RouteMetadata.rawRoutes.filter((r) => r.getControllerName() == controller.name);
        routes.forEach((r) => {
            r.setController(controller, path);
            RouteMetadata.router.set(r.getRouteKey(), r);
            node_smart_log_1.Logger.debug(`Registered Router: ${r.getRoute()}`, r);
        });
        node_smart_log_1.Logger.debug('Controller Registered');
    }
    static getRouter() {
        return RouteMetadata.router;
    }
    static getRoutes() {
        return RouteMetadata.rawRoutes;
    }
}
exports.RouteMetadata = RouteMetadata;
RouteMetadata.rawRoutes = [];
RouteMetadata.router = new Map();
