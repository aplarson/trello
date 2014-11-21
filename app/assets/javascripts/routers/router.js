TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    '': "boardsIndex"
  },

  initialize: function (boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  boardsIndex: function () {
    this.boards.fetch();
    var view = new TrelloClone.Views.BoardsIndex(this.boards)
    this.$rootEl.html(view.render().$el)
  }
})