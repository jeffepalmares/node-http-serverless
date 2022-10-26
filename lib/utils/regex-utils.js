"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexUtils = void 0;
const node_smart_log_1 = require("node-smart-log");
class RegexUtils {
    static extract(value, regex) {
        try {
            const result = RegexUtils.extractAll(value, regex);
            if (result && result.length > 0) {
                return result[0];
            }
            return null;
        }
        catch (err) {
            node_smart_log_1.Logger.error(err);
            return null;
        }
    }
    static extractAll(value, regex) {
        try {
            if (!value)
                return null;
            const result = value.match(regex);
            if (result && result.length > 0) {
                return result;
            }
            return null;
        }
        catch (err) {
            node_smart_log_1.Logger.error(err);
            return null;
        }
    }
    static replace(regex, value, replace, isGeneral = false) {
        try {
            regex = typeof regex === 'string' ? new RegExp(regex, isGeneral ? 'g' : '') : regex;
            if (!value)
                return null;
            if (replace === null || replace === undefined)
                return value;
            return value.replace(regex, replace);
        }
        catch (err) {
            node_smart_log_1.Logger.error(err);
            throw err;
        }
    }
}
exports.RegexUtils = RegexUtils;
