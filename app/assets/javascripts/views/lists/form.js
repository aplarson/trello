TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST["lists/form"],

  initialize: function () {
    this.$el = $('<li>').addClass('list');
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})