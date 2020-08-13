// hey guys, creating competition to codeplates and the recent
// note taking app.

// for details and upcoming features to add, go to
// team details
// we need to try use async where we can.

const express = require("express");
const config = require('./config.js');
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const app = express();

app.enable("trust proxy");
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
 
//  apply to all requests
app.use(limiter);

app.use('/', express.static('./public'));

for (let page of config.pages) {
	let root = './pages/';
	if (fs.existsSync(`./pages/custom/${page}.html`)) {
		root = './pages/custom/';
	}
	if (page === 'index') {
		app.get('/', async (req, res, next) => await res.sendFile(`${page}.html`, { root: root }));
	} else {
		app.get(`/${page}`, async (req, res, next) => await res.sendFile(`${page}.html`, { root: root }));
	}
}


const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
