import { InputRequest } from '../../serverless-handler/dtos';
export declare class RouteInternalController {
    static instance: RouteInternalController;
    constructor();
    getUris(req: InputRequest): unknown;
}
