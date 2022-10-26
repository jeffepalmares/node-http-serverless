import { IDependencyInjector } from '../types';
import { ServerlessHandlerOptions, ServerlessProvider } from './types';
declare class AServerlessHandler {
    private static provider;
    private static dbConnection?;
    private static injector;
    private static warmupPayload?;
    /**
     * Define the serveless warmup payload
     * @param payload
     * @default {'serverless-plugin-warmup'}
     */
    setWarmupPayload(payload: string): void;
    /**
     * Define the default cloud serverless Provided. Currently accept AWS or GCP.
     * Use ServerlessProvider
     * @param provider
     */
    setProvider(provider: ServerlessProvider): void;
    /**
     * Define a db connection function which will be called on every call.
     * @param dbConnection
     */
    setDbConnection(dbConnection: Function): void;
    /**
     * Define Dependency Injector Container, it will be used to instanciate the controller object.
     * @param dbConnection
     */
    setDependencyInjector(injector: IDependencyInjector): void;
    /**
     * Provide your controller type
     * @param controllerType
     *
     * The name of the method will be called
     * @param method
     *
     * Info if you have a connection DB or any other promise which is needed to be resolved before you function,
     * also you can specify your cloud function provider
     * @param options
     *
     * Will be returned the serverlerss handler function
     * @returns
     */
    handler(options?: ServerlessHandlerOptions): (p0: unknown, p1: unknown, callback?: Function) => unknown;
    private startLambda;
    private getHandlerProvider;
}
declare const ServerlessHandler: AServerlessHandler;
export { ServerlessHandler };
