var demoSettings = {
    "fields": [
        {
            "selector": "#textbox2",
            "static": "Meraj"
        },
        {
            "selector": "input[name=textbox1]",
            "static": "Mohammed"
        }
    ]
};

function fillForm() {
    var formFields = demoSettings.fields;
    formFields.forEach(function(field) {
        var element = document.querySelector(field.selector);
        if (element) {
            element.value = field.static;
        }
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'fillForm') {
        fillForm();
    }
});
