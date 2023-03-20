chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == "new-tab") {
    chrome.tabs.create({ url: "applet.html#iframe" });
  }
});

export {};
