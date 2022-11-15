chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        enabled: false,
        blockTw: false,
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'reload') {
        chrome.storage.local.get('autoAccept', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });
                return;
            }
            sendResponse({
                message: 'success'
            });
            chrome.tabs.query({url: "https://esportal.com/*"}, function(tab) {
                chrome.tabs.reload(tab[0].id) 
            })            
        });
        return true;
    }
});

