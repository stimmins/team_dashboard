(function ($, _, Backbone, views, models, collections){
  "use strict";

  var NumberSubview = Backbone.View.extend({

    className: 'triple-row',

    initialize: function(options) {
      _.bindAll(this, "render");
      this.widget = options.widget;
      this.number = options.number;
      this.updateModel();
    },

    fetch: function() {
      return this.model ? this.model.fetch({ suppressErrors: true }) : null;
    },

    updateModel: function() {
      if (this.getSource()) {
        if (this.model) {
          this.model.off();
        }
        this.model = new models.Number({ source: this.getSource(), http_proxy_url: this.getHttpProxyUrl(), value_path: this.getValuePath() });
        this.model.on('change', this.render);
      }
    },

    getHttpProxyUrl: function() {
      return this.widget.get("http_proxy_url" + this.number);
    },

    getValuePath: function() {
      return this.widget.get("value_path" + this.number);
    },

    getSource: function() {
      return this.widget.get("source" + this.number);
    },

    getValue: function() {
      var result = this.model.resolveValue();
      if (result % 1 === 0) {
        return result;
      } else {
        return result.toFixed(2);
      }
    },

    getLabel: function() {
      return this.model.get("label") || this.widget.get('label'+this.number);
    },

    render: function() {
      if (this.model) {
        this.$el.html(JST['templates/widgets/number/subview']({ value: this.getValue(), label: this.getLabel() }));

        this.$value = this.$('.number-value');
        this.$value.toggleClass('color-up', this.getValue() > 0);
        this.$value.toggleClass('color-down', this.getValue() < 0);
        this.updateValueSizeClass();
      }

      return this;
    },

    updateValueSizeClass: function(){
      var str = this.getValue().toString().length;
      this.$value.toggleClass("value-size-medium", str <= 5);
      this.$value.toggleClass("value-size-small", str > 5);
    },

    onClose: function() {
      if (this.model) this.model.off();
    }

  });

  views.widgets.Number = Backbone.CompositeView.extend({

    initialize: function(options) {
      _.bindAll(this, "render", "update", "widgetChanged");

      this.updateNumberModels();

      this.model.on('change', this.widgetChanged);
    },

    updateNumberModels: function() {
      this.forEachChild(function(child) {
        child.updateModel();
      });
    },


    widgetChanged: function() {
      this.updateNumberModels();
      this.render();
    },

    render: function() {
      this.numberView1 = new NumberSubview({ widget: this.model, number: 1 });
      this.addChildView(this.numberView1);
      this.numberView2 = new NumberSubview({ widget: this.model, number: 2 });
      this.addChildView(this.numberView2);
      this.numberView3 = new NumberSubview({ widget: this.model, number: 3 });
      this.addChildView(this.numberView3);
      return this;
    },

    update: function() {
      var that = this;
      var validModels = [];
      this.forEachChild(function(child) {
        validModels.push(child.fetch());
      });

      return $.when.apply(null, validModels);
    },

    onClose: function() {
      this.model.off();
    }
  });

})($, _, Backbone, app.views, app.models, app.collections);
