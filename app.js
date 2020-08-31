const Server = require("./server/modules/HttpServer");
const server = new Server();

const isaac_items_original = require('./client/json/isaac_items_original.json')
const activated_img_path = "/img/isaac_items/activated/";


const isaac_version = {
    ORIGINAL: 3,
    EXPANSING_PACK: 4,
    REBIRTH: 5,
    AFTERBIRTH: 6,
    AFTERBIRTH_PLUS: 7,
    
    3: "ORIGINAL",
    4: "EXPANSING_PACK",
    5: "REBIRTH",
    6: "AFTERBIRTH",
    7: "AFTERBIRTH_PLUS"
}

const isaac_item_color = {
    WHITE: "WHITE",
    RED: "RED",
    ORANGE: "ORANGE",
    YELLOW: "YELLOW",
    GREEN: "GREEN",
    BLUE: "BLUE",
    PURPLE: "PURPLE",
    BROWN: "BROWN",
    BLACK: "BLACK"
}

const original_skeleton_object = {
    id: 0,
    img: "",
    name: "",
    color: "",
    version: isaac_version,    //버전
    cooldown: 0,                        //쿨타임
    condition_of_unlock: "",            //언락 조건
    description: []
}

const skeleton_object = {
    name: "",
    color: "",
    cooldown: 0,
    expansionPack: null,
    condition_of_unlock: "",
    description: []
}

let isaac_items_original_json = JSON.parse(JSON.stringify(isaac_items_original));

const isacc_item_object = {
    activated: isaac_items_original_json,

    passive: {

    },
}

server.listen(3000, function () {
    console.log("start! express server on port 3000");
});

server.get('/', function (req, res) {
    res.sendFile("/client/index.html");
})

server.get('/test', function(req, res) {
    console.log(isacc_item_object);
})

server.post('/ajax_test', function (req, res) {
    console.log("req.body.color: " + req.body.color);
    let responseData = { signal: 'ok', data: req.body.color };

    for (let key in isacc_item_object.activated) {
        isacc_item_object.activated[key].id = Number(key);
        isacc_item_object.activated[key].img = activated_img_path + key + ".png";
    }

    // console.log(isacc_item_object);

    res.json(responseData);
}); 