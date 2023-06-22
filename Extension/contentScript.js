var demoSettings = {
    "fields": [
        {
            "selector": "#email",
            "static": "mmuk2002@gmail.com"
        },
        {
            "selector": "#name",
            "static": "Meraj Khan"
        },
        {
            "selector": "#about-you",
            "static": "" // Generated response to go in here
        }
    ]
};

function fillForm() {
    var formFields = demoSettings.fields;
    formFields.forEach(function(field) {
        var element = document.querySelector(field.selector);
        if (element) {
            if (field.static === "") {
                console.log("Reached the final part")
                // Make an AJAX request to get the generated response
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://127.0.0.1:5000/user_input', true);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        element.value = response.generated_text; // Set the generated response to the field
                    } else {
                        console.error('Error:', xhr.status);
                    }
                };
                xhr.onerror = function() {
                    console.error('Error: Request failed.');
                };
                xhr.send();
            } else {
                element.value = field.static;
            }
        }
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'fillForm') {
        fillForm();
    }
});

