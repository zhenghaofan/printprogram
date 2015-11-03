define(function (){
    var CONTEXT_2D = '2d',
        OBJECT_ARRAY = '[object Array]',
        OBJECT_NUMBER = '[object Number]',
        OBJECT_STRING = '[object String]',
        PI_OVER_DEG180 = Math.PI / 180,
        DEG180_OVER_PI = 180 / Math.PI,
        HASH = '#',
        EMPTY_STRING = '',
        ZERO = '0',
        RGB_PAREN = 'rgb(',
        COLORS = {
            aqua: [0,255,255],
            lime: [0,255,0],
            silver: [192,192,192],
            black: [0,0,0],
            maroon: [128,0,0],
            teal: [0,128,128],
            blue: [0,0,255],
            navy: [0,0,128],
            white: [255,255,255],
            fuchsia: [255,0,255],
            olive:[128,128,0],
            yellow: [255,255,0],
            orange: [255,165,0],
            gray: [128,128,128],
            purple: [128,0,128],
            green: [0,128,0],
            red: [255,0,0],
            pink: [255,192,203],
            cyan: [0,255,255],
            transparent: [255,255,255,0]
        },

        RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

    var _RAF = (function() {
        return requestAnimationFrame
            || webkitRequestAnimationFrame
            || mozRequestAnimationFrame
            || oRequestAnimationFrame
            || msRequestAnimationFrame
            || FRAF;
    })();

    function FRAF(callback) {
        setTimeout(callback, 1000 / 60);
    }


	var util = {
        /*
         * cherry-picked utilities from underscore.js
         */
        _isElement: function(obj) {
            return !!(obj && obj.nodeType == 1);
        },
        _isFunction: function(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        },
        _isObject: function(obj) {
            return (!!obj && obj.constructor == Object);
        },
        _isArray: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_ARRAY;
        },
        _isNumber: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_NUMBER;
        },
        _isString: function(obj) {
            return Object.prototype.toString.call(obj) == OBJECT_STRING;
        },
	    hasMethods: function(obj) {
	        var names = [],
	            key;

	        for(key in obj) {
	            if(this._isFunction(obj[key])) {
	                names.push(key);
	            }
	        }
	        return names.length > 0;
	    },
	    extend: function(c1, c2) {
	        for(var key in c2.prototype) {
	            if(!( key in c1.prototype)) {
	                c1.prototype[key] = c2.prototype[key];
	            }
	        }
	    },
	    addMethods: function(constructor, methods) {
	        var key;

	        for (key in methods) {
	            constructor.prototype[key] = methods[key];
	        }
	    },
	    cloneObject: function(obj) {
	        var retObj = {};
	        for(var key in obj) {
	            if(this._isObject(obj[key])) {
	                retObj[key] = this.cloneObject(obj[key]);
	            }
	            else if (this._isArray(obj[key])) {
	                retObj[key] = this.cloneArray(obj[key]);
	            } else {
	                retObj[key] = obj[key];
	            }
	        }
	        return retObj;
	    },
	    cloneArray: function(arr) {
	        return arr.slice(0);
	    },
        _getRGBAString: function(obj) {
            var red = obj.red || 0,
                green = obj.green || 0,
                blue = obj.blue || 0,
                alpha = obj.alpha || 1;

            return [
                'rgba(',
                red,
                ',',
                green,
                ',',
                blue,
                ',',
                alpha,
                ')'
            ].join(EMPTY_STRING);
        },
        _rgbToHex: function(r, g, b) {
            return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        _hexToRgb: function(hex) {
            hex = hex.replace(HASH, EMPTY_STRING);
            var bigint = parseInt(hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        },
        addGetterSetter : function (target,property){
            var cap = this._capitalize(property);
            target.prototype["set"+cap] = function (p){
                this[property] = p;
            };
            target.prototype["get"+cap] = function (){
                return this[property];
            };
        },
        addKOGetterSetter : function (target,property){
            var cap = this._capitalize(property);
            target.prototype["set"+cap] = function (p){
                this[property](p);
            };
            target.prototype["get"+cap] = function (){
                return this[property]();
            };
        },
        capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        getRandomColor: function() {
            var randColor = (Math.random() * 0xFFFFFF << 0).toString(16);
            while (randColor.length < 6) {
                randColor = ZERO + randColor;
            }
            return HASH + randColor;
        },
        getRGB: function(color) {
            var rgb;
            // color string
            if (color in COLORS) {
                rgb = COLORS[color];
                return {
                    r: rgb[0],
                    g: rgb[1],
                    b: rgb[2]
                };
            }
            // hex
            else if (color[0] === HASH) {
                return this._hexToRgb(color.substring(1));
            }
            // rgb string
            else if (color.substr(0, 4) === RGB_PAREN) {
                rgb = RGB_REGEX.exec(color.replace(/ /g,''));
                return {
                    r: parseInt(rgb[1], 10),
                    g: parseInt(rgb[2], 10),
                    b: parseInt(rgb[3], 10)
                };
            }
            // default
            else {
                return {
                    r: 0,
                    g: 0,
                    b: 0
                };
            }
        },
	    getImage: function(arg, callback) {
	        var imageObj, canvas;

	        // if arg is null or undefined
	        if(!arg) {
	            callback(null);
	        }

	        // if arg is already an image object
	        else if(this._isElement(arg)) {
	            callback(arg);
	        }

	        // if arg is a string, then it's a data url
	        else if(this._isString(arg)) {
	            imageObj = new window.Image();
	            imageObj.onload = function() {
	                callback(imageObj);
	            };
	            imageObj.src = arg;
	        }

	        //if arg is an object that contains the data property, it's an image object
	        else if(arg.data) {
	            canvas = document.createElement('canvas');
	            canvas.width = arg.width;
	            canvas.height = arg.height;
	            var _context = canvas.getContext("2d");
	            _context.putImageData(arg, 0, 0);
	            this.getImage(canvas.toDataURL(), callback);
	        }
	        else {
	            callback(null);
	        }
	    },
        getDPI : function () {
            var arrDPI = new Array();
            if (window.screen.deviceXDPI != undefined) {
                arrDPI[0] = window.screen.deviceXDPI;
                arrDPI[1] = window.screen.deviceYDPI;
            }
            else {
                var tmpNode = document.createElement("DIV");
                tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
                document.body.appendChild(tmpNode);
                arrDPI[0] = parseInt(tmpNode.offsetWidth);
                arrDPI[1] = parseInt(tmpNode.offsetHeight);
                tmpNode.parentNode.removeChild(tmpNode);    
            }
            return arrDPI;
        },
        extendData : function (d,a){
            for(i in a){
                if (i in d) {
                    d[i] = a[i];
                };
            }
        },
        Event : {
            listeners: {},
            addEventListener:function(type, callback, scope) {
                var args = [];
                var numOfArgs = arguments.length;
                for(var i=0; i<numOfArgs; i++){
                    args.push(arguments[i]);
                }
                args = args.length > 3 ? args.splice(3, args.length-1) : [];
                if(typeof util.Event.listeners[type] != "undefined") {
                    util.Event.listeners[type].push({scope:scope, callback:callback, args:args});
                } else {
                    util.Event.listeners[type] = [{scope:scope, callback:callback, args:args}];
                }
            },
            removeEventListener:function(type, callback, scope) {
                if(typeof util.Event.listeners[type] != "undefined") {
                    var numOfCallbacks = util.Event.listeners[type].length;
                    var newArray = [];
                    for(var i=0; i<numOfCallbacks; i++) {
                        var listener = util.Event.listeners[type][i];
                        if(listener.scope == scope && listener.callback == callback) {

                        } else {
                            newArray.push(listener);
                        }
                    }
                    util.Event.listeners[type] = newArray;
                }
            },
            hasEventListener:function(type, callback, scope) {
                if(typeof util.Event.listeners[type] != "undefined") {
                    var numOfCallbacks = util.Event.listeners[type].length;
                    if(callback === undefined && scope === undefined){
                        return numOfCallbacks > 0;
                    }
                    for(var i=0; i<numOfCallbacks; i++) {
                        var listener = util.Event.listeners[type][i];
                        if(listener.scope == scope && listener.callback == callback) {
                            return true;
                        }
                    }
                }
                return false;
            },
            dispatch:function(type, target) {
                var numOfListeners = 0;
                var event = {
                    type:type,
                    target:target
                };
                var args = [];
                var numOfArgs = arguments.length;
                for(var i=0; i<numOfArgs; i++){
                    args.push(arguments[i]);
                }
                args = args.length > 2 ? args.splice(2, args.length-1) : [];
                args = [event].concat(args);
                if(typeof util.Event.listeners[type] != "undefined") {
                    var numOfCallbacks = util.Event.listeners[type].length;
                    for(var i=0; i<numOfCallbacks; i++) {
                        var listener = util.Event.listeners[type][i];
                        if(listener && listener.callback) {
                            var concatArgs = args.concat(listener.args);
                            listener.callback.apply(listener.scope, concatArgs);
                            numOfListeners += 1;
                        }
                    }
                }
            },
            getEvents:function() {
                var str = "";
                for(var type in util.Event.listeners) {
                    var numOfCallbacks = util.Event.listeners[type].length;
                    for(var i=0; i<numOfCallbacks; i++) {
                        var listener = util.Event.listeners[type][i];
                        str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
                        str += " listen for '" + type + "'\n";
                    }
                }
                return str;
            }
        },

        RAF: _RAF



	};
    return util;
});