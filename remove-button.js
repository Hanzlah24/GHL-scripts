(function () {
    // Define a mapping object for button titles
    const buttonMappings = {
      launchpad: {
        id: "sb_launchpad", 
        keyword: "/launchpad",
      },
      dashboard: {
        id: "sb_dashboard",
        keyword: "/dashboard",
      },
      coversations: {
        id: "sb_conversations",
        keyword: "/conversations",
      },
      calendars: {
        id: "sb_calendars",
        keyword: "/contacts",
      },
      marketplace: {
        id: "sb_app-marketplace",
        keyword: "/integration",
      },
      // Add more mappings as needed
    };
  
    // Function to get the current location ID from the URL
    function getLocation() {
      let locationId = "";
      try {
        const loc = location.href.split("location/");
        locationId = loc[1].split("/")[0];
      } catch (error) {}
      return locationId;
    }
  
    // Function to remove elements based on IDs from the mapping
    function removeElementsByTitles(titles) {
      titles.forEach((title) => {
        const lowerTitle = title.trim().toLowerCase();
        if (buttonMappings[lowerTitle]) {
          const { id } = buttonMappings[lowerTitle];
          const element = document.getElementById(id);
          if (element) {
            element.remove();
            console.log(`Removed element with ID: ${id}`);
          }
        } else {
          console.warn(`No mapping found for button title: ${title}`);
        }
      });
    }
  
    // Function to redirect based on keywords from the mapping
    function checkAndRedirect(titles) {
      const currentUrl = window.location.href;
      titles.forEach((title) => {
        const lowerTitle = title.trim().toLowerCase();
        if (buttonMappings[lowerTitle]) {
          const { keyword } = buttonMappings[lowerTitle];
          if (currentUrl.includes(keyword)) {
            const newUrl = currentUrl.replace(keyword, "/dashboard");
            console.log(`Redirecting to: ${newUrl}`);
            window.location.replace(newUrl);
          }
        }
      });
    }
  
    // Listen for route change events
    window.addEventListener("routeChangeEvent", () => {
      console.log("Route change detected.");
  
      // Get script tag attributes
      const scriptTag =
        document.currentScript || document.querySelector("script[data-buttons][data-locations]");
      if (scriptTag) {
        const buttonTitles = scriptTag.getAttribute("data-buttons") || "";
        const locationIds = scriptTag.getAttribute("data-locations") || "";
  
        // Parse location IDs and check if the current location is excluded
        const excludedLocations = locationIds.split(",").map((id) => id.trim());
        const currentLocation = getLocation();
  
        if (excludedLocations.includes(currentLocation)) {
          console.log(`Current location (${currentLocation}) is excluded. Script will not run.`);
          return;
        }
  
        // Proceed with removing elements and checking redirection
        if (buttonTitles) {
          const titles = buttonTitles.split(",");
          removeElementsByTitles(titles);
          checkAndRedirect(titles);
        }
      }
    });
  
    // Initial execution for the current route
    window.dispatchEvent(new Event("routeChangeEvent"));
  })();
  