TrelloClone.Views.CardsListItem = Backbone.View.extend({
  template: JST["cards/list_item"],

  initialize: function (card) {
    this.$el = $('<li>');
    this.$el.data('id', card.id);
    this.card = card;
    this.listenTo(this.card, 'sync', this.render)
  },

  render: function () {
    var content = this.template({ card: this.card });
    this.$el.html(content);
    return this;
  }
})