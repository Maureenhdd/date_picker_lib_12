"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYears = exports.getMonths = void 0;
var getYears = function getYears() {
  var arrayDate = [];
  for (var i = 2022; i >= 1822; i--) {
    arrayDate.push(i);
  }
  for (var _i = 2023; _i <= 2222; _i++) {
    arrayDate.push(_i);
  }
  arrayDate.sort();
  return arrayDate;
};
exports.getYears = getYears;
var getMonths = function getMonths() {
  var months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
  return months;
};
exports.getMonths = getMonths;