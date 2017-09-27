define("map/js/suggest", function(require, e) {
        return function(t, a, n) {
            String.trim || (String.prototype.trim = function() {
                for (var e = this, e = e.replace(/^\s\s*/, ""), t = /\s/, a = e.length; t.test(e.charAt(--a)););
                return e.slice(0, a + 1)
            }), String.replaceTpl || (String.prototype.replaceTpl = function(e) {
                return this.replace(/#\{([^}]*)\}/gm, function(t, a) {
                    return t = e[a.trim()]
                })
            }), String.htmlEncode || (String.prototype.htmlEncode = function() {
                return String(this).replace(/\x26/g, "&amp;").replace(/\x3c/g, "&lt;").replace(/\x3E/g, "&gt;").replace(/\x22/g, "&quot;").replace(/\x27/g, "&#39;").replace(/\xA9/g, "&copy;")
            });
            var i = " ",
                r = null,
                o = /<[^>]+>/g,
                s = document.documentElement.classList !== n,
                l = /\w/.test("İ"),
                c = l && !t.XMLHttpRequest,
                u = a.documentMode && 9 === a.documentMode,
                d = function(e) {
                    if (e) {
                        var t, a = e.split("."),
                            n = a.length,
                            i = window,
                            r = 0;
                        if (n > 1)
                            for (; n - 1 > r; r++) t = a[r], i = 0 === r && i[t] ? i[t] : t in i ? i[t] : i[t] = {};
                        return i
                    }
                },
                f = s ? function(e, t) {
                    return e.classList.contains(t)
                } : function(e, t) {
                    return -1 < (i + e.className + i).indexOf(i + t + i)
                },
                m = s ? function(e, t) {
                    e.classList.add(t)
                } : function(e, t) {
                    f(e, t) || (e.className += (e.className ? i : "") + t)
                },
                g = s ? function(e, t) {
                    e.classList.remove(t)
                } : function(e, t) {
                    if (f(e, t)) {
                        var a = new RegExp("(\\s|^)" + t + "(\\s|$)");
                        e.className = e.className.replace(a, i)
                    }
                },
                p = a.addEventListener ? function(e, t, a) {
                    e.addEventListener(t, a, !1)
                } : function(e, t, a) {
                    e.attachEvent("on" + t, a)
                },
                h = function(e, a, n) {
                    p(e, a, function(e) {
                        e = e || t.event;
                        var a = e.srcElement || e.target;
                        n.call(a, e)
                    })
                },
                _ = l ? function(e, t) {
                    return t = t.replace(/\-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    }), e.currentStyle[t]
                } : function(e, t) {
                    return a.defaultView.getComputedStyle(e, null).getPropertyValue(t)
                },
                v = function(e, t) {
                    if (!(this instanceof v)) return new v(e, t);
                    var i = this;
                    i.el = e + "" === e ? a.getElementById(e) : e, i.el && (i.o = {
                        classNameWrap: t.classNameWrap || "sug-wrap",
                        classNameQuery: t.classNameQuery,
                        classNameQueryNull: t.classNameQueryNull,
                        classNameSelect: t.classNameSelect || "sug-select",
                        classNameClose: t.classNameClose || "sug-close",
                        classNameShim: t.classNameShim || "sug-shim",
                        locAbs: t.locAbs || !1,
                        pressDelay: t.pressDelay === n ? 3 : t.pressDelay,
                        autoFocus: t.autoFocus || !1,
                        delay: t.delay || 200,
                        n: t.n || 10,
                        t: t.t || !0,
                        autoCompleteData: t.autoCompleteData || !1,
                        url: t.url || !1,
                        charset: t.charset,
                        callbackFn: t.callbackFn || !1,
                        callbackName: t.callbackName || !1,
                        callbackDataKey: t.callbackDataKey || !1,
                        callbackDataNum: t.callbackDataNum || !1,
                        requestQuery: t.requestQuery || !1,
                        requestParas: t.requestParas || {},
                        noSubmit: t.noSubmit || !1,
                        onSelect: t.onSelect,
                        onSearchDirect: t.onSearchDirect,
                        onCheckForm: t.onCheckForm,
                        onKeySelect: t.onKeySelect,
                        onMouseSelect: t.onMouseSelect,
                        onShow: t.onShow,
                        onHide: t.onHide,
                        onFill: t.onFill,
                        onRequest: t.onRequest,
                        onSucess: t.onSucess,
                        onError: t.onError,
                        onQueryChange: t.onQueryChange,
                        onKeyEsc: t.onKeyEsc,
                        customUrl: t.customUrl || !1,
                        templ: t.templ || !1,
                        autoCache: t.autoCache || !1
                    }, i.wrap = i.el.parentNode, i.init())
                },
                b = v.prototype;
            b.init = function() {
                var e = this,
                    t = e.o;
                if (e.layoutInit(), e.reset(), e.inputHandle(), t.autoFocus && setTimeout(function() {
                    e.el.focus()
                }, 16), !t.autoCompleteData) {
                    var a = t.callbackFn,
                        n = d(a, !0),
                        i = a.split("."),
                        r = i.pop();
                    e.callback = function(t) {
                        t = t || {};
                        var n = arguments.callee;
                        e = a && n.repeat ? n.context || e : e, e.o.onSucess && e.o.onSucess.call(e);
                        var i = e.o.callbackDataKey || e.o.callbackDataNum,
                            r = i ? t[i] : t;
                        return r && r.length ? (e.fill(t, e.q), e.show(), void(e.o.autoCache && (e.cache[e.q] = t))) : (e.hide(1), void(e.isHide = !1))
                    }, n[r] ? n[r].repeat = !0 : a && (n[r] = e.callback)
                }
            }, b.reset = function(e) {
                var t, a = this;
                for (t in e) a.o[t] = e[t];
                a.cache = {}, a.q = "", a.s = r, a.i = -1, a.val = "", a.inputTimer(), a.isHide = !1, a.hide(1)
            }, b.layoutInit = function() {
                var e = this,
                    t = e.o,
                    n = t.locAbs ? a.body : e.wrap,
                    i = e.sugWrap = a.createElement("div");
                if (e.el.setAttribute("autocomplete", "off"), c) {
                    var r = e.shim = i.appendChild(a.createElement("iframe"));
                    r.src = "about:blank", m(r, t.classNameShim), r.frameBorder = 0, r.scrolling = "no", e.content = i.appendChild(i.cloneNode(null))
                } else e.content = i;
                m(i, t.classNameWrap), !t.locAbs && "static" === _(n, "position") && (n.style.position = "relative"), n.appendChild(i)
            }, b.show = function() {
                this.sugWrap.style.display = "", this.o.onShow && this.o.onShow.call(this)
            }, b.hide = function(e) {
                var t = this;
                t.sugWrap.style.display = "none", t.q = t.el.value, 2 != e && (t.s = r, t.i = -1), 1 == e && t.fill(), t.o.onHide && t.o.onHide.call(t)
            }, b.holdFocus = function(e, a) {
                a.preventDefault ? a.preventDefault() : e.onbeforedeactivate = function() {
                    t.event.returnValue = !1, e.onbeforedeactivate = null
                }
            }, b.inputTimer = function(e) {
                var t, a = this,
                    n = a.el,
                    i = a.t;
                if (e) {
                    if (i || !a.o.autoCompleteData && !a.o.url) return;
                    a.t = setInterval(function() {
                        return t = n.value, t.trim() ? (t !== a.q ? a.updata(t) : a.val = t, void(a.o.onQueryChange && a.o.onQueryChange.call(a, !!t.trim()))) : (a.hide(1), a.q = t, void(a.o.onQueryChange && a.o.onQueryChange.call(a)))
                    }, a.o.delay)
                } else i && clearInterval(a.t), a.t = 0
            }, b.getIndex = function(e, t) {
                for (var a = t.length; a--;)
                    if (t[a] === e) return a;
                return -1
            }, b.matchEl = function(e, t, a) {
                for (; e !== t;) {
                    if (a.call(e)) return e;
                    e = e.parentNode
                }
                return r
            }, b.submitForm = function() {
                var e = this.el.form;
                e.onsubmit ? e.onsubmit() : (this.o.onCheckForm && this.o.onCheckForm(e), e.submit())
            }, b.keydownMove = function(e) {
                var t = this,
                    a = t.sugWrap.getElementsByTagName("OL")[0];
                if (a) {
                    if (t.isHide) return void(t.isHide = !1);
                    var i, s = a.getElementsByTagName("LI"),
                        l = s.length,
                        c = t.el,
                        u = t.s,
                        d = t.o,
                        f = d.classNameSelect,
                        p = t.q || "";
                    u && (g(u, f), t.i = t.getIndex(u, s), t.s = r), t.i === n && (t.index = -1), -1 !== t.i && g(s[t.i], f), 40 === e ? t.i++ : 38 === e && t.i--, -2 === t.i ? t.i = l - 1 : t.i === l ? (c.value = p, t.i = -1) : -1 === t.i && (c.value = p), -1 !== t.i && t.i !== l ? (i = s[t.i], m(i, f), d.onKeySelect && d.onKeySelect.call(t, i), !d.autoCompleteData && (c.value = i.getAttribute("q").replace(o, "")), t.s = i) : (40 === e || 38 === e) && d.onKeySelect && d.onKeySelect.call(t, s[0], !0)
                }
            }, b.inputHandle = function() {
                var e, t = this,
                    a = t.o,
                    n = t.el,
                    i = (n.form, t.sugWrap),
                    r = a.classNameSelect,
                    s = a.autoCompleteData,
                    c = 0;
                n.onkeypress = function(a) {
                    a = a || window.event, e = a.keyCode;
                    var n = t.s ? t.s.getElementsByTagName("a")[0] : null,
                        i = "";
                    13 === e && n && (i = n.getAttribute("href"), t.el.blur(), window.open(i), a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                }, n.onkeydown = function(r) {
                    if (r = r || window.event, e = r.keyCode, 27 === e) return t.hide(2), i.getElementsByTagName("ol")[0] && (t.isHide = !0), !s && (n.value = t.q), t.inputTimer(), t.o.onKeyEsc && t.o.onKeyEsc.call(t), !1;
                    if (e > 32 && 41 > e) n.value || "none" !== i.style.display ? (40 === e || 38 === e) && (a.pressDelay && 0 !== c++ ? c === a.pressDelay && (c = 0) : (t.isHide && t.show(), t.keydownMove(e), t.inputTimer()), !l && r.preventDefault()) : n.blur();
                    else if (13 === e) {
                        if (t.inputTimer(), t.hide(2), a.onSelect && a.onSelect.call(t), t.s && f(t.s, "sug-url") && a.onSearchDirect && a.onSearchDirect(t.s, n.value, t.val), s) return n.value = t.s ? t.s.getAttribute("q").replace(o, "") : "", t.o.onFill && t.o.onFill.call(t), !1;
                        if (a.noSubmit) return !1
                    } else {
                        if (e > 8 && 19 > e) return void(9 !== e && t.holdFocus(n, r));
                        t.inputTimer(1)
                    }
                }, p(n, "keyup", function() {
                    c = 0
                }), p(n, "blur", function() {
                    t.hide(2), i.getElementsByTagName("ol")[0] && (t.isHide = !0), t.inputTimer()
                }), h(i, "mouseover", function() {
                    var e = t.matchEl(this, i, function() {
                        return "LI" === this.tagName
                    });
                    e && (t.s && g(t.s, r), m(e, r), t.s = e)
                }), h(i, "mouseout", function() {
                    var e = t.matchEl(this, i, function() {
                        return "LI" === this.tagName
                    });
                    "LI" === this.tagName && this !== e && g(e, r)
                }), p(i, "mousedown", function(e) {
                    t.inputTimer(), t.holdFocus(n, e)
                }), h(i, "mouseup", function(e) {
                    var r, s = i.getElementsByTagName("OL")[0];
                    if (!(!s || e.which && e.which > 2 || e.button && 1 !== e.button && 4 !== e.button) && (f(this, a.classNameClose) && t.hide(), r = t.matchEl(this, i, function() {
                        return "LI" === this.tagName
                    }))) {
                        if (n.value = r.getAttribute("q").replace(o, ""), t.hide(), t.inputTimer(), a.onSelect && a.onSelect.call(t, r), t.i = t.getIndex(r, s.getElementsByTagName("LI")), t.o.onFill && t.o.onFill.call(t), f(r, "sug-url")) return a.onSearchDirect && a.onSearchDirect(r, n.value, t.val), !0;
                        a.onMouseSelect && a.onMouseSelect.call(t, r), !a.autoCompleteData && !a.noSubmit && t.submitForm()
                    }
                })
            }, b.fill = function(e, t) {
                var a = this,
                    i = a.content;
                if (arguments.length < 2) return void(i.innerHTML = "");
                var r = a.o,
                    o = r.templ,
                    s = r.classNameQueryNull,
                    l = r.classNameQuery;
                this.content.innerHTML = o ? o.call(a, e, t) : function() {
                    e = e[r.callbackDataKey || r.callbackDataNum] || [];
                    var a, i = 0,
                        o = Math.min(e.length, r.n),
                        c = [];
                    for (t = t.trim(); o > i; i++) a = e[i], a !== n && c.push('<li q="' + a + '"' + (s && a.indexOf(t) > -1 ? "" : " class=" + s) + ">" + (l ? a.replace(t, '<span class="' + l + '">' + t + "</span>") : a) + "</li>");
                    return "<ol>" + c.join("") + "</ol>"
                }()
            }, b.updata = function(e) {
                var t = this,
                    a = t.o.autoCompleteData || t.cache[e];
                if (t.q = e, t.i = -1, t.isHide = !1, a !== n) {
                    if (t.o.autoCompleteData && !a.length) return;
                    return t.fill(a, e), void t.show()
                }
                t.request(e)
            }, b.request = function(e) {
                var t, i, o = this,
                    s = o.o,
                    c = s.callbackFn,
                    f = s.callbackName,
                    m = s.onSucess,
                    g = s.onError,
                    p = s.onRequest,
                    h = o.callback,
                    _ = encodeURIComponent,
                    v = s.url,
                    b = s.customUrl,
                    y = s.requestParas,
                    $ = [];
                if (c) {
                    var C = d(c),
                        S = c.split(".").pop();
                    C[S] = o.callback, C[S].repeat && (C[S].context = o)
                } else f && (i = o.script, i.readyState ? i.onreadystatechange = function() {
                    ("loaded" == i.readyState || "complete" == i.readyState) && (i.onreadystatechange = r, m && m.call(o), h(f))
                } : i.onload = function() {
                    m && m.call(o), h(f)
                }); if (g && (o.script.onerror = function() {
                    g.call(o)
                }), !o.script || !l || u) {
                    var x = a.getElementsByTagName("script")[0];
                    i = a.createElement("script"), i.type = "text/javascript", i.async = !0, o.script ? x.parentNode.replaceChild(i, o.script) : x.parentNode.insertBefore(i, x), o.script = i
                }
                p && p.call(this), y = function() {
                    for (t in y)(i = y[t]) !== n && $.push(_(t) + "=" + _(y[t]));
                    return s.t && $.push(_("t") + "=" + _(+new Date)), $.join("&")
                }(), o.script.charset = s.charset ? s.charset : "", o.script.src = b && b.call(o, y) || v + "?" + s.requestQuery + "=" + encodeURIComponent(e) + "&" + y, o.val = e
            }, e = v
        }(window, document), e
    }), define("map/js/scroll", function(require, e) {
        ! function(e, t, a, n) {
            if (a) {
                var i = "WebKitCSSMatrix" in e && "m11" in new WebKitCSSMatrix,
                    r = function(e, t) {
                        var n = this;
                        n.$el = e, n.el = e[0], n.$parent = n.$el.parent(), n.state = {}, n.args = a.extend({
                            wheelSpeed: 20,
                            pressDelay: 200,
                            watch: 200,
                            dir: "",
                            autoHide: !0,
                            activateClass: "mod-scroll--activate",
                            customClass: "",
                            preventDefaultWheel: !1,
                            controller: {
                                barX: "bar-x",
                                barY: "bar-y",
                                thumbX: "thumb-x",
                                thumbY: "thumb-y"
                            }
                        }, t), n.init()
                    },
                    o = r.prototype;
                o.init = function() {
                    var e = this,
                        i = e.$el,
                        r = e.$parent,
                        o = e.$wrap = a("<div>");
                    a.map(e.args.controller, function(t, n) {
                        o.append(e.state["$" + n] = a('<div class="mod-scroll_' + t + '"></div>'))
                    }), e.updateState(), e.initLayout(), "static" === r.css("position") && r.css({
                        position: "relative"
                    }), e.state.autoHide && (o.css({
                        display: "none"
                    }), r.on("mouseenter", function() {
                        o.css({
                            display: "block"
                        })
                    }).on("mouseleave", function() {
                        !e.state.draging && o.css({
                            display: "none"
                        })
                    })), r.css({
                        overflow: "hidden"
                    }).append(o).on(t.onmousewheel !== n ? "mousewheel" : "DOMMouseScroll", function(t) {
                        e.wheelHandle.call(i, t, e)
                    }), o.addClass("mod-scroll " + e.args.customClass).on("mousedown", function(t) {
                        t.preventDefault(), e.mouseHandle.call(t.target, t, e)
                    }), 0 != e.args.watch && (e.resizeTimer = setInterval(function() {
                        e.detectLayout() && e.resizeHandle.call(e)
                    }, e.args.watch)), e.args.onInit && e.args.onInit.call(e)
                }, o.updateState = function() {
                    var n = this,
                        i = n.$el,
                        r = n.$parent,
                        o = a.extend(n.state, {
                            dir: function(a, i) {
                                return n.args.dir = a.currentStyle ? a.currentStyle[i] : function() {
                                    var n = "";
                                    return n = e && e.getComputedStyle(a, null) ? e.getComputedStyle(a, null).getPropertyValue(i) : t.documentElement.dir, n || "ltr"
                                }(), "ltr" === n.args.dir
                            }(n.el, "direction"),
                            autoHide: 1 == n.args.autoHide,
                            H: r.height(),
                            h: i.outerHeight(),
                            W: r.width(),
                            w: i.outerWidth(),
                            x: n.state.x || 0,
                            y: n.state.y || 0
                        }),
                        s = function(e, t) {
                            return Math.floor(Math.min(Math.pow(e, 2) / t, e))
                        };
                    n.state = a.extend(o, {
                        _x: Math.max(o.w - o.W, 0),
                        _y: Math.max(o.h - o.H, 0),
                        _w: s(o.W, o.w),
                        _h: s(o.H, o.h)
                    })
                }, o.initLayout = function() {
                    var e = this,
                        t = e.state,
                        a = (e.$el, e.$parent, e.$wrap, {}),
                        n = t.W < t.w,
                        i = t.H < t.h;
                    a[t.dir ? "right" : "left"] = 0, a.display = i ? "block" : "none", t.$barY.css(a), t.$thumbY.css(a).css({
                        height: t._h + "px"
                    }), a = {}, a[t.dir ? "left" : "right"] = 0, a.display = n ? "block" : "none", t.$barX.css(a), t.$thumbX.css(a).css({
                        width: t._w + "px"
                    })
                }, o.moveThumb = function(e) {
                    var t = this,
                        a = t.state;
                    t.scrollTo(a.$thumbX, {
                        x: Math.floor(-a.x * a.W / a.w),
                        y: 0
                    }, e), t.scrollTo(a.$thumbY, {
                        x: 0,
                        y: Math.floor(-a.y * a.H / a.h)
                    }, e)
                }, o.resizeHandle = function() {
                    var e = this;
                    e.state;
                    e.updateState(), e.moveThumb(), e.initLayout()
                }, o.selectable = function(e, t) {
                    return t || a("body").css("user-select", e ? "none" : "text").attr("unselectable", e ? "on" : "off")[e ? "on" : "off"]("selectstart.scroll", !1)
                }, o.mouseHandle = function(e, n) {
                    var i, r = a(this),
                        o = n.state,
                        s = "x",
                        l = o.w,
                        c = o.W,
                        u = {
                            x: 0,
                            y: 0
                        },
                        d = o.$thumbX,
                        f = !1,
                        m = 0,
                        g = function() {
                            var t;
                            o[s] = n.fixPos(o[s] + c * (("y" === s ? e.pageY - r.offset().top > Math.max(parseFloat(o.$thumbY.css("marginTop")), o.$thumbY.position().top) : e.pageX - r.offset().left > Math.max(parseFloat(o.$thumbX.css("marginLeft")), o.$thumbX.position().left)) ? -1 : 1), s), n.scrollTo(n.$el, {
                                x: o.x,
                                y: o.y
                            }), u[s] = Math.floor(-o[s] * c / l), n.scrollTo(d, u), t = ("x" === s ? e.pageX - r.offset().left : e.pageY - r.offset().top) - u[s], t = t > 0 ? t > ("x" === s ? o._w : o._h) : 0 > t, n.args.onScroll && n.args.onScroll.call(n, e), t || (f = !1, m = 1, n.$wrap.removeClass(n.args.activateClass), n.args.onEndPress && n.args.onEndPress.call(n)), f && setTimeout(function() {
                                f && g()
                            }, n.args.pressDelay)
                        };
                    (this === o.$thumbY[0] || this === o.$barY[0]) && (s = "y", l = o.h, c = o.H, d = o.$thumbY), this === o.$thumbX[0] || this === o.$thumbY[0] ? (i = {
                        x: e.pageX,
                        y: e.pageY,
                        h: Math.max(parseFloat(r.css("marginTop")), r.position().top),
                        w: Math.max(parseFloat(r.css("marginLeft")), r.position().left)
                    }, o.dir || (i.w = i.w - o._w), o.draging = !0, a(t).on("mousemove.scroll", function(e) {
                        o[s] = n.fixPos(-l * ("y" === s ? i.h + e.pageY - i.y : i.w + e.pageX - i.x) / c, s), n.$wrap.addClass(n.args.activateClass), n.selectable(1), n.args.onStartDrag && n.args.onStartDrag.call(n), n.scrollTo(n.$el, {
                            x: o.x,
                            y: o.y
                        }), u[s] = Math.floor(-o[s] * c / l), u[s] = Math.min(u[s], c - ("y" == s ? o._h : o._w)), n.scrollTo(d, u), n.args.onScroll && n.args.onScroll.call(n, e)
                    })) : (this === o.$barX[0] || this === o.$barY[0]) && (f = !0, n.$wrap.addClass(n.args.activateClass), n.args.onStartPress && n.args.onStartPress.call(n), g()), a(t).on("mouseup.scroll", function() {
                        a(this).off("mousemove.scroll").off("mouseup.scroll"), !m && n.args.onEndPress && n.args.onEndPress.call(n), f = !1, o.draging = !1, n.$wrap.removeClass(n.args.activateClass), n.selectable(0), n.resizeHandle(), n.args.onEndDrag && n.args.onEndDrag.call(n)
                    })
                }, o.wheelHandle = function(e, t) {
                    var n = (t.state, a(t.el), function(a) {
                            var n = t.getDelta(e),
                                i = t.args.wheelDir;
                            return i && (n[i] = n["x" === i ? "y" : "x"], n["x" === i ? "y" : "x"] = 0), t.state[a] + n[a] * t.args.wheelSpeed
                        }),
                        i = n("x"),
                        r = n("y"),
                        o = t.fixPos(i, "x"),
                        s = t.fixPos(r, "y"),
                        l = !i && s === t.state.y || !r && o === t.state.x || o > i || s > r;
                    !l && e.stopPropagation(), !(!t.args.preventDefaultWheel && l) && e.preventDefault(), t.scrollTo(t.$el, {
                        x: o,
                        y: s
                    }), t.state.x = o, t.state.y = s, t.moveThumb(), t.args.onWheel && t.args.onWheel.call(t, e), t.args.onScroll && t.args.onScroll.call(t, e)
                }, o.fixPos = function(e, t) {
                    var a = Math.min,
                        n = Math.max,
                        i = -this.state["_" + t];
                    return this.state.dir || "x" !== t || (a = Math.max, n = Math.min, i = -i), Math.floor(n(a(e, 0), i))
                }, o.detectLayout = function() {
                    var e = this,
                        t = e.state;
                    return !(t.h === e.$el.outerHeight() && t.w === e.$el.outerWidth() && t.H === e.$parent.height() && t.W === e.$parent.width())
                }, o.scrollTo = i ? function(e, t) {
                    e.css({
                        transform: "translate3d(" + t.x + "px," + t.y + "px, 0)"
                    })
                } : function(e, t, a) {
                    (isNaN(t.x) || !isFinite(t.x)) && (t.x = 0), (isNaN(t.y) || !isFinite(t.y)) && (t.y = 0);
                    var n = this.state.dir ? t.y + "px auto auto " + t.x + "px" : t.y + "px " + -t.x + "px auto auto";
                    a ? e.animate({
                        margin: n
                    }, a, "swing") : e[0].style.margin = n
                }, o.goTo = function(e, t, n) {
                    var i = this;
                    return i.updateState(), a.each(e, function(e, t) {
                        i.state[e] = i.fixPos(t, e)
                    }), t ? (i.$parent.addClass("mod-scroll--animate"), setTimeout(function() {
                        i.$parent.removeClass("mod-scroll--animate"), n && n()
                    }, 1e3)) : n && n(), i.moveThumb(t), i.initLayout(), i.scrollTo(i.$el, {
                        x: i.state.x,
                        y: i.state.y
                    }, t), i
                }, o.getDelta = function(e) {
                    e = e.originalEvent || e;
                    var t = {
                        delta: 0,
                        x: 0,
                        y: 0
                    };
                    return t.delta = e.wheelDelta !== n ? e.wheelDelta / 120 : -(e.detail || 0) / 3, e.axis ? t[e.axis === e.HORIZONTAL_AXIS ? "x" : "y"] = t.delta : e.wheelDeltaX !== n ? (t.x = e.wheelDeltaX / 120, t.y = e.wheelDeltaY / 120) : t.y = t.delta, t
                }, o.destroy = function() {
                    var e = this;
                    e.resizeTimer && clearInterval(e.resizeTimer)
                }, a.fn.extend({
                    scrollable: function(e) {
                        return new r(this, e)
                    }
                })
            }
        }(window, document, $)
    }), define("map/js/msg", function(require, e) {
        var t = $({});
        return e = t
    }), define("map/js/mapView", function(require, e) {
        function t(e, t, n) {
            h.push({
                func: e,
                selfConf: t,
                context: n
            }), 1 === h.length && a()
        }

        function a() {
            for (var e = null, t = 0, a = h.length; a > t; t++) e = h[t], e.context ? e.func.call(context, {
                map: m,
                $map: g
            }, e.selfConf) : e.func({
                map: m,
                $map: g
            }, e.selfConf);
            h.length = 0
        }

        function n() {
            function e() {
                f.trigger("firstInit"), setTimeout(function() {
                    m.removeEventListener("tilesloaded", e)
                }, 0)
            }
            f.on("update", function(e, t) {
                setTimeout(function() {
                    f.trigger("update_" + g_conf.curChannel, t), setTimeout(function() {
                        v && f.trigger("update_around", {
                            cur: v
                        })
                    }, 100)
                }, 150)
            }), m.addEventListener("tilesloaded", e), m.addEventListener("zoomend", function() {
                clearTimeout(c), c = setTimeout(function() {
                    _ && f.trigger("update", {
                        channel: "zoom"
                    }), _ = !0
                }, 50)
            }), m.addEventListener("dragend", function() {
                clearTimeout(u), u = setTimeout(function() {
                    f.trigger("update", {
                        channel: "drag"
                    }), setTimeout(function() {
                        v && f.trigger("update_around", {
                            cur: v
                        })
                    }, 50)
                }, 50)
            }), f.on("bubble_click", function(e, t) {
                var a = $(t);
                a.attr("data-disabled") || (a.hasClass("bubble-3") || $(".bubble").hide(), f.trigger("click_" + g_conf.curChannel, {
                    longitude: a.attr("data-longitude"),
                    latitude: a.attr("data-latitude"),
                    id: a.attr("data-id"),
                    isSchool: "1" === a.attr("data-imSchool") ? !0 : !1
                }), d && d.length && (d.removeClass("clicked"), d.parent().removeClass("label-clicked")), d = a, d.addClass("clicked"), d.parent().addClass("label-clicked"))
            }), -1 === navigator.userAgent.search("iPad") && $(document.body).on("click", ".bubble", function() {
                f.trigger("bubble_click", $(this))
            }), f.on("update_around_value", function(e, t) {
                v = t.cur || ""
            })
        }

        function i() {
            return m.getZoom()
        }

        function r(e, t, a) {
            m.centerAndZoom(new BMap.Point(e, t), a)
        }

        function o() {
            m.centerAndZoom(g_conf.cityName, 12)
        }

        function s() {
            var e = m.getBounds(),
                t = e.getSouthWest(),
                a = e.getNorthEast();
            return {
                min_longitude: t.lng,
                max_longitude: a.lng,
                min_latitude: t.lat,
                max_latitude: a.lat
            }
        }

        function l(e) {
            var t = "global_callback" + +new Date;
            p[t] = function() {
                setTimeout(function() {
                    m = new BMap.Map(g_conf.mapWrapper, {
                        enableMapClick: !1,
                        minZoom: 11
                    }), m.enableScrollWheelZoom(), m.disableInertialDragging(), m.centerAndZoom(g_conf.cityName, 12), f.one("firstInit", function() {
                        a(), m.addControl(new BMap.ScaleControl({
                            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                            offset: new BMap.Size(20, 20)
                        }))
                    }), n()
                }, 20)
            }, p[t]()
        }
        var c, u, d, f = require("map/js/msg"),
            m = null,
            g = null,
            p = window,
            h = [],
            _ = !1,
            v = "";
        return f.on("dragStatus", function(e, t) {
            g_conf.ignoreSearch = t
        }), h.push({
            func: function() {
                g = $("#" + g_conf.mapWrapper)
            },
            selfConf: null,
            context: null
        }), e = {
            init: l,
            addCb: t,
            centerAndZoom: r,
            resetMap: o,
            getZoom: i,
            getMap: function() {
                return m
            },
            getBounds: s
        }
    }), define("map/js/panelView", function(require, e) {
        function t() {
            var e = "<li>+</li><li>-</li>";
            l.html(e).show()
        }

        function a(e) {
            var t = l.find("li");
            t.eq(0).on("click", function() {
                e.map.zoomIn()
            }), t.eq(1).on("click", function() {
                e.map.zoomOut()
            })
        }

        function n() {
            var e = "";
            $.each(f, function(t, a) {
                    e += $.replaceTpl(d.boolCheck, a)
                }), e += d.multiSelect, e += d.dragControlTpl, c.html(e).show(),
                function() {
                    var e = c.find(".li-item-around"),
                        t = "";
                    $.each(m, function(e, a) {
                        a.isFirst = 0 === e ? " clicked" : "", t += $.replaceTpl(d.multiSelectItem, a)
                    }), e.append($.replaceTpl(u, {
                        content: t
                    })), setTimeout(function() {}, 100)
                }()
        }

        function i() {
            var e = c.find(".li-item-around"),
                t = e.find(".drop-list"),
                a = e.find(".drop-i"),
                n = e.find("span"),
                i = n.html(),
                r = null,
                o = c.find(".li-filter");
            e.on("mouseenter", function() {
                t.show(), a.addClass("drop-open")
            }).on("mouseleave", function() {
                t.hide(), a.removeClass("drop-open")
            }).on("click", ".item", function() {
                var o = $(this),
                    l = $.trim(o.attr("data-value")) || "",
                    c = e.attr("data-value") || "";
                c != l && (e.attr("data-value", l), l ? n.html(o.html()) : n.html(i), s.trigger("update_around_value", {
                    cur: l
                }), s.trigger("update_around", {
                    channel: "useless",
                    prev: c,
                    cur: l
                }), r = r || e.find(".item").eq(0), r.removeClass("clicked"), o.addClass("clicked"), r = o), t.hide(), a.removeClass("drop-open")
            }), -1 === navigator.userAgent.search("iPad") && t.children("ol").scrollable(), c.on("click", ".li-filter", function() {
                var e = $(this),
                    t = [],
                    a = "";
                e.hasClass("li-disabled") || (e.attr("data-value", e.hasClass("li-checked") ? "" : e.attr("data-val")), e.toggleClass("li-checked"), o.each(function(e, n) {
                    a = $(this).attr("data-value"), a && t.push(a)
                }), g_conf.filterMapSideCtrl = t.join("&"), s.trigger("update", {
                    channel: "filter",
                    cur: g_conf.filterMapSideCtrl
                }))
            }), c.find(".li-drag-ctrl").on("click", function() {
                var e = $(this);
                s.trigger("dragStatus", !e.hasClass("li-checked")), e.toggleClass("li-checked"), g_conf.searchConf && setTimeout(function() {
                    s.trigger("update", {
                        channel: "code",
                        typ: "dragSwitch"
                    })
                }, 20)
            }), s.on("mapSideCtrlChange", function() {
                o.each(function(e, t) {
                    $(this).removeClass("li-disabled")
                }), "Station" === g_conf.curChannel ? o.filter(function() {
                    return $(this).attr("data-val").search("subway") > -1
                }).addClass("li-disabled") : "School" === g_conf.curChannel && o.filter(function() {
                    return $(this).attr("data-val").search("school") > -1
                }).addClass("li-disabled")
            }), s.on("resetIgnoreSearch", function() {
                c.find(".li-drag-ctrl").removeClass("li-checked"), s.trigger("dragStatus", !1)
            }), s.on("resetFilter", function() {
                o.each(function() {
                    var e = $(this);
                    e.removeClass("li-checked"), e.attr("data-value", ""), g_conf.filterMapSideCtrl = ""
                }), e.find(".item-default").trigger("click")
            })
        }

        function r(e) {
            var t = $("#" + g_conf.houseListId),
                a = $("#" + g_conf.mapCtrlId),
                n = !0,
                i = t.outerWidth() + a.outerWidth();
            $("#" + g_conf.mapResizeId).on("click", function() {
                (n = !n) ? (t.show(), a.show()) : (t.hide(), a.hide()), e.$map.css("margin-left", n ? i : 0), $(this)[(n ? "remove" : "add") + "Class"]("close"), setTimeout(function() {
                    s.trigger("update", {
                        channel: "resize"
                    })
                }, 200)
            })
        }

        function o(e) {
            t(), n(), a(e), i(), r(e)
        }
        require("map/js/scroll");
        var s = require("map/js/msg"),
            l = $("#" + g_conf.mapZoomPanelId),
            c = $("#" + g_conf.mapSidePanelId),
            u = '<div class="drop-list"><ol>#{content}</ol></div>',
            d = {
                boolCheck: '<li class="li-item li-filter" data-val="#{name}"><i class="i-check"></i>#{title}</li>',
                multiSelect: '<li class="li-item li-item-around" data-type="mapAround"><span>周边</span><i class="drop-i"></i></li>',
                multiSelectItem: '<li data-value="#{value}" class="item-#{extraClass} item#{isFirst}"><i></i>#{title}</li>',
                dragControlTpl: '<li class="li-item li-drag-ctrl"><i class="i-check"></i>拖动地图时重新搜索</li>'
            },
            f = [{
                name: "is_subway=1",
                title: "近地铁"
            }, {
                name: "is_school=1",
                title: "学区房"
            }, {
                name: "is_two_five=1",
                title: "房本满五年/满两年"
            }],
            m = [],
            g = {
                "无": "default",
                "银行": "bank",
                "公交": "bus",
                "地铁": "station",
                "教育": "education",
                "医院": "hospital",
                "休闲": "fun",
                "购物": "shop",
                "健身": "sport",
                "美食": "eat",
                "链家": "store"
            };
        return $.each(["无", "链家", "银行", "公交", "地铁", "教育", "医院", "休闲", "购物", "健身", "美食"], function(e, t) {
            m.push({
                value: 0 === e ? "" : "链家" == t ? "store" : t,
                title: t,
                extraClass: g[t]
            })
        }), e = {
            init: o
        }
    }), define("map/js/model", function(require, e) {
        function t(e) {
            var t = "&",
                a = g_conf.searchConf;
            return a && !g_conf.ignoreSearch && ("area" === a.module && (t += "other" === a.type ? "q=" + encodeURIComponent(a.text) : a.type + "_id=" + a.id), "subway" === a.module, "school" === a.module && (t += a.type + "_id=" + a.id)), t
        }

        function a(e) {
            var t = this;
            $.each(["bubble", "card", "house"], function(a, n) {
                t[n + "Url"] = {
                    path: e[n + "Path"],
                    params: e[n + "ParamArray"]
                }
            })
        }
        var n = {},
            i = 6e5;
        return a.prototype = {
            bubbleAjax: null,
            cardAjax: null,
            houseAjax: null,
            ajax: function(e, a, r, o) {
                var s, l = this,
                    c = o || l[e + "Url"].path + "?" + l.formatParams(a, l[e + "Url"].params);
                c += c.search(/\?/) > -1 ? "" : "?", c += g_conf.filterMapSideCtrl ? "&" + g_conf.filterMapSideCtrl : "", c += g_conf.filterSearchSideCtrl ? "&" + g_conf.filterSearchSideCtrl : "", c += t(e), c += "&city_id=" + g_conf.cityId, n[c] && +new Date - n[c].timeStamp > i && (n[c] = null), n[c] ? (this[e + "Ajax"] = $.Deferred()).resolve(n[c].data) : this[e + "Ajax"] = $.ajax({
                    url: c,
                    dataType: "jsonp",
                    jsonp: "callback"
                }), s = this[e + "Ajax"], s.cbFunc = r, s.done(function(e) {
                    n[c] || (n[c] = {
                        data: e,
                        timeStamp: +new Date
                    }), !g_conf.allSchoolMsg && c.search(g_conf.urlPath.mapSearch.SchoolSchool) > -1 && e && e.data && e.data.length && (g_conf.allSchoolMsg = e.data), s.cbFunc && s.cbFunc(e)
                })
            },
            getBubbles: function(e, t, a) {
                this.ajax("bubble", e, t, a)
            },
            formatParams: function(e, t) {
                var a = {};
                return $.each(t, function(t, n) {
                    a[n] = e[n]
                }), $.param(a)
            },
            getCards: function(e, t, a) {
                this.ajax("card", e, t, a)
            },
            getHouseList: function(e, t, a) {
                this.ajax("house", e, t, a)
            }
        }, e = a
    }), define("map/js/bubble", function(require, e) {
        var t = require("map/js/mapView"),
            a = require("map/js/msg"),
            n = {
                1: '<div class=\'#{extraClass} bubble\' data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p>#{name}</p><p>#{price}万</p><p><span>#{house_count}</span>套</p></div>',
                4: '<div class=\'bubble-4 bubble\' data-disabled="1" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}" title="#{name}"><span class=\'bubble-4_tri\'></span><p class=\'bubble-4_tip\' title=\'#{sugName}\'>#{sugName}</p></div>',
                2: '<div class="bubble-2 bubble" data-position_border="#{position_border}" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p class="name" title="#{name}">#{name}</p><p class="num">#{price}</p><p class="count">#{house_count}套</p></div>',
                21: '<div class="bubble-2 bubble bubble-21" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p class="name" title="#{name}">#{name}</p><p class="count">#{house_count}套</p></div>',
                3: '<p class="bubble-3 bubble" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}" data-msg="#{otherResource}" data-station="#{subway_station_id}" data-schoolid="#{school_id}"><i class="num">&nbsp;#{name}&nbsp;</i><span class="name"><i class="name-des"><a href="/xiaoqu/#{id}/" target="_blank" #{other_ctrl}>#{price}&nbsp;&nbsp;#{house_count}套</a></i></span><i class="arrow-up"><i class="arrow"></i><i></p>',
                5: '<div class="bubble-2 bubble-5 bubble" data-position_border="#{position_border}" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p class="name" title="#{name}">#{name}</p><p class="num">#{price}</p><p><span class="count">#{house_count}</span>套</p></div>',
                6: '<div class="bubble-2 bubble-5 bubble-6 bubble" data-position_border="#{position_border}" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p class="name" title="#{name}">#{name}</p><p class="count">#{school_count}所小学</p></div>',
                7: '<div class="bubble-2 bubble bubble-7" data-imSchool="1" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p class="name" title="#{name}">#{name}</p><p class="count">#{house_count}套</p><p class="num">#{min_price_total}万起</p></div>',
                8: "<div class='bubble-4 bubble bubble-8' data-imSchool=\"1\" data-longitude=\"#{longitude}\" data-latitude=\"#{latitude}\" data-id=\"#{id}\"><span class='bubble-4_tri'></span><p class='bubble-4_tip' title='#{name}'>#{name}</p></div>",
                9: '<div class="bubble-2 bubble bubble-9" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p class="name" title="#{name}">#{name}</p><p class="num">#{price}</p><p class="count">#{house_count}套</p></div>',
                10: "<div class='bubble-4 bubble bubble-8 bubble-10' data-disabled=\"1\" data-longitude=\"#{longitude}\" data-latitude=\"#{latitude}\" data-id=\"#{id}\"><span class='bubble-4_tri'></span><p class='bubble-4_tip' title='#{name}'>#{name}</p></div>"
            },
            i = {
                4: {
                    color: "#333333",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                1: {
                    color: "#fff",
                    backgroundColor: "rgba(0, 162, 130, 0.8)",
                    height: "69px",
                    lineHeight: "23px",
                    width: "69px",
                    textAlign: "center",
                    borderWidth: "0",
                    zIndex: "2",
                    whiteSpace: "normal",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                3: {
                    color: "#fff",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                2: {
                    color: "#fff",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                21: {
                    color: "#fff",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                5: {
                    color: "#fff",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                6: {
                    color: "#fff",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                7: {
                    color: "#fff",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                8: {
                    color: "#333333",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                9: {
                    color: "#fff",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                },
                10: {
                    color: "#333333",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体b8bf53", SimSun, sans-serif'
                }
            },
            r = {
                4: function() {
                    return new BMap.Size(-28, -28)
                },
                1: function() {
                    return new BMap.Size(-48, -48)
                },
                3: function() {
                    return new BMap.Size(-28, -36)
                },
                2: function() {
                    return new BMap.Size(-42, -42)
                },
                21: function() {
                    return new BMap.Size(-42, -42)
                },
                5: function() {
                    return new BMap.Size(-48, -48)
                },
                6: function() {
                    return new BMap.Size(-48, -48)
                },
                7: function() {
                    return new BMap.Size(-42, -42)
                },
                8: function() {
                    return new BMap.Size(-28, -28)
                },
                9: function() {
                    return new BMap.Size(-40, -40)
                },
                10: function() {
                    return new BMap.Size(-28, -28)
                }
            },
            o = {
                tpl: '<p class="line-msg">#{steamMsg}</p>',
                inlineTpl: '<i class="name-other">&nbsp;&nbsp;#{steamMsg}</i>',
                styles: {
                    color: "#fffefe",
                    borderWidth: "0",
                    padding: "0",
                    zIndex: "2",
                    backgroundColor: "transparent",
                    textAlign: "center"
                },
                offset: function() {
                    return new BMap.Size(-54, -15)
                }
            },
            s = [],
            l = null,
            c = {
                _polygonLine: null,
                _render: function(e) {
                    t.getMap().addOverlay(e)
                },
                clear: function(e) {
                    for (var t = null; t = s.shift();) c._remove(t);
                    e && l && (c._remove(l), l = null)
                },
                _fixNumber: function(e) {
                    return e = e && (parseFloat(e) / 1e4).toFixed(1) || "", e = "0.0" === e ? "" : e
                },
                _remove: function(e) {
                    t.getMap().removeOverlay(e)
                },
                _create: function(e) {
                    var t;
                    return t = new BMap.Label($.replaceTpl(n[e.bubbleLevel], e), {
                        position: new BMap.Point(e.longitude, e.latitude),
                        offset: r[e.bubbleLevel]()
                    }), e.isCenterBubble || (t.addEventListener("mouseover", function() {
                        this.setStyle({
                            zIndex: "4"
                        })
                    }), t.addEventListener("mouseout", function() {
                        this.setStyle({
                            zIndex: "2"
                        })
                    }), navigator.userAgent.search("iPad") > -1 && t.addEventListener("click", function(e) {
                        var t;
                        try {
                            t = $(this.K).children(".bubble")
                        } catch (n) {}
                        t && t.length && a.trigger("bubble_click", t)
                    })), t.setStyle(i[e.bubbleLevel]), e.isCenterBubble ? l = t : s.push(t), t
                },
                add: function(e) {
                    for (var t = 0, a = e.length; a > t; t++) e[t].longitude && e[t].latitude && (e[t].price = c._fixNumber(e[t].avg_unit_price) || c._fixNumber(e[t].bs_avg_unit_price), e[t].price = e[t].price ? e[t].price + "万" : "", e[t].id = e[t].id || "", e[t].duration ? e[t].otherResource = "通勤时间" + Math.ceil(e[t].duration / 60) + "分钟" : e[t].otherResource = "", e[t].other_ctrl = $.inArray(g_conf.cityId, ["350200", "430100", "420100", "440300", "500000", "370101"]) > -1 ? 'onclick="return false" style="text-decoration: none;cursor:default"' : "", c._render(c._create(e[t])))
                },
                hasCenterPoint: function() {
                    return !!l
                },
                getCenter: function() {
                    return l
                },
                drawLine: function(e, a, n, i) {
                    var r = new BMap.Polygon([new BMap.Point(e.lng, e.lat), new BMap.Point(a.lng, a.lat)], {
                            strokeColor: "#e4393c",
                            strokeWeight: 2,
                            strokeOpacity: 1,
                            strokeStyle: "solid",
                            enableClicking: !1
                        }),
                        s = new BMap.Label($.replaceTpl(o.tpl, {
                            steamMsg: n
                        }), {
                            position: new BMap.Point(((e.lng + a.lng) / 2).toFixed(6), ((e.lat + a.lat) / 2).toFixed(6)),
                            offset: o.offset()
                        });
                    return s.setStyle(o.styles),
                        function(e) {
                            setTimeout(function() {
                                e.setStyle({
                                    zIndex: "2"
                                })
                            }, 50)
                        }(s), t.getMap().addOverlay(r),
                        t.getMap().addOverlay(s), i.find(".name-other").length || i.find(".name-des").append($.replaceTpl(o.inlineTpl, {
                            steamMsg: n
                        })), {
                            label: s,
                            line: r
                        }
                },
                clearLine: function(e) {
                    t.getMap().removeOverlay(e.label), t.getMap().removeOverlay(e.line)
                },
                drawPolygon: function(e) {
                    var a = [],
                        n = e.split(";"),
                        i = null;
                    c._polygonLine && (t.getMap().removeOverlay(c._polygonLine), c._polygonLine = null), n.length < 2 || ($.each(n, function(e, t) {
                        var n = t.split(",");
                        2 === n.length && a.push(new BMap.Point(parseFloat(n[0]), parseFloat(n[1])))
                    }), a.length < 2 || (i = new BMap.Polygon(a, {
                        strokeColor: "#00ae66",
                        strokeWeight: 2,
                        strokeOpacity: 1,
                        fillColor: "#00ae66",
                        fillOpacity: .15,
                        strokeStyle: "solid",
                        enableClicking: !1
                    }), c._polygonLine = i, t.getMap().addOverlay(i)))
                },
                clearPolygon: function() {
                    c._polygonLine && t.getMap().removeOverlay(c._polygonLine), c._polygonLine = null
                },
                init: function() {
                    var e = c;
                    $(document.body).on("mouseenter", ".bubble", function() {
                        var t = $(this).attr("data-position_border");
                        t ? e.drawPolygon(t) : e.clearPolygon()
                    }).on("mouseleave", ".bubble", function() {
                        e.clearPolygon()
                    })
                }
            };
        return e = {
            clear: c.clear,
            add: c.add,
            hasCenter: c.hasCenterPoint,
            getCenter: c.getCenter,
            drawLine: c.drawLine,
            clearLine: c.clearLine,
            drawPolygon: c.drawPolygon,
            clearPolygon: c.clearPolygon,
            init: c.init
        }
    }), define("map/js/house", function(require, e) {
        function t(e, t) {
            var a = !1;
            return $.each(t, function(t, n) {
                return n === e ? (a = !0, !1) : void 0
            }), a
        }

        function a(e, a, n) {
            var i = [];
            return $.each(e, function(e, n) {
                t(n, a) && i.push(n)
            }), n ? i.splice(0, n) : i
        }

        function n(e) {
            return $.each(e, function(e, t) {
                var n = "",
                    i = t.tags && t.tags.split(",") || [],
                    r = [];
                t.subway_station && r.push("subway_station"), t.school && r.push("school"), r = r.concat(a(C, i)), $.each(r, function(e, a) {
                    if (S[a]) {
                        var i = S[a].hoverTitle;
                        i = i && t[a] ? "subway_station" === i ? $.replaceTpl(x.subwayItem, t[i]) : t.school.school_name : "", n += $.replaceTpl(x.roomTagItem, {
                            tagClass: S[a].tagClass,
                            title: S[a].title,
                            tagTitle: i
                        })
                    }
                }), t.tagsContent = n, t.house_area_origin = t.house_area, t.house_area = Math.floor(t.house_area), t.community_names = t.community_name, t.duration ? (t.wtf_any = t.duration, t.replace_com = "通勤时间" + Math.ceil(t.duration / 60) + "分钟") : (t.wtf_any = "", t.replace_com = t.community_name), "school" === t.curFuckType && (t.community_names = t.school && t.school.school_name || "", t.replace_com = t.community_name), t.title || (t.title = t.community_name + "&nbsp;" + t.frame_bedroom_num + "室" + t.frame_hall_num + "厅"), t.tips = "", "1" == t.is_new_house_source && (t.tips += y[0]), "1" == t.is_price_decrease && (t.tips += y[1]), t.list_picture_url = (t.list_picture_url || b).replace("280x210", "116x116"), t.defaultImgSrc = b
            }), e
        }

        function i(e, t) {
            var a = "";
            return e.length ? (e = n(e), $.each(e, function(e, t) {
                a += $.replaceTpl(x.roomListItem, t)
            }), a) : t ? "" : x.noDataItem
        }

        function r() {
            p.on("mouseenter", "a", function() {
                var e = $(".bubble[data-id='" + $(this).attr("data-community") + "']");
                e.parent().css({
                    zIndex: 3
                }), e.addClass("hovered")
            }).on("mouseleave", "a", function() {
                var e = $(".bubble[data-id='" + $(this).attr("data-community") + "']");
                e.parent().css({
                    zIndex: 2
                }), e.removeClass("hovered")
            })
        }

        function o() {
            if (-1 === navigator.userAgent.search("iPad")) d = p.scrollable({
                onWheel: function() {},
                onScroll: function() {
                    if (this.state.y == -this.state._y) {
                        if (_ >= 200 || _ >= v) return;
                        clearTimeout(f), f = setTimeout(function() {
                            m.trigger("update_house_add_" + g_conf.curChannel, {
                                offset: _
                            })
                        }, 100)
                    }
                    0 == this.state.y
                },
                onEndPress: function() {},
                onEndDrag: function() {}
            });
            else {
                var e = $(window),
                    t = p.get(0),
                    a = p.parent();
                a.on("scroll", function() {
                    t.getBoundingClientRect().bottom - 100 > (innerHeight || e.height()) || _ >= 200 || _ >= v || (clearTimeout(f), f = setTimeout(function() {
                        m.trigger("update_house_add_" + g_conf.curChannel, {
                            offset: _
                        })
                    }, 80))
                }), d = {
                    goTo: function(e) {
                        a.scrollTop(e.y || 0)
                    }
                }
            }
            r()
        }

        function s() {
            d && d.goTo({
                y: 0
            })
        }

        function l(e) {
            _ = 1, v = Math.ceil((e.data.total_count || 0) / 10), h.html(e.data.total_count || 0), p.html(i(e.data.list)), s()
        }

        function c(e, t) {
            p.append(i(e.data.list, !0)), _ = t + 1
        }

        function u() {
            h.html(0), p.html(i([]))
        }
        require("map/js/scroll");
        var d, f, m = require("map/js/msg"),
            g = $("#" + g_conf.houseListId),
            p = g.find(".r-content"),
            h = g.find(".r-hd_i"),
            _ = 1,
            v = 0,
            b = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB0CAMAAABZuJsjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRF8/Pz/Pz8/v7++Pj48vLy9PT0+/v7/f39+vr6+fn59vb29fX19/f3////8fHxhavVGQAAArZJREFUeNrs14FypCAMBmACgQAB3/9xL7C663btneu0N72bn5k6LhL8BAzWueWnFQcSSCCBBBJIIIEEEkgggQQSSCCBBBJIIIEEEkgggQQSSP8AKSo3jnWcMrM2x3yK1ELdTjWELYZrC60+9xBrCPXeAYegf4hJvSTveyJ1REm6/ZUzpN5lO829365zkT6K5Ed7Tf6pKvZefh/DkkptkoNy9aGEkEuWMyR7iu20rN3H0bn3g+BzCfNa6LNu3FM3UrjVv8bkGeOSJGmUKdrsabL6Vss1UrR+qUUXW5qPPafXTrK6WK3Kx1eSO4hZVBzlLPYQ3HJK3mniayS6Tck2NjTiDFLvVfRKOohZOPVM1TWvS0xj0oqvyyVStfFYdlV0WzF1t+LqR9JRjNVKpFCoU3TZiqTO10g26Y9WNiHWPfv1JmtV+kg6iBlNyFHjYGPjig1S10SXSCyPCsPQ6H69/VpoLpU96ShmTvcYGhmjRBSqZ+7tCsnJbg4epLZPN8LPpKOYOUz2rmm0jMnRItzh/b+JxJ+QLm4oL2vpqcNzpKOYryTZG6Xvkg5i5sRlCnZIOpJ7sqTWrpHU3mF+k2Q/hF9ItYutajtYNHlL77R/S95JlfbIFB+v1xnSjNGnGCsy2nk7z75aJvB5Sf4cScIsbiPx2BNSmZXFnyMtLzEjm42EPlrVHmxnpGJ3OEMqfS31vu1y7rvye9JxjCyuRWuolpF8jEJqJMk2XGdIbA81d/BB2nKwFpq14wLNjXhHynMQ9MYMn8RU2/Oc7XxpHMTFPicunxqlUTkLL7y7zO5eRpO42504rqsn3todxszkaN+V1kaV508Lc/HbPnSrbabvJJ+/8O09FrN3P4qUPYUv6gr/x4EEEkgggQQSSCCBBBJIIIEEEkgggQQSSCCBBBJIIIH035B+CTAAK+x5objF6rEAAAAASUVORK5CYII=",
            y = ['<span class="item-tip_new">新</span>', '<span class="item-tip_decrease">降价</span>'],
            C = ["is_sales_tax", "is_two_five", "is_restriction"],
            S = {
                subway_station: {
                    tagClass: "subway",
                    title: "地铁",
                    hoverTitle: "subway_station"
                },
                school: {
                    tagClass: "school",
                    title: "学区",
                    hoverTitle: "school_name"
                },
                is_sales_tax: {
                    tagClass: "taxfree",
                    title: "房本满五年"
                },
                is_two_five: {
                    tagClass: "five",
                    title: "房本满两年"
                }
            },
            x = {
                roomListItem: '<li class="list-item"><a href="/ershoufang/#{house_code}.html" target="_blank" title="#{title}" data-community="#{community_id}"><div class="item-aside"><img src="#{list_picture_url}" onerror="this.src=\'#{defaultImgSrc}\'"><div class="item-btm"><span class="item-img-icon"><i class="i-icon-arrow"></i><i class="i-icon-dot"></i></span><span>#{house_picture_count}</span></div></div><div class="item-main"><p class="item-tle">#{title}#{tips}</p><p class="item-des"><span>#{frame_bedroom_num}室#{frame_hall_num}厅</span><span data-origin="#{house_area_origin}">#{house_area}平米</span><span>#{frame_orientation}</span><span class="item-side">#{price_total}<span>万</span></span></p><p class="item-community"><span class="item-replace-com" data-origin="#{wtf_any}">#{replace_com}</span><span class="item-exact-com">#{community_names}</span></p><p class="item-tag-wrap">#{tagsContent}</p></div></a></li>',
                roomTagItem: '<span class="item-tag-#{tagClass} item-extra" title="#{tagTitle}">#{title}</span>',
                noDataItem: '<li class="list-item-remind">呣..没有找到相关内容~</li>',
                subwayItem: "距离#{line_name}#{station_name}站#{distance_value}米"
            };
        return e = {
            add: c,
            render: l,
            init: o,
            scrollTop: s,
            clear: u
        }
    }), define("map/js/card", function(require, e) {
        function t(e, t, a) {
            e.type = t, e.childType = a || "";
            var n;
            return e.other_ctrl = $.inArray(g_conf.cityId, ["350200", "430100", "420100", "440300", "500000", "370101"]) > -1 ? 'onclick="return false" style="text-decoration: none;cursor:default"' : "", null !== e.month_radio && void 0 !== e.month_radio ? (n = parseFloat(e.month_radio) || 0, e.trend = 0 > n ? "down" : "up", e.trendChar = 0 > n ? "&darr;" : "&uarr;", e.monthRadio = Math.abs(n), e.forceStyle = 0 == n ? "display: none" : "") : (e.trend = "up", e.trendChar = "&uarr;", e.monthRadio = "-/-", e.forceStyle = "display: none"), e.avgUnitPrice = Math.floor(parseFloat(e.avg_unit_price || e.bs_avg_unit_price || 0)), e
        }
        var a = require("map/js/msg"),
            n = $("#" + g_conf.houseListId),
            i = n.find(".r-hd3-content"),
            r = n.find(".r-hd3"),
            o = {
                0: '<ol class="i-card i-card-1"><li class="i-card-name">#{city_name}</li><li class="i-card-price" style="visibility: hidden;"><i style="color: #aaa;">参考均价 </i><span>#{avgUnitPrice}</span>元/m²</li><li>共#{district_count}个#{childType}</li><li class="i-card-radio">#{type}均价，同比上月<i class="i-card-#{trend}" style="#{forceStyle}">#{trendChar}</i>#{monthRadio}%</span></li></ol>',
                1: '<ol class="i-card i-card-1"><li class="i-card-name">#{district_name}</li><li class="i-card-price"><i style="color: #aaa;">参考均价 </i><span>#{avgUnitPrice}</span>元/m²</li><li>共#{bizcircle_count}个#{childType}</li><li class="i-card-radio">#{type}均价，同比上月<i class="i-card-#{trend}" style="#{forceStyle}">#{trendChar}</i>#{monthRadio}%</span></li></ol>',
                2: '<ol class="i-card i-card-2"><li class="i-card-name" title="#{bizcircle_name}">#{bizcircle_name}</li><li class="i-card-price"><i style="color: #aaa;">参考均价 </i><span>#{avgUnitPrice}</span>元/m²</li><li>#{district_name}</li><li class="i-card-radio">#{type}均价，同比上月<i class="i-card-#{trend}" style="#{forceStyle}">#{trendChar}</i>#{monthRadio}%</span></li></ol>',
                3: '<ol class="i-card i-card-3"><li class="i-card-name"><a href="/xiaoqu/#{community_id}/" target="_blank" title="#{community_name}" #{other_ctrl}>#{community_name}</a></li><li class="i-card-price"><i style="color: #aaa;">参考均价 </i><span>#{avgUnitPrice}</span>元/m²</li><li>#{district_name}&nbsp;#{bizcircle_name}</li><li class="i-card-radio">#{type}均价，同比上月<i class="i-card-#{trend}" style="#{forceStyle}">#{trendChar}</i>#{monthRadio}%</span></li></ol>',
                4: '<ol class="i-card i-card-4"><li class="i-card-name">#{district_name}</li><li class="i-card-price"><i style="color: #aaa;">参考均价 </i><span>#{avgUnitPrice}</span>元/m²</li><li>共#{school_count}#{childType}</li><li class="i-card-radio">#{type}均价，同比上月<i class="i-card-#{trend}" style="#{forceStyle}">#{trendChar}</i>#{monthRadio}%</span></li></ol>',
                5: '<ol class="i-card i-card-5"><li class="i-card-name"><a target="_blank" href="/xuequfang/#{school_id}.html">#{school_name}</a></li><li class="i-card-price"><span>#{min_price_total}</span>万起</li><li>共#{school_related_community_count}#{childType}</li><li class="i-card-radio">#{type}均价，同比上月<i class="i-card-#{trend}" style="#{forceStyle}">#{trendChar}</i>#{monthRadio}%</span></li></ol>'
            },
            s = {
                render: function(e, a, n, r) {
                    e = t(e, n, r), i.html($.replaceTpl(o[a], e))
                }
            };
        return $.each(["show", "hide"], function(e, t) {
            s[t] = function(e) {
                r[t](), a.trigger("houseContentHeightChange")
            }
        }), e = s
    }), define("map/js/steam", function(require, e) {
        function t(e) {
            $.each(["bubble", "card", "house"], function(t, a) {
                H[a + "Url"] = {
                    path: D[e][a + "Path"],
                    params: D[e][a + "ParamArray"]
                }
            })
        }

        function a() {
            var e = y.getBounds(),
                t = {
                    longitude: P,
                    latitude: T,
                    mode: A,
                    range: M,
                    min_longitude: e.min_longitude,
                    max_longitude: e.max_longitude,
                    min_latitude: e.min_latitude,
                    max_latitude: e.max_latitude
                };
            return t
        }

        function n(e) {
            var t = [],
                a = y.getBounds(),
                n = {
                    min_longitude: parseFloat(a.min_longitude),
                    max_longitude: parseFloat(a.max_longitude),
                    min_latitude: parseFloat(a.min_latitude),
                    max_latitude: parseFloat(a.max_latitude)
                };
            return $.each(e, function(e, a) {
                var i = parseFloat(a.longitude),
                    r = parseFloat(a.latitude);
                i <= n.max_longitude && i >= n.min_longitude && r <= n.max_latitude && r >= n.min_latitude && t.push(a)
            }), t
        }

        function i(e) {
            var t = y.getZoom() < 16 ? "21" : "3";
            return e = e && e.data || [], e = n(e || []), $.each(e, function(e, a) {
                a.bubbleLevel = t
            }), e
        }

        function r(e, t) {
            var a, n = "undefined" != typeof t,
                i = [];
            H.houseAjax && (H.houseAjax.cbFunc = null, H.houseAjax = null), $.each(e, function(e, t) {
                i.push(t.id)
            }), a = {
                ids: i.join(","),
                limit_offset: 10 * (t || 0),
                limit_count: 10,
                mode: A,
                range: M,
                longitude: P,
                latitude: T,
                sort: g_conf.houseListSortCtrl
            }, e.length ? H.getHouseList(a, function(e) {
                o(e, n, t)
            }) : o({
                data: {
                    total_count: 0,
                    list: []
                }
            }, n, t)
        }

        function o(e, t, a) {
            t ? b.add(e, a) : b.render(e)
        }

        function s(e) {
            v.clear(), v.add(e)
        }

        function l(e, t) {
            H.cardAjax && (H.cardAjax.cbFunc = null, H.cardAjax = null);
            var a = {
                id: e.id
            };
            H.getCards(a, function(e) {
                c(e, t)
            })
        }

        function c(e, t) {
            C.render(e.data, t, "2" === t ? "商圈" : "小区"), C.show()
        }

        function u(e, a) {
            t(y.getZoom() < 16 ? "bizcycle" : "community"), H.bubbleAjax && (H.bubbleAjax.cbFunc = null, H.bubbleAjax = null), H.getBubbles(e, function(e) {
                e = i(e), I = e, r(e), s(e)
            })
        }

        function d(e) {
            var t = ['<li data-longitude="#{longitude}" data-latitude="#{latitude}"', ' data-origin="#{q}" data-id="#{id}" q="#{text}">#{formatText}</li>'].join("");
            S(e[0], {
                classNameWrap: "sug-search",
                classNameQuery: "sug-query",
                classNameSelect: "sug-select",
                delay: 200,
                n: 10,
                autoFocus: !1,
                requestQuery: "q",
                requestParas: {
                    callback: "steamSug2015",
                    city_id: g_conf.cityId
                },
                url: w + x.steamSug,
                callbackFn: "steamSug2015",
                callbackDataKey: "data",
                noSubmit: !0,
                onMouseSelect: function(t) {
                    t && (e.attr("data-longitude", $(t).attr("data-longitude")), e.attr("data-latitude", $(t).attr("data-latitude")), e.attr("data-q", $(t).attr("q")))
                },
                onSelect: function(e) {},
                onKeySelect: function(t) {
                    t && (e.attr("data-longitude", $(t).attr("data-longitude")), e.attr("data-latitude", $(t).attr("data-latitude")), e.attr("data-q", $(t).attr("q")))
                },
                onRequest: function() {
                    e.attr("data-longitude", ""), e.attr("data-latitude", ""), e.attr("data-q", "")
                },
                onFill: function() {},
                templ: function(a, n) {
                    for (var i = a.data || [], r = [], o = 0, s = i.length; s > o; o++) i[o].q = n, i[o].formatText = i[o].text.replace(n, '<span class="sug-query">' + n + "</span>"), r.push($.replaceTpl(t, i[o]));
                    return s && (e.attr("data-longitude", i[0].longitude), e.attr("data-latitude", i[0].latitude), e.attr("data-q", i[0].text)), "<ol>" + r.join("") + "</ol>"
                }
            })
        }

        function f() {
            F.one("init", function() {
                $(this).html('<p class="m-top">通勤找房可以为您找到符合上班往返时间需求的房源</p><div class="m-main"><input type="text" class="steam-input" autocomplete="off" placeholder="请输入工作地或附近地标类建筑，如昆泰大厦" data-longitude="" data-latitude="" data-q=""><ol><li class="li" data-type="steamWay"><span>选择通勤方式</span><i class="drop-i"></i></li><li class="li" data-type="steamTime"><span>选择通勤时间</span><i class="drop-i"></i></li></ol><button>开始查找</button></div><div class="m-btm"><span></span><p class="m-btm-tle">什么是通勤？如何使用通勤找房？</p><p>通勤，是指从家往返工作地点的过程。</p><p>如您的工作地在昆泰大厦，您每天上班的交通方式是自驾，期望到达工作地的时间是30分钟，那么在地图上为您推荐的就是自驾到昆泰大厦30分钟内的房源。</p></div>'),
                    function() {
                        var e = F.find(".li");
                        e.one("mouseenter", function() {
                            var e = $(this),
                                t = e.attr("data-type"),
                                a = "";
                            q[t] && ($.each(q[t], function(e, t) {
                                a += $.replaceTpl(V, t)
                            }), e.append($.replaceTpl(U, {
                                content: a
                            })))
                        }), e.each(function(e, t) {
                            var a = $(this),
                                n = a.find(".drop-list"),
                                i = a.find(".drop-i"),
                                r = a.find("span"),
                                o = r.html(),
                                s = null;
                            a.on("click", ".item", function() {
                                var e = $(this),
                                    t = $.trim(e.attr("data-value")) || "",
                                    l = a.attr("data-value") || "";
                                l != t && (a.attr("data-value", t), t ? r.html(e.html()) : r.html(o), s && s.removeClass("clicked"), e.addClass("clicked"), s = e), n.length || (n = a.find(".drop-list")), n.hide(), i.removeClass("drop-open")
                            }).on("mouseenter", function() {
                                n.length || (n = a.find(".drop-list")), n.show(), i.addClass("drop-open")
                            }).on("mouseleave", function() {
                                n.length || (n = a.find(".drop-list")), n.hide(), i.removeClass("drop-open")
                            })
                        })
                    }();
                var e = F.find(".steam-input"),
                    t = F.find(".li"),
                    a = t.eq(0),
                    n = t.eq(1);
                d(e), $.fixPlaceholder && $.fixPlaceholder(e);
                var i = a.children("span"),
                    r = n.children("span"),
                    o = F.find("button");
                o.on("click", function() {
                    var t, o = $.trim(e.val()),
                        s = e.attr("data-longitude"),
                        l = e.attr("data-latitude"),
                        c = e.attr("data-q"),
                        u = $.trim(a.attr("data-value") || ""),
                        d = $.trim(n.attr("data-value") || "");
                    return k = c, j = o, P = s, T = l, A = u, M = d, o && s && l ? u ? d ? (F.hide(), L.show(), t = {
                        mode: u,
                        range: d,
                        name: o,
                        sugName: c,
                        longitude: s,
                        latitude: l,
                        wayVal: $.trim(i.html()),
                        timeVal: $.trim(r.html())
                    }, E.html($.replaceTpl(B, t)), E.show(), _.trigger("houseContentHeightChange"), void _.trigger("steamUpdate", t)) : (n.addClass("i-remind"), void setTimeout(function() {
                        n.removeClass("i-remind")
                    }, 1e3)) : (a.addClass("i-remind"), void setTimeout(function() {
                        a.removeClass("i-remind")
                    }, 1e3)) : (e.addClass("i-remind"), e.focus(), void setTimeout(function() {
                        e.removeClass("i-remind"), e.focus()
                    }, 1e3))
                })
            }), _.on("steamUpdate", function(e, t) {
                var a = y.getZoom();
                y.centerAndZoom(t.longitude, t.latitude, 16), v.clear(!0), t.bubbleLevel = 4, t.isCenterBubble = !0, v.add([t]), 16 === a && (t.channel = "steamSearch", _.trigger("update", t))
            }), _.on("update_Steam", function(e, t) {
                v.hasCenter() && (u(a(), t), y.isClickEvent ? y.isClickEvent = !1 : C.hide())
            }), _.on("click_Steam", function(e, a) {
                var n = y.getZoom();
                y.isClickEvent = !0;
                var i = 16 > n ? "bizcycle" : "community";
                t(i), 16 > n ? y.centerAndZoom(a.longitude, a.latitude, 16) : (I = [a], r(I), y.isClickEvent = !1), l(a, 16 > n ? "2" : "3")
            }), _.on("update_house_add_Steam", function(e, t) {
                r(I, t.offset)
            }), _.on("update_house_sort_Steam", function(e) {
                r(I)
            }), E.on("click", ".i-btn-return", function() {
                F.show(), L.hide()
            }), $(document.body).on("mouseenter", ".bubble-3", function() {
                var e, t = $(this),
                    a = v.getCenter();
                "Steam" === g_conf.curChannel && !t.attr("data-disabled") && a && (e = a.getPosition(), p && v.clearLine(p) && (p = null), p = v.drawLine({
                    lng: parseFloat(t.attr("data-longitude")),
                    lat: parseFloat(t.attr("data-latitude"))
                }, e, t.attr("data-msg") || "", t))
            }).on("mouseleave", ".bubble-3", function() {
                var e = $(this);
                "Steam" !== g_conf.curChannel || e.attr("data-disabled") || p && v.clearLine(p) && (p = null)
            })
        }

        function m() {
            F.trigger("init"), L.hide(), F.show(), v.clear(!0), O.hide(), k = "", j = "", P = "", T = "", A = "", M = "", I = []
        }

        function g() {
            f()
        }
        var p, h = require("map/js/model"),
            _ = require("map/js/msg"),
            v = require("map/js/bubble"),
            b = require("map/js/house"),
            y = require("map/js/mapView"),
            C = require("map/js/card"),
            S = require("map/js/suggest"),
            x = g_conf.urlPath,
            w = x.basePath,
            k = "",
            j = "",
            P = "",
            T = "",
            A = "",
            M = "",
            I = [],
            N = $("#" + g_conf.houseListId),
            L = N.find(".r-list"),
            F = N.find(".r-ctrl"),
            E = N.find(".r-top"),
            O = N.find(".r-station_guide"),
            U = '<ol class="drop-list">#{content}</ol>',
            V = '<li data-value="#{value}" class="item">#{title}</li>',
            B = '<span class="i-top-remind">当前条件：</span>#{name}/#{wayVal}/#{timeVal}以内<span class="i-btn-return">修改条件</span>',
            q = {
                steamWay: [{
                    value: "walk",
                    title: "步行"
                }, {
                    value: "driving",
                    title: "自驾"
                }],
                steamTime: [{
                    value: "15m",
                    title: "15分钟"
                }, {
                    value: "30m",
                    title: "30分钟"
                }, {
                    value: "60m",
                    title: "60分钟"
                }]
            },
            D = {
                community: {
                    bubblePath: w + x.mapSearch.SteamCommunity,
                    bubbleParamArray: ["longitude", "latitude", "mode", "range", "min_longitude", "max_longitude", "min_latitude", "max_latitude"],
                    cardPath: w + x.cardSearch.SteamCommunity,
                    cardParamArray: ["id"],
                    housePath: w + x.houseList.SteamCommunity,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "longitude", "latitude", "mode", "range", "sort"]
                },
                bizcycle: {
                    bubblePath: w + x.mapSearch.SteamBizcycle,
                    bubbleParamArray: ["longitude", "latitude", "mode", "range", "min_longitude", "max_longitude", "min_latitude", "max_latitude"],
                    cardPath: w + x.cardSearch.SteamBizcycle,
                    cardParamArray: ["id"],
                    housePath: w + x.houseList.SteamBizcycle,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "longitude", "latitude", "mode", "range", "sort"]
                }
            },
            H = new h({
                bubblePath: D.community.bubblePath,
                bubbleParamArray: D.community.bubbleParamArray,
                cardPath: D.community.bubblePath,
                cardParamArray: D.community.bubbleParamArray,
                housePath: D.community.bubblePath,
                houseParamArray: D.community.bubblePath
            });
        return H.init = g, H.reset = m, e = H
    }), define("map/js/area", function(require, e) {
        function t(e) {
            $.each(["bubble", "card", "house"], function(t, a) {
                F[a + "Url"] = {
                    path: N[e][a + "Path"],
                    params: N[e][a + "ParamArray"]
                }
            })
        }

        function a() {
            var e = S.getBounds(),
                t = {
                    min_longitude: e.min_longitude,
                    max_longitude: e.max_longitude,
                    min_latitude: e.min_latitude,
                    max_latitude: e.max_latitude
                };
            return t
        }

        function n(e) {
            return 13 >= e ? "district" : e >= 16 ? "community" : "bizcycle"
        }

        function i(e) {
            return 13 >= e ? "5" : e >= 16 ? "3" : "2"
        }

        function r(e) {
            return e >= 16 ? "3" : e >= 14 ? "2" : "1"
        }

        function o(e) {
            return 14 > e ? 14 : 16 > e ? 16 : void 0
        }

        function s(e) {
            var t = [],
                a = S.getBounds(),
                n = {
                    min_longitude: parseFloat(a.min_longitude),
                    max_longitude: parseFloat(a.max_longitude),
                    min_latitude: parseFloat(a.min_latitude),
                    max_latitude: parseFloat(a.max_latitude)
                };
            return $.each(e, function(e, a) {
                var i = parseFloat(a.longitude),
                    r = parseFloat(a.latitude);
                i <= n.max_longitude && i >= n.min_longitude && r <= n.max_latitude && r >= n.min_latitude && t.push(a)
            }), t
        }

        function l(e) {
            var t = i(S.getZoom());
            return e = e && e.data || [], e = s(e || []), $.each(e, function(e, a) {
                a.bubbleLevel = t
            }), e
        }

        function c(e, t) {
            var a, n = "undefined" != typeof t,
                i = [];
            F.houseAjax && (F.houseAjax.cbFunc = null, F.houseAjax = null), $.each(e, function(e, t) {
                i.push(t.id)
            }), a = {
                ids: i.join(","),
                limit_offset: 10 * (t || 0),
                limit_count: 10,
                sort: g_conf.houseListSortCtrl
            }, e.length ? F.getHouseList(a, function(e) {
                u(e, n, t)
            }) : u({
                data: {
                    total_count: 0,
                    list: []
                }
            }, n, t)
        }

        function u(e, t, a) {
            t ? C.add(e, a) : C.render(e)
        }

        function d(e) {
            y.clear(), y.add(e)
        }

        function f(e, t, a) {
            F.cardAjax && (F.cardAjax.cbFunc = null, F.cardAjax = null);
            var n = {
                id: e.id
            };
            F.getCards(n, function(e) {
                m(e, t)
            }, a)
        }

        function m(e, t) {
            x.render(e.data, t, L[t][0], L[t][1]), x.show()
        }

        function g(e, a) {
            t(n(S.getZoom())), F.bubbleAjax && (F.bubbleAjax.cbFunc = null, F.bubbleAjax = null), F.getBubbles(e, function(e) {
                e = l(e), j = e, c(e), d(e)
            })
        }

        function p() {
            b.on("update_Area", function(e, t) {
                g(a(), t), S.isClickEvent ? S.isClickEvent = !1 : x.hide()
            }), b.on("click_Area", function(e, a) {
                var i = S.getZoom();
                S.isClickEvent = !0;
                var s = n(i);
                t(s), 16 > i ? S.centerAndZoom(a.longitude, a.latitude, o(i)) : (j = [a], c(j), S.isClickEvent = !1), f(a, r(i))
            }), b.on("update_house_add_Area", function(e, t) {
                c(j, t.offset)
            }), b.on("update_house_sort_Area", function(e) {
                c(j)
            })
        }

        function h(e) {
            if (T.show(), A.hide(), M.hide(), I.hide(), b.trigger("houseContentHeightChange"), y.clear(!0), j = [], e) {
                var a = g_conf.searchConf;
                if (a) {
                    var i = a.longitude,
                        o = a.latitude,
                        s = a.type,
                        l = E[s],
                        c = l === S.getZoom();
                    S.isClickEvent = !0, t(n(l)), i && o ? (a.id && ("" + a.id).split(",").length > 1 ? S.isClickEvent = !1 : f(a, r(l)), S.centerAndZoom(i, o, l)) : (S.isClickEvent = !1, S.resetMap()), c && b.trigger("update_Area", {
                        channel: "code"
                    })
                }
            } else S.isClickEvent = !0, f({
                id: g_conf.cityId
            }, "0", k + w.cardSearch.AreaCity + "?id=" + g_conf.cityId), 12 == S.getZoom() && b.trigger("update")
        }

        function _() {
            p()
        }
        var v = require("map/js/model"),
            b = require("map/js/msg"),
            y = require("map/js/bubble"),
            C = require("map/js/house"),
            S = require("map/js/mapView"),
            x = require("map/js/card"),
            w = g_conf.urlPath,
            k = w.basePath,
            j = [],
            P = $("#" + g_conf.houseListId),
            T = P.find(".r-list"),
            A = P.find(".r-ctrl"),
            M = P.find(".r-top"),
            I = P.find(".r-station_guide"),
            N = {
                community: {
                    bubblePath: k + w.mapSearch.AreaCommunity,
                    bubbleParamArray: ["min_longitude", "max_longitude", "min_latitude", "max_latitude"],
                    cardPath: k + w.cardSearch.AreaCommunity,
                    cardParamArray: ["id"],
                    housePath: k + w.houseList.AreaCommunity,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                },
                bizcycle: {
                    bubblePath: k + w.mapSearch.AreaBizcycle,
                    bubbleParamArray: [],
                    cardPath: k + w.cardSearch.AreaBizcycle,
                    cardParamArray: ["id"],
                    housePath: k + w.houseList.AreaBizcycle,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                },
                district: {
                    bubblePath: k + w.mapSearch.AreaDistrict,
                    bubbleParamArray: [],
                    cardPath: k + w.cardSearch.AreaDistrict,
                    cardParamArray: ["id"],
                    housePath: k + w.houseList.AreaDistrict,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                }
            },
            L = {
                2: ["商圈"],
                3: ["小区"],
                1: ["区域", "商圈"],
                0: ["城市", "区域"]
            },
            F = new v({
                bubblePath: N.community.bubblePath,
                bubbleParamArray: N.community.bubbleParamArray,
                cardPath: N.community.bubblePath,
                cardParamArray: N.community.bubbleParamArray,
                housePath: N.community.bubblePath,
                houseParamArray: N.community.bubblePath
            }),
            E = {
                district: 12,
                bizcircle: 14,
                community: 16,
                other: 12
            };
        return F.init = _, F.reset = h, e = F
    }), define("map/js/school", function(require, e) {
        function t(e) {
            $.each(["bubble", "card", "house"], function(t, a) {
                B[a + "Url"] = {
                    path: U[e][a + "Path"],
                    params: U[e][a + "ParamArray"]
                }
            })
        }

        function a() {
            var e = j.getBounds(),
                t = {
                    min_longitude: e.min_longitude,
                    max_longitude: e.max_longitude,
                    min_latitude: e.min_latitude,
                    max_latitude: e.max_latitude
                };
            return t
        }

        function n(e) {
            return 13 >= e ? "district" : e >= 16 ? "community" : "school"
        }

        function i(e) {
            return 13 >= e ? "6" : e >= 16 ? "3" : "7"
        }

        function r(e) {
            return e >= 16 ? "3" : e >= 14 ? "5" : "4"
        }

        function o(e) {
            return 14 > e ? 14 : 16 > e ? 16 : void 0
        }

        function s(e) {
            var t = [],
                a = j.getBounds(),
                n = {
                    min_longitude: parseFloat(a.min_longitude),
                    max_longitude: parseFloat(a.max_longitude),
                    min_latitude: parseFloat(a.min_latitude),
                    max_latitude: parseFloat(a.max_latitude)
                };
            return $.each(e, function(e, a) {
                var i = parseFloat(a.longitude),
                    r = parseFloat(a.latitude);
                i <= n.max_longitude && i >= n.min_longitude && r <= n.max_latitude && r >= n.min_latitude && t.push(a)
            }), t
        }

        function l(e) {
            var t = i(j.getZoom());
            if (e = e && e.data || [], e = s(e || []), $.each(e, function(e, a) {
                a.bubbleLevel = t
            }), "3" === t && g_conf.allSchoolMsg) {
                var a = s(g_conf.allSchoolMsg);
                $.each(a, function(t, a) {
                    a.isExactSchool = !0, a.bubbleLevel = "8", e.push(a)
                })
            } else $.each(e, function(e, t) {
                t.isExactSchool = !1
            });
            return e
        }

        function c(e, t) {
            var a, n = "undefined" != typeof t,
                i = [];
            B.houseAjax && (B.houseAjax.cbFunc = null, B.houseAjax = null), $.each(e, function(e, t) {
                !t.isExactSchool && i.push(t.id)
            }), a = {
                ids: i.join(","),
                limit_offset: 10 * (t || 0),
                limit_count: 10,
                sort: g_conf.houseListSortCtrl
            }, e.length ? B.getHouseList(a, function(e) {
                u(e, n, t)
            }) : u({
                data: {
                    total_count: 0,
                    list: []
                }
            }, n, t)
        }

        function u(e, t, a) {
            $.each(e.data.list, function(e, t) {
                t.curFuckType = "school"
            }), t ? k.add(e, a) : k.render(e)
        }

        function d(e) {
            w.clear(), w.add(e)
        }

        function f(e, a, n) {
            B.cardAjax && (B.cardAjax.cbFunc = null, B.cardAjax = null);
            var i = {
                id: e.id
            };
            e.isSchool && t("school"), B.getCards(i, function(e) {
                m(e, a)
            }, n), e.isSchool && t("community")
        }

        function m(e, t) {
            P.render(e.data, t, V[t][0], V[t][1]), P.show()
        }

        function g(e) {
            var t = [],
                a = I && I.id;
            return a ? ($.each(e, function(e, n) {
                (n.school_id == a || n.isExactSchool) && t.push(n)
            }), I = null) : t = e, t
        }

        function p(e, a) {
            t(n(j.getZoom())), B.bubbleAjax && (B.bubbleAjax.cbFunc = null, B.bubbleAjax = null), B.getBubbles(e, function(e) {
                e = l(e), e = g(e), M = e, c(e), d(e)
            })
        }

        function h() {
            x.on("update_School", function(e, t) {
                j.getZoom();
                p(a(), t), j.isClickEvent ? j.isClickEvent = !1 : P.hide()
            }), x.on("click_School", function(e, a) {
                var i = j.getZoom(),
                    s = a.isSchool;
                j.isClickEvent = !0;
                var l = n(i);
                t(l), I = s ? {
                    lng: a.longitude,
                    lat: a.latitude,
                    id: a.id
                } : null, 16 > i ? j.centerAndZoom(a.longitude, a.latitude, o(i)) : s ? (j.getMap().setCenter(new BMap.Point(a.longitude, a.latitude)), x.trigger("update_School", {
                    channel: "clickSchool"
                })) : (M = [a], c(M), j.isClickEvent = !1), f(a, s ? "5" : r(i))
            }), x.on("update_house_add_School", function(e, t) {
                c(M, t.offset)
            }), x.on("update_house_sort_School", function(e) {
                c(M)
            }), $(document.body).on("mouseenter", ".bubble-3", function() {
                var e, t = $(this);
                if ("School" === g_conf.curChannel) {
                    var a, n = {
                        lng: parseFloat(t.attr("data-longitude")),
                        lat: parseFloat(t.attr("data-latitude"))
                    };
                    if (e = v(t.attr("data-schoolid")), C && w.clearLine(C) && (C = null), !e) return;
                    a = {
                        lng: parseFloat(e.longitude),
                        lat: parseFloat(e.latitude)
                    }, C = w.drawLine(n, a, "距" + e.name + _(n, a) + "公里", t)
                }
            }).on("mouseleave", ".bubble-3", function() {
                $(this);
                "School" === g_conf.curChannel && C && w.clearLine(C) && (C = null)
            })
        }

        function _(e, t) {
            return (j.getMap().getDistance(new BMap.Point(e.lng, e.lat), new BMap.Point(t.lng, t.lat)) / 1e3).toFixed(1)
        }

        function v(e) {
            var t;
            return g_conf.allSchoolMsg ? ($.each(g_conf.allSchoolMsg, function(a, n) {
                return n.id == e ? (t = n, !1) : void 0
            }), t) : t
        }

        function b(e) {
            if (L.show(), F.hide(), E.hide(), O.hide(), x.trigger("houseContentHeightChange"), w.clear(!0), M = [], e) {
                var a = g_conf.searchConf;
                if (a) {
                    var i = a.longitude,
                        o = a.latitude,
                        s = a.type,
                        l = q[s],
                        c = l === j.getZoom();
                    j.isClickEvent = !0, t(n(l)), i && o ? (f(a, r(l)), j.centerAndZoom(i, o, l)) : (j.isClickEvent = !1, j.resetMap()), c && x.trigger("update_School", {
                        channel: "code"
                    })
                }
            } else 12 == j.getZoom() && x.trigger("update")
        }

        function y() {
            h()
        }
        var C, S = require("map/js/model"),
            x = require("map/js/msg"),
            w = require("map/js/bubble"),
            k = require("map/js/house"),
            j = require("map/js/mapView"),
            P = require("map/js/card"),
            T = g_conf.urlPath,
            A = T.basePath,
            M = [],
            I = null,
            N = $("#" + g_conf.houseListId),
            L = N.find(".r-list"),
            F = N.find(".r-ctrl"),
            E = N.find(".r-top"),
            O = N.find(".r-station_guide"),
            U = {
                community: {
                    bubblePath: A + T.mapSearch.SchoolCommunity,
                    bubbleParamArray: ["min_longitude", "max_longitude", "min_latitude", "max_latitude"],
                    cardPath: A + T.cardSearch.SchoolCommunity,
                    cardParamArray: ["id"],
                    housePath: A + T.houseList.SchoolCommunity,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                },
                school: {
                    bubblePath: A + T.mapSearch.SchoolSchool,
                    bubbleParamArray: [],
                    cardPath: A + T.cardSearch.SchoolSchool,
                    cardParamArray: ["id"],
                    housePath: A + T.houseList.SchoolSchool,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                },
                district: {
                    bubblePath: A + T.mapSearch.SchoolDistrict,
                    bubbleParamArray: [],
                    cardPath: A + T.cardSearch.SchoolDistrict,
                    cardParamArray: ["id"],
                    housePath: A + T.houseList.SchoolDistrict,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                }
            },
            V = {
                3: ["小区"],
                4: ["区域", "所优质小学"],
                5: ["学区", "个划片小区"]
            },
            B = new S({
                bubblePath: U.community.bubblePath,
                bubbleParamArray: U.community.bubbleParamArray,
                cardPath: U.community.bubblePath,
                cardParamArray: U.community.bubbleParamArray,
                housePath: U.community.bubblePath,
                houseParamArray: U.community.bubblePath
            }),
            q = {
                school: 14
            };
        return B.init = y, B.reset = b, e = B
    }), define("map/js/station", function(require, e) {
        function t(e) {
            $.each(["bubble", "card", "house"], function(t, a) {
                G[a + "Url"] = {
                    path: Z[e][a + "Path"],
                    params: Z[e][a + "ParamArray"]
                }
            })
        }

        function a() {
            var e = L.getBounds(),
                t = {
                    min_longitude: e.min_longitude,
                    max_longitude: e.max_longitude,
                    min_latitude: e.min_latitude,
                    max_latitude: e.max_latitude,
                    line_id: P
                };
            return t
        }

        function n(e) {
            return e >= 16 ? "community" : "station"
        }

        function i(e) {
            return e >= 16 ? "3" : "9"
        }

        function r(e) {
            return e >= 16 ? "3" : e >= 14 ? "2" : "1"
        }

        function o(e) {
            return 16 > e ? 16 : void 0
        }

        function s(e) {
            var t = [],
                a = L.getBounds(),
                n = {
                    min_longitude: parseFloat(a.min_longitude),
                    max_longitude: parseFloat(a.max_longitude),
                    min_latitude: parseFloat(a.min_latitude),
                    max_latitude: parseFloat(a.max_latitude)
                };
            return $.each(e, function(e, a) {
                var i = parseFloat(a.longitude),
                    r = parseFloat(a.latitude);
                i <= n.max_longitude && i >= n.min_longitude && r <= n.max_latitude && r >= n.min_latitude && t.push(a)
            }), t
        }

        function l(e) {
            var t = i(L.getZoom());
            if (e = e && e.data || [], e = s(e || []), $.each(e, function(e, a) {
                a.bubbleLevel = t
            }), "3" === t && g_conf.allStationMsg && P) {
                var a = s(v(P).station);
                $.each(a, function(t, a) {
                    a.isExactStation = !0, a.bubbleLevel = "10", e.push(a)
                })
            } else $.each(e, function(e, t) {
                t.isExactStation = !1
            });
            return e
        }

        function c(e, t) {
            var a, n = "undefined" != typeof t,
                i = [];
            G.houseAjax && (G.houseAjax.cbFunc = null, G.houseAjax = null), $.each(e, function(e, t) {
                !t.isExactStation && i.push(t.id)
            }), a = {
                ids: i.join(","),
                limit_offset: 10 * (t || 0),
                limit_count: 10,
                sort: g_conf.houseListSortCtrl,
                id: g_conf.cityId
            }, e.length ? G.getHouseList(a, function(e) {
                u(e, n, t)
            }) : u({
                data: {
                    total_count: 0,
                    list: []
                }
            }, n, t)
        }

        function u(e, t, a) {
            $.each(e.data.list, function(e, t) {
                t.curFuckType = "station"
            }), t ? N.add(e, a) : N.render(e)
        }

        function d(e) {
            I.clear(), I.add(e)
        }

        function f(e, t, a) {
            G.cardAjax && (G.cardAjax.cbFunc = null, G.cardAjax = null);
            var n = {
                id: e.id
            };
            G.getCards(n, function(e) {
                m(e, t)
            }, a)
        }

        function m(e, t) {
            F.render(e.data, t, Y[t][0], Y[t][1]), F.show()
        }

        function g(e, a) {
            t(n(L.getZoom())), G.bubbleAjax && (G.bubbleAjax.cbFunc = null, G.bubbleAjax = null), G.getBubbles(e, function(e) {
                e = l(e), U = e, c(e), d(e)
            })
        }

        function p() {
            M.on("update_Station", function(e, n) {
                !D && P ? (g(a(), n), L.isClickEvent ? L.isClickEvent = !1 : F.hide()) : n && "filter" === n.channel && (t("defaults"), U = [0], c(U))
            }), M.on("click_Station", function(e, a) {
                var i = L.getZoom();
                L.isClickEvent = !0;
                var s = n(i);
                t(s), a.imSpecial ? L.centerAndZoom(a.longitude, a.latitude, 16) : 16 > i ? L.centerAndZoom(a.longitude, a.latitude, o(i)) : (U = [a], c(U), L.isClickEvent = !1, f(a, r(i)))
            }), M.on("update_house_add_Station", function(e, t) {
                c(U, t.offset)
            }), M.on("update_house_sort_Station", function(e) {
                c(U)
            }), $(document.body).on("mouseenter", ".bubble-3", function() {
                var e, t = $(this);
                if ("Station" === g_conf.curChannel) {
                    var a, n = {
                        lng: parseFloat(t.attr("data-longitude")),
                        lat: parseFloat(t.attr("data-latitude"))
                    };
                    if (e = _(t.attr("data-station"), P), j && I.clearLine(j) && (j = null), !e) return;
                    a = {
                        lng: parseFloat(e.longitude),
                        lat: parseFloat(e.latitude)
                    }, j = I.drawLine(n, a, "距" + e.name + h(n, a) + "公里", t)
                }
            }).on("mouseleave", ".bubble-3", function() {
                $(this);
                "Station" === g_conf.curChannel && j && I.clearLine(j) && (j = null)
            }), W.on("mouseenter", ".subway-select", function() {
                C(), setTimeout(function() {
                    q && q.show()
                }, 0)
            }).on("mouseleave", ".subway-select", function() {
                q && q.hide()
            }), W.on("click", ".subway-trigger", function() {
                var e = $(this);
                "station" === e.attr("data-type") ? (P = e.attr("data-parentid"), T = e.attr("data-id")) : (P = e.attr("data-id"), T = ""), S(v(P).name, {
                    curLineId: P,
                    curStationId: T,
                    lat: e.attr("data-latitude"),
                    lng: e.attr("data-longitude")
                }), B = B || W.find(".subway-res"), B.html(e.html()), q.hide(), F.hide()
            });
            var e, i;
            J.on("click", ".subway-trigger", function() {
                var t = $(this);
                "station" === t.attr("data-type") ? (P = t.attr("data-parentid"), T = t.attr("data-id")) : (P = t.attr("data-id"), T = ""), e && e.hide(), e = null, i && i.removeClass("line-item_hover"), i = null, x(!0, {
                    curLineId: P,
                    curStationId: T,
                    lat: t.attr("data-latitude"),
                    lng: t.attr("data-longitude"),
                    tle: t.attr("title")
                })
            }), J.on("mouseenter", ".line-item", function() {
                e && e.hide(), (e = J.find(".station-id-" + $(this).attr("data-id"))).show(), i && i.removeClass("line-item_hover"), (i = $(this)).addClass("line-item_hover")
            }).on("mouseleave", ".subway-list", function() {
                e && e.hide(), e = null, i && i.removeClass("line-item_hover"), i = null
            });
            var s, l = $(window);
            l.on("resize", function() {
                s && clearTimeout(s), s = setTimeout(function() {
                    M.trigger("stationSelectHeightChange")
                }, 16)
            }), M.on("stationSelectHeightChange", function() {
                if (V) {
                    var e = V.offset().top;
                    e && V.height(l.height() - e)
                }
            })
        }

        function h(e, t) {
            return (L.getMap().getDistance(new BMap.Point(e.lng, e.lat), new BMap.Point(t.lng, t.lat)) / 1e3).toFixed(1);
        }

        function _(e, t) {
            var a;
            return g_conf.allStationMsg ? ($.each(g_conf.allStationMsg, function(n, i) {
                return t && i.id != t || ($.each(i.station, function(t, n) {
                    return n.id == e ? (a = n, !1) : void 0
                }), !a) ? void 0 : !1
            }), a) : a
        }

        function v(e) {
            var t = {};
            return g_conf.allStationMsg ? ($.each(g_conf.allStationMsg, function(a, n) {
                return n.id == e ? (t = n, !1) : void 0
            }), t) : t
        }

        function b(e) {
            var t = '<div class="subway-msg">选择地铁线/地铁站：<span class="subway-res">#{res}</span><div class="subway-select"><i></i>选择地铁</div></div>';
            e ? g_conf.searchConf && ("subway_station" === g_conf.searchConf.type ? (T = g_conf.searchConf.id, P = _(T).lineId) : "subway_line" === g_conf.searchConf.type && (P = g_conf.searchConf.id, T = "")) : (P = "", T = ""), W.html($.replaceTpl(t, {
                res: e || "无"
            })), B = W.find(".subway-res"), W.show()
        }

        function y(e, t) {
            var a = '<div class="subway-list"><div class="subway-list-inner"><ol>',
                n = '<li class="line-item" data-id="#{id}"><span class="item-line subway-trigger" data-id="#{id}" data-type="line" title="#{name}">#{name}' + (e || "") + "</span>#{content}</li>",
                i = '<li class="station-item"><span class="item-station subway-trigger" data-id="#{id}" data-type="station" data-parentid="#{fatherId}" title="#{name}" data-latitude="#{latitude}" data-longitude="#{longitude}">#{name}</span></li>',
                r = g_conf.allStationMsg.length,
                o = Math.max(9, r - 1),
                s = "";
            return $.each(g_conf.allStationMsg, function(e, r) {
                var l = '<div class="station-wrapper' + (t ? " station-id-" + r.id : "") + '"><ol class="station-list">',
                    c = r.station.length;
                $.each(r.station, function(e, t) {
                    t.fatherId = r.id, l += $.replaceTpl(i, t), t.fatherId = void 0, e % o === o - 1 && e !== c - 1 && (l += '</ol><ol class="station-list">')
                }), l += "</ol></div>", s += l, r.content = t ? "" : l, a += $.replaceTpl(n, r), r.content = void 0
            }), a += "</ol></div>" + (t ? s : "") + "</div>"
        }

        function C() {
            !W.find(".subway-list").length && g_conf.allStationMsg && (W.find(".subway-select").append(y()), q = W.find(".subway-list"))
        }

        function S(e, t) {
            g_conf.curLineMap && (g_conf.curLineMap.clearResults(), g_conf.curLineMap = null), D = !0, g_conf.curLineMap = new BMap.BusLineSearch(L.getMap(), {
                renderOptions: {
                    map: L.getMap()
                },
                onPolylinesSet: function() {},
                onGetBusListComplete: function(e) {
                    if (e) {
                        var n = e.getBusListItem(0);
                        g_conf.curLineMap.getBusLine(n), setTimeout(function() {
                            D = !1, t && t.curStationId && M.trigger("click_Station", {
                                latitude: t.lat,
                                longitude: t.lng,
                                imSpecial: !0
                            }), g(a())
                        }, 1e3)
                    }
                }
            }), setTimeout(function() {
                g_conf.curLineMap.getBusList("地铁" + e), g_conf.curLineMap.setMarkersSetCallback(function(e) {
                    setTimeout(function() {
                        var t = L.getMap();
                        $.each(e, function(e, a) {
                            t.removeOverlay(a)
                        })
                    }, 200)
                })
            }, 10)
        }

        function x(e, a) {
            if (z.show(), R.hide(), W.hide(), F.hide(), b(e && (a && a.tle || g_conf.searchConf && g_conf.searchConf.text)), M.trigger("houseContentHeightChange"), I.clear(!0), U = [], e)
                if (a) J.hide(), t(n(Q[a.curStationId ? "subway_station" : "subway_line"])), S(v(a.curLineId).name, a);
                else {
                    var i = g_conf.searchConf;
                    if (J.hide(), i) {
                        var r, o, s, l = i.type,
                            c = Q[l];
                        "subway_station" === l ? (o = i.id, r = _(T).lineId) : "subway_line" === l && (r = i.id), o && (s = _(o, r)), t(n(c)), S(v(r).name, {
                            curLineId: r,
                            curStationId: o,
                            lat: s && s.latitude,
                            lng: s && s.longitude
                        })
                    }
                } else z.hide(), J.show(), M.trigger("stationSelectHeightChange")
        }

        function w() {
            p(), $.ajax({
                url: O + E.subwayIndex,
                dataType: "jsonp",
                data: {
                    city_id: g_conf.cityId
                },
                jsonp: "callback"
            }).done(function(e) {
                e = e && e.data || null;
                var t, a, n, i = [],
                    r = {};
                if ($.each(["46537781", "43144829", "46537784"], function(e, t) {
                    r[t] = !0
                }), e) {
                    for (t in e)
                        if (e.hasOwnProperty(t)) {
                            if (a = e[t], r[a.id]) continue;
                            i.push(a), a.station = [];
                            for (n in a.stations) a.stations.hasOwnProperty(n) && a.stations[n].longitude && a.stations[n].latitude && (a.stations[n].lineId = a.id, a.station.push(a.stations[n]));
                            a.station.sort(function(e, t) {
                                var a = parseInt(e.order_no, 10) - parseInt(t.order_no, 10);
                                if (isNaN(a)) {
                                    var n;
                                    return n = isNaN(parseInt(e.order_no, 10)) ? isNaN(parseInt(t.order_no, 10)) ? 0 : 1 : -1
                                }
                                return a > 0 ? 1 : 0 > a ? -1 : 0
                            })
                        }
                    i.sort(function(e, t) {
                        var a = parseInt(e.sorting_order, 10) - parseInt(t.sorting_order, 10);
                        if (isNaN(a)) {
                            var n;
                            return n = isNaN(parseInt(e.sorting_order, 10)) ? isNaN(parseInt(t.sorting_order, 10)) ? 0 : 1 : -1
                        }
                        return a > 0 ? 1 : 0 > a ? -1 : 0
                    }), g_conf.allStationMsg = i, k()
                }
            })
        }

        function k() {
            var e = '<p class="r-header">请选择地铁线路<span class="strong">全市共#{num}条线路</span></p>';
            $.ajax({
                url: O + E.subwayLineInfo,
                dataType: "jsonp",
                data: {
                    city_id: g_conf.cityId
                },
                jsonp: "callback"
            }).done(function(t) {
                t = t && t.data || {}, $.each(g_conf.allStationMsg, function(e, a) {
                    a.house_count = t[a.id] && t[a.id].house_count || 0
                }), J.html($.replaceTpl(e, {
                    num: g_conf.allStationMsg.length
                }) + y('<span class="item-count">#{house_count}套<span class="item-marker">&gt;</span></span>', !0)), V = J.find(".subway-list")
            })
        }
        var j, P, T, A = require("map/js/model"),
            M = require("map/js/msg"),
            I = require("map/js/bubble"),
            N = require("map/js/house"),
            L = require("map/js/mapView"),
            F = require("map/js/card"),
            E = g_conf.urlPath,
            O = E.basePath,
            U = [];
        g_conf.curLineMap = null;
        var V, B, q, D = !1,
            H = $("#" + g_conf.houseListId),
            z = H.find(".r-list"),
            R = H.find(".r-ctrl"),
            W = H.find(".r-top"),
            J = H.find(".r-station_guide"),
            Z = {
                community: {
                    bubblePath: O + E.mapSearch.StationCommunity,
                    bubbleParamArray: ["min_longitude", "max_longitude", "min_latitude", "max_latitude", "line_id"],
                    cardPath: O + E.cardSearch.StationCommunity,
                    cardParamArray: ["id"],
                    housePath: O + E.houseList.StationCommunity,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                },
                station: {
                    bubblePath: O + E.mapSearch.StationStation,
                    bubbleParamArray: ["line_id"],
                    cardPath: "",
                    cardParamArray: [],
                    housePath: O + E.houseList.StationStation,
                    houseParamArray: ["ids", "limit_offset", "limit_count", "sort"]
                },
                defaults: {
                    bubblePath: "",
                    bubbleParamArray: [],
                    cardPath: "",
                    cardParamArray: [],
                    housePath: O + E.houseList.StationDefault,
                    houseParamArray: ["id", "limit_offset", "limit_count", "sort"]
                }
            },
            Y = {
                2: ["商圈"],
                3: ["小区"],
                1: ["区域", "商圈"],
                0: ["城市", "区域"]
            },
            G = new A({
                bubblePath: Z.community.bubblePath,
                bubbleParamArray: Z.community.bubbleParamArray,
                cardPath: Z.community.bubblePath,
                cardParamArray: Z.community.bubbleParamArray,
                housePath: Z.community.bubblePath,
                houseParamArray: Z.community.bubblePath
            }),
            Q = {
                subway_station: 16,
                subway_line: 12
            };
        return G.init = w, G.reset = x, e = G
    }), define("map/js/sidebar", function(require, e) {
        var t = require("map/js/mapView"),
            a = require("map/js/steam"),
            n = require("map/js/area"),
            i = require("map/js/school"),
            r = require("map/js/station"),
            o = require("map/js/msg"),
            s = $("#" + g_conf.sidebarId),
            l = s.find(".ctrl"),
            c = l.find("li").eq(0),
            u = s.find(".slide-bg"),
            d = s.find(".r-hd2"),
            f = d.find("li"),
            m = f.eq(0),
            g = d.find(".s-new"),
            p = d.find(".s-station"),
            h = s.find(".r-container"),
            _ = $(window),
            v = $(".r-hd_i_school").parent().get(0),
            b = {
                bindEvent: function() {
                    d.on("click", "li", function() {
                        var e = $(this);
                        e.hasClass("on") ? (e.hasClass("s-area") || e.hasClass("s-price")) && (e.hasClass("s-desc") ? e.attr("data-type", e.attr("data-val2")) : e.attr("data-type", e.attr("data-val1")), e.toggleClass("s-desc"), g_conf.houseListSortCtrl = e.attr("data-type"), o.trigger("update_house_sort_" + g_conf.curChannel)) : (m.removeClass("on"), e.addClass("on"), (m.hasClass("s-area") || m.hasClass("s-price")) && (m.hasClass("s-desc") || (m.attr("data-type", m.attr("data-val1")), m.addClass("s-desc"))), m = e, g_conf.houseListSortCtrl = e.attr("data-type"), o.trigger("update_house_sort_" + g_conf.curChannel))
                    })
                },
                reset: function(e) {
                    $.each(f, function(e, t) {
                        var a = $(this);
                        a.removeClass("on"), (a.hasClass("s-area") || a.hasClass("s-price")) && (a.hasClass("s-desc") || (a.attr("data-type", a.attr("data-val1")), a.addClass("s-desc")))
                    }), e ? (p.show(), g.hide()) : (p.hide(), g.show()), m = f.eq(0), m.addClass("on"), g_conf.houseListSortCtrl = ""
                }
            },
            y = {
                switchTab: function(e, a, n) {
                    var i = e.attr("data-type");
                    v.className = "r-hd_" + i, a || (g_conf.searchConf = null), !a && e.hasClass("on") || (c.removeClass("on"), e.addClass("on"), c = e), u.css({
                        top: e.attr("data-top") + "px"
                    }), g_conf.curChannel = i, n || o.trigger("resetIgnoreSearch"), o.trigger("mapSideCtrlChange"), b.reset(), g_conf.curLineMap && (g_conf.curLineMap.clearResults(), g_conf.curLineMap = null), (!a || n) && t.resetMap(), setTimeout(function() {
                        y["reset" + i](n ? !1 : a)
                    }, 70)
                },
                bindEvent: function() {
                    var e;
                    l.on("click", "li", function() {
                        y.switchTab($(this))
                    }).on("mouseenter", "li", function() {
                        u.css({
                            top: $(this).attr("data-top") + "px"
                        })
                    }), l.find("ol").on("mouseleave", function() {
                        u.css({
                            top: c.attr("data-top") + "px"
                        })
                    }), _.on("resize", function() {
                        e && clearTimeout(e), e = setTimeout(function() {
                            o.trigger("houseContentHeightChange")
                        }, 16)
                    }), o.on("houseContentHeightChange", function() {
                        var e = h.offset().top;
                        e && h.height(_.height() - e)
                    })
                },
                resetArea: function(e) {
                    n.reset(e)
                },
                resetStation: function(e) {
                    r.reset(e)
                },
                resetSchool: function(e) {
                    i.reset(e)
                },
                resetSteam: function(e) {
                    a.reset(e)
                },
                init: function() {
                    var e = $.queryToJson(location.search.split("?")[1], 1);
                    y.bindEvent(), $.trim(e.q || "") || ("steam" === e.bar ? y.switchTab(l.find("li[data-type='Steam']")) : y.resetArea()), b.bindEvent(), l.find("li").each(function(e, t) {
                        var a = $(this);
                        a.attr("data-top", a.attr("data-ave") * e)
                    })
                }
            };
        return e = y
    }), define("map/js/search", function(require, exports) {
        function bindEachFilter(e) {
            return e.each(function(e, t) {
                var a = $(this),
                    n = a.find(".drop-list"),
                    i = a.find(".drop-i"),
                    r = a.find("span"),
                    o = r.html(),
                    s = null;
                a.on("click", ".item", function(e) {
                    var t = $(this),
                        l = $.trim(t.attr("data-value")) || "",
                        c = a.attr("data-value") || "",
                        u = [],
                        d = "";
                    c != l && (a.attr("data-value", l), l ? r.html(t.html()) : r.html(o), $liFilter.each(function(e, t) {
                        d = $(this).attr("data-value"), d && u.push(d)
                    }), g_conf.filterSearchSideCtrl = u.join("&"), eventEmitter.trigger("update", {
                        channel: "filter",
                        cur: g_conf.filterSearchSideCtrl
                    }), s = s || a.find(".item").eq(0), s.removeClass("clicked"), t.addClass("clicked"), s = t), n.length || (n = a.find(".drop-list")), n.hide(), i.removeClass("drop-open")
                }).on("mouseenter", "p", function(e) {
                    e.stopPropagation()
                }).on("mouseenter", function() {
                    n.length || (n = a.find(".drop-list")), n.show(), i.addClass("drop-open")
                }).on("mouseleave", function() {
                    n.length || (n = a.find(".drop-list")), n.hide(), i.removeClass("drop-open")
                }).on("resetFilter", function() {
                    s && s.removeClass("clicked"), (s = a.find(".item").eq(0)).addClass("clicked"), a.attr("data-value", ""), r.html(o), g_conf.filterSearchSideCtrl = ""
                })
            }), eventEmitter.on("resetFilter", function() {
                e.each(function() {
                    $(this).trigger("resetFilter")
                })
            }), e
        }

        function bindFilterEvent() {
            var e = $aside.find(".li"),
                t = $aside.find(".li-other");
            e.one("mouseenter", function() {
                    var e = $(this),
                        t = e.attr("data-type"),
                        a = "";
                    tplConf[t] && ($.each(tplConfFilter(tplConf[t], t), function(e, t) {
                        t.isFirst = 0 === e ? " clicked" : "", a += $.replaceTpl(tpl, t)
                    }), e.append($.replaceTpl(g_tpl, {
                        content: a
                    })))
                }),
                function() {
                    var e = t,
                        a = e.children(".li-mixin"),
                        n = e.children(".drop-i");
                    e.children("span");
                    ! function(e) {
                        var t = "";
                        $.each(moreWrapConf, function(e, a) {
                            t += $.replaceTpl(moreTpl, a)
                        }), e.append($.replaceTpl(more_g_tpl, {
                            content: t
                        })), $liFilter = $aside.find(".li-filter"), bindEachFilter(e.find(".li").one("mouseenter", function() {
                            var e = $(this),
                                t = e.attr("data-type"),
                                a = "";
                            moreConf[t] && ($.each(moreConf[t], function(e, t) {
                                t.isFirst = 0 === e ? " clicked" : "", a += $.replaceTpl(tpl, t)
                            }), e.append($.replaceTpl(g_tpl, {
                                content: a
                            })))
                        }))
                    }(e), e.on("mouseenter", function() {
                        a.length || (a = e.children(".li-mixin")), a.show(), n.addClass("drop-open")
                    }).on("mouseleave", function() {
                        a.length || (a = e.children(".li-mixin")), a.hide(), n.removeClass("drop-open")
                    })
                }(), bindEachFilter(e), $aside.find(".li-btn").on("click", function() {
                    eventEmitter.trigger("resetFilter"), setTimeout(function() {
                        sidebar.switchTab($sideCtrl.find("." + g_conf.curChannel.toLowerCase()), !0, !0)
                    }, 200)
                })
        }

        function bindSearchEvent() {
            suggest($input[0], {
                classNameWrap: "sug-search",
                classNameQuery: "sug-query",
                classNameSelect: "sug-select",
                delay: 300,
                n: 10,
                autoFocus: !1,
                requestQuery: "q",
                requestParas: {
                    callback: "SearchSug2015",
                    city_id: g_conf.cityId
                },
                url: basePath + urlPath.searchSug,
                callbackFn: "SearchSug2015",
                callbackDataKey: "data",
                noSubmit: !0,
                autoCache: !0,
                onMouseSelect: function(e) {
                    e && $input.attr("data-json", e.getAttribute("data-json")), eventEmitter.trigger("submit_input", {
                        channel: "mouse"
                    })
                },
                onSucess: function() {
                    $input.attr("data-json", "")
                },
                onSelect: function(e) {
                    e || eventEmitter.trigger("submit_input", {
                        channel: "enter"
                    })
                },
                onKeySelect: function(e, t) {
                    e && !t ? $input.attr("data-json", e.getAttribute("data-json")) : $input.attr("data-json", "")
                },
                templ: function(e, t) {
                    for (var a = e.data || [], n = [], i = 0, r = a.length; r > i; i++) a[i].q = t, a[i].formatText = a[i].text.replace(t, '<span class="sug-query">' + t + "</span>"), a[i].jsonStr = $.toJSON(a[i]), n.push($.replaceTpl(sugTpl, a[i]));
                    return "<ol>" + n.join("") + "</ol>"
                }
            }), $button.on("click", function(e) {
                eventEmitter.trigger("submit_input", {
                    channel: "button"
                })
            }), eventEmitter.on("submit_input", function(e, t) {
                var a = $input.attr("data-json"),
                    n = $.trim($input.val());
                n && n != $input.attr("placeholder") ? getInputMsg(a, n, dispatchDirective) : sidebar.switchTab($sideCtrl.find("." + g_conf.curChannel.toLowerCase()))
            }), eventEmitter.on("resetFilter", function() {
                $input.attr("data-json", ""), $input.val(""), g_conf.searchConf = null
            })
        }

        function getInputMsg(e, t, a) {
            var n;
            inputDefer && (inputDefer.func = null, inputDefer = null), e ? (inputDefer = $.Deferred()).resolve($.parseJSON(e)) : inputDefer = $.ajax({
                url: basePath + urlPath.searchIndex,
                data: {
                    q: t,
                    city_id: g_conf.cityId
                },
                dataType: "jsonp",
                jsonp: "callback"
            }), n = inputDefer, n.func = a, n.done(function(e) {
                n.func && n.func(e)
            })
        }

        function dispatchDirective(e) {
            e.data && (e = e.data, e.words && (e.words = null), e.text = e.text || $.trim($input.val())), g_conf.searchConf = e, sidebar.switchTab($sideCtrl.find("." + (sugTypeMap[e.module] || "area")), !0)
        }

        function checkQuery() {
            var e = $.trim($.queryToJson(location.search.split("?")[1], 1).q || "");
            e && ($input.val(e), $button.trigger("click"))
        }

        function init() {
            bindSearchEvent(), bindFilterEvent(), setTimeout(checkQuery, 2e3)
        }
        var eventEmitter = require("map/js/msg"),
            suggest = require("map/js/suggest"),
            sidebar = require("map/js/sidebar");
        ! function($) {
            "use strict";
            var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
                meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                hasOwn = Object.prototype.hasOwnProperty;
            $.toJSON = "object" == typeof JSON && JSON.stringify ? JSON.stringify : function(e) {
                if (null === e) return "null";
                var t, a, n, i, r = $.type(e);
                if ("undefined" === r) return void 0;
                if ("number" === r || "boolean" === r) return String(e);
                if ("string" === r) return $.quoteString(e);
                if ("function" == typeof e.toJSON) return $.toJSON(e.toJSON());
                if ("date" === r) {
                    var o = e.getUTCMonth() + 1,
                        s = e.getUTCDate(),
                        l = e.getUTCFullYear(),
                        c = e.getUTCHours(),
                        u = e.getUTCMinutes(),
                        d = e.getUTCSeconds(),
                        f = e.getUTCMilliseconds();
                    return 10 > o && (o = "0" + o), 10 > s && (s = "0" + s), 10 > c && (c = "0" + c), 10 > u && (u = "0" + u), 10 > d && (d = "0" + d), 100 > f && (f = "0" + f), 10 > f && (f = "0" + f), '"' + l + "-" + o + "-" + s + "T" + c + ":" + u + ":" + d + "." + f + 'Z"'
                }
                if (t = [], $.isArray(e)) {
                    for (a = 0; a < e.length; a++) t.push($.toJSON(e[a]) || "null");
                    return "[" + t.join(",") + "]"
                }
                if ("object" == typeof e) {
                    for (a in e)
                        if (hasOwn.call(e, a)) {
                            if (r = typeof a, "number" === r) n = '"' + a + '"';
                            else {
                                if ("string" !== r) continue;
                                n = $.quoteString(a)
                            }
                            r = typeof e[a], "function" !== r && "undefined" !== r && (i = $.toJSON(e[a]), t.push(n + ":" + i))
                        }
                    return "{" + t.join(",") + "}"
                }
            }, $.evalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function(str) {
                return eval("(" + str + ")")
            }, $.secureEvalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function(str) {
                var filtered = str.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
                if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + str + ")");
                throw new SyntaxError("Error parsing JSON, source is not valid.")
            }, $.quoteString = function(e) {
                return e.match(escape) ? '"' + e.replace(escape, function(e) {
                    var t = meta[e];
                    return "string" == typeof t ? t : (t = e.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
                }) + '"' : '"' + e + '"'
            }
        }(jQuery);
        var $search = $("#search"),
            $aside = $search.find(".aside"),
            $input = $("#searchInput"),
            $button = $search.find(".btn"),
            $sideCtrl = $("#" + g_conf.mapCtrlId),
            $liFilter = $aside.find(".li-filter"),
            urlPath = g_conf.urlPath,
            basePath = urlPath.basePath,
            inputDefer = null,
            sugTypeMap = {
                area: "area",
                subway: "station",
                school: "school"
            },
            g_tpl = '<ol class="drop-list">#{content}</ol>',
            more_g_tpl = '<ol class="li-mixin">#{content}</ol>',
            tpl = '<li data-value="#{value}" class="item#{isFirst}">#{title}</li>',
            moreTpl = '<li class="li li-filter" data-type="#{types}"><p>#{value}</p><span>#{title}</span><i class="drop-i"></i></li>',
            sugTpl = "<li data-json='#{jsonStr}' data-origin='#{q}' q='#{text}'>#{formatText}<span class='sug-tip'>约#{count}套在售</span></li>",
            tplConf = {
                sellPrice: [{
                    value: "",
                    title: "不限"
                }, {
                    value: "min_price=&max_price=100",
                    title: "100万以下"
                }, {
                    value: "min_price=100&max_price=150",
                    title: "100-150万"
                }, {
                    value: "min_price=150&max_price=200",
                    title: "150-200万"
                }, {
                    value: "min_price=200&max_price=250",
                    title: "200-250万"
                }, {
                    value: "min_price=250&max_price=300",
                    title: "250-300万"
                }, {
                    value: "min_price=300&max_price=500",
                    title: "300-500万"
                }, {
                    value: "min_price=500&max_price=1000",
                    title: "500-1000万"
                }, {
                    value: "min_price=1000&max_price=",
                    title: "1000万以上"
                }],
                roomArea: [{
                    value: "",
                    title: "不限"
                }, {
                    value: "min_area=&max_area=50",
                    title: "50平以下"
                }, {
                    value: "min_area=50&max_area=70",
                    title: "50-70平"
                }, {
                    value: "min_area=70&max_area=90",
                    title: "70-90平"
                }, {
                    value: "min_area=90&max_area=110",
                    title: "90-110平"
                }, {
                    value: "min_area=110&max_area=130",
                    title: "110-130平"
                }, {
                    value: "min_area=130&max_area=150",
                    title: "130-150平"
                }, {
                    value: "min_area=150&max_area=200",
                    title: "150-200平"
                }, {
                    value: "min_area=200&max_area=",
                    title: "200平以上"
                }],
                roomType: [{
                    value: "",
                    title: "不限"
                }, {
                    value: "room_count=1",
                    title: "一室"
                }, {
                    value: "room_count=2",
                    title: "二室"
                }, {
                    value: "room_count=3",
                    title: "三室"
                }, {
                    value: "room_count=4",
                    title: "四室"
                }, {
                    value: "room_count=5",
                    title: "五室"
                }, {
                    value: "room_count=6",
                    title: "五室以上"
                }]
            },
            tplConfFilter = function(e, t) {
                return "roomArea" === t && "320100" === g_conf.cityId && (e = [{
                    value: "",
                    title: "不限"
                }, {
                    value: "min_area=&max_area=60",
                    title: "60平以下"
                }, {
                    value: "min_area=60&max_area=90",
                    title: "60-90平"
                }, {
                    value: "min_area=90&max_area=110",
                    title: "90-110平"
                }, {
                    value: "min_area=110&max_area=130",
                    title: "110-130平"
                }, {
                    value: "min_area=130&max_area=150",
                    title: "130-150平"
                }, {
                    value: "min_area=150&max_area=200",
                    title: "150-200平"
                }, {
                    value: "min_area=200&max_area=",
                    title: "200平以上"
                }]), e
            },
            moreConf = {
                direction: [{
                    value: "",
                    title: "不限"
                }, {
                    value: "orientation=east",
                    title: "朝东"
                }, {
                    value: "orientation=south",
                    title: "朝南"
                }, {
                    value: "orientation=west",
                    title: "朝西"
                }, {
                    value: "orientation=north",
                    title: "朝北"
                }, {
                    value: "orientation=south_north",
                    title: "南北"
                }],
                roomAge: [{
                    value: "",
                    title: "不限"
                }, {
                    value: "min_house_year=&max_house_year=5",
                    title: "5年以内"
                }, {
                    value: "min_house_year=&max_house_year=10",
                    title: "10年以内"
                }, {
                    value: "min_house_year=10&max_house_year=20",
                    title: "10-20年"
                }, {
                    value: "min_house_year=20&max_house_year=",
                    title: "20年以上"
                }],
                roomFloor: [{
                    value: "",
                    title: "不限"
                }, {
                    value: "floor_level=1",
                    title: "低楼层"
                }, {
                    value: "floor_level=2",
                    title: "中楼层"
                }, {
                    value: "floor_level=3",
                    title: "高楼层"
                }],
                roomTag: [{
                    value: "",
                    title: "不限"
                }, {
                    value: "is_new_house_source=1",
                    title: "新上"
                }]
            },
            moreWrapConf = [{
                types: "direction",
                title: "不限",
                value: "朝向"
            }, {
                types: "roomAge",
                title: "不限",
                value: "楼龄"
            }, {
                types: "roomFloor",
                title: "不限",
                value: "楼层"
            }, {
                types: "roomTag",
                title: "不限",
                value: "其他"
            }];
        return exports = {
            init: init
        }
    }), define("map/js/around", function(require, e) {
        function t() {
            i(), n()
        }

        function a(e, t) {
            var a = [],
                n = {
                    min_longitude: parseFloat(e.min_longitude),
                    max_longitude: parseFloat(e.max_longitude),
                    min_latitude: parseFloat(e.min_latitude),
                    max_latitude: parseFloat(e.max_latitude)
                };
            return t -= 1, $.each(g, function(e, i) {
                var r = Math.max(parseFloat(i.longitude), parseFloat(i.latitude)),
                    o = Math.min(parseFloat(i.longitude), parseFloat(i.latitude));
                return i.longitude = r, i.latitude = o, r <= n.max_longitude && r >= n.min_longitude && o <= n.max_latitude && o >= n.min_latitude && a.push(i), a.length >= t ? !1 : void 0
            }), a
        }

        function n() {
            $.ajax({
                url: g_conf.urlPath.basePath + g_conf.urlPath.aroundStore,
                data: {
                    city_id: g_conf.cityId
                },
                dataType: "jsonp",
                jsonp: "callback"
            }).done(function(e) {
                g = e && e.data
            })
        }

        function i() {
            p.on("update_around", function(e, t) {
                return t.cur ? void l(t.cur) : void o()
            }), p.one("create_localsearch", function() {
                var e = h.getMap(),
                    t = {
                        onSearchComplete: function(e) {
                            m.getStatus() == BMAP_STATUS_SUCCESS && (o(), r(e))
                        },
                        pageCapacity: b
                    };
                m = new BMap.LocalSearch(e, t)
            })
        }

        function r(e) {
            for (var t, a = [], n = e.keyword, i = 0, r = 0; r < e.getCurrentNumPois(); r++) a.push(e.getPoi(r));
            for (t = Math.min(a.length, b); t > i;) a[i].extraClass = S[n] || "", c(d(a[i])), i++
        }

        function o() {
            for (var e; e = _.shift();) u(e)
        }

        function s(e) {
            var t;
            o(), g && (t = a(e, b), $.each(t, function(e, t) {
                var a = [t.name || ""];
                t.address && a.push(t.address), t.telephone && a.push(t.telephone), c(d({
                    extraClass: S[v] || "",
                    title: a.join("&#10;"),
                    point: {
                        lng: t.longitude,
                        lat: t.latitude
                    }
                }))
            }))
        }

        function l(e) {
            var t = h.getBounds();
            e === v ? s(t) : (p.trigger("create_localsearch"), m.searchInBounds(e, new BMap.Bounds(new BMap.Point(t.min_longitude, t.min_latitude), new BMap.Point(t.max_longitude, t.max_latitude))))
        }

        function c(e) {
            h.getMap().addOverlay(e)
        }

        function u(e) {
            h.getMap().removeOverlay(e)
        }

        function d(e) {
            var t;
            return t = new BMap.Label($.replaceTpl(C, e), {
                position: new BMap.Point(e.point.lng, e.point.lat),
                offset: f()
            }), t.setStyle(y), t.addEventListener("mouseover", function() {
                this.setStyle({
                    zIndex: "4"
                })
            }), t.addEventListener("mouseout", function() {
                this.setStyle({
                    zIndex: "1"
                })
            }), _.push(t), t
        }

        function f() {
            return new BMap.Size(-10, -30)
        }
        var m, g, p = require("map/js/msg"),
            h = require("map/js/mapView"),
            _ = [],
            v = "store",
            b = 25,
            y = {
                color: "#000",
                borderWidth: "0",
                padding: "0",
                zIndex: "1",
                backgroundColor: "transparent",
                textAlign: "center"
            },
            C = '<div class="bubble-around bubble-around-#{extraClass}" title="#{title}"><i class="i-cycle"></i><i class="i-arrow"></i></div>',
            S = {
                "银行": "bank",
                "公交": "bus",
                "地铁": "station",
                "教育": "education",
                "医院": "hospital",
                "休闲": "fun",
                "购物": "shop",
                "健身": "sport",
                "美食": "eat",
                store: "store"
            };
        return e = {
            init: t
        }
    }), define("common/pushMessage", function(require) {
        return function(e) {
            var t = $.env.fixedUrl("//ajax.lianjia.com/ajax/user/favorite/getnotifynum/"),
                a = {
                    house_showing: {
                        url: "//user.lianjia.com/site/seeSchedule",
                        text: '你的看房日程有<span class="unreadNumber">#{unread}</span>条更新'
                    },
                    community_new_house_source: {
                        url: "//user.lianjia.com/?filter=3",
                        text: '你关注的小区有<span class="unreadNumber">#{unread}</span>条新上'
                    },
                    deal: {
                        url: "//user.lianjia.com/?filter=1",
                        text: '你关注的房源有<span class="unreadNumber">#{unread}</span>条成交'
                    },
                    price_changed: {
                        url: "//user.lianjia.com/?filter=2",
                        text: '你关注的房源有<span class="unreadNumber">#{unread}</span>条变价'
                    },
                    "search:new": {
                        url: "//user.lianjia.com/?filter=4",
                        text: '你保存的搜索条件有<span class="unreadNumber">#{unread}</span>条变动'
                    },
                    on_answer_insert_concern: {
                        url: "//user.lianjia.com/site/myWenda/?filter=1",
                        text: '您关注的问题有<span class="unreadNumber">#{unread}</span>条回复'
                    },
                    on_answer_insert: {
                        url: "//user.lianjia.com/site/myWenda/",
                        text: '您提问的问题有<span class="unreadNumber">#{unread}</span>条回复'
                    },
                    on_extra_answer_pass: {
                        url: "//user.lianjia.com/site/myWenda/?filter=2",
                        text: '您收到<span class="unreadNumber">#{unread}</span>条新追答'
                    },
                    on_special_question_pass: {
                        url: "//user.lianjia.com/site/myWenda/?filter=3",
                        text: '您收到<span class="unreadNumber">#{unread}</span>条定向提问'
                    },
                    on_extra_question_pass: {
                        url: "//user.lianjia.com/site/myWenda/?filter=4",
                        text: '您收到<span class="unreadNumber">#{unread}</span>条追问'
                    },
                    xuequ_bbs: {
                        url: "//user.lianjia.com/site/bbs?type=4",
                        text: '论坛有<span class="unreadNumber">#{unread}</span>条回复'
                    },
                    ting_shou: {
                        url: "//user.lianjia.com/",
                        text: '您关注的<span class="unreadNumber">#{unread}</span>套房源已下架'
                    }
                },
                n = $.extend({}, a, {
                    on_extra_answer_pass: {
                        url: "//agent.lianjia.com/preference/wenda/?filter=2",
                        text: '您收到<span class="unreadNumber">#{unread}</span>条新追答'
                    },
                    on_special_question_pass: {
                        url: "//agent.lianjia.com/preference/wenda/?filter=3",
                        text: '您收到<span class="unreadNumber">#{unread}</span>条定向提问'
                    },
                    on_extra_question_pass: {
                        url: "//agent.lianjia.com/preference/wenda/?filter=4",
                        text: '您收到<span class="unreadNumber">#{unread}</span>条追问'
                    }
                });
            $.ajax({
                url: t,
                type: "get",
                dataType: "jsonp",
                success: function(t) {
                    if (0 === t.errno) {
                        var i = t.data.is_agent ? n : a,
                            r = 0;
                        for (var o in t.data.group_by_type) 0 !== t.data.group_by_type[o].unread && i.hasOwnProperty(o) && (r += t.data.group_by_type[o].unread);
                        0 !== r && (e.tipContainer.html(e.tipTpl.render({
                            unreadNum: r
                        })), e.container.html(e.msgTpl.render({
                            group_by_type: t.data.group_by_type,
                            pushMsgMap: i
                        })))
                    }
                }
            })
        }
    }), define("common/env", function(require) {
        function e() {
            var e = $.parseURL(location.href);
            a.host = e.host, a.scheme = e.scheme, a.port = e.port;
            var t = a.host.match(/\.?(\w+)\.lianjia\.com/)[1];
            0 === t.indexOf("dev") ? a.env = "dev" : 0 === t.indexOf("test") && (a.env = "test")
        }

        function t(e) {
            var t = "";
            return e.scheme && (t += e.scheme + "://"), e.host && (t += e.host), e.port && (t += ":" + e.port), e.path && (t += "/" + e.path), e.query && (t += "?" + e.query), e.hash && (t += "#" + e.hash), t
        }
        var a = {
                host: "",
                scheme: "",
                port: "",
                env: "online"
            },
            n = {};
        return n.getEnv = function() {
            return a.env
        }, n.fixedHost = function(e) {
            if (!e) return a.host;
            var t = e.substring(0, e.indexOf("."));
            switch (a.env) {
                case "dev":
                case "test":
                    if (0 !== t.indexOf(a.env)) return a.env + e;
                    break;
                case "online":
            }
            return e
        }, n.fixedUrl = function(e, i) {
            i = i || !1, e.indexOf("http") < 0 && (e = location.protocol + e);
            var r = $.parseURL(e);
            return r.host ? (!i && (r.host = n.fixedHost(r.host)), r.port = a.port, r.scheme || (r.scheme = a.scheme)) : (r.host = a.host, r.scheme = a.scheme, r.port = a.port), t(r)
        }, n.isSameDomain = function(e) {
            var t = $.parseURL(e);
            return t.host == a.host
        }, e(), n
    }), window.LJMessenger = function() {
        function e(e, t) {
            var a = "";
            if (arguments.length < 2 ? a = "target error - target and name are both requied" : "object" != typeof e ? a = "target error - target itself must be window object" : "string" != typeof t && (a = "target error - target name must be string type"), a) throw new Error(a);
            this.target = e, this.name = t
        }

        function t(e, t) {
            this.targets = {}, this.name = e, this.listenFunc = [], a = t || a, "string" != typeof a && (a = a.toString()), this.initListen()
        }
        var a = "[LIANJIA_Messenger_CROSS]",
            n = "postMessage" in window;
        return n ? e.prototype.send = function(e) {
            this.target.postMessage(a + e, "*")
        } : e.prototype.send = function(e) {
            var t = window.navigator[a + this.name];
            if ("function" != typeof t) throw new Error("target callback function is not defined");
            t(a + e, window)
        }, t.prototype.addTarget = function(t, a) {
            var n = new e(t, a);
            this.targets[a] = n
        }, t.prototype.initListen = function() {
            var e = this,
                t = function(t) {
                    if ("object" == typeof t && t.data && (t = t.data), t && "string" == typeof t && t.indexOf(a) >= 0) {
                        t = t.slice(a.length);
                        for (var n = 0; n < e.listenFunc.length; n++) e.listenFunc[n](t)
                    }
                };
            n ? "addEventListener" in document ? window.addEventListener("message", t, !1) : "attachEvent" in document && window.attachEvent("onmessage", t) : window.navigator[a + this.name] = t
        }, t.prototype.listen = function(e) {
            this.listenFunc.push(e)
        }, t.prototype.clear = function() {
            this.listenFunc = []
        }, t.prototype.send = function(e) {
            var t, a = this.targets;
            for (t in a) a.hasOwnProperty(t) && a[t].send(e)
        }, t
    }(), "object" != typeof JSON && (JSON = {}),
    function() {
        "use strict";

        function f(e) {
            return 10 > e ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var a, n, i, r, o, s = gap,
                l = t[e];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l) return "null";
                    if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (r = l.length, a = 0; r > a; a += 1) o[a] = str(a, l) || "null";
                        return i = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + s + "]" : "[" + o.join(",") + "]", gap = s, i
                    }
                    if (rep && "object" == typeof rep)
                        for (r = rep.length, a = 0; r > a; a += 1) "string" == typeof rep[a] && (n = rep[a], i = str(n, l), i && o.push(quote(n) + (gap ? ": " : ":") + i));
                    else
                        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (i = str(n, l), i && o.push(quote(n) + (gap ? ": " : ":") + i));
                    return i = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + s + "}" : "{" + o.join(",") + "}", gap = s, i
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        });
        var cx, escapable, gap, indent, meta, rep;
        "function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function(e, t, a) {
            var n;
            if (gap = "", indent = "", "number" == typeof a)
                for (n = 0; a > n; n += 1) indent += " ";
            else "string" == typeof a && (indent = a); if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
            return str("", {
                "": e
            })
        }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var a, n, i = e[t];
                if (i && "object" == typeof i)
                    for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (n = walk(i, a), void 0 !== n ? i[a] = n : delete i[a]);
                return reviver.call(e, t, i)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), define("xd/crossRequest", function(require) {
        function e(e, t) {
            var a = document.createElement("iframe");
            return a.id = e, a.name = e, a.src = t, a.style.cssText = "display:none;width:0px;height:0px;", a.width = 0, a.height = 0, a.title = "empty", document.body.appendChild(a), a
        }
        var t = new LJMessenger("LIANJIA_CROSS_MESSAGE", "LIANJIA-CROSS");
        t.listen(function(e) {
            e = JSON.parse(e);
            var a = e.name;
            t.targets[a] && ("state" == e.type ? (t.targets[a].readyState = "ready", t.targets[a].dealReady()) : t.targets[a].deal(e.data, e.success))
        });
        var a = {},
            n = function(e, t) {
                var a = this;
                a.domain = e, t = t || $.parseURL(e).host.replace(/\./g, "-"), a.name = t, a.init()
            };
        return $.extend(n.prototype, {
                init: function() {
                    var a = this,
                        n = a.domain + "/xd/api/?name=" + a.name,
                        i = e(a.name, n);
                    a.iframe = i.contentWindow, t.addTarget(a.iframe, a.name), a.reqArray = [], t.targets[a.name].deal = function(e, n) {
                        t.targets[a.name].isRequest = !1;
                        var i = a.reqArray.shift(),
                            r = !1;
                        try {
                            r = e
                        } catch (o) {}
                        n ? i.defer.resolve(r) : i.defer.reject(r), a.next()
                    }, t.targets[a.name].dealReady = function() {
                        a.next()
                    }
                },
                next: function() {
                    var e = this;
                    if (t.targets[e.name].readyState && e.reqArray.length && !t.targets[e.name].isRequest) {
                        t.targets[e.name].isRequest = !0;
                        var a = e.reqArray[0],
                            n = {
                                type: "request",
                                data: a.request
                            },
                            i = JSON.stringify(n);
                        t.targets[e.name].send(i)
                    }
                },
                request: function(e) {
                    var t = this,
                        a = $.Deferred();
                    return t.reqArray.push({
                        defer: a,
                        request: e
                    }), t.next(), a
                }
            }),
            function(e, t) {
                return a[e] ? a[e] : a[e] = new n(e, t)
            }
    }), define("xd/Trans", function(require) {
        var e = $.EventEmitter,
            t = require("xd/crossRequest"),
            a = require("common/env"),
            n = !1,
            i = e.extend({
                initialize: function(e) {
                    var i = {
                        url: "",
                        type: "get",
                        dataType: "json",
                        args: {}
                    };
                    $.extend(i, e), i.url = a.fixedUrl(i.url), i.method = i.type;
                    var r = this;
                    if (r.opt = i, !n) {
                        var o = a.fixedUrl($.parseURL(i.url).host);
                        a.isSameDomain(o) ? r.isSame = !0 : r.crossRequest = t(o)
                    }
                },
                request: function(e) {
                    var t = this,
                        a = t.opt;
                    return $.extend(a.args, e), a.data = a.args, n || t.isSame ? $.ajax(a) : this.crossRequest.request(a)
                }
            });
        return i
    }), define("common/login", function() {
        function e() {
            "test" == $.env.getEnv() ? lianjiaCasManager.config({
                setLoginUrl: b,
                service: b,
                getFirstTicket: m + "login?service=" + encodeURIComponent(b) + "&get-lt=true&isajax=true",
                loginUrl: m + "login"
            }) : "dev" == $.env.getEnv() ? lianjiaCasManager.config({
                setLoginUrl: b,
                service: b,
                getFirstTicket: m + "login?service=" + encodeURIComponent(b) + "&get-lt=true&isajax=true",
                loginUrl: m + "login"
            }) : lianjiaCasManager.config({
                setLoginUrl: b,
                getFirstTicket: m + "login?service=" + encodeURIComponent(b) + "&get-lt=true&isajax=true",
                service: b,
                loginUrl: m + "login"
            }), f && f()
        }

        function t(e) {
            lianjiaCasManager ? e() : f = e
        }

        function a() {
            if (!d) {
                d = !0;
                var t = document.createElement("script");
                "test" == $.env.getEnv() ? t.src = m + "dist/js/passport.js" : "dev" === u ? t.src = m + "/dist/js/passport.js?v=1234" : t.src = m + "dist/js/passport.js", t.type = "text/javascript", t.charset = "utf-8", t.onload = e, document.getElementsByTagName("head")[0].appendChild(t)
            }
        }

        function n() {
            return $ULOG.send("10225"), className = $(this).attr("class"), $(".overlay_bg").fadeIn(300), $("#dialog_tel").removeAttr("class").addClass("panel_login animated " + className).fadeIn(), $("#dialog_tel .verImg").trigger("click"), $("body").css({
                overflow: "hidden"
            }), a(), !1
        }

        function i() {
            return $ULOG.send("10225"), className = $(this).attr("class"), $("#dialog").removeClass("bounceIn"), $("#dialog").hide(), $("#dialog_tel").removeAttr("class").addClass("panel_login animated className").show(),
                $("#dialog_tel .verImg").trigger("click"), $("body").css({
                    overflow: "hidden"
                }), a(), !1
        }

        function r() {
            return $(".panel_success").remove(), $ULOG.send("10225"), $(".panel_login").fadeOut(), className = $(this).attr("class"), $("#dialog_tel").removeClass("bounceIn"), $("#dialog_tel").hide(), $("#dialog_reg").hide(), $("#dialog").show(), $("body").css({
                overflow: "hidden"
            }), a(), !1
        }

        function o() {
            return $ULOG.send("10225"), className = $(this).attr("class"), $(".overlay_bg").fadeIn(300), $("#dialog_reg").removeAttr("class").addClass("panel_login animated " + className).fadeIn(), $("#dialog_reg .verImg").trigger("click"), $("body").css({
                overflow: "hidden"
            }), a(), !1
        }

        function s() {
            return $ULOG.send("10448"), $(".panel_login").fadeOut(), className = $(this).attr("class"), $("#dialog_tel").removeClass("bounceIn"), $("#dialog_tel").hide(), $("#dialog_reg").hide(), $("#dialog").hide(), $("#dialog_forget").show(), $("#dialog_forget .verImg").trigger("click"), $("body").css({
                overflow: "hidden"
            }), a(), !1
        }

        function l() {
            var e = new $.Trans({
                url: b,
                type: "jsonp"
            });
            e.request().done(function(e) {
                e && e.username && (e.code = 1), $.listener.trigger("userInfo", e)
            }).fail(function(e) {
                e && $.listener.trigger("userInfo", e.data)
            })
        }

        function c(e) {
            var t = require("common/pushMessage");
            t({
                container: $("#userNews"),
                msgTpl: $.template($("#News").html()),
                tipContainer: $("#indexTipContainer"),
                tipTpl: $.template('<span class="login_bubble_tip"><%=unreadNum%></span>')
            })
        }
        var u = require("common/env"),
            d = (require("xd/Trans"), !1),
            f = !1,
            m = "dev" === $.env.getEnv() ? "http://upassport.test.lianjia.com:5201/" : "test" === $.env.getEnv() ? "http://upassport.test.lianjia.com:5201/" : "https://upassport.lianjia.com/",
            g = m + "freshCaptch",
            p = /^\w{4}$/,
            u = $.env.getEnv(),
            h = function(e, t) {
                $(".panel_login").hide();
                var a = '<div class="panel_login panel_success"><i class="close_success">&times</i>' + e + (t ? "" : '<div>欢迎回来，<a class="green tologin">点击这里去登录</a></div></div>');
                $(a).appendTo(".loninContaner");
                $(".close_success").on("click", function() {
                    $(".overlay_bg").hide(), $(".panel_success").remove()
                }), t && setTimeout(function() {
                    location.reload()
                }, 2e3)
            },
            _ = function(e, t) {
                var a = {
                        phone: [/^\d{11}$/, "请输入有效的手机号"],
                        pwd: [/^\w{8,}$/, "密码必须是至少8位的数字字母组合"]
                    },
                    n = a[t];
                return n ? n[0].test(e) ? !0 : n[1] : !1
            },
            v = /^\d{11}$/,
            b = "https://ajax.api.lianjia.com/login/login/getuserinfo";
        "test" == $.env.getEnv() ? b = "http://ajax.testapi.lianjia.com/login/login/getuserinfo" : "dev" == $.env.getEnv() && (b = "http://ajax.devapi.lianjia.com:8080/login/login/getuserinfo");
        var y = {
            checkExists: m + "CheckExist",
            sendVerifyCode: m + "sendSms",
            sendVerifyVoiceCode: m + "sendVoice",
            verifyCode: "//passport.lianjia.com/register/ljRegister/GenerateVerifyCode",
            checkVerifyCode: "//passport.lianjia.com/register/ljRegister/CheckVerifyCode",
            sendSMS: "//passport.lianjia.com/register/ljRegister/SendMobileVerifyCode",
            checkMobileCode: "//passport.lianjia.com/register/ljRegister/CheckMobileVerifyCode"
        };
        return $(document.body).ready(function() {
            function e() {
                $(".panel_login").fadeOut(), $(".overlay_bg").fadeOut(), $("body").css({
                    overflow: ""
                }), $("#dialog").removeClass("bounceIn")
            }

            function a(e) {
                e = e || "用户名或者密码错误", w.find("dd").html(e), w.show()
            }

            function l() {
                w.hide()
            }

            function c(e) {
                e = e || "用户名或者密码错误", j.find("dd").html(e), j.show()
            }

            function u() {
                j.hide()
            }

            function d(e) {
                e = e || "用户名或者密码错误", A.find("dd").html(e), A.show()
            }

            function f() {
                A.hide()
            }

            function C(e) {
                e = e || "用户名或者密码错误", I.find("dd").html(e), I.show()
            }

            function S() {
                I.hide()
            }
            var x = $("#con_login_user .verImg"),
                w = $("#con_login_user").find(".show-error"),
                k = $("#con_login_user_tel .verImg"),
                j = $("#con_login_user_tel").find(".show-error"),
                P = $("#con_login_user_reg .checkVerimg .verImg"),
                T = $("#con_login_user_tel .checkVerimg1 .verImg"),
                A = $("#con_login_user_reg").find(".show-error"),
                M = $("#con_forget_user_tel .verImg"),
                I = $("#con_forget_user_tel").find(".show-error");
            $("#con_forget_user_pw").find(".show-error");
            x.on("click", function() {
                var e = +new Date;
                $ULOG.send("10451"), $(this).attr("src", g + "?t=" + e)
            }), k.on("click", function() {
                var e = +new Date;
                $ULOG.send("10451"), $(this).attr("src", g + "?t=" + e)
            }), M.on("click", function() {
                var e = +new Date;
                $ULOG.send("10451"), $(this).attr("src", g + "?t=" + e)
            }), P.on("click", function() {
                var e = +new Date;
                $ULOG.send("10451"), $(this).attr("src", g + "?t=" + e)
            }), T.on("click", function() {
                var e = +new Date;
                $ULOG.send("10451"), $(this).attr("src", g + "?t=" + e)
            }), $(".typeUserInfo").delegate(".btn-login", "click", n), $(".loninContaner").delegate(".totellogin", "click", function(e) {
                $(".panel_success").remove(), i()
            }), $(".loninContaner").delegate(".tologin", "click", r), $(".typeUserInfo").delegate(".btn-register", "click", o), $(".loninContaner").delegate(".toforget", "click", s), $(".overlay_bg,.claseDialogBtn").click(function() {
                e()
            }), $(".close_login").click(function() {
                e()
            }), $(".loninContaner").delegate(".checkbox-btn", "click", function(e) {
                var t = $(this),
                    a = t.find("input").get(0);
                a.checked ? t.find("span").addClass("active") : t.find("span").removeClass("active")
            });
            var N = function(e, t) {
                    function a() {
                        l.removeClass("handler_bg").addClass("handler_ok_bg"), u.text("验证通过"), i.css({
                            color: "#00ae66"
                        }), l.unbind("mousedown"), $(document).unbind("mousemove"), $(document).unbind("mouseup"), t && t()
                    }
                    var n, i = e || this,
                        r = !1,
                        o = {};
                    i.parent().show();
                    var e = $.extend(o, e);
                    i.css({
                        color: "#333333"
                    });
                    var s = '<div class="drag_bg"></div><div class="drag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div><div class="handler handler_bg"></div>';
                    i.html(s);
                    var l = i.find(".handler"),
                        c = i.find(".drag_bg"),
                        u = i.find(".drag_text"),
                        d = i.width() - l.width();
                    l.mousedown(function(e) {
                        r = !0, n = e.pageX - parseInt(l.css("left"), 10)
                    }), l.mousedown(function(e) {
                        r = !0, n = e.pageX - parseInt(l.css("left"), 10)
                    }), $(document).mousemove(function(e) {
                        var t = e.pageX - n;
                        r && (t > 0 && d >= t ? (l.css({
                            left: t
                        }), c.css({
                            width: t
                        })) : t > d && a())
                    }).mouseup(function(e) {
                        r = !1;
                        var t = e.pageX - n;
                        d > t && (l.css({
                            left: 0
                        }), c.css({
                            width: 0
                        }))
                    })
                },
                L = function(e) {
                    N(e);
                    var t = e.find(".handler"),
                        a = e.find(".drag_bg"),
                        n = e.find(".drag_text");
                    t.css({
                        left: 0
                    }), a.css({
                        width: 0
                    }), t.removeClass("handler_ok_bg").addClass("handler_bg"), n.text("拖动滑块验证"), $("#drag").css({
                        color: "#333333"
                    }), e.parent().hide()
                };
            $("#con_login_user").delegate("input", "keyup", function(e) {
                13 == e.keyCode && $(".login-user-btn").click()
            });
            var F = 0;
            $(".login-user-btn").on("click", function(e) {
                $ULOG.send("10446"), $(".border-a").removeClass("border-a");
                var n = $("#con_login_user").find(".item"),
                    i = ($("#con_login_agent").find(".item"), n.find(".users").val()),
                    r = n.find(".password").val();
                if (!i || _(i, "phone") !== !0) return n.find(".users").focus(), a("请输入有效的手机号码"), void $("#con_login_user").find(".userName").addClass("border-red");
                if ($("#con_login_user").find(".userName").removeClass("border-red"), !r) return n.find(".password").focus(), a("请输入密码"), void $("#con_login_user").find(".pwd").addClass("border-red");
                $("#con_login_user").find(".pwd").removeClass("border-red");
                var o = $("#con_login_user").find('[name="remember"]').get(0),
                    s = {
                        username: i,
                        password: r,
                        code: ""
                    };
                if (o && o.checked && (s.remember = 1), "none" != $("#con_login_user .checkVerimg").css("display")) {
                    var c = $(".ver-img").val();
                    if (!p.test(c)) return a("验证码格式错误"), $(".ver-img").focus(), void $("#con_login_user").find(".checkVerimg").addClass("border-red");
                    $("#con_login_user").find(".checkVerimg").removeClass("border-red"), s.code = c
                }
                var u = null;
                if ("none" != $(".drag").css("display")) {
                    if (!F) return void a("滑块验证不通过");
                    u = (new Date).getTime(), F = 0, L($("#drag"))
                }
                l(), lianjiaCasManager.config({
                    loginUrl: m + "login",
                    getFirstTicket: m + "login?service=" + encodeURIComponent(b) + "&type=1&get-lt=true&isajax=true&from=lianjiaweb" + (null === u ? "" : "&time=" + u)
                }), t(function() {
                    lianjiaCasManager.login(s, function(e) {
                        $.listener.trigger("loginActSuccess"), x.trigger("click"), window.NOTAUTOJUMP || location.reload()
                    }, function(e) {
                        switch (n.removeClass("border-red"), e.eventId) {
                            case "needCaptchaCheckWhenIpLimit":
                                $("#con_login_user .checkVerimg").show(), a("请输入图形验证码"), x.trigger("click"), $("#con_login_user").find(".checkVerimg").addClass("border-red");
                                break;
                            case "needSendSms":
                                $("#drag").find(".handler").hasClass("handler_ok_bg") || (N($("#drag")), a("请拖动滑块进行验证")), x.trigger("click");
                                break;
                            case "needCaptcha":
                                $("#con_login_user .checkVerimg").show(), a("请输入图形验证码"), x.trigger("click"), $("#con_login_user").find(".checkVerimg").addClass("border-red");
                                break;
                            default:
                                a(e.msg), x.trigger("click")
                        }
                    })
                })
            }), $(".login-user-tel-btn").on("click", function(e) {
                $ULOG.send("10446"), $(".border-a").removeClass("border-a");
                var a = $("#con_login_user_tel").find(".item"),
                    n = ($("#con_login_agent").find(".item"), a.find(".users_tel").val()),
                    i = a.find(".verifycode").val();
                if (!n || _(n, "phone") !== !0) return a.find(".users_tel").focus(), c("请输入有效的手机号码"), void $("#con_login_user_tel").find(".userName").addClass("border-red");
                if ($("#con_login_user_tel").find(".userName").removeClass("border-red"), !i) return a.find(".verifycode").focus(), void $("#con_login_user_tel").find(".Verify").addClass("border-red");
                $("#con_login_user_tel").find(".Verify").removeClass("border-red");
                var r = $("#con_login_user_tel").find('[name="remember"]').get(0),
                    o = {
                        username: n,
                        smsCode: i,
                        code: "",
                        type: 2
                    };
                if (r && r.checked && (o.remember = 1), "none" != $("#con_login_user_tel .checkVerimg").css("display")) {
                    var s = $("#con_login_user_tel .ver-img").val();
                    if (!p.test(s)) return c("验证码格式错误"), $("#con_login_user_tel .ver-img").focus(), void $("#con_login_user_tel").find(".checkVerimg").addClass("border-red");
                    $("#con_login_user_tel").find(".checkVerimg").removeClass("border-red"), o.code = s
                }
                u(), lianjiaCasManager.config({
                    loginUrl: m + "login",
                    getFirstTicket: m + "login?service=" + encodeURIComponent(b) + "&get-lt=true&isajax=true&type=2&from=lianjiaweb"
                }), t(function() {
                    a.removeClass("border-red"), lianjiaCasManager.login(o, function(e) {
                        -1 == e.code ? (c(), k.trigger("click")) : ($.listener.trigger("loginActSuccess"), window.NOTAUTOJUMP || location.reload())
                    }, function(e) {
                        switch (a.removeClass("border-red"), e.eventId) {
                            case "needCaptcha":
                                c("请输入验证码"), $("#con_login_user_tel .checkVerimg").show(), k.trigger("click");
                                break;
                            case "showCaptchaWhenSendSms":
                                c("请输入验证码"), $("#con_login_user_tel .checkVerimg").show(), k.trigger("click");
                            default:
                                c(e.msg), k.trigger("click")
                        }
                    })
                })
            }), $(".user-forget").on("click", function(e) {
                $ULOG.send("10449"), $(".border-a").removeClass("border-a");
                var a = $("#con_forget_user_tel").find(".item"),
                    n = a.find(".user_forget_phone").val(),
                    i = a.find(".verifycode").val(),
                    r = $("#con_forget_user_tel").find(".password_reg").val();
                if (!n || _(n, "phone") !== !0) return a.find(".user_forget_phone").focus(), C("请输入有效的手机号码"), void $("#con_forget_user_tel").find(".userName").addClass("border-red");
                if ($("#con_forget_user_tel").find(".userName").removeClass("border-red"), !r || _(r, "pwd") !== !0) return a.find(".password_reg").focus(), C("请输入不少于8位数的密码（数字+字母）"), void $("#con_forget_user_pw").find(".pwd").addClass("border-red");
                if (!r.match(/\d/) || !r.match(/[A-Za-z]/)) return a.find(".password_reg").focus(), C("请输入不少于8位数的密码（数字+字母）"), void $("#con_forget_user_pw").find(".pwd").addClass("border-red");
                if ($("#con_forget_user_pw").find(".pwd").removeClass("border-red"), !i) return a.find(".verifycode").focus(), a.find(".verifycode").addClass("border-a"), void $("#con_forget_user_tel").find(".Verify").addClass("border-red");
                $("#con_forget_user_tel").find(".Verify").removeClass("border-red");
                var o = {
                    username: n,
                    phone: n,
                    smsCode: i,
                    newPassword: r,
                    confirmPassword: r
                };
                if ("none" != $("#con_forget_user_tel .checkVerimg").css("display")) {
                    var s = $("#con_forget_user_tel .ver-img").val();
                    if (!p.test(s)) return C("验证码格式错误"), $("#con_forget_user_tel .ver-img").focus(), void $("#con_forget_user_tel").find(".checkVerimg").addClass("border-red");
                    $("#con_forget_user_tel").find(".checkVerimg").removeClass("border-red"), o.code = s
                }
                S(), lianjiaCasManager.config({
                    getFirstTicket: m + "forgotpassword?service=" + encodeURIComponent(b) + "&get-lt=true&isajax=true&from=lianjiaweb",
                    loginUrl: m + "forgotpassword"
                }), t(function() {
                    lianjiaCasManager.login(o, function(e) {
                        $("#con_forget_user_pw").find(".pwd").removeClass("border-red"), $.listener.trigger("loginActSuccess"), window.NOTAUTOJUMP || (h("修改密码成功"), M.trigger("click"))
                    }, function(e) {
                        $("#con_forget_user_pw").find(".pwd").removeClass("border-red"), 1 === e.code ? (C(), M.trigger("click")) : 2 === e.code ? (C("请输入验证码"), $("#con_forget_user_tel .checkVerimg").show(), M.trigger("click")) : 3 === e.code ? (C("短信验证码输入错误"), $("#con_forget_user_tel .checkVerimg").show(), M.trigger("click")) : (C(e.msg), $("#con_forget_user_tel .checkVerimg").show(), M.trigger("click"))
                    })
                })
            }), $(".register-user-btn").on("click", function(e) {
                $ULOG.send("10447"), $(".border-a").removeClass("border-a");
                var a = $("#con_login_user_reg").find(".item"),
                    n = ($("#con_login_agent").find(".item"), a.find(".users_reg").val()),
                    i = a.find(".verifycode").val(),
                    r = a.find(".password_reg").val();
                if (!n || _(n, "phone") !== !0) return a.find(".users_reg").focus(), d("请输入有效的手机号码"), void $("#con_login_user_reg").find(".userName").addClass("border-red");
                if ($("#con_login_user_reg").find(".userName").removeClass("border-red"), !i) return a.find(".verifycode").focus(), a.find(".verifycode").addClass("border-a"), void $("#con_login_user_reg").find(".Verify").addClass("border-red");
                if ($("#con_login_user_reg").find(".Verify").removeClass("border-red"), !r || _(r, "pwd") !== !0) return a.find(".password_reg").focus(), d("请输入不少于8位数的密码（数字+字母）"), void $("#con_login_user_reg").find(".pwd").addClass("border-red");
                if ($("#con_login_user_reg").find(".pwd").removeClass("border-red"), !r.match(/\d/) || !r.match(/[A-Za-z]/)) return a.find(".password_reg").focus(), d("请输入不少于8位数的密码（数字+字母）"), void $("#con_login_user_reg").find(".pwd").addClass("border-red");
                $("#con_login_user_reg").find(".pwd").removeClass("border-red");
                var o = $("#con_login_user_reg").find('[name="read"]').get(0),
                    s = {
                        username: n,
                        verify: i,
                        password: r,
                        smsCode: i,
                        confirmPassword: r
                    };
                if (!o.checked) return d("请阅读协议并确认"), void o.focus();
                if ("none" != $("#con_login_user_reg .checkVerimg").css("display")) {
                    var l = $("#con_login_user_reg .ver-img").val();
                    if (!p.test(l)) return d("验证码格式错误"), $("#con_login_user_reg .ver-img").focus(), void $("#con_login_user_reg").find(".checkVerimg").addClass("border-red");
                    $("#con_login_user_reg").find(".checkVerimg").removeClass("border-red"), s.code = l
                }
                f(), lianjiaCasManager.config({
                    getFirstTicket: m + "register?service=" + encodeURIComponent(b) + "&get-lt=true&isajax=true&from=lianjiaweb",
                    loginUrl: m + "register"
                }), t(function() {
                    lianjiaCasManager.login(s, function(e) {
                        a.removeClass("border-red"), -1 == e.code ? (d(e.msg), P.trigger("click")) : ($.listener.trigger("loginActSuccess"), window.NOTAUTOJUMP || h("注册成功", !0))
                    }, function(e) {
                        switch (a.removeClass("border-red"), e.eventId) {
                            case "needCaptcha":
                                d("请输入验证码"), $("#con_login_user_reg .checkVerimg").show(), P.trigger("click");
                                break;
                            case "showCaptchaWhenSendSms":
                                d("请输入验证码"), $("#con_login_user_reg .checkVerimg").show(), P.trigger("click");
                            default:
                                d(e.msg), P.trigger("click")
                        }
                    })
                })
            });
            var E = function(e) {
                if (void 0 == e || "" === e) return !1;
                if ("object" == typeof e)
                    for (var t in e) {
                        var a = e[t].value,
                            n = e[t].required;
                        if (void 0 === n || n.value === !1);
                        else if (void 0 == a || "" == a) return n.hint ? n.hint : !1;
                        var i = e[t].pattern;
                        if (i && !a.match(i.value)) return i.hint ? i.hint : !1;
                        var r = e[t].equal;
                        if (r) {
                            var o = e[r.propertyName];
                            if (void 0 == o) return !1;
                            if (o.value != a) return r.hint ? r.hint : !1
                        }
                    }
                return !0
            };
            $("#send_verify_code_tel").on("click", function(e) {
                if ($(this).hasClass("disabled")) return !1;
                $ULOG.send("10445");
                var t = {
                        telNum: {
                            value: $(".users_tel").val(),
                            pattern: {
                                value: v,
                                hint: "请输入有效的手机号码"
                            }
                        }
                    },
                    a = E(t);
                if (1 != a) return c(a), !1;
                var n = {
                    phone: $(".users_tel").val()
                };
                if ($("#con_login_user_tel .checkVerimg").length > 0 && "" != $("#con_login_user_tel .checkVerimg input").val() && (n.code = $("#con_login_user_tel .checkVerimg input").val(), $("#con_login_user_tel").find(".checkVerimg").removeClass("border-red")), !$("#con_login_user_tel .checkVerimg input").val()) return $("#con_login_user_tel").find(".checkVerimg").addClass("border-red"), c("请输入图形验证码"), !1;
                var i = function(e) {
                    var t = null,
                        a = $("#send_verify_code_tel"),
                        n = function() {
                            return 0 >= e ? (a.removeClass("disabled"), a.find("em").html("重新获取验证码"), clearInterval(t), void u()) : (40 == e && $(".send_verify_code_s").show(), a.find("em").html(e--+"s 后重新发送"), void a.addClass("disabled"))
                        };
                    t = setInterval(n, 1e3)
                };
                $.ajax({
                    url: y.sendVerifyCode,
                    type: "post",
                    dataType: "jsonp",
                    data: n
                }).done(function(e) {
                    1 === e.code ? (u(), i(60)) : 2 == e.code ? (c("请输入图形验证码"), $("#con_login_user_tel .checkVerimg").show(), k.trigger("click")) : 8 == e.code || 0 == e.code ? (c(e.msg), k.trigger("click")) : (c(e), k.trigger("click"))
                }).fail(function(e) {
                    c("发送失败，请重试"), i(0), $(this).removeClass("disable"), 1 === e.code ? (u(), k.trigger("click"), i(60)) : 2 == e.code ? (c("请输入图形验证码"), $("#con_login_user_tel .checkVerimg").show(), k.trigger("click")) : 8 == e.code || 0 == e.code ? (c(e.msg), k.trigger("click")) : (c(e), k.trigger("click"))
                })
            }), $("#send_verify_code_tel_s .voice_a").on("click", function(e) {
                if ($(this).hasClass("disabled")) return !1;
                var t = {
                        telNum: {
                            value: $(".users_tel").val(),
                            pattern: {
                                value: v,
                                hint: "请输入有效的手机号码"
                            }
                        }
                    },
                    a = E(t);
                if (1 != a) return c(a), !1;
                var n = {
                    phone: $(".users_tel").val()
                };
                return $("#con_login_user_tel .checkVerimg").length > 0 && "" != $("#con_login_user_tel .checkVerimg input").val() && (n.code = $("#con_login_user_tel .checkVerimg input").val(), $("#con_login_user_tel").find(".checkVerimg").removeClass("border-red")), $("#con_login_user_tel .checkVerimg input").val() ? void $.ajax({
                    url: y.sendVerifyVoiceCode,
                    type: "post",
                    dataType: "jsonp",
                    data: n
                }).done(function(e) {
                    1 === e.code ? (u(), $("#send_verify_code_tel_s").hide(), c("验证码将以电话的形式的通知到您，请注意接听")) : 2 == e.code ? (c("请输入验证码"), $("#send_verify_code_tel .checkVerimg").show(), k.trigger("click")) : 8 == e.code || 0 == e.code ? (c(e.msg), k.trigger("click")) : (c(e), k.trigger("click"))
                }).fail(function(e) {
                    e.code = 1, c("发送失败，请重试"), $(this).removeClass("disable"), 1 === e.code ? (u(), k.trigger("click")) : 2 == e.code ? (c("请输入验证码"), $("#send_verify_code_tel .checkVerimg").show(), k.trigger("click")) : 8 == e.code || 0 == e.code ? (c(e.msg), k.trigger("click")) : (c(e), k.trigger("click"))
                }) : (c("请输入图形验证码"), $("#con_login_user_tel").find(".checkVerimg").addClass("border-red"), !1)
            }), $("#send_verify_code_forget").on("click", function(e) {
                if ($(this).hasClass("disabled")) return !1;
                $ULOG.send("10445");
                var t = {
                        telNum: {
                            value: $(".user_forget_phone").val(),
                            pattern: {
                                value: v,
                                hint: "请输入有效的手机号码"
                            }
                        }
                    },
                    a = E(t);
                if (1 != a) return C(a), !1;
                var n = {
                    phone: $(".user_forget_phone").val()
                };
                if ($("#con_forget_user_tel .checkVerimg").length > 0 && "" != $("#con_forget_user_tel .checkVerimg input").val() && (n.code = $("#con_forget_user_tel .checkVerimg input").val(), $("#con_forget_user_tel").find(".checkVerimg").removeClass("border-red")), !$("#con_forget_user_tel .checkVerimg input").val()) return C("请输入图形验证码"), $("#con_forget_user_tel").find(".checkVerimg").addClass("border-red"), !1;
                var i = function(e) {
                    var t = null,
                        a = $("#send_verify_code_forget"),
                        n = function() {
                            return 0 >= e ? (a.removeClass("disabled"), a.find("em").html("重新获取验证码"), clearInterval(t), void f()) : (40 == e && $("#send_verify_code_forget_s").show(), a.find("em").html(e--+"s 后重新发送"), void a.addClass("disabled"))
                        };
                    t = setInterval(n, 1e3)
                };
                $.ajax({
                    url: y.sendVerifyCode + "?sendOn=exist",
                    dataType: "jsonp",
                    data: n
                }).done(function(e) {
                    1 == e.code ? (S(), i(60)) : 8 == e.code || 0 == e.code ? (C(e.msg), M.trigger("click")) : 2 == e.code ? (C("请输入验证码"), $("#con_forget_user_tel .checkVerimg").show(), M.trigger("click")) : (C(e), M.trigger("click"))
                }).fail(function(e) {
                    e.code = 1, C("发送失败，请重试"), i(0), $(this).removeClass("disable"), 1 === e.code ? (S(), i(60)) : 2 == e.code ? (C("请输入验证码"), $("#con_forget_user_tel .checkVerimg").show(), M.trigger("click")) : 8 == e.code || 0 == e.code ? (C(e.msg), M.trigger("click")) : (C(e), M.trigger("click"))
                })
            }), $("#send_verify_code_forget_s .voice_a").on("click", function(e) {
                if ($(this).hasClass("disabled")) return !1;
                var t = {
                        telNum: {
                            value: $(".user_forget_phone").val(),
                            pattern: {
                                value: v,
                                hint: "请输入有效的手机号码"
                            }
                        }
                    },
                    a = E(t);
                if (1 != a) return d(a), !1;
                var n = {
                    phone: $(".user_forget_phone").val()
                };
                return $("#con_forget_user_tel .checkVerimg").length > 0 && "" != $("#con_forget_user_tel .checkVerimg input").val() && (n.code = $("#con_forget_user_tel .checkVerimg input").val(), $("#con_forget_user_tel").find(".checkVerimg").removeClass("border-red")), $("#con_forget_user_tel .checkVerimg input").val() ? void $.ajax({
                    url: y.sendVerifyVoiceCode + "?sendOn=exist",
                    type: "post",
                    dataType: "jsonp",
                    data: n
                }).done(function(e) {
                    1 === e.code ? (S(), $("#send_verify_code_forget_s").hide(), C("验证码将以电话的形式的通知到您，请注意接听")) : 8 == e.code || 0 == e.code ? (C(e.msg), M.trigger("click")) : 2 == e.code ? (C("请输入验证码"), $("#con_forget_user_tel .checkVerimg").show(), M.trigger("click")) : (C(e), M.trigger("click"))
                }).fail(function(e) {
                    C("发送失败，请重试"), $(this).removeClass("disable"), 1 === e.code ? (S(), M.trigger("click")) : 2 == e.code ? (c("请输入验证码"), $("#con_forget_user_tel .checkVerimg").show(), M.trigger("click")) : 8 == e.code || 0 == e.code ? (C(e.msg), M.trigger("click")) : (C(e), M.trigger("click"))
                }) : (C("请输入图形验证码"), $("#con_forget_user_tel").find(".checkVerimg").addClass("border-red"), !1)
            }), $("#send_verify_code_reg").on("click", function(e) {
                if ($(this).hasClass("disabled")) return !1;
                $ULOG.send("10445");
                var t = {
                        telNum: {
                            value: $(".users_reg").val(),
                            pattern: {
                                value: v,
                                hint: "请输入有效的手机号码"
                            }
                        }
                    },
                    a = E(t);
                if (1 != a) return d(a), !1;
                var n = {
                    phone: $(".users_reg").val()
                };
                if ($("#con_login_user_reg .checkVerimg").length > 0 && "" != $("#con_login_user_reg .checkVerimg input").val() && (n.code = $("#con_login_user_reg .checkVerimg input").val(), $("#con_login_user_reg").find(".checkVerimg").removeClass("border-red")), !$("#con_login_user_reg .checkVerimg input").val()) return d("请输入图形验证码"), $("#con_login_user_reg").find(".checkVerimg").addClass("border-red"), !1;
                var i = function(e) {
                    var t = null,
                        a = $("#send_verify_code_reg"),
                        n = function() {
                            return 0 >= e ? (a.removeClass("disabled"), a.find("em").html("重新获取验证码"), clearInterval(t), void f()) : (40 == e && $("#send_verify_code_reg_s").show(), a.find("em").html(e--+"s 后重新发送"), void a.addClass("disabled"))
                        };
                    t = setInterval(n, 1e3)
                };
                $.ajax({
                    url: y.sendVerifyCode + "?sendOn=noExist",
                    dataType: "jsonp",
                    data: n
                }).done(function(e) {
                    1 == e.code ? (f(), i(60)) : 8 == e.code || 0 == e.code ? (d(e.msg), P.trigger("click")) : 2 == e.code ? (d("请输入验证码"), $("#con_login_user_reg .checkVerimg").show(), P.trigger("click")) : (d(e), P.trigger("click"))
                }).fail(function(e) {
                    d("发送失败，请重试"), i(0), $(this).removeClass("disable"), 1 == e.code ? (f(), i(60)) : 0 == e.code || 8 == e.code ? (d(e.msg), P.trigger("click")) : 2 == e.code ? (d("请输入验证码"), $("#con_login_user_reg .checkVerimg").show(), P.trigger("click")) : (d(e), P.trigger("click"))
                })
            }), $("#send_verify_code_reg_s .voice_a").on("click", function(e) {
                if ($(this).hasClass("disabled")) return !1;
                var t = {
                        telNum: {
                            value: $(".users_reg").val(),
                            pattern: {
                                value: v,
                                hint: "请输入有效的手机号码"
                            }
                        }
                    },
                    a = E(t);
                if (1 != a) return d(a), !1;
                var n = {
                    phone: $(".users_reg").val()
                };
                return $("#con_login_user_reg .checkVerimg").length > 0 && "" != $("#con_login_user_reg .checkVerimg input").val() && (n.code = $("#con_login_user_reg .checkVerimg input").val(), $("#con_login_user_reg").find(".checkVerimg").removeClass("border-red")), $("#con_login_user_reg .checkVerimg input").val() ? void $.ajax({
                    url: y.sendVerifyVoiceCode + "?sendOn=noExist",
                    type: "post",
                    dataType: "jsonp",
                    data: n
                }).done(function(e) {
                    1 == e.code ? (f(), $("#send_verify_code_reg_s").hide(), d("验证码将以电话的形式的通知到您，请注意接听")) : 8 == e.code || 0 == e.code ? (d(e.msg), P.trigger("click")) : 2 == e.code ? (d("请输入验证码"), $("#con_login_user_reg .checkVerimg").show()) : (d(e), P.trigger("click"))
                }).fail(function(e) {
                    e.code = 1, d("发送失败，请重试"), $(this).removeClass("disable"), 1 === e.code ? (f(), P.trigger("click")) : 2 == e.code ? (d("请输入验证码"), $("#con_login_user_reg .checkVerimg").show(), P.trigger("click")) : 8 == e.code || 0 == e.code ? (d(e.msg), P.trigger("click")) : (d(e), P.trigger("click"))
                }) : (d("请输入图形验证码"), $("#con_login_user_reg").find(".checkVerimg").addClass("border-red"), !1)
            })
        }), $(".password-view").on("click", function() {
            var e = $(this).siblings("input");
            e.attr("type", "password" == e.attr("type") ? "text" : "password")
        }), $(".checkVerimg").trigger("click"), {
            init: function() {
                function e(e) {
                    var t = $(".typeUserInfo");
                    e && e.username && (e.username = $.encodeHTML($.getLimitString(e.username, 20, ".."))), t.each(function() {
                        var t = $(this),
                            a = t.find(".template").html();
                        if (a) {
                            a = $.template(a);
                            var n = $.trim(a.render({
                                data: e
                            }));
                            t.find(".typeShowUser").html(n)
                        }
                    })
                }
                $.listener.on("userInfo", function(t) {
                    e(t), t.username && c($(".typeUserInfo").find(".typeShowUser a").eq(0))
                }), l()
            },
            openLoginDialog: n,
            openDialogRegister: o
        }
    }), define("map/js/map", function(require, e) {
        function t(e) {
            var t = $.template($("#userInfoTpl").html());
            n.html(t.render({
                isAgent: e.isAgent,
                logoutUrl: e.logoutUrl,
                username: e.username
            }))
        }

        function a() {
            var e = require("common/pushMessage");
            e({
                container: $("#pushNewsListContainer"),
                msgTpl: $.template($("#pushNewsListTpl").html()),
                tipContainer: $("#tipContainer"),
                tipTpl: $.template('<span class="pushNews"></span>')
            })
        }
        var n = $("#userInfoContainer"),
            i = require("common/login");
        $("body").on("click", "#loginBtn", function(e) {
            e.preventDefault(), i.openLoginDialog()
        }), $("body").on("click", "#registerBtn", function(e) {
            e.preventDefault(), i.openDialogRegister()
        }), $.listener.always("userInfo", function(e) {
            e && 1 === e.code && (t(e), a())
        });
        var r = {
            370200: 1,
            370101: 1
        };
        return e.init = function() {
            var e = require("map/js/mapView"),
                t = require("map/js/panelView"),
                a = require("map/js/search"),
                n = require("map/js/sidebar"),
                i = require("map/js/steam"),
                o = require("map/js/area"),
                s = require("map/js/school"),
                l = require("map/js/station"),
                c = require("map/js/house"),
                u = require("map/js/around"),
                d = require("map/js/bubble");
            a.init(), e.addCb(t.init), e.addCb(o.init), e.addCb(i.init), e.addCb(s.init), !r[g_conf.cityId] && e.addCb(l.init), e.addCb(c.init), e.addCb(n.init), e.addCb(u.init), e.addCb(d.init), e.init()
        }, e
    });
