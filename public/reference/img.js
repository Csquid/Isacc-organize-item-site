let searchData = 16;

let httpCollection = null;

httpCollection = document.querySelectorAll(".wiki-heading-content")[searchData].children[1].children[0].children[0].children;

let column = 6;
let maxLength = httpCollection.length / column
let arrayDatas = Array.prototype.slice.call(httpCollection);
let divideArray = [];
let isaac_datas_obj = {};


for (let i = 0; i < maxLength; i++) {
    divideArray[i] = arrayDatas.slice(0, column);
    arrayDatas.splice(0, column);
}

for (let i = 0; i < maxLength; i++) {
    let nData_id = divideArray[i][2].children[1].children[0].children[0].innerText;

    isaac_datas_obj[nData_id] = {};
    isaac_datas_obj[nData_id].img_url_1  = divideArray[i][1].children[1].children[0].children[0].children[0].children[0].children[1].src
    if(divideArray[i][1].children[1].children[0].children[1] != undefined)
        isaac_datas_obj[nData_id].img_url_2  = divideArray[i][1].children[1].children[0].children[1].children[0].children[0].children[1].src
}

console.log(JSON.stringify(isaac_datas_obj));

expansion_pack
rebirth
afterbirth
afterbirth_pack
// ORIGINAL: 3,
// EXPANSING_PACK: 4,
// REBIRTH: 5,
// AFTERBIRTH: 6,
// AFTERBIRTH_PLUS: 7,