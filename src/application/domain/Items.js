export default class Items {
  constructor(items) {
    this._items = items;
    this._itemsSelected = [];
  }

  get items() { return this._items }
  get firstItemSelected() { return this._itemsSelected[0] }
  get secondItemSelected() { return this._itemsSelected[1] }

  getAll() {
    return this._items;
  }

  getIndex(element) {
    return this._items.indexOf(element);
  }

  isEmpty() {
    return this._items.length === 0;
  }

  changePosition(item, secondItem) {
    this._items.splice(item, 1, secondItem);
  }

  setItem(item) {
    this._items.unshift(item);
  }

  setItemSelected(item) {
    this._itemsSelected.push(item);
  }

  resetItemsSelected() {
    this._itemsSelected = [];
  }

  isEligibleForChange() {
    return this._itemsSelected.length === 2;
  }

  removeItem(item) {
    this._items.splice(this.getIndex(item), 1);
  }

  parse() {
    return this._items.map((item) => item.toHash());
  }
}