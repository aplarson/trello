TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",

  model: TrelloClone.Models.Board,

  comparator: 'title',

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