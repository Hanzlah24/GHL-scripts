function verifyCompany(_0x23afdd) {
  return new Promise(async (_0x157f96, _0x5b51c5) => {
    let _0x434f3e = await AppUtils.Utilities.getCompany();
    if (_0x434f3e.id == _0x23afdd) {
      _0x157f96(_0x434f3e);
    } else {
      _0x5b51c5("Invalid Company");
    }
  });
}
async function getUserInfo() {
  return await AppUtils.Utilities.getCurrentUser();
}
function fel(_0x5dde34) {
  const _0x2094fa = _0x5dde34 + '=';
  const _0x329978 = decodeURIComponent(document.cookie).split(';');
  for (let _0x40d0cd = 0x0; _0x40d0cd < _0x329978.length; _0x40d0cd++) {
    let _0x248f94 = _0x329978[_0x40d0cd];
    for (; " " === _0x248f94.charAt(0x0);) {
      _0x248f94 = _0x248f94.substring(0x1);
    }
    if (0x0 === _0x248f94.indexOf(_0x2094fa)) {
      return _0x248f94.substring(_0x2094fa.length, _0x248f94.length);
    }
  }
  return '';
}
function getTokenFromDB() {
  return new Promise(function (_0x188e55, _0x1f8f1a) {
    let _0x1b5626 = {};
    const _0x4ed8ee = indexedDB.open("firebaseLocalStorageDb");
    _0x4ed8ee.onsuccess = async function (_0x38b234) {
      if (_0x38b234.target.readyState === "done") {
        let _0x472cad = _0x38b234.target.result;
        const _0x3017cc = _0x472cad.transaction("firebaseLocalStorage").objectStore("firebaseLocalStorage").get("firebase:authUser:AIzaSyB_w3vXmsI7WeQtrIOkjR6xTRVN5uOieiE:[DEFAULT]");
        _0x3017cc.onsuccess = async function (_0x26600c) {
          if (_0x26600c.target.readyState === "done") {
            _0x1b5626.accessToken = _0x3017cc.result.value.stsTokenManager.accessToken;
            _0x1b5626.uid = _0x3017cc.result.value.uid;
            _0x1b5626.apiKey = _0x3017cc.result.value.apiKey;
            let _0x2643a0 = fel('a');
            try {
              _0x2643a0 = JSON.parse(_0x2643a0);
            } catch (_0x583498) {
              _0x2643a0 = JSON.parse(atob(_0x2643a0));
            } finally {}
            _0x188e55({
              'token': _0x1b5626,
              'user': _0x2643a0
            });
          }
        };
      }
    };
  });
}
function getRequestHeaders() {
  return new Promise(async (_0x2327b0, _0x101e85) => {
    try {
      getTokenFromDB().then(_0xcb703e => {
        try {
          request_headers = {
            'accept': "application/json, text/plain, */*",
            'accept-language': "en-US,en;q=0.9",
            'authorization': "Bearer " + _0xcb703e.user.jwt,
            'channel': 'APP',
            'content-type': "application/json;charset=UTF-8",
            'source': "WEB_USER",
            'token-id': _0xcb703e.token.accessToken,
            'version': "2021-04-15"
          };
          let _0x174c47 = {
            'headers': request_headers,
            'locationid': getLocation(),
            'user': _0xcb703e.user
          };
          _0x2327b0(_0x174c47);
        } catch (_0x47628e) {
          _0x101e85(_0x47628e);
        }
      })["catch"](_0x17edb8 => {
        _0x101e85(_0x17edb8);
      });
    } catch (_0x56eba6) {
      _0x101e85(_0x56eba6);
    }
  });
}
function rest_api_call(_0x3a4c5c, _0x4b2a10 = 'POST', _0x5d88ca = '', _0x4d388f = {}) {
  return new Promise((_0x2895ee, _0x40cee7) => {
    getRequestHeaders().then(_0x15ef21 => {
      var _0x7749ea = {
        'method': _0x4b2a10,
        'headers': _0x15ef21.headers,
        'redirect': "follow"
      };
      if (typeof _0x5d88ca == "object") {
        _0x5d88ca = JSON.stringify(_0x5d88ca);
      }
      if (_0x5d88ca != '' && _0x4b2a10.toLowerCase() != "get") {
        _0x7749ea.body = _0x5d88ca;
      }
      try {
        if (_0x4d388f.hasOwnProperty("location")) {
          _0x3a4c5c = "locations/" + _0x15ef21.locationid + '/' + _0x3a4c5c;
        }
        if (_0x4b2a10.toLowerCase() == "get") {
          var _0x4b5204 = '';
          if (_0x4d388f.hasOwnProperty("company")) {
            _0x4b5204 += "companyId=" + _0x15ef21.user.companyId;
          }
          _0x3a4c5c += (_0x3a4c5c.includes('?') ? '&' : '?') + _0x4b5204;
          if (_0x5d88ca != '') {
            _0x3a4c5c += _0x5d88ca;
          }
        }
        fetch('https://services.leadconnectorhq.com/' + _0x3a4c5c, _0x7749ea).then(_0x430c8c => _0x430c8c.json()).then(_0x56c1f2 => _0x2895ee(_0x56c1f2))["catch"](_0x4a4687 => _0x40cee7(_0x4a4687));
      } catch (_0x48f622) {
        _0x40cee7(_0x48f622);
      }
    })["catch"](_0x48c6e1 => {});
  });
}
Date.prototype.add = function (_0x346dfc, _0x24db65 = "day") {
  const _0x4ce253 = new Date(this.valueOf());
  if (_0x24db65 == "day") {
    _0x4ce253.setDate(_0x4ce253.getDate() + _0x346dfc);
  } else if (_0x24db65 == "month") {
    _0x4ce253.setMonth(_0x4ce253.getMonth() + _0x346dfc);
  } else {
    _0x4ce253.setFullYear(_0x4ce253.getFullYear() + _0x346dfc);
  }
  return _0x4ce253;
};
function getLocal(_0x27fdc3) {
  return sessionStorage.getItem(_0x27fdc3) || '';
}
function setLocal(_0x3bc047, _0x1fa479) {
  return sessionStorage.setItem(_0x3bc047, _0x1fa479);
}
function getAllLocalStorage() {
  return Object.keys(localStorage).reduce((_0x42ad49, _0xf1813a) => {
    return {
      ..._0x42ad49,
      [_0xf1813a]: localStorage.getItem(_0xf1813a)
    };
  }, {});
}
var sessions_inc = [];
function getUserId() {
  return getTokenUser().userId ?? null;
}
function getTokenUser() {
  let _0x495717 = fel('a');
  try {
    _0x495717 = JSON.parse(_0x495717);
  } catch (_0x5e0bf3) {
    _0x495717 = JSON.parse(atob(_0x495717));
  } finally {}
  return _0x495717;
}
function append_login_key(_0x3ae444) {
  _0x3ae444.company_id = login_key_company;
  return _0x3ae444;
}
function send_request_api(_0x15bd34, _0xc95233 = "POST", _0x4d0c52 = '', _0x132142 = []) {
  var _0x1f03c9 = new Headers();
  _0x1f03c9.append("Accept", "application/json");
  _0x1f03c9.append("Content-Type", "application/json");
  var _0x291ae8 = {
    'method': _0xc95233,
    'headers': _0x1f03c9,
    'body': _0x4d0c52,
    'redirect': "follow"
  };
  if (typeof _0x4d0c52 == "object") {
    if (!_0x4d0c52.hasOwnProperty("company_id")) {
      _0x4d0c52 = append_login_key(_0x4d0c52);
    }
    _0x4d0c52 = JSON.stringify(_0x4d0c52);
  }
  if (_0x4d0c52 != '') {
    _0x291ae8.body = _0x4d0c52;
  }
  return new Promise((_0xc5b97b, _0x42a76d) => {
    try {
      fetch("https://toolkit.jdfunnel.com/api/" + _0x15bd34, _0x291ae8).then(_0x62b92d => _0x62b92d.json()).then(_0x13d024 => _0xc5b97b(_0x13d024))["catch"](_0x2b0d35 => _0x42a76d(_0x2b0d35));
    } catch (_0x3aeb1b) {
      _0x42a76d(_0x3aeb1b);
    }
  });
}
function getLocation() {
  locationid = '';
  try {
    loc = location.href.split("location/");
    locationid = loc[0x1].split('/')[0x0];
  } catch (_0x3a9860) {}
  return locationid;
}
function getLocationId() {
  return getLocation();
}
window.appfix = null;
window.dbda = null;
function loadScript(_0x941c63, _0x4ec755, _0x9e5622 = '') {
  var _0x361b85 = document.createElement("script");
  _0x361b85.type = "text/javascript";
  _0x361b85.id = _0x9e5622;
  if (_0x361b85.readyState) {
    _0x361b85.onreadystatechange = function () {
      if (_0x361b85.readyState === "loaded" || _0x361b85.readyState === "complete") {
        _0x361b85.onreadystatechange = null;
        _0x4ec755();
      }
    };
  } else {
    _0x361b85.onload = function () {
      _0x4ec755();
    };
  }
  _0x361b85.src = _0x941c63;
  document.getElementsByTagName("head")[0x0].appendChild(_0x361b85);
}
function getLocation() {
  locationid = '';
  try {
    loc = location.href.split("location/");
    locationid = loc[0x1].split('/')[0x0];
  } catch (_0x15956a) {}
  return locationid;
}
function LoadCSS(_0x44e78f, _0x4b3227 = '') {
  return new Promise(function (_0x1c98a1, _0xc7626f) {
    var _0x479d9f = document.createElement("link");
    _0x479d9f.rel = "stylesheet";
    _0x479d9f.href = _0x44e78f;
    if (_0x4b3227 != '') {
      _0x479d9f.id = _0x4b3227;
    }
    document.head.appendChild(_0x479d9f);
    _0x479d9f.onload = function () {
      _0x1c98a1();
    };
  });
}
window.checkJquery = function (_0x34c19b, _0x2d1bef = null) {
  try {
    if (typeof jQuery == "function" || typeof $ == "function" || typeof jQuery != "undefined") {
      if (typeof _0x2d1bef == "function") {
        _0x2d1bef();
      }
      _0x34c19b();
    } else {
      try {
        loadScript("//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js", function () {
          _0x34c19b();
          if (typeof _0x2d1bef == "function") {
            _0x2d1bef();
          }
        });
      } catch (_0x39943f) {
        console.log("error");
      }
    }
  } catch (_0x417fe5) {
    try {
      loadScript("//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js", function () {
        _0x34c19b();
        if (typeof _0x2d1bef == "function") {
          _0x2d1bef();
        }
      });
    } catch (_0x4811ca) {
      console.log("error");
    }
  }
};
async function init_formula_404(_0x136934 = false) {
  return new Promise((_0x3ea9e9, _0x760ef) => {
    let _0x25904a = 0xbb8;
    let _0x4dc326 = setInterval(function () {
      let _0x5be675 = document.querySelector('#app');
      if (_0x5be675?.["__vue__"]?.["$db"]) {
        clearInterval(_0x4dc326);
        _0x3ea9e9(_0x5be675?.["__vue__"]?.["$db"]);
      }
      if (window?.["dbda"]) {
        clearInterval(_0x4dc326);
        _0x3ea9e9(window?.['dbda']);
      }
      if (_0x5be675 && _0x5be675.__vue__ && (_0x5be675.__vue__?.["$auth"]?.['app']?.["firebase"] || _0x5be675?.["__vue__"]?.['$db'])) {
        if (!_0x5be675?.["__vue__"]?.["$db"]) {
          _0x5be675.__vue__.$db = _0x5be675?.["__vue__"]?.['$auth']?.["app"]?.["firebase"]?.["firestore"](_0x5be675?.["__vue__"]?.['$auth']?.["app"]["firebase"]);
        }
        window.dbda = _0x5be675.__vue__.$db;
        clearInterval(_0x4dc326);
        _0x3ea9e9(_0x5be675.__vue__.$db);
      }
      if (_0x25904a == 0x0) {
        clearInterval(_0x4dc326);
        if (window?.["dbda"]) {
          _0x3ea9e9(window?.["dbda"]);
        }
        if (_0x5be675?.["__vue__"]?.["$db"]) {
          _0x3ea9e9(_0x5be675?.["__vue__"]?.["$db"]);
        }
        _0x760ef("Not found");
        let _0x1ef8ed = document.createElement("script");
        _0x1ef8ed.id = "init_formula_404";
        _0x1ef8ed.src = "https://www.gstatic.com/firebasejs/5.0.1/firebase.js";
        _0x1ef8ed.onload = function () {
          console.log("Working on it");
        };
        if (!document.querySelector('#' + _0x1ef8ed.id)) {
          document.head.append(_0x1ef8ed);
        }
        let _0x275ea4 = setInterval(async function () {
          try {
            if (typeof window.appfix == "undefined" || !window.appfix) {
              window.appfix = firebase.initializeApp(JSON.parse(atob("eyJhcGlLZXkiOiJBSXphU3lCX3czdlhtc0k3V2VRdHJJT2tqUjZ4VFJWTjV1T2llaUUiLCJhdXRoRG9tYWluIjoiaGlnaGxldmVsLWJhY2tlbmQuZmlyZWJhc2VhcHAuY29tIiwiZGF0YWJhc2VVUkwiOiJodHRwczovL2hpZ2hsZXZlbC1iYWNrZW5kLmZpcmViYXNlaW8uY29tIiwicHJvamVjdElkIjoiaGlnaGxldmVsLWJhY2tlbmQiLCJzdG9yYWdlQnVja2V0IjoiaGlnaGxldmVsLWJhY2tlbmQuYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjQzOTQ3MjQ0NDg4NSIsImNkblVybCI6Imh0dHBzOi8vY2RuLm1zZ3NuZHIuY29tIn0=")));
            }
            if (typeof window.dbda == "undefined" || !window.dbda) {
              window.dbda = firebase.firestore(window.appfix);
            }
            if (typeof window.dbda != "undefined" && window.dbda && typeof window.dbda.collection != "undefined") {
              if (_0x136934 && firebase.auth().currentUser) {
                clearInterval(_0x275ea4);
                _0x3ea9e9(firebase.auth().currentUser);
              } else {
                clearInterval(_0x275ea4);
                _0x3ea9e9(window.dbda);
              }
            }
          } catch (_0x590ff4) {}
        }, 0x1f4);
      }
      _0x25904a--;
    });
  });
}
function rest_api_call_v2(_0x384965, _0x5b040b = "POST", _0x411f3e = '', _0x25e5e4 = {}, _0xb3512e = '') {
  let _0xa42701 = getTokenUser();
  return new Promise(async (_0x107ebe, _0xe4c46) => {
    var _0x10b44f = {
      'method': _0x5b040b,
      'headers': {
        'channel': "APP",
        'version': "2021-07-28",
        'source': "WEB_USER",
        'token-id': await window.getToken()
      },
      'redirect': "follow"
    };
    if (typeof _0x411f3e == "object") {
      _0x411f3e = JSON.stringify(_0x411f3e);
    }
    if (_0x411f3e != '' && _0x5b040b.toLowerCase() != 'get') {
      _0x10b44f.body = _0x411f3e;
    }
    try {
      if (_0x25e5e4.hasOwnProperty("location")) {
        _0x384965 = "locations/" + getLocation() + '/' + _0x384965;
      }
      if (_0x5b040b.toLowerCase() == 'get') {
        var _0x31c8c7 = '';
        if (_0x25e5e4.hasOwnProperty("company")) {
          _0x31c8c7 += "companyId=" + _0xa42701.companyId;
        }
        if (_0x31c8c7 != '' || _0x411f3e != '') {
          _0x384965 += (_0x384965.includes('?') ? '&' : '?') + _0x31c8c7;
        }
        if (_0x411f3e != '') {
          _0x384965 += _0x411f3e;
        }
      }
      fetch('https://services.leadconnectorhq.com/' + _0x384965, _0x10b44f).then(_0x973bd8 => _0x973bd8.json()).then(_0x45488c => _0x107ebe(_0x45488c))["catch"](_0x1da23e => _0xe4c46(_0x1da23e));
    } catch (_0x35e20c) {
      _0xe4c46(_0x35e20c);
    }
  });
}

