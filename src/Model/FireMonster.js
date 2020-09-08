import Monster from "./Monster.js";

'use strict';
export default class FireMonster extends Monster {
    constructor() {
        super();
        this.type = 'Fire';

        this.AmountArms = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6};
        this.TypeArms = {TENTAKELS: "Tentakels", CLAWS: "Claws", CLAWWINGS: "Claw-Wings"};
        // 2 feet but only when ther are 2 or less arms
        this.AmountFeet = {0: 0, 1: 1, 2: 2};
        this.AmountEyes = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4};
        this.FurType = {SCALES: "Scales", FEATHERS: "Feathers"};
        //only if feathers
        this.CanFly = {TRUE: true, FALSE: false};
        this.CanSwim = false;
        this.Color = {ORANGE: "Orange", RED: "Red", Brown: "Brown"};

        this.audioFile = "../src/audioFiles/flamethrower.wav";

    }

    updateMonster(parameter, value) {
        switch (parameter) {
            case "AmountArms":
                this.AmountArms = value;
                break;
            case "ArmType":
                this.TypeArms = value;
                break;
            case "AmountFeet":
                this.AmountFeet = value;
                break;
            case "AmountEyes":
                this.AmountEyes = value;
                break;
            case "FurType":
                this.FurType = value;
                break;
            case "Fly":
                this.CanFly = value;
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
        if (temperature > "20") {
            this.extraPower = 10;

        }
        if (weatherCondition.includes("Rain")) {
            this.extraPower = 0;
            this.power -= 5;
        }

        if (this.power + this.extraPower > 10) {
            this.specialAttack = "Fire Burst";
        }
    }
}
