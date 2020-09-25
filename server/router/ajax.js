const Server = require("../modules/HttpServer");
const server = new Server();

const db_mysql = require("../database/db_mysql");
const connect = db_mysql.init();

connect.query('SHOW TABLES;', function (error, rows, fields) {
    console.log('data: ', rows);
})

const path_isaac = {
    img: "/static/img/isaac_items",
    json: "../../public/json/isaac_items",
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

// const skeleton_isaac_version = {
//     all: null,
//     original: null,
//     expansion_pack: null,
//     rebirth: null,
//     afterbirth: null,
//     afterbirth_plus: null,
//     booster_pack: null
// };

// const isaac_items_json = {
//     activated: copyObj(skeleton_isaac_version),
//     passive: copyObj(skeleton_isaac_version),
//     accessory: copyObj(skeleton_isaac_version)
// };

// const isaac_item_object = {
//     activated: copyObj(skeleton_isaac_version),
//     passive: copyObj(skeleton_isaac_version),
//     accessory: copyObj(skeleton_isaac_version)
// };

//json 파일들을 끍어 오는 반복문
// for (let key_type in isaac_items_json) {
//     for (let key_json in isaac_items_json[key_type]) {
//         isaac_items_json[key_type][key_json] = require(path_isaac.json + path_isaac.item_type[key_type] + "/" + key_json + ".json");
//     }
// }

// isaac_items_json.other = {};
// isaac_items_json.other.card = require(path_isaac.json + path_isaac.item_type.other + "/card.json")

// test_json = {
//     activated: null,
//     passive: null,
//     accessory: null
// }

// test_object = {
//     activated: null,
//     passive: null,
//     accessory: null
// }

// for (let key_type in test_json) {
//     test_json[key_type] = require(path_isaac.json + path_isaac.item_type[key_type] + "/all.json")
// }

// // console.log(test_json)
// let test_activated_data_json = require(path_isaac.json + path_isaac.item_type.activated + "/all.json")


// for (let key_type in isaac_item_object) {
//     for (let key_data in isaac_item_object[key_type]) {
//         isaac_item_object[key_type][key_data] = JSON.parse(JSON.stringify(isaac_items_json[key_type][key_data]));
//     }
// }


// isaac_item_object.other = {};
// isaac_item_object.other.card = JSON.parse(JSON.stringify(isaac_items_json.other.card));

// test_activated_data_object = JSON.parse(JSON.stringify(test_activated_data_json));

// test2_object = {
//     activated: copyObj(skeleton_isaac_version),
//     passive: copyObj(skeleton_isaac_version),
//     accessory: copyObj(skeleton_isaac_version)
// }

// test_object = {
//     activated: null,
//     passive: null,
//     accessory: null
// }

server.router.post('/test', function (req, res) {
    let request_version = null;

    if (req.body.version)
        request_version = req.body.version;

    console.log("req.body.color: " + req.body.color);

    // if (req.body.version)
        // console.log("req.body.version: " + req.body.version);

    let test = {};

    let jObj = {
        activated: {},
        accessory: {},
        other: {}
    }

    let responseData = { signal: 'ok', color: req.body.color, /*test: test_activated_data_object test_2: test2_object*/ promise_test: jObj, isaac_item: null };

    let test_data_us_1 = 0;
    let test_data_us_2 = 0;

    function selectDatas(i, data_type) {
        let select_query = ``;
        let table_data_type = '';
        let item_type = '';

        if(data_type == 'activated' || data_type == 'passive') {
            table_data_type = 'item_activated_passive'
            item_type = `('activated', 'passive')`;
        }
        else {
            table_data_type = 'item_' + data_type;
            item_type = `('${data_type}')`;
        }

        select_query = `SELECT * FROM ${table_data_type} where item_type in ${item_type}`;

        if(data_type != 'other')
            select_query += `AND item_version = '${request_version[i]}'`
        if(req.body.color != 'all')
            select_query += `AND item_color = '${req.body.color}'`;

        return new Promise((resolve) => {
            connect.query(select_query, function (err, rows, fields) {
    
                if (err) {
                    console.log(err);
                } else {
                    test_data_us_2++;
                    console.log("test_data_us_2: " + test_data_us_2)
                    // console.log(JSON.parse(JSON.stringify(rows)));
                    for(let i = 0; i < rows.length; i++) {
                        if(jObj[rows[i].item_type] == undefined) {
                            jObj[rows[i].item_type] = {};
                        }
                        jObj[rows[i].item_type][rows[i].item_id] = JSON.parse(JSON.stringify(rows[i]));
                        test[rows[i].item_id] = JSON.parse(JSON.stringify(rows[i]));
                    }

                    resolve(JSON.parse(JSON.stringify(rows)));
                }
    
            });

        })
    }

    selectAll();

    //processing image
    // for (let key_type in isaac_item_object) {
    //     for (let key_version in isaac_item_object[key_type]) {
    //         for (let key_id in isaac_item_object[key_type][key_version]) {
    //             isaac_item_object[key_type][key_version][key_id].img = path_isaac.img + path_isaac.item_type[key_type] + "/" + key_id + ".png";
    //         }
    //     }
    // }

    // let responseColor = {
    //     activated: {},
    //     passive: {},
    //     accessory: {},
    //     other: {}
    // }

    // let i = 0;

    //분류 처리
    // for (let key_type in isaac_item_object) {
    //     for (let key_version in isaac_item_object[key_type]) {
    //         for (let key_data in isaac_item_object[key_type][key_version]) {

    //             if (i == 0) {
    //                 i++;
    //             }


    //             if (req.body.color === "all") {
    //                 responseColor[key_type][key_data] = isaac_item_object[key_type][key_version][key_data];

    //                 continue;
    //             }

    //             if (isaac_item_object[key_type][key_version][key_data].color == req.body.color) {

    //                 responseColor[key_type][key_data] = isaac_item_object[key_type][key_version][key_data];
    //             }
    //         }

    //     }
    // }

    function setItemImage() {
        test_data_us_1++;
        console.log("test: " + test_data_us_1);

        return new Promise((resolve) => {
            // console.log(jObj);
            for(let data_type in jObj) {
                for(let data_id in jObj[data_type]) {
                    jObj[data_type][data_id].item_img = path_isaac.img + path_isaac.item_type[data_type] + "/" + data_id + ".png";
                }
            }
            resolve();
        });
    }

    async function selectAll() {
        console.log(req.body.version);
        
        for (let data_type in jObj) {
            for (let i = 0; i < request_version.length; i++) {
                await selectDatas(i, data_type);
            }
        }

        console.log("break");

        await setItemImage().then(()=> {
            responseData.isaac_item = jObj;
            res.json(responseData);
        });

    }

});

module.exports = server.router;