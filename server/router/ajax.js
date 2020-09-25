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

server.router.post('/test', function (req, res) {
    let request_version = null;

    if (req.body.version)
        request_version = req.body.version;

    console.log("req.body.color: " + req.body.color);

    let jObj = {
        activated: {},
        accessory: {},
        other: {}
    }

    let responseData = { signal: 'ok', color: req.body.color, promise_test: jObj, isaac_item: null };

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
                    //promise 추적
                    test_data_us_2++;
                    console.log("test_data_us_2: " + test_data_us_2)
                    
                    for(let i = 0; i < rows.length; i++) {
                        if(jObj[rows[i].item_type] == undefined) {
                            jObj[rows[i].item_type] = {};
                        }
                        jObj[rows[i].item_type][rows[i].item_id] = JSON.parse(JSON.stringify(rows[i]));
                    }

                    resolve();
                }
    
            });

        })
    }

    selectAll();

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

        await setItemImage().then(()=> {
            responseData.isaac_item = jObj;
            res.json(responseData);
        });

    }

});

module.exports = server.router;