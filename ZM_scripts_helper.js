function ZM_validateCompany(_0x3f2a33, _0x314691) {
  AppUtils.Utilities.getCompany()
    .then((_0x1eff4c) => {
      const _0x46619f = _0x1eff4c.id;
      if (!_0x46619f) {
        console.error("Missing company ID");
        return;
      }
      return ZM_restApiCall("companies/" + _0x46619f, "get");
    })
    .then((_0x243873) => {
      if (!_0x243873 || !_0x243873.company) {
        console.error("Invalid company response.");
        return;
      }
      const _0x25696d = _0x243873.company.email;
      const _0x2d1ebd =
        "https://firebase-ghl-rest-api.vercel.app/get-company?companyEmail=" +
        _0x25696d +
        "&scriptId=" +
        _0x3f2a33;
      return fetch(_0x2d1ebd)
        .then((_0x8d7bed) => {
          if (_0x8d7bed.status === 0xc8) {
            console.log("activated");
            if (_0x314691) {
              window.checkJquery(_0x314691);
            }
          } else {
            console.log("invalid license");
          }
        })
        ["catch"]((_0x29b15a) => {
          console.error("Fetch error:", _0x29b15a);
        });
    })
    ["catch"]((_0x20fade) => {
      console.error("Error in validation and activation process:", _0x20fade);
    });
}
async function ZM_getUserInfo() {
  return await AppUtils.Utilities.getCurrentUser();
}
function ZM_getCookieValue(_0x23128f) {
  const _0x3089fa = _0x23128f + "=";
  const _0x4474d2 = decodeURIComponent(document.cookie).split(";");
  for (let _0xb15c6 = 0x0; _0xb15c6 < _0x4474d2.length; _0xb15c6++) {
    let _0x235947 = _0x4474d2[_0xb15c6];
    while (_0x235947.charAt(0x0) === " ") {
      _0x235947 = _0x235947.substring(0x1);
    }
    if (_0x235947.indexOf(_0x3089fa) === 0x0) {
      return _0x235947.substring(_0x3089fa.length, _0x235947.length);
    }
  }
  return "";
}
function ZM_getTokenFromDB() {
  return new Promise((_0x4c3ab0, _0x6cdad8) => {
    let _0x397e24 = {};
    const _0x55203c = indexedDB.open("firebaseLocalStorageDb");
    _0x55203c.onsuccess = async function (_0x3713bc) {
      if (_0x3713bc.target.readyState === "done") {
        let _0x9b84a5 = _0x3713bc.target.result;
        const _0x4e2c82 = _0x9b84a5
          .transaction("firebaseLocalStorage")
          .objectStore("firebaseLocalStorage")
          .get(
            "firebase:authUser:AIzaSyB_w3vXmsI7WeQtrIOkjR6xTRVN5uOieiE:[DEFAULT]"
          );
        _0x4e2c82.onsuccess = async function (_0x5b7b1a) {
          if (_0x5b7b1a.target.readyState === "done") {
            _0x397e24.accessToken =
              _0x4e2c82.result.value.stsTokenManager.accessToken;
            _0x397e24.uid = _0x4e2c82.result.value.uid;
            _0x397e24.apiKey = _0x4e2c82.result.value.apiKey;
            let _0x556e38 = ZM_getCookieValue("a");
            try {
              _0x556e38 = JSON.parse(_0x556e38);
            } catch {
              _0x556e38 = JSON.parse(atob(_0x556e38));
            }
            _0x4c3ab0({
              token: _0x397e24,
              user: _0x556e38,
            });
          }
        };
      }
    };
  });
}
function ZM_getRequestHeaders() {
  return new Promise(async (_0x582166, _0x474ac7) => {
    try {
      ZM_getTokenFromDB()
        .then((_0x386ad9) => {
          try {
            const _0x36b1b9 = {
              accept: "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              authorization: "Bearer " + _0x386ad9.user.jwt,
              channel: "APP",
              "content-type": "application/json;charset=UTF-8",
              source: "WEB_USER",
              "token-id": _0x386ad9.token.accessToken,
              version: "2021-04-15",
            };
            _0x582166({
              headers: _0x36b1b9,
              locationId: ZM_getLocation(),
              user: _0x386ad9.user,
            });
          } catch (_0x46d629) {
            _0x474ac7(_0x46d629);
          }
        })
        ["catch"]((_0x5adad2) => {
          _0x474ac7(_0x5adad2);
        });
    } catch (_0x383e22) {
      _0x474ac7(_0x383e22);
    }
  });
}
function ZM_restApiCall(
  _0x534bf7,
  _0x39b739 = "POST",
  _0x137deb = "",
  _0x3cd80d = {}
) {
  return new Promise((_0x19932a, _0x4165a5) => {
    ZM_getRequestHeaders()
      .then((_0x44a2e6) => {
        const _0x1bdb31 = {
          method: _0x39b739,
          headers: _0x44a2e6.headers,
          redirect: "follow",
        };
        if (typeof _0x137deb === "object") {
          _0x137deb = JSON.stringify(_0x137deb);
        }
        if (_0x137deb && _0x39b739.toLowerCase() !== "get") {
          _0x1bdb31.body = _0x137deb;
        }
        try {
          if (_0x3cd80d.location) {
            _0x534bf7 = "locations/" + _0x44a2e6.locationId + "/" + _0x534bf7;
          }
          if (_0x39b739.toLowerCase() === "get") {
            let _0x12e136 = "";
            if (_0x3cd80d.company) {
              _0x12e136 += "companyId=" + _0x44a2e6.user.companyId;
            }
            _0x534bf7 += (_0x534bf7.includes("?") ? "&" : "?") + _0x12e136;
            if (_0x137deb) {
              _0x534bf7 += _0x137deb;
            }
          }
          fetch("https://services.leadconnectorhq.com/" + _0x534bf7, _0x1bdb31)
            .then((_0x2e5b0b) => _0x2e5b0b.json())
            .then((_0x3c8667) => _0x19932a(_0x3c8667))
            ["catch"]((_0x21b843) => _0x4165a5(_0x21b843));
        } catch (_0x3f5cdd) {
          _0x4165a5(_0x3f5cdd);
        }
      })
      ["catch"]((_0x56b57f) => {
        _0x4165a5(_0x56b57f);
      });
  });
}
Date.prototype.add = function (_0x4004b7, _0x2b729b = "day") {
  const _0x2205a7 = new Date(this.valueOf());
  if (_0x2b729b === "day") {
    _0x2205a7.setDate(_0x2205a7.getDate() + _0x4004b7);
  } else {
    if (_0x2b729b === "month") {
      _0x2205a7.setMonth(_0x2205a7.getMonth() + _0x4004b7);
    } else if (_0x2b729b === "year") {
      _0x2205a7.setFullYear(_0x2205a7.getFullYear() + _0x4004b7);
    }
  }
  return _0x2205a7;
};
function ZM_getLocal(_0x117cac) {
  return sessionStorage.getItem(_0x117cac) || "";
}
function ZM_setLocal(_0x51ef1f, _0x5ccf39) {
  return sessionStorage.setItem(_0x51ef1f, _0x5ccf39);
}
function ZM_getAllLocalStorage() {
  return Object.keys(localStorage).reduce((_0x14f8a6, _0x5f0a40) => {
    return {
      ..._0x14f8a6,
      [_0x5f0a40]: localStorage.getItem(_0x5f0a40),
    };
  }, {});
}
var sessions_inc = [];
function ZM_getUserId() {
  return ZM_getTokenUser().userId ?? null;
}
function ZM_getTokenUser() {
  let _0x39fb2d = ZM_getCookieValue("a");
  try {
    _0x39fb2d = JSON.parse(_0x39fb2d);
  } catch (_0x56b82f) {
    _0x39fb2d = JSON.parse(atob(_0x39fb2d));
  } finally {
  }
  return _0x39fb2d;
}
function ZM_getLocation() {
  let _0x5da0c2 = "";
  try {
    const _0x56f095 = location.href.split("location/");
    _0x5da0c2 = _0x56f095[0x1].split("/")[0x0];
  } catch (_0x14b338) {}
  return _0x5da0c2;
}
window.appfix = null;
window.dbda = null;
function ZM_loadScript(_0x58c8a0, _0x1c2cb8, _0xcf6be3 = "") {
  var _0x3e4c3b = document.createElement("script");
  _0x3e4c3b.type = "text/javascript";
  _0x3e4c3b.id = _0xcf6be3;
  if (_0x3e4c3b.readyState) {
    _0x3e4c3b.onreadystatechange = function () {
      if (
        _0x3e4c3b.readyState === "loaded" ||
        _0x3e4c3b.readyState === "complete"
      ) {
        _0x3e4c3b.onreadystatechange = null;
        _0x1c2cb8();
      }
    };
  } else {
    _0x3e4c3b.onload = function () {
      _0x1c2cb8();
    };
  }
  _0x3e4c3b.src = _0x58c8a0;
  document.getElementsByTagName("head")[0x0].appendChild(_0x3e4c3b);
}
function ZM_loadCSS(_0x2e6822, _0x2d58f1 = "") {
  return new Promise(function (_0x4e4ce6, _0x3614a3) {
    var _0x5a38e8 = document.createElement("link");
    _0x5a38e8.rel = "stylesheet";
    _0x5a38e8.href = _0x2e6822;
    if (_0x2d58f1 !== "") {
      _0x5a38e8.id = _0x2d58f1;
    }
    document.head.appendChild(_0x5a38e8);
    _0x5a38e8.onload = function () {
      _0x4e4ce6();
    };
  });
}
window.checkJquery = function (_0x222769, _0xbe8a7a = null) {
  try {
    if (
      typeof jQuery === "function" ||
      typeof $ === "function" ||
      typeof jQuery !== "undefined"
    ) {
      if (typeof _0xbe8a7a === "function") {
        _0xbe8a7a();
      }
      _0x222769();
    } else {
      try {
        loadScript(
          "//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
          function () {
            _0x222769();
            if (typeof _0xbe8a7a === "function") {
              _0xbe8a7a();
            }
          }
        );
      } catch (_0x370fbd) {
        console.log("Error loading jQuery:", _0x370fbd);
      }
    }
  } catch (_0x50fb71) {
    try {
      ZM_loadScript(
        "//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        function () {
          _0x222769();
          if (typeof _0xbe8a7a === "function") {
            _0xbe8a7a();
          }
        }
      );
    } catch (_0x142831) {
      console.log("Error loading jQuery:", _0x142831);
    }
  }
};
async function ZM_initializeDB(_0x40c214 = false) {
  return new Promise((_0x3686c8, _0x11ec7d) => {
    let _0x2427aa = 0xbb8;
    let _0x1e5411 = setInterval(() => {
      let _0x173ec2 = document.querySelector("#app");
      if (_0x173ec2?.["__vue__"]?.["$db"]) {
        clearInterval(_0x1e5411);
        _0x3686c8(_0x173ec2.__vue__.$db);
      }
      if (window.dbda) {
        clearInterval(_0x1e5411);
        _0x3686c8(window.dbda);
      }
      if (
        _0x173ec2?.["__vue__"]?.["$auth"]?.["app"]?.["firebase"] ||
        _0x173ec2?.["__vue__"]?.["$db"]
      ) {
        if (!_0x173ec2.__vue__.$db) {
          _0x173ec2.__vue__.$db =
            _0x173ec2.__vue__.$auth.app.firebase.firestore();
        }
        window.dbda = _0x173ec2.__vue__.$db;
        clearInterval(_0x1e5411);
        _0x3686c8(_0x173ec2.__vue__.$db);
      }
      if (_0x2427aa === 0x0) {
        clearInterval(_0x1e5411);
        if (window.dbda) {
          _0x3686c8(window.dbda);
        }
        if (_0x173ec2?.["__vue__"]?.["$db"]) {
          _0x3686c8(_0x173ec2.__vue__.$db);
        }
        _0x11ec7d("Database not found");
        let _0x4fe494 = document.createElement("script");
        _0x4fe494.id = "init_formula_404";
        _0x4fe494.src = "https://www.gstatic.com/firebasejs/5.0.1/firebase.js";
        _0x4fe494.onload = () => {
          console.log("Firebase script loaded successfully");
        };
        if (!document.querySelector("#" + _0x4fe494.id)) {
          document.head.append(_0x4fe494);
        }
        let _0x1e2e4e = setInterval(async () => {
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
            if (window.dbda?.["collection"]) {
              if (_0x40c214 && firebase.auth().currentUser) {
                clearInterval(_0x1e2e4e);
                _0x3686c8(firebase.auth().currentUser);
              } else {
                clearInterval(_0x1e2e4e);
                _0x3686c8(window.dbda);
              }
            }
          } catch (_0x5c7011) {
            console.error("Error initializing Firebase:", _0x5c7011);
          }
        }, 0x1f4);
      }
      _0x2427aa--;
    }, 0x1f4);
  });
}
async function ZM_restApiCallV2(
  _0x3b51e5,
  _0x328b84 = "POST",
  _0x4c01bd = "",
  _0x3cbf92 = {},
  _0x26a605 = ""
) {
  const _0x270c85 = ZM_getTokenUser();
  return new Promise(async (_0x1c1699, _0x30523e) => {
    let _0x1d2000 = {
      channel: "APP",
      version: "2021-07-28",
      source: "WEB_USER",
      "token-id": await window.getToken(),
    };
    let _0x3aa255 = {
      method: _0x328b84,
      headers: _0x1d2000,
      redirect: "follow",
    };
    if (typeof _0x4c01bd === "object") {
      _0x4c01bd = JSON.stringify(_0x4c01bd);
    }
    if (_0x4c01bd !== "" && _0x328b84.toLowerCase() !== "get") {
      _0x3aa255.body = _0x4c01bd;
    }
    try {
      if (_0x3cbf92.hasOwnProperty("location")) {
        _0x3b51e5 = "locations/" + ZM_getLocation() + "/" + _0x3b51e5;
      }
      if (_0x328b84.toLowerCase() === "get") {
        let _0x4c2cf1 = "";
        if (_0x3cbf92.hasOwnProperty("company")) {
          _0x4c2cf1 += "companyId=" + _0x270c85.companyId;
        }
        if (_0x4c2cf1 !== "" || _0x4c01bd !== "") {
          _0x3b51e5 += (_0x3b51e5.includes("?") ? "&" : "?") + _0x4c2cf1;
        }
        if (_0x4c01bd !== "") {
          _0x3b51e5 += _0x4c01bd;
        }
      }
      fetch("https://services.leadconnectorhq.com/" + _0x3b51e5, _0x3aa255)
        .then((_0x147cad) => _0x147cad.json())
        .then((_0x521980) => _0x1c1699(_0x521980))
        ["catch"]((_0x45eca9) => _0x30523e(_0x45eca9));
    } catch (_0x25fd42) {
      _0x30523e(_0x25fd42);
    }
  });
}
async function ZM_restApiCallMembership(
  _0x4fe7bd,
  _0x289892 = "POST",
  _0x39b9c5 = "",
  _0x1d45f9 = {},
  _0x2ee60a = ""
) {
  const _0x20b7b6 = ZM_getTokenUser();
  return new Promise(async (_0x3923e5, _0x270d35) => {
    let _0x4381e5 = {
      channel: "APP",
      version: "2021-07-28",
      source: "WEB_USER",
      Authorization: "Bearer " + (await window.getToken()),
    };
    let _0xb1d38a = {
      method: _0x289892,
      headers: _0x4381e5,
      redirect: "follow",
    };
    if (typeof _0x39b9c5 === "object") {
      _0x39b9c5 = JSON.stringify(_0x39b9c5);
    }
    if (_0x39b9c5 !== "" && _0x289892.toLowerCase() !== "get") {
      _0xb1d38a.body = _0x39b9c5;
    }
    try {
      if (_0x1d45f9.hasOwnProperty("location")) {
        _0x4fe7bd = "locations/" + ZM_getLocation() + "/" + _0x4fe7bd;
      }
      if (_0x289892.toLowerCase() === "get") {
        let _0x918f21 = "";
        if (_0x1d45f9.hasOwnProperty("company")) {
          _0x918f21 += "companyId=" + _0x20b7b6.companyId;
        }
        if (_0x918f21 !== "" || _0x39b9c5 !== "") {
          _0x4fe7bd += (_0x4fe7bd.includes("?") ? "&" : "?") + _0x918f21;
        }
        if (_0x39b9c5 !== "") {
          _0x4fe7bd += _0x39b9c5;
        }
      }
      fetch("https://services.leadconnectorhq.com/" + _0x4fe7bd, _0xb1d38a)
        .then((_0x77a478) => _0x77a478.json())
        .then((_0x3d47d4) => _0x3923e5(_0x3d47d4))
        ["catch"]((_0x5529a6) => _0x270d35(_0x5529a6));
    } catch (_0x220a5c) {
      _0x270d35(_0x220a5c);
    }
  });
}
function ZM_restApiCall_(
  _0x2043b2,
  _0x1ea45e = "POST",
  _0x36f863 = "",
  _0x3e8514 = {},
  _0x7c6aa4 = ""
) {
  return new Promise((_0x47895b, _0x4489ec) => {
    ZM_getRequestHeaders(_0x7c6aa4)
      .then((_0x11dbf7) => {
        let _0x4416ad = {
          method: _0x1ea45e,
          headers: _0x11dbf7.headers,
          redirect: "follow",
        };
        if (typeof _0x36f863 === "object") {
          _0x36f863 = JSON.stringify(_0x36f863);
        }
        if (_0x36f863 !== "" && _0x1ea45e.toLowerCase() !== "get") {
          _0x4416ad.body = _0x36f863;
        }
        try {
          if (_0x3e8514.hasOwnProperty("location")) {
            _0x2043b2 = "locations/" + _0x11dbf7.locationid + "/" + _0x2043b2;
          }
          if (_0x1ea45e.toLowerCase() === "get") {
            let _0x5021fa = "";
            if (_0x3e8514.hasOwnProperty("company")) {
              _0x5021fa += "companyId=" + _0x11dbf7.user.companyId;
            }
            if (_0x5021fa !== "" || _0x36f863 !== "") {
              _0x2043b2 += (_0x2043b2.includes("?") ? "&" : "?") + _0x5021fa;
            }
            if (_0x36f863 !== "") {
              _0x2043b2 += _0x36f863;
            }
          }
          fetch("https://services.leadconnectorhq.com/" + _0x2043b2, _0x4416ad)
            .then((_0x57daff) => _0x57daff.json())
            .then((_0x9e5326) => {
              if (_0x9e5326 === "Unauthorized") {
                _0x4489ec(_0x9e5326);
              } else {
                _0x47895b(_0x9e5326);
              }
            })
            ["catch"]((_0x56dbae) => _0x4489ec(_0x56dbae));
        } catch (_0x142b10) {
          _0x4489ec(_0x142b10);
        }
      })
      ["catch"](() => {});
  });
}
function ZM_waitElement(_0x329d0c) {
  return new Promise((_0x2d2238, _0x2cdb39) => {
    let _0x557046 = document.querySelector(_0x329d0c);
    if (_0x557046) {
      _0x2d2238(_0x557046);
      return;
    }
    const _0x23ce69 = new MutationObserver((_0x501e5a, _0x1114d5) => {
      const _0x2e901d = [...document.querySelectorAll(_0x329d0c)];
      _0x2e901d.forEach((_0x3ecee0) => {
        _0x2d2238(_0x3ecee0);
        _0x1114d5.disconnect();
      });
    });
    const _0x32ae70 = document.querySelector("#app");
    if (_0x32ae70) {
      _0x23ce69.observe(_0x32ae70, {
        childList: true,
        subtree: true,
      });
    } else {
      _0x2cdb39("The #app element is not found in the document.");
    }
  });
}
function ZM_waitElementVue(_0x2e2cfe) {
  return new Promise((_0x5156e6, _0x56e0ee) => {
    let _0x50a2be = document.querySelector(_0x2e2cfe);
    if (_0x50a2be && _0x50a2be.__vue__) {
      _0x5156e6(_0x50a2be);
      return;
    }
    const _0x591687 = new MutationObserver((_0x9c268c, _0x49c695) => {
      const _0x47e021 = [...document.querySelectorAll(_0x2e2cfe)];
      _0x47e021.forEach((_0x5413bf) => {
        if (_0x5413bf.__vue__) {
          _0x5156e6(_0x5413bf);
          _0x49c695.disconnect();
        }
      });
    });
    const _0x7e8593 = document.querySelector("#app");
    if (_0x7e8593) {
      _0x591687.observe(_0x7e8593, {
        childList: true,
        subtree: true,
      });
    } else {
      _0x56e0ee("The #app element is not found in the document.");
    }
  });
}
function ZM_redirectRoute(_0x229f33, _0x2595c1 = "name", _0x1752a7 = {}) {
  try {
    let _0xedf8a6 = document.querySelector("#app");
    let _0x194ac7 = {
      [_0x2595c1]: _0x229f33,
    };
    try {
      if (_0x2595c1 === "name" && Object.keys(_0x1752a7).length > 0x0) {
        _0x194ac7.params = _0x1752a7;
      }
    } catch (_0x4fd51f) {
      console.error("Error processing route parameters:", _0x4fd51f);
    }
    _0xedf8a6.__vue__.$router.push(_0x194ac7);
  } catch (_0x59251e) {
    console.error("Error in Vue routing:", _0x59251e);
    if (_0x2595c1 === "path") {
      location.href = _0x229f33;
    }
  }
}
