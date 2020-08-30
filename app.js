const Server = require("./server/modules/HttpServer");
const server = new Server();

server.listen(3000, function() {
    console.log("start! express server on port 3000");
});

server.get('/', function(req, res) {
    res.sendFile("/client/index.html");
})

server.post('/ajax_test', function(req, res) {
    console.log("req.body.color: " + req.body.color);
    let responseData = { signal: 'ok', data: req.body.color };
    res.json(responseData);
}); 