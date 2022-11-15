let successRm = false;

chrome.storage.local.get('enabled', data => {
    enabled = data.enabled;
    if(enabled) {
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
    }
});


chrome.storage.local.get('blockTw', data => {
    blocking = data.blockTw;
    if (blocking) {

        function getStream() {
            streamElement = document.querySelector(".sc-jbwHOj");
            iframe = document.getElementById("rufous-sandbox");
            if(streamElement !== null || iframe !== null) {
                streamElement.style.display = "none";
                iframe.style.display = "none";
                successRm = true;
            }
        }

            let streamRefresh = setInterval(function() {
                getStream();
                if(successRm) {
                    clearInterval(streamRefresh);
                }
            }, 1000);
        

    }
});