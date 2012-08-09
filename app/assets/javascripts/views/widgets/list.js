(function ($, _, Backbone, views, models, collections){
  "use strict";

  views.widgets.List = Backbone.View.extend({

    initialize: function(options) {
      _.bindAll(this, "render", "update", "widgetChanged");

      this.updateModel();

    },

    fetch: function() {
      return this.model ? this.model.fetch() : null;
    },

    updateModel: function() {
      if (this.getSource()) {
        if (this.model) {
          this.model.off();
        }
        this.model = new models.List({
          source: this.getSource(),
          http_proxy_url: this.getHttpProxyUrl()
        });
        this.model.on('change', this.render);
      }
    },

    getHttpProxyUrl: function() {
      return this.model.get("http_proxy_url");
    },

    getSource: function() {
      return this.model.get("source");
    },

    widgetChanged: function() {
      this.updateModel();
      this.render();
    },

    render: function() {
      if (this.model) {
        this.$el.html(JST['templates/widgets/list/show']({
          titles: this.model.get('titles'),
          data: this.model.get('data')
        }));
      }

      return this;
    },

    update: function() {
      return $.when.apply(null, [this.fetch()]);
    },

    onClose: function() {
      this.model.off();
    }
  });
})($, _, Backbone, app.views, app.models, app.collections);
