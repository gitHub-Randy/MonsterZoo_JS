import Monster from "./Monster.js";

'use strict';
export default class WindMonster extends Monster {
    constructor() {
        super();
        this.type = 'Wind';
        this.AmountArms = 2;
        this.AmountEyes = 2;
        this.CanFly = true;


        this.TYPE = {WIND: "Wind"};
        this.TypeArms = {WINGS: "Wings", CLAWWINGS: "Claw-Wings"};
        this.AmountFeet = {0: 0, 2: 2};
        this.FurType = {SCALES: "Scales", FEATHERS: "Feathers"};
        //only if hair or scales
        this.CanSwim = false;
        this.Color = {WHITE: "White", BLUE: "Blue", PURPLE: "Purple"};
        this.audioFile = "../src/audioFiles/Whirlwind.wav";

    }


    updateMonster(parameter, value) {
        switch (parameter) {
            case "ArmType":
                this.TypeArms = value;
                break;
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
        if (windStrength > "7") {
            this.extraPower = 10;

        }
        if (zone == "jungle") {
            this.extraPower = 0;
            this.power -= 5;
        }

        if (this.power + this.extraPower > 10) {
            this.specialAttack = "Tornado";
        }
    }
}


