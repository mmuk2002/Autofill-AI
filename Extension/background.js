function fill(tab) {
    console.log('Sending fillForm message to content script');
    chrome.tabs.sendMessage(tab.id, { action: 'fillForm' });
}

chrome.action.onClicked.addListener(function(tab) {
    console.log('Action button clicked');
    fill(tab);
});
