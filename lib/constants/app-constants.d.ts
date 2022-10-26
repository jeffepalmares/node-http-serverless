export declare abstract class AppConstants {
    static readonly PARAMETER_REGEX_HOLDER = "PARAM_REGEX";
    static readonly PARAMETER_REGEX = "([\\d,\\w,@,\\.,_,\\-,#]*)";
    static readonly QUERY_PARAMETER_REGEX = "(\\?.*)";
    static readonly DEFAULT_API_PARAMETER_REGEX: RegExp;
    static readonly CURLY_BRACKETS: RegExp;
    static readonly CURLY_PARAM: RegExp;
    static readonly PARAM: RegExp;
}
