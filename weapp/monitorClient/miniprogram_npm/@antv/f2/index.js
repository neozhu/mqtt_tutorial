module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578656684306, function(require, module, exports) {


/**
 * Default, without interactins
 */
var F2 = require('./core');

require('./geom/');

require('./geom/adjust/');

require('./coord/polar'); // polar coordinate


require('./component/axis/circle'); // the axis for polar coordinate


require('./scale/time-cat'); // timeCat scale


require('./component/guide/arc');

require('./component/guide/html');

require('./component/guide/line');

require('./component/guide/rect');

require('./component/guide/text');

require('./component/guide/tag');

require('./component/guide/point');

var Tooltip = require('./plugin/tooltip');

var Guide = require('./plugin/guide');

var Legend = require('./plugin/legend');

var Animation = require('./animation/detail');

F2.Animate = require('./animation/animate'); // register plugins

F2.Chart.plugins.register([Tooltip, Legend, Guide, Animation]);
module.exports = F2;
}, function(modId) {var map = {"./core":1578656684307,"./geom/":1578656684353,"./geom/adjust/":1578656684369,"./coord/polar":1578656684373,"./component/axis/circle":1578656684374,"./scale/time-cat":1578656684375,"./component/guide/arc":1578656684376,"./component/guide/html":1578656684378,"./component/guide/line":1578656684379,"./component/guide/rect":1578656684380,"./component/guide/text":1578656684381,"./component/guide/tag":1578656684382,"./component/guide/point":1578656684383,"./plugin/tooltip":1578656684384,"./plugin/guide":1578656684389,"./plugin/legend":1578656684390,"./animation/detail":1578656684391,"./animation/animate":1578656684395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684307, function(require, module, exports) {


var Core = {};

var Global = require('./global');

Core.Global = Global;
Core.version = Global.version;
Core.Chart = require('./chart/chart');
Core.Shape = require('./geom/shape/shape');
Core.G = require('./graphic/index');
Core.Util = require('./util/common'); // Core.track = function(enable) {
//   Global.trackable = enable;
// };
// require('./track');
// 2018-12-27 关闭打点

Core.track = function () {
  return null;
};

module.exports = Core;
}, function(modId) { var map = {"./global":1578656684308,"./chart/chart":1578656684312,"./geom/shape/shape":1578656684324,"./graphic/index":1578656684331,"./util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684308, function(require, module, exports) {


var Theme = require('./theme');

var Util = require('./util/common');

var Global = {
  version: '3.5.0-beta.6',
  scales: {},
  widthRatio: {
    column: 1 / 2,
    rose: 0.999999,
    multiplePie: 3 / 4
  },
  lineDash: [4, 4]
};

Global.setTheme = function (theme) {
  Util.deepMix(this, theme);
};

Global.setTheme(Theme);
module.exports = Global;
}, function(modId) { var map = {"./theme":1578656684309,"./util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684309, function(require, module, exports) {


/**
 * @fileOverview default theme
 * @author dxq613@gail.com
 */
var Util = require('./util/common');

var color1 = '#E8E8E8'; // color of axis-line and axis-grid

var color2 = '#808080'; // color of axis label

var defaultAxis = {
  label: {
    fill: color2,
    fontSize: 10
  },
  line: {
    stroke: color1,
    lineWidth: 1
  },
  grid: {
    type: 'line',
    stroke: color1,
    lineWidth: 1,
    lineDash: [2]
  },
  tickLine: null,
  labelOffset: 7.5
};
var Theme = {
  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
  defaultColor: '#1890FF',
  pixelRatio: 1,
  padding: 'auto',
  appendPadding: 15,
  colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
  shapes: {
    line: ['line', 'dash'],
    point: ['circle', 'hollowCircle']
  },
  sizes: [4, 10],
  axis: {
    common: defaultAxis,
    // common axis configuration
    bottom: Util.mix({}, defaultAxis, {
      grid: null
    }),
    left: Util.mix({}, defaultAxis, {
      line: null
    }),
    right: Util.mix({}, defaultAxis, {
      line: null
    }),
    circle: Util.mix({}, defaultAxis, {
      line: null
    }),
    radius: Util.mix({}, defaultAxis, {
      labelOffset: 4
    })
  },
  shape: {
    line: {
      lineWidth: 2,
      lineJoin: 'round',
      lineCap: 'round'
    },
    point: {
      lineWidth: 0,
      size: 3
    },
    area: {
      fillOpacity: 0.1
    }
  },
  _defaultAxis: defaultAxis
};
module.exports = Theme;
}, function(modId) { var map = {"./util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684310, function(require, module, exports) {


/**
 * @fileOverview Utility for F2
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
var DomUtil = require('./dom');

var Util = {
  upperFirst: require('@antv/util/lib/string/upper-first'),
  lowerFirst: require('@antv/util/lib/string/lower-first'),
  isString: require('@antv/util/lib/type/is-string'),
  isNumber: require('@antv/util/lib/type/is-number'),
  isBoolean: require('@antv/util/lib/type/is-boolean'),
  isFunction: require('@antv/util/lib/type/is-function'),
  isDate: require('@antv/util/lib/type/is-date'),
  isArray: require('@antv/util/lib/type/is-array'),
  isNil: require('@antv/util/lib/type/is-nil'),
  isObject: require('@antv/util/lib/type/is-object'),
  isPlainObject: require('@antv/util/lib/type/is-plain-object'),
  deepMix: require('@antv/util/lib/deep-mix'),
  mix: require('@antv/util/lib/mix'),
  each: require('@antv/util/lib/each'),
  uniq: require('@antv/util/lib/array/uniq'),
  isObjectValueEqual: function isObjectValueEqual(a, b) {
    // for vue.js
    a = Object.assign({}, a);
    b = Object.assign({}, b);
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (var i = 0, len = aProps.length; i < len; i++) {
      var propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  },
  wrapBehavior: function wrapBehavior(obj, action) {
    if (obj['_wrap_' + action]) {
      return obj['_wrap_' + action];
    }

    var method = function method(e) {
      obj[action](e);
    };

    obj['_wrap_' + action] = method;
    return method;
  },
  getWrapBehavior: function getWrapBehavior(obj, action) {
    return obj['_wrap_' + action];
  },
  parsePadding: function parsePadding(padding) {
    var top;
    var right;
    var bottom;
    var left;

    if (Util.isNumber(padding) || Util.isString(padding)) {
      top = bottom = left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    }

    return [top, right, bottom, left];
  },
  directionEnabled: function directionEnabled(mode, dir) {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
  }
};
Util.Array = {
  merge: function merge(dataArray) {
    var rst = [];

    for (var i = 0, len = dataArray.length; i < len; i++) {
      rst = rst.concat(dataArray[i]);
    }

    return rst;
  },
  values: function values(data, name) {
    var rst = [];
    var tmpMap = {};

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];

      if (!Util.isNil(value)) {
        if (!Util.isArray(value)) {
          if (!tmpMap[value]) {
            rst.push(value);
            tmpMap[value] = true;
          }
        } else {
          Util.each(value, function (val) {
            if (!tmpMap[val]) {
              rst.push(val);
              tmpMap[val] = true;
            }
          });
        }
      }
    }

    return rst;
  },
  firstValue: function firstValue(data, name) {
    var rst = null;

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];

      if (!Util.isNil(value)) {
        if (Util.isArray(value)) {
          rst = value[0];
        } else {
          rst = value;
        }

        break;
      }
    }

    return rst;
  },
  group: function group(data, fields, appendConditions) {
    if (appendConditions === void 0) {
      appendConditions = {};
    }

    if (!fields) {
      return [data];
    }

    var groups = Util.Array.groupToMap(data, fields);
    var array = [];

    if (fields.length === 1 && appendConditions[fields[0]]) {
      var values = appendConditions[fields[0]];
      Util.each(values, function (value) {
        value = '_' + value;
        array.push(groups[value]);
      });
    } else {
      for (var i in groups) {
        array.push(groups[i]);
      }
    }

    return array;
  },
  groupToMap: function groupToMap(data, fields) {
    if (!fields) {
      return {
        0: data
      };
    }

    var callback = function callback(row) {
      var unique = '_';

      for (var i = 0, l = fields.length; i < l; i++) {
        unique += row[fields[i]] && row[fields[i]].toString();
      }

      return unique;
    };

    var groups = {};

    for (var i = 0, len = data.length; i < len; i++) {
      var row = data[i];
      var key = callback(row);

      if (groups[key]) {
        groups[key].push(row);
      } else {
        groups[key] = [row];
      }
    }

    return groups;
  },
  remove: function remove(arr, obj) {
    if (!arr) {
      return;
    }

    var index = arr.indexOf(obj);

    if (index !== -1) {
      arr.splice(index, 1);
    }
  },
  getRange: function getRange(values) {
    if (!values.length) {
      return {
        min: 0,
        max: 0
      };
    }

    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);
    return {
      min: min,
      max: max
    };
  }
};
Util.mix(Util, DomUtil);
module.exports = Util;
}, function(modId) { var map = {"./dom":1578656684311}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684311, function(require, module, exports) {


var DomUtil;
/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */

var supportsEventListenerOptions = function () {
  var supports = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        supports = true;
      }
    });
    window.addEventListener('e', null, options);
  } catch (e) {// continue regardless of error
  }

  return supports;
}(); // Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
// https://github.com/chartjs/Chart.js/issues/4287


var eventListenerOptions = supportsEventListenerOptions ? {
  passive: true
} : false;

function createEvent(type, chart, x, y, nativeEvent) {
  return {
    type: type,
    chart: chart,
    "native": nativeEvent || null,
    x: x !== undefined ? x : null,
    y: y !== undefined ? y : null
  };
}

function fromNativeEvent(event, chart) {
  var type = event.type;
  var clientPoint; // 说明是touch相关事件

  if (event.touches) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/changedTouches
    // 这里直接拿changedTouches就可以了，不管是touchstart, touchmove, touchend changedTouches 都是有的
    // 为了以防万一，做个空判断
    var touch = event.changedTouches[0] || {}; // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置

    var x = touch.x,
        y = touch.y,
        clientX = touch.clientX,
        clientY = touch.clientY; // 小程序环境会有x,y，这里就直接返回

    if (x && y) {
      return createEvent(type, chart, x, y, event);
    }

    clientPoint = {
      x: clientX,
      y: clientY
    };
  } else {
    // mouse相关事件
    clientPoint = {
      x: event.clientX,
      y: event.clientY
    };
  } // 理论上应该是只有有在浏览器环境才会走到这里


  var canvas = chart.get('canvas'); // 通过clientX, clientY 计算x, y

  var point = DomUtil.getRelativePosition(clientPoint, canvas);
  return createEvent(type, chart, point.x, point.y, event);
}

DomUtil = {
  /* global wx, my */
  isWx: typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function',
  // weixin miniprogram
  isMy: typeof my === 'object' && typeof my.getSystemInfoSync === 'function',
  // ant miniprogram
  isNode: typeof module !== 'undefined' && typeof module.exports !== 'undefined',
  // in node
  isBrowser: typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.sessionStorage !== 'undefined',
  // in browser
  isCanvasElement: function isCanvasElement(el) {
    if (!el || typeof el !== 'object') return false;

    if (el.nodeType === 1 && el.nodeName) {
      // HTMLCanvasElement
      return true;
    } // CanvasElement


    return !!el.isCanvasElement;
  },
  getPixelRatio: function getPixelRatio() {
    return window && window.devicePixelRatio || 1;
  },
  getStyle: function getStyle(el, property) {
    return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
  },
  getWidth: function getWidth(el) {
    var width = this.getStyle(el, 'width');

    if (width === 'auto') {
      width = el.offsetWidth;
    }

    return parseFloat(width);
  },
  getHeight: function getHeight(el) {
    var height = this.getStyle(el, 'height');

    if (height === 'auto') {
      height = el.offsetHeight;
    }

    return parseFloat(height);
  },
  getDomById: function getDomById(id) {
    if (!id) {
      return null;
    }

    return document.getElementById(id);
  },
  getRelativePosition: function getRelativePosition(point, canvas) {
    var canvasDom = canvas.get('el');

    var _canvasDom$getBoundin = canvasDom.getBoundingClientRect(),
        top = _canvasDom$getBoundin.top,
        right = _canvasDom$getBoundin.right,
        bottom = _canvasDom$getBoundin.bottom,
        left = _canvasDom$getBoundin.left;

    var paddingLeft = parseFloat(this.getStyle(canvasDom, 'padding-left'));
    var paddingTop = parseFloat(this.getStyle(canvasDom, 'padding-top'));
    var paddingRight = parseFloat(this.getStyle(canvasDom, 'padding-right'));
    var paddingBottom = parseFloat(this.getStyle(canvasDom, 'padding-bottom'));
    var width = right - left - paddingLeft - paddingRight;
    var height = bottom - top - paddingTop - paddingBottom;
    var pixelRatio = canvas.get('pixelRatio');
    var mouseX = (point.x - left - paddingLeft) / width * canvasDom.width / pixelRatio;
    var mouseY = (point.y - top - paddingTop) / height * canvasDom.height / pixelRatio;
    return {
      x: mouseX,
      y: mouseY
    };
  },
  addEventListener: function addEventListener(source, type, listener) {
    source.addEventListener(type, listener, eventListenerOptions);
  },
  removeEventListener: function removeEventListener(source, type, listener) {
    source.removeEventListener(type, listener, eventListenerOptions);
  },
  createEvent: function createEvent(event, chart) {
    return fromNativeEvent(event, chart);
  },
  measureText: function measureText(text, font, ctx) {
    if (!ctx) {
      ctx = document.createElement('canvas').getContext('2d');
    }

    ctx.font = font || '12px sans-serif';
    return ctx.measureText(text);
  }
};
module.exports = DomUtil;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684312, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Base = require('../base');

var Plot = require('./plot');

var Util = require('../util/common');

var Coord = require('../coord/index');

var Geom = require('../geom/base');

var ScaleController = require('./controller/scale');

var AxisController = require('./controller/axis');

var Global = require('../global');

var _require = require('../graphic/index'),
    Canvas = _require.Canvas;

var Helper = require('../util/helper');

function isFullCircle(coord) {
  var startAngle = coord.startAngle;
  var endAngle = coord.endAngle;

  if (!Util.isNil(startAngle) && !Util.isNil(endAngle) && endAngle - startAngle < Math.PI * 2) {
    return false;
  }

  return true;
}

function compare(a, b) {
  return a - b;
}

function _isScaleExist(scales, compareScale) {
  var flag = false;
  Util.each(scales, function (scale) {
    var scaleValues = [].concat(scale.values);
    var compareScaleValues = [].concat(compareScale.values);

    if (scale.type === compareScale.type && scale.field === compareScale.field && scaleValues.sort(compare).toString() === compareScaleValues.sort(compare).toString()) {
      flag = true;
      return;
    }
  });
  return flag;
}

var Chart =
/*#__PURE__*/
function (_Base) {
  (0, _inheritsLoose2["default"])(Chart, _Base);

  Chart.initPlugins = function initPlugins() {
    return {
      _plugins: [],
      _cacheId: 0,
      register: function register(plugins) {
        var p = this._plugins;
        [].concat(plugins).forEach(function (plugin) {
          if (p.indexOf(plugin) === -1) {
            p.push(plugin);
          }
        });
        this._cacheId++;
      },
      unregister: function unregister(plugins) {
        var p = this._plugins;
        [].concat(plugins).forEach(function (plugin) {
          var idx = p.indexOf(plugin);

          if (idx !== -1) {
            p.splice(idx, 1);
          }
        });
        this._cacheId++;
      },
      clear: function clear() {
        this._plugins = [];
        this._cacheId++;
      },
      count: function count() {
        return this._plugins.length;
      },
      getAll: function getAll() {
        return this._plugins;
      },
      notify: function notify(chart, hook, args) {
        var descriptors = this.descriptors(chart);
        var ilen = descriptors.length;
        var i;
        var descriptor;
        var plugin;
        var params;
        var method;

        for (i = 0; i < ilen; ++i) {
          descriptor = descriptors[i];
          plugin = descriptor.plugin;
          method = plugin[hook];

          if (typeof method === 'function') {
            params = [chart].concat(args || []);

            if (method.apply(plugin, params) === false) {
              return false;
            }
          }
        }

        return true;
      },
      descriptors: function descriptors(chart) {
        var cache = chart._plugins || (chart._plugins = {});

        if (cache.id === this._cacheId) {
          return cache.descriptors;
        }

        var plugins = [];
        var descriptors = [];

        this._plugins.concat(chart && chart.get('plugins') || []).forEach(function (plugin) {
          var idx = plugins.indexOf(plugin);

          if (idx !== -1) {
            return;
          }

          plugins.push(plugin);
          descriptors.push({
            plugin: plugin
          });
        });

        cache.descriptors = descriptors;
        cache.id = this._cacheId;
        return descriptors;
      }
    };
  };

  var _proto = Chart.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * the id of canvas
       * @type {String}
       */
      id: null,

      /**
       * padding
       * @type {Array|Number}
       */
      padding: Global.padding,

      /**
       * data
       * @type {Array}
       */
      data: null,

      /**
       * scales of chart
       * @type {Object}
       */
      scales: {},

      /**
       * @private
       * geometry instances
       * @type {Array}
       */
      geoms: null,

      /**
       * scale configuration
       * @type {Object}
       */
      colDefs: null,
      pixelRatio: Global.pixelRatio,

      /**
       * filter options
       * @type {Object}
       */
      filters: null,
      appendPadding: Global.appendPadding
    };
  };

  _proto._syncYScales = function _syncYScales() {
    var geoms = this.get('geoms');
    var syncScales = [];
    var min = [];
    var max = [];
    Util.each(geoms, function (geom) {
      var yScale = geom.getYScale();

      if (yScale.isLinear) {
        syncScales.push(yScale);
        min.push(yScale.min);
        max.push(yScale.max);
      }
    });
    min = Math.min.apply(null, min);
    max = Math.max.apply(null, max);
    Util.each(syncScales, function (scale) {
      scale.change({
        min: min
      });
      scale.change({
        max: max
      });
    });
  };

  _proto._getFieldsForLegend = function _getFieldsForLegend() {
    var fields = [];
    var geoms = this.get('geoms');
    Util.each(geoms, function (geom) {
      var attrOptions = geom.get('attrOptions');
      var attrCfg = attrOptions.color;

      if (attrCfg && attrCfg.field && Util.isString(attrCfg.field)) {
        var arr = attrCfg.field.split('*');
        Util.each(arr, function (item) {
          if (fields.indexOf(item) === -1) {
            fields.push(item);
          }
        });
      }
    });
    return fields;
  };

  _proto._createScale = function _createScale(field, data) {
    var scaleController = this.get('scaleController');
    return scaleController.createScale(field, data);
  };

  _proto._adjustScale = function _adjustScale() {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScales = self.getYScales();
    var scales = [];
    xScale && scales.push(xScale);
    scales = scales.concat(yScales);
    var inFullCircle = coord.isPolar && isFullCircle(coord);
    var scaleController = self.get('scaleController');
    var colDefs = scaleController.defs;
    Util.each(scales, function (scale) {
      if ((scale.isCategory || scale.isIdentity) && scale.values && !(colDefs[scale.field] && colDefs[scale.field].range)) {
        var count = scale.values.length;
        var range;

        if (count === 1) {
          range = [0.5, 1];
        } else {
          var widthRatio = 1;
          var offset = 0;

          if (inFullCircle) {
            if (!coord.transposed) {
              range = [0, 1 - 1 / count];
            } else {
              widthRatio = Global.widthRatio.multiplePie;
              offset = 1 / count * widthRatio;
              range = [offset / 2, 1 - offset / 2];
            }
          } else {
            offset = 1 / count * 1 / 2;
            range = [offset, 1 - offset];
          }
        }

        scale.range = range;
      }
    });
    var geoms = this.get('geoms');

    for (var i = 0; i < geoms.length; i++) {
      var geom = geoms[i];

      if (geom.get('type') === 'interval') {
        var yScale = geom.getYScale();
        var field = yScale.field,
            min = yScale.min,
            max = yScale.max,
            type = yScale.type;

        if (!(colDefs[field] && colDefs[field].min) && type !== 'time') {
          if (min > 0) {
            yScale.change({
              min: 0
            });
          } else if (max <= 0) {
            yScale.change({
              max: 0
            });
          }
        }
      }
    }
  };

  _proto._removeGeoms = function _removeGeoms() {
    var geoms = this.get('geoms');

    while (geoms.length > 0) {
      var geom = geoms.shift();
      geom.destroy();
    }
  };

  _proto._clearGeoms = function _clearGeoms() {
    var geoms = this.get('geoms');

    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.clear();
    }
  };

  _proto._clearInner = function _clearInner() {
    this.set('scales', {});
    this.set('legendItems', null);

    this._clearGeoms();

    Chart.plugins.notify(this, 'clearInner');
    this.get('axisController') && this.get('axisController').clear();
  };

  _proto._execFilter = function _execFilter(data) {
    var filters = this.get('filters');

    if (filters) {
      data = data.filter(function (obj) {
        var rst = true;
        Util.each(filters, function (fn, k) {
          if (fn) {
            rst = fn(obj[k], obj);

            if (!rst) {
              return false;
            }
          }
        });
        return rst;
      });
    }

    return data;
  };

  _proto._initGeoms = function _initGeoms(geoms) {
    var coord = this.get('coord');
    var data = this.get('filteredData');
    var colDefs = this.get('colDefs');

    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.set('data', data);
      geom.set('coord', coord);
      geom.set('colDefs', colDefs);
      geom.init();
    }
  };

  _proto._initCoord = function _initCoord() {
    var plot = this.get('plotRange');
    var coordCfg = Util.mix({
      type: 'cartesian'
    }, this.get('coordCfg'), {
      plot: plot
    });
    var type = coordCfg.type;
    var C = Coord[Util.upperFirst(type)];
    var coord = new C(coordCfg);
    this.set('coord', coord);
  };

  _proto._initLayout = function _initLayout() {
    var padding = this.get('_padding');

    if (!padding) {
      padding = this.get('margin') || this.get('padding');
      padding = Util.parsePadding(padding);
    }

    var top = padding[0] === 'auto' ? 0 : padding[0];
    var right = padding[1] === 'auto' ? 0 : padding[1];
    var bottom = padding[2] === 'auto' ? 0 : padding[2];
    var left = padding[3] === 'auto' ? 0 : padding[3];
    var width = this.get('width');
    var height = this.get('height');
    var plot = new Plot({
      start: {
        x: left,
        y: top
      },
      end: {
        x: width - right,
        y: height - bottom
      }
    });
    this.set('plotRange', plot);
    this.set('plot', plot);
  };

  _proto._initCanvas = function _initCanvas() {
    var self = this;

    try {
      var canvas = new Canvas({
        el: self.get('el') || self.get('id'),
        context: self.get('context'),
        pixelRatio: self.get('pixelRatio'),
        width: self.get('width'),
        height: self.get('height'),
        fontFamily: Global.fontFamily
      });
      self.set('canvas', canvas);
      self.set('el', canvas.get('el'));
      self.set('width', canvas.get('width'));
      self.set('height', canvas.get('height'));
    } catch (error) {
      throw error;
    }

    Chart.plugins.notify(self, 'afterCanvasInit');

    self._initLayout();
  };

  _proto._initLayers = function _initLayers() {
    var canvas = this.get('canvas');
    this.set('backPlot', canvas.addGroup());
    this.set('middlePlot', canvas.addGroup({
      zIndex: 10
    }));
    this.set('frontPlot', canvas.addGroup({
      zIndex: 20
    }));
  };

  _proto._init = function _init() {
    var self = this;

    self._initCanvas();

    self._initLayers();

    self.set('geoms', []);
    self.set('scaleController', new ScaleController());
    self.set('axisController', new AxisController({
      frontPlot: self.get('frontPlot').addGroup({
        className: 'axisContainer'
      }),
      backPlot: self.get('backPlot').addGroup({
        className: 'axisContainer'
      }),
      chart: self
    }));
    Chart.plugins.notify(self, 'init');
  };

  function Chart(cfg) {
    var _this;

    _this = _Base.call(this, cfg) || this;
    var self = (0, _assertThisInitialized2["default"])(_this);
    Util.each(Geom, function (geomConstructor, className) {
      var methodName = Util.lowerFirst(className);

      self[methodName] = function (cfg) {
        var geom = new geomConstructor(cfg);
        self.addGeom(geom);
        return geom;
      };
    });

    self._init();

    return _this;
  }
  /**
   * set data and some scale configuration
   * @chainable
   * @param  {Array} data the dataset to visualize
   * @param  {Object} colDefs the configuration for scales
   * @return {Chart} return the chart instance
   */


  _proto.source = function source(data, colDefs) {
    this.set('data', data);

    if (colDefs) {
      this.scale(colDefs);
    }

    return this;
  };

  _proto.scale = function scale(field, cfg) {
    var colDefs = this.get('colDefs') || {};

    if (Util.isObject(field)) {
      Util.mix(colDefs, field);
    } else {
      colDefs[field] = cfg;
    }

    this.set('colDefs', colDefs);
    var scaleController = this.get('scaleController');
    scaleController.defs = colDefs;
    return this;
  }
  /**
   * configure the axis
   * @chainable
   * @param  {String|Boolean} field the field name of data
   * @param  {Object} cfg configuration for axis
   * @return {Chart} return the chart instance
   */
  ;

  _proto.axis = function axis(field, cfg) {
    var axisController = this.get('axisController');

    if (!field) {
      axisController.axisCfg = null;
    } else {
      axisController.axisCfg = axisController.axisCfg || {};
      axisController.axisCfg[field] = cfg;
    }

    return this;
  }
  /**
   * configure the coordinate
   * @chainable
   * @param  {String} type set the type of coodinate
   * @param  {Object} cfg configuration for coordinate
   * @return {Chart} return the chart instance
   */
  ;

  _proto.coord = function coord(type, cfg) {
    var coordCfg;

    if (Util.isObject(type)) {
      coordCfg = type;
    } else {
      coordCfg = cfg || {};
      coordCfg.type = type || 'cartesian';
    }

    this.set('coordCfg', coordCfg);
    return this;
  };

  _proto.filter = function filter(field, condition) {
    var filters = this.get('filters') || {};
    filters[field] = condition;
    this.set('filters', filters);
  }
  /**
   * render the chart
   * @chainable
   * @return {Chart} return the chart instance
   */
  ;

  _proto.render = function render() {
    var canvas = this.get('canvas');
    var geoms = this.get('geoms');
    var data = this.get('data') || [];

    var filteredData = this._execFilter(data); // filter data


    this.set('filteredData', filteredData);

    this._initCoord(); // initialization coordinate instance


    Chart.plugins.notify(this, 'beforeGeomInit');

    this._initGeoms(geoms); // init all geometry instances


    this.get('syncY') && this._syncYScales();

    this._adjustScale(); // do some adjust for data


    Chart.plugins.notify(this, 'beforeGeomDraw');

    this._renderAxis();

    var middlePlot = this.get('middlePlot');

    if (this.get('limitInPlot') && !middlePlot.attr('clip')) {
      var coord = this.get('coord');
      var clip = Helper.getClip(coord);
      clip.set('canvas', middlePlot.get('canvas'));
      middlePlot.attr('clip', clip);
    }

    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.paint();
    }

    Chart.plugins.notify(this, 'afterGeomDraw');
    canvas.sort();
    this.get('frontPlot').sort();
    Chart.plugins.notify(this, 'beforeCanvasDraw');
    canvas.draw();
    return this;
  }
  /**
   * clear the chart, include geometris and all the shapes
   * @chainable
   * @return {Chart} return the chart
   */
  ;

  _proto.clear = function clear() {
    Chart.plugins.notify(this, 'clear');

    this._removeGeoms();

    this._clearInner();

    this.set('filters', null);
    this.set('isUpdate', false);
    this.set('_padding', null);
    var canvas = this.get('canvas');
    canvas.draw();
    return this;
  };

  _proto.repaint = function repaint() {
    this.set('isUpdate', true);
    Chart.plugins.notify(this, 'repaint');

    this._clearInner();

    this.render();
  };

  _proto.changeData = function changeData(data) {
    this.set('data', data);
    Chart.plugins.notify(this, 'changeData');
    this.set('_padding', null);
    this.repaint();
  };

  _proto.changeSize = function changeSize(width, height) {
    if (width) {
      this.set('width', width);
    } else {
      width = this.get('width');
    }

    if (height) {
      this.set('height', height);
    } else {
      height = this.get('height');
    }

    var canvas = this.get('canvas');
    canvas.changeSize(width, height);

    this._initLayout();

    this.repaint();
    return this;
  };

  _proto.destroy = function destroy() {
    this.clear();
    var canvas = this.get('canvas');
    canvas.destroy();
    Chart.plugins.notify(this, 'afterCanvasDestroyed');

    if (this._interactions) {
      Util.each(this._interactions, function (interaction) {
        interaction.destroy();
      });
    }

    _Base.prototype.destroy.call(this);
  }
  /**
   * calculate dataset's position on canvas
   * @param  {Object} record the dataset
   * @return {Object} return the position
   */
  ;

  _proto.getPosition = function getPosition(record) {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScale = self.getYScales()[0];
    var xField = xScale.field;
    var x = xScale.scale(record[xField]);
    var yField = yScale.field;
    var y = yScale.scale(record[yField]);
    return coord.convertPoint({
      x: x,
      y: y
    });
  }
  /**
   * get the data item of the point
   * @param  {Object} point canvas position
   * @return {Object} return the data item
   */
  ;

  _proto.getRecord = function getRecord(point) {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScale = self.getYScales()[0];
    var invertPoint = coord.invertPoint(point);
    var record = {};
    record[xScale.field] = xScale.invert(invertPoint.x);
    record[yScale.field] = yScale.invert(invertPoint.y);
    return record;
  }
  /**
   * get the dataset of the point
   * @param  {Object} point canvas position
   * @return {Array} return the dataset
  **/
  ;

  _proto.getSnapRecords = function getSnapRecords(point) {
    var geom = this.get('geoms')[0];
    var data = [];

    if (geom) {
      // need to judge
      data = geom.getSnapRecords(point);
    }

    return data;
  }
  /**
   * creat scale instances
   * @param  {String} field field name of data
   * @return {Scale} return the scale
   */
  ;

  _proto.createScale = function createScale(field) {
    var data = this.get('data');
    var filteredData = this.get('filteredData');

    if (filteredData.length) {
      var legendFields = this._getFieldsForLegend();

      if (legendFields.indexOf(field) === -1) {
        data = filteredData;
      }
    }

    var scales = this.get('scales');

    if (!scales[field]) {
      scales[field] = this._createScale(field, data);
    }

    return scales[field];
  }
  /**
   * @protected
   * add geometry instance to geoms
   * @param {Geom} geom geometry instance
   */
  ;

  _proto.addGeom = function addGeom(geom) {
    var geoms = this.get('geoms');
    var middlePlot = this.get('middlePlot');
    geoms.push(geom);
    geom.set('chart', this);
    geom.set('container', middlePlot.addGroup());
  }
  /**
   * get the scale of x axis
   * @return {Scale} return the scale
   */
  ;

  _proto.getXScale = function getXScale() {
    var self = this;
    var geoms = self.get('geoms');
    var xScale = geoms[0].getXScale();
    return xScale;
  }
  /**
   * get the scale of y axis
   * @return {Array} return the scale
   */
  ;

  _proto.getYScales = function getYScales() {
    var geoms = this.get('geoms');
    var rst = [];
    Util.each(geoms, function (geom) {
      var yScale = geom.getYScale();

      if (rst.indexOf(yScale) === -1) {
        rst.push(yScale);
      }
    });
    return rst;
  };

  _proto.getLegendItems = function getLegendItems() {
    if (this.get('legendItems')) {
      return this.get('legendItems');
    }

    var legendItems = {};
    var scales = [];
    var geoms = this.get('geoms');
    Util.each(geoms, function (geom) {
      var colorAttr = geom.getAttr('color');

      if (colorAttr) {
        var scale = colorAttr.getScale('color'); // 只支持分类图例

        if (scale.isCategory && !_isScaleExist(scales, scale)) {
          scales.push(scale);
          var field = scale.field;
          var ticks = scale.getTicks();
          var items = [];
          Util.each(ticks, function (tick) {
            var text = tick.text;
            var name = text;
            var scaleValue = tick.value;
            var value = scale.invert(scaleValue);
            var color = colorAttr.mapping(value).join('') || Global.defaultColor;
            var marker = {
              fill: color,
              radius: 3,
              symbol: 'circle',
              stroke: '#fff'
            };
            items.push({
              name: name,
              // for display
              dataValue: value,
              // the origin value
              checked: true,
              marker: marker
            });
          });
          legendItems[field] = items;
        }
      }
    });
    this.set('legendItems', legendItems);
    return legendItems;
  } // register the plugins
  ;

  _proto.registerPlugins = function registerPlugins(plugins) {
    var self = this;
    var chartPlugins = self.get('plugins') || [];

    if (!Util.isArray(chartPlugins)) {
      chartPlugins = [chartPlugins];
    }

    [].concat(plugins).forEach(function (plugin) {
      if (chartPlugins.indexOf(plugin) === -1) {
        plugin.init && plugin.init(self); // init

        chartPlugins.push(plugin);
      }
    });
    Chart.plugins._cacheId++;
    self.set('plugins', chartPlugins);
  };

  _proto._renderAxis = function _renderAxis() {
    var axisController = this.get('axisController');
    var xScale = this.getXScale();
    var yScales = this.getYScales();
    var coord = this.get('coord');
    Chart.plugins.notify(this, 'beforeRenderAxis');
    axisController.createAxis(coord, xScale, yScales);
  };

  _proto._isAutoPadding = function _isAutoPadding() {
    if (this.get('_padding')) {
      return false;
    }

    var padding = this.get('padding');

    if (Util.isArray(padding)) {
      return padding.indexOf('auto') !== -1;
    }

    return padding === 'auto';
  };

  _proto._updateLayout = function _updateLayout(padding) {
    var width = this.get('width');
    var height = this.get('height');
    var start = {
      x: padding[3],
      y: padding[0]
    };
    var end = {
      x: width - padding[1],
      y: height - padding[2]
    };
    var plot = this.get('plot');
    var coord = this.get('coord');
    plot.reset(start, end);
    coord.reset(plot);
  };

  return Chart;
}(Base);

