/* eslint-disable import/no-duplicates */
import { StorageContext } from 'context-local-storage';
import { IDependencyInjector } from '../types';
import { log, Logger } from 'node-smart-log';
import { AwsServerlessHandler, GcpServerlessHandler } from './strategies';
import { GenericServerlessHandler } from './strategies/generic-serverless-handler';
import { ServerlessHandlerOptions, ServerlessProvider } from './types';
import { HttpStatusCode } from 'node-http-helper';

import { RouteInternalController } from '../documentation';

class AServerlessHandler {
    private static provider: ServerlessProvider = ServerlessProvider.AWS;

    private static dbConnection?: Function;
    private static injector: IDependencyInjector;
    private static warmupPayload?: string = 'serverless-plugin-warmup';

    /**
     * Define the serveless warmup payload
     * @param payload
     * @default {'serverless-plugin-warmup'}
     */
    public setWarmupPayload(payload: string) {
        AServerlessHandler.warmupPayload = payload;
    }

    /**
     * Define the default cloud serverless Provided. Currently accept AWS or GCP.
     * Use ServerlessProvider
     * @param provider
     */
    public setProvider(provider: ServerlessProvider) {
        AServerlessHandler.provider = provider ?? ServerlessProvider.AWS;
    }

    /**
     * Define a db connection function which will be called on every call.
     * @param dbConnection
     */
    public setDbConnection(dbConnection: Function) {
        AServerlessHandler.dbConnection = dbConnection;
    }

    /**
     * Define Dependency Injector Container, it will be used to instanciate the controller object.
     * @param dbConnection
     */
    public setDependencyInjector(injector: IDependencyInjector) {
        AServerlessHandler.injector = injector;
        injector.set(RouteInternalController, RouteInternalController.instance);
    }

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
    public handler(options?: ServerlessHandlerOptions): (p0: unknown, p1: unknown, callback?: Function) => unknown {
        return async (p0: unknown, p1: unknown, callback?: Function) =>
            await StorageContext.run(async () => {
                const start = new Date();
                try {
                    this.startLambda(p0, p1);

                    if (p0['source'] === AServerlessHandler.warmupPayload) {
                        Logger.info('Warmup Executed!');
                        return callback(null, {
                            statusCode: HttpStatusCode.NO_CONTENT,
                            body: null,
                        });
                    }

                    const handler = this.getHandlerProvider(options);
                    const dbConnection = options?.dbConnection || AServerlessHandler.dbConnection;
                    const response = await handler.applyCall(p0, p1, start, dbConnection);

                    Logger.info('Lambda executed');

                    if (callback) {
                        Logger.debug('Calling callback function', { response });
                        return callback(null, response);
                    }
                    return response;
                } catch (err) {
                    Logger.error('Serverless Handler Error', err);
                    if (callback) {
                        Logger.info('Calling callback response function');
                        callback({
                            statusCode: err.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
                        });
                        return;
                    }
                    return {
                        statusCode: err.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
                    };
                }
            });
    }

    private startLambda(p0: unknown, p1: unknown): void {
        Logger.debug({ p0 });
        Logger.debug({ p1 });
        if (p1 && p1['callbackWaitsForEmptyEventLoop']) {
            p1['callbackWaitsForEmptyEventLoop'] = false;
        }
        if (!AServerlessHandler.injector) {
            throw new Error('No Dependency Injectpor Defined, please set a DI invoking: AServerlessHandler.setDependencyInjector');
        }
    }
    @log()
    private getHandlerProvider(options?: ServerlessHandlerOptions): GenericServerlessHandler<unknown, unknown> {
        const provider = options?.serverlessProvider || AServerlessHandler.provider;

        AServerlessHandler.injector.set(ServerlessProvider.GCP, new GcpServerlessHandler(AServerlessHandler.injector));
        if (ServerlessProvider.GCP == provider) {
            return new GcpServerlessHandler(AServerlessHandler.injector);
        }
        return new AwsServerlessHandler(AServerlessHandler.injector);
    }
}
const ServerlessHandler = new AServerlessHandler();
export { ServerlessHandler };
