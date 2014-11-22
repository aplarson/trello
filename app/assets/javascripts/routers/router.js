TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    '': "boardsIndex",
    'boards/:id': "showBoard"
  },

  initialize: function (boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  boardsIndex: function () {
    this.boards.fetch();
    var view = new TrelloClone.Views.BoardsIndex(this.boards);
    this.swapView(view);
  },

  showBoard: function (id) {
    var board = this.boards.getOrFetch(id);
    board.fetch();
    var view = new TrelloClone.Views.BoardsShow(board);
    this.swapView(view);
  },

  swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(this.currentView.render().$el);
  }
})