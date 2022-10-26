import * as Joi from 'joi';
import { BaseValidationOptions } from 'joi';

export interface InputParamOptions extends BaseValidationOptions {
    /**
     *
     * @validateSchema {Joi.object} Schema for validation
     */
    validateSchema?: Joi.ObjectSchema | null;
    /**
     * @deprecated please use 'allowUnknon' instead
     * @allowAditionalProperties {boolean} Should allow aditional properties ? default false
     * @default false
     */
    allowAditionalProperties?: boolean;
}
