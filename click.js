let successRm = false;

chrome.storage.local.get('enabled', data => {
    enabled = data.enabled;
    if(enabled && typeof init === 'undefined') {
        console.log("Script enable waiting for match!");  
       
                function getButtonPath (path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                
                function update() {
                        let acceptbtn = '//*[@id="root"]/div[3]/div[2]/div/div[3]/button[2]';
                        if (getButtonPath(acceptbtn) == null) {
                        } else {
                            getButtonPath(acceptbtn).click();
                        }
                }
                setInterval(function() {
                        update();
                }, 5000);
    } else {
        console.log("Script disabled returning...");
    }
});


chrome.storage.local.get('blockTw', data => {
    blocking = data.blockTw;
    if (blocking) {
        console.log("Blocking Twitch stream!");

        function getTwitchPath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }

        function removeTwitchStream () {
            let twitchStream = '/html/body / div[3]';
            if (getTwitchPath(twitchStream) == null) {
            } else {
                // console.log(twitchStream);
                getTwitchPath(twitchStream).innerHTML = ``;
                successRm = true;
            }
        }

        if(!successRm) {
            setInterval(function() {
                removeTwitchStream();
            }, 3000);
        }

     } else {
        console.log("Not blocking twitch stream...");
    }
});