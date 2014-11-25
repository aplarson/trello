TrelloClone.Views.BoardForm = Backbone.View.extend({
  template: JST["boards/form"],

  initialize: function (boards) {
    this.boards = boards;
  },

  events: {
    'submit #board-form': 'createBoard'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createBoard: function (event) {
    event.preventDefault();

    var params = $(event.target).serializeJSON();
    var board = new TrelloClone.Models.Board();
    board.save(params["board"], {
      success: function () {
        this.boards.add(board);
      }.bind(this)
    })
  }
})