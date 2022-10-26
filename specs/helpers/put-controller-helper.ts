import { Service } from 'typedi';
import { Controller, Put, Param, Query, Header, Body } from '../../src';
import { LogicTestHelper } from './logic-helper';
import { ValidateAgeSchema, ValidateSchema } from './schemas';

@Controller('/users-put')
@Service()
export class PutControllerHelper {
    private logic: LogicTestHelper;

    constructor(logic: LogicTestHelper) {
        this.logic = logic;
    }

    @Put()
    async getAll(@Query() parameters: any, @Header() token: string) {
        return {
            parameters,
            token,
            log: this.logic.doSomething(),
        };
    }

    @Put('/empty')
    async getEmpty(params: any) {
        return {
            log: this.logic.doSomething(),
            params,
        };
    }

    @Put('/{id}')
    async getById(@Param('id') id: string) {
        return id;
    }

    @Put('/{id}/products')
    async getUserProducts(@Param('id') id: string) {
        return id;
    }

    @Put('/{id}/products/{productId}')
    async getUserProduct(@Param('id') id: string, @Param('productId') pid: string) {
        return {
            id,
            pid,
        };
    }

    @Put('/{id}/products/{productId}/suplier')
    async getUserProductSuplier(@Param('id') id: string, @Param('productId') pid: string, @Query() suplier: any) {
        return {
            id,
            pid,
            suplier,
        };
    }

    @Put('/validate-param/{name}/{age}')
    async getValidateParam(@Param({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Put('/validate-one-param/{age}')
    async getValidateOneParam(@Param('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Put('/validate-query')
    async getValidateQuery(@Query({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Put('/validate-one-query')
    async getValidateOneQuery(@Query('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Put('/validate-header')
    async getValidateHeader(@Header({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Put('/validate-one-header')
    async getValidateOneHeader(@Header('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }
}
