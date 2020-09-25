const Server = require("./server/modules/HttpServer");
const server = new Server();

const index = require('./server/router/index');

server.listen(8001, function (req, res) {
    console.log("start! express server on port 3000");
});

server.use('/', index)