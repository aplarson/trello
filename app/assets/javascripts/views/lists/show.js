TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  initialize: function (list) {
    this.$el = $('<li>').addClass('list');
    this.$el.attr('id', list.id);
    this.list = list;
    this.cards = list.cards().sort();
    this.addCards();

    this.listenTo(this.list, 'sync', this.render);
    this.listenTo(this.cards, 'add', this.addCard);
  },

  render: function () {
    var content = this.template({ list: this.list });
    this.$el.html(content);
    this.attachSubviews();

    this.onRender();
    return this;
  },

  events: {
    'sortremove .cards': 'removeCard',
    'sortupdate .cards': 'setCardOrder',
    'sortreceive .cards': 'insertCard',
    'submit .new-card-form': 'createCard'
  },

  addCards: function () {
    this.$('ul.cards').empty();
    this.subviews()['ul.cards'] = [];
    this.cards.each(function (card) {
      this.addCard(card);
    }.bind(this));
  },

  addCard: function (card) {
    var cardView = new TrelloClone.Views.CardsListItem(card);
    this.addSubview('ul.cards', cardView);
  },

  onRender: function () {
    this.$('ul.cards').sortable({
      connectWith: ".cards"
    });
  },

  setCardOrder: function (event, ui) {
    var cardIds = [];
    var listId = $(event.target).attr('id')

    $(event.target).children().each(function (idx, child) {
      cardIds.push($(child).attr('id'));
    })
    
    _(cardIds).each(function (id, idx) {
      var card = this.cards.get(id);
      if (card) {
        card.save({ 'ord': idx });
      }
    }.bind(this))
  },

  insertCard: function (event, ui) {
    var cards = this.list.cards();
    var modelId = $(ui.item[0]).attr('id');
    var model = new TrelloClone.Models.Card({ id: modelId });
    var listId = this.list.id;
    model.save({ 'list_id': listId })
    cards.add(model, {
      silent: true
    });
    this.setCardOrder(event);
    this.cards = cards.sort();
    
    this.addCards();
  },

  removeCard: function (event, ui) {
    var cards = this.list.cards();
    var modelId = $(ui.item[0]).attr('id');
    var model = cards.get(modelId);
    cards.remove(model);

    this.cards = cards.sort();
    this.addCards();
  },

  createCard: function (event) {
    event.preventDefault();

    var params = $(event.target).serializeJSON();
    var card = new TrelloClone.Models.Card(params["card"]);
    var cards = this.cards;
    card.set('ord', cards.length);
    card.set('list_id', this.list.id)
    card.save([], {
      success: function () {
        $(event.target).find('.card-title-input').val('');
        cards.add(card);
      }
    })
  }
})