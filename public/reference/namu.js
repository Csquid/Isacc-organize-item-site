const isaac_version = {
    ORIGINAL: 3,
    EXPANSION_PACK: 4, 
    REBIRTH: 5,
    AFTERBIRTH: 6, 
    AFTERBIRTH_PLUS: 7,
    BOOSTER_PACK_1: 8,
    BOOSTER_PACK_2: 9,
    BOOSTER_PACK_3: 10,
    BOOSTER_PACK_4: 11,
    BOOSTER_PACK_5: 12,
    3: "ORIGINAL",
    4: "EXPANSION_PACK",
    5: "REBIRTH",
    6: "AFTERBIRTH",
    7: "AFTERBIRTH_PLUS",
    8: "BOOSTER_PACK_1",
    9: "BOOSTER_PACK_2",
    10: "BOOSTER_PACK_3",
    11: "BOOSTER_PACK_4",
    12: "BOOSTER_PACK_5"
}

let searchData = isaac_version.ORIGINAL;

let httpCollection = null;

if(document.querySelectorAll(".wiki-heading-content")[searchData].children[0].children[0] == undefined)
    httpCollection = document.querySelectorAll(".wiki-heading-content")[searchData].children[1].children[0].children[0].children;
else 
    httpCollection = document.querySelectorAll(".wiki-heading-content")[searchData].children[0].children[0].children[0].children;

let maxLength = httpCollection.length / 9
let arrayDatas = Array.prototype.slice.call(httpCollection);
let divideArray = [];
let isaac_datas_obj = {};

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

const namu_skeleton_table_object = {
    name: "",
    img: "",
    id: 0,
    script: "",
    cooldown: "",
    unlock: "",
    place: "",
    description: "",
    Synergy: ""
}

for (let i = 0; i < maxLength; i++) {
    divideArray[i] = arrayDatas.slice(0, 9);
    arrayDatas.splice(0, 9);
}

for (let i = 0; i < maxLength; i++) {
    nData_id = divideArray[i][2].children[1].children[0].children[0].innerText;

    isaac_datas_obj[nData_id] = {};
    isaac_datas_obj[nData_id].cool_down = divideArray[i][4].children[1].children[0].innerText.trim();
}

console.log(JSON.stringify(isaac_datas_obj));