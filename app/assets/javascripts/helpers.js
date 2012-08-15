(function($, _, Backbone, bootbox, collections, helpers) {
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

  helpers.FormBuilder = {
    options: function(sources, options) {
      options = options || {};
      var result = "";
      if (options.emptyOption === true) {
        result += "<option></option>";
      }

      _.each(sources, function(source) {
        if (source.available) {
          result += "<option>" + source.name + "</option>";
        } else {
          result += "<option disabled>" + source.name + "</option>";
        }
      });
      return result;
    }
  };

  // make bootbox available in helper namespace
  helpers.bootbox = bootbox;

  // pool of datapoints targets collection
  // TODO: fetch fresh collection here instead of Backbone View
  helpers.DatapointsTargetsPool = function() {
    this.pool = {};
  };

  helpers.DatapointsTargetsPool.prototype.get = function(source) {
    var result = null;
    if (this.pool[source]) {
      result = this.pool[source];
    } else {
      result = this.pool[source] = new collections.DatapointsTarget({ source: source});
    }

    return result;
  };

})($, _, Backbone, bootbox, app.collections, app.helpers);
