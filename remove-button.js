(function () {
  function getLocation() {
    let locationId = "";
    try {
      const loc = location.href.split("location/");
      locationId = loc[1]?.split("/")[0] || "";
    } catch (error) {}
    return locationId;
  }

  function waitForNavAndProcess(buttonTitles, excludedLocations) {
    const observer = new MutationObserver(() => {
      const nav = document.querySelector("nav");
      if (nav) {
        observer.disconnect();
        processNav(nav, buttonTitles, excludedLocations);
        attachClickListeners(nav, buttonTitles, excludedLocations);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function processNav(nav, buttonTitles, excludedLocations) {
    if (excludedLocations.includes(getLocation())) {
      console.log("Current location is excluded. Skipping script execution.");
      return;
    }

    const aTags = nav.querySelectorAll("a");
    aTags.forEach((aTag) => {
      const span = aTag.querySelector("span");
      if (span) {
        const buttonTitle = span.innerHTML.trim().toLowerCase();
        if (buttonTitles.includes(buttonTitle)) {
          const elementId = aTag.id;
          const href = aTag.href;

          // Remove the element by ID
          const element = document.getElementById(elementId);
          if (element) {
            element.remove();
            console.log(`Removed element with ID: ${elementId}`);
          }

          // Redirect based on href
          const currentUrl = window.location.href;
          if (currentUrl.includes(href)) {
            const newUrl = href.replace(href, "/dashboard");
            console.log(`Redirecting to: ${newUrl}`);
            window.location.replace(newUrl);
          }
        }
      }
    });
  }

  function attachClickListeners(nav, buttonTitles, excludedLocations) {
    nav.addEventListener("click", (event) => {
      const target = event.target.closest("a, button");

      if (target) {
        processNav(nav, buttonTitles, excludedLocations);
      }
    });
  }

  // Get button titles and excluded locations from script attributes
  const scriptTag =
    document.currentScript || document.querySelector("script[data-buttons]");
  if (scriptTag) {
    const buttonTitles = (scriptTag.getAttribute("data-buttons") || "")
      .split(",")
      .map((title) => title.trim().toLowerCase());
    const excludedLocations = (scriptTag.getAttribute("data-locations") || "")
      .split(",")
      .map((loc) => loc.trim());

    waitForNavAndProcess(buttonTitles, excludedLocations);
  }

  // Initial execution
  window.dispatchEvent(new Event("routeChangeEvent"));
})();
