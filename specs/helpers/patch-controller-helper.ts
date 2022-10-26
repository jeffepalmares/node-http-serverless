import { Service } from 'typedi';
import { Controller, Patch, Param, Query, Header, Body } from '../../src';
import { LogicTestHelper } from './logic-helper';
import { ValidateAgeSchema, ValidateSchema } from './schemas';

@Controller('/users-patch')
@Service()
export class PatchControllerHelper {
    private logic: LogicTestHelper;

    constructor(logic: LogicTestHelper) {
        this.logic = logic;
    }

    @Patch()
    async getAll(@Query() parameters: any, @Header() token: string) {
        return {
            parameters,
            token,
            log: this.logic.doSomething(),
        };
    }

    @Patch('/empty')
    async getEmpty(params: any) {
        return {
            log: this.logic.doSomething(),
            params,
        };
    }

    @Patch('/{id}')
    async getById(@Param('id') id: string) {
        return id;
    }

    @Patch('/{id}/products')
    async getUserProducts(@Param('id') id: string) {
        return id;
    }

    @Patch('/{id}/products/{productId}')
    async getUserProduct(@Param('id') id: string, @Param('productId') pid: string) {
        return {
            id,
            pid,
        };
    }

    @Patch('/{id}/products/{productId}/suplier')
    async getUserProductSuplier(@Param('id') id: string, @Param('productId') pid: string, @Query() suplier: any) {
        return {
            id,
            pid,
            suplier,
        };
    }

    @Patch('/validate-param/{name}/{age}')
    async getValidateParam(@Param({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Patch('/validate-one-param/{age}')
    async getValidateOneParam(@Param('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Patch('/validate-query')
    async getValidateQuery(@Query({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Patch('/validate-one-query')
    async getValidateOneQuery(@Query('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Patch('/validate-header')
    async getValidateHeader(@Header({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Patch('/validate-one-header')
    async getValidateOneHeader(@Header('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }
}
