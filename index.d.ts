export declare type X = number;
export declare type Y = number;
export declare type Z = number;
export declare type Lng = number;
export declare type Lat = number;
export declare type LngLat = [Lng, Lat];
export declare type MX = number;
export declare type MY = number;
export declare type Meters = [MX, MY];
export declare type PX = number;
export declare type PY = number;
export declare type Pixels = [PX, PY, Z];
export declare type BBox = [number, number, number, number];
export declare type Google = [X, Y, Z];
export declare type Tile = [X, Y, Z];
export declare type Quadkey = string;
export declare function initialResolution(tileSize?: number): number;
/**
 * Hash tile for unique id key
 *
 * @param {Tile} tile [x, y, z]
 * @returns {number} hash
 * @example
 * var id = globalMercator.hash([312, 480, 4])
 * //=5728
 */
export declare function hash(tile: Tile): number;
/**
 * Get the tile for a point at a specified zoom level
 * https://github.com/mapbox/tilebelt
 *
 * @param {[number, number]} lnglat [Longitude, Latitude]
 * @param {number} zoom Zoom level
 * @param {boolean} [validate=true] validates LatLng coordinates
 * @returns {Google} Google (XYZ) Tile
 * @example
 * var tile = globalMercator.pointToTile([1, 1], 12)
 * //= [ 2059, 2036, 12 ]
 */
export declare function pointToTile(lnglat: LngLat, zoom: Z, validate?: boolean): Tile;
/**
 * Get the precise fractional tile location for a point at a zoom level
 * https://github.com/mapbox/tilebelt
 *
 * @name pointToTileFraction
 * @param {[number, number]} lnglat [Longitude, Latitude]
 * @param {number} zoom Zoom level
 * @param {boolean} [validate=true] validates LatLng coordinates
 * @returns {Google} Google (XYZ) Tile
 * @example
 * var tile = globalMercator.pointToTileFraction([1, 1], 12)
 * //= [ 2059.3777777777777, 2036.6216445333432, 12 ]
 */
export declare function pointToTileFraction(lnglat: LngLat, zoom: Z, validate?: boolean): Tile;
/**
 * Converts BBox to Center
 *
 * @param {BBox} bbox - [west, south, east, north] coordinates
 * @return {LngLat} center
 * @example
 * var center = globalMercator.bboxToCenter([90, -45, 85, -50])
 * //= [ 87.5, -47.5 ]
 */
export declare function bboxToCenter(bbox: BBox): LngLat;
/**
 * Converts LngLat coordinates to Meters coordinates.
 *
 * @param {[number, number]} lnglat [Longitude, Latitude]
 * @param {boolean} [validate=true] validates LatLng coordinates
 * @returns {Meters} Meters coordinates
 * @example
 * var meters = globalMercator.lngLatToMeters([126, 37])
 * //=[ 14026255.8, 4439106.7 ]
 */
export declare function lngLatToMeters(lnglat: LngLat, validate?: boolean): Meters;
/**
 * Converts Meters coordinates to LngLat coordinates.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @returns {LngLat} LngLat coordinates
 * @example
 * var lnglat = globalMercator.metersToLngLat([14026255, 4439106])
 * //=[ 126, 37 ]
 */
export declare function metersToLngLat(meters: Meters): LngLat;
/**
 * Converts Meters coordinates to Pixels coordinates.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @param {number} zoom Zoom level
 * @param {number} [tileSize=256] Tile size
 * @returns {Pixels} Pixels coordinates
 * @example
 * var pixels = globalMercator.metersToPixels([14026255, 4439106], 13)
 * //=[ 1782579.1, 1280877.3, 13 ]
 */