Chart.plugins = Chart.initPlugins();
module.exports = Chart;
}, function(modId) { var map = {"../base":1578656684313,"./plot":1578656684314,"../util/common":1578656684310,"../coord/index":1578656684315,"../geom/base":1578656684320,"./controller/scale":1578656684325,"./controller/axis":1578656684327,"../global":1578656684308,"../graphic/index":1578656684331,"../util/helper":1578656684352}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684313, function(require, module, exports) {


/**
 * @fileOverview Base class of chart and geometry
 * @author dxq613@gmail.com
 */
var Util = require('./util/common');

var Base =
/*#__PURE__*/
function () {
  var _proto = Base.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {};
  };

  function Base(cfg) {
    var attrs = {};
    var defaultCfg = this.getDefaultCfg();
    this._attrs = attrs;
    Util.mix(attrs, defaultCfg, cfg);
  }

  _proto.get = function get(name) {
    return this._attrs[name];
  };

  _proto.set = function set(name, value) {
    this._attrs[name] = value;
  };

  _proto.destroy = function destroy() {
    this._attrs = {};
    this.destroyed = true;
  };

  return Base;
}();

module.exports = Base;
}, function(modId) { var map = {"./util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684314, function(require, module, exports) {


var Util = require('../util/common');

var Plot =
/*#__PURE__*/
function () {
  function Plot(cfg) {
    Util.mix(this, cfg);

    this._init();
  }

  var _proto = Plot.prototype;

  _proto._init = function _init() {
    var self = this;
    var start = self.start;
    var end = self.end;
    var xMin = Math.min(start.x, end.x);
    var xMax = Math.max(start.x, end.x);
    var yMin = Math.min(start.y, end.y);
    var yMax = Math.max(start.y, end.y);
    this.tl = {
      x: xMin,
      y: yMin
    };
    this.tr = {
      x: xMax,
      y: yMin
    };
    this.bl = {
      x: xMin,
      y: yMax
    };
    this.br = {
      x: xMax,
      y: yMax
    };
    this.width = xMax - xMin;
    this.height = yMax - yMin;
  }
  /**
   * reset
   * @param  {Object} start start point
   * @param  {Object} end end point
   */
  ;

  _proto.reset = function reset(start, end) {
    this.start = start;
    this.end = end;

    this._init();
  }
  /**
   * check the point is in the range of plot
   * @param  {Nubmer}  x x value
   * @param  {[type]}  y y value
   * @return {Boolean} return the result
   */
  ;

  _proto.isInRange = function isInRange(x, y) {
    if (Util.isObject(x)) {
      y = x.y;
      x = x.x;
    }

    var tl = this.tl;
    var br = this.br;
    return tl.x <= x && x <= br.x && tl.y <= y && y <= br.y;
  };

  return Plot;
}();

module.exports = Plot;
}, function(modId) { var map = {"../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684315, function(require, module, exports) {


var Coord = require('./base');

require('./cartesian');

module.exports = Coord;
}, function(modId) { var map = {"./base":1578656684316,"./cartesian":1578656684319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684316, function(require, module, exports) {


var Util = require('../util/common');

var MatrixUtil = require('../graphic/util/matrix');

var Vector2 = require('../graphic/util/vector2');

var defaultMatrix = [1, 0, 0, 1, 0, 0];

var Base =
/*#__PURE__*/
function () {
  var _proto = Base.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {};

  function Base(cfg) {
    this._initDefaultCfg();

    Util.mix(this, cfg);
    var start;
    var end;

    if (this.plot) {
      start = this.plot.bl;
      end = this.plot.tr;
      this.start = start;
      this.end = end;
    } else {
      start = this.start;
      end = this.end;
    }

    this.init(start, end);
  }

  _proto._scale = function _scale(s1, s2) {
    var matrix = this.matrix;
    var center = this.center;
    MatrixUtil.translate(matrix, matrix, [center.x, center.y]);
    MatrixUtil.scale(matrix, matrix, [s1, s2]);
    MatrixUtil.translate(matrix, matrix, [-center.x, -center.y]);
  };

  _proto.init = function init(start, end) {
    this.matrix = [].concat(defaultMatrix); // 设置中心点

    this.center = {
      x: (end.x - start.x) / 2 + start.x,
      y: (end.y - start.y) / 2 + start.y
    };

    if (this.scale) {
      this._scale(this.scale[0], this.scale[1]);
    }
  };

  _proto.convertPoint = function convertPoint(point) {
    var _this$_convertPoint = this._convertPoint(point),
        x = _this$_convertPoint.x,
        y = _this$_convertPoint.y;

    var vector = [x, y];
    Vector2.transformMat2d(vector, vector, this.matrix);
    return {
      x: vector[0],
      y: vector[1]
    };
  };

  _proto.invertPoint = function invertPoint(point) {
    return this._invertPoint(point);
  };

  _proto._convertPoint = function _convertPoint(point) {
    return point;
  };

  _proto._invertPoint = function _invertPoint(point) {
    return point;
  };

  _proto.reset = function reset(plot) {
    this.plot = plot;
    var bl = plot.bl,
        tr = plot.tr;
    this.start = bl;
    this.end = tr;
    this.init(bl, tr);
  };

  return Base;
}();

module.exports = Base;
}, function(modId) { var map = {"../util/common":1578656684310,"../graphic/util/matrix":1578656684317,"../graphic/util/vector2":1578656684318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684317, function(require, module, exports) {


var Matrix = {
  multiply: function multiply(m1, m2) {
    var m11 = m1[0] * m2[0] + m1[2] * m2[1];
    var m12 = m1[1] * m2[0] + m1[3] * m2[1];
    var m21 = m1[0] * m2[2] + m1[2] * m2[3];
    var m22 = m1[1] * m2[2] + m1[3] * m2[3];
    var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    return [m11, m12, m21, m22, dx, dy];
  },
  scale: function scale(out, m, v) {
    out[0] = m[0] * v[0];
    out[1] = m[1] * v[0];
    out[2] = m[2] * v[1];
    out[3] = m[3] * v[1];
    out[4] = m[4];
    out[5] = m[5];
    return out;
  },
  rotate: function rotate(out, m, radian) {
    var c = Math.cos(radian);
    var s = Math.sin(radian);
    var m11 = m[0] * c + m[2] * s;
    var m12 = m[1] * c + m[3] * s;
    var m21 = m[0] * -s + m[2] * c;
    var m22 = m[1] * -s + m[3] * c;
    out[0] = m11;
    out[1] = m12;
    out[2] = m21;
    out[3] = m22;
    out[4] = m[4];
    out[5] = m[5];
    return out;
  },
  translate: function translate(out, m, v) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4] + m[0] * v[0] + m[2] * v[1];
    out[5] = m[5] + m[1] * v[0] + m[3] * v[1];
    return out;
  },
  transform: function transform(m, actions) {
    var out = [].concat(m);

    for (var i = 0, len = actions.length; i < len; i++) {
      var action = actions[i];

      switch (action[0]) {
        case 't':
          Matrix.translate(out, out, [action[1], action[2]]);
          break;

        case 's':
          Matrix.scale(out, out, [action[1], action[2]]);
          break;

        case 'r':
          Matrix.rotate(out, out, action[1]);
          break;

        default:
          break;
      }
    }

    return out;
  }
};
module.exports = Matrix;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684318, function(require, module, exports) {


/**
 * 2 Dimensional Vector
 * @module vector2
 */
module.exports = {
  /**
   * Creates a new, empty vector2
   *
   * @return {vector2} a new 2D vector
   */
  create: function create() {
    return [0, 0];
  },

  /**
   * Calculates the length of a vector2
   *
   * @param {vector2} v vector to calculate length of
   * @return {Number} length of v
   */
  length: function length(v) {
    var x = v[0];
    var y = v[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Normalize a vector2
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v vector to normalize
   * @return {vector2} out
   */
  normalize: function normalize(out, v) {
    var len = this.length(v);

    if (len === 0) {
      out[0] = 0;
      out[1] = 0;
    } else {
      out[0] = v[0] / len;
      out[1] = v[1] / len;
    }

    return out;
  },

  /**
   * Adds two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  add: function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
  },

  /**
   * Subtracts vector v2 from vector v1
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  sub: function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
  },

  /**
   * Scales a vector2 by a scalar number
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to scale
   * @param {Number} s amount to scale the vector by
   * @return {vector2} out
   */
  scale: function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
  },

  /**
   * Calculates the dot product of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} dot product of v1 and v2
   */
  dot: function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  },

  /**
   * Calculates the direction of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Boolean} the direction of v1 and v2
   */
  direction: function direction(v1, v2) {
    return v1[0] * v2[1] - v2[0] * v1[1];
  },

  /**
   * Calculates the angle of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} angle of v1 and v2
   */
  angle: function angle(v1, v2) {
    var theta = this.dot(v1, v2) / (this.length(v1) * this.length(v2));
    return Math.acos(theta);
  },

  /**
   * Calculates the angle of two vector2's with direction
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @param {Boolean} direction the direction of two vector2's
   * @return {Number} angle of v1 and v2
   */
  angleTo: function angleTo(v1, v2, direction) {
    var angle = this.angle(v1, v2);
    var angleLargeThanPI = this.direction(v1, v2) >= 0;

    if (direction) {
      if (angleLargeThanPI) {
        return Math.PI * 2 - angle;
      }

      return angle;
    }

    if (angleLargeThanPI) {
      return angle;
    }

    return Math.PI * 2 - angle;
  },

  /**
   * whether a vector2 is zero vector
   *
   * @param  {vector2} v vector to calculate
   * @return {Boolean}   is or not a zero vector
   */
  zero: function zero(v) {
    return v[0] === 0 && v[1] === 0;
  },

  /**
   * Calculates the euclidian distance between two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} distance between a and b
   */
  distance: function distance(v1, v2) {
    var x = v2[0] - v1[0];
    var y = v2[1] - v1[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Creates a new vector2 initialized with values from an existing vector
   *
   * @param {vector2} v vector to clone
   * @return {Array} a new 2D vector
   */
  clone: function clone(v) {
    return [v[0], v[1]];
  },

  /**
   * Return the minimum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  min: function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
  },

  /**
   * Return the maximum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  max: function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
  },

  /**
   * Transforms the vector2 with a mat2d
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to transform
   * @param {mat2d} m matrix to transform with
   * @return {vector2} out
   */
  transformMat2d: function transformMat2d(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684319, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Base = require('./base');

var Cartesian =
/*#__PURE__*/
function (_Base) {
  (0, _inheritsLoose2["default"])(Cartesian, _Base);

  function Cartesian() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Cartesian.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'cartesian';
    this.transposed = false;
    this.isRect = true;
  };

  _proto.init = function init(start, end) {
    _Base.prototype.init.call(this, start, end);

    this.x = {
      start: start.x,
      end: end.x
    };
    this.y = {
      start: start.y,
      end: end.y
    };
  };

  _proto._convertPoint = function _convertPoint(point) {
    var self = this;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    return {
      x: x.start + (x.end - x.start) * point[xDim],
      y: y.start + (y.end - y.start) * point[yDim]
    };
  };

  _proto._invertPoint = function _invertPoint(point) {
    var self = this;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    var rst = {};
    rst[xDim] = (point.x - x.start) / (x.end - x.start);
    rst[yDim] = (point.y - y.start) / (y.end - y.start);
    return rst;
  };

  return Cartesian;
}(Base);

Base.Cartesian = Cartesian;
Base.Rect = Cartesian;
module.exports = Cartesian;
}, function(modId) { var map = {"./base":1578656684316}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684320, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../util/common');

var Base = require('../base');

var GROUP_ATTRS = ['color', 'size', 'shape'];
var FIELD_ORIGIN = '_origin';
var FIELD_ORIGIN_Y = '_originY';

var Global = require('../global');

var Attr = require('../attr/index');

var GeometryShape = require('./shape/shape');

var Adjust = require('@antv/adjust/lib/base');

function parseFields(field) {
  if (Util.isArray(field)) {
    return field;
  }

  if (Util.isString(field)) {
    return field.split('*');
  }

  return [field];
}
/**
 * The parent class for Geometry
 * @class Geom
 */


var Geom =
/*#__PURE__*/
function (_Base) {
  (0, _inheritsLoose2["default"])(Geom, _Base);

  function Geom() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Geom.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * geometry type
       * @type {String}
       */
      type: null,

      /**
       * the data of geometry
       * @type {Array}
       */
      data: null,

      /**
       * the attrs of geo,etry
       * @type {Object}
       */
      attrs: {},
      scales: {},

      /**
       * group for storing the shapes
       * @type {Canvas}
       */
      container: null,

      /**
       * style options
       * @type {Object}
       */
      styleOptions: null,
      chart: null,
      shapeType: '',

      /**
       * wether to generate key points for each shape
       * @protected
       * @type {Boolean}
       */
      generatePoints: false,
      attrOptions: {},
      sortable: false,
      startOnZero: true,
      visible: true,
      connectNulls: false,
      // 是否丢弃没有值的分组。
      ignoreEmptyGroup: false
    };
  };

  _proto.init = function init() {
    var self = this;

    self._initAttrs();

    var dataArray = self._processData();

    if (self.get('adjust')) {
      self._adjustData(dataArray);
    }

    self.set('dataArray', dataArray);
  };

  _proto._getGroupScales = function _getGroupScales() {
    var self = this;
    var scales = [];
    Util.each(GROUP_ATTRS, function (attrName) {
      var attr = self.getAttr(attrName);

      if (attr) {
        var attrScales = attr.scales;
        Util.each(attrScales, function (scale) {
          if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
            scales.push(scale);
          }
        });
      }
    });
    return scales;
  };

  _proto._groupData = function _groupData(data) {
    var self = this;
    var colDefs = self.get('colDefs');

    var groupScales = self._getGroupScales();

    if (groupScales.length) {
      var appendConditions = {};
      var names = [];
      Util.each(groupScales, function (scale) {
        var field = scale.field;
        names.push(field);

        if (colDefs && colDefs[field] && colDefs[field].values) {
          // users have defined
          appendConditions[scale.field] = colDefs[field].values;
        }
      });
      return Util.Array.group(data, names, appendConditions);
    }

    return [data];
  };

  _proto._setAttrOptions = function _setAttrOptions(attrName, attrCfg) {
    var options = this.get('attrOptions');
    options[attrName] = attrCfg;
  };

  _proto._createAttrOption = function _createAttrOption(attrName, field, cfg, defaultValues) {
    var attrCfg = {};
    attrCfg.field = field;

    if (cfg) {
      if (Util.isFunction(cfg)) {
        attrCfg.callback = cfg;
      } else {
        attrCfg.values = cfg;
      }
    } else {
      attrCfg.values = defaultValues;
    }

    this._setAttrOptions(attrName, attrCfg);
  };

  _proto._initAttrs = function _initAttrs() {
    var self = this;
    var attrs = self.get('attrs');
    var attrOptions = self.get('attrOptions');
    var coord = self.get('coord');

    for (var type in attrOptions) {
      if (attrOptions.hasOwnProperty(type)) {
        var option = attrOptions[type];
        var className = Util.upperFirst(type);
        var fields = parseFields(option.field);

        if (type === 'position') {
          option.coord = coord;
        }

        var scales = [];

        for (var i = 0, len = fields.length; i < len; i++) {
          var field = fields[i];

          var scale = self._createScale(field);

          scales.push(scale);
        }

        if (type === 'position') {
          var yScale = scales[1];

          if (coord.type === 'polar' && coord.transposed && self.hasAdjust('stack')) {
            if (yScale.values.length) {
              yScale.change({
                nice: false,
                min: 0,
                max: Math.max.apply(null, yScale.values)
              });
            }
          }
        }

        option.scales = scales;
        var attr = new Attr[className](option);
        attrs[type] = attr;
      }
    }
  };

  _proto._createScale = function _createScale(field) {
    var scales = this.get('scales');
    var scale = scales[field];

    if (!scale) {
      scale = this.get('chart').createScale(field);
      scales[field] = scale;
    }

    return scale;
  };

  _proto._processData = function _processData() {
    var self = this;
    var data = this.get('data');
    var dataArray = [];

    var groupedArray = this._groupData(data);

    if (this.get('ignoreEmptyGroup')) {
      var yScale = this.getYScale();
      groupedArray = groupedArray.filter(function (group) {
        return group.some(function (item) {
          return typeof item[yScale.field] !== 'undefined';
        });
      });
    }

    for (var i = 0, len = groupedArray.length; i < len; i++) {
      var subData = groupedArray[i];

      var tempData = self._saveOrigin(subData);

      if (this.hasAdjust('dodge')) {
        self._numberic(tempData);
      }

      dataArray.push(tempData);
    }

    return dataArray;
  };

  _proto._saveOrigin = function _saveOrigin(data) {
    var rst = [];

    for (var i = 0, len = data.length; i < len; i++) {
      var origin = data[i];
      var obj = {};

      for (var k in origin) {
        obj[k] = origin[k];
      }

      obj[FIELD_ORIGIN] = origin;
      rst.push(obj);
    }

    return rst;
  };

  _proto._numberic = function _numberic(data) {
    var positionAttr = this.getAttr('position');
    var scales = positionAttr.scales;

    for (var j = 0, len = data.length; j < len; j++) {
      var obj = data[j];
      var count = Math.min(2, scales.length);

      for (var i = 0; i < count; i++) {
        var scale = scales[i];

        if (scale.isCategory) {
          var field = scale.field;
          obj[field] = scale.translate(obj[field]);
        }
      }
    }
  };

  _proto._adjustData = function _adjustData(dataArray) {
    var self = this;
    var adjust = self.get('adjust');

    if (adjust) {
      var adjustType = Util.upperFirst(adjust.type);

      if (!Adjust[adjustType]) {
        throw new Error('not support such adjust : ' + adjust);
      }

      var xScale = self.getXScale();
      var yScale = self.getYScale();
      var cfg = Util.mix({
        xField: xScale.field,
        yField: yScale.field
      }, adjust);
      var adjustObject = new Adjust[adjustType](cfg);
      adjustObject.processAdjust(dataArray);

      if (adjustType === 'Stack') {
        self._updateStackRange(yScale.field, yScale, dataArray);
      }
    }
  };

  _proto._updateStackRange = function _updateStackRange(field, scale, dataArray) {
    var mergeArray = Util.Array.merge(dataArray);
    var min = scale.min;
    var max = scale.max;

    for (var i = 0, len = mergeArray.length; i < len; i++) {
      var obj = mergeArray[i];
      var tmpMin = Math.min.apply(null, obj[field]);
      var tmpMax = Math.max.apply(null, obj[field]);

      if (tmpMin < min) {
        min = tmpMin;
      }

      if (tmpMax > max) {
        max = tmpMax;
      }
    }

    if (min < scale.min || max > scale.max) {
      scale.change({
        min: min,
        max: max
      });
    }
  };

  _proto._sort = function _sort(mappedArray) {
    var self = this;
    var xScale = self.getXScale();
    var field = xScale.field,
        type = xScale.type;

    if (type !== 'identity' && xScale.values.length > 1) {
      Util.each(mappedArray, function (itemArr) {
        itemArr.sort(function (obj1, obj2) {
          if (type === 'timeCat') {
            return xScale._toTimeStamp(obj1[FIELD_ORIGIN][field]) - xScale._toTimeStamp(obj2[FIELD_ORIGIN][field]);
          }

          return xScale.translate(obj1[FIELD_ORIGIN][field]) - xScale.translate(obj2[FIELD_ORIGIN][field]);
        });
      });
    }

    self.set('hasSorted', true);
    self.set('dataArray', mappedArray);
  };

  _proto.paint = function paint() {
    var self = this;
    var dataArray = self.get('dataArray');
    var mappedArray = [];
    var shapeFactory = self.getShapeFactory();
    shapeFactory.setCoord(self.get('coord'));

    self._beforeMapping(dataArray);

    for (var i = 0, len = dataArray.length; i < len; i++) {
      var data = dataArray[i];

      if (data.length) {
        data = self._mapping(data);
        mappedArray.push(data);
        self.draw(data, shapeFactory);
      }
    }

    self.set('dataArray', mappedArray);
  };

  _proto.getShapeFactory = function getShapeFactory() {
    var shapeFactory = this.get('shapeFactory');

    if (!shapeFactory) {
      var shapeType = this.get('shapeType');
      shapeFactory = GeometryShape.getShapeFactory(shapeType);
      this.set('shapeFactory', shapeFactory);
    }

    return shapeFactory;
  };

  _proto._mapping = function _mapping(data) {
    var self = this;
    var attrs = self.get('attrs');
    var yField = self.getYScale().field;
    var mappedData = [];

    for (var i = 0, len = data.length; i < len; i++) {
      var record = data[i];
      var newRecord = {};
      newRecord[FIELD_ORIGIN] = record[FIELD_ORIGIN];
      newRecord.points = record.points;
      newRecord.nextPoints = record.nextPoints; // 避免

      newRecord[FIELD_ORIGIN_Y] = record[yField];

      for (var k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          var attr = attrs[k];
          var names = attr.names;

          var values = self._getAttrValues(attr, record);

          if (names.length > 1) {
            for (var j = 0, _len = values.length; j < _len; j++) {
              var val = values[j];
              var name = names[j];
              newRecord[name] = Util.isArray(val) && val.length === 1 ? val[0] : val;
            }
          } else {
            newRecord[names[0]] = values.length === 1 ? values[0] : values;
          }
        }
      }

      mappedData.push(newRecord);
    }

    return mappedData;
  };

  _proto._getAttrValues = function _getAttrValues(attr, record) {
    var scales = attr.scales;
    var params = [];

    for (var i = 0, len = scales.length; i < len; i++) {
      var scale = scales[i];
      var field = scale.field;

      if (scale.type === 'identity') {
        params.push(scale.value);
      } else {
        params.push(record[field]);
      }
    }

    var values = attr.mapping.apply(attr, params);
    return values;
  };

  _proto.getAttrValue = function getAttrValue(attrName, record) {
    var attr = this.getAttr(attrName);
    var rst = null;

    if (attr) {
      var values = this._getAttrValues(attr, record);

      rst = values[0];
    }

    return rst;
  };

  _proto._beforeMapping = function _beforeMapping(dataArray) {
    var self = this;

    if (self.get('sortable')) {
      self._sort(dataArray);
    }

    if (self.get('generatePoints')) {
      Util.each(dataArray, function (data) {
        self._generatePoints(data);
      }); // 添加nextPoints

      Util.each(dataArray, function (data, index) {
        var nextData = dataArray[index + 1];

        if (nextData) {
          data[0].nextPoints = nextData[0].points;
        }
      });
    }
  };

  _proto.isInCircle = function isInCircle() {
    var coord = this.get('coord');
    return coord && coord.isPolar;
  };

  _proto.getCallbackCfg = function getCallbackCfg(fields, cfg, origin) {
    if (!fields) {
      return cfg;
    }

    var tmpCfg = {};
    var params = fields.map(function (field) {
      return origin[field];
    });
    Util.each(cfg, function (v, k) {
      if (Util.isFunction(v)) {
        tmpCfg[k] = v.apply(null, params);
      } else {
        tmpCfg[k] = v;
      }
    });
    return tmpCfg;
  };

  _proto.getDrawCfg = function getDrawCfg(obj) {
    var self = this;
    var isInCircle = self.isInCircle();
    var cfg = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle: isInCircle,
      opacity: obj.opacity
    };
    var styleOptions = self.get('styleOptions');

    if (styleOptions && styleOptions.style) {
      cfg.style = self.getCallbackCfg(styleOptions.fields, styleOptions.style, obj[FIELD_ORIGIN]);
    }

    if (self.get('generatePoints')) {
      cfg.points = obj.points;
      cfg.nextPoints = obj.nextPoints;
    }

    if (isInCircle) {
      cfg.center = self.get('coord').center;
    }

    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var yScale = self.getYScale();
    Util.each(data, function (obj, index) {
      if (yScale && Util.isNil(obj._origin[yScale.field])) {
        return;
      }

      obj.index = index;
      var cfg = self.getDrawCfg(obj);
      var shape = obj.shape;
      self.drawShape(shape, obj, cfg, container, shapeFactory);
    });
  };

  _proto.drawShape = function drawShape(shape, shapeData, cfg, container, shapeFactory) {
    var gShape = shapeFactory.drawShape(shape, cfg, container);

    if (gShape) {
      Util.each([].concat(gShape), function (s) {
        s.set('origin', shapeData);
      });
    }
  };

  _proto._generatePoints = function _generatePoints(data) {
    var self = this;
    var shapeFactory = self.getShapeFactory();
    var shapeAttr = self.getAttr('shape');

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var cfg = self.createShapePointsCfg(obj);
      var shape = shapeAttr ? self._getAttrValues(shapeAttr, obj) : null;
      var points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  }
  /**
   * get the info of each shape
   * @protected
   * @param  {Object} obj the data item
   * @return {Object} cfg return the result
   */
  ;

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var xScale = this.getXScale();
    var yScale = this.getYScale();

    var x = this._normalizeValues(obj[xScale.field], xScale);

    var y;

    if (yScale) {
      y = this._normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x: x,
      y: y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined
    };
  };

  _proto.getYMinValue = function getYMinValue() {
    var yScale = this.getYScale();
    var min = yScale.min,
        max = yScale.max;
    var value;

    if (this.get('startOnZero')) {
      if (max <= 0 && min <= 0) {
        value = max;
      } else {
        value = min >= 0 ? min : 0;
      }
    } else {
      value = min;
    }

    return value;
  };

  _proto._normalizeValues = function _normalizeValues(values, scale) {
    var rst = [];

    if (Util.isArray(values)) {
      for (var i = 0, len = values.length; i < len; i++) {
        var v = values[i];
        rst.push(scale.scale(v));
      }
    } else {
      rst = scale.scale(values);
    }

    return rst;
  };

  _proto.getAttr = function getAttr(name) {
    return this.get('attrs')[name];
  };

  _proto.getXScale = function getXScale() {
    return this.getAttr('position').scales[0];
  };

  _proto.getYScale = function getYScale() {
    return this.getAttr('position').scales[1];
  };

  _proto.hasAdjust = function hasAdjust(adjust) {
    return this.get('adjust') && this.get('adjust').type === adjust;
  };

  _proto._getSnap = function _getSnap(scale, item, arr) {
    var i = 0;
    var values;
    var yField = this.getYScale().field; // 叠加的维度

    if (this.hasAdjust('stack') && scale.field === yField) {
      values = [];
      arr.forEach(function (obj) {
        values.push(obj[FIELD_ORIGIN_Y]);
      });

      for (var len = values.length; i < len; i++) {
        if (values[0][0] > item) {
          break;
        }

        if (values[values.length - 1][1] <= item) {
          i = values.length - 1;
          break;
        }

        if (values[i][0] <= item && values[i][1] > item) {
          break;
        }
      }
    } else {
      values = scale.values;
      values.sort(function (a, b) {
        return a - b;
      });

      for (var _len2 = values.length; i < _len2; i++) {
        // 如果只有1个点直接返回第1个点
        if (_len2 <= 1) {
          break;
        } // 第1个点和第2个点之间


        if ((values[0] + values[1]) / 2 > item) {
          break;
        } // 中间的点


        if ((values[i - 1] + values[i]) / 2 <= item && (values[i + 1] + values[i]) / 2 > item) {
          break;
        } // 最后2个点


        if ((values[values.length - 2] + values[values.length - 1]) / 2 <= item) {
          i = values.length - 1;
          break;
        }
      }
    }

    var result = values[i];
    return result;
  };

  _proto.getSnapRecords = function getSnapRecords(point) {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScale = self.getYScale();
    var xfield = xScale.field;
    var dataArray = self.get('dataArray');

    if (!this.get('hasSorted')) {
      this._sort(dataArray);
    }

    var rst = [];
    var invertPoint = coord.invertPoint(point);
    var invertPointX = invertPoint.x;

    if (self.isInCircle() && !coord.transposed && invertPointX > (1 + xScale.rangeMax()) / 2) {
      invertPointX = xScale.rangeMin();
    }

    var xValue = xScale.invert(invertPointX);

    if (!xScale.isCategory) {
      xValue = self._getSnap(xScale, xValue);
    }

    var tmp = [];
    dataArray.forEach(function (data) {
      data.forEach(function (obj) {
        var originValue = Util.isNil(obj[FIELD_ORIGIN]) ? obj[xfield] : obj[FIELD_ORIGIN][xfield];

        if (self._isEqual(originValue, xValue, xScale)) {
          tmp.push(obj);
        }
      });
    }); // special for pie chart

    if (this.hasAdjust('stack') && coord.isPolar && coord.transposed) {
      if (invertPointX >= 0 && invertPointX <= 1) {
        var yValue = yScale.invert(invertPoint.y);
        yValue = self._getSnap(yScale, yValue, tmp);
        tmp.forEach(function (obj) {
          if (Util.isArray(yValue) ? obj[FIELD_ORIGIN_Y].toString() === yValue.toString() : obj[FIELD_ORIGIN_Y] === yValue) {
            rst.push(obj);
          }
        });
      }
    } else {
      rst = tmp;
    }

    return rst;
  };

  _proto._isEqual = function _isEqual(originValue, value, scale) {
    if (scale.type === 'timeCat') {
      return scale._toTimeStamp(originValue) === value;
    }

    return value === originValue;
  };

  _proto.position = function position(field) {
    this._setAttrOptions('position', {
      field: field
    });

    return this;
  };

  _proto.color = function color(field, values) {
    this._createAttrOption('color', field, values, Global.colors);

    return this;
  };

  _proto.size = function size(field, values) {
    this._createAttrOption('size', field, values, Global.sizes);

    return this;
  };

  _proto.shape = function shape(field, values) {
    var type = this.get('type');
    var shapes = Global.shapes[type] || [];

    this._createAttrOption('shape', field, values, shapes);

    return this;
  };

  _proto.style = function style(field, cfg) {
    var styleOptions = this.get('styleOptions');

    if (!styleOptions) {
      styleOptions = {};
      this.set('styleOptions', styleOptions);
    }

    if (Util.isObject(field)) {
      cfg = field;
      field = null;
    }

    var fields;

    if (field) {
      fields = parseFields(field);
    }

    styleOptions.fields = fields;
    styleOptions.style = cfg;
    return this;
  };

  _proto.adjust = function adjust(type) {
    if (Util.isString(type)) {
      type = {
        type: type
      };
    }

    this.set('adjust', type);
    return this;
  };

  _proto.animate = function animate(cfg) {
    this.set('animateCfg', cfg);
    return this;
  };

  _proto.reset = function reset() {
    this.set('attrOptions', {});
    this.set('adjust', null);
    this.clearInner();
  };

  _proto.clearInner = function clearInner() {
    var container = this.get('container');

    if (container) {
      container.clear();
      container.setMatrix([1, 0, 0, 1, 0, 0]);
    }

    container && container.clear();
    this.set('attrs', {});
    this.set('groupScales', null);
    this.set('xDistance', null);
    this.set('_width', null);
  };

  _proto.clear = function clear() {
    this.clearInner();
    this.set('scales', {});
  };

  _proto.destroy = function destroy() {
    this.clear();

    _Base.prototype.destroy.call(this);
  };

  _proto._display = function _display(visible) {
    this.set('visible', visible);
    var container = this.get('container');
    var canvas = container.get('canvas');
    container.set('visible', visible);
    canvas.draw();
  };

  _proto.show = function show() {
    this._display(true);
  };

  _proto.hide = function hide() {
    this._display(false);
  };

  return Geom;
}(Base);

module.exports = Geom;
}, function(modId) { var map = {"../util/common":1578656684310,"../base":1578656684313,"../global":1578656684308,"../attr/index":1578656684321,"./shape/shape":1578656684324}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684321, function(require, module, exports) {


module.exports = {
  Position: require('@antv/attr/lib/position'),
  Shape: require('@antv/attr/lib/shape'),
  Size: require('@antv/attr/lib/size'),
  Color: require('./color')
};
}, function(modId) { var map = {"./color":1578656684322}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684322, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../util/common');

var ColorUtil = require('./color-util');

var Base = require('@antv/attr/lib/base');

var Color =
/*#__PURE__*/
function (_Base) {
  (0, _inheritsLoose2["default"])(Color, _Base);

  function Color(cfg) {
    var _this;

    _this = _Base.call(this, cfg) || this;
    _this.names = ['color'];
    _this.type = 'color';
    _this.gradient = null;

    if (Util.isString(_this.values)) {
      _this.linear = true;
    }

    return _this;
  }
  /**
   * @override
   */


  var _proto = Color.prototype;

  _proto.getLinearValue = function getLinearValue(percent) {
    var gradient = this.gradient;

    if (!gradient) {
      var values = this.values;
      gradient = ColorUtil.gradient(values);
      this.gradient = gradient;
    }

    return gradient(percent);
  };

  return Color;
}(Base);

module.exports = Color;
}, function(modId) { var map = {"../util/common":1578656684310,"./color-util":1578656684323}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684323, function(require, module, exports) {


var Util = require('../util/common'); // Get the interpolation between colors


function getValue(start, end, percent, index) {
  var value = start[index] + (end[index] - start[index]) * percent;
  return value;
} // convert to hex


function arr2hex(arr) {
  return '#' + toRGBValue(arr[0]) + toRGBValue(arr[1]) + toRGBValue(arr[2]);
}

function toRGBValue(value) {
  value = Math.round(value);
  value = value.toString(16);

  if (value.length === 1) {
    value = '0' + value;
  }

  return value;
}

function calColor(colors, percent) {
  var steps = colors.length - 1;
  var step = Math.floor(steps * percent);
  var left = steps * percent - step;
  var start = colors[step];
  var end = step === steps ? start : colors[step + 1];
  var rgb = arr2hex([getValue(start, end, left, 0), getValue(start, end, left, 1), getValue(start, end, left, 2)]);
  return rgb;
}

function hex2arr(str) {
  var arr = [];
  arr.push(parseInt(str.substr(1, 2), 16));
  arr.push(parseInt(str.substr(3, 2), 16));
  arr.push(parseInt(str.substr(5, 2), 16));
  return arr;
}

var colorCache = {
  black: '#000000',
  blue: '#0000ff',
  grey: '#808080',
  green: '#008000',
  orange: '#ffa500',
  pink: '#ffc0cb',
  purple: '#800080',
  red: '#ff0000',
  white: '#ffffff',
  yellow: '#ffff00'
};
var ColorUtil = {
  /**
   * Returns a hexadecimal string representing this color in RGB space, such as #f7eaba.
   * @param  {String} color color value
   * @return {String} Returns a hexadecimal string
   */
  toHex: function toHex(color) {
    if (colorCache[color]) {
      return colorCache[color];
    }

    if (color[0] === '#') {
      if (color.length === 7) {
        return color;
      }

      var hex = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
        return '#' + r + r + g + g + b + b;
      }); // hex3 to hex6

      colorCache[color] = hex;
      return hex;
    } // rgb/rgba to hex


    var rst = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    rst.shift();
    rst = arr2hex(rst);
    colorCache[color] = rst;
    return rst;
  },
  hex2arr: hex2arr,

  /**
   * handle the gradient color
   * @param  {Array} colors the colors
   * @return {String} return the color value
   */
  gradient: function gradient(colors) {
    var points = [];

    if (Util.isString(colors)) {
      colors = colors.split('-');
    }

    Util.each(colors, function (color) {
      if (color.indexOf('#') === -1) {
        color = ColorUtil.toHex(color);
      }

      points.push(hex2arr(color));
    });
    return function (percent) {
      return calColor(points, percent);
    };
  }
};
module.exports = ColorUtil;
}, function(modId) { var map = {"../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684324, function(require, module, exports) {


var Util = require('../../util/common');

var Global = require('../../global');

var Shape = {};
var ShapeBase = {
  _coord: null,

  /**
   * draw the shape
   * @param {Object} cfg options
   * @param {Object} container container to store the shapes
   */
  draw: function draw(cfg, container) {
    if (this.drawShape) {
      this.drawShape(cfg, container);
    }
  },

  /**
   * set the coordinate instance
   * @param {Coord} coord coordinate instance
   */
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },

  /**
   * convert the normalized value to the canvas position
   * @param  {point} point the point to convert
   * @return {point} point return the result
   */
  parsePoint: function parsePoint(point) {
    var coord = this._coord;

    if (coord.isPolar) {
      if (point.x === 1) point.x = 0.9999999;
      if (point.y === 1) point.y = 0.9999999;
    }

    return coord.convertPoint(point);
  },

  /**
   * convert the normalized value to the canvas position
   * @param  {points} points the array that store the points
   * @return {points} points return the result
   */
  parsePoints: function parsePoints(points) {
    if (!points) return false;
    var self = this;
    var rst = [];
    points.forEach(function (point) {
      rst.push(self.parsePoint(point));
    });
    return rst;
  }
};
var ShapeFactoryBase = {
  defaultShapeType: null,
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },
  getShape: function getShape(type) {
    var self = this;

    if (Util.isArray(type)) {
      type = type[0];
    }

    var shape = self[type] || self[self.defaultShapeType];
    shape._coord = self._coord;
    return shape;
  },
  getShapePoints: function getShapePoints(type, cfg) {
    var shape = this.getShape(type);
    var fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints;
    var points = fn(cfg);
    return points;
  },
  getDefaultPoints: function getDefaultPoints()
  /* cfg */
  {
    return [];
  },
  drawShape: function drawShape(type, cfg, container) {
    var shape = this.getShape(type);

    if (!cfg.color) {
      cfg.color = Global.colors[0];
    }

    return shape.draw(cfg, container);
  }
};

Shape.registerFactory = function (factoryName, cfg) {
  var className = Util.upperFirst(factoryName);
  var geomObj = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = geomObj;
  geomObj.name = factoryName;
  return geomObj;
};

Shape.registerShape = function (factoryName, shapeType, cfg) {
  var className = Util.upperFirst(factoryName);
  var factory = Shape[className];
  var shapeObj = Util.mix({}, ShapeBase, cfg);
  factory[shapeType] = shapeObj;
  return shapeObj;
};

Shape.registShape = Shape.registerShape;

Shape.getShapeFactory = function (factoryName) {
  var self = this;
  factoryName = factoryName || 'point';
  var className = Util.upperFirst(factoryName);
  return self[className];
};

module.exports = Shape;
}, function(modId) { var map = {"../../util/common":1578656684310,"../../global":1578656684308}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684325, function(require, module, exports) {


var Util = require('../../util/common');

var Global = require('../../global');

var Scale = require('../../scale/');

var SCALE_TYPES_MAP = {
  linear: 'Linear',
  cat: 'Cat',
  timeCat: 'TimeCat',
  identity: 'Identity'
};

var ScaleController =
/*#__PURE__*/
function () {
  function ScaleController(cfg) {
    // defs 列定义
    this.defs = {};
    Util.mix(this, cfg);
  }

  var _proto = ScaleController.prototype;

  _proto._getDef = function _getDef(field) {
    var defs = this.defs;
    var def = null;

    if (Global.scales[field] || defs[field]) {
      def = Util.mix({}, Global.scales[field]);
      Util.each(defs[field], function (v, k) {
        if (Util.isNil(v)) {
          delete def[k];
        } else {
          def[k] = v;
        }
      });
    }

    return def;
  };

  _proto._getDefaultType = function _getDefaultType(field, data, def) {
    if (def && def.type) {
      return def.type;
    }

    var type = 'linear';
    var value = Util.Array.firstValue(data, field);

    if (Util.isArray(value)) {
      value = value[0];
    }

    if (Util.isString(value)) {
      type = 'cat';
    }

    return type;
  };

  _proto._getScaleCfg = function _getScaleCfg(type, field, data, def) {
    var values;

    if (def && def.values) {
      values = def.values;
    } else {
      values = Util.Array.values(data, field);
    }

    var cfg = {
      field: field,
      values: values
    };

    if (type !== 'cat' && type !== 'timeCat') {
      if (!def || !(def.min && def.max)) {
        var _Util$Array$getRange = Util.Array.getRange(values),
            min = _Util$Array$getRange.min,
            max = _Util$Array$getRange.max;

        cfg.min = min;
        cfg.max = max;
        cfg.nice = true;
      }
    } else {
      cfg.isRounding = false; // used for tickCount calculation
    }

    return cfg;
  };

  _proto.createScale = function createScale(field, data) {
    var self = this;

    var def = self._getDef(field);

    var scale;

    if (!data || !data.length) {
      if (def && def.type) {
        def.field = field;
        scale = new Scale[SCALE_TYPES_MAP[def.type]](def);
      } else {
        scale = new Scale.Identity({
          value: field,
          field: field.toString(),
          values: [field]
        });
      }

      return scale;
    }

    var firstObj = data[0];
    var firstValue = firstObj[field];

    if (firstValue === null) {
      firstValue = Util.Array.firstValue(data, field);
    }

    if (Util.isNumber(field) || Util.isNil(firstValue) && !def) {
      scale = new Scale.Identity({
        value: field,
        field: field.toString(),
        values: [field]
      });
    } else {
      var type = self._getDefaultType(field, data, def);

      var cfg = self._getScaleCfg(type, field, data, def);

      def && Util.mix(cfg, def);
      scale = new Scale[SCALE_TYPES_MAP[type]](cfg);
    }

    return scale;
  };

  return ScaleController;
}();

module.exports = ScaleController;
}, function(modId) { var map = {"../../util/common":1578656684310,"../../global":1578656684308,"../../scale/":1578656684326}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684326, function(require, module, exports) {


var Scale = require('@antv/scale/lib/base');

require('@antv/scale/lib/linear');

require('@antv/scale/lib/identity');

require('@antv/scale/lib/category');

module.exports = Scale;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684327, function(require, module, exports) {


var Util = require('../../util/common');

var Axis = require('../../component/axis/');

var Global = require('../../global');

var _require = require('../../graphic/index'),
    Shape = _require.Shape;

function formatTicks(ticks) {
  var tmp = ticks.slice(0);

  if (tmp.length > 0) {
    var first = tmp[0];
    var last = tmp[tmp.length - 1];

    if (first.value !== 0) {
      tmp.unshift({
        value: 0
      });
    }

    if (last.value !== 1) {
      tmp.push({
        value: 1
      });
    }
  }

  return tmp;
}

var AxisController =
/*#__PURE__*/
function () {
  function AxisController(cfg) {
    this.axisCfg = {};
    this.frontPlot = null;
    this.backPlot = null;
    this.axes = {}; // store the axes's options

    Util.mix(this, cfg);
  }

  var _proto = AxisController.prototype;

  _proto._isHide = function _isHide(field) {
    var axisCfg = this.axisCfg;
    return !axisCfg || axisCfg[field] === false;
  };

  _proto._getLinePosition = function _getLinePosition(scale, dimType, index, transposed) {
    var position = '';
    var field = scale.field;
    var axisCfg = this.axisCfg;

    if (axisCfg[field] && axisCfg[field].position) {
      position = axisCfg[field].position;
    } else if (dimType === 'x') {
      position = transposed ? 'left' : 'bottom';
    } else if (dimType === 'y') {
      position = index ? 'right' : 'left';

      if (transposed) {
        position = 'bottom';
      }
    }

    return position;
  };

  _proto._getLineCfg = function _getLineCfg(coord, dimType, position) {
    var start;
    var end;
    var factor = 1; // Mark clockwise or counterclockwise

    if (dimType === 'x') {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else {
      if (position === 'right') {
        // there will be several y axes
        start = {
          x: 1,
          y: 0
        };
        end = {
          x: 1,
          y: 1
        };
      } else {
        start = {
          x: 0,
          y: 0
        };
        end = {
          x: 0,
          y: 1
        };
        factor = -1;
      }
    }

    if (coord.transposed) {
      factor *= -1;
    }

    return {
      offsetFactor: factor,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  };

  _proto._getCircleCfg = function _getCircleCfg(coord) {
    return {
      startAngle: coord.startAngle,
      endAngle: coord.endAngle,
      center: coord.center,
      radius: coord.circleRadius
    };
  };

  _proto._getRadiusCfg = function _getRadiusCfg(coord) {
    var transposed = coord.transposed;
    var start;
    var end;

    if (transposed) {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 0,
        y: 1
      };
    }

    return {
      offsetFactor: -1,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  };

  _proto._getAxisCfg = function _getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg) {
    var self = this;
    var axisCfg = this.axisCfg;
    var ticks = scale.getTicks();
    var cfg = Util.deepMix({
      ticks: ticks,
      frontContainer: this.frontPlot,
      backContainer: this.backPlot
    }, defaultCfg, axisCfg[scale.field]);
    var labels = [];
    var label = cfg.label;
    var count = ticks.length;
    var maxWidth = 0;
    var maxHeight = 0;
    var labelCfg = label;
    Util.each(ticks, function (tick, index) {
      if (Util.isFunction(label)) {
        var executedLabel = label(tick.text, index, count);
        labelCfg = executedLabel ? Util.mix({}, Global._defaultAxis.label, executedLabel) : null;
      }

      if (labelCfg) {
        var textStyle = {};

        if (labelCfg.textAlign) {
          textStyle.textAlign = labelCfg.textAlign;
        }

        if (labelCfg.textBaseline) {
          textStyle.textBaseline = labelCfg.textBaseline;
        }

        var axisLabel = new Shape.Text({
          className: 'axis-label',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: tick.text,
            fontFamily: self.chart.get('canvas').get('fontFamily')
          }, labelCfg),
          value: tick.value,
          textStyle: textStyle,
          top: labelCfg.top,
          context: self.chart.get('canvas').get('context')
        });
        labels.push(axisLabel);

        var _axisLabel$getBBox = axisLabel.getBBox(),
            width = _axisLabel$getBBox.width,
            height = _axisLabel$getBBox.height;

        maxWidth = Math.max(maxWidth, width);
        maxHeight = Math.max(maxHeight, height);
      }
    });
    cfg.labels = labels;
    cfg.maxWidth = maxWidth;
    cfg.maxHeight = maxHeight;
    return cfg;
  };

  _proto._createAxis = function _createAxis(coord, scale, verticalScale, dimType, index) {
    if (index === void 0) {
      index = '';
    }

    var self = this;
    var coordType = coord.type;
    var transposed = coord.transposed;
    var type;
    var key;
    var defaultCfg;

    if (coordType === 'cartesian' || coordType === 'rect') {
      var position = self._getLinePosition(scale, dimType, index, transposed);

      defaultCfg = Global.axis[position];
      defaultCfg.position = position;
      type = 'Line';
      key = position;
    } else {
      if (dimType === 'x' && !transposed || dimType === 'y' && transposed) {
        defaultCfg = Global.axis.circle;
        type = 'Circle';
        key = 'circle';
      } else {
        defaultCfg = Global.axis.radius;
        type = 'Line';
        key = 'radius';
      }
    }

    var cfg = self._getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg);

    cfg.type = type;
    cfg.dimType = dimType;
    cfg.verticalScale = verticalScale;
    cfg.index = index;
    this.axes[key] = cfg;
  };

  _proto.createAxis = function createAxis(coord, xScale, yScales) {
    var self = this;

    if (xScale && !self._isHide(xScale.field)) {
      self._createAxis(coord, xScale, yScales[0], 'x');
    }

    Util.each(yScales, function (yScale, index) {
      if (!self._isHide(yScale.field)) {
        self._createAxis(coord, yScale, xScale, 'y', index);
      }
    });
    var axes = this.axes;
    var chart = self.chart;

    if (chart._isAutoPadding()) {
      var userPadding = Util.parsePadding(chart.get('padding'));
      var appendPadding = Util.parsePadding(chart.get('appendPadding'));
      var legendRange = chart.get('legendRange') || {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      var padding = [userPadding[0] === 'auto' ? legendRange.top + appendPadding[0] * 2 : userPadding[0], userPadding[1] === 'auto' ? legendRange.right + appendPadding[1] : userPadding[1], userPadding[2] === 'auto' ? legendRange.bottom + appendPadding[2] : userPadding[2], userPadding[3] === 'auto' ? legendRange.left + appendPadding[3] : userPadding[3]];

      if (coord.isPolar) {
        var circleAxis = axes.circle;

        if (circleAxis) {
          var maxHeight = circleAxis.maxHeight,
              maxWidth = circleAxis.maxWidth,
              labelOffset = circleAxis.labelOffset;
          padding[0] += maxHeight + labelOffset;
          padding[1] += maxWidth + labelOffset;
          padding[2] += maxHeight + labelOffset;
          padding[3] += maxWidth + labelOffset;
        }
      } else {
        if (axes.right && userPadding[1] === 'auto') {
          var _axes$right = axes.right,
              _maxWidth = _axes$right.maxWidth,
              _labelOffset = _axes$right.labelOffset;
          padding[1] += _maxWidth + _labelOffset;
        }

        if (axes.left && userPadding[3] === 'auto') {
          var _axes$left = axes.left,
              _maxWidth2 = _axes$left.maxWidth,
              _labelOffset2 = _axes$left.labelOffset;
          padding[3] += _maxWidth2 + _labelOffset2;
        }

        if (axes.bottom && userPadding[2] === 'auto') {
          var _axes$bottom = axes.bottom,
              _maxHeight = _axes$bottom.maxHeight,
              _labelOffset3 = _axes$bottom.labelOffset;
          padding[2] += _maxHeight + _labelOffset3;
        }
      }

      chart.set('_padding', padding);

      chart._updateLayout(padding);
    }

    Util.each(axes, function (axis) {
      var type = axis.type,
          grid = axis.grid,
          verticalScale = axis.verticalScale,
          ticks = axis.ticks,
          dimType = axis.dimType,
          position = axis.position,
          index = axis.index;
      var appendCfg;

      if (coord.isPolar) {
        if (type === 'Line') {
          appendCfg = self._getRadiusCfg(coord);
        } else if (type === 'Circle') {
          appendCfg = self._getCircleCfg(coord);
        }
      } else {
        appendCfg = self._getLineCfg(coord, dimType, position);
      }

      if (grid && verticalScale) {
        var gridPoints = [];
        var verticalTicks = formatTicks(verticalScale.getTicks());
        Util.each(ticks, function (tick) {
          var subPoints = [];
          Util.each(verticalTicks, function (verticalTick) {
            var x = dimType === 'x' ? tick.value : verticalTick.value;
            var y = dimType === 'x' ? verticalTick.value : tick.value;

            if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
              var point = coord.convertPoint({
                x: x,
                y: y
              });
              subPoints.push(point);
            }
          });
          gridPoints.push({
            points: subPoints,
            _id: 'axis-' + dimType + index + '-grid-' + tick.tickValue
          });
        });
        axis.gridPoints = gridPoints;

        if (coord.isPolar) {
          axis.center = coord.center;
          axis.startAngle = coord.startAngle;
          axis.endAngle = coord.endAngle;
        }
      }

      appendCfg._id = 'axis-' + dimType;

      if (!Util.isNil(index)) {
        appendCfg._id = 'axis-' + dimType + index;
      }

      new Axis[type](Util.mix(axis, appendCfg));
    });
  };

  _proto.clear = function clear() {
    this.axes = {};
    this.frontPlot.clear();
    this.backPlot.clear();
  };

  return AxisController;
}();

module.exports = AxisController;
}, function(modId) { var map = {"../../util/common":1578656684310,"../../component/axis/":1578656684328,"../../global":1578656684308,"../../graphic/index":1578656684331}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684328, function(require, module, exports) {


var Abstract = require('./abstract');

require('./line');

module.exports = Abstract;
}, function(modId) { var map = {"./abstract":1578656684329,"./line":1578656684330}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684329, function(require, module, exports) {


var Util = require('../../util/common');

var Global = require('../../global');

var Vector2 = require('../../graphic/util/vector2');

var Abastract =
/*#__PURE__*/
function () {
  var _proto = Abastract.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    /**
     * ticks
     * @type {Array}
     */
    this.ticks = [];
    /**
     * the configuration for tickLine
     * @type {Object}
     */

    this.tickLine = {};
    /**
     * the direction of ticks, 1 means clockwise
     * @type {Number}
     */

    this.offsetFactor = 1;
    /**
     * the top container
     * @type {container}
     */

    this.frontContainer = null;
    /**
     * the back container
     * @type {[type]}
     */

    this.backContainer = null;
    /**
     * points for draw grid line
     * @type {Array}
     */

    this.gridPoints = [];
  };

  function Abastract(cfg) {
    this._initDefaultCfg();

    Util.mix(this, cfg);
    this.draw();
  }

  _proto.draw = function draw() {
    var line = this.line,
        tickLine = this.tickLine,
        label = this.label,
        grid = this.grid;
    grid && this.drawGrid(grid); // draw the grid lines

    tickLine && this.drawTicks(tickLine); // draw the tickLine

    line && this.drawLine(line); // draw axis line

    label && this.drawLabels(); // draw ticks
  };

  _proto.drawTicks = function drawTicks(tickCfg) {
    var self = this;
    var ticks = self.ticks;
    var length = tickCfg.length;
    var container = self.getContainer(tickCfg.top);
    Util.each(ticks, function (tick) {
      var start = self.getOffsetPoint(tick.value);
      var end = self.getSidePoint(start, length);
      var shape = container.addShape('line', {
        className: 'axis-tick',
        attrs: Util.mix({
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y
        }, tickCfg)
      });
      shape._id = self._id + '-ticks';
    });
  };

  _proto.drawLabels = function drawLabels() {
    var self = this;
    var labelOffset = self.labelOffset;
    var labels = self.labels;
    Util.each(labels, function (labelShape) {
      var container = self.getContainer(labelShape.get('top'));
      var start = self.getOffsetPoint(labelShape.get('value'));

      var _self$getSidePoint = self.getSidePoint(start, labelOffset),
          x = _self$getSidePoint.x,
          y = _self$getSidePoint.y;

      labelShape.attr(Util.mix({
        x: x,
        y: y
      }, self.getTextAlignInfo(start, labelOffset), labelShape.get('textStyle')));
      labelShape._id = self._id + '-' + labelShape.attr('text');
      container.add(labelShape);
    });
  };

  _proto.drawLine = function drawLine() {};

  _proto.drawGrid = function drawGrid(grid) {
    var self = this;
    var gridPoints = self.gridPoints,
        ticks = self.ticks;
    var gridCfg = grid;
    var count = gridPoints.length;
    Util.each(gridPoints, function (subPoints, index) {
      if (Util.isFunction(grid)) {
        var tick = ticks[index] || {};
        var executedGrid = grid(tick.text, index, count);
        gridCfg = executedGrid ? Util.mix({}, Global._defaultAxis.grid, executedGrid) : null;
      }

      if (gridCfg) {
        var type = gridCfg.type; // has two types: 'line' and 'arc'

        var points = subPoints.points;
        var container = self.getContainer(gridCfg.top);
        var shape;

        if (type === 'arc') {
          var center = self.center,
              startAngle = self.startAngle,
              endAngle = self.endAngle;
          var radius = Vector2.length([points[0].x - center.x, points[0].y - center.y]);
          shape = container.addShape('Arc', {
            className: 'axis-grid',
            attrs: Util.mix({
              x: center.x,
              y: center.y,
              startAngle: startAngle,
              endAngle: endAngle,
              r: radius
            }, gridCfg)
          });
        } else {
          shape = container.addShape('Polyline', {
            className: 'axis-grid',
            attrs: Util.mix({
              points: points
            }, gridCfg)
          });
        }

        shape._id = subPoints._id;
      }
    });
  };

  _proto.getOffsetPoint = function getOffsetPoint() {};

  _proto.getAxisVector = function getAxisVector() {};

  _proto.getOffsetVector = function getOffsetVector(point, offset) {
    var self = this;
    var axisVector = self.getAxisVector(point);
    var normal = Vector2.normalize([], axisVector);
    var factor = self.offsetFactor;
    var verticalVector = [normal[1] * -1 * factor, normal[0] * factor];
    return Vector2.scale([], verticalVector, offset);
  };

  _proto.getSidePoint = function getSidePoint(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    return {
      x: point.x + offsetVector[0],
      y: point.y + offsetVector[1]
    };
  };

  _proto.getTextAlignInfo = function getTextAlignInfo(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    var align;
    var baseLine;

    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';
    }

    if (offsetVector[1] > 0) {
      baseLine = 'top';
    } else if (offsetVector[1] < 0) {
      baseLine = 'bottom';
    } else {
      baseLine = 'middle';
    }

    return {
      textAlign: align,
      textBaseline: baseLine
    };
  };

  _proto.getContainer = function getContainer(isTop) {
    var frontContainer = this.frontContainer,
        backContainer = this.backContainer;
    return isTop ? frontContainer : backContainer;
  };

  return Abastract;
}();

module.exports = Abastract;
}, function(modId) { var map = {"../../util/common":1578656684310,"../../global":1578656684308,"../../graphic/util/vector2":1578656684318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684330, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var Abstract = require('./abstract');

var Line =
/*#__PURE__*/
function (_Abstract) {
  (0, _inheritsLoose2["default"])(Line, _Abstract);

  function Line() {
    return _Abstract.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Abstract.prototype._initDefaultCfg.call(this);

    this.start = null;
    this.end = null;
  };

  _proto.getOffsetPoint = function getOffsetPoint(value) {
    var start = this.start,
        end = this.end;
    return {
      x: start.x + (end.x - start.x) * value,
      y: start.y + (end.y - start.y) * value
    };
  };

  _proto.getAxisVector = function getAxisVector() {
    var start = this.start,
        end = this.end;
    return [end.x - start.x, end.y - start.y];
  };

  _proto.drawLine = function drawLine(lineCfg) {
    var container = this.getContainer(lineCfg.top);
    var start = this.start,
        end = this.end;
    container.addShape('line', {
      className: 'axis-line',
      attrs: Util.mix({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y
      }, lineCfg)
    });
  };

  return Line;
}(Abstract);

Abstract.Line = Line;
module.exports = Line;
}, function(modId) { var map = {"../../util/common":1578656684310,"./abstract":1578656684329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684331, function(require, module, exports) {


var G = {
  Canvas: require('./canvas'),
  Group: require('./group'),
  Shape: require('./shape'),
  Matrix: require('./util/matrix'),
  Vector2: require('./util/vector2')
};

require('./shape/rect');

require('./shape/circle');

require('./shape/line');

require('./shape/polygon');

require('./shape/polyline');

require('./shape/arc');

require('./shape/sector');

require('./shape/text');

require('./shape/custom');

module.exports = G;
}, function(modId) { var map = {"./canvas":1578656684332,"./group":1578656684337,"./shape":1578656684334,"./util/matrix":1578656684317,"./util/vector2":1578656684318,"./shape/rect":1578656684340,"./shape/circle":1578656684341,"./shape/line":1578656684342,"./shape/polygon":1578656684344,"./shape/polyline":1578656684345,"./shape/arc":1578656684347,"./shape/sector":1578656684348,"./shape/text":1578656684349,"./shape/custom":1578656684351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684332, function(require, module, exports) {


var Util = require('../util/common');

var Container = require('./container');

var Group = require('./group');

var _require = require('./util/requestAnimationFrame'),
    requestAnimationFrame = _require.requestAnimationFrame;

var CanvasElement = require('./canvas-element');

var Canvas =
/*#__PURE__*/
function () {
  var _proto = Canvas.prototype;

  _proto.get = function get(name) {
    return this._attrs[name];
  };

  _proto.set = function set(name, value) {
    this._attrs[name] = value;
  };

  function Canvas(cfg) {
    this._attrs = Util.mix({
      type: 'canvas',
      children: []
    }, cfg);

    this._initPixelRatio();

    this._initCanvas();
  }

  _proto._initPixelRatio = function _initPixelRatio() {
    var pixelRatio = this.get('pixelRatio');

    if (!pixelRatio) {
      this.set('pixelRatio', Util.getPixelRatio());
    }
  };

  _proto.beforeDraw = function beforeDraw() {
    var context = this._attrs.context;
    var el = this._attrs.el;
    context && context.clearRect && context.clearRect(0, 0, el.width, el.height);
  };

  _proto._initCanvas = function _initCanvas() {
    var self = this;
    var el = self.get('el');
    var context = self.get('context');

    if (!el && !context) {
      throw new Error('Please specify the id or el of the chart!');
    }

    var canvas;

    if (el) {
      // DOMElement or String
      canvas = Util.isString(el) ? Util.getDomById(el) : el;
    } else {
      // 说明没有指定el
      canvas = CanvasElement.create(context);
    }

    if (context && canvas && !canvas.getContext) {
      canvas.getContext = function () {
        return context;
      };
    }

    var width = self.get('width');

    if (!width) {
      width = Util.getWidth(canvas);
    }

    var height = self.get('height');

    if (!height) {
      height = Util.getHeight(canvas);
    }

    self.set('canvas', this);
    self.set('el', canvas);
    self.set('context', context || canvas.getContext('2d'));
    self.changeSize(width, height);
  };

  _proto.changeSize = function changeSize(width, height) {
    var pixelRatio = this.get('pixelRatio');
    var canvasDOM = this.get('el'); // HTMLCanvasElement or canvasElement
    // 浏览器环境设置style样式

    if (canvasDOM.style) {
      canvasDOM.style.width = width + 'px';
      canvasDOM.style.height = height + 'px';
    }

    if (Util.isCanvasElement(canvasDOM)) {
      canvasDOM.width = width * pixelRatio;
      canvasDOM.height = height * pixelRatio;

      if (pixelRatio !== 1) {
        var ctx = this.get('context');
        ctx.scale(pixelRatio, pixelRatio);
      }
    }

    this.set('width', width);
    this.set('height', height);
  };

  _proto.getWidth = function getWidth() {
    var pixelRatio = this.get('pixelRatio');
    var width = this.get('width');
    return width * pixelRatio;
  };

  _proto.getHeight = function getHeight() {
    var pixelRatio = this.get('pixelRatio');
    var height = this.get('height');
    return height * pixelRatio;
  };

  _proto.getPointByClient = function getPointByClient(clientX, clientY) {
    var el = this.get('el');
    var bbox = el.getBoundingClientRect();
    var width = bbox.right - bbox.left;
    var height = bbox.bottom - bbox.top;
    return {
      x: (clientX - bbox.left) * (el.width / width),
      y: (clientY - bbox.top) * (el.height / height)
    };
  };

  _proto._beginDraw = function _beginDraw() {
    this._attrs.toDraw = true;
  };

  _proto._endDraw = function _endDraw() {
    this._attrs.toDraw = false;
  };

  _proto.draw = function draw() {
    var self = this;

    function drawInner() {
      self.set('animateHandler', requestAnimationFrame(function () {
        self.set('animateHandler', undefined);

        if (self.get('toDraw')) {
          drawInner();
        }
      }));
      self.beforeDraw();

      try {
        var context = self._attrs.context;
        var children = self._attrs.children;

        for (var i = 0, len = children.length; i < len; i++) {
          var child = children[i];
          child.draw(context);
        } // 支付宝，微信小程序，需要调context.draw才能完成绘制， 所以这里直接判断是否有.draw方法


        if (context.draw) {
          context.draw();
        }
      } catch (ev) {
        console.warn('error in draw canvas, detail as:');
        console.warn(ev);

        self._endDraw();
      }

      self._endDraw();
    }

    if (self.get('destroyed')) {
      return;
    }

    if (self.get('animateHandler')) {
      this._beginDraw();
    } else {
      drawInner();
    }
  };

  _proto.destroy = function destroy() {
    if (this.get('destroyed')) {
      return;
    }

    this.clear();
    this._attrs = {};
    this.set('destroyed', true);
  };

  _proto.isDestroyed = function isDestroyed() {
    return this.get('destroyed');
  };

  return Canvas;
}();

Util.mix(Canvas.prototype, Container, {
  getGroupClass: function getGroupClass() {
    return Group;
  }
});
module.exports = Canvas;
}, function(modId) { var map = {"../util/common":1578656684310,"./container":1578656684333,"./group":1578656684337,"./util/requestAnimationFrame":1578656684338,"./canvas-element":1578656684339}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684333, function(require, module, exports) {


var Util = require('../util/common');

var Shape = require('./shape');

var SHAPE_MAP = {};
var INDEX = '_INDEX';

function getComparer(compare) {
  return function (left, right) {
    var result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

module.exports = {
  getGroupClass: function getGroupClass() {},
  getChildren: function getChildren() {
    return this.get('children');
  },
  addShape: function addShape(type, cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var canvas = this.get('canvas');
    var shapeType = SHAPE_MAP[type];

    if (!shapeType) {
      shapeType = Util.upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }

    cfg.canvas = canvas;

    if (shapeType === 'Text' && canvas && canvas.get('fontFamily')) {
      cfg.attrs.fontFamily = cfg.attrs.fontFamily || canvas.get('fontFamily');
    }

    var shape = new Shape[shapeType](cfg);
    this.add(shape);
    return shape;
  },
  addGroup: function addGroup(cfg) {
    var canvas = this.get('canvas');
    var groupClass = this.getGroupClass();
    cfg = Util.mix({}, cfg);
    cfg.canvas = canvas;
    cfg.parent = this;
    var rst = new groupClass(cfg);
    this.add(rst);
    return rst;
  },
  contain: function contain(item) {
    var children = this.get('children');
    return children.indexOf(item) > -1;
  },
  sort: function sort() {
    var children = this.get('children');

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child[INDEX] = i;
    }

    children.sort(getComparer(function (obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));
    return this;
  },
  clear: function clear() {
    var children = this.get('children');

    while (children.length !== 0) {
      children[children.length - 1].remove(true);
    }

    return this;
  },
  add: function add(items) {
    var self = this;
    var children = self.get('children');

    if (!Util.isArray(items)) {
      items = [items];
    }

    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var parent = item.get('parent');

      if (parent) {
        var descendants = parent.get('children');
        Util.Array.remove(descendants, item);
      }

      self._setEvn(item);

      children.push(item);
    }

    return self;
  },
  _setEvn: function _setEvn(item) {
    var self = this;
    item._attrs.parent = self;
    item._attrs.context = self._attrs.context;
    item._attrs.canvas = self._attrs.canvas;
    var clip = item._attrs.attrs.clip;

    if (clip) {
      clip.set('parent', self);
      clip.set('context', self.get('context'));
    }

    if (item._attrs.isGroup) {
      var children = item._attrs.children;

      for (var i = 0, len = children.length; i < len; i++) {
        item._setEvn(children[i]);
      }
    }
  }
};
}, function(modId) { var map = {"../util/common":1578656684310,"./shape":1578656684334}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684334, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../util/common');

var Element = require('./element');

var Shape =
/*#__PURE__*/
function (_Element) {
  (0, _inheritsLoose2["default"])(Shape, _Element);

  function Shape() {
    return _Element.apply(this, arguments) || this;
  }

  var _proto = Shape.prototype;

  _proto._initProperties = function _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false,
      isShape: true,
      attrs: {}
    };
  };

  _proto.getType = function getType() {
    return this._attrs.type;
  };

  _proto.drawInner = function drawInner(context) {
    var self = this;
    var attrs = self.get('attrs');
    self.createPath(context);
    var originOpacity = context.globalAlpha;

    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;

      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
        context.fill();
        context.globalAlpha = originOpacity;
      } else {
        context.fill();
      }
    }

    if (self.hasStroke()) {
      var lineWidth = attrs.lineWidth;

      if (lineWidth > 0) {
        var strokeOpacity = attrs.strokeOpacity;

        if (!Util.isNil(strokeOpacity) && strokeOpacity !== 1) {
          context.globalAlpha = strokeOpacity;
        }

        context.stroke();
      }
    }
  };

  _proto.getBBox = function getBBox() {
    var bbox = this._attrs.bbox;

    if (!bbox) {
      bbox = this.calculateBox();

      if (bbox) {
        bbox.x = bbox.minX;
        bbox.y = bbox.minY;
        bbox.width = bbox.maxX - bbox.minX;
        bbox.height = bbox.maxY - bbox.minY;
      }

      this._attrs.bbox = bbox;
    }

    return bbox;
  };

  _proto.calculateBox = function calculateBox() {
    return null;
  };

  _proto.createPath = function createPath() {};

  return Shape;
}(Element);

module.exports = Shape;
}, function(modId) { var map = {"../util/common":1578656684310,"./element":1578656684335}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684335, function(require, module, exports) {


var Util = require('../util/common');

var MatrixUtil = require('./util/matrix');

var Vector2 = require('./util/vector2');

var StyleUtil = require('./util/style-parse');

function isUnchanged(m) {
  return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
}

var ALIAS_ATTRS_MAP = {
  stroke: 'strokeStyle',
  fill: 'fillStyle',
  opacity: 'globalAlpha'
};
var SHAPE_ATTRS = ['fillStyle', 'font', 'globalAlpha', 'lineCap', 'lineWidth', 'lineJoin', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseline', 'lineDash', 'shadow' // 兼容支付宝小程序
];
var CLIP_SHAPES = ['circle', 'sector', 'polygon', 'rect', 'polyline'];

var Element =
/*#__PURE__*/
function () {
  var _proto = Element.prototype;

  _proto._initProperties = function _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false
    };
  };

  function Element(cfg) {
    this._initProperties();

    Util.mix(this._attrs, cfg);
    var attrs = this._attrs.attrs;

    if (attrs) {
      this.initAttrs(attrs);
    }

    this.initTransform();
  }

  _proto.get = function get(name) {
    return this._attrs[name];
  };

  _proto.set = function set(name, value) {
    this._attrs[name] = value;
  };

  _proto.isGroup = function isGroup() {
    return this.get('isGroup');
  };

  _proto.isShape = function isShape() {
    return this.get('isShape');
  };

  _proto.initAttrs = function initAttrs(attrs) {
    this.attr(Util.mix(this.getDefaultAttrs(), attrs));
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {};
  };

  _proto._setAttr = function _setAttr(name, value) {
    var attrs = this._attrs.attrs;

    if (name === 'clip') {
      value = this._setAttrClip(value);
    } else {
      var alias = ALIAS_ATTRS_MAP[name];

      if (alias) {
        attrs[alias] = value;
      }
    }

    attrs[name] = value;
  };

  _proto._getAttr = function _getAttr(name) {
    return this._attrs.attrs[name];
  } // _afterAttrsSet() {}
  ;

  _proto._setAttrClip = function _setAttrClip(clip) {
    if (clip && CLIP_SHAPES.indexOf(clip._attrs.type) > -1) {
      if (clip.get('canvas') === null) {
        clip = Object.assign({}, clip);
      }

      clip.set('parent', this.get('parent'));
      clip.set('context', this.get('context'));
      return clip;
    }

    return null;
  };

  _proto.attr = function attr(name, value) {
    var self = this;
    if (self.get('destroyed')) return null;
    var argumentsLen = arguments.length;

    if (argumentsLen === 0) {
      return self._attrs.attrs;
    }

    if (Util.isObject(name)) {
      this._attrs.bbox = null;

      for (var k in name) {
        self._setAttr(k, name[k]);
      }

      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }

      return self;
    }

    if (argumentsLen === 2) {
      this._attrs.bbox = null;

      self._setAttr(name, value);

      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }

      return self;
    }

    return self._getAttr(name);
  };

  _proto.getParent = function getParent() {
    return this.get('parent');
  };

  _proto.draw = function draw(context) {
    if (this.get('destroyed')) {
      return;
    }

    if (this.get('visible')) {
      this.setContext(context);
      this.drawInner(context);
      this.restoreContext(context);
    }
  };

  _proto.setContext = function setContext(context) {
    var clip = this._attrs.attrs.clip;
    context.save();

    if (clip) {
      clip.resetTransform(context);
      clip.createPath(context);
      context.clip();
    }

    this.resetContext(context);
    this.resetTransform(context);
  };

  _proto.restoreContext = function restoreContext(context) {
    context.restore();
  };

  _proto.resetContext = function resetContext(context) {
    var elAttrs = this._attrs.attrs;

    if (!this._attrs.isGroup) {
      for (var k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) {
          var v = elAttrs[k];

          if (k === 'fillStyle' || k === 'strokeStyle') {
            v = StyleUtil.parseStyle(v, this, context);
          }

          if (k === 'lineDash' && context.setLineDash && Util.isArray(v)) {
            context.setLineDash(v);
          } else {
            context[k] = v;
          }
        }
      }
    }
  };

  _proto.hasFill = function hasFill() {
    return this.get('canFill') && this._attrs.attrs.fillStyle;
  };

  _proto.hasStroke = function hasStroke() {
    return this.get('canStroke') && this._attrs.attrs.strokeStyle;
  };

  _proto.drawInner = function drawInner()
  /* context */
  {};

  _proto.show = function show() {
    this.set('visible', true);
    return this;
  };

  _proto.hide = function hide() {
    this.set('visible', false);
    return this;
  };

  _proto.isVisible = function isVisible() {
    return this.get('visible');
  };

  _proto._removeFromParent = function _removeFromParent() {
    var parent = this.get('parent');

    if (parent) {
      var children = parent.get('children');
      Util.Array.remove(children, this);
    }

    return this;
  };

  _proto.remove = function remove(destroy) {
    if (destroy) {
      this.destroy();
    } else {
      this._removeFromParent();
    }
  };

  _proto.destroy = function destroy() {
    var destroyed = this.get('destroyed');

    if (destroyed) {
      return null;
    }

    this._removeFromParent();

    this._attrs = {};
    this.set('destroyed', true);
  };

  _proto.getBBox = function getBBox() {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      width: 0,
      height: 0
    };
  };

  _proto.initTransform = function initTransform() {
    var attrs = this._attrs.attrs || {};

    if (!attrs.matrix) {
      attrs.matrix = [1, 0, 0, 1, 0, 0];
    }

    this._attrs.attrs = attrs;
  };

  _proto.getMatrix = function getMatrix() {
    return this._attrs.attrs.matrix;
  };

  _proto.setMatrix = function setMatrix(m) {
    this._attrs.attrs.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
  };

  _proto.transform = function transform(actions) {
    var matrix = this._attrs.attrs.matrix;
    this._attrs.attrs.matrix = MatrixUtil.transform(matrix, actions);
    return this;
  };

  _proto.setTransform = function setTransform(actions) {
    this._attrs.attrs.matrix = [1, 0, 0, 1, 0, 0];
    return this.transform(actions);
  };

  _proto.translate = function translate(x, y) {
    var matrix = this._attrs.attrs.matrix;
    MatrixUtil.translate(matrix, matrix, [x, y]);
  };

  _proto.rotate = function rotate(rad) {
    var matrix = this._attrs.attrs.matrix;
    MatrixUtil.rotate(matrix, matrix, rad);
  };

  _proto.scale = function scale(sx, sy) {
    var matrix = this._attrs.attrs.matrix;
    MatrixUtil.scale(matrix, matrix, [sx, sy]);
  };

  _proto.moveTo = function moveTo(x, y) {
    var cx = this._attrs.x || 0;
    var cy = this._attrs.y || 0;
    this.translate(x - cx, y - cy);
    this.set('x', x);
    this.set('y', y);
  };

  _proto.apply = function apply(v) {
    var m = this._attrs.attrs.matrix;
    Vector2.transformMat2d(v, v, m);
    return this;
  };

  _proto.resetTransform = function resetTransform(context) {
    var mo = this._attrs.attrs.matrix;

    if (!isUnchanged(mo)) {
      context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
    }
  };

  _proto.isDestroyed = function isDestroyed() {
    return this.get('destroyed');
  };

  return Element;
}();

module.exports = Element;
}, function(modId) { var map = {"../util/common":1578656684310,"./util/matrix":1578656684317,"./util/vector2":1578656684318,"./util/style-parse":1578656684336}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684336, function(require, module, exports) {


var Util = require('../../util/common');

function _mod(n, m) {
  return (n % m + m) % m;
}

function _addStop(steps, gradient) {
  Util.each(steps, function (item) {
    item = item.split(':');
    gradient.addColorStop(Number(item[0]), item[1]);
  });
} // the string format: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'


function _parseLineGradient(color, shape, context) {
  var arr = color.split(' ');
  var angle = arr[0].slice(2, arr[0].length - 1);
  angle = _mod(parseFloat(angle) * Math.PI / 180, Math.PI * 2);
  var steps = arr.slice(1);

  var _shape$getBBox = shape.getBBox(),
      minX = _shape$getBBox.minX,
      minY = _shape$getBBox.minY,
      maxX = _shape$getBBox.maxX,
      maxY = _shape$getBBox.maxY;

  var start;
  var end;

  if (angle >= 0 && angle < 0.5 * Math.PI) {
    start = {
      x: minX,
      y: minY
    };
    end = {
      x: maxX,
      y: maxY
    };
  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
    start = {
      x: maxX,
      y: minY
    };
    end = {
      x: minX,
      y: maxY
    };
  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
    start = {
      x: maxX,
      y: maxY
    };
    end = {
      x: minX,
      y: minY
    };
  } else {
    start = {
      x: minX,
      y: maxY
    };
    end = {
      x: maxX,
      y: minY
    };
  }

  var tanTheta = Math.tan(angle);
  var tanTheta2 = tanTheta * tanTheta;
  var x = (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
  var y = tanTheta * (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
  var gradient = context.createLinearGradient(start.x, start.y, x, y);

  _addStop(steps, gradient);

  return gradient;
} // the string format: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'


function _parseRadialGradient(color, shape, context) {
  var arr = color.split(' ');
  var circleCfg = arr[0].slice(2, arr[0].length - 1);
  circleCfg = circleCfg.split(',');
  var fx = parseFloat(circleCfg[0]);
  var fy = parseFloat(circleCfg[1]);
  var fr = parseFloat(circleCfg[2]);
  var steps = arr.slice(1); // if radius is 0, no gradient, stroke with the last color

  if (fr === 0) {
    var _color = steps[steps.length - 1];
    return _color.split(':')[1];
  }

  var _shape$getBBox2 = shape.getBBox(),
      width = _shape$getBBox2.width,
      height = _shape$getBBox2.height,
      minX = _shape$getBBox2.minX,
      minY = _shape$getBBox2.minY;

  var r = Math.sqrt(width * width + height * height) / 2;
  var gradient = context.createRadialGradient(minX + width * fx, minY + height * fy, fr * r, minX + width / 2, minY + height / 2, r);

  _addStop(steps, gradient);

  return gradient;
}

module.exports = {
  parseStyle: function parseStyle(color, shape, context) {
    if (color[1] === '(') {
      try {
        var firstCode = color[0];

        if (firstCode === 'l') {
          return _parseLineGradient(color, shape, context);
        } else if (firstCode === 'r') {
          return _parseRadialGradient(color, shape, context);
        }
      } catch (ev) {
        console.error('error in parsing gradient string, please check if there are any extra whitespaces.');
        console.error(ev);
      }
    }

    return color;
  }
};
}, function(modId) { var map = {"../../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684337, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../util/common');

var Element = require('./element');

var Container = require('./container');

var Vector2 = require('./util/vector2');

var Group =
/*#__PURE__*/
function (_Element) {
  (0, _inheritsLoose2["default"])(Group, _Element);

  function Group() {
    return _Element.apply(this, arguments) || this;
  }

  var _proto = Group.prototype;

  _proto._initProperties = function _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false,
      isGroup: true,
      children: []
    };
  };

  _proto.drawInner = function drawInner(context) {
    var children = this.get('children');

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child.draw(context);
    }

    return this;
  };

  _proto.getBBox = function getBBox() {
    var self = this;
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var children = self.get('children');

    for (var i = 0, length = children.length; i < length; i++) {
      var child = children[i];

      if (child.get('visible')) {
        var box = child.getBBox();

        if (!box) {
          continue;
        }

        var leftTop = [box.minX, box.minY];
        var leftBottom = [box.minX, box.maxY];
        var rightTop = [box.maxX, box.minY];
        var rightBottom = [box.maxX, box.maxY];
        var matrix = child.attr('matrix');
        Vector2.transformMat2d(leftTop, leftTop, matrix);
        Vector2.transformMat2d(leftBottom, leftBottom, matrix);
        Vector2.transformMat2d(rightTop, rightTop, matrix);
        Vector2.transformMat2d(rightBottom, rightBottom, matrix);
        minX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], minX);
        maxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], maxX);
        minY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], minY);
        maxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], maxY);
      }
    }

    return {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY,
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  };

  _proto.destroy = function destroy() {
    if (this.get('destroyed')) {
      return;
    }

    this.clear();

    _Element.prototype.destroy.call(this);
  };

  return Group;
}(Element);

