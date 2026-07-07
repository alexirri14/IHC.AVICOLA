// Vercel Speed Insights initialization for vanilla JS
// This initializes the Speed Insights queue and loads the tracking script

(function() {
  'use strict';
  
  // Initialize the Speed Insights queue
  // This creates the global 'si' function that queues events until the main script loads
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }
  
  // Load the Speed Insights script from Vercel's CDN
  // The script will automatically detect the deployment environment and project
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  
  // Insert the script into the document head
  var firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
})();
