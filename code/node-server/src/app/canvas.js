const hex6CharToInt32 = require('./canvasHelpers/hex6CharToInt32.js')

class Canvas {

  constructor(rowCount, colCount) {
    this.height = rowCount
    this.width = colCount
    this.buffer = this._generateBuffer(this.height, this.width)
    this.int32View = new Uint32Array(this.buffer) // for easy writing
    this.int32View.fill(hex6CharToInt32('222222'))
  }
  
  setTile({x, y, hexStr}) {
    const idx = this._coordToByteIdx(x, y)
    const int32 = hex6CharToInt32(hexStr)
    this.int32View[idx] = int32
  }

  getTile({x, y}) {
    const idx = this._coordToByteIdx(x, y)
    return this.int32View[idx]
  }
  
  _generateBuffer(height, width) {
    const bytes = height * width * 4 // argb
    return new ArrayBuffer(bytes)
  }

  _coordToByteIdx(x, y) {
    return (this.width * x + y)
  }

  toJSON() {
    return this.pixels
  }

}

module.exports = Canvas
