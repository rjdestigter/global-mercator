const tileSize = 256
const initialResolution = 2 * Math.PI * 6378137 / tileSize
const originShift = 2 * Math.PI * 6378137 / 2.0

/**
 * Hash for Map ID
 *
 * @param {Tile} tile [x, y, z]
 * @returns {number} hash
 * @example
 * const id = hash([312, 480, 4])
 * //=5728
 */
function hash (tile) {
  const [x, y, z] = tile
  return (1 << z) * ((1 << z) + x) + y
}
module.exports.hash = hash

/**
 * Converts BBox to Center
 *
 * @param {BBox} bbox - [west, south, east, north] coordinates
 * @return {LngLat} center
 * @example
 * const center = bboxToCenter([90, -45, 85, -50])
 * //= [ 87.5, -47.5 ]
 */
function bboxToCenter (bbox) {
  const [west, south, east, north] = bbox
  let lng = (west - east) / 2 + east
  let lat = (south - north) / 2 + north
  lng = Number(lng.toFixed(6))
  lat = Number(lat.toFixed(6))
  return [lng, lat]
}
module.exports.bboxToCenter = bboxToCenter

/**
 * Converts {@link LngLat} coordinates to {@link Meters} coordinates.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @returns {Meters} Meters coordinates
 * @example
 * const meters = lngLatToMeters([126, 37])
 * //=[ 14026255.8, 4439106.7 ]
 */
function lngLatToMeters (lnglat) {
  const [lng, lat] = validateLngLat(lnglat)
  let x = lng * originShift / 180.0
  let y = Math.log(Math.tan((90 + lat) * Math.PI / 360.0)) / (Math.PI / 180.0)
  y = y * originShift / 180.0
  x = Number(x.toFixed(1))
  y = Number(y.toFixed(1))
  return [x, y]
}
module.exports.lngLatToMeters = lngLatToMeters

/**
 * Converts {@link Meters} coordinates to {@link LngLat} coordinates.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @returns {LngLat} LngLat coordinates
 * @example
 * const lnglat = metersToLngLat([14026255, 4439106])
 * //=[ 126, 37 ]
 */
function metersToLngLat (meters) {
  const [x, y] = meters
  let lng = (x / originShift) * 180.0
  let lat = (y / originShift) * 180.0
  lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2.0)
  lng = Number(lng.toFixed(6))
  lat = Number(lat.toFixed(6))
  return [lng, lat]
}
module.exports.metersToLngLat = metersToLngLat

/**
 * Converts {@link Meters} coordinates to {@link Pixels} coordinates.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @param {number} zoom Zoom level
 * @returns {Pixels} Pixels coordinates
 * @example
 * const pixels = metersToPixels([14026255, 4439106], 13)
 * //=[ 1782579.1, 1280877.3, 13 ]
 */
function metersToPixels (meters, zoom) {
  const [x, y] = meters
  const res = resolution(zoom)
  const px = (x + originShift) / res
  const py = (y + originShift) / res
  return [px, py, zoom]
}
module.exports.metersToPixels = metersToPixels

/**
 * Converts {@link LngLat} coordinates to TMS {@link Tile}.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @param {number} zoom Zoom level
 * @returns {Tile} TMS Tile
 * @example
 * const tile = lngLatToTile([126, 37], 13)
 * //=[ 6963, 5003, 13 ]
 */
function lngLatToTile (lnglat, zoom) {
  const meters = lngLatToMeters(validateLngLat(lnglat))
  const pixels = metersToPixels(meters, zoom)
  return pixelsToTile(pixels)
}
module.exports.lngLatToTile = lngLatToTile

/**
 * Converts {@link LngLat} coordinates to {@link Google} (XYZ) Tile.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @param {number} zoom Zoom level
 * @returns {Google} Google (XYZ) Tile
 * @example
 * const google = lngLatToGoogle([126, 37], 13)
 * //=[ 6963, 3188, 13 ]
 */
