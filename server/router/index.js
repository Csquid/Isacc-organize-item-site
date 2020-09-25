const Server = require("../modules/HttpServer");
const server = new Server();

const nAjax = require('./ajax');

server.router.get('/', function(req, res) {
    // console.log(req.cookies.count);
    
    res.sendFile(server.getPath().join(__dirname, "../../public/index.html"));
    
})

server.router.use('/ajax', nAjax);
server.router.get('/count', function(req, res) {
    console.log(req.cookies.count)

    let count = req.cookies.count;

    if(req.cookies.count) {
        count = parseInt(req.cookies.count);
    } else {
        res.cookie('count', '0');
    }

    res.cookie('count', count + 1);
    res.send("count: " + req.cookies.count)
})

module.exports = server.router;