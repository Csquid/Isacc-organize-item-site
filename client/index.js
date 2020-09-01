window.onload = function () {
    const top_logo_img = document.querySelector('#top-logo-img');
    const tabNavColors = document.querySelectorAll('.tab-color');
    const tabContentColors = document.querySelectorAll('.color');

    sendAjax("ajax_test", "all");

    top_logo_img.addEventListener("mouseover", function (event) {
        event.target.src = "/img/home_icon_hover.png";

    });
    top_logo_img.addEventListener("mouseout", function (event) {
        event.target.src = "/img/home_icon.png";
    });

    //body content 안에 있는 tab의 버튼들을 클릭했을때 처리
    tabNavColors.forEach(function (item, index) {
        item.addEventListener("click", function (event) {
            tabContentColors.forEach(element => { element.style.display = "none"; });
            const id_color = event.target.getAttribute('id').replace("tab-nav-", "");

            sendAjax("/ajax_test", id_color);

            if (document.querySelector("#tab-content #" + id_color)) {
                document.querySelector("#tab-content #" + id_color).style.display = "block";
            }
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

            if (result.isaac_item.length == 0) {
                return;
            }

            tabColorElement = document.querySelector("#tab-content #" + result.color);

            while (tabColorElement.hasChildNodes()) {
                tabColorElement.removeChild(tabColorElement.firstChild);
            }

            for (key in result.isaac_item.data) {
                let createImg = document.createElement('img');

                createImg.setAttribute("src", result.isaac_item.data[key].img);
                createImg.setAttribute("class", "item-img");
                tabColorElement.appendChild(createImg);
                console.log("break");
            }
        });
    }
}

function TabColor(colorName) {
    let tabColorElements = document.querySelectorAll(".color");

    for (let i = 0; i < x.length; i++) {
        tabColorElements[i].style.display = "none";
    }

    if (document.querySelector("#tab-content #" + colorName)) {
        document.querySelector("#tab-content #" + colorName).style.display = "block";
    }

}
