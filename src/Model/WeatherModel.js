'use strict';

export default class WeatherModel {
    constructor() {
        this.temperature = 0;
        this.windSpeed = 0;
        this.weatherCondition = "";

    }

    updateWeather(temp, wind, condition) {
        this.temperature = temp;
        this.windSpeed = wind;
        this.weatherCondition = condition;
    }
}



