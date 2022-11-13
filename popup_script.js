
let enabled = false; //disabled by default
let enableButton = document.getElementById('enablePlug');
let blockTwButton = document.getElementById('blockTw');

let enableText = ` 
<input  type="checkbox"
        id="enableCheckbox" 
        value="1" checked 
        />
<label for="enableCheckbox" class="g">Auto accept is on <svg>
<circle class="clock" cx="20" cy="20" r="10" />
</svg></label><br /><br`;

let disableText = ` 
<input  type="checkbox"
        id="enableCheckbox" 
        value="0" 
        />
<label for="enableCheckbox">Auto accept is off</label><br /><br`;

let blockTwOnText = ` 
<input  type="checkbox"
        id="blockCheckbox" 
        value="1" checked 
        />
<label for="blockCheckbox" class="c">Blocking twitch stream</label><br /><br`;

let blockTwOffText = ` 
<input  type="checkbox"
        id="blockCheckbox" 
        value="0" 
        />
<label for="blockCheckbox">Block twitch stream</label><br /><br`;

chrome.storage.local.get('enabled', data => {
    enabled = data.enabled;
    if(enabled === false) {
        enableButton.innerHTML = disableText;
    } else {
        enableButton.innerHTML = enableText;
    }
});

chrome.storage.local.get('blockTw', data => {
    blocking = data.blockTw;
    if(blocking === false) {
        blockTwButton.innerHTML = blockTwOffText;
    } else {
        blockTwButton.innerHTML = blockTwOnText;
    }
});

enableButton.onclick = () => {
    if(enabled === false) {
        enabled = true;
        enableButton.innerHTML = enableText;
    } else {
        enabled = false;
        enableButton.innerHTML = disableText;
    }

    chrome.storage.local.set({enabled:enabled});
    reloadPage();
};

blockTwButton.onclick = () => {
    if(blocking === false) {
        blocking = true;
        blockTwButton.innerHTML = blockTwOnText;
    } else {
        blocking = false;
        blockTwButton.innerHTML = blockTwOffText;
    }

    chrome.storage.local.set({blockTw:blocking});
    reloadPage();
};

function reloadPage() {
    chrome.runtime.sendMessage({ 
        message: "reload"
    }, response => {
        if (response.message === 'success') {
            return;
        }
    });
}