// Generated by CoffeeScript 1.3.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['environ', 'mediator', 'jquery', 'use!underscore', 'use!backbone', 'templates', 'views/forms', 'views/charts'], function(environ, mediator, $, _, Backbone, Templates, Forms, Charts) {
  var Container, DataFiltersAccordian, QueryView;
  Container = (function(_super) {

    __extends(Container, _super);

    function Container() {
      return Container.__super__.constructor.apply(this, arguments);
    }

    Container.prototype.template = Templates.container;

    Container.prototype.initialize = function() {
      this.setElement(this.template());
      this.heading = this.$el.find('.heading');
      return this.content = this.$el.find('.content');
    };

    return Container;

  })(Backbone.View);
  QueryView = (function(_super) {

    __extends(QueryView, _super);

    function QueryView() {
      this.update = __bind(this.update, this);
      return QueryView.__super__.constructor.apply(this, arguments);
    }

    QueryView.prototype.template = Templates.queryview;

    QueryView.prototype.events = {
      'click [data-toggle=detail]': 'toggleDetail'
    };

    QueryView.prototype.initialize = function() {
      var attrs, cat,
        _this = this;
      attrs = {
        name: this.model.get('name'),
        category: (cat = this.model.get('category')) ? cat.name : '',
        description: this.model.get('description')
      };
      this.setElement(this.template(attrs));
      this.$heading = this.$el.find('.heading');
      this.$content = this.$el.find('.content');
      this.$details = this.$el.find('.details');
      this.$controls = this.$el.find('.controls');
      this.$charts = this.$el.find('.charts');
      return mediator.subscribe('queryview', function(id, action) {
        if (_this.model.get('id') === id && action === 'show') {
          _this.visible = true;
          return _this.render();
        } else {
          _this.visible = false;
          return _this.$el.detach();
        }
      });
    };

    QueryView.prototype.toggleDetail = function() {
      if (this.$details.is(':visible')) {
        return this.$details.slideUp(300);
      } else {
        return this.$details.slideDown(300);
      }
    };

    QueryView.prototype.render = function(event) {
      var form,
        _this = this;
      if (!this.loaded) {
        mediator.subscribe('datacontext/change', this.update);
        this.fieldCollection = new Backbone.Collection(this.model.get('fields'));
        form = new Forms.FilterForm({
          collection: this.fieldCollection
        });
        this.$controls.append(form.$el);
        this.charts = [];
        this.fieldCollection.each(function(model, i) {
          var chart;
          chart = new Charts.Distribution({
            editable: false
          });
          _this.charts.push([model, chart]);
          return _this.$charts.append(chart.$el);
        });
        this.pendingUpdate = true;
        this.loaded = true;
      }
      if (this.pendingUpdate) {
        this.update();
      }
      App.router.navigate('discover');
      return App.views.discover.$el.append(this.$el);
    };

    QueryView.prototype.update = function() {
      var chart, model, url, _i, _len, _ref, _ref1;
      if (this.visible) {
        _ref = this.charts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref1 = _ref[_i], model = _ref1[0], chart = _ref1[1];
          url = environ.absolutePath("/api/fields/" + model.id + "/dist/");
          chart.renderChart(url, null, [model]);
        }
      } else {
        this.pendingUpdate = true;
      }
    };

    return QueryView;

  })(Backbone.View);
  DataFiltersAccordian = (function(_super) {

    __extends(DataFiltersAccordian, _super);

    function DataFiltersAccordian() {
      this.render = __bind(this.render, this);
      return DataFiltersAccordian.__super__.constructor.apply(this, arguments);
    }

    DataFiltersAccordian.prototype.initialize = function() {
      return this.collection.on('reset', this.render);
    };

    DataFiltersAccordian.prototype.events = {
      'click [data-toggle=queryview]': 'showQueryview'
    };

    DataFiltersAccordian.prototype.render = function(collection) {
      var category, categoryName, group, groupName, id, model, _i, _len, _ref;
      this.$el.empty();
      _ref = collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        if (!model.get('queryview')) {
          continue;
        }
        category = model.get('category');
        categoryName = category ? category.name : 'Other';
        if (!groupName || categoryName !== groupName) {
          groupName = categoryName;
          id = this.$el.prop('id');
          group = $(Templates.accordianGroup({
            name: groupName,
            parent: id,
            slug: "" + id + "-" + (groupName.toLowerCase())
          }));
          this.$el.append(group);
        }
        group.find('.nav').append($("<li><a href=# data-toggle=queryview data-target=" + model.id + ">" + (model.get('name')) + "</a> <i class=icon-filter></i></li>"));
      }
      return this.$el;
    };

    DataFiltersAccordian.prototype.showQueryview = function(event) {
      var targetId;
      event.preventDefault();
      targetId = $(event.target).data('target');
      return mediator.publish('queryview', targetId, 'show');
    };

    return DataFiltersAccordian;

  })(Backbone.View);
  return {
    Container: Container,
    DataFiltersAccordian: DataFiltersAccordian,
    QueryView: QueryView
  };
});