Util.mix(Group.prototype, Container, {
  getGroupClass: function getGroupClass() {
    return Group;
  }
});
module.exports = Group;
}, function(modId) { var map = {"../util/common":1578656684310,"./element":1578656684335,"./container":1578656684333,"./util/vector2":1578656684318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684338, function(require, module, exports) {


module.exports = {
  requestAnimationFrame: typeof window === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame : function (fn) {
    return setTimeout(fn, 16);
  }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684339, function(require, module, exports) {


var Util = require('../util/common');

var CanvasElement =
/*#__PURE__*/
function () {
  function CanvasElement(ctx) {
    this.context = ctx; // canvas实际的宽高 (width/height) * pixelRatio

    this.width = 0;
    this.height = 0;
    this.style = {};
    this.currentStyle = {}; // 用来标识是CanvasElement实例

    this.isCanvasElement = true; // 实现简单的事件机制

    this.__events = {};
  }

  var _proto = CanvasElement.prototype;

  _proto.getContext = function getContext()
  /* type */
  {
    return this.context;
  };

  _proto.getBoundingClientRect = function getBoundingClientRect() {
    var width = this.width;
    var height = this.height; // 默认都处理成可视窗口的顶部位置

    return {
      top: 0,
      right: width,
      bottom: height,
      left: 0
    };
  };

  _proto.addEventListener = function addEventListener(type, listener) {
    var events = this.__events[type] || [];
    events.push(listener);
    this.__events[type] = events;
  };

  _proto.removeEventListener = function removeEventListener(type) {
    delete this.__events[type];
  };

  _proto.dispatchEvent = function dispatchEvent(type, e) {
    var _this = this;

    if (Util.isObject(type)) {
      e = type;
      type = e && e.type;
    }

    if (!type) {
      return;
    }

    var events = this.__events[type];

    if (!events || !events.length) {
      return;
    }

    events.forEach(function (listener) {
      listener.call(_this, e);
    });
  };

  return CanvasElement;
}();

function supportEventListener(canvas) {
  if (!canvas) {
    return false;
  } // 非 HTMLCanvasElement


  if (canvas.nodeType !== 1 || !canvas.nodeName || canvas.nodeName.toLowerCase() !== 'canvas') {
    return false;
  } // 微信小程序canvas.getContext('2d')时也是CanvasRenderingContext2D
  // 也会有ctx.canvas, 而且nodeType也是1，所以还要在看下是否支持addEventListener


  var support = false;

  try {
    canvas.addEventListener('eventTest', function () {
      support = true;
    });
    canvas.dispatchEvent(new Event('eventTest'));
  } catch (error) {
    support = false;
  }

  return support;
}

module.exports = {
  create: function create(ctx) {
    if (!ctx) {
      return null;
    }

    if (supportEventListener(ctx.canvas)) {
      return ctx.canvas;
    }

    return new CanvasElement(ctx);
  }
};
}, function(modId) { var map = {"../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684340, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var Shape = require('../shape');

var Rect =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Rect, _Shape);

  function Rect() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Rect.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'rect';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      radius: 0,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        width = attrs.width,
        height = attrs.height;
    context.beginPath();
    var radius = attrs.radius;

    if (!radius || !(width * height)) {
      context.rect(x, y, width, height);
    } else {
      radius = Util.parsePadding(radius);
      context.moveTo(x + radius[0], y);
      context.lineTo(x + width - radius[1], y);
      context.arc(x + width - radius[1], y + radius[1], radius[1], -Math.PI / 2, 0, false);
      context.lineTo(x + width, y + height - radius[2]);
      context.arc(x + width - radius[2], y + height - radius[2], radius[2], 0, Math.PI / 2, false);
      context.lineTo(x + radius[3], y + height);
      context.arc(x + radius[3], y + height - radius[3], radius[3], Math.PI / 2, Math.PI, false);
      context.lineTo(x, y + radius[0]);
      context.arc(x + radius[0], y + radius[0], radius[0], Math.PI, Math.PI * 3 / 2, false);
      context.closePath();
    }
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        width = attrs.width,
        height = attrs.height;
    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
  };

  return Rect;
}(Shape);

Shape.Rect = Rect;
module.exports = Rect;
}, function(modId) { var map = {"../../util/common":1578656684310,"../shape":1578656684334}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684341, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Shape = require('../shape');

var Circle =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Circle, _Shape);

  function Circle() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Circle.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'circle';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r;
    return {
      minX: x - r,
      maxX: x + r,
      minY: y - r,
      maxY: y + r
    };
  };

  return Circle;
}(Shape);

