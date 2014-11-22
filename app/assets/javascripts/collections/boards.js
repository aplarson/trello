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
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    if (!model) {
      model = new this.model({id: id});
      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    }
    return model;
  }
})