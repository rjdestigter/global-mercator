# [Global Mercator](https://www.npmjs.com/package/global-mercator)

[![Build Status](https://travis-ci.org/DenisCarriere/global-mercator.svg?branch=master)](https://travis-ci.org/DenisCarriere/global-mercator)
[![npm version](https://badge.fury.io/js/global-mercator.svg)](https://badge.fury.io/js/global-mercator)
[![Coverage Status](https://coveralls.io/repos/github/DenisCarriere/global-mercator/badge.svg?branch=master)](https://coveralls.io/github/DenisCarriere/global-mercator?branch=master)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DenisCarriere/global-mercator/master/LICENSE)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A set of tools geospatial tools to help with TMS, Google (XYZ) Tiles.

> This library is insipered by GDAL2Tiles, Google Summer of Code 2007 & 2008.

Another great simplistic tile library is [`tilebelt`](https://github.com/mapbox/tilebelt).

## Install

**npm**

```bash
$ npm install --save global-mercator
```

## Quickstart

```javascript
var mercator = require('global-mercator')
var tile = [10, 15, 8] // [x, y, zoom]
mercator.tileToBBox(tile)
// [ -165.937, -82.853, -164.531, -82.676 ]
```

## Features

| Function                                                  | Description                                                          |
| --------------------------------------------------------- | :------------------------------------------------------------------- |
| [lngLatToMeters(LngLat)](#lnglattometers)                 | Converts LngLat coordinates to Meters coordinates.                   |
| [metersToLngLat(Meters)](#meterstolnglat)                 | Converts Meters coordinates to LngLat coordinates.                   |
| [metersToPixels(Meters, zoom)](#meterstopixels)           | Converts Meters coordinates to Pixels coordinates.                   |
| [lngLatToTile(LngLat, zoom)](#lnglattotile)               | Converts LngLat coordinates to TMS Tile.                             |
| [lngLatToGoogle(LngLat, zoom)](#lnglattogoogle)           | Converts LngLat coordinates to Google (XYZ) Tile.                    |
| [metersToTile(Meters, zoom)](#meterstotile)               | Converts Meters coordinates to TMS Tile.                             |
| [pixelsToMeters(Pixels)](#pixelstometers)                 | Converts Pixels coordinates to Meters coordinates.                   |
| [pixelsToTile(Pixels)](#pixelstotile)                     | Converts Pixels coordinates to TMS Tile.                             |
| [tileToBBoxMeters(tile)](#tiletobboxmeters)               | Converts TMS Tile to bbox in Meters coordinates.                     |
| [tileToBBox(tile)](#tiletobbox)                           | Converts TMS Tile to bbox in LngLat coordinates.                     |
| [googleToBBoxMeters(google)](#googletobboxmeters)         | Converts Google (XYZ) Tile to bbox in Meters coordinates.            |
| [googleToBBox(google)](#googletobbox)                     | Converts Google (XYZ) Tile to bbox in LngLat coordinates.            |
| [tileToGoogle(tile)](#tiletogoogle)                       | Converts TMS Tile to Google (XYZ) Tile.                              |
| [googleToTile(google)](#googletotile)                     | Converts Google (XYZ) Tile to TMS Tile.                              |
| [googleToQuadkey(google)](#googletoquadkey)               | Converts Google (XYZ) Tile to Quadkey.                               |
| [tileToQuadkey(tile)](#tiletoquadkey)                     | Converts TMS Tile to QuadKey.                                        |
| [quadkeyToTile(quadkey)](#quadkeytotile)                  | Converts Quadkey to TMS Tile.                                        |
| [quadkeyToGoogle(quadkey)](#quadkeytogoogle)              | Converts Quadkey to Google (XYZ) Tile.                               |
| [hash(tile)](#hash)                                       | Hash tile for unique id key                                          |
| [validateTile(tile)](#validatetile)                       | Validates TMS Tile                                                   |
| [validateZoom(zoom)](#validatezoom)                       | Validates Zoom level                                                 |
| [validateLngLat(LngLat)](#validatelnglat)                 | Validates LngLat coordinates                                         |
| [validatePixels(Pixels)](#validatepixels)                 | Validates Pixels coordinates                                         |
| [maxBBox(BBox\[\])](#maxbbox)                             | Maximum extent of BBox                                               |
| [validTile(tile)](#validtile)                             | Valid Tile                                                           |
| [longitude(degree)](#longitude)                           | Modifies a Longitude to fit within +/-180 degrees.                   |
| [latitude(degree)](#latitude)                             | Modifies a Latitude to fit within +/-90 degrees.                     |
| [pointToTile(lnglat, zoom)](#pointtotile)                 | Get the tile for a point at a specified zoom level                   |
| [pointToTileFraction(lnglat, zoom)](#pointtotilefraction) | Get the precise fractional tile location for a point at a zoom level |
| [wrapTile(tile)](#wraptile)                               | Handles tiles which crosses the 180th meridian or 90th parallel      |

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### hash

Hash tile for unique id key

**Parameters**

-   `tile` **Tile** [x, y, z]

**Examples**

```javascript
var id = mercator.hash([312, 480, 4])
//=5728
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** hash

### pointToTile

Get the tile for a point at a specified zoom level
<https://github.com/mapbox/tilebelt>

**Parameters**

-   `lnglat` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** [Longitude, Latitude]
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates LatLng coordinates (optional, default `true`)

**Examples**

```javascript
var tile = mercator.pointToTile([1, 1], 12)
//= [ 2059, 2036, 12 ]
```

Returns **Google** Google (XYZ) Tile

### pointToTileFraction

Get the precise fractional tile location for a point at a zoom level
<https://github.com/mapbox/tilebelt>

**Parameters**

-   `lnglat` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** [Longitude, Latitude]
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates LatLng coordinates (optional, default `true`)

Returns **Google** Google (XYZ) Tile
var tile = mercator.pointToTileFraction([1, 1], 12)
//= [ 2059.3777777777777, 2036.6216445333432, 12 ]

### bboxToCenter

Converts BBox to Center

**Parameters**

-   `bbox` **BBox** [west, south, east, north] coordinates

**Examples**

```javascript
var center = mercator.bboxToCenter([90, -45, 85, -50])
//= [ 87.5, -47.5 ]
```

Returns **LngLat** center

### lngLatToMeters

Converts LngLat coordinates to Meters coordinates.

**Parameters**

-   `lnglat` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** [Longitude, Latitude]
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates LatLng coordinates (optional, default `true`)

**Examples**

```javascript
var meters = mercator.lngLatToMeters([126, 37])
//=[ 14026255.8, 4439106.7 ]
```

Returns **Meters** Meters coordinates

### metersToLngLat

Converts Meters coordinates to LngLat coordinates.

**Parameters**

-   `meters` **Meters** Meters in Mercator [x, y]

**Examples**

```javascript
var lnglat = mercator.metersToLngLat([14026255, 4439106])
//=[ 126, 37 ]
```

Returns **LngLat** LngLat coordinates

### metersToPixels

Converts Meters coordinates to Pixels coordinates.

**Parameters**

-   `meters` **Meters** Meters in Mercator [x, y]
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level
-   `tileSize` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Tile size (optional, default `256`)

**Examples**

```javascript
var pixels = mercator.metersToPixels([14026255, 4439106], 13)
//=[ 1782579.1, 1280877.3, 13 ]
```

Returns **Pixels** Pixels coordinates

### lngLatToTile

Converts LngLat coordinates to TMS Tile.

**Parameters**

-   `lnglat` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** [Longitude, Latitude]
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates LatLng coordinates (optional, default `true`)

**Examples**

```javascript
var tile = mercator.lngLatToTile([126, 37], 13)
//=[ 6963, 5003, 13 ]
```

Returns **Tile** TMS Tile

### lngLatToGoogle

Converts LngLat coordinates to Google (XYZ) Tile.

**Parameters**

-   `lnglat` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** [Longitude, Latitude]
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates LatLng coordinates (optional, default `true`)

**Examples**

```javascript
var google = mercator.lngLatToGoogle([126, 37], 13)
//=[ 6963, 3188, 13 ]
```

Returns **Google** Google (XYZ) Tile

### metersToTile

Converts Meters coordinates to TMS Tile.

**Parameters**

-   `meters` **Meters** Meters in Mercator [x, y]
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level

**Examples**

```javascript
var tile = mercator.metersToTile([14026255, 4439106], 13)
//=[ 6963, 5003, 13 ]
```

Returns **Tile** TMS Tile

### pixelsToMeters

Converts Pixels coordinates to Meters coordinates.

**Parameters**

-   `pixels` **Pixels** Pixels [x, y, zoom]
-   `tileSize` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Tile size (optional, default `256`)

**Examples**

```javascript
var meters = mercator.pixelsToMeters([1782579, 1280877, 13])
//=[ 14026252.0, 4439099.5 ]
```

Returns **Meters** Meters coordinates

### pixelsToTile

Converts Pixels coordinates to TMS Tile.

**Parameters**

-   `pixels` **Pixels** Pixels [x, y, zoom]
-   `tileSize` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Tile size (optional, default `256`)
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates Pixels coordinates (optional, default `true`)

**Examples**

```javascript
var tile = mercator.pixelsToTile([1782579, 1280877, 13])
//=[ 6963, 5003, 13 ]
```

Returns **Tile** TMS Tile

### tileToBBoxMeters

Converts TMS Tile to bbox in Meters coordinates.

**Parameters**

-   `tile` **Tile** Tile [x, y, zoom]
-   `tileSize` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Tile size (optional, default `256`)
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates Tile (optional, default `true`)
-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** TMS Tile X
-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** TMS Tile Y
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level

**Examples**

```javascript
var bbox = mercator.tileToBBoxMeters([6963, 5003, 13])
//=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
```

Returns **BBox** bbox extent in [minX, minY, maxX, maxY] order

### tileToBBox

Converts TMS Tile to bbox in LngLat coordinates.

**Parameters**

-   `tile` **Tile** Tile [x, y, zoom]
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates Tile (optional, default `true`)
-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** TMS Tile X
-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** TMS Tile Y
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level

**Examples**

```javascript
var bbox = mercator.tileToBBox([6963, 5003, 13])
//=[ 125.991, 36.985, 126.035, 37.020 ]
```

Returns **BBox** bbox extent in [minX, minY, maxX, maxY] order

### googleToBBoxMeters

Converts Google (XYZ) Tile to bbox in Meters coordinates.

**Parameters**

-   `google` **Google** Google [x, y, zoom]

**Examples**

```javascript
var bbox = mercator.googleToBBoxMeters([6963, 3188, 13])
//=[ 14025277.4, 4437016.6, 14030169.4, 4441908.5 ]
```

Returns **BBox** bbox extent in [minX, minY, maxX, maxY] order

### googleToBBox

Converts Google (XYZ) Tile to bbox in LngLat coordinates.

**Parameters**

-   `google` **Google** Google [x, y, zoom]

**Examples**

```javascript
var bbox = mercator.googleToBBox([6963, 3188, 13])
//=[ 125.991, 36.985, 126.035, 37.020 ]
```

Returns **BBox** bbox extent in [minX, minY, maxX, maxY] order

### tileToGoogle

Converts TMS Tile to Google (XYZ) Tile.

**Parameters**

-   `tile` **Tile** Tile [x, y, zoom]
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates Tile (optional, default `true`)

**Examples**

```javascript
var google = mercator.tileToGoogle([6963, 5003, 13])
//=[ 6963, 3188, 13 ]
```

Returns **Google** Google (XYZ) Tile

### googleToTile

Converts Google (XYZ) Tile to TMS Tile.

**Parameters**

-   `google` **Google** Google [x, y, zoom]

**Examples**

```javascript
var tile = mercator.googleToTile([6963, 3188, 13])
//=[ 6963, 5003, 13 ]
```

Returns **Tile** TMS Tile

### googleToQuadkey

Converts Google (XYZ) Tile to Quadkey.

**Parameters**

-   `google` **Google** Google [x, y, zoom]

**Examples**

```javascript
var quadkey = mercator.googleToQuadkey([6963, 3188, 13])
//='1321102330211'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Microsoft's Quadkey schema

### tileToQuadkey

Converts TMS Tile to QuadKey.

**Parameters**

-   `tile` **Tile** Tile [x, y, zoom]
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates Tile (optional, default `true`)

**Examples**

```javascript
var quadkey = mercator.tileToQuadkey([6963, 5003, 13])
//='1321102330211'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Microsoft's Quadkey schema

### quadkeyToTile

Converts Quadkey to TMS Tile.

**Parameters**

-   `quadkey` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Microsoft's Quadkey schema

**Examples**

```javascript
var tile = mercator.quadkeyToTile('1321102330211')
//=[ 6963, 5003, 13 ]
```

Returns **Tile** TMS Tile

### quadkeyToGoogle

Converts Quadkey to Google (XYZ) Tile.

**Parameters**

-   `quadkey` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Microsoft's Quadkey schema

**Examples**

```javascript
var google = mercator.quadkeyToGoogle('1321102330211')
//=[ 6963, 3188, 13 ]
```

Returns **Google** Google (XYZ) Tile

### bboxToMeters

Converts BBox from LngLat coordinates to Meters coordinates

**Parameters**

-   `bbox` **BBox** extent in [minX, minY, maxX, maxY] order

**Examples**

```javascript
var meters = mercator.bboxToMeters([ 125, 35, 127, 37 ])
//=[ 13914936.3, 4163881.1, 14137575.3, 4439106.7 ]
```

Returns **BBox** bbox extent in [minX, minY, maxX, maxY] order

### validateTile

Validates TMS Tile.

**Parameters**

-   `tile` **Tile** Tile [x, y, zoom]
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates Tile (optional, default `true`)

**Examples**

```javascript
mercator.validateTile([60, 80, 12])
//=[60, 80, 12]
mercator.validateTile([60, -43, 5])
//= Error: Tile <y> must not be less than 0
mercator.validateTile([25, 60, 3])
//= Error: Illegal parameters for tile
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** Will throw an error if TMS Tile is not valid.

Returns **Tile** TMS Tile

### wrapTile

Wrap Tile -- Handles tiles which crosses the 180th meridian or 90th parallel

**Parameters**

-   `tile` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** Tile
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom Level

**Examples**

```javascript
mercator.wrapTile([0, 3, 2])
//= [0, 3, 2] -- Valid Tile X
mercator.wrapTile([4, 2, 2])
//= [0, 2, 2]  -- Tile 4 does not exist, wrap around to TileX=0
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Tile X

### validateZoom

Validates Zoom level

**Parameters**

-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Zoom level
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates Zoom level (optional, default `true`)

**Examples**

```javascript
mercator.validateZoom(12)
//=12
mercator.validateZoom(-4)
//= Error: <zoom> cannot be less than 0
mercator.validateZoom(32)
//= Error: <zoom> cannot be greater than 30
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** Will throw an error if zoom is not valid.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** zoom Zoom level

### validateLngLat

Validates LngLat coordinates

**Parameters**

-   `lnglat` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** [Longitude, Latitude]
-   `validate` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** validates LatLng coordinates (optional, default `true`)

**Examples**

```javascript
mercator.validateLngLat([-115, 44])
//= [ -115, 44 ]
mercator.validateLngLat([-225, 44])
//= Error: LngLat [lng] must be within -180 to 180 degrees
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** Will throw an error if LngLat is not valid.

Returns **LngLat** LngLat coordinates

### maxBBox

Maximum extent of BBox

**Parameters**

-   `array` **(BBox | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;BBox>)** BBox [west, south, east, north]

**Examples**

```javascript
var bbox = mercator.maxBBox([[-20, -30, 20, 30], [-110, -30, 120, 80]])
//=[-110, -30, 120, 80]
```

Returns **BBox** Maximum BBox

### validTile

Valid TMS Tile

**Parameters**

-   `tile` **Tile** Tile [x, y, zoom]

**Examples**

```javascript
mercator.validTile([60, 80, 12])
//= true
mercator.validTile([60, -43, 5])
//= false
mercator.validTile([25, 60, 3])
//= false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** valid tile true/false

### latitude

Modifies a Latitude to fit within +/-90 degrees.

**Parameters**

-   `lat` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** latitude to modify

**Examples**

```javascript
dateline.latitude(100)
//= -80
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** modified latitude

### longitude

Modifies a Longitude to fit within +/-180 degrees.

**Parameters**

-   `lng` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** longitude to modify

**Examples**

```javascript
dateline.longitude(190)
//= -170
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** modified longitude
