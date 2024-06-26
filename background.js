chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
  
  // Set default settings if not already set
  chrome.storage.sync.get(['b_nojobs', 'b_nojobscompany', 'b_abandoncompany', 'b_abandonany'], (result) => {
    if (result.b_nojobs === undefined || result.b_nojobscompany === undefined || result.b_abandoncompany === undefined || result.b_abandonany === undefined) {
      chrome.storage.sync.set({
        b_nojobs: false,
        b_nojobscompany: false,
        b_abandoncompany: false,
        b_abandonany: false,
      });
    } else {
      console.log('settings were found...');
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "get_setting") {
    chrome.storage.sync.get([request.key], (result) => {
      sendResponse({ value: result[request.key] });
    });
    return true;  // Will respond asynchronously
  }
});

const wm_text = 'https://www.workmarket.com';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(wm_text)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Execute JS file to check the WM ratings when the user turns the extension on, then inject CSS to hide the profiles we've flagged with a class.
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["getprofile_scores.js"]
      });
      await chrome.scripting.insertCSS({
        files: ["hide-bad-wm.css"],
        target: { tabId: tab.id },
      });

    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off, and remove the css classes we added.
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["reset-classes.js"]
      });
      await chrome.scripting.removeCSS({
        files: ["hide-bad-wm.css"],
        target: { tabId: tab.id },
      });
    }
  }
});