function lngLatToGoogle (lnglat, zoom) {
  if (zoom === 0) {
    return [0, 0, 0]
  }
  const tile = lngLatToTile(validateLngLat(lnglat), zoom)
  return tileToGoogle(tile)
}
module.exports.lngLatToGoogle = lngLatToGoogle

/**
 * Converts {@link Meters} coordinates to TMS {@link Tile}.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @param {number} zoom Zoom level
 * @returns {Tile} TMS Tile
 * @example
 * const tile = metersToTile([14026255, 4439106], 13)
 * //=[ 6963, 5003, 13 ]
 */
function metersToTile (meters, zoom) {
  if (zoom === 0) {
    return [0, 0, 0]
  }
  const pixels = metersToPixels(meters, zoom)
  return pixelsToTile(pixels)
}
module.exports.metersToTile = metersToTile

/**
 * Converts {@link Pixels} coordinates to {@link Meters} coordinates.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @returns {Meters} Meters coordinates
 * @example
 * const meters = pixelsToMeters([1782579, 1280877, 13])
 * //=[ 14026252.0, 4439099.5 ]
 */
function pixelsToMeters (pixels) {
  const [px, py, zoom] = validatePixels(pixels)
  const res = resolution(zoom)
  let mx = px * res - originShift
  let my = py * res - originShift
  mx = Number(mx.toFixed(1))
  my = Number(my.toFixed(1))
  return [mx, my]
}
module.exports.pixelsToMeters = pixelsToMeters

/**
 * Converts {@link Pixels} coordinates to TMS {@link Tile}.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @returns {Tile} TMS Tile
 * @example
 * const tile = pixelsToTile([1782579, 1280877, 13])
 * //=[ 6963, 5003, 13 ]
 */
function pixelsToTile (pixels) {
  const [px, py, zoom] = validatePixels(pixels)
  if (zoom === 0) {
    return [0, 0, 0]
  }
  let tx = Math.ceil(px / tileSize) - 1
  let ty = Math.ceil(py / tileSize) - 1
  if (tx < 0) {
    tx = 0
  }
  if (ty < 0) {
    ty = 0
  }
  return [tx, ty, zoom]
}
module.exports.pixelsToTile = pixelsToTile

/**
 * Converts TMS {@link Tile} to {@link bbox} in {@link Meters} coordinates.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {number} x TMS Tile X
 * @param {number} y TMS Tile Y
 * @param {number} zoom Zoom level
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = tileToBBoxMeters([6963, 5003, 13])
 * //=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
 */
function tileToBBoxMeters (tile) {
  const [tx, ty, zoom] = validateTile(tile)
  let min = pixelsToMeters([tx * tileSize, ty * tileSize, zoom])
  let max = pixelsToMeters([(tx + 1) * tileSize, (ty + 1) * tileSize, zoom])
  return [min[0], min[1], max[0], max[1]]
}
module.exports.tileToBBoxMeters = tileToBBoxMeters

/**
 * Converts TMS {@link Tile} to {@link bbox} in {@link LngLat} coordinates.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {number} x TMS Tile X
 * @param {number} y TMS Tile Y
 * @param {number} zoom Zoom level
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = tileToBBox([6963, 5003, 13])
 * //=[ 125.991, 36.985, 126.035, 37.020 ]
 */
function tileToBBox (tile) {
  const [tx, ty, zoom] = validateTile(tile)
  if (zoom === 0) {
    return [-180, -85.05112877980659, 180, 85.05112877980659]
  }
  const [mx1, my1, mx2, my2] = tileToBBoxMeters([tx, ty, zoom])
  const min = metersToLngLat([mx1, my1, zoom])
  const max = metersToLngLat([mx2, my2, zoom])
  return [min[0], min[1], max[0], max[1]]
}
module.exports.tileToBBox = tileToBBox

/**
 * Converts {@link Google} (XYZ) Tile to {@link bbox} in {@link Meters} coordinates.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = googleToBBoxMeters([6963, 3188, 13])
 * //=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
 */
function googleToBBoxMeters (google) {
  const Tile = googleToTile(google)
  return tileToBBoxMeters(Tile)
}
module.exports.googleToBBoxMeters = googleToBBoxMeters

