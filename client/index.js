window.onload = function () {
    const top_logo_img = document.querySelector('#top-logo-img');
    const tabNavColors = document.querySelectorAll('.tab-color');
    const tabContentColors = document.querySelectorAll('.color');

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
        })
    })

    function sendAjax(url, data) {
        let sendData = {color: data};
        sendData = JSON.stringify(sendData);
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(sendData);

        xhr.addEventListener('load', function() {
            let result = JSON.parse(xhr.responseText);
            
            console.log(result);
        });
    }
}

function TabColor(colorName) {
    var x = document.querySelectorAll(".color");

    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

    if(document.querySelector("#tab-content #" + colorName)) {
        document.querySelector("#tab-content #" + colorName).style.display = "block";
    }

}
