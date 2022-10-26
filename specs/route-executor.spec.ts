import { RegexUtils } from '../src/utils';
import { AppConstants } from '../src/constants';
describe('[RouteExecutor]', () => {
    it('Should Get Controller Type', () => {
        const parameters = RegexUtils.extract('/users/{id}/products/{idProd}', AppConstants.DEFAULT_API_PARAMETER_REGEX);
        const name = RegexUtils.replace(AppConstants.CURLY_BRACKETS, '{id}', '', true);
        expect(parameters).toBeDefined();
        expect(name).toBe('id');
    });
});
