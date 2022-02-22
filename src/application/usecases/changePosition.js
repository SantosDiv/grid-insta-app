import ItemsFactory from "../factories/ItemsFactory";
import AllItems from "../repositories/allItems";

export default class ChangePosition {
  static build() {
    return new ChangePosition(new ItemsFactory(), new AllItems())
  }

  constructor(itemsFactory, allItems) {
    this._itemsFactory = itemsFactory;
    this._allItems = allItems;
  }

  async execute(items, item) {
    items.setItemSelected(item);
    if (items.isEligibleForChange()) {
      const indexPositionPrevItem = items.getIndex(items.firstItemSelected);
      const indexPositionNextItem = items.getIndex(items.secondItemSelected);

      items.changePosition(indexPositionNextItem, items.firstItemSelected);
      items.changePosition(indexPositionPrevItem, items.secondItemSelected);

      items.resetItemsSelected()

      return await this._allItems.save(items);
    }
  }

}