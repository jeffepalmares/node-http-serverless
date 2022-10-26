import { ParamDefinition } from '../types';

export class RequestStorage {
    static storage: Map<string, ParamDefinition> = new Map();

    static authStorage: Map<string, unknown> = new Map();

    static clear(): void {
        RequestStorage.storage = new Map();
    }
}
