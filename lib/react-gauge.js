var React = require('react');

var ReactGauge = React.createClass({
	displayName: 'ReactGauge',

	getInitialState: function() {
		return {
			radius: this.props.radius,
			arcStrokeWidth: this.props.arcStrokeWidth,
			tickOffset: this.props.tickOffset,
			tickStrokeWidth: this.props.tickStrokeWidth,
			tickLength: this.props.tickLength,
			miniTickLength: this.props.miniTickLength,
			miniTickStrokeWidth: this.props.miniTickStrokeWidth,
			scaleDivisionNumber: this.props.scaleDivisionNumber,
			tickLabelOffset: this.props.tickLabelOffset,
			centralCircleRadius: this.props.centralCircleRadius,
			isInnerNumbers: this.props.isInnerNumbers,
			arrowValue: this.props.arrowValue,
			marks: this.props.marks,
			ranges: this.props.ranges,
			aperture: this.props.aperture,
			contentWidth: this.props.contentWidth,
			svgContainerWidth: this.props.contentWidth,
			svgContainerHeight: this.props.svgContainerHeight,
			gaugeCenterLineHeight: this.props.gaugeCenterLineHeight,
			viewBox: this.props.viewBox
		};
	},

	getDefaultProps: function() {
		return {
			radius: 175,
			arcStrokeWidth: 3,
			tickOffset: 7,
			tickStrokeWidth: 2,
			tickLength: 5,
			miniTickLength: 1,
			miniTickStrokeWidth: 1,
			scaleDivisionNumber: 10,
			tickLabelOffset: 10,
			centralCircleRadius: 10,
			isInnerNumbers: false,
			arrowValue: 0,
			marks: [0, 1, 2, 3, 4, 5, 6],
			ranges: [{
				start: 0,
				end: 4.5 / 6,
				color: "#666"
			}, {
				start: 4.5 / 6,
				end: 5.5 / 6,
				color: "#ffa500"
			}, {
				start: 5.5 / 6,
				end: 1,
				color: "#ff0000"
			}],
			aperture: 80,
			contentWidth: 450,
			svgContainerWidth: 450,
			svgContainerHeight: 450,
			gaugeCenterLineHeight: 35,
			viewBox: "30 0 300 200"
		};
	},

	handleChange: function(event) {
		this.setState({
			radius: event.target.radius,
			arcStrokeWidth: event.target.arcStrokeWidth,
			tickOffset: event.target.tickOffset,
			tickStrokeWidth: event.target.tickStrokeWidth,
			tickLength: event.target.tickLength,
			miniTickLength: event.target.miniTickLength,
			miniTickStrokeWidth: event.target.miniTickStrokeWidth,
			scaleDivisionNumber: event.target.scaleDivisionNumber,
			tickLabelOffset: event.target.tickLabelOffset,
			centralCircleRadius: event.target.centralCircleRadius,
			isInnerNumbers: event.target.isInnerNumbers,
			arrowValue: event.target.arrowValue,
			marks: event.target.marks,
			ranges: event.target.ranges,
			aperture: event.target.aperture,
			contentWidth: event.target.contentWidth,
			svgContainerWidth: event.target.svgContainerWidth,
			svgContainerHeight: event.target.svgContainerHeight,
			gaugeCenterLineHeight: event.target.gaugeCenterLineHeight,
			viewBox: event.target.viewBox
		});
	},

	propTypes: {
		radius: React.PropTypes.number,
		arcStrokeWidth: React.PropTypes.number,
		tickOffset: React.PropTypes.number,
		tickStrokeWidth: React.PropTypes.number,
		tickLength: React.PropTypes.number,
		miniTickLength: React.PropTypes.number,
		miniTickStrokeWidth: React.PropTypes.number,
		scaleDivisionNumber: React.PropTypes.number,
		tickLabelOffset: React.PropTypes.number,
		centralCircleRadius: React.PropTypes.number,
		isInnerNumbers: React.PropTypes.bool,
		arrowValue: React.PropTypes.number,
		marks: React.PropTypes.array,
		ranges: React.PropTypes.arrayOf(React.PropTypes.shape({
			start: React.PropTypes.number.isRequired,
			end: React.PropTypes.number.isRequired,
			color: React.PropTypes.string.isRequired
		})).isRequired,
		aperture: React.PropTypes.number,
		contentWidth: React.PropTypes.number,
		svgContainerWidth: React.PropTypes.number,
		svgContainerHeight: React.PropTypes.number,
		gaugeCenterLineHeight: React.PropTypes.number,
		viewBox: React.PropTypes.string.isRequired
	},

	render: function() {
		var gaugeRadius = this.state.radius;
		var gaugeArcStrokeWidth = this.state.arcStrokeWidth;
		var gaugeTickOffset = this.state.tickOffset;
		var gaugeTickStrokeWidth = this.state.tickStrokeWidth;
		var gaugeTickLength = this.state.tickLength;
		var gaugeMiniTickLength = this.state.miniTickLength;
		var gaugeMiniTickStrokeWidth = this.state.miniTickStrokeWidth;
		var gaugeScaleDivisionNumber = this.state.scaleDivisionNumber;
		var gaugeTickLabelOffset = this.state.tickLabelOffset;
		var gaugeCentralCircleRadius = this.state.centralCircleRadius;
		var gaugeInnerNumbers = this.state.isInnerNumbers;
		var gaugeArrowValue = this.state.arrowValue;
		var gaugeMarks = this.state.marks;
		var gaugeRanges = this.state.ranges;
		var gaugeAperture = this.state.aperture;
		var gaugeContentWidth = this.state.contentWidth;
		var gaugeCenterLineHeight = this.state.gaugeCenterLineHeight;
		var viewBox = this.state.viewBox;

		var width = gaugeContentWidth;
		var height = gaugeContentWidth;

		var center = {
			x: width / 2,
			y: height / 2
		};

		var gaugeStart = -180 + gaugeAperture / 2;
		var gaugeEnd = 180 - gaugeAperture / 2;

		var gaugeLength = gaugeEnd - gaugeStart;

		var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
			var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

			return {
				x: centerX + (radius * Math.cos(angleInRadians)),
				y: centerY + (radius * Math.sin(angleInRadians))
			};
		};

		var getArcs = function() {
			var drawArc = function(startAngle, endAngle, color, index) {
				var describeArc = function(x, y, radius, startAngle, endAngle) {
					var start = polarToCartesian(x, y, radius, endAngle);
					var end = polarToCartesian(x, y, radius, startAngle);

					var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

					var d = [
						"M", start.x, start.y,
						"A", radius, radius, 0, arcSweep, 0, end.x, end.y
					].join(" ");

					return d;
				};

				return React.createElement('path', {
					className: "gauge-arc-" + index,
					key: index,
					fill: "none",
					stroke: color,
					strokeWidth: gaugeArcStrokeWidth,
					d: describeArc(center.x, center.y, gaugeRadius, startAngle, endAngle)
				});
			};

			var arcs = [];

			gaugeRanges.forEach(function(range, i) {
				arcs.push(
					drawArc(gaugeStart + range.start * gaugeLength, gaugeStart + range.end * gaugeLength, range.color, i)
				);
			});
			return arcs;
		};

		var getTicks = function() {
			var result = [];

			var indexValue = 0;

			gaugeMarks.forEach(function(mark, index, array) {
				if (index !== 0) {
					var miniGaugeLength = gaugeLength / (array.length - 1) / gaugeScaleDivisionNumber;

					for (var i = 1; i < gaugeScaleDivisionNumber; i++) {
						var startPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * gaugeTickOffset, gaugeStart + index * gaugeLength / (array.length - 1) - miniGaugeLength * i);
						var endPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeMiniTickLength), gaugeStart + index * gaugeLength / (array.length - 1) - miniGaugeLength * i);

						result.push(React.createElement('line', {
							className: "gauge-mini-tick",
							key: indexValue++,
							stroke: "#000000",
							x1: startPoint.x,
							y1: startPoint.y,

							x2: endPoint.x,
							y2: endPoint.y,

							strokeWidth: gaugeMiniTickStrokeWidth
						}));
					}
				}
			});

			gaugeMarks.forEach(function(mark, index, array) {
				var startPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * gaugeTickOffset, gaugeStart + index * gaugeLength / (array.length - 1));
				var endPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeTickLength), gaugeStart + index * gaugeLength / (array.length - 1));

				result.push(React.createElement('line', {
					className: "gauge-tick",
					key: indexValue++,
					stroke: "#a3a3a3",
					x1: startPoint.x,
					y1: startPoint.y,

					x2: endPoint.x,
					y2: endPoint.y,

					strokeWidth: gaugeTickStrokeWidth
				}));
			});
			return result;
		};

		var getLabels = function() {
			var result = [];

			var indexValue = 0;
			gaugeMarks.forEach(function(mark, index, array) {
				var labelCoords = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeTickLength + gaugeTickLabelOffset), gaugeStart + index * gaugeLength / (array.length - 1));
				
				var gaugeCenter = '', adjustCenterLabel = 0;
				
				if(indexValue == parseInt(array.length/2)){
					gaugeCenter = " gauge-center-label";
					adjustCenterLabel = 8;  
				}
				result.push(React.createElement('text', {
					className: "gauge-label"+gaugeCenter,
					key: indexValue++,
					fill: "#666666",
					x: labelCoords.x,
					y: labelCoords.y-adjustCenterLabel,
					alignmentBaseline: "middle",
					textAnchor: "middle",
					strokeWidth: gaugeTickStrokeWidth
				}, mark));
			});
			return result;
		};

		var getArrow = function() {
			var result = [];

			var indexValue = 0;

			var point1 = polarToCartesian(center.x, center.y, gaugeCentralCircleRadius / 2, gaugeStart + gaugeLength * gaugeArrowValue - 90);
			var point2 = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeTickLength / 2), gaugeStart + gaugeLength * gaugeArrowValue);
			var point3 = polarToCartesian(center.x, center.y, gaugeCentralCircleRadius / 2, gaugeStart + gaugeLength * gaugeArrowValue + 90);

			var describe = [
				"M", point1.x, point1.y,
				"L", point2.x, point2.y,
				"L", point3.x, point3.y,
				"Z"
			].join(" ");

			result.push(React.createElement('path', {
				className: "gauge-arrow",
				key: indexValue++,
				fill: "#354357",
				d: describe
			}));

			result.push(React.createElement('circle', {
				className: "gauge-arrow",
				key: indexValue++,
				fill: "#354357",
				cx: center.x,
				cy: center.y,
				r: gaugeCentralCircleRadius
			}));
			return result;
		};

		var getCenterLine = function() {
			var result = [];

			var indexValue = 0;

			result.push(React.createElement('line', {
				className: "gauge-tick",
				key: indexValue++,
				stroke: "#a3a3a3",
				x1: center.x,
				y1: gaugeCenterLineHeight,

				x2: center.x,
				y2: center.x,

				strokeWidth: gaugeTickStrokeWidth
			}));
			
			return result;
		};
		
		return (
			React.createElement('svg', {
					className: "gauge",
					width: this.state.svgContainerWidth,
					height: this.state.svgContainerHeight,
					shapeRendering: "geometricPrecision",
					viewBox: this.state.viewBox
				},
				getArcs(),
				getTicks(),
				getLabels(),
				getCenterLine(),
				getArrow()
			)
		);
	}
});

module.exports = ReactGauge;