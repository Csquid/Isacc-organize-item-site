  
class Server {
    constructor(port) {
        this.port       = port || process.env.port;
        this.session    = require('express-session');
        this.express    = require('express');
        this.bodyParser = require('body-parser');
        this.http       = require('http');
        this.app        = this.express();
        this.app.set   ('view engine', 'ejs');
        this.app.engine('html', require('ejs').renderFile);
        this.app.use(this.express.static('client'));
        this.app.use(this.bodyParser.json());
        this.app.use(this.bodyParser.urlencoded());
        this.app.use(this.session({
            secret: '@#@$MYSIGN#@$#$', resave: false,     saveUninitialized: true
        }));
        this.server = this.http.createServer(this.app);
        this.banIp = [];
    }

    get(dir,func) {
        this.app.get(dir,func);
    }

	post(dir,func) {
        this.app.post(dir,func);
    }

    use(dir, func) {
        this.app.use(dir, func);
    }

	all(dir,func) {
		this.app.all(dir,func);
    }

    setHtmlDirection(dir) {
        this.app.set('views', dir);
    }

    listen(port) {
        this.setPort(port || this.port);
        this.server.listen(this.port);
    }

	getPort() {
		return this.port;
	}
    
	getSession() {
		return this.session;
	}

	getExpress() {
		return this.express;
	}

	getBodyParser() {
		return this.bodyParser;
	}

	getHttp() {
		return this.http;
	}

	getApp() {
		return this.app;
	}

	getServer() {
		return this.server;
	}

	setPort(p) {
		this.port = p;
	}

	setSession(s) {
		this.session = s;
	}

	setExpress(e) {
		this.express = e;
	}

	setBodyParser(bp) {
		this.express = bp;
	}

	setHttp(h) {
		this.http = h;
	}

	setApp(a) {
		this.app = a;
	}

	setServer(s) {
		this.server = s;
	}
}

module.exports = Server;