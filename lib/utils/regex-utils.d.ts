export declare class RegexUtils {
    static extract(value: string, regex: any): string;
    static extractAll(value: string, regex: any): Array<string>;
    static replace(regex: string | RegExp, value: string, replace: string, isGeneral?: boolean): string;
}
