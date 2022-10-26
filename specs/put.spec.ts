import { HttpStatusCode } from 'node-http-helper';
import 'reflect-metadata';
import { Container } from 'typedi';
import { AwsHttpResponse, ServerlessHandler } from '../src';

import { PutControllerHelper, MockDataHelper } from './helpers';
import { MockRequestHelper } from './helpers/mock-req-helper';
export * from './helpers';

describe('[PUT]', () => {
    let event = MockRequestHelper.getAwsRequest();
    let mockData = MockDataHelper.getBody();
    beforeAll(() => {
        ServerlessHandler.setDependencyInjector(Container);
    });

    beforeEach(() => {
        event = MockRequestHelper.getAwsRequest();
        event.httpMethod = 'PUT';
        jest.clearAllMocks();
    });

    it('Should fill all parameters', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getAll');

        const func = ServerlessHandler.handler();
        event.path = '/users-put';
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
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getEmpty');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/empty';
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
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getById');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/123';
        event.pathParameters = { any: 'users-put/123' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('PUT /{id}/products', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/123/products';
        event.pathParameters = { any: 'users-put/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('PUT /{id}/products', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/123/products';
        event.pathParameters = { any: 'users-put/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('PUT /{id}/products/{productId}', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getUserProduct');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/123/products/321';
        event.pathParameters = { any: 'users-put/123/products/321' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.id).toBe('123');
        expect(body.pid).toBe('321');

        expect(spy).toBeCalled();
    });

    it('PUT /{id}/products/{productId}/suplier', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getUserProductSuplier');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/123/products/321/suplier';
        event.pathParameters = { any: 'users-put/123/products/321/suplier' };
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

    it('PUT /validate-param/{name}/{age}', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-param/test/12';
        event.pathParameters = { any: 'users-put/validate-param/test/12' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(body).toBeDefined();
        expect(body.name).toBe('test');
        expect(body.age).toBe(12);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-param/{name}/{age} - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-param/12/test';
        event.pathParameters = { any: 'users-put/validate-param/12/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-one-param/{name}', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateOneParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-one-param/12';
        event.pathParameters = { any: 'users-put/validate-one-param/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-query', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-query';

        event.queryStringParameters = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });
    it('PUT /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-one-query ', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-one-query';

        event.queryStringParameters = { age: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-one-query - Expected BadGateway', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-one-query';

        event.queryStringParameters = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-header ', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-header';

        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });

    it('PUT /validate-one-header - Expected BadGateway', async () => {
        const spy = jest.spyOn(PutControllerHelper.prototype, 'getValidateOneHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users-put/validate-one-header';

        event.headers = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });
});
