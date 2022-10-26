import { HttpStatusCode } from 'node-http-helper';
import 'reflect-metadata';
import { Container } from 'typedi';
import { AwsHttpResponse, ServerlessHandler } from '../src';

import { PatchControllerHelper, MockDataHelper } from './helpers';
import { MockRequestHelper } from './helpers/mock-req-helper';
export * from './helpers';

describe('[PATCH]', () => {
    let event = MockRequestHelper.getAwsRequest();
    let mockData = MockDataHelper.getBody();
    beforeAll(() => {
        ServerlessHandler.setDependencyInjector(Container);
    });

    beforeEach(() => {
        event = MockRequestHelper.getAwsRequest();
        event.httpMethod = 'PATCH';
        jest.clearAllMocks();
    });

    it('Should fill all parameters', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getAll');

        event.path = '/users-patch';
        const func = ServerlessHandler.handler();
        event.queryStringParameters = mockData;
        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();

        expect(body.log).toBe('doneByLogic');
        expect(body.parameters).toMatchObject(mockData);
        expect(body.token).toMatchObject(mockData);
        expect(spy).toBeCalled();
    });

    it('Should call without any parameter', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getEmpty');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/empty';
        event.queryStringParameters = mockData;
        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.log).toBe('doneByLogic');
        expect(body.params).toBeUndefined();
        expect(spy).toBeCalled();
    });

    it('By ID', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getById');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/123';
        event.pathParameters = { any: 'users-patch/123' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('PATCH /{id}/products', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/123/products';
        event.pathParameters = { any: 'users-patch/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('PATCH /{id}/products', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/123/products';
        event.pathParameters = { any: 'users-patch/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('PATCH /{id}/products/{productId}', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getUserProduct');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/123/products/321';
        event.pathParameters = { any: 'users-patch/123/products/321' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.id).toBe('123');
        expect(body.pid).toBe('321');

        expect(spy).toBeCalled();
    });

    it('PATCH /{id}/products/{productId}/suplier', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getUserProductSuplier');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/123/products/321/suplier';
        event.pathParameters = { any: 'users-patch/123/products/321/suplier' };
        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.id).toBe('123');
        expect(body.pid).toBe('321');
        expect(body.suplier).toMatchObject(event.queryStringParameters);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-param/{name}/{age}', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-param/test/12';
        event.pathParameters = { any: 'users-patch/validate-param/test/12' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.name).toBe('test');
        expect(body.age).toBe(12);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-param/{name}/{age} - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-param/12/test';
        event.pathParameters = { any: 'users-patch/validate-param/12/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-one-param/{name}', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateOneParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-one-param/12';
        event.pathParameters = { any: 'users-patch/validate-one-param/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-query', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-query';

        event.queryStringParameters = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });
    it('PATCH /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-one-query ', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-one-query';

        event.queryStringParameters = { age: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-one-query - Expected BadGateway', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-one-query';

        event.queryStringParameters = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-header ', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-header';

        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });

    it('PATCH /validate-one-header - Expected BadGateway', async () => {
        const spy = jest.spyOn(PatchControllerHelper.prototype, 'getValidateOneHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users-patch/validate-one-header';

        event.headers = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });
});
