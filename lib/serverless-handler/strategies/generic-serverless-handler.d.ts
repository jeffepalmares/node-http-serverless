import { IDependencyInjector } from '../../types';
import { InputRequest } from '../dtos';
import { DefaultErrorSuccessResponseHandler } from './default-error-success-handler';
export declare abstract class GenericServerlessHandler<E, C> extends DefaultErrorSuccessResponseHandler {
    protected abstract getRawRequest(event: E, context: C): InputRequest;
    protected Injector: IDependencyInjector;
    constructor(Injector: IDependencyInjector);
    applyCall(p0: E, p1: C, start: Date, dbConnection?: Function): Promise<unknown>;
    private findRouteByRequest;
    private findRouteByPath;
    private findRouteByRegex;
    private loadPathParameters;
    private conectDb;
}
