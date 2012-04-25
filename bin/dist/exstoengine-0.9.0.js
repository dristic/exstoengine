var ex = ex || {};

Array.indexOf || (Array.prototype.indexOf = function(a) {
    for (var b = 0; b < this.length; b++) if (this[b] == a) return b;
    return -1;
}), function() {
    function a() {}
    "use strict", ex.UID_PROPERTY = "__uniqueId", ex.uidCounter = 0, ex.extend = function(a, b, c) {
        for (var d in b) if (b[d] !== undefined) {
            if (a === b[d]) continue;
            typeof src != "Object" && typeof src != "Array" || !c ? a[d] = b[d] : a[d] = ex.extend({}, b[d], c);
        }
        return a;
    }, ex.extend(ex, {
        bind: function(a, b) {
            return function() {
                return b.apply(a, arguments);
            };
        },
        clone: function(b) {
            return a.prototype = b, new a;
        },
        copy: function(a) {
            var b;
            return ex.isObject(a) ? (b = b || {}, ex.extend(b, a, !0)) : ex.isArray(a) ? (b = b || [], ex.extend(b, a, !0)) : b = a, b;
        },
        derive: function(a, b) {
            function c() {}
            c.prototype = a.prototype, b.prototype = new c, b.prototype.constructor = b;
        },
        each: function(a, b) {
            for (var c in a) Object.prototype.propertyIsEnumerable.call(a, c) && action(c, a[c]);
        },
        toInt: function(a) {
            return a | 0;
        },
        isObject: function(a) {
            return typeof a == "object";
        },
        isArray: function(a) {
            return Object.prototype.toString.call(a) == "[object Array]";
        },
        isFunction: function(a) {
            return typeof a == "function";
        },
        isNull: function(a) {
            return typeof a == "undefined";
        },
        uid: function(a) {
            return a[ex.UID_PROPERTY] || (a[ex.UID_PROPERTY] = ++ex.uidCounter);
        }
    }), ex.Array = {
        contains: function(a, b) {
            var c = 0;
            for (; c < a.length; c++) if (a[c] == b) return !0;
            return !1;
        },
        remove: function(a, b) {
            a.indexOf(b) != -1 && a.splice(a.indexOf(b), 1);
        },
        each: function(a, b) {
            var c = 0, d = a.length, e = !0;
            for (; c != d; c++) {
                e = b(a[c], c);
                if (e == 0) return;
            }
        },
        find: function(a, b) {
            var c = 0, d = a.length, e;
            for (; c < d; c++) {
                e = b(a[c]);
                if (e) return a[c];
            }
        },
        average: function(a) {
            var b = 0, c = a.length;
            while (c--) b += a[c];
            return b /= a.length, b;
        },
        to2D: function(a, b, c) {
            var d = 0, e = 0, f = 0, g = new Array(b);
            for (e = 0; e < b; e++) {
                g[e] = new Array(a);
                for (d = 0; d < a; d++, f++) g[e][d] = c[f];
            }
            return g;
        }
    }, ex.extend(ex, {
        _namespaces: {},
        _classes: {},
        _defined: [],
        config: {
            baseUrl: ""
        },
        using: function(a, b) {
            var c = !0, d = 0, e;
            if (typeof a == "undefined") {
                b();
                return;
            }
            for (; d < a.length; d++) e = a[d], ex.Array.contains(this._defined, e) == 0 && (c = !1, this.addRelationship(e, b), this.require(e));
            ex.Loader.startQueue();
            if (c == 1) {
                b();
                return;
            }
        },
        require: function(a) {
            ex.Loader.asyncFile(this.namespaceToUrl(a));
        },
        addRelationship: function(a, b) {
            this._namespaces[a] || (this._namespaces[a] = []), this._namespaces[a].push(b), this._classes[b] || (this._classes[b] = []), this._classes[b].push(a);
        },
        namespaceToUrl: function(a) {
            var b = a.split("."), c = "";
            typeof window != "undefined" && (c = window.location.href.substr(0, window.location.href.lastIndexOf("/"))), b[0] == "ex" && (c = ex.config.baseUrl);
            var d = -1;
            while (++d < b.length) b[d] != "ex" && (c += "/" + b[d]);
            return c += ".js", c;
        }
    }), ex.Loader = {
        _urls: {},
        _callbacks: {},
        _queue: [],
        _date: new Date,
        asyncFile: function(a, b) {
            if (typeof this._urls[a] != "undefined") return;
            this._urls[a] = !1, typeof b != "undefined" && (this._callbacks[a] = b), this._queue.push(a);
        },
        startQueue: function() {
            for (var a = 0; a < this._queue.length; a++) {
                var b = this._queue[a];
                this.addScriptTag(b, function() {
                    ex.Loader.onScriptLoad(b), this.onload = null;
                });
            }
            this._queue = [];
        },
        onScriptLoad: function(a) {
            this._urls[a] = !0, a in this._callbacks && (this._callbacks[a](), delete this._callbacks[a]);
        },
        addScriptTag: function(a, b) {
            var c = document.getElementsByTagName("head").item(0), d = document.createElement("script");
            return d.language = "javascript", d.type = "text/javascript", d.defer = !1, d.src = a, d.onload = b, c.appendChild(d), d;
        },
        ajax: function(a, b, c) {
            var d;
            window.XMLHttpRequest ? d = new XMLHttpRequest : d = new ActiveXObject("Microsoft.XMLHTTP"), d.open("GET", a, !0), d.send(), d.onreadystatechange = function() {
                d.readyState == 4 && d.status == 200 && c(d.responseText);
            };
        }
    }, ex.Element = {
        defaults: {
            SCRIPT: {
                language: "javascript",
                type: "text/javascript"
            }
        },
        createTag: function(a, b) {
            var a = document.createElement(a);
            return a = ex.extend(a, b), a;
        },
        getByTagName: function(a) {
            return document.getElementsByTagName(a)[0];
        },
        getById: function(a) {
            var b = document.getElementById(a);
            return b || ex.Debug.log("ex.Element.getById: Could not find element with id " + a, "WARNING"), b;
        }
    }, ex.Math = {
        average: function(a) {
            var b = 0, c = a.length;
            while (c--) b += a[c];
            return b /= a.length, b;
        },
        floor: function(a) {
            return a >> 0;
        },
        abs: function(a) {
            return a < 0 ? -a : a;
        },
        getRandomInt: function(a, b) {
            return Math.floor(Math.random() * (b - a + 1)) + a;
        }
    };
    var b = b || null;
    if (b == null) {
        var c = document.getElementsByTagName("head")[0], d = c.getElementsByTagName("script"), e = new RegExp(/ExstoEngine\.js/), f = d.length;
        while (f--) {
            var g = d[f];
            e.test(g.src) == 1 && (ex.config.baseUrl = g.src.split("/ExstoEngine.js", 1)[0]);
        }
    }
}(), function() {
    function a(a, b) {
        function f() {}
        c(a, null, b), typeof b.constructor == "function" && b.constructor != Object && (f = b.constructor), f.prototype = b, e(a, f), d(a, null, b, f);
    }
    function b(a, b, f) {
        function g() {
            b.apply(this);
        }
        c(a, b, f);
        if (b == null) throw new Error("The base class has not been defined for " + a);
        ex.isFunction(f.constructor) && f.constructor != Object && (g = f.constructor), ex.derive(b, g), ex.extend(g.prototype, f), g.prototype._super = function(a, c) {
            this._super = b.prototype._super, b.prototype[a].apply(this, c), this._super = this._superTemp;
        }, g.prototype._superTemp = g.prototype._super, e(a, g), d(a, b, f, g);
    }
    function c(a, b, c) {}
    function d(a, b, c, f) {
        "__statics" in f.prototype && e(a, f.prototype.__statics, !0);
        if ("__alias" in f.prototype) {
            var g = f.prototype.__alias;
            g != a && (e(g, f), d(g, b, c, f));
        }
    }
    function e(a, b, c) {
        var d = window, e = a.split("."), f = 0, g = e.length;
        for (; f < g; f++) {
            var h = e[f];
            d[h] = d[h] || {}, f == g - 1 && (c ? ex.extend(d[h], b) : d[h] = b), d = d[h];
        }
        return d;
    }
    ex.define = function(c, d, e) {
        if (typeof c != "string") throw new Error("Cannot create class, namespace must be of type String.\n" + d.constructor);
        e == null ? a(c, d) : b(c, d, e), this._defined.push(c);
        if (typeof this._namespaces[c] != "undefined") {
            var f = this._namespaces[c], g = f.length;
            while (g--) {
                var h = f[g];
                ex.Array.remove(this._classes[h], c), this._classes[h].length == 0 && (h(), delete this._classes[h]), ex.Array.remove(this._namespaces[c], h), this._namespaces[c].length == 0 && delete this._namespaces[c];
            }
        }
    };
}();

var exports = exports || null;

