TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST["boards/index_item"],

  initialize: function (board) {
    this.board = board;
    this.$el = $('<li>');
    this.$el.addClass('col-md-3');
  },

  render: function () {
    var content = this.template({ board: this.board });
    this.$el.html(content);
    return this;
  }
})