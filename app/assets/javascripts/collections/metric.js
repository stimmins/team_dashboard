(function ($, _, Backbone, collections, model) {
  "use strict";

  collections.Metric = Backbone.Collection.extend({
    model: model,

    initialize: function(options) {
      this.source = options.source;

      this.isFetched = false;
      this.on('reset', this.onReset, this);
    },

    deferredFetch: function() {
      this.deferred = this.fetch();
      return this.deferred;
    },

    onReset: function() {
      this.isFetched = true;
    },

    autocomplete_names: function() {
      return this.map(function(metric) {
        return metric.get('name');
      });
    },

    url: function() {
      var params = ['source=' + encodeURIComponent(this.source)];
      return "/api/metrics?" + params.join('&');
    }
  });

})($, _, Backbone, app.collections, app.models.Metric);
