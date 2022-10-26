"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogUtils = void 0;
const node_smart_log_1 = require("node-smart-log");
class LogUtils {
    static doLog(log) {
        var _a, _b;
        const logLevel = (_a = process.env.REQUEST_RESPONSE_LOG_LEVEL) !== null && _a !== void 0 ? _a : node_smart_log_1.LogLevel.INFO;
        switch ((_b = logLevel.toLocaleLowerCase()) !== null && _b !== void 0 ? _b : node_smart_log_1.LogLevel.INFO) {
            case node_smart_log_1.LogLevel.ERROR:
                return node_smart_log_1.Logger.error(log);
            case node_smart_log_1.LogLevel.WARN:
                return node_smart_log_1.Logger.warn(log);
            case node_smart_log_1.LogLevel.INFO:
                return node_smart_log_1.Logger.info(log);
            default:
                return node_smart_log_1.Logger.debug(log);
        }
    }
}
exports.LogUtils = LogUtils;