/*rest_call member*/
function rest_api_call_membership(_0x38e1dd, _0x127080 = 'POST', _0x3297ed = '', _0x1ba74b = {}, _0x25b494 = '') {
  let _0x5b9558 = getTokenUser();
  return new Promise(async (_0x2a47de, _0xfb6362) => {
    var _0x5c54ef = {
      'method': _0x127080,
      'headers': {
        'channel': 'APP',
        'version': "2021-07-28",
        'source': "WEB_USER",
        'Authorization': "Bearer " + (await window.getToken())
      },
      'redirect': "follow"
    };
    if (typeof _0x3297ed == "object") {
      _0x3297ed = JSON.stringify(_0x3297ed);
    }
    if (_0x3297ed != '' && _0x127080.toLowerCase() != "get") {
      _0x5c54ef.body = _0x3297ed;
    }
    try {
      if (_0x1ba74b.hasOwnProperty("location")) {
        _0x38e1dd = "locations/" + getLocation() + '/' + _0x38e1dd;
      }
      if (_0x127080.toLowerCase() == "get") {
        var _0x821294 = '';
        if (_0x1ba74b.hasOwnProperty("company")) {
          _0x821294 += "companyId=" + _0x5b9558.companyId;
        }
        if (_0x821294 != '' || _0x3297ed != '') {
          _0x38e1dd += (_0x38e1dd.includes('?') ? '&' : '?') + _0x821294;
        }
        if (_0x3297ed != '') {
          _0x38e1dd += _0x3297ed;
        }
      }
      fetch('https://services.leadconnectorhq.com/' + _0x38e1dd, _0x5c54ef).then(_0x4c1fcf => _0x4c1fcf.json()).then(_0x477b22 => _0x2a47de(_0x477b22))["catch"](_0x31f126 => _0xfb6362(_0x31f126));
    } catch (_0x2f477f) {
      _0xfb6362(_0x2f477f);
    }
  });
}

