import { HttpMethod } from './http-method';
import { RouteParameter } from './route-parameter';
export declare class RouteExecutor {
    private path;
    private rawPath;
    private route;
    private controllerName;
    private controllerPath;
    private functionName;
    private controller;
    private method;
    private uriRegex;
    private uriRegexKey;
    private parameters;
    constructor(controllerName: string, method: HttpMethod, route: string, functionName: string);
    private generateRoute;
    private loadParameters;
    private buildUriRegex;
    setController(controller: any, controllerPath: string): void;
    getController(): any;
    getUriRegex(): RegExp;
    getControllerName(): string;
    getMethod(): HttpMethod;
    getFunctionName(): string;
    getRoute(): string;
    getRouteKey(): string;
    getParameters(): Array<RouteParameter>;
}
