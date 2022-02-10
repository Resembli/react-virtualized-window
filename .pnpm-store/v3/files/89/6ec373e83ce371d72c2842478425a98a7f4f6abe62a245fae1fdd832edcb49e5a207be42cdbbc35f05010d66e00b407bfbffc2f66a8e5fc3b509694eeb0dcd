import { Plugin, ParseOptions, Module, Output, Options, Script, Program, JsMinifyOptions } from "./types";
export * from "./types";
import { BundleInput } from "./spack";
/**
 * Version of the swc binding.
 */
export declare const version: any;
export declare function plugins(ps: Plugin[]): Plugin;
export declare class Compiler {
    minify(src: string, opts?: JsMinifyOptions): Promise<Output>;
    minifySync(src: string, opts?: JsMinifyOptions): Output;
    parse(src: string, options: ParseOptions & {
        isModule: false;
    }): Promise<Script>;
    parse(src: string, options?: ParseOptions, filename?: string): Promise<Module>;
    parseSync(src: string, options: ParseOptions & {
        isModule: false;
    }): Script;
    parseSync(src: string, options?: ParseOptions, filename?: string): Module;
    parseFile(path: string, options: ParseOptions & {
        isModule: false;
    }): Promise<Script>;
    parseFile(path: string, options?: ParseOptions): Promise<Module>;
    parseFileSync(path: string, options: ParseOptions & {
        isModule: false;
    }): Script;
    parseFileSync(path: string, options?: ParseOptions): Module;
    /**
     * Note: this method should be invoked on the compiler instance used
     *  for `parse()` / `parseSync()`.
     */
    print(m: Program, options?: Options): Promise<Output>;
    /**
     * Note: this method should be invoked on the compiler instance used
     *  for `parse()` / `parseSync()`.
     */
    printSync(m: Program, options?: Options): Output;
    transform(src: string | Program, options?: Options): Promise<Output>;
    transformSync(src: string | Program, options?: Options): Output;
    transformFile(path: string, options?: Options): Promise<Output>;
    transformFileSync(path: string, options?: Options): Output;
    bundle(options?: BundleInput | string): Promise<{
        [name: string]: Output;
    }>;
}
export declare function parse(src: string, options: ParseOptions & {
    isModule: false;
}): Promise<Script>;
export declare function parse(src: string, options?: ParseOptions): Promise<Module>;
export declare function parseSync(src: string, options: ParseOptions & {
    isModule: false;
}): Script;
export declare function parseSync(src: string, options?: ParseOptions): Module;
export declare function parseFile(path: string, options: ParseOptions & {
    isModule: false;
}): Promise<Script>;
export declare function parseFile(path: string, options?: ParseOptions): Promise<Module>;
export declare function parseFileSync(path: string, options: ParseOptions & {
    isModule: false;
}): Script;
export declare function parseFileSync(path: string, options?: ParseOptions): Module;
export declare function print(m: Program, options?: Options): Promise<Output>;
export declare function printSync(m: Program, options?: Options): Output;
export declare function transform(src: string | Program, options?: Options): Promise<Output>;
export declare function transformSync(src: string | Program, options?: Options): Output;
export declare function transformFile(path: string, options?: Options): Promise<Output>;
export declare function transformFileSync(path: string, options?: Options): Output;
export declare function bundle(options?: BundleInput | string): Promise<{
    [name: string]: Output;
}>;
export declare function minify(src: string, opts?: JsMinifyOptions): Promise<Output>;
export declare function minifySync(src: string, opts?: JsMinifyOptions): Output;
export declare const DEFAULT_EXTENSIONS: readonly string[];
