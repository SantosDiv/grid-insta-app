import Item from "../domain/Item";

export default class ItemFactory {
  buildFromData(item) {
    return new Item(
      item.id,
      item.minPositionX,
      item.minPositionY,
      item.maxPositionX,
      item.maxPositionY,
      item.uri
    );
  }
}