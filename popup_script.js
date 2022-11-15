
let enabled = false; //disabled by default
let enableButton = document.getElementById('enablePlug');
let blockTwButton = document.getElementById('blockTw');

let enableText = ` 
<label for="enableCheckbox" class="container g">Auto accept is on
<input  type="checkbox"
        id="enableCheckbox" 
        value="1" checked 
        />
<span class="checkmark"></span>
</label>
<svg><circle class="clock" cx="20" cy="20" r="10" /></svg>`;

let disableText = ` 
<label for="enableCheckbox" class="container">Auto accept is off
<input  type="checkbox"
        id="enableCheckbox" 
        value="0" 
        />
<span class="checkmark"></span>
</label>`;

let blockTwOnText = ` 
<label for="blockCheckbox" class="container c">Blocking twitch stream
<input  type="checkbox"
        id="blockCheckbox" 
        value="1" checked 
        />
<span class="checkmark"></span>
</label>`;

let blockTwOffText = ` 
<label for="blockCheckbox" class="container">Block twitch stream
<input  type="checkbox"
        id="blockCheckbox" 
        value="0" 
        />
<span class="checkmark"></span>
</label>`;

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