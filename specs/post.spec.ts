import { HttpStatusCode } from 'node-http-helper';
import 'reflect-metadata';
import { Container } from 'typedi';
import { AwsHttpResponse, ServerlessHandler } from '../src';

import { PostControllerHelper, MockDataHelper } from './helpers';
import { MockRequestHelper } from './helpers/mock-req-helper';
export * from './helpers';

describe('[POST]', () => {
    let event = MockRequestHelper.getAwsRequest();
    let mockData = MockDataHelper.getBody();
    beforeAll(() => {
        ServerlessHandler.setDependencyInjector(Container);
    });

    beforeEach(() => {
        event = MockRequestHelper.getAwsRequest();
        event.httpMethod = 'POST';
        jest.clearAllMocks();
    });

    it('Should fill all parameters', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getAll');

        const func = ServerlessHandler.handler();
        event.path = '/users-post';
        event.queryStringParameters = mockData;
        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(body).toBeDefined();

        expect(body.log).toBe('doneByLogic');
        expect(body.parameters).toMatchObject(mockData);
        expect(body.token).toMatchObject(mockData);
        expect(spy).toBeCalled();
    });

    it('Should call without any parameter', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getEmpty');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/empty';
        event.queryStringParameters = mockData;
        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(body).toBeDefined();
        expect(body.log).toBe('doneByLogic');
        expect(body.params).toBeUndefined();
        expect(spy).toBeCalled();
    });

    it('By ID', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getById');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/123';
        event.pathParameters = { any: 'users-post/123' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('POST /{id}/products', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/123/products';
        event.pathParameters = { any: 'users-post/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('POST /{id}/products', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getUserProducts');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/123/products';
        event.pathParameters = { any: 'users-post/123/products' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(response.body).toBeDefined();
        expect(response.body).toBe('123');

        expect(spy).toBeCalled();
    });

    it('POST /{id}/products/{productId}', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getUserProduct');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/123/products/321';
        event.pathParameters = { any: 'users-post/123/products/321' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(body).toBeDefined();
        expect(body.id).toBe('123');
        expect(body.pid).toBe('321');

        expect(spy).toBeCalled();
    });

    it('POST /{id}/products/{productId}/suplier', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getUserProductSuplier');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/123/products/321/suplier';
        event.pathParameters = { any: 'users-post/123/products/321/suplier' };
        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(body).toBeDefined();
        expect(body.id).toBe('123');
        expect(body.pid).toBe('321');
        expect(body.suplier).toMatchObject(event.queryStringParameters);

        expect(spy).toBeCalled();
    });

    it('POST /validate-param/{name}/{age}', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-param/test/12';
        event.pathParameters = { any: 'users-post/validate-param/test/12' };
        const response = (await func(event, {})) as AwsHttpResponse;
        const body = JSON.parse(response.body);
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(body).toBeDefined();
        expect(body.name).toBe('test');
        expect(body.age).toBe(12);

        expect(spy).toBeCalled();
    });

    it('POST /validate-param/{name}/{age} - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-param/12/test';
        event.pathParameters = { any: 'users-post/validate-param/12/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('POST /validate-one-param/{name}', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateOneParam');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-one-param/12';
        event.pathParameters = { any: 'users-post/validate-one-param/12' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('POST /validate-query', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-query';

        event.queryStringParameters = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });
    it('POST /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('POST /validate-query - Expected retun BadRequest', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-query';

        event.queryStringParameters = { name: 'test' };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('POST /validate-one-query ', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-one-query';

        event.queryStringParameters = { age: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(response.body).toBe(12);

        expect(spy).toBeCalled();
    });

    it('POST /validate-one-query - Expected BadGateway', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateOneQuery');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-one-query';

        event.queryStringParameters = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('POST /validate-header ', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-header';

        event.headers = mockData;
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(JSON.parse(response.body)).toMatchObject(mockData);

        expect(spy).toBeCalled();
    });

    it('POST /validate-one-header - Expected BadGateway', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateOneHeader');

        const func = ServerlessHandler.handler();
        event.path = '/users-post/validate-one-header';

        event.headers = { name: 12 };
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);

        expect(spy).toBeCalled();
    });

    it('POST /validate-custom-status-code', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateStatusCode');

        event.path = '/users-post/validate-custom-status-code';

        const func = ServerlessHandler.handler();
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toBe('ok');
        expect(spy).toBeCalled();
    });

    it('POST /validate-error-staus', async () => {
        const spy = jest.spyOn(PostControllerHelper.prototype, 'getValidateErrorStatus');

        event.path = '/users-post/validate-error-staus';

        const func = ServerlessHandler.handler();
        const response = (await func(event, {})) as AwsHttpResponse;

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(HttpStatusCode.CONFLICT);
        expect(spy).toBeCalled();
    });
});