export declare function metersToPixels(meters: Meters, zoom: Z, tileSize?: number): Pixels;
/**
 * Converts LngLat coordinates to TMS Tile.
 *
 * @param {[number, number]} lnglat [Longitude, Latitude]
 * @param {number} zoom Zoom level
 * @param {boolean} [validate=true] validates LatLng coordinates
 * @returns {Tile} TMS Tile
 * @example
 * var tile = globalMercator.lngLatToTile([126, 37], 13)
 * //=[ 6963, 5003, 13 ]
 */
export declare function lngLatToTile(lnglat: LngLat, zoom: Z, tileSize?: number, validate?: boolean): Tile;
/**
 * Converts LngLat coordinates to Google (XYZ) Tile.
 *
 * @param {[number, number]} lnglat [Longitude, Latitude]
 * @param {number} zoom Zoom level
 * @param {boolean} [validate=true] validates LatLng coordinates
 * @returns {Google} Google (XYZ) Tile
 * @example
 * var google = globalMercator.lngLatToGoogle([126, 37], 13)
 * //=[ 6963, 3188, 13 ]
 */
export declare function lngLatToGoogle(lnglat: LngLat, zoom: Z, tileSize?: number, validate?: boolean): number[];
/**
 * Converts Meters coordinates to TMS Tile.
 *
 * @param {Meters} meters Meters in Mercator [x, y]
 * @param {number} zoom Zoom level
 * @returns {Tile} TMS Tile
 * @example
 * var tile = globalMercator.metersToTile([14026255, 4439106], 13)
 * //=[ 6963, 5003, 13 ]
 */
export declare function metersToTile(meters: Meters, zoom: Z, tileSize?: number): Tile;
/**
 * Converts Pixels coordinates to Meters coordinates.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @param {number} [tileSize=256] Tile size
 * @returns {Meters} Meters coordinates
 * @example
 * var meters = globalMercator.pixelsToMeters([1782579, 1280877, 13])
 * //=[ 14026252.0, 4439099.5 ]
 */
export declare function pixelsToMeters(pixels: Pixels, tileSize?: number): Meters;
/**
 * Converts Pixels coordinates to TMS Tile.
 *
 * @param {Pixels} pixels Pixels [x, y, zoom]
 * @param {number} [tileSize=256] Tile size
 * @param {boolean} [validate=true] validates Pixels coordinates
 * @returns {Tile} TMS Tile
 * @example
 * var tile = globalMercator.pixelsToTile([1782579, 1280877, 13])
 * //=[ 6963, 5003, 13 ]
 */
export declare function pixelsToTile(pixels: Pixels, tileSize?: number, validate?: boolean): Tile;
/**
 * Converts TMS Tile to bbox in Meters coordinates.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {number} x TMS Tile X
 * @param {number} y TMS Tile Y
 * @param {number} zoom Zoom level
 * @param {number} [tileSize=256] Tile size
 * @param {boolean} [validate=true] validates Tile
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var bbox = globalMercator.tileToBBoxMeters([6963, 5003, 13])
 * //=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
 */
export declare function tileToBBoxMeters(tile: Tile, tileSize?: number, validate?: boolean): BBox;
/**
 * Converts TMS Tile to bbox in LngLat coordinates.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {number} x TMS Tile X
 * @param {number} y TMS Tile Y
 * @param {number} zoom Zoom level
 * @param {boolean} [validate=true] validates Tile
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var bbox = globalMercator.tileToBBox([6963, 5003, 13])
 * //=[ 125.991, 36.985, 126.035, 37.020 ]
 */
export declare function tileToBBox(tile: Tile, tileSize?: number, validate?: boolean): BBox;
/**
 * Converts Google (XYZ) Tile to bbox in Meters coordinates.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var bbox = globalMercator.googleToBBoxMeters([6963, 3188, 13])
 * //=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
 */
export declare function googleToBBoxMeters(google: Google, tileSize?: number, validate?: boolean): [number, number, number, number];
/**
 * Converts Google (XYZ) Tile to bbox in LngLat coordinates.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var bbox = globalMercator.googleToBBox([6963, 3188, 13])
 * //=[ 125.991, 36.985, 126.035, 37.020 ]
 */
