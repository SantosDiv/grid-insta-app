import AllItems from "../repositories/allItems";

export default class RemoveItem {
  static build() {
    return new RemoveItem(
      new AllItems
    )
  }

  constructor(allItems) {
    this._allItems = allItems;
  }

  async execute(items, item) {
    items.removeItem(item);
    return await this._allItems.save(items);
  }
}