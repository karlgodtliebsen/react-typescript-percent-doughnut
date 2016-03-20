declare function require(name: string): any;

require("babel-polyfill");
require("es6-promise").polyfill();
require("../styles/demostyles.less");

import * as React from '../react';
import { render } from '../react-dom';

declare var __PRODUCTION__: boolean;

interface Coordinate{
	x:number,
	y:number
}

interface DoughnutConfiguration{
	offset:number,
	size:number,
	strokeWith: number,
	percent: number,
	color: string,
	label: string
}

class Doughnut extends React.Component<any, {}> {

   constructor(props: DoughnutConfiguration, context: any) {
         super(props, context);
   }

	 private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): Coordinate{
		 var angleInRadians = (angleInDegrees - 90.0) * Math.PI / 180.0;

		 return {
			 x: centerX + (radius * Math.cos(angleInRadians)),
			 y: centerY + (radius * Math.sin(angleInRadians))
		 };
	 }

	 private describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string{

		 var start = this.polarToCartesian(x, y, radius, endAngle);
		 var end = this.polarToCartesian(x, y, radius, startAngle);

		 var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

		 var d = [
			 "M", start.x, start.y,
			 "A", radius, radius, 0, arcSweep, 0, end.x, end.y
		 ].join(" ");
		 return d;
	 }

	 private renderDoughnut (percent:number,color:string,strokeWith: number,offset: number,size: number) : any{
		 const center: number = size / 2;
		 const radius: number = center - strokeWith;
		 const arc: number = (360.0)  / 100.0 * percent;
		 const d = this.describeArc(center,center,radius,0 - offset,arc- offset);
		return <path d={d} stroke={color} fill="none" key={0} strokeWidth={strokeWith} />;
	 }

	 render() {

		 const center: number = this.props.size / 2;

		 return (
		   <svg >
			 <g >
				 {this.renderDoughnut(this.props.percent,this.props.color,this.props.strokeWith,this.props.offset,this.props.size)}
				 <text x={center} y={center} className="textcenter">{this.props.label}</text>
			 </g>
		   </svg>
     );
   }
 }



export default class DoughnutPie extends React.Component<any, {}> {
   constructor(props: any, context: any) {
        super(props, context);
   }

    render() {
		return (
			<div>
                <Doughnut  percent={this.props.percent} color={this.props.color}  offset={this.props.offset} strokeWith={this.props.strokeWith} size={this.props.size} label={this.props.label}/>
			</div>
        );
    }
}





