const Server = require("./server/modules/HttpServer");
const server = new Server();

const path_isaac = {
    img: "/img/isaac_items",
    json: "./client/json/isaac_items",
    activated: "/activated",
    passive: "/passive"
}

// deep copy
function copyObj(obj) {
    var copy = {};
    if (Array.isArray(obj)) {
        copy = obj.slice().map((v) => {
            return copyObj(v);
        });
    } else if (typeof obj === 'object' && obj !== null) {
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = copyObj(obj[attr]);
            }
        }
    } else {
        copy = obj;
    }
    return copy;
}

const skeleton_isaac_version = {
    all: null,
    original: null,
    expansion_pack: null,
    rebirth: null,
    afterbirth: null,
    afterbirth_plus: null,
    booster_pack: null
}

const json_issac_items = {
    activated: copyObj(skeleton_isaac_version),
}

const isacc_item_object = {
    activated: copyObj(skeleton_isaac_version),
}

for (let key_json in json_issac_items.activated) {
    json_issac_items.activated[key_json] = require(path_isaac.json + path_isaac.activated + "/" + key_json + ".json");
}


for (let key_data in isacc_item_object.activated) {
    isacc_item_object.activated[key_data] = JSON.parse(JSON.stringify(json_issac_items.activated[key_data]));
}



const isaac_img_path_activated = path_isaac.img + "/activated/";

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

server.listen(8001, function () {
    console.log("start! express server on port 3000");
});

server.get('/', function (req, res) {
    res.sendFile("/client/index.html");
})

server.get('/test', function (req, res) {
    console.log(isacc_item_object.activated);
})

server.post('/ajax_test', function (req, res) {
    console.log("req.body.color: " + req.body.color);
    let responseData = { signal: 'ok', color: req.body.color };

    for (let key_version in isacc_item_object.activated) {
        for (let key_id in isacc_item_object.activated[key_version]) {
            isacc_item_object.activated[key_version][key_id].img = isaac_img_path_activated + key_id + ".png";
        }
    }

    let responseColor = { length: 0, data: {} };

    responseData.isaac_item = isacc_item_object.activated.original;


    for (key in isacc_item_object.activated.original) {
        if (req.body.color === "all") {
            responseColor.length = isacc_item_object.activated.original.length;
            responseColor.data = isacc_item_object.activated.original;

            break;
        }

        if (isacc_item_object.activated.original[key].color == req.body.color) {
            responseColor.data[key] = isacc_item_object.activated.original[key];
            responseColor.length++;
        }
    }

    responseData.isaac_item = responseColor;



    res.json(responseData);
}); 