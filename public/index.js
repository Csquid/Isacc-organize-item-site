//(아이템 코드, 룬 추가,  언락)
let test = 0;

window.onload = function () {
    const top_logo_img = document.querySelector('#top-logo-img');
    const tabNavColors = document.querySelectorAll('.tab-color');
    const sidebar_item_information = document.querySelector('#item-information');

    
    let item_content_colors_all = null;
    let tabContentColors = null;
    let data_set_type = null;
    let resultData = null;
    
    const tab_content_item_type = {
        activated: {
            element: document.querySelector('#item-activated'),
            kr_name: "액티브"
        },
        passive: {
            element: document.querySelector('#item-passive'),
            kr_name: "패시브"
        },
        accessory: {
            element: document.querySelector('#item-accessory'),
            kr_name: "장신구"
        },
        other: {
            element: document.querySelector('#item-other'),
            kr_name: "기타"
        }
    };
    const item_color = ["all", "white", "red", "orange", "yellow", "green", "blue", "purple", "brown", "black"];
    
    let create_item_content = null;
    
    //item-container 자식의 item-type 들의 자식 menu-bar, content가 만들어지는 공간
    for (key in tab_content_item_type) {
        let create_item_type_menu_bar = document.createElement('div');
        create_item_content = document.createElement('div');
        
        create_item_type_menu_bar.className = "item-type-menu-bar";
        create_item_type_menu_bar.innerHTML = tab_content_item_type[key].kr_name;
        
        create_item_content.className = "item-content";
        create_item_content.dataset.type = key;
        
        for (let i = 0; i < item_color.length; i++) {
            let create_item_color = document.createElement('div');
            create_item_color.className = item_color[i] + " color";
            create_item_color.style = "display: none";
            create_item_content.appendChild(create_item_color);
        }
        tab_content_item_type[key].element.appendChild(create_item_type_menu_bar);
        tab_content_item_type[key].element.appendChild(create_item_content);
    }

    //처음 페이지 들어갈때 보여줄 데이터
    sendAjax("/ajax/test", "all", ['original']);

    item_content_colors_all = document.querySelectorAll(".item-content .all");
    item_content_colors_all.forEach(element => { element.style.display = "block"; });


    top_logo_img.addEventListener("mouseover", function (event) {
        event.target.src = "/static/img/home_icon_hover.png";

    });
    top_logo_img.addEventListener("mouseout", function (event) {
        event.target.src = "/static/img/home_icon.png";
    });

    data_processing();

    function data_processing() {
        setTimeout(function () {
            console.log("test");
            data_set_type = document.querySelectorAll("[data-type]");

            for (let i = 0; i < data_set_type.length; i++) {
                
                let data_set_id = data_set_type[i].querySelectorAll("[data-id]");

                for (let j = 0; j < data_set_id.length; j++) {
                    //Run when clicked (클릭시 실행)
                    data_set_id[j].addEventListener("click", function () {
                        let type = data_set_type[i].dataset.type;
                        let id = data_set_id[j].dataset.id;

                        let createId             = document.createElement('p');
                        let createImg            = document.createElement('img');
                        let createImgBox         = document.createElement('div');
                        let createName           = document.createElement('p');
                        let createCoolDown       = document.createElement('p');
                        let createWrittenBox     = document.createElement('div');
                        let createDescriptionBox = document.createElement('div');
                        
                        let clicked_item_data = {
                            id:          resultData.isaac_item[type][id].item_id,
                            img:         resultData.isaac_item[type][id].item_img,
                            name:        resultData.isaac_item[type][id].item_name,
                            cooldown:    resultData.isaac_item[type][id].item_cooldown,
                            description: resultData.isaac_item[type][id].item_description
                        }

                        // 데이터 아이디
                        createId.textContent = "id: " + clicked_item_data.id;
                        createId.id = "item-information-id";

                        // 이미지 엘리먼트를 넣을 박스
                        createImgBox.id = "item-information-img-box";

                        // 이미지
                        createImg.src = clicked_item_data.img;
                        createImg.className = "item-information-img";

                        //이름
                        createName.textContent = "이름: " + clicked_item_data.name;
                        createName.className = "item-information-name";

                        //만약 액티브 일때
                        if(type == "activated") {
                            // 쿨다운
                            clicked_item_data.cooldown = clicked_item_data.cooldown
                            createCoolDown.textContent = "쿨 타임: " + clicked_item_data.cooldown;
                        }
                        
                        // 설명 엘리먼트 넣을 박스
                        createDescriptionBox.className = "item-description";

                        clicked_item_data.description = clicked_item_data.description.split(";");
                        // 설명 부분들을 for문 돌면서 배열에서 끄집어냄
                        
                        for(let i = 0; i < clicked_item_data.description.length; i++) {
                            let createDescription = document.createElement('p');

                            createDescription.textContent = "▶ " + clicked_item_data.description[i];
                            createDescriptionBox.appendChild(createDescription);
                        }
                        
                        sidebar_item_information.style.display = "block";

                        // 만약 전에 무언가의 데이터가 있다면 지워줌
                        while (sidebar_item_information.hasChildNodes()) {
                            sidebar_item_information.removeChild(sidebar_item_information.firstChild);
                        }


                        sidebar_item_information.appendChild(createId);

                        // 이미지 박스 안에 이미지 넣음
                        createImgBox.appendChild(createImg);
                        sidebar_item_information.appendChild(createImgBox);

                        createWrittenBox.id = "item-information-written-box";
                        createWrittenBox.appendChild(createName);
                        // sidebar_item_information.appendChild(createName);
                        
                        if(type == "activated") {   
                            createWrittenBox.appendChild(createCoolDown);
                        }
                        
                        createWrittenBox.appendChild(createDescriptionBox);
                        sidebar_item_information.appendChild(createWrittenBox);
                    });
                }

            }
        }, 1000);
    }

    //스크롤 할때 
    document.addEventListener('scroll', function() {
        if(document.documentElement.scrollTop != 0) {
            document.querySelector("#body-sidebar #content").style = "margin-top: -70px;";
        } else {
            document.querySelector("#body-sidebar #content").style = "margin-top: 0px;";
        }
    })

    let isaac_setting_dropbox = document.querySelector("#checkbox-dropbox");
    let isaac_setting_dropbox_content = document.querySelector("#checkbox-version");
    let isaac_item_information_view = document.querySelector('#item-information');

    //isaac version setting drop box (아이작 버전 설정 드랍 박스)  
    //아이작 버전 설정 클릭했을시 이벤트 실행
    isaac_setting_dropbox.addEventListener('click', function(){
        if(isaac_setting_dropbox_content.style.display == 'none') {
            //만약 보이지 않는 상태라면 block(보이게) 적용
            isaac_setting_dropbox_content.style.display = 'block';
            //창이 열리기 때문에 넘치는것을 방지하기 위해 아이템 설명창을 줄인데
            isaac_item_information_view.style.maxHeight = "450px"
        }
        else {  
            //만약 보이는 상태라면 none(사라짐) 적용
            isaac_setting_dropbox_content.style.display = 'none';
            //창이 닫히기 때문에 아이템 설명창 사이즈를 다시 키운다.
            isaac_item_information_view.style.maxHeight = "600px"
        }
    });

    //body content 안에 있는 tab의 버튼들을 클릭했을때 처리
    tabNavColors.forEach(function (item, index) {
        item.addEventListener("click", function (event) {
            let want_version = [];
            let data_set_checkbox_version = null;
            const id_color = event.target.getAttribute('id').replace("tab-nav-", "");

            data_processing();
            tabContentColors = document.querySelectorAll('.color');

            tabContentColors.forEach(element => { element.style.display = "none"; });

            tabContentColors.forEach(function (element, index) {
                while (element.hasChildNodes()) {
                    element.removeChild(element.firstChild);
                }
            });

            data_set_checkbox_version = document.querySelectorAll("[data-checkbox-version]");

            for(let i = 0; i < data_set_checkbox_version.length; i++) {
                if(data_set_checkbox_version[i].checked) {
                    want_version.push(data_set_checkbox_version[i].dataset.checkboxVersion)
                }
            }
            console.log(want_version);

            sendAjax("/ajax/test", id_color, want_version);

            let item_content_colors = document.querySelectorAll(".item-content ." + id_color);

            item_content_colors.forEach(element => { element.style.display = "block"; });

        });
    });

    function sendAjax(url, data, want_version) {
        let sendData = { color: data, version: want_version };
        sendData = JSON.stringify(sendData);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(sendData);

        xhr.addEventListener('load', function () {
            let result = JSON.parse(xhr.responseText);
            let tabColorElement = null;

            resultData = result;
            console.log(result)
            if (result.isaac_item.length == 0) {
                return;
            }

            tabColorElement = {
                activated: document.querySelector("#item-activated .item-content ." + result.color),
                passive: document.querySelector("#item-passive .item-content ." + result.color),
                accessory: document.querySelector("#item-accessory .item-content ." + result.color),
                other: document.querySelector("#item-other .item-content ." + result.color)
            }

            for (let key_type in tabColorElement) {
                while (tabColorElement[key_type].hasChildNodes()) {
                    tabColorElement[key_type].removeChild(tabColorElement[key_type].firstChild);
                }
            }

            for (let key_type in result.isaac_item) {
                for (let key_data in result.isaac_item[key_type]) {

                    // console.log(result.isaac_item[key_type]);

                    let createImg = document.createElement('img');

                    // console.log(result.isaac_item[key_type][key_data]);
                    createImg.setAttribute("src", result.isaac_item[key_type][key_data].item_img);

                    createImg.dataset.id = result.isaac_item[key_type][key_data].item_id;

                    tabColorElement[key_type].appendChild(createImg);
                }
            }

            data_set_type = document.querySelectorAll("[data-type]");

        });
    }
}