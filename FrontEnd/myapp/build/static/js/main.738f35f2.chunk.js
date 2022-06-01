(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    105: function (e, t, a) {},
    108: function (e, t, a) {},
    152: function (e, t, a) {
      e.exports = a(190);
    },
    190: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        c = a(57),
        l = a.n(c),
        s = a(19),
        o = (a(105), a(38), a(61), a(229)),
        u = a(232),
        i = a(224),
        m = a(227),
        p = a(230),
        h = a(231),
        f = a(228);
      function b(e) {
        return "$ " + e.toFixed(2);
      }
      function d(e) {
        return (
          console.log(e.data),
          n.createElement(
            m.a,
            { component: f.a },
            n.createElement(
              o.a,
              { sx: { minWidth: 100 }, "aria-label": "simple table" },
              n.createElement(
                p.a,
                null,
                n.createElement(
                  h.a,
                  null,
                  n.createElement(i.a, null, "Stock Name"),
                  n.createElement(i.a, { align: "right" }, "Price"),
                  n.createElement(i.a, { align: "right" })
                )
              ),
              n.createElement(
                u.a,
                null,
                e.data.map(function (t) {
                  return n.createElement(
                    h.a,
                    {
                      key: t.name,
                      sx: { "&:last-child td, &:last-child th": { border: 0 } },
                    },
                    n.createElement(
                      i.a,
                      { component: "th", scope: "row" },
                      n.createElement(s.b, { to: "/dynamic/" + t.name }, t.name)
                    ),
                    n.createElement(i.a, { align: "right" }, b(t.price)),
                    n.createElement(
                      i.a,
                      { align: "right" },
                      n.createElement(
                        "button",
                        {
                          onClick: function () {
                            return e.removeFromWL(t);
                          },
                          type: "button",
                          class: "btn btn-outline-primary",
                        },
                        "Remove"
                      )
                    )
                  );
                })
              )
            )
          )
        );
      }
      var E = a(5),
        v = a.n(E),
        g = a(15),
        y = a(12),
        k = a(9),
        w = a(77),
        O = a(78),
        x = a(82),
        S = a(79),
        N = a(83),
        j = a(29),
        C = a(113),
        I = a(55),
        L = a(40),
        _ = a(20),
        F = a(37),
        T = a(22),
        q = a.n(T),
        D = (function (e) {
          function t(e) {
            var a;
            return (
              Object(w.a)(this, t),
              ((a = Object(x.a)(this, Object(S.a)(t).call(this, e))).state = {
                name: "",
                numberOfShares: null,
              }),
              (a.handleNumberChange = a.handleNumberChange.bind(
                Object(j.a)(Object(j.a)(a))
              )),
              (a.handleNameChange = a.handleNameChange.bind(
                Object(j.a)(Object(j.a)(a))
              )),
              (a.handleSubmit = a.handleSubmit.bind(
                Object(j.a)(Object(j.a)(a))
              )),
              a
            );
          }
          return (
            Object(N.a)(t, e),
            Object(O.a)(t, [
              {
                key: "handleNumberChange",
                value: function (e) {
                  var t = e.target.value;
                  this.setState({ numberOfShares: t });
                },
              },
              {
                key: "handleNameChange",
                value: function (e) {
                  var t = e.target;
                  this.setState({ name: t.value });
                },
              },
              {
                key: "validTicker",
                value: (function () {
                  var e = Object(g.a)(
                    v.a.mark(function e(t) {
                      var a, n;
                      return v.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                q.a.get(
                                  "https://finnhub.io/api/v1/quote?symbol="
                                    .concat(t.toUpperCase())
                                    .concat("&token=")
                                    .concat("c9482oqad3if4j4v81qg")
                                )
                              );
                            case 2:
                              return (
                                (a = e.sent),
                                (n = parseFloat(a.data.c)),
                                console.log("price"),
                                console.log(n),
                                e.abrupt("return", n)
                              );
                            case 7:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "handleSubmit",
                value: (function () {
                  var e = Object(g.a)(
                    v.a.mark(function e(t) {
                      var a;
                      return v.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  (t.preventDefault(),
                                  "" === this.state.name ||
                                    null == this.state.numberOfShares)
                                ) {
                                  e.next = 12;
                                  break;
                                }
                                if (
                                  !(
                                    isNaN(this.state.numberOfShares) ||
                                    this.state.numberOfShares <= 0 ||
                                    parseInt(this.state.numberOfShares) !==
                                      parseFloat(this.state.numberOfShares)
                                  )
                                ) {
                                  e.next = 5;
                                  break;
                                }
                                return (
                                  alert(
                                    "Please enter a positive whole number."
                                  ),
                                  e.abrupt("return")
                                );
                              case 5:
                                if (
                                  !0 !==
                                  window.confirm(
                                    "Buy "
                                      .concat(
                                        this.state.numberOfShares,
                                        " shares of "
                                      )
                                      .concat(this.state.name, "?")
                                  )
                                ) {
                                  e.next = 10;
                                  break;
                                }
                                return (
                                  (e.next = 8),
                                  this.validTicker(this.state.name)
                                );
                              case 8:
                                0 !== (a = e.sent)
                                  ? (q.a.patch(
                                      "http://localhost:4000/users/".concat(
                                        this.props.userId
                                      ),
                                      {
                                        portfolioAddition: {
                                          name: this.state.name,
                                          numShares: parseInt(
                                            this.state.numberOfShares
                                          ),
                                        },
                                        watchListAddition: "",
                                      }
                                    ),
                                    q.a.put(
                                      "http://localhost:4000/purchase_hist/".concat(
                                        this.props.userId
                                      ),
                                      {
                                        purchase: {
                                          ticker: this.state.name,
                                          price: a,
                                        },
                                      }
                                    ),
                                    console.log("Adding to portfolio list"),
                                    alert(
                                      "Bought " +
                                        this.state.numberOfShares +
                                        " shares of " +
                                        this.state.name
                                    ))
                                  : alert("Invalid stock name");
                              case 10:
                                e.next = 13;
                                break;
                              case 12:
                                alert("Enter a stock to buy");
                              case 13:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      I.a,
                      null,
                      r.a.createElement(
                        "main",
                        null,
                        r.a.createElement(
                          L.a,
                          null,
                          r.a.createElement(
                            _.a,
                            null,
                            r.a.createElement(
                              "nav",
                              null,
                              r.a.createElement(
                                s.b,
                                { to: "/portfolio" },
                                r.a.createElement(
                                  "button",
                                  {
                                    type: "submit",
                                    class: "btn btn-primary w-50",
                                  },
                                  "Portfolio"
                                )
                              )
                            )
                          ),
                          r.a.createElement(
                            _.a,
                            null,
                            r.a.createElement("h2", null, "Buy Stock")
                          ),
                          r.a.createElement(
                            _.a,
                            null,
                            r.a.createElement("h2", null, " ")
                          )
                        )
                      )
                    ),
                    r.a.createElement(
                      I.a,
                      null,
                      r.a.createElement(
                        F.a,
                        { onSubmit: this.handleSubmit },
                        r.a.createElement(
                          F.a.Group,
                          { className: "mb-3" },
                          r.a.createElement(F.a.Label, null, "Stock Name"),
                          r.a.createElement("input", {
                            class: "form-control",
                            rows: "1",
                            placeholder: "StockName",
                            value: this.state.name,
                            onChange: this.handleNameChange,
                          }),
                          r.a.createElement(
                            F.a.Text,
                            { className: "text-muted" },
                            "Confidential Buying Service"
                          )
                        ),
                        r.a.createElement(
                          F.a.Group,
                          { className: "mb-3", controlId: "formBasicPassword" },
                          r.a.createElement(
                            F.a.Label,
                            null,
                            "Number of Shares"
                          ),
                          r.a.createElement("input", {
                            class: "form-control",
                            rows: "1",
                            placeholder: "Number of Shares",
                            value: this.state.numberOfShares,
                            onChange: function (t) {
                              return e.handleNumberChange(t);
                            },
                          })
                        ),
                        r.a.createElement(
                          C.a,
                          { variant: "primary", type: "submit" },
                          "Submit"
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(r.a.Component),
        P = (function (e) {
          function t(e) {
            var a;
            return (
              Object(w.a)(this, t),
              ((a = Object(x.a)(this, Object(S.a)(t).call(this, e))).state = {
                name: "",
                numberOfShares: null,
              }),
              (a.handleNumberChange = a.handleNumberChange.bind(
                Object(j.a)(Object(j.a)(a))
              )),
              (a.handleNameChange = a.handleNameChange.bind(
                Object(j.a)(Object(j.a)(a))
              )),
              (a.handleSubmit = a.handleSubmit.bind(
                Object(j.a)(Object(j.a)(a))
              )),
              a
            );
          }
          return (
            Object(N.a)(t, e),
            Object(O.a)(t, [
              {
                key: "handleNumberChange",
                value: function (e) {
                  var t = e.target.value;
                  this.setState({ numberOfShares: t });
                },
              },
              {
                key: "handleNameChange",
                value: function (e) {
                  var t = e.target;
                  this.setState({ name: t.value });
                },
              },
              {
                key: "handleSubmit",
                value: (function () {
                  var e = Object(g.a)(
                    v.a.mark(function e(t) {
                      return v.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  (t.preventDefault(),
                                  "" === this.state.name ||
                                    null == this.state.numberOfShares)
                                ) {
                                  e.next = 18;
                                  break;
                                }
                                if (
                                  !(
                                    isNaN(this.state.numberOfShares) ||
                                    this.state.numberOfShares <= 0 ||
                                    parseInt(this.state.numberOfShares) !==
                                      parseFloat(this.state.numberOfShares)
                                  )
                                ) {
                                  e.next = 5;
                                  break;
                                }
                                return (
                                  alert(
                                    "Please enter a positive whole number."
                                  ),
                                  e.abrupt("return")
                                );
                              case 5:
                                if (
                                  !0 !==
                                  window.confirm(
                                    "Sell "
                                      .concat(
                                        this.state.numberOfShares,
                                        " shares of "
                                      )
                                      .concat(this.state.name, "?")
                                  )
                                ) {
                                  e.next = 16;
                                  break;
                                }
                                return (
                                  (e.prev = 6),
                                  (e.next = 9),
                                  q.a.put(
                                    "http://localhost:4000/users/".concat(
                                      this.props.userId
                                    ),
                                    {
                                      portfolioSub: {
                                        name: this.state.name,
                                        numShares: parseInt(
                                          this.state.numberOfShares
                                        ),
                                      },
                                      watchListSub: "",
                                    }
                                  )
                                );
                              case 9:
                                e.sent,
                                  alert(
                                    "Sold " +
                                      this.state.numberOfShares +
                                      " shares of " +
                                      this.state.name
                                  ),
                                  (e.next = 16);
                                break;
                              case 13:
                                (e.prev = 13),
                                  (e.t0 = e.catch(6)),
                                  alert(
                                    "DO NOT OWN " +
                                      this.state.name +
                                      ", Sell a stock that you own"
                                  );
                              case 16:
                                e.next = 19;
                                break;
                              case 18:
                                alert("Enter a stock to sell ");
                              case 19:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[6, 13]]
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      I.a,
                      null,
                      r.a.createElement(
                        "main",
                        null,
                        r.a.createElement(
                          L.a,
                          null,
                          r.a.createElement(
                            _.a,
                            null,
                            r.a.createElement(
                              "nav",
                              null,
                              r.a.createElement(
                                s.b,
                                { to: "/portfolio" },
                                r.a.createElement(
                                  "button",
                                  {
                                    type: "submit",
                                    class: "btn btn-primary w-50",
                                  },
                                  "Portfolio"
                                )
                              )
                            )
                          ),
                          r.a.createElement(
                            _.a,
                            null,
                            r.a.createElement("h2", null, "Sell Stock")
                          ),
                          r.a.createElement(
                            _.a,
                            null,
                            r.a.createElement("h2", null, " ")
                          )
                        )
                      )
                    ),
                    r.a.createElement(
                      I.a,
                      null,
                      r.a.createElement(
                        F.a,
                        { onSubmit: this.handleSubmit },
                        r.a.createElement(
                          F.a.Group,
                          { className: "mb-3" },
                          r.a.createElement(F.a.Label, null, "Stock Name"),
                          r.a.createElement("input", {
                            class: "form-control",
                            rows: "1",
                            placeholder: "StockName",
                            value: this.state.name,
                            onChange: this.handleNameChange,
                          }),
                          r.a.createElement(
                            F.a.Text,
                            { className: "text-muted" },
                            "Confidential Exchange Service"
                          )
                        ),
                        r.a.createElement(
                          F.a.Group,
                          { className: "mb-3" },
                          r.a.createElement(
                            F.a.Label,
                            null,
                            "Number of Shares"
                          ),
                          r.a.createElement("input", {
                            class: "form-control",
                            rows: "1",
                            placeholder: "Number of Shares",
                            value: this.state.numberOfShares,
                            onChange: function (t) {
                              return e.handleNumberChange(t);
                            },
                          })
                        ),
                        r.a.createElement(
                          C.a,
                          { variant: "primary", type: "submit" },
                          "Submit"
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(r.a.Component);
      a(108);
      function A(e) {
        var t = Object(n.useState)({}),
          a = Object(y.a)(t, 2),
          c = a[0],
          l = a[1],
          o = Object(n.useState)(!1),
          u = Object(y.a)(o, 2),
          i = u[0],
          m = u[1],
          p = { uname: "invalid username", pass: "invalid password" };
        function h() {
          return (h = Object(g.a)(
            v.a.mark(function t(a) {
              var n, r, c, s;
              return v.a.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        a.preventDefault(),
                        (n = document.forms[0]),
                        (r = n.uname),
                        (c = n.pass),
                        (t.next = 4),
                        q.a
                          .post("http://localhost:4000/login", {
                            name: r.value,
                            pwd: c.value,
                          })
                          .catch(function (e) {
                            return console.log("caught 401 error"), e.response;
                          })
                      );
                    case 4:
                      (s = t.sent) &&
                        (200 === s.status
                          ? (e.setId(s.data.id),
                            console.log("ID in the login"),
                            console.log(s.data.id),
                            e.setName(s.data.name),
                            e.setToken(s.data.token),
                            console.log(s),
                            m(!0))
                          : 401 === s.status &&
                            ("Unauthorized Username" === s.data.error
                              ? l({ name: "uname", message: p.uname })
                              : l({ name: "pass", message: p.pass })));
                    case 6:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        var f = function (e) {
            return (
              e === c.name &&
              r.a.createElement("div", { className: "error" }, c.message)
            );
          },
          b = r.a.createElement(
            "div",
            { className: "form" },
            r.a.createElement(
              "form",
              {
                onSubmit: function (e) {
                  return h.apply(this, arguments);
                },
              },
              r.a.createElement(
                "div",
                { className: "input-container" },
                r.a.createElement("label", null, "Username "),
                r.a.createElement("input", {
                  type: "text",
                  name: "uname",
                  required: !0,
                }),
                f("uname")
              ),
              r.a.createElement(
                "div",
                { className: "input-container" },
                r.a.createElement("label", null, "Password "),
                r.a.createElement("input", {
                  type: "password",
                  name: "pass",
                  required: !0,
                }),
                f("pass")
              ),
              r.a.createElement(
                "div",
                { className: "button-container" },
                r.a.createElement("input", { type: "submit" })
              )
            )
          );
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(
            L.a,
            null,
            r.a.createElement(_.a, null),
            r.a.createElement(
              _.a,
              null,
              r.a.createElement("h2", null, "Welcome")
            ),
            r.a.createElement(
              _.a,
              null,
              r.a.createElement(
                "p",
                null,
                "Don't have an account?\xa0",
                r.a.createElement(s.b, { to: "/signup" }, "Sign Up")
              )
            )
          ),
          r.a.createElement(
            "div",
            { className: "app" },
            r.a.createElement(
              "div",
              { className: "login-form" },
              r.a.createElement("div", { className: "title" }, "Sign In"),
              i
                ? r.a.createElement(
                    "div",
                    null,
                    "User is successfully logged in"
                  )
                : b
            )
          )
        );
      }
      function U(e) {
        var t = Object(n.useState)({}),
          a = Object(y.a)(t, 2),
          c = a[0],
          l = a[1],
          o = Object(n.useState)(!1),
          u = Object(y.a)(o, 2),
          i = u[0],
          m = u[1],
          p = { fail: "failed to create user", exists: "user exists already" };
        function h() {
          return (h = Object(g.a)(
            v.a.mark(function t(a) {
              var n, r, c, s;
              return v.a.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        a.preventDefault(),
                        (n = document.forms[0]),
                        (r = n.uname),
                        (c = n.pass),
                        (t.next = 4),
                        q.a
                          .post("http://localhost:4000/signup", {
                            name: r.value,
                            pwd: c.value,
                          })
                          .catch(function (e) {
                            return console.log("caught error"), e.response;
                          })
                      );
                    case 4:
                      (s = t.sent),
                        console.log(s),
                        s &&
                          (201 === s.status
                            ? (e.setId(s.data.id),
                              e.setName(s.data.name),
                              m(!0))
                            : 409 === s.status
                            ? l({ name: "exists", message: p.exists })
                            : l({ name: "fail", message: p.fail }));
                    case 7:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        var f = function (e) {
            return (
              e === c.name &&
              r.a.createElement("div", { className: "error" }, c.message)
            );
          },
          b = r.a.createElement(
            "div",
            { className: "form" },
            r.a.createElement(
              "form",
              {
                onSubmit: function (e) {
                  return h.apply(this, arguments);
                },
              },
              r.a.createElement(
                "div",
                { className: "input-container" },
                r.a.createElement("label", null, "Username "),
                r.a.createElement("input", {
                  type: "text",
                  name: "uname",
                  required: !0,
                })
              ),
              r.a.createElement(
                "div",
                { className: "input-container" },
                r.a.createElement("label", null, "Password "),
                r.a.createElement("input", {
                  type: "password",
                  name: "pass",
                  required: !0,
                }),
                f("exists"),
                f("fail")
              ),
              r.a.createElement(
                "div",
                { className: "button-container" },
                r.a.createElement("input", { type: "submit" })
              )
            )
          );
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(
            L.a,
            null,
            r.a.createElement(_.a, null, r.a.createElement("nav", null)),
            r.a.createElement(
              _.a,
              null,
              r.a.createElement("h2", null, "Welcome")
            ),
            r.a.createElement(
              _.a,
              null,
              r.a.createElement(
                "p",
                null,
                "Already have an account?\xa0",
                r.a.createElement(s.b, { to: "/login" }, "Log In")
              )
            )
          ),
          r.a.createElement(
            "div",
            { className: "app" },
            r.a.createElement(
              "div",
              { className: "login-form" },
              r.a.createElement(
                "div",
                { className: "title" },
                "Sign Up for Account"
              ),
              i
                ? r.a.createElement(
                    "div",
                    null,
                    "User was successfully created"
                  )
                : b
            )
          )
        );
      }
      var W = a(47);
      function B(e, t) {
        return { name: e, price: t };
      }
      function V(e) {
        var t = Object(k.f)();
        function a(e) {
          return c.apply(this, arguments);
        }
        function c() {
          return (c = Object(g.a)(
            v.a.mark(function e(t) {
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        q.a.get(
                          "https://finnhub.io/api/v1/quote?symbol="
                            .concat(t)
                            .concat("&token=")
                            .concat("c9482oqad3if4j4v81qg")
                        )
                      );
                    case 2:
                      return e.abrupt("return", e.sent);
                    case 3:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function l(e) {
          return s.apply(this, arguments);
        }
        function s() {
          return (s = Object(g.a)(
            v.a.mark(function e(t) {
              var n;
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), a(t.toUpperCase());
                    case 2:
                      return (
                        (n = e.sent),
                        console.log(n),
                        e.abrupt("return", parseFloat(n.data.c))
                      );
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function o(e) {
          return u.apply(this, arguments);
        }
        function u() {
          return (u = Object(g.a)(
            v.a.mark(function e(t) {
              var a, n;
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        q.a.get(
                          "https://finnhub.io/api/v1/quote?symbol="
                            .concat(t.toUpperCase())
                            .concat("&token=")
                            .concat("c9482oqad3if4j4v81qg")
                        )
                      );
                    case 2:
                      return (
                        (a = e.sent),
                        (n = parseFloat(a.data.c)),
                        console.log("price"),
                        console.log(n),
                        e.abrupt("return", n)
                      );
                    case 7:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function i() {
          return (i = Object(g.a)(
            v.a.mark(function t(a) {
              var n, r;
              return v.a.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((n = a.target.watch.value),
                        console.log(n),
                        a.preventDefault(),
                        -1 ===
                          f.findIndex(function (e) {
                            return e.name === n;
                          }))
                      ) {
                        t.next = 6;
                        break;
                      }
                      return alert("Already on watchlist"), t.abrupt("return");
                    case 6:
                      if ("" === e.userId) {
                        t.next = 18;
                        break;
                      }
                      return (t.next = 9), o(n);
                    case 9:
                      if (((r = t.sent), console.log(r), 0 == r)) {
                        t.next = 17;
                        break;
                      }
                      return (
                        b([].concat(Object(W.a)(f), [{ name: n, price: r }])),
                        (t.next = 15),
                        q.a.patch(
                          "http://localhost:4000/users/".concat(e.userId),
                          { watchListAddition: n }
                        )
                      );
                    case 15:
                      t.next = 18;
                      break;
                    case 17:
                      alert("Invalid stock name");
                    case 18:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        function m() {
          return (m = Object(g.a)(
            v.a.mark(function t(a) {
              var n;
              return v.a.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        console.log(a),
                        (n = (n = [].concat(f)).filter(function (e) {
                          return e !== a;
                        })),
                        console.log(n),
                        b(n),
                        (t.next = 7),
                        q.a.put(
                          "http://localhost:4000/users/".concat(e.userId),
                          { watchListSub: a.name }
                        )
                      );
                    case 7:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        Object(n.useEffect)(function () {
          function a() {
            return (a = Object(g.a)(
              v.a.mark(function e(a) {
                var n, r, c, s;
                return v.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (a.userId) {
                          e.next = 4;
                          break;
                        }
                        return (
                          t("/login", { replace: !0 }),
                          window.alert("Please login to view your watchlist!"),
                          e.abrupt("return")
                        );
                      case 4:
                        return (
                          (e.next = 6),
                          fetch(
                            "http://localhost:4000/users/".concat(a.userId)
                          ).then(function (e) {
                            return e.json();
                          })
                        );
                      case 6:
                        (n = e.sent), (r = []), (c = 0);
                      case 9:
                        if (!(c < n.users_list.watchList.length)) {
                          e.next = 17;
                          break;
                        }
                        return (e.next = 12), l(n.users_list.watchList[c]);
                      case 12:
                        (s = e.sent), r.push(B(n.users_list.watchList[c], s));
                      case 14:
                        c++, (e.next = 9);
                        break;
                      case 17:
                        b(r);
                      case 18:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          !(function (e) {
            a.apply(this, arguments);
          })(e);
        }, []);
        var p = Object(n.useState)([]),
          h = Object(y.a)(p, 2),
          f = h[0],
          b = h[1];
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(
            "main",
            null,
            r.a.createElement("h2", null, "Watchlist"),
            r.a.createElement(
              "p",
              null,
              "Here you can track the stocks that you are currently interested in"
            ),
            r.a.createElement(
              "form",
              {
                onSubmit: function (e) {
                  return i.apply(this, arguments);
                },
              },
              r.a.createElement(
                "div",
                { class: "mb-3" },
                r.a.createElement(
                  "label",
                  { class: "form-label" },
                  "Add a stock to your watchlist"
                ),
                r.a.createElement("input", {
                  name: "watch",
                  type: "text",
                  class: "form-control",
                  placeholder: "Enter a stock ticker...",
                }),
                r.a.createElement(
                  "button",
                  { type: "submit", class: "btn btn-outline-primary" },
                  "Add To Watchlist"
                )
              )
            )
          ),
          r.a.createElement(d, {
            data: f,
            removeFromWL: function (e) {
              return m.apply(this, arguments);
            },
          })
        );
      }
      function G() {
        var e = Object(n.useState)(""),
          t = Object(y.a)(e, 2),
          a = t[0],
          c = t[1];
        function l() {
          return (l = Object(g.a)(
            v.a.mark(function e(t) {
              var a, n, r;
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        console.log(t.target.ticker.value),
                        t.preventDefault(),
                        (a = t.target.ticker.value.toUpperCase()),
                        (e.next = 5),
                        s(a)
                      );
                    case 5:
                      (n = e.sent),
                        (r = "The value of "
                          .concat(a)
                          .concat(" is ")
                          .concat(b(n))),
                        c(r);
                    case 8:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function s(e) {
          return o.apply(this, arguments);
        }
        function o() {
          return (o = Object(g.a)(
            v.a.mark(function e(t) {
              var a;
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        q.a.get(
                          "https://finnhub.io/api/v1/quote?symbol="
                            .concat(t)
                            .concat("&token=")
                            .concat("c9482oqad3if4j4v81qg")
                        )
                      );
                    case 2:
                      return (
                        (a = e.sent), e.abrupt("return", parseFloat(a.data.c))
                      );
                    case 4:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(
            "main",
            null,
            r.a.createElement("h2", null, "StockCheck"),
            r.a.createElement(
              "form",
              {
                onSubmit: function (e) {
                  return l.apply(this, arguments);
                },
              },
              r.a.createElement(
                "div",
                { className: "mb-3" },
                r.a.createElement(
                  "label",
                  { className: "form-label" },
                  "Ticker"
                ),
                r.a.createElement("input", {
                  name: "ticker",
                  type: "text",
                  className: "form-control",
                  placeholder: "Enter a ticker...",
                }),
                r.a.createElement(
                  "button",
                  { type: "submit", className: "btn btn-outline-primary" },
                  "Check Price"
                )
              )
            ),
            r.a.createElement("p", null, a)
          ),
          r.a.createElement("div", { id: "root" })
        );
      }
      var K = a(134),
        Y = a.n(K),
        z = (function () {
          var e = Object(g.a)(
            v.a.mark(function e(t) {
              var a, n, r;
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (a = "bd3acfdfd632484dad130887f49f8ceb"),
                        console.log(a),
                        (e.next = 4),
                        fetch(
                          "https://newsapi.org/v2/everything?q="
                            .concat(t, "%20stock&sortBy=publishedAt&apiKey=")
                            .concat(a)
                        )
                      );
                    case 4:
                      return (n = e.sent), (e.next = 7), n.json();
                    case 7:
                      return (r = e.sent), e.abrupt("return", r);
                    case 9:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        H = a(219),
        R = a(226),
        X = a(221),
        J = a(225),
        M = function (e) {
          var t = e.article;
          return r.a.createElement(
            X.a.Item,
            { style: { padding: 30 } },
            r.a.createElement(
              J.a,
              null,
              r.a.createElement(
                J.a.Column,
                {
                  width: 11,
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  },
                },
                r.a.createElement(R.a, { as: "h3" }, t.title),
                r.a.createElement(
                  X.a.Description,
                  { style: { margin: "20px 0" } },
                  t.description
                ),
                r.a.createElement(
                  X.a,
                  { bulleted: !0, horizontal: !0 },
                  r.a.createElement(
                    X.a.Item,
                    null,
                    r.a.createElement("a", { href: t.url }, t.source.name)
                  ),
                  r.a.createElement(X.a.Item, null, t.publishedAt.split("T")[0])
                )
              )
            )
          );
        },
        Q = function (e) {
          return (
            console.log(e),
            r.a.createElement(
              X.a,
              { divided: !0, style: { maxWidth: 900, margin: "0 auto" } },
              e.articles.map(function (e, t) {
                return r.a.createElement(M, { article: e, key: e.title + t });
              })
            )
          );
        },
        Z = (function (e) {
          function t(e) {
            var a;
            return (
              Object(w.a)(this, t),
              ((a = Object(x.a)(this, Object(S.a)(t).call(this, e))).state = {
                stockChartXValues: [],
                stockChartYValues: [],
                ticker: a.props.symbol,
                articles: [],
                apiError: "",
              }),
              a
            );
          }
          return (
            Object(N.a)(t, e),
            Object(O.a)(t, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(g.a)(
                    v.a.mark(function e() {
                      var t;
                      return v.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  this.fetchStock(),
                                  (e.prev = 1),
                                  (e.next = 4),
                                  z(this.state.ticker)
                                );
                              case 4:
                                (t = e.sent),
                                  this.setState({ articles: t.articles }),
                                  (e.next = 11);
                                break;
                              case 8:
                                (e.prev = 8),
                                  (e.t0 = e.catch(1)),
                                  this.setState({
                                    apiError: "Could not find anything",
                                  });
                              case 11:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[1, 8]]
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "fetchStock",
                value: function () {
                  var e = this;
                  console.log(e);
                  var t =
                      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
                        .concat(this.state.ticker)
                        .concat("&outputsize=compact&apikey=")
                        .concat("RZEXR5SFIKLQNKYK"),
                    a = [],
                    n = [];
                  fetch(t)
                    .then(function (e) {
                      return console.log(e), e.json();
                    })
                    .then(function (t) {
                      for (var r in (console.log(t), t["Time Series (Daily)"]))
                        a.push(r),
                          n.push(t["Time Series (Daily)"][r]["1. open"]);
                      e.setState({
                        stockChartXValues: a,
                        stockChartYValues: n,
                      });
                    });
                },
              },
              {
                key: "render",
                value: function () {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(Y.a, {
                      data: [
                        {
                          x: this.state.stockChartXValues,
                          y: this.state.stockChartYValues,
                          type: "scatter",
                          mode: "lines+markers",
                          marker: { color: "red" },
                        },
                      ],
                      layout: { width: 780, height: 440 },
                    }),
                    r.a.createElement(
                      H.a,
                      null,
                      r.a.createElement(
                        R.a,
                        {
                          as: "h2",
                          style: { textAlign: "center", margin: 20 },
                        },
                        "News about ",
                        this.state.ticker
                      ),
                      this.state.articles.length > 0 &&
                        r.a.createElement(Q, { articles: this.state.articles }),
                      this.state.apiError &&
                        r.a.createElement(
                          "p",
                          null,
                          "Could not fetch any articles. Please try again."
                        )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(r.a.Component);
      function $(e, t, a, n, r) {
        return {
          name: e,
          shares: t,
          totalValue: a,
          price: n,
          percent_change: r,
        };
      }
      function ee(e) {
        var t,
          a = Object(n.useState)([]),
          c = Object(y.a)(a, 2),
          l = c[0],
          d = c[1],
          E = Object(k.f)();
        function w(e) {
          return O.apply(this, arguments);
        }
        function O() {
          return (O = Object(g.a)(
            v.a.mark(function e(t) {
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        q.a.get(
                          "https://finnhub.io/api/v1/quote?symbol="
                            .concat(t)
                            .concat("&token=")
                            .concat("c9482oqad3if4j4v81qg")
                        )
                      );
                    case 2:
                      return e.abrupt("return", e.sent);
                    case 3:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        function x(e) {
          return S.apply(this, arguments);
        }
        function S() {
          return (S = Object(g.a)(
            v.a.mark(function e(t) {
              var a;
              return v.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), w(t.toUpperCase());
                    case 2:
                      return (
                        (a = e.sent),
                        console.log(a),
                        e.abrupt("return", parseFloat(a.data.c))
                      );
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        return (
          Object(n.useEffect)(function () {
            function t() {
              return (t = Object(g.a)(
                v.a.mark(function e(t) {
                  var a, n, r, c, l, s, o;
                  return v.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (t.userId) {
                            e.next = 4;
                            break;
                          }
                          return (
                            E("/login", { replace: !0 }),
                            window.alert(
                              "Please login to view your portfolio!"
                            ),
                            e.abrupt("return")
                          );
                        case 4:
                          return (
                            (e.next = 6),
                            fetch(
                              "http://localhost:4000/users/".concat(t.userId)
                            ).then(function (e) {
                              return e.json();
                            })
                          );
                        case 6:
                          (a = e.sent), (n = []), (r = 0);
                        case 9:
                          if (!(r < a.users_list.portfolioList.length)) {
                            e.next = 22;
                            break;
                          }
                          return (
                            (e.next = 12), x(a.users_list.portfolioList[r].name)
                          );
                        case 12:
                          (c = e.sent),
                            (l = a.users_list.purchase_history),
                            console.log(
                              "Purchase History ",
                              a.users_list.purchase_history
                            ),
                            (s = 0),
                            void 0 === l
                              ? (s = 0)
                              : -1 !==
                                  (o = l.findIndex(function (e) {
                                    return (
                                      e.ticker ===
                                      a.users_list.portfolioList[r].name
                                    );
                                  })) &&
                                ((l = l[o].price), (s = ((c - l) / l) * 100)),
                            console.log("percent change ", s),
                            n.push(
                              $(
                                a.users_list.portfolioList[r].name,
                                a.users_list.portfolioList[r].numShares,
                                a.users_list.portfolioList[r].numShares * c,
                                c,
                                s
                              )
                            );
                        case 19:
                          r++, (e.next = 9);
                          break;
                        case 22:
                          d(n);
                        case 23:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )).apply(this, arguments);
            }
            !(function (e) {
              t.apply(this, arguments);
            })(e);
          }, []),
          r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(
              I.a,
              null,
              r.a.createElement(
                L.a,
                null,
                r.a.createElement(
                  _.a,
                  null,
                  r.a.createElement(_.a, null),
                  r.a.createElement(
                    "nav",
                    null,
                    r.a.createElement(
                      s.b,
                      { to: "/buy" },
                      r.a.createElement(
                        "button",
                        { type: "submit", className: "btn btn-primary w-25" },
                        "Buy"
                      )
                    ),
                    r.a.createElement(
                      s.b,
                      { to: "/sell" },
                      r.a.createElement(
                        "button",
                        { type: "submit", className: "btn btn-primary w-25" },
                        "Sell"
                      )
                    )
                  )
                ),
                r.a.createElement(
                  _.a,
                  null,
                  r.a.createElement("h2", null, "Portfolio")
                ),
                r.a.createElement(_.a, null)
              )
            ),
            r.a.createElement(
              I.a,
              null,
              r.a.createElement(
                "p",
                null,
                "Here all your stocks are listed out"
              ),
              ((t = l),
              console.log("Graphing data: " + JSON.stringify(t)),
              n.createElement(
                m.a,
                { component: f.a },
                n.createElement(
                  o.a,
                  { sx: { minWidth: 100 }, "aria-label": "simple table" },
                  n.createElement(
                    p.a,
                    null,
                    n.createElement(
                      h.a,
                      null,
                      n.createElement(i.a, null, "Stock Name"),
                      n.createElement(
                        i.a,
                        { align: "right" },
                        "Number Of Shares"
                      ),
                      n.createElement(i.a, { align: "right" }, "Current Price"),
                      n.createElement(i.a, { align: "right" }, "Total Value"),
                      n.createElement(i.a, { align: "right" }, "Percent Change")
                    )
                  ),
                  n.createElement(
                    u.a,
                    null,
                    t.map(function (e) {
                      return n.createElement(
                        h.a,
                        {
                          key: e.name,
                          sx: {
                            "&:last-child td, &:last-child th": { border: 0 },
                          },
                        },
                        n.createElement(
                          i.a,
                          { component: "th", scope: "row" },
                          n.createElement(
                            s.b,
                            { to: "/dynamic/" + e.name },
                            e.name
                          )
                        ),
                        n.createElement(i.a, { align: "right" }, e.shares),
                        n.createElement(i.a, { align: "right" }, b(e.price)),
                        n.createElement(
                          i.a,
                          { align: "right" },
                          b(e.totalValue)
                        ),
                        n.createElement(
                          i.a,
                          {
                            align: "right",
                            style: {
                              color: e.percent_change >= 0 ? "green" : "red",
                            },
                          },
                          (t = e.percent_change) < 0
                            ? "" + t.toFixed(2)
                            : t > 0
                            ? "+" + t.toFixed(2)
                            : t.toFixed(2)
                        )
                      );
                      var t;
                    })
                  )
                )
              ))
            )
          )
        );
      }
      var te = a(222);
      function ae(e) {
        var t = Object(k.g)().ticker;
        return r.a.createElement(
          "div",
          null,
          r.a.createElement("h1", null, t),
          r.a.createElement(Z, { symbol: t })
        );
      }
      function ne(e) {
        function t() {
          return (t = Object(g.a)(
            v.a.mark(function t() {
              return v.a.wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      e.setId(""), e.setName(""), e.setToken("");
                    case 3:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(
            L.a,
            null,
            r.a.createElement(
              _.a,
              null,
              r.a.createElement(
                "h2",
                null,
                "Are you sure you want to log out of ",
                e.userName,
                "?"
              )
            )
          ),
          r.a.createElement(L.a, null),
          r.a.createElement(
            "nav",
            null,
            r.a.createElement(
              s.b,
              { to: "/" },
              r.a.createElement(
                "button",
                {
                  type: "submit",
                  class: "btn btn-primary w-25",
                  onClick: function () {
                    return t.apply(this, arguments);
                  },
                },
                "Log me out"
              )
            ),
            r.a.createElement(
              s.b,
              { to: "/" },
              r.a.createElement(
                "button",
                { type: "submit", class: "btn btn-primary w-25" },
                "Keep me logged in!"
              )
            )
          )
        );
      }
      a(129).config();
      var re = function () {
        var e = Object(n.useState)(""),
          t = Object(y.a)(e, 2),
          a = t[0],
          c = t[1],
          l = Object(n.useState)(""),
          o = Object(y.a)(l, 2),
          u = o[0],
          i = o[1],
          m = Object(te.a)(["auth_token"]),
          p = Object(y.a)(m, 2),
          h = p[0],
          f = p[1],
          b = Object(n.useState)(""),
          d = Object(y.a)(b, 1)[0];
        function E(e) {
          f("auth_token", e, { path: "/" });
        }
        function w() {
          return (w = Object(g.a)(
            v.a.mark(function e() {
              var t, a;
              return v.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (t = {
                            headers: {
                              Authorization: "Bearer ".concat(h.auth_token),
                            },
                          }),
                          (e.next = 4),
                          q.a.get("http://localhost:4000/users", t)
                        );
                      case 4:
                        return (
                          (a = e.sent),
                          console.log(a),
                          console.log(a.data.users_list),
                          e.abrupt("return", a.data.users_list)
                        );
                      case 10:
                        return (
                          (e.prev = 10),
                          (e.t0 = e.catch(0)),
                          console.log(e.t0),
                          e.abrupt("return", !1)
                        );
                      case 14:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 10]]
              );
            })
          )).apply(this, arguments);
        }
        function O(e) {
          c(e);
        }
        function x(e) {
          i(e);
        }
        return (
          Object(n.useEffect)(
            function () {
              (function () {
                return w.apply(this, arguments);
              })().then(function (e) {
                e && (console.log(e._id), O(e._id), x(e.name));
              });
            },
            [h]
          ),
          r.a.createElement(
            "div",
            { className: "App" },
            r.a.createElement(
              "nav",
              { className: "navbar navbar-expand-lg navbar-light bg-light" },
              r.a.createElement(
                s.b,
                { to: "/", className: "navbar-brand" },
                "NOTTINGHAM"
              ),
              r.a.createElement(
                "button",
                {
                  className: "navbar-toggler",
                  type: "button",
                  "data-toggle": "collapse",
                  "data-target": "#navbarNavDropdown",
                  "aria-controls": "navbarNavDropdown",
                  "aria-expanded": "false",
                  "aria-label": "Toggle navigation",
                },
                r.a.createElement("span", { className: "navbar-toggler-icon" })
              ),
              r.a.createElement(
                "div",
                {
                  className: "collapse navbar-collapse",
                  id: "navbarNavDropdown",
                },
                r.a.createElement(
                  "ul",
                  { className: "navbar-nav" },
                  r.a.createElement(
                    "li",
                    { className: "nav-item" },
                    r.a.createElement(
                      s.b,
                      { to: "/portfolio", className: "nav-link" },
                      "Portfolio"
                    )
                  ),
                  r.a.createElement(
                    "li",
                    { className: "nav-item" },
                    r.a.createElement(
                      s.b,
                      { to: "/watchlist", className: "nav-link" },
                      "Watchlist"
                    )
                  ),
                  r.a.createElement(
                    "li",
                    { className: "nav-item" },
                    r.a.createElement(
                      s.b,
                      { to: "/stockcheck", className: "nav-link" },
                      "StockCheck"
                    )
                  )
                )
              ),
              r.a.createElement(
                "div",
                {
                  class:
                    "navbar navbar-expand-lg navbar-light bg-light text-right",
                },
                r.a.createElement(
                  "ul",
                  { className: "navbar-nav" },
                  r.a.createElement(
                    "li",
                    { className: "nav-item active" },
                    r.a.createElement(
                      s.b,
                      { to: u ? "/logout" : "/login", className: "nav-link" },
                      u || "Login"
                    )
                  )
                )
              )
            ),
            r.a.createElement(
              k.c,
              null,
              r.a.createElement(k.a, { path: "/" }),
              r.a.createElement(k.a, {
                path: "portfolio",
                element: r.a.createElement(ee, { userId: a }),
              }),
              r.a.createElement(k.a, {
                path: "watchlist",
                element: r.a.createElement(V, { userId: a }),
              }),
              r.a.createElement(k.a, {
                path: "stockcheck",
                element: r.a.createElement(G, null),
              }),
              r.a.createElement(k.a, {
                path: "login",
                element: r.a.createElement(A, {
                  userId: a,
                  setId: O,
                  setName: x,
                  setToken: E,
                }),
              }),
              r.a.createElement(k.a, {
                path: "logout",
                element: r.a.createElement(ne, {
                  userId: a,
                  setId: O,
                  setName: x,
                  setToken: E,
                }),
              }),
              r.a.createElement(k.a, {
                path: "signup",
                element: r.a.createElement(U, {
                  userId: a,
                  setId: O,
                  setName: x,
                }),
              }),
              r.a.createElement(k.a, {
                path: "buy",
                element: r.a.createElement(D, { userId: a }),
              }),
              r.a.createElement(k.a, {
                path: "sell",
                element: r.a.createElement(P, { userId: a }),
              }),
              r.a.createElement(k.a, {
                path: "/dynamic/:ticker",
                element: r.a.createElement(ae, { ticker: d }),
              })
            ),
            r.a.createElement("div", null)
          )
        );
      };
      a(129).config();
      var ce = function () {
          return r.a.createElement("div", null, r.a.createElement(re, null));
        },
        le = function (e) {
          e &&
            e instanceof Function &&
            a
              .e(3)
              .then(a.bind(null, 233))
              .then(function (t) {
                var a = t.getCLS,
                  n = t.getFID,
                  r = t.getFCP,
                  c = t.getLCP,
                  l = t.getTTFB;
                a(e), n(e), r(e), c(e), l(e);
              });
        };
      l.a.render(
        r.a.createElement(s.a, null, r.a.createElement(ce, null)),
        document.getElementById("root")
      ),
        le();
    },
    61: function (e, t, a) {},
  },
  [[152, 1, 2]],
]);
//# sourceMappingURL=main.738f35f2.chunk.js.map
