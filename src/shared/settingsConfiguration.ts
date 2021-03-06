/*!
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

import * as vscode from 'vscode'

// defines helper methods for interacting with VSCode's configuration
// persistence mechanisms, allowing us to test with mocks.
export interface SettingsConfiguration {
    readSetting<T>(settingKey: string, defaultValue?: T): T | undefined

    // array values are serialized as a comma-delimited string
    writeSetting<T>(settingKey: string, value: T | undefined, target: vscode.ConfigurationTarget): Promise<void>
}

// default configuration settings handler for production release
export class DefaultSettingsConfiguration implements SettingsConfiguration {
    public constructor(public readonly extensionSettingsPrefix: string) {
    }

    public readSetting<T>(settingKey: string, defaultValue?: T): T | undefined {
        const settings = vscode.workspace.getConfiguration(this.extensionSettingsPrefix)
        if (settings) {
            const val = settings.get<T>(settingKey)
            if (val) {
                return val
            }
        }

        return defaultValue || undefined
    }

    public async writeSetting<T>(settingKey: string, value: T, target: vscode.ConfigurationTarget): Promise<void> {
        const settings = vscode.workspace.getConfiguration(this.extensionSettingsPrefix)

        await settings.update(settingKey, value, target)
    }
}