exports && ex.extend(exports, ex), function() {
    ex.define("ex.base.Vector", {
        __alias: "ex.Vector",
        constructor: function(a, b) {
            this.x = a || 0, this.y = b || 0;
        },
        add: function(a) {
            return this.x += a.x, this.y += a.y, this;
        },
        addScaled: function(a, b) {
            return this.x += a.x * b, this.y += a.y * b, this;
        },
        addNumber: function(a) {
            return this.x += a, this.y += a, this;
        },
        subtract: function(a) {
            return this.x -= a.x, this.y -= a.y, this;
        },
        scale: function(a) {
            return this.x *= a, this.y *= a, this;
        },
        distance: function(a) {
            return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y));
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        clone: function() {
            return new ex.base.Vector(this.x, this.y);
        },
        rotate: function(a) {
            var b = Math.cos(a), c = Math.sin(a), d = this.x, e = this.y;
            return this.x = d * b - e * c, this.y = d * c + e * b, this;
        },
        equals: function(a) {
            return this.x != a.x ? !1 : this.y != a.y ? !1 : !0;
        },
        inverse: function() {
            return this.x = 1 / this.x, this.y = 1 / this.y, this;
        },
        limit: function(a) {
            this.x > a.x ? this.x = a.x : this.x < -a.x && (this.x = -a.x), this.y > a.y ? this.y = a.y : this.y < -a.y && (this.y = -a.y);
        }
    });
}(), ex.using([ "ex.base.Vector" ], function() {
    ex.define("ex.display.Renderable", {
        constructor: function(a, b, c, d, e) {
            this.visible = a, this.alpha = b, c = c || new ex.Vector(0, 0), d = d || 0, e = e || 0, this.position = this.position || c, this.width = this.width || d, this.height = this.height || e;
        },
        isVisible: function() {
            return this.visible && this.alpha > 0 ? !0 : !1;
        },
        toggleVisibility: function() {
            this.visible ? this.hide() : this.show();
        },
        show: function() {
            this.visible = !0;
        },
        hide: function() {
            this.visible = !1;
        },
        containsPoint: function(a, b) {
            return a < this.position.x + this.width && a > this.position.x && b < this.position.y + this.height && b > this.position.y ? !0 : !1;
        },
        update: function(a) {},
        destroy: function() {}
    });
}), function() {
    ex.define("ex.base.Point", {
        constructor: function(a, b) {
            this.x = a, this.y = b;
        },
        add: function(a) {
            this.x += a.x, this.y += a.y;
        },
        subtract: function(a) {
            this.x -= a.x, this.y -= a.y;
        }
    });
}(), ex.using([ "ex.base.Point" ], function() {
    ex.define("ex.base.Rectangle", {
        __alias: "ex.Rectangle",
        constructor: function(a, b, c, d) {
            this.x = a, this.y = b, this.width = c, this.height = d;
        },
        containsPoint: function(a, b) {
            return a instanceof ex.base.Point ? a.x > this.x && a.x < this.position.x + this.width && a.y > this.y && a.y < this.position.y + this.height ? !0 : !1 : a > this.x && a < this.x + this.width && b > this.y && b < this.y + this.height ? !0 : !1;
        },
        translate: function(a, b) {
            return a instanceof ex.base.Point || a instanceof ex.base.Vector ? (this.x -= a.x, this.y -= a.y) : (this.x -= a, this.y -= b), this;
        }
    });
}), ex.using([ "ex.base.Vector", "ex.display.Renderable" ], function() {
    ex.define("ex.display.Sprite", ex.display.Renderable, {
        constructor: function(a, b) {
            this.type = "Sprite", this.position = a, this.img = b || new Image, this.rotation = 0, this.rotationEnabled = !1, this.rendering = null, this.scrollFactor = new ex.base.Vector(1, 1), this.width = this.img.naturalWidth, this.height = this.img.naturalHeight, this.width == 0 && this.height == 0 && ex.event.listen("load", this.img, function() {
                this._recalcDimensions();
            }, this), this._super("constructor", [ !0, 1 ]);
        },
        _recalcDimensions: function() {
            this.width = this.img.naturalWidth, this.height = this.img.naturalHeight, this.rendering && this.rendering.rotationCanvas ? (this.rendering.rotationCanvas.width = this.width, this.rendering.rotationCanvas.height = this.height) : this.rendering && this.rendering.el && (this.rendering.el.style.width = this.width + "px", this.rendering.el.style.height = this.height + "px");
        },
        update: function(a) {
            typeof this.onUpdate == "function" && this.onUpdate(a);
        },
        getBounds: function() {
            return new ex.base.Rectangle(this.position, this.width, this.height);
        }
    });
}), function() {
    ex.define("ex.physics.Collidable", {
        constructor: function(a, b) {
            this.type = a, this.data = b, this.collisionBit = -1, this.collisionBitMask = -1;
        },
        setCollisionGroup: function(a) {
            this.collisionBit = ex.isNull(a) ? -1 : 1 << a;
        },
        setCollidableGroups: function(a) {
            this.collisionBitMask = 0;
            var b = 0, c = a.length;
            for (; b != c; b++) this.collisionBitMask = this.collisionBitMask | 1 << a[b];
        },
        setAllCollidableGroups: function() {
            this.collisionMaskBit = -1;
        },
        update: function(a) {},
        integrate: function(a) {},
        onCollide: function(a, b, c) {},
        destroy: function() {}
    });
}(), function() {
    function a(a, b, c) {
        if (a.position.x <= b.position.x) {
            if (a.position.x + a.width < b.position.x) return null;
        } else if (b.position.x + b.width < a.position.x) return null;
        if (a.position.y <= b.position.y) {
            if (a.position.y + a.height < b.position.y) return null;
        } else if (b.position.y + b.height < a.position.y) return null;
        var d = new ex.base.Vector(0, 0), e = new ex.base.Vector(0, 0);
        a.velocity.y > 0 ? a.position.y < b.position.y && a.position.y + a.height > b.position.y && (e.y = a.position.y + a.height - b.position.y) : a.velocity.y < 0 && b.position.y < a.position.y && b.position.y + b.height > a.position.y && (e.y = a.position.y - (b.position.y + b.height)), a.velocity.x > 0 ? a.position.x < b.position.x && a.position.x + a.width > b.position.x && (e.x = a.position.x + a.width - b.position.x) : a.velocity.x < 0 && b.position.x < a.position.x && b.position.x + b.width > a.position.x && (e.x = a.position.x - (b.position.x + b.width));
        if (e.x != 0 && e.y != 0) {
            var f = a.velocity.x * c, g = a.velocity.y * c, h = e.x, i = e.y, j = h - f, k = i - g, l = -(i - (k - i) / (j - h) * h), m = e.y > 0;
            m ? l < 0 ? d.x = e.x : d.y = e.y : l > 0 ? d.x = e.x : d.y = e.y;
        } else e.x != 0 ? d.x = e.x : e.y != 0 && (d.y = e.y);
        return {
            source: a,
            target: b,
            data: {
                pen: d
            }
        };
    }
    function b(a, b, c) {
        if (a.type == "CollisionMap") {
            var d = a;
            a = b, b = d;
        }
        var e = b.tileMap, f = [], g = 0, h = 0, i = e.getTile(a.position.x, a.position.y) || {
            position: {
                x: 0,
                y: 0
            }
        }, j = Math.floor((a.width + a.position.x - i.position.x) / e.tileWidth), k = Math.floor((a.height + a.position.y - i.position.y) / e.tileHeight), l = new ex.base.Vector(0, 0), m = new ex.base.Vector(0, 0), n, o, p;
        for (h; h <= k; h++) {
            for (g; g <= j; g++) o = e.getTile(a.position.x + g * e.tileWidth, a.position.y + h * e.tileHeight), o && o.value != 0 && f.push(o);
            g = 0;
        }
        n = f.length;
        while (n--) {
            p = f[n], a.velocity.y > 0 && p.edges.top ? a.position.y < p.position.y && a.position.y + a.height > p.position.y && (m.y = a.position.y + a.height - p.position.y) : a.velocity.y < 0 && p.edges.bottom && p.position.y < a.position.y && p.position.y + p.height > a.position.y && (m.y = a.position.y - (p.position.y + p.height)), a.velocity.x > 0 && p.edges.left ? a.position.x < p.position.x && a.position.x + a.width > p.position.x && (m.x = a.position.x + a.width - p.position.x) : a.velocity.x < 0 && p.edges.right && p.position.x < a.position.x && p.position.x + p.width > a.position.x && (m.x = a.position.x - (p.position.x + p.width));
            if (m.x != 0 && m.y != 0) {
                var q = a.velocity.x * c, r = a.velocity.y * c, s = m.x, t = m.y, u = s - q, v = t - r, w = -(t - (v - t) / (u - s) * s), x = m.y > 0;
                x ? w < 0 ? l.x = m.x : l.y = m.y : w > 0 ? l.x = m.x : l.y = m.y;
            } else m.x != 0 ? l.x = m.x : m.y != 0 && (l.y = m.y);
            m = new ex.base.Vector(0, 0);
        }
        return f.length > 0 ? {
            source: a,
            target: b,
            data: {
                pen: l,
                tiles: f
            }
        } : null;
    }
    ex.define("ex.physics.CollisionDetector", {
        constructor: function() {
            this.algorithms = {
                RigidBoxToCollisionMap: b,
                CollisionMapToRigidBox: b,
                RigidBoxToRigidBox: a,
                EntityToTrigger: a,
                TriggerToEntity: a
            };
        },
        detectCollisions: function(a, b) {
            var c = [], d = 0, e = 0, f, g;
            for (d; d < a.length; d++) for (e = d + 1; e < a.length; e++) {
                f = a[d], g = a[e];
                if (f.collisionBit & g.collisionBitMask && g.collisionBit & f.collisionBitMask) {
                    var h = this.detectCollisionBetween(f, g, b);
                    h != null && c.push(h);
                }
            }
            return c;
        },
        detectCollisionBetween: function(a, b, c) {
            var d = a.type + "To" + b.type;
            if (this.algorithms[d]) return this.algorithms[d](a, b, c);
        }
    });
}(), function() {
    function b(b, c, d, e) {
        if (b.mass == 0) return;
        d = d.pen, d.y != 0 && (d.y > 0 ? d.y += .1 : d.y -= .1, b.position.y -= d.y, b.velocity.y = -b.velocity.y * b.elasticity), d.x != 0 && (d.x > 0 ? d.x += .1 : d.x -= .1, b.position.x -= d.x, b.velocity.x = -b.velocity.x * b.elasticity), b.velocity.scale(a);
    }
    function c(a, c, d, e) {
        if (a.anchored) {
            if (c.anchored) return;
            b(c, a, d, e);
        } else c.anchored && b(a, c, d, e);
    }
    var a = .98;
    ex.define("ex.physics.CollisionResolver", {
        constructor: function() {
            this.algorithms = {
                RigidBoxToCollisionMap: b,
                RigidBoxToRigidBox: c
            };
        },
        resolveCollisions: function(a, b) {
            var c = a.length;
            while (c--) this.resolveCollisionBetween(a[c].source, a[c].target, a[c].data, b), a[c].source.onCollide(a[c].target, a[c].data, b), a[c].target.onCollide(a[c].source, a[c].data, b);
        },
        resolveCollisionBetween: function(a, b, c, d) {
            var e = a.type + "To" + b.type;
            if (this.algorithms[e]) return this.algorithms[e](a, b, c, d);
        }
    });
}(), ex.using([ "ex.base.WorldComponent", "ex.physics.CollisionDetector", "ex.physics.CollisionResolver", "ex.physics.Collidable", "ex.physics.Force" ], function() {
    ex.define("ex.physics.CollisionManager", ex.base.WorldComponent, {
        constructor: function(a, b) {
            this.collidables = [], this.forces = [], this.detector = new ex.physics.CollisionDetector, this.resolver = new ex.physics.CollisionResolver, this.renderer = a, this.defaults = {
                debugDraw: !1
            }, this.options = ex.extend({}, this.defaults), ex.extend(this.options, b), this.context = null, this.options.debugDraw && this.renderer.type == ex.display.rendering.Renderer.CANVAS2D && (this.context = this.renderer.renderingContext.context);
        },
        addObject: function(a) {
            a instanceof ex.physics.Collidable ? this.collidables.push(a) : a instanceof ex.physics.Force && this.forces.push(a);
        },
        removeObject: function(a) {
            a instanceof ex.physics.Collidable ? (ex.Array.remove(this.collidables, a), a.destroy()) : a instanceof ex.physics.Force && (ex.Array.remove(this.forces, a), a.destroy());
        },
        update: function(a, b) {
            ex.Debug.time("collision");
            var c = 0, d = this.forces.length;
            for (; c != d; c++) this.forces[c].solve(a, this.collidables);
            c = 0, d = this.collidables.length;
            for (; c != d; c++) this.collidables[c].integrate(a);
            var e = this.detector.detectCollisions(this.collidables, a);
            this.resolver.resolveCollisions(e, a), ex.Debug.time("collision");
        },
        debug: function(a, b) {
            this.options.debugDraw == 1 && this.draw(this.context, b);
        },
        draw: function(a, b) {
            a.save(), a.strokeStyle = "#FF0000", a.lineWidth = 1;
            var c = 0, d = this.collidables.length;
            for (; c != d; c++) this.collidables[c].draw(a, b.position.x, b.position.y);
            a.restore();
        },
        destroy: function() {
            delete this.collisionGroups, delete this.detector, delete this.resolver;
        }
    });
}), function() {
    ex.define("ex.world.Tile", {
        constructor: function(a, b, c, d, e, f, g, h) {
            this.value = a, this.position = b, this.width = c, this.height = d, this.mass = 1, this.visible = !0, this.neighbors = {
                top: e,
                bottom: f,
                left: g,
                right: h
            }, this.edges = {
                top: !1,
                bottom: !1,
                left: !1,
                right: !1
            }, this.update();
        },
        update: function(a) {
            if (this.value == 0) {
                this._setAllEdgesTo(!1), a || this.updateNeighbors();
                return;
            }
            this.neighbors.top && this.neighbors.top.value == 0 ? this.edges.top = !0 : !this.neighbors.top && this.value > 0 ? this.edges.top = !0 : this.edges.top = !1, this.neighbors.bottom && this.neighbors.bottom.value == 0 ? this.edges.bottom = !0 : !this.neighbors.bottom && this.value > 0 ? this.edges.bottom = !0 : this.edges.bottom = !1, this.neighbors.left && this.neighbors.left.value == 0 ? this.edges.left = !0 : !this.neighbors.left && this.value > 0 ? this.edges.left = !0 : this.edges.left = !1, this.neighbors.right && this.neighbors.right.value == 0 ? this.edges.right = !0 : !this.neighbors.right && this.value > 0 ? this.edges.right = !0 : this.edges.right = !1, a || this.updateNeighbors();
        },
        updateNeighbors: function() {
            this.neighbors.up && this.neighbors.up.update(!0), this.neighbors.down && this.neighbors.down.update(!0), this.neighbors.left && this.neighbors.left.update(!0), this.neighbors.right && this.neighbors.right.update(!0);
        },
        setValue: function(a) {
            this.value = a, this.update();
        },
        setPosition: function(a, b) {
            this.position.x = a, this.position.y = b;
        },
        _setAllEdgesTo: function(a) {
            this.edges.up = a, this.edges.down = a, this.edges.left = a, this.edges.right = a;
        }
    });
}(), ex.using([ "ex.world.Tile", "ex.base.Vector" ], function() {
    function a(a, b, c) {
        var d = 0, e = 0, f = [];
        for (d; d < a.length; d++) {
            f[d] = [];
            for (e = 0; e < a[d].length; e++) f[d][e] = new ex.world.Tile(a[d][e], new ex.base.Vector(e * b, d * c), b, c);
        }
        return f;
    }
    function b(a) {
        var b = 0, c = 0;
        for (b; b < a.length; b++) for (c = 0; c < a[b].length; c++) c == 0 ? (a[b][c].neighbors.left = null, a[b][c].neighbors.right = a[b][c + 1]) : c == a[b].length - 1 ? (a[b][c].neighbors.left = a[b][c - 1], a[b][c].neighbors.right = null) : (a[b][c].neighbors.left = a[b][c - 1], a[b][c].neighbors.right = a[b][c + 1]), b == 0 ? (a[b][c].neighbors.top = null, a[b][c].neighbors.bottom = a[b + 1][c]) : b == a.length - 1 ? (a[b][c].neighbors.top = a[b - 1][c], a[b][c].neighbors.bottom = null) : (a[b][c].neighbors.top = a[b - 1][c], a[b][c].neighbors.bottom = a[b + 1][c]), a[b][c].update();
    }
    ex.define("ex.world.TileMap", {
        constructor: function(c, d, e) {
            this.tileWidth = c, this.tileHeight = d, this.data = a(e, c, d), b(this.data), this.width = e[0].length * this.tileWidth, this.height = e.length * this.tileHeight;
        },
        getTile: function(a, b) {
            return a = Math.floor(a / this.tileWidth), b = Math.floor(b / this.tileHeight), a >= 0 && a < this.data[0].length && b >= 0 && b < this.data.length ? this.data[b][a] : null;
        },
        setTile: function(a, b, c) {
            a = Math.floor(a / this.tileWidth), b = Math.floor(b / this.tileHeight), this.data[b][a].setValue(c);
        }
    });
}), ex.using([ "ex.world.TileMap", "ex.physics.Collidable" ], function() {
    ex.define("ex.physics.CollisionMap", ex.physics.Collidable, {
        constructor: function(a, b, c, d) {
            this.tileMap = new ex.world.TileMap(a, b, c), this._super("constructor", [ "CollisionMap", d ]);
        },
        draw: function(a, b, c) {
            var d = 0, e = 0, f, g, h;
            for (; d != this.tileMap.data.length; d++) {
                e = 0;
                for (; e != this.tileMap.data[d].length; e++) f = this.tileMap.data[d][e], f.value > 0 && (g = f.position.x - b, h = f.position.y - c, a.beginPath(), f.edges.top && (a.moveTo(g, h), a.lineTo(g + f.width, h)), f.edges.bottom && (a.moveTo(g, h + f.height), a.lineTo(g + f.width, h + f.height)), f.edges.left && (a.moveTo(g, h), a.lineTo(g, h + f.height)), f.edges.right && (a.moveTo(g + f.width, h), a.lineTo(g + f.width, h + f.height)), a.stroke(), a.closePath());
            }
        }
    });
}), ex.using([ "ex.event.EventTarget" ], function() {
    ex.define("ex.base.Component", ex.event.EventTarget, {
        constructor: function() {
            this._super("constructor");
        },
        update: function(a) {},
        name: "Component"
    });
}), function() {
    ex.define("ex.base.GlobalComponent", {
        __alias: "GlobalComponent",
        __statics: {
            type: "GlobalComponent"
        }
    });
}(), ex.using([], function() {
    ex.event = {
        listen: function(a, b, c, d, e) {
            typeof a != "string" && ex.Debug.log("Event must be a string!"), d != null && (c = ex.bind(d, c)), e = e || !1, typeof b.attachEvent != "undefined" ? b.attachEvent("on" + a, c, e) : typeof b.addEventListener != "undefined" && b.addEventListener(a, c, e);
        },
        listenOnce: function(a, b, c, d) {
            var e = function() {
                ex.event.unlisten(a, b, c), c.call(this, arguments);
            };
            ex.event.listen(a, b, e, d);
        },
        unlisten: function(a, b, c) {
            b.removeEventListener && b.removeEventListener(a, c);
        }
    }, ex.define("ex.event.EventTarget", {
        constructor: function() {
            this._listeners = {};
        },
        addEventListener: function(a, b) {
            ex.isNull(this._listeners) && ex.Debug.log("EventTarget _listeners is not defined. Maybe you forgot to call _super in the constructor?", "ERROR"), typeof this._listeners[a] == "undefined" && (this._listeners[a] = []), this._listeners[a].push(b);
        },
        dispatchEvent: function(a, b) {
            if (this._listeners[a] == null) return !1;
            b = b || {}, b.target = this;
            var c = this._listeners[a].length;
            while (c--) {
                var d = this._listeners[a][c], e = d(b);
                if (e == 0) break;
            }
            return !0;
        },
        removeEventListener: function(a, b) {
            this._listeners[a].splice(this._listeners[a].indexOf(b), 1);
        }
    });
}), ex.using([ "ex.event.EventTarget" ], function() {
    ex.define("ex.world.Entity", ex.event.EventTarget, {
        constructor: function(a, b) {
            this._super("constructor", []), this.name = a, this.type = "Entity", this.items = b || [];
        },
        update: function(a) {
            var b = this.items.length;
            while (b--) this.items[b].update(a);
        },
        destroy: function() {
            delete this.items;
        }
    });
}), ex.using([], function() {
    ex.define("ex.ai.Action", {
        constructor: function(a, b) {
            this.mask = a || 0, this.blocking = b || !1;
        },
        update: function(a) {
            return !0;
        },
        destroy: function() {}
    });
}), ex.using([ "ex.ai.Action" ], function() {
    ex.define("ex.ai.ActionList", {
        constructor: function() {
            this.masks = {
                animation: 1,
                movement: 2,
                behavior: 4
            }, this.actionList = [];
        },
        push: function(a) {
            this.actionList.push(a);
        },
        remove: function(a) {
            a.destroy(), ex.Array.remove(this.actionList, a);
        },
        update: function(a) {
            var b = 0, c = this.actionList.length, d = null;
            while (c--) {
                d = this.actionList[c];
                if (d.mask & b) continue;
                var e = d.update(a);
                e && this.remove(this.actionList[c]), d.blocking && (b |= d.mask);
            }
        }
    });
}), ex.using([ "ex.ai.Action", "ex.ai.actions.Wander", "ex.ai.actions.Chase" ], function() {
    ex.define("ex.ai.actions.Search", ex.ai.Action, {
        constructor: function(a, b, c) {
            this.name = "search", this.entity = a, this.target = b, this.sightRange = c, this.actions = {
                chase: new ex.ai.actions.Chase(this.entity, this.target, this.sightRange)
            }, this._super("constructor", [ 1, !0 ]);
        },
        update: function(a) {
            var b = Math.abs(this.entity.physical.position.x - this.target.physical.position.x), c = this.entity.physical.position.y - this.target.physical.height, d = this.entity.physical.position.y + this.entity.physical.height;
            b < this.sightRange && this.target.physical.position.y > c && this.target.physical.position.y < d && this.entity.ai.push(new ex.ai.actions.Chase(this.entity, this.target, 200));
        }
    });
}), ex.using([ "ex.display.Renderable", "ex.base.Rectangle", "ex.base.Point" ], function() {
    ex.define("ex.display.AnimatedSprite", ex.display.Renderable, {
        constructor: function(a) {
            this.type = "AnimatedSprite", this.scrollFactor = {
                x: 1,
                y: 1
            }, this.spriteSheets = this._prepareSpriteSheets(a), this.animations = {}, this.currentAnimation = null, this.currentAnimationName = null, this.currentIndex = 0, this.currentFrame = 0, this.playing = !1, this.playQueue = [], this.scaled = !1, this.timer = 0, this._super("constructor", [ !0, 1, ex.Vector(0, 0), this.spriteSheets[0].renderingRect.width, this.spriteSheets[0].renderingRect.height ]);
        },
        _prepareSpriteSheets: function(a) {
            return ex.isArray(a) ? a : a instanceof ex.display.SpriteSheet ? [ a ] : (ex.Debug.log("AnimatedSprite received spriteSheets in wrong format.", "ERROR"), []);
        },
        createAnimation: function(a, b, c) {
            this.animations[a] = {
                sheet: this.spriteSheets[b],
                frames: c
            };
        },
        play: function(a, b, c) {
            if (c == 1) this.playQueue = []; else {
                if (this.currentAnimationName == a) return;
                this._queue({
                    name: a,
                    loop: b
                });
            }
            this.currentAnimation = this.animations[a], this.currentAnimationName = a, this.currentAnimation.loop = b, this.scaled == 0 && (this.width = this.currentAnimation.sheet.renderingRect.width, this.height = this.currentAnimation.sheet.renderingRect.height), this.currentFrame = 0, this.currentIndex = 0, this.timer = 1 / this.animations[a].sheet.frameRate, this.playing = !0;
        },
        _queue: function(a) {
            this.playQueue.push(a);
        },
        stop: function() {
            this.playing = !1;
        },
        resume: function() {
            this.playing = !0;
        },
        _animationComplete: function() {
            return this.currentIndex > this.currentAnimation.frames.length - 1;
        },
        _goToNextAnimation: function() {
            if (this.playQueue.length > 0) {
                var a = this.playQueue.shift();
                this.currentAnimation = this.animations[a.name], this.currentAnimationName = a.name, this.currentAnimation.loop = a.loop, this.currentFrame = 0, this.timer = 1 / this.animations[a.name].sheet.frameRate, this.playing = !0, this.currentIndex = 0;
            } else this.currentAnimation.loop == 0 ? (this.currentIndex = this.currentAnimation.frames.length - 1, this.stop()) : this.currentIndex = 0;
        },
        update: function(a) {
            if (this.currentAnimation == null) return;
            var b = this.currentAnimation.sheet.frameRate;
            if (!this.playing || b == 0) return;
            this.timer -= a;
            if (this.timer >= 0) return;
            this.currentAnimation.sheet.isReady() && (this.currentIndex++, this._animationComplete() && this._goToNextAnimation(), this.currentFrame = this.currentAnimation.frames[this.currentIndex], this.goToFrame(this.currentFrame)), this.timer += 1 / this.currentAnimation.sheet.frameRate;
        },
        goToFrame: function(a) {
            var b = this.currentAnimation.sheet.image, c = this.currentAnimation.sheet.renderingRect, d = b.width / c.width, e = a % d, f = Math.floor(a / d);
            c.x = e * c.width, c.y = f * c.height;
        },
        goToNextFrame: function() {
            var a = this.currentAnimation.sheet.image, b = this.currentAnimation.sheet.renderingRect;
            b.position.x += b.width, b.position.x + b.width > a.width && (b.position.x = 0, b.position.y += b.height, b.position.y + b.height > a.height && (b.position.y = 0));
        },
        numFrames: function() {
            var a = this.currentAnimation.sheet, b = a.image.width / a.renderingRect.width, c = a.image.height / a.renderingRect.height;
            return b * c;
        }
    });
}), ex.using([ "ex.base.Vector" ], function() {
    function a(a) {
        return (Math.random() * a << 1) - a;
    }
    function b(a, b) {
        for (var c in b) a[c] = b[c];
    }
    ex.define("ex.display.Particle", {
        constructor: function(b) {
            var c = {
                position: new ex.base.Vector(0, 0),
                velocity: new ex.base.Vector(0, 0),
                xVariance: 0,
                yVariance: 0,
                direction: new ex.base.Vector(0, 0),
                directionVariance: 0,
                age: 0,
                life: 0,
                lifeVariance: 0,
                size: 0,
                sizeVariance: 0,
                active: !0,
                alpha: 1,
                color: "#cef"
            };
            c.extend(b), c.direction = b.direction + a(b.directionVariance), c.position = b.position.clone().add(c.position), c.velocity = b.velocity.clone().rotate(c.direction * Math.PI / 180), c.life = b.life + a(b.lifeVariance), c.size = b.size + a(b.sizeVariance), this.extend(c);
        },
        update: function(a) {
            this.age >= this.life && (this.active = !1), this.position.add(this.velocity), this.alpha -= .1, this.age++;
        },
        render: function(a, b, c) {
            typeof this.onDraw == "function" && this.onDraw(this), a.save(), a.fillStyle = this.color;
            try {
                a.globalAlpha = this.alpha;
            } catch (d) {}
            a.translate(this.position.x - b * this.scrollFactorX, this.position.y - c * this.scrollFactorY), a.beginPath(), a.arc(0, 0, this.size / 2, 0, Math.PI / 180, !0), a.closePath(), a.fill(), a.restore();
        }
    });
}), ex.using([ "ex.base.Vector", "ex.display.Particle" ], function() {
    ex.define("ex.display.Emitter", {
        constructor: function(a) {
            var b = {
                position: new ex.base.Vector(150, 150),
                velocity: new ex.base.Vector(0, -3),
                xVariance: 20,
                yVariance: 5,
                spawnSpeed: 4,
                time: 1e5,
                maxParticles: 500,
                size: 20,
                sizeVariance: 5,
                life: 30,
                lifeVariance: 10,
                direction: 0,
                directionVariance: 15,
                color: "#cef",
                opacity: 1,
                scrollFactorX: 1,
                scrollFactorY: 1,
                onDraw: function(a) {
                    var b = -this.age * 3;
                    a.size *= .98, a.color = "rgb(255, " + (b + 255) + ", 68)", a.alpha = .5 - a.age / a.life * .4;
                }
            };
            b.extend(a), this.options = b, this.particles = [], this.active = !0;
        },
        update: function(a) {
            this.options.time -= a, this.options.time <= 0 && (this.active = !1);
            var b = this.particles.length;
            while (b--) {
                var c = this.particles[b];
                c.active == 0 ? this.particles.splice(b, 1) : c.update(a);
            }
            for (var d = 0; d < this.options.spawnSpeed; d++) this.particles.length >= this.options.maxParticles || this.options.time <= 0 || this.particles.push(new ex.display.Particle(this.options));
        },
        render2dCanvas: function(a, b, c) {
            for (var d = 0; d < this.particles.length; d++) this.particles[d].render(a, b, c);
        }
    });
}), ex.using([ "ex.base.Point", "ex.base.Vector", "ex.display.Renderable" ], function() {
    ex.define("ex.display.Image", ex.display.Renderable, {
        constructor: function(a, b, c, d) {
            this.type = "Image", this.name = d, this.position = b || new ex.base.Point(0, 0), this.width = a.naturalWidth, this.height = a.naturalHeight, this.image = a, this.size = c || new ex.base.Vector(this.width, this.height), this.scrollFactor = new ex.base.Vector(0, 0), this.image.complete == 0 && ex.event.listenOnce(this.image, "load", this.autoSize, this), this._super("constructor", [ !0, 1 ]);
        },
        autoSize: function() {
            this.width = this.image.naturalWidth, this.height = this.image.naturalHeight, this.rendering && this.rendering.el && (this.rendering.el.style.width = this.width + "px", this.rendering.el.style.height = this.height + "px");
        },
        getBounds: function() {
            return new ex.base.Rectangle(this.position, this.size.x, this.size.y);
        },
        update: function(a) {},
        setupDom: function(a) {
            var b = this.image;
            b.style.position = "absolute", b.style.width = this.width + "px", b.style.height = this.height + "px", b.style.left = this.position.x + "px", b.style.top = this.position.y + "px", this.rendering = {
                el: b
            }, a.appendChild(this.rendering.el);
        },
        renderDom: function(a, b, c, d, e) {
            if (!this.visible) {
                this.rendering.el.style.opacity = 0;
                return;
            }
            this.rendering.el.style.opacity = this.opacity;
            var f = ex.toInt(this.position.x - b * this.scrollFactor.x), g = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (f + this.width < 0 && f > d && g + this.height < 0 && g > e) return;
            this.rendering.el.style.left = f + "px", this.rendering.el.style.top = g + "px";
        },
        destroyDom: function(a) {
            a.removeChild(this.rendering.el), this.rendering = null;
        },
        render2dCanvas: function(a, b, c, d, e) {
            if (!this.isVisible()) return;
            var f = ex.toInt(this.position.x - b * this.scrollFactor.x), g = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (f + this.width < 0 && f > d && g + this.height < 0 && g > e) return;
            this.image == null ? (a.fillStyle = "#888888", a.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)) : a.drawImage(this.image, f, g, this.size.x, this.size.y);
        }
    });
}), ex.using([ "ex.world.TileMap", "ex.display.Renderable" ], function() {
    ex.define("ex.display.SpriteMap", ex.display.Renderable, {
        constructor: function(a, b, c, d, e) {
            this.type = "SpriteMap", this.collides = !1, this.tileSet = d, this.position = new ex.base.Vector(0, 0), this.scrollFactor = new ex.base.Vector(1, 1), this._super("constructor", [ !0, 1 ]), this.defaults = {
                repeat: !1,
                preRender: !0,
                alpha: 1,
                offset: {
                    x: 0,
                    y: 0
                }
            }, this.options = {}, ex.extend(this.options, this.defaults), ex.extend(this.options, e), this.tileMap = new ex.world.TileMap(a, b, c);
        },
        onCollide: function() {},
        update: function(a) {}
    });
}), ex.using([ "ex.base.Rectangle", "ex.base.Vector" ], function() {
    ex.define("ex.display.SpriteSheet", {
        constructor: function(a, b, c, d, e) {
            this.image = a, this.frameRate = d, this.renderingRect = new ex.base.Rectangle(0, 0, b, c), this.offset = e || {
                x: 0,
                y: 0
            };
        },
        isReady: function() {
            return this.image.width <= 0 || this.image.height <= 0 ? !1 : !0;
        }
    });
}), ex.using([ "ex.base.Vector", "ex.display.Renderable" ], function() {
    ex.define("ex.display.Rectangle", ex.display.Renderable, {
        constructor: function(a) {
            this.type = "Rectangle", this.defaults = {
                x: 10,
                y: 10,
                width: 50,
                height: 50,
                alpha: 1,
                fill: {
                    type: "solid",
                    color: "#FF0000"
                },
                stroke: {
                    type: "none",
                    width: 0,
                    color: "#00FF00"
                }
            }, this.options = {}, ex.extend(this.options, this.defaults), ex.extend(this.options, a), this.position = new ex.base.Vector(this.options.x, this.options.y), this.width = this.options.width, this.height = this.options.height, this.scrollFactor = this.options.scrollFactor || new ex.base.Vector(1, 1), this.rotationEnabled = !1, this._super("constructor", [ !0, 1 ]);
        },
        update: function(a) {
            typeof this.onUpdate == "function" && this.onUpdate(a);
        },
        getFillStyle: function(a) {
            var b = "", c = this.options.fill;
            if (c.type == "solid") b = c.color; else if (c.type == "linear-gradient" || c.type == "radial-gradient") {
                var d, e = 0, f = c.stops.length, g;
                c.type == "linear-gradient" ? d = a.createLinearGradient(c.start.x, c.start.y, c.end.x, c.end.y) : d = a.createRadialGradient(c.start.x, c.start.y, c.start.radius, c.end.x, c.end.y, c.end.radius);
                for (; e < f; e++) g = c.stops[e], d.addColorStop(g.position, g.color);
                b = d;
            }
            return b;
        },
        getStrokeStyle: function() {
            return this.options.stroke.color;
        },
        getLineWidth: function() {
            return this.options.stroke.width;
        },
        getBounds: function() {
            return new ex.base.Rectangle(this.position, this.width, this.height);
        }
    });
}), ex.using([ "ex.base.Vector", "ex.display.Sprite", "ex.display.Rectangle", "ex.display.Renderable" ], function() {
    ex.define("ex.display.ui.StatusBar", {
        constructor: function(a) {
            this.defaults = {
                position: new ex.Vector(50, 50),
                scrollFactor: new ex.Vector(0, 0),
                offset: 3,
                orientation: "horizontal",
                update: "manual",
                updateOptions: {
                    target: null,
                    currentSelector: "",
                    maxSelector: ""
                },
                outer: new ex.display.Rectangle({
                    x: 350,
                    y: 300,
                    width: 200,
                    height: 16,
                    alpha: .5,
                    fill: {
                        type: "none"
                    },
                    stroke: {
                        width: 2,
                        color: "#FFF"
                    }
                }),
                inner: new ex.display.Rectangle({
                    x: 353,
                    y: 303,
                    width: 194,
                    height: 10,
                    alpha: .5,
                    fill: {
                        type: "solid",
                        color: "#FFF"
                    }
                })
            }, this.options = {}, ex.extend(this.options, this.defaults), ex.extend(this.options, a), this.options.outer.position = this.options.position, this.options.inner.position = this.options.position.clone().addNumber(this.options.offset), this.options.outer.scrollFactor = this.options.scrollFactor, this.options.inner.scrollFactor = this.options.scrollFactor, this.options.orientation == "vertical" ? (this.totalWidth = this.options.inner.height, this.initialY = this.options.inner.position.y, this.options.inner.height = 0) : (this.totalWidth = this.options.inner.width, this.options.inner.width = 0), this.currentWidth = 0, this.items = [ this.options.inner, this.options.outer ];
        },
        update: function(a) {
            if (this.options.update == "auto") {
                var b = this.options.updateOptions, c = b.target[b.currentSelector] / b.target[b.maxSelector];
                c = ex.toInt(c * 100), this.updatePercentage(c);
            }
            this.options.orientation == "horizontal" ? this.options.inner.width = this.currentWidth : (this.options.inner.height = this.currentWidth, this.options.inner.position.y = Math.ceil(this.initialY + this.totalWidth - this.currentWidth));
        },
        updatePercentage: function(a) {
            a > 1 && (a /= 100), this.currentWidth = this.totalWidth * a;
        }
    });
}), ex.using([ "ex.display.Renderable", "ex.display.Text" ], function() {
    ex.define("ex.display.ui.StatusText", {
        constructor: function(a) {
            this.options = {
                position: new ex.base.Vector(50, 50),
                update: "manual",
                updateOptions: {
                    target: null,
                    currentSelector: "",
                    maxSelector: ""
                },
                displayFormat: "absolute",
                text: {
                    color: "#FFFFFF",
                    font: "12pt Calibri",
                    prefix: "",
                    suffix: ""
                }
            }, ex.extend(this.options, a), this.items = [ new ex.display.Text("Loading...", this.options.position, this.options.text) ];
        },
        update: function(a) {
            if (this.options.update == "auto") {
                var b = this.options.updateOptions, c = b.target[b.currentSelector], d = b.target[b.maxSelector], e = "";
                this.options.displayFormat == "percentage" ? (e = ex.toInt(c / d * 100), e += "%") : this.options.displayFormat == "absolute" && (e = c), this.setText(e);
            }
        },
        setText: function(a) {
            this.options.text.prefix && (a = this.options.text.prefix + a), this.options.text.suffix && (a += this.options.text.suffix), this.items[0].setText(a);
        }
    });
}), ex.using([ "ex.display.Sprite", "ex.display.Rectangle", "ex.display.ui.StatusText", "ex.display.ui.StatusBar", "ex.base.Component" ], function() {
    ex.define("ex.display.ui.LoadingScreen", ex.base.Component, {
        constructor: function(a) {
            this.items = [ new ex.display.Rectangle({
                x: 0,
                y: 0,
                width: 800,
                height: 600,
                fill: {
                    type: "radial-gradient",
                    start: {
                        x: 400,
                        y: 300,
                        radius: 0
                    },
                    end: {
                        x: 400,
                        y: 300,
                        radius: 500
                    },
                    stops: [ {
                        position: 0,
                        color: "#555"
                    }, {
                        position: 1,
                        color: "#000"
                    } ]
                }
            }), new ex.display.Sprite(new ex.base.Vector(270, 230), a), new ex.display.ui.StatusText({
                position: new ex.Vector(340, 295),
                update: "auto",
                updateOptions: {
                    target: ex.Assets,
                    currentSelector: "_assetsLoaded",
                    maxSelector: "_assetsToLoad"
                },
                displayFormat: "percentage",
                text: {
                    color: "#FFFFFF",
                    font: "12pt Arial",
                    prefix: "Loading.. ",
                    suffix: ""
                }
            }), new ex.display.ui.StatusBar({
                position: new ex.Vector(340, 305),
                update: "auto",
                updateOptions: {
                    target: ex.Assets,
                    currentSelector: "_assetsLoaded",
                    maxSelector: "_assetsToLoad"
                }
            }) ];
            var b = 0, c = this.items.length, d;
            for (; b < c; b++) d = this.items[b], d.scrollFactor && (d.scrollFactor.x = 0, d.scrollFactor.y = 0);
            this.items[this.items.length - 1].options.outer.scrollFactor = new ex.Vector(0, 0), this.items[this.items.length - 1].options.inner.scrollFactor = new ex.Vector(0, 0);
        },
        update: function(a) {
            var b = this.items.length;
            while (b--) this.items[b].update(a);
        }
    });
}), ex.using([ "ex.display.Sprite", "ex.event.EventTarget", "ex.display.Text", "ex.display.Renderable" ], function() {
    ex.define("ex.display.ui.Menu", {
        constructor: function(a) {
            this.defaults = {
                items: [ {
                    item: null,
                    action: null
                } ],
                position: "center",
                onOver: function(a) {},
                onOut: function(a) {},
                defaultSelection: 0,
                controller: null,
                controls: {
                    up: "up",
                    down: "down",
                    activate: "activate",
                    click: "click"
                }
            }, this.enabled = !0, this.options = {}, ex.extend(this.options, this.defaults), ex.extend(this.options, a), this.currentSelection = this.options.defaultSelection, this.items = [];
            var b = 0, c = this.options.items.length, d;
            for (; b < c; b++) d = this.options.items[b].item, d instanceof ex.display.Renderable == 0 && this._throwNotRenderableError(d), this.items.push(d);
            this._calculateOffset(), this._addInputBindings();
        },
        addItem: function(a, b) {
            this.options.items.push({
                item: a,
                action: b
            }), this.items.push(a);
        },
        removeItem: function(a) {
            ex.Array.remove(this.items, a);
            var b = 0, c = this.options.items.length;
            for (; b != c; b++) this.options.items[b].item == a && this.options.items.splice(b, 1);
        },
        enable: function() {
            this.enabled = !0;
        },
        disable: function() {
            this.enabled = !1;
        },
        _addInputBindings: function() {
            this.options.controller && (this.options.controls.up && this.options.controller.bindAction("pressed", this.options.controls.up, ex.bind(this, this.moveUpMenu)), this.options.controls.down && this.options.controller.bindAction("pressed", this.options.controls.down, ex.bind(this, this.moveDownMenu)), this.options.controls.activate && this.options.controller.bindAction("pressed", this.options.controls.activate, ex.bind(this, this.activateCurrentSelection)), this.options.controls.click && this.options.controller.bindAction("pressed", this.options.controls.click, ex.bind(this, this.onClick)));
        },
        _removeInputBindings: function() {
            this.options.controller && (this.options.controls.up && this.options.controller.unbindAction("pressed", this.options.controls.up, ex.bind(this, this.moveUpMenu)), this.options.controls.down && this.options.controller.unbindAction("pressed", this.options.controls.down, ex.bind(this, this.moveDownMenu)), this.options.controls.activate && this.options.controller.unbindAction("pressed", this.options.controls.activate, ex.bind(this, this.activateCurrentSelection)), this.options.controls.click && this.options.controller.unbindAction("pressed", this.options.controls.click, ex.bind(this, this.onClick)));
        },
        _calculateOffset: function() {},
        moveUpMenu: function() {
            this.currentSelection != 0 && this.enabled && (this.options.onOut(this.options.items[this.currentSelection].item), this.currentSelection--, this.options.onOver(this.options.items[this.currentSelection].item));
        },
        moveDownMenu: function() {
            this.currentSelection < this.options.items.length - 1 && this.enabled && (this.options.onOut(this.options.items[this.currentSelection].item), this.currentSelection++, this.options.onOver(this.options.items[this.currentSelection].item));
        },
        onClick: function() {
            this.items[this.currentSelection].containsPoint(ex.Input.mouse.x, ex.Input.mouse.y) && this.activateCurrentSelection();
        },
        activateCurrentSelection: function() {
            if (this.enabled) {
                var a = this.options.items[this.currentSelection];
                a.action && a.action(a.item);
            }
        },
        update: function(a) {
            if (this.enabled) {
                var b = 0, c = this.options.items.length, d, e = !1;
                for (; b < c; b++) d = this.options.items[b].item, d.containsPoint(ex.Input.mouse.x, ex.Input.mouse.y) && (e = !0, ex.Input.changeCursor(ex.Input.CURSOR.POINTER), this.options.onOut(this.options.items[this.currentSelection].item), this.currentSelection = b, this.options.onOver(this.options.items[this.currentSelection].item));
            }
            e == 0 && ex.Input.getCursorType() == ex.Input.CURSOR.POINTER && ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
        },
        _throwNotRenderableError: function(a) {
            ex.Debug.log("Menu item passed in does not extend Renderable: " + a, "ERROR");
        },
        destroy: function() {
            ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
        }
    });
}), ex.using([ "ex.display.Sprite", "ex.base.Component", "ex.event.EventTarget", "ex.display.Text" ], function() {
    ex.define("ex.display.ui.TitleMenu", ex.base.Component, {
        constructor: function(a, b, c, d, e) {
            this.selections = a, this.currentSelection = b, this.options = {
                background: new ex.display.Sprite(new ex.base.Vector(0, 0), c),
                logo: new ex.display.Sprite(new ex.base.Vector(300, 100), d),
                menu: {
                    x: 100,
                    y: 320,
                    actionKey: ex.util.Key.Enter
                },
                selection: {
                    width: 150,
                    height: 70
                },
                controls: {
                    moveUp: "up",
                    moveDown: "down",
                    activate: "use",
                    updateSelection: "move"
                }
            }, this.items = [ this.options.background, this.options.logo ];
            var f = 0, g = this.selections.length, h, i = this.options.menu.y;
            for (; f < g; f++) h = this.selections[f], this.items.push(new ex.display.Text(h.text, {
                position: new ex.base.Vector(this.options.menu.x, i),
                maxWidth: null,
                color: f == b ? "#FF0000" : "#00FF00",
                font: "32pt Arial",
                textAlign: "left",
                prefix: "",
                suffix: ""
            })), this.selections[f] = this.items[this.items.length - 1], this.selections[f].action = h.action, i += 50;
            ex.extend(this.options, e), this.controller = ex.Input.getController(0), this.bindings = [ {
                selector: this.options.controls.moveUp,
                action: ex.bind(this, this.moveUpMenu)
            }, {
                selector: this.options.controls.moveDown,
                action: ex.bind(this, this.moveDownMenu)
            }, {
                selector: this.options.controls.activate,
                action: ex.bind(this, this.activateCurrentSelection)
            }, {
                selector: this.options.controls.updateSelection,
                action: ex.bind(this, this.onMouseMove)
            } ], this._addInputBindings();
        },
        _addInputBindings: function() {
            var a = this.bindings.length;
            while (a--) this.controller.on(this.bindings[a].selector, this.bindings[a].action);
        },
        _removeInputBindings: function() {
            var a = this.bindings.length;
            while (a--) this.controller.removeAction(this.bindings[a].selector, this.bindings[a].action);
        },
        onMouseMove: function(a, b) {
            if (b) {
                var c = this.selections.length;
                while (c--) b.position.x > this.options.menu.x - this.options.selection.width && b.position.x < this.options.menu.x + this.options.selection.width && b.position.y > this.options.menu.y + this.options.selection.height * (c - 1) && b.position.y < this.options.menu.y + this.options.selection.height * c && (this.selections[this.currentSelection].options.color = "#00FF00", this.currentSelection = c, this.selections[this.currentSelection].options.color = "#FF0000");
            }
        },
        moveUpMenu: function() {
            this.currentSelection != 0 && (this.selections[this.currentSelection].options.color = "#00FF00", this.currentSelection--, this.selections[this.currentSelection].options.color = "#FF0000");
        },
        moveDownMenu: function() {
            this.currentSelection < this.selections.length - 1 && (this.selections[this.currentSelection].options.color = "#00FF00", this.currentSelection++, this.selections[this.currentSelection].options.color = "#FF0000");
        },
        activateCurrentSelection: function() {
            this.selections[this.currentSelection].action();
        },
        update: function(a) {}
    });
}), ex.using([ "ex.base.Vector" ], function() {
    ex.define("ex.display.Camera", {
        constructor: function(a, b, c) {
            this.position = a, this.width = b, this.height = c, this.following = null, this.offset = null, this.bounds = null, this.timer = null;
        },
        update: function(a) {
            if (this.following != null) {
                var b = this.width >> 1, c = this.height >> 1, d = this.following.position.x + (this.following.width >> 1), e = this.following.position.y + (this.following.height >> 1), f = this.position.x + b - d, g = this.position.y + c - e;
                f > this.offset.x ? this.position.x = d + this.offset.x - b : f < -this.offset.x && (this.position.x = d - this.offset.x - b), g > this.offset.y ? this.position.y = e + this.offset.y - c : g < -this.offset.y && (this.position.y = e - this.offset.y - c);
            }
            this.bounds != null && (this.position.x < this.bounds.minX ? this.position.x = this.bounds.minX : this.position.x > this.bounds.maxX && (this.position.x = this.bounds.maxX), this.position.y < this.bounds.minY ? this.position.y = this.bounds.minY : this.position.y > this.bounds.maxY && (this.position.y = this.bounds.maxY)), this.timer && this.timer.update(a);
        },
        shake: function(a, b, c) {
            var d = this, e = {
                x: 0,
                y: 0
            };
            this.timer = new ex.world.Timer({
                delay: a,
                length: c,
                onTick: function() {
                    var a = ex.Math.getRandomInt(b, -b), c = ex.Math.getRandomInt(b, -b);
                    e.x += a, e.y += c, d.position.x += a, d.position.y += c;
                },
                onComplete: function() {
                    d.timer.destroy(), d.timer = null, d.position.x -= e.x, d.position.y -= e.y;
                }
            }), this.timer.start();
        },
        translate: function(a, b) {
            this.position.x += a, this.position.y += b;
        },
        moveTo: function(a, b) {
            this.position.x = a, this.position.y = b;
        },
        follow: function(a, b) {
            this.offset = b || 0, this.following = a;
        },
        unfollow: function() {
            this.following = null;
        },
        reset: function() {
            this.timer && (this.timer.destroy(), this.timer = null), this.moveTo(0, 0), this.unfollow(), this.unbind();
        },
        bind: function(a, b, c, d) {
            this.bounds = {
                minX: a,
                minY: b,
                maxX: a + c - this.width,
                maxY: b + d - this.height
            };
        },
        unbind: function() {
            this.bounds = null;
        }
    });
}), function() {
    ex.define("ex.display.ImageRepository", {
        constructor: function() {
            this.images = [], this.ready = !0, this.imagesLoaded = 0, this.imagesToLoad = 0;
        },
        getImage: function(a) {
            return this.images[a];
        },
        loadImage: function(a, b) {
            this.images[a] = new Image, this.ready = !1, this.imagesToLoad++;
            var c = this;
            this.images[a].onload = function() {
                c.imagesLoaded++, c.imagesLoaded == c.imagesToLoad && (c.ready = !0);
            }, this.images[a].src = "", this.images[a].src = b + "? ex=" + (new Date).getTime();
        }
    });
}(), ex.using([ "ex.display.rendering.RenderingContextDom", "ex.display.rendering.RenderingContext2dCanvas", "ex.display.rendering.RenderingContext3dCanvas", "ex.display.rendering.SpriteRenderer", "ex.display.rendering.RectangleRenderer", "ex.display.rendering.TextRenderer", "ex.display.rendering.AnimatedSpriteRenderer", "ex.display.rendering.SpriteMapRenderer" ], function() {
    ex.define("ex.display.rendering.Renderer", {
        __statics: {
            DOM: 1,
            CANVAS2D: 2,
            CANVAS3D: 3
        },
        constructor: function(a) {
            this.width = a.width, this.height = a.height, this.bgColor = a.bgColor, this.fullscreen = a.fullscreen, this.fullscreenType = a.fullscreenType, this.renderables = [], this.renderingContext = null, this.type = a.context, this.renderers = {
                Sprite: new ex.display.rendering.SpriteRenderer,
                Rectangle: new ex.display.rendering.RectangleRenderer,
                Text: new ex.display.rendering.TextRenderer,
                AnimatedSprite: new ex.display.rendering.AnimatedSpriteRenderer,
                SpriteMap: new ex.display.rendering.SpriteMapRenderer
            }, this.setup(a.params);
        },
        setup: function(a) {
            this.type == ex.display.rendering.Renderer.DOM ? this.renderingContext = new ex.display.rendering.RenderingContextDom(this.width, this.height, this.renderers, a.el, this.bgColor) : this.type == ex.display.rendering.Renderer.CANVAS2D ? this.renderingContext = new ex.display.rendering.RenderingContext2dCanvas(this.width, this.height, this.renderers, a.canvas, this.bgColor) : this.type == ex.display.rendering.Renderer.CANVAS3D && (this.renderingContext = new ex.display.rendering.RenderingContext3dCanvas(this.width, this.height, this.renderers, a.canvas, this.bgColor));
        },
        getRenderingElement: function() {
            return this.renderingContext.el ? this.renderingContext.el : this.renderingContext.canvas ? this.renderingContext.canvas : null;
        },
        _resizeViewport: function() {
            if (this.type == ex.display.rendering.Renderer.DOM) switch (this.fullscreenType) {
              case "resize":
                this.width = window.innerWidth, this.height = window.innerHeight, this.renderingContext.resizeViewport(this.width, this.height);
            } else if (this.type == ex.display.rendering.Renderer.CANVAS2D) switch (this.fullscreenType) {
              case "resize":
                this.width = window.innerWidth, this.height = window.innerHeight, this.renderingContext.resizeViewport(this.width, this.height);
                break;
              case "scale":
            } else this.type != ex.display.rendering.Renderer.CANVAS3D;
        },
        addRenderable: function(a) {
            !a.renderer && !this.renderers[a.type] && ex.Debug.log("There is no renderer setup for " + a.type, "ERROR"), this.type == ex.display.rendering.Renderer.DOM ? a.renderer ? a.renderer.setupDom.call(a, this.renderingContext.el) : this.renderers[a.type].setupDom.call(a, this.renderingContext.el) : this.type == ex.display.rendering.Renderer.CANVAS2D ? a.renderer ? a.renderer.setup2dCanvas.call(a, this.renderingContext.canvas) : this.renderers[a.type].setup2dCanvas.call(a, this.renderingContext.canvas) : this.type == ex.display.rendering.Renderer.CANVAS3D && (a.renderer ? a.renderer.setup3dCanvas.call(a, this.renderingContext.canvas) : this.renderers[a.type].setup3dCanvas.call(a, this.renderingContext.canvas)), this.renderables.push(a);
        },
        removeRenderable: function(a) {
            if (a.items) {
                var b = 0, c = a.items.length;
                for (; b < c; b++) this.removeRenderable(a.items[b]);
            } else {
                this.type == ex.display.rendering.Renderer.DOM ? a.renderer ? a.renderer.destroyDom.call(a, this.renderingContext.el) : this.renderers[a.type].destroyDom.call(a, this.renderingContext.el) : this.type == ex.display.rendering.Renderer.CANVAS2D ? a.renderer ? a.renderer.destroy2dCanvas.call(a, this.renderingContext.canvas) : this.renderers[a.type].destroy2dCanvas.call(a, this.renderingContext.canvas) : this.type == ex.display.rendering.Renderer.CANVAS3D && (a.renderer ? a.renderer.destroy3dCanvas.call(a, this.renderingContext.canvas) : this.renderers[a.type].destroy3dCanvas.call(a, this.renderingContext.canvas)), index = this.renderables.length;
                while (index--) this.renderables[index] === a && this.renderables.splice(index, 1);
            }
        },
        update: function(a, b) {
            this.renderingContext.render(this.renderables, b.position.x, b.position.y, b.width, b.height);
        }
    });
}), ex.using([], function() {
    var a;
    ex.define("ex.sound.SoundMixer", {
        __statics: {
            audio: [],
            muted: !1,
            masterVolume: 1,
            registerAudio: function(b) {
                b.volume = a.masterVolume, b.muted = a.muted, a.audio.push(b);
            },
            unregisterAudio: function(b) {
                ex.Array.remove(a.audio, b);
            },
            setMasterVolume: function(b) {
                ex.Array.each(a.audio, function(a, c) {
                    a.volume > b && (a.volume = b);
                }), a.masterVolume = b;
            },
            muteAll: function() {
                ex.Array.each(a.audio, function(a, b) {
                    a.muted = !0;
                }), a.muted = !0;
            },
            unmuteAll: function() {
                ex.Array.each(a.audio, function(a, b) {
                    a.muted = !1;
                }), a.muted = !1;
            }
        }
    }), a = ex.sound.SoundMixer;
}), ex.using([ "ex.sound.SoundMixer" ], function() {
    ex.define("ex.sound.Sound", {
        constructor: function(a, b) {
            this.defaults = {
                volume: 1,
                endTime: Number.MAX_VALUE,
                loop: !1,
                maxChannels: 10,
                preloadChannels: 1
            }, this.options = ex.extend({}, this.defaults, !0), ex.extend(this.options, b, !0), this.audio = a, this.audio.volume = this.options.volume, this.audio.loop = this.options.loop, this.channels = [], this.readyChannels = [], this.endedListeners = [], this.paused = !1, this.volume = this.options.volume;
            var c = 0, d = this.options.preloadChannels;
            for (; c != d; c++) this._generateAudioChannel();
        },
        play: function(a, b) {
            var c = this, d, e;
            if (this.paused) this.paused = !1, ex.Array.each(this.channels, function(a, b) {
                a.paused && a.currentTime != a.initialTime && c.play(a.loop, b);
            }); else {
                ex.isNull(b) == 0 ? d = b : (this.readyChannels.length == 0 && this._generateAudioChannel(), d = this.readyChannels.shift()), e = this.channels[d];
                if (!a) {
                    var f = ex.bind(this, this._onChannelEnded);
                    ex.event.listen("ended", e, f), this.endedListeners[d] = f;
                } else e.loop = a;
                e.play();
            }
        },
        _onChannelEnded: function(a) {
            var b = a.target.__audioId;
            ex.event.unlisten("ended", a.target, this.endedListeners[b]), ex.event.unlisten("timeupdate", a.target, a.target.__updateHandler), this.endedListeners[b] = null, this.seek(a.target.initialTime, b), this.readyChannels.length > this.options.maxChannels ? this.destroyChannel(b) : this.readyChannels.push(b);
        },
        pause: function(a) {
            if (ex.isNull(a) == 0) this.channels[i].pause(); else {
                var b = this;
                ex.Array.each(this.channels, function(a, c) {
                    a.currentTime != a.initialTime && (a.pause(), b.paused = !0);
                });
            }
        },
        setVolume: function(a) {
            ex.Array.each(this.channels, function(b, c) {
                b.volume = a;
            }), this.volume = a;
        },
        fadeOut: function(a, b) {
            this.fadeTo(0, a, b);
        },
        fadeTo: function(a, b, c) {
            ex.Array.each(this.channels, function(d, e) {
                ex.Tween.add(d, b, {
                    volume: a
                }, {
                    callback: c
                });
            });
        },
        fadeIn: function(a, b) {
            this.fadeTo(1, a, b);
        },
        _generateAudioChannel: function() {
            this.readyChannels.push(this.channels.push(this.audio.cloneNode(!0)) - 1);
            var a = this.channels[this.channels.length - 1];
            ex.sound.SoundMixer.registerAudio(a), a.volume = this.volume, a.__audioId = this.channels.length - 1, a.__updateHandler = ex.bind(this, this.__onTimeUpdate), ex.event.listen("timeupdate", a, a.__updateHandler);
        },
        __onTimeUpdate: function(a) {
            var b = a.target;
            b.currentTime >= this.options.endTime && (b.loop == 1 ? this.seek(b.initialTime, b.__audioId) : this.stop(b.__audioId));
        },
        seek: function(a, b) {
            try {
                ex.isNull(b) == 0 ? this.channels[b].currentTime = a : ex.Array.each(this.channels, function(b, c) {
                    b.currentTime = a;
                });
            } catch (c) {}
        },
        stop: function(a) {
            if (ex.isNull(a) == 0) {
                var b = this.channels[a];
                b.pause(), b.loop = !1, this.seek(b.initialTime, a), this._onChannelEnded({
                    target: b
                });
            } else {
                var c = this;
                ex.Array.each(this.channels, function(a, b) {
                    c.stop(b);
                });
            }
        },
        destroyChannel: function(a) {
            var b = this.channels[a];
            b.pause(), ex.sound.SoundMixer.unregisterAudio(this.channels[i]), ex.Array.remove(this.channels, a), this.channels[a] = null;
        },
        destroy: function() {
            this.stop(), ex.Array.each(this.channels, function(a, b) {
                this.destroyChannel(b);
            }), delete this.channels, delete this.readyChannels, delete this.audio;
        }
    });
}), function() {
    ex.define("ex.util.Logger", {
        __statics: {
            MAX_LENGTH: 300,
            LEVEL: {
                ALL: 5,
                DEBUG: 4,
                INFO: 3,
                ERROR: 2,
                NONE: 1
            }
        },
        constructor: function(a, b) {
            this.loggingType = a, this.loggingLevel = b || 3, this.defaultLoggingLevel = 4, this.textLog = "--Logger Enabled <br />", this.logs = [];
            for (var c = 0; c < 6; c++) this.logs[c] = [];
        },
        enableDOM: function(a) {
            this.loggingElement = a, this.loggingType = ex.util.Debug.DOM;
        },
        log: function(a, b) {
            b = b || this.defaultLoggingLevel, this.logs[b].push({
                message: a,
                date: (new Date).getTime()
            }), this.loggingLevel >= b && (this.textLog += "- " + a + "<br />", this.loggingType == ex.util.Debug.BROWSER ? console.log(a) : this.loggingType == ex.util.Debug.DOM && (this.textLog = this.textLog.substring(this.textLog.length - ex.util.Logger.MAX_LENGTH, this.textLog.length), this.loggingElement.innerHTML = this.textLog));
        }
    });
}(), ex.using([ "ex.base.GlobalComponent", "ex.util.Logger" ], function() {
    var a = {};
    ex.define("ex.util.Debug", ex.base.GlobalComponent, {
        __alias: "ex.Debug",
        __statics: {
            componentName: "Debug",
            DOM: 0,
            BROWSER: 1,
            _enabled: !1,
            _loggingLevel: 5,
            logTime: 3,
            logger: new ex.util.Logger(ex.util.Logger.BROWSER),
            enable: function(a, b) {
                ex.util.Debug._enabled = !0, ex.util.Debug._createDebugWindow(), a == ex.util.Debug.DOM && (ex.util.Debug.logger.enableDOM(ex.util.Debug.loggerElement), this.domElement.style.display = "inherit"), ex.util.Debug.logger.loggingType = a, ex.util.Debug.logger.loggingLevel = b;
            },
            time: function(b, c) {
                var d = a[b];
                d == null && (d = {
                    currentTime: null,
                    timer: new Date,
                    log: []
                }, a[b] = d);
                if (d.currentTime == null) d.currentTime = new Date; else {
                    var e = new Date, f = e - d.currentTime;
                    d.log.push(f), d.log.length > 5 && d.log.pop();
                    if (e - d.timer > ex.util.Debug.logTime * 1e3 || c == 1) ex.util.Debug.log("Time[" + b + "]: " + ex.Array.average(d.log) + "ms", ex.util.Logger.LEVEL.DEBUG), d.timer = e;
                    d.currentTime = null;
                }
            },
            log: function(a, b) {
                ex.util.Debug.logger.log(a, ex.util.Logger.LEVEL[b]);
            },
            benchmarkEngine: function(a) {
                if (this._enabled == 0) return;
                var b = ex.util.Debug;
                b.logged.push(a), b.logged.length > 20 && b.logged.shift();
                var c = ex.Array.average(b.logged), d = Math.floor(1 / c);
                b.benchmarkElement.innerHTML = "<b>" + d + " fps </b>", b.benchmarkElement.innerHTML += " | " + Math.floor(c * 1e3) + " ms";
            },
            _createDebugWindow: function() {
                var a = ex.util.Debug;
                a.domElement = document.createElement("div"), a.domElement.id = "debug", a.domElement.style.backgroundColor = "#222526", a.domElement.style.opacity = "0.9", a.domElement.style.border = "1px solid #ffbb6e", a.domElement.style.color = "#f28d00", a.domElement.style.fontSize = "10pt", a.domElement.style.position = "fixed", a.domElement.style.bottom = "5px", a.domElement.style.right = "5px", a.domElement.style.padding = "5px", a.benchmarkElement = document.createElement("div"), a.domElement.appendChild(a.benchmarkElement), a.logged = [], a.loggerElement = document.createElement("div"), a.loggerElement.style.backgroundColor = "#111111", a.loggerElement.style.padding = "5px", a.loggerElement.style.color = "#FFFFFF", a.loggerElement.style.maxHeight = "150px", a.loggerElement.style.maxWidth = "200px", a.loggerElement.style.overflow = "auto", a.writeLog = document.createElement("input"), a.writeLog.type = "checkbox", a.writeLog.name = "writeLog", a.writeLog.value = "logger", a.writeLog.checked = "checked", a.writeLog.id = "writeLog", a.domElement.appendChild(a.writeLog), a.domElement.appendChild(a.loggerElement), a.domElement.style.display = "none", document.body.appendChild(a.domElement);
            }
        }
    });
}), ex.using([ "ex.base.GlobalComponent", "ex.sound.Sound", "ex.event.EventTarget", "ex.util.Debug" ], function() {
    ex.define("ex.util.AssetManager", ex.base.GlobalComponent, {
        __alias: "ex.Assets",
        __statics: {
            _audio: {
                numAssets: 0
            },
            _video: {
                numAssets: 0
            },
            _images: {
                numAssets: 0
            },
            _files: {
                numAssets: 0
            },
            _ready: !0,
            _eventHandler: new ex.event.EventTarget,
            _assetsToLoad: 0,
            _assetsLoaded: 0,
            _supportedExtensions: {
                video: [ ".mp4", ".m4v", ".f4v", ".mov", ".webm", ".ogv" ],
                audio: [ ".aac", ".m4a", ".f4a", ".ogg", ".oga", ".mp3" ],
                image: [ ".jpg", ".jpeg", ".jpe", ".jif", ".jfif", ".jfi", ".png", ".gif", ".bmp", ".dib" ]
            },
            getAudio: function(a) {
                return this._audio[a] || this._throwAssetDoesNotExistError(a, "audio");
            },
            getVideo: function(a) {
                return this._video[a] || this._throwAssetDoesNotExistError(a, "video");
            },
            getImage: function(a) {
                return this._ready || this._throwImageNotReadyError(a), this._images[a] || this._throwAssetDoesNotExistError(a, "image");
            },
            getFile: function(a) {
                return this._ready || this._throwFileNotReadyError(a), this._files[a] || this._throwAssetDoesNotExistError(a, "file");
            },
            load: function(a, b, c, d) {
                this._ready == 1 && this._eventHandler.dispatchEvent("loadStart"), d != 1 && this._assetsToLoad++;
                var e = b.substring(b.lastIndexOf("."));
                this._supportedExtensions.image.indexOf(e) > -1 ? this._loadImage(a, b, c) : this._supportedExtensions.audio.indexOf(e) > -1 ? this._loadAudio(a, b, c) : this._supportedExtensions.video.indexOf(e) > -1 ? this._loadVideo(a, b, c) : this._loadFile(a, b, c);
            },
            loadBulk: function(a) {
                this._ready == 1 && (this._ready = !1, this._eventHandler.dispatchEvent("loadStart")), this._assetsToLoad += a.length;
                var b = a.length;
                while (b--) this.load(a[b].name, a[b].filePath, a[b].options, !0);
            },
            _loadFile: function(a, b, c) {
                function e(a) {
                    d._assetsLoaded++, d._eventHandler.dispatchEvent("assetLoaded", a), d._debugOnAssetLoaded(a), d._checkReadyState();
                }
                this._ready = !1;
                var d = this;
                if (this._files[a]) {
                    var f = this._files[a];
                    e(f);
                    return;
                }
                this._files[a] = {};
                var d = this;
                ex.Loader.ajax(b, {}, function(c) {
                    b.substr(b.length - 3) == "exf" && (c = JSON.parse(c)), d._files[a] = c, d._files.numAssets++, e(d._files[a]);
                });
            },
            _loadImage: function(a, b, c) {
                this._ready = !1;
                if (this._images[a]) {
                    this._throwImageNameConflictError(a, b), this._assetsLoaded++, this._checkReadyState();
                    return;
                }
                this._images[a] = new Image;
                var d = this;
                this._images[a].onError = this._throwUnableToLoadFileError, this._images[a].onload = function() {
                    var e = {
                        type: "Image",
                        name: a,
                        filePath: b,
                        options: c
                    };
                    d._assetsLoaded++, d._images.numAssets++, d._eventHandler.dispatchEvent("assetLoaded", e), d._debugOnAssetLoaded(e), d._checkReadyState();
                }, this._images[a].src = "", this._images[a].src = b;
            },
            _loadAudio: function(a, b, c) {
                var d = new Audio, e = this;
                this._ready = !1, d.onError = this._throwUnableToLoadFileError, d.src = b, d.addEventListener("canplaythrough", function(d) {
                    var f = {
                        type: "Audio",
                        name: a,
                        filePath: b,
                        options: c
                    };
                    e._eventHandler.dispatchEvent("assetLoaded", f), e._debugOnAssetLoaded(f), e._assetsLoaded++, e._audio.numAssets++, e._checkReadyState();
                }), this._audio[a] = d;
            },
            _loadVideo: function(a, b, c) {
                this._throwVideoNotSupportedError();
            },
            _checkReadyState: function() {
                this._assetsLoaded == this._assetsToLoad && this._ready == 0 && (this._ready = !0, this._eventHandler.dispatchEvent("loadEnd"), this._debugAssetCount());
            },
            _debugAssetCount: function() {
                ex.Debug.log("Total Assets: " + this._assetsLoaded + " | Audio: " + this._audio.numAssets + " | Image: " + this._images.numAssets + " | Video: " + this._video.numAssets + " | File: " + this._files.numAssets, "INFO");
            },
            _debugOnAssetLoaded: function(a) {
                ex.Debug.log("Asset Loaded: " + a.type + " | " + a.name + ' | "' + a.filePath + '" | ' + a.options, "INFO");
            },
            _throwAssetDoesNotExistError: function(a, b) {
                ex.Debug.log("The " + b + " file '" + a + "' does not exist. Maybe you forgot to load it.", "ERROR");
            },
            _throwUnableToLoadFileError: function(a) {
                ex.Debug.log("An error occured while loading the file at '" + a + "'.", "ERROR");
            },
            _throwFileTypeNotSupportedError: function(a, b, c) {
                ex.Debug.log('Not loading  "' + a + '" from "' + b + '" because the extension "' + c + '" is not supported.', "ERROR");
            },
            _throwVideoNotSupportedError: function() {
                ex.Debug.log("Sorry, video is not supported in this version of the engine.", "ERROR");
            },
            _throwImageNameConflictError: function(a, b) {
                ex.Debug.log('An image by the name "' + a + '" already exists. Not loading "' + b + '".', "INFO");
            },
            _throwImageNotReadyError: function(a) {
                ex.Debug.log("Retrieved image " + a + ", but it has not finished loading.", "INFO");
            },
            _throwFileNotReadyError: function(a) {
                ex.Debug.log("Retrieved file " + a + ", but it has not finished loading.", "INFO");
            }
        }
    });
}), function() {
    ex.define("ex.util.Key", {
        __alias: "ex.Key",
        __statics: {
            LMB: 0,
            MMB: 1,
            RMB: 2,
            Backspace: 8,
            Tab: 9,
            Enter: 13,
            Shift: 16,
            Control: 17,
            PauseBreak: 19,
            CapsLock: 20,
            Esc: 27,
            Spacebar: 32,
            PageUp: 33,
            PageDown: 34,
            End: 35,
            Home: 36,
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40,
            Insert: 45,
            Delete: 46,
            Keyb0: 48,
            Keyb1: 49,
            Keyb2: 50,
            Keyb3: 51,
            Keyb4: 52,
            Keyb5: 53,
            Keyb6: 54,
            Keyb7: 55,
            Keyb8: 56,
            Keyb9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            Numpad0: 96,
            Numpad1: 97,
            Numpad2: 98,
            Numpad3: 99,
            Numpad4: 100,
            Numpad5: 101,
            Numpad6: 102,
            Numpad7: 103,
            Numpad8: 104,
            Numpad9: 105,
            NumpadStar: 106,
            NumpadPlus: 107,
            NumpadMinus: 109,
            NumpadPeriod: 110,
            NumpadSlash: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            F13: 124,
            F14: 125,
            F15: 126,
            NumLck: 144,
            ScrLck: 145,
            SemiColon: 186,
            Equal: 187,
            Comma: 188,
            Minus: 189,
            Period: 190,
            Question: 191,
            BackQuote: 192,
            LeftBrace: 219,
            Pipe: 220,
            RightBrace: 221,
            SingleQuote: 222
        }
    });
}(), ex.using([ "ex.base.GlobalComponent", "ex.base.Vector", "ex.util.Key" ], function() {
    ex.define("ex.util.Input", ex.base.GlobalComponent, {
        __alias: "ex.Input",
        __statics: {
            CURSOR: {
                AUTO: "auto",
                POINTER: "pointer",
                CROSSHAIR: "crosshair"
            },
            _keyListenerElement: document,
            _inputTarget: document,
            mouse: new ex.Vector(0, 0),
            _inputState: {},
            _previousState: {},
            _released: [],
            update: function(a) {
                ex.extend(this._previousState, this._inputState);
                var b = 0, c = this._released.length;
                for (; b < c; b++) this._inputState[this._released[b]] = !1;
                this._released = [];
            },
            isDown: function(a) {
                return a.charAt && a.charAt(0) != "#" && (a = ex.util.Key[a]), this._inputState[a];
            },
            isPressed: function(a) {
                return a.charAt && a.charAt(0) != "#" && (a = ex.util.Key[a]), this._inputState[a] == 1 && (this._previousState[a] == 0 || this._previousState[a] == null);
            },
            isReleased: function(a) {
                return a.charAt && a.charAt(0) != "#" && (a = ex.util.Key[a]), this._inputState[a] == 0 && this._previousState[a] == 1;
            },
            changeInputTarget: function(a) {
                this._removeEventListenersFromInput(), a || (ex.Debug.log('"Element" can not be null in ex.Input.changeInputTarget. Defaulting to document.', "WARNING"), a = document), this._inputTarget = a, this._addEventListenersOnInput();
            },
            bindElement: function(a, b, c) {
                c = c.substr(1);
                var d = ex.Element.getById(c);
                ex.event.listen(a, d, this._onElementDown), ex.event.listen(b, d, this._onElementUp);
            },
            _onElementDown: function(a) {
                ex.Input._inputState["#" + a.target.id] = !0;
            },
            _onElementUp: function(a) {
                ex.Input._released.push("#" + a.target.id);
            },
            unbindElement: function(a, b, c) {
                delete ex.Input._inputState[c], delete ex.Input._previousState[c], c = c.substr(1);
                var d = ex.Element.getById(c);
                ex.event.unlisten(a, d, this._onElementDown), ex.event.unlisten(b, d, this._onElementUp);
            },
            _addEventListenersOnInput: function() {
                ex.event.listen("keydown", this._keyListenerElement, this._onKeyDown), ex.event.listen("keyup", this._keyListenerElement, this._onKeyUp), ex.event.listen("mousedown", this._inputTarget, this._onMouseDown), ex.event.listen("mouseup", this._inputTarget, this._onMouseUp), ex.event.listen("mousemove", this._inputTarget, this._onMouseMove);
            },
            _removeEventListenersFromInput: function() {
                ex.event.unlisten("keydown", this._keyListenerElement, this._onKeyDown), ex.event.unlisten("keyup", this._keyListenerElement, this._onKeyUp), ex.event.unlisten("mousedown", this._inputTarget, this._onMouseDown), ex.event.unlisten("mouseup", this._inputTarget, this._onMouseUp), ex.event.unlisten("mousemove", this._inputTarget, this._onMouseMove);
            },
            _onKeyDown: function(a) {
                ex.Input._inputState[a.keyCode] = !0;
            },
            _onKeyUp: function(a) {
                ex.Input._released.push(a.keyCode);
            },
            _onMouseDown: function(a) {
                ex.Input._inputState[a.button] = !0;
            },
            _onMouseUp: function(a) {
                ex.Input._released.push(a.button);
            },
            _onMouseMove: function(a) {
                ex.Input.mouse.x = a.clientX, ex.Input.mouse.y = a.clientY, ex.Input._inputTarget.offsetLeft && ex.Input._inputTarget.offsetTop && (ex.Input.mouse.x -= ex.Input._inputTarget.offsetLeft, ex.Input.mouse.y -= ex.Input._inputTarget.offsetTop);
            },
            changeCursor: function(a) {
                ex.Input._inputTarget.style.cursor != a && (ex.Input._inputTarget.style.cursor = a);
            },
            getCursorType: function() {
                return ex.Input._inputTarget.style.cursor;
            }
        }
    });
}), ex.using([ "ex.base.WorldComponent", "ex.event.EventTarget" ], function() {
    ex.define("ex.world.World", ex.event.EventTarget, {
        constructor: function(a, b, c) {
            this.name = a, this.active = !0, this.renderer = b, this.components = [], this.objects = [], this.globalObjects = [], this.objectsToRemove = [], this.options = c, this.options.componentConfig = this.options.componentConfig || [];
            var d = 0, e = c.components.length, f;
            for (; d != e; d++) f = new c.components[d](this.renderer, this.options.componentConfig[d]), f instanceof ex.base.WorldComponent ? this.components.push(f) : ex.Debug.log("Component must be an instance of ex.base.WorldComponent: " + f, "ERROR");
            this._super("constructor");
        },
        update: function(a) {
            if (this.active == 0) return;
            var b = this.objectsToRemove.length;
            while (b--) this._removeObject(this.objectsToRemove.pop());
            var c = 0, d = this.objects.length;
            for (; c != d; c++) this.objects[c].update(a);
            c = 0, d = this.components.length;
            for (; c != d; c++) this.components[c].update(a);
        },
        debug: function(a, b) {
            i = 0, ln = this.components.length;
            for (; i != ln; i++) this.components[i].debug(a, b);
        },
        addObject: function(a, b) {
            b || this.objects.push(a), a instanceof ex.display.Renderable && this.renderer.addRenderable(a);
            var c = 0, d = this.components.length;
            for (; c != d; c++) this.components[c].addObject(a);
            if (a.items) {
                c = 0, d = a.items.length;
                for (; c != d; c++) this.addObject(a.items[c], !0);
            }
        },
        addObjects: function(a) {
            var b = a.length;
            while (b--) this.addObject(a[b]);
        },
        removeObject: function(a) {
            this.objectsToRemove.push(a);
        },
        _removeObject: function(a, b) {
            b || ex.Array.remove(this.objects, a), a instanceof ex.display.Renderable && this.renderer.removeRenderable(a);
            var c = 0, d = this.components.length;
            for (; c != d; c++) this.components[c].removeObject(a);
            if (a.items) {
                c = 0, d = a.items.length;
                for (; c != d; c++) this._removeObject(a.items[c], !0);
            }
            a.destroy && a.destroy();
        },
        removeAllObjects: function() {
            var a = this.objects.length;
            while (a--) this._removeObject(this.objects[a]);
        },
        show: function() {
            function b(c) {
                c instanceof ex.display.Renderable && a.renderer.addRenderable(c), c.items && ex.Array.each(c.items, b);
            }
            var a = this;
            ex.Array.each(this.objects, b), this.hidden = !1, this.dispatchEvent("show");
        },
        hide: function() {
            function b(c) {
                c instanceof ex.display.Renderable && a.renderer.removeRenderable(c), c.items && ex.Array.each(c.items, b);
            }
            var a = this;
            ex.Array.each(this.objects, b), this.hidden = !0, this.dispatchEvent("hide");
        },
        pause: function() {
            this.active = !1, this.dispatchEvent("pause");
        },
        unpause: function() {
            this.active = !0, this.dispatchEvent("unpause");
        },
        getObject: function(a) {
            var b = this.objects.length;
            while (b--) if (this.objects[b].name === a) return this.objects[b];
            return null;
        },
        destroy: function() {
            var a = 0, b = this.components.length;
            for (; a != b; a++) this.components[a].destroy();
            this.active = !1, this.removeAllObjects(), delete this.renderer, delete this.objects, delete this.globalObjects, delete this.objectsToRemove;
        }
    });
}), ex.using([ "ex.base.Component", "ex.base.Point", "ex.util.Debug", "ex.util.AssetManager", "ex.util.Input", "ex.display.ImageRepository", "ex.display.Renderable", "ex.display.Camera", "ex.display.rendering.Renderer", "ex.world.World" ], function() {
    var a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        setTimeout(a, 1 / 30 * 1e3);
    }, b = 5;
    ex.define("ex.Engine", {
        constructor: function(b) {
            if (!document.createElement("canvas").getContext) {
                ex.Debug.log("Your browser does not support canvas!");
                return;
            }
            this.defaults = {
                rendering: {
                    width: 500,
                    height: 500,
                    frameRate: 60,
                    bgColor: "#000",
                    fullscreen: !1,
                    fullscreenType: "resize",
                    context: ex.display.rendering.Renderer.CANVAS2D,
                    params: {
                        canvas: null
                    }
                },
                loadingScreen: null,
                debug: {
                    enabled: !1,
                    type: ex.Debug.DOM,
                    level: ex.util.Logger.LEVEL.ALL
                },
                components: [],
                world: {
                    components: []
                }
            }, this.options = ex.extend({}, this.defaults, !0), ex.extend(this.options, b, !0), this.deltaTime = 1 / this.options.rendering.frameRate, this.currentWorld = null, this.worlds = [], this.worldsToRemove = [], this.lastTime = (new Date).getTime(), this.options.debug.enabled && this.enableDebugging(this.options.debug.type, this.options.debug.level), this.components = [];
            var c = 0, d = this.options.components.length;
            for (; c != d; c++) this.loadComponent(new this.options.components[c]);
            this.camera = new ex.display.Camera(new ex.base.Point(0, 0), this.options.rendering.width, this.options.rendering.height), this.renderer = new ex.display.rendering.Renderer(this.options.rendering), ex.Input.changeInputTarget(this.renderer.getRenderingElement()), this.fullscreen && this._setupFullscreenViewport(), a(ex.bind(this, this.update));
        },
        _setupFullscreenViewport: function() {
            this._resizeViewport(), ex.event.listen("resize", window, ex.bind(this, this._resizeViewport), !0);
        },
        _resizeViewport: function() {
            this.renderer._resizeViewport(), this.camera.width = this.renderer.width, this.camera.height = this.renderer.height;
        },
        enableDebugging: function(a, b) {
            this.options.debug = !0, ex.Debug.enable(a, b);
        },
        update: function() {
            ex.Debug.time("engine");
            var c = (new Date).getTime(), d = c - this.lastTime;
            d /= 1e3;
            var e = d;
            this.lastTime = c, e > b && (e = b);
            while (e > 0) {
                var f = Math.min(e, this.deltaTime);
                this.integrate(f), e -= this.deltaTime;
            }
            this.render(d), a(ex.bind(this, this.update)), this.debug && ex.Debug.benchmarkEngine(d), ex.Debug.time("engine");
        },
        integrate: function(a) {
            var b = 0, c = this.worldsToRemove.length;
            for (; b < c; b++) this._removeWorld(this.worldsToRemove.pop());
            b = this.components.length;
            while (b--) this.components[b].update(a);
            b = 0, c = this.worlds.length;
            for (; b < c; b++) this.worlds[b].update(a);
            ex.Input.update(a), this.onUpdate && this.onUpdate(a);
        },
        render: function(a) {
            var b = this;
            ex.Debug.time("render"), this.camera.update(a), this.renderer != null && b.renderer.update(a, b.camera), ex.Debug.time("render");
            var c = 0, d = this.worlds.length;
            for (; c < d; c++) this.worlds[c].debug(a, this.camera);
        },
        onUpdate: function() {},
        addWorld: function(a, b, c, d) {
            a = a || "DefaultWorldName", !c && c != 0 && (c = !0);
            var e = new ex.world.World(a, this.renderer, this.options.world);
            return c == 1 && (this.currentWorld && this.removeWorld(this.currentWorld), this.currentWorld = e, this.camera.reset()), b && this.loadScene(b, e, d), this.worlds.push(e), e;
        },
        getWorld: function(a) {
            return ex.Array.find(this.worlds, function(b) {
                if (b.name == a) return !0;
            });
        },
        removeWorld: function(a) {
            this.worldsToRemove.push(a);
        },
        _removeWorld: function(a) {
            this.currentWorld == a && (this.currentWorld = null), ex.Array.remove(this.worlds, a), a.destroy();
        },
        preloadScenes: function(a) {
            ex.isArray(a) || ex.Debug.log("Cannot preload scenes because argument is not an array", "ERROR");
            var b = a.length;
            while (b--) this.preloadScene(a[b]);
        },
        preloadScene: function(a) {
            game.levels[a] && game.levels[a].assetsLoaded ? ex.Debug.log('Preloading scene "' + a + '": already preloaded, skipped.', "INFO") : (ex.Debug.log('Preloading scene "' + a + '"...', "INFO"), ex.event.listenOnce("loadEnd", ex.Assets._eventHandler, function() {
                ex.Debug.log('Preloading scene "' + a + '" complete.', "INFO");
            }), this._loadSceneAssets(a));
        },
        loadScene: function(a, b, c) {
            var d = this;
            this._showLoadingScreen(b), !game.levels[a] || !game.levels[a].assetsLoaded ? (ex.event.listenOnce("loadEnd", ex.Assets._eventHandler, function() {
                ex.Debug.log('Loading assets for scene "' + a + '" complete.', "INFO"), d._hideLoadingScreenAndLoadScene(b, a, c);
            }), this._loadSceneAssets(a)) : this._hideLoadingScreenAndLoadScene(b, a, c);
        },
        _showLoadingScreen: function(a) {
            var b = this.options.loadingScreen, c = b.fadeInDelay || 1;
            b.alpha = 0, a.addObject(b), ex.Tween.add(b, c, {
                alpha: 1
            });
        },
        _hideLoadingScreenAndLoadScene: function(a, b, c) {
            var d = this, e = this.options.loadingScreen, f = e.fadeOutDelay || 1;
            ex.Tween.add(e, f, {
                alpha: 0
            }, {
                callback: function() {
                    a.removeObject(e), ex.Debug.log('Loading objects for scene "' + b + '"...', "INFO"), d._loadScene(b, a, c), ex.Debug.log('Loading objects for scene "' + b + '" complete.', "INFO");
                }
            });
        },
        _loadSceneAssets: function(a) {
            var b = this, c = "game.levels." + a;
            ex.using([ c ], function() {
                ex.event.listenOnce("loadStart", ex.Assets._eventHandler, function() {
                    ex.Debug.log('Loading assets for scene "' + a + '"...', "INFO");
                }), ex.event.listenOnce("loadEnd", ex.Assets._eventHandler, function() {
                    game.levels[a].assetsLoaded = !0;
                });
                var b = new game.levels[a];
                ex.Assets.loadBulk(b.getAssets());
            });
        },
        _loadScene: function(a, b, c) {
            var d = this, e = "game.levels." + a;
            ex.using([ e ], function() {
                var e = new game.levels[a](d, b), f = e.getObjects();
                b.addObjects(f), e.finalSetup(), c && c(b);
            });
        },
        loadComponent: function(a) {
            a instanceof ex.base.Component == 0 ? this.logger.log("Component must be an instance of ExstoEngine.Base.Component!") : this.components.push(a);
        },
        getComponent: function(a) {
            var b = this.components.length;
            while (b--) if (this.components[b].name == a) return this.components[b];
        },
        unloadComponent: function(a) {
            this.components.splice(this.components.indexOf(a), 1);
        }
    });
}), ex.using([ "ex.base.Vector" ], function() {
    ex.define("ex.plugins.Particle2", {
        constructor: function(a) {
            var b = {
                position: new ex.base.Vector(0, 0),
                vector: new ex.base.Vector(0, 0),
                age: 0,
                lifespan: 0,
                size: 0,
                alpha: 1,
                color: "#cef",
                scrollFactorX: 1,
                scrollFactorY: 1
            };
            ex.extend(b, a), b.position = a.position.clone(), ex.extend(this, b), this.onBirth();
        },
        update: function(a) {
            this.age >= this.lifespan ? this.onDeath() : (this.position = this.position.addScaled(this.vector, a), this.mature(a));
        },
        onBirth: function() {},
        mature: function(a) {
            this.alpha -= 1 / this.age, this.age += a;
        },
        onDeath: function() {
            this.active = !1;
        },
        render: function(a, b, c) {
            typeof this.onDraw == "function" && this.onDraw(this), a.save(), a.fillStyle = this.color;
            try {
                a.globalAlpha = this.alpha;
            } catch (d) {}
            a.translate(this.position.x - b * this.scrollFactorX, this.position.y - c * this.scrollFactorY), a.beginPath(), a.arc(0, 0, Math.abs(this.size / 2), 0, Math.PI / 180, !0), a.closePath(), a.fill(), a.restore();
        }
    });
}), ex.using([ "ex.base.Vector", "ex.plugins.Particle2" ], function() {
    function a(a) {
        return Math.random() * a - a / 2;
    }
    function b(a, b) {
        var c = Math.atan(b / a), d = Math.sqrt(a * a + b * b);
        return {
            r: d,
            theta: c
        };
    }
    function c(a, b) {
        var c = a * Math.cos(b), d = a * Math.sin(b);
        return {
            x: c,
            y: d
        };
    }
    function d(d, e, f) {
        var g = b(d.x, d.y);
        g.r += a(f), g.theta += a(e);
        var h = c(g.r, g.theta);
        return new ex.base.Vector(h.x, h.y);
    }
    function e(a, b) {
        return new ex.base.Vector(b.x - a.x, b.y - a.y);
    }
    function f(a, b) {
        for (var c in b) a[c] = b[c];
    }
    ex.define("ex.plugins.Emitter2", {
        constructor: function(a, b) {
            var c = {
                position: new ex.base.Vector(300, 300),
                particleVector: new ex.base.Vector(150, -50),
                angleVariance: Math.PI / 4,
                magnitudeVariance: .2,
                spawnSpeed: 5,
                maxParticles: 500,
                sizeVariance: 5,
                lifeVariance: 20,
                active: !0
            };
            ex.extend(c, a), this.options = c, this.options.origin = this.options.position.clone(), this.options.lastPosition = this.options.origin.clone();
            var d = {
                position: this.options.position.clone(),
                vector: c.particleVector.clone(),
                age: 0,
                lifespan: 2,
                size: 15,
                alpha: 1,
                color: "#ff0",
                onDraw: function(a) {
                    var b = -this.age * 100;
                    b = Math.floor(b), a.size *= .98, a.color = this.color, a.alpha = .5 - a.age / a.lifespan * .4;
                }
            };
            ex.extend(d, b), this.particleOptions = d, this.particles = [], this.active = !0;
        },
        update: function(a) {
            var b = this.particles.length, c = !1;
            this.options.position != this.options.lastPosition && (this.particleOptions.position = this.options.position.clone(), this.particleOptions.vector = this.options.particleVector.clone(), this.options.lastPosition = this.options.position.clone());
            while (b--) this.particles[b].age > this.particles[b].lifespan ? this.particles.splice(b, 1) : this.particles[b].update(a);
            for (var d = 0; d < this.options.spawnSpeed; d++) this.particles.length >= this.options.maxParticles || this.options.active == 0 || this.spawnParticle();
        },
        spawnParticle: function() {
            var b = {};
            ex.extend(b, ex.clone(this.particleOptions)), b.vector = d(b.vector, this.options.angleVariance, this.options.magnitudeVariance), b.size += a(this.options.sizeVariance), this.particles.push(new ex.plugins.Particle2(b));
        },
        render: function(a, b, c) {
            var d = this.particles.length;
            while (d--) this.particles[d].render(a, b, c);
        }
    });
}), ex.using([ "ex.event.EventTarget", "ex.util.Input" ], function() {
    var a;
    ex.define("ex.util.Controller", ex.event.EventTarget, {
        constructor: function(a) {
            this.bindings = {}, this.actions = {}, this.currentState = null, this.loadInputBindings(a), this._super("constructor");
        },
        loadInputBindings: function(a) {
            for (var b in a) {
                var c = a[b];
                if (c instanceof Array == 1) {
                    var d = 0, e = c.length;
                    for (; d < e; d++) this.bind(b, c[d]);
                } else this.bind(b, c);
            }
        },
        bind: function(b, c) {
            if (c.charAt && c.charAt(0) == "#") {
                var d = c.split(" "), e = d[0], f = d[1];
                f == "touch" ? a.bindElement("touchstart", "touchstop", e) : f == "mouse" ? a.bindElement("mousedown", "mouseup", e) : ex.Debug.log("ex.util.Controller.bind: Unrecognized input type " + f + " on " + e, "WARNING"), c = e;
            } else isNaN(parseInt(c)) && (c = ex.util.Key[c]);
            typeof this.bindings[b] == "undefined" && (this.bindings[b] = []), this.bindings[b].push(c);
        },
        unbind: function(a, b) {
            if (b.charAt(0) == "#") {
                var c = b.split(" "), d = c[0], e = c[1];
                e == "touch" ? this.input.unbindElement("touchstart", "touchstop", d) : e == "mouse" ? this.input.unbindElement("mousedown", "mouseup", d) : ex.Debug.log("ex.util.Controller.unbind: Unrecognized input type " + e + " on " + d, "WARNING"), b = d;
            } else isNaN(parseInt(b)) && (b = ex.util.Key[b]);
            this.bindings[a] && (ex.Array.remove(this.bindings[a], b), this.bindings[a].length == 0 && delete this.bindings[a]);
        },
        unbindAll: function() {
            for (var a in this.bindings) {
                var b = 0, c = this.bindings[a].length;
                for (; b < c; b++) this.unbind(this.bindings[a][b], a);
            }
        },
        update: function(b) {
            var c = this;
            for (var d in this.actions) {
                var e = this.actions[d], f, g = [ "pressed", "released", "down" ];
                ex.Array.each(g, function(f, g) {
                    if (e[f] && e[f].length > 0) {
                        var h = "is" + f.charAt(0).toUpperCase() + f.substr(1), i = !1;
                        c.bindings[d] && ex.Array.each(c.bindings[d], function(c, d) {
                            if (a[h](c)) return ex.Array.each(e[f], function(a, c) {
                                return a(b);
                            }), !1;
                        });
                    }
                });
            }
        },
        isDown: function(b) {
            var c = !1;
            return ex.Array.each(this.bindings[b], function(b, d) {
                if (a.isDown(b)) return c = !0, !1;
            }), c;
        },
        isPressed: function(b) {
            var c = !1;
            return ex.Array.each(this.bindings[b], function(b, d) {
                if (a.isPressed(b)) return c = !0, !1;
            }), c;
        },
        isReleased: function(b) {
            var c = !1;
            return ex.Array.each(this.bindings[b], function(b, d) {
                if (a.isReleased(b)) return c = !0, !1;
            }), c;
        },
        bindAction: function(a, b, c) {
            ex.isNull(this.actions[b]) && (this.actions[b] = {}), ex.isNull(this.actions[b][a]) && (this.actions[b][a] = []), this.actions[b][a].push(c);
        },
        unbindAction: function(a, b, c) {
            ex.Array.remove(this.actions[b][a], c), this.actions[b][a].length == 0 && delete this.actions[b][a];
        },
        unbindAllActions: function() {
            for (var a in this.actions) this.actions[a] = [];
        },
        destroy: function() {
            this.unbindAllActions(), this.unbindAll(), this.bindings = null, this.released = null, this.buttonState = null, this.previousState = null, this.actions = null, this.input = null;
        }
    }), a = ex.Input;
}), ex.using([ "ex.base.Point", "ex.base.Vector", "ex.display.Renderable" ], function() {
    ex.define("ex.world.Layer", ex.display.Renderable, {
        constructor: function(a, b, c, d) {
            this.name = a, this.items = [], this.map = b, this.map != null && this.items.push(this.map), c == null ? this.position = new ex.base.Point(0, 0) : this.position = c, d == null ? this.scrollFactor = new ex.base.Vector(1, 1) : this.scrollFactor = d, this._super("constructor", [ !0, 1 ]);
        },
        addItem: function(a) {
            a instanceof ex.world.CollisionMap ? this.map == null ? this._setMap(a) : console.error("Layers cannot contain more than one CollisionMap") : (a.visible = this.visible, a.opacity = this.opacity, this.items.push(a));
        },
        getItem: function(a) {
            var b = this.items.length;
            while (b--) if (this.items[b].name == a) return this.items[b];
        },
        _setMap: function(a) {
            this.map = a, this.items.push(this.map);
        },
        removeItem: function(a) {
            var b = this.items.length;
            while (b--) this.items[b] === a && this.items.splice(b, 1);
        },
        update: function(a) {
            var b = this.items.length;
            while (b--) this.items[b].update(a);
        },
        render: function(a, b, c, d, e) {
            if (!this.isVisible()) return;
            var f = this.items.length;
            while (f--) this.items[f].render(a, b * this.scrollFactor.x, c * this.scrollFactor.y, d, e);
        },
        debugRender: function(a, b, c, d, e) {
            this.render(a, b, c);
            var f = this.items.length;
            while (f--) this.items[f].debugRender(a, b * this.scrollFactor.x, c * this.scrollFactor.y, d, e);
        }
    });
}), ex.using([ "ex.world.Layer" ], function() {
    ex.define("ex.world.Map", {
        constructor: function(a) {
            this.name = a, this.layers = [];
        },
        addLayer: function(a) {
            a != null && this.layers.push(a);
        },
        getLayer: function(a) {
            if (a == null) return null;
            var b = this.layers.length;
            while (b--) if (this.layers[b].name == a) return this.layers[b];
            return null;
        },
        removeLayer: function(a) {
            var b = this.layers.length;
            while (b--) this.layers[b].name == a && this.layers.splice(b, 1);
        },
        toggleLayer: function(a) {
            var b = this.layers[a];
            b.visible = !b.visible;
        },
        update: function(a) {
            var b = this.layers.length;
            while (b--) this.layers[b].update(a);
        },
        render: function(a, b, c, d, e) {
            var f = this.layers.length;
            while (f--) this.layers[f].render(a, b, c, d, e);
        }
    });
}), ex.using([ "ex.event.EventTarget" ], function() {
    ex.define("ex.world.Trigger", ex.event.EventTarget, {
        constructor: function(a, b, c) {
            this.position = a, this.velocity = new ex.base.Vector(0, 0), this.width = b, this.height = c, this.anchored = !0, this.collides = !0, this.type = "Trigger", this._super("constructor", []);
        },
        onCollide: function(a, b) {
            this.dispatchEvent(a.name, b);
        },
        update: function(a) {},
        setupDom: function(a) {},
        renderDom: function(a, b, c, d, e) {},
        destroyDom: function(a) {},
        render2dCanvas: function() {},
        debugRender: function() {}
    });
}), ex.using([ "ex.ai.Action", "ex.ai.actions.Shoot" ], function() {
    ex.define("ex.ai.actions.Chase", ex.ai.Action, {
        constructor: function(a, b, c, d) {
            this.name = "chase", this.entity = a, this.target = b, this.maxRange = c, this.speedModifier = d || 1, this._super("constructor", [ 1, !0 ]);
        },
        update: function(a) {
            var b = Math.abs(this.entity.physical.position.x - this.target.physical.position.x), c = this.entity.physical.position.y - this.target.physical.height, d = this.entity.physical.position.y + this.entity.physical.height;
            return b < this.maxRange && this.target.physical.position.y > c && this.target.physical.position.y < d ? (this.moveTowardTarget(a), this.entity.weapon && this.attackTarget(a), !1) : !0;
        },
        attackTarget: function(a) {
            this.entity.cooldown += Math.random() * a, this.entity.weapon.cooldown <= 0 && this.entity.ai.push(new ex.ai.actions.Shoot(this.entity.weapon));
        },
        moveTowardTarget: function(a) {
            var b = this.entity.speed * this.speedModifier;
            this.target.physical.position.x < this.entity.physical.position.x ? (this.entity.facing = "left", this.entity.physical.applyImpulse(-b * a, 0), this.entity.moving = !0) : (this.entity.facing = "right", this.entity.physical.applyImpulse(b * a, 0), this.entity.moving = !0), this.entity.weapon && (this.entity.weapon.facing = this.entity.facing);
        }
    });
}), ex.using([ "ex.ai.Action" ], function() {
    ex.define("ex.ai.actions.Idle", ex.ai.Action, {
        constructor: function(a) {
            this.name = "idle", this.entity = a, this._super("constructor", [ 1, !0 ]);
        },
        update: function(a) {
            return !1;
        }
    });
}), ex.using([ "ex.ai.Action" ], function() {
    ex.define("ex.ai.actions.Shoot", ex.ai.Action, {
        constructor: function(a) {
            this.name = "shoot", this.weapon = a, this._super("constructor", [ 1, !1 ]);
        },
        update: function(a) {
            return this.weapon.shoot(), !0;
        }
    });
}), ex.using([ "ex.ai.Action" ], function() {
    ex.define("ex.ai.actions.Wander", ex.ai.Action, {
        constructor: function(a) {
            this.name = "wander", this.entity = a, this._super("constructor", [ 1, !1 ]);
        },
        update: function(a) {
            return this.isObstructed() && this.turnAround(a), this.entity.facing == "left" ? (this.entity.physical.applyImpulse(-this.entity.speed * a, 0), this.entity.moving = !0) : (this.entity.physical.applyImpulse(this.entity.speed * a, 0), this.entity.moving = !0), !1;
        },
        isObstructed: function() {
            if (!this.entity.collisionData || !this.entity.collisionData.tiles) return !1;
            var a = this.entity.collisionData.tiles, b = this.entity.physical.position.y - a[0].height, c = this.entity.physical.position.y + this.entity.physical.height, d = a.length, e;
            while (d--) {
                e = a[d];
                if (e.position.y >= b && e.position.y <= c) {
                    if (this.entity.facing == "left" && e.position.x <= this.entity.physical.position.x) return !0;
                    if (this.entity.facing == "right" && e.position.x >= this.entity.physical.position.x) return !0;
                }
            }
            return !1;
        },
        turnAround: function(a) {
            this.entity.facing == "left" ? this.entity.facing = "right" : this.entity.facing = "left", this.entity.weapon && (this.entity.weapon.facing = this.entity.facing), this.entity.physical.velocity.x = 0;
        }
    });
}), ex.using([], function() {
    ex.define("ex.base.WorldComponent", {
        constructor: function(a, b) {},
        addObject: function(a) {},
        update: function(a) {},
        removeObject: function(a) {},
        debug: function(a, b) {},
        destroy: function() {}
    });
}), ex.using([ "ex.display.rendering.ObjectRenderer" ], function() {
    ex.define("ex.display.rendering.AnimatedSpriteRenderer", ex.display.rendering.ObjectRenderer, {
        setupDom: function(a) {
            var b = this.currentAnimation.sheet, c = document.createElement("div");
            c.style.backgroundImage = "url(" + b.image.src + ")", c.style.display = "block", c.style.width = b.renderingRect.width + "px", c.style.height = b.renderingRect.height + "px", c.style.position = "absolute", c.style.left = this.position.x + "px", c.style.top = this.position.y + "px", c.style.zIndex = "100", this.rendering = {
                el: c
            }, a.appendChild(this.rendering.el);
        },
        destroyDom: function(a) {
            a.removeChild(this.rendering.el), this.rendering = null;
        },
        renderDom: function(a, b, c, d, e) {
            var f = this.currentAnimation.sheet, g = ex.toInt(this.position.x - b * this.scrollFactor.x), h = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (g + this.width < 0 || g > d || h + this.height < 0 || h > e) {
                this.visible && (this.visible = !1, this.rendering.el.style = "none");
                return;
            }
            this.visible == 0 && (this.visible = !0, this.rendering.el.style = "inherit"), this.rendering.el.style.backgroundPosition = f.renderingRect.position.x + "px" + " " + f.renderingRect.position.y + "px", this.rendering.el.style.left = g + "px", this.rendering.el.style.top = h + "px";
        },
        render2dCanvas: function(a, b, c, d, e) {
            if (this.currentAnimation == null) return;
            var f = this.currentAnimation.sheet;
            if (!this.isVisible()) return;
            var g = ex.toInt(this.position.x - b * this.scrollFactor.x), h = ex.toInt(this.position.y - c * this.scrollFactor.y);
            g + f.renderingRect.width > 0 && g < d && h + f.renderingRect.height > 0 && h < e && a.drawImage(f.image, f.renderingRect.x, f.renderingRect.y, f.renderingRect.width, f.renderingRect.height, g + f.offset.x, h + f.offset.y, this.width, this.height);
        }
    });
}), ex.using([], function() {
    ex.define("ex.display.rendering.ObjectRenderer", {
        setupDom: function() {},
        renderDom: function() {},
        destroyDom: function() {},
        setup2dCanvas: function() {},
        render2dCanvas: function() {},
        destroy2dCanvas: function() {},
        setup3dCanvas: function() {},
        render3dCanvas: function() {},
        destroy3dCanvas: function() {}
    });
}), ex.using([ "ex.display.rendering.ObjectRenderer" ], function() {
    ex.define("ex.display.rendering.RectangleRenderer", ex.display.rendering.ObjectRenderer, {
        setupDom: function(a) {},
        destroyDom: function(a) {},
        renderDom: function(a, b, c, d, e) {},
        setup2dCanvas: function() {
            this.rendering = {
                rotationCanvas: document.createElement("canvas")
            }, this.rendering.rotationCanvas.width = this.width, this.rendering.rotationCanvas.height = this.height, this.rendering.rotationContext = this.rendering.rotationCanvas.getContext("2d");
        },
        render2dCanvas: function(a, b, c, d, e) {
            if (!this.isVisible()) return;
            var f = ex.toInt(this.position.x - b * this.scrollFactor.x), g = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (!(f + this.width < 0 || f > d || g + this.height < 0 || g > e)) {
                if (this.rotationEnabled != 0) throw "Not implemented.";
                a.save(), this.options.alpha < 1 && (a.globalAlpha = this.options.alpha), this.options.stroke.type != "none" && (a.strokeStyle = this.getStrokeStyle(a), a.lineWidth = this.getLineWidth(), a.strokeRect(f, g, this.width, this.height)), this.options.fill.type != "none" && (a.fillStyle = this.getFillStyle(a), a.fillRect(f, g, this.width, this.height)), a.restore();
            }
        }
    });
}), function() {
    ex.define("ex.display.rendering.RenderingContext", {
        constructor: function(a, b) {
            this.width = a, this.height = b;
        },
        render: function(a, b, c, d, e) {}
    });
}(), ex.using([ "ex.display.rendering.RenderingContext" ], function() {
    ex.define("ex.display.rendering.RenderingContext2dCanvas", ex.display.rendering.RenderingContext, {
        constructor: function(a, b, c, d, e) {
            this._super("constructor", [ a, b ]), this.canvas = d || document.createElement("canvas"), this.canvas.width = a, this.canvas.height = b, this.canvas.style.backgroundColor = e, this.context = this.canvas.getContext("2d"), this.bufferCanvas = document.createElement("canvas"), this.bufferCanvas.width = a, this.bufferCanvas.height = b, this.bufferCanvas.style.backgroundColor = e, this.buffer = this.bufferCanvas.getContext("2d"), d == null && document.body.appendChild(this.canvas), this.renderers = c;
        },
        render: function(a, b, c, d, e) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.drawImage(this.bufferCanvas, 0, 0), this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var f = 0, g = a.length, h, i = this.renderers, j = this.buffer;
            for (; f < g; f++) h = a[f], h.renderer ? h.renderer.render2dCanvas.call(h, j, b, c, d, e) : i[h.type].render2dCanvas.call(h, j, b, c, d, e);
        },
        resizeViewport: function(a, b) {
            this.canvas.width = a, this.canvas.height = b;
        }
    });
}), ex.using([ "ex.display.rendering.RenderingContext" ], function() {
    ex.define("ex.display.rendering.RenderingContext3dCanvas", ex.display.rendering.RenderingContext, {});
}), ex.using([ "ex.display.rendering.RenderingContext" ], function() {
    ex.define("ex.display.rendering.RenderingContextDom", ex.display.rendering.RenderingContext, {
        constructor: function(a, b, c, d, e) {
            this._super("constructor", [ a, b ]), this.el = d || document.createElement("div"), this.el.id = "exstoGame", this.el.style.display = "block", this.el.style.width = a + "px", this.el.style.height = b + "px", this.el.style.overflow = "hidden", this.el.style.position = "relative", this.el.style.backgroundColor = e, d == null && document.body.appendChild(this.el), this.renderers = c;
        },
        resizeViewport: function(a, b) {
            this.el.style.width = a + "px", this.el.style.height = b + "px";
        },
        render: function(a, b, c, d, e) {
            var f = 0, g = a.length, h, i = this.el, j = this.renderers;
            for (; f < g; f++) h = a[f], h.renderer ? h.renderer.renderDom.call(h, i, b, c, d, e) : j[h.type].renderDom.call(h, i, b, c, d, e);
        }
    });
}), ex.using([ "ex.display.rendering.ObjectRenderer" ], function() {
    ex.define("ex.display.rendering.SpriteMapRenderer", ex.display.rendering.ObjectRenderer, {
        setupDom: function(a) {
            var b = document.createElement("div");
            b.style.position = "absolute", b.style.left = this.position.x + "px", b.style.top = this.position.y + "px", b.style.display = "block", b.style.width = this.tileMap.width + "px", b.style.height = this.tileMap.height + "px", b.style.zIndex = "99";
            var c = this.tileMap.data.length - 1, d = 0;
            for (c; c > -1; c--) {
                for (d; d < this.tileMap.data[c].length; d++) {
                    var e = this.tileMap.data[c][d], f = 0, g = 0, h = e.value;
                    if (h != 0) {
                        while (--h) f += this.tileMap.tileWidth, f >= this.tileSet.width && (g += this.tileMap.tileHeight, f = 0);
                        var i = document.createElement("div");
                        i.style.position = "absolute", i.style.left = e.position.x + "px", i.style.top = e.position.y - this.yOffset * c + "px", i.style.display = "block", i.style.width = e.width + "px", i.style.height = e.height + "px", i.style.backgroundImage = "url(" + this.tileSet.src + ")", i.style.backgroundPosition = -f + "px" + " " + -g + "px", b.appendChild(i);
                    } else {
                        var i = document.createElement("div");
                        i.style.position = "absolute", i.style.left = e.position.x + "px", i.style.top = e.position.y - this.yOffset * c + "px", i.style.width = e.width + "px", i.style.height = e.height + "px", i.style.display = "none", b.appendChild(i);
                    }
                }
                d = 0;
            }
            this.rendering = {
                el: b
            }, a.appendChild(this.rendering.el);
        },
        renderDom: function(a, b, c, d, e) {
            if (!this.visible) {
                this.rendering.el.style.opacity = 0;
                return;
            }
            this.rendering.el.style.opacity = this.opacity;
            var f = ex.toInt(this.position.x - b * this.scrollFactor.x), g = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (f + this.tileMap.width < 0 || f > d || g + this.tileMap.height < 0 || g > e) {
                this.rendering.el.style.display = "none";
                return;
            }
            this.rendering.el.style.display = "inherit";
            var h = this.tileMap.data.length - 1, i = 0;
            for (h; h > -1; h--) {
                for (i; i < this.tileMap.data[h].length; i++) {
                    var j = this.tileMap.data[h][i], k = j.value;
                    if (k != 0) {
                        var l = ex.toInt(this.position.x + j.position.x - b * this.scrollFactor.x), m = ex.toInt(this.position.y + j.position.y + c * this.scrollFactor.y - e / 2);
                        if (l + j.width < 0 || l > d || m + j.height < 0 || m > e) {
                            if (j.visible == 1) {
                                var n = h * this.tileMap.data[0].length + i, a = this.rendering.el.childNodes[n];
                                a.style.display = "none", j.visible = !1;
                            }
                        } else if (j.visible == 0) {
                            var n = h * this.tileMap.data[0].length + i, a = this.rendering.el.childNodes[n];
                            j.visible = !0, a.style.display = "inherit";
                        }
                    }
                }
                i = 0;
            }
            this.rendering.el.style.left = -b + "px", this.rendering.el.style.top = -c + "px";
        },
        destroyDom: function(a) {
            a.removeChild(this.rendering.el), this.rendering = null;
        },
        setup2dCanvas: function(a) {
            if (this.options.preRender == 1) {
                this.preRenderCanvas = document.createElement("canvas"), this.preRenderCanvas.width = this.tileMap.width, this.preRenderCanvas.height = this.tileMap.height, this.preRenderContext = this.preRenderCanvas.getContext("2d");
                var b = this.options.alpha;
                this.options.alpha = 1, ex.display.rendering.SpriteMapRenderer.renderSpriteMapToContext(this, this.preRenderContext), this.options.alpha = b;
            }
        },
        render2dCanvas: function(a, b, c, d, e) {
            if (!this.isVisible()) return;
            var f = ex.toInt(this.position.x - b * this.scrollFactor.x), g = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (f + this.tileMap.width < 0 || f > d || g + this.tileMap.height < 0 || g > e) if (this.options.repeat == 0) return;
            var h = ex.display.rendering.SpriteMapRenderer;
            if (this.options.repeat == 0) this.options.preRender == 1 ? h.renderPreRenderedSpriteMapToContext(this, a, {
                x: f,
                y: g
            }, d, e) : h.renderSpriteMapToContext(this, a, {
                x: f,
                y: g
            }); else {
                var i = f % this.tileMap.width, j = g % this.tileMap.height, k, l;
                f > 0 && (i -= this.tileMap.width), g > 0 && (j -= this.tileMap.height), k = i, l = j;
                while (k < d) {
                    while (l < e) this.options.preRender == 1 ? h.renderPreRenderedSpriteMapToContext(this, a, {
                        x: k,
                        y: l
                    }, d, e) : h.renderSpriteMapToContext(this, a, {
                        x: k,
                        y: l
                    }), l += this.tileMap.height;
                    l = j, k += this.tileMap.width;
                }
            }
        },
        __statics: {
            renderPreRenderedSpriteMapToContext: function(a, b, c, d, e) {
                b.save(), b.globalAlpha = a.options.alpha, c = c || {
                    x: 0,
                    y: 0
                };
                var f = -c.x, g = -c.y, h = d - c.x, i = e - c.y, j = c.x, k = c.y;
                f < 0 && (f = 0), g < 0 && (g = 0), f + h > a.preRenderCanvas.width && (h = a.preRenderCanvas.width - f), g + i > a.preRenderCanvas.height && (i = a.preRenderCanvas.height - g), j < 0 && (j = 0), k < 0 && (k = 0), b.drawImage(a.preRenderCanvas, f, g, h, i, j, k, h, i), b.restore();
            },
            renderSpriteMapToContext: function(a, b, c) {
                b.save(), b.globalAlpha = a.options.alpha;
                var d = a.tileMap.data.length - 1, e = 0;
                c = c || {
                    x: 0,
                    y: 0
                };
                for (d; d > -1; d--) {
                    for (e; e < a.tileMap.data[d].length; e++) {
                        var f = a.tileMap.data[d][e], g = 0, h = 0, i = f.value;
                        if (i != 0) {
                            while (--i) g += a.tileMap.tileWidth, g >= a.tileSet.width && (h += a.tileMap.tileHeight, g = 0);
                            b.drawImage(a.tileSet, g, h, a.tileMap.tileWidth, a.tileMap.tileHeight, f.position.x + c.x, f.position.y - a.options.offset.y * d + c.y, f.width, f.height);
                        }
                    }
                    e = 0;
                }
                b.restore();
            }
        }
    });
}), ex.using([ "ex.display.rendering.ObjectRenderer" ], function() {
    ex.define("ex.display.rendering.SpriteRenderer", ex.display.rendering.ObjectRenderer, {
        setupDom: function(a) {
            var b = this.img;
            b.style.position = "absolute", b.style.width = this.width + "px", b.style.height = this.height + "px", b.style.left = this.position.x + "px", b.style.top = this.position.y + "px", this.rendering = {
                el: b
            }, a.appendChild(this.rendering.el);
        },
        destroyDom: function(a) {
            a.removeChild(this.rendering.el), this.rendering = null;
        },
        renderDom: function(a, b, c, d, e) {
            if (!this.visible) {
                this.rendering.el.style.opacity = 0;
                return;
            }
            this.rendering.el.style.opacity = this.alpha;
            var f = ex.toInt(this.position.x - b * this.scrollFactor.x), g = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (f + this.width < 0 || f > d || g + this.height < 0 || g > e) {
                this.visible == 1 && (this.visible = !1, this.rendering.el.style.display = "none");
                return;
            }
            this.visible == 0 && (this.visible = !0, this.rendering.el.style.display = "inherit"), this.rotationEnabled == 0 && (this.rendering.el.style.left = f + "px", this.rendering.el.style.top = g + "px");
        },
        setup2dCanvas: function() {
            this.rendering = {
                rotationCanvas: document.createElement("canvas")
            }, this.rendering.rotationCanvas.width = this.width, this.rendering.rotationCanvas.height = this.height, this.rendering.rotationContext = this.rendering.rotationCanvas.getContext("2d");
        },
        render2dCanvas: function(a, b, c, d, e) {
            if (!this.isVisible()) return;
            var f = a.globalAlpha;
            a.globalAlpha = this.alpha;
            var g = ex.toInt(this.position.x - b * this.scrollFactor.x), h = ex.toInt(this.position.y - c * this.scrollFactor.y);
            if (g + this.width < 0 || g > d || h + this.height < 0 || h > e) return;
            if (this.rotationEnabled == 0) if (!this.renderingRect) a.drawImage(this.img, g, h, this.width, this.height); else {
                var i = this.renderingRect;
                a.drawImage(this.img, i.x, i.y, i.width, i.height, g, h, i.width, i.height);
            } else {
                var j = this.rendering.rotationCanvas, k = this.rendering.rotationContext;
                j.width = this.img.width || 1, j.height = this.img.height || 1, k.save(), k.translate(this.width / 2, this.height / 2), k.rotate(this.rotation), k.translate(-this.width / 2, -this.height / 2), k.drawImage(this.img, 0, 0), k.restore(), a.drawImage(j, g, h);
            }
            a.globalAlpha = f;
        }
    });
}), ex.using([ "ex.display.rendering.ObjectRenderer" ], function() {
    ex.define("ex.display.rendering.TextRenderer", ex.display.rendering.ObjectRenderer, {
        setupDom: function(a) {
            var b = document.createElement("div");
            b.innerHTML = this.text, b.style.position = "absolute", b.style.left = this.position.x + "px", b.style.top = this.position.y + "px", b.style.font = this.options.font, b.style.color = this.options.color, this.rendering = {
                el: b
            }, a.appendChild(this.rendering.el);
        },
        renderDom: function(a, b, c, d, e) {
            this.rendering.el.innerHTML = this.text, this.rendering.el.style.left = this.position.x + "px", this.rendering.el.style.top = this.position.y + "px";
        },
        destroyDom: function(a) {
            a.removeChild(this.rendering.el), this.rendering = null;
        },
        render2dCanvas: function(a, b, c, d, e) {
            if (!this.isVisible()) return;
            a.save(), a.globalAlpha = this.options.alpha;
            if (this.options.type == "canvas") a.font = this.options.font, a.fillStyle = this.options.color, a.fillText(this.text, this.position.x, this.position.y, this.options.maxWidth); else if (this.options.type == "sprite") {
                var f = 0, g = this.text.length, h, i, j, k = this.position.x - b * this.scrollFactor.x, l = this.position.y - c * this.scrollFactor.y;
                for (; f < g; f++) h = this.text.charCodeAt(f), i = this.options.fontData.widths[h], j = this.options.fontData.positions[h], a.drawImage(this.img, j, 0, i, this.img.height, k, l, i, this.img.height), k += i;
            }
            a.restore();
        }
    });
}), ex.using([ "ex.display.Renderable" ], function() {
    ex.define("ex.display.Text", ex.display.Renderable, {
        constructor: function(a, b, c) {
            this.type = "Text", this.defaults = {
                type: "canvas",
                maxWidth: null,
                color: "#FFFFFF",
                font: "14pt Arial",
                textAlign: "left",
                prefix: "",
                suffix: "",
                fontData: {},
                alpha: 1
            }, this.options = {}, ex.extend(this.options, this.defaults), ex.extend(this.options, c), this.text = a, this.position = b, this.scrollFactor = new ex.Vector(0, 0), this._super("constructor", [ !0, 1 ]);
            if (this.options.type == "sprite") this.loadFontData(this.options.fontData); else {
                var d = document.createElement("canvas").getContext("2d");
                d.font = this.options.font, this.height = d.measureText("m"), this.width = d.measureText(this.text);
            }
        },
        setText: function(a, b) {
            a instanceof String == 0 && (a = a.toString()), this.text = a, b == 1 && this._calculateWidth();
        },
        _calculateWidth: function() {
            if (this.options.type == "sprite") {
                this.width = 0;
                var a = 0, b = this.text.length, c, d;
                for (; a < b; a++) c = this.text.charCodeAt(a), d = this.options.fontData.widths[c], this.width += d;
            } else {
                var e = document.createElement("canvas").getContext("2d");
                e.font = this.options.font, this.width = e.measureText(this.text);
            }
        },
        loadFontData: function(a) {
            this.options.fontData = a;
            if (!a.img) {
                var b = a.data, c = new Image;
                c.src = b, a.img = c;
            }
            this.img = a.img, this.height = a.height, this._calculateWidth();
        }
    });
}), ex.using([ "ex.display.Renderable", "ex.display.Sprite", "ex.base.Rectangle", "ex.world.Entity" ], function() {
    var a;
    ex.define("ex.display.ui.Button", ex.world.Entity, {
        __statics: {
            STATE: {
                UP: 0,
                OVER: 1,
                DOWN: 2
            }
        },
        constructor: function(b, c, d) {
            this.defaults = {
                actions: {
                    pressed: null,
                    down: null,
                    released: null,
                    over: null
                },
                userData: {},
                autoUpdateSprite: !1
            }, this.options = ex.extend({}, this.defaults, !0), ex.extend(this.options, d, !0), this.state = a.UP, c.position = ex.clone(b), this._super("constructor", [ "Button", [ c ] ]);
        },
        update: function(b) {
            var c = this.items[0];
            c.update(b);
            if (c.containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) ex.Input.changeCursor(ex.Input.CURSOR.POINTER), ex.Input.isDown(ex.util.Key.LMB) ? (this.state != a.DOWN && this.options.actions.pressed && this.options.actions.pressed(this, this.options.userData), this.options.actions.down && this.options.actions.down(this, this.options.userData), this.state = a.DOWN, this.options.autoUpdateSprite && c.play("down")) : (this.state != a.OVER && this.options.actions.over && this.options.actions.over(this, this.options.userData), this.state = a.OVER, this.options.autoUpdateSprite && c.play("over")); else if (this.state == a.OVER || this.state == a.DOWN) ex.Input.changeCursor(ex.Input.CURSOR.AUTO), this.state = a.UP, this.options.actions.released && this.options.actions.released(this, this.userData), this.options.autoUpdateSprite && c.play("up");
        },
        destroy: function() {
            delete this.options.actions, delete this.state, delete this.width, delete this.items, delete this.userData;
        }
    }), a = ex.display.ui.Button.STATE;
});

