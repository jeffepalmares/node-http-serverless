import { Logger } from 'node-smart-log';
import { AppConstants } from '../constants';
import { RegexUtils } from '../utils/regex-utils';
import { HttpMethod } from './http-method';
import { RouteParameter } from './route-parameter';

export class RouteExecutor {
    private path: string;
    private route: string;
    private controllerName: string;
    private controllerPath: string;
    private functionName: string;
    private controller: any;
    private method: HttpMethod;
    private uriRegex: RegExp;
    private uriRegexKey: string;
    private parameters: Array<RouteParameter> = [];

    constructor(controllerName: string, method: HttpMethod, route: string, functionName: string) {
        this.controllerName = controllerName;
        this.method = method;
        this.functionName = functionName;
        this.generateRoute(route);
    }

    private generateRoute(path: string) {
        if (!path || path == '') {
            path = '/';
        }

        if (!RegexUtils.extract(path, /\//)) {
            Logger.error('Invalid path, all path should start with: /');
            throw new Error('Invalid path, all path should start with: /');
        }

        this.route = path;

        this.loadParameters(path);
    }

    private loadParameters(source: string): void {
        if (!source) return;
        const pathParameter = RegexUtils.extract(source, AppConstants.DEFAULT_API_PARAMETER_REGEX);
        if (pathParameter == null) return;

        this.parameters.push(new RouteParameter(pathParameter));

        this.path = RegexUtils.replace(pathParameter, source, AppConstants.PARAMETER_REGEX_HOLDER);

        return this.loadParameters(this.path);
    }

    private buildUriRegex(): void {
        let path = this.path || '';
        if (path == '') {
            this.uriRegexKey = `${this.controllerPath}((/|(\\?.*$))?)$`;
            this.uriRegex = new RegExp(this.uriRegexKey);
            this.route = `${this.controllerPath}${this.route}`;
            return;
        }

        path = RegexUtils.replace(AppConstants.PARAMETER_REGEX_HOLDER, path, AppConstants.PARAMETER_REGEX, true) ?? path;
        this.uriRegexKey = `^${this.controllerPath}${path}$`;
        this.uriRegex = new RegExp(this.uriRegexKey);
        this.route = `${this.controllerPath}${this.route}`;
    }

    setController(controller: any, controllerPath: string) {
        this.controller = controller;
        this.controllerPath = controllerPath;
        this.buildUriRegex();
        this.parameters.forEach((p) => p.setRoute(this.route));
        Logger.debug(this.uriRegex);
    }
    getController(): any {
        return this.controller;
    }

    getUriRegex(): RegExp {
        return this.uriRegex;
    }

    getControllerName(): string {
        return this.controllerName;
    }
    getMethod(): HttpMethod {
        return this.method;
    }
    getFunctionName(): string {
        return this.functionName;
    }
    getRoute(): string {
        return this.route;
    }
    getRouteKey(): string {
        return `${this.method}_${this.route}`;
    }

    getParameters(): Array<RouteParameter> {
        return this.parameters;
    }
}
