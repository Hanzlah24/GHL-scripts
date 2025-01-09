(() => {
    let userType = null;
    let folderMapping = {};
    let workflowsToDelete = [];
    let locationId = "";
    let workflowDetails = {};
    let parentFolderId = "";
  
    // Event listener for route changes
    window.addEventListener("routeChangeEvent", function () {
      setTimeout(() => {
        initializeScript(mainProcess);
      }, 1000);
    });
  
    // Function to delete a workflow by its ID
    function deleteWorkflow(workflowId) {
      return new Promise((resolve, reject) => {
        rest_api_call(
          `workflow/${locationId}/${workflowId}?userId=${getUserId()}`,
          "DELETE",
          {},
          { json: true }
        )
          .then(resolve)
          .catch((error) => {
            displayError(error);
            reject(error);
          });
      });
    }
  
    // Function to delete a directory by its ID
    function deleteDirectory(directoryId) {
      return new Promise((resolve, reject) => {
        rest_api_call(
          `workflow/${locationId}/remove-directory/${directoryId}`,
          "DELETE",
          {},
          { json: true }
        )
          .then(resolve)
          .catch((error) => {
            displayError(error);
            reject(error);
          });
      });
    }
  
    // Function to recursively fetch workflows
    function fetchWorkflows(
      folderId = "root",
      folderName = "",
      totalCount = 1,
      parentFolderId = ""
    ) {
      console.log(`Fetching workflows for folder: ${folderId}`);
      rest_api_call(
        `workflow/${getLocationId()}/list?parentId=${folderId}&limit=${totalCount}&offset=0`,
        "get"
      )
        .then((response) => {
          if (response.hasOwnProperty("count") && response.hasOwnProperty("rows")) {
            if (totalCount === 1 && response.count > 1) {
              fetchWorkflows(folderId, folderName, response.count, parentFolderId);
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
          displayError(error);
          reject(error);
        });
    }
  
    // Reset the UI and internal state
    function resetUI() {
      $(".startdelete_wf").removeAttr("disabled").html("Click here to delete");
      updateWorkflowTable(parentFolderId);
      folderMapping = {};
      workflowsToDelete = [];
      workflowDetails = {};
    }
  
    // Process workflows recursively
    function processWorkflows(
      workflows,
      totalCount,
      currentIndex = 0,
      parentId,
      folderName = "",
      parentFolderName = ""
    ) {
      if (currentIndex === totalCount) {
        console.log("All workflows processed", folderMapping);
        handleWorkflowDeletion(0, workflowsToDelete.length);
        return;
      }
  
      let workflow = workflows[currentIndex] ?? null;
      if (workflow) {
        if (workflow.type === "directory") {
          let folderKey = `${workflow.id}-${workflow.name}`;
          folderMapping[folderKey] = {
            id: workflow.id,
            name: workflow.name || workflow.title || "No Name",
            folder: folderName,
            parentFolder: parentFolderName,
            done: false,
          };
          fetchWorkflows(workflow.id, workflow.name, 1, folderKey);
          logMessage(`Fetching workflows in folder: ${workflow.name}`);
          processWorkflows(
            workflows,
            totalCount,
            currentIndex + 1,
            parentId,
            folderName,
            parentFolderName
          );
        } else {
          workflowsToDelete.push({
            ...workflow,
            folderName: folderName,
          });
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
    }
  
    // Display an error message
    function displayError(message = "") {
      console.log(message);
      $(".startdelete_wf").removeAttr("disabled").html("Click here to delete");
      $(".console_data_delete").html(
        '<tr><td colspan="3"><p class="error p-2">Unable to delete workflow</p> </td></tr>'
      );
    }
  
    // Log a message to the console and UI
    function logMessage(message) {
      if (message) {
        $(".console_data_delete").append(`<li>${message}</li>`);
      }
    }
  
    // Main script initialization
    function initializeScript(callback) {
      let scriptElement = document.createElement("script");
      scriptElement.id = "scriptLoader";
      scriptElement.src = "https://gist.github.com/Hanzlah17/e125ab7bfd78fd59dd51b8c8254a8e9a.js";
      scriptElement.onload = async function () {
        callback();
      };
      if (typeof init_formula_404 === "undefined") {
        document.head.append(scriptElement);
      } else {
        callback();
      }
    }
    function resetWorkflowDeletionProcess() {
      // Enable the delete button and reset its label
      $(".startdelete_wf").removeAttr("disabled").html("Click here to delete");
    
      // Refresh the workflow list for the current folder
      fetchWorkflowsInFolder(currentFolderId);
    
      // Reset all related data structures
      folderMapping = {};
      workflowsToDelete = [];
      workflowDetails = {};
    }
    function deleteEmptyFoldersRecursively(folderList, currentIndex, totalFolders) {
      // Base case: All folders processed
      if (currentIndex === totalFolders) {
        resetWorkflowDeletionProcess(); // Reset the process once all folders are processed
        return;
      }
    
      // Get the current folder or directory
      let currentFolder = folderList[currentIndex] ?? null;
    
      // If folder exists, attempt to delete it
      if (currentFolder) {
        deleteDirectory(currentFolder.id)
          .then(() => {
            // Recursively process the next folder on successful deletion
            deleteEmptyFoldersRecursively(folderList, currentIndex + 1, totalFolders);
          })
          .catch(() => {
            // Proceed to the next folder even if the current deletion fails
            deleteEmptyFoldersRecursively(folderList, currentIndex + 1, totalFolders);
          });
      }
    }
    function deleteWorkflowsRecursively(currentIndex = 0, totalWorkflows = 0) {
      // Base case: All workflows processed
      if (currentIndex === totalWorkflows) {
        let folderList = Object.values(folderMapping);
        if (folderList.length === 0) {
          resetWorkflowDeletionProcess();
        } else {
          logMessage("Deleting empty folders");
          deleteEmptyFoldersRecursively(folderList, 0, folderList.length);
        }
        return;
      }
    
      // Log the start of the process
      if (currentIndex === 0) {
        logMessage("Flows deletion process started...");
      }
    
      // Process the current workflow
      let currentWorkflow = workflowsToDelete[currentIndex] ?? null;
      if (currentWorkflow) {
        deleteWorkflow(currentWorkflow.id)
          .then((response) => {
            let errorMessage = `Error while deleting ${currentWorkflow.name}`;
            let folderDetails = "";
            let successMessage = "";
            let folderName = currentWorkflow.foldername ?? "";
    
            if (folderName !== "") {
              folderDetails += ` inside folder - ${folderName}`;
            }
    
            errorMessage += folderDetails;
    
            if (response.hasOwnProperty("success") && response.success) {
              successMessage = `${currentWorkflow.name} deleted - ${folderDetails}`;
            } else {
              if (response.hasOwnProperty("message")) {
                errorMessage += ` - ${response.message}`;
              }
              successMessage = errorMessage;
            }
    
            logMessage(successMessage);
            deleteWorkflowsRecursively(currentIndex + 1, totalWorkflows);
          })
          .catch((error) => {
            logMessage(`Error while deleting workflow - Error: ${error}`);
            deleteWorkflowsRecursively(currentIndex + 1, totalWorkflows);
          });
      }
    
      console.log(workflowsToDelete, folderMapping);
    }
    function logMessage(message) {
      if (message !== "") {
        $(".console_data_delete").append(`<li>${message}</li>`);
      }
    }
    function fetchWorkflowsInFolder(folderId = "root", limit = 1) {
      $(".workflows_tbody_delete").html("<tr><td colspan=\"3\">Fetching....</td></tr>");
    
      restApiCall(
        `workflow/${getLocationId()}/list?parentId=${folderId}&limit=${limit}&offset=0`,
        "get"
      )
        .then((response) => {
          if (response.hasOwnProperty("count") && response.hasOwnProperty("rows")) {
            if (limit === 1 && response.count > 1) {
              // Re-fetch with the total count if more rows are available
              fetchWorkflowsInFolder(folderId, response.count);
            } else {
              if (response.rows.length === 0) {
                $(".workflows_tbody_delete").html("<tr><td colspan=\"3\">Empty</td></tr>");
              } else {
                $(".workflows_tbody_delete").html("");
                response.rows.forEach((workflow) => {
                  workflowDetails[workflow.id] = workflow; // Store workflow details
                  renderWorkflowRow(workflow); // Render the workflow row in the UI
                });
              }
            }
          } else {
            $(".workflows_tbody_delete").html("<tr><td colspan=\"3\">Unable to fetch workflows</td></tr>");
          }
        })
        .catch((error) => {
          handleFetchError(error); // Log or handle the error
        });
    }
    function initializeWorkflowDeletion(callback) {
      const workflowDeleteElement = document.querySelector("#hts_bulk_delete_workflow");
    
      if (workflowDeleteElement) {
        userType = workflowDeleteElement.getAttribute("user_type");
        let userEmail = workflowDeleteElement.getAttribute("user_email") || "";
    
        try {
          if (
            userEmail !== "" &&
            typeof user_wf_delete_allowed !== "undefined" &&
            Array.isArray(user_wf_delete_allowed) &&
            user_wf_delete_allowed.some((allowedEmail) => allowedEmail === userEmail)
          ) {
            userType = "agency";
          }
        } catch (error) {
          console.error("Error while verifying user permissions:", error);
        }
      } else {
        console.log("Unable to retrieve user_type.");
      }
    
      // Remove existing script if necessary
      try {
        document.querySelector(".workflow_script_sm_delete")?.remove();
      } catch (error) {
        console.error("Error while removing existing script:", error);
      }
    
      // Check if the current URL includes "workflow"
      if (!location.href.includes("workflow")) {
        return;
      }
    
      // Wait for the top menu to be ready and initialize
      waitElement(".topmenu-nav").then(() => {
        $(".startdelete_wf").removeAttr("disabled").html("Click here to delete");
        console.log("Running workflow deletion setup");
    
        // Close modal on user interaction
        $("body").off("click", ".modal.workflow .close");
        $("body").on("click", ".modal.workflow .close", function () {
          closeModal();
        });
    
        $("body").off("click", ".modal.workflow .cwfel");
        $("body").on("click", ".modal.workflow .cwfel", function () {
          closeModal();
        });
    
        // Inject modal styling if not already present
        if (document.querySelectorAll("#modalfix").length === 0) {
          $("head").append(`
            <style id="modalfix">
              .modal {
                background: rgba(0, 0, 0, .7);
              }
            </style>
          `);
        }
    
        // Add the bulk delete button if it doesn't exist
        if (
          location.href.includes("location") &&
          document.querySelectorAll(".workflow_script_sm_delete").length === 0
        ) {
          document.querySelector(".topmenu-nav").insertAdjacentHTML(
            "beforeend",
            `
            <style>
              a.group.workflow_script_sm_delete.skiptranslate {
                display: block!important;
              }
            </style>
            <a class="group workflow_script_sm_delete skiptranslate text-left mx-1 pb-2 md:pb-3 text-sm font-medium 
              topmenu-navitem cursor-pointer relative px-2" style="display:block!important;line-height: 1.6rem;">
              <span class="flex items-center">Bulk Delete</span>
            </a>
            `
          );
    
          setTimeout(() => {
            document.querySelector(".workflow_script_sm_delete").onclick = startWorkflowDeletion;
          }, 800);
        }
      });
    
      // Execute the provided callback
      callback();
    }
    function closeModal() {
      // Hide and remove the 'show' class from all modal elements
      $(".modal").css("display", "none").removeClass("show");
    }
    function handleFetchError(errorMessage = "") {
      console.log(errorMessage);
    
      // Enable the delete button and reset its label
      $(".startdelete_wf").removeAttr("disabled").html("Click here to delete");
    
      // Display an error message in the console data area
      $(".console_data_delete").html(
        '<tr><td colspan="3"><p class="error p-2">Unable to delete workflow</p></td></tr>'
      );
    }
    function renderWorkflowRow(workflow) {
      // Determine if the item is a folder or a workflow
      let itemType = workflow?.type === "directory" ? "Folder" : "Workflow";
      let status = workflow.status ?? "";
    
      // Check if a row for this workflow already exists
      if (workflow && document.querySelectorAll(".wf_delete_" + workflow._id).length === 0) {
        document.querySelector(".workflows_tbody_delete").insertAdjacentHTML(
          "beforeend",
          `<tr class='wf_delete_${workflow._id}'>
            <td style="max-width: 20px;">
              <input type="checkbox" class="todeleteid todeleteid_${workflow._id}" 
                data-id="${workflow._id}" 
                data-type="${workflow.type}" 
                data-parentId="${workflow.parentId}" 
                data-name="${workflow.name}" 
                data-status="${status}">
            </td>
            <td style="max-width: 350px;">${workflow.name ?? "No Name"}</td>
            <td style="max-width: 40px;">${itemType}</td>
            <td style="max-width: 40px;">${status}</td>
          </tr>`
        );
      }
    }
    function initiateWorkflowDeletion() {
      if (location.hostname !== "app.agent-crm.com") {
        return;
      }
    
      $(".console_data_delete").html("");
    
      function setupModal() {
        $(".console_data_delete_delete").html("");
    
        if (document.querySelectorAll(".modals_workflows_show_delete").length === 0) {
          document.head.insertAdjacentHTML(
            "beforeend",
            `<style>
              .modals_workflows_show_delete .modal-content {
                max-width: 100%!important;
                width: 100%!important;
              }
              a.group.workflow_script_sm_delete.skiptranslate {
                display: block!important;
              }
              .modals_workflows_show_delete .modal-body--inner,
              .modal-header--inner {
                max-width: 100%!important;
              }
              .modals_workflows_show_delete .modal-dialog {
                max-width: 70%!important;
              }
            </style>`
          );
    
          document.querySelector("#app").insertAdjacentHTML(
            "beforeend",
            `<div class="modal workflow modals_workflows_show_delete" style="display: none;">
              <div role="document" class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="modal-header--inner">
                      <h5 class="modal-title">Workflows</h5>
                      <button type="button" data-dismiss="modal" aria-label="Close" class="close workflow">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="modal-body--inner">
                      <div class="hl_settings--body">
                        <div class="container-fluid">
                          <div class="hl_settings--controls">
                            <div class="hl_settings--controls-left">
                              <h2>Choose the folder/workflow to delete</h2>
                            </div>
                            <div class="hl_settings--controls-right">
                              <button type="button"
                                class="hl-btn startdelete_wf inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-apple-500 hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apple-500">
                                Click here to delete
                              </button>
                            </div>
                          </div>
                          <div class="card w-100">
                            <div class="pt-2 pb-2">
                              <ul class="console_data_delete"></ul>
                            </div>
                            <div class="--no-padding">
                              <div class="table-wrap">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>
                                        <input type="checkbox" class="todeleteidall" value="1">
                                      </th>
                                      <th>Name</th>
                                      <th>Type</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody class="workflows_tbody_delete"></tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
          );
        }
    
        currentFolderId = "root";
        if (location.href.includes("folder=")) {
          currentFolderId = location.href.split("folder=")[1].split("&")[0]?.split("?")[0] || "root";
        }
    
        locationId = getLocationId();
        fetchWorkflowsInFolder(currentFolderId);
    
        $("body").off("change", ".todeleteidall");
        $("body").on("change", ".todeleteidall", function () {
          const isChecked = this.checked;
          document.querySelectorAll(".todeleteid").forEach((checkbox) => {
            checkbox.checked = isChecked;
            checkbox.dispatchEvent(new Event("change"));
          });
        });
    
        $(".modals_workflows_show_delete").css("display", "block").addClass("show");
    
        $("body").off("click", ".startdelete_wf");
        $("body").on("click", ".startdelete_wf", function () {
          if (!confirm("Are you sure want to delete?")) {
            return;
          }
    
          $(".console_data_delete").html("");
    
          const button = $(this);
          const selectedWorkflows = document.querySelectorAll(".todeleteid:checked");
    
          if (selectedWorkflows.length === 0) {
            $(".console_data_delete").html("<p class='error'>First select workflow/folder to delete</p>");
            return;
          }
    
          button.attr("disabled", "disabled").html("Updating...");
    
          const workflowsToDelete = [];
          selectedWorkflows.forEach((workflowCheckbox, index) => {
            const workflowId = workflowCheckbox.getAttribute("data-id");
            workflowsToDelete.push({
              id: workflowId,
              name: workflowCheckbox.getAttribute("data-name"),
              type: workflowCheckbox.getAttribute("data-type"),
              status: "",
            });
    
            if (index === selectedWorkflows.length - 1) {
              processWorkflows(workflowsToDelete, workflowsToDelete.length, 0, currentFolderId, "", currentFolderId);
            }
          });
        });
      }
    
      setupModal();
    }
    
    // Main process
    function mainProcess() {
      let pageUrl = location.href;
  
      // Validate license and environment
      function validateEnvironment(callback) {
        if (location.hostname === "app.agent-crm.com") {
          callback();
          console.log("Activated");
        } else {
          console.log("Invalid license");
        }
      }
  
      validateEnvironment(() => {
        
      });
    }
  
    initializeScript(mainProcess);
  })();
  