Shape.Circle = Circle;
module.exports = Circle;
}, function(modId) { var map = {"../shape":1578656684334}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684342, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Shape = require('../shape');

var bbox = require('../util/bbox');

var Line =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Line, _Shape);

  function Line() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canStroke = true;
    this._attrs.type = 'line';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      lineWidth: 1
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2,
        lineWidth = attrs.lineWidth;
    return bbox.getBBoxFromLine(x1, y1, x2, y2, lineWidth);
  };

  return Line;
}(Shape);

Shape.Line = Line;
module.exports = Line;
}, function(modId) { var map = {"../shape":1578656684334,"../util/bbox":1578656684343}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684343, function(require, module, exports) {


var Vector2 = require('./vector2');

var start = Vector2.create();
var end = Vector2.create();
var extremity = Vector2.create();

function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
  var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
  return {
    x: x,
    y: y
  };
} // cubic helper formula at T distance


function CubicN(T, a, b, c, d) {
  var t2 = T * T;
  var t3 = t2 * T;
  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

function cubicBezierBounds(c) {
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;
  var s = {
    x: c[0],
    y: c[1]
  };
  var c1 = {
    x: c[2],
    y: c[3]
  };
  var c2 = {
    x: c[4],
    y: c[5]
  };
  var e = {
    x: c[6],
    y: c[7]
  };

  for (var t = 0; t < 100; t++) {
    var pt = getCubicBezierXYatT(s, c1, c2, e, t / 100);

    if (pt.x < minX) {
      minX = pt.x;
    }

    if (pt.x > maxX) {
      maxX = pt.x;
    }

    if (pt.y < minY) {
      minY = pt.y;
    }

    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }

  return {
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY
  };
}

module.exports = {
  getBBoxFromPoints: function getBBoxFromPoints(points, lineWidth) {
    if (points.length === 0) {
      return;
    }

    var p = points[0];
    var left = p.x;
    var right = p.x;
    var top = p.y;
    var bottom = p.y;
    var len = points.length;

    for (var i = 1; i < len; i++) {
      p = points[i];
      left = Math.min(left, p.x);
      right = Math.max(right, p.x);
      top = Math.min(top, p.y);
      bottom = Math.max(bottom, p.y);
    }

    lineWidth = lineWidth / 2 || 0;
    return {
      minX: left - lineWidth,
      minY: top - lineWidth,
      maxX: right + lineWidth,
      maxY: bottom + lineWidth
    };
  },
  getBBoxFromLine: function getBBoxFromLine(x0, y0, x1, y1, lineWidth) {
    lineWidth = lineWidth / 2 || 0;
    return {
      minX: Math.min(x0, x1) - lineWidth,
      minY: Math.min(y0, y1) - lineWidth,
      maxX: Math.max(x0, x1) + lineWidth,
      maxY: Math.max(y0, y1) + lineWidth
    };
  },
  getBBoxFromArc: function getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise) {
    var diff = Math.abs(startAngle - endAngle);

    if (diff % (Math.PI * 2) < 1e-4 && diff > 1e-4) {
      // Is a circle
      return {
        minX: x - r,
        minY: y - r,
        maxX: x + r,
        maxY: y + r
      };
    }

    start[0] = Math.cos(startAngle) * r + x;
    start[1] = Math.sin(startAngle) * r + y;
    end[0] = Math.cos(endAngle) * r + x;
    end[1] = Math.sin(endAngle) * r + y;
    var min = [0, 0];
    var max = [0, 0];
    Vector2.min(min, start, end);
    Vector2.max(max, start, end); // Thresh to [0, Math.PI * 2]

    startAngle = startAngle % (Math.PI * 2);

    if (startAngle < 0) {
      startAngle = startAngle + Math.PI * 2;
    }

    endAngle = endAngle % (Math.PI * 2);

    if (endAngle < 0) {
      endAngle = endAngle + Math.PI * 2;
    }

    if (startAngle > endAngle && !anticlockwise) {
      endAngle += Math.PI * 2;
    } else if (startAngle < endAngle && anticlockwise) {
      startAngle += Math.PI * 2;
    }

    if (anticlockwise) {
      var tmp = endAngle;
      endAngle = startAngle;
      startAngle = tmp;
    }

    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
      if (angle > startAngle) {
        extremity[0] = Math.cos(angle) * r + x;
        extremity[1] = Math.sin(angle) * r + y;
        Vector2.min(min, extremity, min);
        Vector2.max(max, extremity, max);
      }
    }

    return {
      minX: min[0],
      minY: min[1],
      maxX: max[0],
      maxY: max[1]
    };
  },
  getBBoxFromBezierGroup: function getBBoxFromBezierGroup(points, lineWidth) {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;

    for (var i = 0, len = points.length; i < len; i++) {
      var bbox = cubicBezierBounds(points[i]);

      if (bbox.minX < minX) {
        minX = bbox.minX;
      }

      if (bbox.maxX > maxX) {
        maxX = bbox.maxX;
      }

      if (bbox.minY < minY) {
        minY = bbox.minY;
      }

      if (bbox.maxY > maxY) {
        maxY = bbox.maxY;
      }
    }

    lineWidth = lineWidth / 2 || 0;
    return {
      minX: minX - lineWidth,
      minY: minY - lineWidth,
      maxX: maxX + lineWidth,
      maxY: maxY + lineWidth
    };
  }
};
}, function(modId) { var map = {"./vector2":1578656684318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684344, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Shape = require('../shape');

var bbox = require('../util/bbox');

var Polygon =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Polygon, _Shape);

  function Polygon() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Polygon.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'polygon';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var points = attrs.points;
    context.beginPath();

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];

      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }

    context.closePath();
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var points = attrs.points;
    return bbox.getBBoxFromPoints(points);
  };

  return Polygon;
}(Shape);

Shape.Polygon = Polygon;
module.exports = Polygon;
}, function(modId) { var map = {"../shape":1578656684334,"../util/bbox":1578656684343}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684345, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Shape = require('../shape');

var Smooth = require('../util/smooth');

var bbox = require('../util/bbox'); // filter the point which x or y is NaN


function _filterPoints(points) {
  var filteredPoints = [];

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (!isNaN(point.x) && !isNaN(point.y)) {
      filteredPoints.push(point);
    }
  }

  return filteredPoints;
}

var Polyline =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Polyline, _Shape);

  function Polyline() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Polyline.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'polyline';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 1,
      smooth: false
    };
  };

  _proto.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var points = attrs.points,
        smooth = attrs.smooth;

    var filteredPoints = _filterPoints(points);

    context.beginPath();

    if (filteredPoints.length) {
      context.moveTo(filteredPoints[0].x, filteredPoints[0].y);

      if (smooth) {
        var constaint = [[0, 0], [1, 1]];
        var sps = Smooth.smooth(filteredPoints, false, constaint);

        for (var i = 0, n = sps.length; i < n; i++) {
          var sp = sps[i];
          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
        }
      } else {
        var _i;

        var l;

        for (_i = 1, l = filteredPoints.length - 1; _i < l; _i++) {
          context.lineTo(filteredPoints[_i].x, filteredPoints[_i].y);
        }

        context.lineTo(filteredPoints[l].x, filteredPoints[l].y);
      }
    }
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var points = attrs.points,
        smooth = attrs.smooth,
        lineWidth = attrs.lineWidth;

    var filteredPoints = _filterPoints(points);

    if (smooth) {
      var newPoints = [];
      var constaint = [[0, 0], [1, 1]];
      var sps = Smooth.smooth(filteredPoints, false, constaint);

      for (var i = 0, n = sps.length; i < n; i++) {
        var sp = sps[i];

        if (i === 0) {
          newPoints.push([filteredPoints[0].x, filteredPoints[0].y, sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
        } else {
          var lastPoint = sps[i - 1];
          newPoints.push([lastPoint[5], lastPoint[6], sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
        }
      }

      return bbox.getBBoxFromBezierGroup(newPoints, lineWidth);
    }

    return bbox.getBBoxFromPoints(filteredPoints, lineWidth);
  };

  return Polyline;
}(Shape);

Shape.Polyline = Polyline;
module.exports = Polyline;
}, function(modId) { var map = {"../shape":1578656684334,"../util/smooth":1578656684346,"../util/bbox":1578656684343}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684346, function(require, module, exports) {


/**
 * @fileOverview convert the line to curve
 * @author dxq613@gmail.com
 */
var Vector2 = require('./vector2');

function getPoint(v) {
  return [v.x, v.y];
}

function smoothBezier(points, smooth, isLoop, constraint) {
  var cps = [];
  var prevPoint;
  var nextPoint;
  var hasConstraint = !!constraint;
  var min;
  var max;
  var point;
  var len;
  var l;
  var i;

  if (hasConstraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (i = 0, l = points.length; i < l; i++) {
      point = getPoint(points[i]);
      Vector2.min(min, min, point);
      Vector2.max(max, max, point);
    }

    Vector2.min(min, min, constraint[0]);
    Vector2.max(max, max, constraint[1]);
  }

  for (i = 0, len = points.length; i < len; i++) {
    point = getPoint(points[i]);

    if (isLoop) {
      prevPoint = getPoint(points[i ? i - 1 : len - 1]);
      nextPoint = getPoint(points[(i + 1) % len]);
    } else {
      if (i === 0 || i === len - 1) {
        cps.push([point[0], point[1]]);
        continue;
      } else {
        prevPoint = getPoint(points[i - 1]);
        nextPoint = getPoint(points[i + 1]);
      }
    }

    var v = Vector2.sub([], nextPoint, prevPoint);
    Vector2.scale(v, v, smooth);
    var d0 = Vector2.distance(point, prevPoint);
    var d1 = Vector2.distance(point, nextPoint);
    var sum = d0 + d1;

    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    var v1 = Vector2.scale([], v, -d0);
    var v2 = Vector2.scale([], v, d1);
    var cp0 = Vector2.add([], point, v1);
    var cp1 = Vector2.add([], point, v2);

    if (hasConstraint) {
      Vector2.max(cp0, cp0, min);
      Vector2.min(cp0, cp0, max);
      Vector2.max(cp1, cp1, min);
      Vector2.min(cp1, cp1, max);
    }

    cps.push([cp0[0], cp0[1]]);
    cps.push([cp1[0], cp1[1]]);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }

  return cps;
}

function catmullRom2bezier(pointList, z, constraint) {
  var isLoop = !!z;
  var controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  var len = pointList.length;
  var d1 = [];
  var cp1;
  var cp2;
  var p;

  for (var i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }

  return d1;
}

module.exports = {
  smooth: catmullRom2bezier
};
}, function(modId) { var map = {"./vector2":1578656684318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684347, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Shape = require('../shape');

var bbox = require('../util/bbox');

var Arc =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Arc, _Shape);

  function Arc() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Arc.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canStroke = true;
    this._attrs.canFill = true;
    this._attrs.type = 'arc';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      anticlockwise: false,
      lineWidth: 1
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        anticlockwise = attrs.anticlockwise;
    context.beginPath();

    if (startAngle !== endAngle) {
      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
    }
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        anticlockwise = attrs.anticlockwise;
    return bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
  };

  return Arc;
}(Shape);

Shape.Arc = Arc;
module.exports = Arc;
}, function(modId) { var map = {"../shape":1578656684334,"../util/bbox":1578656684343}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684348, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Shape = require('../shape');

var bbox = require('../util/bbox');

var Sector =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Sector, _Shape);

  function Sector() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Sector.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'sector';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 0,
      r: 0,
      r0: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      anticlockwise: false
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        r = attrs.r,
        r0 = attrs.r0,
        anticlockwise = attrs.anticlockwise;
    context.beginPath();
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    context.moveTo(unitX * r0 + x, unitY * r0 + y);
    context.lineTo(unitX * r + x, unitY * r + y); // 当扇形的角度非常小的时候，就不进行弧线的绘制；或者整个只有1个扇形时，会出现end<0的情况不绘制

    if (Math.abs(endAngle - startAngle) > 0.0001 || startAngle === 0 && endAngle < 0) {
      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
      context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);

      if (r0 !== 0) {
        context.arc(x, y, r0, endAngle, startAngle, !anticlockwise);
      }
    }

    context.closePath();
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        r0 = attrs.r0,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        anticlockwise = attrs.anticlockwise;
    var outerBBox = bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
    var innerBBox = bbox.getBBoxFromArc(x, y, r0, startAngle, endAngle, anticlockwise);
    return {
      minX: Math.min(outerBBox.minX, innerBBox.minX),
      minY: Math.min(outerBBox.minY, innerBBox.minY),
      maxX: Math.max(outerBBox.maxX, innerBBox.maxX),
      maxY: Math.max(outerBBox.maxY, innerBBox.maxY)
    };
  };

  return Sector;
}(Shape);

Shape.Sector = Sector;
module.exports = Sector;
}, function(modId) { var map = {"../shape":1578656684334,"../util/bbox":1578656684343}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684349, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var Shape = require('../shape');

var RectUtil = require('../util/rect');

var textWidthCacheCounter = 0;
var textWidthCache = {};
var TEXT_CACHE_MAX = 5000;

var Text =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Text, _Shape);

  function Text() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'text';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      lineWidth: 0,
      lineCount: 1,
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textAlign: 'start',
      textBaseline: 'bottom',
      lineHeight: null,
      textArr: null
    };
  };

  _proto._getFontStyle = function _getFontStyle() {
    var attrs = this._attrs.attrs;
    var fontSize = attrs.fontSize,
        fontFamily = attrs.fontFamily,
        fontWeight = attrs.fontWeight,
        fontStyle = attrs.fontStyle,
        fontVariant = attrs.fontVariant;
    return fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + "px " + fontFamily;
  };

  _proto._afterAttrsSet = function _afterAttrsSet() {
    var attrs = this._attrs.attrs;
    attrs.font = this._getFontStyle();

    if (attrs.text) {
      var text = attrs.text;
      var textArr = null;
      var lineCount = 1;

      if (Util.isString(text) && text.indexOf('\n') !== -1) {
        textArr = text.split('\n');
        lineCount = textArr.length;
      }

      attrs.lineCount = lineCount;
      attrs.textArr = textArr;
    }

    this.set('attrs', attrs);
  };

  _proto._getTextHeight = function _getTextHeight() {
    var attrs = this._attrs.attrs;

    if (attrs.height) {
      return attrs.height;
    }

    var lineCount = attrs.lineCount;
    var fontSize = attrs.fontSize * 1;

    if (lineCount > 1) {
      var spaceingY = this._getSpaceingY();

      return fontSize * lineCount + spaceingY * (lineCount - 1);
    }

    return fontSize;
  };

  _proto._getSpaceingY = function _getSpaceingY() {
    var attrs = this._attrs.attrs;
    var lineHeight = attrs.lineHeight;
    var fontSize = attrs.fontSize * 1;
    return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
  };

  _proto.drawInner = function drawInner(context) {
    var self = this;
    var attrs = self._attrs.attrs;
    var text = attrs.text;
    var x = attrs.x;
    var y = attrs.y;

    if (Util.isNil(text) || isNaN(x) || isNaN(y)) {
      // text will be 0
      return;
    }

    var textArr = attrs.textArr;
    var fontSize = attrs.fontSize * 1;

    var spaceingY = self._getSpaceingY();

    if (attrs.rotate) {
      // do rotation
      context.translate(x, y);
      context.rotate(attrs.rotate);
      x = 0;
      y = 0;
    }

    var textBaseline = attrs.textBaseline;
    var height;

    if (textArr) {
      height = self._getTextHeight();
    }

    var subY; // context.beginPath();

    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;

      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
      }

      if (textArr) {
        for (var i = 0, len = textArr.length; i < len; i++) {
          var subText = textArr[i];
          subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;

          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }

          if (textBaseline === 'top') {
            subY += height - fontSize;
          }

          context.fillText(subText, x, subY);
        }
      } else {
        context.fillText(text, x, y);
      }
    }

    if (self.hasStroke()) {
      if (textArr) {
        for (var _i = 0, _len = textArr.length; _i < _len; _i++) {
          var _subText = textArr[_i];
          subY = y + _i * (spaceingY + fontSize) - height + fontSize; // bottom;

          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }

          if (textBaseline === 'top') {
            subY += height - fontSize;
          }

          context.strokeText(_subText, x, subY);
        }
      } else {
        context.strokeText(text, x, y);
      }
    }
  };

  _proto.calculateBox = function calculateBox() {
    var self = this;
    var attrs = self._attrs.attrs;
    var x = attrs.x,
        y = attrs.y,
        textAlign = attrs.textAlign,
        textBaseline = attrs.textBaseline;

    var width = self._getTextWidth(); // attrs.width


    if (!width) {
      return {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y
      };
    }

    var height = self._getTextHeight(); // attrs.height


    if (attrs.rotate) {
      var rotatedBox = RectUtil.calcRotatedBox({
        width: width,
        height: height,
        rotate: attrs.rotate
      });
      width = rotatedBox.width;
      height = rotatedBox.height;
    }

    var point = {
      x: x,
      y: y - height
    }; // default textAlign: start, textBaseline: bottom

    if (textAlign) {
      if (textAlign === 'end' || textAlign === 'right') {
        point.x -= width;
      } else if (textAlign === 'center') {
        point.x -= width / 2;
      }
    }

    if (textBaseline) {
      if (textBaseline === 'top') {
        point.y += height;
      } else if (textBaseline === 'middle') {
        point.y += height / 2;
      }
    }

    return {
      minX: point.x,
      minY: point.y,
      maxX: point.x + width,
      maxY: point.y + height
    };
  };

  _proto._getTextWidth = function _getTextWidth() {
    var attrs = this._attrs.attrs;

    if (attrs.width) {
      return attrs.width;
    }

    var text = attrs.text;
    var context = this.get('context');
    if (Util.isNil(text)) return undefined;
    var font = attrs.font;
    var textArr = attrs.textArr;
    var key = text + '' + font;

    if (textWidthCache[key]) {
      return textWidthCache[key];
    }

    var width = 0;

    if (textArr) {
      for (var i = 0, length = textArr.length; i < length; i++) {
        var subText = textArr[i];
        width = Math.max(width, Util.measureText(subText, font, context).width);
      }
    } else {
      width = Util.measureText(text, font, context).width;
    }

    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
      textWidthCacheCounter = 0;
      textWidthCache = {};
    }

    textWidthCacheCounter++;
    textWidthCache[key] = width;
    return width;
  };

  return Text;
}(Shape);

Shape.Text = Text;
module.exports = Text;
}, function(modId) { var map = {"../../util/common":1578656684310,"../shape":1578656684334,"../util/rect":1578656684350}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684350, function(require, module, exports) {


var Rect = {
  calcRotatedBox: function calcRotatedBox(_ref) {
    var width = _ref.width,
        height = _ref.height,
        rotate = _ref.rotate;
    var absRotate = Math.abs(rotate);
    return {
      width: Math.abs(width * Math.cos(absRotate) + height * Math.sin(absRotate)),
      height: Math.abs(height * Math.cos(absRotate) + width * Math.sin(absRotate))
    };
  }
};
module.exports = Rect;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684351, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Shape = require('../shape');

var Custom =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Custom, _Shape);

  function Custom() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Custom.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.createPath = null;
    this._attrs.type = 'custom';
  };

  _proto.createPath = function createPath(context) {
    var createPath = this.get('createPath');
    createPath && createPath.call(this, context);
  };

  _proto.calculateBox = function calculateBox() {
    var calculateBox = this.get('calculateBox');
    return calculateBox && calculateBox.call(this);
  };

  return Custom;
}(Shape);

