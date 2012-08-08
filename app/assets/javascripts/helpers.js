(function($, _, Backbone, helpers) {
  "use strict";

  var colorPalette = [
    '#FF8000',
    '#00FF80',
//    '#8000FF',

    '#FFFF00',
    '#00FFFF',
    '#FF00FF',

    '#80FF00',
//    '#0080FF',
    '#FF0080',

//    '#FF0000',
    '#00FF00',
//    '#0000FF',

    '#A6FF00',
    '#FF8900',
    '#00FF0D',
    '#BB00FF',
    '#0051FF',
    '#FF001A'

  ];

  helpers.ColorFactory = {
    currentColorIndex: 0,
    get: function() {
      if (this.currentColorIndex >= colorPalette.length-1) {
        this.currentColorIndex = 0;
      }
      var color = colorPalette[this.currentColorIndex];
      this.currentColorIndex++;
      return color;
    }
  };

  helpers.TimeSelector = {
    getFrom: function(time, rangeString) {
      var range = this.getRange(rangeString);
      return Math.round((time - range) / 1000);
    },

    getPreviousFrom: function(time, rangeString) {
      var range = this.getRange(rangeString) * 2;
      return Math.round((time - range) / 1000);
    },

    getCurrent: function() {
      return Math.round((new Date()).getTime() / 1000);
    },

    getRange: function(rangeString) {
      var range = null;
      switch(rangeString) {
        case "30-minutes":
          range = 60*30;
          break;
        case "60-minutes":
          range = 60*60;
          break;
        case "3-hours":
          range = 60*60*3;
          break;
        case "12-hours":
          range = 60*60*12;
          break;
        case "24-hours":
          range = 60*60*24;
          break;
        case "3-days":
          range = 60*60*24*3;
          break;
        case "7-days":
          range = 60*60*24*7;
          break;
        case "4-weeks":
          range = 60*60*24*7*4;
          break;
        default:
          throw "Unknown rangeString: " + rangeString;
      }
      return range * 1000;
    }
  };

})($, _, Backbone, app.helpers);
