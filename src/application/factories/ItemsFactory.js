import ItemFactory from "./ItemFactory";
import Items from "../domain/Items";

export default class ItemsFactory {
  buildFromData(data) {
    const itemsDomain = data.map((item) => new ItemFactory().buildFromData(item));

    return new Items(itemsDomain);
  }
}