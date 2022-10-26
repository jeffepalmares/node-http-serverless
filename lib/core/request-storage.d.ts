import { ParamDefinition } from '../types';
export declare class RequestStorage {
    static storage: Map<string, ParamDefinition>;
    static authStorage: Map<string, unknown>;
    static clear(): void;
}
