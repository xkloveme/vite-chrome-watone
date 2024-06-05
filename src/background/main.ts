import { onMessage, sendMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'
// @ts-ignore
import ext from '../utils/ext';
// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

let previousTabId = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(previousTabId)
    previousTabId = tabId
  }
  catch {
    return
  }

  // eslint-disable-next-line no-console
  console.log('previous tab', tab)
  sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
})

onMessage('get-current-tab', async () => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.title,
    }
  }
  catch {
    return {
      title: undefined,
    }
  }
})

console.log("===🐛=== ~ browser:", browser);

browser.webRequest.onCompleted.addListener(
  async (details) => {
      const tabId = details.tabId;
      if (tabId > -1) {
        await browser.scripting.executeScript({
          target: { tabId: tabId },
          func: fetchAndDecryptData,
          args: [details.url, details.requestId]
        });
      }
  },
  { urls: ["<all_urls>"] }
);

async function fetchAndDecryptData(url, requestId) {
  const response = await fetch(url);
  const data = await response.text();
  console.log("===🐛=== ~ fetchAndDecryptData ~ data:", data);
  const decryptedData = decryptData(data);
  await browser.storage.local.set({ [requestId]: decryptedData });
}

function decryptData(data) {
  // 解密逻辑，替换为实际的解密算法
  return atob(data);
}