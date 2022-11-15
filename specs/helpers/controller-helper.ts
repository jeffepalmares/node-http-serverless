import { Service } from 'typedi';
import { Controller, Get, Param, Query, Header, Body } from '../../src';
import { LogicTestHelper } from './logic-helper';
import { ValidateAgeSchema, ValidateSchema } from './schemas';

@Controller('/users')
@Service()
export class ControllerHelper {
    private logic: LogicTestHelper;

    constructor(logic: LogicTestHelper) {
        this.logic = logic;
    }

    @Get()
    async getAll(@Query() parameters: any, @Header() token: string) {
        return {
            parameters,
            token,
            log: this.logic.doSomething(),
        };
    }

    @Get('/empty')
    async getEmpty(params: any) {
        return {
            log: this.logic.doSomething(),
            params,
        };
    }

    @Get('/{id}')
    async getById(@Param('id') id: string) {
        return id;
    }

    @Get('/{id}/products')
    async getUserProducts(@Param('id') id: string) {
        return id;
    }

    @Get('/{id}/products/{productId}')
    async getUserProduct(@Param('id') id: string, @Param('productId') pid: string) {
        return {
            id,
            pid,
        };
    }

    @Get('/{id}/products/{productId}/suplier')
    async getUserProductSuplier(@Param('id') id: string, @Param('productId') pid: string, @Query() suplier: any) {
        return {
            id,
            pid,
            suplier,
        };
    }

    @Get('/validate-param/{name}/{age}')
    async getValidateParam(@Param({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Get('/validate-one-param/{age}')
    async getValidateOneParam(@Param('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Get('/validate-query')
    async getValidateQuery(@Query({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Get('/validate-one-query')
    async getValidateOneQuery(@Query('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Get('/validate-header')
    async getValidateHeader(@Header({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Get('/validate-one-header')
    async getValidateOneHeader(@Header('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }
}
