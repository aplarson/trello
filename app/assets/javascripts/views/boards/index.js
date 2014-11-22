TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],

  initialize: function (collection) {
    this.$el.addClass("container-fluid")
    this.collection = collection;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addBoard);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.addBoards();

    return this;
  },

  addBoards: function () {
    this.collection.each(function (board) {
      this.addBoard(board)
    }.bind(this));
  },

  addBoard: function (board) {
    var boardView = new TrelloClone.Views.BoardsIndexItem(board);
    this.addSubview('ul.boards', boardView);
  }
})