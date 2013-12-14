// Generated by CoffeeScript 1.6.3
(function() {
  var Inventory, Item, ItemStack;

  Inventory = (function() {
    function Inventory(opts) {
      var size, _ref;
      opts = opts != null ? opts : {};
      size = (_ref = opts.size) != null ? _ref : 10;
      this.array = new Array(size);
    }

    return Inventory;

  })();

  Inventory.prototype.give = function(itemStack) {
    var excess, i, _i, _len, _ref, _results;
    _ref = this.array;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if ((this.array[i] != null) && this.array[i].canStackWith(itemStack)) {
        _results.push(excess = this.array[i].mergeWith(itemStack));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  ItemStack = (function() {
    function ItemStack(item, count, tags) {
      this.item = item;
      this.count = count;
      this.tags = tags;
    }

    ItemStack.prototype.canStackWith = function(itemStack) {
      if (itemStack.item !== this.item) {
        return false;
      }
      if ((itemStack.tags != null) || this.tags) {
        return false;
      }
      return true;
    };

    ItemStack.prototype.mergeWith = function(itemStack) {
      var n, stackSize;
      n = this.count + itemStack.count;
      stackSize = this.item.maxStackSize();
      this.count = n % stackSize;
      return n - this.count;
    };

    return ItemStack;

  })();

  Item = (function() {
    function Item(opts) {
      var k, v;
      for (k in opts) {
        v = opts[k];
        this[k] = v;
      }
    }

    Item.prototype.maxStackSize = function() {
      return 64;
    };

    return Item;

  })();

  module.exports.Inventory = Inventory;

  module.exports.ItemStack = ItemStack;

  module.exports.Item = Item;

}).call(this);