/**
 * Converts {@link Google} (XYZ) Tile to {@link bbox} in {@link LngLat} coordinates.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const bbox = googleToBBox([6963, 3188, 13])
 * //=[ 125.991, 36.985, 126.035, 37.020 ]
 */
function googleToBBox (google) {
  const Tile = googleToTile(google)
  return tileToBBox(Tile)
}
module.exports.googleToBBox = googleToBBox

/**
 * Converts TMS {@link Tile} to {@link Google} (XYZ) Tile.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @returns {Google} Google (XYZ) Tile
 * @example
 * const google = tileToGoogle([6963, 5003, 13])
 * //=[ 6963, 3188, 13 ]
 */
function tileToGoogle (tile) {
  const [tx, ty, zoom] = validateTile(tile)
  if (zoom === 0) {
    return [0, 0, 0]
  }
  const x = tx
  const y = (Math.pow(2, zoom) - 1) - ty
  return [x, y, zoom]
}
module.exports.tileToGoogle = tileToGoogle

/**
 * Converts {@link Google} (XYZ) Tile to TMS {@link Tile}.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {Tile} TMS Tile
 * @example
 * const tile = googleToTile([6963, 3188, 13])
 * //=[ 6963, 5003, 13 ]
 */
function googleToTile (google) {
  const [x, y, zoom] = google
  const tx = x
  const ty = Math.pow(2, zoom) - y - 1
  return [tx, ty, zoom]
}
module.exports.googleToTile = googleToTile

/**
 * Converts {@link Google} (XYZ) Tile to {@link Quadkey}.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {string} Microsoft's Quadkey schema
 * @example
 * const quadkey = googleToQuadkey([6963, 3188, 13])
 * //='1321102330211'
 */
function googleToQuadkey (google) {
  const Tile = googleToTile(google)
  return tileToQuadkey(Tile)
}
module.exports.googleToQuadkey = googleToQuadkey

/**
 * Converts TMS {@link Tile} to {@link QuadKey}.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @returns {string} Microsoft's Quadkey schema
 * @example
 * const quadkey = tileToQuadkey([6963, 5003, 13])
 * //='1321102330211'
 */
function tileToQuadkey (tile) {
  let [tx, ty, zoom] = validateTile(tile)
  // Zoom 0 does not exist for Quadkey
  if (zoom === 0) {
    return ''
  }
  let quadkey = ''
  ty = (Math.pow(2, zoom) - 1) - ty
  range(zoom, 0, -1).map(i => {
    let digit = 0
    let mask = 1 << (i - 1)
    if ((tx & mask) !== 0) {
      digit += 1
    }
    if ((ty & mask) !== 0) {
      digit += 2
    }
    quadkey = quadkey.concat(digit)
  })
  return quadkey
}
module.exports.tileToQuadkey = tileToQuadkey

/**
 * Converts {@link Quadkey} to TMS {@link Tile}.
 *
 * @param {string} quadkey Microsoft's Quadkey schema
 * @returns {Tile} TMS Tile
 * @example
 * const tile = quadkeyToTile('1321102330211')
 * //=[ 6963, 5003, 13 ]
 */
function quadkeyToTile (quadkey) {
  const Google = quadkeyToGoogle(quadkey)
  return googleToTile(Google)
}
module.exports.quadkeyToTile = quadkeyToTile

/**
 * Converts {@link Quadkey} to {@link Google} (XYZ) Tile.
 *
 * @param {string} quadkey Microsoft's Quadkey schema
 * @returns {Google} Google (XYZ) Tile
 * @example
 * const google = quadkeyToGoogle('1321102330211')
 * //=[ 6963, 3188, 13 ]
 */
function quadkeyToGoogle (quadkey) {
  let x = 0
  let y = 0
  const zoom = quadkey.length
  range(zoom, 0, -1).map(i => {
    let mask = 1 << (i - 1)
    switch (parseInt(quadkey[zoom - i], 0)) {
      case 0:
        break
      case 1:
        x += mask
        break
      case 2:
        y += mask
        break
      case 3:
        x += mask
        y += mask
        break
      default:
        throw new Error('Invalid Quadkey digit sequence')
    }
  })
  return [x, y, zoom]
}
module.exports.quadkeyToGoogle = quadkeyToGoogle