export declare function googleToBBox(google: Google, tileSize?: number, validate?: boolean): BBox;
/**
 * Converts TMS Tile to Google (XYZ) Tile.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {boolean} [validate=true] validates Tile
 * @returns {Google} Google (XYZ) Tile
 * @example
 * var google = globalMercator.tileToGoogle([6963, 5003, 13])
 * //=[ 6963, 3188, 13 ]
 */
export declare function tileToGoogle(tile: Tile, validate?: boolean): number[];
/**
 * Converts Google (XYZ) Tile to TMS Tile.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {Tile} TMS Tile
 * @example
 * var tile = globalMercator.googleToTile([6963, 3188, 13])
 * //=[ 6963, 5003, 13 ]
 */
export declare function googleToTile(google: Google): Tile;
/**
 * Converts Google (XYZ) Tile to Quadkey.
 *
 * @param {Google} google Google [x, y, zoom]
 * @returns {string} Microsoft's Quadkey schema
 * @example
 * var quadkey = globalMercator.googleToQuadkey([6963, 3188, 13])
 * //='1321102330211'
 */
export declare function googleToQuadkey(google: Google): Quadkey;
/**
 * Converts TMS Tile to QuadKey.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {boolean} [validate=true] validates Tile
 * @returns {string} Microsoft's Quadkey schema
 * @example
 * var quadkey = globalMercator.tileToQuadkey([6963, 5003, 13])
 * //='1321102330211'
 */
export declare function tileToQuadkey(tile: Tile, validate?: boolean): Quadkey;
/**
 * Converts Quadkey to TMS Tile.
 *
 * @param {string} quadkey Microsoft's Quadkey schema
 * @returns {Tile} TMS Tile
 * @example
 * var tile = globalMercator.quadkeyToTile('1321102330211')
 * //=[ 6963, 5003, 13 ]
 */
export declare function quadkeyToTile(quadkey: Quadkey): [number, number, number];
/**
 * Converts Quadkey to Google (XYZ) Tile.
 *
 * @param {string} quadkey Microsoft's Quadkey schema
 * @returns {Google} Google (XYZ) Tile
 * @example
 * var google = globalMercator.quadkeyToGoogle('1321102330211')
 * //=[ 6963, 3188, 13 ]
 */
export declare function quadkeyToGoogle(quadkey: Quadkey): Google;
/**
 * Converts BBox from LngLat coordinates to Meters coordinates
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var meters = globalMercator.bboxToMeters([ 125, 35, 127, 37 ])
 * //=[ 13914936.3, 4163881.1, 14137575.3, 4439106.7 ]
 */
export declare function bboxToMeters(bbox: BBox, validate?: boolean): BBox;
/**
 * Validates TMS Tile.
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @param {boolean} [validate=true] validates Tile
 * @throws {Error} Will throw an error if TMS Tile is not valid.
 * @returns {Tile} TMS Tile
 * @example
 * globalMercator.validateTile([60, 80, 12])
 * //=[60, 80, 12]
 * globalMercator.validateTile([60, -43, 5])
 * //= Error: Tile <y> must not be less than 0
 * globalMercator.validateTile([25, 60, 3])
 * //= Error: Illegal parameters for tile
 */
export declare function validateTile(tile: Tile, validate?: boolean): Tile;
/**
 * Wrap Tile -- Handles tiles which crosses the 180th meridian or 90th parallel
 *
 * @param {[number, number, number]} tile Tile
 * @param {number} zoom Zoom Level
 * @returns {[number, number, number]} Wrapped Tile
 * @example
 * globalMercator.wrapTile([0, 3, 2])
 * //= [0, 3, 2] -- Valid Tile X
 * globalMercator.wrapTile([4, 2, 2])
 * //= [0, 2, 2] -- Tile 4 does not exist, wrap around to TileX=0
 */
