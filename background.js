// let currentDomain = null;
// let startTime = null;

// function getDomain(url) {
//   try {
//     const urlObj = new URL(url);
//     return urlObj.hostname;
//   } catch (e) {
//     return null;
//   }
// }

// function getMainPartOfDomain(domain) {
//   const parts = domain.split(".");
//   if (parts.length >= 2) {
//     return parts[parts.length - 2];
//   }
//   return domain;
// }

// function updateTimeSpent(domain, timeSpentMinutes) {
//   chrome.storage.local.get([domain], (result) => {
//     const totalTime = (result[domain] || 0) + timeSpentMinutes;
//     chrome.storage.local.set({ [domain]: totalTime });
//   });
// }

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete" && tab.active) {
//     const newDomain = getMainPartOfDomain(getDomain(tab.url));
//     if (currentDomain && currentDomain !== newDomain) {
//       const endTime = new Date().getTime();
//       const timeSpentMilliseconds = endTime - startTime;
//       const timeSpentMinutes = timeSpentMilliseconds / 60000;
//       updateTimeSpent(currentDomain, timeSpentMinutes);
//     }

//     if (newDomain) {
//       currentDomain = newDomain;
//       startTime = new Date().getTime();
//     }
//   }
// });

// chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
//   if (currentDomain) {
//     const endTime = new Date().getTime();
//     const timeSpentMilliseconds = endTime - startTime;
//     const timeSpentMinutes = timeSpentMilliseconds / 60000;
//     updateTimeSpent(currentDomain, timeSpentMinutes);
//   }
// });
let currentDomain = null;
let startTime = null;
let currentDate = new Date().toDateString();  // Store the current date as a string

function getDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return null;
  }
}

function getMainPartOfDomain(domain) {
  const parts = domain.split(".");
  if (parts.length >= 2) {
    return parts[parts.length - 2];
  }
  return domain;
}

function updateTimeSpent(domain, timeSpentMinutes) {
  chrome.storage.local.get([domain], (result) => {
    const totalTime = (result[domain] || 0) + timeSpentMinutes;
    chrome.storage.local.set({ [domain]: totalTime });
  });
}

function checkAndResetData() {
  const newDate = new Date().toDateString();
  if (newDate !== currentDate) {
    chrome.storage.local.clear();  // Clear all stored data
    currentDate = newDate;  // Update the current date
  }
}

// Check for a new day every 1 hour
setInterval(checkAndResetData, 3600000);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    const newDomain = getMainPartOfDomain(getDomain(tab.url));
    if (currentDomain && currentDomain !== newDomain) {
      const endTime = new Date().getTime();
      const timeSpentMilliseconds = endTime - startTime;
      const timeSpentMinutes = timeSpentMilliseconds / 60000;
      updateTimeSpent(currentDomain, timeSpentMinutes);
    }

    if (newDomain) {
      currentDomain = newDomain;
      startTime = new Date().getTime();
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (currentDomain) {
    const endTime = new Date().getTime();
    const timeSpentMilliseconds = endTime - startTime;
    const timeSpentMinutes = timeSpentMilliseconds / 60000;
    updateTimeSpent(currentDomain, timeSpentMinutes);
  }
});
