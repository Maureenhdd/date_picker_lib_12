"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _react = require("react");
var _reactDetectClickOutside = require("react-detect-click-outside");
var _luxon = require("luxon");
var _utils = require("./utils");
require("./InputDate.scss");
var InputDate = function InputDate(props) {
  var now = props.date;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    yearActive = _useState4[0],
    setYearActive = _useState4[1];
  var _useState5 = (0, _react.useState)(now.getFullYear()),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    dateYear = _useState6[0],
    setDateYear = _useState6[1];
  var _useState7 = (0, _react.useState)(now.getMonth() + 1),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    dateMonth = _useState8[0],
    setDateMonth = _useState8[1];
  var _useState9 = (0, _react.useState)(now.getDate()),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    dateDay = _useState10[0],
    setDateDay = _useState10[1];
  var years = (0, _utils.getYears)();
  var scrollRef = (0, _react.useRef)();
  var months = (0, _utils.getMonths)();
  var _onClick = props.onClick;
  console.log(now.getMonth());
  var handleAcitveFalse = function handleAcitveFalse() {
    setActive(false);
    // console.log("toto");
  };

  var handleMonth = function handleMonth(i) {
    setDateMonth(i + 1);
    setYearActive(false);
    // setActive(true);
  };

  var pickedMonth = months.find(function (m, i) {
    return i + 1 === dateMonth;
  });
  var countDay = [];
  for (var i = 1; i <= _luxon.DateTime.local(dateYear, months.indexOf(pickedMonth) + 1).endOf("month").c.day; i++) {
    countDay.push(i);
  }
  var ref = (0, _reactDetectClickOutside.useDetectClickOutside)({
    onTriggered: handleAcitveFalse
  });
  console.log(active);
  // console.log(now.year);
  (0, _react.useEffect)(function () {
    yearActive && scrollRef.current.scrollIntoView();
  }, [yearActive]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      margin: 20
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input_date",
    type: "text",
    onClick: function onClick() {
      return setActive(true);
    },
    value: "".concat(dateDay.toString().padStart(2, "0"), "/").concat(dateMonth.toString().padStart(2, "0"), "/").concat(dateYear)
  }), active && /*#__PURE__*/React.createElement("div", {
    className: "input_date_open"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setDateMonth(dateMonth - 1);
    },
    disabled: dateMonth === 1 ? true : false,
    className: "input_date_btn--previous"
  }, "-"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setYearActive(!yearActive);
    },
    className: "input_date_current_date--btn"
  }, dateYear, " ", pickedMonth), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setDateMonth(dateMonth + 1);
    },
    disabled: dateMonth === 12 ? true : false,
    className: "input_date_btn--next"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "input_date_open__days"
  }, countDay.map(function (day, i) {
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      className: "input_date_open__days--p  ".concat(day === dateDay ? "input_date_open__days--picked" : undefined),
      onClick: function onClick() {
        setDateDay(day);
        _onClick(new Date(dateYear, dateMonth - 1, day).toDateString());
      }
    }, day);
  })), yearActive && /*#__PURE__*/React.createElement("ul", {
    style: {
      height: 200,
      width: 200,
      backgroundColor: "white",
      overflow: "auto",
      position: "absolute",
      zIndex: 1,
      top: "50%",
      left: "50%",
      // right: 0,
      transform: "translate(-50%, -50%)"
    }
  }, years.map(function (li, i) {
    return li === dateYear ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        color: "pink"
      },
      ref: scrollRef
    }, li), /*#__PURE__*/React.createElement("ul", null, months.map(function (month, i) {
      return /*#__PURE__*/React.createElement("li", {
        key: i,
        onClick: function onClick() {
          return handleMonth(i);
        }
      }, month);
    }))) : /*#__PURE__*/React.createElement("li", {
      key: i,
      onClick: function onClick() {
        return setDateYear(li);
      }
    }, li);
  }))));
};
var _default = InputDate;
exports.default = _default;