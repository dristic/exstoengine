/* Tooltip.js
 *
 * The tooltip namespace, which allows us to draw a tooltip to the screen.
 *
 * Created June 6th, 2011
 * By Nicolas Patrick Breidinger
 */
 
var tooltip = function () {
    var id = 'tooltip';
    var top = 3;
    var left = 3;
    var maxWidth = 300;
    var speed = 10;
    var timer = 20;
    var finalAlpha = 90;
    var currentAlpha = 0;
    var dom;
    var domTop;
    var domContent;
    var domBottom;
    var domHeight;
    var ie = document.all ? true : false;

    return {
        show: function (message, width) {
            if (dom == null) {
                dom = document.createElement('div');
                dom.setAttribute('id', id);
                domTop = document.createElement('div');
                domTop.setAttribute('id', id + '-top');
                domContent = document.createElement('div');
                domContent.setAttribute('id', id + '-content');
                domBottom = document.createElement('div');
                domBottom.setAttribute('id', id + '-bottom');
                dom.appendChild(domTop);
                dom.appendChild(domContent);
                dom.appendChild(domBottom);
                document.body.appendChild(dom);
                dom.style.opacity = 0;
                dom.style.filter = 'alpha(opacity=0)';
                document.onmousemove = this.pos;
            }
            dom.style.display = 'block';
            domContent.innerHTML = message;
            dom.style.width = width ? width + 'px' : 'auto';
            if (!width && ie) {
                domTop.style.display = 'none';
                domBottom.style.display = 'none';
                dom.style.width = dom.offsetWidth;
                domTop.style.display = 'block';
                domBottom.style.display = 'block';
            }
            if (dom.offsetWidth > maxWidth) {
                dom.style.width = maxWidth + 'px';
            }
            domHeight = parseInt(dom.offsetHeight) + top;
            clearInterval(dom.timer);
            dom.timer = setInterval(function () { tooltip.fade(1) }, timer);
        },

        hide: function () {
            clearInterval(dom.timer);
            dom.timer = setInterval(function () { tooltip.fade(-1) }, timer);
        },

        pos: function (element) {
            var u = ie ? event.clientY + document.documentElement.scrollTop : element.pageY;
            var l = ie ? event.clientX + document.documentElement.scrollLeft : element.pageX;
            dom.style.top = (u - domHeight) + 'px';
            dom.style.left = (l + left) + 'px';
        },

        fade: function (value) {
            if ((currentAlpha < finalAlpha && value > 0) || (currentAlpha > 0 && value < 0)) {
                currentAlpha = currentAlpha + (speed * value);
                currentAlpha = trimToBounds(currentAlpha, 0, finalAlpha);
                dom.style.opacity = currentAlpha * 0.01;
                dom.style.filter = 'alpha(opacity=' + currentAlpha + ')';
            } else {
                clearInterval(dom.timer);
                if (value < 0) {
                    dom.style.display = 'none'; 
                }
            }
        }
    };
} ();

function trimToBounds(input, lowBound, highBound) {
    if(input < lowBound) {
        return lowBound;
    } else if (input > highBound) {
        return highBound;
    } else {
        return input;
    }
};