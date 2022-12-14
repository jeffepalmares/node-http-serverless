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
            RouteMetadata.routes.push(r);
            node_smart_log_1.Logger.debug(`Registered Router: ${r.getRoute()}`, r);
        });
        node_smart_log_1.Logger.debug('Controller Registered');
    }
    static getRoutes() {
        return RouteMetadata.routes;
    }
    static setPrefix(prefix) {
        return RouteMetadata.routes;
    }
}
exports.RouteMetadata = RouteMetadata;
RouteMetadata.rawRoutes = [];
RouteMetadata.routes = [];
RouteMetadata.router = new Map();
