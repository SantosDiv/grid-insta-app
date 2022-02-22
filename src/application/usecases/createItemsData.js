import ItemsFactory from "../factories/ItemsFactory";
import AllItems from "../repositories/allItems";

export default class CreateItemsData {
  static build() {
    return new CreateItemsData(
      new ItemsFactory,
      new AllItems
    );
  }

  constructor(itemsFactory, allItems){
    this._itemsFactory = itemsFactory;
    this._allItems = allItems;
  }

  async execute() {
    const items = await this._allItems.getAll();
    if (items.isEmpty()) {
      return await this._allItems.save(items);
    }
    return items;
    // await this._allItems.deleteAll();
  }
}