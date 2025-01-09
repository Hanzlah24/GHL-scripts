(function () {
    // Utility function to check if the route matches /automation/workflows
    function isAutomationWorkflowRoute() {
      const path = window.location.pathname;
      return path.startsWith("/v2/location/") && path.endsWith("/automation/workflows");
    }
  
    // Wait for an element to appear in the DOM
    function waitForElement(selector, callback) {
      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          callback(element);
        }
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
    }
  
  // Function to add the button dynamically
  function addButtonToTopMenu() {
    waitForElement(".topmenu-nav", (topMenuNav) => {
      // Check if a button with ID #bulk-delete already exists
      if (topMenuNav.querySelector("#bulk-delete")) {
        console.log("Button with ID #bulk-delete already exists.");
        return; // Exit if the button already exists
      }
  
      // Create a button element
      const button = document.createElement("button");
  
      // Add ID, classes, and styles to the button
      button.id = "bulk-delete";
      button.className =
        "group text-left mx-1 pb-2 md:pb-3 text-sm font-medium topmenu-navitem cursor-pointer relative px-2";
      button.style.lineHeight = "1.6rem";
  
      // Set the button's inner HTML (similar to the original `a` tag)
      button.innerHTML = `
        <span class="flex items-center">Bulk delete</span>
      `;
  
      // Add a click event listener to the button
      button.addEventListener("click", function () {
        console.log("Button clicked! Opening modal...");
        // Code to open a modal goes here
      });
  
      // Append the button to the div with class 'topmenu-nav' (beforeend)
      topMenuNav.insertAdjacentElement("beforeend", button);
    });
  }
  
  
    // Override history.pushState and history.replaceState
    function overrideHistoryMethods() {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
  
      history.pushState = function (...args) {
        const result = originalPushState.apply(this, args);
        window.dispatchEvent(new Event("routechanged"));
        return result;
      };
  
      history.replaceState = function (...args) {
        const result = originalReplaceState.apply(this, args);
        window.dispatchEvent(new Event("routechanged"));
        return result;
      };
    }
  
    // Detect route changes
    function onRouteChange() {
      if (isAutomationWorkflowRoute()) {
        addButtonToTopMenu();
      }
    }
  
    // Initialize the script
    function init() {
      overrideHistoryMethods();
  
      // Listen to popstate and custom routechanged events
      window.addEventListener("popstate", onRouteChange);
      window.addEventListener("routechanged", onRouteChange);
  
      // Initial check for the current route
      onRouteChange();
    }
  
    // Start the script
    init();
  })();