export declare function wrapTile(tile: Tile): Tile;
/**
 * Validates Zoom level
 *
 * @param {number} zoom Zoom level
 * @param {boolean} [validate=true] validates Zoom level
 * @throws {Error} Will throw an error if zoom is not valid.
 * @returns {number} zoom Zoom level
 * @example
 * globalMercator.validateZoom(12)
 * //=12
 * globalMercator.validateZoom(-4)
 * //= Error: <zoom> cannot be less than 0
 * globalMercator.validateZoom(32)
 * //= Error: <zoom> cannot be greater than 30
 */
export declare function validateZoom(zoom: Z, validate?: boolean): number;
/**
 * Validates LngLat coordinates
 *
 * @param {[number, number]} lnglat [Longitude, Latitude]
 * @param {boolean} [validate=true] validates LatLng coordinates
 * @throws {Error} Will throw an error if LngLat is not valid.
 * @returns {LngLat} LngLat coordinates
 * @example
 * globalMercator.validateLngLat([-115, 44])
 * //= [ -115, 44 ]
 * globalMercator.validateLngLat([-225, 44])
 * //= Error: LngLat [lng] must be within -180 to 180 degrees
 */
export declare function validateLngLat(lnglat: LngLat, validate?: boolean): LngLat;
/**
 * Retrieve resolution based on zoom level
 *
 * @private
 * @param {number} zoom zoom level
 * @param {number} [tileSize=256] Tile size
 * @returns {number} resolution
 * @example
 * var res = globalMercator.resolution(13)
 * //=19.109257071294063
 */
export declare function resolution(zoom: Z, tileSize: number): number;
/**
 * Generate an integer Array containing an arithmetic progression.
 *
 * @private
 * @param {number} [start=0] Start
 * @param {number} stop Stop
 * @param {number} [step=1] Step
 * @returns {number[]} range
 * @example
 * globalMercator.range(3)
 * //=[ 0, 1, 2 ]
 * globalMercator.range(3, 6)
 * //=[ 3, 4, 5 ]
 * globalMercator.range(6, 3, -1)
 * //=[ 6, 5, 4 ]
 */
export declare function range(start: number, stop: number | null, step: number): number[];
/**
 * Maximum extent of BBox
 *
 * @param {BBox|BBox[]} array BBox [west, south, east, north]
 * @returns {BBox} Maximum BBox
 * @example
 * var bbox = globalMercator.maxBBox([[-20, -30, 20, 30], [-110, -30, 120, 80]])
 * //=[-110, -30, 120, 80]
 */
export declare function maxBBox(array: number[][]): number[] | number[][] | undefined;
/**
 * Valid TMS Tile
 *
 * @param {Tile} tile Tile [x, y, zoom]
 * @returns {boolean} valid tile true/false
 * @example
 * globalMercator.validTile([60, 80, 12])
 * //= true
 * globalMercator.validTile([60, -43, 5])
 * //= false
 * globalMercator.validTile([25, 60, 3])
 * //= false
 */
export declare function validTile(tile: Tile): boolean;
/**
 * Modifies a Latitude to fit within +/-90 degrees.
 *
 * @param {number} lat latitude to modify
 * @returns {number} modified latitude
 * @example
 * globalMercator.latitude(100)
 * //= -80
 */
export declare function latitude(lat: Lat): number;
/**
 * Modifies a Longitude to fit within +/-180 degrees.
 *
 * @param {number} lng longitude to modify
 * @returns {number} modified longitude
 * @example
 * globalMercator.longitude(190)
 * //= -170
 */
export declare function longitude(lng: Lng): number;
/**
 * Get the smallest tile to cover a bbox
 *
 * @param {Array<number>} bbox BBox
 * @returns {Array<number>} tile Tile
 * @example
 * var tile = bboxToTile([-178, 84, -177, 85])
 * //=tile
 */
export declare function bboxToTile(bboxCoords: BBox, validate?: boolean): Tile;
