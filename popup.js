function displayTime() {
    chrome.storage.local.get(null, (items) => {
      let timeList = "";
      for (const [domain, time] of Object.entries(items)) {
        const minutes = time.toFixed(2);
        timeList += `<div>${domain}: ${minutes} minutes</div>`;
      }
      document.getElementById("timeList").innerHTML = timeList;
    });
  }
  
  document.addEventListener("DOMContentLoaded", displayTime);
  