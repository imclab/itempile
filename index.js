// Generated by CoffeeScript 1.6.3
(function() {
  var ItemPile, clone, deepEqual;

  deepEqual = require('deep-equal');

  clone = require('clone');

  module.exports = ItemPile = (function() {
    function ItemPile(item, count, tags) {
      this.item = typeof item === 'string' ? ItemPile.itemFromString(item) : item;
      this.count = count != null ? count : 1;
      this.tags = tags != null ? tags : {};
    }

    ItemPile.prototype.clone = function() {
      return new ItemPile(this.item, this.count, clone(this.tags, false));
    };

    ItemPile.maxPileSize = 64;

    ItemPile.itemFromString = function(s) {
      if (s instanceof ItemPile) {
        return s;
      }
      if (!s) {
        return '';
      } else {
        return s;
      }
    };

    ItemPile.itemToString = function(item) {
      return '' + item;
    };

    ItemPile.prototype.hasTags = function() {
      return Object.keys(this.tags).length !== 0;
    };

    ItemPile.prototype.matchesType = function(itemPile) {
      return this.item === itemPile.item;
    };

    ItemPile.prototype.matchesTypeAndCount = function(itemPile) {
      return this.item === itemPile.item && this.count === itemPile.count;
    };

    ItemPile.prototype.matchesTypeAndTags = function(itemPile) {
      return this.item === itemPile.item && deepEqual(this.tags, itemPile.tags, {
        strict: true
      });
    };

    ItemPile.prototype.matchesAll = function(itemPile) {
      return this.matchesTypeAndCount(itemPile) && deepEqual(this.tags, itemPile.tags, {
        strict: true
      });
    };

    ItemPile.prototype.canPileWith = function(itemPile) {
      if (itemPile.item !== this.item) {
        return false;
      }
      if (itemPile.count === 0 || this.count === 0) {
        return true;
      }
      if (itemPile.hasTags() || this.hasTags()) {
        return false;
      }
      return true;
    };

    ItemPile.prototype.mergePile = function(itemPile) {
      if (!this.canPileWith(itemPile)) {
        return false;
      }
      return itemPile.count = this.increase(itemPile.count);
    };

    ItemPile.prototype.increase = function(n) {
      var excessCount, newCount, _ref;
      _ref = this.tryAdding(n), newCount = _ref[0], excessCount = _ref[1];
      this.count = newCount;
      return excessCount;
    };

    ItemPile.prototype.decrease = function(n) {
      var remainingCount, removedCount, _ref;
      _ref = this.trySubtracting(n), removedCount = _ref[0], remainingCount = _ref[1];
      this.count = remainingCount;
      return removedCount;
    };

    ItemPile.prototype.tryAdding = function(n) {
      var sum;
      sum = this.count + n;
      if (sum > ItemPile.maxPileSize && this.count !== Infinity) {
        return [ItemPile.maxPileSize, sum - ItemPile.maxPileSize];
      } else {
        return [sum, 0];
      }
    };

    ItemPile.prototype.trySubtracting = function(n) {
      var difference;
      difference = this.count - n;
      if (difference < 0) {
        return [this.count, n - this.count];
      } else {
        return [n, this.count - n];
      }
    };

    ItemPile.prototype.splitPile = function(n) {
      if (n < 0) {
        n = this.count + n;
      } else if (n < 1) {
        n = Math.ceil(this.count * n);
      }
      if (n > this.count) {
        return false;
      }
      if (n !== Infinity) {
        this.count -= n;
      }
      return new ItemPile(this.item, n, clone(this.tags, false));
    };

    ItemPile.prototype.toString = function() {
      if (this.hasTags()) {
        return "" + this.count + ":" + this.item + " " + (JSON.stringify(this.tags));
      } else {
        return "" + this.count + ":" + this.item;
      }
    };

    ItemPile.fromString = function(s) {
      var a, count, countStr, item, itemStr, tags, tagsStr, _;
      a = s.match(/^([^:]+):([^ ]+) ?(.*)/);
      if (!a) {
        return void 0;
      }
      _ = a[0], countStr = a[1], itemStr = a[2], tagsStr = a[3];
      count = parseInt(countStr, 10);
      item = ItemPile.itemFromString(itemStr);
      if (tagsStr && tagsStr.length) {
        tags = JSON.parse(tagsStr);
      } else {
        tags = {};
      }
      return new ItemPile(item, count, tags);
    };

    return ItemPile;

  })();

}).call(this);
