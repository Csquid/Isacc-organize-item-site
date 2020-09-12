const Server = require("./server/modules/HttpServer");
const server = new Server();

server.use('/static', server.express.static(__dirname + '/public'));

const path_isaac = {
    img: "/static/img/isaac_items",
    json: "./public/json/isaac_items",
    item_type: {
        activated: "/activated",
        passive: "/passive",
        accessory: "/accessory",
        other: "/other"
    }
}

// deep copy - by.제로초님 코드 (Mr. Zero Cho)
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
    // all: null,
    original: null,
    expansion_pack: null,
    rebirth: null,
    afterbirth: null,
    afterbirth_plus: null,
    // booster_pack: null
};

const isaac_items_json = {
    activated: copyObj(skeleton_isaac_version),
    passive: copyObj(skeleton_isaac_version),
    accessory: copyObj(skeleton_isaac_version)
};

const isaac_item_object = {
    activated: copyObj(skeleton_isaac_version),
    passive: copyObj(skeleton_isaac_version),
    accessory: copyObj(skeleton_isaac_version)
};

//json 파일들을 끍어 오는 반복문
for (let key_type in isaac_items_json) {
    for (let key_json in isaac_items_json[key_type]) {
        isaac_items_json[key_type][key_json] = require(path_isaac.json + path_isaac.item_type[key_type] + "/" + key_json + ".json");
    }
}
isaac_items_json.other = {};

isaac_items_json.other.card = require(path_isaac.json + path_isaac.item_type.other + "/card.json")

for(let key_type in isaac_item_object) {
    for (let key_data in isaac_item_object[key_type]) {
        isaac_item_object[key_type][key_data] = JSON.parse(JSON.stringify(isaac_items_json[key_type][key_data]));
    }
}

isaac_item_object.other = {};
isaac_item_object.other.card = JSON.parse(JSON.stringify(isaac_items_json.other.card));
// console.log(isaac_item_object.other.card);

//json 합치는 모듈
function jsonArrConcat(sourceObj) {
    let destinationObj = {};
    for (let key_type in sourceObj) {
        for (let key_json in sourceObj[key_type]) {
            destinationObj[key_json] = sourceObj[key_type][key_json];
        }
    }
    
    return destinationObj;
}

const testObject = (jsonArrConcat(isaac_items_json.passive));

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

server.listen(8001, function () {
    console.log("start! express server on port 3000");
});

server.get('/', function (req, res) {
    // res.sendFile(__dirname, "/public/ttoli.html")
    res.sendFile(__dirname + "/public/index.html");
})

server.get('/test', function(req, res) {
    res.sendFile(__dirname + "/public/popup/ttoli.html");
    // res.sendFile(__dirname + '/public/index.html');
})

server.get('/popup/ttoli', function(req, res) {
    res.sendFile(__dirname + "/public/popup/ttoli.html");
});

server.post('/ajax_test', function (req, res) {
    console.log("req.body.color: " + req.body.color);
    let responseData = { signal: 'ok', color: req.body.color };
    
    //이미지 처리
    for (let key_type in isaac_item_object) {
        for (let key_version in isaac_item_object[key_type]) {
            for (let key_id in isaac_item_object[key_type][key_version]) {
                isaac_item_object[key_type][key_version][key_id].img = path_isaac.img + path_isaac.item_type[key_type] + "/" + key_id + ".png";
            }
        }
    }
    // let responseColor = { 
    //     activated: { length: 0, data: {} },
    //     passive: { length: 0, data: {} },
    //     accessory: { length: 0, data: {} },
    //     other: { length: 0, data: {} }
    // }
    let responseColor = { 
        activated: {},
        passive: {},
        accessory: {},
        other: {}
    }
    
    //분류 처리
    for (let key_type in isaac_item_object) {
        // console.log("key_type: " + key_type);

        for (let key_version in isaac_item_object[key_type]) {
            
            for(let key_data in isaac_item_object[key_type][key_version]) {
                if (req.body.color === "all") {
                    responseColor[key_type][key_data] = isaac_item_object[key_type][key_version][key_data];
                    // responseColor[key_type].length++;

                    continue;
                }
    
                if (isaac_item_object[key_type][key_version][key_data].color == req.body.color) {
                    responseColor[key_type][key_data] = isaac_item_object[key_type][key_version][key_data];
                    // responseColor[key_type].length++;
                }
            }
            
        }
    }

    responseData.isaac_item = responseColor;



    res.json(responseData);
}); 