const db_mysql = require("./server/database/db_mysql");
const connect = db_mysql.init();
const Server = require("./server/modules/HttpServer");
const server = new Server();

// db_mysql.connect(connect);

// console.log(connect)

connect.query('SHOW TABLES;', function(error, rows, fields) {
     console.log('data: ', rows);
})

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

// deep copy - by. Mr. Zero Cho
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
isaac_items_json.other.card  = require(path_isaac.json + path_isaac.item_type.other + "/card.json")

test_json = {
    activated: null,
    passive: null,
    accessory: null
}

test_object = {
    activated: null,
    passive: null,
    accessory: null
}

for(let key_type in test_json) {
    test_json[key_type] = require(path_isaac.json + path_isaac.item_type[key_type] + "/all.json")
}

// console.log(test_json)
let test_activated_data_json = require(path_isaac.json + path_isaac.item_type.other + "/card.json")


for(let key_type in isaac_item_object) {
    for (let key_data in isaac_item_object[key_type]) {
        isaac_item_object[key_type][key_data] = JSON.parse(JSON.stringify(isaac_items_json[key_type][key_data]));
    }
}


isaac_item_object.other = {};
isaac_item_object.other.card = JSON.parse(JSON.stringify(isaac_items_json.other.card));

test_activated_data_object = JSON.parse(JSON.stringify(test_activated_data_json));
let myData = test_activated_data_object;

for(let key_id in myData) {
    let place = '';
    let description = '';

    // for(let i = 0; i < myData[key_id].place.length; i++) {
    //     if(myData[key_id].place.length == 1) {
    //         place += myData[key_id].place[i];
    //         continue;
    //     }
    //     place += myData[key_id].place[i] + ";"
    // }

    for(let i = 0; i < myData[key_id].description.length; i++) {
        if(myData[key_id].description.length == 1 || i+1 == myData[key_id].description.length) {
            description += myData[key_id].description[i];
            continue;
        }

        description += myData[key_id].description[i] + ";"
    }
}


test2_object = {
    activated: copyObj(skeleton_isaac_version),
    passive: copyObj(skeleton_isaac_version),
    accessory: copyObj(skeleton_isaac_version)
}

test_object = {
    activated: null,
    passive: null,
    accessory: null
}

for(let key_type in test2_object) {
    
}

for(let key_data in test_activated_data_json) {
    if(test_activated_data_json[key_data].version == 'original') {
        test2_object.activated[key_data] = test_activated_data_json[key_data]
    }
}

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

// const testObject = (jsonArrConcat(isaac_items_json.passive));

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
    version: isaac_version,             //버전
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

server.get('/popup/notice/site_beta', function(req, res) {
    res.sendFile(__dirname + "/public/popup/notice/site_beta.html")
});

server.post('/ajax_test', function (req, res) {
    console.log("req.body.color: " + req.body.color);
    let responseData = { signal: 'ok', color: req.body.color, test: test_activated_data_object, test_2: test2_object};
    
    //processing image
    for (let key_type in isaac_item_object) {
        for (let key_version in isaac_item_object[key_type]) {
            for (let key_id in isaac_item_object[key_type][key_version]) {
                isaac_item_object[key_type][key_version][key_id].img = path_isaac.img + path_isaac.item_type[key_type] + "/" + key_id + ".png";
            }
        }
    }

    let responseColor = { 
        activated: {},
        passive: {},
        accessory: {},
        other: {}
    }

    let i = 0;

    //분류 처리
    for (let key_type in isaac_item_object) {
        // console.log("key_type: " + key_type);
        
        for (let key_version in isaac_item_object[key_type]) {
            for(let key_data in isaac_item_object[key_type][key_version]) {
                
                if(i == 0) {
                    // console.log(isaac_item_object[key_type].original)
                    i++;
                }
                

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
    // console.log(responseColor)
    responseData.isaac_item = responseColor;

    res.json(responseData);
}); 