Shape.Custom = Custom;
module.exports = Custom;
}, function(modId) { var map = {"../shape":1578656684334}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684352, function(require, module, exports) {


var _require = require('../graphic/index'),
    Shape = _require.Shape;

module.exports = {
  getClip: function getClip(coord) {
    var start = coord.start;
    var end = coord.end;
    var width = end.x - start.x;
    var height = Math.abs(end.y - start.y);
    var margin = 10;
    var clip;

    if (coord.isPolar) {
      var circleRadius = coord.circleRadius,
          center = coord.center,
          startAngle = coord.startAngle,
          endAngle = coord.endAngle;
      clip = new Shape.Sector({
        attrs: {
          x: center.x,
          y: center.y,
          r: circleRadius,
          r0: 0,
          startAngle: startAngle,
          endAngle: endAngle
        }
      });
    } else {
      clip = new Shape.Rect({
        attrs: {
          x: start.x,
          y: end.y - margin,
          width: width,
          height: height + 2 * margin
        }
      });
    }

    clip.isClip = true;
    return clip;
  },
  isPointInPlot: function isPointInPlot(point, plot) {
    var x = point.x,
        y = point.y;
    var tl = plot.tl,
        tr = plot.tr,
        br = plot.br;
    return x >= tl.x && x <= tr.x && y >= tl.y && y <= br.y;
  }
};
}, function(modId) { var map = {"../graphic/index":1578656684331}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684353, function(require, module, exports) {


var Geom = require('./base');

require('./point');

require('./path');

require('./line');

require('./area');

require('./interval');

require('./polygon');

require('./schema');

module.exports = Geom;
}, function(modId) { var map = {"./base":1578656684320,"./point":1578656684354,"./path":1578656684357,"./line":1578656684359,"./area":1578656684360,"./interval":1578656684362,"./polygon":1578656684365,"./schema":1578656684367}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684354, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../util/common');

var Geom = require('./base');

require('./shape/point');

var Point =
/*#__PURE__*/
function (_Geom) {
  (0, _inheritsLoose2["default"])(Point, _Geom);

  function Point() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Point.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'point';
    cfg.shapeType = 'point';
    cfg.generatePoints = true;
    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    Util.each(data, function (obj) {
      var shape = obj.shape;
      var cfg = self.getDrawCfg(obj);

      if (Util.isArray(obj.y)) {
        var hasStack = self.hasAdjust('stack');
        Util.each(obj.y, function (y, idx) {
          cfg.y = y;

          if (!hasStack || idx !== 0) {
            self.drawShape(shape, obj, cfg, container, shapeFactory);
          }
        });
      } else if (!Util.isNil(obj.y)) {
        self.drawShape(shape, obj, cfg, container, shapeFactory);
      }
    });
  };

  return Point;
}(Geom);

Geom.Point = Point;
module.exports = Point;
}, function(modId) { var map = {"../util/common":1578656684310,"./base":1578656684320,"./shape/point":1578656684355}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684355, function(require, module, exports) {


var Util = require('../../util/common');

var Global = require('../../global');

var ShapeUtil = require('./util');

var Shape = require('./shape');

var SHAPES = ['circle', 'hollowCircle', 'rect'];
var Point = Shape.registerFactory('point', {
  defaultShapeType: 'circle',
  getDefaultPoints: function getDefaultPoints(pointInfo) {
    return ShapeUtil.splitPoints(pointInfo);
  }
});

function getPointsCfg(cfg) {
  var style = {
    lineWidth: 0,
    stroke: cfg.color,
    fill: cfg.color
  };

  if (cfg.size) {
    style.size = cfg.size;
  }

  Util.mix(style, cfg.style);
  return Util.mix({}, Global.shape.point, style);
}

function drawShape(cfg, container, shape) {
  if (cfg.size === 0) return;
  var pointCfg = getPointsCfg(cfg);
  var size = pointCfg.r || pointCfg.size;
  var x = cfg.x;
  var y = !Util.isArray(cfg.y) ? [cfg.y] : cfg.y;

  if (shape === 'hollowCircle') {
    pointCfg.lineWidth = 1;
    pointCfg.fill = null;
  }

  for (var i = 0, len = y.length; i < len; i++) {
    if (shape === 'rect') {
      return container.addShape('Rect', {
        className: 'point',
        attrs: Util.mix({
          x: x - size,
          y: y[i] - size,
          width: size * 2,
          height: size * 2
        }, pointCfg)
      });
    }

    return container.addShape('Circle', {
      className: 'point',
      attrs: Util.mix({
        x: x,
        y: y[i],
        r: size
      }, pointCfg)
    });
  }
}

Util.each(SHAPES, function (shapeType) {
  Shape.registerShape('point', shapeType, {
    draw: function draw(cfg, container) {
      return drawShape(cfg, container, shapeType);
    }
  });
});
module.exports = Point;
}, function(modId) { var map = {"../../util/common":1578656684310,"../../global":1578656684308,"./util":1578656684356,"./shape":1578656684324}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684356, function(require, module, exports) {


/**
 * @fileOverview shape util
 * @author dxq613@gmail.com
 */
var Util = require('../../util/common');

var ShapeUtil = {
  splitPoints: function splitPoints(obj) {
    var points = [];
    var x = obj.x;
    var y = obj.y;
    y = Util.isArray(y) ? y : [y];
    y.forEach(function (yItem, index) {
      var point = {
        x: Util.isArray(x) ? x[index] : x,
        y: yItem
      };
      points.push(point);
    });
    return points;
  },
  splitArray: function splitArray(data, yField, connectNulls) {
    if (!data.length) return [];
    var arr = [];
    var tmp = [];
    var yValue;
    Util.each(data, function (obj) {
      yValue = obj._origin ? obj._origin[yField] : obj[yField];

      if (connectNulls) {
        if (!Util.isNil(yValue)) {
          tmp.push(obj);
        }
      } else {
        if (Util.isArray(yValue) && Util.isNil(yValue[0]) || Util.isNil(yValue)) {
          if (tmp.length) {
            arr.push(tmp);
            tmp = [];
          }
        } else {
          tmp.push(obj);
        }
      }
    });

    if (tmp.length) {
      arr.push(tmp);
    }

    return arr;
  }
};
module.exports = ShapeUtil;
}, function(modId) { var map = {"../../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684357, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Geom = require('./base');

var ShapeUtil = require('./shape/util');

var Util = require('../util/common');

require('./shape/line');

var Path =
/*#__PURE__*/
function (_Geom) {
  (0, _inheritsLoose2["default"])(Path, _Geom);

  function Path() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Path.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'path';
    cfg.shapeType = 'line';
    return cfg;
  };

  _proto.getDrawCfg = function getDrawCfg(obj) {
    var cfg = _Geom.prototype.getDrawCfg.call(this, obj);

    cfg.isStack = this.hasAdjust('stack');
    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var yScale = self.getYScale();
    var connectNulls = self.get('connectNulls');
    var splitArray = ShapeUtil.splitArray(data, yScale.field, connectNulls);
    var cfg = this.getDrawCfg(data[0]);
    cfg.origin = data;
    Util.each(splitArray, function (subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      cfg.points = subData;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  };

  return Path;
}(Geom);

Geom.Path = Path;
module.exports = Path;
}, function(modId) { var map = {"./base":1578656684320,"./shape/util":1578656684356,"../util/common":1578656684310,"./shape/line":1578656684358}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684358, function(require, module, exports) {


var Util = require('../../util/common');

var Shape = require('./shape');

var ShapeUtil = require('./util');

var Global = require('../../global'); // register line geom


var Line = Shape.registerFactory('line', {
  defaultShapeType: 'line'
});

function getStyle(cfg) {
  var style = {
    strokeStyle: cfg.color
  };

  if (cfg.size >= 0) {
    style.lineWidth = cfg.size;
  }

  Util.mix(style, cfg.style);
  return Util.mix({}, Global.shape.line, style);
}

function drawLines(cfg, container, style, smooth) {
  var points = cfg.points;

  if (points.length && Util.isArray(points[0].y)) {
    var topPoints = [];
    var bottomPoints = [];

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      var tmp = ShapeUtil.splitPoints(point);
      bottomPoints.push(tmp[0]);
      topPoints.push(tmp[1]);
    }

    if (cfg.isInCircle) {
      topPoints.push(topPoints[0]);
      bottomPoints.push(bottomPoints[0]);
    }

    if (cfg.isStack) {
      return container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: topPoints,
          smooth: smooth
        }, style)
      });
    }

    var topShape = container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points: topPoints,
        smooth: smooth
      }, style)
    });
    var bottomShape = container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points: bottomPoints,
        smooth: smooth
      }, style)
    });
    return [topShape, bottomShape];
  }

  if (cfg.isInCircle) {
    points.push(points[0]);
  }

  return container.addShape('Polyline', {
    className: 'line',
    attrs: Util.mix({
      points: points,
      smooth: smooth
    }, style)
  });
}

var SHAPES = ['line', 'smooth', 'dash'];
Util.each(SHAPES, function (shapeType) {
  Shape.registerShape('line', shapeType, {
    draw: function draw(cfg, container) {
      var smooth = shapeType === 'smooth';
      var style = getStyle(cfg);

      if (shapeType === 'dash') {
        style.lineDash = Global.lineDash;
      }

      return drawLines(cfg, container, style, smooth);
    }
  });
});
module.exports = Line;
}, function(modId) { var map = {"../../util/common":1578656684310,"./shape":1578656684324,"./util":1578656684356,"../../global":1578656684308}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684359, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Path = require('./path');

var Geom = require('./base');

require('./shape/line');

var Line =
/*#__PURE__*/
function (_Path) {
  (0, _inheritsLoose2["default"])(Line, _Path);

  function Line() {
    return _Path.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Path.prototype.getDefaultCfg.call(this);

    cfg.type = 'line';
    cfg.sortable = true;
    return cfg;
  };

  return Line;
}(Path);

Geom.Line = Line;
module.exports = Line;
}, function(modId) { var map = {"./path":1578656684357,"./base":1578656684320,"./shape/line":1578656684358}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684360, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * @fileOverview area geometry
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
var Geom = require('./base');

var ShapeUtil = require('./shape/util');

var Util = require('../util/common');

require('./shape/area');

var Area =
/*#__PURE__*/
function (_Geom) {
  (0, _inheritsLoose2["default"])(Area, _Geom);

  function Area() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Area.prototype;

  /**
   * get the default configuration
   * @protected
   * @return {Object} return the result
   */
  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'area';
    cfg.shapeType = 'area';
    cfg.generatePoints = true;
    cfg.sortable = true;
    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var cfg = this.getDrawCfg(data[0]);
    var yScale = self.getYScale();
    var connectNulls = self.get('connectNulls');
    var splitArray = ShapeUtil.splitArray(data, yScale.field, connectNulls);
    cfg.origin = data;
    Util.each(splitArray, function (subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      var points = subData.map(function (obj) {
        return obj.points;
      });
      cfg.points = points;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  };

  return Area;
}(Geom);

Geom.Area = Area;
module.exports = Area;
}, function(modId) { var map = {"./base":1578656684320,"./shape/util":1578656684356,"../util/common":1578656684310,"./shape/area":1578656684361}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684361, function(require, module, exports) {


var Util = require('../../util/common');

var Shape = require('./shape');

var Smooth = require('../../graphic/util/smooth');

var bbox = require('../../graphic/util/bbox');

var Global = require('../../global');

function equals(v1, v2) {
  return Math.abs(v1 - v2) < 0.00001;
}

function notEmpty(value) {
  return !isNaN(value) && !Util.isNil(value);
}

function filterPoints(points) {
  var filteredPoints = []; // filter the point which x or y is NaN

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (notEmpty(point.x) && notEmpty(point.y)) {
      filteredPoints.push(point);
    }
  }

  return filteredPoints;
}

function equalsCenter(points, center) {
  var eqls = true;
  Util.each(points, function (point) {
    if (!equals(point.x, center.x) || !equals(point.y, center.y)) {
      eqls = false;
      return false;
    }
  });
  return eqls;
}

function drawRectShape(topPoints, bottomPoints, container, style, isSmooth) {
  var shape;
  var points = topPoints.concat(bottomPoints);

  if (isSmooth) {
    shape = container.addShape('Custom', {
      className: 'area',
      attrs: Util.mix({
        points: points
      }, style),
      createPath: function createPath(context) {
        var constaint = [[0, 0], [1, 1]];
        var points = filterPoints(this._attrs.attrs.points);
        var pointsLen = points.length;
        var topPoints = points.slice(0, pointsLen / 2);
        var bottomPoints = points.slice(pointsLen / 2, pointsLen);
        var topSps = Smooth.smooth(topPoints, false, constaint);
        context.beginPath();
        context.moveTo(topPoints[0].x, topPoints[0].y);

        for (var i = 0, n = topSps.length; i < n; i++) {
          var sp = topSps[i];
          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
        }

        if (bottomPoints.length) {
          var bottomSps = Smooth.smooth(bottomPoints, false, constaint);
          context.lineTo(bottomPoints[0].x, bottomPoints[0].y);

          for (var _i = 0, _n = bottomSps.length; _i < _n; _i++) {
            var _sp = bottomSps[_i];
            context.bezierCurveTo(_sp[1], _sp[2], _sp[3], _sp[4], _sp[5], _sp[6]);
          }
        }

        context.closePath();
      },
      calculateBox: function calculateBox() {
        var points = filterPoints(this._attrs.attrs.points);
        return bbox.getBBoxFromPoints(points);
      }
    });
  } else {
    shape = container.addShape('Polyline', {
      className: 'area',
      attrs: Util.mix({
        points: points
      }, style)
    });
  }

  return shape;
}

function drawShape(cfg, container, isSmooth) {
  var self = this;
  var points = cfg.points;
  var topPoints = [];
  var bottomPoints = [];
  Util.each(points, function (point) {
    bottomPoints.push(point[0]);
    topPoints.push(point[1]);
  });
  var style = Util.mix({
    fillStyle: cfg.color
  }, Global.shape.area, cfg.style);
  bottomPoints.reverse();
  topPoints = self.parsePoints(topPoints);
  bottomPoints = self.parsePoints(bottomPoints);

  if (cfg.isInCircle) {
    topPoints.push(topPoints[0]);
    bottomPoints.unshift(bottomPoints[bottomPoints.length - 1]);

    if (equalsCenter(bottomPoints, cfg.center)) {
      bottomPoints = [];
    }
  }

  return drawRectShape(topPoints, bottomPoints, container, style, isSmooth);
}

var Area = Shape.registerFactory('area', {
  defaultShapeType: 'area',
  getDefaultPoints: function getDefaultPoints(obj) {
    var x = obj.x;
    var y = obj.y;
    var y0 = obj.y0;
    y = Util.isArray(y) ? y : [y0, y];
    var points = [];
    points.push({
      x: x,
      y: y[0]
    }, {
      x: x,
      y: y[1]
    });
    return points;
  }
});
var SHAPES = ['area', 'smooth'];
Util.each(SHAPES, function (shapeType) {
  Shape.registerShape('area', shapeType, {
    draw: function draw(cfg, container) {
      var smooth = shapeType === 'smooth';
      return drawShape.call(this, cfg, container, smooth);
    }
  });
});
module.exports = Area;
}, function(modId) { var map = {"../../util/common":1578656684310,"./shape":1578656684324,"../../graphic/util/smooth":1578656684346,"../../graphic/util/bbox":1578656684343,"../../global":1578656684308}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684362, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Geom = require('./base');

var Util = require('../util/common');

var SizeMixin = require('./mixin/size');

require('./shape/interval');

var Interval =
/*#__PURE__*/
function (_Geom) {
  (0, _inheritsLoose2["default"])(Interval, _Geom);
  var _proto = Interval.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'interval';
    cfg.shapeType = 'interval';
    cfg.generatePoints = true;
    return cfg;
  };

  function Interval(cfg) {
    var _this;

    _this = _Geom.call(this, cfg) || this;
    Util.mix((0, _assertThisInitialized2["default"])(_this), SizeMixin);
    return _this;
  }

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  };

  _proto.clearInner = function clearInner() {
    _Geom.prototype.clearInner.call(this);

    this.set('defaultSize', null);
  };

  return Interval;
}(Geom);

Geom.Interval = Interval;
module.exports = Interval;
}, function(modId) { var map = {"./base":1578656684320,"../util/common":1578656684310,"./mixin/size":1578656684363,"./shape/interval":1578656684364}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684363, function(require, module, exports) {


/**
 * @fileOverview Utility for calculate the with ratui in x axis
 * @author sima.zhang1990@gmail.com
 * @author dxq613@gmail.com
 */
var Global = require('../../global');

var Util = require('../../util/common');

var SizeMixin = {
  getDefalutSize: function getDefalutSize() {
    var defaultSize = this.get('defaultSize');

    if (!defaultSize) {
      var coord = this.get('coord');
      var xScale = this.getXScale();
      var dataArray = this.get('dataArray');
      var values = Util.uniq(xScale.values);
      var count = values.length;
      var range = xScale.range;
      var normalizeSize = 1 / count;
      var widthRatio = 1;

      if (coord && coord.isPolar) {
        if (coord.transposed && count > 1) {
          widthRatio = Global.widthRatio.multiplePie;
        } else {
          widthRatio = Global.widthRatio.rose;
        }
      } else {
        if (xScale.isLinear) {
          normalizeSize *= range[1] - range[0];
        }

        widthRatio = Global.widthRatio.column;
      }

      normalizeSize *= widthRatio;

      if (this.hasAdjust('dodge')) {
        normalizeSize = normalizeSize / dataArray.length;
      }

      defaultSize = normalizeSize;
      this.set('defaultSize', defaultSize);
    }

    return defaultSize;
  },
  getDimWidth: function getDimWidth(dimName) {
    var coord = this.get('coord');
    var start = coord.convertPoint({
      x: 0,
      y: 0
    });
    var end = coord.convertPoint({
      x: dimName === 'x' ? 1 : 0,
      y: dimName === 'x' ? 0 : 1
    });
    var width = 0;

    if (start && end) {
      width = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    }

    return width;
  },
  _getWidth: function _getWidth() {
    var width = this.get('_width');

    if (!width) {
      var coord = this.get('coord');

      if (coord && coord.isPolar && !coord.transposed) {
        width = (coord.endAngle - coord.startAngle) * coord.circleRadius;
      } else {
        width = this.getDimWidth('x');
      }

      this.set('_width', width);
    }

    return width;
  },
  _toNormalizedSize: function _toNormalizedSize(size) {
    var width = this._getWidth();

    return size / width;
  },
  _toCoordSize: function _toCoordSize(normalizeSize) {
    var width = this._getWidth();

    return width * normalizeSize;
  },
  getNormalizedSize: function getNormalizedSize(obj) {
    var size = this.getAttrValue('size', obj);

    if (Util.isNil(size)) {
      size = this.getDefalutSize();
    } else {
      size = this._toNormalizedSize(size);
    }

    return size;
  },
  getSize: function getSize(obj) {
    var size = this.getAttrValue('size', obj);

    if (Util.isNil(size)) {
      var normalizeSize = this.getDefalutSize();
      size = this._toCoordSize(normalizeSize);
    }

    return size;
  }
};
module.exports = SizeMixin;
}, function(modId) { var map = {"../../global":1578656684308,"../../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684364, function(require, module, exports) {


var Util = require('../../util/common');

var Shape = require('./shape');

var Vector2 = require('../../graphic/util/vector2');

var Global = require('../../global');

function getRectPoints(cfg) {
  var x = cfg.x,
      y = cfg.y,
      y0 = cfg.y0,
      size = cfg.size;
  var ymin = y0;
  var ymax = y;

  if (Util.isArray(y)) {
    ymax = y[1];
    ymin = y[0];
  }

  var xmin;
  var xmax;

  if (Util.isArray(x)) {
    xmin = x[0];
    xmax = x[1];
  } else {
    xmin = x - size / 2;
    xmax = x + size / 2;
  }

  return [{
    x: xmin,
    y: ymin
  }, {
    x: xmin,
    y: ymax
  }, {
    x: xmax,
    y: ymax
  }, {
    x: xmax,
    y: ymin
  }];
}

function getRectRange(points) {
  var xValues = [];
  var yValues = [];

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];
    xValues.push(point.x);
    yValues.push(point.y);
  }

  var xMin = Math.min.apply(null, xValues);
  var yMin = Math.min.apply(null, yValues);
  var xMax = Math.max.apply(null, xValues);
  var yMax = Math.max.apply(null, yValues);
  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
}

function getMiddlePoint(a, b) {
  var x = (a.x - b.x) / 2 + b.x;
  var y = (a.y - b.y) / 2 + b.y;
  return {
    x: x,
    y: y
  };
}

var Interval = Shape.registerFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints: function getDefaultPoints(cfg) {
    return getRectPoints(cfg);
  }
});
Shape.registerShape('interval', 'rect', {
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      fill: cfg.color
    }, Global.shape.interval, cfg.style);

    if (cfg.isInCircle) {
      var newPoints = points.slice(0);

      if (this._coord.transposed) {
        newPoints = [points[0], points[3], points[2], points[1]];
      }

      var _cfg$center = cfg.center,
          x = _cfg$center.x,
          y = _cfg$center.y;
      var v = [1, 0];
      var v0 = [newPoints[0].x - x, newPoints[0].y - y];
      var v1 = [newPoints[1].x - x, newPoints[1].y - y];
      var v2 = [newPoints[2].x - x, newPoints[2].y - y];
      var startAngle = Vector2.angleTo(v, v1);
      var endAngle = Vector2.angleTo(v, v2);
      var r0 = Vector2.length(v0);
      var r = Vector2.length(v1);

      if (startAngle >= 1.5 * Math.PI) {
        startAngle = startAngle - 2 * Math.PI;
      }

      if (endAngle >= 1.5 * Math.PI) {
        endAngle = endAngle - 2 * Math.PI;
      }

      return container.addShape('Sector', {
        className: 'interval',
        attrs: Util.mix({
          x: x,
          y: y,
          r: r,
          r0: r0,
          startAngle: startAngle,
          endAngle: endAngle
        }, style)
      });
    }

    var rectCfg = getRectRange(points);
    return container.addShape('rect', {
      className: 'interval',
      attrs: Util.mix(rectCfg, style)
    });
  }
}); // 金字塔 和 漏斗图

['pyramid', 'funnel'].forEach(function (shapeType) {
  Shape.registerShape('interval', shapeType, {
    getPoints: function getPoints(cfg) {
      cfg.size = cfg.size * 2; // 漏斗图的 size 是柱状图的两倍

      return getRectPoints(cfg);
    },
    draw: function draw(cfg, container) {
      var points = this.parsePoints(cfg.points);
      var nextPoints = this.parsePoints(cfg.nextPoints);
      var polygonPoints = null;

      if (nextPoints) {
        polygonPoints = [points[0], points[1], nextPoints[1], nextPoints[0]];
      } else {
        polygonPoints = [points[0], points[1]]; // pyramid 顶部是三角形，所以取中心点就好了，funnel顶部是长方形

        if (shapeType === 'pyramid') {
          polygonPoints.push(getMiddlePoint(points[2], points[3]));
        } else {
          polygonPoints.push(points[2], points[3]);
        }
      }

      var attrs = Util.mix({
        fill: cfg.color,
        points: polygonPoints
      }, Global.shape.interval, cfg.style);
      return container.addShape('polygon', {
        className: 'interval',
        attrs: attrs
      });
    }
  });
});
module.exports = Interval;
}, function(modId) { var map = {"../../util/common":1578656684310,"./shape":1578656684324,"../../graphic/util/vector2":1578656684318,"../../global":1578656684308}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684365, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Geom = require('./base');

var Util = require('../util/common');

require('./shape/polygon');

var Polygon =
/*#__PURE__*/
function (_Geom) {
  (0, _inheritsLoose2["default"])(Polygon, _Geom);

  function Polygon() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Polygon.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'polygon';
    cfg.shapeType = 'polygon';
    cfg.generatePoints = true;
    return cfg;
  };

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

    var self = this;
    var x = cfg.x;
    var y = cfg.y;
    var temp;

    if (!(Util.isArray(x) && Util.isArray(y))) {
      var xScale = self.getXScale();
      var yScale = self.getYScale();
      var xCount = xScale.values ? xScale.values.length : xScale.ticks.length;
      var yCount = yScale.values ? yScale.values.length : yScale.ticks.length;
      var xOffset = 0.5 * 1 / xCount;
      var yOffset = 0.5 * 1 / yCount;

      if (xScale.isCategory && yScale.isCategory) {
        x = [x - xOffset, x - xOffset, x + xOffset, x + xOffset];
        y = [y - yOffset, y + yOffset, y + yOffset, y - yOffset];
      } else if (Util.isArray(x)) {
        temp = x;
        x = [temp[0], temp[0], temp[1], temp[1]];
        y = [y - yOffset / 2, y + yOffset / 2, y + yOffset / 2, y - yOffset / 2];
      } else if (Util.isArray(y)) {
        temp = y;
        y = [temp[0], temp[1], temp[1], temp[0]];
        x = [x - xOffset / 2, x - xOffset / 2, x + xOffset / 2, x + xOffset / 2];
      }

      cfg.x = x;
      cfg.y = y;
    }

    return cfg;
  };

  return Polygon;
}(Geom);

Geom.Polygon = Polygon;
module.exports = Polygon;
}, function(modId) { var map = {"./base":1578656684320,"../util/common":1578656684310,"./shape/polygon":1578656684366}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684366, function(require, module, exports) {


var Shape = require('./shape');

var Util = require('../../util/common');

var Polygon = Shape.registerFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints: function getDefaultPoints(pointInfo) {
    var points = [];
    var x = pointInfo.x,
        y = pointInfo.y;

    for (var i = 0, len = x.length; i < len; i++) {
      points.push({
        x: x[i],
        y: y[i]
      });
    }

    return points;
  }
});
Shape.registerShape('polygon', 'polygon', {
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      fill: cfg.color,
      points: points
    }, cfg.style);
    return container.addShape('Polygon', {
      className: 'polygon',
      attrs: style
    });
  }
});
module.exports = Polygon;
}, function(modId) { var map = {"./shape":1578656684324,"../../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684367, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Geom = require('./base');

var Util = require('../util/common');

var SizeMixin = require('./mixin/size');

require('./shape/schema');

var Schema =
/*#__PURE__*/
function (_Geom) {
  (0, _inheritsLoose2["default"])(Schema, _Geom);
  var _proto = Schema.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'schema';
    cfg.shapeType = 'schema';
    cfg.generatePoints = true;
    return cfg;
  };

  function Schema(cfg) {
    var _this;

    _this = _Geom.call(this, cfg) || this;
    Util.mix((0, _assertThisInitialized2["default"])(_this), SizeMixin);
    return _this;
  }

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  };

  _proto.clearInner = function clearInner() {
    _Geom.prototype.clearInner.call(this);

    this.set('defaultSize', null);
  };

  return Schema;
}(Geom);

Geom.Schema = Schema;
module.exports = Schema;
}, function(modId) { var map = {"./base":1578656684320,"../util/common":1578656684310,"./mixin/size":1578656684363,"./shape/schema":1578656684368}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684368, function(require, module, exports) {


var Shape = require('./shape');

var Util = require('../../util/common');

function _sortValue(value) {
  var sorted = value.sort(function (a, b) {
    return a < b ? 1 : -1;
  });
  var length = sorted.length;

  if (length < 4) {
    var min = sorted[length - 1];

    for (var i = 0; i < 4 - length; i++) {
      sorted.push(min);
    }
  }

  return sorted;
} // from left bottom corner, and clockwise


function getCandlePoints(x, y, width) {
  var yValues = _sortValue(y);

  var points = [{
    x: x,
    y: yValues[0]
  }, {
    x: x,
    y: yValues[1]
  }, {
    x: x - width / 2,
    y: yValues[2]
  }, {
    x: x - width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[2]
  }, {
    x: x,
    y: yValues[2]
  }, {
    x: x,
    y: yValues[3]
  }];
  return points;
}

var Schema = Shape.registerFactory('schema', {});
Shape.registerShape('schema', 'candle', {
  getPoints: function getPoints(cfg) {
    return getCandlePoints(cfg.x, cfg.y, cfg.size);
  },
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      stroke: cfg.color,
      fill: cfg.color,
      lineWidth: 1
    }, cfg.style);
    return container.addShape('Custom', {
      className: 'schema',
      attrs: style,
      createPath: function createPath(ctx) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.moveTo(points[2].x, points[2].y);

        for (var i = 3; i < 6; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.closePath();
        ctx.moveTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
      }
    });
  }
});
module.exports = Schema;
}, function(modId) { var map = {"./shape":1578656684324,"../../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684369, function(require, module, exports) {


module.exports = {
  Stack: require('./stack'),
  Dodge: require('./dodge'),
  Symmetric: require('./symmetric')
};
}, function(modId) { var map = {"./stack":1578656684370,"./dodge":1578656684371,"./symmetric":1578656684372}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684370, function(require, module, exports) {


var Stack = require('@antv/adjust/lib/stack');

module.exports = Stack;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684371, function(require, module, exports) {


var Dodge = require('@antv/adjust/lib/dodge');

module.exports = Dodge;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684372, function(require, module, exports) {


var Symmetric = require('@antv/adjust/lib/symmetric');

module.exports = Symmetric;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684373, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Base = require('./base');

var Vector2 = require('../graphic/util/vector2');

var Matrix = require('../graphic/util/matrix');

var Polar =
/*#__PURE__*/
function (_Base) {
  (0, _inheritsLoose2["default"])(Polar, _Base);

  function Polar() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Polar.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'polar';
    this.startAngle = -Math.PI / 2;
    this.endAngle = Math.PI * 3 / 2;
    this.inner = 0;
    this.innerRadius = 0; // alias

    this.isPolar = true;
    this.transposed = false;
    this.center = null;
    this.radius = null; // relative, 0 ~ 1
  };

  _proto.init = function init(start, end) {
    _Base.prototype.init.call(this, start, end);

    var self = this;
    var inner = self.inner || self.innerRadius;
    var width = Math.abs(end.x - start.x);
    var height = Math.abs(end.y - start.y);
    var maxRadius;
    var center;

    if (self.startAngle === -Math.PI && self.endAngle === 0) {
      maxRadius = Math.min(width / 2, height);
      center = {
        x: (start.x + end.x) / 2,
        y: start.y
      };
    } else {
      maxRadius = Math.min(width, height) / 2;
      center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
    }

    var radius = self.radius;

    if (radius > 0 && radius <= 1) {
      maxRadius = maxRadius * radius;
    }

    this.x = {
      start: self.startAngle,
      end: self.endAngle
    };
    this.y = {
      start: maxRadius * inner,
      end: maxRadius
    };
    this.center = center;
    this.circleRadius = maxRadius; // the radius value in px
  };

  _proto._convertPoint = function _convertPoint(point) {
    var self = this;
    var center = self.center;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    var angle = x.start + (x.end - x.start) * point[xDim];
    var radius = y.start + (y.end - y.start) * point[yDim];
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  };

  _proto._invertPoint = function _invertPoint(point) {
    var self = this;
    var center = self.center,
        transposed = self.transposed,
        x = self.x,
        y = self.y;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var m = [1, 0, 0, 1, 0, 0];
    Matrix.rotate(m, m, x.start);
    var startV = [1, 0];
    Vector2.transformMat2d(startV, startV, m);
    startV = [startV[0], startV[1]];
    var pointV = [point.x - center.x, point.y - center.y];

    if (Vector2.zero(pointV)) {
      return {
        x: 0,
        y: 0
      };
    }

    var theta = Vector2.angleTo(startV, pointV, x.end < x.start);

    if (Math.abs(theta - Math.PI * 2) < 0.001) {
      theta = 0;
    }

    var l = Vector2.length(pointV);
    var percentX = theta / (x.end - x.start);
    percentX = x.end - x.start > 0 ? percentX : -percentX;
    var percentY = (l - y.start) / (y.end - y.start);
    var rst = {};
    rst[xDim] = percentX;
    rst[yDim] = percentY;
    return rst;
  };

  return Polar;
}(Base);

Base.Polar = Polar;
module.exports = Polar;
}, function(modId) { var map = {"./base":1578656684316,"../graphic/util/vector2":1578656684318,"../graphic/util/matrix":1578656684317}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684374, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var Abstract = require('./abstract');

var Circle =
/*#__PURE__*/
function (_Abstract) {
  (0, _inheritsLoose2["default"])(Circle, _Abstract);

  function Circle() {
    return _Abstract.apply(this, arguments) || this;
  }

  var _proto = Circle.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Abstract.prototype._initDefaultCfg.call(this);

    this.startAngle = -Math.PI / 2; // start angle，in radian

    this.endAngle = Math.PI * 3 / 2; // end angle, in radian

    this.radius = null; // radius

    this.center = null; // center
  };

  _proto.getOffsetPoint = function getOffsetPoint(value) {
    var startAngle = this.startAngle,
        endAngle = this.endAngle;
    var angle = startAngle + (endAngle - startAngle) * value;
    return this._getCirclePoint(angle);
  };

  _proto._getCirclePoint = function _getCirclePoint(angle, radius) {
    var self = this;
    var center = self.center;
    radius = radius || self.radius;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  };

  _proto.getTextAlignInfo = function getTextAlignInfo(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    var align;
    var baseLine = 'middle';

    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';

      if (offsetVector[1] > 0) {
        baseLine = 'top';
      } else if (offsetVector[1] < 0) {
        baseLine = 'bottom';
      }
    }

    return {
      textAlign: align,
      textBaseline: baseLine
    };
  };

  _proto.getAxisVector = function getAxisVector(point) {
    var center = this.center;
    var factor = this.offsetFactor;
    return [(point.y - center.y) * factor, (point.x - center.x) * -1 * factor];
  };

  _proto.drawLine = function drawLine(lineCfg) {
    var center = this.center,
        radius = this.radius,
        startAngle = this.startAngle,
        endAngle = this.endAngle;
    var container = this.getContainer(lineCfg.top);
    container.addShape('arc', {
      className: 'axis-line',
      attrs: Util.mix({
        x: center.x,
        y: center.y,
        r: radius,
        startAngle: startAngle,
        endAngle: endAngle
      }, lineCfg)
    });
  };

  return Circle;
}(Abstract);

Abstract.Circle = Circle;
module.exports = Circle;
}, function(modId) { var map = {"../../util/common":1578656684310,"./abstract":1578656684329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684375, function(require, module, exports) {


var TimeCat = require('@antv/scale/lib/time-cat');

module.exports = TimeCat;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684376, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var GuideBase = require('./base');

var Arc =
/*#__PURE__*/
function (_GuideBase) {
  (0, _inheritsLoose2["default"])(Arc, _GuideBase);

  function Arc() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Arc.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'arc';
    /**
     * start point
     * @type {Array | Function}
     */

    this.start = [];
    /**
     * end point
     * @type {Array | Function}
     */

    this.end = [];
    /**
     * style configuration
     * @type {Object}
     */

    this.style = {
      stroke: '#999',
      lineWidth: 1
    };
  };

  _proto.render = function render(coord, container) {
    var self = this;
    var start = self.parsePoint(coord, self.start);
    var end = self.parsePoint(coord, self.end);

    if (!start || !end) {
      return;
    }

    var coordCenter = coord.center;
    var radius = Math.sqrt((start.x - coordCenter.x) * (start.x - coordCenter.x) + (start.y - coordCenter.y) * (start.y - coordCenter.y));
    var startAngle = Math.atan2(start.y - coordCenter.y, start.x - coordCenter.x);
    var endAngle = Math.atan2(end.y - coordCenter.y, end.x - coordCenter.x);
    var shape = container.addShape('arc', {
      className: 'guide-arc',
      attrs: Util.mix({
        x: coordCenter.x,
        y: coordCenter.y,
        r: radius,
        startAngle: startAngle,
        endAngle: endAngle
      }, self.style)
    });
    self.element = shape;
    return shape;
  };

  return Arc;
}(GuideBase);

GuideBase.Arc = Arc;
module.exports = Arc;
}, function(modId) { var map = {"../../util/common":1578656684310,"./base":1578656684377}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684377, function(require, module, exports) {


var Util = require('../../util/common');

var KEYWORDS_PERCENT = {
  min: 0,
  median: 0.5,
  max: 1
};

var GuideBase =
/*#__PURE__*/
function () {
  var _proto = GuideBase.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {};

  function GuideBase(cfg) {
    this._initDefaultCfg();

    Util.deepMix(this, cfg);
  }

  _proto._getNormalizedValue = function _getNormalizedValue(val, scale) {
    var rst;

    if (Util.isNil(KEYWORDS_PERCENT[val])) {
      rst = scale.scale(val);
    } else {
      rst = KEYWORDS_PERCENT[val];
    }

    return rst;
  };

  _proto.parsePercentPoint = function parsePercentPoint(coord, position) {
    var xPercent = parseFloat(position[0]) / 100;
    var yPercent = parseFloat(position[1]) / 100;
    var start = coord.start;
    var end = coord.end;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);
    var x = width * xPercent + Math.min(start.x, end.x);
    var y = height * yPercent + Math.min(start.y, end.y);
    return {
      x: x,
      y: y
    };
  };

  _proto.parsePoint = function parsePoint(coord, position) {
    var self = this;
    var xScale = self.xScale;
    var yScales = self.yScales;

    if (Util.isFunction(position)) {
      position = position(xScale, yScales); // position 必须是对象
    } // 如果数据格式是 ['50%', '50%'] 的格式
    // fix: 原始数据中可能会包含 'xxx5%xxx' 这样的数据，需要判断下 https://github.com/antvis/f2/issues/590


    if (Util.isString(position[0]) && position[0].indexOf('%') !== -1 && !isNaN(position[0].slice(0, -1))) {
      return this.parsePercentPoint(coord, position);
    }

    var x = self._getNormalizedValue(position[0], xScale);

    var y = self._getNormalizedValue(position[1], yScales[0]);

    var point = coord.convertPoint({
      x: x,
      y: y
    });

    if (self.limitInPlot) {
      // limit in chart plotRange
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        return point;
      }

      return null;
    }

    return point;
  }
  /**
   * render the guide component
   * @param  {Coord} coord  coordinate instance
   * @param  {Canvas.Group} group the container
   */
  ;

  _proto.render = function render()
  /* coord,group */
  {};

  _proto.repaint = function repaint() {
    this.remove();
    var coord = this.coord,
        container = this.container,
        canvas = this.canvas;

    if (container && !container.isDestroyed()) {
      this.render(coord, container);
      canvas.draw();
    }
  };

  _proto.remove = function remove() {
    var element = this.element;
    element && element.remove(true);
  };

  _proto.changeVisible = function changeVisible(visible) {
    var self = this;
    self.visible = visible;
    var element = self.element;
    if (!element) return;

    if (element.set) {
      element.set('visible', visible);
    } else {
      element.style.display = visible ? '' : 'none';
    }
  };

  return GuideBase;
}();

module.exports = GuideBase;
}, function(modId) { var map = {"../../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684378, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var GuideBase = require('./base');

function getOffsetFromAlign(alignX, alignY, width, height) {
  var result = [];

  if (alignX === 'left' && alignY === 'top') {
    result[0] = 0;
    result[1] = 0;
  } else if (alignX === 'right' && alignY === 'top') {
    result[0] = -width;
    result[1] = 0;
  } else if (alignX === 'left' && alignY === 'bottom') {
    result[0] = 0;
    result[1] = Math.floor(-height);
  } else if (alignX === 'right' && alignY === 'bottom') {
    result[0] = Math.floor(-width);
    result[1] = Math.floor(-height);
  } else if (alignX === 'right' && alignY === 'middle') {
    result[0] = Math.floor(-width);
    result[1] = Math.floor(-height / 2);
  } else if (alignX === 'left' && alignY === 'middle') {
    result[0] = 0;
    result[1] = Math.floor(-height / 2);
  } else if (alignX === 'center' && alignY === 'bottom') {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height);
  } else if (alignX === 'center' && alignY === 'top') {
    result[0] = Math.floor(-width / 2);
    result[1] = 0;
  } else {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height / 2);
  }

  return result;
}

function modifyCSS(DOM, CSS) {
  for (var key in CSS) {
    if (CSS.hasOwnProperty(key)) {
      DOM.style[key] = CSS[key];
    }
  }

  return DOM;
}

function createDom(str) {
  var container = document.createElement('div');
  str = str.replace(/(^\s*)|(\s*$)/g, '');
  container.innerHTML = '' + str;
  return container.childNodes[0];
}

var Html =
/*#__PURE__*/
function (_GuideBase) {
  (0, _inheritsLoose2["default"])(Html, _GuideBase);

  function Html() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Html.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'html';
    /**
     * dom position
     * @type {Object | Array}
     */

    this.position = null;
    /**
      * alignment for horizontal direction，can be 'left','center','right'
      * @type {String}
      */

    this.alignX = 'center';
    /**
      * alignment for vertical direction，can be 'top', 'middle', 'bottom'
      * @type {String}
      */

    this.alignY = 'middle';
    /**
      * offset for horizontal direction
      * @type {Number}
      */

    this.offsetX = null;
    /**
      * offset for vertical direction
      * @type {Number}
      */

    this.offsetY = null;
    /**
    * the html string
    *@type {String | Function}
    */

    this.html = null;
  } // override paint
  ;

  _proto.render = function render(coord, container) {
    var self = this;
    var position = self.parsePoint(coord, self.position);

    if (!position) {
      return;
    }

    var myNode = createDom(self.html);
    myNode = modifyCSS(myNode, {
      position: 'absolute',
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'hidden'
    });
    var canvasDom = container.get('canvas').get('el');
    var parentNode = canvasDom.parentNode;
    parentNode = modifyCSS(parentNode, {
      position: 'relative'
    });
    var wrapperNode = createDom('<div class="guideWapper" style="position: absolute;top: 0; left: 0;"></div>');
    parentNode.appendChild(wrapperNode);
    wrapperNode.appendChild(myNode);
    var canvasOffsetTop = canvasDom.offsetTop;
    var canvasOffsetLeft = canvasDom.offsetLeft;
    var alignX = self.alignX,
        alignY = self.alignY,
        offsetX = self.offsetX,
        offsetY = self.offsetY;
    var width = Util.getWidth(myNode);
    var height = Util.getHeight(myNode);
    var newOffset = getOffsetFromAlign(alignX, alignY, width, height);
    position.x = position.x + newOffset[0] + canvasOffsetLeft;
    position.y = position.y + newOffset[1] + canvasOffsetTop;

    if (offsetX) {
      position.x += offsetX;
    }

    if (offsetY) {
      position.y += offsetY;
    }

    modifyCSS(myNode, {
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'visible'
    });
    self.element = wrapperNode;
  };

  _proto.remove = function remove() {
    var element = this.element;
    element && element.parentNode && element.parentNode.removeChild(element);
  };

  return Html;
}(GuideBase);

