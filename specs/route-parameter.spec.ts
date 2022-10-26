import { RouteParameter } from '../src/types';

describe('[RouteParameter]', () => {
    it('Should extract first path parameter', () => {
        const rp = new RouteParameter('{id}');
        rp.setRoute('/users/{id}');
        const result = rp.getParamValue('users/123');
        expect(result.id).toBe('123');
    });

    it('Should extract second path parameter', () => {
        const rp = new RouteParameter('{productId}');
        rp.setRoute('/users/{id}/products/{productId}');
        const result = rp.getParamValue('users/123/products/test');
        expect(result.productId).toBe('test');
    });
    it('Should extract path parameter and ignore query param', () => {
        const rp = new RouteParameter('{id}');
        rp.setRoute('/users/{id}/products');
        const result = rp.getParamValue('users/123/products?test=123');
        expect(result.id).toBe('123');
    });
    it('Should extract all path parameter', () => {
        const route = '/users/{fid}/{sid}/{tid}/products/{pid}';

        const fp = new RouteParameter('{fid}');
        fp.setRoute(route);

        const sp = new RouteParameter('{sid}');
        sp.setRoute(route);

        const tp = new RouteParameter('{tid}');
        tp.setRoute(route);

        const pi = new RouteParameter('{pid}');
        pi.setRoute(route);

        const fr = fp.getParamValue('/users/1/2/3/products/test');
        const sr = sp.getParamValue('/users/1/2/3/products/test');
        const tr = tp.getParamValue('/users/1/2/3/products/test');
        const pr = pi.getParamValue('/users/1/2/3/products/test');
        expect(fr.fid).toBe('1');
        expect(sr.sid).toBe('2');
        expect(tr.tid).toBe('3');
        expect(pr.pid).toBe('test');
    });
});
