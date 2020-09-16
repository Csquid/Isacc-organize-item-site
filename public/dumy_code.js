//app.js 30

/*

const json_issac_items = {
    activated: {
        all:             require(path_isaac.json + path_isaac.activated + "/all.json"),
        original:        require(path_isaac.json + path_isaac.activated + "/original.json"),
        expansion_pack:  require(path_isaac.json + path_isaac.activated + "/expansion_pack.json"),
        rebirth:         require(path_isaac.json + path_isaac.activated + "/rebirth.json"),
        afterbirth:      require(path_isaac.json + path_isaac.activated + "/afterbirth.json"),
        afterbirth_plus: require(path_isaac.json + path_isaac.activated + "/afterbirth_plus.json"),
        booster_pack:    require(path_isaac.json + path_isaac.activated + "/booster_pack.json")
    }
}

const isacc_item_object = {
    activated: {
        all:             JSON.parse(JSON.stringify(json_issac_items.activated.all)),
        original:        JSON.parse(JSON.stringify(json_issac_items.activated.original)),
        expansion_pack:  JSON.parse(JSON.stringify(json_issac_items.activated.expansion_pack)),
        rebirth:         JSON.parse(JSON.stringify(json_issac_items.activated.rebirth)),
        afterbirth:      JSON.parse(JSON.stringify(json_issac_items.activated.afterbirth)),
        afterbirth_plus: JSON.parse(JSON.stringify(json_issac_items.activated.afterbirth_plus)),
        booster_pack:    JSON.parse(JSON.stringify(json_issac_items.activated.booster_pack))
    },

    passive: {

    },
}

*/

/*
<!-- 액티브 아이템 -->
<div id="item-activated">
    <div class="item-type-menu-bar">액티브</div>
    <div class="item-content">
        <div id="all" class="color" style="display: block">
        </div>

        <div id="white" class="color" style="display: none">
        </div>

        <div id="red" class="color" style="display:none">
        </div>

        <div id="orange" class="color" style="display:none">
        </div>

        <div id="yellow" class="color" style="display:none">
        </div>

        <div id="green" class="color" style="display:none">
        </div>

        <div id="blue" class="color" style="display:none">
        </div>

        <div id="brown" class="color" style="display:none">
        </div>

        <div id="black" class="color" style="display:none">
        </div>
    </div>
</div>
<!-- 패시브 아이템 -->
<div id="item-passive">
    <div class="item-type-menu-bar">패시브</div>
    <div class="item-content">
        <div id="all" class="color" style="display: block">
        </div>

        <div id="white" class="color" style="display: none">
        </div>

        <div id="red" class="color" style="display:none">
        </div>

        <div id="orange" class="color" style="display:none">
        </div>

        <div id="yellow" class="color" style="display:none">
        </div>

        <div id="green" class="color" style="display:none">
        </div>

        <div id="blue" class="color" style="display:none">
        </div>

        <div id="brown" class="color" style="display:none">
        </div>

        <div id="black" class="color" style="display:none">
        </div>
    </div>
</div>
*/

// web.js 170
    // for (let key_version in isacc_item_object.activated) {
    //     for (let key_id in isacc_item_object.activated[key_version]) {
    //         isacc_item_object[key_version][key_id].img = path_isaac.img + path_isaac.item_type.activated + "/" + key_id + ".png";
    //     }
    // }


// web.js 183
        // for (let key in isacc_item_object.activated.original) {
    //     if (req.body.color === "all") {
    //         responseColor.length = isacc_item_object.activated.original.length;
    //         responseColor.data = isacc_item_object.activated.original;

    //         break;
    //     }

    //     if (isacc_item_object.activated.original[key].color == req.body.color) {
    //         responseColor.data[key] = isacc_item_object.activated.original[key];
    //         responseColor.length++;
    //     }
    // }

    //const testObject = jsonConcat(issac_items_json.passive.original, issac_items_json.passive.expansion_pack);

// for (let key_json in issac_items_json.activated) {
//     issac_items_json.activated[key_json] = require(path_isaac.json + path_isaac.item_type.activated + "/" + key_json + ".json");
// }


// for (let key_data in isacc_item_object.activated) {
//     isacc_item_object.activated[key_data] = JSON.parse(JSON.stringify(issac_items_json.activated[key_data]));
// }
