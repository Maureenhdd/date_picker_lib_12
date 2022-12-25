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
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
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
  var onClickDate = props.onClick;
  var handleAcitveFalse = function handleAcitveFalse() {
    setActive(false);
    onClickDate(new Date(dateYear, dateMonth - 1, dateDay));
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
  (0, _react.useEffect)(function () {
    active && yearActive && scrollRef.current.scrollIntoView();
  }, [yearActive, active]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "input_date_block",
    style: {
      width: props.width
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input_date",
    type: "text",
    onClick: function onClick() {
      return setActive(true);
    },
    value: "".concat(dateDay.toString().padStart(2, "0"), "/").concat(dateMonth.toString().padStart(2, "0"), "/").concat(dateYear),
    onChange: function onChange() {
      return "".concat(dateDay.toString().padStart(2, "0"), "/").concat(dateMonth.toString().padStart(2, "0"), "/").concat(dateYear);
    }
  }), active && /*#__PURE__*/React.createElement("div", {
    className: "input_date_open"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input_date_btn"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setDateMonth(dateMonth - 1);
    },
    disabled: dateMonth === 1 ? true : false,
    className: "input_date_btn--previous"
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faChevronLeft
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setYearActive(!yearActive);
    },
    className: "input_date_btn--current"
  }, dateYear, " ", pickedMonth), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setDateMonth(dateMonth + 1);
    },
    disabled: dateMonth === 12 ? true : false,
    className: "input_date_btn--next"
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faChevronRight
  }))), /*#__PURE__*/React.createElement("div", {
    className: "input_date_open__days"
  }, countDay.map(function (day, i) {
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      className: "  ".concat(day === dateDay ? "input_date_open__days--picked" : "input_date_open__days--p"),
      onClick: function onClick() {
        setDateDay(day);
      }
    }, day);
  })), /*#__PURE__*/React.createElement("ul", {
    className: yearActive ? "input_date_year_open" : "input_date_year--closed"
  }, years.map(function (li, i) {
    return li === dateYear ? /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "input_date_year_open--years",
      ref: scrollRef
    }, li, /*#__PURE__*/React.createElement("ul", {
      className: "input_date_year_open__months--ul"
    }, months.map(function (month, i) {
      return /*#__PURE__*/React.createElement("li", {
        className: "input_date_year_open__months--li",
        key: i,
        onClick: function onClick() {
          handleMonth(i);
        }
      }, month);
    }))) : /*#__PURE__*/React.createElement("li", {
      className: "input_date_year_open--years",
      key: i,
      onClick: function onClick() {
        setDateYear(li);
      }
    }, li);
  }))));
};
var _default = InputDate;
exports.default = _default;