var ex = ex || {};

Array.indexOf || (Array.prototype.indexOf = function(a) {
    for (var b = 0; b < this.length; b++) if (this[b] == a) return b;
    return -1;
}), function() {
    function a() {}
    "use strict", ex.UID_PROPERTY = "__uniqueId", ex.uidCounter = 0, ex.extend = function(a, b, c) {
        for (var d in b) if (b[d] !== undefined) {
            if (a === b[d]) continue;
            typeof src != "Object" && typeof src != "Array" || !c ? a[d] = b[d] : a[d] = ex.extend({}, b[d], c);
        }
        return a;
    }, ex.extend(ex, {
        bind: function(a, b) {
            return function() {
                return b.apply(a, arguments);
            };
        },
        clone: function(b) {
            return a.prototype = b, new a;
        },
        copy: function(a) {
            var b;
            return ex.isObject(a) ? (b = b || {}, ex.extend(b, a, !0)) : ex.isArray(a) ? (b = b || [], ex.extend(b, a, !0)) : b = a, b;
        },
        derive: function(a, b) {
            function c() {}
            c.prototype = a.prototype, b.prototype = new c, b.prototype.constructor = b;
        },
        each: function(a, b) {
            for (var c in a) Object.prototype.propertyIsEnumerable.call(a, c) && action(c, a[c]);
        },
        toInt: function(a) {
            return a | 0;
        },
        isObject: function(a) {
            return typeof a == "object";
        },
        isArray: function(a) {
            return Object.prototype.toString.call(a) == "[object Array]";
        },
        isFunction: function(a) {
            return typeof a == "function";
        },
        isNull: function(a) {
            return typeof a == "undefined";
        },
        uid: function(a) {
            return a[ex.UID_PROPERTY] || (a[ex.UID_PROPERTY] = ++ex.uidCounter);
        }
    }), ex.Array = {
        contains: function(a, b) {
            var c = 0;
            for (; c < a.length; c++) if (a[c] == b) return !0;
            return !1;
        },
        remove: function(a, b) {
            a.indexOf(b) != -1 && a.splice(a.indexOf(b), 1);
        },
        each: function(a, b) {
            var c = 0, d = a.length, e = !0;
            for (; c != d; c++) {
                e = b(a[c], c);
                if (e == 0) return;
            }
        },
        find: function(a, b) {
            var c = 0, d = a.length, e;
            for (; c < d; c++) {
                e = b(a[c]);
                if (e) return a[c];
            }
        },
        average: function(a) {
            var b = 0, c = a.length;
            while (c--) b += a[c];
            return b /= a.length, b;
        },
        to2D: function(a, b, c) {
            var d = 0, e = 0, f = 0, g = new Array(b);
            for (e = 0; e < b; e++) {
                g[e] = new Array(a);
                for (d = 0; d < a; d++, f++) g[e][d] = c[f];
            }
            return g;
        }
    }, ex.extend(ex, {
        _namespaces: {},
        _classes: {},
        _defined: [],
        config: {
            baseUrl: ""
        },
        using: function(a, b) {
            var c = !0, d = 0, e;
            if (typeof a == "undefined") {
                b();
                return;
            }
            for (; d < a.length; d++) e = a[d], ex.Array.contains(this._defined, e) == 0 && (c = !1, this.addRelationship(e, b), this.require(e));
            ex.Loader.startQueue();
            if (c == 1) {
                b();
                return;
            }
        },
        require: function(a) {
            ex.Loader.asyncFile(this.namespaceToUrl(a));
        },
        addRelationship: function(a, b) {
            this._namespaces[a] || (this._namespaces[a] = []), this._namespaces[a].push(b), this._classes[b] || (this._classes[b] = []), this._classes[b].push(a);
        },
        namespaceToUrl: function(a) {
            var b = a.split("."), c = "";
            typeof window != "undefined" && (c = window.location.href.substr(0, window.location.href.lastIndexOf("/"))), b[0] == "ex" && (c = ex.config.baseUrl);
            var d = -1;
            while (++d < b.length) b[d] != "ex" && (c += "/" + b[d]);
            return c += ".js", c;
        }
    }), ex.Loader = {
        _urls: {},
        _callbacks: {},
        _queue: [],
        _date: new Date,
        asyncFile: function(a, b) {
            if (typeof this._urls[a] != "undefined") return;
            this._urls[a] = !1, typeof b != "undefined" && (this._callbacks[a] = b), this._queue.push(a);
        },
        startQueue: function() {
            for (var a = 0; a < this._queue.length; a++) {
                var b = this._queue[a];
                this.addScriptTag(b, function() {
                    ex.Loader.onScriptLoad(b), this.onload = null;
                });
            }
            this._queue = [];
        },
        onScriptLoad: function(a) {
            this._urls[a] = !0, a in this._callbacks && (this._callbacks[a](), delete this._callbacks[a]);
        },
        addScriptTag: function(a, b) {
            var c = document.getElementsByTagName("head").item(0), d = document.createElement("script");
            return d.language = "javascript", d.type = "text/javascript", d.defer = !1, d.src = a, d.onload = b, c.appendChild(d), d;
        },
        ajax: function(a, b, c) {
            var d;
            window.XMLHttpRequest ? d = new XMLHttpRequest : d = new ActiveXObject("Microsoft.XMLHTTP"), d.open("GET", a, !0), d.send(), d.onreadystatechange = function() {
                d.readyState == 4 && d.status == 200 && c(d.responseText);
            };
        }
    }, ex.Element = {
        defaults: {
            SCRIPT: {
                language: "javascript",
                type: "text/javascript"
            }
        },
        createTag: function(a, b) {
            var a = document.createElement(a);
            return a = ex.extend(a, b), a;
        },
        getByTagName: function(a) {
            return document.getElementsByTagName(a)[0];
        },
        getById: function(a) {
            var b = document.getElementById(a);
            return b || ex.Debug.log("ex.Element.getById: Could not find element with id " + a, "WARNING"), b;
        }
    }, ex.Math = {
        average: function(a) {
            var b = 0, c = a.length;
            while (c--) b += a[c];
            return b /= a.length, b;
        },
        floor: function(a) {
            return a >> 0;
        },
        abs: function(a) {
            return a < 0 ? -a : a;
        },
        getRandomInt: function(a, b) {
            return Math.floor(Math.random() * (b - a + 1)) + a;
        }
    };
    var b = b || null;
    if (b == null) {
        var c = document.getElementsByTagName("head")[0], d = c.getElementsByTagName("script"), e = new RegExp(/ExstoEngine\.js/), f = d.length;
        while (f--) {
            var g = d[f];
            e.test(g.src) == 1 && (ex.config.baseUrl = g.src.split("/ExstoEngine.js", 1)[0]);
        }
    }
}(), function() {
    function a(a, b) {
        function f() {}
        c(a, null, b), typeof b.constructor == "function" && b.constructor != Object && (f = b.constructor), f.prototype = b, e(a, f), d(a, null, b, f);
    }
    function b(a, b, f) {
        function g() {
            b.apply(this);
        }
        c(a, b, f);
        if (b == null) throw new Error("The base class has not been defined for " + a);
        ex.isFunction(f.constructor) && f.constructor != Object && (g = f.constructor), ex.derive(b, g), ex.extend(g.prototype, f), g.prototype._super = function(a, c) {
            this._super = b.prototype._super, b.prototype[a].apply(this, c), this._super = this._superTemp;
        }, g.prototype._superTemp = g.prototype._super, e(a, g), d(a, b, f, g);
    }
    function c(a, b, c) {}
    function d(a, b, c, f) {
        "__statics" in f.prototype && e(a, f.prototype.__statics, !0);
        if ("__alias" in f.prototype) {
            var g = f.prototype.__alias;
            g != a && (e(g, f), d(g, b, c, f));
        }
    }
    function e(a, b, c) {
        var d = window, e = a.split("."), f = 0, g = e.length;
        for (; f < g; f++) {
            var h = e[f];
            d[h] = d[h] || {}, f == g - 1 && (c ? ex.extend(d[h], b) : d[h] = b), d = d[h];
        }
        return d;
    }
    ex.define = function(c, d, e) {
        if (typeof c != "string") throw new Error("Cannot create class, namespace must be of type String.\n" + d.constructor);
        e == null ? a(c, d) : b(c, d, e), this._defined.push(c);
        if (typeof this._namespaces[c] != "undefined") {
            var f = this._namespaces[c], g = f.length;
            while (g--) {
                var h = f[g];
                ex.Array.remove(this._classes[h], c), this._classes[h].length == 0 && (h(), delete this._classes[h]), ex.Array.remove(this._namespaces[c], h), this._namespaces[c].length == 0 && delete this._namespaces[c];
            }
        }
    };
}();

