/* eslint-disable no-undef */
// chrome.tabs.onActivated.addListener(async (info) => {
//     const tab = await chrome.tabs.get(info.tabId)

//     await chrome.tabs.sendMessage(tab.id, {
//         type: 'NEW_PAGE',
//         url: tab.url
//     }, () => {
//         return
//     })
// })

chrome.tabs.onUpdated.addListener(async (tabId) => {
    const tab = await chrome.tabs.get(tabId)

    await chrome.tabs.sendMessage(tab.id, {
        type: 'NEW_PAGE',
        url: tab.url
    }, () => chrome.runtime.lastError)
})