GuideBase.Html = Html;
module.exports = Html;
}, function(modId) { var map = {"../../util/common":1578656684310,"./base":1578656684377}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684379, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var GuideBase = require('./base');

var Line =
/*#__PURE__*/
function (_GuideBase) {
  (0, _inheritsLoose2["default"])(Line, _GuideBase);

  function Line() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'line';
    this.start = [];
    this.end = [];
    this.style = {
      stroke: '#000',
      lineWidth: 1
    };
  };

  _proto.render = function render(coord, container) {
    var points = [];
    points[0] = this.parsePoint(coord, this.start);
    points[1] = this.parsePoint(coord, this.end);

    if (!points[0] || !points[1]) {
      return;
    }

    var shape = container.addShape('Line', {
      className: 'guide-line',
      attrs: Util.mix({
        x1: points[0].x,
        y1: points[0].y,
        x2: points[1].x,
        y2: points[1].y
      }, this.style)
    });
    this.element = shape;
    return shape;
  };

  return Line;
}(GuideBase);

GuideBase.Line = Line;
module.exports = Line;
}, function(modId) { var map = {"../../util/common":1578656684310,"./base":1578656684377}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684380, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var GuideBase = require('./base');

var Rect =
/*#__PURE__*/
function (_GuideBase) {
  (0, _inheritsLoose2["default"])(Rect, _GuideBase);

  function Rect() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Rect.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'rect';
    this.start = [];
    this.end = [];
    this.style = {
      fill: '#CCD7EB',
      opacity: 0.4
    };
  };

  _proto.render = function render(coord, container) {
    var start = this.parsePoint(coord, this.start);
    var end = this.parsePoint(coord, this.end);

    if (!start || !end) {
      return;
    }

    var shape = container.addShape('rect', {
      className: 'guide-rect',
      attrs: Util.mix({
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(start.y - end.y)
      }, this.style)
    });
    this.element = shape;
    return shape;
  };

  return Rect;
}(GuideBase);

GuideBase.Rect = Rect;
module.exports = Rect;
}, function(modId) { var map = {"../../util/common":1578656684310,"./base":1578656684377}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684381, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var GuideBase = require('./base');

var Text =
/*#__PURE__*/
function (_GuideBase) {
  (0, _inheritsLoose2["default"])(Text, _GuideBase);

  function Text() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'text';
    /**
     * the position of text
     * @type {Function | Array}
     */

    this.position = null;
    /**
     * the display content
     * @type {String}
     */

    this.content = null;
    /**
     * style configuration for text
     * @type {Object}
     */

    this.style = {
      fill: '#000'
    };
    /**
     * offset of horizontal direction
     * @type {Number}
     */

    this.offsetX = 0;
    /**
     * offset of vertical direction
     * @type {Number}
     */

    this.offsetY = 0;
  };

  _proto.render = function render(coord, container) {
    var position = this.position;
    var point = this.parsePoint(coord, position);

    if (!point) {
      return;
    }

    var content = this.content,
        style = this.style,
        offsetX = this.offsetX,
        offsetY = this.offsetY;

    if (offsetX) {
      point.x += offsetX;
    }

    if (offsetY) {
      point.y += offsetY;
    }

    var shape = container.addShape('text', {
      className: 'guide-text',
      attrs: Util.mix({
        x: point.x,
        y: point.y,
        text: content
      }, style)
    });
    this.element = shape;
    return shape;
  };

  return Text;
}(GuideBase);

GuideBase.Text = Text;
module.exports = Text;
}, function(modId) { var map = {"../../util/common":1578656684310,"./base":1578656684377}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684382, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var GuideBase = require('./base');

var Tag =
/*#__PURE__*/
function (_GuideBase) {
  (0, _inheritsLoose2["default"])(Tag, _GuideBase);

  function Tag() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Tag.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'tag';
    this.position = null;
    this.content = null;
    this.direct = 'tl';
    this.autoAdjust = true;
    this.offsetX = 0;
    this.offsetY = 0;
    this.side = 4;
    this.background = {
      padding: 5,
      radius: 2,
      fill: '#1890FF'
    };
    this.textStyle = {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    };
    this.withPoint = true;
    this.pointStyle = {
      fill: '#1890FF',
      r: 3,
      lineWidth: 1,
      stroke: '#fff'
    };
  };

  _proto._getDirect = function _getDirect(container, point, tagWidth, tagHeight) {
    var direct = this.direct;
    var side = this.side;
    var canvas = container.get('canvas');
    var clientWidth = canvas.get('width');
    var clientHeight = canvas.get('height');
    var x = point.x,
        y = point.y;
    var vertical = direct[0];
    var horizontal = direct[1]; // adjust for vertical direction

    if (vertical === 't' && y - side - tagHeight < 0) {
      vertical = 'b';
    } else if (vertical === 'b' && y + side + tagHeight > clientHeight) {
      vertical = 't';
    } // adjust for horizontal direction


    var diff = vertical === 'c' ? side : 0;

    if (horizontal === 'l' && x - diff - tagWidth < 0) {
      horizontal = 'r';
    } else if (horizontal === 'r' && x + diff + tagWidth > clientWidth) {
      horizontal = 'l';
    } else if (horizontal === 'c') {
      if (tagWidth / 2 + x + diff > clientWidth) {
        horizontal = 'l';
      } else if (x - tagWidth / 2 - diff < 0) {
        horizontal = 'r';
      }
    }

    direct = vertical + horizontal;
    return direct;
  };

  _proto.render = function render(coord, container) {
    var position = this.parsePoint(coord, this.position);

    if (!position) {
      return;
    }

    var content = this.content,
        background = this.background,
        textStyle = this.textStyle;
    var shapes = [];
    var wrapperContainer = container.addGroup({
      className: 'guide-tag'
    });

    if (this.withPoint) {
      var pointShape = wrapperContainer.addShape('Circle', {
        className: 'guide-tag-point',
        attrs: Util.mix({
          x: position.x,
          y: position.y
        }, this.pointStyle)
      });
      shapes.push(pointShape);
    }

    var tagContainer = wrapperContainer.addGroup(); // create a text shape

    var tagText = tagContainer.addShape('text', {
      className: 'guide-tag-text',
      zIndex: 1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        text: content
      }, textStyle)
    });
    shapes.push(tagText); // create background box

    var textBBox = tagText.getBBox();
    var padding = Util.parsePadding(background.padding);
    var tagWidth = textBBox.width + padding[1] + padding[3];
    var tagHeight = textBBox.height + padding[0] + padding[2];
    var yMin = textBBox.minY - padding[0];
    var xMin = textBBox.minX - padding[3];
    var tagBg = tagContainer.addShape('rect', {
      className: 'guide-tag-bg',
      zIndex: -1,
      attrs: Util.mix({
        x: xMin,
        y: yMin,
        width: tagWidth,
        height: tagHeight
      }, background)
    });
    shapes.push(tagBg);
    var direct = this.autoAdjust ? this._getDirect(container, position, tagWidth, tagHeight) : this.direct;
    var side = this.side;
    var x = position.x + this.offsetX;
    var y = position.y + this.offsetY;
    var arrowPoints;
    var radius = Util.parsePadding(background.radius);

    if (direct === 'tl') {
      arrowPoints = [{
        x: tagWidth + xMin - side - 1,
        y: tagHeight + yMin - 1
      }, // 这个 1 是为了防止出现白边
      {
        x: tagWidth + xMin,
        y: tagHeight + yMin - 1
      }, {
        x: tagWidth + xMin,
        y: tagHeight + side + yMin
      }];
      radius[2] = 0;
      x = x - tagWidth;
      y = y - side - tagHeight;
    } else if (direct === 'cl') {
      arrowPoints = [{
        x: tagWidth + xMin - 1,
        y: (tagHeight - side) / 2 + yMin - 1
      }, {
        x: tagWidth + xMin - 1,
        y: (tagHeight + side) / 2 + yMin + 1
      }, {
        x: tagWidth + side + xMin,
        y: tagHeight / 2 + yMin
      }];
      x = x - tagWidth - side;
      y = y - tagHeight / 2;
    } else if (direct === 'bl') {
      arrowPoints = [{
        x: tagWidth + xMin,
        y: -side + yMin
      }, {
        x: tagWidth + xMin - side - 1,
        y: yMin + 1
      }, {
        x: tagWidth + xMin,
        y: yMin + 1
      }];
      radius[1] = 0;
      x = x - tagWidth;
      y = y + side;
    } else if (direct === 'bc') {
      arrowPoints = [{
        x: tagWidth / 2 + xMin,
        y: -side + yMin
      }, {
        x: (tagWidth - side) / 2 + xMin - 1,
        y: yMin + 1
      }, {
        x: (tagWidth + side) / 2 + xMin + 1,
        y: yMin + 1
      }];
      x = x - tagWidth / 2;
      y = y + side;
    } else if (direct === 'br') {
      arrowPoints = [{
        x: xMin,
        y: yMin - side
      }, {
        x: xMin,
        y: yMin + 1
      }, {
        x: xMin + side + 1,
        y: yMin + 1
      }];
      radius[0] = 0;
      y = y + side;
    } else if (direct === 'cr') {
      arrowPoints = [{
        x: xMin - side,
        y: tagHeight / 2 + yMin
      }, {
        x: xMin + 1,
        y: (tagHeight - side) / 2 + yMin - 1
      }, {
        x: xMin + 1,
        y: (tagHeight + side) / 2 + yMin + 1
      }];
      x = x + side;
      y = y - tagHeight / 2;
    } else if (direct === 'tr') {
      arrowPoints = [{
        x: xMin,
        y: tagHeight + side + yMin
      }, {
        x: xMin,
        y: tagHeight + yMin - 1
      }, {
        x: side + xMin + 1,
        y: tagHeight + yMin - 1
      }];
      radius[3] = 0;
      y = y - tagHeight - side;
    } else if (direct === 'tc') {
      arrowPoints = [{
        x: (tagWidth - side) / 2 + xMin - 1,
        y: tagHeight + yMin - 1
      }, {
        x: (tagWidth + side) / 2 + xMin + 1,
        y: tagHeight + yMin - 1
      }, {
        x: tagWidth / 2 + xMin,
        y: tagHeight + side + yMin
      }];
      x = x - tagWidth / 2;
      y = y - tagHeight - side;
    }

    var sideShape = tagContainer.addShape('Polygon', {
      className: 'guide-tag-side',
      zIndex: 0,
      attrs: {
        points: arrowPoints,
        fill: background.fill
      }
    });
    shapes.push(sideShape);
    tagBg.attr('radius', radius);
    tagContainer.moveTo(x - xMin, y - yMin);
    tagContainer.sort();
    this.element = wrapperContainer;
    return shapes;
  };

  return Tag;
}(GuideBase);

GuideBase.Tag = Tag;
module.exports = Tag;
}, function(modId) { var map = {"../../util/common":1578656684310,"./base":1578656684377}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684383, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var Util = require('../../util/common');

var GuideBase = require('./base');

var Point =
/*#__PURE__*/
function (_GuideBase) {
  (0, _inheritsLoose2["default"])(Point, _GuideBase);

  function Point() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Point.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'point';
    this.position = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.style = {
      fill: '#1890FF',
      r: 3,
      lineWidth: 1,
      stroke: '#fff'
    };
  };

  _proto.render = function render(coord, container) {
    var position = this.parsePoint(coord, this.position);
    if (!position) return null;
    var shape = container.addShape('Circle', {
      className: 'guide-point',
      attrs: Util.mix({
        x: position.x + this.offsetX,
        y: position.y + this.offsetY
      }, this.style)
    });
    this.element = shape;
    return shape;
  };

  return Point;
}(GuideBase);

GuideBase.Point = Point;
module.exports = Point;
}, function(modId) { var map = {"../../util/common":1578656684310,"./base":1578656684377}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684384, function(require, module, exports) {


var Util = require('../util/common');

var Global = require('../global');

var Tooltip = require('../component/tooltip');

var Helper = require('../util/helper'); // Register the default configuration for Tooltip


Global.tooltip = Util.deepMix({
  triggerOn: ['touchstart', 'touchmove'],
  // triggerOff: 'touchend',
  alwaysShow: false,
  showTitle: false,
  showCrosshairs: false,
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: 1
  },
  showTooltipMarker: true,
  background: {
    radius: 1,
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: [3, 5]
  },
  titleStyle: {
    fontSize: 12,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'top'
  },
  nameStyle: {
    fontSize: 12,
    fill: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'start',
    textBaseline: 'middle'
  },
  valueStyle: {
    fontSize: 12,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle'
  },
  showItemMarker: true,
  itemMarkerStyle: {
    radius: 3,
    symbol: 'circle',
    lineWidth: 1,
    stroke: '#fff'
  },
  layout: 'horizontal',
  snap: false
}, Global.tooltip || {});

function _getTooltipValueScale(geom) {
  var colorAttr = geom.getAttr('color');

  if (colorAttr) {
    var colorScale = colorAttr.getScale(colorAttr.type);

    if (colorScale.isLinear) {
      return colorScale;
    }
  }

  var xScale = geom.getXScale();
  var yScale = geom.getYScale();

  if (yScale) {
    return yScale;
  }

  return xScale;
}

function getTooltipName(geom, origin) {
  var name;
  var nameScale;

  var groupScales = geom._getGroupScales();

  if (groupScales.length) {
    Util.each(groupScales, function (scale) {
      nameScale = scale;
      return false;
    });
  }

  if (nameScale) {
    var field = nameScale.field;
    name = nameScale.getText(origin[field]);
  } else {
    var valueScale = _getTooltipValueScale(geom);

    name = valueScale.alias || valueScale.field;
  }

  return name;
}

function getTooltipValue(geom, origin) {
  var scale = _getTooltipValueScale(geom);

  return scale.getText(origin[scale.field]);
}

function getTooltipTitle(geom, origin) {
  var position = geom.getAttr('position');
  var field = position.getFields()[0];
  var scale = geom.get('scales')[field];
  return scale.getText(origin[scale.field]);
}

function _indexOfArray(items, item) {
  var rst = -1;
  Util.each(items, function (sub, index) {
    if (sub.title === item.title && sub.name === item.name && sub.value === item.value && sub.color === item.color) {
      rst = index;
      return false;
    }
  });
  return rst;
}

function _uniqItems(items) {
  var tmp = [];
  Util.each(items, function (item) {
    var index = _indexOfArray(tmp, item);

    if (index === -1) {
      tmp.push(item);
    } else {
      tmp[index] = item;
    }
  });
  return tmp;
}

function isEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

var TooltipController =
/*#__PURE__*/
function () {
  function TooltipController(cfg) {
    this.enable = true;
    this.cfg = {};
    this.tooltip = null;
    this.chart = null;
    this.timeStamp = 0;
    Util.mix(this, cfg);
    var chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
  }

  var _proto = TooltipController.prototype;

  _proto._setCrosshairsCfg = function _setCrosshairsCfg() {
    var self = this;
    var chart = self.chart;
    var defaultCfg = Util.mix({}, Global.tooltip);
    var geoms = chart.get('geoms');
    var shapes = [];
    Util.each(geoms, function (geom) {
      var type = geom.get('type');

      if (shapes.indexOf(type) === -1) {
        shapes.push(type);
      }
    });
    var coordType = chart.get('coord').type;

    if (geoms.length && (coordType === 'cartesian' || coordType === 'rect')) {
      if (shapes.length === 1 && ['line', 'area', 'path', 'point'].indexOf(shapes[0]) !== -1) {
        Util.mix(defaultCfg, {
          showCrosshairs: true
        });
      }
    }

    return defaultCfg;
  };

  _proto._getMaxLength = function _getMaxLength(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var _cfg = cfg,
        layout = _cfg.layout,
        plotRange = _cfg.plotRange;
    return layout === 'horizontal' ? plotRange.br.x - plotRange.bl.x : plotRange.bl.y - plotRange.tr.y;
  };

  _proto.render = function render() {
    var self = this;

    if (self.tooltip) {
      return;
    }

    var chart = self.chart;
    var canvas = chart.get('canvas');
    var frontPlot = chart.get('frontPlot').addGroup({
      className: 'tooltipContainer',
      zIndex: 10
    });
    var backPlot = chart.get('backPlot').addGroup({
      className: 'tooltipContainer'
    });
    var plotRange = chart.get('plotRange');
    var coord = chart.get('coord');

    var defaultCfg = self._setCrosshairsCfg();

    var cfg = self.cfg; // 通过 chart.tooltip() 接口传入的 tooltip 配置项

    var tooltipCfg = Util.deepMix({
      plotRange: plotRange,
      frontPlot: frontPlot,
      backPlot: backPlot,
      canvas: canvas,
      fixed: coord.transposed || coord.isPolar
    }, defaultCfg, cfg); // 创建 tooltip 实例需要的配置，不应该修改 this.cfg，即用户传入的配置

    tooltipCfg.maxLength = self._getMaxLength(tooltipCfg);
    this._tooltipCfg = tooltipCfg;
    var tooltip = new Tooltip(tooltipCfg);
    self.tooltip = tooltip;
    self.bindEvents();
  };

  _proto.clear = function clear() {
    var tooltip = this.tooltip;

    if (tooltip) {
      tooltip.destroy();
      this.unBindEvents();
    }

    this.tooltip = null;
    this.prePoint = null;
    this._lastActive = null;
  };

  _proto._getTooltipMarkerStyle = function _getTooltipMarkerStyle(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var _cfg2 = cfg,
        type = _cfg2.type,
        items = _cfg2.items;
    var tooltipCfg = this._tooltipCfg;

    if (type === 'rect') {
      var x;
      var y;
      var width;
      var height;
      var chart = this.chart;

      var _chart$get = chart.get('plotRange'),
          tl = _chart$get.tl,
          br = _chart$get.br;

      var coord = chart.get('coord');
      var firstItem = items[0];
      var lastItem = items[items.length - 1];
      var intervalWidth = firstItem.width;

      if (coord.transposed) {
        x = tl.x;
        y = lastItem.y - intervalWidth * 0.75;
        width = br.x - tl.x;
        height = firstItem.y - lastItem.y + 1.5 * intervalWidth;
      } else {
        x = firstItem.x - intervalWidth * 0.75;
        y = tl.y;
        width = lastItem.x - firstItem.x + 1.5 * intervalWidth;
        height = br.y - tl.y;
      }

      cfg.style = Util.mix({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: '#CCD6EC',
        opacity: 0.3
      }, tooltipCfg.tooltipMarkerStyle);
    } else {
      cfg.style = Util.mix({
        radius: 4,
        fill: '#fff',
        lineWidth: 2
      }, tooltipCfg.tooltipMarkerStyle);
    }

    return cfg;
  };

  _proto._setTooltip = function _setTooltip(point, items, tooltipMarkerCfg) {
    if (tooltipMarkerCfg === void 0) {
      tooltipMarkerCfg = {};
    }

    var lastActive = this._lastActive;
    var tooltip = this.tooltip;
    var cfg = this._tooltipCfg;
    items = _uniqItems(items);
    var chart = this.chart;
    var coord = chart.get('coord');
    var yScale = chart.getYScales()[0];
    var snap = cfg.snap;

    if (snap === false && yScale.isLinear) {
      var invertPoint = coord.invertPoint(point);
      var plot = chart.get('plotRange');
      var tip;
      var pos;

      if (Helper.isPointInPlot(point, plot)) {
        if (coord.transposed) {
          tip = yScale.invert(invertPoint.x);
          pos = point.x;
          tooltip.setXTipContent(tip);
          tooltip.setXTipPosition(pos);
          tooltip.setYCrosshairPosition(pos);
        } else {
          tip = yScale.invert(invertPoint.y);
          pos = point.y;
          tooltip.setYTipContent(tip);
          tooltip.setYTipPosition(pos);
          tooltip.setXCrosshairPosition(pos);
        }
      }
    }

    if (cfg.onShow) {
      cfg.onShow({
        x: point.x,
        y: point.y,
        tooltip: tooltip,
        items: items,
        tooltipMarkerCfg: tooltipMarkerCfg
      });
    }

    if (isEqual(lastActive, items)) {
      if (snap === false && (Util.directionEnabled(cfg.crosshairsType, 'y') || cfg.showYTip)) {
        var canvas = this.chart.get('canvas');
        canvas.draw();
      }

      return;
    }

    this._lastActive = items;
    var onChange = cfg.onChange;

    if (onChange) {
      onChange({
        x: point.x,
        y: point.y,
        tooltip: tooltip,
        items: items,
        tooltipMarkerCfg: tooltipMarkerCfg
      });
    }

    var first = items[0];
    var title = first.title || first.name;
    var xTipPosX = first.x;

    if (items.length > 1) {
      xTipPosX = (items[0].x + items[items.length - 1].x) / 2;
    }

    tooltip.setContent(title, items, coord.transposed);
    tooltip.setPosition(items, point);

    if (coord.transposed) {
      var yTipPosY = first.y;

      if (items.length > 1) {
        yTipPosY = (items[0].y + items[items.length - 1].y) / 2;
      }

      tooltip.setYTipContent(title);
      tooltip.setYTipPosition(yTipPosY);
      tooltip.setXCrosshairPosition(yTipPosY);

      if (snap) {
        tooltip.setXTipContent(first.value);
        tooltip.setXTipPosition(xTipPosX);
        tooltip.setYCrosshairPosition(xTipPosX);
      }
    } else {
      tooltip.setXTipContent(title);
      tooltip.setXTipPosition(xTipPosX);
      tooltip.setYCrosshairPosition(xTipPosX);

      if (snap) {
        tooltip.setYTipContent(first.value);
        tooltip.setYTipPosition(first.y);
        tooltip.setXCrosshairPosition(first.y);
      }
    }

    var markerItems = tooltipMarkerCfg.items;

    if (cfg.showTooltipMarker && markerItems.length) {
      tooltipMarkerCfg = this._getTooltipMarkerStyle(tooltipMarkerCfg);
      tooltip.setMarkers(tooltipMarkerCfg);
    } else {
      tooltip.clearMarkers();
    }

    tooltip.show();
  };

  _proto.showTooltip = function showTooltip(point) {
    var self = this;
    var chart = self.chart;
    var tooltipMarkerType;
    var tooltipMarkerItems = [];
    var items = [];
    var cfg = self._tooltipCfg;
    var marker;

    if (cfg.showItemMarker) {
      marker = cfg.itemMarkerStyle;
    }

    var geoms = chart.get('geoms');
    var coord = chart.get('coord');
    Util.each(geoms, function (geom) {
      if (geom.get('visible')) {
        var type = geom.get('type');
        var records = geom.getSnapRecords(point);
        Util.each(records, function (record) {
          if (record.x && record.y) {
            var x = record.x,
                y = record.y,
                _origin = record._origin,
                color = record.color;
            var tooltipItem = {
              x: x,
              y: Util.isArray(y) ? y[1] : y,
              color: color || Global.defaultColor,
              origin: _origin,
              name: getTooltipName(geom, _origin),
              value: getTooltipValue(geom, _origin),
              title: getTooltipTitle(geom, _origin)
            };

            if (marker) {
              tooltipItem.marker = Util.mix({
                fill: color || Global.defaultColor
              }, marker);
            }

            items.push(tooltipItem);

            if (['line', 'area', 'path'].indexOf(type) !== -1) {
              tooltipMarkerType = 'circle';
              tooltipMarkerItems.push(tooltipItem);
            } else if (type === 'interval' && (coord.type === 'cartesian' || coord.type === 'rect')) {
              tooltipMarkerType = 'rect';
              tooltipItem.width = geom.getSize(record._origin);
              tooltipMarkerItems.push(tooltipItem);
            }
          }
        });
      }
    });

    if (items.length) {
      var tooltipMarkerCfg = {
        items: tooltipMarkerItems,
        type: tooltipMarkerType
      };

      self._setTooltip(point, items, tooltipMarkerCfg);
    } else {
      self.hideTooltip();
    }
  };

  _proto.hideTooltip = function hideTooltip() {
    var cfg = this._tooltipCfg;
    this._lastActive = null;
    var tooltip = this.tooltip;

    if (tooltip) {
      tooltip.hide();

      if (cfg.onHide) {
        cfg.onHide({
          tooltip: tooltip
        });
      }

      var canvas = this.chart.get('canvas');
      canvas.draw();
    }
  };

  _proto.handleShowEvent = function handleShowEvent(ev) {
    var chart = this.chart;
    if (!this.enable || chart.get('_closeTooltip')) return;
    var plot = chart.get('plotRange');
    var point = Util.createEvent(ev, chart);

    if (!Helper.isPointInPlot(point, plot) && !this._tooltipCfg.alwaysShow) {
      // not in chart plot
      this.hideTooltip();
      return;
    }

    var lastTimeStamp = this.timeStamp;
    var timeStamp = +new Date();

    if (timeStamp - lastTimeStamp > 16) {
      this.showTooltip(point);
      this.timeStamp = timeStamp;
    }
  };

  _proto.handleHideEvent = function handleHideEvent() {
    var chart = this.chart;
    if (!this.enable || chart.get('_closeTooltip')) return;
    this.hideTooltip();
  };

  _proto.handleDocEvent = function handleDocEvent(ev) {
    var chart = this.chart;
    if (!this.enable || chart.get('_closeTooltip')) return;
    var canvasDom = this.canvasDom;

    if (ev.target !== canvasDom) {
      this.hideTooltip();
    }
  };

  _proto._handleEvent = function _handleEvent(methodName, method, action) {
    var canvasDom = this.canvasDom;
    Util.each([].concat(methodName), function (aMethod) {
      if (action === 'bind') {
        Util.addEventListener(canvasDom, aMethod, method);
      } else {
        Util.removeEventListener(canvasDom, aMethod, method);
      }
    });
  };

  _proto.bindEvents = function bindEvents() {
    var cfg = this._tooltipCfg;
    var canvasElement = this.canvasDom;
    var triggerOn = cfg.triggerOn,
        triggerOff = cfg.triggerOff,
        alwaysShow = cfg.alwaysShow;
    var showMethod = Util.wrapBehavior(this, 'handleShowEvent');
    var hideMethod = Util.wrapBehavior(this, 'handleHideEvent');
    triggerOn && this._handleEvent(triggerOn, showMethod, 'bind');
    triggerOff && this._handleEvent(triggerOff, hideMethod, 'bind'); // 如果 !alwaysShow, 则在手势离开后就隐藏

    if (!alwaysShow) {
      var docMethod = Util.wrapBehavior(this, 'handleDocEvent');
      Util.addEventListener(canvasElement, 'touchend', docMethod);
    }
  };

  _proto.unBindEvents = function unBindEvents() {
    var cfg = this._tooltipCfg;
    var canvasElement = this.canvasDom;
    var triggerOn = cfg.triggerOn,
        triggerOff = cfg.triggerOff,
        alwaysShow = cfg.alwaysShow;
    var showMethod = Util.getWrapBehavior(this, 'handleShowEvent');
    var hideMethod = Util.getWrapBehavior(this, 'handleHideEvent');
    triggerOn && this._handleEvent(triggerOn, showMethod, 'unBind');
    triggerOff && this._handleEvent(triggerOff, hideMethod, 'unBind');

    if (!alwaysShow) {
      var docMethod = Util.getWrapBehavior(this, 'handleDocEvent');
      Util.removeEventListener(canvasElement, 'touchend', docMethod);
    }
  };

  return TooltipController;
}();

module.exports = {
  init: function init(chart) {
    var tooltipController = new TooltipController({
      chart: chart
    });
    chart.set('tooltipController', tooltipController);

    chart.tooltip = function (enable, cfg) {
      if (Util.isObject(enable)) {
        cfg = enable;
        enable = true;
      }

      tooltipController.enable = enable;

      if (cfg) {
        tooltipController.cfg = cfg;
      }

      return this;
    };
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var tooltipController = chart.get('tooltipController');
    tooltipController.render();

    chart.showTooltip = function (point) {
      tooltipController.showTooltip(point);
      return this;
    };

    chart.hideTooltip = function () {
      tooltipController.hideTooltip();
      return this;
    };
  },
  clearInner: function clearInner(chart) {
    var tooltipController = chart.get('tooltipController');
    tooltipController.clear();
  }
};
}, function(modId) { var map = {"../util/common":1578656684310,"../global":1578656684308,"../component/tooltip":1578656684385,"../util/helper":1578656684352}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684385, function(require, module, exports) {


var Util = require('../util/common');

var Marker = require('./marker');

var Container = require('./list');

var TextBox = require('./text-box');

var GAP = 4;
/**
 * TODOList：
 * 1. 移除 fixed 参数
 */

var Tooltip =
/*#__PURE__*/
function () {
  var _proto = Tooltip.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * wether show the crosshairs
       * @type {Object}
       */
      showCrosshairs: false,

      /**
       * the style for crosshairs
       * @type {Object}
       */
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 1
      },

      /**
       * the type of crosshairs, optional value is 'x', 'y' or 'xy', default is 'y'
       */
      crosshairsType: 'y',

      /**
       * show or hide the x axis tip
       */
      showXTip: false,

      /**
       * show or hide the y axis tip
       */
      showYTip: false,
      xTip: null,
      xTipBackground: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },
      yTip: null,
      yTipBackground: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },

      /**
       * the style for tooltip container's background
       * @type {Object}
       */
      background: null,

      /**
       * layout, can be horizontal or vertical
       * @type {String}
       */
      layout: 'horizontal',
      offsetX: 0,
      offsetY: 0
    };
  };

  function Tooltip(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);
    var frontPlot = this.frontPlot,
        custom = this.custom;

    if (!custom) {
      // custom means user do customize
      var container = new Container(Util.mix({
        parent: frontPlot,
        zIndex: 3
      }, cfg));
      this.container = container;
      var fixed = this.fixed,
          background = this.background;

      if (!fixed) {
        this.tooltipArrow = frontPlot.addShape('Polygon', {
          className: 'tooltip-arrow',
          visible: false,
          zIndex: 2,
          attrs: Util.mix({
            points: []
          }, background)
        });
      }
    }

    if (this.showXTip) {
      var xTipBackground = this.xTipBackground;
      var xTipBox = new TextBox({
        className: 'xTip',
        background: xTipBackground,
        visible: false
      });
      frontPlot.add(xTipBox.container);
      this.xTipBox = xTipBox;
    }

    if (this.showYTip) {
      var yTipBackground = this.yTipBackground;
      var yTipBox = new TextBox({
        className: 'yTip',
        background: yTipBackground,
        visible: false
      });
      frontPlot.add(yTipBox.container);
      this.yTipBox = yTipBox;
    }

    if (this.showCrosshairs) {
      this._renderCrosshairs();
    }

    frontPlot.sort();
  }

  _proto.setContent = function setContent(title, items) {
    this.title = title;
    this.items = items;

    if (!this.custom) {
      var container = this.container;
      container.setTitle(title);
      container.setItems(items);
    }
  };

  _proto.setYTipContent = function setYTipContent(val) {
    var yTip = this.yTip;

    if (Util.isFunction(yTip)) {
      val = yTip(val);
    } else {
      val = Util.mix({
        text: val
      }, yTip);
    }

    this.yTipBox && this.yTipBox.updateContent(val);
  };

  _proto.setYTipPosition = function setYTipPosition(pos) {
    var plotRange = this.plotRange;
    var crosshairsShapeX = this.crosshairsShapeX;

    if (this.showYTip) {
      var yTipBox = this.yTipBox;
      var yTipHeight = yTipBox.getHeight();
      var yTipWidth = yTipBox.getWidth();
      var posX = plotRange.tl.x - yTipWidth;
      var posY = pos - yTipHeight / 2;

      if (posY <= plotRange.tl.y) {
        posY = plotRange.tl.y;
      }

      if (posY + yTipHeight >= plotRange.br.y) {
        posY = plotRange.br.y - yTipHeight;
      }

      if (posX < 0) {
        posX = plotRange.tl.x;
        crosshairsShapeX && crosshairsShapeX.attr('x1', plotRange.tl.x + yTipWidth);
      }

      yTipBox.updatePosition(posX, posY);
    }
  };

  _proto.setXTipContent = function setXTipContent(val) {
    var xTip = this.xTip;

    if (Util.isFunction(xTip)) {
      val = xTip(val);
    } else {
      val = Util.mix({
        text: val
      }, xTip);
    }

    this.xTipBox && this.xTipBox.updateContent(val);
  };

  _proto.setXTipPosition = function setXTipPosition(pos) {
    var showXTip = this.showXTip,
        canvas = this.canvas,
        plotRange = this.plotRange,
        xTipBox = this.xTipBox,
        crosshairsShapeY = this.crosshairsShapeY;

    if (showXTip) {
      // const el = canvas.get('el');
      // const canvasHeight = Util.getHeight(el);
      var canvasHeight = canvas.get('height');
      var xTipWidth = xTipBox.getWidth();
      var xTipHeight = xTipBox.getHeight();
      var posX = pos - xTipWidth / 2;
      var posY = plotRange.br.y;

      if (posX <= plotRange.tl.x) {
        posX = plotRange.tl.x;
      }

      if (posX + xTipWidth >= plotRange.tr.x) {
        posX = plotRange.tr.x - xTipWidth;
      }

      if (canvasHeight - posY < xTipHeight) {
        posY -= xTipHeight;
      }

      xTipBox.updatePosition(posX, posY);
      crosshairsShapeY && crosshairsShapeY.attr('y1', posY);
    }
  };

  _proto.setXCrosshairPosition = function setXCrosshairPosition(pos) {
    this.crosshairsShapeX && this.crosshairsShapeX.moveTo(0, pos);
  };

  _proto.setYCrosshairPosition = function setYCrosshairPosition(pos) {
    this.crosshairsShapeY && this.crosshairsShapeY.moveTo(pos, 0);
  };

  _proto.setPosition = function setPosition(items) {
    var container = this.container,
        plotRange = this.plotRange,
        offsetX = this.offsetX,
        offsetY = this.offsetY,
        fixed = this.fixed,
        tooltipArrow = this.tooltipArrow;

    if (!container) {
      return;
    }

    var containerBBox = container.container.getBBox();
    var minX = containerBBox.minX,
        minY = containerBBox.minY,
        width = containerBBox.width,
        height = containerBBox.height;
    var tl = plotRange.tl,
        tr = plotRange.tr;
    var posX = 0;
    var posY = tl.y - height - GAP + offsetY;

    if (fixed) {
      var x = (tl.x + tr.x) / 2;
      posX = x - width / 2 + offsetX;
    } else {
      var _x;

      if (items.length > 1) {
        _x = (items[0].x + items[items.length - 1].x) / 2;
      } else {
        _x = items[0].x;
      }

      posX = _x - width / 2 + offsetX;

      if (posX < tl.x) {
        posX = tl.x;
      }

      if (posX + width > tr.x) {
        posX = tr.x - width;
      }

      if (tooltipArrow) {
        tooltipArrow.attr('points', [{
          x: _x - 3,
          y: tl.y - GAP + offsetY
        }, {
          x: _x + 3,
          y: tl.y - GAP + offsetY
        }, {
          x: _x,
          y: tl.y + offsetY
        }]);
        var backShape = container.backShape;
        var radius = Util.parsePadding(backShape.attr('radius'));

        if (_x === tl.x) {
          radius[3] = 0;
          tooltipArrow.attr('points', [{
            x: tl.x,
            y: tl.y + offsetY
          }, {
            x: tl.x,
            y: tl.y - GAP + offsetY
          }, {
            x: tl.x + GAP,
            y: tl.y - GAP + offsetY
          }]);
        } else if (_x === tr.x) {
          radius[2] = 0;
          tooltipArrow.attr('points', [{
            x: tr.x,
            y: tl.y + offsetY
          }, {
            x: tr.x - GAP,
            y: tl.y - GAP + offsetY
          }, {
            x: tr.x,
            y: tl.y - GAP + offsetY
          }]);
        }

        backShape.attr('radius', radius);
      }
    }

    container.moveTo(posX - minX, posY - minY);
  };

  _proto.setMarkers = function setMarkers(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var self = this;
    var _cfg = cfg,
        items = _cfg.items,
        style = _cfg.style,
        type = _cfg.type;

    var markerGroup = self._getMarkerGroup(type);

    if (type === 'circle') {
      for (var i = 0, length = items.length; i < length; i++) {
        var item = items[i];
        var marker = new Marker({
          className: 'tooltip-circle-marker',
          attrs: Util.mix({
            x: item.x,
            y: item.y,
            stroke: item.color
          }, style)
        });
        markerGroup.add(marker);
      }
    } else {
      markerGroup.addShape('rect', {
        className: 'tooltip-rect-marker',
        attrs: style
      });
    }
  };

  _proto.clearMarkers = function clearMarkers() {
    var markerGroup = this.markerGroup;
    markerGroup && markerGroup.clear();
  };

  _proto.show = function show() {
    var crosshairsShapeX = this.crosshairsShapeX;
    var crosshairsShapeY = this.crosshairsShapeY;
    var markerGroup = this.markerGroup;
    var container = this.container;
    var tooltipArrow = this.tooltipArrow;
    var xTipBox = this.xTipBox;
    var yTipBox = this.yTipBox;
    var canvas = this.canvas;
    crosshairsShapeX && crosshairsShapeX.show();
    crosshairsShapeY && crosshairsShapeY.show();
    markerGroup && markerGroup.show();
    container && container.show();
    tooltipArrow && tooltipArrow.show();
    xTipBox && xTipBox.show();
    yTipBox && yTipBox.show();
    canvas.draw();
  };

  _proto.hide = function hide() {
    var crosshairsShapeX = this.crosshairsShapeX;
    var crosshairsShapeY = this.crosshairsShapeY;
    var markerGroup = this.markerGroup;
    var container = this.container;
    var tooltipArrow = this.tooltipArrow;
    var xTipBox = this.xTipBox;
    var yTipBox = this.yTipBox;
    crosshairsShapeX && crosshairsShapeX.hide();
    crosshairsShapeY && crosshairsShapeY.hide();
    markerGroup && markerGroup.hide();
    container && container.hide();
    tooltipArrow && tooltipArrow.hide();
    xTipBox && xTipBox.hide();
    yTipBox && yTipBox.hide();
  };

  _proto.destroy = function destroy() {
    var crosshairsShapeX = this.crosshairsShapeX;
    var crosshairsShapeY = this.crosshairsShapeY;
    var markerGroup = this.markerGroup;
    var container = this.container;
    var tooltipArrow = this.tooltipArrow;
    var xTipBox = this.xTipBox;
    var yTipBox = this.yTipBox;
    crosshairsShapeX && crosshairsShapeX.remove(true);
    crosshairsShapeY && crosshairsShapeY.remove(true);
    markerGroup && markerGroup.remove(true);
    tooltipArrow && tooltipArrow.remove(true);
    container && container.clear();
    xTipBox && xTipBox.clear();
    yTipBox && yTipBox.clear();
    this.destroyed = true;
  };

  _proto._getMarkerGroup = function _getMarkerGroup(type) {
    var markerGroup = this.markerGroup;

    if (!markerGroup) {
      if (type === 'circle') {
        markerGroup = this.frontPlot.addGroup({
          zIndex: 1
        });
        this.frontPlot.sort();
      } else {
        markerGroup = this.backPlot.addGroup();
      }

      this.markerGroup = markerGroup;
    } else {
      markerGroup.clear();
    }

    return markerGroup;
  };

  _proto._renderCrosshairs = function _renderCrosshairs() {
    var crosshairsType = this.crosshairsType,
        crosshairsStyle = this.crosshairsStyle,
        frontPlot = this.frontPlot,
        plotRange = this.plotRange;
    var tl = plotRange.tl,
        br = plotRange.br;

    if (Util.directionEnabled(crosshairsType, 'x')) {
      this.crosshairsShapeX = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs-x',
        zIndex: 0,
        visible: false,
        attrs: Util.mix({
          x1: tl.x,
          y1: 0,
          x2: br.x,
          y2: 0
        }, crosshairsStyle)
      });
    }

    if (Util.directionEnabled(crosshairsType, 'y')) {
      this.crosshairsShapeY = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs-y',
        zIndex: 0,
        visible: false,
        attrs: Util.mix({
          x1: 0,
          y1: br.y,
          x2: 0,
          y2: tl.y
        }, crosshairsStyle)
      });
    }
  };

  return Tooltip;
}();