/**
 * Converts {@link BBox} from {@link LngLat} coordinates to {@link Meters} coordinates
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * const meters = bboxToMeters([ 125, 35, 127, 37 ])
 * //=[ 13914936.3, 4163881.1, 14137575.3, 4439106.7 ]
 */
function bboxToMeters (bbox) {
  const min = lngLatToMeters([bbox[0], bbox[1]])
  const max = lngLatToMeters([bbox[2], bbox[3]])
  return [min[0], min[1], max[0], max[1]]
}
module.exports.bboxToMeters = bboxToMeters

/**
 * Creates an Iterator of Tiles from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @returns {Iterator<Tile>} Iterable Tiles from BBox
 * @example
 * const iterable = grid([-180.0, -90.0, 180, 90], 3, 8)
 * const {value, done} = iterable.next()
 * //=value
 * //=done
 */
function * grid (bbox, minZoom, maxZoom) {
  for (const [columns, rows, zoom] of gridLevels(bbox, minZoom, maxZoom)) {
    for (const row of rows) {
      for (const column of columns) {
        yield [column, row, zoom]
      }
    }
  }
}
module.exports.grid = grid

/**
 * Creates a bulk Iterator of Tiles from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @param {number} size Maximum size for bulk Tiles
 * @returns {Iterator<Tile[]>} Bulk iterable Tiles from BBox
 * @example
 * const grid = gridBulk([-180.0, -90.0, 180, 90], 3, 8, 5000)
 * const {value, done} = grid.next()
 * //=value
 * //=done
 */
function* gridBulk (bbox, minZoom, maxZoom, size) {
  const iterable = grid(bbox, minZoom, maxZoom)
  let container = []
  let i = 0
  while (true) {
    i++
    const { value, done } = iterable.next()
    if (value) {
      container.push(value)
    }
    if (i % size === 0) {
      yield container
      container = []
    }
    if (done) {
      yield container
      break
    }
  }
}
module.exports.gridBulk = gridBulk

/**
 * Creates a grid level pattern of arrays
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @returns {GridLevel[]} Grid Level
 * @example
 * const levels = gridLevels([-180.0, -90.0, 180, 90], 3, 8)
 * //=levels
 */
function gridLevels (bbox, minZoom, maxZoom) {
  const levels = []
  for (let zoom of range(minZoom, maxZoom + 1)) {
    let [x1, y1, x2, y2] = bbox
    let t1 = lngLatToTile([x1, y1], zoom)
    let t2 = lngLatToTile([x2, y2], zoom)
    let minty = Math.min(t1[1], t2[1])
    let maxty = Math.max(t1[1], t2[1])
    let mintx = Math.min(t1[0], t2[0])
    let maxtx = Math.max(t1[0], t2[0])
    const rows = range(minty, maxty + 1)
    const columns = range(mintx, maxtx + 1)
    levels.push([columns, rows, zoom])
  }
  return levels
}
module.exports.gridLevels = gridLevels

/**
 * Counts the total amount of tiles from a given BBox
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} minZoom Minimum Zoom
 * @param {number} maxZoom Maximum Zoom
 * @returns {number} Total tiles from BBox
 * @example
 * const count = gridCount([-180.0, -90.0, 180, 90], 3, 8)
 * //=563136
 */
function gridCount (bbox, minZoom, maxZoom) {
  let count = 0
  for (const [columns, rows] of gridLevels(bbox, minZoom, maxZoom)) {
    count += rows.length * columns.length
  }
  return count
}
module.exports.gridCount = gridCount

/**
 * Validates TMS {@link Tile}.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @throws {Error} Will throw an error if TMS Tile is not valid.
 * @returns {Tile} TMS Tile
 * @example
 * validateTile([60, 80, 12])
 * //=[60, 80, 12]
 * validateTile([60, -43, 5])
 * //= Error: Tile <y> must not be less than 0
 * validateTile([25, 60, 3])
 * //= Error: Illegal parameters for tile
 */
