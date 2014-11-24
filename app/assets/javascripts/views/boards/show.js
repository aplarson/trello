TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function (board) {
    this.$el.addClass('container-fluid').addClass('board-show');

    this.board = board;
    this.lists = board.lists();
    this.addLists();

    this.listenTo(this.board, 'sync', this.render);
    this.listenTo(this.lists, "add", this.addList);
  },

  render: function () {
    var content = this.template({ board: this.board });
    this.$el.html(content);

    this.attachSubviews();
    this.onRender();
    this.$('ul.lists').sortable();

    return this;
  },

  addLists: function () {
    this.lists.each(function (list) {
      this.addList(list)
    }.bind(this));
  },

  addList: function (list) {
    var listView = new TrelloClone.Views.ListsShow(list);
    this.addSubview('ul.lists', listView);
  },

  onRender: function () {
    _(this.subviews()).each(function (subviews, selector) {
      _(subviews).each(function (subview) {
        subview.onRender && subview.onRender();
      });  
    });
  }
})