const Server = require("./server/modules/HttpServer");
const server = new Server();

const activated_img_path = "/img/isaac_items/activated/";
const isaac_version = {
    ORIGINAL: 1,
    EXPANSING_PACK: 2,
    REBIRTH: 3,
    AFTERBIRTH: 4,
    AFTERBIRTH_PLUS: 5
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

const isacc_item_object = {
    activated: {
        33: {
            name: "The Bible (성경)",
            color: "brown",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 그 방에서만 비행 효과를 얻는다", 
                "보스 Mom, Mom's Heart, It Lives!에게 사용시 보스 즉사",
                "단, Satan에게 사용시 캐릭터가 즉사"
            ],
        },
        34: {
            name: "Book of Belial (밸리알의 서)",
            color: "black",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 그 방에서 공력력이 2 증가한다.",
                "소지중일 때 악마방 등장 확률이 12.5% 증가한다.",
                ""
            ]
        },
        35: {
            name: "The Necronomicon (네크로노미콘)",
            color: "brown",
            cooldown: 6,
            condition_of_unlock: "타로카드 XIII-Death 4번 사용",
            version: isaac_version.ORIGINAL,
            description: ["사용시 그 방 전체 적에게 40의 피해를 준다."]
        },
        36: {
            name: "The Poop (똥)",
            color: "brown",
            cooldown: 1,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: []
        },
        37: {
            name: "Mr. Boom! (미스터 붐)",
            color: "black",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 Mr.Mega와 같은 커다란 폭탄을 설치한다."]
        },
        38: {
            name: "Tammy's Head (태미의 머리)",
            color: "white",
            cooldown: 1,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 10방향으로 데미지가 25 더 높은 눈물을 발사한다.",
                "눈물 종류가 폭탄/칼/혈사포/레이저라면 따라간다."
            ]
        },
        39: {
            name: "Mom's Bra (엄마의 브래지어)",
            color: "white",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 방 전체 적에게 4초간 석화 상태이상 효과를 건다.",
                "플레이어의 시각에 강렬한 피해를 준다."
            ]
        },
        40: {
            name: "Kamikaze! (카미카제!)",
            color: "red",
            cooldown: 0,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 폭발을 일으키고 체력 반 칸의 데미지를 입는다.",
                "폭탄에 효과를 주는 아이템에 영향을 받는다."
            ]
        },
        41: {
            name: "Mom's Pad (엄마의 생리대)",
            color: "white",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 방 전체 적에게 5초간 공포 상태이상 효과를 준다."]
        },
        42: {
            name: "Bob's Rotten Head (밥의 썩은 머리통)",
            color: "white",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 독 폭탄을 공격하는 방향으로 던진다. 맞은 적은 50의 피해와 독 상태이상을 입는다."]
        },
        44: {
            name: "Teleport (순간이동)",
            color: "blue",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 맵의 랜덤한 방으로 이동한다.",
                "악마방, 천사방, 에러방, 레트로 보물방으로 이동할 수 없다."
            ]
        },
        45: {
            name: "Yum Heart (맛있는 심장)",
            color: "red",
            cooldown: 4,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 빨간하트 하나를 얻는다."]
        },
        47: {
            name: "Doctor's Remote (박사의 원격 조종기)",
            color: "black",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 조준점이 생긴다.",
                "공격키로 조준점을 움직일 수 있으며 잠시 후 미사일이 타겟 위로 떨어진다.",
                "데미지는 현재 공격력의 20배로 Epic Fetus와 같다."
            ]
        },
        49: {
            name: "Shoop da whoop! (모두 다 사라져빔!!)",
            color: "red",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 공격키를 누른 방향으로 혈사포와 비슷한 레이저포를 발사한다.",
                "데미지는 공격력의 4배이다."
            ]
        },
        56: {
            name: "Lemon Mishap (레몬빛 사고)",
            color: "yellow",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 캐릭터 주위에 노란 장판을 깐다. 장판 위의 적은 틱당 22(초당 66)의 데미지를 입는다.",
                "(적이?)비행 상태라면 데미지를 입지 않는다."
            ]
        },
        58: {
            name: "Book of Shadow (그림자의 서)",
            color: "white",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 10초간 무적 방어막이 생긴다."]
        },
        65: {
            name: "Anarchist Cookbook (무정부주의자의 요리책)",
            color: "white",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 방 안의 무작위 위치에 트롤 폭탄 6개를 소환한다.",
                "폭탄에 적용되는 모든 시너지가 적용된다."
            ]
        },
        66: {
            name: "The Hourglass (모래시계)",
            color: "white",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 방 전체 적에게 8초간 둔화 상태이상 효과를 건다."]
        },
        77: {
            name: "My Little Unicorn (나의 작은 유니콘)",
            color: "white",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: []
        },
        78: {
            name: "Book of Revelations (요한계시록)",
            color: "brown",
            cooldown: 6,
            condition_of_unlock: "묵시록의 4기사 보스 첫번째 클리어",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 소울 하트 1개를 얻는다.",
                "소지중일 시 악마방 등장 확률이 17.5% 증가한다.",
                "한번 이상 사용시 그 스테이지의 보스가 묵시록의 4기사로 대체 될 확률이 높아진다.",

            ]
        },
        83: {
            name: "The Nail (대못)",
            color: "white",
            cooldown: 6,
            condition_of_unlock: "Azazel 캐릭터로 Boss Rush 클리어",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 소울 하트 1개를 얻는다.",
                "그 방에서만 데미지가 0.7 증가하며 이속이 0.18 감소하고 접촉하는 적에게 40의 데미지를 주며 장애물을 부술 수 있게 된다."
            ]
        },
        84: {
            name: "We Need to Go Deeper! (아래로 내려가자!)",
            color: "white",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 다음 스테이지로 넘어가는 문을 만든다.",
                "10% 확률로 레트로 보물방(블랙 마켓)으로 가는 문이 나온다.",

            ]
        },
        85: {
            name: "Deck of Cards (카드 덱)",
            color: "brown",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 랜덤한 카드를 드랍한다."]
        },
        86: {
            name: "Monstro's Tooth (몬스트로의 이빨)",
            color: "white",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 몬스트로가 방 안의 랜덤한 적에게 떨어져 120의 데미지를 입히고 주변의 장애물을 부순다.",
                "방안에 적이 없을 경우 캐릭터에게 떨어진다."
            ]
        },
        93: {
            name: "The Gamekid (게임키드)",
            color: "white",
            cooldown: 6,
            condition_of_unlock: "오락실 10회 입장",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 6초간 무적이 되며 눈물을 발사할 수 없지만, 접촉한 적에게 초당 1회 40의 데미지를 입힌다.",
                "무적이 된 동안 적들은 공포 상태이상 효과에 걸리며 적을 2명씩 죽일 때 마다 빨간하트 반칸을 회복한다."
            ]
        },
        97: {
            name: "The Book of Sin (죄악의 서)",
            color: "black",
            cooldown: 4,
            condition_of_unlock: "7대죄악 미니보스 모두 처치",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 랜덤한 픽업 아이템 하나를 드랍한다."]
        },
        102: {
            name: "Mom's Bottle of Pills (엄마의 약병)",
            color: "orange",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 랜덤한 알약 하나를 드랍한다."]
        },
        105: {
            name: "The D6 (6면 주사위)",
            color: "red",
            cooldown: 6,
            condition_of_unlock: "??? 캐릭터로 Cathedral 스테이지의 보스 Isaac 클리어",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 방 안의 모든 액티브/패시브 아이템을 현재 방 배열의 아이템으로 바꾼다.",
                "상점이나 악마방에서 판매중인 아이템에도 해당된다.",

            ]
        },
        107: {
            name: "The Pinking Shears (핑킹 가위)",
            color: "white",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 그 방에서 몸과 머리가 분리된다.",
                "머리는 비행 효과를 가지며 조종할 수 있고 몸은 적에게 접촉해 초당 82.5의 피해를 입힌다",
                "몸의 이동속도는 캐릭터의 속도 스탯에 비례한다."
            ]
        },
        111: {
            name: "The Bean (콩)",
            color: "",
            cooldown: 1,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 독방귀를 뀌어 주위의 적들에게 6틱의 중독 상태이상 효과를 준다."]
        },
        123: {
            name: "Monster Manual (몬스터 도감)",
            color: "brown",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 그 방에서만 랜덤 패밀리어 하나를 소환한다."]
        },
        124: {
            name: "Dead Sea Scrolls (사해문서)",
            color: "white",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: ["사용 시 랜덤한 액티브 아이템의 효과를 발동시킨다."]
        },
        126: {
            name: "Razor Blade (면도칼)",
            color: "white",
            cooldown: 0,
            condition_of_unlock: "Eve 캐릭터로 Sheol 스테이지의 보스 Satan 클리어",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 피 한 칸을 깎고 그 방에서 공격력 1.2를 증가시킨다.",
                "그리드 기부 기계에 439원 기부시 Eve가 들고 시작한다.",
                "Ultra Greed 스테이지 보스방에서 사용시 적에게 피격을 받는것과 같이 2~4개의 동전을 잃고 1~3개의 동전을 드랍한다."
            ]
        },
        127: {
            name: "Forget me now (잊어줘 알약)",
            color: "white",
            cooldown: -1,
            condition_of_unlock: "??? 캐릭터로 Sheol 스테이지의 보스 Satan 클리어",
            version: isaac_version.ORIGINAL,
            description: [
                "사용 시 그 스테이지를 다시 시작한다.",
                "진행상태는 사라지지 않지만 방 구조, 드랍 아이템, 악마방 확률 등은 새 스테이지 시작한 것 처럼 재배열된다."
            ]
        },
        130: {
            name: "A Pony (조랑말)",
            color: "black",
            cooldown: 4,
            condition_of_unlock: "",
            version: isaac_version.ORIGINAL,
            description: []
        },
        133: {
            name: "Guppy's Paw (구피의 발)",
            color: "black",
            cooldown: 0,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "최대 하트 1칸을 소울 하트 3개로 바꾼다.",
                "하트가 아예 없는 '???' 는 사용할 수 없다."
            ]
        },
        135: {
            name: "IV Bag (수혈팩)",
            color: "red",
            cooldown: 0,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: ["하트 반 칸을 깎아서 동전 1개를 생성한다."]
        },
        136: {
            name: "Best Friend (최고의 친구)",
            color: "red",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: ["적을 유인하며 설치한 뒤 5초 후에 폭발하며 110의 폭발 데미지를 주는 미끼 인형을 생성한다."]
        },
        137: {
            name: "Remote Detonator (원격 폭파기)",
            color: "red",
            cooldown: 0,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "폭탄 5개를 얻음과 동시에 폭탄이 알아서 터지지 않고 이 아이템을 사용해야만 터지게 된다.",

            ]
        },
        145: {
            name: "Guppy's Head (구피의 머리)",
            color: "black",
            cooldown: 0,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: []
        },
        146: {
            name: "Prayer Card (기도자 카드)",
            color: "yellow",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "이터널 하트를 생성한다",
                "이터널 하트를 2개 얻거나 1개를 지닌 상태에서 다음 플로어로 이동하면 하트가 1칸 늘어난다."
            ]
        },
        147: {
            name: "Notched Axe (각진 곡괭이)",
            color: "white",
            cooldown: 3,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "사용하는 동안 돌 위로 이동하여 부술 수 있다.",
                "스페이스바를 다시 누르거나 피해를 입으면 발동이 취소된다.",
                "발동한 상태로 벽을 쭉 긁으면 비밀 방을 발견할 수도 있다."
            ]
        },
        158: {
            name: "Crystal Ball (수정 구슬)",
            color: "white",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: ["일급 비밀방을 제외한 현재 층의 맵을 밝히고 추가로 소울 하트 또는 타로 카드/룬 1개를 준다. 확률은 동일한 50%."]
        },
        160: {
            name: "Crack the Sky (하늘을 가르다)",
            color: "white",
            cooldown: 4,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "5개의 빛의 기둥을 불러내 0.8초동안 접촉하는 적에게 현재 데미지+20의 피해를 준다.",
                "빛은 무작위로 생성되지만 적에게 직접 맞을 확률이 높다."
            ]
        },
        164: {
            name: "The Candle (양초)",
            color: "blue",
            cooldown: 4,
            condition_of_unlock: "상점의 기부 기계에 900원을 기부",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "푸른 불꽃을 내뿜어 맞는 적에게 틱당 23의 피해를 입히고 2초 뒤에 사라진다 -> 최대 184의 데미지를 줄 수 있다.",
                "불꽃에는 적의 발사체를 지우는 효과가 있다."
            ]
        },
        166: {
            name: "D20 (20면 주사위)",
            color: "red",
            cooldown: 6,
            condition_of_unlock: "isaac 캐릭터로 chest 스테이지에서 ??? 보스 클리어",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "방 안에 있는 소비성 아이템을 무작위로 바꾼다",
                "소비성 아이템(알약, 장신구, 카드, 금화, 폭탄, 열쇠, 상자, 열린 상자)들이 상자로도 바뀌기 때문에 상당히 좋다",

            ]
        },
        171: {
            name: "Spider Butt (거미의 궁둥이)",
            color: "black",
            cooldown: 0,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: ["적 전체에게 10의 데미지와 동시에 4초간 슬로우를 건다."]
        },
        175: {
            name: "Dad's Key (아빠의 열쇠)",
            color: "white",
            cooldown: 2,
            condition_of_unlock: "천사 Uriel 과 Gabriel 을 처치하여 Key Piece 1과 2를 모두 획득하여 황금 열쇠를 완성",
            version: isaac_version.EXPANSING_PACK,
            description: ["대부분의 닫힌문을 열 수 있다."]
        },
        177: {
            name: "Portable Slot (휴대용 슬롯 머신)",
            color: "red",
            cooldown: 0,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: ["휴대용 슬롯 머신. 나오는 아이템도 일반 슬롯 머신과 거의 동일하지만(a dollar 가 등장하지 않음) 터질 염려는 없다."]
        },
        181: {
            name: "White Pony (흰 조랑말)",
            color: "white",
            cooldown: 6,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "이 아이템을 소유하고 있다면 비행 효과와 함께 캐릭터의 이동 속도가 1.5 밑으로 떨어지지 않게 된다.",
                "사용 시 돌격해서 적에게 40의 피해를 주고 Crack the Sky 와 같은 효과가 발동 한다.",
                "돌격 상태일 때만 무적 상태가 된다."
            ]
        },
        186: {
            name: "Blood Rights (피의 권리)",
            color: "red",
            cooldown: 0,
            condition_of_unlock: "Samson 캐릭터로 Sheol 스테이지에서 Satan 보스 클리어",
            version: isaac_version.EXPANSING_PACK,
            description: [
                "빨간 하트를 우선으로 1칸을 소비하여 방 안에 있는 적 모두에게 40의 고정피해를 입힌다.",
                "피격시 무적인 상태·Holy Mantle 은 무시하고 데미지를 입으니 조심하는 것이 좋다."
            ]
        },
        192:{
            name: "Telepathy for Dummies (텔레파시 입문서)",
            color: "yellow",
            cooldown: 2,
            condition_of_unlock: "",
            version: isaac_version.EXPANSING_PACK,
            description: ["사용한 방 에서만 유지되는 유도눈물효과가 생긴다"]
        },


    },
    passive: {

    }
}

server.listen(3000, function() {
    console.log("start! express server on port 3000");
});

server.get('/', function(req, res) {
    res.sendFile("/client/index.html");
})

server.post('/ajax_test', function(req, res) {
    console.log("req.body.color: " + req.body.color);
    let responseData = { signal: 'ok', data: req.body.color };

    for(let key in isacc_item_object.activated) {
        isacc_item_object.activated[key].id = Number(key);
        isacc_item_object.activated[key].img = activated_img_path + key + ".png";
    }

    console.log(isacc_item_object);

    res.json(responseData);
}); 