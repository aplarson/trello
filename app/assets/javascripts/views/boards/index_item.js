TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST["boards/index_item"],

  initialize: function (board) {
    this.board = board;
    this.$el = $('<li>');
    this.$el.addClass('col-md-3');
  },

  events: {
    "click .board-index-item": "showBoard"
  },

  render: function () {
    var content = this.template({ board: this.board });
    this.$el.html(content);
    return this;
  },

  showBoard: function () {
    Backbone.history.navigate('/boards/' + this.board.id);
  }
})