TrelloClone.Models.List = Backbone.Model.extend({

  urlRoot: "api/lists",

  parse: function (response) {
    if (response.cards) {
      var cards = response.cards;
      this.cards().set(cards, { parse: true });
      delete response.cards;
    }

    return response
  },

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], { list: this });
    }

    return this._cards
  }

})