chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const wm_text = 'https://www.workmarket.com';


chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(wm_text)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Execute JS file to check the WM ratings when the user turns the extension on, then inject CSS to hide the profile's we've flagged with a class.
      await chrome.scripting.executeScript({
      target : {tabId : tab.id},
      files : [ "getprofile_scores.js" ]});
      await chrome.scripting.insertCSS({
        files: ["hide-bad-wm.css"],
        target: { tabId: tab.id },
      });

    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["hide-bad-wm.css"],
        target: { tabId: tab.id },
      });
    }
	
  }
});