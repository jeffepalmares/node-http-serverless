import { Logger, LogLevel } from 'node-smart-log';
import { EventLog, RequestLog, ResponseLog } from './types';

export class LogUtils {
    public static doLog(log: RequestLog | EventLog | ResponseLog): void {
        const logLevel = process.env.REQUEST_RESPONSE_LOG_LEVEL ?? LogLevel.INFO;
        switch (logLevel.toLocaleLowerCase() ?? LogLevel.INFO) {
            case LogLevel.ERROR:
                return Logger.error(log);
            case LogLevel.WARN:
                return Logger.warn(log);
            case LogLevel.INFO:
                return Logger.info(log);
            default:
                return Logger.debug(log);
        }
    }
}
