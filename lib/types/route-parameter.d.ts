export declare class RouteParameter {
    private route;
    private name;
    private parameter;
    constructor(parameter: string);
    private loadName;
    getName(): string;
    getParameter(): string;
    setRoute(route: string): void;
    getParamValue(path: string): {
        [key: string]: any;
    };
    private getParamRegx;
    private getValue;
}
