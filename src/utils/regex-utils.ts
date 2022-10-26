import { Logger } from 'node-smart-log';

export class RegexUtils {
    static extract(value: string, regex: any): string {
        try {
            const result = RegexUtils.extractAll(value, regex);
            if (result && result.length > 0) {
                return result[0];
            }
            return null;
        } catch (err) {
            Logger.error(err);
            return null;
        }
    }
    static extractAll(value: string, regex: any): Array<string> {
        try {
            if (!value) return null;
            const result = value.match(regex);
            if (result && result.length > 0) {
                return result;
            }
            return null;
        } catch (err) {
            Logger.error(err);
            return null;
        }
    }

    static replace(regex: string | RegExp, value: string, replace: string, isGeneral = false): string {
        try {
            regex = typeof regex === 'string' ? new RegExp(regex, isGeneral ? 'g' : '') : regex;
            if (!value) return null;
            if (replace === null || replace === undefined) return value;

            return value.replace(regex, replace);
        } catch (err) {
            Logger.error(err);
            throw err;
        }
    }
}
