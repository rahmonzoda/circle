;(function (window) {
    'use strict';

    var defaultOptions = {
        angleX:        140,
        angleY:        140,
        deg:           360,
        start: true
    };

    function Circle (els, options) {
        this.options = extend({}, defaultOptions, options);
        this.els = qsa(els);

        this.init();
    }

    Circle.prototype.setOptions = function (options) {
        this.options = extend({}, defaultOptions, options);
        return this.options;
    };

    Circle.prototype.init = function () {
        var that = this;

        Array.prototype.forEach.call(this.els, function(el, i){
            el.setAttribute('data-circle', i);

            if ( that.options.start ) {
                that.start(i+1);
            }

        });
    };

    Circle.prototype.start = function(n) {
        var that = this,
            n = n || 0;

        Array.prototype.forEach.call(this.els, function(el, i){
            var left, top;

            top = that.getTop( i - n );
            left = that.getLeft( i - n );

            el.style.position = 'absolute';
            el.style.top = top + 'px';
            el.style.left = left + 'px';
        });
    };

    Circle.prototype.destroy = function() {
        Array.prototype.forEach.call(this.els, function(el, i){
            el.style.top  = '0';
            el.style.left = '0';
        });
    };

    Circle.prototype.getLeft = function(val) {
        var options = this.options;
        var frags = options.deg / this.els.length;

        return Math.round( ( options.angleX * Math.sin( (frags / 180) * val * Math.PI ) ) + options.angleX );
    };

    Circle.prototype.getTop = function(val) {
        var options = this.options;
        var frags = options.deg / this.els.length;

        return Math.round( -( options.angleY * Math.cos( (frags / 180) * val * Math.PI ) ) + options.angleY );
    };

    window.Circle = Circle;

    function qs(el, scope) {
        return (scope || document).querySelector(el);
    }

    function qsa(el, scope) {
        return (scope || document).querySelectorAll(el);
    }

    var extend = function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                out[key] = arguments[i][key];
            }
        }

        return out;
    };


}(window));
