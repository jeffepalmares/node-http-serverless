import { HttpMethod, RouteExecutor } from '../types';
export declare class RouteMetadata {
    private static rawRoutes;
    private static routes;
    private static router;
    static register(targetClass: any, functionName: string, method: HttpMethod, route?: string): void;
    static registerController(controller: any, path: string): void;
    static getRoutes(): RouteExecutor[];
}
