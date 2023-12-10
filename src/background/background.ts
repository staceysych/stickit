import { Messages } from "../utils/messages";

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  if (tab.id) {
    await chrome.tabs.sendMessage(
      tab.id,
      {
        type: Messages.NEW_PAGE,
        data: {
          url: tab.url,
        },
      },
      () => chrome.runtime.lastError
    );
  }
});
