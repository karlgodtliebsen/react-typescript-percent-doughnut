declare function require(name: string): any;

require("babel-polyfill");
require("es6-promise").polyfill();
require("../styles/demostyles.less");

import * as React from 'react';
import { render } from 'react-dom';
import { DoughnutPie } from './src/chart';



declare var __PRODUCTION__: boolean;

render((

	<div>
		<DoughnutPie  percent={75.0} color={'blue'}  offset={160.0} strokeWith={10.0} size={100.0} label="75%">    </DoughnutPie>
		<DoughnutPie  percent={50.0} color={'red'}  offset={160.0} strokeWith={10.0} size={100.0} label="50%">    </DoughnutPie>
		<DoughnutPie  percent={85.0} color={'green'}  offset={160.0} strokeWith={10.0} size={100.0} label="85%">    </DoughnutPie>
	</div>

), document.getElementById('app'));



