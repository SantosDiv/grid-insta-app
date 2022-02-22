export default class Item {
  constructor(id, minPositionX, minPositionY, maxPositionX, maxPositionY, uri) {
    this._id = id
    this._minPositionX = minPositionX
    this._minPositionY = minPositionY
    this._maxPositionX = maxPositionX
    this._maxPositionY = maxPositionY
    this._uri = uri
  }

  get id() { return this._id }
  get minPositionX() { return this._minPositionX }
  get minPositionY() { return this._minPositionY }
  get maxPositionX() { return this._maxPositionX }
  get maxPositionY() { return this._maxPositionY }
  get uri() { return this._uri }


  setPositions(positions) {
    this._minPositionX = positions.minX;
    this._minPositionY = positions.minY;
    this._maxPositionX = positions.maxX;
    this._maxPositionY = positions.maxY;
  }

  setNewCoordinatesBy(element) {
    this._maxPositionX = element.maxPositionX
    this._maxPositionY = element.maxPositionY
    this._minPositionX = element.minPositionX
    this._minPositionY = element.minPositionY
  }

  toHash() {
    return {
      id: this._id,
      uri: this._uri,
      minPositionX: this._minPositionX,
      minPositionY: this._minPositionY,
      maxPositionX: this._maxPositionX,
      maxPositionY: this._maxPositionY,
    }
  }
}