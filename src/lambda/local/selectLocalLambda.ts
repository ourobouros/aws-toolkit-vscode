/*!
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

import * as nls from 'vscode-nls'
const localize = nls.loadMessageBundle()

import * as vscode from 'vscode'
import { detectLocalLambdas, LocalLambda } from './detectLocalLambdas'

export interface LocalLambdaQuickPickItem extends LocalLambda, vscode.QuickPickItem {
}

export async function selectLocalLambda(
    workspaceFolders: vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders
): Promise<LocalLambdaQuickPickItem | undefined> {
    const localLambdas = (await detectLocalLambdas(workspaceFolders)).map(lambda => ({
        ...lambda,
        label: lambda.lambda,
        description: lambda.templatePath
    }))

    return await vscode.window.showQuickPick(
        localLambdas,
        {
            placeHolder: localize(
                'AWS.message.prompt.selectLocalLambda.placeholder',
                'Select a lambda function'
            )
        }
    )
}
