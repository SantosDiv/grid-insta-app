import ItemFactory from "../factories/ItemFactory";
import AllItems from "../repositories/allItems";

export default class SetNewItem {
  static build() {
    return new SetNewItem(
      new AllItems(),
      new ItemFactory()
    )
  }

  constructor(allItems, itemFactory) {
    this._allitems = allItems;
    this._itemFactory = itemFactory;
  }

  async execute(items, item) {
    const itemDomain = this._itemFactory.buildFromData(item);
    items.setItem(itemDomain);
    await this._allitems.save(items);
    return items;
  }
}