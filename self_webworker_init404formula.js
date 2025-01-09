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

async function getUserInfo() {
  return await AppUtils.Utilities.getCurrentUser();
}

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

function getTokenFromDB() {
  return new Promise((resolve, reject) => {
    let tokenData = {};
    const dbRequest = indexedDB.open("firebaseLocalStorageDb");
    dbRequest.onsuccess = async function (event) {
      if (event.target.readyState === "done") {
        let dbResult = event.target.result;
        const transaction = dbResult
          .transaction("firebaseLocalStorage")
          .objectStore("firebaseLocalStorage")
          .get(
            "firebase:authUser:AIzaSyB_w3vXmsI7WeQtrIOkjR6xTRVN5uOieiE:[DEFAULT]"
          );
        transaction.onsuccess = async function (transactionEvent) {
          if (transactionEvent.target.readyState === "done") {
            tokenData.accessToken =
              transaction.result.value.stsTokenManager.accessToken;
            tokenData.uid = transaction.result.value.uid;
            tokenData.apiKey = transaction.result.value.apiKey;
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

function getRequestHeaders() {
  return new Promise(async (resolve, reject) => {
    try {
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
            resolve({ headers, locationId: getLocation(), user: dbData.user });
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

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
          if (method.toLowerCase() === "get") {
            let queryParams = "";
            if (options.company) {
              queryParams += `companyId=${headersData.user.companyId}`;
            }
            endpoint += (endpoint.includes("?") ? "&" : "?") + queryParams;
            if (data) {
              endpoint += data;
            }
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
  Date.prototype.add = function (amount, unit = "day") {
    const newDate = new Date(this.valueOf());

    if (unit === "day") {
      newDate.setDate(newDate.getDate() + amount);
    } else if (unit === "month") {
      newDate.setMonth(newDate.getMonth() + amount);
    } else if (unit === "year") {
      newDate.setFullYear(newDate.getFullYear() + amount);
    }

    return newDate;
  };
  function getLocal(key) {
    return sessionStorage.getItem(key) || "";
  }
  function setLocal(key, value) {
    return sessionStorage.setItem(key, value);
  }
  function getAllLocalStorage() {
    return Object.keys(localStorage).reduce((result, key) => {
      return {
        ...result,
        [key]: localStorage.getItem(key),
      };
    }, {});
  }
  var sessions_inc = [];
  function getUserId() {
    return getTokenUser().userId ?? null;
  }
  function getTokenUser() {
    let tokenData = getCookieValue("a"); // Retrieves the cookie value for key 'a'

    try {
      tokenData = JSON.parse(tokenData); // Tries to parse the cookie value as JSON
    } catch (error) {
      tokenData = JSON.parse(atob(tokenData)); // If JSON parse fails, decode it using Base64
    } finally {
      // No specific cleanup required here, `finally` is optional
    }

    return tokenData; // Returns the parsed token data
  }
  function appendLoginKey(dataObject) {
    dataObject.company_id = loginKeyCompany; // Adds the `company_id` property to the input object
    return dataObject; // Returns the updated object
  }
  function sendRequestAPI(
    endpoint,
    method = "POST",
    bodyData = "",
    additionalParams = []
  ) {
    // Create request headers
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    // Configure the fetch options
    let requestOptions = {
      method: method,
      headers: headers,
      body: bodyData,
      redirect: "follow",
    };

    // Handle the case where bodyData is an object
    if (typeof bodyData === "object") {
      // Append the company_id if it does not exist
      if (!bodyData.hasOwnProperty("company_id")) {
        bodyData = appendLoginKey(bodyData);
      }
      // Convert the object to a JSON string
      bodyData = JSON.stringify(bodyData);
    }

    // Update the request body if bodyData is not empty
    if (bodyData !== "") {
      requestOptions.body = bodyData;
    }

    // Return a promise for the API request
    return new Promise((resolve, reject) => {
      try {
        // Make the API request using fetch
        fetch("https://toolkit.jdfunnel.com/api/" + endpoint, requestOptions)
          .then((response) => response.json())
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      } catch (error) {
        reject(error); // Catch and reject any unexpected errors
      }
    });
  }
  function getLocation() {
    let locationId = ""; // Initialize an empty string for location ID
    try {
      // Split the URL by "location/" and extract the part after it
      const loc = location.href.split("location/");
      locationId = loc[1].split("/")[0]; // Get the first segment after "location/"
    } catch (error) {
      // If an error occurs (e.g., the URL does not contain "location/"), locationId remains an empty string
    }
    return locationId; // Return the extracted location ID or an empty string
  }
  function getLocationId() {
    return getLocation();
  }
  window.appfix = null;
  window.dbda = null;
  function loadScript(scriptUrl, callback, scriptId = '') {
    // Create a new script element
    var scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript"; // Set the script type
    scriptElement.id = scriptId; // Optionally assign an ID if provided
  
    // For older browsers: check the readyState property for script loading
    if (scriptElement.readyState) {
      scriptElement.onreadystatechange = function () {
        if (scriptElement.readyState === "loaded" || scriptElement.readyState === "complete") {
          scriptElement.onreadystatechange = null; // Clear the event handler
          callback(); // Execute the callback once the script is loaded
        }
      };
    } else {
      // Modern browsers: use the onload event
      scriptElement.onload = function () {
        callback(); // Execute the callback once the script is loaded
      };
    }
  
    // Set the script source to the provided URL
    scriptElement.src = scriptUrl;
  
    // Append the script element to the head of the document
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
  }
  function loadCSS(cssUrl, elementId = '') {
    return new Promise(function (resolve, reject) {
      // Create a new link element for the CSS file
      var linkElement = document.createElement("link");
      linkElement.rel = "stylesheet"; // Set the relationship as a stylesheet
      linkElement.href = cssUrl; // Set the href attribute to the provided CSS URL
  
      // Optionally assign an ID to the link element if provided
      if (elementId !== '') {
        linkElement.id = elementId;
      }
  
      // Append the link element to the document head
      document.head.appendChild(linkElement);
  
      // Resolve the promise when the CSS file is loaded
      linkElement.onload = function () {
        resolve();
      };
    });
  }
  window.checkJquery = function (callback, optionalCallback = null) {
    try {
      // Check if jQuery is already available
      if (typeof jQuery === "function" || typeof $ === "function" || typeof jQuery !== "undefined") {
        // If optionalCallback is a function, execute it
        if (typeof optionalCallback === "function") {
          optionalCallback();
        }
        // Execute the main callback
        callback();
      } else {
        // If jQuery is not available, load it dynamically
        try {
          loadScript("//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js", function () {
            // Once jQuery is loaded, execute the callbacks
            callback();
            if (typeof optionalCallback === "function") {
              optionalCallback();
            }
          });
        } catch (loadError) {
          console.log("Error loading jQuery:", loadError);
        }
      }
    } catch (error) {
      // In case of an unexpected error, try loading jQuery again
      try {
        loadScript("//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js", function () {
          callback();
          if (typeof optionalCallback === "function") {
            optionalCallback();
          }
        });
      } catch (finalError) {
        console.log("Error loading jQuery:", finalError);
      }
    }
  };
  async function initializeFormula404(authRequired = false) {
    return new Promise((resolve, reject) => {
      let maxAttempts = 3000; // Maximum retries
      let retryInterval = setInterval(() => {
        let appElement = document.querySelector('#app');
  
        // Check if Vue.js instance with database ($db) exists
        if (appElement?.__vue__?.$db) {
          clearInterval(retryInterval);
          resolve(appElement.__vue__.$db);
        }
  
        // Check if the global `dbda` variable exists
        if (window.dbda) {
          clearInterval(retryInterval);
          resolve(window.dbda);
        }
  
        // Initialize the database if required
        if (appElement?.__vue__?.$auth?.app?.firebase || appElement?.__vue__?.$db) {
          if (!appElement.__vue__.$db) {
            appElement.__vue__.$db = appElement.__vue__.$auth.app.firebase.firestore();
          }
          window.dbda = appElement.__vue__.$db;
          clearInterval(retryInterval);
          resolve(appElement.__vue__.$db);
        }
  
        // If maximum retries are reached, attempt to load Firebase script
        if (maxAttempts === 0) {
          clearInterval(retryInterval);
  
          // Return the database if already available
          if (window.dbda) resolve(window.dbda);
          if (appElement?.__vue__?.$db) resolve(appElement.__vue__.$db);
  
          // Reject if not found
          reject("Database not found");
  
          // Load Firebase script
          let firebaseScript = document.createElement("script");
          firebaseScript.id = "init_formula_404";
          firebaseScript.src = "https://www.gstatic.com/firebasejs/5.0.1/firebase.js";
          firebaseScript.onload = () => {
            console.log("Firebase script loaded successfully");
          };
          if (!document.querySelector(`#${firebaseScript.id}`)) {
            document.head.append(firebaseScript);
          }
  
          // Attempt initialization after loading Firebase
          let firebaseRetry = setInterval(async () => {
            try {
              if (!window.appfix) {
                window.appfix = firebase.initializeApp(
                  JSON.parse(
                    atob(
                      "eyJhcGlLZXkiOiJBSXphU3lCX3czdlhtc0k3V2VRdHJJT2tqUjZ4VFJWTjV1T2llaUUiLCJhdXRoRG9tYWluIjoiaGlnaGxldmVsLWJhY2tlbmQuZmlyZWJhc2VhcHAuY29tIiwiZGF0YWJhc2VVUkwiOiJodHRwczovL2hpZ2hsZXZlbC1iYWNrZW5kLmZpcmViYXNlaW8uY29tIiwicHJvamVjdElkIjoiaGlnaGxldmVsLWJhY2tlbmQiLCJzdG9yYWdlQnVja2V0IjoiaGlnaGxldmVsLWJhY2tlbmQuYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjQzOTQ3MjQ0NDg4NSIsImNkblVybCI6Imh0dHBzOi8vY2RuLm1zZ3NuZHIuY29tIn0="
                    )
                  )
                );
              }
              if (!window.dbda) {
                window.dbda = firebase.firestore(window.appfix);
              }
  
              // Resolve once database is ready
              if (window.dbda?.collection) {
                if (authRequired && firebase.auth().currentUser) {
                  clearInterval(firebaseRetry);
                  resolve(firebase.auth().currentUser);
                } else {
                  clearInterval(firebaseRetry);
                  resolve(window.dbda);
                }
              }
            } catch (error) {
              console.error("Error initializing Firebase:", error);
            }
          }, 500); // Retry every 500ms
        }
        maxAttempts--;
      }, 500); // Retry every 500ms
    });
  }
  async function restApiCallV2(endpoint, method = "POST", body = '', options = {}, tokenKey = '') {
    const userToken = getTokenUser();
  
    return new Promise(async (resolve, reject) => {
      // Define headers
      let headers = {
        'channel': "APP",
        'version': "2021-07-28",
        'source': "WEB_USER",
        'token-id': await window.getToken()
      };
  
      // Configure the fetch request
      let fetchOptions = {
        method: method,
        headers: headers,
        redirect: "follow"
      };
  
      // Serialize body if it's an object
      if (typeof body === "object") {
        body = JSON.stringify(body);
      }
  
      // Attach body if applicable
      if (body !== '' && method.toLowerCase() !== "get") {
        fetchOptions.body = body;
      }
  
      try {
        // Add location ID to the endpoint if specified in options
        if (options.hasOwnProperty("location")) {
          endpoint = `locations/${getLocation()}/${endpoint}`;
        }
  
        // Handle GET request query parameters
        if (method.toLowerCase() === "get") {
          let queryParams = '';
          if (options.hasOwnProperty("company")) {
            queryParams += `companyId=${userToken.companyId}`;
          }
          if (queryParams !== '' || body !== '') {
            endpoint += (endpoint.includes('?') ? '&' : '?') + queryParams;
          }
          if (body !== '') {
            endpoint += body;
          }
        }
  
        // Perform the fetch request
        fetch(`https://services.leadconnectorhq.com/${endpoint}`, fetchOptions)
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(error => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
  async function restApiCallMembership(endpoint, method = 'POST', body = '', options = {}, tokenKey = '') {
    const userToken = getTokenUser();
  
    return new Promise(async (resolve, reject) => {
      // Define request headers
      let headers = {
        'channel': 'APP',
        'version': '2021-07-28',
        'source': 'WEB_USER',
        'Authorization': `Bearer ${await window.getToken()}`
      };
  
      // Configure the fetch request
      let fetchOptions = {
        method: method,
        headers: headers,
        redirect: 'follow'
      };
  
      // Serialize body if it's an object
      if (typeof body === 'object') {
        body = JSON.stringify(body);
      }
  
      // Attach body if applicable
      if (body !== '' && method.toLowerCase() !== 'get') {
        fetchOptions.body = body;
      }
  
      try {
        // Add location ID to the endpoint if specified in options
        if (options.hasOwnProperty('location')) {
          endpoint = `locations/${getLocation()}/${endpoint}`;
        }
  
        // Handle GET request query parameters
        if (method.toLowerCase() === 'get') {
          let queryParams = '';
          if (options.hasOwnProperty('company')) {
            queryParams += `companyId=${userToken.companyId}`;
          }
          if (queryParams !== '' || body !== '') {
            endpoint += (endpoint.includes('?') ? '&' : '?') + queryParams;
          }
          if (body !== '') {
            endpoint += body;
          }
        }
  
        // Perform the fetch request
        fetch(`https://services.leadconnectorhq.com/${endpoint}`, fetchOptions)
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(error => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
  function restApiCall_(endpoint, method = "POST", body = '', options = {}, additionalHeaders = '') {
    return new Promise((resolve, reject) => {
      // Fetch the request headers
      getRequestHeaders(additionalHeaders).then(headersData => {
        let requestConfig = {
          method: method,
          headers: headersData.headers,
          redirect: "follow"
        };
  
        // Serialize the body if it's an object
        if (typeof body === "object") {
          body = JSON.stringify(body);
        }
  
        // Attach the body if it exists and the method is not GET
        if (body !== '' && method.toLowerCase() !== "get") {
          requestConfig.body = body;
        }
  
        try {
          // Add location to the endpoint if specified in options
          if (options.hasOwnProperty("location")) {
            endpoint = `locations/${headersData.locationid}/${endpoint}`;
          }
  
          // Append query parameters for GET requests
          if (method.toLowerCase() === "get") {
            let queryParams = '';
            if (options.hasOwnProperty("company")) {
              queryParams += `companyId=${headersData.user.companyId}`;
            }
            if (queryParams !== '' || body !== '') {
              endpoint += (endpoint.includes('?') ? '&' : '?') + queryParams;
            }
            if (body !== '') {
              endpoint += body;
            }
          }
  
          // Perform the fetch request
          fetch(`https://services.leadconnectorhq.com/${endpoint}`, requestConfig)
            .then(response => response.json())
            .then(data => {
              if (data === "Unauthorized") {
                reject(data);
              } else {
                resolve(data);
              }
            })
            .catch(error => reject(error));
        } catch (error) {
          reject(error);
        }
      }).catch(() => {
        // Handle errors in fetching headers
      });
    });
  }
  function waitElement(selector) {
    return new Promise((resolve, reject) => {
      // Check if the element already exists
      let existingElement = document.querySelector(selector);
      if (existingElement) {
        resolve(existingElement);
        return;
      }
  
      // Set up a MutationObserver to watch for the element
      const observer = new MutationObserver((mutations, observerInstance) => {
        // Check for the desired element in the DOM
        const targetElements = [...document.querySelectorAll(selector)];
        targetElements.forEach(element => {
          resolve(element);
          observerInstance.disconnect(); // Stop observing once the element is found
        });
      });
  
      // Start observing the #app element for changes
      const appElement = document.querySelector("#app");
      if (appElement) {
        observer.observe(appElement, {
          childList: true, // Watch for added/removed child elements
          subtree: true    // Watch all descendants
        });
      } else {
        reject("The #app element is not found in the document.");
      }
    });
  }
  function waitElementVue(selector) {
    return new Promise((resolve, reject) => {
      // Check if the element already exists and has Vue instance
      let existingElement = document.querySelector(selector);
      if (existingElement && existingElement.__vue__) {
        resolve(existingElement);
        return;
      }
  
      // Set up a MutationObserver to watch for the element with a Vue instance
      const observer = new MutationObserver((mutations, observerInstance) => {
        const targetElements = [...document.querySelectorAll(selector)];
        targetElements.forEach(element => {
          if (element.__vue__) { // Check if the element has a Vue instance
            resolve(element);
            observerInstance.disconnect(); // Stop observing once the element is found
          }
        });
      });
  
      // Start observing the #app element for changes
      const appElement = document.querySelector("#app");
      if (appElement) {
        observer.observe(appElement, {
          childList: true, // Watch for added/removed child elements
          subtree: true    // Watch all descendants
        });
      } else {
        reject("The #app element is not found in the document.");
      }
    });
  }
  function redirectRoute(target, targetType = "name", params = {}) {
    try {
      // Get the Vue application instance
      let appElement = document.querySelector("#app");
      let routeObject = {
        [targetType]: target
      };
  
      // If routing by "name" and additional parameters exist, include them
      try {
        if (targetType === "name" && Object.keys(params).length > 0) {
          routeObject.params = params;
        }
      } catch (error) {
        console.error("Error processing route parameters:", error);
      }
  
      // Use Vue Router to navigate
      appElement.__vue__.$router.push(routeObject);
    } catch (error) {
      console.error("Error in Vue routing:", error);
  
      // Fallback to direct navigation if Vue Router is unavailable
      if (targetType === "path") {
        location.href = target;
      }
    }
  }
  
}
