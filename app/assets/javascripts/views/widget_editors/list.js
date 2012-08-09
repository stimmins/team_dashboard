(function ($, _, Backbone, views, models, collections) {
  "use strict";

  views.WidgetEditors.List = Backbone.View.extend({

    events: {
      "change select#source" : "sourceChanged"
    },

    initialize: function() {
      _.bindAll(this, "sourceChanged", "render");
    },

    validate: function() {
      return this.form.validate();
    },

    sourceChanged: function(event) {
      var value  = this.$(event.target).val(),
          id     = this.$(event.target).attr("id"),
          el     = this.$(".field-http_proxy_url");
      if (value === "http_proxy") {
        el.slideDown();
      } else {
        el.slideUp();
      }
    },

    render: function() {
      this.form = new Backbone.Form({
        data  : this.model.toJSON(),
        schema: this.getSchema()
      });
      this.$el.html(this.form.render().el);

      if (this.$("select#source").val() === "http_proxy") {
        this.$(".field-http_proxy_url").show();
      } else {
        this.$(".field-http_proxy_url").hide();
      }

      return this;
    },

    getValue: function() {
      return this.form.getValue();
    },

    getSources: function() {
      var sources = $.Sources.getNumber();
      sources.unshift("");
      return sources;
    },

    getUpdateIntervalOptions: function() {
      return [
        { val: 10, label: '10 sec' },
        { val: 600, label: '1 min' },
        { val: 6000, label: '10 min' },
        { val: 36000, label: '1 hour' }
      ];
    },

    getSchema: function() {
      var that = this;
      var err = { type: 'required', message: 'Required' };

      return {
        name: { title: "Text", validators: ["required"] },
        update_interval:  {
          title: 'Update Interval',
          type: 'Select',
          options: this.getUpdateIntervalOptions()
        },
        source: {
          title: "Source",
          type: 'Select',
          options: that.getSources(),
          validators: [
            "required"
          ]
        },
        http_proxy_url: {
          title: "Proxy URL",
          type: "Text",
          validators: [
            function checkHttpProxyUrl(value, formValues) {
              if (formValues["source"] === "http_proxy" && value.length === 0) {
                return err;
              }
          }]
        }
      };
    }

  });
})($, _, Backbone, app.views, app.models, app.collections);