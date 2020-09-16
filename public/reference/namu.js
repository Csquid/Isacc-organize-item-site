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

let searchData = isaac_version.BOOSTER_PACK_2;

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

    isaac_datas_obj[nData_id].color         = "";
    isaac_datas_obj[nData_id].name          = divideArray[i][0].children[1].children[0].children[0].innerText;
    isaac_datas_obj[nData_id].id            = nData_id;
    isaac_datas_obj[nData_id].cool_down     = divideArray[i][4].children[1].children[0].innerText.replace("칸", "").trim();
    isaac_datas_obj[nData_id].unlock        = divideArray[i][5].children[1].children[0].innerText.replace(", ", "");
    isaac_datas_obj[nData_id].place         = divideArray[i][6].children[1].children[0].innerText.replace(/\n/g, "").split(", ");
    isaac_datas_obj[nData_id].description   = divideArray[i][7].children[1].children[0].textContent.split(".");
    isaac_datas_obj[nData_id].version       = searchData;

    for(let j = 0; j < isaac_datas_obj[nData_id].description.length; j++) {
        if(isaac_datas_obj[nData_id].description[j] == "") {
            //만약 설명 부분ㅂ
            isaac_datas_obj[nData_id].description.splice(j, 1);
            continue;
        }
    
        isaac_datas_obj[nData_id].description[j] = isaac_datas_obj[nData_id].description[j].trim();
    }
}

console.log(JSON.stringify(isaac_datas_obj));

