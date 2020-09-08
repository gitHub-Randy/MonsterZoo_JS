import Monster from "./Monster.js";

'use strict';
export default class EarthMonster extends Monster {
    constructor() {
        super();
        this.type = 'Earth';
        this.amountArms = 2;
        this.AmountEyes = 2;
        this.CanFly = false;
        this.CanSwim = false;
        this.TypeArms = 'Claws';


        this.TYPE = {EARTH: "Earth"};
        this.AmountFeet = {2: 2, 4: 4, 6: 6};
        this.FurType = {SCALES: "Scales", SLIME: "SLime", HAIR: "Hair"};
        this.Color = {PURPLE: "Purple", ORANGE: "Orange", WHITE: "White"};
        this.audioFile = "../src/audioFiles/Earthquake.wav";
    }

    updateMonster(parameter, value) {
        switch (parameter) {
            case "AmountFeet":
                this.AmountFeet = value;
                break;
            case "FurType":
                this.FurType = value;
                break;
            case "Color":
                this.Color = value;
                break;
            case "Name":
                this.monsterName = value;
                break;
            case "Zone":
                this.zone = value;
                break;
            case "Location":
                this.location = value;
                break;
            case "Power":
                this.power = value;
                break;
            case "ExtraPower":
                this.extraPower = value;
                break;
            case "Attack":
                this.specialAttack = value;
                break;
            default:
                break;
        }

        return this;
    }

    calculateSpecialStats(temperature, zone, windStrength, weatherCondition) {
        if (!weatherCondition.includes("Rain")) {
            this.extraPower = 10;

        }
        if (zone == "North Pole") {
            this.extraPower = 0;
            this.power -= 5;
        }

        if (this.power + this.extraPower > 10) {
            this.specialAttack = "Rock n Roll";
        }
    }
}






