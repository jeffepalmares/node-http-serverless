import { Service } from 'typedi';
import { Controller, Delete, Param, Query, Header } from '../../src';
import { LogicTestHelper } from './logic-helper';
import { ValidateAgeSchema, ValidateSchema } from './schemas';

@Controller('/users-delete')
@Service()
export class DeleteControllerHelper {
    private logic: LogicTestHelper;

    constructor(logic: LogicTestHelper) {
        this.logic = logic;
    }

    @Delete()
    async getAll(@Query() parameters: any, @Header() token: string) {
        return {
            parameters,
            token,
            log: this.logic.doSomething(),
        };
    }

    @Delete('/empty')
    async getEmpty(params: any) {
        return {
            log: this.logic.doSomething(),
            params,
        };
    }

    @Delete('/{id}')
    async getById(@Param('id') id: string) {
        return id;
    }

    @Delete('/{id}/products')
    async getUserProducts(@Param('id') id: string) {
        return id;
    }

    @Delete('/{id}/products/{productId}')
    async getUserProduct(@Param('id') id: string, @Param('productId') pid: string) {
        return {
            id,
            pid,
        };
    }

    @Delete('/{id}/products/{productId}/suplier')
    async getUserProductSuplier(@Param('id') id: string, @Param('productId') pid: string, @Query() suplier: any) {
        return {
            id,
            pid,
            suplier,
        };
    }

    @Delete('/validate-param/{name}/{age}')
    async getValidateParam(@Param({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Delete('/validate-one-param/{age}')
    async getValidateOneParam(@Param('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Delete('/validate-query')
    async getValidateQuery(@Query({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Delete('/validate-one-query')
    async getValidateOneQuery(@Query('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Delete('/validate-header')
    async getValidateHeader(@Header({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Delete('/validate-one-header')
    async getValidateOneHeader(@Header('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }
}
