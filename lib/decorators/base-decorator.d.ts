export declare abstract class BaseDecorator {
    private static defaultHandleError;
    private static defaultHandleSuccess;
    protected static applyOriginal(source: any, originalFunction: any, args: Array<unknown>, statusCode: number): any;
    protected static handleAsyncFunction(result: any, statusCode: number): Promise<unknown>;
    protected static generateKey(target: Object, propertyKey: string | symbol): string;
}
