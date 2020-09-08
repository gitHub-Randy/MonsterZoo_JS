'use strict';
import MonsterZooView from "../View/MonsterZooView.js";
import WaterMonster from "../Model/WaterMonster.js";
import FireMonster from "../Model/FireMonster.js";
import EarthMonster from "../Model/EarthMonster.js";
import WindMonster from "../Model/WindMonster.js";
import configuratorView from "../View/configurator-view.js";
import weatherView from "../View/weather-view.js";
import WeatherModel from "../Model/weatherModel.js";

export default class mainController {
    constructor() {
        localStorage.clear();
        this.monsterConfigView = new configuratorView(this);
        this.monsterZoo = new MonsterZooView(this);
        this.weatherView = new weatherView(this);
        this.weatherModel = new WeatherModel();
        this.monstersInZoo = [];
    }

    CreateMonsterConfigurator(value) {
        switch (value) {
            case "WaterType":
                this.monster = new WaterMonster();
                break;
            case "FireType":
                this.monster = new FireMonster();
                break;
            case "EarthType":
                this.monster = new EarthMonster();
                break;
            case "WindType":
                this.monster = new WindMonster();
                break;
        }
        let n = this.monstersInZoo.length;
        this.monstersInZoo[n] = this.monster;

    }

    getMonsterInformation(monsterInformation) {
        for (let i = 0; i < this.monstersInZoo.length; i++) {
            if (monsterInformation === this.monstersInZoo[i].getMonsterInformation()) {
                return this.monstersInZoo[i]
            }
        }
    }

    updateMonster() {
        let inputs = this.getAllInputs();
        for (let i = 0; i < inputs.length; i++) {
            this.monster = this.monster.updateMonster(inputs[i].id, inputs[i].value);
        }
        let temp = this.weatherModel.temperature;
        let gridSelect = document.getElementById("gridSelect");
        let zone = gridSelect.options[gridSelect.selectedIndex].text;

        let wind = this.weatherModel.windSpeed;
        let condition = this.weatherModel.weatherCondition;
        this.monster.calculateSpecialStats(temp, zone, wind, condition);
        this.updateMonsterZone(this.monster);
    }

    updateMonsterZone(monster) {
        let z = document.querySelector(".gridSelector").value;
        monster.updateMonster("Zone", z);
    }

    updateMonsterLocation(id,monster) {
        monster.updateMonster("Location", id);
    }

    updateWeather(response) {
        let temp = response.main.temp;
        let wind = response.wind.speed;
        let condition = response.weather[0].main;
        this.weatherModel.updateWeather(temp, wind, condition);
    }


    updateWeatherManual(){
        this.weatherModel.updateWeather(temp, wind, condition);

    }

    getAllInputs() {
        let inputArray = [];
        inputArray[0] = document.getElementById("AmountArms");
        inputArray[1] = document.getElementById("ArmType");
        inputArray[2] = document.getElementById("AmountFeet");
        inputArray[3] = document.getElementById("AmountEyes");
        inputArray[4] = document.getElementById("FurType");
        inputArray[5] = document.getElementById("Fly");
        inputArray[6] = document.getElementById("Swim");
        inputArray[7] = document.getElementById("Color");
        inputArray[8] = document.getElementById("Name");

        return inputArray;
    }

    recoverBoard(zone) {
        this.monstersInZoo = [];

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let jsonValue = JSON.parse(value);
            if (zone === jsonValue.zone) {
                this.CreateMonsterConfigurator(jsonValue.type + "Type");
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("AmountArms", jsonValue.AmountArms);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("ArmType", jsonValue.TypeArms);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("AmountFeet", jsonValue.AmountFeet);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("AmountEyes", jsonValue.AmountEyes);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("FurType", jsonValue.FurType);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Color", jsonValue.Color);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Name", jsonValue.monsterName);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Zone", jsonValue.zone);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Location", jsonValue.location);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Power", jsonValue.power);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("ExtraPower", jsonValue.extraPower);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Attack", jsonValue.specialAttack);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Fly", jsonValue.CanFly);
                this.monstersInZoo[this.monstersInZoo.length - 1].updateMonster("Swim", jsonValue.CanSwim);

                this.monsterConfigView.RecoverMonster(this.monstersInZoo[this.monstersInZoo.length - 1]);
            }
        }
    }

    saveMonstersInLocalStorage() {
        for (let i = 0; i < this.monstersInZoo.length; i++) {

            this.monstersInZoo[i].saveInLocalStorage();
        }
    }

    checkMonsterName(name) {
        if (localStorage.getItem(name)) {
         return true
        }
        return false
    }

    deleteMonster(title) {
        for (let i = 0; i < this.monstersInZoo.length; i++) {
            if (title == this.monstersInZoo[i].getMonsterInformation()) {
                let monsterName = this.monstersInZoo[i].monsterName;
                localStorage.removeItem(monsterName);
                for (let x = i; x < this.monstersInZoo.length; x++) {
                    this.monstersInZoo[x] = this.monstersInZoo[x + 1]
                }
                this.monstersInZoo.length -= 1;

                break;
            }
        }
    }




}