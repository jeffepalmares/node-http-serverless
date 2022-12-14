process.env.NODE_ENV = 'local';
import { HttpStatusCode } from 'node-http-helper';
import 'reflect-metadata';
import { Container } from 'typedi';
import { AwsHttpResponse, ServerlessHandler } from '../src';

import { GetControllerHelper, MockDataHelper } from './helpers';
import { MockRequestHelper } from './helpers/mock-req-helper';
export * from './helpers';

describe('[GET]', () => {
    let event = MockRequestHelper.getAwsRequest();
    let mockData = MockDataHelper.getBody();
    beforeAll(() => {
        ServerlessHandler.setDependencyInjector(Container);
    });

    beforeEach(() => {
        event = MockRequestHelper.getAwsRequest();
        jest.clearAllMocks();
    });

    it('Should fill all parameters', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getAll');

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
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getEmpty');

        const func = ServerlessHandler.handler();
        event.path = '/users/empty';
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
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getById');

        const func = ServerlessHandler.handler();
        event.path = '/users/123';
        event.pathParameters = { any: 'users/123' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('GET /{id}/products', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users/123/products';
        event.pathParameters = { any: 'users/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('GET /{id}/products', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users/123/products';
        event.pathParameters = { any: 'users/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('GET /{id}/products/{productId}', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getUserProduct');

        const func = ServerlessHandler.handler();
        event.path = '/users/123/products/321';
        event.pathParameters = { any: 'users/123/products/321' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.id).toBe('123');
        expect(body.pid).toBe('321');

        expect(spy).toBeCalled();
    });

    it('GET /{id}/products/{productId}/suplier', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getUserProductSuplier');

        const func = ServerlessHandler.handler();
        event.path = '/users/123/products/321/suplier';
        event.pathParameters = { any: 'users/123/products/321/suplier' };
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

    it('GET /validate-param/{name}/{age}', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-param/test/12';
        event.pathParameters = { any: 'users/validate-param/test/12' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.name).toBe('test');
        expect(body.age).toBe(12);

        expect(spy).toBeCalled();
    });

    it('GET /validate-param/{name}/{age} - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-param/12/test';
        event.pathParameters = { any: 'users/validate-param/12/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('GET /validate-one-param/{name}', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateOneParam');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-one-param/12';
        event.pathParameters = { any: 'users/validate-one-param/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('GET /validate-query', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-query';

        event.queryStringParameters = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });
    it('GET /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('GET /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('GET /validate-one-query ', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-one-query';

        event.queryStringParameters = { age: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('GET /validate-one-query - Expected BadGateway', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-one-query';

        event.queryStringParameters = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('GET /validate-header ', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-header';

        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });

    it('GET /validate-one-header - Expected BadGateway', async () => {
        const spy = jest.spyOn(GetControllerHelper.prototype, 'getValidateOneHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users/validate-one-header';

        event.headers = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });
});
