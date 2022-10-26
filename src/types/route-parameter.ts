import { AppConstants } from '../constants';
import { RegexUtils } from '../utils';

export class RouteParameter {
    private route: string;
    private name: string;
    private parameter: string;

    constructor(parameter: string) {
        this.parameter = parameter;
        this.loadName();
    }

    private loadName() {
        if (!this.parameter) return;
        this.name = RegexUtils.replace(AppConstants.CURLY_BRACKETS, this.parameter, '', true);
    }

    getName(): string {
        return this.name;
    }
    getParameter(): string {
        return this.parameter;
    }
    setRoute(route: string): void {
        this.route = route;
    }

    getParamValue(path: string): { [key: string]: any } {
        try {
            const result = {};
            if (!path) return result;

            const paramRegex = this.getParamRegx();

            if (!paramRegex) return result;

            if (path.charAt(0) != '/') {
                path = `/${path}`;
            }

            const value = this.getValue(path, paramRegex);

            result[this.name] = value;
            return result;
        } catch (err) {
            throw err;
        }
    }

    private getParamRegx(): string {
        const paramReg = '(.*?)($|/)';
        let paramRegex = RegexUtils.replace(`${this.parameter}(.*)`, this.route, paramReg);
        paramRegex = RegexUtils.replace(new RegExp('{(.*?)}', 'g'), paramRegex, '(.*?)');
        return paramRegex;
    }
    private getValue(path: string, stringReg: string) {
        let rawValue = RegexUtils.extract(path, new RegExp(stringReg));
        if (!rawValue) return null;
        if (rawValue.charAt(rawValue.length - 1) == '/') {
            rawValue = RegexUtils.replace(new RegExp('.$'), rawValue, '');
        }
        return RegexUtils.replace(new RegExp('.*\\/'), rawValue, '');
    }
}
