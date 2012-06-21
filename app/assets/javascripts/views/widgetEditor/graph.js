(function ($, _, Backbone, views, models, collections) {
  "use strict";

  views.WidgetEditor.Graph = Backbone.View.extend({

    events: {
      "click .btn-primary" : "save"
    },

    initialize: function(options) {
      _.bindAll(this, "render", "prefillAutocomplete", "save");
      this.dashboard = options.dashboard;
      this.widgetCollection = options.widgetCollection;
      collections.metrics.source = this.model.get('source');
    },

    prefillAutocomplete: function() {
      var that = this;
      if (!collections.metrics.isFetched) {
        collections.metrics.fetch({ success: that.prefillAutocomplete });
        return;
      }
      this.targetInput.select2({ tags: collections.metrics.autocomplete_names() });
    },

    render: function() {
      $(this.el).html(JST['templates/widgets/graph/edit']({ model: this.model.toJSON() }));

      this.populate("graph");
      this.targetInput = this.$('.targets');
      this.prefillAutocomplete();

      var myModal = this.$('#dashboard-details-modal');
      var nameInput = this.$('.name');
      myModal.on("shown", function() {
        setTimeout(function() {
          nameInput.focus();
        }, 10);
      });

      myModal.modal({
        keyboard: true,
        show: true,
        backdrop: 'static'
      });
      
      return this;
    },

    save: function() {
      var that = this;
      var myModal = this.$('#dashboard-details-modal');
      myModal.modal("hide");

      var formResult = this.parse("graph");
      formResult.targets = this.targetInput.select2('val').join(',');

      if (this.model.isNew()) {
        this.model.set(formResult, { silent: true });
        this.widgetCollection.create(this.model);
      } else {
        this.model.save(formResult).done(function() {
          that.dashboard.trigger("widget:changed", that.model);
        });
      }

      return false;
    },

    onClose: function() {
    }

  });
})($, _, Backbone, app.views, app.models, app.collections);