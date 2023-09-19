// function displayTime() {
//     chrome.storage.local.get(null, (items) => {
//       let timeList = "";
//       for (const [domain, time] of Object.entries(items)) {
//         const minutes = time.toFixed(2);
//         timeList += `<div>${domain}: ${minutes} minutes</div>`;
//       }
//       document.getElementById("timeList").innerHTML = timeList;
//     });
//   }
  
//   document.addEventListener("DOMContentLoaded", displayTime);
  
function displayTime() {
    chrome.storage.local.get(null, (items) => {
      // Convert the object to an array of [domain, time] pairs and sort it
      const sortedItems = Object.entries(items)
        .filter(([key]) => key !== 'lastDate')  // Exclude the 'lastDate' key
        .sort(([, time1], [, time2]) => time2 - time1);  // Sort by time in descending order
  
      // Create the sorted list of time spent on each domain
      let timeList = "";
      for (const [domain, time] of sortedItems) {
        const minutes = Math.floor(time);
        const seconds = Math.floor((time - minutes) * 60);
        timeList += `<div class="timeItem">${domain}: ${minutes} minutes, ${seconds} seconds</div>`;
      }
  
      // Update the DOM
      document.getElementById("timeList").innerHTML = timeList;
    });
  }
  
  document.addEventListener("DOMContentLoaded", displayTime);
  