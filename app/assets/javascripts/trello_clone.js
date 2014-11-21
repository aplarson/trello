window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    

    var boardCollection = new TrelloClone.Collections.Boards();
    var $rootEl = $('#main');

    var router = new TrelloClone.Routers.Router(boardCollection, $rootEl);
    Backbone.history.start();
  }
};
