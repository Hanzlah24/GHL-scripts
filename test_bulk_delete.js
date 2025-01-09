(() => {
  let userType = null;
  let folderMapping = {};
  let workflowsToDelete = [];
  let locationId = null;
  let workflowDetails = {};
  let parentFolderId = "";

  // Utility function to verify the company
  function verifyCompany(companyId) {
    return new Promise(async (resolve, reject) => {
      let company = await AppUtils.Utilities.getCompany();
      if (company.id == companyId) {
        resolve(company);
      } else {
        reject("Invalid Company");
      }
    });
  }

  // Utility function to get user info
  async function getUserInfo() {
    return await AppUtils.Utilities.getCurrentUser();
  }
  async function getLocationId() {
    try {
      const currentLocation = await AppUtils.Utilities.getCurrentLocation();
      if (currentLocation && currentLocation.id) {
        console.log(currentLocation);
        return currentLocation.id;
      } else {
        throw new Error("Location data is not available or invalid.");
      }
    } catch (error) {
      console.error("Error fetching location ID:", error);
      throw error; // Re-throw the error to let the calling function handle it
    }
  }
  
  // Utility function to get cookie value
  function getCookieValue(cookieName) {
    const cookieString = cookieName + "=";
    const cookiesArray = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieString) === 0) {
        return cookie.substring(cookieString.length, cookie.length);
      }
    }
    return "";
  }

  // Utility function to get token from IndexedDB
  function getTokenFromDB() {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open("firebaseLocalStorageDb");
      dbRequest.onsuccess = function (event) {
        if (event.target.readyState === "done") {
          let dbResult = event.target.result;
          const transaction = dbResult
            .transaction("firebaseLocalStorage")
            .objectStore("firebaseLocalStorage")
            .get(
              "firebase:authUser:AIzaSyB_w3vXmsI7WeQtrIOkjR6xTRVN5uOieiE:[DEFAULT]"
            );
          transaction.onsuccess = function (transactionEvent) {
            if (transactionEvent.target.readyState === "done") {
              let result = transactionEvent.target.result.value;
              let tokenData = {
                accessToken: result.stsTokenManager.accessToken,
                uid: result.uid,
                apiKey: result.apiKey,
              };
              let userData = getCookieValue("a");
              try {
                userData = JSON.parse(userData);
              } catch {
                userData = JSON.parse(atob(userData));
              }
              resolve({ token: tokenData, user: userData });
            }
          };
        }
      };
    });
  }

  // Utility function to get request headers
  function getRequestHeaders() {
    return new Promise((resolve, reject) => {
      getTokenFromDB()
        .then((dbData) => {
          try {
            const headers = {
              accept: "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              authorization: "Bearer " + dbData.user.jwt,
              channel: "APP",
              "content-type": "application/json;charset=UTF-8",
              source: "WEB_USER",
              "token-id": dbData.token.accessToken,
              version: "2021-04-15",
            };
            resolve({ headers, locationId, user: dbData.user });
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Utility function to make an API call
  function restApiCall(endpoint, method = "POST", data = "", options = {}) {
    return new Promise((resolve, reject) => {
      getRequestHeaders()
        .then((headersData) => {
          const requestConfig = {
            method,
            headers: headersData.headers,
            redirect: "follow",
          };
          if (typeof data === "object") {
            data = JSON.stringify(data);
          }
          if (data && method.toLowerCase() !== "get") {
            requestConfig.body = data;
          }
          try {
            if (options.location) {
              endpoint = `locations/${headersData.locationId}/${endpoint}`;
            }
            fetch(
              `https://services.leadconnectorhq.com/${endpoint}`,
              requestConfig
            )
              .then((response) => response.json())
              .then((result) => resolve(result))
              .catch((error) => reject(error));
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Function to fetch workflows recursively
  function fetchWorkflows(
    folderId = "root",
    folderName = "",
    totalCount = 1,
    parentFolderId = ""
  ) {
    console.log(`Fetching workflows for folder: ${folderId}`);
    restApiCall(
      `workflow/${locationId}/list?parentId=${folderId}&limit=${totalCount}&offset=0`,
      "GET"
    )
      .then((response) => {
        console.log(response)
        if (
          response.hasOwnProperty("count") &&
          response.hasOwnProperty("rows")
        ) {
          if (totalCount === 1 && response.count > 1) {
            fetchWorkflows(
              folderId,
              folderName,
              response.count,
              parentFolderId
            );
          } else {
            processWorkflows(
              response.rows,
              response.rows.length,
              0,
              folderId,
              folderName,
              parentFolderId
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching workflows:", error);
      });
  }

  // Function to process workflows
  function processWorkflows(
    workflows,
    totalCount,
    currentIndex = 0,
    parentId,
    folderName = "",
    parentFolderName = ""
  ) {
    if (currentIndex === totalCount) {
      console.log("All workflows processed:", folderMapping);
      return;
    }
    console.log(workflows);
    const workflow = workflows[currentIndex] ?? null;
    if (workflow) {
      if (workflow.type === "directory") {
        const folderKey = `${workflow.id}-${workflow.name}`;
        folderMapping[folderKey] = {
          id: workflow.id,
          name: workflow.name || "No Name",
          folder: folderName,
          parentFolder: parentFolderName,
          done: false,
        };
        fetchWorkflows(workflow.id, workflow.name, 1, folderKey);
        console.log(`Fetching workflows in folder: ${workflow.name}`);
      } else {
        workflowsToDelete.push({ ...workflow, folderName });
      }
      processWorkflows(
        workflows,
        totalCount,
        currentIndex + 1,
        parentId,
        folderName,
        parentFolderName
      );
    }
  }

  // // Initialize script
  // function initializeScript(callback) {
  //   let scriptElement = document.createElement("script");
  //   scriptElement.src = "https://scripts.jdfunnel.com/script.php?id=webworker_init404formula";
  //   scriptElement.onload = () => callback();
  //   document.head.appendChild(scriptElement);
  // }

  // Main process
  async function mainProcess() {
    try {
      console.log("Starting process...");
      if (!locationId) {
        locationId = await getLocationId(); 
      }
      fetchWorkflows("root");
      console.clear();
      console.log("returning from fetch workflow")
      console.log("all workflows:",workflowsToDelete)
    } catch (error) {
      console.error("Error in mainProcess:", error);
    }
  }
  function isAutomationWorkflowRoute() {
    const path = window.location.pathname;
    return (
      path.startsWith("/v2/location/") && path.endsWith("/automation/workflows")
    );
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
        return;
      }

      // Create a button element
      const button = document.createElement("button");

      // Add ID, classes, and styles to the button
      button.id = "bulk-delete";
      button.className =
        "group text-left mx-1 pb-2 md:pb-3 text-sm font-medium topmenu-navitem cursor-pointer relative px-2";
      button.style.lineHeight = "1.6rem";

      // Set the button's inner HTML
      button.innerHTML = `
        <span class="flex items-center">Bulk delete</span>
      `;

      // Add a click event listener to the button
      button.addEventListener("click", function () {
        console.log("Button clicked! Starting main process...");
        mainProcess();
      });

      // Append the button to the div with class 'topmenu-nav'
      topMenuNav.insertAdjacentElement("beforeend", button);
    });
  }

  window.addEventListener("routeChangeEvent", function () {
    setTimeout(() => {
      if (isAutomationWorkflowRoute()) {
        addButtonToTopMenu();
      }
    }, 1000);
  });
})();