module.exports = Tooltip;
}, function(modId) { var map = {"../util/common":1578656684310,"./marker":1578656684386,"./list":1578656684387,"./text-box":1578656684388}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684386, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

/**
 * marker shapes，used for tooltip and legend
 */
var Util = require('../util/common');

var _require = require('../graphic/index'),
    Shape = _require.Shape;

var SYMBOLS = {
  circle: function circle(x, y, r, ctx) {
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
  },
  square: function square(x, y, r, ctx) {
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x - r, y + r);
    ctx.closePath();
  }
};

var Marker =
/*#__PURE__*/
function (_Shape) {
  (0, _inheritsLoose2["default"])(Marker, _Shape);

  function Marker() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Marker.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'marker';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        radius = attrs.radius;
    var symbol = attrs.symbol || 'circle';
    var method;

    if (Util.isFunction(symbol)) {
      method = symbol;
    } else {
      method = SYMBOLS[symbol];
    }

    context.beginPath();
    method(x, y, radius, context, this);
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        radius = attrs.radius;
    return {
      minX: x - radius,
      minY: y - radius,
      maxX: x + radius,
      maxY: y + radius
    };
  };

  return Marker;
}(Shape);

module.exports = Marker;
}, function(modId) { var map = {"../util/common":1578656684310,"../graphic/index":1578656684331}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684387, function(require, module, exports) {


var Util = require('../util/common');

var _require = require('../graphic/index'),
    Group = _require.Group;

var Marker = require('./marker');

var MARKER_RADIUS = 3;

var List =
/*#__PURE__*/
function () {
  var _proto = List.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      showTitle: false,

      /**
       * title string
       * @type {?String}
       */
      title: null,

      /**
       * items array
       * @type {?Array}
       */
      items: null,

      /**
       * offset between title and items
       * @type {Number}
       */
      titleGap: 12,

      /**
       * offset between each item
       * @type {Number}
       */
      itemGap: 10,

      /**
       * the offset between each item in vertical direaction
       * @type {Number}
       */
      itemMarginBottom: 12,

      /**
       * the formatter for item text
       * @type {[type]}
       */
      itemFormatter: null,
      itemWidth: null,

      /**
       * offset between marker and text
       * @type {Number}
       */
      wordSpace: 6,
      x: 0,
      y: 0,
      layout: 'horizontal',

      /**
       * the join string of `name` and `value`
       * @type {String}
       */
      joinString: ': '
    };
  };

  function List(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);

    this._init();

    this._renderTitle();

    this._renderItems();
  }

  _proto._init = function _init() {
    var container = new Group({
      zIndex: this.zIndex || 0
    });
    this.container = container;
    var wrapper = container.addGroup();
    this.wrapper = wrapper;
    var itemsGroup = wrapper.addGroup({
      className: 'itemsGroup'
    });
    this.itemsGroup = itemsGroup;

    if (this.parent) {
      this.parent.add(container);
    }
  };

  _proto._renderTitle = function _renderTitle(title) {
    title = title || this.title;
    var titleShape = this.titleShape;
    var titleHeight = 0;

    if (this.showTitle && title) {
      if (titleShape && !titleShape.get('destroyed')) {
        titleShape.attr('text', title);
      } else {
        var wrapper = this.wrapper,
            titleStyle = this.titleStyle;
        titleShape = wrapper.addShape('text', {
          className: 'title',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: title
          }, titleStyle)
        });
        this.titleShape = titleShape;
      }

      titleHeight = titleShape.getBBox().height + this.titleGap;
    }

    this._titleHeight = titleHeight;
  };

  _proto._renderItems = function _renderItems(items) {
    var self = this;
    items = items || self.items;

    if (!items) {
      return;
    }

    if (self.reversed) {
      items.reverse();
    }

    Util.each(items, function (item, index) {
      self._addItem(item, index);
    });

    if (items.length > 1) {
      this._adjustItems();
    }

    this._renderBackground();
  };

  _proto._renderBackground = function _renderBackground() {
    var background = this.background;

    if (background) {
      var container = this.container;
      var wrapper = this.wrapper;

      var _wrapper$getBBox = wrapper.getBBox(),
          minX = _wrapper$getBBox.minX,
          minY = _wrapper$getBBox.minY,
          width = _wrapper$getBBox.width,
          height = _wrapper$getBBox.height;

      var padding = background.padding || [0, 0, 0, 0];
      padding = Util.parsePadding(padding);
      var attrs = Util.mix({
        x: minX - padding[3],
        y: minY - padding[0],
        width: width + padding[1] + padding[3],
        height: height + padding[0] + padding[2]
      }, background);
      var backShape = this.backShape;

      if (backShape) {
        backShape.attr(attrs);
      } else {
        backShape = container.addShape('Rect', {
          zIndex: -1,
          attrs: attrs
        });
      }

      this.backShape = backShape;
      container.sort();
    }
  };

  _proto._addItem = function _addItem(item) {
    var itemsGroup = this.itemsGroup;
    var itemGroup = itemsGroup.addGroup({
      name: item.name,
      value: item.value,
      dataValue: item.dataValue,
      checked: item.checked
    });
    var unCheckStyle = this.unCheckStyle,
        unCheckColor = this.unCheckColor,
        nameStyle = this.nameStyle,
        valueStyle = this.valueStyle,
        wordSpace = this.wordSpace;
    var marker = item.marker,
        value = item.value;
    var startX = 0;

    if (unCheckColor) {
      unCheckStyle.fill = unCheckColor;
    }

    if (marker) {
      var radius = marker.radius || MARKER_RADIUS;
      var markerAttrs = Util.mix({
        x: radius,
        y: this._titleHeight
      }, marker);

      if (item.checked === false) {
        Util.mix(markerAttrs, unCheckStyle);
      }

      var markerShape = new Marker({
        className: 'item-marker',
        attrs: markerAttrs
      });
      itemGroup.add(markerShape);
      startX += markerShape.getBBox().width + wordSpace;
    }

    var nameText;
    var name = item.name;

    if (name) {
      var joinString = this.joinString || '';
      name = value ? name + joinString : name;
      nameText = itemGroup.addShape('text', {
        className: 'name',
        attrs: Util.mix({
          x: startX,
          y: this._titleHeight,
          text: this._formatItemValue(name)
        }, nameStyle, item.checked === false ? unCheckStyle : null)
      });
    }

    if (value) {
      var valueX = startX;

      if (nameText) {
        valueX += nameText.getBBox().width;
      }

      itemGroup.addShape('text', {
        className: 'value',
        attrs: Util.mix({
          x: valueX,
          y: this._titleHeight,
          text: value
        }, valueStyle, item.checked === false ? unCheckStyle : null)
      });
    }

    return itemGroup;
  };

  _proto._formatItemValue = function _formatItemValue(value) {
    var formatter = this.itemFormatter;

    if (formatter) {
      value = formatter.call(this, value);
    }

    return value;
  };

  _proto._getMaxItemWidth = function _getMaxItemWidth() {
    var width;
    var itemWidth = this.itemWidth;

    if (Util.isNumber(itemWidth) || Util.isNil(itemWidth)) {
      return itemWidth;
    }

    if (itemWidth === 'auto') {
      var itemsGroup = this.itemsGroup;
      var children = itemsGroup.get('children');
      var count = children.length;
      var maxItemWidth = 0;

      for (var i = 0; i < count; i++) {
        var _children$i$getBBox = children[i].getBBox(),
            _width = _children$i$getBBox.width;

        maxItemWidth = Math.max(maxItemWidth, _width);
      }

      var maxLength = this.maxLength;
      var itemGap = this.itemGap;
      var twoAvgWidth = (maxLength - itemGap) / 2;
      var threeAvgWidth = (maxLength - itemGap * 2) / 3;

      if (count === 2) {
        width = Math.max(maxItemWidth, twoAvgWidth);
      } else {
        // 1. max <= 3Avg, 3Avg
        // 2. 3Avg < max && max < 2avg, 2avg
        // 3. max > 2avg, max, one column
        if (maxItemWidth <= threeAvgWidth) {
          width = threeAvgWidth;
        } else if (maxItemWidth <= twoAvgWidth) {
          width = twoAvgWidth;
        } else {
          width = maxItemWidth;
        }
      }

      return width;
    }
  };

  _proto._adjustHorizontal = function _adjustHorizontal() {
    var maxLength = this.maxLength,
        itemsGroup = this.itemsGroup;
    var children = itemsGroup.get('children');
    var itemGap = this.itemGap,
        itemMarginBottom = this.itemMarginBottom;
    var titleHeight = this._titleHeight;
    var row = 0;
    var rowWidth = 0;
    var width;
    var height;

    var itemWidth = this._getMaxItemWidth();

    var legendHitBoxes = [];

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      var box = child.getBBox();
      var childHeight = box.height;
      var childWidth = box.width;
      width = itemWidth || childWidth;
      height = childHeight + itemMarginBottom;

      if (width - (maxLength - rowWidth) > 0.0001) {
        row++;
        rowWidth = 0;
      }

      child.moveTo(rowWidth, row * height);
      legendHitBoxes.push({
        x: rowWidth,
        y: row * height + titleHeight - childHeight / 2,
        width: childWidth * 1.375,
        height: childHeight * 1.375
      });
      rowWidth += width + itemGap;
    }

    this.legendHitBoxes = legendHitBoxes;
    return;
  };

  _proto._adjustVertical = function _adjustVertical() {
    var maxLength = this.maxLength,
        itemsGroup = this.itemsGroup;
    var itemGap = this.itemGap,
        itemMarginBottom = this.itemMarginBottom,
        itemWidth = this.itemWidth;
    var titleHeight = this._titleHeight;
    var children = itemsGroup.get('children');
    var colHeight = 0;
    var width;
    var height;
    var maxItemWidth = 0;
    var totalWidth = 0;
    var legendHitBoxes = [];

    for (var i = 0, length = children.length; i < length; i++) {
      var child = children[i];
      var bbox = child.getBBox();
      width = bbox.width;
      height = bbox.height;

      if (Util.isNumber(itemWidth)) {
        maxItemWidth = itemWidth + itemGap;
      } else if (width > maxItemWidth) {
        maxItemWidth = width + itemGap;
      }

      if (maxLength - colHeight < height) {
        colHeight = 0;
        totalWidth += maxItemWidth;
        child.moveTo(totalWidth, 0);
        legendHitBoxes.push({
          x: totalWidth,
          y: titleHeight - height / 2,
          width: width * 1.375,
          height: height * 1.375
        });
      } else {
        child.moveTo(totalWidth, colHeight);
        legendHitBoxes.push({
          x: totalWidth,
          y: colHeight - height / 2 + titleHeight,
          width: width * 1.375,
          height: height * 1.375
        });
      }

      colHeight += height + itemMarginBottom;
    }

    this.legendHitBoxes = legendHitBoxes;
    return;
  };

  _proto._adjustItems = function _adjustItems() {
    var layout = this.layout;

    if (layout === 'horizontal') {
      this._adjustHorizontal();
    } else {
      this._adjustVertical();
    }
  };

  _proto.moveTo = function moveTo(x, y) {
    this.x = x;
    this.y = y;
    var container = this.container;
    container && container.moveTo(x, y);
    return this;
  };

  _proto.setItems = function setItems(items) {
    this.clearItems();

    this._renderItems(items);
  };

  _proto.setTitle = function setTitle(title) {
    this._renderTitle(title);
  };

  _proto.clearItems = function clearItems() {
    var itemsGroup = this.itemsGroup;
    itemsGroup.clear();
  };

  _proto.getWidth = function getWidth() {
    var container = this.container;
    var bbox = container.getBBox();
    return bbox.width;
  };

  _proto.getHeight = function getHeight() {
    var container = this.container;
    var bbox = container.getBBox();
    return bbox.height;
  };

  _proto.show = function show() {
    var container = this.container;
    container.show();
  };

  _proto.hide = function hide() {
    var container = this.container;
    container.hide();
  };

  _proto.clear = function clear() {
    var container = this.container;
    container.clear();
    container.remove(true);
  };

  return List;
}();

module.exports = List;
}, function(modId) { var map = {"../util/common":1578656684310,"../graphic/index":1578656684331,"./marker":1578656684386}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684388, function(require, module, exports) {


var Util = require('../util/common');

var _require = require('../graphic/index'),
    Group = _require.Group;

var TextBox =
/*#__PURE__*/
function () {
  var _proto = TextBox.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      x: 0,
      y: 0,
      content: '',
      textStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      background: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },
      width: 0,
      height: 0,
      className: ''
    };
  };

  function TextBox(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);

    this._init();

    var content = this.content,
        x = this.x,
        y = this.y;

    if (!Util.isNil(content)) {
      this.updateContent(content);
    }

    this.updatePosition(x, y);
  }

  _proto._init = function _init() {
    var content = this.content,
        textStyle = this.textStyle,
        background = this.background,
        className = this.className,
        visible = this.visible;
    var container = new Group({
      className: className,
      zIndex: 0,
      visible: visible
    });
    var text = container.addShape('Text', {
      className: className + '-text',
      zIndex: 1,
      attrs: Util.mix({
        text: content,
        x: 0,
        y: 0
      }, textStyle)
    });
    var backgroundShape = container.addShape('Rect', {
      className: className + '-bg',
      zIndex: -1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }, background)
    });
    container.sort();
    this.container = container;
    this.textShape = text;
    this.backgroundShape = backgroundShape;
  };

  _proto._getBBox = function _getBBox() {
    var textShape = this.textShape;
    var background = this.background;
    var textBBox = textShape.getBBox();
    var padding = Util.parsePadding(background.padding);
    var width = textBBox.width + padding[1] + padding[3];
    var height = textBBox.height + padding[0] + padding[2];
    var x = textBBox.minX - padding[3];
    var y = textBBox.minY - padding[0];
    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  };

  _proto.updateContent = function updateContent(text) {
    var textShape = this.textShape,
        backgroundShape = this.backgroundShape;

    if (!Util.isNil(text)) {
      if (!Util.isObject(text)) {
        text = {
          text: text
        };
      }

      textShape.attr(text); // update box shape

      var _this$_getBBox = this._getBBox(),
          x = _this$_getBBox.x,
          y = _this$_getBBox.y,
          tipWidth = _this$_getBBox.width,
          tipHeight = _this$_getBBox.height;

      var width = this.width || tipWidth;
      var height = this.height || tipHeight;
      backgroundShape.attr({
        x: x,
        y: y,
        width: width,
        height: height
      });
      this._width = width;
      this._height = height;
      this.content = text.text;
    }
  };

  _proto.updatePosition = function updatePosition(x, y) {
    var container = this.container;

    var _this$_getBBox2 = this._getBBox(),
        xMin = _this$_getBBox2.x,
        yMin = _this$_getBBox2.y;

    container.moveTo(x - xMin, y - yMin);
    this.x = x - xMin;
    this.y = y - yMin;
  };

  _proto.getWidth = function getWidth() {
    return this._width;
  };

  _proto.getHeight = function getHeight() {
    return this._height;
  };

  _proto.show = function show() {
    this.container.show();
  };

  _proto.hide = function hide() {
    this.container.hide();
  };

  _proto.clear = function clear() {
    var container = this.container;
    container.clear();
    container.remove(true);
    this.container = null;
    this.textShape = null;
    this.backgroundShape = null;
  };

  return TextBox;
}();