/*rest_call*/

function rest_api_call(_0x240c12, _0xa60ff4 = "POST", _0x39d7d9 = '', _0x2a300d = {}, _0x2cec08 = '') {
  return new Promise((_0x15a8f5, _0x303d47) => {
    getRequestHeaders(_0x2cec08).then(_0x2df247 => {
      var _0x459cfb = {
        'method': _0xa60ff4,
        'headers': _0x2df247.headers,
        'redirect': "follow"
      };
      if (typeof _0x39d7d9 == "object") {
        _0x39d7d9 = JSON.stringify(_0x39d7d9);
      }
      if (_0x39d7d9 != '' && _0xa60ff4.toLowerCase() != "get") {
        _0x459cfb.body = _0x39d7d9;
      }
      try {
        if (_0x2a300d.hasOwnProperty("location")) {
          _0x240c12 = "locations/" + _0x2df247.locationid + '/' + _0x240c12;
        }
        if (_0xa60ff4.toLowerCase() == "get") {
          var _0x3d5587 = '';
          if (_0x2a300d.hasOwnProperty("company")) {
            _0x3d5587 += "companyId=" + _0x2df247.user.companyId;
          }
          if (_0x3d5587 != '' || _0x39d7d9 != '') {
            _0x240c12 += (_0x240c12.includes('?') ? '&' : '?') + _0x3d5587;
          }
          if (_0x39d7d9 != '') {
            _0x240c12 += _0x39d7d9;
          }
        }
        fetch('https://services.leadconnectorhq.com/' + _0x240c12, _0x459cfb).then(_0x34431e => _0x34431e.json()).then(_0x334567 => {
          if (_0x334567 == "Unauthorized") {
            _0x303d47(_0x334567);
          }
          _0x15a8f5(_0x334567);
        })["catch"](_0x550030 => _0x303d47(_0x550030));
      } catch (_0x41ebfb) {
        _0x303d47(_0x41ebfb);
      }
    })['catch'](_0x13d5a3 => {});
  });
}
function waitElement(_0x1c5c97) {
  return new Promise((_0x19475c, _0x494966) => {
    let _0x411e16 = document.querySelector(_0x1c5c97);
    if (_0x411e16) {
      _0x19475c(_0x411e16);
      return;
    }
    new MutationObserver((_0xf07e12, _0x5d31bf) => {
      [...document.querySelectorAll(_0x1c5c97)].forEach(_0x48cbfc => {
        _0x19475c(_0x48cbfc);
        _0x5d31bf.disconnect();
      });
    }).observe(document.querySelector("#app"), {
      'childList': true,
      'subtree': true
    });
  });
}
function waitElementVue(_0x5147de) {
  return new Promise((_0x1bb739, _0x465a93) => {
    let _0x4c4386 = document.querySelector(_0x5147de);
    if (_0x4c4386 && _0x4c4386.__vue__) {
      _0x1bb739(_0x4c4386);
      return;
    }
    new MutationObserver((_0x19a618, _0x125375) => {
      [...document.querySelectorAll(_0x5147de)].forEach(_0x476e26 => {
        if (_0x476e26.__vue__) {
          _0x1bb739(_0x476e26);
          _0x125375.disconnect();
        }
      });
    }).observe(document.querySelector("#app"), {
      'childList': true,
      'subtree': true
    });
  });
}
function redirect_route(_0x1d22d2, _0x1fb38f = "name", _0x3fdbed = {}) {
  try {
    let _0x37bc30 = document.querySelector("#app");
    let _0x57d089 = {
      [_0x1fb38f]: _0x1d22d2
    };
    try {
      if (_0x1fb38f == "name" && Object.keys(_0x3fdbed).length > 0x0) {
        _0x57d089.params = _0x3fdbed;
      }
    } catch (_0x5e5406) {}
    _0x37bc30.__vue__.$router.push(_0x57d089);
  } catch (_0x1a105c) {
    if (_0x1fb38f == "path") {
      location.href = _0x1d22d2;
    }
  }
}
function getTokenUser() {
  let _0x414275 = fel('a');
  if (_0x414275 == '') {
    _0x414275 = localStorage.getItem('a') || '';
    _0x414275 = _0x414275.replaceAll("\"", '');
  }
  try {
    _0x414275 = JSON.parse(_0x414275);
  } catch (_0x11981c) {
    _0x414275 = JSON.parse(atob(_0x414275));
  } finally {}
  return _0x414275;
}

