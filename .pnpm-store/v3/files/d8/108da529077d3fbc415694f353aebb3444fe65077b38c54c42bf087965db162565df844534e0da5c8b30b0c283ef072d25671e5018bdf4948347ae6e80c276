/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Props } from '@docusaurus/types';
export declare type PluginOptions = {
    id: string;
    fromExtensions: string[];
    toExtensions: string[];
    redirects: RedirectOption[];
    createRedirects?: CreateRedirectsFnOption;
};
export declare type CreateRedirectsFnOption = (path: string) => string[] | string | null | undefined;
export declare type RedirectOption = {
    to: string;
    from: string | string[];
};
export declare type UserPluginOptions = Partial<PluginOptions>;
export declare type PluginContext = Pick<Props, 'outDir' | 'baseUrl'> & {
    options: PluginOptions;
    relativeRoutesPaths: string[];
};
export declare type RedirectMetadata = {
    from: string;
    to: string;
};