var exports = exports || null;

exports && ex.extend(exports, ex), ex.using([ "ex.event.EventTarget" ], function() {
    ex.define("ex.novus.NovusClient", "ex.event.EventTarget", {
        constructor: function(a) {
            this.url = a, this.socket = io.connect(a), this.listeners = {};
            var b = this;
            this.socket.on("login", function(a) {
                b.callback(a.success);
            }), this.socket.on("guestLogin", function(a) {
                b.callback(a.success);
            }), this.socket.on("roomList", function(a) {
                b.callback(a.list);
            }), this.socket.on("joinRoom", function(a) {
                b.callback(a);
            }), this.socket.on("createRoom", ex.bind(this, function(a) {
                this.dispatchEvent("createRoom", a);
            })), this.socket.on("roomMessage", ex.bind(this, function(a) {
                var b = this.listeners[a.type] || [];
                b.forEach(function(b, c, d) {
                    b(a.message);
                });
            }));
        },
        on: function(a, b) {
            typeof this.listeners[a] == "undefined" && (this.listeners[a] = []), this.listeners[a].push(b);
        },
        login: function(a, b, c) {
            this.callback = c, this.socket.emit("login", {
                name: a,
                password: b
            });
        },
        guestLogin: function(a, b) {
            this.callback = b, this.socket.emit("guestLogin", {
                name: a
            });
        },
        roomList: function(a) {
            this.callback = a, this.socket.emit("roomList", {});
        },
        createRoom: function(a) {
            this.socket.emit("createRoom", {
                name: a
            });
        },
        joinRoom: function(a, b) {
            this.callback = b, this.socket.emit("joinRoom", {
                name: a
            });
        },
        leaveRoom: function() {
            this.socket.emit("leaveRoom", {});
        },
        message: function(a, b) {
            this.socket.emit("roomMessage", {
                type: a,
                message: b
            });
        },
        messageTo: function(a, b, c) {
            this.socket.emit("roomMessageTo", {
                name: a,
                type: b,
                message: c
            });
        }
    });
}), ex.using([ "ex.physics.Force" ], function() {
    ex.define("ex.physics.force.Gravity", ex.physics.Force, {
        constructor: function(a) {
            this.strength = a;
        },
        solve: function(a, b) {
            var c = 0, d = b.length, e;
            for (; c != d; c++) e = b[c], e.velocity && e.gravity != 0 && b[c].applyForce(0, this.strength);
        }
    });
}), ex.using([ "ex.base.Vector" ], function() {
    ex.define("ex.physics.Force", {
        update: function(a) {},
        solve: function(a, b) {},
        destroy: function() {}
    });
}), ex.using([ "ex.physics.CollisionManager", "ex.physics.CollisionMap", "ex.physics.RigidBox", "ex.physics.force.Gravity" ], function() {
    ex.define("ex.physics.Physics", {});
}), ex.using([ "ex.base.Vector", "ex.physics.Collidable" ], function() {
    ex.define("ex.physics.RigidBody", ex.physics.Collidable, {
        constructor: function(a, b, c) {
            this.position = b, this.velocity = new ex.Vector(0, 0), this.acceleration = new ex.Vector(0, 0), this.mass = 1, this.elasticity = 0, this.maxVelocity = new ex.Vector(3e3, 3e3), this.zero = .01, this._super("constructor", [ a, c ]);
        },
        applyForce: function(a, b) {
            this.acceleration.x += a / this.mass, this.acceleration.y += b / this.mass;
        },
        applyImpulse: function(a, b) {
            this.velocity.x += a, this.velocity.y += b;
        },
        integrate: function(a) {
            this.mass != 0 && (this.velocity.addScaled(this.acceleration, a), this.acceleration.x = 0, this.acceleration.y = 0, this.velocity.limit(this.maxVelocity), this.velocity.x < this.zero && this.velocity.x > -this.zero && (this.velocity.x = 0), this.velocity.y < this.zero && this.velocity.y > -this.zero && (this.velocity.y = 0), this.position.addScaled(this.velocity, a));
        },
        linkObject: function(a) {
            a.position = this.position;
        }
    });
}), ex.using([ "ex.physics.RigidBody" ], function() {
    ex.define("ex.physics.RigidBox", ex.physics.RigidBody, {
        constructor: function(a, b, c, d) {
            this.width = b, this.height = c, this._super("constructor", [ "RigidBox", a, d ]);
        },
        draw: function(a, b, c) {
            a.strokeRect(this.position.x - b, this.position.y - c, this.width, this.height);
        }
    });
}), ex.using([ "ex.base.Component" ], function() {
    ex.define("ex.plugins.Data", ex.base.Component, {
        __alias: "ex.Data",
        __statics: {
            data: {},
            storageKeys: null,
            setStorageKeys: function(a) {
                this.storageKeys = a;
            },
            clear: function() {
                localStorage.clear();
            },
            save: function() {
                var a = {};
                if (this.storageKeys) {
                    var b = 0, c = this.storageKeys.length, d;
                    for (; b != c; b++) d = this.storageKeys[b], a[d] = this.data[d];
                } else a = this.data;
                a = JSON.stringify(a), localStorage.data = a;
            },
            load: function() {
                var a = localStorage.data;
                if (a) {
                    a = JSON.parse(a);
                    if (this.storageKeys) {
                        var b = 0, c = this.storageKeys.length, d;
                        for (; b != c; b++) d = this.storageKeys[b], this.data[d] = a[d];
                    } else ex.extend(this.data, a, !0);
                }
                return a;
            },
            set: function(a, b) {
                ex.Data.data[a] = b;
            },
            get: function(a) {
                return ex.Data.data[a];
            }
        }
    });
}), ex.using([ "ex.base.Vector", "ex.base.Component" ], function() {
    var a;
    ex.define("ex.plugins.Tween", ex.base.Component, {
        __alias: "ex.Tween",
        constructor: function() {
            a.__instance ? ex.Debug.log("ex.plugins.Tween has already been initialized!", "INFO") : (this._super("constructor"), a.__instance = this);
        },
        update: function(b) {
            a.__update(b);
        },
        __statics: {
            __instance: null,
            tweens: [],
            add: function(b, c, d, e) {
                var f = this.__generateTween(b, c, d, e);
                a.tweens.push(f);
            },
            delayedCall: function(b, c) {
                var d = this.__generateTween({}, b, {}, {
                    callback: c
                });
                a.tweens.push(d);
            },
            __generateTween: function(a, b, c, d) {
                var e = {
                    element: a,
                    duration: b,
                    elapsed: 0,
                    properties: c,
                    starting: {},
                    options: d || {}
                };
                for (var f in c) e.starting[f] = a[f];
                return e;
            },
            __update: function(b) {
                var c = 0, d = a.tweens.length, e, f, g = !1;
                for (; c < d; c++) {
                    e = a.tweens[c], e.elapsed += b, f = b;
                    if (e.options.delay) {
                        if (!(e.elapsed > e.options.delay)) continue;
                        e.elapsed -= e.options.delay, e.options.delay = null;
                    }
                    e.elapsed > e.duration && (f = e.duration - e.elapsed, e.elapsed = e.duration, g = !0);
                    for (var h in e.properties) if (g == 0) {
                        var i = (e.properties[h] - e.starting[h]) / e.duration * f;
                        e.element[h] += i;
                    } else e.element[h] = e.properties[h];
                    g == 1 && (a.tweens[c].options.callback && a.tweens[c].options.callback(), a.tweens.splice(c, 1), c--, d--, g = !1);
                }
            }
        }
    }), a = ex.Tween;
}), ex.using([], function() {
    var a = navigator.userAgent.toLowerCase();
    ex.define("ex.util.Device", {
        __alias: "ex.Device",
        __statics: {
            isOnline: function() {
                return navigator.onLine;
            },
            isMobile: function() {
                return ex.Device.isiOS();
            },
            isiOS: function() {
                return ex.Device.isiPhone() || ex.Device.isiPad();
            },
            isiPhone: function() {
                return a.search("iphone") > -1;
            },
            isiPad: function() {
                return a.search("ipad") > -1;
            },
            cache: {
                UNCACHED: 0,
                IDLE: 1,
                CHECKING: 2,
                DOWNLOADING: 3,
                UPDATEREADY: 4,
                OBSOLETE: 5,
                status: function() {
                    var a = window.applicationCache;
                    switch (a.status) {
                      case a.UNCACHED:
                        return ex.Device.cache.UNCACHED;
                      case a.IDLE:
                        return ex.Device.cache.IDLE;
                      case a.CHECKING:
                        return ex.Device.cache.CHECKING;
                      case a.DOWNLOADING:
                        return ex.Device.cache.DOWNLOADING;
                      case a.UPDATEREADY:
                        return ex.Device.cache.UPDATEREADY;
                      case a.OBSOLETE:
                        return ex.Device.cache.OBSOLETE;
                    }
                },
                update: function(a) {
                    window.applicationCache.addEventListener("updateready", function(b) {
                        window.applicationCache.status == window.applicationCache.UPDATEREADY && (window.applicationCache.swapCache(), a());
                    }, !1), window.applicationCache.update();
                }
            },
            supports: {
                canvas: function() {
                    var a = document.createElement("canvas");
                    return !ex.isNull(a.getContext);
                },
                localStorage: function() {
                    try {
                        return "localStorage" in window && window.localStorage !== null;
                    } catch (a) {
                        return !1;
                    }
                }
            }
        }
    });
}), ex.using([ "ex.base.GlobalComponent" ], function() {
    function a() {
        var a = -1;
        if (navigator.appName == "Microsoft Internet Explorer") {
            var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            c.exec(b) != null && (a = parseFloat(RegExp.$1));
        }
        return a;
    }
    function b() {
        var a = 0;
        if (window.opera) {
            var b = window.opera.version();
            a = parseFloat(b);
        }
        return a;
    }
    function p(a) {
        var b = 0;
        if (typeof a == "string" && a != null && a != "") {
            var c = a.indexOf("px");
            c >= 0 ? b = parseInt(a.substring(0, c)) : b = 1;
        }
        return b;
    }
    function q(a) {
        var b = new Object;
        b.left = 0, b.top = 0, b.right = 0, b.bottom = 0;
        if (window.getComputedStyle) {
            var c = window.getComputedStyle(a, null);
            b.left = parseInt(c.borderLeftWidth.slice(0, -2)), b.top = parseInt(c.borderTopWidth.slice(0, -2)), b.right = parseInt(c.borderRightWidth.slice(0, -2)), b.bottom = parseInt(c.borderBottomWidth.slice(0, -2));
        } else b.left = p(a.style.borderLeftWidth), b.top = p(a.style.borderTopWidth), b.right = p(a.style.borderRightWidth), b.bottom = p(a.style.borderBottomWidth);
        return b;
    }
    ex.define("ex.util.DOM", ex.base.GlobalComponent, {
        __statics: {
            __browser: null,
            determineBrowser: function() {},
            getElementAbsolutePos: function(a) {
                var b;
                typeof a == "string" ? b = document.getElementById(a) : b = a;
                var c = {
                    x: 0,
                    y: 0
                };
                if (b !== null) {
                    c.x = b.offsetLeft;
                    var e = b.offsetParent, h = "";
                    e != null && e.tagName.toLowerCase(), f && h == "td" ? c.y = b.scrollTop : c.y = b.offsetTop;
                    var m = b.parentNode, n = null;
                    while (e != null) {
                        c.x += e.offsetLeft, c.y += e.offsetTop;
                        var p = e.tagName.toLowerCase();
                        if (g && p != "table" || j && p == "td" || l) n = q(e), c.x += n.left, c.y += n.top;
                        e != document.body && e != document.documentElement && (c.x -= e.scrollLeft, c.y -= e.scrollTop);
                        if (!d && !o || f) while (e != m && m !== null) {
                            c.x -= m.scrollLeft, c.y -= m.scrollTop;
                            if (i || k) n = q(m), c.x += n.left, c.y += n.top;
                            m = m.parentNode;
                        }
                        m = e.parentNode, e = e.offsetParent;
                    }
                }
                return c;
            }
        }
    });
    var c = navigator.userAgent, d = navigator.appVersion.match(/MSIE/) != null, e = a(), f = d && e >= 8, g = d && !f, h = c.match(/firefox/i) != null, i = h && (c.match(/firefox\/2./i) != null || c.match(/firefox\/1./i) != null), j = h && !i, k = navigator.appVersion.match(/WebKit/) != null, l = navigator.appVersion.match(/Chrome/) != null, m = window.opera != null, n = b(), o = m && n < 10;
}), ex.using([ "ex.event.EventTarget" ], function() {
    ex.define("ex.world.Timer", ex.event.EventTarget, {
        constructor: function(a) {
            this.defaults = {
                delay: 1,
                length: 1,
                onTick: null,
                onComplete: null
            }, this.options = {}, ex.extend(this.options, this.defaults), ex.extend(this.options, a), this.started = !1, this.duration = 0, this.tick = 0, this._super("constructor");
        },
        start: function() {
            if (this.options.length && this.duration > this.options.length) return;
            this.started = !0;
        },
        reset: function() {
            this.started = !1, this.duration = 0, this.tick = 0;
        },
        stop: function() {
            this.started = !1;
        },
        update: function(a) {
            this.started && (this.duration += a, this.tick += a, this.tick > this.options.delay && (this.tick -= this.options.delay, this.options.onTick && this.options.onTick(), this.dispatchEvent("tick")), this.options.length > 0 && this.duration > this.options.length && (this.options.onComplete && this.options.onComplete(), this.dispatchEvent("complete"), this.stop()));
        },
        destroy: function() {
            delete this.options.onTick, delete this.options.onComplete, delete this.options, this.started = !1;
        }
    });
});