function validateTile (tile) {
  const [tx, ty, zoom] = tile
  validateZoom(zoom)
  if (tx < 0) {
    const message = '<x> must not be less than 0'
    throw new Error(message)
  } else if (ty < 0) {
    const message = '<y> must not be less than 0'
    throw new Error(message)
  }
  const maxCount = Math.pow(2, zoom)
  if (tx >= maxCount || ty >= maxCount) {
    throw new Error('Illegal parameters for tile')
  }
  return tile
}
module.exports.validateTile = validateTile

/**
 * Validates {@link Zoom} level.
 *
 * @param {number} zoom Zoom level
 * @throws {Error} Will throw an error if zoom is not valid.
 * @returns {number} zoom Zoom level
 * @example
 * mercator.validateZoom(12)
 * //=12
 * mercator.validateZoom(-4)
 * //= Error: <zoom> cannot be less than 0
 * validateZoom(32)
 * //= Error: <zoom> cannot be greater than 30
 */
function validateZoom (zoom) {
  if (zoom < 0) {
    const message = '<zoom> cannot be less than 0'
    throw new Error(message)
  } else if (zoom > 30) {
    const message = '<zoom> cannot be greater than 30'
    throw new Error(message)
  }
  return zoom
}
module.exports.validateZoom = validateZoom

/**
 * Validates {@link LngLat} coordinates.
 *
 * @param {LngLat} lnglat Longitude (Meridians) & Latitude (Parallels) in decimal degrees
 * @throws {Error} Will throw an error if LngLat is not valid.
 * @returns {LngLat} LngLat coordinates
 * @example
 * validateLngLat([-115, 44])
 * //= [ -115, 44 ]
 * validateLngLat([-225, 44])
 * //= Error: LngLat [lng] must be within -180 to 180 degrees
 */
function validateLngLat (lnglat) {
  const [lng, lat] = lnglat
  if (lat < -90 || lat > 90) {
    const message = 'LngLat [lat] must be within -90 to 90 degrees'
    throw new Error(message)
  } else if (lng < -180 || lng > 180) {
    const message = 'LngLat [lng] must be within -180 to 180 degrees'
    throw new Error(message)
  }
  return [lng, lat]
}
module.exports.validateLngLat = validateLngLat

/**
 * Validates {@link Pixels} coordinates.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @param {number} x Pixels X
 * @param {number} y Pixels Y
 * @param {number} [zoom] Zoom level
 * @throws {Error} Will throw an error if Pixels is not valid.
 * @returns {Pixels} Pixels coordinates
 * @example
 * validatePixels([-115, 44])
 */
function validatePixels (pixels) {
  // TODO
  return pixels
}
module.exports.validatePixels = validatePixels

/**
 * Retrieve resolution based on zoom level
 *
 * @private
 * @param {number} zoom zoom level
 * @returns {number} resolution
 * @example
 * const res = resolution(13)
 * //=19.109257071294063
 */
function resolution (zoom) {
  return initialResolution / Math.pow(2, zoom)
}
module.exports.resolution = resolution

/**
 * Generate an integer Array containing an arithmetic progression.
 *
 * @private
 * @param {number} [start=0] Start
 * @param {number} stop Stop
 * @param {number} [step=1] Step
 * @returns {number[]} range
 * @example
 * range(3)
 * //=[ 0, 1, 2 ]
 * range(3, 6)
 * //=[ 3, 4, 5 ]
 * range(6, 3, -1)
 * //=[ 6, 5, 4 ]
 */
function range (start, stop, step) {
  if (stop == null) {
    stop = start || 0
    start = 0
  }
  if (!step) {
    step = stop < start ? -1 : 1
  }
  const length = Math.max(Math.ceil((stop - start) / step), 0)
  const range = Array(length)
  for (let idx = 0; idx < length; idx++, start += step) {
    range[idx] = start
  }
  return range
}
module.exports.range = range