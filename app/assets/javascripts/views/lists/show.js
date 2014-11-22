TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  initialize: function (list) {
    this.$el = $('<li>').addClass('list');
    this.list = list;
    this.cards = list.cards();
    this.addCards();

    this.listenTo(this.list, 'sync', this.render);
    this.listenTo(this.cards, 'add', this.addCard)
  },

  render: function () {
    var content = this.template({ list: this.list });
    this.$el.html(content);

    this.attachSubviews();

    return this;
  },

  addCards: function () {
    this.cards.each(function (card) {
      this.addCard(card)
    }.bind(this));
  },

  addCard: function (card) {
    var cardView = new TrelloClone.Views.CardsListItem(card);
    this.addSubview('ul.cards', cardView);
  }
})