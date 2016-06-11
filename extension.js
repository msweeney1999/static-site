'use strict'

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');


let getImageTemplate = () => {
    
  return "/images/";  
};

let getFileTemplate = () => {
    
  return "/files/";  
};


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "static-test" is now active!');

    //context.subscriptions.push(disposable);
    
    let fileLinkDisposable = vscode.commands.registerCommand('extension.insertLink', () => {
        
        //vscode.window.showInformationMessage("Insert LINK");
        let linkTypeList = ['File', 'Image'];
        
        vscode.window.showQuickPick(linkTypeList, {placeHolder: 'LinkType'})
            .then(result => {
                //insertText(result);
                if(result==="File")
                    insertText(getFileTemplate());
                 else
                    insertText(getImageTemplate());    
            });
        
        
        
        //insertText("File link....");
    });
    
    let figureDisposable = vscode.commands.registerCommand('extension.insertFigure', () => {
        vscode.window.showInformationMessage("Insert FIGURE");
    });
    
    context.subscriptions.push(fileLinkDisposable);
    context.subscriptions.push(figureDisposable);
     
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


let insertText = (value) => {
    let editor = vscode.window.activeTextEditor;
    let selection = editor.selection;
    let range = new vscode.Range(selection.start, selection.end);
    editor.edit((editBuilder) => {
       editBuilder.replace(range, value); 
    });
    
}

