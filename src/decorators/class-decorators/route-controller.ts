import { Request } from '../http-param-decorators';
import { InputRequest } from '../../serverless-handler/dtos';
import { RouteMetadata } from '../../core/route-metadata';

export class RouteInternalController {
    static instance: RouteInternalController = new RouteInternalController();
    constructor() {}

    getUris(@Request() req: InputRequest): unknown {
        const host = req.headers && req.headers['host'] ? req.headers['host'] : undefined;
        return {
            host,
            routes: RouteMetadata.getRoutes().map((r) => {
                httpMethod: `${r.getMethod()}`;
                route: `${host}${r.getRoute()}`;
            }),
        };
    }
}
