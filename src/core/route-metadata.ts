import { Logger } from 'node-smart-log';
import { HttpMethod, RouteExecutor } from '../types';

export class RouteMetadata {
    private static rawRoutes: Array<RouteExecutor> = [];
    private static routes: Array<RouteExecutor> = [];
    private static router: Map<string, RouteExecutor> = new Map();

    static register(targetClass: any, functionName: string, method: HttpMethod, route?: string): void {
        RouteMetadata.rawRoutes.push(new RouteExecutor(targetClass.constructor.name, method, route, functionName));
    }

    static registerController(controller: any, path: string): void {
        const routes = RouteMetadata.rawRoutes.filter((r) => r.getControllerName() == controller.name);
        routes.forEach((r) => {
            r.setController(controller, path);
            RouteMetadata.router.set(r.getRouteKey(), r);
            RouteMetadata.routes.push(r);
            Logger.debug(`Registered Router: ${r.getRoute()}`, r);
        });
        Logger.debug('Controller Registered');
    }

    public static getRoutes() {
        return RouteMetadata.routes;
    }

    public static setPrefix(prefix: string) {
        return RouteMetadata.routes;
    }
}
