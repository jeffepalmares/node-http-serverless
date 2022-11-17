import { log } from 'node-smart-log';
import { RouteMetadata } from '../core';
import { Controller, Get, Request } from '../decorators';
import { InputRequest } from '../serverless-handler/dtos';

@Controller('/sd')
export class RouteInternalController {
    static instance: RouteInternalController = new RouteInternalController();
    constructor() {}

    @Get()
    @log()
    getUris(@Request() req: InputRequest): unknown {
        return {
            routes: RouteMetadata.getRoutes().map((r) => {
                return {
                    httpMethod: r.getMethod(),
                    route: r.getRoute(),
                };
            }),
        };
    }
}
