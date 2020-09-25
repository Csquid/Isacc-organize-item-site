const Server = require("../modules/HttpServer");
const server = new Server();
const router = server.router;

router.get('/', function(req, res) {
    res.sendFile(server.getPath().join(__dirname, "../../public/index.html"));
})

module.exports = router;