module.exports = TextBox;
}, function(modId) { var map = {"../util/common":1578656684310,"../graphic/index":1578656684331}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684389, function(require, module, exports) {


var Util = require('../util/common');

var Guide = require('../component/guide/base');

var Global = require('../global'); // register the default configuration for Guide


Global.guide = Util.deepMix({
  line: {
    style: {
      stroke: '#a3a3a3',
      lineWidth: 1
    },
    top: true
  },
  text: {
    style: {
      fill: '#787878',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offsetX: 0,
    offsetY: 0,
    top: true
  },
  rect: {
    style: {
      fill: '#fafafa'
    },
    top: false
  },
  arc: {
    style: {
      stroke: '#a3a3a3'
    },
    top: true
  },
  html: {
    offsetX: 0,
    offsetY: 0,
    alignX: 'center',
    alignY: 'middle'
  },
  tag: {
    top: true,
    offsetX: 0,
    offsetY: 0,
    side: 4,
    background: {
      padding: 5,
      radius: 2,
      fill: '#1890FF'
    },
    textStyle: {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  point: {
    top: true,
    offsetX: 0,
    offsetY: 0,
    style: {
      fill: '#fff',
      r: 3,
      lineWidth: 2,
      stroke: '#1890ff'
    }
  }
}, Global.guide || {});

var GuideController =
/*#__PURE__*/
function () {
  function GuideController(cfg) {
    this.guides = [];
    this.xScale = null;
    this.yScales = null;
    this.guideShapes = [];
    Util.mix(this, cfg);
  }

  var _proto = GuideController.prototype;

  _proto._toString = function _toString(position) {
    if (Util.isFunction(position)) {
      position = position(this.xScale, this.yScales);
    }

    position = position.toString();
    return position;
  };

  _proto._getId = function _getId(shape, guide) {
    var id = guide.id;

    if (!id) {
      var type = guide.type;

      if (type === 'arc' || type === 'line' || type === 'rect') {
        id = this._toString(guide.start) + '-' + this._toString(guide.end);
      } else {
        id = this._toString(guide.position);
      }
    }

    return id;
  };

  _proto.paint = function paint(coord) {
    var self = this;
    var chart = self.chart,
        guides = self.guides,
        xScale = self.xScale,
        yScales = self.yScales;
    var guideShapes = [];
    Util.each(guides, function (guide, idx) {
      guide.xScale = xScale;
      guide.yScales = yScales;
      var container;

      if (guide.type === 'regionFilter') {
        // TODO: RegionFilter support animation
        guide.chart = chart;
      } else {
        container = guide.top ? self.frontPlot : self.backPlot;
      }

      guide.coord = coord;
      guide.container = container;
      guide.canvas = chart.get('canvas');
      var shape = guide.render(coord, container);

      if (shape) {
        var id = self._getId(shape, guide);

        [].concat(shape).forEach(function (s) {
          s._id = s.get('className') + '-' + id;
          s.set('index', idx);
          guideShapes.push(s);
        });
      }
    });
    self.guideShapes = guideShapes;
  };

  _proto.clear = function clear() {
    this.reset();
    this.guides = [];
    return this;
  };

  _proto.reset = function reset() {
    var guides = this.guides;
    Util.each(guides, function (guide) {
      guide.remove();
    });
  };

  _proto._createGuide = function _createGuide(type, cfg) {
    var ClassName = Util.upperFirst(type);
    var guide = new Guide[ClassName](Util.deepMix({}, Global.guide[type], cfg));
    this.guides.push(guide);
    return guide;
  };

  _proto.line = function line(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('line', cfg);
  };

  _proto.text = function text(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('text', cfg);
  };

  _proto.arc = function arc(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('arc', cfg);
  };

  _proto.html = function html(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('html', cfg);
  };

  _proto.rect = function rect(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('rect', cfg);
  };

  _proto.tag = function tag(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('tag', cfg);
  };

  _proto.point = function point(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('point', cfg);
  };

  _proto.regionFilter = function regionFilter(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('regionFilter', cfg);
  };

  return GuideController;
}();

module.exports = {
  init: function init(chart) {
    var guideController = new GuideController({
      frontPlot: chart.get('frontPlot').addGroup({
        zIndex: 20,
        className: 'guideContainer'
      }),
      backPlot: chart.get('backPlot').addGroup({
        className: 'guideContainer'
      })
    });
    chart.set('guideController', guideController);
    /**
     * 为图表添加 guide
     * @return {GuideController} 返回 guide 控制器
     */

    chart.guide = function () {
      return guideController;
    };
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var guideController = chart.get('guideController');

    if (!guideController.guides.length) {
      return;
    }

    var xScale = chart.getXScale();
    var yScales = chart.getYScales();
    var coord = chart.get('coord');
    guideController.xScale = xScale;
    guideController.yScales = yScales;
    guideController.chart = chart; // for regionFilter

    guideController.paint(coord);
  },
  clear: function clear(chart) {
    chart.get('guideController').clear();
  },
  repaint: function repaint(chart) {
    chart.get('guideController').reset();
  }
};
}, function(modId) { var map = {"../util/common":1578656684310,"../component/guide/base":1578656684377,"../global":1578656684308}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684390, function(require, module, exports) {


var Util = require('../util/common');

var List = require('../component/list');

var Global = require('../global');

var LEGEND_GAP = 12;
var MARKER_SIZE = 3;
var DEFAULT_CFG = {
  itemMarginBottom: 12,
  itemGap: 10,
  showTitle: false,
  titleStyle: {
    fontSize: 12,
    fill: '#808080',
    textAlign: 'start',
    textBaseline: 'top'
  },
  nameStyle: {
    fill: '#808080',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'middle'
  },
  valueStyle: {
    fill: '#000000',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'middle'
  },
  unCheckStyle: {
    fill: '#bfbfbf'
  },
  itemWidth: 'auto',
  wordSpace: 6,
  selectedMode: 'multiple' // 'multiple' or 'single'

}; // Register the default configuration for Legend

Global.legend = Util.deepMix({
  common: DEFAULT_CFG,
  // common legend configuration
  right: Util.mix({
    position: 'right',
    layout: 'vertical'
  }, DEFAULT_CFG),
  left: Util.mix({
    position: 'left',
    layout: 'vertical'
  }, DEFAULT_CFG),
  top: Util.mix({
    position: 'top',
    layout: 'horizontal'
  }, DEFAULT_CFG),
  bottom: Util.mix({
    position: 'bottom',
    layout: 'horizontal'
  }, DEFAULT_CFG)
}, Global.legend || {});

function getPaddingByPos(pos, appendPadding) {
  var padding = 0;
  appendPadding = Util.parsePadding(appendPadding);

  switch (pos) {
    case 'top':
      padding = appendPadding[0];
      break;

    case 'right':
      padding = appendPadding[1];
      break;

    case 'bottom':
      padding = appendPadding[2];
      break;

    case 'left':
      padding = appendPadding[3];
      break;

    default:
      break;
  }

  return padding;
}

var LegendController =
/*#__PURE__*/
function () {
  function LegendController(cfg) {
    this.legendCfg = {};
    this.enable = true;
    this.position = 'top';
    Util.mix(this, cfg);
    var chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
    this.clear();
  }

  var _proto = LegendController.prototype;

  _proto.addLegend = function addLegend(scale, items, filteredVals) {
    var self = this;
    var legendCfg = self.legendCfg;
    var field = scale.field;
    var fieldCfg = legendCfg[field];

    if (fieldCfg === false) {
      return null;
    }

    if (fieldCfg && fieldCfg.custom) {
      self.addCustomLegend(field);
    } else {
      var position = legendCfg.position || self.position;

      if (fieldCfg && fieldCfg.position) {
        position = fieldCfg.position;
      }

      if (scale.isCategory) {
        self._addCategoryLegend(scale, items, position, filteredVals);
      }
    }
  };

  _proto.addCustomLegend = function addCustomLegend(field) {
    var self = this;
    var legendCfg = self.legendCfg;

    if (field && legendCfg[field]) {
      legendCfg = legendCfg[field];
    }

    var position = legendCfg.position || self.position;
    var legends = self.legends;
    legends[position] = legends[position] || [];
    var items = legendCfg.items;

    if (!items) {
      return null;
    }

    var container = self.container;
    Util.each(items, function (item) {
      if (!Util.isPlainObject(item.marker)) {
        item.marker = {
          symbol: item.marker || 'circle',
          fill: item.fill,
          radius: MARKER_SIZE
        };
      } else {
        item.marker.radius = item.marker.radius || MARKER_SIZE;
      }

      item.checked = Util.isNil(item.checked) ? true : item.checked;
      item.name = item.name || item.value;
    });
    var legend = new List(Util.deepMix({}, Global.legend[position], legendCfg, {
      maxLength: self._getMaxLength(position),
      items: items,
      parent: container
    }));
    legends[position].push(legend);
  };

  _proto.clear = function clear() {
    var legends = this.legends;
    Util.each(legends, function (legendItems) {
      Util.each(legendItems, function (legend) {
        legend.clear();
      });
    });
    this.legends = {};
    this.unBindEvents();
  };

  _proto._isFiltered = function _isFiltered(scale, values, value) {
    var rst = false;
    Util.each(values, function (val) {
      rst = rst || scale.getText(val) === scale.getText(value);

      if (rst) {
        return false;
      }
    });
    return rst;
  };

  _proto._getMaxLength = function _getMaxLength(position) {
    var chart = this.chart;
    var appendPadding = Util.parsePadding(chart.get('appendPadding'));
    return position === 'right' || position === 'left' ? chart.get('height') - (appendPadding[0] + appendPadding[2]) : chart.get('width') - (appendPadding[1] + appendPadding[3]);
  };

  _proto._addCategoryLegend = function _addCategoryLegend(scale, items, position, filteredVals) {
    var self = this;
    var legendCfg = self.legendCfg,
        legends = self.legends,
        container = self.container,
        chart = self.chart;
    var field = scale.field;
    legends[position] = legends[position] || [];
    var symbol = 'circle';

    if (legendCfg[field] && legendCfg[field].marker) {
      symbol = legendCfg[field].marker;
    } else if (legendCfg.marker) {
      symbol = legendCfg.marker;
    }

    Util.each(items, function (item) {
      if (Util.isPlainObject(symbol)) {
        Util.mix(item.marker, symbol);
      } else {
        item.marker.symbol = symbol;
      }

      if (filteredVals) {
        item.checked = !self._isFiltered(scale, filteredVals, item.dataValue);
      }
    });
    var legendItems = chart.get('legendItems');
    legendItems[field] = items;
    var lastCfg = Util.deepMix({}, Global.legend[position], legendCfg[field] || legendCfg, {
      maxLength: self._getMaxLength(position),
      items: items,
      field: field,
      filteredVals: filteredVals,
      parent: container
    });

    if (lastCfg.showTitle) {
      Util.deepMix(lastCfg, {
        title: scale.alias || scale.field
      });
    }

    var legend = new List(lastCfg);
    legends[position].push(legend);
    return legend;
  };

  _proto._alignLegend = function _alignLegend(legend, pre, position) {
    var self = this;
    var _self$plotRange = self.plotRange,
        tl = _self$plotRange.tl,
        bl = _self$plotRange.bl;
    var chart = self.chart;
    var offsetX = legend.offsetX || 0;
    var offsetY = legend.offsetY || 0;
    var chartWidth = chart.get('width');
    var chartHeight = chart.get('height');
    var appendPadding = Util.parsePadding(chart.get('appendPadding'));
    var legendHeight = legend.getHeight();
    var legendWidth = legend.getWidth();
    var x = 0;
    var y = 0;

    if (position === 'left' || position === 'right') {
      var verticalAlign = legend.verticalAlign || 'middle';
      var height = Math.abs(tl.y - bl.y);
      x = position === 'left' ? appendPadding[3] : chartWidth - legendWidth - appendPadding[1];
      y = (height - legendHeight) / 2 + tl.y;

      if (verticalAlign === 'top') {
        y = tl.y;
      } else if (verticalAlign === 'bottom') {
        y = bl.y - legendHeight;
      }

      if (pre) {
        y = pre.get('y') - legendHeight - LEGEND_GAP;
      }
    } else {
      var align = legend.align || 'left';
      x = appendPadding[3];

      if (align === 'center') {
        x = chartWidth / 2 - legendWidth / 2;
      } else if (align === 'right') {
        x = chartWidth - (legendWidth + appendPadding[1]);
      }

      y = position === 'top' ? appendPadding[0] + Math.abs(legend.container.getBBox().minY) : chartHeight - legendHeight;

      if (pre) {
        var preWidth = pre.getWidth();
        x = pre.x + preWidth + LEGEND_GAP;
      }
    }

    if (position === 'bottom' && offsetY > 0) {
      offsetY = 0;
    }

    if (position === 'right' && offsetX > 0) {
      offsetX = 0;
    }

    legend.moveTo(x + offsetX, y + offsetY);
  };

  _proto.alignLegends = function alignLegends() {
    var self = this;
    var legends = self.legends;
    Util.each(legends, function (legendItems, position) {
      Util.each(legendItems, function (legend, index) {
        var pre = legendItems[index - 1];

        self._alignLegend(legend, pre, position);
      });
    });
    return self;
  };

  _proto.handleEvent = function handleEvent(ev) {
    var self = this;

    function findItem(x, y) {
      var result = null;
      var legends = self.legends;
      Util.each(legends, function (legendItems) {
        Util.each(legendItems, function (legend) {
          var itemsGroup = legend.itemsGroup,
              legendHitBoxes = legend.legendHitBoxes;
          var children = itemsGroup.get('children');

          if (children.length) {
            var legendPosX = legend.x;
            var legendPosY = legend.y;
            Util.each(legendHitBoxes, function (box, index) {
              if (x >= box.x + legendPosX && x <= box.x + box.width + legendPosX && y >= box.y + legendPosY && y <= box.height + box.y + legendPosY) {
                // inbox
                result = {
                  clickedItem: children[index],
                  clickedLegend: legend
                };
                return false;
              }
            });
          }
        });
      });
      return result;
    }

    var chart = self.chart;

    var _Util$createEvent = Util.createEvent(ev, chart),
        x = _Util$createEvent.x,
        y = _Util$createEvent.y;

    var clicked = findItem(x, y);

    if (clicked && clicked.clickedLegend.clickable !== false) {
      var clickedItem = clicked.clickedItem,
          clickedLegend = clicked.clickedLegend;

      if (clickedLegend.onClick) {
        ev.clickedItem = clickedItem;
        clickedLegend.onClick(ev);
      } else if (!clickedLegend.custom) {
        var checked = clickedItem.get('checked');
        var value = clickedItem.get('dataValue');
        var filteredVals = clickedLegend.filteredVals,
            field = clickedLegend.field,
            selectedMode = clickedLegend.selectedMode;
        var isSingeSelected = selectedMode === 'single';

        if (isSingeSelected) {
          chart.filter(field, function (val) {
            return val === value;
          });
        } else {
          if (checked) {
            filteredVals.push(value);
          } else {
            Util.Array.remove(filteredVals, value);
          }

          chart.filter(field, function (val) {
            return filteredVals.indexOf(val) === -1;
          });
        }

        chart.repaint();
      }
    }
  };

  _proto.bindEvents = function bindEvents() {
    var legendCfg = this.legendCfg;
    var triggerOn = legendCfg.triggerOn || 'touchstart';
    var method = Util.wrapBehavior(this, 'handleEvent');
    Util.addEventListener(this.canvasDom, triggerOn, method);
  };

  _proto.unBindEvents = function unBindEvents() {
    var legendCfg = this.legendCfg;
    var triggerOn = legendCfg.triggerOn || 'touchstart';
    var method = Util.getWrapBehavior(this, 'handleEvent');
    Util.removeEventListener(this.canvasDom, triggerOn, method);
  };

  return LegendController;
}();

module.exports = {
  init: function init(chart) {
    var legendController = new LegendController({
      container: chart.get('backPlot'),
      plotRange: chart.get('plotRange'),
      chart: chart
    });
    chart.set('legendController', legendController);

    chart.legend = function (field, cfg) {
      var legendCfg = legendController.legendCfg;
      legendController.enable = true;

      if (Util.isBoolean(field)) {
        legendController.enable = field;
        legendCfg = cfg || {};
      } else if (Util.isObject(field)) {
        legendCfg = field;
      } else {
        legendCfg[field] = cfg;
      }

      legendController.legendCfg = legendCfg;
      return this;
    };
  },
  beforeGeomDraw: function beforeGeomDraw(chart) {
    var legendController = chart.get('legendController');
    if (!legendController.enable) return null; // legend is not displayed

    var legendCfg = legendController.legendCfg;

    if (legendCfg && legendCfg.custom) {
      legendController.addCustomLegend();
    } else {
      var legendItems = chart.getLegendItems();
      var scales = chart.get('scales');
      var filters = chart.get('filters');
      Util.each(legendItems, function (items, field) {
        var scale = scales[field];
        var values = scale.values;
        var filteredVals;

        if (filters && filters[field]) {
          filteredVals = values.filter(function (v) {
            return !filters[field](v);
          });
        } else {
          filteredVals = [];
        }

        legendController.addLegend(scale, items, filteredVals);
      });
    }

    if (legendCfg && legendCfg.clickable !== false) {
      legendController.bindEvents();
    }

    var legends = legendController.legends;
    var legendRange = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    Util.each(legends, function (legendItems, position) {
      var padding = 0;
      Util.each(legendItems, function (legend) {
        var width = legend.getWidth();
        var height = legend.getHeight();

        if (position === 'top' || position === 'bottom') {
          padding = Math.max(padding, height);

          if (legend.offsetY > 0) {
            padding += legend.offsetY;
          }
        } else {
          padding = Math.max(padding, width);

          if (legend.offsetX > 0) {
            padding += legend.offsetX;
          }
        }
      });
      legendRange[position] = padding + getPaddingByPos(position, chart.get('appendPadding'));
    });
    chart.set('legendRange', legendRange);
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var legendController = chart.get('legendController');
    legendController.alignLegends();
  },
  clearInner: function clearInner(chart) {
    var legendController = chart.get('legendController');
    legendController.clear();
    chart.set('legendRange', null);
  }
};
}, function(modId) { var map = {"../util/common":1578656684310,"../component/list":1578656684387,"../global":1578656684308}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684391, function(require, module, exports) {


/**
 * Handle the detail animations
 * @author sima.zhang1990@gmail.com
 */
var Util = require('../util/common');

var Element = require('../graphic/element');

var Timeline = require('../graphic/animate/timeline');

var Animator = require('../graphic/animate/animator');

var Animate = require('./animate');

var ShapeAction = require('./shape-action');

var GroupAction = require('./group-action');

var Chart = require('../chart/chart');

var timeline;

Element.prototype.animate = function () {
  var attrs = Util.mix({}, this.get('attrs'));
  return new Animator(this, attrs, timeline);
};

Chart.prototype.animate = function (cfg) {
  this.set('animate', cfg);
  return this;
};

Animate.Action = ShapeAction;
Animate.defaultCfg = {
  interval: {
    enter: function enter(coord) {
      if (coord.isPolar && coord.transposed) {
        // for pie chart
        return function (shape) {
          shape.set('zIndex', -1);
          var container = shape.get('parent');
          container.sort();
        };
      }

      return ShapeAction.fadeIn;
    }
  },
  area: {
    enter: function enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  },
  line: {
    enter: function enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  },
  path: {
    enter: function enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  }
};
var GROUP_ANIMATION = {
  line: function line(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }

    return GroupAction.groupWaveIn;
  },
  area: function area(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }

    return GroupAction.groupWaveIn;
  },
  path: function path(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }

    return GroupAction.groupWaveIn;
  },
  point: function point() {
    return GroupAction.shapesScaleInXY;
  },
  interval: function interval(coord) {
    var result;

    if (coord.isPolar) {
      // polar coodinate
      result = GroupAction.groupScaleInXY;

      if (coord.transposed) {
        // pie chart
        result = GroupAction.groupWaveIn;
      }
    } else {
      result = coord.transposed ? GroupAction.groupScaleInX : GroupAction.groupScaleInY;
    }

    return result;
  },
  schema: function schema() {
    return GroupAction.groupWaveIn;
  }
};

function diff(fromAttrs, toAttrs) {
  var endState = {};

  for (var k in toAttrs) {
    if (Util.isNumber(fromAttrs[k]) && fromAttrs[k] !== toAttrs[k]) {
      endState[k] = toAttrs[k];
    } else if (Util.isArray(fromAttrs[k]) && JSON.stringify(fromAttrs[k]) !== JSON.stringify(toAttrs[k])) {
      endState[k] = toAttrs[k];
    }
  }

  return endState;
} // Add a unique id identifier to each shape


function _getShapeId(geom, dataObj, geomIdx) {
  var type = geom.get('type');
  var id = 'geom' + geomIdx + '-' + type;
  var xScale = geom.getXScale();
  var yScale = geom.getYScale();
  var xField = xScale.field || 'x';
  var yField = yScale.field || 'y';
  var yVal = dataObj[yField];
  var xVal;

  if (xScale.isIdentity) {
    xVal = xScale.value;
  } else {
    xVal = dataObj[xField];
  }

  if (type === 'interval' || type === 'schema') {
    id += '-' + xVal;
  } else if (type === 'line' || type === 'area' || type === 'path') {
    id += '-' + type;
  } else {
    id += xScale.isCategory ? '-' + xVal : '-' + xVal + '-' + yVal;
  }

  var groupScales = geom._getGroupScales();

  Util.each(groupScales, function (groupScale) {
    var field = groupScale.field;

    if (groupScale.type !== 'identity') {
      id += '-' + dataObj[field];
    }
  });
  return id;
} // get geometry's shapes


function getShapes(geoms, chart, coord) {
  var shapes = [];
  Util.each(geoms, function (geom, geomIdx) {
    var geomContainer = geom.get('container');
    var geomShapes = geomContainer.get('children');
    var type = geom.get('type');
    var animateCfg = Util.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');

    if (animateCfg !== false) {
      Util.each(geomShapes, function (shape, index) {
        if (shape.get('className') === type) {
          shape._id = _getShapeId(geom, shape.get('origin')._origin, geomIdx);
          shape.set('coord', coord);
          shape.set('animateCfg', animateCfg);
          shape.set('index', index);
          shapes.push(shape);
        }
      });
    }

    geom.set('shapes', geomShapes);
  });
  return shapes;
}

function cache(shapes) {
  var rst = {};

  for (var i = 0, len = shapes.length; i < len; i++) {
    var shape = shapes[i];
    if (!shape._id || shape.isClip) continue;
    var id = shape._id;
    rst[id] = {
      _id: id,
      type: shape.get('type'),
      // the type of shape
      attrs: Util.mix({}, shape._attrs.attrs),
      // the graphics attributes of shape
      className: shape.get('className'),
      geomType: shape.get('className'),
      index: shape.get('index'),
      coord: shape.get('coord'),
      animateCfg: shape.get('animateCfg')
    };
  }

  return rst;
}

function getAnimate(geomType, coord, animationType, animationName) {
  var result;

  if (Util.isFunction(animationName)) {
    result = animationName;
  } else if (Util.isString(animationName)) {
    result = Animate.Action[animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, animationType);
  }

  return result;
}

function getAnimateCfg(geomType, animationType, animateCfg) {
  if (animateCfg === false || Util.isObject(animateCfg) && animateCfg[animationType] === false) {
    return false;
  }

  var defaultCfg = Animate.getAnimateCfg(geomType, animationType);

  if (animateCfg && animateCfg[animationType]) {
    return Util.deepMix({}, defaultCfg, animateCfg[animationType]);
  }

  return defaultCfg;
}

function addAnimate(cache, shapes, canvas) {
  var animate;
  var animateCfg; // the order of animation: leave -> update -> enter

  var updateShapes = [];
  var newShapes = [];
  Util.each(shapes, function (shape) {
    var result = cache[shape._id];

    if (!result) {
      newShapes.push(shape);
    } else {
      shape.set('cacheShape', result);
      updateShapes.push(shape);
      delete cache[shape._id];
    }
  }); // first do the leave animation

  Util.each(cache, function (deletedShape) {
    var className = deletedShape.className,
        coord = deletedShape.coord,
        _id = deletedShape._id,
        attrs = deletedShape.attrs,
        index = deletedShape.index,
        type = deletedShape.type;
    animateCfg = getAnimateCfg(className, 'leave', deletedShape.animateCfg);
    if (animateCfg === false) return true;
    animate = getAnimate(className, coord, 'leave', animateCfg.animation);

    if (Util.isFunction(animate)) {
      var tempShape = canvas.addShape(type, {
        attrs: attrs,
        index: index,
        canvas: canvas,
        className: className
      });
      tempShape._id = _id;
      animate(tempShape, animateCfg, coord);
    }
  }); // then do the update animation

  Util.each(updateShapes, function (updateShape) {
    var className = updateShape.get('className');
    animateCfg = getAnimateCfg(className, 'update', updateShape.get('animateCfg'));
    if (animateCfg === false) return true;
    var coord = updateShape.get('coord');
    var cacheAttrs = updateShape.get('cacheShape').attrs;
    var endState = diff(cacheAttrs, updateShape._attrs.attrs); // 判断如果属性相同的话就不进行变换

    if (Object.keys(endState).length) {
      animate = getAnimate(className, coord, 'update', animateCfg.animation);

      if (Util.isFunction(animate)) {
        animate(updateShape, animateCfg, coord);
      } else {
        updateShape.attr(cacheAttrs);
        updateShape.animate().to({
          attrs: endState,
          duration: animateCfg.duration,
          easing: animateCfg.easing,
          delay: animateCfg.delay
        }).onEnd(function () {
          updateShape.set('cacheShape', null);
        });
      }
    }
  }); // last, enter animation

  Util.each(newShapes, function (newShape) {
    // 新图形元素的进场元素
    var className = newShape.get('className');
    var coord = newShape.get('coord');
    animateCfg = getAnimateCfg(className, 'enter', newShape.get('animateCfg'));
    if (animateCfg === false) return true;
    animate = getAnimate(className, coord, 'enter', animateCfg.animation);

    if (Util.isFunction(animate)) {
      if (className === 'interval' && coord.isPolar && coord.transposed) {
        var index = newShape.get('index');
        var lastShape = updateShapes[index - 1];
        animate(newShape, animateCfg, lastShape);
      } else {
        animate(newShape, animateCfg, coord);
      }
    }
  });
}

function _getAnimateCfgByShapeType(type, chart) {
  if (!type) {
    return null;
  }

  var animateCfg = chart.get('animate');

  if (type.indexOf('guide-tag') > -1) {
    type = 'guide-tag';
  }

  if (Util.isObject(animateCfg)) {
    return animateCfg[type];
  }

  if (animateCfg === false) {
    return false;
  }

  return null;
}

module.exports = {
  afterCanvasInit: function afterCanvasInit()
  /* chart */
  {
    timeline = new Timeline();
    timeline.play();
  },
  beforeCanvasDraw: function beforeCanvasDraw(chart) {
    if (chart.get('animate') === false) {
      return;
    }

    var isUpdate = chart.get('isUpdate');
    var canvas = chart.get('canvas');
    var coord = chart.get('coord');
    var geoms = chart.get('geoms');
    var caches = canvas.get('caches') || [];

    if (caches.length === 0) {
      isUpdate = false;
    }

    var cacheShapes = getShapes(geoms, chart, coord);

    var _chart$get = chart.get('axisController'),
        frontPlot = _chart$get.frontPlot,
        backPlot = _chart$get.backPlot;

    var axisShapes = frontPlot.get('children').concat(backPlot.get('children'));
    var guideShapes = [];

    if (chart.get('guideController')) {
      guideShapes = chart.get('guideController').guideShapes;
    }

    var componentShapes = [];
    axisShapes.concat(guideShapes).forEach(function (s) {
      var className = s.get('className');

      var animateCfg = _getAnimateCfgByShapeType(className, chart);

      s.set('coord', coord);
      s.set('animateCfg', animateCfg);
      componentShapes.push(s);
      cacheShapes.push(s);
    });
    canvas.set('caches', cache(cacheShapes));

    if (isUpdate) {
      addAnimate(caches, cacheShapes, canvas);
    } else {
      // do the appear animation
      var animateCfg;
      var animate;
      Util.each(geoms, function (geom) {
        var type = geom.get('type');
        var geomCfg = Util.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');

        if (geomCfg !== false) {
          animateCfg = getAnimateCfg(type, 'appear', geomCfg);
          animate = getAnimate(type, coord, 'appear', animateCfg.animation);

          if (Util.isFunction(animate)) {
            var shapes = geom.get('shapes');
            Util.each(shapes, function (shape) {
              animate(shape, animateCfg, coord);
            });
          } else if (GROUP_ANIMATION[type]) {
            // do the default animation
            animate = GroupAction[animateCfg.animation] || GROUP_ANIMATION[type](coord);
            var yScale = geom.getYScale();
            var zeroY = coord.convertPoint({
              x: 0,
              y: yScale.scale(geom.getYMinValue())
            });
            var container = geom.get('container');
            animate && animate(container, animateCfg, coord, zeroY);
          }
        }
      }); // do the animation of components

      Util.each(componentShapes, function (shape) {
        var animateCfg = shape.get('animateCfg');
        var className = shape.get('className');

        if (animateCfg && animateCfg.appear) {
          // if user configure
          var defaultCfg = Animate.getAnimateCfg(className, 'appear');
          var appearCfg = Util.deepMix({}, defaultCfg, animateCfg.appear);

          var _animate = getAnimate(className, coord, 'appear', appearCfg.animation);

          if (Util.isFunction(_animate)) {
            _animate(shape, appearCfg, coord);
          }
        }
      });
    }
  },
  afterCanvasDestroyed: function afterCanvasDestroyed()
  /* chart */
  {
    timeline.stop();
  }
};
}, function(modId) { var map = {"../util/common":1578656684310,"../graphic/element":1578656684335,"../graphic/animate/timeline":1578656684392,"../graphic/animate/animator":1578656684393,"./animate":1578656684395,"./shape-action":1578656684396,"./group-action":1578656684398,"../chart/chart":1578656684312}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684392, function(require, module, exports) {


var _require = require('../util/requestAnimationFrame'),
    requestAnimationFrame = _require.requestAnimationFrame;

var clock = typeof performance === 'object' && performance.now ? performance : Date;

var Timeline =
/*#__PURE__*/
function () {
  function Timeline() {
    this.anims = [];
    this.time = null;
    this.playing = false;
    this.canvas = [];
  }

  var _proto = Timeline.prototype;

  _proto.play = function play() {
    var self = this;
    self.time = clock.now();
    self.playing = true;

    function step() {
      if (self.playing) {
        requestAnimationFrame(step);
        self.update();
      }
    }

    requestAnimationFrame(step);
  };

  _proto.stop = function stop() {
    this.playing = false;
    this.time = null;
    this.canvas = [];
  };

  _proto.update = function update() {
    var currentTime = clock.now();
    this.canvas = [];

    for (var i = 0; i < this.anims.length; i++) {
      var propertyAnim = this.anims[i];

      if (currentTime < propertyAnim.startTime || propertyAnim.hasEnded) {
        continue;
      }

      var shape = propertyAnim.shape; // shape

      if (shape.get('destroyed')) {
        this.anims.splice(i, 1);
        i--;
        continue;
      }

      var startState = propertyAnim.startState,
          endState = propertyAnim.endState,
          interpolate = propertyAnim.interpolate,
          duration = propertyAnim.duration;

      if (currentTime >= propertyAnim.startTime && !propertyAnim.hasStarted) {
        propertyAnim.hasStarted = true;

        if (propertyAnim.onStart) {
          propertyAnim.onStart();
        }
      }

      var t = (currentTime - propertyAnim.startTime) / duration;
      t = Math.max(0, Math.min(t, 1));
      t = propertyAnim.easing(t);

      if (propertyAnim.onFrame) {
        propertyAnim.onFrame(t);
      } else {
        for (var key in interpolate) {
          var diff = interpolate[key];
          var value = diff(t);
          var newValue = void 0;

          if (key === 'points') {
            newValue = [];
            var aLen = Math.max(startState.points.length, endState.points.length);

            for (var j = 0; j < aLen; j += 2) {
              newValue.push({
                x: value[j],
                y: value[j + 1]
              });
            }
          } else {
            newValue = value;
          }

          shape._attrs.attrs[key] = newValue;
          shape._attrs.bbox = null; // should clear calculated bbox
        }
      }

      var canvas = shape.get('canvas');

      if (this.canvas.indexOf(canvas) === -1) {
        this.canvas.push(canvas);
      }

      if (propertyAnim.onUpdate) {
        propertyAnim.onUpdate(t);
      }

      if (currentTime >= propertyAnim.endTime && !propertyAnim.hasEnded) {
        propertyAnim.hasEnded = true;

        if (propertyAnim.onEnd) {
          propertyAnim.onEnd();
        }
      }

      if (t === 1) {
        // end
        this.anims.splice(i, 1);
        i--;
      }
    }

    this.canvas.map(function (c) {
      c.draw();
      return c;
    });
    this.time = clock.now();
  };

  return Timeline;
}();

module.exports = Timeline;
}, function(modId) { var map = {"../util/requestAnimationFrame":1578656684338}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684393, function(require, module, exports) {


var Easing = require('./easing');

function plainArray(arr) {
  var result = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i]) {
      result.push(arr[i].x);
      result.push(arr[i].y);
    }
  }

  return result;
}

function interpolateNumber(a, b) {
  a = +a;
  b -= a;
  return function (t) {
    return a + b * t;
  };
}

function interpolateArray(a, b) {
  var nb = b ? b.length : 0;
  var na = a ? Math.min(nb, a.length) : 0;
  var x = new Array(na);
  var c = new Array(nb);
  var i;

  for (i = 0; i < na; ++i) {
    x[i] = interpolateNumber(a[i], b[i]);
  }

  for (; i < nb; ++i) {
    c[i] = b[i];
  }

  return function (t) {
    for (i = 0; i < na; ++i) {
      c[i] = x[i](t);
    }

    return c;
  };
}

var Animator =
/*#__PURE__*/
function () {
  function Animator(shape, source, timeline) {
    this.hasStarted = false;
    this.hasEnded = false;
    this.shape = shape;
    this.source = source;
    this.timeline = timeline;
    this.animate = null;
  } // delay, attrs, duration, easing


  var _proto = Animator.prototype;

  _proto.to = function to(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var delay = cfg.delay || 0;
    var attrs = cfg.attrs || {};
    var duration = cfg.duration || 1000;
    var easing; // 缓动函数

    if (typeof cfg.easing === 'function') {
      easing = cfg.easing;
    } else {
      easing = Easing[cfg.easing] || Easing.linear;
    }

    var animInfo = {
      shape: this.shape,
      startTime: this.timeline.time + delay,
      duration: duration,
      easing: easing
    };
    var interpolate = {}; // 差值函数

    for (var attrName in attrs) {
      var startValue = this.source[attrName];
      var endValue = attrs[attrName];

      if (attrName === 'points') {
        startValue = plainArray(startValue);
        endValue = plainArray(endValue);
        interpolate.points = interpolateArray(startValue, endValue);
        this.source.points = startValue;
        attrs.points = endValue;
      } else if (attrName === 'matrix') {
        interpolate.matrix = interpolateArray(startValue, endValue);
      } else {
        interpolate[attrName] = interpolateNumber(startValue, endValue);
      }
    }

    animInfo.interpolate = interpolate;
    animInfo.startState = this.source;
    animInfo.endState = attrs;
    animInfo.endTime = animInfo.startTime + duration;
    this.timeline.anims.push(animInfo);
    this.animate = animInfo;
    return this;
  };

  _proto.onFrame = function onFrame(callback) {
    // 自定义每一帧动画的动作
    if (this.animate) {
      this.animate.onFrame = function (frame) {
        callback(frame);
      };
    }

    return this;
  };

  _proto.onStart = function onStart(callback) {
    if (this.animate) {
      this.animate.onStart = function () {
        callback();
      };
    }

    return this;
  };

  _proto.onUpdate = function onUpdate(callback) {
    if (this.animate) {
      this.animate.onUpdate = function (frame) {
        callback(frame);
      };
    }

    return this;
  };

  _proto.onEnd = function onEnd(callback) {
    if (this.animate) {
      this.animate.onEnd = function () {
        callback();
      };
    }

    return this;
  };

  return Animator;
}();

module.exports = Animator;
}, function(modId) { var map = {"./easing":1578656684394}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684394, function(require, module, exports) {


var Easing = {
  linear: function linear(k) {
    return k;
  },
  quadraticIn: function quadraticIn(k) {
    return k * k;
  },
  quadraticOut: function quadraticOut(k) {
    return k * (2 - k);
  },
  quadraticInOut: function quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }

    return -0.5 * (--k * (k - 2) - 1);
  },
  cubicIn: function cubicIn(k) {
    return k * k * k;
  },
  cubicOut: function cubicOut(k) {
    return --k * k * k + 1;
  },
  cubicInOut: function cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k + 2);
  },
  elasticIn: function elasticIn(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },
  elasticOut: function elasticOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
  },
  elasticInOut: function elasticInOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  backIn: function backIn(k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },
  backOut: function backOut(k) {
    var s = 1.70158;
    return (k = k - 1) * k * ((s + 1) * k + s) + 1;
  },
  backInOut: function backInOut(k) {
    var s = 1.70158 * 1.525;

    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },
  bounceIn: function bounceIn(k) {
    return 1 - Easing.bounceOut(1 - k);
  },
  bounceOut: function bounceOut(k) {
    if ((k /= 1) < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    }

    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
  },
  bounceInOut: function bounceInOut(k) {
    if (k < 0.5) {
      return Easing.bounceIn(k * 2) * 0.5;
    }

    return Easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};
module.exports = Easing;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684395, function(require, module, exports) {


/**
 * Animate configuration and register
 * @author sima.zhang1990@gmail.com
 */
var Util = require('../util/common');

var defaultAnimationCfg = {
  appear: {
    duration: 450,
    easing: 'quadraticOut'
  },
  // 'appear' animation options
  update: {
    duration: 300,
    easing: 'quadraticOut'
  },
  // 'update' animation options
  enter: {
    duration: 300,
    easing: 'quadraticOut'
  },
  // 'enter' animation options
  leave: {
    duration: 350,
    easing: 'quadraticIn'
  } // 'leave' animation options

};
var Animate = {
  defaultCfg: {},
  Action: {},
  getAnimation: function getAnimation(geomType, coord, animationType) {
    var geomAnimateCfg = this.defaultCfg[geomType];

    if (geomAnimateCfg) {
      var animation = geomAnimateCfg[animationType];

      if (Util.isFunction(animation)) {
        return animation(coord);
      }
    }

    return false;
  },
  getAnimateCfg: function getAnimateCfg(geomType, animationType) {
    var defaultCfg = defaultAnimationCfg[animationType];
    var geomConfig = this.defaultCfg[geomType];

    if (geomConfig && geomConfig.cfg && geomConfig.cfg[animationType]) {
      return Util.deepMix({}, defaultCfg, geomConfig.cfg[animationType]);
    }

    return defaultCfg;
  },
  registerAnimation: function registerAnimation(animationName, animationFun) {
    if (!this.Action) {
      this.Action = {};
    }

    this.Action[animationName] = animationFun;
  }
};
module.exports = Animate;
}, function(modId) { var map = {"../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684396, function(require, module, exports) {


/**
 * Animation functions for shape
 * @author sima.zhang1990@gmail.com
 */
var Util = require('../util/common');

var Helpers = require('./util');
/*
function waveIn(shape, animateCfg, coord) {
  const clip = Helpers.getClip(coord);
  clip.set('canvas', shape.get('canvas'));
  shape.attr('clip', clip);
  const onEnd = function() {
    shape.attr('clip', null);
    clip.remove(true);
  };
  Helpers.doAnimation(clip, clip.endState, animateCfg, onEnd);
}

function scaleInX(shape, animateCfg) {
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  let x;
  const y = (box.minY + box.maxY) / 2;

  if (points[0].y - points[1].y > 0) { // 当顶点在零点之下
    x = box.maxX;
  } else {
    x = box.minX;
  }
  const scaledMatrix = Helpers.getScaledMatrix(shape, [ x, y ], 'x');
  Helpers.doAnimation(shape, { matrix: scaledMatrix }, animateCfg);
}

function scaleInY(shape, animateCfg) {
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  const x = (box.minX + box.maxX) / 2;
  let y;

  if (points[0].y - points[1].y <= 0) { // 当顶点在零点之下
    y = box.maxY;
  } else {
    y = box.minY;
  }
  const scaledMatrix = Helpers.getScaledMatrix(shape, [ x, y ], 'x');
  Helpers.doAnimation(shape, { matrix: scaledMatrix }, animateCfg);
}
*/


function fadeIn(shape, animateCfg) {
  var fillOpacity = Util.isNil(shape.attr('fillOpacity')) ? 1 : shape.attr('fillOpacity');
  var strokeOpacity = Util.isNil(shape.attr('strokeOpacity')) ? 1 : shape.attr('strokeOpacity');
  shape.attr('fillOpacity', 0);
  shape.attr('strokeOpacity', 0);
  var endState = {
    fillOpacity: fillOpacity,
    strokeOpacity: strokeOpacity
  };
  Helpers.doAnimation(shape, endState, animateCfg);
}

module.exports = {
  // waveIn,
  // scaleInX,
  // scaleInY,
  fadeIn: fadeIn
};
}, function(modId) { var map = {"../util/common":1578656684310,"./util":1578656684397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684397, function(require, module, exports) {


/**
 * Utility
 * @author sima.zhang1990@gmail.com
 */
var _require = require('../graphic/index'),
    Matrix = _require.Matrix;

var Util = require('../util/common');

var Helpers = {
  getCoordInfo: function getCoordInfo(coord) {
    var start = coord.start;
    var end = coord.end;
    return {
      start: start,
      end: end,
      width: end.x - start.x,
      height: Math.abs(end.y - start.y)
    };
  },
  getScaledMatrix: function getScaledMatrix(shape, v, direct) {
    var scaledMatrix;
    shape.apply(v);
    var x = v[0];
    var y = v[1];

    if (direct === 'x') {
      shape.transform([['t', x, y], ['s', 0.01, 1], ['t', -x, -y]]);
      var matrix = shape.getMatrix();
      scaledMatrix = Matrix.transform(matrix, [['t', x, y], ['s', 100, 1], ['t', -x, -y]]);
    } else if (direct === 'y') {
      shape.transform([['t', x, y], ['s', 1, 0.01], ['t', -x, -y]]);

      var _matrix = shape.getMatrix();

      scaledMatrix = Matrix.transform(_matrix, [['t', x, y], ['s', 1, 100], ['t', -x, -y]]);
    } else if (direct === 'xy') {
      shape.transform([['t', x, y], ['s', 0.01, 0.01], ['t', -x, -y]]);

      var _matrix2 = shape.getMatrix();

      scaledMatrix = Matrix.transform(_matrix2, [['t', x, y], ['s', 100, 100], ['t', -x, -y]]);
    }

    return scaledMatrix;
  },
  getAnimateParam: function getAnimateParam(animateCfg, index, id) {
    var result = {};

    if (animateCfg.delay) {
      result.delay = Util.isFunction(animateCfg.delay) ? animateCfg.delay(index, id) : animateCfg.delay;
    }

    result.easing = animateCfg.easing;
    result.duration = animateCfg.duration;
    result.delay = animateCfg.delay;
    return result;
  },
  doAnimation: function doAnimation(shape, endState, animateCfg, callback) {
    var id = shape._id;
    var index = shape.get('index');

    var _Helpers$getAnimatePa = Helpers.getAnimateParam(animateCfg, index, id),
        easing = _Helpers$getAnimatePa.easing,
        delay = _Helpers$getAnimatePa.delay,
        duration = _Helpers$getAnimatePa.duration;

    var anim = shape.animate().to({
      attrs: endState,
      duration: duration,
      delay: delay,
      easing: easing
    });

    if (callback) {
      anim.onEnd(function () {
        callback();
      });
    }
  }
};
module.exports = Helpers;
}, function(modId) { var map = {"../graphic/index":1578656684331,"../util/common":1578656684310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578656684398, function(require, module, exports) {


/**
 * Group animate functions
 * @author sima.zhang1990@gmail.com
 */
var Util = require('./util');

var Helper = require('../util/helper');

var _require = require('../graphic/index'),
    Shape = _require.Shape;

function _groupScaleIn(container, animateCfg, coord, zeroY, type) {
  var _Util$getCoordInfo = Util.getCoordInfo(coord),
      start = _Util$getCoordInfo.start,
      end = _Util$getCoordInfo.end,
      width = _Util$getCoordInfo.width,
      height = _Util$getCoordInfo.height;

  var x;
  var y;
  var clip = new Shape.Rect({
    attrs: {
      x: start.x,
      y: end.y,
      width: width,
      height: height
    }
  });

  if (type === 'y') {
    x = start.x + width / 2;
    y = zeroY.y < start.y ? zeroY.y : start.y;
  } else if (type === 'x') {
    x = zeroY.x > start.x ? zeroY.x : start.x;
    y = start.y + height / 2;
  } else if (type === 'xy') {
    if (coord.isPolar) {
      x = coord.center.x;
      y = coord.center.y;
    } else {
      x = (start.x + end.x) / 2;
      y = (start.y + end.y) / 2;
    }
  }

  var endMatrix = Util.getScaledMatrix(clip, [x, y], type);
  clip.isClip = true;
  clip.endState = {
    matrix: endMatrix
  };
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);

  var onEnd = function onEnd() {
    container.attr('clip', null);
    clip.remove(true);
  };

  Util.doAnimation(clip, clip.endState, animateCfg, onEnd);
}

function _shapeScale(container, animateCfg, type) {
  var shapes = container.get('children');
  var x;
  var y;
  var endMatrix;

  for (var i = 0, len = shapes.length; i < len; i++) {
    var shape = shapes[i];
    var box = shape.getBBox();
    x = (box.minX + box.maxX) / 2;
    y = (box.minY + box.maxY) / 2;
    endMatrix = Util.getScaledMatrix(shape, [x, y], type);
    Util.doAnimation(shape, {
      matrix: endMatrix
    }, animateCfg);
  }
}

function groupScaleInX(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'x');
}

function groupScaleInY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'y');
}

function groupScaleInXY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'xy');
}

function shapesScaleInX(container, animateCfg) {
  _shapeScale(container, animateCfg, 'x');
}

function shapesScaleInY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'y');
}

function shapesScaleInXY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'xy');
}

function groupWaveIn(container, animateCfg, coord) {
  var clip = Helper.getClip(coord);
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);

  var onEnd = function onEnd() {
    container.attr('clip', null);
    clip.remove(true);
  };

  var endState = {};

  if (coord.isPolar) {
    var startAngle = coord.startAngle,
        endAngle = coord.endAngle;
    endState.endAngle = endAngle;
    clip.attr('endAngle', startAngle);
  } else {
    var start = coord.start,
        end = coord.end;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);

    if (coord.isTransposed) {
      clip.attr('height', 0);
      endState.height = height;
    } else {
      clip.attr('width', 0);
      endState.width = width;
    }
  }

  Util.doAnimation(clip, endState, animateCfg, onEnd);
}

module.exports = {
  groupWaveIn: groupWaveIn,
  groupScaleInX: groupScaleInX,
  groupScaleInY: groupScaleInY,
  groupScaleInXY: groupScaleInXY,
  shapesScaleInX: shapesScaleInX,
  shapesScaleInY: shapesScaleInY,
  shapesScaleInXY: shapesScaleInXY
};
}, function(modId) { var map = {"./util":1578656684397,"../util/helper":1578656684352,"../graphic/index":1578656684331}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578656684306);
})()
//# sourceMappingURL=index.js.map