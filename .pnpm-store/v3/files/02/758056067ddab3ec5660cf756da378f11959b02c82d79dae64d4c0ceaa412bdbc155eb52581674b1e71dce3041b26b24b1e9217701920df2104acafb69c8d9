/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PluginContext, RedirectMetadata } from './types';
export declare type WriteFilesPluginContext = Pick<PluginContext, 'baseUrl' | 'outDir'>;
export declare type RedirectFileMetadata = {
    fileAbsolutePath: string;
    fileContent: string;
};
export declare function createToUrl(baseUrl: string, to: string): string;
export declare function toRedirectFilesMetadata(redirects: RedirectMetadata[], pluginContext: WriteFilesPluginContext, trailingSlash: boolean | undefined): RedirectFileMetadata[];
export declare function writeRedirectFile(file: RedirectFileMetadata): Promise<void>;
export default function writeRedirectFiles(redirectFiles: RedirectFileMetadata[]): Promise<void>;
