/**
 * @license
 * KLineChart v9.5.0
 * Copyright (c) 2019 lihu.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.klinecharts = {}));
})(this, (function (exports) { 'use strict';

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function merge(target, source) {
    if ((!isObject(target) && !isObject(source))) {
        return;
    }
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            var targetProp = target[key];
            var sourceProp = source[key];
            if (isObject(sourceProp) &&
                isObject(targetProp) &&
                !isArray(sourceProp) &&
                !isArray(targetProp)) {
                merge(targetProp, sourceProp);
            }
            else {
                if (isValid(source[key])) {
                    target[key] = source[key];
                }
            }
        }
    }
}
function clone(target) {
    if (!isObject(target) || !isArray(target)) {
        return target;
    }
    var copy;
    if (isArray(target)) {
        copy = [];
    }
    else {
        copy = {};
    }
    for (var key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            var v = target[key];
            if (isObject(v)) {
                copy[key] = clone(v);
            }
            else {
                copy[key] = v;
            }
        }
    }
    return copy;
}
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isObject(value) {
    return (typeof value === 'object');
}
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
function isValid(value) {
    return value !== null && value !== undefined;
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isString(value) {
    return typeof value === 'string';
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var reEscapeChar = /\\(\\)?/g;
var rePropName = RegExp('[^.[\\]]+' + '|' +
    '\\[(?:' +
    '([^"\'][^[]*)' + '|' +
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
    ')\\]' + '|' +
    '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
function formatValue(data, key, defaultValue) {
    if (isValid(data)) {
        var path_1 = [];
        key.replace(rePropName, function (subString) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var k = subString;
            if (isValid(args[1])) {
                k = args[2].replace(reEscapeChar, '$1');
            }
            else if (isValid(args[0])) {
                k = args[0].trim();
            }
            path_1.push(k);
            return '';
        });
        var value = data;
        var index = 0;
        var length_1 = path_1.length;
        while (isValid(value) && index < length_1) {
            value = value === null || value === void 0 ? void 0 : value[path_1[index++]];
        }
        return isValid(value) ? value : (defaultValue !== null && defaultValue !== void 0 ? defaultValue : '--');
    }
    return defaultValue !== null && defaultValue !== void 0 ? defaultValue : '--';
}
function formatDate(dateTimeFormat, timestamp, format) {
    var dateTimeString = dateTimeFormat.format(new Date(timestamp));
    var dateTimeStringArray = dateTimeString.split(', ');
    var dateStringArray = dateTimeStringArray[0].split('/');
    var timeStringArray = dateTimeStringArray[1].split(':');
    var date = {
        YYYY: dateStringArray[2],
        MM: dateStringArray[0],
        DD: dateStringArray[1],
        HH: timeStringArray[0] === '24' ? '00' : timeStringArray[0],
        mm: timeStringArray[1],
        ss: timeStringArray[2]
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, function (key) { return date[key]; });
}
function formatPrecision(value, precision) {
    var v = +value;
    if (isNumber(v)) {
        return v.toFixed(precision !== null && precision !== void 0 ? precision : 2);
    }
    return "".concat(value);
}
function formatBigNumber(value) {
    var v = +value;
    if (isNumber(v)) {
        if (v > 1000000000) {
            return "".concat(+((v / 1000000000).toFixed(3)), "B");
        }
        if (v > 1000000) {
            return "".concat(+((v / 1000000).toFixed(3)), "M");
        }
        if (v > 1000) {
            return "".concat(+((v / 1000).toFixed(3)), "K");
        }
    }
    return "".concat(value);
}
function formatThousands(value, sign) {
    var vl = "".concat(value);
    if (sign.length === 0) {
        return vl;
    }
    if (vl.includes('.')) {
        var arr = vl.split('.');
        return "".concat(arr[0].replace(/(\d)(?=(\d{3})+$)/g, function ($1) { return "".concat($1).concat(sign); }), ".").concat(arr[1]);
    }
    return vl.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { return "".concat($1).concat(sign); });
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * line type
 */
exports.LineType = void 0;
(function (LineType) {
    LineType["Dashed"] = "dashed";
    LineType["Solid"] = "solid";
})(exports.LineType || (exports.LineType = {}));
exports.PolygonType = void 0;
(function (PolygonType) {
    PolygonType["Stroke"] = "stroke";
    PolygonType["Fill"] = "fill";
    PolygonType["StrokeFill"] = "stroke_fill";
})(exports.PolygonType || (exports.PolygonType = {}));
exports.TooltipShowRule = void 0;
(function (TooltipShowRule) {
    TooltipShowRule["Always"] = "always";
    TooltipShowRule["FollowCross"] = "follow_cross";
    TooltipShowRule["None"] = "none";
})(exports.TooltipShowRule || (exports.TooltipShowRule = {}));
exports.TooltipShowType = void 0;
(function (TooltipShowType) {
    TooltipShowType["Standard"] = "standard";
    TooltipShowType["Rect"] = "rect";
})(exports.TooltipShowType || (exports.TooltipShowType = {}));
exports.TooltipIconPosition = void 0;
(function (TooltipIconPosition) {
    TooltipIconPosition["Left"] = "left";
    TooltipIconPosition["Middle"] = "middle";
    TooltipIconPosition["Right"] = "right";
})(exports.TooltipIconPosition || (exports.TooltipIconPosition = {}));
function getDefaultGridStyle() {
    return {
        show: true,
        horizontal: {
            show: true,
            size: 1,
            color: '#EDEDED',
            style: exports.LineType.Dashed,
            dashedValue: [2, 2]
        },
        vertical: {
            show: true,
            size: 1,
            color: '#EDEDED',
            style: exports.LineType.Dashed,
            dashedValue: [2, 2]
        }
    };
}
var CandleTooltipRectPosition;
(function (CandleTooltipRectPosition) {
    CandleTooltipRectPosition["Fixed"] = "fixed";
    CandleTooltipRectPosition["Pointer"] = "pointer";
})(CandleTooltipRectPosition || (CandleTooltipRectPosition = {}));
exports.CandleType = void 0;
(function (CandleType) {
    CandleType["CandleSolid"] = "candle_solid";
    CandleType["CandleStroke"] = "candle_stroke";
    CandleType["CandleUpStroke"] = "candle_up_stroke";
    CandleType["CandleDownStroke"] = "candle_down_stroke";
    CandleType["Ohlc"] = "ohlc";
    CandleType["Area"] = "area";
})(exports.CandleType || (exports.CandleType = {}));
/**
 * Get default candle style
 * @type {{area: {backgroundColor: [{offset: number, color: string}, {offset: number, color: string}], lineColor: string, lineSize: number, value: string}, bar: {noChangeColor: string, upColor: string, downColor: string}, tooltip: {rect: {offsetTop: number, fillColor: string, borderColor: string, paddingBottom: number, borderRadius: number, paddingRight: number, borderSize: number, offsetLeft: number, paddingTop: number, paddingLeft: number, offsetRight: number}, showRule: string, values: null, showType: string, text: {marginRight: number, size: number, color: string, weight: string, marginBottom: number, family: string, marginTop: number, marginLeft: number}, labels: string[]}, type: string, priceMark: {high: {textMargin: number, textSize: number, color: string, textFamily: string, show: boolean, textWeight: string}, last: {noChangeColor: string, upColor: string, line: {dashValue: number[], size: number, show: boolean, style: string}, show: boolean, text: {paddingBottom: number, size: number, color: string, paddingRight: number, show: boolean, weight: string, paddingTop: number, family: string, paddingLeft: number}, downColor: string}, low: {textMargin: number, textSize: number, color: string, textFamily: string, show: boolean, textWeight: string}, show: boolean}}}
 */
function getDefaultCandleStyle() {
    return {
        type: exports.CandleType.CandleSolid,
        bar: {
            upColor: '#2DC08E',
            downColor: '#F92855',
            noChangeColor: '#888888',
            upBorderColor: '#2DC08E',
            downBorderColor: '#F92855',
            noChangeBorderColor: '#888888',
            upWickColor: '#2DC08E',
            downWickColor: '#F92855',
            noChangeWickColor: '#888888'
        },
        area: {
            lineSize: 2,
            lineColor: '#1677FF',
            value: 'close',
            backgroundColor: [{
                    offset: 0,
                    color: 'rgba(22, 119, 255, 0.01)'
                }, {
                    offset: 1,
                    color: 'rgba(22, 119, 255, 0.2)'
                }]
        },
        priceMark: {
            show: true,
            high: {
                show: true,
                color: '#76808F',
                textOffset: 5,
                textSize: 10,
                textFamily: 'Helvetica Neue',
                textWeight: 'normal'
            },
            low: {
                show: true,
                color: '#76808F',
                textOffset: 5,
                textSize: 10,
                textFamily: 'Helvetica Neue',
                textWeight: 'normal'
            },
            last: {
                show: true,
                upColor: '#2DC08E',
                downColor: '#F92855',
                noChangeColor: '#888888',
                line: {
                    show: true,
                    style: exports.LineType.Dashed,
                    dashedValue: [4, 4],
                    size: 1
                },
                text: {
                    show: true,
                    style: exports.PolygonType.Fill,
                    size: 12,
                    paddingLeft: 4,
                    paddingTop: 4,
                    paddingRight: 4,
                    paddingBottom: 4,
                    borderStyle: exports.LineType.Solid,
                    borderSize: 1,
                    borderDashedValue: [2, 2],
                    color: '#FFFFFF',
                    family: 'Helvetica Neue',
                    weight: 'normal',
                    borderRadius: 2
                }
            }
        },
        tooltip: {
            showRule: exports.TooltipShowRule.Always,
            showType: exports.TooltipShowType.Standard,
            custom: null,
            defaultValue: 'n/a',
            rect: {
                position: CandleTooltipRectPosition.Fixed,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 8,
                offsetLeft: 10,
                offsetTop: 8,
                offsetRight: 10,
                offsetBottom: 8,
                borderRadius: 4,
                borderSize: 1,
                borderColor: '#F2F3F5',
                color: '#FEFEFE'
            },
            text: {
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                color: '#76808F',
                marginLeft: 10,
                marginTop: 8,
                marginRight: 6,
                marginBottom: 0
            },
            icons: []
        }
    };
}
/**
 * Get default indicator style
 */
function getDefaultIndicatorStyle() {
    return {
        ohlc: {
            upColor: 'rgba(45, 192, 142, .7)',
            downColor: 'rgba(249, 40, 85, .7)',
            noChangeColor: '#888888'
        },
        bars: [{
                style: exports.PolygonType.Fill,
                borderStyle: exports.LineType.Solid,
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: 'rgba(45, 192, 142, .7)',
                downColor: 'rgba(249, 40, 85, .7)',
                noChangeColor: '#888888'
            }],
        lines: [
            {
                style: exports.LineType.Solid,
                smooth: false,
                size: 1,
                dashedValue: [2, 2],
                color: '#FF9600'
            }, {
                style: exports.LineType.Solid,
                smooth: false,
                size: 1,
                dashedValue: [2, 2],
                color: '#935EBD'
            }, {
                style: exports.LineType.Solid,
                smooth: false,
                size: 1,
                dashedValue: [2, 2],
                color: '#1677FF'
            }, {
                style: exports.LineType.Solid,
                smooth: false,
                size: 1,
                dashedValue: [2, 2],
                color: '#E11D74'
            }, {
                style: exports.LineType.Solid,
                smooth: false,
                size: 1,
                dashedValue: [2, 2],
                color: '#01C5C4'
            }
        ],
        circles: [{
                style: exports.PolygonType.Fill,
                borderStyle: exports.LineType.Solid,
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: 'rgba(45, 192, 142, .7)',
                downColor: 'rgba(249, 40, 85, .7)',
                noChangeColor: '#888888'
            }],
        lastValueMark: {
            show: false,
            text: {
                show: false,
                style: exports.PolygonType.Fill,
                color: '#FFFFFF',
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                borderStyle: exports.LineType.Solid,
                borderSize: 1,
                borderDashedValue: [2, 2],
                paddingLeft: 4,
                paddingTop: 4,
                paddingRight: 4,
                paddingBottom: 4,
                borderRadius: 2
            }
        },
        tooltip: {
            showRule: exports.TooltipShowRule.Always,
            showType: exports.TooltipShowType.Standard,
            showName: true,
            showParams: true,
            defaultValue: 'n/a',
            text: {
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                color: '#76808F',
                marginLeft: 10,
                marginTop: 8,
                marginRight: 6,
                marginBottom: 0
            },
            icons: []
        }
    };
}
function getDefaultXAxisStyle() {
    return {
        show: true,
        size: 'auto',
        axisLine: {
            show: true,
            color: '#DDDDDD',
            size: 1
        },
        tickText: {
            show: true,
            color: '#76808F',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            marginStart: 4,
            marginEnd: 4
        },
        tickLine: {
            show: true,
            size: 1,
            length: 3,
            color: '#DDDDDD'
        }
    };
}
exports.YAxisPosition = void 0;
(function (YAxisPosition) {
    YAxisPosition["Left"] = "left";
    YAxisPosition["Right"] = "right";
})(exports.YAxisPosition || (exports.YAxisPosition = {}));
exports.YAxisType = void 0;
(function (YAxisType) {
    YAxisType["Normal"] = "normal";
    YAxisType["Percentage"] = "percentage";
    YAxisType["Log"] = "log";
})(exports.YAxisType || (exports.YAxisType = {}));
function getDefaultYAxisStyle() {
    return {
        show: true,
        size: 'auto',
        type: exports.YAxisType.Normal,
        position: exports.YAxisPosition.Right,
        inside: false,
        reverse: false,
        axisLine: {
            show: true,
            color: '#DDDDDD',
            size: 1
        },
        tickText: {
            show: true,
            color: '#76808F',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            marginStart: 4,
            marginEnd: 4
        },
        tickLine: {
            show: true,
            size: 1,
            length: 3,
            color: '#DDDDDD'
        }
    };
}
function getDefaultCrosshairStyle() {
    return {
        show: true,
        horizontal: {
            show: true,
            line: {
                show: true,
                style: exports.LineType.Dashed,
                dashedValue: [4, 2],
                size: 1,
                color: '#76808F'
            },
            text: {
                show: true,
                style: exports.PolygonType.Fill,
                color: '#FFFFFF',
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                borderStyle: exports.LineType.Solid,
                borderDashedValue: [2, 2],
                borderSize: 1,
                borderColor: '#686D76',
                borderRadius: 2,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 4,
                paddingBottom: 4,
                backgroundColor: '#686D76'
            }
        },
        vertical: {
            show: true,
            line: {
                show: true,
                style: exports.LineType.Dashed,
                dashedValue: [4, 2],
                size: 1,
                color: '#76808F'
            },
            text: {
                show: true,
                style: exports.PolygonType.Fill,
                color: '#FFFFFF',
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                borderStyle: exports.LineType.Solid,
                borderDashedValue: [2, 2],
                borderSize: 1,
                borderRadius: 2,
                borderColor: '#686D76',
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 4,
                paddingBottom: 4,
                backgroundColor: '#686D76'
            }
        }
    };
}
function getDefaultOverlayStyle() {
    return {
        point: {
            color: '#1677FF',
            borderColor: 'rgba(22, 119, 255, 0.35)',
            borderSize: 1,
            radius: 5,
            activeColor: '#1677FF',
            activeBorderColor: 'rgba(22, 119, 255, 0.35)',
            activeBorderSize: 3,
            activeRadius: 5
        },
        line: {
            style: exports.LineType.Solid,
            smooth: false,
            color: '#1677FF',
            size: 1,
            dashedValue: [2, 2]
        },
        rect: {
            style: exports.PolygonType.Fill,
            color: 'rgba(22, 119, 255, 0.25)',
            borderColor: '#1677FF',
            borderSize: 1,
            borderRadius: 0,
            borderStyle: exports.LineType.Solid,
            borderDashedValue: [2, 2]
        },
        polygon: {
            style: exports.PolygonType.Fill,
            color: '#1677FF',
            borderColor: '#1677FF',
            borderSize: 1,
            borderStyle: exports.LineType.Solid,
            borderDashedValue: [2, 2]
        },
        circle: {
            style: exports.PolygonType.Fill,
            color: 'rgba(22, 119, 255, 0.25)',
            borderColor: '#1677FF',
            borderSize: 1,
            borderStyle: exports.LineType.Solid,
            borderDashedValue: [2, 2]
        },
        arc: {
            style: exports.LineType.Solid,
            color: '#1677FF',
            size: 1,
            dashedValue: [2, 2]
        },
        text: {
            color: '#1677FF',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal'
        },
        rectText: {
            style: exports.PolygonType.Fill,
            color: '#FFFFFF',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            borderStyle: exports.LineType.Solid,
            borderDashedValue: [2, 2],
            borderSize: 1,
            borderRadius: 2,
            borderColor: '#1677FF',
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4,
            backgroundColor: '#1677FF'
        }
    };
}
function getDefaultSeparatorStyle() {
    return {
        size: 1,
        color: '#DDDDDD',
        fill: true,
        activeBackgroundColor: 'rgba(33, 150, 243, 0.08)'
    };
}
function getDefaultStyles() {
    return {
        grid: getDefaultGridStyle(),
        candle: getDefaultCandleStyle(),
        indicator: getDefaultIndicatorStyle(),
        xAxis: getDefaultXAxisStyle(),
        yAxis: getDefaultYAxisStyle(),
        separator: getDefaultSeparatorStyle(),
        crosshair: getDefaultCrosshairStyle(),
        overlay: getDefaultOverlayStyle()
    };
}
exports.FormatDateType = void 0;
(function (FormatDateType) {
    FormatDateType[FormatDateType["Tooltip"] = 0] = "Tooltip";
    FormatDateType[FormatDateType["Crosshair"] = 1] = "Crosshair";
    FormatDateType[FormatDateType["XAxis"] = 2] = "XAxis";
})(exports.FormatDateType || (exports.FormatDateType = {}));
function getDefaultCustomApi() {
    return {
        formatDate: formatDate,
        formatBigNumber: formatBigNumber
    };
}
var defaultLocale = 'en-US';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.ActionType = void 0;
(function (ActionType) {
    ActionType["OnZoom"] = "onZoom";
    ActionType["OnScroll"] = "onScroll";
    ActionType["OnVisibleRangeChange"] = "onVisibleRangeChange";
    ActionType["OnTooltipIconClick"] = "onTooltipIconClick";
    ActionType["OnCrosshairChange"] = "onCrosshairChange";
    ActionType["OnCandleBarClick"] = "onCandleBarClick";
    ActionType["OnPaneDrag"] = "onPaneDrag";
})(exports.ActionType || (exports.ActionType = {}));
var Delegate = /** @class */ (function () {
    function Delegate() {
        this._callbacks = [];
    }
    Delegate.prototype.subscribe = function (callback) {
        var _a;
        var index = (_a = this._callbacks.indexOf(callback)) !== null && _a !== void 0 ? _a : -1;
        if (index < 0) {
            this._callbacks.push(callback);
        }
    };
    Delegate.prototype.unsubscribe = function (callback) {
        var _a;
        if (callback !== undefined) {
            var index = (_a = this._callbacks.indexOf(callback)) !== null && _a !== void 0 ? _a : -1;
            if (index > -1) {
                this._callbacks.splice(index, 1);
            }
        }
        else {
            this._callbacks = [];
        }
    };
    Delegate.prototype.execute = function (data) {
        this._callbacks.forEach(function (callback) {
            callback(data);
        });
    };
    Delegate.prototype.isEmpty = function () {
        return this._callbacks.length === 0;
    };
    return Delegate;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var baseId = 1;
var prevIdTimestamp = new Date().getTime();
function createId(prefix) {
    var timestamp = new Date().getTime();
    if (timestamp === prevIdTimestamp) {
        ++baseId;
    }
    else {
        baseId = 1;
    }
    prevIdTimestamp = timestamp;
    return "".concat(prefix !== null && prefix !== void 0 ? prefix : '').concat(timestamp, "_").concat(baseId);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Create dom
 * @param tagName
 * @param styles
 * @return {*}
 */
function createDom(tagName, styles) {
    var _a;
    var dom = document.createElement(tagName);
    var s = styles !== null && styles !== void 0 ? styles : {};
    for (var key in s) {
        (dom.style)[key] = (_a = s[key]) !== null && _a !== void 0 ? _a : '';
    }
    return dom;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var measureCtx;
/**
 * Get pixel ratio
 * @param canvas
 * @returns {number}
 */
function getPixelRatio(canvas) {
    var _a, _b, _c;
    return Math.ceil((_c = (_b = (_a = canvas.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b.devicePixelRatio) !== null && _c !== void 0 ? _c : 2);
}
function createFont(size, weight, family) {
    return "".concat(weight !== null && weight !== void 0 ? weight : 'normal', " ").concat(size !== null && size !== void 0 ? size : 12, "px ").concat(family !== null && family !== void 0 ? family : 'Helvetica Neue');
}
/**
 * Measure the width of text
 * @param text
 * @returns {number}
 */
function calcTextWidth(text, size, weight, family) {
    if (measureCtx === undefined) {
        var canvas = document.createElement('canvas');
        var pixelRatio = getPixelRatio(canvas);
        measureCtx = canvas.getContext('2d');
        measureCtx.scale(pixelRatio, pixelRatio);
    }
    measureCtx.font = createFont(size, weight, family);
    return Math.round(measureCtx.measureText(text).width);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @ts-expect-error
function log(templateText, tagStyle, messageStyle, api, invalidParam, append) {
    {
        var apiStr = api !== '' ? "Call api ".concat(api).concat(invalidParam !== '' || append !== '' ? ', ' : '.') : '';
        var invalidParamStr = invalidParam !== '' ? "invalid parameter ".concat(invalidParam).concat(append !== '' ? ', ' : '.') : '';
        var appendStr = append !== '' ? append : '';
        console.log(templateText, tagStyle, messageStyle, apiStr, invalidParamStr, appendStr);
    }
}
function logWarn(api, invalidParam, append) {
    log('%c😑 klinecharts warning%c %s%s%s', 'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#FF9600', 'color:#FF9600', api, invalidParam, append !== null && append !== void 0 ? append : '');
}
function logError(api, invalidParam, append) {
    log('%c😟 klinecharts error%c %s%s%s', 'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#EF5350;', 'color:#EF5350;', api, invalidParam, append !== null && append !== void 0 ? append : '');
}
function logTag() {
    log('%c❤️ Welcome to klinecharts. Version is 9.5.0', 'border-radius:4px;border:dashed 1px #1677FF;line-height:70px;padding:0 20px;margin:16px 0;font-size:14px;color:#1677FF;', '', '', '', '');
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Binary search for the nearest result
 * @param dataList
 * @param valueKey
 * @param targetValue
 * @return {number}
 */
function binarySearchNearest(dataList, valueKey, targetValue) {
    var left = 0;
    var right = 0;
    for (right = dataList.length - 1; left !== right;) {
        var midIndex = Math.floor((right + left) / 2);
        var mid = right - left;
        var midValue = dataList[midIndex][valueKey];
        if (targetValue === dataList[left][valueKey]) {
            return left;
        }
        if (targetValue === dataList[right][valueKey]) {
            return right;
        }
        if (targetValue === midValue) {
            return midIndex;
        }
        if (targetValue > midValue) {
            left = midIndex;
        }
        else {
            right = midIndex;
        }
        if (mid <= 2) {
            break;
        }
    }
    return left;
}
/**
 * 优化数字
 * @param value
 * @return {number|number}
 */
function nice(value) {
    var exponent = Math.floor(log10(value));
    var exp10 = index10(exponent);
    var f = value / exp10; // 1 <= f < 10
    var nf = 0;
    if (f < 1.5) {
        nf = 1;
    }
    else if (f < 2.5) {
        nf = 2;
    }
    else if (f < 3.5) {
        nf = 3;
    }
    else if (f < 4.5) {
        nf = 4;
    }
    else if (f < 5.5) {
        nf = 5;
    }
    else if (f < 6.5) {
        nf = 6;
    }
    else {
        nf = 8;
    }
    value = nf * exp10;
    return exponent >= -20 ? +value.toFixed(exponent < 0 ? -exponent : 0) : value;
}
/**
 * 四舍五入
 * @param value
 * @param precision
 * @return {number}
 */
function round(value, precision) {
    if (precision == null) {
        precision = 10;
    }
    precision = Math.min(Math.max(0, precision), 20);
    var v = (+value).toFixed(precision);
    return +v;
}
/**
 * 获取小数位数
 * @param value
 * @return {number|number}
 */
function getPrecision(value) {
    var str = value.toString();
    var eIndex = str.indexOf('e');
    if (eIndex > 0) {
        var precision = +str.slice(eIndex + 1);
        return precision < 0 ? -precision : 0;
    }
    else {
        var dotIndex = str.indexOf('.');
        return dotIndex < 0 ? 0 : str.length - 1 - dotIndex;
    }
}
function getMaxMin(dataList, maxKey, minKey) {
    var maxMin = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    dataList.forEach(function (data) {
        var _a, _b;
        maxMin[0] = Math.max((_a = data[maxKey]) !== null && _a !== void 0 ? _a : data, maxMin[0]);
        maxMin[1] = Math.min((_b = data[minKey]) !== null && _b !== void 0 ? _b : data, maxMin[1]);
    });
    return maxMin;
}
/**
 * 10为底的对数函数
 * @param value
 * @return {number}
 */
function log10(value) {
    return Math.log(value) / Math.log(10);
}
/**
 * 10的指数函数
 * @param value
 * @return {number}
 */
function index10(value) {
    return Math.pow(10, value);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getDefaultVisibleRange() {
    return { from: 0, to: 0, realFrom: 0, realTo: 0 };
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var BarSpaceLimitContants = {
    MIN: 1,
    MAX: 50,
};
var DEFAULT_BAR_SPACE = 6;
var DEFAULT_OFFSET_RIGHT_DISTANCE = 50;
var TimeScaleStore = /** @class */ (function () {
    function TimeScaleStore(chartStore) {
        /**
         * Time foramt
         */
        this._dateTimeFormat = this._buildDateTimeFormat();
        /**
         * Scale enabled flag
         */
        this._zoomEnabled = true;
        /**
         * Scroll enabled flag
         */
        this._scrollEnabled = true;
        /**
         * Is loding data flag
         */
        this._loading = true;
        /**
         * Load more data callback
         */
        this._loadMoreCallback = null;
        /**
         * Whether there are more flag
         */
        this._more = true;
        /**
         * Total space of drawing area
         */
        this._totalBarSpace = 0;
        /**
         * Space occupied by a single piece of data
         */
        this._barSpace = DEFAULT_BAR_SPACE;
        /**
         * Distance from the last data to the right of the drawing area
         */
        this._offsetRightDistance = DEFAULT_OFFSET_RIGHT_DISTANCE;
        /**
         * The number of bar to the right of the drawing area from the last data when scrolling starts
         */
        this._startScrollOffsetRightBarCount = 0;
        /**
         * Scroll to the leftmost and rightmost visible bar
         */
        this._minVisibleBarCount = {
            left: 2,
            right: 2,
        };
        /**
         * Start and end points of visible area data index
         */
        this._visibleRange = getDefaultVisibleRange();
        this._chartStore = chartStore;
        this._gapBarSpace = this._calcGapBarSpace();
        this._offsetRightBarCount = this._offsetRightDistance / this._barSpace;
    }
    TimeScaleStore.prototype._calcGapBarSpace = function () {
        var rateSpace = Math.floor(this._barSpace * 0.82);
        var floorSpace = Math.floor(this._barSpace);
        var optimalSpace = Math.min(rateSpace, floorSpace - 1);
        // If the optimal space is an odd number halfGapBar will be x.5, which will cause blur fix to fail
        if (optimalSpace % 2 !== 0) {
            optimalSpace -= 1;
        }
        return Math.max(2, optimalSpace);
    };
    /**
     * adjust visible range
     */
    TimeScaleStore.prototype.adjustVisibleRange = function () {
        var _a;
        var dataList = this._chartStore.getDataList();
        var dataCount = dataList.length;
        var barCount = this._totalBarSpace / this._barSpace;
        var maxRightOffsetBarCount = barCount - Math.min(this._minVisibleBarCount.left, dataCount);
        if (this._offsetRightBarCount > maxRightOffsetBarCount) {
            this._offsetRightBarCount = maxRightOffsetBarCount;
        }
        var minRightOffsetBarCount = -dataCount + Math.min(this._minVisibleBarCount.right, dataCount);
        if (this._offsetRightBarCount < minRightOffsetBarCount) {
            this._offsetRightBarCount = minRightOffsetBarCount;
        }
        var to = Math.round(this._offsetRightBarCount + dataCount + 0.5);
        if (to > dataCount) {
            to = dataCount;
        }
        var from = Math.round(to - barCount) - 1;
        if (from < 0) {
            from = 0;
        }
        var realFrom = this._offsetRightBarCount > 0
            ? Math.round(dataCount + this._offsetRightBarCount - barCount) - 1
            : from;
        this._visibleRange = { from: from, to: to, realFrom: realFrom, realTo: to };
        this._chartStore
            .getActionStore()
            .execute(exports.ActionType.OnVisibleRangeChange, this._visibleRange);
        this._chartStore.adjustVisibleDataList();
        // More processing and loading, more loading if there are callback methods and no data is being loaded
        if (from === 0 &&
            this._more &&
            !this._loading &&
            this._loadMoreCallback !== null) {
            this._loading = true;
            var firstData = dataList[0];
            this._loadMoreCallback((_a = firstData === null || firstData === void 0 ? void 0 : firstData.timestamp) !== null && _a !== void 0 ? _a : null);
        }
    };
    TimeScaleStore.prototype.setMore = function (more) {
        this._more = more;
        return this;
    };
    TimeScaleStore.prototype.setLoading = function (loading) {
        this._loading = loading;
        return this;
    };
    TimeScaleStore.prototype.getDateTimeFormat = function () {
        return this._dateTimeFormat;
    };
    TimeScaleStore.prototype._buildDateTimeFormat = function (timezone) {
        var options = {
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        if (timezone !== undefined) {
            options.timeZone = timezone;
        }
        var dateTimeFormat = null;
        try {
            dateTimeFormat = new Intl.DateTimeFormat("en", options);
        }
        catch (e) {
            logWarn("", "", "Timezone is error!!!");
        }
        return dateTimeFormat;
    };
    TimeScaleStore.prototype.setTimezone = function (timezone) {
        var dateTimeFormat = this._buildDateTimeFormat(timezone);
        if (dateTimeFormat !== null) {
            this._dateTimeFormat = dateTimeFormat;
        }
    };
    TimeScaleStore.prototype.getTimezone = function () {
        return this._dateTimeFormat.resolvedOptions().timeZone;
    };
    TimeScaleStore.prototype.getBarSpace = function () {
        return {
            bar: this._barSpace,
            halfBar: this._barSpace / 2,
            gapBar: this._gapBarSpace,
            halfGapBar: this._gapBarSpace / 2,
        };
    };
    TimeScaleStore.prototype.setBarSpace = function (barSpace, adjustBeforeFunc) {
        if (barSpace < BarSpaceLimitContants.MIN ||
            barSpace > BarSpaceLimitContants.MAX ||
            this._barSpace === barSpace) {
            return;
        }
        this._barSpace = barSpace;
        this._gapBarSpace = this._calcGapBarSpace();
        adjustBeforeFunc === null || adjustBeforeFunc === void 0 ? void 0 : adjustBeforeFunc();
        this.adjustVisibleRange();
        this._chartStore.getCrosshairStore().recalculate(true);
        this._chartStore.getChart().adjustPaneViewport(false, true, true, true);
    };
    TimeScaleStore.prototype.setTotalBarSpace = function (totalSpace) {
        if (this._totalBarSpace !== totalSpace) {
            this._totalBarSpace = totalSpace;
            this.adjustVisibleRange();
            this._chartStore.getCrosshairStore().recalculate(true);
        }
        return this;
    };
    TimeScaleStore.prototype.setOffsetRightDistance = function (distance, isUpdate) {
        this._offsetRightDistance = distance;
        this._offsetRightBarCount = distance / this._barSpace;
        if (isUpdate !== null && isUpdate !== void 0 ? isUpdate : false) {
            this.adjustVisibleRange();
            this._chartStore.getCrosshairStore().recalculate(true);
            this._chartStore.getChart().adjustPaneViewport(false, true, true, true);
        }
        return this;
    };
    TimeScaleStore.prototype.resetOffsetRightDistance = function () {
        this.setOffsetRightDistance(this._offsetRightDistance);
    };
    TimeScaleStore.prototype.getInitialOffsetRightDistance = function () {
        return this._offsetRightDistance;
    };
    TimeScaleStore.prototype.getOffsetRightDistance = function () {
        return Math.max(0, this._offsetRightBarCount * this._barSpace);
    };
    TimeScaleStore.prototype.getOffsetRightBarCount = function () {
        return this._offsetRightBarCount;
    };
    TimeScaleStore.prototype.setOffsetRightBarCount = function (barCount) {
        this._offsetRightBarCount = barCount;
        return this;
    };
    TimeScaleStore.prototype.setLeftMinVisibleBarCount = function (barCount) {
        this._minVisibleBarCount.left = barCount;
        return this;
    };
    TimeScaleStore.prototype.setRightMinVisibleBarCount = function (barCount) {
        this._minVisibleBarCount.right = barCount;
        return this;
    };
    TimeScaleStore.prototype.getVisibleRange = function () {
        return this._visibleRange;
    };
    TimeScaleStore.prototype.startScroll = function () {
        this._startScrollOffsetRightBarCount = this._offsetRightBarCount;
    };
    TimeScaleStore.prototype.scroll = function (distance) {
        if (!this._scrollEnabled) {
            return;
        }
        var distanceBarCount = distance / this._barSpace;
        this._chartStore.getActionStore().execute(exports.ActionType.OnScroll);
        this._offsetRightBarCount =
            this._startScrollOffsetRightBarCount - distanceBarCount;
        this.adjustVisibleRange();
        this._chartStore.getCrosshairStore().recalculate(true);
        this._chartStore.getChart().adjustPaneViewport(false, true, true, true);
    };
    TimeScaleStore.prototype.getDataByDataIndex = function (dataIndex) {
        var _a;
        if (dataIndex < 0) {
            return null;
        }
        var dataList = this._chartStore.getDataList();
        var length = dataList.length;
        if (dataIndex >= length) {
            var last = dataList[length - 1];
            var beforeLast = dataList[length - 2];
            var diff = last.timestamp - beforeLast.timestamp;
            var newTimestamp = last.timestamp + diff * (dataIndex - length + 1);
            return {
                timestamp: newTimestamp,
            };
        }
        return (_a = this._chartStore.getDataList()[dataIndex]) !== null && _a !== void 0 ? _a : null;
    };
    TimeScaleStore.prototype.coordinateToFloatIndex = function (x) {
        var dataCount = this._chartStore.getDataList().length;
        var deltaFromRight = (this._totalBarSpace - x) / this._barSpace;
        var index = dataCount + this._offsetRightBarCount - deltaFromRight;
        return Math.round(index * 1000000) / 1000000;
    };
    TimeScaleStore.prototype.dataIndexToTimestamp = function (dataIndex) {
        var _a;
        var data = this.getDataByDataIndex(dataIndex);
        return (_a = data === null || data === void 0 ? void 0 : data.timestamp) !== null && _a !== void 0 ? _a : null;
    };
    TimeScaleStore.prototype.timestampToDataIndex = function (timestamp) {
        var dataList = this._chartStore.getDataList();
        if (dataList.length === 0) {
            return 0;
        }
        var length = dataList.length;
        if (timestamp >= dataList[length - 1].timestamp) {
            var last = dataList[length - 1];
            var beforeLast = dataList[length - 2];
            var diff = last.timestamp - beforeLast.timestamp;
            var width = (timestamp - last.timestamp) / diff;
            return length + Math.floor(width);
        }
        return binarySearchNearest(dataList, "timestamp", timestamp);
    };
    TimeScaleStore.prototype.dataIndexToCoordinate = function (dataIndex) {
        var dataCount = this._chartStore.getDataList().length;
        var deltaFromRight = dataCount + this._offsetRightBarCount - dataIndex;
        return Math.floor(this._totalBarSpace - (deltaFromRight - 0.5) * this._barSpace);
    };
    TimeScaleStore.prototype.coordinateToDataIndex = function (x) {
        return Math.ceil(this.coordinateToFloatIndex(x)) - 1;
    };
    TimeScaleStore.prototype.zoom = function (scale, coordinate) {
        var _this = this;
        var _a;
        if (!this._zoomEnabled) {
            return;
        }
        if ((coordinate === null || coordinate === void 0 ? void 0 : coordinate.x) === undefined) {
            var crosshair = this._chartStore.getCrosshairStore().get();
            coordinate = { x: (_a = crosshair === null || crosshair === void 0 ? void 0 : crosshair.x) !== null && _a !== void 0 ? _a : this._totalBarSpace / 2 };
        }
        this._chartStore.getActionStore().execute(exports.ActionType.OnZoom);
        var floatIndex = this.coordinateToFloatIndex(coordinate.x);
        var barSpace = this._barSpace + scale * (this._barSpace / 10);
        this.setBarSpace(barSpace, function () {
            _this._offsetRightBarCount +=
                floatIndex - _this.coordinateToFloatIndex(coordinate === null || coordinate === void 0 ? void 0 : coordinate.x);
        });
    };
    TimeScaleStore.prototype.setZoomEnabled = function (enabled) {
        this._zoomEnabled = enabled;
        return this;
    };
    TimeScaleStore.prototype.getZoomEnabled = function () {
        return this._zoomEnabled;
    };
    TimeScaleStore.prototype.setScrollEnabled = function (enabled) {
        this._scrollEnabled = enabled;
        return this;
    };
    TimeScaleStore.prototype.getScrollEnabled = function () {
        return this._scrollEnabled;
    };
    TimeScaleStore.prototype.setLoadMoreCallback = function (callback) {
        this._loadMoreCallback = callback;
        return this;
    };
    TimeScaleStore.prototype.clear = function () {
        this._more = true;
        this._loading = true;
        this._visibleRange = getDefaultVisibleRange();
    };
    return TimeScaleStore;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.IndicatorSeries = void 0;
(function (IndicatorSeries) {
    IndicatorSeries["Normal"] = "normal";
    IndicatorSeries["Price"] = "price";
    IndicatorSeries["Volume"] = "volume";
})(exports.IndicatorSeries || (exports.IndicatorSeries = {}));
function eachFigures(kLineDataList, indicator, dataIndex, defaultStyles, eachFigureCallback) {
    var result = indicator.result;
    var figures = indicator.figures;
    var styles = indicator.styles;
    var circleStyles = formatValue(styles, 'circles', defaultStyles.circles);
    var circleStyleCount = circleStyles.length;
    var barStyles = formatValue(styles, 'bars', defaultStyles.bars);
    var barStyleCount = barStyles.length;
    var lineStyles = formatValue(styles, 'lines', defaultStyles.lines);
    var lineStyleCount = lineStyles.length;
    var circleCount = 0;
    var barCount = 0;
    var lineCount = 0;
    var defaultFigureStyles;
    figures.forEach(function (figure) {
        var _a;
        switch (figure.type) {
            case 'circle': {
                var styles_1 = circleStyles[circleCount % circleStyleCount];
                defaultFigureStyles = __assign(__assign({}, styles_1), { color: styles_1.noChangeColor });
                circleCount++;
                break;
            }
            case 'bar': {
                var styles_2 = barStyles[barCount % barStyleCount];
                defaultFigureStyles = __assign(__assign({}, styles_2), { color: styles_2.noChangeColor });
                barCount++;
                break;
            }
            case 'line': {
                defaultFigureStyles = lineStyles[lineCount % lineStyleCount];
                lineCount++;
                break;
            }
        }
        if (isValid(defaultFigureStyles)) {
            var cbData = {
                prev: { kLineData: kLineDataList[dataIndex - 1], indicatorData: result[dataIndex - 1] },
                current: { kLineData: kLineDataList[dataIndex], indicatorData: result[dataIndex] },
                next: { kLineData: kLineDataList[dataIndex + 1], indicatorData: result[dataIndex + 1] }
            };
            var ss = (_a = figure.styles) === null || _a === void 0 ? void 0 : _a.call(figure, cbData, indicator, defaultStyles);
            eachFigureCallback(figure, __assign(__assign({}, defaultFigureStyles), ss));
        }
    });
}
var IndicatorImp = /** @class */ (function () {
    function IndicatorImp(indicator) {
        this.result = [];
        this._precisionFlag = false;
        var name = indicator.name, shortName = indicator.shortName, series = indicator.series, calcParams = indicator.calcParams, figures = indicator.figures, precision = indicator.precision, shouldOhlc = indicator.shouldOhlc, shouldFormatBigNumber = indicator.shouldFormatBigNumber, visible = indicator.visible, minValue = indicator.minValue, maxValue = indicator.maxValue, styles = indicator.styles, extendData = indicator.extendData, regenerateFigures = indicator.regenerateFigures, createTooltipDataSource = indicator.createTooltipDataSource, draw = indicator.draw;
        this.name = name;
        this.shortName = shortName !== null && shortName !== void 0 ? shortName : name;
        this.series = series !== null && series !== void 0 ? series : exports.IndicatorSeries.Normal;
        this.precision = precision !== null && precision !== void 0 ? precision : 4;
        this.calcParams = calcParams !== null && calcParams !== void 0 ? calcParams : [];
        this.figures = figures !== null && figures !== void 0 ? figures : [];
        this.shouldOhlc = shouldOhlc !== null && shouldOhlc !== void 0 ? shouldOhlc : false;
        this.shouldFormatBigNumber = shouldFormatBigNumber !== null && shouldFormatBigNumber !== void 0 ? shouldFormatBigNumber : false;
        this.visible = visible !== null && visible !== void 0 ? visible : true;
        this.minValue = minValue !== null && minValue !== void 0 ? minValue : null;
        this.maxValue = maxValue !== null && maxValue !== void 0 ? maxValue : null;
        this.styles = styles !== null && styles !== void 0 ? styles : null;
        this.extendData = extendData;
        this.regenerateFigures = regenerateFigures !== null && regenerateFigures !== void 0 ? regenerateFigures : null;
        this.createTooltipDataSource = createTooltipDataSource !== null && createTooltipDataSource !== void 0 ? createTooltipDataSource : null;
        this.draw = draw !== null && draw !== void 0 ? draw : null;
    }
    IndicatorImp.prototype.setShortName = function (shortName) {
        if (this.shortName !== shortName) {
            this.shortName = shortName;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setSeries = function (series) {
        if (this.series !== series) {
            this.series = series;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setPrecision = function (precision, flag) {
        var f = flag !== null && flag !== void 0 ? flag : false;
        var optimalPrecision = Math.floor(precision);
        if (optimalPrecision !== this.precision && precision >= 0 && (!f || (f && !this._precisionFlag))) {
            this.precision = optimalPrecision;
            if (!f) {
                this._precisionFlag = true;
            }
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setCalcParams = function (params) {
        var _a, _b;
        this.calcParams = params;
        this.figures = (_b = (_a = this.regenerateFigures) === null || _a === void 0 ? void 0 : _a.call(this, params)) !== null && _b !== void 0 ? _b : this.figures;
        return true;
    };
    IndicatorImp.prototype.setShouldOhlc = function (shouldOhlc) {
        if (this.shouldOhlc !== shouldOhlc) {
            this.shouldOhlc = shouldOhlc;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setShouldFormatBigNumber = function (shouldFormatBigNumber) {
        if (this.shouldFormatBigNumber !== shouldFormatBigNumber) {
            this.shouldFormatBigNumber = shouldFormatBigNumber;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setVisible = function (visible) {
        if (this.visible !== visible) {
            this.visible = visible;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setStyles = function (styles) {
        if (this.styles !== styles) {
            this.styles = styles;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setExtendData = function (extendData) {
        if (this.extendData !== extendData) {
            this.extendData = extendData;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setFigures = function (figures) {
        if (this.figures !== figures) {
            this.figures = figures;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setMinValue = function (value) {
        if (this.minValue !== value) {
            this.minValue = value;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setMaxValue = function (value) {
        if (this.maxValue !== value) {
            this.maxValue = value;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setRegenerateFigures = function (callback) {
        if (this.regenerateFigures !== callback) {
            this.regenerateFigures = callback;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setCreateTooltipDataSource = function (callback) {
        if (this.createTooltipDataSource !== callback) {
            this.createTooltipDataSource = callback;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.setDraw = function (callback) {
        if (this.draw !== callback) {
            this.draw = callback;
            return true;
        }
        return false;
    };
    IndicatorImp.prototype.calcIndicator = function (dataList) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.calc(dataList, this)];
                    case 1:
                        result = _a.sent();
                        this.result = result;
                        return [2 /*return*/, true];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IndicatorImp.extend = function (template) {
        var Custom = /** @class */ (function (_super) {
            __extends(Custom, _super);
            function Custom() {
                return _super.call(this, template) || this;
            }
            Custom.prototype.calc = function (dataList, indicator) {
                return template.calc(dataList, indicator);
            };
            return Custom;
        }(IndicatorImp));
        return Custom;
    };
    return IndicatorImp;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * averager price
 */
var averagePrice = {
    name: 'AVP',
    shortName: 'AVP',
    series: exports.IndicatorSeries.Price,
    precision: 2,
    figures: [
        { key: 'avp', title: 'AVP: ', type: 'line' }
    ],
    calc: function (dataList) {
        var totalTurnover = 0;
        var totalVolume = 0;
        return dataList.map(function (kLineData) {
            var _a, _b;
            var avp = {};
            var turnover = (_a = kLineData === null || kLineData === void 0 ? void 0 : kLineData.turnover) !== null && _a !== void 0 ? _a : 0;
            var volume = (_b = kLineData === null || kLineData === void 0 ? void 0 : kLineData.volume) !== null && _b !== void 0 ? _b : 0;
            totalTurnover += turnover;
            totalVolume += volume;
            if (totalVolume !== 0) {
                avp.avp = totalTurnover / totalVolume;
            }
            return avp;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var awesomeOscillator = {
    name: 'AO',
    shortName: 'AO',
    calcParams: [5, 34],
    figures: [{
            key: 'ao',
            title: 'AO: ',
            type: 'bar',
            baseValue: 0,
            styles: function (data, indicator, defaultStyles) {
                var _a, _b, _c, _d;
                var prev = data.prev, current = data.current;
                var prevAo = (_b = (_a = prev.indicatorData) === null || _a === void 0 ? void 0 : _a.ao) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
                var currentAo = (_d = (_c = current.indicatorData) === null || _c === void 0 ? void 0 : _c.ao) !== null && _d !== void 0 ? _d : Number.MIN_SAFE_INTEGER;
                var color;
                if (currentAo > prevAo) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
                var style = currentAo > prevAo ? exports.PolygonType.Stroke : exports.PolygonType.Fill;
                return { color: color, style: style, borderColor: color };
            }
        }],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var maxPeriod = Math.max(params[0], params[1]);
        var shortSum = 0;
        var longSum = 0;
        var short = 0;
        var long = 0;
        return dataList.map(function (kLineData, i) {
            var ao = {};
            var middle = (kLineData.low + kLineData.high) / 2;
            shortSum += middle;
            longSum += middle;
            if (i >= params[0] - 1) {
                short = shortSum / params[0];
                var agoKLineData = dataList[i - (params[0] - 1)];
                shortSum -= ((agoKLineData.low + agoKLineData.high) / 2);
            }
            if (i >= params[1] - 1) {
                long = longSum / params[1];
                var agoKLineData = dataList[i - (params[1] - 1)];
                longSum -= ((agoKLineData.low + agoKLineData.high) / 2);
            }
            if (i >= maxPeriod - 1) {
                ao.ao = short - long;
            }
            return ao;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * BIAS
 * 乖离率=[(当日收盘价-N日平均价)/N日平均价]*100%
 */
var bias = {
    name: 'BIAS',
    shortName: 'BIAS',
    calcParams: [6, 12, 24],
    figures: [
        { key: 'bias1', title: 'BIAS6: ', type: 'line' },
        { key: 'bias2', title: 'BIAS12: ', type: 'line' },
        { key: 'bias3', title: 'BIAS24: ', type: 'line' }
    ],
    regenerateFigures: function (params) {
        return params.map(function (p, i) {
            return { key: "bias".concat(i + 1), title: "BIAS".concat(p, ": "), type: 'line' };
        });
    },
    calc: function (dataList, indicator) {
        var params = indicator.calcParams, figures = indicator.figures;
        var closeSums = [];
        return dataList.map(function (kLineData, i) {
            var bias = {};
            var close = kLineData.close;
            params.forEach(function (p, index) {
                var _a;
                closeSums[index] = ((_a = closeSums[index]) !== null && _a !== void 0 ? _a : 0) + close;
                if (i >= p - 1) {
                    var mean = closeSums[index] / params[index];
                    bias[figures[index].key] = (close - mean) / mean * 100;
                    closeSums[index] -= dataList[i - (p - 1)].close;
                }
            });
            return bias;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 计算布林指标中的标准差
 * @param dataList
 * @param ma
 * @return {number}
 */
function getBollMd(dataList, ma) {
    var dataSize = dataList.length;
    var sum = 0;
    dataList.forEach(function (data) {
        var closeMa = data.close - ma;
        sum += closeMa * closeMa;
    });
    sum = Math.abs(sum);
    return Math.sqrt(sum / dataSize);
}
/**
 * BOLL
 */
var bollingerBands = {
    name: 'BOLL',
    shortName: 'BOLL',
    series: exports.IndicatorSeries.Price,
    calcParams: [20, 2],
    precision: 2,
    shouldOhlc: true,
    figures: [
        { key: 'up', title: 'UP: ', type: 'line' },
        { key: 'mid', title: 'MID: ', type: 'line' },
        { key: 'dn', title: 'DN: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var p = params[0] - 1;
        var closeSum = 0;
        return dataList.map(function (kLineData, i) {
            var close = kLineData.close;
            var boll = {};
            closeSum += close;
            if (i >= p) {
                boll.mid = closeSum / params[0];
                var md = getBollMd(dataList.slice(i - p, i + 1), boll.mid);
                boll.up = boll.mid + params[1] * md;
                boll.dn = boll.mid - params[1] * md;
                closeSum -= dataList[i - p].close;
            }
            return boll;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * BRAR
 * 默认参数是26。
 * 公式N日BR=N日内（H－CY）之和除以N日内（CY－L）之和*100，
 * 其中，H为当日最高价，L为当日最低价，CY为前一交易日的收盘价，N为设定的时间参数。
 * N日AR=(N日内（H－O）之和除以N日内（O－L）之和)*100，
 * 其中，H为当日最高价，L为当日最低价，O为当日开盘价，N为设定的时间参数
 *
 */
var brar = {
    name: 'BRAR',
    shortName: 'BRAR',
    calcParams: [26],
    figures: [
        { key: 'br', title: 'BR: ', type: 'line' },
        { key: 'ar', title: 'AR: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var hcy = 0;
        var cyl = 0;
        var ho = 0;
        var ol = 0;
        return dataList.map(function (kLineData, i) {
            var _a, _b;
            var brar = {};
            var high = kLineData.high;
            var low = kLineData.low;
            var open = kLineData.open;
            var prevClose = ((_a = dataList[i - 1]) !== null && _a !== void 0 ? _a : kLineData).close;
            ho += (high - open);
            ol += (open - low);
            hcy += (high - prevClose);
            cyl += (prevClose - low);
            if (i >= params[0] - 1) {
                if (ol !== 0) {
                    brar.ar = ho / ol * 100;
                }
                else {
                    brar.ar = 0;
                }
                if (cyl !== 0) {
                    brar.br = hcy / cyl * 100;
                }
                else {
                    brar.br = 0;
                }
                var agoKLineData = dataList[i - (params[0] - 1)];
                var agoHigh = agoKLineData.high;
                var agoLow = agoKLineData.low;
                var agoOpen = agoKLineData.open;
                var agoPreClose = ((_b = dataList[i - params[0]]) !== null && _b !== void 0 ? _b : dataList[i - (params[0] - 1)]).close;
                hcy -= (agoHigh - agoPreClose);
                cyl -= (agoPreClose - agoLow);
                ho -= (agoHigh - agoOpen);
                ol -= (agoOpen - agoLow);
            }
            return brar;
        });
    }
};

/**
 * 多空指标
 * 公式: BBI = (MA(CLOSE, M) + MA(CLOSE, N) + MA(CLOSE, O) + MA(CLOSE, P)) / 4
 *
 */
var bullAndBearIndex = {
    name: 'BBI',
    shortName: 'BBI',
    series: exports.IndicatorSeries.Price,
    precision: 2,
    calcParams: [3, 6, 12, 24],
    shouldOhlc: true,
    figures: [
        { key: 'bbi', title: 'BBI: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var maxPeriod = Math.max.apply(Math, __spreadArray([], __read(params), false));
        var closeSums = [];
        var mas = [];
        return dataList.map(function (kLineData, i) {
            var bbi = {};
            var close = kLineData.close;
            params.forEach(function (p, index) {
                var _a;
                closeSums[index] = ((_a = closeSums[index]) !== null && _a !== void 0 ? _a : 0) + close;
                if (i >= p - 1) {
                    mas[index] = closeSums[index] / p;
                    closeSums[index] -= dataList[i - (p - 1)].close;
                }
            });
            if (i >= maxPeriod - 1) {
                var maSum_1 = 0;
                mas.forEach(function (ma) {
                    maSum_1 += ma;
                });
                bbi.bbi = maSum_1 / 4;
            }
            return bbi;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * CCI
 * CCI（N日）=（TP－MA）÷MD÷0.015
 * 其中，TP=（最高价+最低价+收盘价）÷3
 * MA=近N日TP价的累计之和÷N
 * MD=近N日TP - 当前MA绝对值的累计之和÷N
 *
 */
var commodityChannelIndex = {
    name: 'CCI',
    shortName: 'CCI',
    calcParams: [20],
    figures: [
        { key: 'cci', title: 'CCI: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var p = params[0] - 1;
        var tpSum = 0;
        var tpList = [];
        return dataList.map(function (kLineData, i) {
            var cci = {};
            var tp = (kLineData.high + kLineData.low + kLineData.close) / 3;
            tpSum += tp;
            tpList.push(tp);
            if (i >= p) {
                var maTp_1 = tpSum / params[0];
                var sliceTpList = tpList.slice(i - p, i + 1);
                var sum_1 = 0;
                sliceTpList.forEach(function (tp) {
                    sum_1 += Math.abs(tp - maTp_1);
                });
                var md = sum_1 / params[0];
                cci.cci = md !== 0 ? (tp - maTp_1) / md / 0.015 : 0;
                var agoTp = (dataList[i - p].high + dataList[i - p].low + dataList[i - p].close) / 3;
                tpSum -= agoTp;
            }
            return cci;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http:*www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * MID:=REF(HIGH+LOW,1)/2;
 * CR:SUM(MAX(0,HIGH-MID),N)/SUM(MAX(0,MID-LOW),N)*100;
 * MA1:REF(MA(CR,M1),M1/2.5+1);
 * MA2:REF(MA(CR,M2),M2/2.5+1);
 * MA3:REF(MA(CR,M3),M3/2.5+1);
 * MA4:REF(MA(CR,M4),M4/2.5+1);
 * MID赋值:(昨日最高价+昨日最低价)/2
 * 输出带状能量线:0和最高价-MID的较大值的N日累和/0和MID-最低价的较大值的N日累和*100
 * 输出MA1:M1(5)/2.5+1日前的CR的M1(5)日简单移动平均
 * 输出MA2:M2(10)/2.5+1日前的CR的M2(10)日简单移动平均
 * 输出MA3:M3(20)/2.5+1日前的CR的M3(20)日简单移动平均
 * 输出MA4:M4/2.5+1日前的CR的M4日简单移动平均
 *
 */
var currentRatio = {
    name: 'CR',
    shortName: 'CR',
    calcParams: [26, 10, 20, 40, 60],
    figures: [
        { key: 'cr', title: 'CR: ', type: 'line' },
        { key: 'ma1', title: 'MA1: ', type: 'line' },
        { key: 'ma2', title: 'MA2: ', type: 'line' },
        { key: 'ma3', title: 'MA3: ', type: 'line' },
        { key: 'ma4', title: 'MA4: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var ma1ForwardPeriod = Math.ceil(params[1] / 2.5 + 1);
        var ma2ForwardPeriod = Math.ceil(params[2] / 2.5 + 1);
        var ma3ForwardPeriod = Math.ceil(params[3] / 2.5 + 1);
        var ma4ForwardPeriod = Math.ceil(params[4] / 2.5 + 1);
        var ma1Sum = 0;
        var ma1List = [];
        var ma2Sum = 0;
        var ma2List = [];
        var ma3Sum = 0;
        var ma3List = [];
        var ma4Sum = 0;
        var ma4List = [];
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a, _b, _c, _d, _e;
            var cr = {};
            var prevData = (_a = dataList[i - 1]) !== null && _a !== void 0 ? _a : kLineData;
            var prevMid = (prevData.high + prevData.close + prevData.low + prevData.open) / 4;
            var highSubPreMid = Math.max(0, kLineData.high - prevMid);
            var preMidSubLow = Math.max(0, prevMid - kLineData.low);
            if (i >= params[0] - 1) {
                if (preMidSubLow !== 0) {
                    cr.cr = highSubPreMid / preMidSubLow * 100;
                }
                else {
                    cr.cr = 0;
                }
                ma1Sum += cr.cr;
                ma2Sum += cr.cr;
                ma3Sum += cr.cr;
                ma4Sum += cr.cr;
                if (i >= params[0] + params[1] - 2) {
                    ma1List.push(ma1Sum / params[1]);
                    if (i >= params[0] + params[1] + ma1ForwardPeriod - 3) {
                        cr.ma1 = ma1List[ma1List.length - 1 - ma1ForwardPeriod];
                    }
                    ma1Sum -= ((_b = result[i - (params[1] - 1)].cr) !== null && _b !== void 0 ? _b : 0);
                }
                if (i >= params[0] + params[2] - 2) {
                    ma2List.push(ma2Sum / params[2]);
                    if (i >= params[0] + params[2] + ma2ForwardPeriod - 3) {
                        cr.ma2 = ma2List[ma2List.length - 1 - ma2ForwardPeriod];
                    }
                    ma2Sum -= ((_c = result[i - (params[2] - 1)].cr) !== null && _c !== void 0 ? _c : 0);
                }
                if (i >= params[0] + params[3] - 2) {
                    ma3List.push(ma3Sum / params[3]);
                    if (i >= params[0] + params[3] + ma3ForwardPeriod - 3) {
                        cr.ma3 = ma3List[ma3List.length - 1 - ma3ForwardPeriod];
                    }
                    ma3Sum -= ((_d = result[i - (params[3] - 1)].cr) !== null && _d !== void 0 ? _d : 0);
                }
                if (i >= params[0] + params[4] - 2) {
                    ma4List.push(ma4Sum / params[4]);
                    if (i >= params[0] + params[4] + ma4ForwardPeriod - 3) {
                        cr.ma4 = ma4List[ma4List.length - 1 - ma4ForwardPeriod];
                    }
                    ma4Sum -= ((_e = result[i - (params[4] - 1)].cr) !== null && _e !== void 0 ? _e : 0);
                }
            }
            result.push(cr);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DMA
 * 公式：DIF:MA(CLOSE,N1)-MA(CLOSE,N2);DIFMA:MA(DIF,M)
 */
var differentOfMovingAverage = {
    name: 'DMA',
    shortName: 'DMA',
    calcParams: [10, 50, 10],
    figures: [
        { key: 'dma', title: 'DMA: ', type: 'line' },
        { key: 'ama', title: 'AMA: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var maxPeriod = Math.max(params[0], params[1]);
        var closeSum1 = 0;
        var closeSum2 = 0;
        var dmaSum = 0;
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a;
            var dma = {};
            var close = kLineData.close;
            closeSum1 += close;
            closeSum2 += close;
            var ma1 = 0;
            var ma2 = 0;
            if (i >= params[0] - 1) {
                ma1 = closeSum1 / params[0];
                closeSum1 -= dataList[i - (params[0] - 1)].close;
            }
            if (i >= params[1] - 1) {
                ma2 = closeSum2 / params[1];
                closeSum2 -= dataList[i - (params[1] - 1)].close;
            }
            if (i >= maxPeriod - 1) {
                var dif = ma1 - ma2;
                dma.dma = dif;
                dmaSum += dif;
                if (i >= maxPeriod + params[2] - 2) {
                    dma.ama = dmaSum / params[2];
                    dmaSum -= ((_a = result[i - (params[2] - 1)].dma) !== null && _a !== void 0 ? _a : 0);
                }
            }
            result.push(dma);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DMI
 *
 * MTR:=EXPMEMA(MAX(MAX(HIGH-LOW,ABS(HIGH-REF(CLOSE,1))),ABS(REF(CLOSE,1)-LOW)),N)
 * HD :=HIGH-REF(HIGH,1);
 * LD :=REF(LOW,1)-LOW;
 * DMP:=EXPMEMA(IF(HD>0&&HD>LD,HD,0),N);
 * DMM:=EXPMEMA(IF(LD>0&&LD>HD,LD,0),N);
 *
 * PDI: DMP*100/MTR;
 * MDI: DMM*100/MTR;
 * ADX: EXPMEMA(ABS(MDI-PDI)/(MDI+PDI)*100,MM);
 * ADXR:EXPMEMA(ADX,MM);
 * 公式含义：
 * MTR赋值:最高价-最低价和最高价-昨收的绝对值的较大值和昨收-最低价的绝对值的较大值的N日指数平滑移动平均
 * HD赋值:最高价-昨日最高价
 * LD赋值:昨日最低价-最低价
 * DMP赋值:如果HD>0并且HD>LD,返回HD,否则返回0的N日指数平滑移动平均
 * DMM赋值:如果LD>0并且LD>HD,返回LD,否则返回0的N日指数平滑移动平均
 * 输出PDI:DMP*100/MTR
 * 输出MDI:DMM*100/MTR
 * 输出ADX:MDI-PDI的绝对值/(MDI+PDI)*100的MM日指数平滑移动平均
 * 输出ADXR:ADX的MM日指数平滑移动平均
 *
 */
var directionalMovementIndex = {
    name: 'DMI',
    shortName: 'DMI',
    calcParams: [14, 6],
    figures: [
        { key: 'pdi', title: 'PDI: ', type: 'line' },
        { key: 'mdi', title: 'MDI: ', type: 'line' },
        { key: 'adx', title: 'ADX: ', type: 'line' },
        { key: 'adxr', title: 'ADXR: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var trSum = 0;
        var hSum = 0;
        var lSum = 0;
        var mtr = 0;
        var dmp = 0;
        var dmm = 0;
        var dxSum = 0;
        var adx = 0;
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a, _b;
            var dmi = {};
            var prevKLineData = (_a = dataList[i - 1]) !== null && _a !== void 0 ? _a : kLineData;
            var preClose = prevKLineData.close;
            var high = kLineData.high;
            var low = kLineData.low;
            var hl = high - low;
            var hcy = Math.abs(high - preClose);
            var lcy = Math.abs(preClose - low);
            var hhy = high - prevKLineData.high;
            var lyl = prevKLineData.low - low;
            var tr = Math.max(Math.max(hl, hcy), lcy);
            var h = (hhy > 0 && hhy > lyl) ? hhy : 0;
            var l = (lyl > 0 && lyl > hhy) ? lyl : 0;
            trSum += tr;
            hSum += h;
            lSum += l;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    mtr = mtr - mtr / params[0] + tr;
                    dmp = dmp - dmp / params[0] + h;
                    dmm = dmm - dmm / params[0] + l;
                }
                else {
                    mtr = trSum;
                    dmp = hSum;
                    dmm = lSum;
                }
                var pdi = 0;
                var mdi = 0;
                if (mtr !== 0) {
                    pdi = dmp * 100 / mtr;
                    mdi = dmm * 100 / mtr;
                }
                dmi.pdi = pdi;
                dmi.mdi = mdi;
                var dx = 0;
                if (mdi + pdi !== 0) {
                    dx = Math.abs((mdi - pdi)) / (mdi + pdi) * 100;
                }
                dxSum += dx;
                if (i >= params[0] * 2 - 2) {
                    if (i > params[0] * 2 - 2) {
                        adx = (adx * (params[0] - 1) + dx) / params[0];
                    }
                    else {
                        adx = dxSum / params[0];
                    }
                    dmi.adx = adx;
                    if (i >= params[0] * 2 + params[1] - 3) {
                        dmi.adxr = (((_b = result[i - (params[1] - 1)].adx) !== null && _b !== void 0 ? _b : 0) + adx) / 2;
                    }
                }
            }
            result.push(dmi);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *
 * EMV 简易波动指标
 * 公式：
 * A=（今日最高+今日最低）/2
 * B=（前日最高+前日最低）/2
 * C=今日最高-今日最低
 * EM=（A-B）*C/今日成交额
 * EMV=N日内EM的累和
 * MAEMV=EMV的M日的简单移动平均
 *
 */
var easeOfMovementValue = {
    name: 'EMV',
    shortName: 'EMV',
    calcParams: [14, 9],
    figures: [
        { key: 'emv', title: 'EMV: ', type: 'line' },
        { key: 'maEmv', title: 'MAEMV: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var emvValueSum = 0;
        var emvValueList = [];
        return dataList.map(function (kLineData, i) {
            var _a;
            var emv = {};
            if (i > 0) {
                var prevKLineData = dataList[i - 1];
                var high = kLineData.high;
                var low = kLineData.low;
                var volume = (_a = kLineData.volume) !== null && _a !== void 0 ? _a : 0;
                var distanceMoved = (high + low) / 2 - (prevKLineData.high + prevKLineData.low) / 2;
                if (volume === 0 || high - low === 0) {
                    emv.emv = 0;
                }
                else {
                    var ratio = volume / 100000000 / (high - low);
                    emv.emv = distanceMoved / ratio;
                }
                emvValueSum += emv.emv;
                emvValueList.push(emv.emv);
                if (i >= params[0]) {
                    emv.maEmv = emvValueSum / params[0];
                    emvValueSum -= emvValueList[i - params[0]];
                }
            }
            return emv;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * EMA 指数移动平均
 */
var exponentialMovingAverage = {
    name: 'EMA',
    shortName: 'EMA',
    series: exports.IndicatorSeries.Price,
    calcParams: [6, 12, 20],
    precision: 2,
    shouldOhlc: true,
    figures: [
        { key: 'ema1', title: 'EMA6: ', type: 'line' },
        { key: 'ema2', title: 'EMA12: ', type: 'line' },
        { key: 'ema3', title: 'EMA20: ', type: 'line' }
    ],
    regenerateFigures: function (params) {
        return params.map(function (p, i) {
            return { key: "ema".concat(i + 1), title: "EMA".concat(p, ": "), type: 'line' };
        });
    },
    calc: function (dataList, indicator) {
        var params = indicator.calcParams, figures = indicator.figures;
        var closeSum = 0;
        var emaValues = [];
        return dataList.map(function (kLineData, i) {
            var ema = {};
            var close = kLineData.close;
            closeSum += close;
            params.forEach(function (p, index) {
                if (i >= p - 1) {
                    if (i > p - 1) {
                        emaValues[index] = (2 * close + (p - 1) * emaValues[index]) / (p + 1);
                    }
                    else {
                        emaValues[index] = closeSum / p;
                    }
                    ema[figures[index].key] = emaValues[index];
                }
            });
            return ema;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * mtm
 * 公式 MTM（N日）=C－CN
 */
var momentum = {
    name: 'MTM',
    shortName: 'MTM',
    calcParams: [12, 6],
    figures: [
        { key: 'mtm', title: 'MTM: ', type: 'line' },
        { key: 'maMtm', title: 'MAMTM: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var mtmSum = 0;
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a;
            var mtm = {};
            if (i >= params[0]) {
                var close_1 = kLineData.close;
                var agoClose = dataList[i - params[0]].close;
                mtm.mtm = close_1 - agoClose;
                mtmSum += mtm.mtm;
                if (i >= params[0] + params[1] - 1) {
                    mtm.maMtm = mtmSum / params[1];
                    mtmSum -= ((_a = result[i - (params[1] - 1)].mtm) !== null && _a !== void 0 ? _a : 0);
                }
            }
            result.push(mtm);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * MA 移动平均
 */
var movingAverage = {
    name: 'MA',
    shortName: 'MA',
    series: exports.IndicatorSeries.Price,
    calcParams: [5, 10, 30, 60],
    precision: 2,
    shouldOhlc: true,
    figures: [
        { key: 'ma5', title: 'MA5: ', type: 'line' },
        { key: 'ma10', title: 'MA10: ', type: 'line' },
        { key: 'ma30', title: 'MA30: ', type: 'line' },
        { key: 'ma60', title: 'MA60: ', type: 'line' }
    ],
    regenerateFigures: function (params) {
        return params.map(function (p, i) {
            return { key: "ma".concat(i + 1), title: "MA".concat(p, ": "), type: 'line' };
        });
    },
    calc: function (dataList, indicator) {
        var params = indicator.calcParams, figures = indicator.figures;
        var closeSums = [];
        return dataList.map(function (kLineData, i) {
            var ma = {};
            var close = kLineData.close;
            params.forEach(function (p, index) {
                var _a;
                closeSums[index] = ((_a = closeSums[index]) !== null && _a !== void 0 ? _a : 0) + close;
                if (i >= p - 1) {
                    ma[figures[index].key] = closeSums[index] / p;
                    closeSums[index] -= dataList[i - (p - 1)].close;
                }
            });
            return ma;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * MACD：参数快线移动平均、慢线移动平均、移动平均，
 * 默认参数值12、26、9。
 * 公式：⒈首先分别计算出收盘价12日指数平滑移动平均线与26日指数平滑移动平均线，分别记为EMA(12）与EMA(26）。
 * ⒉求这两条指数平滑移动平均线的差，即：DIFF = EMA(SHORT) － EMA(LONG)。
 * ⒊再计算DIFF的M日的平均的指数平滑移动平均线，记为DEA。
 * ⒋最后用DIFF减DEA，得MACD。MACD通常绘制成围绕零轴线波动的柱形图。MACD柱状大于0涨颜色，小于0跌颜色。
 */
var movingAverageConvergenceDivergence = {
    name: 'MACD',
    shortName: 'MACD',
    calcParams: [12, 26, 9],
    figures: [
        { key: 'dif', title: 'DIF: ', type: 'line' },
        { key: 'dea', title: 'DEA: ', type: 'line' },
        {
            key: 'macd',
            title: 'MACD: ',
            type: 'bar',
            baseValue: 0,
            styles: function (data, indicator, defaultStyles) {
                var _a, _b, _c, _d;
                var prev = data.prev, current = data.current;
                var prevMacd = (_b = (_a = prev.indicatorData) === null || _a === void 0 ? void 0 : _a.macd) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
                var currentMacd = (_d = (_c = current.indicatorData) === null || _c === void 0 ? void 0 : _c.macd) !== null && _d !== void 0 ? _d : Number.MIN_SAFE_INTEGER;
                var color;
                if (currentMacd > 0) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else if (currentMacd < 0) {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
                else {
                    color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles.bars)[0].noChangeColor);
                }
                var style = prevMacd < currentMacd ? exports.PolygonType.Stroke : exports.PolygonType.Fill;
                return { style: style, color: color, borderColor: color };
            }
        }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var closeSum = 0;
        var emaShort;
        var emaLong;
        var dif = 0;
        var difSum = 0;
        var dea = 0;
        var maxPeriod = Math.max(params[0], params[1]);
        return dataList.map(function (kLineData, i) {
            var macd = {};
            var close = kLineData.close;
            closeSum += close;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    emaShort = (2 * close + (params[0] - 1) * emaShort) / (params[0] + 1);
                }
                else {
                    emaShort = closeSum / params[0];
                }
            }
            if (i >= params[1] - 1) {
                if (i > params[1] - 1) {
                    emaLong = (2 * close + (params[1] - 1) * emaLong) / (params[1] + 1);
                }
                else {
                    emaLong = closeSum / params[1];
                }
            }
            if (i >= maxPeriod - 1) {
                dif = emaShort - emaLong;
                macd.dif = dif;
                difSum += dif;
                if (i >= maxPeriod + params[2] - 2) {
                    if (i > maxPeriod + params[2] - 2) {
                        dea = (dif * 2 + dea * (params[2] - 1)) / (params[2] + 1);
                    }
                    else {
                        dea = difSum / params[2];
                    }
                    macd.macd = (dif - dea) * 2;
                    macd.dea = dea;
                }
            }
            return macd;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * OBV
 * OBV = REF(OBV) + sign * V
 */
var onBalanceVolume = {
    name: 'OBV',
    shortName: 'OBV',
    calcParams: [30],
    figures: [
        { key: 'obv', title: 'OBV: ', type: 'line' },
        { key: 'maObv', title: 'MAOBV: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var obvSum = 0;
        var oldObv = 0;
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a, _b, _c, _d;
            var prevKLineData = (_a = dataList[i - 1]) !== null && _a !== void 0 ? _a : kLineData;
            if (kLineData.close < prevKLineData.close) {
                oldObv -= ((_b = kLineData.volume) !== null && _b !== void 0 ? _b : 0);
            }
            else if (kLineData.close > prevKLineData.close) {
                oldObv += ((_c = kLineData.volume) !== null && _c !== void 0 ? _c : 0);
            }
            var obv = { obv: oldObv };
            obvSum += oldObv;
            if (i >= params[0] - 1) {
                obv.maObv = obvSum / params[0];
                obvSum -= ((_d = result[i - (params[0] - 1)].obv) !== null && _d !== void 0 ? _d : 0);
            }
            result.push(obv);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 价量趋势指标
 * 公式:
 * X = (CLOSE - REF(CLOSE, 1)) / REF(CLOSE, 1) * VOLUME
 * PVT = SUM(X)
 *
 */
var priceAndVolumeTrend = {
    name: 'PVT',
    shortName: 'PVT',
    figures: [
        { key: 'pvt', title: 'PVT: ', type: 'line' }
    ],
    calc: function (dataList) {
        var sum = 0;
        return dataList.map(function (kLineData, i) {
            var _a, _b;
            var pvt = {};
            var close = kLineData.close;
            var volume = (_a = kLineData.volume) !== null && _a !== void 0 ? _a : 1;
            var prevClose = ((_b = dataList[i - 1]) !== null && _b !== void 0 ? _b : kLineData).close;
            var x = 0;
            var total = prevClose * volume;
            if (total !== 0) {
                x = (close - prevClose) / total;
            }
            sum += x;
            pvt.pvt = sum;
            return pvt;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * PSY
 * 公式：PSY=N日内的上涨天数/N×100%。
 */
var psychologicalLine = {
    name: 'PSY',
    shortName: 'PSY',
    calcParams: [12, 6],
    figures: [
        { key: 'psy', title: 'PSY: ', type: 'line' },
        { key: 'maPsy', title: 'MAPSY: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var upCount = 0;
        var psySum = 0;
        var upList = [];
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a, _b;
            var psy = {};
            var prevClose = ((_a = dataList[i - 1]) !== null && _a !== void 0 ? _a : kLineData).close;
            var upFlag = kLineData.close - prevClose > 0 ? 1 : 0;
            upList.push(upFlag);
            upCount += upFlag;
            if (i >= params[0] - 1) {
                psy.psy = upCount / params[0] * 100;
                psySum += psy.psy;
                if (i >= params[0] + params[1] - 2) {
                    psy.maPsy = psySum / params[1];
                    psySum -= ((_b = result[i - (params[1] - 1)].psy) !== null && _b !== void 0 ? _b : 0);
                }
                upCount -= upList[i - (params[0] - 1)];
            }
            result.push(psy);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 变动率指标
 * 公式：ROC = (CLOSE - REF(CLOSE, N)) / REF(CLOSE, N)
 */
var rateOfChange = {
    name: 'ROC',
    shortName: 'ROC',
    calcParams: [12, 6],
    figures: [
        { key: 'roc', title: 'ROC: ', type: 'line' },
        { key: 'maRoc', title: 'MAROC: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var result = [];
        var rocSum = 0;
        dataList.forEach(function (kLineData, i) {
            var _a, _b;
            var roc = {};
            if (i >= params[0] - 1) {
                var close_1 = kLineData.close;
                var agoClose = ((_a = dataList[i - params[0]]) !== null && _a !== void 0 ? _a : dataList[i - (params[0] - 1)]).close;
                if (agoClose !== 0) {
                    roc.roc = (close_1 - agoClose) / agoClose * 100;
                }
                else {
                    roc.roc = 0;
                }
                rocSum += roc.roc;
                if (i >= params[0] - 1 + params[1] - 1) {
                    roc.maRoc = rocSum / params[1];
                    rocSum -= ((_b = result[i - (params[1] - 1)].roc) !== null && _b !== void 0 ? _b : 0);
                }
            }
            result.push(roc);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
var relativeStrengthIndex = {
    name: 'RSI',
    shortName: 'RSI',
    calcParams: [6, 12, 24],
    figures: [
        { key: 'rsi1', title: 'RSI1: ', type: 'line' },
        { key: 'rsi2', title: 'RSI2: ', type: 'line' },
        { key: 'rsi3', title: 'RSI3: ', type: 'line' }
    ],
    regenerateFigures: function (params) {
        return params.map(function (_, index) {
            var num = index + 1;
            return { key: "rsi".concat(num), title: "RSI".concat(num, ": "), type: 'line' };
        });
    },
    calc: function (dataList, indicator) {
        var params = indicator.calcParams, figures = indicator.figures;
        var sumCloseAs = [];
        var sumCloseBs = [];
        return dataList.map(function (kLineData, i) {
            var _a;
            var rsi = {};
            var prevClose = ((_a = dataList[i - 1]) !== null && _a !== void 0 ? _a : kLineData).close;
            var tmp = kLineData.close - prevClose;
            params.forEach(function (p, index) {
                var _a, _b, _c;
                if (tmp > 0) {
                    sumCloseAs[index] = ((_a = sumCloseAs[index]) !== null && _a !== void 0 ? _a : 0) + tmp;
                }
                else {
                    sumCloseBs[index] = ((_b = sumCloseBs[index]) !== null && _b !== void 0 ? _b : 0) + Math.abs(tmp);
                }
                if (i >= p - 1) {
                    if (sumCloseBs[index] !== 0) {
                        rsi[figures[index].key] = 100 - (100.0 / (1 + sumCloseAs[index] / sumCloseBs[index]));
                    }
                    else {
                        rsi[figures[index].key] = 0;
                    }
                    var agoData = dataList[i - (p - 1)];
                    var agoPreData = (_c = dataList[i - p]) !== null && _c !== void 0 ? _c : agoData;
                    var agoTmp = agoData.close - agoPreData.close;
                    if (agoTmp > 0) {
                        sumCloseAs[index] -= agoTmp;
                    }
                    else {
                        sumCloseBs[index] -= Math.abs(agoTmp);
                    }
                }
            });
            return rsi;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * sma
 */
var simpleMovingAverage = {
    name: 'SMA',
    shortName: 'SMA',
    series: exports.IndicatorSeries.Price,
    calcParams: [12, 2],
    precision: 2,
    figures: [
        { key: 'sma', title: 'SMA: ', type: 'line' }
    ],
    shouldOhlc: true,
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var closeSum = 0;
        var smaValue = 0;
        return dataList.map(function (kLineData, i) {
            var sma = {};
            var close = kLineData.close;
            closeSum += close;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    smaValue = (close * params[1] + smaValue * (params[0] - params[1] + 1)) / (params[0] + 1);
                }
                else {
                    smaValue = closeSum / params[0];
                }
                sma.sma = smaValue;
            }
            return sma;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * KDJ
 *
 * 当日K值=2/3×前一日K值+1/3×当日RSV
 * 当日D值=2/3×前一日D值+1/3×当日K值
 * 若无前一日K 值与D值，则可分别用50来代替。
 * J值=3*当日K值-2*当日D值
 */
var stoch = {
    name: 'KDJ',
    shortName: 'KDJ',
    calcParams: [9, 3, 3],
    figures: [
        { key: 'k', title: 'K: ', type: 'line' },
        { key: 'd', title: 'D: ', type: 'line' },
        { key: 'j', title: 'J: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a, _b, _c, _d;
            var kdj = {};
            var close = kLineData.close;
            if (i >= params[0] - 1) {
                var lhn = getMaxMin(dataList.slice(i - (params[0] - 1), i + 1), 'high', 'low');
                var hn = lhn[0];
                var ln = lhn[1];
                var hnSubLn = hn - ln;
                var rsv = (close - ln) / (hnSubLn === 0 ? 1 : hnSubLn) * 100;
                kdj.k = ((params[1] - 1) * ((_b = (_a = result[i - 1]) === null || _a === void 0 ? void 0 : _a.k) !== null && _b !== void 0 ? _b : 50) + rsv) / params[1];
                kdj.d = ((params[2] - 1) * ((_d = (_c = result[i - 1]) === null || _c === void 0 ? void 0 : _c.d) !== null && _d !== void 0 ? _d : 50) + kdj.k) / params[2];
                kdj.j = 3.0 * kdj.k - 2.0 * kdj.d;
            }
            result.push(kdj);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stopAndReverse = {
    name: 'SAR',
    shortName: 'SAR',
    series: exports.IndicatorSeries.Price,
    calcParams: [2, 2, 20],
    precision: 2,
    shouldOhlc: true,
    figures: [
        {
            key: 'sar',
            title: 'SAR: ',
            type: 'circle',
            styles: function (data, indicator, defaultStyles) {
                var _a, _b;
                var current = data.current;
                var sar = (_b = (_a = current.indicatorData) === null || _a === void 0 ? void 0 : _a.sar) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
                var kLineData = current.kLineData;
                var halfHL = ((kLineData === null || kLineData === void 0 ? void 0 : kLineData.high) + (kLineData === null || kLineData === void 0 ? void 0 : kLineData.low)) / 2;
                var color = sar < halfHL
                    ? formatValue(indicator.styles, 'circles[0].upColor', (defaultStyles.circles)[0].upColor)
                    : formatValue(indicator.styles, 'circles[0].downColor', (defaultStyles.circles)[0].downColor);
                return { color: color };
            }
        }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var startAf = params[0] / 100;
        var step = params[1] / 100;
        var maxAf = params[2] / 100;
        // 加速因子
        var af = startAf;
        // 极值
        var ep = -100;
        // 判断是上涨还是下跌  false：下跌
        var isIncreasing = false;
        var sar = 0;
        return dataList.map(function (kLineData, i) {
            // 上一个周期的sar
            var preSar = sar;
            var high = kLineData.high;
            var low = kLineData.low;
            if (isIncreasing) {
                // 上涨
                if (ep === -100 || ep < high) {
                    // 重新初始化值
                    ep = high;
                    af = Math.min(af + step, maxAf);
                }
                sar = preSar + af * (ep - preSar);
                var lowMin = Math.min(dataList[Math.max(1, i) - 1].low, low);
                if (sar > kLineData.low) {
                    sar = ep;
                    // 重新初始化值
                    af = startAf;
                    ep = -100;
                    isIncreasing = !isIncreasing;
                }
                else if (sar > lowMin) {
                    sar = lowMin;
                }
            }
            else {
                if (ep === -100 || ep > low) {
                    // 重新初始化值
                    ep = low;
                    af = Math.min(af + step, maxAf);
                }
                sar = preSar + af * (ep - preSar);
                var highMax = Math.max(dataList[Math.max(1, i) - 1].high, high);
                if (sar < kLineData.high) {
                    sar = ep;
                    // 重新初始化值
                    af = 0;
                    ep = -100;
                    isIncreasing = !isIncreasing;
                }
                else if (sar < highMax) {
                    sar = highMax;
                }
            }
            return { sar: sar };
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http:*www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * trix
 *
 * TR=收盘价的N日指数移动平均的N日指数移动平均的N日指数移动平均；
 * TRIX=(TR-昨日TR)/昨日TR*100；
 * MATRIX=TRIX的M日简单移动平均；
 * 默认参数N设为12，默认参数M设为9；
 * 默认参数12、9
 * 公式：MTR:=EMA(EMA(EMA(CLOSE,N),N),N)
 * TRIX:(MTR-REF(MTR,1))/REF(MTR,1)*100;
 * TRMA:MA(TRIX,M)
 *
 */
var tripleExponentiallySmoothedAverage = {
    name: 'TRIX',
    shortName: 'TRIX',
    calcParams: [12, 9],
    figures: [
        { key: 'trix', title: 'TRIX: ', type: 'line' },
        { key: 'maTrix', title: 'MATRIX: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var closeSum = 0;
        var ema1;
        var ema2;
        var oldTr;
        var ema1Sum = 0;
        var ema2Sum = 0;
        var trixSum = 0;
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a;
            var trix = {};
            var close = kLineData.close;
            closeSum += close;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    ema1 = (2 * close + (params[0] - 1) * ema1) / (params[0] + 1);
                }
                else {
                    ema1 = closeSum / params[0];
                }
                ema1Sum += ema1;
                if (i >= params[0] * 2 - 2) {
                    if (i > params[0] * 2 - 2) {
                        ema2 = (2 * ema1 + (params[0] - 1) * ema2) / (params[0] + 1);
                    }
                    else {
                        ema2 = ema1Sum / params[0];
                    }
                    ema2Sum += ema2;
                    if (i >= params[0] * 3 - 3) {
                        var tr = void 0;
                        var trixValue = 0;
                        if (i > params[0] * 3 - 3) {
                            tr = (2 * ema2 + (params[0] - 1) * oldTr) / (params[0] + 1);
                            trixValue = (tr - oldTr) / oldTr * 100;
                        }
                        else {
                            tr = ema2Sum / params[0];
                        }
                        oldTr = tr;
                        trix.trix = trixValue;
                        trixSum += trixValue;
                        if (i >= params[0] * 3 + params[1] - 4) {
                            trix.maTrix = trixSum / params[1];
                            trixSum -= ((_a = result[i - (params[1] - 1)].trix) !== null && _a !== void 0 ? _a : 0);
                        }
                    }
                }
            }
            result.push(trix);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var volume = {
    name: 'VOL',
    shortName: 'VOL',
    series: exports.IndicatorSeries.Volume,
    calcParams: [5, 10, 20],
    shouldFormatBigNumber: true,
    precision: 0,
    minValue: 0,
    figures: [
        { key: 'ma1', title: 'MA5: ', type: 'line' },
        { key: 'ma2', title: 'MA10: ', type: 'line' },
        { key: 'ma3', title: 'MA20: ', type: 'line' },
        {
            key: 'volume',
            title: 'VOLUME: ',
            type: 'bar',
            baseValue: 0,
            styles: function (data, indicator, defaultStyles) {
                var kLineData = data.current.kLineData;
                var color;
                if (kLineData.close > kLineData.open) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else if (kLineData.close < kLineData.open) {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
                else {
                    color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles.bars)[0].noChangeColor);
                }
                return { color: color };
            }
        }
    ],
    regenerateFigures: function (params) {
        var figures = params.map(function (p, i) {
            return { key: "ma".concat(i + 1), title: "MA".concat(p, ": "), type: 'line' };
        });
        figures.push({
            key: 'volume',
            title: 'VOLUME: ',
            type: 'bar',
            baseValue: 0,
            styles: function (data, indicator, defaultStyles) {
                var kLineData = data.current.kLineData;
                var color;
                if (kLineData.close > kLineData.open) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else if (kLineData.close < kLineData.open) {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
                else {
                    color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles.bars)[0].noChangeColor);
                }
                return { color: color };
            }
        });
        return figures;
    },
    calc: function (dataList, indicator) {
        var params = indicator.calcParams, figures = indicator.figures;
        var volSums = [];
        return dataList.map(function (kLineData, i) {
            var _a;
            var volume = (_a = kLineData.volume) !== null && _a !== void 0 ? _a : 0;
            var vol = { volume: volume };
            params.forEach(function (p, index) {
                var _a, _b;
                volSums[index] = ((_a = volSums[index]) !== null && _a !== void 0 ? _a : 0) + volume;
                if (i >= p - 1) {
                    vol[figures[index].key] = volSums[index] / p;
                    volSums[index] -= ((_b = dataList[i - (p - 1)].volume) !== null && _b !== void 0 ? _b : 0);
                }
            });
            return vol;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * VR
 * VR=（UVS+1/2PVS）/（DVS+1/2PVS）
 * 24天以来凡是股价上涨那一天的成交量都称为AV，将24天内的AV总和相加后称为UVS
 * 24天以来凡是股价下跌那一天的成交量都称为BV，将24天内的BV总和相加后称为DVS
 * 24天以来凡是股价不涨不跌，则那一天的成交量都称为CV，将24天内的CV总和相加后称为PVS
 *
 */
var volumeRatio = {
    name: 'VR',
    shortName: 'VR',
    calcParams: [26, 6],
    figures: [
        { key: 'vr', title: 'VR: ', type: 'line' },
        { key: 'maVr', title: 'MAVR: ', type: 'line' }
    ],
    calc: function (dataList, indicator) {
        var params = indicator.calcParams;
        var uvs = 0;
        var dvs = 0;
        var pvs = 0;
        var vrSum = 0;
        var result = [];
        dataList.forEach(function (kLineData, i) {
            var _a, _b, _c, _d, _e;
            var vr = {};
            var close = kLineData.close;
            var preClose = ((_a = dataList[i - 1]) !== null && _a !== void 0 ? _a : kLineData).close;
            var volume = (_b = kLineData.volume) !== null && _b !== void 0 ? _b : 0;
            if (close > preClose) {
                uvs += volume;
            }
            else if (close < preClose) {
                dvs += volume;
            }
            else {
                pvs += volume;
            }
            if (i >= params[0] - 1) {
                var halfPvs = pvs / 2;
                if (dvs + halfPvs === 0) {
                    vr.vr = 0;
                }
                else {
                    vr.vr = (uvs + halfPvs) / (dvs + halfPvs) * 100;
                }
                vrSum += vr.vr;
                if (i >= params[0] + params[1] - 2) {
                    vr.maVr = vrSum / params[1];
                    vrSum -= ((_c = result[i - (params[1] - 1)].vr) !== null && _c !== void 0 ? _c : 0);
                }
                var agoData = dataList[i - (params[0] - 1)];
                var agoPreData = (_d = dataList[i - params[0]]) !== null && _d !== void 0 ? _d : agoData;
                var agoClose = agoData.close;
                var agoVolume = (_e = agoData.volume) !== null && _e !== void 0 ? _e : 0;
                if (agoClose > agoPreData.close) {
                    uvs -= agoVolume;
                }
                else if (agoClose < agoPreData.close) {
                    dvs -= agoVolume;
                }
                else {
                    pvs -= agoVolume;
                }
            }
            result.push(vr);
        });
        return result;
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * WR
 * 公式 WR(N) = 100 * [ C - HIGH(N) ] / [ HIGH(N)-LOW(N) ]
 */
var williamsR = {
    name: 'WR',
    shortName: 'WR',
    calcParams: [6, 10, 14],
    figures: [
        { key: 'wr1', title: 'WR1: ', type: 'line' },
        { key: 'wr2', title: 'WR2: ', type: 'line' },
        { key: 'wr3', title: 'WR3: ', type: 'line' }
    ],
    regenerateFigures: function (params) {
        return params.map(function (_, i) {
            return { key: "wr".concat(i + 1), title: "WR".concat(i + 1, ": "), type: 'line' };
        });
    },
    calc: function (dataList, indicator) {
        var params = indicator.calcParams, figures = indicator.figures;
        return dataList.map(function (kLineData, i) {
            var wr = {};
            var close = kLineData.close;
            params.forEach(function (param, index) {
                var p = param - 1;
                if (i >= p) {
                    var hln = getMaxMin(dataList.slice(i - p, i + 1), 'high', 'low');
                    var hn = hln[0];
                    var ln = hln[1];
                    var hnSubLn = hn - ln;
                    wr[figures[index].key] = hnSubLn === 0 ? 0 : (close - hn) / hnSubLn * 100;
                }
            });
            return wr;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var indicators = {};
var extensions$2 = [
    averagePrice, awesomeOscillator, bias, bollingerBands, brar,
    bullAndBearIndex, commodityChannelIndex, currentRatio, differentOfMovingAverage,
    directionalMovementIndex, easeOfMovementValue, exponentialMovingAverage, momentum,
    movingAverage, movingAverageConvergenceDivergence, onBalanceVolume, priceAndVolumeTrend,
    psychologicalLine, rateOfChange, relativeStrengthIndex, simpleMovingAverage,
    stoch, stopAndReverse, tripleExponentiallySmoothedAverage, volume, volumeRatio, williamsR
];
extensions$2.forEach(function (indicator) {
    indicators[indicator.name] = IndicatorImp.extend(indicator);
});
function registerIndicator(indicator) {
    indicators[indicator.name] = IndicatorImp.extend(indicator);
}
function getIndicatorClass(name) {
    var _a;
    return (_a = indicators[name]) !== null && _a !== void 0 ? _a : null;
}
function getSupportedIndicators() {
    return Object.keys(indicators);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IndicatorStore = /** @class */ (function () {
    function IndicatorStore(chartStore) {
        this._instances = new Map();
        this._chartStore = chartStore;
    }
    IndicatorStore.prototype._overrideInstance = function (instance, indicator) {
        var shortName = indicator.shortName, series = indicator.series, calcParams = indicator.calcParams, precision = indicator.precision, figures = indicator.figures, minValue = indicator.minValue, maxValue = indicator.maxValue, shouldOhlc = indicator.shouldOhlc, shouldFormatBigNumber = indicator.shouldFormatBigNumber, visible = indicator.visible, styles = indicator.styles, extendData = indicator.extendData, regenerateFigures = indicator.regenerateFigures, createTooltipDataSource = indicator.createTooltipDataSource, draw = indicator.draw, calc = indicator.calc;
        var updateFlag = false;
        if (shortName !== undefined && instance.setShortName(shortName)) {
            updateFlag = true;
        }
        if (series !== undefined && instance.setSeries(series)) {
            updateFlag = true;
        }
        var calcFlag = false;
        if (calcParams !== undefined && instance.setCalcParams(calcParams)) {
            updateFlag = true;
            calcFlag = true;
        }
        if (figures !== undefined && instance.setFigures(figures)) {
            updateFlag = true;
            calcFlag = true;
        }
        if (minValue !== undefined && instance.setMinValue(minValue)) {
            updateFlag = true;
        }
        if (maxValue !== undefined && instance.setMinValue(maxValue)) {
            updateFlag = true;
        }
        if (precision !== undefined && instance.setPrecision(precision)) {
            updateFlag = true;
        }
        if (shouldOhlc !== undefined && instance.setShouldOhlc(shouldOhlc)) {
            updateFlag = true;
        }
        if (shouldFormatBigNumber !== undefined && instance.setShouldFormatBigNumber(shouldFormatBigNumber)) {
            updateFlag = true;
        }
        if (visible !== undefined && instance.setVisible(visible)) {
            updateFlag = true;
        }
        if (styles !== undefined && instance.setStyles(styles)) {
            updateFlag = true;
        }
        if (extendData !== undefined && instance.setExtendData(extendData)) {
            updateFlag = true;
            calcFlag = true;
        }
        if (regenerateFigures !== undefined && instance.setRegenerateFigures(regenerateFigures)) {
            updateFlag = true;
        }
        if (createTooltipDataSource !== undefined && instance.setCreateTooltipDataSource(createTooltipDataSource)) {
            updateFlag = true;
        }
        if (draw !== undefined && instance.setDraw(draw)) {
            updateFlag = true;
        }
        if (calc !== undefined) {
            instance.calc = calc;
            calcFlag = true;
        }
        return [updateFlag, calcFlag];
    };
    IndicatorStore.prototype.addInstance = function (indicator, paneId, isStack) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var name, paneInstances, IndicatorClazz, instance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = indicator.name;
                        paneInstances = this._instances.get(paneId);
                        if (!((_a = paneInstances === null || paneInstances === void 0 ? void 0 : paneInstances.has(name)) !== null && _a !== void 0 ? _a : false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.reject(new Error('Duplicate indicators.'))];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        if (paneInstances === undefined) {
                            paneInstances = new Map();
                            this._instances.set(paneId, paneInstances);
                        }
                        IndicatorClazz = getIndicatorClass(name);
                        instance = new IndicatorClazz();
                        this._overrideInstance(instance, indicator);
                        if (!isStack) {
                            paneInstances.clear();
                        }
                        paneInstances.set(name, instance);
                        return [4 /*yield*/, instance.calcIndicator(this._chartStore.getDataList())];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    IndicatorStore.prototype.getInstances = function (paneId) {
        var _a;
        return (_a = this._instances.get(paneId)) !== null && _a !== void 0 ? _a : new Map();
    };
    IndicatorStore.prototype.removeInstance = function (paneId, name) {
        var removed = false;
        var paneInstances = this._instances.get(paneId);
        if (paneInstances !== undefined) {
            if (name !== undefined) {
                if (paneInstances.has(name)) {
                    paneInstances.delete(name);
                    removed = true;
                }
            }
            else {
                paneInstances.clear();
                removed = true;
            }
            if (paneInstances.size === 0) {
                this._instances.delete(paneId);
            }
        }
        return removed;
    };
    IndicatorStore.prototype.hasInstances = function (paneId) {
        return this._instances.has(paneId);
    };
    IndicatorStore.prototype.calcInstance = function (name, paneId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tasks, paneInstances, instance, result;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tasks = [];
                        if (name !== undefined) {
                            if (paneId !== undefined) {
                                paneInstances = this._instances.get(paneId);
                                if ((_a = paneInstances === null || paneInstances === void 0 ? void 0 : paneInstances.has(name)) !== null && _a !== void 0 ? _a : false) {
                                    instance = paneInstances === null || paneInstances === void 0 ? void 0 : paneInstances.get(name);
                                    tasks.push(instance.calcIndicator(this._chartStore.getDataList()));
                                }
                            }
                            else {
                                this._instances.forEach(function (paneInstances) {
                                    if (paneInstances.has(name)) {
                                        var instance = paneInstances === null || paneInstances === void 0 ? void 0 : paneInstances.get(name);
                                        tasks.push(instance.calcIndicator(_this._chartStore.getDataList()));
                                    }
                                });
                            }
                        }
                        else {
                            this._instances.forEach(function (paneInstances) {
                                paneInstances.forEach(function (instance) {
                                    tasks.push(instance.calcIndicator(_this._chartStore.getDataList()));
                                });
                            });
                        }
                        return [4 /*yield*/, Promise.all(tasks)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.includes(true)];
                }
            });
        });
    };
    IndicatorStore.prototype.getInstanceByPaneId = function (paneId, name) {
        var _a;
        if (paneId !== undefined) {
            var paneInstances = this._instances.get(paneId);
            if (name !== undefined) {
                return (_a = paneInstances === null || paneInstances === void 0 ? void 0 : paneInstances.get(name)) !== null && _a !== void 0 ? _a : null;
            }
            return paneInstances !== null && paneInstances !== void 0 ? paneInstances : null;
        }
        return this._instances;
    };
    IndicatorStore.prototype.setSeriesPrecision = function (precision) {
        this._instances.forEach(function (paneInstances) {
            paneInstances.forEach(function (instance) {
                if (instance.series === exports.IndicatorSeries.Price) {
                    instance.setPrecision(precision.price, true);
                }
                if (instance.series === exports.IndicatorSeries.Volume) {
                    instance.setPrecision(precision.volume, true);
                }
            });
        });
    };
    IndicatorStore.prototype.override = function (indicator, paneId) {
        return __awaiter(this, void 0, void 0, function () {
            var name, instances, paneInstances, onlyUpdateFlag, tasks, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = indicator.name;
                        instances = new Map();
                        if (paneId !== null) {
                            paneInstances = this._instances.get(paneId);
                            if (paneInstances !== undefined) {
                                instances.set(paneId, paneInstances);
                            }
                        }
                        else {
                            instances = this._instances;
                        }
                        onlyUpdateFlag = false;
                        tasks = [];
                        instances.forEach(function (paneInstances) {
                            var instance = paneInstances.get(name);
                            if (instance !== undefined) {
                                var overrideResult = _this._overrideInstance(instance, indicator);
                                if (overrideResult[1]) {
                                    tasks.push(instance.calcIndicator(_this._chartStore.getDataList()));
                                }
                                else {
                                    if (overrideResult[0]) {
                                        onlyUpdateFlag = true;
                                    }
                                }
                            }
                        });
                        return [4 /*yield*/, Promise.all(tasks)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, [onlyUpdateFlag, result.includes(true)]];
                }
            });
        });
    };
    return IndicatorStore;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CrosshairStore = /** @class */ (function () {
    function CrosshairStore(chartStore) {
        this._crosshair = {};
        this._chartStore = chartStore;
    }
    /**
       * 设置十字光标点信息
       * @param crosshair
       * @param notInvalidate
       */
    CrosshairStore.prototype.set = function (crosshair, notInvalidate) {
        var dataList = this._chartStore.getDataList();
        var cr = crosshair !== null && crosshair !== void 0 ? crosshair : {};
        var realDataIndex;
        var dataIndex;
        if (cr.x !== undefined) {
            realDataIndex = this._chartStore.getTimeScaleStore().coordinateToDataIndex(cr.x);
            if (realDataIndex < 0) {
                dataIndex = 0;
            }
            else if (realDataIndex > dataList.length - 1) {
                dataIndex = dataList.length - 1;
            }
            else {
                dataIndex = realDataIndex;
            }
        }
        else {
            realDataIndex = dataList.length - 1;
            dataIndex = realDataIndex;
        }
        var kLineData = dataList[dataIndex];
        var realX = this._chartStore.getTimeScaleStore().dataIndexToCoordinate(realDataIndex);
        var prevCrosshair = { x: this._crosshair.x, y: this._crosshair.y, paneId: this._crosshair.paneId };
        this._crosshair = __assign(__assign({}, cr), { realX: realX, kLineData: kLineData, realDataIndex: realDataIndex, dataIndex: dataIndex });
        if (prevCrosshair.x !== cr.x || prevCrosshair.y !== cr.y || prevCrosshair.paneId !== cr.paneId) {
            if (kLineData !== null) {
                this._chartStore.getChart().crosshairChange(this._crosshair);
            }
            if (!(notInvalidate !== null && notInvalidate !== void 0 ? notInvalidate : false)) {
                this._chartStore.getChart().updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
        return this;
    };
    /**
     * 重新计算十字光标
     * @param notInvalidate
     */
    CrosshairStore.prototype.recalculate = function (notInvalidate) {
        this.set(this._crosshair, notInvalidate);
    };
    /**
     * 获取crosshair信息
     * @returns
     */
    CrosshairStore.prototype.get = function () {
        return this._crosshair;
    };
    return CrosshairStore;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TooltipStore = /** @class */ (function () {
    function TooltipStore() {
        this._activeIconInfo = null;
    }
    TooltipStore.prototype.setActiveIconInfo = function (info) {
        this._activeIconInfo = info !== null && info !== void 0 ? info : null;
    };
    TooltipStore.prototype.getActiveIconInfo = function () {
        return this._activeIconInfo;
    };
    return TooltipStore;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.OverlayMode = void 0;
(function (OverlayMode) {
    OverlayMode["Normal"] = "normal";
    OverlayMode["WeakMagnet"] = "weak_magnet";
    OverlayMode["StrongMagnet"] = "strong_magnet";
})(exports.OverlayMode || (exports.OverlayMode = {}));
function getAllOverlayFigureIgnoreEventTypes() {
    return [
        'mouseClickEvent',
        'mouseDoubleClickEvent',
        'mouseRightClickEvent',
        'tapEvent',
        'doubleTapEvent',
        'mouseDownEvent',
        'touchStartEvent',
        'mouseMoveEvent',
        'touchMoveEvent'
    ];
}
var OVERLAY_DRAW_STEP_START = 1;
var OVERLAY_DRAW_STEP_FINISHED = -1;
var OVERLAY_ID_PREFIX = 'overlay_';
var OVERLAY_FIGURE_KEY_PREFIX = 'overlay_figure_';
var OVERLAY_ACTIVE_Z_LEVEL = Number.MAX_SAFE_INTEGER;
var OverlayImp = /** @class */ (function () {
    function OverlayImp(overlay) {
        this.currentStep = OVERLAY_DRAW_STEP_START;
        this.points = [];
        this._prevPressedPoint = null;
        this._prevPressedPoints = [];
        var mode = overlay.mode, modeSensitivity = overlay.modeSensitivity, extendData = overlay.extendData, styles = overlay.styles, name = overlay.name, totalStep = overlay.totalStep, lock = overlay.lock, visible = overlay.visible, zLevel = overlay.zLevel, needDefaultPointFigure = overlay.needDefaultPointFigure, needDefaultXAxisFigure = overlay.needDefaultXAxisFigure, needDefaultYAxisFigure = overlay.needDefaultYAxisFigure, createPointFigures = overlay.createPointFigures, createXAxisFigures = overlay.createXAxisFigures, createYAxisFigures = overlay.createYAxisFigures, performEventPressedMove = overlay.performEventPressedMove, performEventMoveForDrawing = overlay.performEventMoveForDrawing, onDrawStart = overlay.onDrawStart, onDrawing = overlay.onDrawing, onDrawEnd = overlay.onDrawEnd, onClick = overlay.onClick, onDoubleClick = overlay.onDoubleClick, onRightClick = overlay.onRightClick, onPressedMoveStart = overlay.onPressedMoveStart, onPressedMoving = overlay.onPressedMoving, onPressedMoveEnd = overlay.onPressedMoveEnd, onMouseEnter = overlay.onMouseEnter, onMouseLeave = overlay.onMouseLeave, onRemoved = overlay.onRemoved, onSelected = overlay.onSelected, onDeselected = overlay.onDeselected;
        this.name = name;
        this.totalStep = (totalStep === undefined || totalStep < 2) ? 1 : totalStep;
        this.lock = lock !== null && lock !== void 0 ? lock : false;
        this.visible = visible !== null && visible !== void 0 ? visible : true;
        this.zLevel = zLevel !== null && zLevel !== void 0 ? zLevel : 0;
        this.needDefaultPointFigure = needDefaultPointFigure !== null && needDefaultPointFigure !== void 0 ? needDefaultPointFigure : false;
        this.needDefaultXAxisFigure = needDefaultXAxisFigure !== null && needDefaultXAxisFigure !== void 0 ? needDefaultXAxisFigure : false;
        this.needDefaultYAxisFigure = needDefaultYAxisFigure !== null && needDefaultYAxisFigure !== void 0 ? needDefaultYAxisFigure : false;
        this.mode = mode !== null && mode !== void 0 ? mode : exports.OverlayMode.Normal;
        this.modeSensitivity = modeSensitivity !== null && modeSensitivity !== void 0 ? modeSensitivity : 8;
        this.extendData = extendData;
        this.styles = styles !== null && styles !== void 0 ? styles : null;
        this.createPointFigures = createPointFigures !== null && createPointFigures !== void 0 ? createPointFigures : null;
        this.createXAxisFigures = createXAxisFigures !== null && createXAxisFigures !== void 0 ? createXAxisFigures : null;
        this.createYAxisFigures = createYAxisFigures !== null && createYAxisFigures !== void 0 ? createYAxisFigures : null;
        this.performEventPressedMove = performEventPressedMove !== null && performEventPressedMove !== void 0 ? performEventPressedMove : null;
        this.performEventMoveForDrawing = performEventMoveForDrawing !== null && performEventMoveForDrawing !== void 0 ? performEventMoveForDrawing : null;
        this.onDrawStart = onDrawStart !== null && onDrawStart !== void 0 ? onDrawStart : null;
        this.onDrawing = onDrawing !== null && onDrawing !== void 0 ? onDrawing : null;
        this.onDrawEnd = onDrawEnd !== null && onDrawEnd !== void 0 ? onDrawEnd : null;
        this.onClick = onClick !== null && onClick !== void 0 ? onClick : null;
        this.onDoubleClick = onDoubleClick !== null && onDoubleClick !== void 0 ? onDoubleClick : null;
        this.onRightClick = onRightClick !== null && onRightClick !== void 0 ? onRightClick : null;
        this.onPressedMoveStart = onPressedMoveStart !== null && onPressedMoveStart !== void 0 ? onPressedMoveStart : null;
        this.onPressedMoving = onPressedMoving !== null && onPressedMoving !== void 0 ? onPressedMoving : null;
        this.onPressedMoveEnd = onPressedMoveEnd !== null && onPressedMoveEnd !== void 0 ? onPressedMoveEnd : null;
        this.onMouseEnter = onMouseEnter !== null && onMouseEnter !== void 0 ? onMouseEnter : null;
        this.onMouseLeave = onMouseLeave !== null && onMouseLeave !== void 0 ? onMouseLeave : null;
        this.onRemoved = onRemoved !== null && onRemoved !== void 0 ? onRemoved : null;
        this.onSelected = onSelected !== null && onSelected !== void 0 ? onSelected : null;
        this.onDeselected = onDeselected !== null && onDeselected !== void 0 ? onDeselected : null;
    }
    OverlayImp.prototype.setId = function (id) {
        if (this.id === undefined) {
            this.id = id;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setGroupId = function (groupId) {
        if (this.groupId === undefined) {
            this.groupId = groupId;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setDefaultZLevel = function (defaultZLevel) {
        if (this.defaultZLevel === undefined) {
            this.defaultZLevel = defaultZLevel;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setPaneId = function (paneId) {
        this.paneId = paneId;
    };
    OverlayImp.prototype.setExtendData = function (extendData) {
        if (extendData !== this.extendData) {
            this.extendData = extendData;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setStyles = function (styles) {
        if (styles !== this.styles) {
            this.styles = styles;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setPoints = function (points) {
        if (points.length > 0) {
            var repeatTotalStep = void 0;
            this.points = __spreadArray([], __read(points), false);
            if (points.length >= this.totalStep - 1) {
                this.currentStep = OVERLAY_DRAW_STEP_FINISHED;
                repeatTotalStep = this.totalStep - 1;
            }
            else {
                this.currentStep = points.length + 1;
                repeatTotalStep = points.length;
            }
            // Prevent wrong drawing due to wrong points
            if (this.performEventMoveForDrawing !== null) {
                for (var i = 0; i < repeatTotalStep; i++) {
                    this.performEventMoveForDrawing({
                        currentStep: i + 2,
                        mode: this.mode,
                        points: this.points,
                        performPointIndex: i,
                        performPoint: this.points[i]
                    });
                }
            }
            if (this.currentStep === OVERLAY_DRAW_STEP_FINISHED && this.performEventPressedMove !== null) {
                this.performEventPressedMove({
                    currentStep: this.currentStep,
                    mode: this.mode,
                    points: this.points,
                    performPointIndex: this.points.length - 1,
                    performPoint: this.points[this.points.length - 1]
                });
            }
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setLock = function (lock) {
        if (this.lock !== lock) {
            this.lock = lock;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setVisible = function (visible) {
        if (this.visible !== visible) {
            this.visible = visible;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.resetZLevel = function () {
        this.zLevel = this.defaultZLevel;
    };
    OverlayImp.prototype.setZLevel = function (zLevel) {
        if (this.zLevel !== zLevel) {
            this.zLevel = zLevel;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setMode = function (mode) {
        if (this.mode !== mode) {
            this.mode = mode;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setModeSensitivity = function (modeSensitivity) {
        if (this.modeSensitivity !== modeSensitivity) {
            this.modeSensitivity = modeSensitivity;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnDrawStartCallback = function (callback) {
        if (this.onDrawStart !== callback) {
            this.onDrawStart = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnDrawingCallback = function (callback) {
        if (this.onDrawing !== callback) {
            this.onDrawing = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnDrawEndCallback = function (callback) {
        if (this.onDrawEnd !== callback) {
            this.onDrawEnd = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnClickCallback = function (callback) {
        if (this.onClick !== callback) {
            this.onClick = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnDoubleClickCallback = function (callback) {
        if (this.onDoubleClick !== callback) {
            this.onDoubleClick = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnRightClickCallback = function (callback) {
        if (this.onRightClick !== callback) {
            this.onRightClick = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnPressedMoveStartCallback = function (callback) {
        if (this.onPressedMoveStart !== callback) {
            this.onPressedMoveStart = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnPressedMovingCallback = function (callback) {
        if (this.onPressedMoving !== callback) {
            this.onPressedMoving = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnPressedMoveEndCallback = function (callback) {
        if (this.onPressedMoveEnd !== callback) {
            this.onPressedMoveEnd = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnMouseEnterCallback = function (callback) {
        if (this.onMouseEnter !== callback) {
            this.onMouseEnter = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnMouseLeaveCallback = function (callback) {
        if (this.onMouseLeave !== callback) {
            this.onMouseLeave = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnRemovedCallback = function (callback) {
        if (this.onRemoved !== callback) {
            this.onRemoved = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnSelectedCallback = function (callback) {
        if (this.onSelected !== callback) {
            this.onSelected = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.setOnDeselectedCallback = function (callback) {
        if (this.onDeselected !== callback) {
            this.onDeselected = callback;
            return true;
        }
        return false;
    };
    OverlayImp.prototype.nextStep = function () {
        if (this.currentStep === this.totalStep - 1) {
            this.currentStep = OVERLAY_DRAW_STEP_FINISHED;
        }
        else {
            this.currentStep++;
        }
    };
    OverlayImp.prototype.forceComplete = function () {
        this.currentStep = OVERLAY_DRAW_STEP_FINISHED;
    };
    OverlayImp.prototype.isDrawing = function () {
        return this.currentStep !== OVERLAY_DRAW_STEP_FINISHED;
    };
    OverlayImp.prototype.isStart = function () {
        return this.currentStep === OVERLAY_DRAW_STEP_START;
    };
    OverlayImp.prototype.eventMoveForDrawing = function (point) {
        var _a;
        var pointIndex = this.currentStep - 1;
        var newPoint = {};
        if (point.timestamp !== undefined) {
            newPoint.timestamp = point.timestamp;
        }
        if (point.dataIndex !== undefined) {
            newPoint.dataIndex = point.dataIndex;
        }
        if (point.value !== undefined) {
            newPoint.value = point.value;
        }
        this.points[pointIndex] = newPoint;
        (_a = this.performEventMoveForDrawing) === null || _a === void 0 ? void 0 : _a.call(this, {
            currentStep: this.currentStep,
            mode: this.mode,
            points: this.points,
            performPointIndex: pointIndex,
            performPoint: newPoint
        });
    };
    OverlayImp.prototype.eventPressedPointMove = function (point, pointIndex) {
        var _a;
        if (point.dataIndex !== undefined) {
            this.points[pointIndex].dataIndex = point.dataIndex;
            this.points[pointIndex].timestamp = point.timestamp;
        }
        if (point.value !== undefined) {
            this.points[pointIndex].value = point.value;
        }
        (_a = this.performEventPressedMove) === null || _a === void 0 ? void 0 : _a.call(this, {
            currentStep: this.currentStep,
            points: this.points,
            mode: this.mode,
            performPointIndex: pointIndex,
            performPoint: this.points[pointIndex]
        });
    };
    OverlayImp.prototype.startPressedMove = function (point) {
        this._prevPressedPoint = __assign({}, point);
        this._prevPressedPoints = clone(this.points);
    };
    OverlayImp.prototype.eventPressedOtherMove = function (point, timeScaleStore) {
        if (this._prevPressedPoint !== null) {
            var difDataIndex_1;
            if (point.dataIndex !== undefined && this._prevPressedPoint.dataIndex !== undefined) {
                difDataIndex_1 = point.dataIndex - this._prevPressedPoint.dataIndex;
            }
            var difValue_1;
            if (point.value !== undefined && this._prevPressedPoint.value !== undefined) {
                difValue_1 = point.value - this._prevPressedPoint.value;
            }
            this.points = this._prevPressedPoints.map(function (p) {
                var _a;
                if (p.dataIndex === undefined && p.timestamp !== undefined) {
                    p.dataIndex = timeScaleStore.timestampToDataIndex(p.timestamp);
                }
                var newPoint = __assign({}, p);
                if (difDataIndex_1 !== undefined && p.dataIndex !== undefined) {
                    newPoint.dataIndex = p.dataIndex + difDataIndex_1;
                    newPoint.timestamp = (_a = timeScaleStore.dataIndexToTimestamp(newPoint.dataIndex)) !== null && _a !== void 0 ? _a : undefined;
                }
                if (difValue_1 !== undefined && p.value !== undefined) {
                    newPoint.value = p.value + difValue_1;
                }
                return newPoint;
            });
        }
    };
    OverlayImp.extend = function (template) {
        var Custom = /** @class */ (function (_super) {
            __extends(Custom, _super);
            function Custom() {
                return _super.call(this, template) || this;
            }
            return Custom;
        }(OverlayImp));
        return Custom;
    };
    return OverlayImp;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var fibonacciLine = {
    name: 'fibonacciLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding, overlay = _a.overlay, precision = _a.precision, thousandsSeparator = _a.thousandsSeparator;
        var points = overlay.points;
        if (coordinates.length > 0) {
            var lines_1 = [];
            var texts_1 = [];
            var startX_1 = 0;
            var endX_1 = bounding.width;
            if (coordinates.length > 1 && points[0].value !== undefined && points[1].value !== undefined) {
                var percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
                var yDif_1 = coordinates[0].y - coordinates[1].y;
                var valueDif_1 = points[0].value - points[1].value;
                percents.forEach(function (percent) {
                    var _a;
                    var y = coordinates[1].y + yDif_1 * percent;
                    var value = formatThousands((((_a = points[1].value) !== null && _a !== void 0 ? _a : 0) + valueDif_1 * percent).toFixed(precision.price), thousandsSeparator);
                    lines_1.push({ coordinates: [{ x: startX_1, y: y }, { x: endX_1, y: y }] });
                    texts_1.push({
                        x: startX_1,
                        y: y,
                        text: "".concat(value, " (").concat((percent * 100).toFixed(1), "%)"),
                        baseline: 'bottom'
                    });
                });
            }
            return [
                {
                    type: 'line',
                    attrs: lines_1
                }, {
                    type: 'text',
                    isCheckEvent: false,
                    attrs: texts_1
                }
            ];
        }
        return [];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var horizontalRayLine = {
    name: 'horizontalRayLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        var coordinate = { x: 0, y: coordinates[0].y };
        if (coordinates[1] !== undefined && coordinates[0].x < coordinates[1].x) {
            coordinate.x = bounding.width;
        }
        return [
            {
                type: 'line',
                attrs: { coordinates: [coordinates[0], coordinate] }
            }
        ];
    },
    performEventPressedMove: function (_a) {
        var points = _a.points, performPoint = _a.performPoint;
        points[0].value = performPoint.value;
        points[1].value = performPoint.value;
    },
    performEventMoveForDrawing: function (_a) {
        var currentStep = _a.currentStep, points = _a.points, performPoint = _a.performPoint;
        if (currentStep === 2) {
            points[0].value = performPoint.value;
        }
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var horizontalSegment = {
    name: 'horizontalSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates;
        var lines = [];
        if (coordinates.length === 2) {
            lines.push({ coordinates: coordinates });
        }
        return [
            {
                type: 'line',
                attrs: lines
            }
        ];
    },
    performEventPressedMove: function (_a) {
        var points = _a.points, performPoint = _a.performPoint;
        points[0].value = performPoint.value;
        points[1].value = performPoint.value;
    },
    performEventMoveForDrawing: function (_a) {
        var currentStep = _a.currentStep, points = _a.points, performPoint = _a.performPoint;
        if (currentStep === 2) {
            points[0].value = performPoint.value;
        }
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var horizontalStraightLine = {
    name: 'horizontalStraightLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        return [{
                type: 'line',
                attrs: {
                    coordinates: [
                        {
                            x: 0,
                            y: coordinates[0].y
                        }, {
                            x: bounding.width,
                            y: coordinates[0].y
                        }
                    ]
                }
            }];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Eventful = /** @class */ (function () {
    function Eventful() {
        this._children = [];
        this._callbacks = new Map();
    }
    Eventful.prototype.registerEvent = function (name, callback) {
        this._callbacks.set(name, callback);
        return this;
    };
    Eventful.prototype.onEvent = function (name, event, other) {
        var callback = this._callbacks.get(name);
        if (callback !== undefined && this.checkEventOn(event)) {
            return callback(event, other);
        }
        return false;
    };
    Eventful.prototype.checkEventOn = function (event) {
        var e_1, _a;
        try {
            for (var _b = __values(this._children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var eventful = _c.value;
                if (eventful.checkEventOn(event)) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    Eventful.prototype.dispatchEvent = function (name, event, other) {
        var start = this._children.length - 1;
        if (start > -1) {
            for (var i = start; i > -1; i--) {
                if (this._children[i].dispatchEvent(name, event, other)) {
                    return true;
                }
            }
        }
        return this.onEvent(name, event, other);
    };
    Eventful.prototype.addChild = function (eventful) {
        this._children.push(eventful);
        return this;
    };
    Eventful.prototype.clear = function () {
        this._children = [];
    };
    return Eventful;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEVIATION = 2;
var FigureImp = /** @class */ (function (_super) {
    __extends(FigureImp, _super);
    function FigureImp(figure) {
        var _this = _super.call(this) || this;
        _this.attrs = figure.attrs;
        _this.styles = figure.styles;
        return _this;
    }
    FigureImp.prototype.checkEventOn = function (event) {
        return this.checkEventOnImp(event, this.attrs, this.styles);
    };
    FigureImp.prototype.draw = function (ctx) {
        this.drawImp(ctx, this.attrs, this.styles);
    };
    FigureImp.extend = function (figure) {
        var Custom = /** @class */ (function (_super) {
            __extends(Custom, _super);
            function Custom() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Custom.prototype.checkEventOnImp = function (coordinate, attrs, styles) {
                return figure.checkEventOn(coordinate, attrs, styles);
            };
            Custom.prototype.drawImp = function (ctx, attrs, styles) {
                figure.draw(ctx, attrs, styles);
            };
            return Custom;
        }(FigureImp));
        return Custom;
    };
    return FigureImp;
}(Eventful));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getDistance$1(coordinate1, coordinate2) {
    return Math.sqrt(Math.pow(coordinate1.x + coordinate2.x, 2) + Math.pow(coordinate1.y + coordinate2.y, 2));
}
function getSmoothControlCoordinate(coordinates) {
    var d01 = getDistance$1(coordinates[0], coordinates[1]);
    var d12 = getDistance$1(coordinates[1], coordinates[2]);
    var d02 = d01 + d12;
    var vector = [coordinates[2].x - coordinates[0].x, coordinates[2].y - coordinates[0].y];
    return [
        {
            x: coordinates[1].x - vector[0] * 0.5 * d01 / d02,
            y: coordinates[1].y - vector[1] * 0.5 * d01 / d02
        }, {
            x: coordinates[1].x + vector[0] * 0.5 * d01 / d02,
            y: coordinates[1].y + vector[1] * 0.5 * d01 / d02
        }
    ];
}
function checkCoordinateOnLine(coordinate, line) {
    var coordinates = line.coordinates;
    if (coordinates.length > 1) {
        for (var i = 1; i < coordinates.length; i++) {
            var prevCoordinate = coordinates[i - 1];
            var currentCoordinate = coordinates[i];
            if (prevCoordinate.x === currentCoordinate.x) {
                if (Math.abs(prevCoordinate.y - coordinate.y) + Math.abs(currentCoordinate.y - coordinate.y) - Math.abs(prevCoordinate.y - currentCoordinate.y) < DEVIATION + DEVIATION &&
                    Math.abs(coordinate.x - prevCoordinate.x) < DEVIATION) {
                    return true;
                }
            }
            else {
                var kb = getLinearSlopeIntercept(prevCoordinate, currentCoordinate);
                var y = getLinearYFromSlopeIntercept(kb, coordinate);
                var yDif = Math.abs(y - coordinate.y);
                if (Math.abs(prevCoordinate.x - coordinate.x) + Math.abs(currentCoordinate.x - coordinate.x) - Math.abs(prevCoordinate.x - currentCoordinate.x) < DEVIATION + DEVIATION &&
                    yDif * yDif / (kb[0] * kb[0] + 1) < DEVIATION * DEVIATION) {
                    return true;
                }
            }
        }
    }
    return false;
}
function getLinearYFromSlopeIntercept(kb, coordinate) {
    if (kb != null) {
        return coordinate.x * kb[0] + kb[1];
    }
    return coordinate.y;
}
/**
 * 获取点在两点决定的一次函数上的y值
 * @param coordinate1
 * @param coordinate2
 * @param targetCoordinate
 */
function getLinearYFromCoordinates(coordinate1, coordinate2, targetCoordinate) {
    var kb = getLinearSlopeIntercept(coordinate1, coordinate2);
    return getLinearYFromSlopeIntercept(kb, targetCoordinate);
}
function getLinearSlopeIntercept(coordinate1, coordinate2) {
    var difX = coordinate1.x - coordinate2.x;
    if (difX !== 0) {
        var k = (coordinate1.y - coordinate2.y) / difX;
        var b = coordinate1.y - k * coordinate1.x;
        return [k, b];
    }
    return null;
}
function drawLine(ctx, attrs, styles) {
    var coordinates = attrs.coordinates;
    var length = coordinates.length;
    if (length > 1) {
        var _a = styles.style, style = _a === void 0 ? exports.LineType.Solid : _a, smooth = styles.smooth, _b = styles.size, size = _b === void 0 ? 1 : _b, _c = styles.color, color = _c === void 0 ? 'currentColor' : _c, _d = styles.dashedValue, dashedValue = _d === void 0 ? [2, 2] : _d;
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        if (style === exports.LineType.Dashed) {
            ctx.setLineDash(dashedValue);
        }
        else {
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        if (smooth !== null && smooth !== void 0 ? smooth : false) {
            var controlCoordinates = [];
            for (var i_1 = 1; i_1 < length - 1; i_1++) {
                controlCoordinates = controlCoordinates.concat(getSmoothControlCoordinate([coordinates[i_1 - 1], coordinates[i_1], coordinates[i_1 + 1]]));
            }
            ctx.quadraticCurveTo(controlCoordinates[0].x, controlCoordinates[0].y, coordinates[1].x, coordinates[1].y);
            var i = 2;
            for (; i < length - 1; i++) {
                ctx.bezierCurveTo(controlCoordinates[(i - 2) * 2 + 1].x, controlCoordinates[(i - 2) * 2 + 1].y, controlCoordinates[(i - 1) * 2].x, controlCoordinates[(i - 1) * 2].y, coordinates[i].x, coordinates[i].y);
            }
            ctx.quadraticCurveTo(controlCoordinates[(i - 2) * 2 + 1].x, controlCoordinates[(i - 2) * 2 + 1].y, coordinates[i].x, coordinates[i].y);
        }
        else {
            for (var i = 1; i < coordinates.length; i++) {
                ctx.lineTo(coordinates[i].x, coordinates[i].y);
            }
        }
        ctx.stroke();
        ctx.closePath();
    }
}
var line$1 = {
    name: 'line',
    checkEventOn: checkCoordinateOnLine,
    draw: function (ctx, attrs, styles) {
        drawLine(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 获取平行线
 * @param coordinates
 * @param bounding
 * @param extendParallelLineCount
 * @returns {Array}
 */
function getParallelLines(coordinates, bounding, extendParallelLineCount) {
    var count = extendParallelLineCount !== null && extendParallelLineCount !== void 0 ? extendParallelLineCount : 0;
    var lines = [];
    if (coordinates.length > 1) {
        if (coordinates[0].x === coordinates[1].x) {
            var startY = 0;
            var endY = bounding.height;
            lines.push({ coordinates: [{ x: coordinates[0].x, y: startY }, { x: coordinates[0].x, y: endY }] });
            if (coordinates.length > 2) {
                lines.push({ coordinates: [{ x: coordinates[2].x, y: startY }, { x: coordinates[2].x, y: endY }] });
                var distance = coordinates[0].x - coordinates[2].x;
                for (var i = 0; i < count; i++) {
                    var d = distance * (i + 1);
                    lines.push({ coordinates: [{ x: coordinates[0].x + d, y: startY }, { x: coordinates[0].x + d, y: endY }] });
                }
            }
        }
        else {
            var startX = 0;
            var endX = bounding.width;
            var kb = getLinearSlopeIntercept(coordinates[0], coordinates[1]);
            var k = kb[0];
            var b = kb[1];
            lines.push({ coordinates: [{ x: startX, y: startX * k + b }, { x: endX, y: endX * k + b }] });
            if (coordinates.length > 2) {
                var b1 = coordinates[2].y - k * coordinates[2].x;
                lines.push({ coordinates: [{ x: startX, y: startX * k + b1 }, { x: endX, y: endX * k + b1 }] });
                var distance = b - b1;
                for (var i = 0; i < count; i++) {
                    var b2 = b + distance * (i + 1);
                    lines.push({ coordinates: [{ x: startX, y: startX * k + b2 }, { x: endX, y: endX * k + b2 }] });
                }
            }
        }
    }
    return lines;
}
var parallelStraightLine = {
    name: 'parallelStraightLine',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        return [
            {
                type: 'line',
                attrs: getParallelLines(coordinates, bounding)
            }
        ];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var priceChannelLine = {
    name: 'priceChannelLine',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        return [
            {
                type: 'line',
                attrs: getParallelLines(coordinates, bounding, 1)
            }
        ];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var priceLine = {
    name: 'priceLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding, precision = _a.precision, overlay = _a.overlay, thousandsSeparator = _a.thousandsSeparator;
        var _b = (overlay.points)[0].value, value = _b === void 0 ? 0 : _b;
        return [
            {
                type: 'line',
                attrs: { coordinates: [coordinates[0], { x: bounding.width, y: coordinates[0].y }] }
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: { x: coordinates[0].x, y: coordinates[0].y, text: formatThousands(value.toFixed(precision.price), thousandsSeparator), baseline: 'bottom' }
            }
        ];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getRayLine(coordinates, bounding) {
    if (coordinates.length > 1) {
        var coordinate = void 0;
        if (coordinates[0].x === coordinates[1].x && coordinates[0].y !== coordinates[1].y) {
            if (coordinates[0].y < coordinates[1].y) {
                coordinate = {
                    x: coordinates[0].x,
                    y: bounding.height
                };
            }
            else {
                coordinate = {
                    x: coordinates[0].x,
                    y: 0
                };
            }
        }
        else if (coordinates[0].x > coordinates[1].x) {
            coordinate = {
                x: 0,
                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: 0, y: coordinates[0].y })
            };
        }
        else {
            coordinate = {
                x: bounding.width,
                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: bounding.width, y: coordinates[0].y })
            };
        }
        return { coordinates: [coordinates[0], coordinate] };
    }
    return [];
}
var rayLine = {
    name: 'rayLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        return [
            {
                type: 'line',
                attrs: getRayLine(coordinates, bounding)
            }
        ];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var segment = {
    name: 'segment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates;
        if (coordinates.length === 2) {
            return [
                {
                    type: 'line',
                    attrs: { coordinates: coordinates }
                }
            ];
        }
        return [];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var straightLine = {
    name: 'straightLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        if (coordinates.length === 2) {
            if (coordinates[0].x === coordinates[1].x) {
                return [
                    {
                        type: 'line',
                        attrs: {
                            coordinates: [
                                {
                                    x: coordinates[0].x,
                                    y: 0
                                }, {
                                    x: coordinates[0].x,
                                    y: bounding.height
                                }
                            ]
                        }
                    }
                ];
            }
            return [
                {
                    type: 'line',
                    attrs: {
                        coordinates: [
                            {
                                x: 0,
                                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: 0, y: coordinates[0].y })
                            }, {
                                x: bounding.width,
                                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: bounding.width, y: coordinates[0].y })
                            }
                        ]
                    }
                }
            ];
        }
        return [];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var verticalRayLine = {
    name: 'verticalRayLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        if (coordinates.length === 2) {
            var coordinate = { x: coordinates[0].x, y: 0 };
            if (coordinates[0].y < coordinates[1].y) {
                coordinate.y = bounding.height;
            }
            return [
                {
                    type: 'line',
                    attrs: { coordinates: [coordinates[0], coordinate] }
                }
            ];
        }
        return [];
    },
    performEventPressedMove: function (_a) {
        var points = _a.points, performPoint = _a.performPoint;
        points[0].timestamp = performPoint.timestamp;
        points[0].dataIndex = performPoint.dataIndex;
        points[1].timestamp = performPoint.timestamp;
        points[1].dataIndex = performPoint.dataIndex;
    },
    performEventMoveForDrawing: function (_a) {
        var currentStep = _a.currentStep, points = _a.points, performPoint = _a.performPoint;
        if (currentStep === 2) {
            points[0].timestamp = performPoint.timestamp;
            points[0].dataIndex = performPoint.dataIndex;
        }
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var verticalSegment = {
    name: 'verticalSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates;
        if (coordinates.length === 2) {
            return [
                {
                    type: 'line',
                    attrs: { coordinates: coordinates }
                }
            ];
        }
        return [];
    },
    performEventPressedMove: function (_a) {
        var points = _a.points, performPoint = _a.performPoint;
        points[0].timestamp = performPoint.timestamp;
        points[0].dataIndex = performPoint.dataIndex;
        points[1].timestamp = performPoint.timestamp;
        points[1].dataIndex = performPoint.dataIndex;
    },
    performEventMoveForDrawing: function (_a) {
        var currentStep = _a.currentStep, points = _a.points, performPoint = _a.performPoint;
        if (currentStep === 2) {
            points[0].timestamp = performPoint.timestamp;
            points[0].dataIndex = performPoint.dataIndex;
        }
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var verticalStraightLine = {
    name: 'verticalStraightLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: function (_a) {
        var coordinates = _a.coordinates, bounding = _a.bounding;
        return [
            {
                type: 'line',
                attrs: {
                    coordinates: [
                        {
                            x: coordinates[0].x,
                            y: 0
                        }, {
                            x: coordinates[0].x,
                            y: bounding.height
                        }
                    ]
                }
            }
        ];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var simpleAnnotation = {
    name: 'simpleAnnotation',
    totalStep: 2,
    createPointFigures: function (_a) {
        var _b;
        var overlay = _a.overlay, coordinates = _a.coordinates;
        var text;
        if (isValid(overlay.extendData)) {
            if (!isFunction(overlay.extendData)) {
                text = (_b = overlay.extendData) !== null && _b !== void 0 ? _b : '';
            }
            else {
                text = overlay.extendData(overlay);
            }
        }
        var startX = coordinates[0].x;
        var startY = coordinates[0].y - 6;
        var lineEndY = startY - 50;
        var arrowEndY = lineEndY - 5;
        return [
            {
                type: 'line',
                attrs: { coordinates: [{ x: startX, y: startY }, { x: startX, y: lineEndY }] },
                ignoreEvent: true
            },
            {
                type: 'polygon',
                attrs: { coordinates: [{ x: startX, y: lineEndY }, { x: startX - 4, y: arrowEndY }, { x: startX + 4, y: arrowEndY }] },
                ignoreEvent: true
            },
            {
                type: 'rectText',
                attrs: { x: startX, y: arrowEndY, text: text !== null && text !== void 0 ? text : '', align: 'center', baseline: 'bottom' },
                ignoreEvent: true
            }
        ];
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var simpleTag = {
    name: 'simpleTag',
    totalStep: 2,
    createPointFigures: function (_a) {
        var bounding = _a.bounding, coordinates = _a.coordinates;
        return {
            type: 'line',
            attrs: {
                coordinates: [
                    { x: 0, y: coordinates[0].y },
                    { x: bounding.width, y: coordinates[0].y }
                ]
            },
            ignoreEvent: true
        };
    },
    createYAxisFigures: function (_a) {
        var _b, _c;
        var overlay = _a.overlay, coordinates = _a.coordinates, bounding = _a.bounding, yAxis = _a.yAxis, precision = _a.precision;
        var isFromZero = (_b = yAxis === null || yAxis === void 0 ? void 0 : yAxis.isFromZero()) !== null && _b !== void 0 ? _b : false;
        var textAlign;
        var x;
        if (isFromZero) {
            textAlign = 'left';
            x = 0;
        }
        else {
            textAlign = 'right';
            x = bounding.width;
        }
        var text;
        if (isValid(overlay.extendData)) {
            if (!isFunction(overlay.extendData)) {
                text = (_c = overlay.extendData) !== null && _c !== void 0 ? _c : '';
            }
            else {
                text = overlay.extendData(overlay);
            }
        }
        if (!isValid(text) && overlay.points[0].value !== undefined) {
            text = formatPrecision(overlay.points[0].value, precision.price);
        }
        return { type: 'rectText', attrs: { x: x, y: coordinates[0].y, text: text !== null && text !== void 0 ? text : '', align: textAlign, baseline: 'middle' } };
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var overlays = {};
var extensions$1 = [
    fibonacciLine, horizontalRayLine, horizontalSegment, horizontalStraightLine,
    parallelStraightLine, priceChannelLine, priceLine, rayLine, segment,
    straightLine, verticalRayLine, verticalSegment, verticalStraightLine,
    simpleAnnotation, simpleTag
];
extensions$1.forEach(function (template) {
    overlays[template.name] = OverlayImp.extend(template);
});
function registerOverlay(template) {
    overlays[template.name] = OverlayImp.extend(template);
}
function getOverlayClass(name) {
    var _a;
    return (_a = overlays[name]) !== null && _a !== void 0 ? _a : null;
}
function getSupportedOverlays() {
    return Object.keys(overlays);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getDefaultBounding(bounding) {
    var defaultBounding = {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    if (bounding !== undefined) {
        merge(defaultBounding, bounding);
    }
    return defaultBounding;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var WidgetNameConstants = {
    MAIN: 'main',
    XAXIS: 'xAxis',
    YAXIS: 'yAxis',
    SEPARATOR: 'separator'
};
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(rootContainer, pane) {
        var _this = _super.call(this) || this;
        _this._bounding = getDefaultBounding();
        _this._pane = pane;
        _this._init(rootContainer);
        return _this;
    }
    Widget.prototype._init = function (rootContainer) {
        this._container = createDom('div', this.getContainerStyle());
        if (this.insertBefore()) {
            var lastElement = rootContainer.lastChild;
            if (lastElement !== null) {
                rootContainer.insertBefore(this._container, lastElement);
            }
            else {
                rootContainer.appendChild(this._container);
            }
        }
        else {
            rootContainer.appendChild(this._container);
        }
        this.initDom(this._container);
    };
    Widget.prototype.setBounding = function (bounding) {
        merge(this._bounding, bounding);
        return this;
    };
    Widget.prototype.getContainer = function () { return this._container; };
    Widget.prototype.getBounding = function () {
        return this._bounding;
    };
    Widget.prototype.getPane = function () {
        return this._pane;
    };
    Widget.prototype.update = function (level) {
        this.updateImp(level, this._container, this._bounding);
    };
    Widget.prototype.insertBefore = function () { return false; };
    return Widget;
}(Eventful));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function throttle(func, wait) {
    var previous = 0;
    return function () {
        var now = Date.now();
        if (now - previous > (wait !== null && wait !== void 0 ? wait : 20)) {
            func.apply(this, arguments);
            previous = now;
        }
    };
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var REAL_SEPARATOR_HEIGHT = 7;
var SeparatorWidget = /** @class */ (function (_super) {
    __extends(SeparatorWidget, _super);
    function SeparatorWidget(rootContainer, pane) {
        var _this = _super.call(this, rootContainer, pane) || this;
        _this._dragFlag = false;
        _this._dragStartY = 0;
        _this._topPaneHeight = 0;
        _this._currentPaneHeight = 0;
        _this._pressedMouseMoveEvent = throttle(_this._pressedTouchMouseMoveEvent, 20);
        _this.registerEvent('touchStartEvent', _this._mouseDownEvent.bind(_this))
            .registerEvent('touchMoveEvent', _this._pressedMouseMoveEvent.bind(_this))
            .registerEvent('touchEndEvent', _this._mouseUpEvent.bind(_this))
            .registerEvent('mouseDownEvent', _this._mouseDownEvent.bind(_this))
            .registerEvent('mouseUpEvent', _this._mouseUpEvent.bind(_this))
            .registerEvent('pressedMouseMoveEvent', _this._pressedMouseMoveEvent.bind(_this))
            .registerEvent('mouseEnterEvent', _this._mouseEnterEvent.bind(_this))
            .registerEvent('mouseLeaveEvent', _this._mouseLeaveEvent.bind(_this));
        return _this;
    }
    SeparatorWidget.prototype.getName = function () {
        return WidgetNameConstants.SEPARATOR;
    };
    SeparatorWidget.prototype.checkEventOn = function () {
        return true;
    };
    SeparatorWidget.prototype._mouseDownEvent = function (event) {
        var _a, _b;
        this._dragFlag = true;
        this._dragStartY = event.pageY;
        var pane = this.getPane();
        this._topPaneHeight = (_b = (_a = pane.getTopPane()) === null || _a === void 0 ? void 0 : _a.getBounding().height) !== null && _b !== void 0 ? _b : 0;
        this._currentPaneHeight = pane.getBounding().height;
        return true;
    };
    SeparatorWidget.prototype._mouseUpEvent = function () {
        this._dragFlag = false;
        return this._mouseLeaveEvent();
    };
    SeparatorWidget.prototype._pressedTouchMouseMoveEvent = function (event) {
        var dragDistance = event.pageY - this._dragStartY;
        var currentPane = this.getPane();
        var topPane = currentPane.getTopPane();
        var isUpDrag = dragDistance < 0;
        if (topPane !== null && currentPane.getOptions().dragEnabled) {
            var reducedPane = void 0;
            var increasedPane = void 0;
            var startDragReducedPaneHeight = void 0;
            var startDragIncreasedPaneHeight = void 0;
            if (isUpDrag) {
                reducedPane = topPane;
                increasedPane = currentPane;
                startDragReducedPaneHeight = this._topPaneHeight;
                startDragIncreasedPaneHeight = this._currentPaneHeight;
            }
            else {
                reducedPane = currentPane;
                increasedPane = topPane;
                startDragReducedPaneHeight = this._currentPaneHeight;
                startDragIncreasedPaneHeight = this._topPaneHeight;
            }
            var reducedPaneMinHeight = reducedPane.getOptions().minHeight;
            if (startDragReducedPaneHeight > reducedPaneMinHeight) {
                var reducedPaneHeight = Math.max(startDragReducedPaneHeight - Math.abs(dragDistance), reducedPaneMinHeight);
                var diffHeight = startDragReducedPaneHeight - reducedPaneHeight;
                reducedPane.setBounding({ height: reducedPaneHeight });
                increasedPane.setBounding({ height: startDragIncreasedPaneHeight + diffHeight });
                var chart = currentPane.getChart();
                chart.getChartStore().getActionStore().execute(exports.ActionType.OnPaneDrag, { paneId: currentPane.getId });
                chart.adjustPaneViewport(true, true, true, true, true);
            }
        }
        return true;
    };
    SeparatorWidget.prototype._mouseEnterEvent = function () {
        var pane = this.getPane();
        if (pane.getOptions().dragEnabled) {
            var chart = pane.getChart();
            var styles = chart.getStyles().separator;
            this._moveDom.style.background = styles.activeBackgroundColor;
            return true;
        }
        return false;
    };
    SeparatorWidget.prototype._mouseLeaveEvent = function () {
        if (!this._dragFlag) {
            this._moveDom.style.background = '';
            return true;
        }
        return false;
    };
    SeparatorWidget.prototype.getContainerStyle = function () {
        return {
            margin: '0',
            padding: '0',
            position: 'relative',
            boxSizing: 'border-box'
        };
    };
    SeparatorWidget.prototype.insertBefore = function () { return true; };
    SeparatorWidget.prototype.initDom = function (container) {
        this._moveDom = createDom('div', {
            width: '100%',
            height: "".concat(REAL_SEPARATOR_HEIGHT, "px"),
            margin: '0',
            padding: '0',
            position: 'absolute',
            top: '-3px',
            zIndex: '20',
            boxSizing: 'border-box',
            cursor: 'ns-resize'
        });
        container.appendChild(this._moveDom);
    };
    SeparatorWidget.prototype.updateImp = function (level, container, bounding) {
        if (level === 4 /* UpdateLevel.All */ || level === 2 /* UpdateLevel.Separator */) {
            var styles = this.getPane().getChart().getStyles().separator;
            this._moveDom.style.top = "".concat(-Math.floor((REAL_SEPARATOR_HEIGHT - styles.size) / 2), "px");
            this._moveDom.style.height = "".concat(REAL_SEPARATOR_HEIGHT, "px");
            var fill = styles.fill;
            container.style.backgroundColor = styles.color;
            container.style.height = "".concat(styles.size, "px");
            container.style.marginLeft = "".concat(fill ? 0 : bounding.left, "px");
            container.style.width = fill ? '100%' : "".concat(bounding.width, "px");
        }
    };
    SeparatorWidget.prototype.getImage = function () {
        var styles = this.getPane().getChart().getStyles().separator;
        var width = this.getContainer().offsetWidth;
        var height = styles.size;
        var canvas = createDom('canvas', {
            width: "".concat(width, "px"),
            height: "".concat(height, "px"),
            boxSizing: 'border-box'
        });
        var ctx = canvas.getContext('2d');
        var pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        ctx.fillStyle = styles.color;
        ctx.fillRect(this.getBounding().left, 0, width, height);
        return canvas;
    };
    return SeparatorWidget;
}(Widget));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PANE_MIN_HEIGHT = 30;
var PANE_DEFAULT_HEIGHT = 100;
var PaneIdConstants = {
    CANDLE: 'candle_pane',
    INDICATOR: 'indicator_pane_',
    XAXIS: 'xaxis_pane'
};
var Pane = /** @class */ (function () {
    function Pane(rootContainer, chart, id, topPane, bottomPane) {
        this._yAxisWidget = null;
        this._separatorWidget = null;
        this._axis = this.createAxisComponent();
        this._bounding = getDefaultBounding();
        this._options = { minHeight: PANE_MIN_HEIGHT, dragEnabled: true, gap: { top: 0.2, bottom: 0.1 }, axisOptions: { scrollZoomEnabled: true } };
        this._chart = chart;
        this._id = id;
        this._topPane = topPane !== null && topPane !== void 0 ? topPane : null;
        this._bottomPane = bottomPane !== null && bottomPane !== void 0 ? bottomPane : null;
        this._init(rootContainer);
    }
    Pane.prototype._init = function (rootContainer) {
        this._container = rootContainer;
        this._seriesContiainer = createDom('div', {
            width: '100%',
            margin: '0',
            padding: '0',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        });
        this._separatorWidget = this.createSeparatorWidget(rootContainer);
        var lastElement = rootContainer.lastChild;
        if (lastElement !== null) {
            rootContainer.insertBefore(this._seriesContiainer, lastElement);
        }
        else {
            rootContainer.appendChild(this._seriesContiainer);
        }
        this._mainWidget = this.createMainWidget(this._seriesContiainer);
        this._yAxisWidget = this.creatYAxisWidget(this._seriesContiainer);
    };
    Pane.prototype.getContainer = function () {
        return this._seriesContiainer;
    };
    Pane.prototype.getId = function () {
        return this._id;
    };
    Pane.prototype.setOptions = function (options) {
        var _a, _b, _c;
        merge(this._options, options);
        var container;
        var cursor;
        if (this.getId() === PaneIdConstants.XAXIS) {
            container = this.getMainWidget().getContainer();
            cursor = 'ew-resize';
        }
        else {
            container = (_a = this.getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getContainer();
            cursor = 'ns-resize';
        }
        if ((_c = (_b = options.axisOptions) === null || _b === void 0 ? void 0 : _b.scrollZoomEnabled) !== null && _c !== void 0 ? _c : true) {
            container.style.cursor = cursor;
        }
        else {
            container.style.cursor = 'default';
        }
        return this;
    };
    Pane.prototype.getOptions = function () { return this._options; };
    Pane.prototype.getChart = function () {
        return this._chart;
    };
    Pane.prototype.getAxisComponent = function () {
        return this._axis;
    };
    Pane.prototype.setBounding = function (rootBounding, mainBounding, yAxisBounding) {
        var _a, _b, _c;
        merge(this._bounding, rootBounding);
        var separatorSize = 0;
        if (this._separatorWidget !== null) {
            separatorSize = this._chart.getStyles().separator.size;
            var separatorBounding = __assign(__assign({}, rootBounding), { height: REAL_SEPARATOR_HEIGHT });
            if (rootBounding.top !== undefined) {
                separatorBounding.top = rootBounding.top - Math.floor((REAL_SEPARATOR_HEIGHT - separatorSize) / 2);
            }
            this._separatorWidget.setBounding(separatorBounding);
        }
        var contentBounding = {};
        if (rootBounding.height !== undefined) {
            contentBounding.height = rootBounding.height - separatorSize;
        }
        if (rootBounding.top !== undefined) {
            contentBounding.top = rootBounding.top + separatorSize;
        }
        this._mainWidget.setBounding(contentBounding);
        (_a = this._yAxisWidget) === null || _a === void 0 ? void 0 : _a.setBounding(contentBounding);
        if (mainBounding !== undefined) {
            this._mainWidget.setBounding(mainBounding);
            (_b = this._separatorWidget) === null || _b === void 0 ? void 0 : _b.setBounding(mainBounding);
        }
        if (yAxisBounding !== undefined) {
            (_c = this._yAxisWidget) === null || _c === void 0 ? void 0 : _c.setBounding(yAxisBounding);
        }
        return this;
    };
    Pane.prototype.getTopPane = function () {
        return this._topPane;
    };
    Pane.prototype.setTopPane = function (pane) {
        this._topPane = pane;
        return this;
    };
    Pane.prototype.getBottomPane = function () {
        return this._bottomPane;
    };
    Pane.prototype.setBottomPane = function (pane) {
        this._bottomPane = pane;
        return this;
    };
    Pane.prototype.getBounding = function () {
        return this._bounding;
    };
    Pane.prototype.getMainWidget = function () { return this._mainWidget; };
    Pane.prototype.getYAxisWidget = function () { return this._yAxisWidget; };
    Pane.prototype.getSeparatorWidget = function () { return this._separatorWidget; };
    Pane.prototype.update = function (level) {
        var _a, _b;
        if (this._bounding.width !== this._seriesContiainer.offsetWidth) {
            this._seriesContiainer.style.width = "".concat(this._bounding.width, "px");
        }
        var seriesHeight = this._mainWidget.getBounding().height;
        if (seriesHeight !== this._seriesContiainer.offsetHeight) {
            this._seriesContiainer.style.height = "".concat(seriesHeight, "px");
        }
        var l = level !== null && level !== void 0 ? level : 3 /* UpdateLevel.Drawer */;
        this._mainWidget.update(l);
        (_a = this._yAxisWidget) === null || _a === void 0 ? void 0 : _a.update(l);
        (_b = this._separatorWidget) === null || _b === void 0 ? void 0 : _b.update(l);
    };
    Pane.prototype.getImage = function (includeOverlay) {
        var _a = this._bounding, width = _a.width, height = _a.height;
        var canvas = createDom('canvas', {
            width: "".concat(width, "px"),
            height: "".concat(height, "px"),
            boxSizing: 'border-box'
        });
        var ctx = canvas.getContext('2d');
        var pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        var top = 0;
        if (this._separatorWidget != null) {
            var separatorHeight = this.getChart().getStyles().separator.size;
            top = separatorHeight;
            ctx.drawImage(this._separatorWidget.getImage(), 0, 0, width, separatorHeight);
        }
        var mainBounding = this._mainWidget.getBounding();
        ctx.drawImage(this._mainWidget.getImage(includeOverlay), mainBounding.left, top, mainBounding.width, mainBounding.height);
        if (this._yAxisWidget !== null) {
            var yAxisBounding = this._yAxisWidget.getBounding();
            ctx.drawImage(this._yAxisWidget.getImage(includeOverlay), yAxisBounding.left, top, yAxisBounding.width, yAxisBounding.height);
        }
        return canvas;
    };
    Pane.prototype.destroy = function () {
        this._container.removeChild(this._seriesContiainer);
        if (this._separatorWidget !== null) {
            this._container.removeChild(this._separatorWidget.getContainer());
        }
    };
    Pane.prototype.createSeparatorWidget = function (_container) { return null; };
    Pane.prototype.creatYAxisWidget = function (_container) { return null; };
    return Pane;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OverlayStore = /** @class */ (function () {
    function OverlayStore(chartStore) {
        this._instances = new Map();
        this._counter = new Map();
        /**
         * Overlay information in painting
         */
        this._progressInstanceInfo = null;
        /**
         * Overlay information by the mouse pressed
         */
        this._pressedInstanceInfo = {
            paneId: '',
            instance: null,
            figureType: 0 /* EventOverlayInfoFigureType.None */,
            figureKey: '',
            figureIndex: -1,
            attrsIndex: -1
        };
        /**
         * Overlay information by hover
         */
        this._hoverInstanceInfo = {
            paneId: '',
            instance: null,
            figureType: 0 /* EventOverlayInfoFigureType.None */,
            figureKey: '',
            figureIndex: -1,
            attrsIndex: -1
        };
        /**
         * Overlay information by the mouse click
         */
        this._clickInstanceInfo = {
            paneId: '',
            instance: null,
            figureType: 0 /* EventOverlayInfoFigureType.None */,
            figureKey: '',
            figureIndex: -1,
            attrsIndex: -1
        };
        this._chartStore = chartStore;
    }
    OverlayStore.prototype._overrideInstance = function (instance, overlay) {
        var id = overlay.id, groupId = overlay.groupId, points = overlay.points, styles = overlay.styles, lock = overlay.lock, visible = overlay.visible, zLevel = overlay.zLevel, mode = overlay.mode, modeSensitivity = overlay.modeSensitivity, extendData = overlay.extendData, onDrawStart = overlay.onDrawStart, onDrawing = overlay.onDrawing, onDrawEnd = overlay.onDrawEnd, onClick = overlay.onClick, onDoubleClick = overlay.onDoubleClick, onRightClick = overlay.onRightClick, onPressedMoveStart = overlay.onPressedMoveStart, onPressedMoving = overlay.onPressedMoving, onPressedMoveEnd = overlay.onPressedMoveEnd, onMouseEnter = overlay.onMouseEnter, onMouseLeave = overlay.onMouseLeave, onRemoved = overlay.onRemoved, onSelected = overlay.onSelected, onDeselected = overlay.onDeselected;
        var updateFlag = false;
        var sortFlag = false;
        if (id !== undefined) {
            instance.setId(id);
        }
        if (groupId !== undefined) {
            instance.setGroupId(groupId);
        }
        if (points !== undefined && instance.setPoints(points)) {
            updateFlag = true;
        }
        if (styles !== undefined && instance.setStyles(styles)) {
            updateFlag = true;
        }
        if (lock !== undefined) {
            instance.setLock(lock);
        }
        if (visible !== undefined && instance.setVisible(visible)) {
            updateFlag = true;
        }
        if (zLevel !== undefined && instance.setZLevel(zLevel)) {
            updateFlag = true;
            sortFlag = true;
        }
        if (mode !== undefined) {
            instance.setMode(mode);
        }
        if (modeSensitivity !== undefined) {
            instance.setModeSensitivity(modeSensitivity);
        }
        if (extendData !== undefined && instance.setExtendData(extendData)) {
            updateFlag = true;
        }
        if (onDrawStart !== undefined) {
            instance.setOnDrawStartCallback(onDrawStart);
        }
        if (onDrawing !== undefined) {
            instance.setOnDrawingCallback(onDrawing);
        }
        if (onDrawEnd !== undefined) {
            instance.setOnDrawEndCallback(onDrawEnd);
        }
        if (onClick !== undefined) {
            instance.setOnClickCallback(onClick);
        }
        if (onDoubleClick !== undefined) {
            instance.setOnDoubleClickCallback(onDoubleClick);
        }
        if (onRightClick !== undefined) {
            instance.setOnRightClickCallback(onRightClick);
        }
        if (onPressedMoveStart !== undefined) {
            instance.setOnPressedMoveStartCallback(onPressedMoveStart);
        }
        if (onPressedMoving !== undefined) {
            instance.setOnPressedMovingCallback(onPressedMoving);
        }
        if (onPressedMoveEnd !== undefined) {
            instance.setOnPressedMoveEndCallback(onPressedMoveEnd);
        }
        if (onMouseEnter !== undefined) {
            instance.setOnMouseEnterCallback(onMouseEnter);
        }
        if (onMouseLeave !== undefined) {
            instance.setOnMouseLeaveCallback(onMouseLeave);
        }
        if (onRemoved !== undefined) {
            instance.setOnRemovedCallback(onRemoved);
        }
        if (onSelected !== undefined) {
            instance.setOnSelectedCallback(onSelected);
        }
        if (onDeselected !== undefined) {
            instance.setOnDeselectedCallback(onDeselected);
        }
        return [updateFlag, sortFlag];
    };
    OverlayStore.prototype.getInstanceById = function (id) {
        var e_1, _a;
        try {
            for (var _b = __values(this._instances), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                var paneShapes = entry[1];
                var shape = paneShapes.find(function (s) { return s.id === id; });
                if (shape !== undefined) {
                    return shape;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this._progressInstanceInfo !== null) {
            if (this._progressInstanceInfo.instance.id === id) {
                return this._progressInstanceInfo.instance;
            }
        }
        return null;
    };
    OverlayStore.prototype._sort = function (paneId) {
        var _a;
        if (paneId !== undefined) {
            (_a = this._instances.get(paneId)) === null || _a === void 0 ? void 0 : _a.sort(function (o1, o2) { return o1.defaultZLevel - o2.defaultZLevel; }).sort(function (o1, o2) { return o1.zLevel - o2.zLevel; });
        }
        else {
            this._instances.forEach(function (paneInstances) {
                paneInstances.sort(function (o1, o2) { return o1.defaultZLevel - o2.defaultZLevel; }).sort(function (o1, o2) { return o1.zLevel - o2.zLevel; });
            });
        }
    };
    OverlayStore.prototype.addInstances = function (overlays, paneId, appointPaneFlag) {
        var _this = this;
        var ids = overlays.map(function (overlay) {
            var _a, _b, _c, _d, _e;
            var id = (_a = overlay.id) !== null && _a !== void 0 ? _a : createId(OVERLAY_ID_PREFIX);
            if (_this.getInstanceById(id) === null) {
                var OverlayClazz = getOverlayClass(overlay.name);
                if (OverlayClazz !== null) {
                    var instance = new OverlayClazz();
                    var count = ((_b = _this._counter.get(paneId)) !== null && _b !== void 0 ? _b : 0) + 1;
                    _this._counter.set(paneId, count);
                    instance.setDefaultZLevel(count);
                    instance.setPaneId(paneId);
                    var groupId = (_c = overlay.groupId) !== null && _c !== void 0 ? _c : id;
                    overlay.id = id;
                    overlay.groupId = groupId;
                    _this._overrideInstance(instance, overlay);
                    if (instance.isDrawing()) {
                        _this._progressInstanceInfo = { paneId: paneId, instance: instance, appointPaneFlag: appointPaneFlag };
                    }
                    else {
                        if (!_this._instances.has(paneId)) {
                            _this._instances.set(paneId, []);
                        }
                        (_d = _this._instances.get(paneId)) === null || _d === void 0 ? void 0 : _d.push(instance);
                    }
                    if (instance.isStart()) {
                        (_e = instance.onDrawStart) === null || _e === void 0 ? void 0 : _e.call(instance, ({ overlay: instance }));
                    }
                    return id;
                }
            }
            return null;
        });
        if (ids.some(function (id) { return id !== null; })) {
            this._sort();
            this._chartStore.getChart().updatePane(1 /* UpdateLevel.Overlay */, paneId);
        }
        return ids;
    };
    OverlayStore.prototype.getProgressInstanceInfo = function () {
        return this._progressInstanceInfo;
    };
    OverlayStore.prototype.progressInstanceComplete = function () {
        var _a;
        if (this._progressInstanceInfo !== null) {
            var _b = this._progressInstanceInfo, instance = _b.instance, paneId = _b.paneId;
            if (!instance.isDrawing()) {
                if (!this._instances.has(paneId)) {
                    this._instances.set(paneId, []);
                }
                (_a = this._instances.get(paneId)) === null || _a === void 0 ? void 0 : _a.push(instance);
                this._sort(paneId);
                this._progressInstanceInfo = null;
            }
        }
    };
    OverlayStore.prototype.updateProgressInstanceInfo = function (paneId, appointPaneFlag) {
        if (this._progressInstanceInfo !== null) {
            if (appointPaneFlag !== undefined && appointPaneFlag) {
                this._progressInstanceInfo.appointPaneFlag = appointPaneFlag;
            }
            this._progressInstanceInfo.paneId = paneId;
            this._progressInstanceInfo.instance.setPaneId(paneId);
        }
    };
    OverlayStore.prototype.getInstances = function (paneId) {
        var _a;
        if (paneId === undefined) {
            var instances_1 = [];
            this._instances.forEach(function (paneInstances) {
                instances_1 = instances_1.concat(paneInstances);
            });
            return instances_1;
        }
        return (_a = this._instances.get(paneId)) !== null && _a !== void 0 ? _a : [];
    };
    OverlayStore.prototype.override = function (overlay) {
        var _this = this;
        var id = overlay.id, groupId = overlay.groupId, name = overlay.name;
        var updateFlag = false;
        var sortFlag = false;
        var setFlag = function (instance) {
            var flags = _this._overrideInstance(instance, overlay);
            if (flags[0]) {
                updateFlag = true;
            }
            if (flags[1]) {
                sortFlag = true;
            }
        };
        if (id !== undefined) {
            var instance = this.getInstanceById(id);
            if (instance !== null) {
                setFlag(instance);
            }
        }
        else {
            this._instances.forEach(function (paneInstances) {
                paneInstances.forEach(function (instance) {
                    if ((name !== undefined && instance.name === name) ||
                        (groupId !== undefined && instance.groupId === groupId) ||
                        (name === undefined && groupId === undefined)) {
                        setFlag(instance);
                    }
                });
            });
            if (this._progressInstanceInfo !== null) {
                var progressInstance = this._progressInstanceInfo.instance;
                if ((name !== undefined && progressInstance.name === name) ||
                    (groupId !== undefined && progressInstance.groupId === groupId) ||
                    (name === undefined && groupId === undefined)) {
                    setFlag(progressInstance);
                }
            }
        }
        if (sortFlag) {
            this._sort();
        }
        if (updateFlag) {
            this._chartStore.getChart().updatePane(1 /* UpdateLevel.Overlay */);
        }
    };
    OverlayStore.prototype.removeInstance = function (overlayRemove) {
        var e_2, _a;
        var _b;
        var match = function (remove, overlay) {
            if (remove.id !== undefined) {
                if (overlay.id !== remove.id) {
                    return false;
                }
            }
            else {
                if (remove.groupId !== undefined) {
                    if (overlay.groupId !== remove.groupId) {
                        return false;
                    }
                }
                else {
                    if (remove.name !== undefined) {
                        if (overlay.name !== remove.name) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        var updatePaneIds = [];
        if (this._progressInstanceInfo !== null) {
            var instance = this._progressInstanceInfo.instance;
            if (overlayRemove === undefined ||
                (overlayRemove !== undefined && match(overlayRemove, instance))) {
                updatePaneIds.push(this._progressInstanceInfo.paneId);
                (_b = instance.onRemoved) === null || _b === void 0 ? void 0 : _b.call(instance, { overlay: instance });
                this._progressInstanceInfo = null;
            }
        }
        if (overlayRemove !== undefined) {
            var instances = new Map();
            var _loop_1 = function (entry) {
                var paneInstances = entry[1];
                var newPaneInstances = paneInstances.filter(function (instance) {
                    var _a;
                    if (match(overlayRemove, instance)) {
                        if (!updatePaneIds.includes(entry[0])) {
                            updatePaneIds.push(entry[0]);
                        }
                        (_a = instance.onRemoved) === null || _a === void 0 ? void 0 : _a.call(instance, { overlay: instance });
                        return false;
                    }
                    return true;
                });
                if (newPaneInstances.length > 0) {
                    instances.set(entry[0], newPaneInstances);
                }
            };
            try {
                for (var _c = __values(this._instances), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var entry = _d.value;
                    _loop_1(entry);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this._instances = instances;
        }
        else {
            this._instances.forEach(function (paneInstances, paneId) {
                updatePaneIds.push(paneId);
                paneInstances.forEach(function (instance) {
                    var _a;
                    (_a = instance.onRemoved) === null || _a === void 0 ? void 0 : _a.call(instance, { overlay: instance });
                });
            });
            this._instances.clear();
        }
        if (updatePaneIds.length > 0) {
            var chart_1 = this._chartStore.getChart();
            updatePaneIds.forEach(function (paneId) {
                chart_1.updatePane(1 /* UpdateLevel.Overlay */, paneId);
            });
            chart_1.updatePane(1 /* UpdateLevel.Overlay */, PaneIdConstants.XAXIS);
        }
    };
    OverlayStore.prototype.setPressedInstanceInfo = function (info) {
        this._pressedInstanceInfo = info;
    };
    OverlayStore.prototype.getPressedInstanceInfo = function () {
        return this._pressedInstanceInfo;
    };
    OverlayStore.prototype.setHoverInstanceInfo = function (info, event) {
        var _a, _b;
        var _c = this._hoverInstanceInfo, instance = _c.instance, figureType = _c.figureType, figureKey = _c.figureKey, figureIndex = _c.figureIndex;
        if ((instance === null || instance === void 0 ? void 0 : instance.id) !== ((_a = info.instance) === null || _a === void 0 ? void 0 : _a.id) ||
            figureType !== info.figureType ||
            figureIndex !== info.figureIndex) {
            this._hoverInstanceInfo = info;
            if ((instance === null || instance === void 0 ? void 0 : instance.id) !== ((_b = info.instance) === null || _b === void 0 ? void 0 : _b.id)) {
                var ignoreUpdateFlag = false;
                var sortFlag = false;
                if (instance !== null) {
                    sortFlag = true;
                    instance.resetZLevel();
                    if (isFunction(instance.onMouseLeave)) {
                        instance.onMouseLeave(__assign({ overlay: instance, figureKey: figureKey, figureIndex: figureIndex }, event));
                        ignoreUpdateFlag = true;
                    }
                }
                if (info.instance !== null) {
                    sortFlag = true;
                    info.instance.setZLevel(OVERLAY_ACTIVE_Z_LEVEL);
                    if (isFunction(info.instance.onMouseEnter)) {
                        info.instance.onMouseEnter(__assign({ overlay: info.instance, figureKey: info.figureKey, figureIndex: info.figureIndex }, event));
                        ignoreUpdateFlag = true;
                    }
                }
                if (sortFlag) {
                    this._sort();
                }
                if (!ignoreUpdateFlag) {
                    this._chartStore.getChart().updatePane(1 /* UpdateLevel.Overlay */);
                }
            }
        }
    };
    OverlayStore.prototype.getHoverInstanceInfo = function () {
        return this._hoverInstanceInfo;
    };
    OverlayStore.prototype.setClickInstanceInfo = function (info, event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var _k = this._clickInstanceInfo, paneId = _k.paneId, instance = _k.instance, figureType = _k.figureType, figureKey = _k.figureKey, figureIndex = _k.figureIndex;
        if (!((_b = (_a = info.instance) === null || _a === void 0 ? void 0 : _a.isDrawing()) !== null && _b !== void 0 ? _b : false)) {
            (_d = (_c = info.instance) === null || _c === void 0 ? void 0 : _c.onClick) === null || _d === void 0 ? void 0 : _d.call(_c, __assign({ overlay: info.instance, figureKey: info.figureKey, figureIndex: info.figureIndex }, event));
        }
        if ((instance === null || instance === void 0 ? void 0 : instance.id) !== ((_e = info.instance) === null || _e === void 0 ? void 0 : _e.id) || figureType !== info.figureType || figureIndex !== info.figureIndex) {
            this._clickInstanceInfo = info;
            if ((instance === null || instance === void 0 ? void 0 : instance.id) !== ((_f = info.instance) === null || _f === void 0 ? void 0 : _f.id)) {
                (_g = instance === null || instance === void 0 ? void 0 : instance.onDeselected) === null || _g === void 0 ? void 0 : _g.call(instance, __assign({ overlay: instance, figureKey: figureKey, figureIndex: figureIndex }, event));
                (_j = (_h = info.instance) === null || _h === void 0 ? void 0 : _h.onSelected) === null || _j === void 0 ? void 0 : _j.call(_h, __assign({ overlay: info.instance, figureKey: info.figureKey, figureIndex: info.figureIndex }, event));
                var chart = this._chartStore.getChart();
                chart.updatePane(1 /* UpdateLevel.Overlay */, info.paneId);
                if (paneId !== info.paneId) {
                    chart.updatePane(1 /* UpdateLevel.Overlay */, paneId);
                }
                chart.updatePane(1 /* UpdateLevel.Overlay */, PaneIdConstants.XAXIS);
            }
        }
    };
    OverlayStore.prototype.getClickInstanceInfo = function () {
        return this._clickInstanceInfo;
    };
    OverlayStore.prototype.isEmpty = function () {
        return this._instances.size === 0 && this._progressInstanceInfo === null;
    };
    OverlayStore.prototype.isDrawing = function () {
        var _a, _b;
        return this._progressInstanceInfo !== null && ((_b = (_a = this._progressInstanceInfo) === null || _a === void 0 ? void 0 : _a.instance.isDrawing()) !== null && _b !== void 0 ? _b : false);
    };
    return OverlayStore;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ActionStore = /** @class */ (function () {
    function ActionStore() {
        /**
         * Chart action map
         */
        this._actions = new Map();
    }
    ActionStore.prototype.execute = function (type, data) {
        var _a;
        (_a = this._actions.get(type)) === null || _a === void 0 ? void 0 : _a.execute(data);
    };
    ActionStore.prototype.subscribe = function (type, callback) {
        var _a;
        if (!this._actions.has(type)) {
            this._actions.set(type, new Delegate());
        }
        (_a = this._actions.get(type)) === null || _a === void 0 ? void 0 : _a.subscribe(callback);
    };
    /**
     * 取消事件订阅
     * @param type
     * @param callback
     * @return {boolean}
     */
    ActionStore.prototype.unsubscribe = function (type, callback) {
        var action = this._actions.get(type);
        if (action !== undefined) {
            action.unsubscribe(callback);
            if (action.isEmpty()) {
                this._actions.delete(type);
            }
        }
    };
    ActionStore.prototype.has = function (type) {
        var action = this._actions.get(type);
        return action !== undefined && !action.isEmpty();
    };
    return ActionStore;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var light = {
    grid: {
        horizontal: {
            color: '#EDEDED'
        },
        vertical: {
            color: '#EDEDED'
        }
    },
    candle: {
        priceMark: {
            high: {
                color: '#76808F'
            },
            low: {
                color: '#76808F'
            }
        },
        tooltip: {
            rect: {
                color: '#FEFEFE',
                borderColor: '#F2F3F5'
            },
            text: {
                color: '#76808F'
            }
        }
    },
    indicator: {
        tooltip: {
            text: {
                color: '#76808F'
            }
        }
    },
    xAxis: {
        axisLine: {
            color: '#DDDDDD'
        },
        tickText: {
            color: '#76808F'
        },
        tickLine: {
            color: '#DDDDDD'
        }
    },
    yAxis: {
        axisLine: {
            color: '#DDDDDD'
        },
        tickText: {
            color: '#76808F'
        },
        tickLine: {
            color: '#DDDDDD'
        }
    },
    separator: {
        color: '#DDDDDD'
    },
    crosshair: {
        horizontal: {
            line: {
                color: '#76808F'
            },
            text: {
                borderColor: '#686D76',
                backgroundColor: '#686D76'
            }
        },
        vertical: {
            line: {
                color: '#76808F'
            },
            text: {
                borderColor: '#686D76',
                backgroundColor: '#686D76'
            }
        }
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var dark = {
    grid: {
        horizontal: {
            color: '#292929'
        },
        vertical: {
            color: '#292929'
        }
    },
    candle: {
        priceMark: {
            high: {
                color: '#929AA5'
            },
            low: {
                color: '#929AA5'
            }
        },
        tooltip: {
            rect: {
                color: 'rgba(10, 10, 10, .6)',
                borderColor: 'rgba(10, 10, 10, .6)'
            },
            text: {
                color: '#929AA5'
            }
        }
    },
    indicator: {
        tooltip: {
            text: {
                color: '#929AA5'
            }
        }
    },
    xAxis: {
        axisLine: {
            color: '#333333'
        },
        tickText: {
            color: '#929AA5'
        },
        tickLine: {
            color: '#333333'
        }
    },
    yAxis: {
        axisLine: {
            color: '#333333'
        },
        tickText: {
            color: '#929AA5'
        },
        tickLine: {
            color: '#333333'
        }
    },
    separator: {
        color: '#333333'
    },
    crosshair: {
        horizontal: {
            line: {
                color: '#929AA5'
            },
            text: {
                borderColor: '#373a40',
                backgroundColor: '#373a40'
            }
        },
        vertical: {
            line: {
                color: '#929AA5'
            },
            text: {
                borderColor: '#373a40',
                backgroundColor: '#373a40'
            }
        }
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var styles = {
    light: light,
    dark: dark
};
function registerStyles(name, ss) {
    styles[name] = ss;
}
function getStyles(name) {
    var _a;
    return (_a = styles[name]) !== null && _a !== void 0 ? _a : null;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ChartStore = /** @class */ (function () {
    function ChartStore(chart, options) {
        /**
         * Style config
         */
        this._styles = getDefaultStyles();
        /**
         * Custom api
         */
        this._customApi = getDefaultCustomApi();
        /**
         * language
         */
        this._locale = defaultLocale;
        /**
         * Price and volume precision
         */
        this._precision = { price: 2, volume: 0 };
        /**
         * Thousands separator
         */
        this._thousandsSeparator = ',';
        /**
         * Data source
         */
        this._dataList = [];
        /**
         * Time scale store
         */
        this._timeScaleStore = new TimeScaleStore(this);
        /**
         * Indicator store
         */
        this._indicatorStore = new IndicatorStore(this);
        /**
         * Overlay store
         */
        this._overlayStore = new OverlayStore(this);
        /**
         * Crosshair store
         */
        this._crosshairStore = new CrosshairStore(this);
        /**
         * Tooltip store
         */
        this._tooltipStore = new TooltipStore();
        /**
         * Chart action store
         */
        this._actionStore = new ActionStore();
        /**
         * Visible data array
         */
        this._visibleDataList = [];
        this._chart = chart;
        this.setOptions(options);
    }
    /**
     * @description Adjust visible data
     * @return {*}
     */
    ChartStore.prototype.adjustVisibleDataList = function () {
        this._visibleDataList = [];
        var _a = this._timeScaleStore.getVisibleRange(), from = _a.from, to = _a.to;
        for (var i = from; i < to; i++) {
            var kLineData = this._dataList[i];
            var x = this._timeScaleStore.dataIndexToCoordinate(i);
            this._visibleDataList.push({
                dataIndex: i,
                x: x,
                data: kLineData
            });
        }
    };
    ChartStore.prototype.setOptions = function (options) {
        if (options !== undefined) {
            var locale = options.locale, timezone = options.timezone, styles = options.styles, customApi = options.customApi;
            if (locale !== undefined) {
                this._locale = locale;
            }
            if (timezone !== undefined) {
                this._timeScaleStore.setTimezone(timezone);
            }
            if (styles !== undefined) {
                if (isString(styles)) {
                    merge(this._styles, getStyles(styles));
                }
                else {
                    merge(this._styles, styles);
                }
            }
            if (customApi !== undefined) {
                merge(this._customApi, customApi);
            }
            if (options.thousandsSeparator !== undefined) {
                this._thousandsSeparator = options.thousandsSeparator;
            }
        }
        return this;
    };
    ChartStore.prototype.getStyles = function () {
        return this._styles;
    };
    ChartStore.prototype.getLocale = function () {
        return this._locale;
    };
    ChartStore.prototype.getCustomApi = function () {
        return this._customApi;
    };
    ChartStore.prototype.getThousandsSeparator = function () {
        return this._thousandsSeparator;
    };
    ChartStore.prototype.getPrecision = function () {
        return this._precision;
    };
    ChartStore.prototype.setPrecision = function (precision) {
        this._precision = precision;
        this._indicatorStore.setSeriesPrecision(precision);
        return this;
    };
    ChartStore.prototype.getDataList = function () {
        return this._dataList;
    };
    ChartStore.prototype.getVisibleDataList = function () {
        return this._visibleDataList;
    };
    ChartStore.prototype.addData = function (data, pos, more) {
        if (isArray(data)) {
            this._timeScaleStore.setLoading(false);
            this._timeScaleStore.setMore(more !== null && more !== void 0 ? more : true);
            var isFirstAdd = this._dataList.length === 0;
            this._dataList = data.concat(this._dataList);
            if (isFirstAdd) {
                this._timeScaleStore.resetOffsetRightDistance();
            }
            this._timeScaleStore.adjustVisibleRange();
        }
        else {
            var dataSize = this._dataList.length;
            if (pos >= dataSize) {
                this._dataList.push(data);
                var offsetRightBarCount = this._timeScaleStore.getOffsetRightBarCount();
                if (offsetRightBarCount < 0) {
                    this._timeScaleStore.setOffsetRightBarCount(--offsetRightBarCount);
                }
                this._timeScaleStore.adjustVisibleRange();
            }
            else {
                this._dataList[pos] = data;
                this.adjustVisibleDataList();
            }
        }
        this._crosshairStore.recalculate(true);
    };
    ChartStore.prototype.clearDataList = function () {
        this._dataList = [];
        this._visibleDataList = [];
        this._timeScaleStore.clear();
    };
    ChartStore.prototype.getTimeScaleStore = function () {
        return this._timeScaleStore;
    };
    ChartStore.prototype.getIndicatorStore = function () {
        return this._indicatorStore;
    };
    ChartStore.prototype.getOverlayStore = function () {
        return this._overlayStore;
    };
    ChartStore.prototype.getCrosshairStore = function () {
        return this._crosshairStore;
    };
    ChartStore.prototype.getTooltipStore = function () {
        return this._tooltipStore;
    };
    ChartStore.prototype.getActionStore = function () {
        return this._actionStore;
    };
    ChartStore.prototype.getChart = function () {
        return this._chart;
    };
    return ChartStore;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function requestAnimationFrame$1(fn) {
    if (window.requestAnimationFrame == null) {
        return window.setTimeout(fn, 20);
    }
    return window.requestAnimationFrame(fn);
}
function cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame == null) {
        window.clearTimeout(id);
    }
    window.cancelAnimationFrame(id);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_REQUEST_ID = -1;
var DrawWidget = /** @class */ (function (_super) {
    __extends(DrawWidget, _super);
    function DrawWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mainRequestAnimationId = DEFAULT_REQUEST_ID;
        _this._overlayRequestAnimationId = DEFAULT_REQUEST_ID;
        return _this;
    }
    DrawWidget.prototype.getContainerStyle = function () {
        return {
            margin: '0',
            padding: '0',
            position: 'absolute',
            top: '0',
            overflow: 'hidden',
            boxSizing: 'border-box'
        };
    };
    DrawWidget.prototype.initDom = function (container) {
        this._mainCanvas = createDom('canvas', {
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '2',
            boxSizing: 'border-box'
        });
        this._mainCtx = this._mainCanvas.getContext('2d');
        this._overlayCanvas = createDom('canvas', {
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '2',
            boxSizing: 'border-box'
        });
        this._overlayCtx = this._overlayCanvas.getContext('2d');
        container.appendChild(this._mainCanvas);
        container.appendChild(this._overlayCanvas);
    };
    DrawWidget.prototype._optimalUpdateMain = function (width, height) {
        var _this = this;
        if (this._mainRequestAnimationId !== DEFAULT_REQUEST_ID) {
            cancelAnimationFrame(this._mainRequestAnimationId);
            this._mainRequestAnimationId = DEFAULT_REQUEST_ID;
        }
        this._mainRequestAnimationId = requestAnimationFrame$1(function () {
            if (width !== _this._mainCanvas.offsetWidth || height !== _this._mainCanvas.offsetHeight) {
                _this._mainCtx.clearRect(0, 0, _this._mainCanvas.offsetWidth, _this._mainCanvas.offsetHeight);
                var pixelRatio = getPixelRatio(_this._mainCanvas);
                var scaleWidth = Math.floor(width * pixelRatio);
                var scaleHeight = Math.floor(height * pixelRatio);
                _this._mainCanvas.style.width = "".concat(width, "px");
                _this._mainCanvas.style.height = "".concat(height, "px");
                _this._mainCanvas.width = scaleWidth;
                _this._mainCanvas.height = scaleHeight;
                _this._mainCtx.scale(pixelRatio, pixelRatio);
            }
            else {
                _this._mainCtx.clearRect(0, 0, _this._mainCanvas.offsetWidth, _this._mainCanvas.offsetHeight);
            }
            _this.updateMain(_this._mainCtx);
        });
    };
    DrawWidget.prototype._optimalUpdateOverlay = function (width, height) {
        var _this = this;
        if (this._overlayRequestAnimationId !== DEFAULT_REQUEST_ID) {
            cancelAnimationFrame(this._overlayRequestAnimationId);
            this._overlayRequestAnimationId = DEFAULT_REQUEST_ID;
        }
        this._overlayRequestAnimationId = requestAnimationFrame$1(function () {
            if (width !== _this._overlayCanvas.offsetWidth || height !== _this._overlayCanvas.offsetHeight) {
                _this._overlayCtx.clearRect(0, 0, _this._overlayCanvas.offsetWidth, _this._overlayCanvas.offsetHeight);
                var pixelRatio = getPixelRatio(_this._overlayCanvas);
                var scaleWidth = Math.floor(width * pixelRatio);
                var scaleHeight = Math.floor(height * pixelRatio);
                _this._overlayCanvas.style.width = "".concat(width, "px");
                _this._overlayCanvas.style.height = "".concat(height, "px");
                _this._overlayCanvas.width = scaleWidth;
                _this._overlayCanvas.height = scaleHeight;
                _this._overlayCtx.scale(pixelRatio, pixelRatio);
            }
            else {
                _this._overlayCtx.clearRect(0, 0, _this._overlayCanvas.offsetWidth, _this._overlayCanvas.offsetHeight);
            }
            _this.updateOverlay(_this._overlayCtx);
        });
    };
    DrawWidget.prototype.updateImp = function (level, container, bounding) {
        var width = bounding.width, height = bounding.height, left = bounding.left;
        container.style.left = "".concat(left, "px");
        var l = level;
        if (width !== container.offsetWidth || height !== container.offsetHeight) {
            container.style.width = "".concat(width, "px");
            container.style.height = "".concat(height, "px");
            l = 3 /* UpdateLevel.Drawer */;
        }
        switch (l) {
            case 0 /* UpdateLevel.Main */: {
                this._optimalUpdateMain(width, height);
                break;
            }
            case 1 /* UpdateLevel.Overlay */: {
                this._optimalUpdateOverlay(width, height);
                break;
            }
            case 3 /* UpdateLevel.Drawer */:
            case 4 /* UpdateLevel.All */: {
                this._optimalUpdateMain(width, height);
                this._optimalUpdateOverlay(width, height);
                break;
            }
        }
    };
    DrawWidget.prototype.getImage = function (includeOverlay) {
        var _a = this.getBounding(), width = _a.width, height = _a.height;
        var canvas = createDom('canvas', {
            width: "".concat(width, "px"),
            height: "".concat(height, "px"),
            boxSizing: 'border-box'
        });
        var ctx = canvas.getContext('2d');
        var pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        ctx.drawImage(this._mainCanvas, 0, 0, width, height);
        if (includeOverlay) {
            ctx.drawImage(this._overlayCanvas, 0, 0, width, height);
        }
        return canvas;
    };
    return DrawWidget;
}(Widget));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function checkCoordinateOnCircle(coordinate, circle) {
    var difX = coordinate.x - circle.x;
    var difY = coordinate.y - circle.y;
    var r = circle.r;
    return !(difX * difX + difY * difY > r * r);
}
function drawCircle(ctx, attrs, styles) {
    var x = attrs.x, y = attrs.y, r = attrs.r;
    var _a = styles.style, style = _a === void 0 ? exports.PolygonType.Fill : _a, _b = styles.color, color = _b === void 0 ? 'currentColor' : _b, _c = styles.borderSize, borderSize = _c === void 0 ? 1 : _c, _d = styles.borderColor, borderColor = _d === void 0 ? 'currentColor' : _d, _e = styles.borderStyle, borderStyle = _e === void 0 ? exports.LineType.Solid : _e, _f = styles.borderDashedValue, borderDashedValue = _f === void 0 ? [2, 2] : _f;
    if (style === exports.PolygonType.Fill || styles.style === exports.PolygonType.StrokeFill) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    if (style === exports.PolygonType.Stroke || styles.style === exports.PolygonType.StrokeFill) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderSize;
        if (borderStyle === exports.LineType.Dashed) {
            ctx.setLineDash(borderDashedValue);
        }
        else {
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }
}
var circle = {
    name: 'circle',
    checkEventOn: checkCoordinateOnCircle,
    draw: function (ctx, attrs, styles) {
        drawCircle(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function checkCoordinateOnPolygon(coordinate, polygon) {
    var on = false;
    var coordinates = polygon.coordinates;
    for (var i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
        if ((coordinates[i].y > coordinate.y) !== (coordinates[j].y > coordinate.y) &&
            (coordinate.x < (coordinates[j].x - coordinates[i].x) * (coordinate.y - coordinates[i].y) / (coordinates[j].y - coordinates[i].y) + coordinates[i].x)) {
            on = !on;
        }
    }
    return on;
}
function drawPolygon(ctx, attrs, styles) {
    var coordinates = attrs.coordinates;
    var _a = styles.style, style = _a === void 0 ? exports.PolygonType.Fill : _a, _b = styles.color, color = _b === void 0 ? 'currentColor' : _b, _c = styles.borderSize, borderSize = _c === void 0 ? 1 : _c, _d = styles.borderColor, borderColor = _d === void 0 ? 'currentColor' : _d, _e = styles.borderStyle, borderStyle = _e === void 0 ? exports.LineType.Solid : _e, _f = styles.borderDashedValue, borderDashedValue = _f === void 0 ? [2, 2] : _f;
    if (style === exports.PolygonType.Fill || styles.style === exports.PolygonType.StrokeFill) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        for (var i = 1; i < coordinates.length; i++) {
            ctx.lineTo(coordinates[i].x, coordinates[i].y);
        }
        ctx.closePath();
        ctx.fill();
    }
    if (style === exports.PolygonType.Stroke || styles.style === exports.PolygonType.StrokeFill) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderSize;
        if (borderStyle === exports.LineType.Dashed) {
            ctx.setLineDash(borderDashedValue);
        }
        else {
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        for (var i = 1; i < coordinates.length; i++) {
            ctx.lineTo(coordinates[i].x, coordinates[i].y);
        }
        ctx.closePath();
        ctx.stroke();
    }
}
var polygon = {
    name: 'polygon',
    checkEventOn: checkCoordinateOnPolygon,
    draw: function (ctx, attrs, styles) {
        drawPolygon(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function checkCoordinateOnRect(coordinate, rect) {
    var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
    if (width < 0) {
        x = x + width;
        width = width * -1;
    }
    if (height < 0) {
        y = y + height;
        height = height * -1;
    }
    if (width < DEVIATION && height < DEVIATION) {
        return Math.abs(coordinate.x - x) < DEVIATION * 2 && Math.abs(coordinate.y - y) < DEVIATION * 2;
    }
    if (width < DEVIATION && Math.abs(coordinate.x - x) < DEVIATION * 2) {
        return coordinate.y >= y && coordinate.y <= y + height;
    }
    if (height < DEVIATION && Math.abs(coordinate.y - y) < DEVIATION * 2) {
        return coordinate.x >= x && coordinate.x <= x + width;
    }
    return (coordinate.x >= x &&
        coordinate.x <= x + width &&
        coordinate.y >= y &&
        coordinate.y <= y + height);
}
function drawRect(ctx, attrs, styles) {
    var x = attrs.x, y = attrs.y, w = attrs.width, h = attrs.height;
    var _a = styles.style, style = _a === void 0 ? exports.PolygonType.Fill : _a, _b = styles.color, color = _b === void 0 ? 'currentColor' : _b, _c = styles.borderSize, borderSize = _c === void 0 ? 1 : _c, _d = styles.borderColor, borderColor = _d === void 0 ? 'currentColor' : _d, _e = styles.borderStyle, borderStyle = _e === void 0 ? exports.LineType.Solid : _e, _f = styles.borderRadius, r = _f === void 0 ? 0 : _f, _g = styles.borderDashedValue, borderDashedValue = _g === void 0 ? [2, 2] : _g;
    if (style === exports.PolygonType.Fill || styles.style === exports.PolygonType.StrokeFill) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fill();
    }
    if (style === exports.PolygonType.Stroke || styles.style === exports.PolygonType.StrokeFill) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderSize;
        if (borderStyle === exports.LineType.Dashed) {
            ctx.setLineDash(borderDashedValue);
        }
        else {
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.stroke();
    }
}
var rect = {
    name: 'rect',
    checkEventOn: checkCoordinateOnRect,
    draw: function (ctx, attrs, styles) {
        drawRect(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getTextRect(attrs, styles, textWidth) {
    var _a = styles.size, size = _a === void 0 ? 12 : _a, _b = styles.paddingLeft, paddingLeft = _b === void 0 ? 0 : _b, _c = styles.paddingTop, paddingTop = _c === void 0 ? 0 : _c, _d = styles.paddingRight, paddingRight = _d === void 0 ? 0 : _d, _e = styles.paddingBottom, paddingBottom = _e === void 0 ? 0 : _e;
    var x = attrs.x, y = attrs.y, text = attrs.text, _f = attrs.align, align = _f === void 0 ? 'left' : _f, _g = attrs.baseline, baseline = _g === void 0 ? 'top' : _g;
    var length = text.length;
    textWidth = textWidth !== null && textWidth !== void 0 ? textWidth : size * length;
    var textHeight = size;
    var startX;
    switch (align) {
        case 'left':
        case 'start': {
            startX = x;
            break;
        }
        case 'right':
        case 'end': {
            startX = x - paddingRight - textWidth - paddingLeft;
            break;
        }
        default: {
            startX = x - textWidth / 2 - paddingLeft;
            break;
        }
    }
    var startY;
    switch (baseline) {
        case 'top':
        case 'hanging': {
            startY = y;
            break;
        }
        case 'bottom':
        case 'ideographic':
        case 'alphabetic': {
            startY = y - textHeight - paddingTop - paddingBottom;
            break;
        }
        default: {
            startY = y - textHeight / 2 - paddingTop;
            break;
        }
    }
    startX = Math.round(startX) + 0.5;
    startY = Math.round(startY) + 0.5;
    return { x: startX, y: startY, width: paddingLeft + textWidth + paddingRight, height: paddingTop + textHeight + paddingBottom };
}
function checkCoordinateOnText(coordinate, attrs, styles) {
    var _a = getTextRect(attrs, styles), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return (coordinate.x >= x &&
        coordinate.x <= x + width &&
        coordinate.y >= y &&
        coordinate.y <= y + height);
}
function drawText(ctx, attrs, styles) {
    var x = attrs.x, y = attrs.y, text = attrs.text, _a = attrs.align, align = _a === void 0 ? 'left' : _a, _b = attrs.baseline, baseline = _b === void 0 ? 'top' : _b;
    var _c = styles.color, color = _c === void 0 ? 'currentColor' : _c, _d = styles.size, size = _d === void 0 ? 12 : _d, family = styles.family, weight = styles.weight;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.font = createFont(size, weight, family);
    x = Math.round(x) + 0.5;
    y = Math.round(y) + 0.5;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}
var text = {
    name: 'text',
    checkEventOn: function (coordinate, attrs, styles) {
        return checkCoordinateOnText(coordinate, attrs, styles);
    },
    draw: function (ctx, attrs, styles) {
        drawText(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function drawRectText(ctx, attrs, styles) {
    var text = attrs.text;
    var _a = styles.size, size = _a === void 0 ? 12 : _a, family = styles.family, weight = styles.weight, _b = styles.paddingLeft, paddingLeft = _b === void 0 ? 0 : _b, _c = styles.paddingTop, paddingTop = _c === void 0 ? 0 : _c;
    ctx.font = createFont(size, weight, family);
    var textWidth = ctx.measureText(text).width;
    var rect = getTextRect(attrs, styles, textWidth);
    drawRect(ctx, rect, __assign(__assign({}, styles), { color: styles.backgroundColor }));
    drawText(ctx, { x: rect.x + paddingLeft, y: rect.y + paddingTop, text: text, align: 'left', baseline: 'top' }, styles);
}
var rectText = {
    name: 'rectText',
    checkEventOn: function (coordinate, attrs, styles) {
        return checkCoordinateOnText(coordinate, attrs, styles);
    },
    draw: function (ctx, attrs, styles) {
        drawRectText(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getDistance(coordinate1, coordinate2) {
    var xDif = coordinate1.x - coordinate2.x;
    var yDif = coordinate1.y - coordinate2.y;
    return Math.sqrt(xDif * xDif + yDif * yDif);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function checkCoordinateOnArc(coordinate, arc) {
    if (Math.abs(getDistance(coordinate, arc) - arc.r) < DEVIATION) {
        var r = arc.r, startAngle = arc.startAngle, endAngle = arc.endAngle;
        var startCoordinateX = r * Math.cos(startAngle) + arc.x;
        var startCoordinateY = r * Math.sin(startAngle) + arc.y;
        var endCoordinateX = r * Math.cos(endAngle) + arc.x;
        var endCoordinateY = r * Math.sin(endAngle) + arc.y;
        return (coordinate.x <= Math.max(startCoordinateX, endCoordinateX) + DEVIATION &&
            coordinate.x >= Math.min(startCoordinateX, endCoordinateX) - DEVIATION &&
            coordinate.y <= Math.max(startCoordinateY, endCoordinateY) + DEVIATION &&
            coordinate.y >= Math.min(startCoordinateY, endCoordinateY) - DEVIATION);
    }
    return false;
}
function drawArc(ctx, attrs, styles) {
    var x = attrs.x, y = attrs.y, r = attrs.r, startAngle = attrs.startAngle, endAngle = attrs.endAngle;
    var _a = styles.style, style = _a === void 0 ? exports.LineType.Solid : _a, _b = styles.size, size = _b === void 0 ? 1 : _b, _c = styles.color, color = _c === void 0 ? 'currentColor' : _c, _d = styles.dashedValue, dashedValue = _d === void 0 ? [2, 2] : _d;
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    if (style === exports.LineType.Dashed) {
        ctx.setLineDash(dashedValue);
    }
    else {
        ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.arc(x, y, r, startAngle, endAngle);
    ctx.stroke();
    ctx.closePath();
}
var arc = {
    name: 'arc',
    checkEventOn: checkCoordinateOnArc,
    draw: function (ctx, attrs, styles) {
        drawArc(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function checkCoordinateOnWick(coordinate, line) {
    var coordinates = line.coordinates;
    if (coordinates.length > 1) {
        for (var i = 1; i < coordinates.length; i++) {
            var prevCoordinate = coordinates[i - 1];
            var currentCoordinate = coordinates[i];
            if (prevCoordinate.x === currentCoordinate.x) {
                if (Math.abs(prevCoordinate.y - coordinate.y) + Math.abs(currentCoordinate.y - coordinate.y) - Math.abs(prevCoordinate.y - currentCoordinate.y) < DEVIATION + DEVIATION &&
                    Math.abs(coordinate.x - prevCoordinate.x) < DEVIATION) {
                    return true;
                }
            }
        }
    }
    return false;
}
function drawWick(ctx, attrs, styles) {
    var coordinates = attrs.coordinates;
    var length = coordinates.length;
    if (length > 1) {
        var _a = styles.size, size = _a === void 0 ? 1 : _a, _b = styles.color, color = _b === void 0 ? 'currentColor' : _b;
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        ctx.lineTo(coordinates[1].x, coordinates[1].y);
        ctx.stroke();
        ctx.closePath();
    }
}
var line = {
    name: 'wick',
    checkEventOn: checkCoordinateOnWick,
    draw: function (ctx, attrs, styles) {
        drawWick(ctx, attrs, styles);
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var figures = {};
var extensions = [circle, line$1, polygon, rect, text, rectText, arc, line];
extensions.forEach(function (figure) {
    figures[figure.name] = FigureImp.extend(figure);
});
function getSupportedFigures() {
    return Object.keys(figures);
}
function registerFigure(figure) {
    figures[figure.name] = FigureImp.extend(figure);
}
function getInnerFigureClass(name) {
    var _a;
    return (_a = figures[name]) !== null && _a !== void 0 ? _a : null;
}
function getFigureClass(name) {
    var _a;
    return (_a = figures[name]) !== null && _a !== void 0 ? _a : null;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(widget) {
        var _this = _super.call(this) || this;
        _this._widget = widget;
        return _this;
    }
    View.prototype.getWidget = function () { return this._widget; };
    View.prototype.createFigure = function (name, attrs, styles, eventHandler) {
        var FigureClazz = getInnerFigureClass(name);
        if (FigureClazz !== null) {
            var figure = new FigureClazz({ name: name, attrs: attrs, styles: styles });
            if (eventHandler !== undefined) {
                for (var key in eventHandler) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (eventHandler.hasOwnProperty(key)) {
                        figure.registerEvent(key, eventHandler[key]);
                    }
                }
                this.addChild(figure);
            }
            return figure;
        }
        return null;
    };
    View.prototype.draw = function (ctx) {
        this.clear();
        this.drawImp(ctx);
    };
    return View;
}(Eventful));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var GridView = /** @class */ (function (_super) {
    __extends(GridView, _super);
    function GridView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridView.prototype.drawImp = function (ctx) {
        var _this = this;
        var _a;
        var widget = this.getWidget();
        var pane = this.getWidget().getPane();
        var chart = pane.getChart();
        var bounding = widget.getBounding();
        var gridStyles = chart.getStyles().grid;
        var show = gridStyles.show;
        if (show) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            var horizontalStyles_1 = gridStyles.horizontal;
            var horizontalShow = horizontalStyles_1.show;
            if (horizontalShow) {
                var yAxis = pane.getAxisComponent();
                yAxis.getTicks().forEach(function (tick) {
                    var _a;
                    (_a = _this.createFigure('line', {
                        coordinates: [
                            { x: 0, y: tick.coord },
                            { x: bounding.width, y: tick.coord }
                        ]
                    }, horizontalStyles_1)) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                });
            }
            var verticalStyles_1 = gridStyles.vertical;
            var verticalShow = verticalStyles_1.show;
            if (verticalShow) {
                var xAxis = (_a = chart.getPaneById(PaneIdConstants.XAXIS)) === null || _a === void 0 ? void 0 : _a.getAxisComponent();
                xAxis.getTicks().forEach(function (tick) {
                    var _a;
                    (_a = _this.createFigure('line', {
                        coordinates: [
                            { x: tick.coord, y: 0 },
                            { x: tick.coord, y: bounding.height }
                        ]
                    }, verticalStyles_1)) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                });
            }
            ctx.restore();
        }
    };
    return GridView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ChildrenView = /** @class */ (function (_super) {
    __extends(ChildrenView, _super);
    function ChildrenView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildrenView.prototype.eachChildren = function (childCallback) {
        var pane = this.getWidget().getPane();
        var chartStore = pane.getChart().getChartStore();
        var visibleDataList = chartStore.getVisibleDataList();
        var barSpace = chartStore.getTimeScaleStore().getBarSpace();
        visibleDataList.forEach(function (data, index) {
            childCallback(data, barSpace, index);
        });
    };
    return ChildrenView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandleBarView = /** @class */ (function (_super) {
    __extends(CandleBarView, _super);
    function CandleBarView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._boundCandleBarClickEvent = function (data) { return function () {
            _this.getWidget().getPane().getChart().getChartStore().getActionStore().execute(exports.ActionType.OnCandleBarClick, data);
            return false;
        }; };
        return _this;
    }
    CandleBarView.prototype.drawImp = function (ctx) {
        var _this = this;
        var pane = this.getWidget().getPane();
        var isMain = pane.getId() === PaneIdConstants.CANDLE;
        var chartStore = pane.getChart().getChartStore();
        var candleBarOptions = this.getCandleBarOptions(chartStore);
        if (candleBarOptions !== null) {
            var yAxis_1 = pane.getAxisComponent();
            this.eachChildren(function (data, barSpace) {
                _this._drawCandleBar(ctx, yAxis_1, data, barSpace, candleBarOptions, isMain);
            });
        }
    };
    CandleBarView.prototype.getCandleBarOptions = function (chartStore) {
        var candleStyles = chartStore.getStyles().candle;
        return {
            type: candleStyles.type,
            styles: candleStyles.bar
        };
    };
    CandleBarView.prototype._drawCandleBar = function (ctx, axis, data, barSpace, candleBarOptions, isMain) {
        var _this = this;
        var kLineData = data.data, x = data.x;
        var open = kLineData.open, high = kLineData.high, low = kLineData.low, close = kLineData.close;
        var halfGapBar = barSpace.halfGapBar, gapBar = barSpace.gapBar;
        var type = candleBarOptions.type, styles = candleBarOptions.styles;
        var color;
        var borderColor;
        var wickColor;
        if (close > open) {
            color = styles.upColor;
            borderColor = styles.upBorderColor;
            wickColor = styles.upWickColor;
        }
        else if (close < open) {
            color = styles.downColor;
            borderColor = styles.downBorderColor;
            wickColor = styles.downWickColor;
        }
        else {
            color = styles.noChangeColor;
            borderColor = styles.noChangeBorderColor;
            wickColor = styles.noChangeWickColor;
        }
        var openY = axis.convertToPixel(open);
        var closeY = axis.convertToPixel(close);
        var priceY = [
            openY, closeY,
            axis.convertToPixel(high),
            axis.convertToPixel(low)
        ];
        priceY.sort(function (a, b) { return a - b; });
        var barHeight = Math.max(1, priceY[2] - priceY[1]);
        var figures = [];
        if (type !== exports.CandleType.Ohlc) {
            if (type === exports.CandleType.CandleStroke ||
                (type === exports.CandleType.CandleUpStroke && open < close) ||
                (type === exports.CandleType.CandleDownStroke && open > close)) {
                figures.push({
                    name: 'rect',
                    attrs: {
                        x: x - 0.5,
                        y: priceY[0],
                        width: 1,
                        height: priceY[1] - priceY[0]
                    },
                    styles: { color: wickColor }
                });
                figures.push({
                    name: 'rect',
                    attrs: {
                        x: x - halfGapBar + 0.5,
                        y: priceY[1] + 0.5,
                        width: gapBar - 1,
                        height: barHeight
                    },
                    styles: {
                        style: exports.PolygonType.Stroke,
                        borderColor: borderColor
                    }
                });
                figures.push({
                    name: 'rect',
                    attrs: {
                        x: x - 0.5,
                        y: priceY[2],
                        width: 1,
                        height: priceY[3] - priceY[2]
                    },
                    styles: { color: wickColor }
                });
            }
            else {
                figures.push({
                    name: 'rect',
                    attrs: {
                        x: x - halfGapBar + 0.5,
                        y: priceY[1] + 0.5,
                        width: gapBar - 1,
                        height: barHeight
                    },
                    styles: {
                        style: exports.PolygonType.StrokeFill,
                        color: color,
                        borderColor: borderColor
                    }
                });
                figures.push({
                    name: 'wick',
                    attrs: {
                        coordinates: [
                            { x: x - 0.5, y: priceY[0] },
                            { x: x - 0.5, y: priceY[3] }
                        ]
                    },
                    styles: { color: wickColor }
                });
            }
        }
        else {
            figures = [
                {
                    name: 'rect',
                    attrs: {
                        x: x - 0.5,
                        y: priceY[0],
                        width: 1,
                        height: priceY[3] - priceY[0]
                    },
                    styles: { color: color }
                }, {
                    name: 'rect',
                    attrs: {
                        x: x - halfGapBar,
                        y: openY,
                        width: halfGapBar,
                        height: 1
                    },
                    styles: { color: color }
                }, {
                    name: 'rect',
                    attrs: {
                        x: x,
                        y: closeY,
                        width: halfGapBar,
                        height: 1
                    },
                    styles: { color: color }
                }
            ];
        }
        figures.forEach(function (_a) {
            var _b;
            var name = _a.name, attrs = _a.attrs, styles = _a.styles;
            var handler;
            if (isMain) {
                handler = {
                    mouseClickEvent: _this._boundCandleBarClickEvent(data)
                };
            }
            (_b = _this.createFigure(name, attrs, styles, handler)) === null || _b === void 0 ? void 0 : _b.draw(ctx);
        });
    };
    return CandleBarView;
}(ChildrenView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IndicatorView = /** @class */ (function (_super) {
    __extends(IndicatorView, _super);
    function IndicatorView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorView.prototype.getCandleBarOptions = function (chartStore) {
        var e_1, _a;
        var pane = this.getWidget().getPane();
        var yAxis = pane.getAxisComponent();
        if (!yAxis.isInCandle()) {
            var indicators = chartStore.getIndicatorStore().getInstances(pane.getId());
            try {
                for (var indicators_1 = __values(indicators), indicators_1_1 = indicators_1.next(); !indicators_1_1.done; indicators_1_1 = indicators_1.next()) {
                    var entries = indicators_1_1.value;
                    var indicator = entries[1];
                    if (indicator.shouldOhlc && indicator.visible) {
                        var indicatorStyles = indicator.styles;
                        var defaultStyles = chartStore.getStyles().indicator;
                        var upColor = formatValue(indicatorStyles, 'ohlc.upColor', defaultStyles.ohlc.upColor);
                        var downColor = formatValue(indicatorStyles, 'ohlc.downColor', defaultStyles.ohlc.downColor);
                        var noChangeColor = formatValue(indicatorStyles, 'ohlc.noChangeColor', defaultStyles.ohlc.noChangeColor);
                        return {
                            type: exports.CandleType.Ohlc,
                            styles: {
                                upColor: upColor,
                                downColor: downColor,
                                noChangeColor: noChangeColor,
                                upBorderColor: upColor,
                                downBorderColor: downColor,
                                noChangeBorderColor: noChangeColor,
                                upWickColor: upColor,
                                downWickColor: downColor,
                                noChangeWickColor: noChangeColor
                            }
                        };
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (indicators_1_1 && !indicators_1_1.done && (_a = indicators_1.return)) _a.call(indicators_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return null;
    };
    IndicatorView.prototype.drawImp = function (ctx) {
        var _this = this;
        var _a;
        _super.prototype.drawImp.call(this, ctx);
        var widget = this.getWidget();
        var pane = widget.getPane();
        var chart = pane.getChart();
        var bounding = widget.getBounding();
        var xAxis = (_a = chart.getPaneById(PaneIdConstants.XAXIS)) === null || _a === void 0 ? void 0 : _a.getAxisComponent();
        var yAxis = pane.getAxisComponent();
        var chartStore = chart.getChartStore();
        var dataList = chartStore.getDataList();
        var timeScaleStore = chartStore.getTimeScaleStore();
        var visibleRange = timeScaleStore.getVisibleRange();
        var indicators = chartStore.getIndicatorStore().getInstances(pane.getId());
        var defaultStyles = chartStore.getStyles().indicator;
        indicators.forEach(function (indicator) {
            var _a;
            if (indicator.visible) {
                var isCover = false;
                if (indicator.draw !== null) {
                    ctx.save();
                    isCover = (_a = indicator.draw({
                        ctx: ctx,
                        kLineDataList: dataList,
                        indicator: indicator,
                        visibleRange: visibleRange,
                        bounding: bounding,
                        barSpace: timeScaleStore.getBarSpace(),
                        defaultStyles: defaultStyles,
                        xAxis: xAxis,
                        yAxis: yAxis
                    })) !== null && _a !== void 0 ? _a : false;
                    ctx.restore();
                }
                if (!isCover) {
                    var result_1 = indicator.result;
                    _this.eachChildren(function (data, barSpace) {
                        var _a, _b, _c;
                        var halfGapBar = barSpace.halfGapBar, gapBar = barSpace.gapBar;
                        var dataIndex = data.dataIndex, x = data.x;
                        var prevX = xAxis.convertToPixel(dataIndex - 1);
                        var nextX = xAxis.convertToPixel(dataIndex + 1);
                        var prevIndicatorData = (_a = result_1[dataIndex - 1]) !== null && _a !== void 0 ? _a : {};
                        var currentIndicatorData = (_b = result_1[dataIndex]) !== null && _b !== void 0 ? _b : {};
                        var nextIndicatorData = (_c = result_1[dataIndex + 1]) !== null && _c !== void 0 ? _c : {};
                        var prevCoordinate = { x: prevX };
                        var currentCoordinate = { x: x };
                        var nextCoordinate = { x: nextX };
                        indicator.figures.forEach(function (_a) {
                            var key = _a.key;
                            prevCoordinate[key] = yAxis.convertToPixel(prevIndicatorData[key]);
                            currentCoordinate[key] = yAxis.convertToPixel(currentIndicatorData[key]);
                            nextCoordinate[key] = yAxis.convertToPixel(nextIndicatorData[key]);
                        });
                        eachFigures(dataList, indicator, dataIndex, defaultStyles, function (figure, figureStyles) {
                            var _a, _b, _c;
                            if (isValid(currentIndicatorData[figure.key])) {
                                var valueY = currentCoordinate[figure.key];
                                var attrs = (_a = figure.attrs) === null || _a === void 0 ? void 0 : _a.call(figure, {
                                    coordinate: { prev: prevCoordinate, current: currentCoordinate, next: nextCoordinate },
                                    bounding: bounding,
                                    barSpace: barSpace,
                                    xAxis: xAxis,
                                    yAxis: yAxis
                                });
                                if (!isValid(attrs)) {
                                    switch (figure.type) {
                                        case 'circle': {
                                            attrs = { x: x, y: valueY, r: halfGapBar };
                                            break;
                                        }
                                        case 'rect':
                                        case 'bar': {
                                            var baseValue = (_b = figure.baseValue) !== null && _b !== void 0 ? _b : yAxis.getExtremum().min;
                                            var baseValueY = yAxis.convertToPixel(baseValue);
                                            var height = Math.abs(baseValueY - valueY);
                                            if (baseValue !== currentIndicatorData[figure.key]) {
                                                height = Math.max(1, height);
                                            }
                                            var y = void 0;
                                            if (valueY > baseValueY) {
                                                y = baseValueY;
                                            }
                                            else {
                                                y = valueY;
                                            }
                                            attrs = {
                                                x: x - halfGapBar,
                                                y: y,
                                                width: gapBar,
                                                height: height
                                            };
                                            break;
                                        }
                                        case 'line': {
                                            if (isNumber(currentCoordinate[figure.key]) && isNumber(nextCoordinate[figure.key])) {
                                                attrs = {
                                                    coordinates: [
                                                        { x: currentCoordinate.x, y: currentCoordinate[figure.key] },
                                                        { x: nextCoordinate.x, y: nextCoordinate[figure.key] }
                                                    ]
                                                };
                                            }
                                            break;
                                        }
                                    }
                                }
                                if (isValid(attrs)) {
                                    var name_1 = figure.type;
                                    (_c = _this.createFigure(name_1 === 'bar' ? 'rect' : name_1, attrs, figureStyles)) === null || _c === void 0 ? void 0 : _c.draw(ctx);
                                }
                            }
                        });
                    });
                }
            }
        });
    };
    return IndicatorView;
}(CandleBarView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CrosshairLineView = /** @class */ (function (_super) {
    __extends(CrosshairLineView, _super);
    function CrosshairLineView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrosshairLineView.prototype.drawImp = function (ctx) {
        var widget = this.getWidget();
        var pane = widget.getPane();
        var bounding = widget.getBounding();
        var chartStore = widget.getPane().getChart().getChartStore();
        var crosshair = chartStore.getCrosshairStore().get();
        var styles = chartStore.getStyles().crosshair;
        if (crosshair.paneId !== undefined && styles.show) {
            if (crosshair.paneId === pane.getId()) {
                var y = crosshair.y;
                this._drawLine(ctx, [
                    { x: 0, y: y },
                    { x: bounding.width, y: y }
                ], styles.horizontal);
            }
            var x = crosshair.realX;
            this._drawLine(ctx, [
                { x: x, y: 0 },
                { x: x, y: bounding.height }
            ], styles.vertical);
        }
    };
    CrosshairLineView.prototype._drawLine = function (ctx, coordinates, styles) {
        var _a;
        if (styles.show) {
            var lineStyles = styles.line;
            if (lineStyles.show) {
                (_a = this.createFigure('line', { coordinates: coordinates }, lineStyles)) === null || _a === void 0 ? void 0 : _a.draw(ctx);
            }
        }
    };
    return CrosshairLineView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IndicatorTooltipView = /** @class */ (function (_super) {
    __extends(IndicatorTooltipView, _super);
    function IndicatorTooltipView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._boundIconClickEvent = function (currentIconInfo, iconId) { return function () {
            var pane = _this.getWidget().getPane();
            pane.getChart().getChartStore().getActionStore().execute(exports.ActionType.OnTooltipIconClick, __assign(__assign({}, currentIconInfo), { iconId: iconId }));
            return true;
        }; };
        _this._boundIconMouseMoveEvent = function (currentIconInfo, iconId) { return function () {
            var pane = _this.getWidget().getPane();
            var tooltipStore = pane.getChart().getChartStore().getTooltipStore();
            tooltipStore.setActiveIconInfo(__assign(__assign({}, currentIconInfo), { iconId: iconId }));
            return true;
        }; };
        return _this;
    }
    IndicatorTooltipView.prototype.drawImp = function (ctx) {
        var widget = this.getWidget();
        var pane = widget.getPane();
        var chartStore = pane.getChart().getChartStore();
        var crosshair = chartStore.getCrosshairStore().get();
        if (crosshair.kLineData !== undefined) {
            var bounding = widget.getBounding();
            var customApi = chartStore.getCustomApi();
            var thousandsSeparator = chartStore.getThousandsSeparator();
            var indicators = chartStore.getIndicatorStore().getInstances(pane.getId());
            var activeIconInfo = chartStore.getTooltipStore().getActiveIconInfo();
            var defaultStyles = chartStore.getStyles().indicator;
            this.drawIndicatorTooltip(ctx, pane.getId(), chartStore.getDataList(), crosshair, activeIconInfo, indicators, customApi, thousandsSeparator, bounding, defaultStyles);
        }
    };
    IndicatorTooltipView.prototype.drawIndicatorTooltip = function (ctx, paneId, dataList, crosshair, activeTooltipIconInfo, indicators, customApi, formatThousands, bounding, styles, top) {
        var _this = this;
        var tooltipStyles = styles.tooltip;
        var height = 0;
        if (this.isDrawTooltip(crosshair, tooltipStyles)) {
            var tooltipTextStyles_1 = tooltipStyles.text;
            var x_1 = 0;
            var y_1 = top !== null && top !== void 0 ? top : 0;
            var prevRowHeight_1 = 0;
            indicators.forEach(function (indicator) {
                var _a = _this.getIndicatorTooltipData(dataList, crosshair, indicator, customApi, formatThousands, styles), name = _a.name, calcParamsText = _a.calcParamsText, values = _a.values, icons = _a.icons;
                var nameValid = name.length > 0;
                var valuesValid = values.length > 0;
                if (nameValid || valuesValid) {
                    var _b = __read(_this.classifyTooltipIcons(icons), 3), leftIcons = _b[0], middleIcons = _b[1], rightIcons = _b[2];
                    // draw left icons
                    var _c = __read(_this.drawStandardTooltipIcons(ctx, bounding, { paneId: paneId, indicatorName: indicator.name, iconId: '' }, activeTooltipIconInfo, leftIcons, x_1, y_1, prevRowHeight_1), 4), leftIconsNextStartX = _c[0], leftIconsNextStartY = _c[1], leftIconsLastRowHeight = _c[2], leftIconsIncreaseHeight = _c[3];
                    x_1 = leftIconsNextStartX;
                    y_1 = leftIconsNextStartY;
                    height += leftIconsIncreaseHeight;
                    prevRowHeight_1 = leftIconsLastRowHeight;
                    if (nameValid) {
                        var text = name;
                        if (calcParamsText.length > 0) {
                            text = "".concat(text).concat(calcParamsText);
                        }
                        var _d = __read(_this.drawStandardTooltipLabels(ctx, bounding, [{ title: { text: '', color: tooltipTextStyles_1.color }, value: { text: text, color: tooltipTextStyles_1.color } }], x_1, y_1, prevRowHeight_1, tooltipTextStyles_1), 4), nameStartX = _d[0], nameStartY = _d[1], nameLastRowHeight = _d[2], nameIncreaseHeight = _d[3];
                        x_1 = nameStartX;
                        y_1 = nameStartY;
                        height += nameIncreaseHeight;
                        prevRowHeight_1 = nameLastRowHeight;
                    }
                    // draw middle icons
                    var _e = __read(_this.drawStandardTooltipIcons(ctx, bounding, { paneId: paneId, indicatorName: indicator.name, iconId: '' }, activeTooltipIconInfo, middleIcons, x_1, y_1, prevRowHeight_1), 4), middleIconsNextStartX = _e[0], middleIconsNextStartY = _e[1], middleIconsLastRowHeight = _e[2], middleIconsIncreaseHeight = _e[3];
                    x_1 = middleIconsNextStartX;
                    y_1 = middleIconsNextStartY;
                    height += middleIconsIncreaseHeight;
                    prevRowHeight_1 = middleIconsLastRowHeight;
                    if (valuesValid) {
                        var _f = __read(_this.drawStandardTooltipLabels(ctx, bounding, values, x_1, y_1, prevRowHeight_1, tooltipTextStyles_1), 4), valuesStartX = _f[0], valuestartY = _f[1], valuesLastRowHeight = _f[2], valuesIncreaseHeight = _f[3];
                        x_1 = valuesStartX;
                        y_1 = valuestartY;
                        height += valuesIncreaseHeight;
                        prevRowHeight_1 = valuesLastRowHeight;
                    }
                    // draw right icons
                    var _g = __read(_this.drawStandardTooltipIcons(ctx, bounding, { paneId: paneId, indicatorName: indicator.name, iconId: '' }, activeTooltipIconInfo, rightIcons, x_1, y_1, prevRowHeight_1), 4), rightIconsNextStartY = _g[1], rightIconsLastRowHeight = _g[2], rightIconsIncreaseHeight = _g[3];
                    x_1 = 0;
                    height += rightIconsIncreaseHeight;
                    y_1 = rightIconsNextStartY + rightIconsLastRowHeight;
                    prevRowHeight_1 = 0;
                }
            });
        }
        return height;
    };
    IndicatorTooltipView.prototype.drawStandardTooltipIcons = function (ctx, bounding, currentIconInfo, activeIconInfo, icons, startX, startY, prevRowHeight) {
        var _this = this;
        var x = startX;
        var y = startY;
        var width = 0;
        var rowHeight = 0;
        var increaseHeight = 0;
        if (icons.length > 0) {
            icons.forEach(function (icon) {
                var marginLeft = icon.marginLeft, marginTop = icon.marginTop, marginRight = icon.marginRight, marginBottom = icon.marginBottom, paddingLeft = icon.paddingLeft, paddingTop = icon.paddingTop, paddingRight = icon.paddingRight, paddingBottom = icon.paddingBottom, size = icon.size, fontFamily = icon.fontFamily, text = icon.icon;
                ctx.font = createFont(size, 'normal', fontFamily);
                width += (marginLeft + paddingLeft + ctx.measureText(text).width + paddingRight + marginRight);
                rowHeight = Math.max(rowHeight, marginTop + paddingTop + size + paddingBottom + marginBottom);
            });
            if (x + width > bounding.width) {
                x = icons[0].marginLeft;
                y += prevRowHeight;
                increaseHeight = rowHeight;
            }
            else {
                increaseHeight = Math.max(0, rowHeight - prevRowHeight);
            }
            icons.forEach(function (icon) {
                var _a;
                var marginLeft = icon.marginLeft, marginTop = icon.marginTop, marginRight = icon.marginRight, paddingLeft = icon.paddingLeft, paddingTop = icon.paddingTop, paddingRight = icon.paddingRight, paddingBottom = icon.paddingBottom, color = icon.color, activeColor = icon.activeColor, size = icon.size, fontFamily = icon.fontFamily, text = icon.icon, backgroundColor = icon.backgroundColor, activeBackgroundColor = icon.activeBackgroundColor;
                x += marginLeft;
                var active = (activeIconInfo === null || activeIconInfo === void 0 ? void 0 : activeIconInfo.paneId) === currentIconInfo.paneId && (activeIconInfo === null || activeIconInfo === void 0 ? void 0 : activeIconInfo.indicatorName) === currentIconInfo.indicatorName && (activeIconInfo === null || activeIconInfo === void 0 ? void 0 : activeIconInfo.iconId) === icon.id;
                (_a = _this.createFigure('rectText', { text: text, x: x, y: y + marginTop }, {
                    paddingLeft: paddingLeft,
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    paddingBottom: paddingBottom,
                    color: active ? activeColor : color,
                    size: size,
                    family: fontFamily,
                    backgroundColor: active ? activeBackgroundColor : backgroundColor
                }, {
                    mouseClickEvent: _this._boundIconClickEvent(currentIconInfo, icon.id),
                    mouseMoveEvent: _this._boundIconMouseMoveEvent(currentIconInfo, icon.id)
                })) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                x += (paddingLeft + ctx.measureText(text).width + paddingRight + marginRight);
            });
        }
        return [x, y, Math.max(prevRowHeight, rowHeight), increaseHeight];
    };
    IndicatorTooltipView.prototype.drawStandardTooltipLabels = function (ctx, bounding, labels, startX, startY, prevRowHeight, styles) {
        var _this = this;
        var x = startX;
        var y = startY;
        var rowHeight = 0;
        var increaseHeight = 0;
        var currentPrevRowHeight = prevRowHeight;
        if (labels.length > 0) {
            var marginLeft_1 = styles.marginLeft, marginTop_1 = styles.marginTop, marginRight_1 = styles.marginRight, marginBottom_1 = styles.marginBottom, size_1 = styles.size, family_1 = styles.family, weight_1 = styles.weight;
            ctx.font = createFont(size_1, weight_1, family_1);
            labels.forEach(function (data) {
                var _a, _b;
                var title = data.title;
                var value = data.value;
                var titleTextWidth = ctx.measureText(title.text).width;
                var valueTextWidth = ctx.measureText(value.text).width;
                var totalTextWidth = titleTextWidth + valueTextWidth;
                var height = size_1 + marginTop_1 + marginBottom_1;
                if (x + marginLeft_1 + totalTextWidth + marginRight_1 > bounding.width) {
                    x = marginLeft_1;
                    y += height;
                    increaseHeight += height;
                }
                else {
                    x += marginLeft_1;
                    increaseHeight += Math.max(0, height - currentPrevRowHeight);
                }
                rowHeight = Math.max(currentPrevRowHeight, height);
                currentPrevRowHeight = rowHeight;
                if (title.text.length > 0) {
                    (_a = _this.createFigure('text', { x: x, y: y + marginTop_1, text: title.text }, { color: title.color, size: size_1, family: family_1, weight: weight_1 })) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                    x += titleTextWidth;
                }
                (_b = _this.createFigure('text', { x: x, y: y + marginTop_1, text: value.text }, { color: value.color, size: size_1, family: family_1, weight: weight_1 })) === null || _b === void 0 ? void 0 : _b.draw(ctx);
                x += (valueTextWidth + marginRight_1);
            });
        }
        return [x, y, rowHeight, increaseHeight];
    };
    IndicatorTooltipView.prototype.isDrawTooltip = function (crosshair, styles) {
        var showRule = styles.showRule;
        return showRule === exports.TooltipShowRule.Always ||
            (showRule === exports.TooltipShowRule.FollowCross && (crosshair.paneId !== undefined));
    };
    IndicatorTooltipView.prototype.getIndicatorTooltipData = function (dataList, crosshair, indicator, customApi, thousandsSeparator, styles) {
        var _a, _b, _c;
        var tooltipStyles = styles.tooltip;
        var name = tooltipStyles.showName ? indicator.shortName : '';
        var calcParamsText = '';
        var calcParams = indicator.calcParams;
        if (calcParams.length > 0 && tooltipStyles.showParams) {
            calcParamsText = "(".concat(calcParams.join(','), ")");
        }
        var tooltipData = { name: name, calcParamsText: calcParamsText, values: [], icons: tooltipStyles.icons };
        var dataIndex = crosshair.dataIndex;
        var result = (_a = indicator.result) !== null && _a !== void 0 ? _a : [];
        var values = [];
        if (indicator.visible) {
            var indicatorData_1 = (_b = result[dataIndex]) !== null && _b !== void 0 ? _b : {};
            eachFigures(dataList, indicator, dataIndex, styles, function (figure, figureStyles) {
                if (figure.title !== undefined) {
                    var color = figureStyles.color;
                    var value = indicatorData_1[figure.key];
                    if (isValid(value)) {
                        value = formatPrecision(value, indicator.precision);
                        if (indicator.shouldFormatBigNumber) {
                            value = customApi.formatBigNumber(value);
                        }
                    }
                    values.push({ title: { text: figure.title, color: color }, value: { text: formatThousands(value !== null && value !== void 0 ? value : tooltipStyles.defaultValue, thousandsSeparator), color: color } });
                }
            });
            tooltipData.values = values;
        }
        if (indicator.createTooltipDataSource !== null) {
            var widget = this.getWidget();
            var pane = widget.getPane();
            var chartStore = pane.getChart().getChartStore();
            var _d = indicator.createTooltipDataSource({
                kLineDataList: dataList,
                indicator: indicator,
                visibleRange: chartStore.getTimeScaleStore().getVisibleRange(),
                bounding: widget.getBounding(),
                crosshair: crosshair,
                defaultStyles: styles,
                xAxis: (_c = pane.getChart().getPaneById(PaneIdConstants.XAXIS)) === null || _c === void 0 ? void 0 : _c.getAxisComponent(),
                yAxis: pane.getAxisComponent()
            }), customName = _d.name, customCalcParamsText = _d.calcParamsText, customValues = _d.values, customIcons = _d.icons;
            if (customName !== undefined && tooltipStyles.showName) {
                tooltipData.name = customName;
            }
            if (customCalcParamsText !== undefined && tooltipStyles.showParams) {
                tooltipData.calcParamsText = customCalcParamsText;
            }
            if (customIcons !== undefined) {
                tooltipData.icons = customIcons;
            }
            if (customValues !== undefined && indicator.visible) {
                var optimizedValues_1 = [];
                var color_1 = styles.tooltip.text.color;
                customValues.forEach(function (data) {
                    var title = { text: '', color: color_1 };
                    if (isObject(data.title)) {
                        title = data.title;
                    }
                    else {
                        title.text = data.title;
                    }
                    var value = { text: '', color: color_1 };
                    if (isObject(data.value)) {
                        value = data.value;
                    }
                    else {
                        value.text = data.value;
                    }
                    value.text = formatThousands(value.text, thousandsSeparator);
                    optimizedValues_1.push({ title: title, value: value });
                });
                tooltipData.values = optimizedValues_1;
            }
        }
        return tooltipData;
    };
    IndicatorTooltipView.prototype.classifyTooltipIcons = function (icons) {
        var leftIcons = [];
        var middleIcons = [];
        var rightIcons = [];
        icons.forEach(function (icon) {
            switch (icon.position) {
                case exports.TooltipIconPosition.Left: {
                    leftIcons.push(icon);
                    break;
                }
                case exports.TooltipIconPosition.Middle: {
                    middleIcons.push(icon);
                    break;
                }
                case exports.TooltipIconPosition.Right: {
                    rightIcons.push(icon);
                    break;
                }
            }
        });
        return [leftIcons, middleIcons, rightIcons];
    };
    return IndicatorTooltipView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OverlayView = /** @class */ (function (_super) {
    __extends(OverlayView, _super);
    function OverlayView(widget) {
        var _this = _super.call(this, widget) || this;
        _this._initEvent();
        return _this;
    }
    OverlayView.prototype._initEvent = function () {
        var _this = this;
        var pane = this.getWidget().getPane();
        var paneId = pane.getId();
        var overlayStore = pane.getChart().getChartStore().getOverlayStore();
        this.registerEvent("mouseMoveEvent", function (event) {
            var _a;
            var progressInstanceInfo = overlayStore.getProgressInstanceInfo();
            if (progressInstanceInfo !== null) {
                var overlay = progressInstanceInfo.instance;
                var progressInstancePaneId = progressInstanceInfo.paneId;
                if (overlay.isStart()) {
                    overlayStore.updateProgressInstanceInfo(paneId);
                    progressInstancePaneId = paneId;
                }
                var index = overlay.points.length - 1;
                var key = "".concat(OVERLAY_FIGURE_KEY_PREFIX, "point_").concat(index);
                if (overlay.isDrawing() && progressInstancePaneId === paneId) {
                    overlay.eventMoveForDrawing(_this._coordinateToPoint(progressInstanceInfo.instance, event));
                    (_a = overlay.onDrawing) === null || _a === void 0 ? void 0 : _a.call(overlay, __assign({ overlay: overlay, figureKey: key, figureIndex: index }, event));
                }
                return _this._figureMouseMoveEvent(overlay, 1 /* EventOverlayInfoFigureType.Point */, key, index, 0)(event);
            }
            overlayStore.setHoverInstanceInfo({
                paneId: paneId,
                instance: null,
                figureType: 0 /* EventOverlayInfoFigureType.None */,
                figureKey: "",
                figureIndex: -1,
                attrsIndex: -1,
            }, event);
            return false;
        })
            .registerEvent("mouseClickEvent", function (event) {
            var _a, _b;
            var progressInstanceInfo = overlayStore.getProgressInstanceInfo();
            if (progressInstanceInfo !== null) {
                var overlay = progressInstanceInfo.instance;
                var progressInstancePaneId = progressInstanceInfo.paneId;
                if (overlay.isStart()) {
                    overlayStore.updateProgressInstanceInfo(paneId, true);
                    progressInstancePaneId = paneId;
                }
                var index = overlay.points.length - 1;
                var key = "".concat(OVERLAY_FIGURE_KEY_PREFIX, "point_").concat(index);
                if (overlay.isDrawing() && progressInstancePaneId === paneId) {
                    overlay.eventMoveForDrawing(_this._coordinateToPoint(overlay, event));
                    (_a = overlay.onDrawing) === null || _a === void 0 ? void 0 : _a.call(overlay, __assign({ overlay: overlay, figureKey: key, figureIndex: index }, event));
                    overlay.nextStep();
                    if (!overlay.isDrawing()) {
                        overlayStore.progressInstanceComplete();
                        (_b = overlay.onDrawEnd) === null || _b === void 0 ? void 0 : _b.call(overlay, __assign({ overlay: overlay, figureKey: key, figureIndex: index }, event));
                    }
                }
                return _this._figureMouseClickEvent(overlay, 1 /* EventOverlayInfoFigureType.Point */, key, index, 0)(event);
            }
            overlayStore.setClickInstanceInfo({
                paneId: paneId,
                instance: null,
                figureType: 0 /* EventOverlayInfoFigureType.None */,
                figureKey: "",
                figureIndex: -1,
                attrsIndex: -1,
            }, event);
            return false;
        })
            .registerEvent("mouseDoubleClickEvent", function (event) {
            var _a;
            var progressInstanceInfo = overlayStore.getProgressInstanceInfo();
            if (progressInstanceInfo !== null) {
                var overlay = progressInstanceInfo.instance;
                var progressInstancePaneId = progressInstanceInfo.paneId;
                if (overlay.isDrawing() && progressInstancePaneId === paneId) {
                    overlay.forceComplete();
                    if (!overlay.isDrawing()) {
                        overlayStore.progressInstanceComplete();
                        var index_1 = overlay.points.length - 1;
                        var key = "".concat(OVERLAY_FIGURE_KEY_PREFIX, "point_").concat(index_1);
                        (_a = overlay.onDrawEnd) === null || _a === void 0 ? void 0 : _a.call(overlay, __assign({ overlay: overlay, figureKey: key, figureIndex: index_1 }, event));
                    }
                }
                var index = overlay.points.length - 1;
                return _this._figureMouseClickEvent(overlay, 1 /* EventOverlayInfoFigureType.Point */, "".concat(OVERLAY_FIGURE_KEY_PREFIX, "point_").concat(index), index, 0)(event);
            }
            return false;
        })
            .registerEvent("mouseRightClickEvent", function (event) {
            var progressInstanceInfo = overlayStore.getProgressInstanceInfo();
            if (progressInstanceInfo !== null) {
                var overlay = progressInstanceInfo.instance;
                if (overlay.isDrawing()) {
                    var index = overlay.points.length - 1;
                    return _this._figureMouseRightClickEvent(overlay, 1 /* EventOverlayInfoFigureType.Point */, "".concat(OVERLAY_FIGURE_KEY_PREFIX, "point_").concat(index), index, 0)(event);
                }
            }
            return false;
        })
            .registerEvent("mouseUpEvent", function (event) {
            var _a;
            var _b = overlayStore.getPressedInstanceInfo(), instance = _b.instance, figureIndex = _b.figureIndex, figureKey = _b.figureKey;
            if (instance !== null) {
                (_a = instance.onPressedMoveEnd) === null || _a === void 0 ? void 0 : _a.call(instance, __assign({ overlay: instance, figureKey: figureKey, figureIndex: figureIndex }, event));
            }
            overlayStore.setPressedInstanceInfo({
                paneId: paneId,
                instance: null,
                figureType: 0 /* EventOverlayInfoFigureType.None */,
                figureKey: "",
                figureIndex: -1,
                attrsIndex: -1,
            });
            return false;
        })
            .registerEvent("pressedMouseMoveEvent", function (event) {
            var _a, _b;
            var _c = overlayStore.getPressedInstanceInfo(), instance = _c.instance, figureType = _c.figureType, figureIndex = _c.figureIndex, figureKey = _c.figureKey;
            if (instance !== null) {
                if (!instance.lock) {
                    if (!((_b = (_a = instance.onPressedMoving) === null || _a === void 0 ? void 0 : _a.call(instance, __assign({ overlay: instance, figureIndex: figureIndex, figureKey: figureKey }, event))) !== null && _b !== void 0 ? _b : false)) {
                        var point = _this._coordinateToPoint(instance, event);
                        if (figureType === 1 /* EventOverlayInfoFigureType.Point */) {
                            instance.eventPressedPointMove(point, figureIndex);
                        }
                        else {
                            instance.eventPressedOtherMove(point, _this.getWidget()
                                .getPane()
                                .getChart()
                                .getChartStore()
                                .getTimeScaleStore());
                        }
                    }
                }
                return true;
            }
            return false;
        });
    };
    OverlayView.prototype._createFigureEvents = function (overlay, figureType, figureKey, figureIndex, attrsIndex, ignoreEvent) {
        var eventHandler;
        if (!overlay.isDrawing()) {
            var eventTypes = [];
            if (ignoreEvent !== undefined) {
                if (isBoolean(ignoreEvent)) {
                    if (ignoreEvent) {
                        eventTypes = getAllOverlayFigureIgnoreEventTypes();
                    }
                }
                else {
                    eventTypes = ignoreEvent;
                }
            }
            if (eventTypes.length === 0) {
                return {
                    mouseMoveEvent: this._figureMouseMoveEvent(overlay, figureType, figureKey, figureIndex, attrsIndex),
                    mouseDownEvent: this._figureMouseDownEvent(overlay, figureType, figureKey, figureIndex, attrsIndex),
                    mouseClickEvent: this._figureMouseClickEvent(overlay, figureType, figureKey, figureIndex, attrsIndex),
                    mouseRightClickEvent: this._figureMouseRightClickEvent(overlay, figureType, figureKey, figureIndex, attrsIndex),
                    mouseDoubleClickEvent: this._figureMousedbClickEvent(overlay, figureType, figureKey, figureIndex, attrsIndex),
                };
            }
            eventHandler = {};
            // [
            //   'mouseClickEvent', mouseDoubleClickEvent, 'mouseRightClickEvent',
            //   'tapEvent', 'doubleTapEvent', 'mouseDownEvent',
            //   'touchStartEvent', 'mouseMoveEvent', 'touchMoveEvent'
            // ]
            if (!eventTypes.includes("mouseMoveEvent") &&
                !eventTypes.includes("touchMoveEvent")) {
                eventHandler.mouseMoveEvent = this._figureMouseMoveEvent(overlay, figureType, figureKey, figureIndex, attrsIndex);
            }
            if (!eventTypes.includes("mouseDownEvent") &&
                !eventTypes.includes("touchStartEvent")) {
                eventHandler.mouseDownEvent = this._figureMouseDownEvent(overlay, figureType, figureKey, figureIndex, attrsIndex);
            }
            if (!eventTypes.includes("mouseClickEvent") &&
                !eventTypes.includes("tapEvent")) {
                eventHandler.mouseClickEvent = this._figureMouseClickEvent(overlay, figureType, figureKey, figureIndex, attrsIndex);
            }
            if (!eventTypes.includes("mouseDoubleClickEvent") &&
                !eventTypes.includes("doubleTapEvent")) {
                eventHandler.mouseDoubleClickEvent = this._figureMousedbClickEvent(overlay, figureType, figureKey, figureIndex, attrsIndex);
            }
            if (!eventTypes.includes("mouseRightClickEvent")) {
                eventHandler.mouseRightClickEvent = this._figureMouseRightClickEvent(overlay, figureType, figureKey, figureIndex, attrsIndex);
            }
        }
        return eventHandler;
    };
    OverlayView.prototype._figureMouseMoveEvent = function (overlay, figureType, figureKey, figureIndex, attrsIndex) {
        var _this = this;
        return function (event) {
            var pane = _this.getWidget().getPane();
            var overlayStore = pane.getChart().getChartStore().getOverlayStore();
            overlayStore.setHoverInstanceInfo({
                paneId: pane.getId(),
                instance: overlay,
                figureType: figureType,
                figureKey: figureKey,
                figureIndex: figureIndex,
                attrsIndex: attrsIndex,
            }, event);
            return true;
        };
    };
    OverlayView.prototype._figureMouseDownEvent = function (overlay, figureType, figureKey, figureIndex, attrsIndex) {
        var _this = this;
        return function (event) {
            var _a;
            var pane = _this.getWidget().getPane();
            var paneId = pane.getId();
            var overlayStore = pane.getChart().getChartStore().getOverlayStore();
            overlay.startPressedMove(_this._coordinateToPoint(overlay, event));
            (_a = overlay.onPressedMoveStart) === null || _a === void 0 ? void 0 : _a.call(overlay, __assign({ overlay: overlay, figureIndex: figureIndex, figureKey: figureKey }, event));
            overlayStore.setPressedInstanceInfo({
                paneId: paneId,
                instance: overlay,
                figureType: figureType,
                figureKey: figureKey,
                figureIndex: figureIndex,
                attrsIndex: attrsIndex,
            });
            return true;
        };
    };
    OverlayView.prototype._figureMouseClickEvent = function (overlay, figureType, figureKey, figureIndex, attrsIndex) {
        var _this = this;
        return function (event) {
            var pane = _this.getWidget().getPane();
            var paneId = pane.getId();
            var overlayStore = pane.getChart().getChartStore().getOverlayStore();
            overlayStore.setClickInstanceInfo({
                paneId: paneId,
                instance: overlay,
                figureType: figureType,
                figureKey: figureKey,
                figureIndex: figureIndex,
                attrsIndex: attrsIndex,
            }, event);
            return true;
        };
    };
    OverlayView.prototype._figureMousedbClickEvent = function (overlay, _figureType, figureKey, figureIndex, _attrsIndex) {
        return function (event) {
            var _a;
            (_a = overlay.onDoubleClick) === null || _a === void 0 ? void 0 : _a.call(overlay, __assign(__assign({}, event), { figureIndex: figureIndex, figureKey: figureKey, overlay: overlay }));
            return true;
        };
    };
    OverlayView.prototype._figureMouseRightClickEvent = function (overlay, _figureType, figureKey, figureIndex, _attrsIndex) {
        var _this = this;
        return function (event) {
            var _a, _b;
            if (!((_b = (_a = overlay.onRightClick) === null || _a === void 0 ? void 0 : _a.call(overlay, __assign({ overlay: overlay, figureIndex: figureIndex, figureKey: figureKey }, event))) !== null && _b !== void 0 ? _b : false)) {
                var pane = _this.getWidget().getPane();
                var overlayStore = pane.getChart().getChartStore().getOverlayStore();
                overlayStore.removeInstance(overlay);
            }
            return true;
        };
    };
    OverlayView.prototype._coordinateToPoint = function (overlay, coordinate) {
        var _a, _b;
        var point = {};
        var pane = this.getWidget().getPane();
        var chart = pane.getChart();
        var paneId = pane.getId();
        var timeScaleStore = chart.getChartStore().getTimeScaleStore();
        if (this.coordinateToPointTimestampDataIndexFlag()) {
            var xAxis = (_a = chart
                .getPaneById(PaneIdConstants.XAXIS)) === null || _a === void 0 ? void 0 : _a.getAxisComponent();
            var dataIndex = xAxis.convertFromPixel(coordinate.x);
            var timestamp = (_b = timeScaleStore.dataIndexToTimestamp(dataIndex)) !== null && _b !== void 0 ? _b : undefined;
            point.dataIndex = dataIndex;
            point.timestamp = timestamp;
        }
        if (this.coordinateToPointValueFlag()) {
            var yAxis = pane.getAxisComponent();
            var value = yAxis.convertFromPixel(coordinate.y);
            if (overlay.mode !== exports.OverlayMode.Normal &&
                paneId === PaneIdConstants.CANDLE &&
                point.dataIndex !== undefined) {
                var kLineData = timeScaleStore.getDataByDataIndex(point.dataIndex);
                if (kLineData !== null) {
                    var modeSensitivity = overlay.modeSensitivity;
                    if (value > kLineData.high) {
                        if (overlay.mode === exports.OverlayMode.WeakMagnet) {
                            var highY = yAxis.convertToPixel(kLineData.high);
                            var buffValue = yAxis.convertFromPixel(highY - modeSensitivity);
                            if (value < buffValue) {
                                value = kLineData.high;
                            }
                        }
                        else {
                            value = kLineData.high;
                        }
                    }
                    else if (value < kLineData.low) {
                        if (overlay.mode === exports.OverlayMode.WeakMagnet) {
                            var lowY = yAxis.convertToPixel(kLineData.low);
                            var buffValue = yAxis.convertFromPixel(lowY - modeSensitivity);
                            if (value > buffValue) {
                                value = kLineData.low;
                            }
                        }
                        else {
                            value = kLineData.low;
                        }
                    }
                    else {
                        var max = Math.max(kLineData.open, kLineData.close);
                        var min = Math.min(kLineData.open, kLineData.close);
                        if (value > max) {
                            if (value - max < kLineData.high - value) {
                                value = max;
                            }
                            else {
                                value = kLineData.high;
                            }
                        }
                        else if (value < min) {
                            if (value - kLineData.low < min - value) {
                                value = kLineData.low;
                            }
                            else {
                                value = min;
                            }
                        }
                        else if (max - value < value - min) {
                            value = max;
                        }
                        else {
                            value = min;
                        }
                    }
                }
            }
            point.value = value;
        }
        return point;
    };
    OverlayView.prototype.coordinateToPointValueFlag = function () {
        return true;
    };
    OverlayView.prototype.coordinateToPointTimestampDataIndexFlag = function () {
        return true;
    };
    OverlayView.prototype.dispatchEvent = function (name, event, other) {
        if (this.getWidget()
            .getPane()
            .getChart()
            .getChartStore()
            .getOverlayStore()
            .isDrawing()) {
            return this.onEvent(name, event, other);
        }
        return _super.prototype.dispatchEvent.call(this, name, event, other);
    };
    OverlayView.prototype.checkEventOn = function () {
        return true;
    };
    OverlayView.prototype.drawImp = function (ctx) {
        var _this = this;
        var _a;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var paneId = pane.getId();
        var chart = pane.getChart();
        var yAxis = pane.getAxisComponent();
        var xAxis = (_a = chart
            .getPaneById(PaneIdConstants.XAXIS)) === null || _a === void 0 ? void 0 : _a.getAxisComponent();
        var bounding = widget.getBounding();
        var chartStore = chart.getChartStore();
        var customApi = chartStore.getCustomApi();
        var thousandsSeparator = chartStore.getThousandsSeparator();
        var timeScaleStore = chartStore.getTimeScaleStore();
        var dateTimeFormat = timeScaleStore.getDateTimeFormat();
        var barSpace = timeScaleStore.getBarSpace();
        var precision = chartStore.getPrecision();
        var defaultStyles = chartStore.getStyles().overlay;
        var overlayStore = chartStore.getOverlayStore();
        var hoverInstanceInfo = overlayStore.getHoverInstanceInfo();
        var clickInstanceInfo = overlayStore.getClickInstanceInfo();
        var overlays = this.getCompleteOverlays(overlayStore, paneId);
        overlays.forEach(function (overlay) {
            if (overlay.visible) {
                _this._drawOverlay(ctx, overlay, bounding, barSpace, precision, dateTimeFormat, customApi, thousandsSeparator, defaultStyles, xAxis, yAxis, hoverInstanceInfo, clickInstanceInfo, timeScaleStore);
            }
        });
        var progressInstanceInfo = overlayStore.getProgressInstanceInfo();
        if (progressInstanceInfo !== null) {
            var overlay = this.getProgressOverlay(progressInstanceInfo, paneId);
            // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
            if (overlay !== null && overlay.visible) {
                this._drawOverlay(ctx, overlay, bounding, barSpace, precision, dateTimeFormat, customApi, thousandsSeparator, defaultStyles, xAxis, yAxis, hoverInstanceInfo, clickInstanceInfo, timeScaleStore);
            }
        }
    };
    OverlayView.prototype._drawOverlay = function (ctx, overlay, bounding, barSpace, precision, dateTimeFormat, customApi, thousandsSeparator, defaultStyles, xAxis, yAxis, hoverInstanceInfo, clickInstanceInfo, timeScaleStore) {
        var points = overlay.points;
        var coordinates = points.map(function (point) {
            var _a, _b;
            var dataIndex = point.dataIndex;
            if (point.timestamp !== undefined) {
                dataIndex = timeScaleStore.timestampToDataIndex(point.timestamp);
            }
            var coordinate = { x: 0, y: 0 };
            if (dataIndex !== undefined) {
                coordinate.x = (_a = xAxis === null || xAxis === void 0 ? void 0 : xAxis.convertToPixel(dataIndex)) !== null && _a !== void 0 ? _a : 0;
            }
            if (point.value !== undefined) {
                coordinate.y = (_b = yAxis === null || yAxis === void 0 ? void 0 : yAxis.convertToPixel(point.value)) !== null && _b !== void 0 ? _b : 0;
            }
            return coordinate;
        });
        if (coordinates.length > 0) {
            var figures = new Array().concat(this.getFigures(overlay, coordinates, bounding, barSpace, precision, thousandsSeparator, dateTimeFormat, defaultStyles, xAxis, yAxis));
            this.drawFigures(ctx, overlay, figures, defaultStyles);
        }
        this.drawDefaultFigures(ctx, overlay, coordinates, bounding, precision, dateTimeFormat, customApi, thousandsSeparator, defaultStyles, xAxis, yAxis, hoverInstanceInfo, clickInstanceInfo);
    };
    OverlayView.prototype.drawFigures = function (ctx, overlay, figures, defaultStyles) {
        var _this = this;
        figures.forEach(function (figure, figureIndex) {
            var type = figure.type, styles = figure.styles, attrs = figure.attrs, ignoreEvent = figure.ignoreEvent;
            var attrsArray = [].concat(attrs);
            attrsArray.forEach(function (ats, attrsIndex) {
                var _a, _b, _c;
                var evnets = _this._createFigureEvents(overlay, 2 /* EventOverlayInfoFigureType.Other */, (_a = figure.key) !== null && _a !== void 0 ? _a : "", figureIndex, attrsIndex, ignoreEvent);
                var ss = __assign(__assign(__assign({}, defaultStyles[type]), (_b = overlay.styles) === null || _b === void 0 ? void 0 : _b[type]), styles);
                (_c = _this.createFigure(type, ats, ss, evnets)) === null || _c === void 0 ? void 0 : _c.draw(ctx);
            });
        });
    };
    OverlayView.prototype.getCompleteOverlays = function (overlayStore, paneId) {
        return overlayStore.getInstances(paneId);
    };
    OverlayView.prototype.getProgressOverlay = function (info, paneId) {
        if (info.paneId === paneId) {
            return info.instance;
        }
        return null;
    };
    OverlayView.prototype.getFigures = function (overlay, coordinates, bounding, barSpace, precision, thousandsSeparator, dateTimeFormat, defaultStyles, xAxis, yAxis) {
        var _a, _b;
        return ((_b = (_a = overlay.createPointFigures) === null || _a === void 0 ? void 0 : _a.call(overlay, {
            overlay: overlay,
            coordinates: coordinates,
            bounding: bounding,
            barSpace: barSpace,
            precision: precision,
            thousandsSeparator: thousandsSeparator,
            dateTimeFormat: dateTimeFormat,
            defaultStyles: defaultStyles,
            xAxis: xAxis,
            yAxis: yAxis,
        })) !== null && _b !== void 0 ? _b : []);
    };
    OverlayView.prototype.drawDefaultFigures = function (ctx, overlay, coordinates, _bounding, _precision, _dateTimeFormat, _customApi, _thousandsSeparator, defaultStyles, _xAxis, _yAxis, hoverInstanceInfo, clickInstanceInfo) {
        var _this = this;
        var _a, _b;
        if (overlay.needDefaultPointFigure) {
            if ((((_a = hoverInstanceInfo.instance) === null || _a === void 0 ? void 0 : _a.id) === overlay.id &&
                hoverInstanceInfo.figureType !== 0 /* EventOverlayInfoFigureType.None */) ||
                (((_b = clickInstanceInfo.instance) === null || _b === void 0 ? void 0 : _b.id) === overlay.id &&
                    clickInstanceInfo.figureType !== 0 /* EventOverlayInfoFigureType.None */)) {
                var styles = overlay.styles;
                var pointStyles_1 = __assign(__assign({}, defaultStyles.point), styles === null || styles === void 0 ? void 0 : styles.point);
                coordinates.forEach(function (_a, index) {
                    var _b, _c, _d;
                    var x = _a.x, y = _a.y;
                    var radius = pointStyles_1.radius;
                    var color = pointStyles_1.color;
                    var borderColor = pointStyles_1.borderColor;
                    var borderSize = pointStyles_1.borderSize;
                    if (((_b = hoverInstanceInfo.instance) === null || _b === void 0 ? void 0 : _b.id) === overlay.id &&
                        hoverInstanceInfo.figureType === 1 /* EventOverlayInfoFigureType.Point */ &&
                        hoverInstanceInfo.figureIndex === index) {
                        radius = pointStyles_1.activeRadius;
                        color = pointStyles_1.activeColor;
                        borderColor = pointStyles_1.activeBorderColor;
                        borderSize = pointStyles_1.activeBorderSize;
                    }
                    (_c = _this.createFigure("circle", { x: x, y: y, r: radius + borderSize }, { color: borderColor }, _this._createFigureEvents(overlay, 1 /* EventOverlayInfoFigureType.Point */, "".concat(OVERLAY_FIGURE_KEY_PREFIX, "point_").concat(index), index, 0))) === null || _c === void 0 ? void 0 : _c.draw(ctx);
                    (_d = _this.createFigure("circle", { x: x, y: y, r: radius }, { color: color })) === null || _d === void 0 ? void 0 : _d.draw(ctx);
                });
            }
        }
    };
    return OverlayView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IndicatorWidget = /** @class */ (function (_super) {
    __extends(IndicatorWidget, _super);
    function IndicatorWidget(rootContainer, pane) {
        var _this = _super.call(this, rootContainer, pane) || this;
        _this._gridView = new GridView(_this);
        _this._indicatorView = new IndicatorView(_this);
        _this._crosshairLineView = new CrosshairLineView(_this);
        _this._tooltipView = _this.createTooltipView();
        _this._overlayView = new OverlayView(_this);
        _this.addChild(_this._tooltipView);
        _this.addChild(_this._overlayView);
        _this.getContainer().style.cursor = 'crosshair';
        _this.registerEvent('mouseMoveEvent', function () {
            pane.getChart().getChartStore().getTooltipStore().setActiveIconInfo();
            return false;
        });
        return _this;
    }
    IndicatorWidget.prototype.getName = function () {
        return WidgetNameConstants.MAIN;
    };
    IndicatorWidget.prototype.updateMain = function (ctx) {
        this.updateMainContent(ctx);
        this._indicatorView.draw(ctx);
        this._gridView.draw(ctx);
    };
    IndicatorWidget.prototype.createTooltipView = function () {
        return new IndicatorTooltipView(this);
    };
    IndicatorWidget.prototype.updateMainContent = function (_ctx) { };
    IndicatorWidget.prototype.updateOverlay = function (ctx) {
        this._overlayView.draw(ctx);
        this._crosshairLineView.draw(ctx);
        this._tooltipView.draw(ctx);
    };
    return IndicatorWidget;
}(DrawWidget));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandleAreaView = /** @class */ (function (_super) {
    __extends(CandleAreaView, _super);
    function CandleAreaView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandleAreaView.prototype.drawImp = function (ctx) {
        var _a, _b;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var chart = pane.getChart();
        var bounding = widget.getBounding();
        var yAxis = pane.getAxisComponent();
        var candleAreaStyles = chart.getStyles().candle.area;
        var lineCoordinates = [];
        var areaCoordinates = [];
        var minY = Number.MAX_SAFE_INTEGER;
        this.eachChildren(function (data, barSpace, i) {
            var kLineData = data.data, x = data.x;
            var halfGapBar = barSpace.halfGapBar;
            var value = kLineData[candleAreaStyles.value];
            if (isNumber(value)) {
                var y = yAxis.convertToPixel(value);
                if (i === 0) {
                    var startX = x - halfGapBar;
                    areaCoordinates.push({ x: startX, y: bounding.height });
                    areaCoordinates.push({ x: startX, y: y });
                    lineCoordinates.push({ x: startX, y: y });
                }
                lineCoordinates.push({ x: x, y: y });
                areaCoordinates.push({ x: x, y: y });
                minY = Math.min(minY, y);
            }
        });
        var areaCoordinateCount = areaCoordinates.length;
        if (areaCoordinateCount > 0) {
            var lastCoordinate = areaCoordinates[areaCoordinateCount - 1];
            var endX = lastCoordinate.x;
            lineCoordinates.push({ x: endX, y: lastCoordinate.y });
            areaCoordinates.push({ x: endX, y: lastCoordinate.y });
            areaCoordinates.push({ x: endX, y: bounding.height });
        }
        if (lineCoordinates.length > 0) {
            (_a = this.createFigure('line', { coordinates: lineCoordinates }, {
                color: candleAreaStyles.lineColor,
                size: candleAreaStyles.lineSize
            })) === null || _a === void 0 ? void 0 : _a.draw(ctx);
        }
        if (areaCoordinates.length > 0) {
            // Draw real-time background
            var backgroundColor = candleAreaStyles.backgroundColor;
            var color = void 0;
            if (isArray(backgroundColor)) {
                var gradient_1 = ctx.createLinearGradient(0, bounding.height, 0, minY);
                try {
                    backgroundColor.forEach(function (_a) {
                        var offset = _a.offset, color = _a.color;
                        gradient_1.addColorStop(offset, color);
                    });
                }
                catch (e) {
                }
                color = gradient_1;
            }
            else {
                color = backgroundColor;
            }
            (_b = this.createFigure('polygon', { coordinates: areaCoordinates }, { color: color })) === null || _b === void 0 ? void 0 : _b.draw(ctx);
        }
    };
    return CandleAreaView;
}(ChildrenView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandleHighLowPriceView = /** @class */ (function (_super) {
    __extends(CandleHighLowPriceView, _super);
    function CandleHighLowPriceView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandleHighLowPriceView.prototype.drawImp = function (ctx) {
        var widget = this.getWidget();
        var pane = widget.getPane();
        var chartStore = pane.getChart().getChartStore();
        var priceMarkStyles = chartStore.getStyles().candle.priceMark;
        var highPriceMarkStyles = priceMarkStyles.high;
        var lowPriceMarkStyles = priceMarkStyles.low;
        if (priceMarkStyles.show && (highPriceMarkStyles.show || lowPriceMarkStyles.show)) {
            var thousandsSeparator = chartStore.getThousandsSeparator();
            var precision = chartStore.getPrecision();
            var yAxis = pane.getAxisComponent();
            var high_1 = Number.MIN_SAFE_INTEGER;
            var highX_1 = 0;
            var low_1 = Number.MAX_SAFE_INTEGER;
            var lowX_1 = 0;
            this.eachChildren(function (data) {
                var kLineData = data.data, x = data.x;
                if (high_1 < kLineData.high) {
                    high_1 = kLineData.high;
                    highX_1 = x;
                }
                if (low_1 > kLineData.low) {
                    low_1 = kLineData.low;
                    lowX_1 = x;
                }
            });
            var highY = yAxis.convertToPixel(high_1);
            var lowY = yAxis.convertToPixel(low_1);
            if (highPriceMarkStyles.show && high_1 !== Number.MIN_SAFE_INTEGER) {
                this._drawMark(ctx, formatThousands(formatPrecision(high_1, precision.price), thousandsSeparator), { x: highX_1, y: highY }, highY < lowY ? [-2, -5] : [2, 5], highPriceMarkStyles);
            }
            if (lowPriceMarkStyles.show && low_1 !== Number.MAX_SAFE_INTEGER) {
                this._drawMark(ctx, formatThousands(formatPrecision(low_1, precision.price), thousandsSeparator), { x: lowX_1, y: lowY }, highY < lowY ? [2, 5] : [-2, -5], lowPriceMarkStyles);
            }
        }
    };
    CandleHighLowPriceView.prototype._drawMark = function (ctx, text, coordinate, offsets, styles) {
        var _a, _b, _c;
        var startX = coordinate.x;
        var startY = coordinate.y + offsets[0];
        (_a = this.createFigure('line', {
            coordinates: [
                { x: startX - 2, y: startY + offsets[0] },
                { x: startX, y: startY },
                { x: startX + 2, y: startY + offsets[0] }
            ]
        }, { color: styles.color })) === null || _a === void 0 ? void 0 : _a.draw(ctx);
        var lineEndX;
        var textStartX;
        var textAlign;
        var width = this.getWidget().getBounding().width;
        if (startX > width / 2) {
            lineEndX = startX - 5;
            textStartX = lineEndX - styles.textOffset;
            textAlign = 'right';
        }
        else {
            lineEndX = startX + 5;
            textAlign = 'left';
            textStartX = lineEndX + styles.textOffset;
        }
        var y = startY + offsets[1];
        (_b = this.createFigure('line', {
            coordinates: [
                { x: startX, y: startY },
                { x: startX, y: y },
                { x: lineEndX, y: y }
            ]
        }, { color: styles.color })) === null || _b === void 0 ? void 0 : _b.draw(ctx);
        (_c = this.createFigure('text', {
            x: textStartX,
            y: y,
            text: text,
            align: textAlign,
            baseline: 'middle'
        }, {
            color: styles.color,
            size: styles.textSize,
            family: styles.textFamily,
            weight: styles.textWeight
        })) === null || _c === void 0 ? void 0 : _c.draw(ctx);
    };
    return CandleHighLowPriceView;
}(ChildrenView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandleLastPriceView = /** @class */ (function (_super) {
    __extends(CandleLastPriceView, _super);
    function CandleLastPriceView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandleLastPriceView.prototype.drawImp = function (ctx) {
        var _a;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var bounding = widget.getBounding();
        var chartStore = pane.getChart().getChartStore();
        var priceMarkStyles = chartStore.getStyles().candle.priceMark;
        var lastPriceMarkStyles = priceMarkStyles.last;
        var lastPriceMarkLineStyles = lastPriceMarkStyles.line;
        if (priceMarkStyles.show && lastPriceMarkStyles.show && lastPriceMarkLineStyles.show) {
            var yAxis = pane.getAxisComponent();
            var dataList = chartStore.getDataList();
            var data = dataList[dataList.length - 1];
            if (data != null) {
                var close_1 = data.close, open_1 = data.open;
                var priceY = yAxis.convertToNicePixel(close_1);
                var color = void 0;
                if (close_1 > open_1) {
                    color = lastPriceMarkStyles.upColor;
                }
                else if (close_1 < open_1) {
                    color = lastPriceMarkStyles.downColor;
                }
                else {
                    color = lastPriceMarkStyles.noChangeColor;
                }
                (_a = this.createFigure('line', {
                    coordinates: [
                        { x: 0, y: priceY },
                        { x: bounding.width, y: priceY }
                    ]
                }, {
                    style: lastPriceMarkLineStyles.style,
                    color: color,
                    size: lastPriceMarkLineStyles.size,
                    dashedValue: lastPriceMarkLineStyles.dashedValue
                })) === null || _a === void 0 ? void 0 : _a.draw(ctx);
            }
        }
    };
    return CandleLastPriceView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var zhCN = {
    time: '时间：',
    open: '开：',
    high: '高：',
    low: '低：',
    close: '收：',
    volume: '成交量：',
    change: '涨幅：'
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var enUS = {
    time: 'Time: ',
    open: 'Open: ',
    high: 'High: ',
    low: 'Low: ',
    close: 'Close: ',
    volume: 'Volume: ',
    change: 'Change: '
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var locales = {
    'zh-CN': zhCN,
    'en-US': enUS
};
function registerLocale(locale, ls) {
    locales[locale] = __assign(__assign({}, locales[locale]), ls);
}
function getSupportedLocales() {
    return Object.keys(locales);
}
function i18n(key, locale) {
    var _a, _b;
    return (_b = (_a = locales[locale]) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : key;
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandleTooltipView = /** @class */ (function (_super) {
    __extends(CandleTooltipView, _super);
    function CandleTooltipView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandleTooltipView.prototype.drawImp = function (ctx) {
        var _a;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var paneId = pane.getId();
        var chartStore = pane.getChart().getChartStore();
        var crosshair = chartStore.getCrosshairStore().get();
        if (crosshair.kLineData !== undefined) {
            var bounding = widget.getBounding();
            var yAxisBounding = (_a = pane.getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getBounding();
            var dataList = chartStore.getDataList();
            var precision = chartStore.getPrecision();
            var locale = chartStore.getLocale();
            var customApi = chartStore.getCustomApi();
            var thousandsSeparator = chartStore.getThousandsSeparator();
            var activeIconInfo = chartStore.getTooltipStore().getActiveIconInfo();
            var indicators = chartStore.getIndicatorStore().getInstances(pane.getId());
            var dateTimeFormat = chartStore.getTimeScaleStore().getDateTimeFormat();
            var styles = chartStore.getStyles();
            var candleStyles = styles.candle;
            var indicatorStyles = styles.indicator;
            if (candleStyles.tooltip.showType === exports.TooltipShowType.Rect &&
                indicatorStyles.tooltip.showType === exports.TooltipShowType.Rect) {
                var isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip);
                var isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip);
                this._drawRectTooltip(ctx, dataList, indicators, bounding, yAxisBounding, crosshair, precision, dateTimeFormat, locale, customApi, thousandsSeparator, isDrawCandleTooltip, isDrawIndicatorTooltip, styles, 0);
            }
            else if (candleStyles.tooltip.showType === exports.TooltipShowType.Standard &&
                indicatorStyles.tooltip.showType === exports.TooltipShowType.Standard) {
                var top_1 = this._drawCandleStandardTooltip(ctx, dataList, paneId, bounding, crosshair, activeIconInfo, precision, dateTimeFormat, locale, customApi, thousandsSeparator, candleStyles);
                this.drawIndicatorTooltip(ctx, paneId, dataList, crosshair, activeIconInfo, indicators, customApi, thousandsSeparator, bounding, indicatorStyles, top_1);
            }
            else if (candleStyles.tooltip.showType === exports.TooltipShowType.Rect &&
                indicatorStyles.tooltip.showType === exports.TooltipShowType.Standard) {
                var top_2 = this.drawIndicatorTooltip(ctx, paneId, dataList, crosshair, activeIconInfo, indicators, customApi, thousandsSeparator, bounding, indicatorStyles, 0);
                var isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip);
                this._drawRectTooltip(ctx, dataList, indicators, bounding, yAxisBounding, crosshair, precision, dateTimeFormat, locale, customApi, thousandsSeparator, isDrawCandleTooltip, false, styles, top_2);
            }
            else {
                var top_3 = this._drawCandleStandardTooltip(ctx, dataList, paneId, bounding, crosshair, activeIconInfo, precision, dateTimeFormat, locale, customApi, thousandsSeparator, candleStyles);
                var isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip);
                this._drawRectTooltip(ctx, dataList, indicators, bounding, yAxisBounding, crosshair, precision, dateTimeFormat, locale, customApi, thousandsSeparator, false, isDrawIndicatorTooltip, styles, top_3);
            }
        }
    };
    CandleTooltipView.prototype._drawCandleStandardTooltip = function (ctx, dataList, paneId, bounding, crosshair, activeTooltipIconInfo, precision, dateTimeFormat, locale, customApi, thousandsSeparator, styles) {
        var _a, _b, _c;
        var tooltipStyles = styles.tooltip;
        var tooltipTextStyles = tooltipStyles.text;
        var height = 0;
        if (this.isDrawTooltip(crosshair, tooltipStyles)) {
            var dataIndex = (_a = crosshair.dataIndex) !== null && _a !== void 0 ? _a : 0;
            var values = this._getCandleTooltipData({ prev: (_b = dataList[dataIndex - 1]) !== null && _b !== void 0 ? _b : null, current: crosshair.kLineData, next: (_c = dataList[dataIndex + 1]) !== null && _c !== void 0 ? _c : null }, precision, dateTimeFormat, locale, customApi, thousandsSeparator, styles);
            var x = 0;
            var y = 0;
            var prevRowHeight = 0;
            var _d = __read(this.classifyTooltipIcons(tooltipStyles.icons), 3), leftIcons = _d[0], middleIcons = _d[1], rightIcons = _d[2];
            var _e = __read(this.drawStandardTooltipIcons(ctx, bounding, { paneId: paneId, indicatorName: '', iconId: '' }, activeTooltipIconInfo, leftIcons, x, y, 0), 4), leftIconsNextStartX = _e[0], leftIconsNextStartY = _e[1], leftIconsLastRowHeight = _e[2], leftIconsIncreaseHeight = _e[3];
            x = leftIconsNextStartX;
            y = leftIconsNextStartY;
            height += leftIconsIncreaseHeight;
            prevRowHeight = leftIconsLastRowHeight;
            var _f = __read(this.drawStandardTooltipIcons(ctx, bounding, { paneId: paneId, indicatorName: '', iconId: '' }, activeTooltipIconInfo, middleIcons, x, y, prevRowHeight), 4), middleIconsNextStartX = _f[0], middleIconsNextStartY = _f[1], middleIconsLastRowHeight = _f[2], middleIconsIncreaseHeight = _f[3];
            x = middleIconsNextStartX;
            y = middleIconsNextStartY;
            height += middleIconsIncreaseHeight;
            prevRowHeight = middleIconsLastRowHeight;
            if (values.length > 0) {
                var _g = __read(this.drawStandardTooltipLabels(ctx, bounding, values, x, y, prevRowHeight, tooltipTextStyles), 4), valuesNextStartX = _g[0], valuesIconsNextStartY = _g[1], valuesIconsLastRowHeight = _g[2], valuesIconsIncreaseHeight = _g[3];
                x = valuesNextStartX;
                y = valuesIconsNextStartY;
                height += valuesIconsIncreaseHeight;
                prevRowHeight = valuesIconsLastRowHeight;
            }
            var _h = __read(this.drawStandardTooltipIcons(ctx, bounding, { paneId: paneId, indicatorName: '', iconId: '' }, activeTooltipIconInfo, rightIcons, x, y, prevRowHeight), 4), rightIconsNextStartX = _h[0], rightIconsNextStartY = _h[1], rightIconsLastRowHeight = _h[2], rightIconsIncreaseHeight = _h[3];
            x = rightIconsNextStartX;
            y = rightIconsNextStartY;
            height += rightIconsIncreaseHeight;
            prevRowHeight = rightIconsLastRowHeight;
        }
        return height;
    };
    CandleTooltipView.prototype._drawRectTooltip = function (ctx, dataList, indicators, bounding, yAxisBounding, crosshair, precision, dateTimeFormat, locale, customApi, thousandsSeparator, isDrawCandleTooltip, isDrawIndicatorTooltip, styles, top) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var candleStyles = styles.candle;
        var indicatorStyles = styles.indicator;
        var candleTooltipStyles = candleStyles.tooltip;
        var indicatorTooltipStyles = indicatorStyles.tooltip;
        if (isDrawCandleTooltip || isDrawIndicatorTooltip) {
            var dataIndex = (_a = crosshair.dataIndex) !== null && _a !== void 0 ? _a : 0;
            var candleTooltipDatas = this._getCandleTooltipData({ prev: (_b = dataList[dataIndex - 1]) !== null && _b !== void 0 ? _b : null, current: crosshair.kLineData, next: (_c = dataList[dataIndex + 1]) !== null && _c !== void 0 ? _c : null }, precision, dateTimeFormat, locale, customApi, thousandsSeparator, candleStyles);
            var _f = candleTooltipStyles.text, baseTextMarginLeft_1 = _f.marginLeft, baseTextMarginRight_1 = _f.marginRight, baseTextMarginTop_1 = _f.marginTop, baseTextMarginBottom_1 = _f.marginBottom, baseTextSize_1 = _f.size, baseTextWeight_1 = _f.weight, baseTextFamily_1 = _f.family;
            var _g = candleTooltipStyles.rect, rectPosition = _g.position, rectPaddingLeft = _g.paddingLeft, rectPaddingRight_1 = _g.paddingRight, rectPaddingTop = _g.paddingTop, rectPaddingBottom = _g.paddingBottom, rectOffsetLeft = _g.offsetLeft, rectOffsetRight = _g.offsetRight, rectOffsetTop = _g.offsetTop, rectOffsetBottom = _g.offsetBottom, rectBorderSize_1 = _g.borderSize, rectBorderRadius = _g.borderRadius, rectBorderColor = _g.borderColor, rectBackgroundColor = _g.color;
            var maxTextWidth_1 = 0;
            var rectWidth_1 = 0;
            var rectHeight_1 = 0;
            if (isDrawCandleTooltip) {
                ctx.font = createFont(baseTextSize_1, baseTextWeight_1, baseTextFamily_1);
                candleTooltipDatas.forEach(function (data) {
                    var title = data.title;
                    var value = data.value;
                    var text = "".concat(title.text).concat(value.text);
                    var labelWidth = ctx.measureText(text).width + baseTextMarginLeft_1 + baseTextMarginRight_1;
                    maxTextWidth_1 = Math.max(maxTextWidth_1, labelWidth);
                });
                rectHeight_1 += ((baseTextMarginBottom_1 + baseTextMarginTop_1 + baseTextSize_1) * candleTooltipDatas.length);
            }
            var _h = indicatorTooltipStyles.text, indicatorTextMarginLeft_1 = _h.marginLeft, indicatorTextMarginRight_1 = _h.marginRight, indicatorTextMarginTop_1 = _h.marginTop, indicatorTextMarginBottom_1 = _h.marginBottom, indicatorTextSize_1 = _h.size, indicatorTextWeight_1 = _h.weight, indicatorTextFamily_1 = _h.family;
            var indicatorTooltipDataValuess_1 = [];
            if (isDrawIndicatorTooltip) {
                ctx.font = createFont(indicatorTextSize_1, indicatorTextWeight_1, indicatorTextFamily_1);
                indicators.forEach(function (indicator) {
                    var _a;
                    var tooltipDataValues = (_a = _this.getIndicatorTooltipData(dataList, crosshair, indicator, customApi, thousandsSeparator, indicatorStyles).values) !== null && _a !== void 0 ? _a : [];
                    indicatorTooltipDataValuess_1.push(tooltipDataValues);
                    tooltipDataValues.forEach(function (data) {
                        var title = data.title;
                        var value = data.value;
                        var text = "".concat(title.text).concat(value.text);
                        var textWidth = ctx.measureText(text).width + indicatorTextMarginLeft_1 + indicatorTextMarginRight_1;
                        maxTextWidth_1 = Math.max(maxTextWidth_1, textWidth);
                        rectHeight_1 += (indicatorTextMarginTop_1 + indicatorTextMarginBottom_1 + indicatorTextSize_1);
                    });
                });
            }
            rectWidth_1 += maxTextWidth_1;
            if (rectWidth_1 !== 0 && rectHeight_1 !== 0) {
                rectWidth_1 += (rectBorderSize_1 * 2 + rectPaddingLeft + rectPaddingRight_1);
                rectHeight_1 += (rectBorderSize_1 * 2 + rectPaddingTop + rectPaddingBottom);
                var centerX = bounding.width / 2;
                var isPointer = rectPosition === CandleTooltipRectPosition.Pointer && crosshair.paneId === PaneIdConstants.CANDLE;
                var isLeft = ((_d = crosshair.realX) !== null && _d !== void 0 ? _d : 0) > centerX;
                var rectX_1 = 0;
                if (isPointer) {
                    var realX = crosshair.realX;
                    if (isLeft) {
                        rectX_1 = realX - rectOffsetRight - rectWidth_1;
                    }
                    else {
                        rectX_1 = realX + rectOffsetLeft;
                    }
                }
                else {
                    if (isLeft) {
                        rectX_1 = rectOffsetLeft;
                        if (styles.yAxis.inside && styles.yAxis.position === exports.YAxisPosition.Left) {
                            rectX_1 += yAxisBounding.width;
                        }
                    }
                    else {
                        rectX_1 = bounding.width - rectOffsetRight - rectWidth_1;
                        if (styles.yAxis.inside && styles.yAxis.position === exports.YAxisPosition.Right) {
                            rectX_1 -= yAxisBounding.width;
                        }
                    }
                }
                var rectY = top + rectOffsetTop;
                if (isPointer) {
                    var y = crosshair.y;
                    rectY = y - rectHeight_1 / 2;
                    if (rectY + rectHeight_1 > bounding.height - rectOffsetBottom) {
                        rectY = bounding.height - rectOffsetBottom - rectHeight_1;
                    }
                    if (rectY < top + rectOffsetTop) {
                        rectY = top + rectOffsetTop;
                    }
                }
                (_e = this.createFigure('rect', {
                    x: rectX_1,
                    y: rectY,
                    width: rectWidth_1,
                    height: rectHeight_1
                }, {
                    style: exports.PolygonType.StrokeFill,
                    color: rectBackgroundColor,
                    borderColor: rectBorderColor,
                    borderSize: rectBorderSize_1,
                    borderRadius: rectBorderRadius
                })) === null || _e === void 0 ? void 0 : _e.draw(ctx);
                var candleTextX_1 = rectX_1 + rectBorderSize_1 + rectPaddingLeft + baseTextMarginLeft_1;
                var textY_1 = rectY + rectBorderSize_1 + rectPaddingTop;
                if (isDrawCandleTooltip) {
                    // render candle texts
                    candleTooltipDatas.forEach(function (data) {
                        var _a, _b;
                        textY_1 += baseTextMarginTop_1;
                        var title = data.title;
                        (_a = _this.createFigure('text', {
                            x: candleTextX_1,
                            y: textY_1,
                            text: title.text
                        }, {
                            color: title.color,
                            size: baseTextSize_1,
                            family: baseTextFamily_1,
                            weight: baseTextWeight_1
                        })) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                        var value = data.value;
                        (_b = _this.createFigure('text', {
                            x: rectX_1 + rectWidth_1 - rectBorderSize_1 - baseTextMarginRight_1 - rectPaddingRight_1,
                            y: textY_1,
                            text: value.text,
                            align: 'right'
                        }, {
                            color: value.color,
                            size: baseTextSize_1,
                            family: baseTextFamily_1,
                            weight: baseTextWeight_1
                        })) === null || _b === void 0 ? void 0 : _b.draw(ctx);
                        textY_1 += (baseTextSize_1 + baseTextMarginBottom_1);
                    });
                }
                if (isDrawIndicatorTooltip) {
                    // render indicator texts
                    var indicatorTextX_1 = rectX_1 + rectBorderSize_1 + rectPaddingLeft + indicatorTextMarginLeft_1;
                    indicatorTooltipDataValuess_1.forEach(function (datas) {
                        datas.forEach(function (data) {
                            var _a, _b;
                            textY_1 += indicatorTextMarginTop_1;
                            var title = data.title;
                            var value = data.value;
                            (_a = _this.createFigure('text', {
                                x: indicatorTextX_1,
                                y: textY_1,
                                text: title.text
                            }, {
                                color: title.color,
                                size: indicatorTextSize_1,
                                family: indicatorTextFamily_1,
                                weight: indicatorTextWeight_1
                            })) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                            (_b = _this.createFigure('text', {
                                x: rectX_1 + rectWidth_1 - rectBorderSize_1 - indicatorTextMarginRight_1 - rectPaddingRight_1,
                                y: textY_1,
                                text: value.text,
                                align: 'right'
                            }, {
                                color: value.color,
                                size: indicatorTextSize_1,
                                family: indicatorTextFamily_1,
                                weight: indicatorTextWeight_1
                            })) === null || _b === void 0 ? void 0 : _b.draw(ctx);
                            textY_1 += (indicatorTextSize_1 + indicatorTextMarginBottom_1);
                        });
                    });
                }
            }
        }
    };
    CandleTooltipView.prototype._getCandleTooltipData = function (data, precision, dateTimeFormat, locale, customApi, thousandsSeparator, styles) {
        var _a, _b, _c, _d, _e;
        var tooltipStyles = styles.tooltip;
        var textColor = tooltipStyles.text.color;
        var current = data.current;
        var prevClose = (_b = (_a = data.prev) === null || _a === void 0 ? void 0 : _a.close) !== null && _b !== void 0 ? _b : current.close;
        var changeValue = current.close - prevClose;
        var amplitude = (current.high - current.low) / current.high * 100;
        var pricePrecision = precision.price, volumePrecision = precision.volume;
        var mapping = {
            '{time}': customApi.formatDate(dateTimeFormat, current.timestamp, 'YYYY-MM-DD HH:mm', exports.FormatDateType.Tooltip),
            '{open}': formatThousands(formatPrecision(current.open, pricePrecision), thousandsSeparator),
            '{high}': formatThousands(formatPrecision(current.high, pricePrecision), thousandsSeparator),
            '{low}': formatThousands(formatPrecision(current.low, pricePrecision), thousandsSeparator),
            '{close}': formatThousands(formatPrecision(current.close, pricePrecision), thousandsSeparator),
            '{volume}': formatThousands(customApi.formatBigNumber(formatPrecision((_c = current.volume) !== null && _c !== void 0 ? _c : tooltipStyles.defaultValue, volumePrecision)), thousandsSeparator),
            '{change}': prevClose === 0 ? tooltipStyles.defaultValue : "".concat(formatPrecision(changeValue / prevClose * 100), "%"),
            '{amplitude}': "".concat(formatPrecision(amplitude), "%")
        };
        var labelValues = (_e = (isFunction(tooltipStyles.custom)
            ? (_d = tooltipStyles.custom) === null || _d === void 0 ? void 0 : _d.call(tooltipStyles, data, styles)
            : tooltipStyles.custom)) !== null && _e !== void 0 ? _e : [
            { title: 'T', value: '{time}' },
            { title: 'O', value: '{open}' },
            { title: 'H', value: '{high}' },
            { title: 'L', value: '{low}' },
            { title: 'C', value: '{close}' },
            { title: 'V', value: '{volume}' }
        ];
        return labelValues.map(function (_a) {
            var _b;
            var title = _a.title, value = _a.value;
            var t = { text: '', color: '' };
            if (isObject(title)) {
                t = title;
            }
            else {
                t.text = title;
                t.color = textColor;
            }
            t.text = i18n(t.text, locale);
            var v = { text: tooltipStyles.defaultValue, color: '' };
            if (isObject(value)) {
                v = value;
            }
            else {
                v.text = value;
                v.color = textColor;
            }
            var match = v.text.match(/{(\S*)}/);
            if (match !== null && match.length > 1) {
                var key = "{".concat(match[1], "}");
                v.text = v.text.replace(key, (_b = mapping[key]) !== null && _b !== void 0 ? _b : tooltipStyles.defaultValue);
                if (key === '{change}') {
                    v.color = changeValue === 0 ? styles.priceMark.last.noChangeColor : (changeValue > 0 ? styles.priceMark.last.upColor : styles.priceMark.last.downColor);
                }
            }
            return { title: t, value: v };
        });
    };
    return CandleTooltipView;
}(IndicatorTooltipView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandleWidget = /** @class */ (function (_super) {
    __extends(CandleWidget, _super);
    function CandleWidget(rootContainer, pane) {
        var _this = _super.call(this, rootContainer, pane) || this;
        _this._candleBarView = new CandleBarView(_this);
        _this._candleAreaView = new CandleAreaView(_this);
        _this._candleHighLowPriceView = new CandleHighLowPriceView(_this);
        _this._candleLastPriceLineView = new CandleLastPriceView(_this);
        _this.addChild(_this._candleBarView);
        return _this;
    }
    CandleWidget.prototype.updateMainContent = function (ctx) {
        var candleStyles = this.getPane().getChart().getStyles().candle;
        if (candleStyles.type !== exports.CandleType.Area) {
            this._candleBarView.draw(ctx);
            this._candleHighLowPriceView.draw(ctx);
            this._candleLastPriceLineView.draw(ctx);
        }
        else {
            this._candleAreaView.draw(ctx);
        }
    };
    CandleWidget.prototype.createTooltipView = function () {
        return new CandleTooltipView(this);
    };
    return CandleWidget;
}(IndicatorWidget));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AxisView = /** @class */ (function (_super) {
    __extends(AxisView, _super);
    function AxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisView.prototype.drawImp = function (ctx) {
        var _this = this;
        var _a;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var bounding = widget.getBounding();
        var axis = pane.getAxisComponent();
        var styles = this.getAxisStyles(pane.getChart().getStyles());
        if (styles.show) {
            if (styles.axisLine.show) {
                (_a = this.createFigure('line', this.createAxisLine(bounding, styles), styles.axisLine)) === null || _a === void 0 ? void 0 : _a.draw(ctx);
            }
            var ticks = axis.getTicks();
            if (styles.tickLine.show) {
                var lines = this.createTickLines(ticks, bounding, styles);
                lines.forEach(function (line) {
                    var _a;
                    (_a = _this.createFigure('line', line, styles.tickLine)) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                });
            }
            if (styles.tickText.show) {
                var texts = this.createTickTexts(ticks, bounding, styles);
                texts.forEach(function (text) {
                    var _a;
                    (_a = _this.createFigure('text', text, styles.tickText)) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                });
            }
        }
    };
    return AxisView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var YxisView = /** @class */ (function (_super) {
    __extends(YxisView, _super);
    function YxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YxisView.prototype.getAxisStyles = function (styles) {
        return styles.yAxis;
    };
    YxisView.prototype.createAxisLine = function (bounding, styles) {
        var yAxis = this.getWidget().getPane().getAxisComponent();
        var size = styles.axisLine.size;
        var x;
        if (yAxis.isFromZero()) {
            x = size / 2;
        }
        else {
            x = bounding.width - size;
        }
        return {
            coordinates: [
                { x: x, y: 0 },
                { x: x, y: bounding.height }
            ]
        };
    };
    YxisView.prototype.createTickLines = function (ticks, bounding, styles) {
        var yAxis = this.getWidget().getPane().getAxisComponent();
        var axisLineStyles = styles.axisLine;
        var tickLineStyles = styles.tickLine;
        var startX = 0;
        var endX = 0;
        if (yAxis.isFromZero()) {
            startX = 0;
            if (axisLineStyles.show) {
                startX += axisLineStyles.size;
            }
            endX = startX + tickLineStyles.length;
        }
        else {
            startX = bounding.width;
            if (axisLineStyles.show) {
                startX -= axisLineStyles.size;
            }
            endX = startX - tickLineStyles.length;
        }
        return ticks.map(function (tick) { return ({
            coordinates: [
                { x: startX, y: tick.coord },
                { x: endX, y: tick.coord }
            ]
        }); });
    };
    YxisView.prototype.createTickTexts = function (ticks, bounding, styles) {
        var yAxis = this.getWidget().getPane().getAxisComponent();
        var axisLineStyles = styles.axisLine;
        var tickLineStyles = styles.tickLine;
        var tickTextStyles = styles.tickText;
        var x = 0;
        if (yAxis.isFromZero()) {
            x = tickTextStyles.marginStart;
            if (axisLineStyles.show) {
                x += axisLineStyles.size;
            }
            if (tickLineStyles.show) {
                x += tickLineStyles.length;
            }
        }
        else {
            x = bounding.width - tickTextStyles.marginEnd;
            if (axisLineStyles.show) {
                x -= axisLineStyles.size;
            }
            if (tickLineStyles.show) {
                x -= tickLineStyles.length;
            }
        }
        var textAlign = this.getWidget().getPane().getAxisComponent().isFromZero() ? 'left' : 'right';
        return ticks.map(function (tick) { return ({
            x: x,
            y: tick.coord,
            text: tick.text,
            align: textAlign,
            baseline: 'middle'
        }); });
    };
    return YxisView;
}(AxisView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandleLastPriceLabelView = /** @class */ (function (_super) {
    __extends(CandleLastPriceLabelView, _super);
    function CandleLastPriceLabelView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandleLastPriceLabelView.prototype.drawImp = function (ctx) {
        var _a;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var bounding = widget.getBounding();
        var chartStore = pane.getChart().getChartStore();
        var priceMarkStyles = chartStore.getStyles().candle.priceMark;
        var lastPriceMarkStyles = priceMarkStyles.last;
        var lastPriceMarkTextStyles = lastPriceMarkStyles.text;
        if (priceMarkStyles.show && lastPriceMarkStyles.show && lastPriceMarkTextStyles.show) {
            var precision = chartStore.getPrecision();
            var yAxis = pane.getAxisComponent();
            var dataList = chartStore.getDataList();
            var visibleDataList = chartStore.getVisibleDataList();
            var data = dataList[dataList.length - 1];
            if (data !== undefined) {
                var close_1 = data.close, open_1 = data.open;
                var priceY = yAxis.convertToNicePixel(close_1);
                var backgroundColor = void 0;
                if (close_1 > open_1) {
                    backgroundColor = lastPriceMarkStyles.upColor;
                }
                else if (close_1 < open_1) {
                    backgroundColor = lastPriceMarkStyles.downColor;
                }
                else {
                    backgroundColor = lastPriceMarkStyles.noChangeColor;
                }
                var text = void 0;
                if (yAxis.getType() === exports.YAxisType.Percentage) {
                    var fromData = visibleDataList[0].data;
                    var fromClose = fromData.close;
                    text = "".concat(((close_1 - fromClose) / fromClose * 100).toFixed(2), "%");
                }
                else {
                    text = formatPrecision(close_1, precision.price);
                }
                text = formatThousands(text, chartStore.getThousandsSeparator());
                var x = void 0;
                var textAlgin = void 0;
                if (yAxis.isFromZero()) {
                    x = 0;
                    textAlgin = 'left';
                }
                else {
                    x = bounding.width;
                    textAlgin = 'right';
                }
                (_a = this.createFigure('rectText', {
                    x: x,
                    y: priceY,
                    text: text,
                    align: textAlgin,
                    baseline: 'middle'
                }, __assign(__assign({}, lastPriceMarkTextStyles), { backgroundColor: backgroundColor }))) === null || _a === void 0 ? void 0 : _a.draw(ctx);
            }
        }
    };
    return CandleLastPriceLabelView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IndicatorLastValueView = /** @class */ (function (_super) {
    __extends(IndicatorLastValueView, _super);
    function IndicatorLastValueView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorLastValueView.prototype.drawImp = function (ctx) {
        var _this = this;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var bounding = widget.getBounding();
        var chartStore = pane.getChart().getChartStore();
        var customApi = chartStore.getCustomApi();
        var defaultStyles = chartStore.getStyles().indicator;
        var lastValueMarkStyles = defaultStyles.lastValueMark;
        var lastValueMarkTextStyles = lastValueMarkStyles.text;
        if (lastValueMarkStyles.show) {
            var yAxis_1 = pane.getAxisComponent();
            var dataList_1 = chartStore.getDataList();
            var dataIndex_1 = dataList_1.length - 1;
            var indicators = chartStore.getIndicatorStore().getInstances(pane.getId());
            var thousandsSeparator_1 = chartStore.getThousandsSeparator();
            indicators.forEach(function (indicator) {
                var result = indicator.result;
                var indicatorData = result[dataIndex_1];
                if (indicatorData !== undefined && indicator.visible) {
                    var precision_1 = indicator.precision;
                    eachFigures(dataList_1, indicator, dataIndex_1, defaultStyles, function (figure, figureStyles) {
                        var _a;
                        var value = indicatorData[figure.key];
                        if (isValid(value)) {
                            var y = yAxis_1.convertToNicePixel(value);
                            var text = formatPrecision(value, precision_1);
                            if (indicator.shouldFormatBigNumber) {
                                text = customApi.formatBigNumber(text);
                            }
                            text = formatThousands(text, thousandsSeparator_1);
                            var x = void 0;
                            var textAlign = void 0;
                            if (yAxis_1.isFromZero()) {
                                x = 0;
                                textAlign = 'left';
                            }
                            else {
                                x = bounding.width;
                                textAlign = 'right';
                            }
                            (_a = _this.createFigure('rectText', {
                                x: x,
                                y: y,
                                text: text,
                                align: textAlign,
                                baseline: 'middle'
                            }, __assign(__assign({}, lastValueMarkTextStyles), { backgroundColor: figureStyles.color }))) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                        }
                    });
                }
            });
        }
    };
    return IndicatorLastValueView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OverlayYAxisView = /** @class */ (function (_super) {
    __extends(OverlayYAxisView, _super);
    function OverlayYAxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OverlayYAxisView.prototype.coordinateToPointTimestampDataIndexFlag = function () {
        return false;
    };
    OverlayYAxisView.prototype.drawDefaultFigures = function (ctx, overlay, coordinates, bounding, precision, dateTimeFormat, customApi, thousandsSeparator, defaultStyles, xAxis, yAxis, _hoverInstanceInfo, clickInstanceInfo) {
        this.drawFigures(ctx, overlay, this.getDefaultFigures(overlay, coordinates, bounding, precision, dateTimeFormat, customApi, thousandsSeparator, xAxis, yAxis, clickInstanceInfo), defaultStyles);
    };
    OverlayYAxisView.prototype.getDefaultFigures = function (overlay, coordinates, bounding, precision, _dateTimeFormat, _customApi, thousandsSeparator, _xAxis, yAxis, clickInstanceInfo) {
        var _a, _b;
        var figures = [];
        if (overlay.needDefaultYAxisFigure &&
            overlay.id === ((_a = clickInstanceInfo.instance) === null || _a === void 0 ? void 0 : _a.id) &&
            clickInstanceInfo.paneId === this.getWidget().getPane().getId()) {
            var topY_1 = Number.MAX_SAFE_INTEGER;
            var bottomY_1 = Number.MIN_SAFE_INTEGER;
            var isFromZero = (_b = yAxis === null || yAxis === void 0 ? void 0 : yAxis.isFromZero()) !== null && _b !== void 0 ? _b : false;
            var textAlign_1;
            var x_1;
            if (isFromZero) {
                textAlign_1 = 'left';
                x_1 = 0;
            }
            else {
                textAlign_1 = 'right';
                x_1 = bounding.width;
            }
            coordinates.forEach(function (coordinate, index) {
                var point = overlay.points[index];
                if (point.value !== undefined) {
                    topY_1 = Math.min(topY_1, coordinate.y);
                    bottomY_1 = Math.max(bottomY_1, coordinate.y);
                    var text = formatThousands(formatPrecision(point.value, precision.price), thousandsSeparator);
                    figures.push({ type: 'rectText', attrs: { x: x_1, y: coordinate.y, text: text, align: textAlign_1, baseline: 'middle' }, ignoreEvent: true });
                }
            });
            if (coordinates.length > 1) {
                figures.unshift({ type: 'rect', attrs: { x: 0, y: topY_1, width: bounding.width, height: bottomY_1 - topY_1 }, ignoreEvent: true });
            }
        }
        return figures;
    };
    OverlayYAxisView.prototype.getFigures = function (overlay, coordinates, bounding, barSpace, precision, thousandsSeparator, dateTimeFormat, defaultStyles, xAxis, yAxis) {
        var _a, _b;
        return (_b = (_a = overlay.createYAxisFigures) === null || _a === void 0 ? void 0 : _a.call(overlay, { overlay: overlay, coordinates: coordinates, bounding: bounding, barSpace: barSpace, precision: precision, thousandsSeparator: thousandsSeparator, dateTimeFormat: dateTimeFormat, defaultStyles: defaultStyles, xAxis: xAxis, yAxis: yAxis })) !== null && _b !== void 0 ? _b : [];
    };
    return OverlayYAxisView;
}(OverlayView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CrosshairHorizontalLabelView = /** @class */ (function (_super) {
    __extends(CrosshairHorizontalLabelView, _super);
    function CrosshairHorizontalLabelView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrosshairHorizontalLabelView.prototype.drawImp = function (ctx) {
        var _a;
        var widget = this.getWidget();
        var pane = widget.getPane();
        var bounding = widget.getBounding();
        var chartStore = widget.getPane().getChart().getChartStore();
        var crosshair = chartStore.getCrosshairStore().get();
        var styles = chartStore.getStyles().crosshair;
        if (crosshair.paneId !== undefined && this.compare(crosshair, pane.getId())) {
            if (styles.show) {
                var directionStyles = this.getDirectionStyles(styles);
                var textStyles = directionStyles.text;
                if (directionStyles.show && textStyles.show) {
                    var axis = pane.getAxisComponent();
                    var text = this.getText(crosshair, chartStore, axis);
                    ctx.font = createFont(textStyles.size, textStyles.weight, textStyles.family);
                    (_a = this.createFigure('rectText', this.getTextAttrs(text, ctx.measureText(text).width, crosshair, bounding, axis, textStyles), textStyles)) === null || _a === void 0 ? void 0 : _a.draw(ctx);
                }
            }
        }
    };
    CrosshairHorizontalLabelView.prototype.compare = function (crosshair, paneId) {
        return crosshair.paneId === paneId;
    };
    CrosshairHorizontalLabelView.prototype.getDirectionStyles = function (styels) {
        return styels.horizontal;
    };
    CrosshairHorizontalLabelView.prototype.getText = function (crosshair, chartStore, axis) {
        var _a, _b;
        var yAxis = axis;
        var value = axis.convertFromPixel(crosshair.y);
        var text;
        if (yAxis.getType() === exports.YAxisType.Percentage) {
            var visibleDataList = chartStore.getVisibleDataList();
            var fromData = (_b = (_a = visibleDataList[0]) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {};
            text = "".concat(((value - fromData.close) / fromData.close * 100).toFixed(2), "%");
        }
        else {
            var indicators = chartStore.getIndicatorStore().getInstances(crosshair.paneId);
            var precision_1 = 0;
            var shouldFormatBigNumber_1 = false;
            if (yAxis.isInCandle()) {
                precision_1 = chartStore.getPrecision().price;
            }
            else {
                indicators.forEach(function (indicator) {
                    precision_1 = Math.max(indicator.precision, precision_1);
                    if (!shouldFormatBigNumber_1) {
                        shouldFormatBigNumber_1 = indicator.shouldFormatBigNumber;
                    }
                });
            }
            text = formatPrecision(value, precision_1);
            if (shouldFormatBigNumber_1) {
                text = chartStore.getCustomApi().formatBigNumber(text);
            }
        }
        return formatThousands(text, chartStore.getThousandsSeparator());
    };
    CrosshairHorizontalLabelView.prototype.getTextAttrs = function (text, _textWidth, crosshair, bounding, axis, _styles) {
        var yAxis = axis;
        var x;
        var textAlign;
        if (yAxis.isFromZero()) {
            x = 0;
            textAlign = 'left';
        }
        else {
            x = bounding.width;
            textAlign = 'right';
        }
        return { x: x, y: crosshair.y, text: text, align: textAlign, baseline: 'middle' };
    };
    return CrosshairHorizontalLabelView;
}(View));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var YAxisWidget = /** @class */ (function (_super) {
    __extends(YAxisWidget, _super);
    function YAxisWidget(rootContainer, pane) {
        var _this = _super.call(this, rootContainer, pane) || this;
        _this._yAxisView = new YxisView(_this);
        _this._candleLastPriceLabelView = new CandleLastPriceLabelView(_this);
        _this._indicatorLastValueView = new IndicatorLastValueView(_this);
        _this._overlayYAxisView = new OverlayYAxisView(_this);
        _this._crosshairHorizontalLabelView = new CrosshairHorizontalLabelView(_this);
        _this.getContainer().style.cursor = 'ns-resize';
        _this.addChild(_this._overlayYAxisView);
        return _this;
    }
    YAxisWidget.prototype.getName = function () {
        return WidgetNameConstants.YAXIS;
    };
    YAxisWidget.prototype.updateMain = function (ctx) {
        this._yAxisView.draw(ctx);
        if (this.getPane().getAxisComponent().isInCandle()) {
            this._candleLastPriceLabelView.draw(ctx);
        }
        this._indicatorLastValueView.draw(ctx);
    };
    YAxisWidget.prototype.updateOverlay = function (ctx) {
        this._overlayYAxisView.draw(ctx);
        this._crosshairHorizontalLabelView.draw(ctx);
    };
    return YAxisWidget;
}(DrawWidget));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AxisImp = /** @class */ (function () {
    function AxisImp(parent) {
        this._extremum = { min: 0, max: 0, range: 0, realMin: 0, realMax: 0, realRange: 0 };
        this._prevExtremum = { min: 0, max: 0, range: 0, realMin: 0, realMax: 0, realRange: 0 };
        this._ticks = [];
        this._autoCalcTickFlag = true;
        this._parent = parent;
    }
    AxisImp.prototype.getParent = function () { return this._parent; };
    AxisImp.prototype.buildTicks = function (force) {
        if (this._autoCalcTickFlag) {
            this._extremum = this.calcExtremum();
        }
        if (this._prevExtremum.min !== this._extremum.min || this._prevExtremum.max !== this._extremum.max || force) {
            this._prevExtremum = this._extremum;
            this._ticks = this.optimalTicks(this._calcTicks());
            return true;
        }
        return false;
    };
    AxisImp.prototype.getTicks = function () {
        return this._ticks;
    };
    AxisImp.prototype.getScrollZoomEnabled = function () {
        var _a;
        return (_a = this.getParent().getOptions().axisOptions.scrollZoomEnabled) !== null && _a !== void 0 ? _a : true;
    };
    AxisImp.prototype.setExtremum = function (extremum) {
        this._autoCalcTickFlag = false;
        this._extremum = extremum;
    };
    AxisImp.prototype.getExtremum = function () { return this._extremum; };
    AxisImp.prototype.setAutoCalcTickFlag = function (flag) {
        this._autoCalcTickFlag = flag;
    };
    AxisImp.prototype.getAutoCalcTickFlag = function () { return this._autoCalcTickFlag; };
    AxisImp.prototype._calcTicks = function () {
        var _a = this._extremum, realMin = _a.realMin, realMax = _a.realMax, realRange = _a.realRange;
        var ticks = [];
        if (realRange >= 0) {
            var _b = __read(this._calcTickInterval(realRange), 2), interval = _b[0], precision = _b[1];
            var first = round(Math.ceil(realMin / interval) * interval, precision);
            var last = round(Math.floor(realMax / interval) * interval, precision);
            var n = 0;
            var f = first;
            if (interval !== 0) {
                while (f <= last) {
                    var v = f.toFixed(precision);
                    ticks[n] = { text: v, coord: 0, value: v };
                    ++n;
                    f += interval;
                }
            }
        }
        return ticks;
    };
    AxisImp.prototype._calcTickInterval = function (range) {
        var interval = nice(range / 8.0);
        var precision = getPrecision(interval);
        return [interval, precision];
    };
    return AxisImp;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var YAxisImp = /** @class */ (function (_super) {
    __extends(YAxisImp, _super);
    function YAxisImp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YAxisImp.prototype.calcExtremum = function () {
        var _a, _b, _c, _d, _e;
        var parent = this.getParent();
        var chart = parent.getChart();
        var chartStore = chart.getChartStore();
        var min = Number.MAX_SAFE_INTEGER;
        var max = Number.MIN_SAFE_INTEGER;
        var figuresResultList = [];
        var shouldOhlc = false;
        var specifyMin = Number.MAX_SAFE_INTEGER;
        var specifyMax = Number.MIN_SAFE_INTEGER;
        var indicatorPrecision = Number.MAX_SAFE_INTEGER;
        var indicators = chartStore.getIndicatorStore().getInstances(parent.getId());
        indicators.forEach(function (indicator) {
            var _a, _b, _c;
            if (!shouldOhlc) {
                shouldOhlc = (_a = indicator.shouldOhlc) !== null && _a !== void 0 ? _a : false;
            }
            indicatorPrecision = Math.min(indicatorPrecision, indicator.precision);
            if (indicator.minValue !== null) {
                specifyMin = Math.min(specifyMin, indicator.minValue);
            }
            if (indicator.maxValue !== null) {
                specifyMax = Math.max(specifyMax, indicator.maxValue);
            }
            figuresResultList.push({
                figures: (_b = indicator.figures) !== null && _b !== void 0 ? _b : [],
                result: (_c = indicator.result) !== null && _c !== void 0 ? _c : []
            });
        });
        var precision = 4;
        var inCandle = this.isInCandle();
        if (inCandle) {
            var pricePrecision = chartStore.getPrecision().price;
            if (indicatorPrecision !== Number.MAX_SAFE_INTEGER) {
                precision = Math.min(indicatorPrecision, pricePrecision);
            }
            else {
                precision = pricePrecision;
            }
        }
        else {
            if (indicatorPrecision !== Number.MAX_SAFE_INTEGER) {
                precision = indicatorPrecision;
            }
        }
        var visibleDataList = chartStore.getVisibleDataList();
        var candleStyles = chart.getStyles().candle;
        var isArea = candleStyles.type === exports.CandleType.Area;
        var areaValueKey = candleStyles.area.value;
        var shouldCompareHighLow = (inCandle && !isArea) || (!inCandle && shouldOhlc);
        visibleDataList.forEach(function (_a) {
            var dataIndex = _a.dataIndex, data = _a.data;
            if (shouldCompareHighLow) {
                min = Math.min(min, data.low);
                max = Math.max(max, data.high);
            }
            if (inCandle && isArea) {
                var value = data[areaValueKey];
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
            figuresResultList.forEach(function (_a) {
                var _b;
                var figures = _a.figures, result = _a.result;
                var indicatorData = (_b = result[dataIndex]) !== null && _b !== void 0 ? _b : {};
                figures.forEach(function (figure) {
                    var value = indicatorData[figure.key];
                    if (isValid(value)) {
                        min = Math.min(min, value);
                        max = Math.max(max, value);
                    }
                });
            });
        });
        if (min !== Number.MAX_SAFE_INTEGER && max !== Number.MIN_SAFE_INTEGER) {
            min = Math.min(specifyMin, min);
            max = Math.max(specifyMax, max);
        }
        else {
            min = 0;
            max = 10;
        }
        var type = this.getType();
        var dif;
        switch (type) {
            case exports.YAxisType.Percentage: {
                var fromData = (_a = visibleDataList[0]) === null || _a === void 0 ? void 0 : _a.data;
                if ((fromData === null || fromData === void 0 ? void 0 : fromData.close) !== undefined) {
                    min = (min - fromData.close) / fromData.close * 100;
                    max = (max - fromData.close) / fromData.close * 100;
                }
                dif = Math.pow(10, -2);
                break;
            }
            case exports.YAxisType.Log: {
                min = log10(min);
                max = log10(max);
                dif = 0.05 * index10(-precision);
                break;
            }
            default: {
                dif = index10(-precision);
            }
        }
        if (min === max ||
            Math.abs(min - max) < dif) {
            var minCheck = specifyMin === min;
            var maxCheck = specifyMax === max;
            min = minCheck ? min : (maxCheck ? min - 8 * dif : min - 4 * dif);
            max = maxCheck ? max : (minCheck ? max + 8 * dif : max + 4 * dif);
        }
        var height = (_c = (_b = this.getParent().getYAxisWidget()) === null || _b === void 0 ? void 0 : _b.getBounding().height) !== null && _c !== void 0 ? _c : 0;
        var paneGap = parent.getOptions().gap;
        var topRate = (_d = paneGap === null || paneGap === void 0 ? void 0 : paneGap.top) !== null && _d !== void 0 ? _d : 0.2;
        if (topRate >= 1) {
            topRate = topRate / height;
        }
        var bottomRate = (_e = paneGap === null || paneGap === void 0 ? void 0 : paneGap.bottom) !== null && _e !== void 0 ? _e : 0.1;
        if (bottomRate >= 1) {
            bottomRate = bottomRate / height;
        }
        var range = Math.abs(max - min);
        // 保证每次图形绘制上下都留间隙
        min = min - range * bottomRate;
        max = max + range * topRate;
        range = Math.abs(max - min);
        var realMin;
        var realMax;
        var realRange;
        if (type === exports.YAxisType.Log) {
            realMin = index10(min);
            realMax = index10(max);
            realRange = Math.abs(realMax - realMin);
        }
        else {
            realMin = min;
            realMax = max;
            realRange = range;
        }
        return {
            min: min,
            max: max,
            range: range,
            realMin: realMin,
            realMax: realMax,
            realRange: realRange
        };
    };
    /**
     * 内部值转换成坐标
     * @param value
     * @return {number}
     * @private
     */
    YAxisImp.prototype._innerConvertToPixel = function (value) {
        var _a, _b;
        var height = (_b = (_a = this.getParent().getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getBounding().height) !== null && _b !== void 0 ? _b : 0;
        var _c = this.getExtremum(), min = _c.min, range = _c.range;
        var rate = (value - min) / range;
        return this.isReverse() ? Math.round(rate * height) : Math.round((1 - rate) * height);
    };
    /**
     * 是否是蜡烛图轴
     * @return {boolean}
     */
    YAxisImp.prototype.isInCandle = function () {
        return this.getParent().getName() === 'candle';
    };
    /**
     * y轴类型
     * @return {YAxisType}
     */
    YAxisImp.prototype.getType = function () {
        if (this.isInCandle()) {
            return this.getParent().getChart().getStyles().yAxis.type;
        }
        return exports.YAxisType.Normal;
    };
    YAxisImp.prototype.getPosition = function () {
        return this.getParent().getChart().getStyles().yAxis.position;
    };
    /**
     * 是否反转
     * @return {boolean}
     */
    YAxisImp.prototype.isReverse = function () {
        if (this.isInCandle()) {
            return this.getParent().getChart().getStyles().yAxis.reverse;
        }
        return false;
    };
    /**
     * 是否从y轴0开始
     * @return {boolean}
     */
    YAxisImp.prototype.isFromZero = function () {
        var yAxisStyles = this.getParent().getChart().getStyles().yAxis;
        var inside = yAxisStyles.inside;
        return ((yAxisStyles.position === exports.YAxisPosition.Left && inside) ||
            (yAxisStyles.position === exports.YAxisPosition.Right && !inside));
    };
    YAxisImp.prototype.optimalTicks = function (ticks) {
        var _this = this;
        var _a, _b;
        var pane = this.getParent();
        var height = (_b = (_a = pane.getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getBounding().height) !== null && _b !== void 0 ? _b : 0;
        var chartStore = pane.getChart().getChartStore();
        var customApi = chartStore.getCustomApi();
        var optimalTicks = [];
        var type = this.getType();
        var indicators = chartStore.getIndicatorStore().getInstances(pane.getId());
        var thousandsSeparator = chartStore.getThousandsSeparator();
        var precision = 0;
        var shouldFormatBigNumber = false;
        if (this.isInCandle()) {
            precision = chartStore.getPrecision().price;
        }
        else {
            indicators.forEach(function (tech) {
                precision = Math.max(precision, tech.precision);
                if (!shouldFormatBigNumber) {
                    shouldFormatBigNumber = tech.shouldFormatBigNumber;
                }
            });
        }
        var textHeight = chartStore.getStyles().xAxis.tickText.size;
        var validY;
        ticks.forEach(function (_a) {
            var value = _a.value;
            var v;
            var y = _this._innerConvertToPixel(+value);
            switch (type) {
                case exports.YAxisType.Percentage: {
                    v = "".concat(formatPrecision(value, 2), "%");
                    break;
                }
                case exports.YAxisType.Log: {
                    y = _this._innerConvertToPixel(log10(+value));
                    v = formatPrecision(value, precision);
                    break;
                }
                default: {
                    v = formatPrecision(value, precision);
                    if (shouldFormatBigNumber) {
                        v = customApi.formatBigNumber(value);
                    }
                    break;
                }
            }
            v = formatThousands(v, thousandsSeparator);
            if (y > textHeight && y < height - textHeight && ((validY !== undefined && (Math.abs(validY - y) > textHeight * 2)) || validY === undefined)) {
                optimalTicks.push({ text: v, coord: y, value: value });
                validY = y;
            }
        });
        return optimalTicks;
    };
    YAxisImp.prototype.getAutoSize = function () {
        var pane = this.getParent();
        var chart = pane.getChart();
        var styles = chart.getStyles();
        var yAxisStyles = styles.yAxis;
        var width = yAxisStyles.size;
        if (width !== 'auto') {
            return width;
        }
        var chartStore = chart.getChartStore();
        var customApi = chartStore.getCustomApi();
        var yAxisWidth = 0;
        if (yAxisStyles.show) {
            if (yAxisStyles.axisLine.show) {
                yAxisWidth += yAxisStyles.axisLine.size;
            }
            if (yAxisStyles.tickLine.show) {
                yAxisWidth += yAxisStyles.tickLine.length;
            }
            if (yAxisStyles.tickText.show) {
                var textWidth_1 = 0;
                this.getTicks().forEach(function (tick) {
                    textWidth_1 = Math.max(textWidth_1, calcTextWidth(tick.text, yAxisStyles.tickText.size, yAxisStyles.tickText.weight, yAxisStyles.tickText.family));
                });
                yAxisWidth += (yAxisStyles.tickText.marginStart + yAxisStyles.tickText.marginEnd + textWidth_1);
            }
        }
        var crosshairStyles = styles.crosshair;
        var crosshairVerticalTextWidth = 0;
        if (crosshairStyles.show &&
            crosshairStyles.horizontal.show &&
            crosshairStyles.horizontal.text.show) {
            var indicators = chartStore.getIndicatorStore().getInstances(pane.getId());
            var techPrecision_1 = 0;
            var shouldFormatBigNumber_1 = false;
            indicators.forEach(function (tech) {
                techPrecision_1 = Math.max(tech.precision, techPrecision_1);
                if (!shouldFormatBigNumber_1) {
                    shouldFormatBigNumber_1 = tech.shouldFormatBigNumber;
                }
            });
            var precision = 2;
            if (this.getType() !== exports.YAxisType.Percentage) {
                if (this.isInCandle()) {
                    var pricePrecision = chartStore.getPrecision().price;
                    var lastValueMarkStyles = styles.indicator.lastValueMark;
                    if (lastValueMarkStyles.show && lastValueMarkStyles.text.show) {
                        precision = Math.max(techPrecision_1, pricePrecision);
                    }
                    else {
                        precision = pricePrecision;
                    }
                }
                else {
                    precision = techPrecision_1;
                }
            }
            var valueText = formatPrecision(this.getExtremum().max, precision);
            if (shouldFormatBigNumber_1) {
                valueText = customApi.formatBigNumber(valueText);
            }
            crosshairVerticalTextWidth += (crosshairStyles.horizontal.text.paddingLeft +
                crosshairStyles.horizontal.text.paddingRight +
                crosshairStyles.horizontal.text.borderSize * 2 +
                calcTextWidth(valueText, crosshairStyles.horizontal.text.size, crosshairStyles.horizontal.text.weight, crosshairStyles.horizontal.text.family));
        }
        return Math.max(yAxisWidth, crosshairVerticalTextWidth);
    };
    YAxisImp.prototype.convertFromPixel = function (pixel) {
        var _a, _b, _c;
        var height = (_b = (_a = this.getParent().getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getBounding().height) !== null && _b !== void 0 ? _b : 0;
        var _d = this.getExtremum(), min = _d.min, range = _d.range;
        var rate = this.isReverse() ? pixel / height : 1 - pixel / height;
        var value = rate * range + min;
        switch (this.getType()) {
            case exports.YAxisType.Percentage: {
                var chartStore = this.getParent().getChart().getChartStore();
                var visibleDataList = chartStore.getVisibleDataList();
                var fromData = (_c = visibleDataList[0]) === null || _c === void 0 ? void 0 : _c.data;
                if ((fromData === null || fromData === void 0 ? void 0 : fromData.close) !== undefined) {
                    return fromData.close * value / 100 + fromData.close;
                }
                return 0;
            }
            case exports.YAxisType.Log: {
                return index10(value);
            }
            default: {
                return value;
            }
        }
    };
    YAxisImp.prototype.convertToRealValue = function (value) {
        var v = value;
        if (this.getType() === exports.YAxisType.Log) {
            v = index10(value);
        }
        return v;
    };
    YAxisImp.prototype.convertToPixel = function (value) {
        var _a;
        var v = value;
        switch (this.getType()) {
            case exports.YAxisType.Percentage: {
                var chartStore = this.getParent().getChart().getChartStore();
                var visibleDataList = chartStore.getVisibleDataList();
                var fromData = (_a = visibleDataList[0]) === null || _a === void 0 ? void 0 : _a.data;
                if ((fromData === null || fromData === void 0 ? void 0 : fromData.close) !== undefined) {
                    v = (value - fromData.close) / fromData.close * 100;
                }
                break;
            }
            case exports.YAxisType.Log: {
                v = log10(value);
                break;
            }
            default: {
                v = value;
            }
        }
        return this._innerConvertToPixel(v);
    };
    YAxisImp.prototype.convertToNicePixel = function (value) {
        var _a, _b;
        var height = (_b = (_a = this.getParent().getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getBounding().height) !== null && _b !== void 0 ? _b : 0;
        var pixel = this.convertToPixel(value);
        return Math.round(Math.max(height * 0.05, Math.min(pixel, height * 0.98)));
    };
    return YAxisImp;
}(AxisImp));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IndicatorPane = /** @class */ (function (_super) {
    __extends(IndicatorPane, _super);
    function IndicatorPane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorPane.prototype.getName = function () {
        return 'indicator';
    };
    IndicatorPane.prototype.createAxisComponent = function () {
        return new YAxisImp(this);
    };
    IndicatorPane.prototype.createMainWidget = function (container) {
        return new IndicatorWidget(container, this);
    };
    IndicatorPane.prototype.createSeparatorWidget = function (container) {
        return new SeparatorWidget(container, this);
    };
    IndicatorPane.prototype.creatYAxisWidget = function (container) {
        return new YAxisWidget(container, this);
    };
    return IndicatorPane;
}(Pane));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CandlePane = /** @class */ (function (_super) {
    __extends(CandlePane, _super);
    function CandlePane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandlePane.prototype.getName = function () {
        return 'candle';
    };
    CandlePane.prototype.createMainWidget = function (container) {
        return new CandleWidget(container, this);
    };
    CandlePane.prototype.createSeparatorWidget = function () {
        return null;
    };
    return CandlePane;
}(IndicatorPane));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var XAxisView = /** @class */ (function (_super) {
    __extends(XAxisView, _super);
    function XAxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XAxisView.prototype.getAxisStyles = function (styles) {
        return styles.xAxis;
    };
    XAxisView.prototype.createAxisLine = function (bounding, styles) {
        var correction = styles.axisLine.size / 2;
        return {
            coordinates: [
                { x: 0, y: correction },
                { x: bounding.width, y: correction }
            ]
        };
    };
    XAxisView.prototype.createTickLines = function (ticks, _bounding, styles) {
        var tickLineStyles = styles.tickLine;
        var axisLineSize = styles.axisLine.size;
        return ticks.map(function (tick) { return ({
            coordinates: [
                { x: tick.coord, y: 0 },
                { x: tick.coord, y: axisLineSize + tickLineStyles.length }
            ]
        }); });
    };
    XAxisView.prototype.createTickTexts = function (ticks, _bounding, styles) {
        var tickTickStyles = styles.tickText;
        var axisLineSize = styles.axisLine.size;
        var tickLineLength = styles.tickLine.length;
        return ticks.map(function (tick) { return ({
            x: tick.coord,
            y: axisLineSize + tickLineLength + tickTickStyles.marginStart,
            text: tick.text,
            align: 'center',
            baseline: 'top'
        }); });
    };
    return XAxisView;
}(AxisView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OverlayXAxisView = /** @class */ (function (_super) {
    __extends(OverlayXAxisView, _super);
    function OverlayXAxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OverlayXAxisView.prototype.coordinateToPointTimestampDataIndexFlag = function () {
        return true;
    };
    OverlayXAxisView.prototype.coordinateToPointValueFlag = function () {
        return false;
    };
    OverlayXAxisView.prototype.getCompleteOverlays = function (overlayStore) {
        return overlayStore.getInstances();
    };
    OverlayXAxisView.prototype.getProgressOverlay = function (info) {
        return info.instance;
    };
    OverlayXAxisView.prototype.getDefaultFigures = function (overlay, coordinates, bounding, _precision, dateTimeFormat, customApi, _thousandsSeparator, _xAxis, _yAxis, clickInstanceInfo) {
        var _a;
        var figures = [];
        if (overlay.needDefaultXAxisFigure && overlay.id === ((_a = clickInstanceInfo.instance) === null || _a === void 0 ? void 0 : _a.id)) {
            var leftX_1 = Number.MAX_SAFE_INTEGER;
            var rightX_1 = Number.MIN_SAFE_INTEGER;
            coordinates.forEach(function (coordinate, index) {
                leftX_1 = Math.min(leftX_1, coordinate.x);
                rightX_1 = Math.max(rightX_1, coordinate.x);
                var point = overlay.points[index];
                if (point.timestamp !== undefined) {
                    var text = customApi.formatDate(dateTimeFormat, point.timestamp, 'YYYY-MM-DD HH:mm', exports.FormatDateType.Crosshair);
                    figures.push({ type: 'rectText', attrs: { x: coordinate.x, y: 0, text: text, align: 'center' }, ignoreEvent: true });
                }
            });
            if (coordinates.length > 1) {
                figures.unshift({ type: 'rect', attrs: { x: leftX_1, y: 0, width: rightX_1 - leftX_1, height: bounding.height }, ignoreEvent: true });
            }
        }
        return figures;
    };
    OverlayXAxisView.prototype.getFigures = function (overlay, coordinates, bounding, barSpace, precision, thousandsSeparator, dateTimeFormat, defaultStyles, xAxis, yAxis) {
        var _a, _b;
        return (_b = (_a = overlay.createXAxisFigures) === null || _a === void 0 ? void 0 : _a.call(overlay, { overlay: overlay, coordinates: coordinates, bounding: bounding, barSpace: barSpace, precision: precision, thousandsSeparator: thousandsSeparator, dateTimeFormat: dateTimeFormat, defaultStyles: defaultStyles, xAxis: xAxis, yAxis: yAxis })) !== null && _b !== void 0 ? _b : [];
    };
    return OverlayXAxisView;
}(OverlayYAxisView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CrosshairVerticalLabelView = /** @class */ (function (_super) {
    __extends(CrosshairVerticalLabelView, _super);
    function CrosshairVerticalLabelView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrosshairVerticalLabelView.prototype.compare = function (crosshair) {
        return crosshair.kLineData !== undefined && crosshair.dataIndex === crosshair.realDataIndex;
    };
    CrosshairVerticalLabelView.prototype.getDirectionStyles = function (styles) {
        return styles.vertical;
    };
    CrosshairVerticalLabelView.prototype.getText = function (crosshair, chartStore) {
        var _a;
        var timestamp = (_a = crosshair.kLineData) === null || _a === void 0 ? void 0 : _a.timestamp;
        return chartStore.getCustomApi().formatDate(chartStore.getTimeScaleStore().getDateTimeFormat(), timestamp, 'YYYY-MM-DD HH:mm', exports.FormatDateType.Crosshair);
    };
    CrosshairVerticalLabelView.prototype.getTextAttrs = function (text, textWidth, crosshair, bounding, _axis, styles) {
        var x = crosshair.realX;
        var optimalX;
        if (x - textWidth / 2 - styles.paddingLeft < 0) {
            optimalX = styles.paddingLeft + textWidth / 2;
        }
        else if (x + textWidth / 2 + styles.paddingRight > bounding.width) {
            optimalX = bounding.width - styles.paddingRight - textWidth / 2;
        }
        else {
            optimalX = x;
        }
        return { x: optimalX, y: 0, text: text, align: 'center', baseline: 'top' };
    };
    return CrosshairVerticalLabelView;
}(CrosshairHorizontalLabelView));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var XAxisWidget = /** @class */ (function (_super) {
    __extends(XAxisWidget, _super);
    function XAxisWidget(rootContainer, pane) {
        var _this = _super.call(this, rootContainer, pane) || this;
        _this._xAxisView = new XAxisView(_this);
        _this._overlayXAxisView = new OverlayXAxisView(_this);
        _this._crosshairVerticalLabelView = new CrosshairVerticalLabelView(_this);
        _this.getContainer().style.cursor = 'ew-resize';
        _this.addChild(_this._overlayXAxisView);
        return _this;
    }
    XAxisWidget.prototype.getName = function () {
        return WidgetNameConstants.XAXIS;
    };
    XAxisWidget.prototype.updateMain = function (ctx) {
        this._xAxisView.draw(ctx);
    };
    XAxisWidget.prototype.updateOverlay = function (ctx) {
        this._overlayXAxisView.draw(ctx);
        this._crosshairVerticalLabelView.draw(ctx);
    };
    return XAxisWidget;
}(DrawWidget));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var XAxisImp = /** @class */ (function (_super) {
    __extends(XAxisImp, _super);
    function XAxisImp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XAxisImp.prototype.calcExtremum = function () {
        var chartStore = this.getParent().getChart().getChartStore();
        var _a = chartStore.getTimeScaleStore().getVisibleRange(), from = _a.from, to = _a.to;
        var min = from;
        var max = to - 1;
        var range = to - from;
        return {
            min: min,
            max: max,
            range: range,
            realMin: min, realMax: max, realRange: range
        };
    };
    XAxisImp.prototype.optimalTicks = function (ticks) {
        var _a, _b;
        var chart = this.getParent().getChart();
        var chartStore = chart.getChartStore();
        var formatDate = chartStore.getCustomApi().formatDate;
        var optimalTicks = [];
        var tickLength = ticks.length;
        var dataList = chartStore.getDataList();
        if (tickLength > 0) {
            var dateTimeFormat = chartStore.getTimeScaleStore().getDateTimeFormat();
            var tickTextStyles = chart.getStyles().xAxis.tickText;
            var defaultLabelWidth = calcTextWidth('00-00 00:00', tickTextStyles.size, tickTextStyles.weight, tickTextStyles.family);
            var pos = parseInt(ticks[0].value, 10);
            var x = this.convertToPixel(pos);
            var tickCountDif = 1;
            if (tickLength > 1) {
                var nextPos = parseInt(ticks[1].value, 10);
                var nextX = this.convertToPixel(nextPos);
                var xDif = Math.abs(nextX - x);
                if (xDif < defaultLabelWidth) {
                    tickCountDif = Math.ceil(defaultLabelWidth / xDif);
                }
            }
            for (var i = 0; i < tickLength; i += tickCountDif) {
                var pos_1 = parseInt(ticks[i].value, 10);
                var kLineData = dataList[pos_1];
                var timestamp = kLineData.timestamp;
                var text = formatDate(dateTimeFormat, timestamp, 'HH:mm', exports.FormatDateType.XAxis);
                if (i !== 0) {
                    var prevPos = parseInt(ticks[i - tickCountDif].value, 10);
                    var prevKLineData = dataList[prevPos];
                    var prevTimestamp = prevKLineData.timestamp;
                    text = (_a = this._optimalTickLabel(formatDate, dateTimeFormat, timestamp, prevTimestamp)) !== null && _a !== void 0 ? _a : text;
                }
                var x_1 = this.convertToPixel(pos_1);
                optimalTicks.push({ text: text, coord: x_1, value: timestamp });
            }
            var optimalTickLength = optimalTicks.length;
            if (optimalTickLength === 1) {
                optimalTicks[0].text = formatDate(dateTimeFormat, optimalTicks[0].value, 'YYYY-MM-DD HH:mm', exports.FormatDateType.XAxis);
            }
            else {
                var firstTimestamp = optimalTicks[0].value;
                var secondTimestamp = optimalTicks[1].value;
                if (optimalTicks[2] !== undefined) {
                    var thirdText = optimalTicks[2].text;
                    if (/^[0-9]{2}-[0-9]{2}$/.test(thirdText)) {
                        optimalTicks[0].text = formatDate(dateTimeFormat, firstTimestamp, 'MM-DD', exports.FormatDateType.XAxis);
                    }
                    else if (/^[0-9]{4}-[0-9]{2}$/.test(thirdText)) {
                        optimalTicks[0].text = formatDate(dateTimeFormat, firstTimestamp, 'YYYY-MM', exports.FormatDateType.XAxis);
                    }
                    else if (/^[0-9]{4}$/.test(thirdText)) {
                        optimalTicks[0].text = formatDate(dateTimeFormat, firstTimestamp, 'YYYY', exports.FormatDateType.XAxis);
                    }
                }
                else {
                    optimalTicks[0].text = (_b = this._optimalTickLabel(formatDate, dateTimeFormat, firstTimestamp, secondTimestamp)) !== null && _b !== void 0 ? _b : optimalTicks[0].text;
                }
            }
        }
        return optimalTicks;
    };
    XAxisImp.prototype._optimalTickLabel = function (formatDate, dateTimeFormat, timestamp, comparedTimestamp) {
        var year = formatDate(dateTimeFormat, timestamp, 'YYYY', exports.FormatDateType.XAxis);
        var month = formatDate(dateTimeFormat, timestamp, 'YYYY-MM', exports.FormatDateType.XAxis);
        var day = formatDate(dateTimeFormat, timestamp, 'MM-DD', exports.FormatDateType.XAxis);
        if (year !== formatDate(dateTimeFormat, comparedTimestamp, 'YYYY', exports.FormatDateType.XAxis)) {
            return year;
        }
        else if (month !== formatDate(dateTimeFormat, comparedTimestamp, 'YYYY-MM', exports.FormatDateType.XAxis)) {
            return month;
        }
        else if (day !== formatDate(dateTimeFormat, comparedTimestamp, 'MM-DD', exports.FormatDateType.XAxis)) {
            return day;
        }
        return null;
    };
    XAxisImp.prototype.getAutoSize = function () {
        var styles = this.getParent().getChart().getStyles();
        var xAxisStyles = styles.xAxis;
        var height = xAxisStyles.size;
        if (height !== 'auto') {
            return height;
        }
        var crosshairStyles = styles.crosshair;
        var xAxisHeight = 0;
        if (xAxisStyles.show) {
            if (xAxisStyles.axisLine.show) {
                xAxisHeight += xAxisStyles.axisLine.size;
            }
            if (xAxisStyles.tickLine.show) {
                xAxisHeight += xAxisStyles.tickLine.length;
            }
            if (xAxisStyles.tickText.show) {
                xAxisHeight += (xAxisStyles.tickText.marginStart + xAxisStyles.tickText.marginEnd + xAxisStyles.tickText.size);
            }
        }
        var crosshairVerticalTextHeight = 0;
        if (crosshairStyles.show &&
            crosshairStyles.vertical.show &&
            crosshairStyles.vertical.text.show) {
            crosshairVerticalTextHeight += (crosshairStyles.vertical.text.paddingTop +
                crosshairStyles.vertical.text.paddingBottom +
                crosshairStyles.vertical.text.borderSize * 2 +
                crosshairStyles.vertical.text.size);
        }
        return Math.max(xAxisHeight, crosshairVerticalTextHeight);
    };
    XAxisImp.prototype.convertTimestampFromPixel = function (pixel) {
        var timeScaleStore = this.getParent().getChart().getChartStore().getTimeScaleStore();
        var dataIndex = timeScaleStore.coordinateToDataIndex(pixel);
        return timeScaleStore.dataIndexToTimestamp(dataIndex);
    };
    XAxisImp.prototype.convertTimestampToPixel = function (timestamp) {
        var timeScaleStore = this.getParent().getChart().getChartStore().getTimeScaleStore();
        var dataIndex = timeScaleStore.timestampToDataIndex(timestamp);
        return timeScaleStore.dataIndexToCoordinate(dataIndex);
    };
    XAxisImp.prototype.convertFromPixel = function (pixel) {
        return this.getParent().getChart().getChartStore().getTimeScaleStore().coordinateToDataIndex(pixel);
    };
    XAxisImp.prototype.convertToPixel = function (value) {
        return this.getParent().getChart().getChartStore().getTimeScaleStore().dataIndexToCoordinate(value);
    };
    return XAxisImp;
}(AxisImp));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var XAxisPane = /** @class */ (function (_super) {
    __extends(XAxisPane, _super);
    function XAxisPane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XAxisPane.prototype.getName = function () {
        return 'xAxis';
    };
    XAxisPane.prototype.createAxisComponent = function () {
        return new XAxisImp(this);
    };
    XAxisPane.prototype.createMainWidget = function (container) {
        return new XAxisWidget(container, this);
    };
    return XAxisPane;
}(Pane));

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isFF() {
    var _a;
    if (typeof window === 'undefined') {
        return false;
    }
    return ((_a = window.navigator.userAgent.toLowerCase().indexOf('firefox')) !== null && _a !== void 0 ? _a : -1) > -1;
}
function isIOS() {
    if (typeof window === 'undefined') {
        return false;
    }
    return /iPhone|iPad|iPod/.test(window.navigator.platform);
}

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TOUCH_MIN_RADIUS = 10;
// TODO: get rid of a lot of boolean flags, probably we should replace it with some enum
var SyntheticEvent = /** @class */ (function () {
    function SyntheticEvent(target, handler, options) {
        var _this = this;
        this._clickCount = 0;
        this._clickTimeoutId = null;
        this._clickCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
        this._tapCount = 0;
        this._tapTimeoutId = null;
        this._tapCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
        this._longTapTimeoutId = null;
        this._longTapActive = false;
        this._mouseMoveStartCoordinate = null;
        this._touchMoveStartCoordinate = null;
        this._touchMoveExceededManhattanDistance = false;
        this._cancelClick = false;
        this._cancelTap = false;
        this._unsubscribeOutsideMouseEvents = null;
        this._unsubscribeOutsideTouchEvents = null;
        this._unsubscribeMobileSafariEvents = null;
        this._unsubscribeMousemove = null;
        this._unsubscribeMouseWheel = null;
        this._unsubscribeContextMenu = null;
        this._unsubscribeRootMouseEvents = null;
        this._unsubscribeRootTouchEvents = null;
        this._startPinchMiddleCoordinate = null;
        this._startPinchDistance = 0;
        this._pinchPrevented = false;
        this._preventTouchDragProcess = false;
        this._mousePressed = false;
        this._lastTouchEventTimeStamp = 0;
        // for touchstart/touchmove/touchend events we handle only first touch
        // i.e. we don't support several active touches at the same time (except pinch event)
        this._activeTouchId = null;
        // accept all mouse leave events if it's not an iOS device
        // see _mouseEnterHandler, _mouseMoveHandler, _mouseLeaveHandler
        this._acceptMouseLeave = !isIOS();
        /**
         * In Firefox mouse events dont't fire if the mouse position is outside of the browser's border.
         * To prevent the mouse from hanging while pressed we're subscribing on the mouseleave event of the document element.
         * We're subscribing on mouseleave, but this event is actually fired on mouseup outside of the browser's border.
         */
        this._onFirefoxOutsideMouseUp = function (mouseUpEvent) {
            _this._mouseUpHandler(mouseUpEvent);
        };
        /**
         * Safari doesn't fire touchstart/mousedown events on double tap since iOS 13.
         * There are two possible solutions:
         * 1) Call preventDefault in touchEnd handler. But it also prevents click event from firing.
         * 2) Add listener on dblclick event that fires with the preceding mousedown/mouseup.
         * https://developer.apple.com/forums/thread/125073
         */
        this._onMobileSafariDoubleClick = function (dblClickEvent) {
            if (_this._firesTouchEvents(dblClickEvent)) {
                ++_this._tapCount;
                if (_this._tapTimeoutId !== null && _this._tapCount > 1) {
                    var manhattanDistance = _this._mouseTouchMoveWithDownInfo(_this._getCoordinate(dblClickEvent), _this._tapCoordinate).manhattanDistance;
                    if (manhattanDistance < 30 /* ManhattanDistance.DoubleTap */ && !_this._cancelTap) {
                        _this._processEvent(_this._makeCompatEvent(dblClickEvent), _this._handler.doubleTapEvent);
                    }
                    _this._resetTapTimeout();
                }
            }
            else {
                ++_this._clickCount;
                if (_this._clickTimeoutId !== null && _this._clickCount > 1) {
                    var manhattanDistance = _this._mouseTouchMoveWithDownInfo(_this._getCoordinate(dblClickEvent), _this._clickCoordinate).manhattanDistance;
                    if (manhattanDistance < 5 /* ManhattanDistance.DoubleClick */ && !_this._cancelClick) {
                        _this._processEvent(_this._makeCompatEvent(dblClickEvent), _this._handler.mouseDoubleClickEvent);
                    }
                    _this._resetClickTimeout();
                }
            }
        };
        this._target = target;
        this._handler = handler;
        this._options = options;
        this._init();
    }
    SyntheticEvent.prototype.destroy = function () {
        if (this._unsubscribeOutsideMouseEvents !== null) {
            this._unsubscribeOutsideMouseEvents();
            this._unsubscribeOutsideMouseEvents = null;
        }
        if (this._unsubscribeOutsideTouchEvents !== null) {
            this._unsubscribeOutsideTouchEvents();
            this._unsubscribeOutsideTouchEvents = null;
        }
        if (this._unsubscribeMousemove !== null) {
            this._unsubscribeMousemove();
            this._unsubscribeMousemove = null;
        }
        if (this._unsubscribeMouseWheel !== null) {
            this._unsubscribeMouseWheel();
            this._unsubscribeMouseWheel = null;
        }
        if (this._unsubscribeContextMenu !== null) {
            this._unsubscribeContextMenu();
            this._unsubscribeContextMenu = null;
        }
        if (this._unsubscribeRootMouseEvents !== null) {
            this._unsubscribeRootMouseEvents();
            this._unsubscribeRootMouseEvents = null;
        }
        if (this._unsubscribeRootTouchEvents !== null) {
            this._unsubscribeRootTouchEvents();
            this._unsubscribeRootTouchEvents = null;
        }
        if (this._unsubscribeMobileSafariEvents !== null) {
            this._unsubscribeMobileSafariEvents();
            this._unsubscribeMobileSafariEvents = null;
        }
        this._clearLongTapTimeout();
        this._resetClickTimeout();
    };
    SyntheticEvent.prototype._mouseEnterHandler = function (enterEvent) {
        var _this = this;
        var _a, _b, _c;
        (_a = this._unsubscribeMousemove) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this._unsubscribeMouseWheel) === null || _b === void 0 ? void 0 : _b.call(this);
        (_c = this._unsubscribeContextMenu) === null || _c === void 0 ? void 0 : _c.call(this);
        var boundMouseMoveHandler = this._mouseMoveHandler.bind(this);
        this._unsubscribeMousemove = function () {
            _this._target.removeEventListener('mousemove', boundMouseMoveHandler);
        };
        this._target.addEventListener('mousemove', boundMouseMoveHandler);
        var boundMouseWheel = this._mouseWheelHandler.bind(this);
        this._unsubscribeMouseWheel = function () {
            _this._target.removeEventListener('wheel', boundMouseWheel);
        };
        this._target.addEventListener('wheel', boundMouseWheel, { passive: false });
        var boundContextMenu = this._contextMenuHandler.bind(this);
        this._unsubscribeContextMenu = function () {
            _this._target.removeEventListener('contextmenu', boundContextMenu);
        };
        this._target.addEventListener('contextmenu', boundContextMenu, { passive: false });
        if (this._firesTouchEvents(enterEvent)) {
            return;
        }
        this._processEvent(this._makeCompatEvent(enterEvent), this._handler.mouseEnterEvent);
        this._acceptMouseLeave = true;
    };
    SyntheticEvent.prototype._resetClickTimeout = function () {
        if (this._clickTimeoutId !== null) {
            clearTimeout(this._clickTimeoutId);
        }
        this._clickCount = 0;
        this._clickTimeoutId = null;
        this._clickCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
    };
    SyntheticEvent.prototype._resetTapTimeout = function () {
        if (this._tapTimeoutId !== null) {
            clearTimeout(this._tapTimeoutId);
        }
        this._tapCount = 0;
        this._tapTimeoutId = null;
        this._tapCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
    };
    SyntheticEvent.prototype._mouseMoveHandler = function (moveEvent) {
        if (this._mousePressed || this._touchMoveStartCoordinate !== null) {
            return;
        }
        if (this._firesTouchEvents(moveEvent)) {
            return;
        }
        this._processEvent(this._makeCompatEvent(moveEvent), this._handler.mouseMoveEvent);
        this._acceptMouseLeave = true;
    };
    SyntheticEvent.prototype._mouseWheelHandler = function (wheelEvent) {
        if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) {
            if (this._handler.mouseWheelHortEvent === undefined) {
                return;
            }
            this._preventDefault(wheelEvent);
            if (Math.abs(wheelEvent.deltaX) === 0) {
                return;
            }
            this._handler.mouseWheelHortEvent(this._makeCompatEvent(wheelEvent), -wheelEvent.deltaX);
        }
        else {
            if (this._handler.mouseWheelVertEvent === undefined) {
                return;
            }
            var deltaY = -(wheelEvent.deltaY / 100);
            if (deltaY === 0) {
                return;
            }
            this._preventDefault(wheelEvent);
            switch (wheelEvent.deltaMode) {
                case wheelEvent.DOM_DELTA_PAGE:
                    deltaY *= 120;
                    break;
                case wheelEvent.DOM_DELTA_LINE:
                    deltaY *= 32;
                    break;
            }
            if (deltaY !== 0) {
                var scale = Math.sign(deltaY) * Math.min(1, Math.abs(deltaY));
                this._handler.mouseWheelVertEvent(this._makeCompatEvent(wheelEvent), scale);
            }
        }
    };
    SyntheticEvent.prototype._contextMenuHandler = function (mouseEvent) {
        this._preventDefault(mouseEvent);
    };
    SyntheticEvent.prototype._touchMoveHandler = function (moveEvent) {
        var touch = this._touchWithId(moveEvent.changedTouches, this._activeTouchId);
        if (touch === null) {
            return;
        }
        this._lastTouchEventTimeStamp = this._eventTimeStamp(moveEvent);
        if (this._startPinchMiddleCoordinate !== null) {
            return;
        }
        if (this._preventTouchDragProcess) {
            return;
        }
        // prevent pinch if move event comes faster than the second touch
        this._pinchPrevented = true;
        var moveInfo = this._mouseTouchMoveWithDownInfo(this._getCoordinate(touch), this._touchMoveStartCoordinate);
        var xOffset = moveInfo.xOffset, yOffset = moveInfo.yOffset, manhattanDistance = moveInfo.manhattanDistance;
        if (!this._touchMoveExceededManhattanDistance && manhattanDistance < 5 /* ManhattanDistance.CancelTap */) {
            return;
        }
        if (!this._touchMoveExceededManhattanDistance) {
            // first time when current position exceeded manhattan distance
            // vertical drag is more important than horizontal drag
            // because we scroll the page vertically often than horizontally
            var correctedXOffset = xOffset * 0.5;
            // a drag can be only if touch page scroll isn't allowed
            var isVertDrag = yOffset >= correctedXOffset && !this._options.treatVertDragAsPageScroll();
            var isHorzDrag = correctedXOffset > yOffset && !this._options.treatHorzDragAsPageScroll();
            // if drag event happened then we should revert preventDefault state to original one
            // and try to process the drag event
            // else we shouldn't prevent default of the event and ignore processing the drag event
            if (!isVertDrag && !isHorzDrag) {
                this._preventTouchDragProcess = true;
            }
            this._touchMoveExceededManhattanDistance = true;
            // if manhattan distance is more that 5 - we should cancel tap event
            this._cancelTap = true;
            this._clearLongTapTimeout();
            this._resetTapTimeout();
        }
        if (!this._preventTouchDragProcess) {
            this._processEvent(this._makeCompatEvent(moveEvent, touch), this._handler.touchMoveEvent);
            // we should prevent default in case of touch only
            // to prevent scroll of the page
            // preventDefault(moveEvent)
        }
    };
    SyntheticEvent.prototype._mouseMoveWithDownHandler = function (moveEvent) {
        if (moveEvent.button !== 0 /* MouseEventButton.Left */) {
            return;
        }
        var moveInfo = this._mouseTouchMoveWithDownInfo(this._getCoordinate(moveEvent), this._mouseMoveStartCoordinate);
        var manhattanDistance = moveInfo.manhattanDistance;
        if (manhattanDistance >= 5 /* ManhattanDistance.CancelClick */) {
            // if manhattan distance is more that 5 - we should cancel click event
            this._cancelClick = true;
            this._resetClickTimeout();
        }
        if (this._cancelClick) {
            // if this._cancelClick is true, that means that minimum manhattan distance is already exceeded
            this._processEvent(this._makeCompatEvent(moveEvent), this._handler.pressedMouseMoveEvent);
        }
    };
    SyntheticEvent.prototype._mouseTouchMoveWithDownInfo = function (currentCoordinate, startCoordinate) {
        var xOffset = Math.abs(startCoordinate.x - currentCoordinate.x);
        var yOffset = Math.abs(startCoordinate.y - currentCoordinate.y);
        var manhattanDistance = xOffset + yOffset;
        return { xOffset: xOffset, yOffset: yOffset, manhattanDistance: manhattanDistance };
    };
    // eslint-disable-next-line complexity
    SyntheticEvent.prototype._touchEndHandler = function (touchEndEvent) {
        var touch = this._touchWithId(touchEndEvent.changedTouches, this._activeTouchId);
        if (touch === null && touchEndEvent.touches.length === 0) {
            // something went wrong, somehow we missed the required touchend event
            // probably the browser has not sent this event
            touch = touchEndEvent.changedTouches[0];
        }
        if (touch === null) {
            return;
        }
        this._activeTouchId = null;
        this._lastTouchEventTimeStamp = this._eventTimeStamp(touchEndEvent);
        this._clearLongTapTimeout();
        this._touchMoveStartCoordinate = null;
        if (this._unsubscribeRootTouchEvents !== null) {
            this._unsubscribeRootTouchEvents();
            this._unsubscribeRootTouchEvents = null;
        }
        var compatEvent = this._makeCompatEvent(touchEndEvent, touch);
        this._processEvent(compatEvent, this._handler.touchEndEvent);
        ++this._tapCount;
        if (this._tapTimeoutId !== null && this._tapCount > 1) {
            // check that both clicks are near enough
            var manhattanDistance = this._mouseTouchMoveWithDownInfo(this._getCoordinate(touch), this._tapCoordinate).manhattanDistance;
            if (manhattanDistance < 30 /* ManhattanDistance.DoubleTap */ && !this._cancelTap) {
                this._processEvent(compatEvent, this._handler.doubleTapEvent);
            }
            this._resetTapTimeout();
        }
        else {
            if (!this._cancelTap) {
                this._processEvent(compatEvent, this._handler.tapEvent);
                // do not fire mouse events if tap handler was executed
                // prevent click event on new dom element (who appeared after tap)
                if (this._handler.tapEvent !== undefined) {
                    this._preventDefault(touchEndEvent);
                }
            }
        }
        // prevent, for example, safari's dblclick-to-zoom or fast-click after long-tap
        // we handle mouseDoubleClickEvent here ourselves
        if (this._tapCount === 0) {
            this._preventDefault(touchEndEvent);
        }
        if (touchEndEvent.touches.length === 0) {
            if (this._longTapActive) {
                this._longTapActive = false;
                // prevent native click event
                this._preventDefault(touchEndEvent);
            }
        }
    };
    SyntheticEvent.prototype._mouseUpHandler = function (mouseUpEvent) {
        if (mouseUpEvent.button !== 0 /* MouseEventButton.Left */) {
            return;
        }
        var compatEvent = this._makeCompatEvent(mouseUpEvent);
        this._mouseMoveStartCoordinate = null;
        this._mousePressed = false;
        if (this._unsubscribeRootMouseEvents !== null) {
            this._unsubscribeRootMouseEvents();
            this._unsubscribeRootMouseEvents = null;
        }
        if (isFF()) {
            var rootElement = this._target.ownerDocument.documentElement;
            rootElement.removeEventListener('mouseleave', this._onFirefoxOutsideMouseUp);
        }
        if (this._firesTouchEvents(mouseUpEvent)) {
            return;
        }
        this._processEvent(compatEvent, this._handler.mouseUpEvent);
        ++this._clickCount;
        if (this._clickTimeoutId !== null && this._clickCount > 1) {
            // check that both clicks are near enough
            var manhattanDistance = this._mouseTouchMoveWithDownInfo(this._getCoordinate(mouseUpEvent), this._clickCoordinate).manhattanDistance;
            if (manhattanDistance < 5 /* ManhattanDistance.DoubleClick */ && !this._cancelClick) {
                this._processEvent(compatEvent, this._handler.mouseDoubleClickEvent);
            }
            this._resetClickTimeout();
        }
        else {
            if (!this._cancelClick) {
                this._processEvent(compatEvent, this._handler.mouseClickEvent);
            }
        }
    };
    SyntheticEvent.prototype._clearLongTapTimeout = function () {
        if (this._longTapTimeoutId === null) {
            return;
        }
        clearTimeout(this._longTapTimeoutId);
        this._longTapTimeoutId = null;
    };
    SyntheticEvent.prototype._touchStartHandler = function (downEvent) {
        if (this._activeTouchId !== null) {
            return;
        }
        var touch = downEvent.changedTouches[0];
        this._activeTouchId = touch.identifier;
        this._lastTouchEventTimeStamp = this._eventTimeStamp(downEvent);
        var rootElement = this._target.ownerDocument.documentElement;
        this._cancelTap = false;
        this._touchMoveExceededManhattanDistance = false;
        this._preventTouchDragProcess = false;
        this._touchMoveStartCoordinate = this._getCoordinate(touch);
        if (this._unsubscribeRootTouchEvents !== null) {
            this._unsubscribeRootTouchEvents();
            this._unsubscribeRootTouchEvents = null;
        }
        {
            var boundTouchMoveWithDownHandler_1 = this._touchMoveHandler.bind(this);
            var boundTouchEndHandler_1 = this._touchEndHandler.bind(this);
            this._unsubscribeRootTouchEvents = function () {
                rootElement.removeEventListener('touchmove', boundTouchMoveWithDownHandler_1);
                rootElement.removeEventListener('touchend', boundTouchEndHandler_1);
            };
            rootElement.addEventListener('touchmove', boundTouchMoveWithDownHandler_1, { passive: false });
            rootElement.addEventListener('touchend', boundTouchEndHandler_1, { passive: false });
            this._clearLongTapTimeout();
            this._longTapTimeoutId = setTimeout(this._longTapHandler.bind(this, downEvent), 500 /* Delay.LongTap */);
        }
        this._processEvent(this._makeCompatEvent(downEvent, touch), this._handler.touchStartEvent);
        if (this._tapTimeoutId === null) {
            this._tapCount = 0;
            this._tapTimeoutId = setTimeout(this._resetTapTimeout.bind(this), 500 /* Delay.ResetClick */);
            this._tapCoordinate = this._getCoordinate(touch);
        }
    };
    SyntheticEvent.prototype._mouseDownHandler = function (downEvent) {
        if (downEvent.button === 2 /* MouseEventButton.Right */) {
            this._preventDefault(downEvent);
            this._processEvent(this._makeCompatEvent(downEvent), this._handler.mouseRightClickEvent);
            return;
        }
        if (downEvent.button !== 0 /* MouseEventButton.Left */) {
            return;
        }
        var rootElement = this._target.ownerDocument.documentElement;
        if (isFF()) {
            rootElement.addEventListener('mouseleave', this._onFirefoxOutsideMouseUp);
        }
        this._cancelClick = false;
        this._mouseMoveStartCoordinate = this._getCoordinate(downEvent);
        if (this._unsubscribeRootMouseEvents !== null) {
            this._unsubscribeRootMouseEvents();
            this._unsubscribeRootMouseEvents = null;
        }
        {
            var boundMouseMoveWithDownHandler_1 = this._mouseMoveWithDownHandler.bind(this);
            var boundMouseUpHandler_1 = this._mouseUpHandler.bind(this);
            this._unsubscribeRootMouseEvents = function () {
                rootElement.removeEventListener('mousemove', boundMouseMoveWithDownHandler_1);
                rootElement.removeEventListener('mouseup', boundMouseUpHandler_1);
            };
            rootElement.addEventListener('mousemove', boundMouseMoveWithDownHandler_1);
            rootElement.addEventListener('mouseup', boundMouseUpHandler_1);
        }
        this._mousePressed = true;
        if (this._firesTouchEvents(downEvent)) {
            return;
        }
        this._processEvent(this._makeCompatEvent(downEvent), this._handler.mouseDownEvent);
        if (this._clickTimeoutId === null) {
            this._clickCount = 0;
            this._clickTimeoutId = setTimeout(this._resetClickTimeout.bind(this), 500 /* Delay.ResetClick */);
            this._clickCoordinate = this._getCoordinate(downEvent);
        }
    };
    SyntheticEvent.prototype._init = function () {
        var _this = this;
        this._target.addEventListener('mouseenter', this._mouseEnterHandler.bind(this));
        // Do not show context menu when something went wrong
        this._target.addEventListener('touchcancel', this._clearLongTapTimeout.bind(this));
        {
            var doc_1 = this._target.ownerDocument;
            var outsideHandler_1 = function (event) {
                if (_this._handler.mouseDownOutsideEvent == null) {
                    return;
                }
                if (event.composed && _this._target.contains(event.composedPath()[0])) {
                    return;
                }
                if ((event.target !== null) && _this._target.contains(event.target)) {
                    return;
                }
                _this._handler.mouseDownOutsideEvent({ x: 0, y: 0, pageX: 0, pageY: 0 });
            };
            this._unsubscribeOutsideTouchEvents = function () {
                doc_1.removeEventListener('touchstart', outsideHandler_1);
            };
            this._unsubscribeOutsideMouseEvents = function () {
                doc_1.removeEventListener('mousedown', outsideHandler_1);
            };
            doc_1.addEventListener('mousedown', outsideHandler_1);
            doc_1.addEventListener('touchstart', outsideHandler_1, { passive: true });
        }
        if (isIOS()) {
            this._unsubscribeMobileSafariEvents = function () {
                _this._target.removeEventListener('dblclick', _this._onMobileSafariDoubleClick);
            };
            this._target.addEventListener('dblclick', this._onMobileSafariDoubleClick);
        }
        this._target.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
        this._target.addEventListener('touchstart', this._touchStartHandler.bind(this), { passive: true });
        this._target.addEventListener('mousedown', function (e) {
            if (e.button === 1 /* MouseEventButton.Middle */) {
                // prevent incorrect scrolling event
                e.preventDefault();
                return false;
            }
            return undefined;
        });
        this._target.addEventListener('mousedown', this._mouseDownHandler.bind(this));
        this._initPinch();
        // Hey mobile Safari, what's up?
        // If mobile Safari doesn't have any touchmove handler with passive=false
        // it treats a touchstart and the following touchmove events as cancelable=false,
        // so we can't prevent them (as soon we subscribe on touchmove inside touchstart's handler).
        // And we'll get scroll of the page along with chart's one instead of only chart's scroll.
        this._target.addEventListener('touchmove', function () { }, { passive: false });
    };
    SyntheticEvent.prototype._initPinch = function () {
        var _this = this;
        if (this._handler.pinchStartEvent === undefined &&
            this._handler.pinchEvent === undefined &&
            this._handler.pinchEndEvent === undefined) {
            return;
        }
        this._target.addEventListener('touchstart', function (event) { return _this._checkPinchState(event.touches); }, { passive: true });
        this._target.addEventListener('touchmove', function (event) {
            if (event.touches.length !== 2 || _this._startPinchMiddleCoordinate === null) {
                return;
            }
            if (_this._handler.pinchEvent !== undefined) {
                var currentDistance = _this._getTouchDistance(event.touches[0], event.touches[1]);
                var scale = currentDistance / _this._startPinchDistance;
                _this._handler.pinchEvent(__assign(__assign({}, _this._startPinchMiddleCoordinate), { pageX: 0, pageY: 0 }), scale);
                _this._preventDefault(event);
            }
        }, { passive: false });
        this._target.addEventListener('touchend', function (event) {
            _this._checkPinchState(event.touches);
        });
    };
    SyntheticEvent.prototype._checkPinchState = function (touches) {
        if (touches.length === 1) {
            this._pinchPrevented = false;
        }
        if (touches.length !== 2 || this._pinchPrevented || this._longTapActive) {
            this._stopPinch();
        }
        else {
            this._startPinch(touches);
        }
    };
    SyntheticEvent.prototype._startPinch = function (touches) {
        var _a;
        var box = (_a = this._target.getBoundingClientRect()) !== null && _a !== void 0 ? _a : { left: 0, top: 0 };
        this._startPinchMiddleCoordinate = {
            x: ((touches[0].clientX - box.left) + (touches[1].clientX - box.left)) / 2,
            y: ((touches[0].clientY - box.top) + (touches[1].clientY - box.top)) / 2
        };
        this._startPinchDistance = this._getTouchDistance(touches[0], touches[1]);
        if (this._handler.pinchStartEvent !== undefined) {
            this._handler.pinchStartEvent({ x: 0, y: 0, pageX: 0, pageY: 0 });
        }
        this._clearLongTapTimeout();
    };
    SyntheticEvent.prototype._stopPinch = function () {
        if (this._startPinchMiddleCoordinate === null) {
            return;
        }
        this._startPinchMiddleCoordinate = null;
        if (this._handler.pinchEndEvent !== undefined) {
            this._handler.pinchEndEvent({ x: 0, y: 0, pageX: 0, pageY: 0 });
        }
    };
    SyntheticEvent.prototype._mouseLeaveHandler = function (event) {
        var _a, _b, _c;
        (_a = this._unsubscribeMousemove) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this._unsubscribeMouseWheel) === null || _b === void 0 ? void 0 : _b.call(this);
        (_c = this._unsubscribeContextMenu) === null || _c === void 0 ? void 0 : _c.call(this);
        if (this._firesTouchEvents(event)) {
            return;
        }
        if (!this._acceptMouseLeave) {
            // mobile Safari sometimes emits mouse leave event for no reason, there is no way to handle it in other way
            // just ignore this event if there was no mouse move or mouse enter events
            return;
        }
        this._processEvent(this._makeCompatEvent(event), this._handler.mouseLeaveEvent);
        // accept all mouse leave events if it's not an iOS device
        this._acceptMouseLeave = !isIOS();
    };
    SyntheticEvent.prototype._longTapHandler = function (event) {
        var touch = this._touchWithId(event.touches, this._activeTouchId);
        if (touch === null) {
            return;
        }
        this._processEvent(this._makeCompatEvent(event, touch), this._handler.longTapEvent);
        this._cancelTap = true;
        // long tap is active until touchend event with 0 touches occurred
        this._longTapActive = true;
    };
    SyntheticEvent.prototype._firesTouchEvents = function (e) {
        var _a;
        // @ts-expect-error
        if (((_a = e.sourceCapabilities) === null || _a === void 0 ? void 0 : _a.firesTouchEvents) !== undefined) {
            // @ts-expect-error
            return e.sourceCapabilities.firesTouchEvents;
        }
        return this._eventTimeStamp(e) < this._lastTouchEventTimeStamp + 500 /* Delay.PreventFiresTouchEvents */;
    };
    SyntheticEvent.prototype._processEvent = function (event, callback) {
        callback === null || callback === void 0 ? void 0 : callback.call(this._handler, event);
    };
    SyntheticEvent.prototype._makeCompatEvent = function (event, touch) {
        var _this = this;
        var _a;
        // TouchEvent has no clientX/Y coordinates:
        // We have to use the last Touch instead
        var eventLike = touch !== null && touch !== void 0 ? touch : event;
        var box = (_a = this._target.getBoundingClientRect()) !== null && _a !== void 0 ? _a : { left: 0, top: 0 };
        return {
            x: eventLike.clientX - box.left,
            y: eventLike.clientY - box.top,
            pageX: eventLike.pageX,
            pageY: eventLike.pageY,
            isTouch: !event.type.startsWith('mouse') && event.type !== 'contextmenu' && event.type !== 'click',
            preventDefault: function () {
                if (event.type !== 'touchstart') {
                    // touchstart is passive and cannot be prevented
                    _this._preventDefault(event);
                }
            }
        };
    };
    SyntheticEvent.prototype._getTouchDistance = function (p1, p2) {
        var xDiff = p1.clientX - p2.clientX;
        var yDiff = p1.clientY - p2.clientY;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    };
    SyntheticEvent.prototype._preventDefault = function (event) {
        if (event.cancelable) {
            event.preventDefault();
        }
    };
    SyntheticEvent.prototype._getCoordinate = function (eventLike) {
        return {
            x: eventLike.pageX,
            y: eventLike.pageY
        };
    };
    SyntheticEvent.prototype._eventTimeStamp = function (e) {
        var _a;
        // for some reason e.timestamp is always 0 on iPad with magic mouse, so we use performance.now() as a fallback
        return (_a = e.timeStamp) !== null && _a !== void 0 ? _a : performance.now();
    };
    SyntheticEvent.prototype._touchWithId = function (touches, id) {
        for (var i = 0; i < touches.length; ++i) {
            if (touches[i].identifier === id) {
                return touches[i];
            }
        }
        return null;
    };
    return SyntheticEvent;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ChartEvent = /** @class */ (function () {
    function ChartEvent(container, chart) {
        var _this = this;
        // 惯性滚动开始时间
        this._flingStartTime = new Date().getTime();
        // 惯性滚动定时器
        this._flingScrollRequestId = null;
        // 开始滚动时坐标点
        this._startScrollCoordinate = null;
        // 开始触摸时坐标
        this._touchCoordinate = null;
        // 是否是取消了十字光标
        this._touchCancelCrosshair = false;
        // 是否缩放过
        this._touchZoomed = false;
        // 用来记录捏合缩放的尺寸
        this._pinchScale = 1;
        this._mouseDownWidget = null;
        this._prevYAxisExtremum = null;
        this._xAxisStartScaleCoordinate = null;
        this._xAxisStartScaleDistance = 0;
        this._xAxisScale = 1;
        this._yAxisStartScaleDistance = 0;
        this._mouseMoveTriggerWidgetInfo = { pane: null, widget: null };
        this._boundKeyBoardDownEvent = function (event) {
            if (event.shiftKey) {
                switch (event.code) {
                    case 'Equal': {
                        _this._chart.getChartStore().getTimeScaleStore().zoom(0.5);
                        break;
                    }
                    case 'Minus': {
                        _this._chart.getChartStore().getTimeScaleStore().zoom(-0.5);
                        break;
                    }
                    case 'ArrowLeft': {
                        var timeScaleStore = _this._chart.getChartStore().getTimeScaleStore();
                        timeScaleStore.startScroll();
                        timeScaleStore.scroll(-3 * timeScaleStore.getBarSpace().bar);
                        break;
                    }
                    case 'ArrowRight': {
                        var timeScaleStore = _this._chart.getChartStore().getTimeScaleStore();
                        timeScaleStore.startScroll();
                        timeScaleStore.scroll(3 * timeScaleStore.getBarSpace().bar);
                        break;
                    }
                }
            }
        };
        this._container = container;
        this._chart = chart;
        this._event = new SyntheticEvent(container, this, {
            treatVertDragAsPageScroll: function () { return false; },
            treatHorzDragAsPageScroll: function () { return false; }
        });
        container.addEventListener('keydown', this._boundKeyBoardDownEvent);
    }
    ChartEvent.prototype.pinchStartEvent = function () {
        this._touchZoomed = true;
        this._pinchScale = 1;
        return true;
    };
    ChartEvent.prototype.pinchEvent = function (e, scale) {
        var _a = this._findWidgetByEvent(e), pane = _a.pane, widget = _a.widget;
        if ((pane === null || pane === void 0 ? void 0 : pane.getId()) !== PaneIdConstants.XAXIS && (widget === null || widget === void 0 ? void 0 : widget.getName()) === WidgetNameConstants.MAIN) {
            var event_1 = this._makeWidgetEvent(e, widget);
            var zoomScale = (scale - this._pinchScale) * 5;
            this._pinchScale = scale;
            this._chart.getChartStore().getTimeScaleStore().zoom(zoomScale, { x: event_1.x, y: event_1.y });
            return true;
        }
        return false;
    };
    ChartEvent.prototype.mouseWheelHortEvent = function (_, distance) {
        var timeScaleStore = this._chart.getChartStore().getTimeScaleStore();
        timeScaleStore.startScroll();
        timeScaleStore.scroll(distance);
        return true;
    };
    ChartEvent.prototype.mouseWheelVertEvent = function (e, scale) {
        var _a, _b;
        var widget = this._findWidgetByEvent(e).widget;
        var isTouch = (_a = e.isTouch) !== null && _a !== void 0 ? _a : false;
        var event = this._makeWidgetEvent(e, widget);
        var zoomCoordinate = null;
        var name = widget === null || widget === void 0 ? void 0 : widget.getName();
        if (isTouch) {
            if (name === WidgetNameConstants.MAIN || name === WidgetNameConstants.XAXIS) {
                zoomCoordinate = { x: event.x, y: event.y };
            }
            else {
                var bounding = (_b = this._chart.getPaneById(PaneIdConstants.CANDLE)) === null || _b === void 0 ? void 0 : _b.getBounding();
                zoomCoordinate = { x: bounding.width / 2, y: bounding.height / 2 };
            }
        }
        else {
            if (name === WidgetNameConstants.MAIN) {
                zoomCoordinate = { x: event.x, y: event.y };
            }
        }
        if (zoomCoordinate !== null) {
            this._chart.getChartStore().getTimeScaleStore().zoom(scale, { x: event.x, y: event.y });
            return true;
        }
        return false;
    };
    ChartEvent.prototype.mouseDownEvent = function (e) {
        var _a, _b;
        var _c = this._findWidgetByEvent(e), pane = _c.pane, widget = _c.widget;
        this._mouseDownWidget = widget;
        if (widget !== null) {
            var event_2 = this._makeWidgetEvent(e, widget);
            var name_1 = widget.getName();
            switch (name_1) {
                case WidgetNameConstants.SEPARATOR: {
                    return widget.dispatchEvent('mouseDownEvent', event_2);
                }
                case WidgetNameConstants.MAIN: {
                    var extremum = (_a = pane === null || pane === void 0 ? void 0 : pane.getAxisComponent().getExtremum()) !== null && _a !== void 0 ? _a : null;
                    this._prevYAxisExtremum = extremum === null ? extremum : __assign({}, extremum);
                    this._startScrollCoordinate = { x: event_2.x, y: event_2.y };
                    this._chart.getChartStore().getTimeScaleStore().startScroll();
                    return widget.dispatchEvent('mouseDownEvent', event_2);
                }
                case WidgetNameConstants.XAXIS: {
                    var consumed = widget.dispatchEvent('mouseDownEvent', event_2);
                    if (consumed) {
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                    this._xAxisStartScaleCoordinate = { x: event_2.x, y: event_2.y };
                    this._xAxisStartScaleDistance = event_2.pageX;
                    return consumed;
                }
                case WidgetNameConstants.YAXIS: {
                    var consumed = widget.dispatchEvent('mouseDownEvent', event_2);
                    if (consumed) {
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                    var extremum = (_b = pane === null || pane === void 0 ? void 0 : pane.getAxisComponent().getExtremum()) !== null && _b !== void 0 ? _b : null;
                    this._prevYAxisExtremum = extremum === null ? extremum : __assign({}, extremum);
                    this._yAxisStartScaleDistance = event_2.pageY;
                    return consumed;
                }
            }
        }
        return false;
    };
    ChartEvent.prototype.mouseMoveEvent = function (e) {
        var _a, _b, _c;
        var _d = this._findWidgetByEvent(e), pane = _d.pane, widget = _d.widget;
        var event = this._makeWidgetEvent(e, widget);
        if (((_a = this._mouseMoveTriggerWidgetInfo.pane) === null || _a === void 0 ? void 0 : _a.getId()) !== (pane === null || pane === void 0 ? void 0 : pane.getId()) ||
            ((_b = this._mouseMoveTriggerWidgetInfo.widget) === null || _b === void 0 ? void 0 : _b.getName()) !== (widget === null || widget === void 0 ? void 0 : widget.getName())) {
            widget === null || widget === void 0 ? void 0 : widget.dispatchEvent('mouseEnterEvent', event);
            (_c = this._mouseMoveTriggerWidgetInfo.widget) === null || _c === void 0 ? void 0 : _c.dispatchEvent('mouseLeaveEvent', event);
            this._mouseMoveTriggerWidgetInfo = { pane: pane, widget: widget };
        }
        if (widget !== null) {
            var name_2 = widget.getName();
            switch (name_2) {
                case WidgetNameConstants.MAIN: {
                    var consumed = widget.dispatchEvent('mouseMoveEvent', event);
                    var chartStore = this._chart.getChartStore();
                    var crosshair = { x: event.x, y: event.y, paneId: pane === null || pane === void 0 ? void 0 : pane.getId() };
                    if (consumed && chartStore.getTooltipStore().getActiveIconInfo() !== null) {
                        crosshair = undefined;
                        if (widget !== null) {
                            widget.getContainer().style.cursor = 'pointer';
                        }
                    }
                    this._chart.getChartStore().getCrosshairStore().set(crosshair);
                    return consumed;
                }
                case WidgetNameConstants.SEPARATOR:
                case WidgetNameConstants.XAXIS:
                case WidgetNameConstants.YAXIS: {
                    var consumed = widget.dispatchEvent('mouseMoveEvent', event);
                    this._chart.getChartStore().getCrosshairStore().set();
                    return consumed;
                }
            }
        }
        return false;
    };
    ChartEvent.prototype.pressedMouseMoveEvent = function (e) {
        var _a, _b, _c, _d, _e;
        if (this._mouseDownWidget !== null && this._mouseDownWidget.getName() === WidgetNameConstants.SEPARATOR) {
            return this._mouseDownWidget.dispatchEvent('pressedMouseMoveEvent', e);
        }
        var _f = this._findWidgetByEvent(e), pane = _f.pane, widget = _f.widget;
        if (widget !== null &&
            ((_a = this._mouseDownWidget) === null || _a === void 0 ? void 0 : _a.getPane().getId()) === (pane === null || pane === void 0 ? void 0 : pane.getId()) &&
            ((_b = this._mouseDownWidget) === null || _b === void 0 ? void 0 : _b.getName()) === widget.getName()) {
            var event_3 = this._makeWidgetEvent(e, widget);
            var name_3 = widget.getName();
            switch (name_3) {
                case WidgetNameConstants.MAIN: {
                    var bounding = widget.getBounding();
                    var consumed = widget.dispatchEvent('pressedMouseMoveEvent', event_3);
                    if (!consumed && this._startScrollCoordinate !== null) {
                        var yAxis = pane === null || pane === void 0 ? void 0 : pane.getAxisComponent();
                        if (this._prevYAxisExtremum !== null && !yAxis.getAutoCalcTickFlag() && yAxis.getScrollZoomEnabled()) {
                            var _g = this._prevYAxisExtremum, min = _g.min, max = _g.max, range = _g.range;
                            var distance_1;
                            if ((_c = yAxis === null || yAxis === void 0 ? void 0 : yAxis.isReverse()) !== null && _c !== void 0 ? _c : false) {
                                distance_1 = this._startScrollCoordinate.y - event_3.y;
                            }
                            else {
                                distance_1 = event_3.y - this._startScrollCoordinate.y;
                            }
                            var scale = distance_1 / bounding.height;
                            var difRange = range * scale;
                            var newMin = min + difRange;
                            var newMax = max + difRange;
                            var newRealMin = yAxis.convertToRealValue(newMin);
                            var newRealMax = yAxis.convertToRealValue(newMax);
                            yAxis.setExtremum({
                                min: newMin,
                                max: newMax,
                                range: newMax - newMin,
                                realMin: newRealMin,
                                realMax: newRealMax,
                                realRange: newRealMax - newRealMin
                            });
                        }
                        var distance = event_3.x - this._startScrollCoordinate.x;
                        this._chart.getChartStore().getTimeScaleStore().scroll(distance);
                    }
                    this._chart.getChartStore().getCrosshairStore().set({ x: event_3.x, y: event_3.y, paneId: pane === null || pane === void 0 ? void 0 : pane.getId() });
                    return consumed;
                }
                case WidgetNameConstants.XAXIS: {
                    var consumed = widget.dispatchEvent('pressedMouseMoveEvent', event_3);
                    if (!consumed) {
                        var xAxis = pane === null || pane === void 0 ? void 0 : pane.getAxisComponent();
                        if ((_d = xAxis === null || xAxis === void 0 ? void 0 : xAxis.getScrollZoomEnabled()) !== null && _d !== void 0 ? _d : true) {
                            var scale = this._xAxisStartScaleDistance / event_3.pageX;
                            var zoomScale = (scale - this._xAxisScale) * 10;
                            this._xAxisScale = scale;
                            this._chart.getChartStore().getTimeScaleStore().zoom(zoomScale, (_e = this._xAxisStartScaleCoordinate) !== null && _e !== void 0 ? _e : undefined);
                        }
                    }
                    else {
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                    return consumed;
                }
                case WidgetNameConstants.YAXIS: {
                    var consumed = widget.dispatchEvent('pressedMouseMoveEvent', event_3);
                    if (!consumed) {
                        var yAxis = pane === null || pane === void 0 ? void 0 : pane.getAxisComponent();
                        if (this._prevYAxisExtremum !== null && yAxis.getScrollZoomEnabled()) {
                            var _h = this._prevYAxisExtremum, min = _h.min, max = _h.max, range = _h.range;
                            var scale = event_3.pageY / this._yAxisStartScaleDistance;
                            var newRange = range * scale;
                            var difRange = (newRange - range) / 2;
                            var newMin = min - difRange;
                            var newMax = max + difRange;
                            var yAxis_1 = pane === null || pane === void 0 ? void 0 : pane.getAxisComponent();
                            var newRealMin = yAxis_1.convertToRealValue(newMin);
                            var newRealMax = yAxis_1.convertToRealValue(newMax);
                            yAxis_1.setExtremum({
                                min: newMin,
                                max: newMax,
                                range: newRange,
                                realMin: newRealMin,
                                realMax: newRealMax,
                                realRange: newRealMax - newRealMin
                            });
                            this._chart.adjustPaneViewport(false, true, true, true);
                        }
                    }
                    else {
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                    return consumed;
                }
            }
        }
        return false;
    };
    ChartEvent.prototype.mouseUpEvent = function (e) {
        var widget = this._findWidgetByEvent(e).widget;
        var consumed = false;
        if (widget !== null) {
            var event_4 = this._makeWidgetEvent(e, widget);
            var name_4 = widget.getName();
            switch (name_4) {
                case WidgetNameConstants.MAIN:
                case WidgetNameConstants.SEPARATOR:
                case WidgetNameConstants.XAXIS:
                case WidgetNameConstants.YAXIS: {
                    consumed = widget.dispatchEvent('mouseUpEvent', event_4);
                    break;
                }
            }
            if (consumed) {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
        this._mouseDownWidget = null;
        this._startScrollCoordinate = null;
        this._prevYAxisExtremum = null;
        this._xAxisStartScaleCoordinate = null;
        this._xAxisStartScaleDistance = 0;
        this._xAxisScale = 1;
        this._yAxisStartScaleDistance = 0;
        return consumed;
    };
    ChartEvent.prototype.mouseClickEvent = function (e) {
        var widget = this._findWidgetByEvent(e).widget;
        if (widget !== null) {
            var event_5 = this._makeWidgetEvent(e, widget);
            return widget.dispatchEvent('mouseClickEvent', event_5);
        }
        return false;
    };
    ChartEvent.prototype.mouseRightClickEvent = function (e) {
        var widget = this._findWidgetByEvent(e).widget;
        var consumed = false;
        if (widget !== null) {
            var event_6 = this._makeWidgetEvent(e, widget);
            var name_5 = widget.getName();
            switch (name_5) {
                case WidgetNameConstants.MAIN:
                case WidgetNameConstants.XAXIS:
                case WidgetNameConstants.YAXIS: {
                    consumed = widget.dispatchEvent('mouseRightClickEvent', event_6);
                    break;
                }
            }
            if (consumed) {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
        return false;
    };
    ChartEvent.prototype.mouseDoubleClickEvent = function (e) {
        var _a = this._findWidgetByEvent(e), pane = _a.pane, widget = _a.widget;
        if (widget !== null) {
            var name_6 = widget.getName();
            switch (name_6) {
                case WidgetNameConstants.MAIN: {
                    var event_7 = this._makeWidgetEvent(e, widget);
                    return widget.dispatchEvent('mouseDoubleClickEvent', event_7);
                }
                case WidgetNameConstants.YAXIS: {
                    var yAxis = pane === null || pane === void 0 ? void 0 : pane.getAxisComponent();
                    if (!yAxis.getAutoCalcTickFlag()) {
                        yAxis.setAutoCalcTickFlag(true);
                        this._chart.adjustPaneViewport(false, true, true, true);
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    };
    ChartEvent.prototype.mouseLeaveEvent = function () {
        this._chart.getChartStore().getCrosshairStore().set();
        return true;
    };
    ChartEvent.prototype.touchStartEvent = function (e) {
        var _a = this._findWidgetByEvent(e), pane = _a.pane, widget = _a.widget;
        if (widget !== null) {
            var event_8 = this._makeWidgetEvent(e, widget);
            var name_7 = widget.getName();
            switch (name_7) {
                case WidgetNameConstants.MAIN: {
                    var chartStore = this._chart.getChartStore();
                    var crosshairStore = chartStore.getCrosshairStore();
                    if (widget.dispatchEvent('mouseDownEvent', event_8)) {
                        this._touchCancelCrosshair = true;
                        this._touchCoordinate = null;
                        crosshairStore.set(undefined, true);
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                        return true;
                    }
                    if (this._flingScrollRequestId !== null) {
                        cancelAnimationFrame(this._flingScrollRequestId);
                        this._flingScrollRequestId = null;
                    }
                    this._flingStartTime = new Date().getTime();
                    this._startScrollCoordinate = { x: event_8.x, y: event_8.y };
                    chartStore.getTimeScaleStore().startScroll();
                    this._touchZoomed = false;
                    if (this._touchCoordinate !== null) {
                        var xDif = event_8.x - this._touchCoordinate.x;
                        var yDif = event_8.y - this._touchCoordinate.y;
                        var radius = Math.sqrt(xDif * xDif + yDif * yDif);
                        if (radius < TOUCH_MIN_RADIUS) {
                            this._touchCoordinate = { x: event_8.x, y: event_8.y };
                            crosshairStore.set({ x: event_8.x, y: event_8.y, paneId: pane === null || pane === void 0 ? void 0 : pane.getId() });
                        }
                        else {
                            this._touchCoordinate = null;
                            this._touchCancelCrosshair = true;
                            crosshairStore.set();
                        }
                    }
                    return true;
                }
                case WidgetNameConstants.XAXIS:
                case WidgetNameConstants.YAXIS: {
                    var consumed = widget.dispatchEvent('mouseDownEvent', event_8);
                    if (consumed) {
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                    return consumed;
                }
            }
        }
        return false;
    };
    ChartEvent.prototype.touchMoveEvent = function (e) {
        var _a, _b, _c;
        var _d = this._findWidgetByEvent(e), pane = _d.pane, widget = _d.widget;
        if (widget !== null) {
            var event_9 = this._makeWidgetEvent(e, widget);
            var name_8 = widget.getName();
            var chartStore = this._chart.getChartStore();
            var crosshairStore = chartStore.getCrosshairStore();
            switch (name_8) {
                case WidgetNameConstants.MAIN: {
                    if (widget.dispatchEvent('pressedMouseMoveEvent', event_9)) {
                        (_a = event_9.preventDefault) === null || _a === void 0 ? void 0 : _a.call(event_9);
                        crosshairStore.set(undefined, true);
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                        return true;
                    }
                    if (this._touchCoordinate !== null) {
                        (_b = event_9.preventDefault) === null || _b === void 0 ? void 0 : _b.call(event_9);
                        crosshairStore.set({ x: event_9.x, y: event_9.y, paneId: pane === null || pane === void 0 ? void 0 : pane.getId() });
                    }
                    else {
                        if (this._startScrollCoordinate !== null &&
                            Math.abs(this._startScrollCoordinate.x - event_9.x) > this._startScrollCoordinate.y - event_9.y) {
                            var distance = event_9.x - this._startScrollCoordinate.x;
                            chartStore.getTimeScaleStore().scroll(distance);
                        }
                    }
                    return true;
                }
                case WidgetNameConstants.XAXIS:
                case WidgetNameConstants.YAXIS: {
                    var consumed = widget.dispatchEvent('pressedMouseMoveEvent', event_9);
                    if (consumed) {
                        (_c = event_9.preventDefault) === null || _c === void 0 ? void 0 : _c.call(event_9);
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                    return consumed;
                }
            }
        }
        return false;
    };
    ChartEvent.prototype.touchEndEvent = function (e) {
        var _this = this;
        var widget = this._findWidgetByEvent(e).widget;
        if (widget !== null) {
            var event_10 = this._makeWidgetEvent(e, widget);
            var name_9 = widget.getName();
            switch (name_9) {
                case WidgetNameConstants.MAIN: {
                    widget.dispatchEvent('mouseUpEvent', event_10);
                    if (this._startScrollCoordinate !== null) {
                        var time = new Date().getTime() - this._flingStartTime;
                        var distance = event_10.x - this._startScrollCoordinate.x;
                        var v_1 = distance / (time > 0 ? time : 1) * 20;
                        if (time < 200 && Math.abs(v_1) > 0) {
                            var timeScaleStore_1 = this._chart.getChartStore().getTimeScaleStore();
                            var flingScroll_1 = function () {
                                _this._flingScrollRequestId = requestAnimationFrame$1(function () {
                                    timeScaleStore_1.startScroll();
                                    timeScaleStore_1.scroll(v_1);
                                    v_1 = v_1 * (1 - 0.025);
                                    if (Math.abs(v_1) < 1) {
                                        if (_this._flingScrollRequestId !== null) {
                                            cancelAnimationFrame(_this._flingScrollRequestId);
                                            _this._flingScrollRequestId = null;
                                        }
                                    }
                                    else {
                                        flingScroll_1();
                                    }
                                });
                            };
                            flingScroll_1();
                        }
                    }
                    return true;
                }
                case WidgetNameConstants.XAXIS:
                case WidgetNameConstants.YAXIS: {
                    var consumed = widget.dispatchEvent('mouseUpEvent', event_10);
                    if (consumed) {
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                }
            }
        }
        return false;
    };
    ChartEvent.prototype.tapEvent = function (e) {
        var _a = this._findWidgetByEvent(e), pane = _a.pane, widget = _a.widget;
        var consumed = false;
        if (widget !== null) {
            var event_11 = this._makeWidgetEvent(e, widget);
            var result = widget.dispatchEvent('mouseClickEvent', event_11);
            if (widget.getName() === WidgetNameConstants.MAIN) {
                var event_12 = this._makeWidgetEvent(e, widget);
                var chartStore = this._chart.getChartStore();
                var crosshairStore = chartStore.getCrosshairStore();
                if (result) {
                    this._touchCancelCrosshair = true;
                    this._touchCoordinate = null;
                    crosshairStore.set(undefined, true);
                    consumed = true;
                }
                else {
                    if (!this._touchCancelCrosshair && !this._touchZoomed) {
                        this._touchCoordinate = { x: event_12.x, y: event_12.y };
                        crosshairStore.set({ x: event_12.x, y: event_12.y, paneId: pane === null || pane === void 0 ? void 0 : pane.getId() }, true);
                        consumed = true;
                    }
                    this._touchCancelCrosshair = false;
                }
            }
            if (consumed || result) {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
        return consumed;
    };
    ChartEvent.prototype.doubleTapEvent = function (e) {
        return this.mouseDoubleClickEvent(e);
    };
    ChartEvent.prototype.longTapEvent = function (e) {
        var _a = this._findWidgetByEvent(e), pane = _a.pane, widget = _a.widget;
        if (widget !== null && widget.getName() === WidgetNameConstants.MAIN) {
            var event_13 = this._makeWidgetEvent(e, widget);
            this._touchCoordinate = { x: event_13.x, y: event_13.y };
            this._chart.getChartStore().getCrosshairStore().set({ x: event_13.x, y: event_13.y, paneId: pane === null || pane === void 0 ? void 0 : pane.getId() });
            return true;
        }
        return false;
    };
    ChartEvent.prototype._findWidgetByEvent = function (event) {
        var e_1, _a;
        var panes = this._chart.getAllPanes();
        var x = event.x, y = event.y;
        var pane = null;
        try {
            for (var panes_1 = __values(panes), panes_1_1 = panes_1.next(); !panes_1_1.done; panes_1_1 = panes_1.next()) {
                var _b = __read(panes_1_1.value, 2), p = _b[1];
                var bounding = p.getBounding();
                if (x >= bounding.left && x <= bounding.left + bounding.width &&
                    y >= bounding.top && y <= bounding.top + bounding.height) {
                    pane = p;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (panes_1_1 && !panes_1_1.done && (_a = panes_1.return)) _a.call(panes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (pane === null) {
            pane = this._chart.getPaneById(PaneIdConstants.XAXIS);
        }
        var widget = null;
        if (pane !== null) {
            var separatorWidget = pane.getSeparatorWidget();
            if (separatorWidget !== null) {
                var separatorBounding = separatorWidget.getBounding();
                if (x >= separatorBounding.left && x <= separatorBounding.left + separatorBounding.width &&
                    y >= separatorBounding.top && y <= (separatorBounding.top + REAL_SEPARATOR_HEIGHT)) {
                    widget = separatorWidget;
                }
            }
            if (widget === null) {
                var mainWidget = pane.getMainWidget();
                var mainBounding = mainWidget.getBounding();
                if (x >= mainBounding.left && x <= mainBounding.left + mainBounding.width &&
                    y >= mainBounding.top && y <= mainBounding.top + mainBounding.height) {
                    widget = mainWidget;
                }
            }
            if (widget === null) {
                var yAxisWidget = pane.getYAxisWidget();
                if (yAxisWidget !== null) {
                    var yAxisBounding = yAxisWidget.getBounding();
                    if (x >= yAxisBounding.left && x <= yAxisBounding.left + yAxisBounding.width &&
                        y >= yAxisBounding.top && y <= yAxisBounding.top + yAxisBounding.height) {
                        widget = yAxisWidget;
                    }
                }
            }
        }
        return { pane: pane, widget: widget };
    };
    ChartEvent.prototype._makeWidgetEvent = function (event, widget) {
        var _a, _b, _c;
        var bounding = (_a = widget === null || widget === void 0 ? void 0 : widget.getBounding()) !== null && _a !== void 0 ? _a : null;
        return __assign(__assign({}, event), { x: event.x - ((_b = bounding === null || bounding === void 0 ? void 0 : bounding.left) !== null && _b !== void 0 ? _b : 0), y: event.y - ((_c = bounding === null || bounding === void 0 ? void 0 : bounding.top) !== null && _c !== void 0 ? _c : 0) });
    };
    ChartEvent.prototype.destroy = function () {
        this._container.removeEventListener('keydown', this._boundKeyBoardDownEvent);
        this._event.destroy();
    };
    return ChartEvent;
}());

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.DomPosition = void 0;
(function (DomPosition) {
    DomPosition["Root"] = "root";
    DomPosition["Main"] = "main";
    DomPosition["YAxis"] = "yAxis";
})(exports.DomPosition || (exports.DomPosition = {}));
var ChartImp = /** @class */ (function () {
    function ChartImp(container, options) {
        this._panes = new Map();
        this._initContainer(container);
        this._chartEvent = new ChartEvent(this._chartContainer, this);
        this._chartStore = new ChartStore(this, options);
        this._xAxisPane = new XAxisPane(this._chartContainer, this, PaneIdConstants.XAXIS);
        this._panes.set(PaneIdConstants.CANDLE, new CandlePane(this._chartContainer, this, PaneIdConstants.CANDLE));
        this.adjustPaneViewport(true, true, true);
    }
    ChartImp.prototype._initContainer = function (container) {
        this._container = container;
        this._chartContainer = createDom('div', {
            position: 'relative',
            width: '100%',
            outline: 'none',
            borderStyle: 'none',
            cursor: 'crosshair',
            boxSizing: 'border-box',
            userSelect: 'none',
            webkitUserSelect: 'none',
            // @ts-expect-error
            msUserSelect: 'none',
            MozUserSelect: 'none',
            webkitTapHighlightColor: 'transparent'
        });
        this._chartContainer.tabIndex = 1;
        container.appendChild(this._chartContainer);
    };
    ChartImp.prototype._measurePaneHeight = function () {
        var _a;
        var totalHeight = this._container.offsetHeight;
        var xAxisHeight = this._xAxisPane.getAxisComponent().getAutoSize();
        var paneExcludeXAxisHeight = totalHeight - xAxisHeight;
        if (paneExcludeXAxisHeight < 0) {
            paneExcludeXAxisHeight = 0;
        }
        var indicatorPaneTotalHeight = 0;
        this._panes.forEach(function (pane) {
            if (pane.getId() !== PaneIdConstants.CANDLE) {
                var paneHeight = pane.getBounding().height;
                var paneMinHeight = pane.getOptions().minHeight;
                if (paneHeight < paneMinHeight) {
                    paneHeight = paneMinHeight;
                }
                if (indicatorPaneTotalHeight + paneHeight > paneExcludeXAxisHeight) {
                    indicatorPaneTotalHeight = paneExcludeXAxisHeight;
                    paneHeight = Math.max(paneExcludeXAxisHeight - indicatorPaneTotalHeight, 0);
                }
                else {
                    indicatorPaneTotalHeight += paneHeight;
                }
                pane.setBounding({ height: paneHeight });
            }
        });
        var candlePaneHeight = paneExcludeXAxisHeight - indicatorPaneTotalHeight;
        (_a = this._panes.get(PaneIdConstants.CANDLE)) === null || _a === void 0 ? void 0 : _a.setBounding({ height: candlePaneHeight });
        var top = 0;
        this._panes.forEach(function (pane) {
            pane.setBounding({ top: top });
            top += pane.getBounding().height;
        });
        this._xAxisPane.setBounding({ height: xAxisHeight, top: top });
    };
    ChartImp.prototype._measurePaneWidth = function () {
        var styles = this._chartStore.getStyles();
        var yAxisStyles = styles.yAxis;
        var isYAxisLeft = yAxisStyles.position === exports.YAxisPosition.Left;
        var isOutside = !yAxisStyles.inside;
        var totolWidth = this._container.offsetWidth;
        var mainWidth = 0;
        var yAxisWidth = Number.MIN_SAFE_INTEGER;
        var yAxisLeft = 0;
        var mainLeft = 0;
        this._panes.forEach(function (pane) {
            yAxisWidth = Math.max(yAxisWidth, pane.getAxisComponent().getAutoSize());
        });
        if (yAxisWidth > totolWidth) {
            yAxisWidth = totolWidth;
        }
        if (isOutside) {
            mainWidth = totolWidth - yAxisWidth;
            if (isYAxisLeft) {
                yAxisLeft = 0;
                mainLeft = yAxisWidth;
            }
            else {
                yAxisLeft = totolWidth - yAxisWidth;
                mainLeft = 0;
            }
        }
        else {
            mainWidth = totolWidth;
            mainLeft = 0;
            if (isYAxisLeft) {
                yAxisLeft = 0;
            }
            else {
                yAxisLeft = totolWidth - yAxisWidth;
            }
        }
        this._chartStore.getTimeScaleStore().setTotalBarSpace(mainWidth);
        var paneBounding = { width: totolWidth };
        var mainBounding = { width: mainWidth, left: mainLeft };
        var yAxisBounding = { width: yAxisWidth, left: yAxisLeft };
        this._panes.forEach(function (pane) {
            pane.setBounding(paneBounding, mainBounding, yAxisBounding);
        });
        this._xAxisPane.setBounding(paneBounding, mainBounding, yAxisBounding);
    };
    ChartImp.prototype._setPaneOptions = function (options, forceShouldAdjust) {
        var _a, _b;
        var pane = this._panes.get((_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : '');
        var shouldMeasureHeight = false;
        if (pane !== undefined) {
            var shouldAdjust = forceShouldAdjust;
            if (options.id !== PaneIdConstants.CANDLE && options.height !== undefined && options.height > 0) {
                var minHeight = Math.max((_b = options.minHeight) !== null && _b !== void 0 ? _b : pane.getOptions().minHeight, 0);
                var height = Math.max(minHeight, options.height);
                pane.setBounding({ height: height });
                shouldAdjust = true;
                shouldMeasureHeight = true;
            }
            pane.setOptions(options);
            if (shouldAdjust) {
                this.adjustPaneViewport(shouldMeasureHeight, true, true, true, true);
            }
        }
    };
    ChartImp.prototype.getContainer = function () { return this._container; };
    ChartImp.prototype.getChartStore = function () { return this._chartStore; };
    ChartImp.prototype.getAllPanes = function () { return this._panes; };
    ChartImp.prototype.adjustPaneViewport = function (shouldMeasureHeight, shouldMeasureWidth, shouldUpdate, shouldAdjustYAxis, shouldForceAdjustYAxis) {
        if (shouldMeasureHeight) {
            this._measurePaneHeight();
        }
        var forceMeasureWidth = shouldMeasureWidth;
        var adjustYAxis = shouldAdjustYAxis !== null && shouldAdjustYAxis !== void 0 ? shouldAdjustYAxis : false;
        var forceAdjustYAxis = shouldForceAdjustYAxis !== null && shouldForceAdjustYAxis !== void 0 ? shouldForceAdjustYAxis : false;
        if (adjustYAxis || forceAdjustYAxis) {
            this._panes.forEach(function (pane) {
                var adjust = pane.getAxisComponent().buildTicks(forceAdjustYAxis);
                if (!forceMeasureWidth) {
                    forceMeasureWidth = adjust;
                }
            });
        }
        if (forceMeasureWidth) {
            this._measurePaneWidth();
        }
        if (shouldUpdate !== null && shouldUpdate !== void 0 ? shouldUpdate : false) {
            this._xAxisPane.getAxisComponent().buildTicks(true);
            this.updatePane(4 /* UpdateLevel.All */);
        }
    };
    ChartImp.prototype.updatePane = function (level, paneId) {
        var _a;
        if (paneId !== undefined) {
            (_a = this.getPaneById(paneId)) === null || _a === void 0 ? void 0 : _a.update(level);
        }
        else {
            this._xAxisPane.update(level);
            this._panes.forEach(function (pane) {
                pane.update(level);
            });
        }
    };
    ChartImp.prototype.getPaneById = function (paneId) {
        var _a;
        if (paneId === PaneIdConstants.XAXIS) {
            return this._xAxisPane;
        }
        return (_a = this._panes.get(paneId)) !== null && _a !== void 0 ? _a : null;
    };
    ChartImp.prototype.crosshairChange = function (crosshair) {
        var _this = this;
        var actionStore = this._chartStore.getActionStore();
        if (actionStore.has(exports.ActionType.OnCrosshairChange)) {
            var indicatorData_1 = {};
            this._panes.forEach(function (_, id) {
                var paneIndicatorData = {};
                var indicators = _this._chartStore.getIndicatorStore().getInstances(id);
                indicators.forEach(function (indicator) {
                    var _a;
                    var result = indicator.result;
                    paneIndicatorData[indicator.name] = result[(_a = crosshair.dataIndex) !== null && _a !== void 0 ? _a : result.length - 1];
                });
                indicatorData_1[id] = paneIndicatorData;
            });
            if (crosshair.paneId !== undefined) {
                actionStore.execute(exports.ActionType.OnCrosshairChange, __assign(__assign({}, crosshair), { indicatorData: indicatorData_1 }));
            }
        }
    };
    ChartImp.prototype.getDom = function (paneId, position) {
        var _a, _b;
        if (paneId !== undefined) {
            var pane = this.getPaneById(paneId);
            if (pane !== null) {
                var pos = position !== null && position !== void 0 ? position : exports.DomPosition.Root;
                switch (pos) {
                    case exports.DomPosition.Root: {
                        return pane.getContainer();
                    }
                    case exports.DomPosition.Main: {
                        return pane.getMainWidget().getContainer();
                    }
                    case exports.DomPosition.YAxis: {
                        return (_b = (_a = pane.getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getContainer()) !== null && _b !== void 0 ? _b : null;
                    }
                }
            }
        }
        else {
            return this._chartContainer;
        }
        return null;
    };
    ChartImp.prototype.getSize = function (paneId, position) {
        var _a, _b;
        if (paneId !== undefined) {
            var pane = this.getPaneById(paneId);
            if (pane !== null) {
                var pos = position !== null && position !== void 0 ? position : exports.DomPosition.Root;
                switch (pos) {
                    case exports.DomPosition.Root: {
                        return pane.getBounding();
                    }
                    case exports.DomPosition.Main: {
                        return pane.getMainWidget().getBounding();
                    }
                    case exports.DomPosition.YAxis: {
                        return (_b = (_a = pane.getYAxisWidget()) === null || _a === void 0 ? void 0 : _a.getBounding()) !== null && _b !== void 0 ? _b : null;
                    }
                }
            }
        }
        else {
            return {
                width: this._chartContainer.offsetWidth,
                height: this._chartContainer.offsetHeight,
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
        }
        return null;
    };
    ChartImp.prototype.setStyles = function (styles) {
        var _a, _b;
        this._chartStore.setOptions({ styles: styles });
        var realStyles;
        if (isString(styles)) {
            realStyles = getStyles(styles);
        }
        else {
            realStyles = styles;
        }
        if (((_a = realStyles === null || realStyles === void 0 ? void 0 : realStyles.yAxis) === null || _a === void 0 ? void 0 : _a.type) !== undefined) {
            (_b = this.getPaneById(PaneIdConstants.CANDLE)) === null || _b === void 0 ? void 0 : _b.getAxisComponent().setAutoCalcTickFlag(true);
        }
        this.adjustPaneViewport(true, true, true, true, true);
    };
    ChartImp.prototype.getStyles = function () {
        return this._chartStore.getStyles();
    };
    ChartImp.prototype.setLocale = function (locale) {
        this._chartStore.setOptions({ locale: locale });
        this.adjustPaneViewport(true, true, true, true, true);
    };
    ChartImp.prototype.getLocale = function () {
        return this._chartStore.getLocale();
    };
    ChartImp.prototype.setCustomApi = function (customApi) {
        this._chartStore.setOptions({ customApi: customApi });
        this.adjustPaneViewport(true, true, true, true, true);
    };
    ChartImp.prototype.setPriceVolumePrecision = function (pricePrecision, volumePrecision) {
        this._chartStore.setPrecision({ price: pricePrecision, volume: volumePrecision });
    };
    ChartImp.prototype.getPriceVolumePrecision = function () {
        return this._chartStore.getPrecision();
    };
    ChartImp.prototype.setTimezone = function (timezone) {
        this._chartStore.setOptions({ timezone: timezone });
        this._xAxisPane.getAxisComponent().buildTicks(true);
        this._xAxisPane.update(3 /* UpdateLevel.Drawer */);
    };
    ChartImp.prototype.getTimezone = function () {
        return this._chartStore.getTimeScaleStore().getTimezone();
    };
    ChartImp.prototype.setOffsetRightDistance = function (space) {
        this._chartStore.getTimeScaleStore().setOffsetRightDistance(space, true);
    };
    ChartImp.prototype.getOffsetRightDistance = function () {
        return this._chartStore.getTimeScaleStore().getOffsetRightDistance();
    };
    ChartImp.prototype.setLeftMinVisibleBarCount = function (barCount) {
        if (barCount > 0) {
            this._chartStore.getTimeScaleStore().setLeftMinVisibleBarCount(Math.ceil(barCount));
        }
        else {
            logWarn('setLeftMinVisibleBarCount', 'barCount', 'barCount must greater than zero!!!');
        }
    };
    ChartImp.prototype.setRightMinVisibleBarCount = function (barCount) {
        if (barCount > 0) {
            this._chartStore.getTimeScaleStore().setRightMinVisibleBarCount(Math.ceil(barCount));
        }
        else {
            logWarn('setRightMinVisibleBarCount', 'barCount', 'barCount must be a number and greater than zero!!!');
        }
    };
    ChartImp.prototype.setBarSpace = function (space) {
        this._chartStore.getTimeScaleStore().setBarSpace(space);
    };
    ChartImp.prototype.getBarSpace = function () {
        return this._chartStore.getTimeScaleStore().getBarSpace().bar;
    };
    ChartImp.prototype.getVisibleRange = function () {
        return this._chartStore.getTimeScaleStore().getVisibleRange();
    };
    ChartImp.prototype.clearData = function () {
        this._chartStore.clearDataList();
    };
    ChartImp.prototype.getDataList = function () {
        return this._chartStore.getDataList();
    };
    ChartImp.prototype.applyNewData = function (dataList, more, callback) {
        this._chartStore.clearDataList();
        if (dataList.length === 0) {
            this.adjustPaneViewport(false, true, true, true);
        }
        else {
            this.applyMoreData(dataList, more, callback);
        }
    };
    ChartImp.prototype.applyMoreData = function (dataList, more, callback) {
        var _this = this;
        this._chartStore.addData(dataList, 0, more);
        if (dataList.length > 0) {
            this._chartStore.getIndicatorStore().calcInstance().then(function (_) {
                _this.adjustPaneViewport(false, true, true, true);
                callback === null || callback === void 0 ? void 0 : callback();
            }).catch(function (_) { });
        }
    };
    ChartImp.prototype.updateData = function (data, callback) {
        var _this = this;
        var dataList = this._chartStore.getDataList();
        var dataCount = dataList.length;
        // Determine where individual data should be added
        var timestamp = data.timestamp;
        var lastDataTimestamp = formatValue(dataList[dataCount - 1], 'timestamp', 0);
        if (timestamp >= lastDataTimestamp) {
            var pos = dataCount;
            if (timestamp === lastDataTimestamp) {
                pos = dataCount - 1;
            }
            this._chartStore.addData(data, pos);
            this._chartStore.getIndicatorStore().calcInstance().then(function (_) {
                _this.adjustPaneViewport(false, true, true, true);
                callback === null || callback === void 0 ? void 0 : callback();
            }).catch(function (_) { });
        }
    };
    ChartImp.prototype.loadMore = function (cb) {
        this._chartStore.getTimeScaleStore().setLoadMoreCallback(cb);
    };
    ChartImp.prototype.createIndicator = function (value, isStack, paneOptions, callback) {
        var _this = this;
        var _a, _b;
        var indicator = isString(value) ? { name: value } : value;
        if (getIndicatorClass(indicator.name) === null) {
            logWarn('createIndicator', 'value', 'indicator not supported, you may need to use registerIndicator to add one!!!');
            return null;
        }
        var paneId;
        if (isValid(paneOptions) && isString(paneOptions === null || paneOptions === void 0 ? void 0 : paneOptions.id) && this._panes.has(paneOptions.id)) {
            paneId = paneOptions.id;
            this._chartStore.getIndicatorStore().addInstance(indicator, paneId, isStack !== null && isStack !== void 0 ? isStack : false).then(function (_) {
                var _a, _b;
                _this._setPaneOptions(paneOptions, (_b = (_a = _this._panes.get(paneId)) === null || _a === void 0 ? void 0 : _a.getAxisComponent().buildTicks(true)) !== null && _b !== void 0 ? _b : false);
            }).catch(function (_) { });
        }
        else {
            paneId = (_a = paneOptions === null || paneOptions === void 0 ? void 0 : paneOptions.id) !== null && _a !== void 0 ? _a : createId(PaneIdConstants.INDICATOR);
            var topPane = Array.from(this._panes.values()).pop();
            var pane = new IndicatorPane(this._chartContainer, this, paneId, topPane);
            topPane.setBottomPane(pane);
            var height = (_b = paneOptions === null || paneOptions === void 0 ? void 0 : paneOptions.height) !== null && _b !== void 0 ? _b : PANE_DEFAULT_HEIGHT;
            pane.setBounding({ height: height });
            if (isValid(paneOptions)) {
                pane.setOptions(paneOptions);
            }
            this._panes.set(paneId, pane);
            this._chartStore.getIndicatorStore().addInstance(indicator, paneId, isStack !== null && isStack !== void 0 ? isStack : false).finally(function () {
                _this.adjustPaneViewport(true, true, true, true, true);
                callback === null || callback === void 0 ? void 0 : callback();
            });
        }
        return paneId;
    };
    ChartImp.prototype.overrideIndicator = function (override, paneId, callback) {
        var _this = this;
        this._chartStore.getIndicatorStore().override(override, paneId !== null && paneId !== void 0 ? paneId : null).then(function (_a) {
            var _b = __read(_a, 2), onlyUpdateFlag = _b[0], resizeFlag = _b[1];
            if (onlyUpdateFlag || resizeFlag) {
                _this.adjustPaneViewport(false, resizeFlag, true, resizeFlag);
                callback === null || callback === void 0 ? void 0 : callback();
            }
        }).catch(function () { });
    };
    ChartImp.prototype.getIndicatorByPaneId = function (paneId, name) {
        return this._chartStore.getIndicatorStore().getInstanceByPaneId(paneId, name);
    };
    ChartImp.prototype.removeIndicator = function (paneId, name) {
        var indicatorStore = this._chartStore.getIndicatorStore();
        var removed = indicatorStore.removeInstance(paneId, name);
        if (removed) {
            var shouldMeasureHeight = false;
            if (paneId !== PaneIdConstants.CANDLE) {
                if (!indicatorStore.hasInstances(paneId)) {
                    var deletePane = this._panes.get(paneId);
                    if (deletePane !== undefined) {
                        shouldMeasureHeight = true;
                        var deleteTopPane = deletePane.getTopPane();
                        var deleteBottomPane = deletePane.getBottomPane();
                        deleteBottomPane === null || deleteBottomPane === void 0 ? void 0 : deleteBottomPane.setTopPane(deleteTopPane);
                        deleteTopPane === null || deleteTopPane === void 0 ? void 0 : deleteTopPane.setBottomPane(deleteBottomPane);
                        deletePane === null || deletePane === void 0 ? void 0 : deletePane.destroy();
                        this._panes.delete(paneId);
                    }
                }
            }
            this.adjustPaneViewport(shouldMeasureHeight, true, true, true, true);
        }
    };
    ChartImp.prototype.createOverlay = function (value, paneId) {
        var overlays = [];
        if (isString(value)) {
            overlays = [{ name: value }];
        }
        else if (isArray(value)) {
            overlays = value.map(function (v) {
                if (isString(v)) {
                    return { name: v };
                }
                return v;
            });
        }
        else {
            var overlay = value;
            overlays = [overlay];
        }
        var appointPaneFlag = true;
        if (paneId === undefined || this.getPaneById(paneId) === null) {
            paneId = PaneIdConstants.CANDLE;
            appointPaneFlag = false;
        }
        var ids = this._chartStore.getOverlayStore().addInstances(overlays, paneId, appointPaneFlag);
        if (isArray(value)) {
            return ids;
        }
        return ids[0];
    };
    ChartImp.prototype.getOverlayById = function (id) {
        return this._chartStore.getOverlayStore().getInstanceById(id);
    };
    ChartImp.prototype.overrideOverlay = function (override) {
        this._chartStore.getOverlayStore().override(override);
    };
    ChartImp.prototype.removeOverlay = function (remove) {
        var overlayRemove;
        if (remove !== undefined) {
            if (isString(remove)) {
                overlayRemove = { id: remove };
            }
            else {
                overlayRemove = remove;
            }
        }
        this._chartStore.getOverlayStore().removeInstance(overlayRemove);
    };
    ChartImp.prototype.setPaneOptions = function (options) {
        this._setPaneOptions(options, false);
    };
    ChartImp.prototype.setZoomEnabled = function (enabled) {
        this._chartStore.getTimeScaleStore().setZoomEnabled(enabled);
    };
    ChartImp.prototype.isZoomEnabled = function () {
        return this._chartStore.getTimeScaleStore().getZoomEnabled();
    };
    ChartImp.prototype.setScrollEnabled = function (enabled) {
        this._chartStore.getTimeScaleStore().setScrollEnabled(enabled);
    };
    ChartImp.prototype.isScrollEnabled = function () {
        return this._chartStore.getTimeScaleStore().getScrollEnabled();
    };
    ChartImp.prototype.scrollByDistance = function (distance, animationDuration) {
        var duration = animationDuration === undefined || animationDuration < 0 ? 0 : animationDuration;
        var timeScaleStore = this._chartStore.getTimeScaleStore();
        if (duration > 0) {
            timeScaleStore.startScroll();
            var startTime_1 = new Date().getTime();
            var animation_1 = function () {
                var progress = (new Date().getTime() - startTime_1) / duration;
                var finished = progress >= 1;
                var dis = finished ? distance : distance * progress;
                timeScaleStore.scroll(dis);
                if (!finished) {
                    requestAnimationFrame(animation_1);
                }
            };
            animation_1();
        }
        else {
            timeScaleStore.startScroll();
            timeScaleStore.scroll(distance);
        }
    };
    ChartImp.prototype.scrollToRealTime = function (animationDuration) {
        var timeScaleStore = this._chartStore.getTimeScaleStore();
        var barSpace = timeScaleStore.getBarSpace().bar;
        var difBarCount = timeScaleStore.getOffsetRightBarCount() - timeScaleStore.getInitialOffsetRightDistance() / barSpace;
        var distance = difBarCount * barSpace;
        this.scrollByDistance(distance, animationDuration);
    };
    ChartImp.prototype.scrollToDataIndex = function (dataIndex, animationDuration) {
        var timeScaleStore = this._chartStore.getTimeScaleStore();
        var distance = (timeScaleStore.getOffsetRightBarCount() + (this.getDataList().length - 1 - dataIndex)) * timeScaleStore.getBarSpace().bar;
        this.scrollByDistance(distance, animationDuration);
    };
    ChartImp.prototype.scrollToTimestamp = function (timestamp, animationDuration) {
        var dataIndex = binarySearchNearest(this.getDataList(), 'timestamp', timestamp);
        this.scrollToDataIndex(dataIndex, animationDuration);
    };
    ChartImp.prototype.zoomAtCoordinate = function (scale, coordinate, animationDuration) {
        var duration = animationDuration === undefined || animationDuration < 0 ? 0 : animationDuration;
        var timeScaleStore = this._chartStore.getTimeScaleStore();
        if (duration > 0) {
            var barSpace_1 = timeScaleStore.getBarSpace().bar;
            var scaleDataSpace = barSpace_1 * scale;
            var difSpace_1 = scaleDataSpace - barSpace_1;
            var startTime_2 = new Date().getTime();
            var animation_2 = function () {
                var progress = (new Date().getTime() - startTime_2) / duration;
                var finished = progress >= 1;
                var progressDataSpace = finished ? difSpace_1 : difSpace_1 * progress;
                timeScaleStore.zoom(progressDataSpace / barSpace_1, coordinate);
                if (!finished) {
                    requestAnimationFrame(animation_2);
                }
            };
            animation_2();
        }
        else {
            timeScaleStore.zoom(scale, coordinate);
        }
    };
    ChartImp.prototype.zoomAtDataIndex = function (scale, dataIndex, animationDuration) {
        var x = this._chartStore.getTimeScaleStore().dataIndexToCoordinate(dataIndex);
        this.zoomAtCoordinate(scale, { x: x, y: 0 }, animationDuration);
    };
    ChartImp.prototype.zoomAtTimestamp = function (scale, timestamp, animationDuration) {
        var dataIndex = binarySearchNearest(this.getDataList(), 'timestamp', timestamp);
        this.zoomAtDataIndex(scale, dataIndex, animationDuration);
    };
    ChartImp.prototype.convertToPixel = function (points, finder) {
        var _a;
        var _b = finder.paneId, paneId = _b === void 0 ? PaneIdConstants.CANDLE : _b, _c = finder.absolute, absolute = _c === void 0 ? false : _c;
        var coordinates = [];
        if (paneId !== PaneIdConstants.XAXIS) {
            var pane = this.getPaneById(paneId);
            if (pane !== null) {
                var timeScaleStore_1 = this._chartStore.getTimeScaleStore();
                var bounding_1 = pane.getBounding();
                var ps = new Array().concat(points);
                var xAxis_1 = this._xAxisPane.getAxisComponent();
                var yAxis_1 = pane.getAxisComponent();
                coordinates = ps.map(function (point) {
                    var coordinate = {};
                    var dataIndex = point.dataIndex;
                    if (point.timestamp !== undefined) {
                        dataIndex = timeScaleStore_1.timestampToDataIndex(point.timestamp);
                    }
                    if (dataIndex !== undefined) {
                        coordinate.x = xAxis_1 === null || xAxis_1 === void 0 ? void 0 : xAxis_1.convertToPixel(dataIndex);
                    }
                    if (point.value !== undefined) {
                        var y = yAxis_1 === null || yAxis_1 === void 0 ? void 0 : yAxis_1.convertToPixel(point.value);
                        coordinate.y = absolute ? bounding_1.top + y : y;
                    }
                    return coordinate;
                });
            }
        }
        return isArray(points) ? coordinates : ((_a = coordinates[0]) !== null && _a !== void 0 ? _a : {});
    };
    ChartImp.prototype.convertFromPixel = function (coordinates, finder) {
        var _a;
        var _b = finder.paneId, paneId = _b === void 0 ? PaneIdConstants.CANDLE : _b, _c = finder.absolute, absolute = _c === void 0 ? false : _c;
        var points = [];
        if (paneId !== PaneIdConstants.XAXIS) {
            var pane = this.getPaneById(paneId);
            if (pane !== null) {
                var timeScaleStore_2 = this._chartStore.getTimeScaleStore();
                var bounding_2 = pane.getBounding();
                var cs = new Array().concat(coordinates);
                var xAxis_2 = this._xAxisPane.getAxisComponent();
                var yAxis_2 = pane.getAxisComponent();
                points = cs.map(function (coordinate) {
                    var _a;
                    var point = {};
                    if (coordinate.x !== undefined) {
                        var dataIndex = xAxis_2.convertFromPixel(coordinate.x);
                        point.dataIndex = dataIndex;
                        point.timestamp = (_a = timeScaleStore_2.dataIndexToTimestamp(dataIndex)) !== null && _a !== void 0 ? _a : undefined;
                    }
                    if (coordinate.y !== undefined) {
                        var y = absolute ? coordinate.y - bounding_2.top : coordinate.y;
                        point.value = yAxis_2.convertFromPixel(y);
                    }
                    return point;
                });
            }
        }
        return isArray(coordinates) ? points : ((_a = points[0]) !== null && _a !== void 0 ? _a : {});
    };
    ChartImp.prototype.executeAction = function (type, data) {
        var _a;
        switch (type) {
            case exports.ActionType.OnCrosshairChange: {
                var crosshair = __assign({}, data);
                crosshair.paneId = (_a = crosshair.paneId) !== null && _a !== void 0 ? _a : PaneIdConstants.CANDLE;
                this._chartStore.getCrosshairStore().set(crosshair);
                break;
            }
        }
    };
    ChartImp.prototype.subscribeAction = function (type, callback) {
        this._chartStore.getActionStore().subscribe(type, callback);
    };
    ChartImp.prototype.unsubscribeAction = function (type, callback) {
        this._chartStore.getActionStore().unsubscribe(type, callback);
    };
    ChartImp.prototype.getConvertPictureUrl = function (includeOverlay, type, backgroundColor) {
        var width = this._chartContainer.offsetWidth;
        var height = this._chartContainer.offsetHeight;
        var canvas = createDom('canvas', {
            width: "".concat(width, "px"),
            height: "".concat(height, "px"),
            boxSizing: 'border-box'
        });
        var ctx = canvas.getContext('2d');
        var pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        ctx.fillStyle = backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        var overlayFlag = includeOverlay !== null && includeOverlay !== void 0 ? includeOverlay : false;
        this._panes.forEach(function (pane) {
            var bounding = pane.getBounding();
            ctx.drawImage(pane.getImage(overlayFlag), 0, bounding.top, width, bounding.height);
        });
        var xAxisBounding = this._xAxisPane.getBounding();
        ctx.drawImage(this._xAxisPane.getImage(overlayFlag), 0, xAxisBounding.top, width, xAxisBounding.height);
        return canvas.toDataURL("image/".concat(type !== null && type !== void 0 ? type : 'jpeg'));
    };
    ChartImp.prototype.resize = function () {
        this.adjustPaneViewport(true, true, true, true, true);
    };
    ChartImp.prototype.destroy = function () {
        this._chartEvent.destroy();
        this._panes.forEach(function (pane) {
            pane.destroy();
        });
        this._panes.clear();
        this._xAxisPane.destroy();
        this._container.removeChild(this._chartContainer);
    };
    return ChartImp;
}());

/**
 *       ___           ___                   ___           ___           ___           ___           ___           ___           ___
 *      /\__\         /\__\      ___        /\__\         /\  \         /\  \         /\__\         /\  \         /\  \         /\  \
 *     /:/  /        /:/  /     /\  \      /::|  |       /::\  \       /::\  \       /:/  /        /::\  \       /::\  \        \:\  \
 *    /:/__/        /:/  /      \:\  \    /:|:|  |      /:/\:\  \     /:/\:\  \     /:/__/        /:/\:\  \     /:/\:\  \        \:\  \
 *   /::\__\____   /:/  /       /::\__\  /:/|:|  |__   /::\~\:\  \   /:/  \:\  \   /::\  \ ___   /::\~\:\  \   /::\~\:\  \       /::\  \
 *  /:/\:::::\__\ /:/__/     __/:/\/__/ /:/ |:| /\__\ /:/\:\ \:\__\ /:/__/ \:\__\ /:/\:\  /\__\ /:/\:\ \:\__\ /:/\:\ \:\__\     /:/\:\__\
 *  \/_|:|~~|~    \:\  \    /\/:/  /    \/__|:|/:/  / \:\~\:\ \/__/ \:\  \  \/__/ \/__\:\/:/  / \/__\:\/:/  / \/_|::\/:/  /    /:/  \/__/
 *     |:|  |      \:\  \   \::/__/         |:/:/  /   \:\ \:\__\    \:\  \            \::/  /       \::/  /     |:|::/  /    /:/  /
 *     |:|  |       \:\  \   \:\__\         |::/  /     \:\ \/__/     \:\  \           /:/  /        /:/  /      |:|\/__/     \/__/
 *     |:|  |        \:\__\   \/__/         /:/  /       \:\__\        \:\__\         /:/  /        /:/  /       |:|  |
 *      \|__|         \/__/                 \/__/         \/__/         \/__/         \/__/         \/__/         \|__|
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var instances = new Map();
var chartBaseId = 1;
/**
 * Chart version
 * @return {string}
 */
function version() {
    return '9.5.0';
}
/**
 * Init chart instance
 * @param ds
 * @param options
 * @returns {Chart}
 */
function init(ds, options) {
    logTag();
    var dom;
    if (isString(ds)) {
        dom = document.getElementById(ds);
    }
    else {
        dom = ds;
    }
    if (dom === null) {
        logError('', '', 'The chart cannot be initialized correctly. Please check the parameters. The chart container cannot be null and child elements need to be added!!!');
        return null;
    }
    var chart = instances.get(dom.id);
    if (chart !== undefined) {
        logWarn('', '', 'The chart has been initialized on the dom！！！');
        return chart;
    }
    var id = "k_line_chart_".concat(chartBaseId++);
    chart = new ChartImp(dom, options);
    chart.id = id;
    dom.setAttribute('k-line-chart-id', id);
    instances.set(id, chart);
    return chart;
}
/**
 * Destory chart instace
 * @param dcs
 */
function dispose(dcs) {
    var _a, _b;
    var id;
    if (dcs instanceof ChartImp) {
        id = dcs.id;
    }
    else {
        var dom = void 0;
        if (isString(dcs)) {
            dom = document.getElementById(dcs);
        }
        else {
            dom = dcs;
        }
        id = (_a = dom === null || dom === void 0 ? void 0 : dom.getAttribute('k-line-chart-id')) !== null && _a !== void 0 ? _a : null;
    }
    if (id !== null) {
        (_b = instances.get(id)) === null || _b === void 0 ? void 0 : _b.destroy();
        instances.delete(id);
    }
}
var utils = {
    clone: clone,
    merge: merge,
    isString: isString,
    isNumber: isNumber,
    isValid: isValid,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    isBoolean: isBoolean,
    formatValue: formatValue,
    formatPrecision: formatPrecision,
    formatBigNumber: formatBigNumber,
    formatDate: formatDate,
    formatThousands: formatThousands,
    calcTextWidth: calcTextWidth,
    getLinearSlopeIntercept: getLinearSlopeIntercept,
    getLinearYFromSlopeIntercept: getLinearYFromSlopeIntercept,
    getLinearYFromCoordinates: getLinearYFromCoordinates,
    checkCoordinateOnArc: checkCoordinateOnArc,
    checkCoordinateOnCircle: checkCoordinateOnCircle,
    checkCoordinateOnLine: checkCoordinateOnLine,
    checkCoordinateOnPolygon: checkCoordinateOnPolygon,
    checkCoordinateOnRect: checkCoordinateOnRect,
    checkCoordinateOnText: checkCoordinateOnText,
    checkCoordinateOnWick: checkCoordinateOnWick,
    drawArc: drawArc,
    drawCircle: drawCircle,
    drawLine: drawLine,
    drawPolygon: drawPolygon,
    drawRect: drawRect,
    drawText: drawText,
    drawRectText: drawRectText,
    drawWick: drawWick
};

exports.dispose = dispose;
exports.getFigureClass = getFigureClass;
exports.getSupportedFigures = getSupportedFigures;
exports.getSupportedIndicators = getSupportedIndicators;
exports.getSupportedLocales = getSupportedLocales;
exports.getSupportedOverlays = getSupportedOverlays;
exports.init = init;
exports.registerFigure = registerFigure;
exports.registerIndicator = registerIndicator;
exports.registerLocale = registerLocale;
exports.registerOverlay = registerOverlay;
exports.registerStyles = registerStyles;
exports.utils = utils;
exports.version = version;

}));
//# sourceMappingURL=klinecharts.js.map
