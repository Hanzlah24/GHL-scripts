
(function (_0x588490, _0x149bcc) {
    const _0x7e24f9 = _0x1d56,
      _0x3139de = _0x588490();
    while (!![]) {
      try {
        const _0x4c0235 =
          -parseInt(_0x7e24f9(0x161)) / 0x1 +
          (parseInt(_0x7e24f9(0x162)) / 0x2) *
            (-parseInt(_0x7e24f9(0x14f)) / 0x3) +
          (parseInt(_0x7e24f9(0x150)) / 0x4) *
            (-parseInt(_0x7e24f9(0x178)) / 0x5) +
          -parseInt(_0x7e24f9(0x1a5)) / 0x6 +
          -parseInt(_0x7e24f9(0x185)) / 0x7 +
          (parseInt(_0x7e24f9(0x1b9)) / 0x8) *
            (-parseInt(_0x7e24f9(0x158)) / 0x9) +
          (parseInt(_0x7e24f9(0x182)) / 0xa) * (parseInt(_0x7e24f9(0x1a1)) / 0xb);
        if (_0x4c0235 === _0x149bcc) break;
        else _0x3139de["push"](_0x3139de["shift"]());
      } catch (_0x4bf6c3) {
        _0x3139de["push"](_0x3139de["shift"]());
      }
    }
  })(_0x27b6, 0x5f9cd),
    (() => {
      const _0x1d6e09 = _0x1d56;
      let _0x568f43 = null,
        _0x544d75 = {},
        _0x2c96cd = [],
        _0x33fdf9 = "",
        _0x521ff1 = {},
        _0x1e94bc = "",
        _0x41bcc7 = _0x1d6e09(0x1c2),
        _0x11eb40 = _0x1d6e09(0x1c8);
      window[_0x1d6e09(0x1bb)](_0x1d6e09(0x16c), function (_0x48fc94) {
        setTimeout(function () {
          _0x4a7c9b(_0x26ca90);
        }, 0x3e8);
      });
      function _0xb2d1c3(_0x714414) {
        return new Promise((_0x23fdf0, _0x4c1d45) => {
          const _0x4a00c7 = _0x1d56;
          rest_api_call(
            _0x4a00c7(0x18f) +
              _0x33fdf9 +
              "/" +
              _0x714414 +
              _0x4a00c7(0x17e) +
              getUserId(),
            "DELETE",
            {},
            { json: !![] },
          )
            ["then"]((_0x1d736f) => {
              _0x23fdf0(_0x1d736f);
            })
            ["catch"]((_0x4c89b2) => {
              _0xbbb061(_0x4c89b2), _0x4c1d45(_0x4c89b2);
            });
        });
      }
      function _0x26abc0(_0x3b5360) {
        return new Promise((_0x9ae9b1, _0x5b6fb6) => {
          const _0x149710 = _0x1d56;
          rest_api_call(
            "workflow/" + _0x33fdf9 + "/remove-directory/" + _0x3b5360,
            _0x149710(0x193),
            {},
            { json: !![] },
          )
            [_0x149710(0x1be)]((_0x1ad97c) => {
              _0x9ae9b1(_0x1ad97c);
            })
            ["catch"]((_0x3cce12) => {
              _0xbbb061(_0x3cce12), _0x5b6fb6(_0x3cce12);
            });
        });
      }
      function _0x67bca(
        _0x4ea9e1 = _0x1d6e09(0x1a6),
        _0x375133 = "",
        _0x3932fb = 0x1,
        _0x5e8aa1 = "",
      ) {
        const _0xfe975e = _0x1d6e09;
        console[_0xfe975e(0x196)](_0xfe975e(0x180) + _0x4ea9e1),
          rest_api_call(
            _0xfe975e(0x18f) +
              getLocationId() +
              _0xfe975e(0x16d) +
              _0x4ea9e1 +
              "&limit=" +
              _0x3932fb +
              _0xfe975e(0x1b7),
            "get",
          )
            ["then"]((_0x9ce116) => {
              const _0x44ff74 = _0xfe975e;
              _0x9ce116[_0x44ff74(0x14c)](_0x44ff74(0x149)) &&
                _0x9ce116[_0x44ff74(0x14c)](_0x44ff74(0x153)) &&
                (_0x3932fb == 0x1 && _0x9ce116[_0x44ff74(0x149)] > 0x1
                  ? _0x67bca(_0x4ea9e1, _0x375133, _0x9ce116["count"], _0x5e8aa1)
                  : _0x58eb1b(
                      _0x9ce116[_0x44ff74(0x153)],
                      _0x9ce116[_0x44ff74(0x153)][_0x44ff74(0x1bd)],
                      0x0,
                      _0x4ea9e1,
                      _0x375133,
                      _0x5e8aa1,
                    ));
            })
            [_0xfe975e(0x173)]((_0x4ed16c) => {
              _0xbbb061(_0x4ed16c), reject(_0x4ed16c);
            });
      }
      function _0x534623() {
        const _0x2d121f = _0x1d6e09;
        $(_0x2d121f(0x1c3))[_0x2d121f(0x176)](_0x2d121f(0x15d)),
          $(_0x2d121f(0x1c3))[_0x2d121f(0x169)](_0x11eb40),
          _0x23412f(_0x1e94bc),
          (_0x544d75 = {}),
          (_0x2c96cd = []),
          (_0x521ff1 = {});
      }
      function _0x14704e(_0x1c3054, _0x415111, _0x1c29c8) {
        const _0x5056cc = _0x1d6e09;
        if (_0x415111 == _0x1c29c8) {
          _0x534623();
          return;
        } else {
          let _0x4a7aaa = _0x1c3054[_0x415111] ?? null;
          _0x26abc0(_0x4a7aaa["id"])
            [_0x5056cc(0x1be)]((_0x50844e) => {
              _0x14704e(_0x1c3054, _0x415111 + 0x1, _0x1c29c8);
            })
            ["catch"]((_0x20dc16) => {
              _0x14704e(_0x1c3054, _0x415111 + 0x1, _0x1c29c8);
            });
        }
      }
      let _0x417aa4 = _0x1d6e09(0x168);
      function _0x11bedb(_0x52433f = 0x0, _0x136a6d = 0x0) {
        const _0xd6cd3b = _0x1d6e09;
        if (_0x52433f == _0x136a6d) {
          let _0x5a5ab9 = Object[_0xd6cd3b(0x166)](_0x544d75);
          _0x5a5ab9[_0xd6cd3b(0x1bd)] == 0x0
            ? _0x534623()
            : (_0x5fd7c7(_0xd6cd3b(0x17c)),
              _0x14704e(_0x5a5ab9, 0x0, _0x5a5ab9["length"]));
          return;
        } else {
          _0x52433f == 0x0 &&
            _0x5fd7c7("Flows deletion process started...");
          let _0x4e5e49 = _0x2c96cd[_0x52433f] ?? null;
          _0x4e5e49 &&
            _0xb2d1c3(_0x4e5e49["id"])
              [_0xd6cd3b(0x1be)]((_0x475bb2) => {
                const _0x40def7 = _0xd6cd3b;
                let _0x1368b0 =
                    "Error while deleting " +
                    _0x4e5e49[_0x40def7(0x19d)],
                  _0x182c4f = "",
                  _0x48f268 = "",
                  _0x28526e = _0x4e5e49[_0x40def7(0x160)] ?? "";
                _0x28526e != "" && (_0x182c4f += _0x40def7(0x156) + _0x28526e),
                  (_0x1368b0 += _0x182c4f),
                  _0x475bb2[_0x40def7(0x14c)]("success") &&
                  _0x475bb2[_0x40def7(0x1b4)]
                    ? (_0x48f268 =
                        _0x4e5e49[_0x40def7(0x19d)] +
                        _0x40def7(0x19c) +
                        _0x182c4f +
                        " ")
                    : (_0x475bb2[_0x40def7(0x14c)](_0x40def7(0x1b1)) &&
                        (_0x1368b0 += " - " + _0x475bb2[_0x40def7(0x1b1)]),
                      (_0x48f268 = _0x1368b0)),
                  _0x5fd7c7(_0x48f268),
                  _0x11bedb(_0x52433f + 0x1, _0x136a6d);
              })
              [_0xd6cd3b(0x173)]((_0x76405e) => {
                _0x5fd7c7(error + " - Error : " + _0x76405e),
                  _0x11bedb(_0x52433f + 0x1, _0x136a6d);
              });
        }
        console[_0xd6cd3b(0x196)](_0x2c96cd, _0x544d75);
      }
      function _0x5fd7c7(_0x40e21e) {
        const _0x141c85 = _0x1d6e09;
        _0x40e21e != "" &&
          $(_0x417aa4)[_0x141c85(0x1a8)](
            _0x141c85(0x19e) + _0x40e21e + _0x141c85(0x1c5),
          );
      }
      function _0x58eb1b(
        _0x21dab9,
        _0x8f2b5c,
        _0x3f288f = 0x0,
        _0x1e6c1f,
        _0x4db413 = "",
        _0x348317 = "",
      ) {
        const _0x5e0cfa = _0x1d6e09;
        _0x348317 == "" && (_0x348317 = _0x5e0cfa(0x1a6));
        if (_0x3f288f == _0x8f2b5c) {
          console["log"](_0x5e0cfa(0x1ab), _0x544d75);
          let _0xdf28c6 = Object[_0x5e0cfa(0x1a0)](_0x544d75)[_0x5e0cfa(0x1bd)],
            _0x5884e9 = _0x2c96cd[_0x5e0cfa(0x1bd)];
          if (_0xdf28c6 == 0x0) _0x11bedb(0x0, _0x5884e9);
          else {
            try {
              _0x544d75[_0x348317][_0x5e0cfa(0x17a)] = !![];
            } catch (_0x514a43) {}
            Object[_0x5e0cfa(0x166)](_0x544d75)["every"](
              (_0x527145) => _0x527145["done"],
            ) && _0x11bedb(0x0, _0x5884e9);
          }
          return;
        }
        let _0x3189de = _0x21dab9[_0x3f288f] ?? null;
        if (_0x3189de) {
          if (_0x3189de?.[_0x5e0cfa(0x16f)] == "directory") {
            let _0x4163d9 = _0x3189de["id"] + "-" + _0x3189de[_0x5e0cfa(0x19d)];
            (_0x544d75[_0x4163d9] = {
              id: _0x3189de["id"],
              name:
                _0x3189de[_0x5e0cfa(0x19d)] ??
                _0x3189de[_0x5e0cfa(0x1c9)] ??
                _0x5e0cfa(0x14b),
              folder: _0x4db413,
              parentF: _0x1e6c1f,
              parent: _0x348317,
              done: ![],
            }),
              _0x67bca(_0x3189de["id"], _0x3189de["name"], 0x1, _0x4163d9),
              _0x4db413 != "" && (_0x4db413 = _0x5e0cfa(0x165) + _0x4db413),
              _0x5fd7c7(
                _0x5e0cfa(0x14d) + _0x3189de[_0x5e0cfa(0x19d)] + _0x4db413,
              ),
              _0x58eb1b(
                _0x21dab9,
                _0x8f2b5c,
                _0x3f288f + 0x1,
                _0x1e6c1f,
                _0x4db413,
                _0x348317,
              );
          } else
            _0x2c96cd["push"]({ ..._0x3189de, foldername: _0x4db413 }),
              _0x58eb1b(
                _0x21dab9,
                _0x8f2b5c,
                _0x3f288f + 0x1,
                _0x1e6c1f,
                _0x4db413,
                _0x348317,
              );
        }
      }
      async function _0x4a7c9b(_0x44cf49) {
        const _0xd4c88c = _0x1d6e09;
        var _0x4bdde6 = document[_0xd4c88c(0x172)]("script");
        (_0x4bdde6["id"] = _0xd4c88c(0x1b5)),
          (_0x4bdde6[_0xd4c88c(0x14e)] = _0xd4c88c(0x171)),
          (_0x4bdde6[_0xd4c88c(0x16a)] = async function () {
            _0x44cf49();
          }),
          typeof init_formula_404 === _0xd4c88c(0x1ac)
            ? document[_0xd4c88c(0x1a4)][_0xd4c88c(0x1a8)](_0x4bdde6)
            : _0x44cf49();
      }
      function _0x23412f(_0xfbd7f1 = _0x1d6e09(0x1a6), _0x41bc25 = 0x1) {
        const _0x180fb1 = _0x1d6e09;
        $(_0x180fb1(0x1c7))[_0x180fb1(0x169)](
          "<tr><td colspan="3">Fetching....</td></tr>",
        ),
          rest_api_call(
            _0x180fb1(0x18f) +
              getLocationId() +
              "/list?parentId=" +
              _0xfbd7f1 +
              _0x180fb1(0x18e) +
              _0x41bc25 +
              _0x180fb1(0x1b7),
            "get",
          )
            [_0x180fb1(0x1be)]((_0x3654ca) => {
              const _0x45efc5 = _0x180fb1;
              _0x3654ca["hasOwnProperty"]("count") &&
              _0x3654ca[_0x45efc5(0x14c)]("rows")
                ? _0x41bc25 == 0x1 && _0x3654ca[_0x45efc5(0x149)] > 0x1
                  ? _0x23412f(_0xfbd7f1, _0x3654ca[_0x45efc5(0x149)])
                  : (_0x3654ca[_0x45efc5(0x153)][_0x45efc5(0x1bd)] == 0x0 &&
                      $(_0x45efc5(0x1c7))["html"](_0x45efc5(0x191)),
                    $(_0x45efc5(0x1c7))["html"](""),
                    _0x3654ca[_0x45efc5(0x153)][_0x45efc5(0x194)](
                      (_0x56cf79, _0x525cc3) => {
                        (_0x521ff1[_0x56cf79["id"]] = _0x56cf79),
                          _0x5b2ca3(_0x56cf79);
                      },
                    ))
                : $(_0x45efc5(0x1c7))["html"](
                    "<tr><td colspan="3">Unable to fetch workflows</td></tr>",
                  );
            })
            ["catch"]((_0x5d8492) => {
              _0xbbb061(_0x5d8492);
            });
      }
      function _0xbbb061(_0x138489 = "") {
        const _0x454ba6 = _0x1d6e09;
        console["log"](_0x138489),
          $(".startdelete_wf")[_0x454ba6(0x176)]("disabled"),
          $(_0x454ba6(0x1c3))[_0x454ba6(0x169)](_0x11eb40),
          $(_0x417aa4)[_0x454ba6(0x169)](_0x454ba6(0x192));
      }
      function _0x26ca90() {
        const _0x558ae1 = _0x1d6e09;
        url = location[_0x558ae1(0x1bf)];
        function _0x436043(_0x49766c) {
          const _0x1f16c3 = _0x558ae1;
          location[_0x1f16c3(0x184)] == _0x41bcc7
            ? (window[_0x1f16c3(0x15b)](_0x49766c),
              console[_0x1f16c3(0x196)](_0x1f16c3(0x159)))
            : console["log"](_0x1f16c3(0x1bc));
        }
        _0x436043(function () {
          const _0x175949 = _0x558ae1;
          let _0x1d16a6 = document[_0x175949(0x170)](_0x175949(0x1c4));
          if (_0x1d16a6) {
            _0x568f43 = _0x1d16a6[_0x175949(0x155)](_0x175949(0x1b6));
            let _0x373a3b = _0x1d16a6[_0x175949(0x155)](_0x175949(0x197)) || "";
            try {
              _0x373a3b != "" &&
                typeof user_wf_delete_allowed != _0x175949(0x1ac) &&
                Array[_0x175949(0x18d)](user_wf_delete_allowed) &&
                user_wf_delete_allowed["some"](
                  (_0x3f6db2) => _0x3f6db2 == _0x373a3b,
                ) &&
                (_0x568f43 = _0x175949(0x16e));
            } catch (_0xe49498) {}
          } else console["log"](_0x175949(0x1a7));
          try {
            document[_0x175949(0x170)](_0x175949(0x179))[_0x175949(0x1b0)]();
          } catch (_0xf75d22) {}
          if (!location[_0x175949(0x1bf)][_0x175949(0x1c6)](_0x175949(0x15a)))
            return;
          waitElement(_0x175949(0x17b))[_0x175949(0x1be)]((_0x4da38c) => {
            const _0x1d36e0 = _0x175949;
            $(_0x1d36e0(0x1c3))[_0x1d36e0(0x176)]("disabled"),
              $(_0x1d36e0(0x1c3))[_0x1d36e0(0x169)](_0x11eb40),
              console[_0x1d36e0(0x196)](_0x1d36e0(0x154)),
              $(_0x1d36e0(0x167))[_0x1d36e0(0x188)]("click", _0x1d36e0(0x177)),
              $(_0x1d36e0(0x167))["on"](
                _0x1d36e0(0x148),
                _0x1d36e0(0x177),
                function () {
                  _0x257316();
                },
              ),
              $("body")["off"](_0x1d36e0(0x148), _0x1d36e0(0x1ae)),
              $(_0x1d36e0(0x167))["on"](
                _0x1d36e0(0x148),
                _0x1d36e0(0x1ae),
                function () {
                  _0x257316();
                },
              ),
              document[_0x1d36e0(0x181)](_0x1d36e0(0x1ad))[_0x1d36e0(0x1bd)] ==
                0x0 && $(_0x1d36e0(0x1a4))[_0x1d36e0(0x1a8)](_0x1d36e0(0x163)),
              location[_0x1d36e0(0x1bf)]["includes"](_0x1d36e0(0x157)) &&
                document[_0x1d36e0(0x181)](".workflow_script_sm_delete")[
                  _0x1d36e0(0x1bd)
                ] == 0x0 &&
                (document[_0x1d36e0(0x170)](".topmenu-nav")[_0x1d36e0(0x1aa)](
                  "beforeend",
                  _0x1d36e0(0x1b2),
                ),
                setTimeout(function () {
                  const _0x2d789e = _0x1d36e0;
                  document[_0x2d789e(0x170)](".workflow_script_sm_delete")[
                    "onclick"
                  ] = _0x31cb9f;
                }, 0x320));
          });
        });
      }
      function _0x257316() {
        const _0x5a57b0 = _0x1d6e09;
        $(_0x5a57b0(0x1b3))["css"]("display", _0x5a57b0(0x18a)),
          $(_0x5a57b0(0x1b3))["removeClass"](_0x5a57b0(0x19b));
      }
      function _0x5b2ca3(_0x1a24c8) {
        const _0x2fb1e0 = _0x1d6e09;
        let _0x5b453a =
            _0x1a24c8?.["type"] == "directory"
              ? _0x2fb1e0(0x164)
              : _0x2fb1e0(0x187),
          _0x1ca49a = _0x1a24c8[_0x2fb1e0(0x1c1)] ?? "";
        _0x1a24c8 &&
          document["querySelectorAll"](
            _0x2fb1e0(0x199) + _0x1a24c8[_0x2fb1e0(0x186)],
          )[_0x2fb1e0(0x1bd)] == 0x0 &&
          document[_0x2fb1e0(0x170)](_0x2fb1e0(0x1c7))[_0x2fb1e0(0x1aa)](
            _0x2fb1e0(0x1ca),
            _0x2fb1e0(0x1a9) +
              _0x1a24c8[_0x2fb1e0(0x186)] +
              _0x2fb1e0(0x14a) +
              _0x1a24c8[_0x2fb1e0(0x186)] +
              _0x2fb1e0(0x1b8) +
              _0x1a24c8[_0x2fb1e0(0x186)] +
              _0x2fb1e0(0x17d) +
              _0x1a24c8[_0x2fb1e0(0x16f)] +
              ""
 data-parentId="" +
              _0x1a24c8[_0x2fb1e0(0x1af)] +
              _0x2fb1e0(0x19a) +
              _0x1a24c8["name"] +
              _0x2fb1e0(0x15f) +
              _0x1ca49a +
              ""
                              ></td>
                                <td style="max-width: 350px;" >" +
              (_0x1a24c8[_0x2fb1e0(0x19d)] ?? _0x2fb1e0(0x14b)) +
              "</td>
                                <td style="max-width: 40px;">" +
              _0x5b453a +
              _0x2fb1e0(0x1c0) +
              _0x1ca49a +
              "</td>
                            </tr>
                            ",
          );
      }
      function _0x31cb9f() {
        const _0x311171 = _0x1d6e09;
        if (!![] || _0x568f43 == _0x311171(0x16e)) {
          if (location[_0x311171(0x184)] != _0x41bcc7) return;
          $(_0x417aa4)[_0x311171(0x169)]("");
          function _0x18147d() {
            const _0x5daeee = _0x311171;
            $(_0x5daeee(0x19f))["html"](""),
              document[_0x5daeee(0x181)](_0x5daeee(0x174))["length"] == 0x0 &&
                (document["head"][_0x5daeee(0x1aa)](
                  _0x5daeee(0x1ca),
                  _0x5daeee(0x15e),
                ),
                document[_0x5daeee(0x170)](_0x5daeee(0x175))[_0x5daeee(0x1aa)](
                  _0x5daeee(0x1ca),
                  "<div  class="modal workflow modals_workflows_show_delete" style="display: none;">
    <div  role="document" class="modal-dialog">
        <div  class="modal-content">
            <div  class="modal-header">
                <div  class="modal-header--inner" >
                    <h5  class="modal-title"> Workflows </h5><button
                         type="button" data-dismiss="modal" aria-label="Close" class="close workflow"><span
                             aria-hidden="true">×</span></button>
                </div>
            </div>
            <div  class="modal-body">
                <div  class="modal-body--inner">
                    <div class="hl_settings--body">
    <div class="container-fluid">
        <div class="hl_settings--controls">
            <div class="hl_settings--controls-left">
                <h2>Choose the folder/workflow to delete </h2>
                
            </div>
            <div class="hl_settings--controls-right">
            <button  type="button"
                    class="hl-btn startdelete_wf inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-apple-500 hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apple-500 ">
                     " +
                    _0x11eb40 +
                    _0x5daeee(0x195),
                )),
              (_0x1e94bc = _0x5daeee(0x1a6)),
              location[_0x5daeee(0x1bf)][_0x5daeee(0x1c6)](_0x5daeee(0x18c)) &&
                ((_0x1e94bc = location[_0x5daeee(0x1bf)][_0x5daeee(0x17f)](
                  _0x5daeee(0x18c),
                )[0x1]),
                (_0x1e94bc = _0x1e94bc["split"]("&")[0x0] ?? _0x1e94bc),
                (_0x1e94bc = _0x1e94bc[_0x5daeee(0x17f)]("?")[0x0] ?? _0x1e94bc),
                _0x1e94bc == "" && (_0x1e94bc = _0x5daeee(0x1a6))),
              (_0x33fdf9 = getLocationId()),
              _0x23412f(_0x1e94bc),
              $(_0x5daeee(0x167))[_0x5daeee(0x188)](
                _0x5daeee(0x183),
                _0x5daeee(0x18b),
              ),
              $(_0x5daeee(0x167))["on"](
                _0x5daeee(0x183),
                _0x5daeee(0x18b),
                function () {
                  const _0x28c58a = _0x5daeee;
                  let _0x29e593 = this["checked"];
                  document[_0x28c58a(0x181)](_0x28c58a(0x1a3))[_0x28c58a(0x194)](
                    (_0x8d2c8b) => {
                      const _0xb3971c = _0x28c58a;
                      (_0x8d2c8b[_0xb3971c(0x189)] = _0x29e593),
                        _0x8d2c8b["dispatchEvent"](new Event(_0xb3971c(0x183)));
                    },
                  );
                },
              ),
              $(".modals_workflows_show_delete")["css"](
                _0x5daeee(0x15c),
                _0x5daeee(0x1ba),
              ),
              $(_0x5daeee(0x174))[_0x5daeee(0x151)](_0x5daeee(0x19b)),
              $("body")[_0x5daeee(0x188)](_0x5daeee(0x148), _0x5daeee(0x1c3)),
              $(_0x5daeee(0x167))["on"](
                _0x5daeee(0x148),
                _0x5daeee(0x1c3),
                function () {
                  const _0x132ffa = _0x5daeee;
                  if (!confirm("Are you sure want to delete?"))
                    return;
                  $(_0x417aa4)["html"]("");
                  let _0x3a6803 = $(this);
                  var _0x1f1a95 = document[_0x132ffa(0x181)](_0x132ffa(0x1a2));
                  if (_0x1f1a95[_0x132ffa(0x1bd)] == 0x0) {
                    $(_0x417aa4)["html"](_0x132ffa(0x190));
                    return;
                  }
                  _0x3a6803[_0x132ffa(0x152)](_0x132ffa(0x15d), _0x132ffa(0x15d)),
                    _0x3a6803[_0x132ffa(0x169)](_0x132ffa(0x16b));
                  let _0x446fac = [];
                  _0x1f1a95[_0x132ffa(0x194)]((_0x7a1c3a, _0x33f869) => {
                    const _0x1ad23a = _0x132ffa;
                    let _0x5707cf = _0x7a1c3a[_0x1ad23a(0x155)]("data-id");
                    _0x446fac[_0x1ad23a(0x198)]({
                      id: _0x5707cf,
                      name: _0x7a1c3a["getAttribute"]("data-name"),
                      type: _0x7a1c3a[_0x1ad23a(0x155)]("data-type"),
                      status: "",
                    }),
                      _0x33f869 == _0x1f1a95[_0x1ad23a(0x1bd)] - 0x1 &&
                        _0x58eb1b(
                          _0x446fac,
                          _0x446fac[_0x1ad23a(0x1bd)],
                          0x0,
                          _0x1e94bc,
                          "",
                          _0x1e94bc,
                        );
                  });
                },
              );
          }
          _0x18147d();
        }
      }
      _0x4a7c9b(_0x26ca90);
    })();
  function _0x1d56(_0x282dbb, _0x1d438e) {
    const _0x27b61f = _0x27b6();
    return (
      (_0x1d56 = function (_0x1d56c3, _0x2de96c) {
        _0x1d56c3 = _0x1d56c3 - 0x148;
        let _0x49343d = _0x27b61f[_0x1d56c3];
        return _0x49343d;
      }),
      _0x1d56(_0x282dbb, _0x1d438e)
    );
  }
