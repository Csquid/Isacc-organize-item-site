window.onload = function () {
    const top_logo_img = document.querySelector('#top-logo-img');
    const tabNavColors = document.querySelectorAll('.tab-color');
    let   tabContentColors = null;
    const item_container = document.querySelector('#item-container');
    let item_content_colors_all = null;

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
    for(key in tab_content_item_type) {
        let create_item_type_menu_bar = document.createElement('div');
        create_item_content = document.createElement('div');
        
        create_item_type_menu_bar.className = "item-type-menu-bar";
        create_item_type_menu_bar.innerHTML = tab_content_item_type[key].kr_name;
        
        create_item_content.className = "item-content";
        
        for(let i = 0; i < item_color.length; i++) {
            let create_item_color = document.createElement('div');
            create_item_color.className = item_color[i] + " color";
            create_item_color.style = "display: none";
            create_item_content.appendChild(create_item_color);
        }
        tab_content_item_type[key].element.appendChild(create_item_type_menu_bar);
        tab_content_item_type[key].element.appendChild(create_item_content);
    }

    // console.log(create_item_content);

    //처음 페이지 들어갈때 보여줄 데이터
    sendAjax("ajax_test", "all");

    item_content_colors_all = document.querySelectorAll(".item-content .all" );
    item_content_colors_all.forEach(element => { element.style.display = "block"; }); 



    top_logo_img.addEventListener("mouseover", function (event) {
        event.target.src = "/static/img/home_icon_hover.png";

    });
    top_logo_img.addEventListener("mouseout", function (event) {
        event.target.src = "/static/img/home_icon.png";
    });

    //body content 안에 있는 tab의 버튼들을 클릭했을때 처리
    tabNavColors.forEach(function (item, index) {
        item.addEventListener("click", function (event) {
            tabContentColors = document.querySelectorAll('.color');

            tabContentColors.forEach(element => { element.style.display = "none"; });
            
            tabContentColors.forEach(function(element, index) {
                while (element.hasChildNodes()) {
                    element.removeChild(element.firstChild);
                }
            });

            const id_color = event.target.getAttribute('id').replace("tab-nav-", "");

            sendAjax("/ajax_test", id_color);

            let item_content_colors = document.querySelectorAll(".item-content ." + id_color);

            item_content_colors.forEach(element => { element.style.display = "block"; });

        });
    });

    function sendAjax(url, data) {
        let sendData = { color: data };
        sendData = JSON.stringify(sendData);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(sendData);

        xhr.addEventListener('load', function () {
            let result = JSON.parse(xhr.responseText);
            let tabColorElement = null;

            console.log(result)
            if (result.isaac_item.length == 0) {
                return;
            }

            tabColorElement = document.querySelector("#item-activated .item-content ." + result.color);

            while (tabColorElement.hasChildNodes()) {
                tabColorElement.removeChild(tabColorElement.firstChild);
            }

            for(let key_type in result.isaac_item.data) {
                for(key_data in result.isaac_item.data[key_type].original) {
                    let createImg = document.createElement('img');
                    
                    createImg.setAttribute("src", result.isaac_item.data[key_type].original[key_data].img);
                    createImg.setAttribute("class", "item-img");
                    tabColorElement.appendChild(createImg);
                }
            }
            // for (key in result.isaac_item.data) {
            //     let createImg = document.createElement('img');

            //     createImg.setAttribute("src", result.isaac_item.data[key].img);
            //     createImg.setAttribute("class", "item-img");
            //     tabColorElement.appendChild(createImg);
            // }
        });
    }
}