let test_obj = {

    "33": {
        "name": "The Bible (성경)",
        "id": "33",
        "cool_down": "6",
        "unlock": "-",
        "place": [
            "천사방",
            "\n책방",
            "\n상점방"
        ],
        "description": [
            "사용 시 그 방에서만 비행 효과를 얻는다",
            "\n보스 Mom, Mom's Heart, It Lives!에게 사용시 보스 즉사",
            "\n단, Satan에게 사용시 캐릭터가 즉사한다",
            "\n엄마 즉사 효과 외에는 활용도가 낮은 아이템",
            "\n판도라의 상자를 Womb 2에서 사용시 획득할 수 있다",
            "\nBook Worm과 Seraphim 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "34": {
        "name": "Book of Belial (밸리알의 서)",
        "id": "34",
        "cool_down": "3",
        "unlock": "-",
        "place": [
            "악마방",
            "\n책방",
            "\n그리드모드 악마방",
            "\n그리드모드 책방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 그 방에서 공력력이 2 증가한다",
            "\n소지중일 때 악마방 등장 확률이 12",
            "5% 증가한다",
            "\nJudas가 갖고 시작한다",
            "\nXV - The Devil 카드와 효과가 중복되지 않는다",
            "\nBook Worm 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "35": {
        "name": "The Necronomicon (네크로노미콘)",
        "id": "35",
        "cool_down": "6",
        "unlock": "타로카드 XIII-Death 4번 사용",
        "place": [
            "악마방",
            "\n책방",
            "\n비밀방",
            "\n그리드모드 악마방",
            "\n그리드모드 책방",
            "\n보물방"
        ],
        "description": [
            "사용시 그 방 전체 적에게 40의 피해를 준다",
            "\nBook Worm 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "36": {
        "name": "The Poop (똥)",
        "id": "36",
        "cool_down": "1",
        "unlock": "-",
        "place": [
            "보물방"
        ],
        "description": [
            "사용 시 똥을 싸면서 주위의 적을 밀쳐낸다",
            "\n???이 갖고 시작한다",
            "\nOh Crap 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "37": {
        "name": "Mr. Boom! (미스터 붐)",
        "id": "37",
        "cool_down": "2",
        "unlock": "-",
        "place": [
            "보물방",
            "\n폭탄 거지",
            "\n그리드모드 보물방",
            "\nWrath 미니보스"
        ],
        "description": [
            "사용 시 Mr",
            "Mega와 같은 커다란 폭탄을 설치한다",
            ""
        ]
    },
    "38": {
        "name": "Tammy's Head (태미의 머리)",
        "id": "38",
        "cool_down": "1",
        "unlock": "-",
        "place": [
            "황금상자",
            "\n그리드모드 황금상자",
            "\n보물방"
        ],
        "description": [
            "사용 시 10방향으로 데미지가 25 더 높은 눈물을 발사한다",
            "\n눈물 종류가 폭탄/칼/혈사포/레이저라면 따라간다",
            ""
        ]
    },
    "39": {
        "name": "Mom's Bra (엄마의 브래지어)",
        "id": "39",
        "cool_down": "3",
        "unlock": "-",
        "place": [
            "보물방",
            "\n엄마의 화장대"
        ],
        "description": [
            "사용 시 방 전체 적에게 4초간 석화 상태이상 효과를 건다",
            " 플레이어의 시각에 강렬한 피해를 준다\nYes Mother? 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "40": {
        "name": "Kamikaze! (카미카제!)",
        "id": "40",
        "cool_down": "무제한",
        "unlock": "-",
        "place": [
            "보물방"
        ],
        "description": [
            "사용 시 폭발을 일으키고 체력 반 칸의 데미지를 입는다",
            "\n폭탄에 효과를 주는 아이템에 영향을 받는다",
            ""
        ]
    },
    "41": {
        "name": "Mom's Pad (엄마의 생리대)",
        "id": "41",
        "cool_down": "3",
        "unlock": "-",
        "place": [
            "보물방",
            "\n엄마의 화장대"
        ],
        "description": [
            "사용 시 방 전체 적에게 5초간 공포 상태이상 효과를 준다",
            "\nYes Mother? 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "42": {
        "name": "Bob's Rotten Head (밥의 썩은 머리통)",
        "id": "42",
        "cool_down": "3",
        "unlock": "-",
        "place": [
            "황금상자",
            "\n보물방",
            "\n그리드모드 황금상자",
            "\n그리드모드 보물방",
            "\nSloth 미니보스"
        ],
        "description": [
            "사용 시 독 폭탄을 공격하는 방향으로 던진다",
            " 맞은 적은 50의 피해와 독 상태이상을 입는다",
            "\nBob 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "44": {
        "name": "Teleport (순간이동)",
        "id": "44",
        "cool_down": "2",
        "unlock": "-",
        "place": [
            "보물방"
        ],
        "description": [
            "사용 시 맵의 랜덤한 방으로 이동한다",
            "\n악마방, 천사방, 에러방, 레트로 보물방으로 이동할 수 없다",
            ""
        ]
    },
    "45": {
        "name": "Yum Heart (맛있는 심장)",
        "id": "45",
        "cool_down": "4",
        "unlock": "-",
        "place": [
            "보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 빨간하트 하나를 얻는다",
            "\nMagdalene이 갖고 시작한다",
            "\nKeeper로 사용시 동전하트가 하나 회복되지만, 아군 파리는 생성되지 않는다",
            ""
        ]
    },
    "47": {
        "name": "Doctor's Remote (박사의 원격 조종기)",
        "id": "47",
        "cool_down": "2",
        "unlock": "-",
        "place": [
            "보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 조준점이 생긴다",
            " 공격키로 조준점을 움직일 수 있으며 잠시 후 미사일이 타겟 위로 떨어진다",
            "\n데미지는 현재 공격력의 20배로 Epic Fetus와 같다",
            ""
        ]
    },
    "49": {
        "name": "Shoop da whoop!",
        "id": "49",
        "cool_down": "2",
        "unlock": "-",
        "place": [
            "보물방",
            "\nEnvy 미니보스"
        ],
        "description": [
            "사용 시 공격키를 누른 방향으로 혈사포와 비슷한 레이저포를 발사한다",
            " 데미지는 공격력의 4배이다",
            ""
        ]
    },
    "56": {
        "name": "Lemon Mishap (레몬빛 사고)",
        "id": "56",
        "cool_down": "2",
        "unlock": "-",
        "place": [
            "보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 캐릭터 주위에 노란 장판을 깐다",
            " 장판 위의 적은 틱당 22(초당 66)의 데미지를 입는다",
            "\n비행 상태라면 데미지를 입지 않는다",
            ""
        ]
    },
    "58": {
        "name": "Book of Shadow (그림자의 서)",
        "id": "58",
        "cool_down": "3",
        "unlock": "-",
        "place": [
            "책방",
            "\n보물방",
            "\n그리드모드 책방"
        ],
        "description": [
            "사용 시 10초간 무적 방어막이 생긴다",
            "\nBook Worm 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "65": {
        "name": "Anarchist Cookbook",
        "id": "65",
        "cool_down": "3",
        "unlock": "-",
        "place": [
            "책방",
            "\n보물방",
            "\n그리드모드 책방",
            "\n그리드모드 보물방",
            "\nPride 미니보스"
        ],
        "description": [
            "사용 시 방 안의 무작위 위치에 트롤 폭탄 6개를 소환한다",
            "\n폭탄에 적용되는 모든 시너지가 적용된다",
            "\nBook Worm 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "66": {
        "name": "The Hourglass (모래시계)",
        "id": "66",
        "cool_down": "2",
        "unlock": "-",
        "place": [
            "보물방"
        ],
        "description": [
            "사용 시 방 전체 적에게 8초간 둔화 상태이상 효과를 건다",
            ""
        ]
    },
    "77": {
        "name": "My Little Unicorn (나의 작은 유니콘)",
        "id": "77",
        "cool_down": "6",
        "unlock": "-",
        "place": [
            "보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 6초간 무적이 되며 눈물을 발사할 수 없지만, 접촉하는 적에게 40의 데미지를 준다",
            ""
        ]
    },
    "78": {
        "name": "Book of Revelations (요한계시록)",
        "id": "78",
        "cool_down": "6",
        "unlock": "묵시록의 4기사[4] 보스 첫번째 클리어",
        "place": [
            "책방",
            "\n보물방",
            "\n그리드모드 천사방",
            "\n그리드모드 책방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 소울 하트 1개를 얻는다",
            "\n한번 이상 사용시 그 스테이지의 보스가 묵시록의 4기사로 대체 될 확률이 높아진다",
            "\nMom, Mom's Heart(+It Lives)는 대체 되지 않는다",
            "\nDouble Trouble 또는 Mr",
            " Fred 같이 보스방의 크기가 2칸 이상이면 대체 되지 않는다",
            "\n소지중일 시 악마방 등장 확률이 17",
            "5% 증가한다",
            "\nBook Worm 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "83": {
        "name": "The Nail (대못)",
        "id": "83",
        "cool_down": "6",
        "unlock": "Azazel 캐릭터로 Boss Rush 클리어",
        "place": [
            "악마방",
            "\n그리드모드 악마방"
        ],
        "description": [
            "사용 시 소울 하트 1개를 얻는다",
            "\n그리고 그 방에서만 데미지가 0",
            "7 증가하며 이속이 0",
            "18 감소하고 접촉하는 적에게 40의 데미지를 주며 장애물을 부술 수 있게 된다",
            "\n변신상태서 피격시 악마의 굵은 목소리가 나온다",
            "\nLeviathan 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "84": {
        "name": "We Need to Go Deeper! (아래로 내려가자!)",
        "id": "84",
        "cool_down": "6",
        "unlock": "-",
        "place": [
            "악마방",
            "\n비밀방",
            "\n상점방"
        ],
        "description": [
            "사용 시 다음 스테이지로 넘어가는 문을 만든다",
            "\n10% 확률로 레트로 보물방(블랙 마켓)으로 가는 문이 나온다",
            "\n허쉬스테이지,Sheol/Chthedral 이상 스테이지에서는 사용할 수 없다",
            " 8스테이지에서 사용 시 무조건 Sheol로 가는 문이 열린다",
            "\nThe Forgotten 언락 후 Dark Room의 땅무더기 위에서 사용하면 랜덤한 상자가 나온다",
            ""
        ]
    },
    "85": {
        "name": "Deck of Cards (카드 덱)",
        "id": "85",
        "cool_down": "6",
        "unlock": "-",
        "place": [
            "상점방",
            "\n보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 랜덤한 카드를 드랍한다",
            ""
        ]
    },
    "86": {
        "name": "Monstro's Tooth (몬스트로의 이빨)",
        "id": "86",
        "cool_down": "3",
        "unlock": "2스테이지 처음 클리어",
        "place": [
            "보물방"
        ],
        "description": [
            "사용 시 몬스트로가 방 안의 랜덤한 적에게 떨어져 120의 데미지를 입히고 주변의 장애물을 부순다",
            "\n방안에 적이 없을 경우 캐릭터에게 떨어진다",
            "\n엄마발과 같이 폭발로 취급 되므로 Pyromaniac, Host Hat이 있으면 데미지를 받지 않는다",
            " 비밀방을 여는데 사용할 수도 있다",
            ""
        ]
    },
    "93": {
        "name": "The Gamekid (게임키드)",
        "id": "93",
        "cool_down": "6",
        "unlock": "오락실 10회 입장",
        "place": [
            "보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 6초간 무적이 되며 눈물을 발사할 수 없지만, 접촉한 적에게 초당 1회 40의 데미지를 입힌다",
            "\n무적이 된 동안 적들은 공포 상태이상 효과에 걸리며 적을 2명씩 죽일 때 마다 빨간하트 반칸을 회복한다",
            ""
        ]
    },
    "97": {
        "name": "The Book of Sin (죄악의 서)",
        "id": "97",
        "cool_down": "4",
        "unlock": "7대죄악 미니보스 모두 처치",
        "place": [
            "악마방",
            "\n책방",
            "\n보물방",
            "\n그리드모드 악마방",
            "\n그리드모드 책방",
            "\n보물방"
        ],
        "description": [
            "사용 시 랜덤한 픽업 아이템 하나를 드랍한다",
            "\nBook Worm 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "102": {
        "name": "Mom's Bottle of Pills (엄마의 약병)",
        "id": "102",
        "cool_down": "6",
        "unlock": "-",
        "place": [
            "거지",
            "\n악마 거지",
            "\n상점방",
            "\n보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 랜덤한 알약 하나를 드랍한다",
            "\nYes Mother? 변신 세트 아이템 중 하나이다",
            ""
        ]
    },
    "105": {
        "name": "The D6 (6면 주사위)",
        "id": "105",
        "cool_down": "6",
        "unlock": "??? 캐릭터로 Cathedral 스테이지의 보스 Isaac 클리어",
        "place": [
            "보물방",
            "\n그리드모드 상점방"
        ],
        "description": [
            "사용 시 방 안의 모든 액티브/패시브 아이템을 현재 방 배열의 아이템으로 바꾼다",
            "\n상점이나 악마방에서 판매중인 아이템에도 해당된다",
            "\n언락 시 Isaac이 갖고 시작한다",
            ""
        ]
    },
    "107": {
        "name": "The Pinking Shears (핑킹 가위)",
        "id": "107",
        "cool_down": "6",
        "unlock": "-",
        "place": [
            "보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 그 방에서 몸과 머리가 분리된다",
            "\n머리는 비행 효과를 가지며 조종할 수 있고 몸은 적에게 접촉해 초당 82",
            "5의 피해를 입힌다",
            "최강의 패밀리어\n몸의 이동속도는 캐릭터의 속도 스탯에 비례한다",
            ""
        ]
    },
    "111": {
        "name": "The Bean (콩)",
        "id": "111",
        "cool_down": "1",
        "unlock": "-",
        "place": [
            "거지",
            "\n보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 독방귀를 뀌어 주위의 적들에게 6틱의 중독 상태이상 효과를 준다",
            ""
        ]
    },
    "123": {
        "name": "Monster Manual (몬스터 도감)",
        "id": "123",
        "cool_down": "3",
        "unlock": "-",
        "place": [
            "보물방",
            "\n그리드모드 책방"
        ],
        "description": [
            "사용 시 그 방에서만 랜덤 패밀리어 하나를 소환한다",
            "\n\n소환되는 패밀리어 목록【펼치기 · 접기】\n* ???'s Only Friend\n* Ball of Bandages\n* Big Fan Big Fan\n* Bob's Brain\n* Brother Bobby\n* Cube of Meat\n* Demon Baby\n* Distant Admiration\n* Dry Baby\n* Forever Alone\n* Gemini\n* Guardian Angel\n* Halo of Flies\n* Headless Baby\n* Juicy Sack\n* Leech\n* Lil' Brimstone\n* Lil Haunt\n* Little Chubby\n* Little Gish\n* Little Steven\n* Robo-Baby 2",
            "0\n* Robo-Baby\n* Rotten Baby\n* Sissy Longlegs\n* Sister Maggy\n* Smart Fly\nBook Worm 변신 세트 아이템 중 하나이다",
            "책인데도 불구하고 일반모드 책방에서 유일하게 안나온다",
            ""
        ]
    },
    "124": {
        "name": "Dead Sea Scrolls (사해문서)",
        "id": "124",
        "cool_down": "2",
        "unlock": "-",
        "place": [
            "천사방",
            "\n보물방",
            "\n그리드모드 보물방"
        ],
        "description": [
            "사용 시 랜덤한 액티브 아이템의 효과를 발동시킨다",
            "\n\n발동되는 아이템 목록【펼치기 · 접기】\n* Anarchist Cookbook\n* Bob's Rotten Head\n* The Book of Belial\n* Book of Revelations\n* Book of Shadows\n* The Book of Sin\n* Crack the Sky\n* Deck of Cards\n* Explosive Diarrhea 알약\n* The Gamekid\n* The Hourglass\n* Kamikaze!\n* Lemon Mishap\n* Lemon Party 알약\n* Mom's Bottle of Pills\n* Mom's Bra\n* Monstro's Tooth\n* Mr",
            " Boom\n* My Little Unicorn\n* The Nail\n* The Pinking Shears\n* Satanic Bible\n* Shoop Da Whoop!\n* Tammy's Head\n* Teleport Teleport\n* We Need to Go Deeper!\n* Yum Heart\n* Wooden Nickel"
        ]
    },
    "126": {
        "name": "Razor Blade (면도칼)",
        "id": "126",
        "cool_down": "무제한",
        "unlock": "Eve 캐릭터로 Sheol 스테이지의 보스 Satan 클리어",
        "place": [
            "악마방"
        ],
        "description": [
            "사용 시 피 한 칸을 깎고 그 방에서 공격력 1",
            "2를 증가시킨다",
            "\n그리드 기부 기계에 439원 기부시 Eve가 들고 시작한다",
            "\nUltra Greed 스테이지 보스방에서 사용시 적에게 피격을 받는것과 같이 2~4개의 동전을 잃고 1~3개의 동전을 드랍한다",
            ""
        ]
    },
    "127": {
        "name": "Forget me now (잊어줘 알약)",
        "id": "127",
        "cool_down": "일회용",
        "unlock": "??? 캐릭터로 Sheol 스테이지의 보스 Satan 클리어",
        "place": [
            "비밀방",
            "\n보물방"
        ],
        "description": [
            "사용 시 그 스테이지를 다시 시작한다",
            "\n진행상태는 사라지지 않지만 방 구조, 드랍 아이템, 악마방 확률 등은 새 스테이지 시작한 것 처럼 재배열된다",
            "\nXL 저주를 받았을때 사용하면 두개의 스테이지로 나눠질 수 있다",
            "\n메가사탄방의 문을 황금열쇠로 연 후, 아이템을 사용하면 황금열쇠가 돌아오지 않아 메가사탄방에 들어가지 못한다",
            ""
        ]
    },
    "130": {
        "name": "A Pony (조랑말)",
        "id": "130",
        "cool_down": "4",
        "unlock": "-",
        "place": [
            "Headless Horseman 보스"
        ],
        "description": [
            "소지시 비행 능력을 얻고, 이속이 1",
            "5 밑으로 떨어지지 않는다",
            "\n사용시 캐릭터가 바라보는 방향으로 돌진하며 접촉한 적에게 40의 피해를 준다",
            " 돌진중에는 무적",
            ""
        ]
    }

}

// divideArray[0][0].children[1].children[0].children[0].textContent              = Name (이름)
// divideArray[0][2].children[1].children[0].children[0].textContent              = ID   (아이디)
// divideArray[0][3].children[1].children[0].textContent                          = Script (대사)
// divideArray[0][4].children[1].children[0].innerText.replace("칸", "").trim()   = cool down (쿨타임)
// divideArray[0][5].children[1].children[0].textContent                          = unlock (언락 조건)
// divideArray[0][6].children[1].children[0].innerText.split(", ").replace(/\n/g, "");              = place (등장 장소)
// divideArray[0][7].children[1].children[0].textContent.split(".").trim()                          = dscription (설명)



let namu_skeleton_table_object = {
    0: "name",
    1: "img",
    2: "id",
    3: "script",     //대사
    4: "cool down", //쿨타임
    5: "unlock",    //언락 조건
    6: "place",      //등장 장소
    7: "description", //설명
    8: "Synergy"    //시너지 효과
}
