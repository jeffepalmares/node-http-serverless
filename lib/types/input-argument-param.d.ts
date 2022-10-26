import { InputParamOptions } from './input-param-options';
import { ParamType } from './param-type-enum';
export interface InputArgumentParam extends InputParamOptions {
    paramName?: string;
    index: number;
    type: ParamType;
}
