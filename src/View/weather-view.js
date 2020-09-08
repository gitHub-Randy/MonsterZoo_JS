'use strict';

export default class weatherview {

    constructor(controller) {
        this.controller = controller;
        this.makeDiv();
        this.addListener();
        this.weatherForecast();
    }

    weatherForecast() {

        let link = "https://api.openweathermap.org/data/2.5/weather?q=" + this.getLocation() + "&appid=" + "6a0ac16bdae81d37be7c4643a5bdee01" + "&units=metric";
        this.httpRequestAsync(link, this.response);
    }

    addListener() {
        let me = this;
        let location = document.getElementById("gridSelect");
        location.addEventListener("change", function () {
            me.weatherForecast();
        })

    }


    getLocation() {
        let location = document.getElementById("gridSelect");
        switch (location.options[location.selectedIndex].text) {
            case "Jungle":
                return "Borneo";
            case "Desert":
                return "Sahara";
            case "North Pole":
                return "McMurdo Station";
            default:
                return "Borneo"
        }
    }

    response(response, controller) {
        let contrl = controller;
        let jsonObject = JSON.parse(response);
        let icon = document.getElementById("icon");
        icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
        let temp = document.getElementById("temp");
        if (temp.hasChildNodes()) {
            let text = temp.childNodes[0];
            temp.removeChild(text);
        }
        let temper = parseInt(jsonObject.main.temp) + "";
        let labelText = document.createTextNode(temper + "°" + "C");
        temp.appendChild(labelText);
        contrl.updateWeather(jsonObject);
    }

    httpRequestAsync(url, callback) {
        let controller = this.controller;
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                callback(httpRequest.responseText, controller);
            }

        }
        httpRequest.open("GET", url, true); // true for asynchronous
        httpRequest.send();
    }

    makeDiv() {
        let parent = document.getElementById("panel");
        let content = document.createElement("DIV");
        content.setAttribute("id", "weather");
        let icon = document.createElement("IMG");
        icon.setAttribute("src", "");
        icon.setAttribute("id", "icon");
        let label = document.createElement("LABEL");
        label.setAttribute("id", "temp");
        content.appendChild(label);
        content.appendChild(icon);
        parent.appendChild(content);
    }
}
