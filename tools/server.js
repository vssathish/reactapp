import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import serverConfig from '../server/config'
import routes from '../server/routes';
import open from 'open';
import compression from 'compression';
import bodyParser from 'body-parser';
import _ from 'lodash';
import logger from '../server/logger'
import dependable from 'dependable'

let container = dependable.container()

/*eslint-disable no-console */

const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = (isDeveloping) ? 3000 : 7101;

if (isDeveloping) {
	logger.log('Running dev env');
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));

	app.use(bodyParser.json());
	app.use(require('webpack-hot-middleware')(compiler));

	routes.apply(app, container);

	app.get('*', function (req, res) {
	  res.sendFile(path.join(__dirname, '../src/index.html'));
	});


} else {
	console.log('Running prod env');
	app.use(compression());
	app.use(bodyParser.json());
	app.use(express.static('dist'));
	app.use(bodyParser.json());

	routes.apply(app, container);

	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, '../dist/index.html'));
	});
}

app.listen(port, function (err) {
  if (err) {
    logger.log(err);
  }

	if (isDeveloping) {
		open('http://localhost:3000');
	}
});
