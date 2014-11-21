TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",

  model: TrelloClone.Models.Board,

  comparator: function (boardA, boardB) {
    if (boardA.get('title') > boardB.get('title')) {
      return -1;
    } else if (boardA.get('title') < boardB.get('title')) {
      return 1;
    } else {
      return 0;
    }
  }
})