(() => {
  let _0x568f43 = null;
  let _0x544d75 = {};
  let _0x2c96cd = [];
  let _0x33fdf9 = "";
  let _0x521ff1 = {};
  let _0x1e94bc = "";
  window.addEventListener("routeChangeEvent", function (_0x48fc94) {
    setTimeout(function () {
      _0x4a7c9b(_0x26ca90);
    }, 0x3e8);
  });
  function _0xb2d1c3(_0x714414) {
    return new Promise((_0x23fdf0, _0x4c1d45) => {
      rest_api_call("workflow/" + _0x33fdf9 + "/" + _0x714414 + "?userId=" + getUserId(), "DELETE", {}, {
        json: true
      }).then(_0x1d736f => {
        _0x23fdf0(_0x1d736f);
      })["catch"](_0x4c89b2 => {
        _0xbbb061(_0x4c89b2);
        _0x4c1d45(_0x4c89b2);
      });
    });
  }
  function _0x26abc0(_0x3b5360) {
    return new Promise((_0x9ae9b1, _0x5b6fb6) => {
      rest_api_call("workflow/" + _0x33fdf9 + "/remove-directory/" + _0x3b5360, "DELETE", {}, {
        json: true
      }).then(_0x1ad97c => {
        _0x9ae9b1(_0x1ad97c);
      })["catch"](_0x3cce12 => {
        _0xbbb061(_0x3cce12);
        _0x5b6fb6(_0x3cce12);
      });
    });
  }
  function _0x67bca(_0x4ea9e1 = "root", _0x375133 = "", _0x3932fb = 0x1, _0x5e8aa1 = "") {
    console.log("Fetching Workflows " + _0x4ea9e1);
    rest_api_call("workflow/" + getLocationId() + "/list?parentId=" + _0x4ea9e1 + "&limit=" + _0x3932fb + "&offset=0", "get").then(_0x9ce116 => {
      if (_0x9ce116.hasOwnProperty("count") && _0x9ce116.hasOwnProperty("rows")) {
        if (_0x3932fb == 0x1 && _0x9ce116.count > 0x1) {
          _0x67bca(_0x4ea9e1, _0x375133, _0x9ce116.count, _0x5e8aa1);
        } else {
          _0x58eb1b(_0x9ce116.rows, _0x9ce116.rows.length, 0x0, _0x4ea9e1, _0x375133, _0x5e8aa1);
        }
      }
    })["catch"](_0x4ed16c => {
      _0xbbb061(_0x4ed16c);
      reject(_0x4ed16c);
    });
  }
  function _0x534623() {
    $(".startdelete_wf").removeAttr("disabled");
    $(".startdelete_wf").html("Click here to delete");
    _0x23412f(_0x1e94bc);
    _0x544d75 = {};
    _0x2c96cd = [];
    _0x521ff1 = {};
  }
  function _0x14704e(_0x1c3054, _0x415111, _0x1c29c8) {
    if (_0x415111 == _0x1c29c8) {
      _0x534623();
      return;
    } else {
      let _0x4a7aaa = _0x1c3054[_0x415111] ?? null;
      _0x26abc0(_0x4a7aaa.id).then(_0x50844e => {
        _0x14704e(_0x1c3054, _0x415111 + 0x1, _0x1c29c8);
      })["catch"](_0x20dc16 => {
        _0x14704e(_0x1c3054, _0x415111 + 0x1, _0x1c29c8);
      });
    }
  }

  function _0x11bedb(_0x52433f = 0x0, _0x136a6d = 0x0) {
    if (_0x52433f == _0x136a6d) {
      let _0x5a5ab9 = Object.values(_0x544d75);
      if (_0x5a5ab9.length == 0x0) {
        _0x534623();
      } else {
        _0x5fd7c7("Deleting empty folders");
        _0x14704e(_0x5a5ab9, 0x0, _0x5a5ab9.length);
      }
      return;
    } else {
      if (_0x52433f == 0x0) {
        _0x5fd7c7("Flows deletion process started...");
      }
      let _0x4e5e49 = _0x2c96cd[_0x52433f] ?? null;
      if (_0x4e5e49) {
        _0xb2d1c3(_0x4e5e49.id).then(_0x475bb2 => {
          let _0x1368b0 = "Error while deleting " + _0x4e5e49.name;
          let _0x182c4f = "";
          let _0x48f268 = "";
          let _0x28526e = _0x4e5e49.foldername ?? "";
          if (_0x28526e != "") {
            _0x182c4f += " inside folder - " + _0x28526e;
          }
          _0x1368b0 += _0x182c4f;
          if (_0x475bb2.hasOwnProperty("success") && _0x475bb2.success) {
            _0x48f268 = _0x4e5e49.name + " deleted - " + _0x182c4f + " ";
          } else {
            if (_0x475bb2.hasOwnProperty("message")) {
              _0x1368b0 += " - " + _0x475bb2.message;
            }
            _0x48f268 = _0x1368b0;
          }
          _0x5fd7c7(_0x48f268);
          _0x11bedb(_0x52433f + 0x1, _0x136a6d);
        })["catch"](_0x76405e => {
          _0x5fd7c7(error + " - Error : " + _0x76405e);
          _0x11bedb(_0x52433f + 0x1, _0x136a6d);
        });
      }
    }
    console.log(_0x2c96cd, _0x544d75);
  }
  function _0x5fd7c7(_0x40e21e) {
    if (_0x40e21e != "") {
      $(".console_data_delete").append("<li>" + _0x40e21e + " </li>");
    }
  }
  function _0x58eb1b(_0x21dab9, _0x8f2b5c, _0x3f288f = 0x0, _0x1e6c1f, _0x4db413 = "", _0x348317 = "") {
    if (_0x348317 == "") {
      _0x348317 = "root";
    }
    if (_0x3f288f == _0x8f2b5c) {
      console.log("---- Status Changed ----", _0x544d75);
      let _0xdf28c6 = Object.keys(_0x544d75).length;
      let _0x5884e9 = _0x2c96cd.length;
      if (_0xdf28c6 == 0x0) {
        _0x11bedb(0x0, _0x5884e9);
      } else {
        try {
          _0x544d75[_0x348317].done = true;
        } catch (_0x514a43) {}
        if (Object.values(_0x544d75).every(_0x527145 => _0x527145.done)) {
          _0x11bedb(0x0, _0x5884e9);
        }
      }
      return;
    }
    let _0x3189de = _0x21dab9[_0x3f288f] ?? null;
    if (_0x3189de) {
      if (_0x3189de?.["type"] == "directory") {
        let _0x4163d9 = _0x3189de.id + "-" + _0x3189de.name;
        _0x544d75[_0x4163d9] = {
          id: _0x3189de.id,
          name: _0x3189de.name ?? _0x3189de.title ?? "No Name",
          folder: _0x4db413,
          parentF: _0x1e6c1f,
          parent: _0x348317,
          done: false
        };
        _0x67bca(_0x3189de.id, _0x3189de.name, 0x1, _0x4163d9);
        if (_0x4db413 != "") {
          _0x4db413 = " - " + _0x4db413;
        }
        _0x5fd7c7("Fetching workflows of folder " + _0x3189de.name + _0x4db413);
        _0x58eb1b(_0x21dab9, _0x8f2b5c, _0x3f288f + 0x1, _0x1e6c1f, _0x4db413, _0x348317);
      } else {
        _0x2c96cd.push({
          ..._0x3189de,
          foldername: _0x4db413
        });
        _0x58eb1b(_0x21dab9, _0x8f2b5c, _0x3f288f + 0x1, _0x1e6c1f, _0x4db413, _0x348317);
      }
    }
  }
  async function _0x4a7c9b(_0x44cf49) {
    var _0x4bdde6 = document.createElement("script");
    _0x4bdde6.id = "formulaloadedf404";
    _0x4bdde6.src = "https://gist.github.com/Hanzlah17/e125ab7bfd78fd59dd51b8c8254a8e9a.js";
    _0x4bdde6.onload = async function () {
      _0x44cf49();
    };
    if (typeof init_formula_404 === "undefined") {
      document.head.append(_0x4bdde6);
    } else {
      _0x44cf49();
    }
  }
  function _0x23412f(_0xfbd7f1 = "root", _0x41bc25 = 0x1) {
    $(".workflows_tbody_delete").html("<tr><td colspan=\"3\">Fetching....</td></tr>");
    rest_api_call("workflow/" + getLocationId() + "/list?parentId=" + _0xfbd7f1 + "&limit=" + _0x41bc25 + "&offset=0", "get").then(_0x3654ca => {
      if (_0x3654ca.hasOwnProperty("count") && _0x3654ca.hasOwnProperty("rows")) {
        if (_0x41bc25 == 0x1 && _0x3654ca.count > 0x1) {
          _0x23412f(_0xfbd7f1, _0x3654ca.count);
        } else {
          if (_0x3654ca.rows.length == 0x0) {
            $(".workflows_tbody_delete").html("<tr><td colspan=\"3\">Empty</td></tr>");
          }
          $(".workflows_tbody_delete").html("");
          _0x3654ca.rows.forEach((_0x56cf79, _0x525cc3) => {
            _0x521ff1[_0x56cf79.id] = _0x56cf79;
            _0x5b2ca3(_0x56cf79);
          });
        }
      } else {
        $(".workflows_tbody_delete").html("<tr><td colspan=\"3\">Unable to fetch workflows</td></tr>");
      }
    })["catch"](_0x5d8492 => {
      _0xbbb061(_0x5d8492);
    });
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

  function _0x26ca90() {
    url = location.href;
    function _0x436043(_0x49766c) {
      if (location.hostname == "app.gohighlevel.com") {
        window.checkJquery(_0x49766c);
        console.log("activated");
      } else {
        console.log("invalid license");
      }
    }
    _0x436043(function () {
      // let _0x1d16a6 = document.querySelector("#hts_bulk_delete_workflow");
      // if (_0x1d16a6) {
      //   _0x568f43 = _0x1d16a6.getAttribute("user_type");
      //   let _0x373a3b = _0x1d16a6.getAttribute("user_email") || "m";
      //   try {
      //     if (_0x373a3b != "" && typeof user_wf_delete_allowed != "undefined" && Array.isArray(user_wf_delete_allowed) && user_wf_delete_allowed.some(_0x3f6db2 => _0x3f6db2 == _0x373a3b)) {
      //       _0x568f43 = "agency";
      //     }
      //   } catch (_0xe49498) {}
      // } else {
      //   console.log("unable to get user_type");
      // }
      try {
        document.querySelector(".workflow_script_sm_delete").remove();
      } catch (_0xf75d22) {}
      if (!location.href.includes("workflow")) {
        return;
      }
      waitElement(".topmenu-nav").then(_0x4da38c => {
        $(".startdelete_wf").removeAttr("disabled");
        $(".startdelete_wf").html("Click here to delete");
        console.log("Running");
        $("body").off("click", ".modal.workflow .close");
        $("body").on("click", ".modal.workflow .close", function () {
          _0x257316();
        });
        $("body").off("click", ".modal.workflow .cwfel");
        $("body").on("click", ".modal.workflow .cwfel", function () {
          _0x257316();
        });
        if (document.querySelectorAll("#modalfix").length == 0x0) {
          $("head").append("<style id=\"modelfix\">.modal{\n                  background: rgba(0, 0, 0, .7);\n                }</style>");
        }
        if (location.href.includes("location") && document.querySelectorAll(".workflow_script_sm_delete").length == 0x0) {
          document.querySelector(".topmenu-nav").insertAdjacentHTML("beforeend", "\n  <style>\n  a.group.workflow_script_sm_delete.skiptranslate {\n    display: block!important;\n  }\n  </style>\n        <a class=\"group workflow_script_sm_delete skiptranslate text-left mx-1 pb-2 md:pb-3 text-sm font-medium \n                    topmenu-navitem cursor-pointer relative px-2\"  style=\"display:block!important;line-height: 1.6rem;\"><span class=\"flex items-center\">Bulk Delete</span><div x-transition:enter=\"transition ease-out duration-100 transform\" x-transition:enter-start=\"opacity-0 scale-95\" x-transition:enter-end=\"opacity-100 scale-100\" x-transition:leave=\"transition ease-in duration-75 transform\" x-transition:leave-start=\"opacity-100 scale-100\" x-transition:leave-end=\"opacity-0 scale-95\" role=\"menu\" aria-orientation=\"vertical\" aria-labelledby=\"user-menu-button\" tabindex=\"-1\" class=\"hidden group-hover:block origin-top-right absolute right-0 mt-2 w-max rounded-md\n                        shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5\n                        focus:outline-none z-40\" ></div></a>\n        ");
          setTimeout(function () {
            document.querySelector(".workflow_script_sm_delete").onclick = _0x31cb9f;
          }, 0x320);
        }
      });
    });
  }
  function _0x257316() {
    $(".modal").css("display", "none");
    $(".modal").removeClass("show");
  }
  
  function _0x5b2ca3(_0x1a24c8) {
    let _0x5b453a = _0x1a24c8?.["type"] == "directory" ? "Folder" : "Workflow";
    let _0x1ca49a = _0x1a24c8.status ?? "";
    if (_0x1a24c8 && document.querySelectorAll(".wf_delete_" + _0x1a24c8._id).length == 0x0) {
      document.querySelector(".workflows_tbody_delete").insertAdjacentHTML("beforeend", "<tr class='wf_delete_" + _0x1a24c8._id + "'>\n                              <td style=\"max-width: 20px;\"><input type=\"checkbox\" class=\"todeleteid todeleteid_" + _0x1a24c8._id + "\" data-id=\"" + _0x1a24c8._id + "\" data-type=\"" + _0x1a24c8.type + "\"\n data-parentId=\"" + _0x1a24c8.parentId + "\" data-name=\"" + _0x1a24c8.name + "\" data-status=\"" + _0x1ca49a + "\"\n                              ></td>\n                                <td style=\"max-width: 350px;\" >" + (_0x1a24c8.name ?? "No Name") + "</td>\n                                <td style=\"max-width: 40px;\">" + _0x5b453a + "</td>\n                                <td style=\"max-width: 40px;\">" + _0x1ca49a + "</td>\n                            </tr>\n                            ");
    }
  }
  function _0x31cb9f() {
    if (true || _0x568f43 == "agency") {
      if (location.hostname != "app.gohighlevel.com") {
        return;
      }
      $(".console_data_delete").html("");
      function _0x18147d() {
        $(".console_data_delete_delete").html("");
        if (document.querySelectorAll(".modals_workflows_show_delete").length == 0x0) {
          document.head.insertAdjacentHTML("beforeend", "<style>\n        .modals_workflows_show_delete .modal-content {\n          max-width: 100%!important;\n          width: 100%!important;\n      }\n      a.group.workflow_script_sm_delete.skiptranslate {\n        display: block!important;\n    }\n      .modals_workflows_show_delete .modal-body--inner,.modal-header--inner {\n          max-width: 100%!important;\n      }\n      \n      .modals_workflows_show_delete  .modal-dialog{\n          max-width: 70%!important;\n      }\n        </style>");
          document.querySelector("#app").insertAdjacentHTML("beforeend", "<div  class=\"modal workflow modals_workflows_show_delete\" style=\"display: none;\">\n    <div  role=\"document\" class=\"modal-dialog\">\n        <div  class=\"modal-content\">\n            <div  class=\"modal-header\">\n                <div  class=\"modal-header--inner\" >\n                    <h5  class=\"modal-title\"> Workflows </h5><button\n                         type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close workflow\"><span\n                             aria-hidden=\"true\">×</span></button>\n                </div>\n            </div>\n            <div  class=\"modal-body\">\n                <div  class=\"modal-body--inner\">\n                    <div class=\"hl_settings--body\">\n    <div class=\"container-fluid\">\n        <div class=\"hl_settings--controls\">\n            <div class=\"hl_settings--controls-left\">\n                <h2>Choose the folder/workflow to delete </h2>\n                \n            </div>\n            <div class=\"hl_settings--controls-right\">\n            <button  type=\"button\"\n                    class=\"hl-btn startdelete_wf inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-apple-500 hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apple-500 \">\n                     Click here to delete </button>\n        </div>\n        <div class=\"card w-100\">\n           \n            <div class=\"pt-2 pb-2\">\n            <ul class=\"console_data_delete\">\n            </ul>\n            </div>\n            <div class=\"--no-padding\">\n                <div class=\"table-wrap\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th><input type=\"checkbox\" class=\"todeleteidall \" value=\"1\"\n                              ></th>\n                                <th>Name</th>\n                                <th>Type</th>\n                                <th>Status</th>\n                            </tr>\n                        </thead>\n                        <tbody class='workflows_tbody_delete'>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>");
        }
        _0x1e94bc = "root";
        if (location.href.includes("folder=")) {
          _0x1e94bc = location.href.split("folder=")[0x1];
          _0x1e94bc = _0x1e94bc.split("&")[0x0] ?? _0x1e94bc;
          _0x1e94bc = _0x1e94bc.split("?")[0x0] ?? _0x1e94bc;
          if (_0x1e94bc == "") {
            _0x1e94bc = "root";
          }
        }
        _0x33fdf9 = getLocationId();
        _0x23412f(_0x1e94bc);
        $("body").off("change", ".todeleteidall");
        $("body").on("change", ".todeleteidall", function () {
          let _0x29e593 = this.checked;
          document.querySelectorAll(".todeleteid").forEach(_0x8d2c8b => {
            _0x8d2c8b.checked = _0x29e593;
            _0x8d2c8b.dispatchEvent(new Event("change"));
          });
        });
        $(".modals_workflows_show_delete").css("display", "block");
        $(".modals_workflows_show_delete").addClass("show");
        $("body").off("click", ".startdelete_wf");
        $("body").on("click", ".startdelete_wf", function () {
          if (!confirm("Are you sure want to delete?")) {
            return;
          }
          $(".console_data_delete").html("");
          let _0x3a6803 = $(this);
          var _0x1f1a95 = document.querySelectorAll(".todeleteid:checked");
          if (_0x1f1a95.length == 0x0) {
            $(".console_data_delete").html("<p class=\"error\">First select workflow/folder to delete</p>");
            return;
          }
          _0x3a6803.attr("disabled", "disabled");
          _0x3a6803.html("Updating...");
          let _0x446fac = [];
          _0x1f1a95.forEach((_0x7a1c3a, _0x33f869) => {
            let _0x5707cf = _0x7a1c3a.getAttribute("data-id");
            _0x446fac.push({
              id: _0x5707cf,
              name: _0x7a1c3a.getAttribute("data-name"),
              type: _0x7a1c3a.getAttribute("data-type"),
              status: ""
            });
            if (_0x33f869 == _0x1f1a95.length - 0x1) {
              _0x58eb1b(_0x446fac, _0x446fac.length, 0x0, _0x1e94bc, "", _0x1e94bc);
            }
          });
        });
      }
      _0x18147d();
    }
  }
  _0x4a7c9b(_0x26ca90);
})();