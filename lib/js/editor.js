// Retrieve element 
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 'console.log("Hello world!")';
let consoleMessages = [];
let editorLib = {
    clearConsoleScreen() {
        consoleMessages.length = 0;

        //Remove all elements in the log list
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }

    },
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class; // log log--string
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);

        })
    },

    init(){
        // Configure Ace


        // Theme 
        codeEditor.setTheme("ace/theme/dreamweaver");

        // Set language 
        codeEditor.session.setMode("ace/mode/javascript");

        // Set Options 
        codeEditor.setOptions({
            fontFamily: 'Inconsolata',
            fontSize: '12pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,

        });

        // Set default code
        codeEditor.setValue(defaultCode);

    }
}

// Events
executeCodeBtn.addEventListener('click', () => {
    // CLear console messages
    editorLib.clearConsoleScreen();

    //Get Input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    try {
        new Function(userCode)();

    } catch (err) {
        console.error(err);

    }

    // Print to the consloe
    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);

    

})


editorLib.init();