/*rest 2 call*/
function rest_api_call_v2(_0x811a3e, _0x39e15e = "POST", _0x4bdca7 = '', _0x5a47b4 = {}, _0x56dcb6 = '') {
  let _0xbc33f0 = getTokenUser();
  return new Promise(async (_0x1a6b20, _0x51b2d8) => {
    var _0x209b74 = {
      'method': _0x39e15e,
      'headers': {
        'channel': "APP",
        'version': "2021-07-28",
        'source': "WEB_USER",
        'token-id': await window.getToken()
      },
      'redirect': "follow"
    };
    if (_0x5a47b4?.["json"]) {
      _0x209b74.headers["content-type"] = "application/json";
    }
    if (typeof _0x4bdca7 == "object") {
      _0x4bdca7 = JSON.stringify(_0x4bdca7);
    }
    if (_0x4bdca7 != '' && _0x39e15e.toLowerCase() != "get") {
      _0x209b74.body = _0x4bdca7;
    }
    try {
      if (_0x5a47b4.hasOwnProperty("location")) {
        _0x811a3e = "locations/" + getLocation() + '/' + _0x811a3e;
      }
      if (_0x39e15e.toLowerCase() == "get") {
        var _0x503308 = '';
        if (_0x5a47b4.hasOwnProperty("company")) {
          _0x503308 += "companyId=" + _0xbc33f0.companyId;
        }
        if (_0x503308 != '' || _0x4bdca7 != '') {
          _0x811a3e += (_0x811a3e.includes('?') ? '&' : '?') + _0x503308;
        }
        if (_0x4bdca7 != '') {
          _0x811a3e += _0x4bdca7;
        }
      }
      fetch('https://services.leadconnectorhq.com/' + _0x811a3e, _0x209b74).then(_0x56cbd4 => _0x56cbd4.json()).then(_0x3854fa => _0x1a6b20(_0x3854fa))['catch'](_0x55bf02 => _0x51b2d8(_0x55bf02));
    } catch (_0x31a83f) {
      _0x51b2d8(_0x31a83f);
    }
  });
}
rest_api_call = rest_api_call_v2;