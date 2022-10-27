import { Logger } from 'node-smart-log';
import { RouteExecutor, RouteParameter } from '../src/types';

const exampleController = 'ExampleController';
const httpMethod = 'GET';
const funcName = 'func';
const idList = ['/examples/123', '/examples/abc', '/examples/test@tes.com', '/examples/.test.com-fdsfdsfds'];
const prodList = ['/examples/123/products', '/examples/abc/products', '/examples/test@tes.com/products', '/examples/.test.com-fdsfdsfds/products'];
const prodIdList = ['/examples/123/products/123', '/examples/abc/products/abc', '/examples/test@tes.com/products/test@tes.com', '/examples/.test.com-fdsfdsfds/products/.test.com-fdsfdsfds'];
const prodIdSupList = [
    '/examples/123/products/123/supliers',
    '/examples/abc/products/abc/supliers',
    '/examples/test@tes.com/products/test@tes.com/supliers',
    '/examples/.test.com-fdsfdsfds/products/.test.com-fdsfdsfds/supliers',
];
const prodIdSupIdList = [
    '/examples/123/products/123/supliers/123',
    '/examples/abc/products/123/supliers/abc',
    '/examples/test@tes.com/products/test@tes.com/supliers/test@tes.com',
    '/examples/.test.com-fdsfdsfds/products/.test.com-fdsfdsfds/supliers/.test.com-fdsfdsfds',
];

const onlyId = ['/examples/123/abc/test@tes.com/.test.com-fdsfdsfds'];
describe('[RouteRegexUri]', () => {
    const byId = new RouteExecutor(exampleController, httpMethod, '/{id}', funcName);
    const byIdProd = new RouteExecutor(exampleController, httpMethod, '/{id}/products', funcName);
    const byIdProdId = new RouteExecutor(exampleController, httpMethod, '/{id}/products/{productId}', funcName);
    const byIdProdIdSup = new RouteExecutor(exampleController, httpMethod, '/{id}/products/{productId}/supliers', funcName);
    const byIdProdIdSupId = new RouteExecutor(exampleController, httpMethod, '/{id}/products/{productId}/supliers/{suplierId}', funcName);

    beforeAll(() => {
        byId.setController(null, '/examples');
        byIdProd.setController(null, '/examples');
        byIdProdId.setController(null, '/examples');
        byIdProdIdSup.setController(null, '/examples');
        byIdProdIdSupId.setController(null, '/examples');
    });

    function execute(path, regex) {
        Logger.debug(path);
        Logger.debug(regex);
        const result = path.match(regex);
        return result;
    }
    it('Should match /examples/{id}', () => {
        idList.forEach((u) => expect(execute(u, byId.getUriRegex())).toBeTruthy());
        prodList.forEach((u) => expect(execute(u, byId.getUriRegex())).toBeFalsy());
        prodIdList.forEach((u) => expect(execute(u, byId.getUriRegex())).toBeFalsy());
        prodIdSupList.forEach((u) => expect(execute(u, byId.getUriRegex())).toBeFalsy());
        prodIdSupIdList.forEach((u) => expect(execute(u, byId.getUriRegex())).toBeFalsy());
    });

    it('Should match /examples/{id}/products', () => {
        idList.forEach((u) => expect(execute(u, byIdProd.getUriRegex())).toBeFalsy());
        prodList.forEach((u) => expect(execute(u, byIdProd.getUriRegex())).toBeTruthy());
        prodIdList.forEach((u) => expect(execute(u, byIdProd.getUriRegex())).toBeFalsy());
        prodIdSupList.forEach((u) => expect(execute(u, byIdProd.getUriRegex())).toBeFalsy());
        prodIdSupIdList.forEach((u) => expect(execute(u, byIdProd.getUriRegex())).toBeFalsy());
    });

    it('Should match /examples/{id}/products/{productId}', () => {
        idList.forEach((u) => expect(execute(u, byIdProdId.getUriRegex())).toBeFalsy());
        prodList.forEach((u) => expect(execute(u, byIdProdId.getUriRegex())).toBeFalsy());
        prodIdList.forEach((u) => expect(execute(u, byIdProdId.getUriRegex())).toBeTruthy());
        prodIdSupList.forEach((u) => expect(execute(u, byIdProdId.getUriRegex())).toBeFalsy());
        prodIdSupIdList.forEach((u) => expect(execute(u, byIdProdId.getUriRegex())).toBeFalsy());
    });

    it('Should match /examples/{id}/products/{productId}/supliers', () => {
        idList.forEach((u) => expect(execute(u, byIdProdIdSup.getUriRegex())).toBeFalsy());
        prodList.forEach((u) => expect(execute(u, byIdProdIdSup.getUriRegex())).toBeFalsy());
        prodIdList.forEach((u) => expect(execute(u, byIdProdIdSup.getUriRegex())).toBeFalsy());
        prodIdSupList.forEach((u) => expect(execute(u, byIdProdIdSup.getUriRegex())).toBeTruthy());
        prodIdSupIdList.forEach((u) => expect(execute(u, byIdProdIdSup.getUriRegex())).toBeFalsy());
    });

    it('Should match /examples/{id}/{productId}/{suplierId}', () => {
        idList.forEach((u) => expect(execute(u, byIdProdIdSupId.getUriRegex())).toBeFalsy());
        prodList.forEach((u) => expect(execute(u, byIdProdIdSupId.getUriRegex())).toBeFalsy());
        prodIdList.forEach((u) => expect(execute(u, byIdProdIdSupId.getUriRegex())).toBeFalsy());
        prodIdSupList.forEach((u) => expect(execute(u, byIdProdIdSupId.getUriRegex())).toBeFalsy());
        prodIdSupIdList.forEach((u) => expect(execute(u, byIdProdIdSupId.getUriRegex())).toBeTruthy());
    });

    it('Should validate prefix', () => {
        const exmpRoute = new RouteExecutor(exampleController, httpMethod, '', funcName);
        exmpRoute.setController(null, '/example');
        expect('api/v1/example'.match(exmpRoute.getUriRegex())).toBeFalsy();
        expect('/api/v1/example'.match(exmpRoute.getUriRegex())).toBeFalsy();
        expect('/v1/example'.match(exmpRoute.getUriRegex())).toBeFalsy();
        expect('/v1/example/'.match(exmpRoute.getUriRegex())).toBeFalsy();
        expect('/example'.match(exmpRoute.getUriRegex())).toBeTruthy();
        expect('/api/v1/examples/123'.match(byIdProdIdSupId.getUriRegex())).toBeFalsy();
    });
});
