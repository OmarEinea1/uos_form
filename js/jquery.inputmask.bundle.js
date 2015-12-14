/*!
 * jquery.inputmask.bundle
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 - 2015 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 3.1.58
 */
! function(a) {
    function b(a) {
        var b = document.createElement("input"),
            c = "on" + a,
            d = c in b;
        return d || (b.setAttribute(c, "return;"), d = "function" == typeof b[c]), b = null, d
    }

    function c(a) {
        var b = "text" == a || "tel" == a;
        if (!b) {
            var c = document.createElement("input");
            c.setAttribute("type", a), b = "text" === c.type, c = null
        }
        return b
    }

    function d(b, c, e) {
        var f = e.aliases[b];
        return f ? (f.alias && d(f.alias, void 0, e), a.extend(!0, e, f), a.extend(!0, e, c), !0) : !1
    }

    function e(b) {
        function c(c) {
            function d(a, b, c, d) {
                this.matches = [], this.isGroup = a || !1, this.isOptional = b || !1, this.isQuantifier = c || !1, this.isAlternator = d || !1, this.quantifier = {
                    min: 1,
                    max: 1
                }
            }

            function e(c, d, e) {
                var f = b.definitions[d],
                    g = 0 == c.matches.length;
                if (e = void 0 != e ? e : c.matches.length, f && !m) {
                    f.placeholder = a.isFunction(f.placeholder) ? f.placeholder.call(this, b) : f.placeholder;
                    for (var h = f.prevalidator, i = h ? h.length : 0, j = 1; j < f.cardinality; j++) {
                        var k = i >= j ? h[j - 1] : [],
                            l = k.validator,
                            n = k.cardinality;
                        c.matches.splice(e++, 0, {
                            fn: l ? "string" == typeof l ? new RegExp(l) : new function() {
                                this.test = l
                            } : new RegExp("."),
                            cardinality: n ? n : 1,
                            optionality: c.isOptional,
                            newBlockMarker: g,
                            casing: f.casing,
                            def: f.definitionSymbol || d,
                            placeholder: f.placeholder,
                            mask: d
                        })
                    }
                    c.matches.splice(e++, 0, {
                        fn: f.validator ? "string" == typeof f.validator ? new RegExp(f.validator) : new function() {
                            this.test = f.validator
                        } : new RegExp("."),
                        cardinality: f.cardinality,
                        optionality: c.isOptional,
                        newBlockMarker: g,
                        casing: f.casing,
                        def: f.definitionSymbol || d,
                        placeholder: f.placeholder,
                        mask: d
                    })
                }
                else c.matches.splice(e++, 0, {
                    fn: null,
                    cardinality: 0,
                    optionality: c.isOptional,
                    newBlockMarker: g,
                    casing: null,
                    def: d,
                    placeholder: void 0,
                    mask: d
                }), m = !1
            }
            for (var f, g, h, i, j, k, l = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, m = !1, n = new d, o = [], p = []; f = l.exec(c);) switch (g = f[0], g.charAt(0)) {
                case b.optionalmarker.end:
                case b.groupmarker.end:
                    if (h = o.pop(), o.length > 0) {
                        if (i = o[o.length - 1], i.matches.push(h), i.isAlternator) {
                            j = o.pop();
                            for (var q = 0; q < j.matches.length; q++) j.matches[q].isGroup = !1;
                            o.length > 0 ? (i = o[o.length - 1], i.matches.push(j)) : n.matches.push(j)
                        }
                    }
                    else n.matches.push(h);
                    break;
                case b.optionalmarker.start:
                    o.push(new d(!1, !0));
                    break;
                case b.groupmarker.start:
                    o.push(new d(!0));
                    break;
                case b.quantifiermarker.start:
                    var r = new d(!1, !1, !0);
                    g = g.replace(/[{}]/g, "");
                    var s = g.split(","),
                        t = isNaN(s[0]) ? s[0] : parseInt(s[0]),
                        u = 1 == s.length ? t : isNaN(s[1]) ? s[1] : parseInt(s[1]);
                    if (("*" == u || "+" == u) && (t = "*" == u ? 0 : 1), r.quantifier = {
                            min: t,
                            max: u
                        }, o.length > 0) {
                        var v = o[o.length - 1].matches;
                        if (f = v.pop(), !f.isGroup) {
                            var w = new d(!0);
                            w.matches.push(f), f = w
                        }
                        v.push(f), v.push(r)
                    }
                    else {
                        if (f = n.matches.pop(), !f.isGroup) {
                            var w = new d(!0);
                            w.matches.push(f), f = w
                        }
                        n.matches.push(f), n.matches.push(r)
                    }
                    break;
                case b.escapeChar:
                    m = !0;
                    break;
                case b.alternatormarker:
                    o.length > 0 ? (i = o[o.length - 1], k = i.matches.pop()) : k = n.matches.pop(), k.isAlternator ? o.push(k) : (j = new d(!1, !1, !1, !0), j.matches.push(k), o.push(j));
                    break;
                default:
                    if (o.length > 0) {
                        if (i = o[o.length - 1], i.matches.length > 0 && (k = i.matches[i.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, b.groupmarker.start, 0), e(k, b.groupmarker.end))), e(i, g), i.isAlternator) {
                            j = o.pop();
                            for (var q = 0; q < j.matches.length; q++) j.matches[q].isGroup = !1;
                            o.length > 0 ? (i = o[o.length - 1], i.matches.push(j)) : n.matches.push(j)
                        }
                    }
                    else n.matches.length > 0 && (k = n.matches[n.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, b.groupmarker.start, 0), e(k, b.groupmarker.end))), e(n, g)
            }
            return n.matches.length > 0 && (k = n.matches[n.matches.length - 1], k.isGroup && (k.isGroup = !1, e(k, b.groupmarker.start, 0), e(k, b.groupmarker.end)), p.push(n)), p
        }

        function d(d, e) {
            if (void 0 == d || "" == d) return void 0;
            if (1 == d.length && 0 == b.greedy && 0 != b.repeat && (b.placeholder = ""), b.repeat > 0 || "*" == b.repeat || "+" == b.repeat) {
                var f = "*" == b.repeat ? 0 : "+" == b.repeat ? 1 : b.repeat;
                d = b.groupmarker.start + d + b.groupmarker.end + b.quantifiermarker.start + f + "," + b.repeat + b.quantifiermarker.end
            }
            return void 0 == a.inputmask.masksCache[d] && (a.inputmask.masksCache[d] = {
                mask: d,
                maskToken: c(d),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: e
            }), a.extend(!0, {}, a.inputmask.masksCache[d])
        }

        function e(a) {
            if (a = a.toString(), b.numericInput) {
                a = a.split("")
                    .reverse();
                for (var c = 0; c < a.length; c++) a[c] == b.optionalmarker.start ? a[c] = b.optionalmarker.end : a[c] == b.optionalmarker.end ? a[c] = b.optionalmarker.start : a[c] == b.groupmarker.start ? a[c] = b.groupmarker.end : a[c] == b.groupmarker.end && (a[c] = b.groupmarker.start);
                a = a.join("")
            }
            return a
        }
        var f = void 0;
        if (a.isFunction(b.mask) && (b.mask = b.mask.call(this, b)), a.isArray(b.mask)) {
            if (b.mask.length > 1) {
                b.keepStatic = void 0 == b.keepStatic ? !0 : b.keepStatic;
                var g = "(";
                return a.each(b.mask, function(b, c) {
                    g.length > 1 && (g += ")|("), g += e(void 0 == c.mask || a.isFunction(c.mask) ? c : c.mask)
                }), g += ")", d(g, b.mask)
            }
            b.mask = b.mask.pop()
        }
        return b.mask && (f = void 0 == b.mask.mask || a.isFunction(b.mask.mask) ? d(e(b.mask), b.mask) : d(e(b.mask.mask), b.mask)), f
    }

    function f(d, e, f) {
        function g(a, b, c) {
            b = b || 0;
            var d, e, f, g = [],
                h = 0;
            do {
                if (a === !0 && k()
                    .validPositions[h]) {
                    var i = k()
                        .validPositions[h];
                    e = i.match, d = i.locator.slice(), g.push(c === !0 ? i.input : F(h, e))
                }
                else f = p(h, d, h - 1), e = f.match, d = f.locator.slice(), g.push(F(h, e));
                h++
            } while ((void 0 == db || db > h - 1) && null != e.fn || null == e.fn && "" != e.def || b >= h);
            return g.pop(), g
        }

        function k() {
            return e
        }

        function l(a) {
            var b = k();
            b.buffer = void 0, b.tests = {}, a !== !0 && (b._buffer = void 0, b.validPositions = {}, b.p = 0)
        }

        function m(a) {
            var b = k(),
                c = -1,
                d = b.validPositions;
            void 0 == a && (a = -1);
            var e = c,
                f = c;
            for (var g in d) {
                var h = parseInt(g);
                (-1 == a || null != d[h].match.fn) && (a >= h && (e = h), h >= a && (f = h))
            }
            return c = -1 != e && a - e > 1 || a > f ? e : f
        }

        function n(b, c, d) {
            if (f.insertMode && void 0 != k()
                .validPositions[b] && void 0 == d) {
                var e, g = a.extend(!0, {}, k()
                        .validPositions),
                    h = m();
                for (e = b; h >= e; e++) delete k()
                    .validPositions[e];
                k()
                    .validPositions[b] = c;
                var i, j = !0;
                for (e = b; h >= e; e++) {
                    var l = g[e];
                    if (void 0 != l) {
                        var n = k()
                            .validPositions;
                        i = !f.keepStatic && n[e] && (void 0 != n[e + 1] && s(e + 1, n[e].locator.slice(), e)
                            .length > 1 || void 0 != n[e].alternation) ? e + 1 : B(e), j = r(i, l.match.def) ? j && y(i, l.input, !0, !0) !== !1 : null == l.match.fn
                    }
                    if (!j) break
                }
                if (!j) return k()
                    .validPositions = a.extend(!0, {}, g), !1
            }
            else k()
                .validPositions[b] = c;
            return !0
        }

        function o(a, b, c, d) {
            var e, g = a;
            k()
                .p = a, void 0 != k()
                .validPositions[a] && k()
                .validPositions[a].input == f.radixPoint && (b++, g++);
            for (e = g; b > e; e++) void 0 != k()
                .validPositions[e] && (c === !0 || 0 != f.canClearPosition(k(), e, m(), d, f)) && delete k()
                .validPositions[e];
            for (l(!0), e = g + 1; e <= m();) {
                for (; void 0 != k()
                    .validPositions[g];) g++;
                var h = k()
                    .validPositions[g];
                g > e && (e = g + 1);
                var i = k()
                    .validPositions[e];
                void 0 != i && void 0 == h ? (r(g, i.match.def) && y(g, i.input, !0) !== !1 && (delete k()
                    .validPositions[e], e++), g++) : e++
            }
            var j = m();
            j >= a && void 0 != k()
                .validPositions[j] && k()
                .validPositions[j].input == f.radixPoint && delete k()
                .validPositions[j], l(!0)
        }

        function p(a, b, c) {
            for (var d, e = s(a, b, c), g = m(), h = k()
                    .validPositions[g] || s(0)[0], i = void 0 != h.alternation ? h.locator[h.alternation].split(",") : [], j = 0; j < e.length && (d = e[j], !(d.match && (f.greedy && d.match.optionalQuantifier !== !0 || (d.match.optionality === !1 || d.match.newBlockMarker === !1) && d.match.optionalQuantifier !== !0) && (void 0 == h.alternation || void 0 != d.locator[h.alternation] && x(d.locator[h.alternation].toString()
                    .split(","), i)))); j++);
            return d
        }

        function q(a) {
            return k()
                .validPositions[a] ? k()
                .validPositions[a].match : s(a)[0].match
        }

        function r(a, b) {
            for (var c = !1, d = s(a), e = 0; e < d.length; e++)
                if (d[e].match && d[e].match.def == b) {
                    c = !0;
                    break
                }
            return c
        }

        function s(b, c, d) {
            function e(c, d, f, h) {
                function l(f, h, n) {
                    if (g > 1e4) return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + k()
                        .mask), !0;
                    if (g == b && void 0 == f.matches) return i.push({
                        match: f,
                        locator: h.reverse()
                    }), !0;
                    if (void 0 != f.matches) {
                        if (f.isGroup && n !== !0) {
                            if (f = l(c.matches[m + 1], h)) return !0
                        }
                        else if (f.isOptional) {
                            var o = f;
                            if (f = e(f, d, h, n)) {
                                var p = i[i.length - 1].match,
                                    q = 0 == a.inArray(p, o.matches);
                                q && (j = !0), g = b
                            }
                        }
                        else if (f.isAlternator) {
                            var r, s = f,
                                t = [],
                                u = i.slice(),
                                v = h.length,
                                w = d.length > 0 ? d.shift() : -1;
                            if (-1 == w || "string" == typeof w) {
                                var x, y = g,
                                    z = d.slice();
                                "string" == typeof w && (x = w.split(","));
                                for (var A = 0; A < s.matches.length; A++) {
                                    i = [], f = l(s.matches[A], [A].concat(h), n) || f, r = i.slice(), g = y, i = [];
                                    for (var B = 0; B < z.length; B++) d[B] = z[B];
                                    for (var C = 0; C < r.length; C++)
                                        for (var D = r[C], E = 0; E < t.length; E++) {
                                            var F = t[E];
                                            if (D.match.mask == F.match.mask && ("string" != typeof w || -1 != a.inArray(D.locator[v].toString(), x))) {
                                                r.splice(C, 1), F.locator[v] = F.locator[v] + "," + D.locator[v], F.alternation = v;
                                                break
                                            }
                                        }
                                    t = t.concat(r)
                                }
                                "string" == typeof w && (t = a.map(t, function(b, c) {
                                    if (isFinite(c)) {
                                        var d, e = b.locator[v].toString()
                                            .split(",");
                                        b.locator[v] = void 0, b.alternation = void 0;
                                        for (var f = 0; f < e.length; f++) d = -1 != a.inArray(e[f], x), d && (void 0 != b.locator[v] ? (b.locator[v] += ",", b.alternation = v, b.locator[v] += e[f]) : b.locator[v] = parseInt(e[f]));
                                        if (void 0 != b.locator[v]) return b
                                    }
                                })), i = u.concat(t), j = !0
                            }
                            else f = l(s.matches[w], [w].concat(h), n);
                            if (f) return !0
                        }
                        else if (f.isQuantifier && n !== !0)
                            for (var G = f, H = d.length > 0 && n !== !0 ? d.shift() : 0; H < (isNaN(G.quantifier.max) ? H + 1 : G.quantifier.max) && b >= g; H++) {
                                var I = c.matches[a.inArray(G, c.matches) - 1];
                                if (f = l(I, [H].concat(h), !0)) {
                                    var p = i[i.length - 1].match;
                                    p.optionalQuantifier = H > G.quantifier.min - 1;
                                    var q = 0 == a.inArray(p, I.matches);
                                    if (q) {
                                        if (H > G.quantifier.min - 1) {
                                            j = !0, g = b;
                                            break
                                        }
                                        return !0
                                    }
                                    return !0
                                }
                            }
                        else if (f = e(f, d, h, n)) return !0
                    }
                    else g++
                }
                for (var m = d.length > 0 ? d.shift() : 0; m < c.matches.length; m++)
                    if (c.matches[m].isQuantifier !== !0) {
                        var n = l(c.matches[m], [m].concat(f), h);
                        if (n && g == b) return n;
                        if (g > b) break
                    }
            }
            var f = k()
                .maskToken,
                g = c ? d : 0,
                h = c || [0],
                i = [],
                j = !1;
            if (void 0 == c) {
                for (var l, m = b - 1; void 0 == (l = k()
                        .validPositions[m]) && m > -1;) m--;
                if (void 0 != l && m > -1) g = m, h = l.locator.slice();
                else {
                    for (m = b - 1; void 0 == (l = k()
                            .tests[m]) && m > -1;) m--;
                    void 0 != l && m > -1 && (g = m, h = l[0].locator.slice())
                }
            }
            for (var n = h.shift(); n < f.length; n++) {
                var o = e(f[n], h, [n]);
                if (o && g == b || g > b) break
            }
            return (0 == i.length || j) && i.push({
                    match: {
                        fn: null,
                        cardinality: 0,
                        optionality: !0,
                        casing: null,
                        def: ""
                    },
                    locator: []
                }), k()
                .tests[b] = a.extend(!0, [], i), k()
                .tests[b]
        }

        function t() {
            return void 0 == k()
                ._buffer && (k()
                    ._buffer = g(!1, 1)), k()
                ._buffer
        }

        function u() {
            return void 0 == k()
                .buffer && (k()
                    .buffer = g(!0, m(), !0)), k()
                .buffer
        }

        function v(a, b, c) {
            if (c = c || u()
                .slice(), a === !0) l(), a = 0, b = c.length;
            else
                for (var d = a; b > d; d++) delete k()
                    .validPositions[d], delete k()
                    .tests[d];
            for (var d = a; b > d; d++) c[d] != f.skipOptionalPartCharacter && y(d, c[d], !0, !0)
        }

        function w(a, b) {
            switch (b.casing) {
                case "upper":
                    a = a.toUpperCase();
                    break;
                case "lower":
                    a = a.toLowerCase()
            }
            return a
        }

        function x(b, c) {
            for (var d = f.greedy ? c : c.slice(0, 1), e = !1, g = 0; g < b.length; g++)
                if (-1 != a.inArray(b[g], d)) {
                    e = !0;
                    break
                }
            return e
        }

        function y(b, c, d, e) {
            function g(b, c, d, e) {
                var g = !1;
                return a.each(s(b), function(h, i) {
                    for (var j = i.match, p = c ? 1 : 0, q = "", r = (u(), j.cardinality); r > p; r--) q += D(b - (r - 1));
                    if (c && (q += c), g = null != j.fn ? j.fn.test(q, k(), b, d, f) : c != j.def && c != f.skipOptionalPartCharacter || "" == j.def ? !1 : {
                            c: j.def,
                            pos: b
                        }, g !== !1) {
                        var s = void 0 != g.c ? g.c : c;
                        s = s == f.skipOptionalPartCharacter && null === j.fn ? j.def : s;
                        var t = b;
                        if (void 0 != g.remove && o(g.remove, g.remove + 1, !0), g.refreshFromBuffer) {
                            var x = g.refreshFromBuffer;
                            if (d = !0, v(x === !0 ? x : x.start, x.end), void 0 == g.pos && void 0 == g.c) return g.pos = m(), !1;
                            if (t = void 0 != g.pos ? g.pos : b, t != b) return g = a.extend(g, y(t, s, !0)), !1
                        }
                        else if (g !== !0 && void 0 != g.pos && g.pos != b && (t = g.pos, v(b, t), t != b)) return g = a.extend(g, y(t, s, !0)), !1;
                        return 1 != g && void 0 == g.pos && void 0 == g.c ? !1 : (h > 0 && l(!0), n(t, a.extend({}, i, {
                            input: w(s, j)
                        }), e) || (g = !1), !1)
                    }
                }), g
            }

            function h(b, c, d, e) {
                var g, h, i = a.extend(!0, {}, k()
                    .validPositions);
                for (g = m(); g >= 0; g--)
                    if (k()
                        .validPositions[g] && void 0 != k()
                        .validPositions[g].alternation) {
                        h = k()
                            .validPositions[g].alternation;
                        break
                    }
                if (void 0 != h)
                    for (var j in k()
                            .validPositions)
                        if (parseInt(j) > parseInt(g) && void 0 === k()
                            .validPositions[j].alternation) {
                            for (var n = k()
                                    .validPositions[j], o = n.locator[h], p = k()
                                    .validPositions[g].locator[h].split(","), q = 0; q < p.length; q++)
                                if (o < p[q]) {
                                    for (var r, s, t = j - 1; t >= 0; t--)
                                        if (r = k()
                                            .validPositions[t], void 0 != r) {
                                            s = r.locator[h], r.locator[h] = p[q];
                                            break
                                        }
                                    if (o != r.locator[h]) {
                                        for (var v = u()
                                                .slice(), w = j; w < m() + 1; w++) delete k()
                                            .validPositions[w], delete k()
                                            .tests[w];
                                        l(!0), f.keepStatic = !f.keepStatic;
                                        for (var w = j; w < v.length; w++) v[w] != f.skipOptionalPartCharacter && y(m() + 1, v[w], !1, !0);
                                        r.locator[h] = s;
                                        var x = y(b, c, d, e);
                                        if (f.keepStatic = !f.keepStatic, x) return x;
                                        l(), k()
                                            .validPositions = a.extend(!0, {}, i)
                                    }
                                }
                            break
                        }
                return !1
            }

            function i(b, c) {
                for (var d = k()
                        .validPositions[c], e = d.locator, f = e.length, g = b; c > g; g++)
                    if (!z(g)) {
                        var h = s(g),
                            i = h[0],
                            j = -1;
                        a.each(h, function(a, b) {
                            for (var c = 0; f > c; c++) b.locator[c] && x(b.locator[c].toString()
                                .split(","), e[c].toString()
                                .split(",")) && c > j && (j = c, i = b)
                        }), n(g, a.extend({}, i, {
                            input: i.match.def
                        }), !0)
                    }
            }
            d = d === !0;
            for (var j = u(), p = b - 1; p > -1 && !k()
                .validPositions[p]; p--);
            for (p++; b > p; p++) void 0 == k()
                .validPositions[p] && ((!z(p) || j[p] != F(p)) && s(p)
                    .length > 1 || j[p] == f.radixPoint || "0" == j[p] && a.inArray(f.radixPoint, j) < p) && g(p, j[p], !0);
            var q = b,
                r = !1,
                t = a.extend(!0, {}, k()
                    .validPositions);
            if (q < A() && (r = g(q, c, d, e), !d && r === !1)) {
                var C = k()
                    .validPositions[q];
                if (!C || null != C.match.fn || C.match.def != c && c != f.skipOptionalPartCharacter) {
                    if ((f.insertMode || void 0 == k()
                            .validPositions[B(q)]) && !z(q))
                        for (var E = q + 1, G = B(q); G >= E; E++)
                            if (r = g(E, c, d, e), r !== !1) {
                                i(q, E), q = E;
                                break
                            }
                }
                else r = {
                    caret: B(q)
                }
            }
            if (r === !1 && f.keepStatic && N(j) && (r = h(b, c, d, e)), r === !0 && (r = {
                    pos: q
                }), a.isFunction(f.postValidation) && 0 != r && !d) {
                l(!0);
                var H = f.postValidation(u(), f);
                if (!H) return l(!0), k()
                    .validPositions = a.extend(!0, {}, t), !1
            }
            return r
        }

        function z(a) {
            var b = q(a);
            return null != b.fn ? b.fn : !1
        }

        function A() {
            var a;
            db = cb.prop("maxLength"), -1 == db && (db = void 0);
            var b, c = m(),
                d = k()
                .validPositions[c],
                e = void 0 != d ? d.locator.slice() : void 0;
            for (b = c + 1; void 0 == d || null != d.match.fn || null == d.match.fn && "" != d.match.def; b++) d = p(b, e, b - 1), e = d.locator.slice();
            return a = b, void 0 == db || db > a ? a : db
        }

        function B(a) {
            var b = A();
            if (a >= b) return b;
            for (var c = a; ++c < b && !z(c) && (f.nojumps !== !0 || f.nojumpsThreshold > c););
            return c
        }

        function C(a) {
            var b = a;
            if (0 >= b) return 0;
            for (; --b > 0 && !z(b););
            return b
        }

        function D(a) {
            return void 0 == k()
                .validPositions[a] ? F(a) : k()
                .validPositions[a].input
        }

        function E(b, c, d, e, g) {
            if (e && a.isFunction(f.onBeforeWrite)) {
                var h = f.onBeforeWrite.call(b, e, c, d, f);
                if (h) {
                    if (h.refreshFromBuffer) {
                        var i = h.refreshFromBuffer;
                        v(i === !0 ? i : i.start, i.end, h.buffer), l(!0), c = u()
                    }
                    d = h.caret || d
                }
            }
            b._valueSet(c.join("")), void 0 != d && K(b, d), g === !0 && (gb = !0, a(b)
                .trigger("input"))
        }

        function F(a, b) {
            return b = b || q(a), void 0 != b.placeholder ? b.placeholder : null == b.fn ? b.def : f.placeholder.charAt(a % f.placeholder.length)
        }

        function G(b, c, d, e) {
            function f() {
                var a = !1,
                    b = t()
                    .slice(n, B(n))
                    .join("")
                    .indexOf(j);
                if (-1 != b && !z(n)) {
                    a = !0;
                    for (var c = t()
                            .slice(n, n + b), d = 0; d < c.length; d++)
                        if (" " != c[d]) {
                            a = !1;
                            break
                        }
                }
                return a
            }
            var g = void 0 != e ? e.slice() : b._valueGet()
                .split("");
            l(), k()
                .p = B(-1), c && b._valueSet("");
            var h = t()
                .slice(0, B(-1))
                .join(""),
                i = g.join("")
                .match(new RegExp(H(h), "g"));
            i && i.length > 0 && g.splice(0, h.length * i.length);
            var j = "",
                n = 0;
            a.each(g, function(c, e) {
                var g = a.Event("keypress");
                g.which = e.charCodeAt(0), j += e;
                var h = m(),
                    i = k()
                    .validPositions[h],
                    l = p(h + 1, i ? i.locator.slice() : void 0, h);
                if (!f() || d) {
                    var o = d ? c : null == l.match.fn && l.match.optionality && h + 1 < k()
                        .p ? h + 1 : k()
                        .p;
                    T.call(b, g, !0, !1, d, o), n = o + 1, j = ""
                }
                else T.call(b, g, !0, !1, !0, h + 1)
            }), c && E(b, u(), a(b)
                .is(":focus") ? B(m(0)) : void 0, a.Event("checkval"))
        }

        function H(b) {
            return a.inputmask.escapeRegex.call(this, b)
        }

        function I(b) {
            if (b.data("_inputmask") && !b.hasClass("hasDatepicker")) {
                var c = [],
                    d = k()
                    .validPositions;
                for (var e in d) d[e].match && null != d[e].match.fn && c.push(d[e].input);
                var g = (eb ? c.reverse() : c)
                    .join(""),
                    h = (eb ? u()
                        .slice()
                        .reverse() : u())
                    .join("");
                return a.isFunction(f.onUnMask) && (g = f.onUnMask.call(b, h, g, f) || g), g
            }
            return b[0]._valueGet()
        }

        function J(a) {
            if (eb && "number" == typeof a && (!f.greedy || "" != f.placeholder)) {
                var b = u()
                    .length;
                a = b - a
            }
            return a
        }

        function K(b, c, d) {
            var e, g = b.jquery && b.length > 0 ? b[0] : b;
            if ("number" != typeof c) return g.setSelectionRange ? (c = g.selectionStart, d = g.selectionEnd) : document.selection && document.selection.createRange && (e = document.selection.createRange(), c = 0 - e.duplicate()
                .moveStart("character", -1e5), d = c + e.text.length), {
                begin: J(c),
                end: J(d)
            };
            if (c = J(c), d = J(d), d = "number" == typeof d ? d : c, a(g)
                .is(":visible")) {
                var h = a(g)
                    .css("font-size")
                    .replace("px", "") * d;
                g.scrollLeft = h > g.scrollWidth ? h : 0, 0 == f.insertMode && c == d && d++, g.setSelectionRange ? (g.selectionStart = c, g.selectionEnd = d) : g.createTextRange && (e = g.createTextRange(), e.collapse(!0), e.moveEnd("character", d), e.moveStart("character", c), e.select())
            }
        }

        function L(b) {
            var c, d, e = u(),
                f = e.length,
                g = m(),
                h = {},
                i = k()
                .validPositions[g],
                j = void 0 != i ? i.locator.slice() : void 0;
            for (c = g + 1; c < e.length; c++) d = p(c, j, c - 1), j = d.locator.slice(), h[c] = a.extend(!0, {}, d);
            var l = i && void 0 != i.alternation ? i.locator[i.alternation].split(",") : [];
            for (c = f - 1; c > g && (d = h[c].match, (d.optionality || d.optionalQuantifier || i && void 0 != i.alternation && void 0 != h[c].locator[i.alternation] && -1 != a.inArray(h[c].locator[i.alternation].toString(), l)) && e[c] == F(c, d)); c--) f--;
            return b ? {
                l: f,
                def: h[f] ? h[f].match : void 0
            } : f
        }

        function M(a) {
            for (var b = L(), c = a.length - 1; c > b && !z(c); c--);
            a.splice(b, c + 1 - b)
        }

        function N(b) {
            if (a.isFunction(f.isComplete)) return f.isComplete.call(cb, b, f);
            if ("*" == f.repeat) return void 0;
            var c = !1,
                d = L(!0),
                e = C(d.l),
                g = m();
            if (g == e && (void 0 == d.def || d.def.newBlockMarker || d.def.optionalQuantifier)) {
                c = !0;
                for (var h = 0; e >= h; h++) {
                    var i = z(h);
                    if (i && (void 0 == b[h] || b[h] == F(h)) || !i && b[h] != F(h)) {
                        c = !1;
                        break
                    }
                }
            }
            return c
        }

        function O(a, b) {
            return eb ? a - b > 1 || a - b == 1 && f.insertMode : b - a > 1 || b - a == 1 && f.insertMode
        }

        function P(b) {
            var c = a._data(b)
                .events;
            a.each(c, function(b, c) {
                a.each(c, function(a, b) {
                    if ("inputmask" == b.namespace && "setvalue" != b.type) {
                        var c = b.handler;
                        b.handler = function(a) {
                            if (!this.disabled && (!this.readOnly || "keydown" == a.type && a.ctrlKey && 67 == a.keyCode)) {
                                switch (a.type) {
                                    case "input":
                                        if (gb === !0) return gb = !1, a.preventDefault();
                                        break;
                                    case "keydown":
                                        fb = !1;
                                        break;
                                    case "keypress":
                                        if (fb === !0) return a.preventDefault();
                                        fb = !0;
                                        break;
                                    case "compositionstart":
                                        break;
                                    case "compositionupdate":
                                        gb = !0;
                                        break;
                                    case "compositionend":
                                }
                                return c.apply(this, arguments)
                            }
                            a.preventDefault()
                        }
                    }
                })
            })
        }

        function Q(b) {
            function c(b) {
                if (void 0 == a.valHooks[b] || 1 != a.valHooks[b].inputmaskpatch) {
                    var c = a.valHooks[b] && a.valHooks[b].get ? a.valHooks[b].get : function(a) {
                            return a.value
                        },
                        d = a.valHooks[b] && a.valHooks[b].set ? a.valHooks[b].set : function(a, b) {
                            return a.value = b, a
                        };
                    a.valHooks[b] = {
                        get: function(b) {
                            var d = a(b);
                            if (d.data("_inputmask")) {
                                if (d.data("_inputmask")
                                    .opts.autoUnmask) return d.inputmask("unmaskedvalue");
                                var e = c(b),
                                    f = d.data("_inputmask"),
                                    g = f.maskset,
                                    h = g._buffer;
                                return h = h ? h.join("") : "", e != h ? e : ""
                            }
                            return c(b)
                        },
                        set: function(b, c) {
                            var e, f = a(b),
                                g = f.data("_inputmask");
                            return g ? (e = d(b, a.isFunction(g.opts.onBeforeMask) ? g.opts.onBeforeMask.call(nb, c, g.opts) || c : c), f.triggerHandler("setvalue.inputmask")) : e = d(b, c), e
                        },
                        inputmaskpatch: !0
                    }
                }
            }

            function d() {
                var b = a(this),
                    c = a(this)
                    .data("_inputmask");
                return c ? c.opts.autoUnmask ? b.inputmask("unmaskedvalue") : h.call(this) != t()
                    .join("") ? h.call(this) : "" : h.call(this)
            }

            function e(b) {
                var c = a(this)
                    .data("_inputmask");
                c ? (i.call(this, a.isFunction(c.opts.onBeforeMask) ? c.opts.onBeforeMask.call(nb, b, c.opts) || b : b), a(this)
                    .triggerHandler("setvalue.inputmask")) : i.call(this, b)
            }

            function g(b) {
                a(b)
                    .bind("mouseenter.inputmask", function() {
                        var b = a(this),
                            c = this,
                            d = c._valueGet();
                        "" != d && d != u()
                            .join("") && (this._valueSet(a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(nb, d, f) || d : d), b.triggerHandler("setvalue.inputmask"))
                    }); //!! the bound handlers are executed in the order they where bound
                var c = a._data(b)
                    .events,
                    d = c.mouseover;
                if (d) {
                    for (var e = d[d.length - 1], g = d.length - 1; g > 0; g--) d[g] = d[g - 1];
                    d[0] = e
                }
            }
            var h, i;
            if (!b._valueGet) {
                if (Object.getOwnPropertyDescriptor) {
                    Object.getOwnPropertyDescriptor(b, "value")
                }
                document.__lookupGetter__ && b.__lookupGetter__("value") ? (h = b.__lookupGetter__("value"), i = b.__lookupSetter__("value"), b.__defineGetter__("value", d), b.__defineSetter__("value", e)) : (h = function() {
                    return b.value
                }, i = function(a) {
                    b.value = a
                }, c(b.type), g(b)), b._valueGet = function(a) {
                    return eb && a !== !0 ? h.call(this)
                        .split("")
                        .reverse()
                        .join("") : h.call(this)
                }, b._valueSet = function(a) {
                    i.call(this, eb ? a.split("")
                        .reverse()
                        .join("") : a)
                }
            }
        }

        function R(b, c, d, e) {
            function g() {
                if (f.keepStatic) {
                    l(!0);
                    var c, d = [];
                    for (c = m(); c >= 0; c--)
                        if (k()
                            .validPositions[c]) {
                            if (void 0 != k()
                                .validPositions[c].alternation) break;
                            d.push(k()
                                    .validPositions[c].input), delete k()
                                .validPositions[c]
                        }
                    if (c > 0)
                        for (; d.length > 0;) {
                            k()
                                .p = B(m());
                            var e = a.Event("keypress");
                            e.which = d.pop()
                                .charCodeAt(0), T.call(b, e, !0, !1, !1, k()
                                    .p)
                        }
                }
            }
            if ((f.numericInput || eb) && (c == a.inputmask.keyCode.BACKSPACE ? c = a.inputmask.keyCode.DELETE : c == a.inputmask.keyCode.DELETE && (c = a.inputmask.keyCode.BACKSPACE), eb)) {
                var h = d.end;
                d.end = d.begin, d.begin = h
            }
            if (c == a.inputmask.keyCode.BACKSPACE && (d.end - d.begin < 1 || 0 == f.insertMode) ? d.begin = C(d.begin) : c == a.inputmask.keyCode.DELETE && d.begin == d.end && (d.end = z(d.end) ? d.end + 1 : B(d.end) + 1), o(d.begin, d.end, !1, e), e !== !0) {
                g();
                var i = m(d.begin);
                i < d.begin ? (-1 == i && l(), k()
                        .p = B(i)) : k()
                    .p = d.begin
            }
        }

        function S(c) {
            var d = this,
                e = a(d),
                g = c.keyCode,
                i = K(d);
            g == a.inputmask.keyCode.BACKSPACE || g == a.inputmask.keyCode.DELETE || h && 127 == g || c.ctrlKey && 88 == g && !b("cut") ? (c.preventDefault(), 88 == g && (_ = u()
                    .join("")), R(d, g, i), E(d, u(), k()
                    .p, c, _ != u()
                    .join("")), d._valueGet() == t()
                .join("") ? e.trigger("cleared") : N(u()) === !0 && e.trigger("complete"), f.showTooltip && e.prop("title", k()
                    .mask)) : g == a.inputmask.keyCode.END || g == a.inputmask.keyCode.PAGE_DOWN ? setTimeout(function() {
                var a = B(m());
                f.insertMode || a != A() || c.shiftKey || a--, K(d, c.shiftKey ? i.begin : a, a)
            }, 0) : g == a.inputmask.keyCode.HOME && !c.shiftKey || g == a.inputmask.keyCode.PAGE_UP ? K(d, 0, c.shiftKey ? i.begin : 0) : (f.undoOnEscape && g == a.inputmask.keyCode.ESCAPE || 90 == g && c.ctrlKey) && c.altKey !== !0 ? (G(d, !0, !1, _.split("")), e.click()) : g != a.inputmask.keyCode.INSERT || c.shiftKey || c.ctrlKey ? 0 != f.insertMode || c.shiftKey || (g == a.inputmask.keyCode.RIGHT ? setTimeout(function() {
                var a = K(d);
                K(d, a.begin)
            }, 0) : g == a.inputmask.keyCode.LEFT && setTimeout(function() {
                var a = K(d);
                K(d, eb ? a.begin + 1 : a.begin - 1)
            }, 0)) : (f.insertMode = !f.insertMode, K(d, f.insertMode || i.begin != A() ? i.begin : i.begin - 1)), hb = -1 != a.inArray(g, f.ignorables)
        }

        function T(b, c, d, e, g) {
            var h = this,
                i = a(h),
                j = b.which || b.charCode || b.keyCode;
            if (!(c === !0 || b.ctrlKey && b.altKey) && (b.ctrlKey || b.metaKey || hb)) return !0;
            if (j) {
                46 == j && 0 == b.shiftKey && "," == f.radixPoint && (j = 44);
                var m, o = c ? {
                        begin: g,
                        end: g
                    } : K(h),
                    p = String.fromCharCode(j),
                    q = O(o.begin, o.end);
                q && (k()
                        .undoPositions = a.extend(!0, {}, k()
                            .validPositions), R(h, a.inputmask.keyCode.DELETE, o, !0), o.begin = k()
                        .p, f.insertMode || (f.insertMode = !f.insertMode, n(o.begin, e), f.insertMode = !f.insertMode), q = !f.multi), k()
                    .writeOutBuffer = !0;
                var r = eb && !q ? o.end : o.begin,
                    t = y(r, p, e);
                if (t !== !1) {
                    if (t !== !0 && (r = void 0 != t.pos ? t.pos : r, p = void 0 != t.c ? t.c : p), l(!0), void 0 != t.caret) m = t.caret;
                    else {
                        var w = k()
                            .validPositions;
                        m = !f.keepStatic && (void 0 != w[r + 1] && s(r + 1, w[r].locator.slice(), r)
                            .length > 1 || void 0 != w[r].alternation) ? r + 1 : B(r)
                    }
                    k()
                        .p = m
                }
                if (d !== !1) {
                    var x = this;
                    if (setTimeout(function() {
                            f.onKeyValidation.call(x, t, f)
                        }, 0), k()
                        .writeOutBuffer && t !== !1) {
                        var z = u();
                        E(h, z, c ? void 0 : f.numericInput ? C(m) : m, b, c !== !0), c !== !0 && setTimeout(function() {
                            N(z) === !0 && i.trigger("complete")
                        }, 0)
                    }
                    else q && (k()
                        .buffer = void 0, k()
                        .validPositions = k()
                        .undoPositions)
                }
                else q && (k()
                    .buffer = void 0, k()
                    .validPositions = k()
                    .undoPositions);
                if (f.showTooltip && i.prop("title", k()
                        .mask), c && a.isFunction(f.onBeforeWrite)) {
                    var A = f.onBeforeWrite.call(this, b, u(), m, f);
                    if (A && A.refreshFromBuffer) {
                        var D = A.refreshFromBuffer;
                        v(D === !0 ? D : D.start, D.end, A.buffer), l(!0), A.caret && (k()
                            .p = A.caret)
                    }
                }
                b.preventDefault()
            }
        }

        function U(b) {
            var c = (a(this), b.keyCode, u());
            f.onKeyUp.call(this, b, c, f)
        }

        function V(b) {
            var c = this,
                d = a(c),
                e = c._valueGet(!0),
                g = K(c);
            if ("propertychange" == b.type && c._valueGet()
                .length <= A()) return !0;
            if ("paste" == b.type) {
                var h = e.substr(0, g.begin),
                    i = e.substr(g.end, e.length);
                h == t()
                    .slice(0, g.begin)
                    .join("") && (h = ""), i == t()
                    .slice(g.end)
                    .join("") && (i = ""), window.clipboardData && window.clipboardData.getData ? e = h + window.clipboardData.getData("Text") + i : b.originalEvent && b.originalEvent.clipboardData && b.originalEvent.clipboardData.getData && (e = h + b.originalEvent.clipboardData.getData("text/plain") + i)
            }
            var j = e;
            if (a.isFunction(f.onBeforePaste)) {
                if (j = f.onBeforePaste.call(c, e, f), j === !1) return b.preventDefault(), !1;
                j || (j = e)
            }
            return G(c, !0, !1, eb ? j.split("")
                .reverse() : j.split("")), d.click(), N(u()) === !0 && d.trigger("complete"), !1
        }

        function W(b) {
            var c = this;
            G(c, !0, !1), N(u()) === !0 && a(c)
                .trigger("complete"), b.preventDefault()
        }

        function X(a) {
            var b = this;
            _ = u()
                .join(""), ("" == bb || 0 != a.originalEvent.data.indexOf(bb)) && (ab = K(b))
        }

        function Y(b) {
            var c = this,
                d = ab || K(c);
            0 == b.originalEvent.data.indexOf(bb) && (l(), d = {
                begin: 0,
                end: 0
            });
            var e = b.originalEvent.data;
            K(c, d.begin, d.end);
            for (var g = 0; g < e.length; g++) {
                var h = a.Event("keypress");
                h.which = e.charCodeAt(g), fb = !1, hb = !1, T.call(c, h)
            }
            setTimeout(function() {
                var a = k()
                    .p;
                E(c, u(), f.numericInput ? C(a) : a)
            }, 0), bb = b.originalEvent.data
        }

        function Z() {}

        function $(b) {
            if (cb = a(b), cb.is(":input") && c(cb.attr("type"))) {
                if (cb.data("_inputmask", {
                        maskset: e,
                        opts: f,
                        isRTL: !1
                    }), f.showTooltip && cb.prop("title", k()
                        .mask), ("rtl" == b.dir || f.rightAlign) && cb.css("text-align", "right"), "rtl" == b.dir || f.numericInput) {
                    b.dir = "ltr", cb.removeAttr("dir");
                    var d = cb.data("_inputmask");
                    d.isRTL = !0, cb.data("_inputmask", d), eb = !0
                }
                cb.unbind(".inputmask"), cb.closest("form")
                    .bind("submit", function() {
                        _ != u()
                            .join("") && cb.change(), cb[0]._valueGet && cb[0]._valueGet() == t()
                            .join("") && cb[0]._valueSet(""), f.removeMaskOnSubmit && cb.inputmask("remove")
                    })
                    .bind("reset", function() {
                        setTimeout(function() {
                            cb.triggerHandler("setvalue.inputmask")
                        }, 0)
                    }), cb.bind("mouseenter.inputmask", function() {
                        var b = a(this),
                            c = this;
                        !b.is(":focus") && f.showMaskOnHover && c._valueGet() != u()
                            .join("") && E(c, u())
                    })
                    .bind("blur.inputmask", function(b) {
                        var c = a(this),
                            d = this;
                        if (c.data("_inputmask")) {
                            var e = d._valueGet(),
                                g = u()
                                .slice();
                            ib = !0, _ != g.join("") && setTimeout(function() {
                                c.change(), _ = g.join("")
                            }, 0), "" != e && (f.clearMaskOnLostFocus && (e == t()
                                .join("") ? g = [] : M(g)), N(g) === !1 && (c.trigger("incomplete"), f.clearIncomplete && (l(), g = f.clearMaskOnLostFocus ? [] : t()
                                .slice())), E(d, g, void 0, b))
                        }
                    })
                    .bind("focus.inputmask", function() {
                        var b = (a(this), this),
                            c = b._valueGet();
                        f.showMaskOnFocus && (!f.showMaskOnHover || f.showMaskOnHover && "" == c) && b._valueGet() != u()
                            .join("") && E(b, u(), B(m())), _ = u()
                            .join("")
                    })
                    .bind("mouseleave.inputmask", function() {
                        var b = a(this),
                            c = this;
                        if (f.clearMaskOnLostFocus) {
                            var d = u()
                                .slice(),
                                e = c._valueGet();
                            b.is(":focus") || e == b.attr("placeholder") || "" == e || (e == t()
                                .join("") ? d = [] : M(d), E(c, d))
                        }
                    })
                    .bind("click.inputmask", function() {
                        var b = a(this),
                            c = this;
                        if (b.is(":focus")) {
                            var d = K(c);
                            if (d.begin == d.end)
                                if (f.radixFocus && "" != f.radixPoint && -1 != a.inArray(f.radixPoint, u()) && (ib || u()
                                        .join("") == t()
                                        .join(""))) K(c, a.inArray(f.radixPoint, u())), ib = !1;
                                else {
                                    var e = eb ? J(d.begin) : d.begin,
                                        g = B(m(e));
                                    g > e ? K(c, z(e) ? e : B(e)) : K(c, g)
                                }
                        }
                    })
                    .bind("dblclick.inputmask", function() {
                        var a = this;
                        setTimeout(function() {
                            K(a, 0, B(m()))
                        }, 0)
                    })
                    .bind(j + ".inputmask dragdrop.inputmask drop.inputmask", V)
                    .bind("setvalue.inputmask", function() {
                        var a = this;
                        G(a, !0, !1), _ = u()
                            .join(""), (f.clearMaskOnLostFocus || f.clearIncomplete) && a._valueGet() == t()
                            .join("") && a._valueSet("")
                    })
                    .bind("cut.inputmask", function(b) {
                        gb = !0;
                        var c = this,
                            d = a(c),
                            e = K(c);
                        R(c, a.inputmask.keyCode.DELETE, e), E(c, u(), k()
                                .p, b, _ != u()
                                .join("")), c._valueGet() == t()
                            .join("") && d.trigger("cleared"), f.showTooltip && d.prop("title", k()
                                .mask)
                    })
                    .bind("complete.inputmask", f.oncomplete)
                    .bind("incomplete.inputmask", f.onincomplete)
                    .bind("cleared.inputmask", f.oncleared), cb.bind("keydown.inputmask", S)
                    .bind("keypress.inputmask", T)
                    .bind("keyup.inputmask", U), i || cb.bind("compositionstart.inputmask", X)
                    .bind("compositionupdate.inputmask", Y)
                    .bind("compositionend.inputmask", Z), "paste" === j && cb.bind("input.inputmask", W), Q(b);
                var g = a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(b, b._valueGet(), f) || b._valueGet() : b._valueGet();
                G(b, !0, !1, g.split(""));
                var h = u()
                    .slice();
                _ = h.join("");
                var n;
                try {
                    n = document.activeElement
                }
                catch (o) {}
                N(h) === !1 && f.clearIncomplete && l(), f.clearMaskOnLostFocus && (h.join("") == t()
                    .join("") ? h = [] : M(h)), E(b, h), n === b && K(b, B(m())), P(b)
            }
        }
        var _, ab, bb, cb, db, eb = !1,
            fb = !1,
            gb = !1,
            hb = !1,
            ib = !0;
        if (void 0 != d) switch (d.action) {
            case "isComplete":
                return cb = a(d.el), e = cb.data("_inputmask")
                    .maskset, f = cb.data("_inputmask")
                    .opts, N(d.buffer);
            case "unmaskedvalue":
                return cb = d.$input, e = cb.data("_inputmask")
                    .maskset, f = cb.data("_inputmask")
                    .opts, eb = d.$input.data("_inputmask")
                    .isRTL, I(d.$input);
            case "mask":
                _ = u()
                    .join(""), $(d.el);
                break;
            case "format":
                cb = a({}), cb.data("_inputmask", {
                    maskset: e,
                    opts: f,
                    isRTL: f.numericInput
                }), f.numericInput && (eb = !0);
                var jb = (a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(cb, d.value, f) || d.value : d.value)
                    .split("");
                return G(cb, !1, !1, eb ? jb.reverse() : jb), a.isFunction(f.onBeforeWrite) && f.onBeforeWrite.call(this, void 0, u(), 0, f), d.metadata ? {
                        value: eb ? u()
                            .slice()
                            .reverse()
                            .join("") : u()
                            .join(""),
                        metadata: cb.inputmask("getmetadata")
                    } : eb ? u()
                    .slice()
                    .reverse()
                    .join("") : u()
                    .join("");
            case "isValid":
                cb = a({}), cb.data("_inputmask", {
                    maskset: e,
                    opts: f,
                    isRTL: f.numericInput
                }), f.numericInput && (eb = !0);
                var jb = d.value.split("");
                G(cb, !1, !0, eb ? jb.reverse() : jb);
                for (var kb = u(), lb = L(), mb = kb.length - 1; mb > lb && !z(mb); mb--);
                return kb.splice(lb, mb + 1 - lb), N(kb) && d.value == kb.join("");
            case "getemptymask":
                return cb = a(d.el), e = cb.data("_inputmask")
                    .maskset, f = cb.data("_inputmask")
                    .opts, t();
            case "remove":
                var nb = d.el;
                cb = a(nb), e = cb.data("_inputmask")
                    .maskset, f = cb.data("_inputmask")
                    .opts, nb._valueSet(I(cb)), cb.unbind(".inputmask"), cb.removeData("_inputmask");
                var ob;
                Object.getOwnPropertyDescriptor && (ob = Object.getOwnPropertyDescriptor(nb, "value")), ob && ob.get ? nb._valueGet && Object.defineProperty(nb, "value", {
                    get: nb._valueGet,
                    set: nb._valueSet
                }) : document.__lookupGetter__ && nb.__lookupGetter__("value") && nb._valueGet && (nb.__defineGetter__("value", nb._valueGet), nb.__defineSetter__("value", nb._valueSet));
                try {
                    delete nb._valueGet, delete nb._valueSet
                }
                catch (pb) {
                    nb._valueGet = void 0, nb._valueSet = void 0
                }
                break;
            case "getmetadata":
                if (cb = a(d.el), e = cb.data("_inputmask")
                    .maskset, f = cb.data("_inputmask")
                    .opts, a.isArray(e.metadata)) {
                    for (var qb, rb = m(), sb = rb; sb >= 0; sb--)
                        if (k()
                            .validPositions[sb] && void 0 != k()
                            .validPositions[sb].alternation) {
                            qb = k()
                                .validPositions[sb].alternation;
                            break
                        }
                    return void 0 != qb ? e.metadata[k()
                        .validPositions[rb].locator[qb]] : e.metadata[0]
                }
                return e.metadata
        }
    }
    if (void 0 === a.fn.inputmask) {
        var g = navigator.userAgent,
            h = null !== g.match(new RegExp("iphone", "i")),
            i = (null !== g.match(new RegExp("android.*safari.*", "i")), null !== g.match(new RegExp("android.*chrome.*", "i")), null !== g.match(new RegExp("android.*firefox.*", "i"))),
            j = (/Kindle/i.test(g) || /Silk/i.test(g) || /KFTT/i.test(g) || /KFOT/i.test(g) || /KFJWA/i.test(g) || /KFJWI/i.test(g) || /KFSOWI/i.test(g) || /KFTHWA/i.test(g) || /KFTHWI/i.test(g) || /KFAPWA/i.test(g) || /KFAPWI/i.test(g), b("paste") ? "paste" : b("input") ? "input" : "propertychange");
        a.inputmask = {
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                quantifiermarker: {
                    start: "{",
                    end: "}"
                },
                groupmarker: {
                    start: "(",
                    end: ")"
                },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                oncomplete: a.noop,
                onincomplete: a.noop,
                oncleared: a.noop,
                repeat: 0,
                greedy: !0,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                aliases: {},
                alias: null,
                onKeyUp: a.noop,
                onBeforeMask: void 0,
                onBeforePaste: void 0,
                onBeforeWrite: void 0,
                onUnMask: void 0,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: a.noop,
                skipOptionalPartCharacter: " ",
                showTooltip: !1,
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                radixFocus: !1,
                nojumps: !1,
                nojumpsThreshold: 0,
                keepStatic: void 0,
                definitions: {
                    9: {
                        validator: "[0-9]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        cardinality: 1
                    }
                },
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                isComplete: void 0,
                canClearPosition: a.noop,
                postValidation: void 0
            },
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            },
            masksCache: {},
            escapeRegex: function(a) {
                var b = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
                return a.replace(new RegExp("(\\" + b.join("|\\") + ")", "gim"), "\\$1")
            },
            format: function(b, c, g) {
                var h = a.extend(!0, {}, a.inputmask.defaults, c);
                return d(h.alias, c, h), f({
                    action: "format",
                    value: b,
                    metadata: g
                }, e(h), h)
            },
            isValid: function(b, c) {
                var g = a.extend(!0, {}, a.inputmask.defaults, c);
                return d(g.alias, c, g), f({
                    action: "isValid",
                    value: b
                }, e(g), g)
            }
        }, a.fn.inputmask = function(b, c) {
            function g(b, c, e) {
                var f = a(b);
                f.data("inputmask-alias") && d(f.data("inputmask-alias"), {}, c);
                for (var g in c) {
                    var h = f.data("inputmask-" + g.toLowerCase());
                    void 0 != h && ("mask" == g && 0 == h.indexOf("[") ? (c[g] = h.replace(/[\s[\]]/g, "")
                        .split("','"), c[g][0] = c[g][0].replace("'", ""), c[g][c[g].length - 1] = c[g][c[g].length - 1].replace("'", "")) : c[g] = "boolean" == typeof h ? h : h.toString(), e && (e[g] = c[g]))
                }
                return c
            }
            var h, i = a.extend(!0, {}, a.inputmask.defaults, c);
            if ("string" == typeof b) switch (b) {
                case "mask":
                    return d(i.alias, c, i), h = e(i), void 0 == h ? this : this.each(function() {
                        f({
                            action: "mask",
                            el: this
                        }, a.extend(!0, {}, h), g(this, i))
                    });
                case "unmaskedvalue":
                    var j = a(this);
                    return j.data("_inputmask") ? f({
                        action: "unmaskedvalue",
                        $input: j
                    }) : j.val();
                case "remove":
                    return this.each(function() {
                        var b = a(this);
                        b.data("_inputmask") && f({
                            action: "remove",
                            el: this
                        })
                    });
                case "getemptymask":
                    return this.data("_inputmask") ? f({
                        action: "getemptymask",
                        el: this
                    }) : "";
                case "hasMaskedValue":
                    return this.data("_inputmask") ? !this.data("_inputmask")
                        .opts.autoUnmask : !1;
                case "isComplete":
                    return this.data("_inputmask") ? f({
                        action: "isComplete",
                        buffer: this[0]._valueGet()
                            .split(""),
                        el: this
                    }) : !0;
                case "getmetadata":
                    return this.data("_inputmask") ? f({
                        action: "getmetadata",
                        el: this
                    }) : void 0;
                default:
                    return d(i.alias, c, i), d(b, c, i) || (i.mask = b), h = e(i), void 0 == h ? this : this.each(function() {
                        f({
                            action: "mask",
                            el: this
                        }, a.extend(!0, {}, h), g(this, i))
                    })
            }
            else {
                if ("object" == typeof b) return i = a.extend(!0, {}, a.inputmask.defaults, b), d(i.alias, b, i), h = e(i), void 0 == h ? this : this.each(function() {
                    f({
                        action: "mask",
                        el: this
                    }, a.extend(!0, {}, h), g(this, i))
                });
                if (void 0 == b) return this.each(function() {
                    var b = a(this)
                        .attr("data-inputmask");
                    if (b && "" != b) try {
                        b = b.replace(new RegExp("'", "g"), '"');
                        var e = a.parseJSON("{" + b + "}");
                        a.extend(!0, e, c), i = a.extend(!0, {}, a.inputmask.defaults, e), i = g(this, i), d(i.alias, e, i), i.alias = void 0, a(this)
                            .inputmask("mask", i)
                    }
                    catch (f) {}
                    if (a(this)
                        .attr("data-inputmask-mask") || a(this)
                        .attr("data-inputmask-alias")) {
                        i = a.extend(!0, {}, a.inputmask.defaults, {});
                        var h = {};
                        i = g(this, i, h), d(i.alias, h, i), i.alias = void 0, a(this)
                            .inputmask("mask", i)
                    }
                })
            }
        }
    }
    return a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.definitions, {
        h: {
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [{
                validator: "[0-2]",
                cardinality: 1
            }]
        },
        s: {
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [{
                validator: "[0-5]",
                cardinality: 1
            }]
        },
        d: {
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [{
                validator: "[0-3]",
                cardinality: 1
            }]
        },
        m: {
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [{
                validator: "[01]",
                cardinality: 1
            }]
        },
        y: {
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [{
                validator: "[12]",
                cardinality: 1
            }, {
                validator: "(19|20)",
                cardinality: 2
            }, {
                validator: "(19|20)\\d",
                cardinality: 3
            }]
        }
    }), a.extend(a.inputmask.defaults.aliases, {
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"),
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                val2pre: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + c + "[01])")
                },
                val2: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|[12][0-9])" + c + "(0[1-9]|1[012]))|(30" + c + "(0[13-9]|1[012]))|(31" + c + "(0[13578]|1[02]))")
                }
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function(a, b, c) {
                if (isNaN(a)) return !1;
                var d = parseInt(a.concat(b.toString()
                        .slice(a.length))),
                    e = parseInt(a.concat(c.toString()
                        .slice(a.length)));
                return (isNaN(d) ? !1 : d >= b && c >= d) || (isNaN(e) ? !1 : e >= b && c >= e)
            },
            determinebaseyear: function(a, b, c) {
                var d = (new Date)
                    .getFullYear();
                if (a > d) return a;
                if (d > b) {
                    for (var e = b.toString()
                            .slice(0, 2), f = b.toString()
                            .slice(2, 4); e + c > b;) e--;
                    var g = e + f;
                    return a > g ? a : g
                }
                return d
            },
            onKeyUp: function(b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val(d.getDate()
                        .toString() + (d.getMonth() + 1)
                        .toString() + d.getFullYear()
                        .toString()), c.triggerHandler("setvalue.inputmask")
                }
            },
            getFrontValue: function(a, b, c) {
                for (var d = 0, e = 0, f = 0; f < a.length && "2" != a.charAt(f); f++) {
                    var g = c.definitions[a.charAt(f)];
                    g ? (d += e, e = g.cardinality) : e++
                }
                return b.join("")
                    .substr(d, e)
            },
            definitions: {
                1: {
                    validator: function(a, b, c, d, e) {
                        var f = e.regex.val1.test(a);
                        return d || f || a.charAt(1) != e.separator && -1 == "-./".indexOf(a.charAt(1)) || !(f = e.regex.val1.test("0" + a.charAt(0))) ? f : (b.buffer[c - 1] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            },
                            pos: c,
                            c: a.charAt(0)
                        })
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]);
                            var f = 1 == a.length ? e.regex.val1pre.test(a) : e.regex.val1.test(a);
                            return d || f || !(f = e.regex.val1.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                2: {
                    validator: function(a, b, c, d, e) {
                        var f = e.getFrontValue(b.mask, b.buffer, e); - 1 != f.indexOf(e.placeholder[0]) && (f = "01" + e.separator);
                        var g = e.regex.val2(e.separator)
                            .test(f + a);
                        if (!d && !g && (a.charAt(1) == e.separator || -1 != "-./".indexOf(a.charAt(1))) && (g = e.regex.val2(e.separator)
                                .test(f + "0" + a.charAt(0)))) return b.buffer[c - 1] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            },
                            pos: c,
                            c: a.charAt(0)
                        };
                        if (e.mask.indexOf("2") == e.mask.length - 1 && g) {
                            var h = b.buffer.join("")
                                .substr(4, 4) + a;
                            if (h != e.leapday) return !0;
                            var i = parseInt(b.buffer.join("")
                                .substr(0, 4), 10);
                            return i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1
                        }
                        return g
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]);
                            var f = e.getFrontValue(b.mask, b.buffer, e); - 1 != f.indexOf(e.placeholder[0]) && (f = "01" + e.separator);
                            var g = 1 == a.length ? e.regex.val2pre(e.separator)
                                .test(f + a) : e.regex.val2(e.separator)
                                .test(f + a);
                            return d || g || !(g = e.regex.val2(e.separator)
                                .test(f + "0" + a)) ? g : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                y: {
                    validator: function(a, b, c, d, e) {
                        if (e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)) {
                            var f = b.buffer.join("")
                                .substr(0, 6);
                            if (f != e.leapday) return !0;
                            var g = parseInt(a, 10);
                            return g % 4 === 0 ? g % 100 === 0 ? g % 400 === 0 ? !0 : !1 : !0 : !1
                        }
                        return !1
                    },
                    cardinality: 4,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            if (!d && !f) {
                                var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0")
                                    .toString()
                                    .slice(0, 1);
                                if (f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), {
                                    pos: c
                                };
                                if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0")
                                    .toString()
                                    .slice(0, 2), f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), b.buffer[c++] = g.charAt(1), {
                                    pos: c
                                }
                            }
                            return f
                        },
                        cardinality: 1
                    }, {
                        validator: function(a, b, c, d, e) {
                            var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            if (!d && !f) {
                                var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a)
                                    .toString()
                                    .slice(0, 2);
                                if (f = e.isInYearRange(a[0] + g[1] + a[1], e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(1), {
                                    pos: c
                                };
                                if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a)
                                    .toString()
                                    .slice(0, 2), e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) {
                                    var h = b.buffer.join("")
                                        .substr(0, 6);
                                    if (h != e.leapday) f = !0;
                                    else {
                                        var i = parseInt(a, 10);
                                        f = i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1
                                    }
                                }
                                else f = !1;
                                if (f) return b.buffer[c - 1] = g.charAt(0), b.buffer[c++] = g.charAt(1), b.buffer[c++] = a.charAt(0), {
                                    refreshFromBuffer: {
                                        start: c - 3,
                                        end: c
                                    },
                                    pos: c
                                }
                            }
                            return f
                        },
                        cardinality: 2
                    }, {
                        validator: function(a, b, c, d, e) {
                            return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)
                        },
                        cardinality: 3
                    }]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy",
            regex: {
                val2pre: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])")
                },
                val2: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)")
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyUp: function(b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val((d.getMonth() + 1)
                        .toString() + d.getDate()
                        .toString() + d.getFullYear()
                        .toString()), c.triggerHandler("setvalue.inputmask")
                }
            }
        },
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyUp: function(b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val(d.getFullYear()
                        .toString() + (d.getMonth() + 1)
                        .toString() + d.getDate()
                        .toString()), c.triggerHandler("setvalue.inputmask")
                }
            }
        },
        "dd.mm.yyyy": {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: ".",
            alias: "dd/mm/yyyy"
        },
        "dd-mm-yyyy": {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: "-",
            alias: "dd/mm/yyyy"
        },
        "mm.dd.yyyy": {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: ".",
            alias: "mm/dd/yyyy"
        },
        "mm-dd-yyyy": {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: "-",
            alias: "mm/dd/yyyy"
        },
        "yyyy.mm.dd": {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: ".",
            alias: "yyyy/mm/dd"
        },
        "yyyy-mm-dd": {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: "-",
            alias: "yyyy/mm/dd"
        },
        datetime: {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"),
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"),
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"),
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ":",
            hourFormat: "24",
            definitions: {
                h: {
                    validator: function(a, b, c, d, e) {
                        if ("24" == e.hourFormat && 24 == parseInt(a, 10)) return b.buffer[c - 1] = "0", b.buffer[c] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            },
                            c: "0"
                        };
                        var f = e.regex.hrs.test(a);
                        if (!d && !f && (a.charAt(1) == e.timeseparator || -1 != "-.:".indexOf(a.charAt(1))) && (f = e.regex.hrs.test("0" + a.charAt(0)))) return b.buffer[c - 1] = "0", b.buffer[c] = a.charAt(0), c++, {
                            refreshFromBuffer: {
                                start: c - 2,
                                end: c
                            },
                            pos: c,
                            c: e.timeseparator
                        };
                        if (f && "24" !== e.hourFormat && e.regex.hrs24.test(a)) {
                            var g = parseInt(a, 10);
                            return 24 == g ? (b.buffer[c + 5] = "a", b.buffer[c + 6] = "m") : (b.buffer[c + 5] = "p", b.buffer[c + 6] = "m"), g -= 12, 10 > g ? (b.buffer[c] = g.toString(), b.buffer[c - 1] = "0") : (b.buffer[c] = g.toString()
                                .charAt(1), b.buffer[c - 1] = g.toString()
                                .charAt(0)), {
                                refreshFromBuffer: {
                                    start: c - 1,
                                    end: c + 6
                                },
                                c: b.buffer[c]
                            }
                        }
                        return f
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            var f = e.regex.hrspre.test(a);
                            return d || f || !(f = e.regex.hrs.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                s: {
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            var f = e.regex.mspre.test(a);
                            return d || f || !(f = e.regex.ms.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                t: {
                    validator: function(a, b, c, d, e) {
                        return e.regex.ampm.test(a + "m")
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "h:s t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm:ss": {
            mask: "h:s:s",
            placeholder: "hh:mm:ss",
            alias: "datetime",
            autoUnmask: !1
        },
        "hh:mm": {
            mask: "h:s",
            placeholder: "hh:mm",
            alias: "datetime",
            autoUnmask: !1
        },
        date: {
            alias: "dd/mm/yyyy"
        },
        "mm/yyyy": {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: "/",
            alias: "mm/dd/yyyy"
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.definitions, {
        A: {
            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        },
        "#": {
            validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        }
    }), a.extend(a.inputmask.defaults.aliases, {
        url: {
            mask: "ir",
            placeholder: "",
            separator: "",
            defaultPrefix: "http://",
            regex: {
                urlpre1: new RegExp("[fh]"),
                urlpre2: new RegExp("(ft|ht)"),
                urlpre3: new RegExp("(ftp|htt)"),
                urlpre4: new RegExp("(ftp:|http|ftps)"),
                urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
                urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
                urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
                urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
            },
            definitions: {
                i: {
                    validator: function() {
                        return !0
                    },
                    cardinality: 8,
                    prevalidator: function() {
                        for (var a = [], b = 8, c = 0; b > c; c++) a[c] = function() {
                            var a = c;
                            return {
                                validator: function(b, c, d, e, f) {
                                    if (f.regex["urlpre" + (a + 1)]) {
                                        var g, h = b;
                                        a + 1 - b.length > 0 && (h = c.buffer.join("")
                                            .substring(0, a + 1 - b.length) + "" + h);
                                        var i = f.regex["urlpre" + (a + 1)].test(h);
                                        if (!e && !i) {
                                            for (d -= a, g = 0; g < f.defaultPrefix.length; g++) c.buffer[d] = f.defaultPrefix[g], d++;
                                            for (g = 0; g < h.length - 1; g++) c.buffer[d] = h[g], d++;
                                            return {
                                                pos: d
                                            }
                                        }
                                        return i
                                    }
                                    return !1
                                },
                                cardinality: a
                            }
                        }();
                        return a
                    }()
                },
                r: {
                    validator: ".",
                    cardinality: 50
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                i: {
                    validator: function(a, b, c) {
                        return c - 1 > -1 && "." != b.buffer[c - 1] ? (a = b.buffer[c - 1] + a, a = c - 2 > -1 && "." != b.buffer[c - 2] ? b.buffer[c - 2] + a : "0" + a) : a = "00" + a, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]")
                            .test(a)
                    },
                    cardinality: 1
                }
            }
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",
            greedy: !1,
            onBeforePaste: function(a) {
                return a = a.toLowerCase(), a.replace("mailto:", "")
            },
            definitions: {
                "*": {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.aliases, {
        numeric: {
            mask: function(a) {
                function b(b) {
                    for (var c = "", d = 0; d < b.length; d++) c += a.definitions[b[d]] ? "\\" + b[d] : b[d];
                    return c
                }
                if (0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat), a.repeat = 0, a.groupSeparator == a.radixPoint && (a.groupSeparator = "." == a.radixPoint ? "," : "," == a.radixPoint ? "." : ""), " " === a.groupSeparator && (a.skipOptionalPartCharacter = void 0), a.autoGroup = a.autoGroup && "" != a.groupSeparator, a.autoGroup && ("string" == typeof a.groupSize && isFinite(a.groupSize) && (a.groupSize = parseInt(a.groupSize)), isFinite(a.integerDigits))) {
                    var c = Math.floor(a.integerDigits / a.groupSize),
                        d = a.integerDigits % a.groupSize;
                    a.integerDigits = parseInt(a.integerDigits) + (0 == d ? c - 1 : c)
                }
                a.radixFocus = a.radixFocus && "0" == a.placeholder, a.definitions[";"] = a.definitions["~"];
                var e = b(a.prefix);
                return e += "[+]", e += "~{1," + a.integerDigits + "}", void 0 != a.digits && (isNaN(a.digits) || parseInt(a.digits) > 0) && (e += a.digitsOptional ? "[" + (a.decimalProtect ? ":" : a.radixPoint) + ";{" + a.digits + "}]" : (a.decimalProtect ? ":" : a.radixPoint) + ";{" + a.digits + "}"), e += b(a.suffix), e += "[-]", a.greedy = !1, e
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            groupSeparator: "",
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            negationSymbol: {
                front: "-",
                back: ""
            },
            integerDigits: "+",
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            min: void 0,
            max: void 0,
            postFormat: function(b, c, d, e) {
                c = c >= b.length ? b.length - 1 : c < e.prefix.length ? e.prefix.length : c;
                var f = !1,
                    g = b[c];
                if ("" == e.groupSeparator || -1 != a.inArray(e.radixPoint, b) && c >= a.inArray(e.radixPoint, b) || new RegExp("[-+]")
                    .test(g)) return {
                    pos: c
                };
                var h = b.slice();
                g == e.groupSeparator && (h.splice(c--, 1), g = h[c]), d ? h[c] = "?" : h.splice(c, 0, "?");
                var i = h.join(""),
                    j = i;
                if (i.length > 0 && e.autoGroup || d && -1 != i.indexOf(e.groupSeparator)) {
                    var k = a.inputmask.escapeRegex.call(this, e.groupSeparator);
                    f = 0 == i.indexOf(e.groupSeparator), i = i.replace(new RegExp(k, "g"), "");
                    var l = i.split(e.radixPoint);
                    if (i = "" == e.radixPoint ? i : l[0], i != e.prefix + "?0" && i.length >= e.groupSize + e.prefix.length)
                        for (var m = new RegExp("([-+]?[\\d?]+)([\\d?]{" + e.groupSize + "})"); m.test(i);) i = i.replace(m, "$1" + e.groupSeparator + "$2"), i = i.replace(e.groupSeparator + e.groupSeparator, e.groupSeparator);
                    "" != e.radixPoint && l.length > 1 && (i += e.radixPoint + l[1])
                }
                f = j != i, b.length = i.length;
                for (var n = 0, o = i.length; o > n; n++) b[n] = i.charAt(n);
                var p = a.inArray("?", b);
                return d ? b[p] = g : b.splice(p, 1), {
                    pos: p,
                    refreshFromBuffer: f,
                    buffer: b
                }
            },
            onBeforeWrite: function(b, c, d, e) {
                if (b && "blur" == b.type) {
                    var f = c.join(""),
                        g = f.replace(e.prefix, "");
                    if (g = g.replace(e.suffix, ""), g = g.replace(new RegExp(a.inputmask.escapeRegex.call(this, e.groupSeparator), "g"), ""), g = g.replace(a.inputmask.escapeRegex.call(this, e.radixPoint), "."), isFinite(g) && isFinite(e.min) && parseFloat(g) < parseFloat(e.min)) return e.postFormat((e.prefix + e.min)
                        .split(""), 0, !0, e);
                    var h = "" != e.radixPoint ? c.join("")
                        .split(e.radixPoint) : [c.join("")],
                        i = h[0].match(e.regex.integerPart(e)),
                        j = 2 == h.length ? h[1].match(e.regex.integerNPart(e)) : void 0;
                    i && "-0" == i[0] && (void 0 == j || j[0].match(/^0+$/)) && c.splice(i.index, 1);
                    var k = a.inArray(e.radixPoint, c);
                    if (-1 != k && isFinite(e.digits) && !e.digitsOptional) {
                        for (var l = 1; l <= e.digits; l++)(void 0 == c[k + l] || c[k + l] == e.placeholder.charAt(0)) && (c[k + l] = "0");
                        return {
                            refreshFromBuffer: !0,
                            buffer: c
                        }
                    }
                }
                if (e.autoGroup) {
                    var m = e.postFormat(c, d - 1, !0, e);
                    return m.caret = d <= e.prefix.length ? m.pos : m.pos + 1, m
                }
            },
            regex: {
                integerPart: function(a) {
                    return new RegExp("[" + a.negationSymbol.front + "+]?\\d+")
                },
                integerNPart: function(b) {
                    return new RegExp("[\\d" + a.inputmask.escapeRegex.call(this, b.groupSeparator) + "]+")
                }
            },
            signHandler: function(a, b, c, d, e) {
                if (!d && e.allowMinus && "-" === a || e.allowPlus && "+" === a) {
                    var f = b.buffer.join("")
                        .match(e.regex.integerPart(e));
                    if (f && f[0].length > 0) return b.buffer[f.index] == ("-" === a ? "+" : e.negationSymbol.front) ? {
                        pos: f.index,
                        c: "-" === a ? e.negationSymbol.front : "+",
                        remove: f.index,
                        caret: c
                    } : b.buffer[f.index] == ("-" === a ? e.negationSymbol.front : "+") ? {
                        remove: f.index,
                        caret: c - 1
                    } : {
                        pos: f.index,
                        c: "-" === a ? e.negationSymbol.front : "+",
                        caret: c + 1
                    }
                }
                return !1
            },
            radixHandler: function(b, c, d, e, f) {
                if (!e && b === f.radixPoint && f.digits > 0) {
                    var g = a.inArray(f.radixPoint, c.buffer),
                        h = c.buffer.join("")
                        .match(f.regex.integerPart(f));
                    if (-1 != g && c.validPositions[g]) return c.validPositions[g - 1] ? {
                        caret: g + 1
                    } : {
                        pos: h.index,
                        c: h[0],
                        caret: g + 1
                    };
                    if (!h || "0" == h[0] && h.index + 1 != d) return c.buffer[h ? h.index : d] = "0", {
                        pos: (h ? h.index : d) + 1
                    }
                }
                return !1
            },
            leadingZeroHandler: function(b, c, d, e, f) {
                var g = c.buffer.join("")
                    .match(f.regex.integerNPart(f)),
                    h = a.inArray(f.radixPoint, c.buffer);
                if (g && !e && (-1 == h || h >= d))
                    if (0 == g[0].indexOf("0")) {
                        d < f.prefix.length && (d = g.index);
                        var i = a.inArray(f.radixPoint, c._buffer),
                            j = c._buffer && c.buffer.slice(h)
                            .join("") == c._buffer.slice(i)
                            .join("") || 0 == parseInt(c.buffer.slice(h + 1)
                                .join("")),
                            k = c._buffer && c.buffer.slice(g.index, h)
                            .join("") == c._buffer.slice(f.prefix.length, i)
                            .join("") || "0" == c.buffer.slice(g.index, h)
                            .join("");
                        if (-1 == h || j && k) return c.buffer.splice(g.index, 1), d = d > g.index ? d - 1 : g.index, {
                            pos: d,
                            remove: g.index
                        };
                        if (g.index + 1 == d || "0" == b) return c.buffer.splice(g.index, 1), d = g.index, {
                            pos: d,
                            remove: g.index
                        }
                    }
                    else if ("0" === b && d <= g.index) return !1;
                return !0
            },
            postValidation: function(b, c) {
                var d = !0,
                    e = b.join(""),
                    f = e.replace(c.prefix, "");
                return f = f.replace(c.suffix, ""), f = f.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), ""), f = f.replace(a.inputmask.escapeRegex.call(this, c.radixPoint), "."), isFinite(f) && isFinite(c.max) && (d = parseFloat(f) <= parseFloat(c.max)), d
            },
            definitions: {
                "~": {
                    validator: function(b, c, d, e, f) {
                        var g = f.signHandler(b, c, d, e, f);
                        if (!g && (g = f.radixHandler(b, c, d, e, f), !g && (g = e ? new RegExp("[0-9" + a.inputmask.escapeRegex.call(this, f.groupSeparator) + "]")
                                .test(b) : new RegExp("[0-9]")
                                .test(b), g === !0 && (g = f.leadingZeroHandler(b, c, d, e, f), g === !0)))) {
                            var h = a.inArray(f.radixPoint, c.buffer);
                            g = f.digitsOptional === !1 && d > h && !e ? {
                                pos: d,
                                remove: d
                            } : {
                                pos: d
                            }
                        }
                        return g
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                "+": {
                    validator: function(a, b, c, d, e) {
                        var f = e.signHandler(a, b, c, d, e);
                        return !f && (d && e.allowMinus && a === e.negationSymbol.front || e.allowMinus && "-" == a || e.allowPlus && "+" == a) && (f = !0), f
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ""
                },
                "-": {
                    validator: function(a, b, c, d, e) {
                        var f = e.signHandler(a, b, c, d, e);
                        return !f && d && e.allowMinus && a === e.negationSymbol.back && (f = !0), f
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ""
                },
                ":": {
                    validator: function(b, c, d, e, f) {
                        var g = f.signHandler(b, c, d, e, f);
                        if (!g) {
                            var h = "[" + a.inputmask.escapeRegex.call(this, f.radixPoint) + "]";
                            g = new RegExp(h)
                                .test(b), g && c.validPositions[d] && c.validPositions[d].match.placeholder == f.radixPoint && (g = {
                                    caret: d + 1
                                })
                        }
                        return g
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: function(a) {
                        return a.radixPoint
                    }
                }
            },
            insertMode: !0,
            autoUnmask: !1,
            onUnMask: function(b, c, d) {
                var e = b.replace(d.prefix, "");
                return e = e.replace(d.suffix, ""), e = e.replace(new RegExp(a.inputmask.escapeRegex.call(this, d.groupSeparator), "g"), "")
            },
            isComplete: function(b, c) {
                var d = b.join(""),
                    e = b.slice();
                if (c.postFormat(e, 0, !0, c), e.join("") != d) return !1;
                var f = d.replace(c.prefix, "");
                return f = f.replace(c.suffix, ""), f = f.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), ""), "," === c.radixPoint && (f = f.replace(a.inputmask.escapeRegex.call(this, c.radixPoint), ".")), isFinite(f)
            },
            onBeforeMask: function(b, c) {
                if ("" != c.radixPoint && isFinite(b)) b = b.toString()
                    .replace(".", c.radixPoint);
                else {
                    var d = b.match(/,/g),
                        e = b.match(/\./g);
                    e && d ? e.length > d.length ? (b = b.replace(/\./g, ""), b = b.replace(",", c.radixPoint)) : d.length > e.length ? (b = b.replace(/,/g, ""), b = b.replace(".", c.radixPoint)) : b = b.indexOf(".") < b.indexOf(",") ? b.replace(/\./g, "") : b = b.replace(/,/g, "") : b = b.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), "")
                }
                return 0 == c.digits && (-1 != b.indexOf(".") ? b = b.substring(0, b.indexOf(".")) : -1 != b.indexOf(",") && (b = b.substring(0, b.indexOf(",")))), b
            },
            canClearPosition: function(b, c, d, e, f) {
                var g = b.validPositions[c].input,
                    h = g != f.radixPoint && isFinite(g) || c == d || g == f.groupSeparator || g == f.negationSymbol.front || g == f.negationSymbol.back;
                if (h && isFinite(g)) {
                    var i = b.buffer.join("")
                        .substr(0, c)
                        .match(f.regex.integerNPart(f));
                    if (!e) {
                        var j = c + 1,
                            k = null == i || 0 == parseInt(i[0].replace(new RegExp(a.inputmask.escapeRegex.call(this, f.groupSeparator), "g"), ""));
                        if (k)
                            for (; b.validPositions[j] && (b.validPositions[j].input == f.groupSeparator || "0" == b.validPositions[j].input);) delete b.validPositions[j], j++
                    }
                    var l = [];
                    for (var m in b.validPositions) l.push(b.validPositions[m].input);
                    i = l.join("")
                        .match(f.regex.integerNPart(f));
                    var n = a.inArray(f.radixPoint, b.buffer);
                    if (i && (-1 == n || n >= c))
                        if (0 == i[0].indexOf("0")) h = i.index != c || -1 == n;
                        else {
                            var o = parseInt(i[0].replace(new RegExp(a.inputmask.escapeRegex.call(this, f.groupSeparator), "g"), "")); - 1 != n && 10 > o && "0" == f.placeholder.charAt(0) && (b.validPositions[c].input = "0", b.p = f.prefix.length + 1, h = !1)
                        }
                }
                return h
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: "0",
            radixPoint: ""
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.aliases, {
        phone: {
            url: "phone-codes/phone-codes.js",
            maskInit: "+pp(pp)pppppppp",
            countrycode: "",
            mask: function(b) {
                b.definitions = {
                    p: {
                        validator: function() {
                            return !1
                        },
                        cardinality: 1
                    },
                    "#": {
                        validator: "[0-9]",
                        cardinality: 1
                    }
                };
                var c = [];
                return a.ajax({
                    url: b.url,
                    async: !1,
                    dataType: "json",
                    success: function(a) {
                        c = a
                    },
                    error: function(a, c, d) {
                        alert(d + " - " + b.url)
                    }
                }), c = c.sort(function(a, b) {
                    return (a.mask || a) < (b.mask || b) ? -1 : 1
                }), "" != b.countrycode && (b.maskInit = "+" + b.countrycode + b.maskInit.substring(3)), c.splice(0, 0, b.maskInit), c
            },
            nojumps: !0,
            nojumpsThreshold: 1,
            onBeforeMask: function(a, b) {
                var c = a.replace(/^0/g, "");
                return (c.indexOf(b.countrycode) > 1 || -1 == c.indexOf(b.countrycode)) && (c = "+" + b.countrycode + c), c
            }
        },
        phonebe: {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            countrycode: "32",
            nojumpsThreshold: 4
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.aliases, {
        Regex: {
            mask: "r",
            greedy: !1,
            repeat: "*",
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function(a, b) {
                return new RegExp(b.regex)
                    .test(a.join(""))
            },
            definitions: {
                r: {
                    validator: function(b, c, d, e, f) {
                        function g(a, b) {
                            this.matches = [], this.isGroup = a || !1, this.isQuantifier = b || !1, this.quantifier = {
                                min: 1,
                                max: 1
                            }, this.repeaterPart = void 0
                        }

                        function h() {
                            var a, b, c = new g,
                                d = [];
                            for (f.regexTokens = []; a = f.tokenizer.exec(f.regex);) switch (b = a[0], b.charAt(0)) {
                                case "(":
                                    d.push(new g(!0));
                                    break;
                                case ")":
                                    var e = d.pop();
                                    d.length > 0 ? d[d.length - 1].matches.push(e) : c.matches.push(e);
                                    break;
                                case "{":
                                case "+":
                                case "*":
                                    var h = new g(!1, !0);
                                    b = b.replace(/[{}]/g, "");
                                    var i = b.split(","),
                                        j = isNaN(i[0]) ? i[0] : parseInt(i[0]),
                                        k = 1 == i.length ? j : isNaN(i[1]) ? i[1] : parseInt(i[1]);
                                    if (h.quantifier = {
                                            min: j,
                                            max: k
                                        }, d.length > 0) {
                                        var l = d[d.length - 1].matches;
                                        if (a = l.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e
                                        }
                                        l.push(a), l.push(h)
                                    }
                                    else {
                                        if (a = c.matches.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e
                                        }
                                        c.matches.push(a), c.matches.push(h)
                                    }
                                    break;
                                default:
                                    d.length > 0 ? d[d.length - 1].matches.push(b) : c.matches.push(b)
                            }
                            c.matches.length > 0 && f.regexTokens.push(c)
                        }

                        function i(b, c) {
                            var d = !1;
                            c && (k += "(", m++);
                            for (var e = 0; e < b.matches.length; e++) {
                                var f = b.matches[e];
                                if (1 == f.isGroup) d = i(f, !0);
                                else if (1 == f.isQuantifier) {
                                    var g = a.inArray(f, b.matches),
                                        h = b.matches[g - 1],
                                        j = k;
                                    if (isNaN(f.quantifier.max)) {
                                        for (; f.repeaterPart && f.repeaterPart != k && f.repeaterPart.length > k.length && !(d = i(h, !0)););
                                        d = d || i(h, !0), d && (f.repeaterPart = k), k = j + f.quantifier.max
                                    }
                                    else {
                                        for (var l = 0, o = f.quantifier.max - 1; o > l && !(d = i(h, !0)); l++);
                                        k = j + "{" + f.quantifier.min + "," + f.quantifier.max + "}"
                                    }
                                }
                                else if (void 0 != f.matches)
                                    for (var p = 0; p < f.length && !(d = i(f[p], c)); p++);
                                else {
                                    var q;
                                    if ("[" == f.charAt(0)) {
                                        q = k, q += f;
                                        for (var r = 0; m > r; r++) q += ")";
                                        var s = new RegExp("^(" + q + ")$");
                                        d = s.test(n)
                                    }
                                    else
                                        for (var t = 0, u = f.length; u > t; t++)
                                            if ("\\" != f.charAt(t)) {
                                                q = k, q += f.substr(0, t + 1), q = q.replace(/\|$/, "");
                                                for (var r = 0; m > r; r++) q += ")";
                                                var s = new RegExp("^(" + q + ")$");
                                                if (d = s.test(n)) break
                                            }
                                    k += f
                                }
                                if (d) break
                            }
                            return c && (k += ")", m--), d
                        }
                        null == f.regexTokens && h();
                        var j = c.buffer.slice(),
                            k = "",
                            l = !1,
                            m = 0;
                        j.splice(d, 0, b);
                        for (var n = j.join(""), o = 0; o < f.regexTokens.length; o++) {
                            var g = f.regexTokens[o];
                            if (l = i(g, g.isGroup)) break
                        }
                        return l
                    },
                    cardinality: 1
                }
            }
        }
    }), a.fn.inputmask
}(jQuery);
