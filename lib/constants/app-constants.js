"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConstants = void 0;
class AppConstants {
}
exports.AppConstants = AppConstants;
AppConstants.PARAMETER_REGEX_HOLDER = 'PARAM_REGEX';
AppConstants.PARAMETER_REGEX = '([\\d,\\w,@,\\.,_,\\-,#]*)';
AppConstants.QUERY_PARAMETER_REGEX = '(\\?.*)';
AppConstants.DEFAULT_API_PARAMETER_REGEX = /\{(.*?)\}/g;
AppConstants.CURLY_BRACKETS = /[\{\}]/g;
AppConstants.CURLY_PARAM = /\{(.*?)\}/g;
AppConstants.PARAM = /(.*?)/;
