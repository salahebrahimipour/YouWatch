// Keep track of processed URLs
let processedUrls = new Set();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only proceed if tab is complete and it's a YouTube watch page
    if (changeInfo.status === "complete" &&
        tab.url?.includes("youtube.com/watch") &&
        !tab.url.includes("=1") &&
        !processedUrls.has(tab.url)) {

        // Add the URL to processed set
        processedUrls.add(tab.url);

        // Wait for 1 second before modifying URL
        setTimeout(() => {
            // Create new URL with =1 parameter
            const newUrl = tab.url + (tab.url.includes("?") ? "&=1" : "?=1");

            // Update tab URL
            chrome.tabs.update(tabId, { url: newUrl });
        }, 100); // 1000 milliseconds = 0.1 second
    }
});