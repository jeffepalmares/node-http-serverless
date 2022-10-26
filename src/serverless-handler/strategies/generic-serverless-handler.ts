import { IDependencyInjector, RouteExecutor } from '../../types';
import { Logger } from 'node-smart-log';
import { InputRequest } from '../dtos';
import { RouteMetadata } from '../../core';
import { DefaultErrorSuccessResponseHandler } from './default-error-success-handler';
import { NotFoundError } from 'node-http-helper';

export abstract class GenericServerlessHandler<E, C> extends DefaultErrorSuccessResponseHandler {
    protected abstract getRawRequest(event: E, context: C): InputRequest;

    protected Injector: IDependencyInjector;

    constructor(Injector: IDependencyInjector) {
        super();
        this.Injector = Injector;
    }

    public async applyCall(p0: E, p1: C, start: Date, dbConnection?: Function): Promise<unknown> {
        const inputRequest: InputRequest = this.getRawRequest(p0, p1);
        try {
            const route = this.findRouteByRequest(inputRequest);

            await this.conectDb(dbConnection);

            Logger.debug(`Getting ${route.getController().name} instance`);
            const controller = this.Injector.get(route.getController());

            Logger.debug(`Invoking ${route.getController().name}.${route.getFunctionName()}`);
            const response = await controller[route.getFunctionName()](inputRequest);

            return this.defaultHandleSuccessResponse(response, inputRequest, start);
        } catch (err) {
            Logger.error(err);
            const httpResponse = this.defaultHandlerError(err);
            this.logResponse(inputRequest, httpResponse, start);
            return this.handleHttpResponse(httpResponse);
        }
    }

    private findRouteByRequest(inputRequest: InputRequest) {
        const route = this.findRouteByPath(inputRequest) ?? this.findRouteByRegex(inputRequest);

        if (route) {
            Logger.debug('Route Found');
            inputRequest.route = route.getRoute();
            this.loadPathParameters(inputRequest, route);
            this.logRequest(inputRequest);
            return route;
        }
        Logger.debug(`No route found for ${inputRequest.path}`);
        this.logRequest(inputRequest);
        throw new NotFoundError(`Route not found: ${inputRequest.path}`);
    }

    private findRouteByPath(inputRequest: InputRequest) {
        const route = RouteMetadata.getRoutes().find((r) => r.getRoute() == inputRequest.path && r.getMethod() == inputRequest.method);
        return route;
    }

    private findRouteByRegex(inputRequest: InputRequest) {
        for (const route of RouteMetadata.getRoutes()) {
            if (inputRequest.path?.match(route.getUriRegex())) {
                if (route.getMethod() == inputRequest.method) {
                    return route;
                }
            }
        }
        return null;
    }

    private loadPathParameters(inputRequest: InputRequest, route: RouteExecutor) {
        if (route.getParameters().length == 0) return;
        inputRequest.pathParams = inputRequest.pathParams ?? {};
        const parameters = inputRequest.pathParams['any'];
        if (!parameters) return;
        let params = {};
        for (const p of route.getParameters()) {
            const v = p.getParamValue(inputRequest.path);
            params = {
                ...params,
                ...v,
            };
        }
        inputRequest.pathParams = params;
    }
    private async conectDb(connect: Function): Promise<void> {
        try {
            if (connect) {
                Logger.debug('Connecting to Database');
                await connect();
                Logger.debug('Database successfully connected');
            } else {
                Logger.debug('No Database to connect');
            }
        } catch (err) {
            Logger.error('Error while connecting to database', err);
            throw err;
        }
    }
}
