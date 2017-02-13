# react-gauge-capacity
A react component used to describe the active progress with respect to target capacity in the form of a gauge meter.

## Installation

```
$ npm install react-gauge-capacity --save 
```

## Example

```js
import React, { Component } from 'react';
import ReactGauge from 'react-gauge-test';

let contWidth = 360;
let contHeight = 200;
let gaugeRadius = 135;
let centerLineHeight = 25;

/***************************
** Set following variable to make gauge meter responsive 
*/
if(window.innerWidth <= 420 && window.innerWidth > 375){
	contWidth = 340;
	contHeight = 190;
	gaugeRadius = 120;
} else if (window.innerWidth <= 375 && window.innerWidth > 320){
	contWidth = 300;
	contHeight = 170;
	gaugeRadius = 100;
} else if (window.innerWidth <= 320){
	contWidth = 260;
	contHeight = 155;
	gaugeRadius = 90;
	centerLineHeight = 20;
}
/****************************/

let options = {
	isInnerNumbers: false, 
	aperture: 180, 
	radius : gaugeRadius,
	tickOffset: 20,
	arcStrokeWidth: 40,
	miniTickLength: 1,
	miniTickStrokeWidth: 1,
	tickLabelOffset: 10,
	scaleDivisionNumber: 5,
	centralCircleRadius: 10,
	marks: ["r", "y", "g", "c", "g", "y", "r"],
	contentWidth: contWidth,
	svgContainerWidth: contWidth,
	svgContainerHeight: contHeight,
	arrowValue: 2.5/6,
	gaugeCenterLineHeight: centerLineHeight,
	ranges: [{
			start: 0,
			end: 1/6,
			color: "#f3595b"
		},
		{
			start: 1/6,
			end: 2/6,
			color: "#ffc875"
		},
		{
			start: 2/6,
			end: 3/6,
			color: "#83d7c0"
		},
		{
			start: 3/6,
			end: 3/6,
			color: "#83d7c0"
		},
		{
			start: 3/6,
			end: 4/6,
			color: "#83d7c0"
		},
		{
			start: 4/6,
			end: 5/6,
			color: "#ffc875"
		},
		{
			start: 5/6,
			end: 1,
			color: "#f3595b"
		}]
}
<ReactGauge {...options} />
```

# Options

| Param | Default | Description |
|---|---|---|
| `radius` | `175` | Main arc radius |
| `arcStrokeWidth` | `3` | Width of main arc |
| `tickOffset` | `7` | Offset between main arc and ticks |
| `tickStrokeWidth` | `2` | Width of big ticks |
| `tickLength` | `5` | Length of big ticks|
| `miniTickLength` | `1` | Length of mini ticks |
| `miniTickStrokeWidth` | `1` | Width of mini ticks |
| `scaleDivisionNumber` | `10` | Number of divisions between big ticks |
| `tickLabelOffset` | `10` | Offset between big tick and tick label |
| `centralCircleRadius` | `10` | Radius of central circle |
| `isInnerNumbers` | `false` | Tick labels position |
| `arrowValue` | `0` | Value of gauge |
| `marks` | `[0, 1, 2, 3, 4, 5, 6]` | Tick labels values |
| `ranges` | `[{ start: 0, end: 4.5/6, color: "#666" }, { start: 4.5/6, end: 5.5/6, color: "#ffa500" }, { start: 5.5/6, end: 1, color: "#ff0000" }]` | Array of color intervals |
| `aperture` | `80` | Gap on main arc |
| `contentWidth` | `450` | Width and height of inner image |
| `svgContainerWidth` | `450` |  Svg container width |
| `svgContainerHeight` | `450` | Svg container height |
| `gaugeCenterLineHeight` | `25` | Svg Center Line Y-axis dimensions |



[![NPM](https://nodei.co/npm/react-gauge-capacity.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-gauge-capacity/)

