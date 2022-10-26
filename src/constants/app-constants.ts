export abstract class AppConstants {
    public static readonly PARAMETER_REGEX_HOLDER = 'PARAM_REGEX';
    public static readonly PARAMETER_REGEX = '([\\d,\\w,@,\\.,_,\\-,#]*)';
    public static readonly QUERY_PARAMETER_REGEX = '(\\?.*)';
    public static readonly DEFAULT_API_PARAMETER_REGEX = /\{(.*?)\}/g;
    public static readonly CURLY_BRACKETS = /[\{\}]/g;
    public static readonly CURLY_PARAM = /\{(.*?)\}/g;
    public static readonly PARAM = /(.*?)/;
}
