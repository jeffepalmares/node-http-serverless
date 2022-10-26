import { Service } from 'typedi';
import { Controller, Post, Param, Query, Header, Body } from '../../src';
import { LogicTestHelper } from './logic-helper';
import { ValidateAgeSchema, ValidateSchema } from './schemas';

@Controller('/users-post')
@Service()
export class PostControllerHelper {
    private logic: LogicTestHelper;

    constructor(logic: LogicTestHelper) {
        this.logic = logic;
    }

    @Post()
    async getAll(@Query() parameters: any, @Header() token: string) {
        return {
            parameters,
            token,
            log: this.logic.doSomething(),
        };
    }

    @Post('/empty')
    async getEmpty(params: any) {
        return {
            log: this.logic.doSomething(),
            params,
        };
    }

    @Post('/{id}')
    async getById(@Param('id') id: string) {
        return id;
    }

    @Post('/{id}/products')
    async getUserProducts(@Param('id') id: string) {
        return id;
    }

    @Post('/{id}/products/{productId}')
    async getUserProduct(@Param('id') id: string, @Param('productId') pid: string) {
        return {
            id,
            pid,
        };
    }

    @Post('/{id}/products/{productId}/suplier')
    async getUserProductSuplier(@Param('id') id: string, @Param('productId') pid: string, @Query() suplier: any) {
        return {
            id,
            pid,
            suplier,
        };
    }

    @Post('/validate-param/{name}/{age}')
    async getValidateParam(@Param({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Post('/validate-one-param/{age}')
    async getValidateOneParam(@Param('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Post('/validate-query')
    async getValidateQuery(@Query({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Post('/validate-one-query')
    async getValidateOneQuery(@Query('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }

    @Post('/validate-header')
    async getValidateHeader(@Header({ validateSchema: ValidateSchema }) param: any) {
        return param;
    }

    @Post('/validate-one-header')
    async getValidateOneHeader(@Header('age', { validateSchema: ValidateAgeSchema }) param: any) {
        return param;
    }
}
