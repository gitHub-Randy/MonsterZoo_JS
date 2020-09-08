'use strict';
export default class Monster {
    constructor() {
        this.type = '';
        this.TypeArms = '';
        this.AmountArms = 'sdafasfd';
        this.AmountFeet = '';
        this.AmountEyes = '';
        this.FurType = '';
        this.CanFly = '';
        this.CanSwim = '';
        this.Color = '';
        this.monsterName = '';
        this.power = Math.floor(Math.random() * 20) + 1;
        this.extraPower = 0;
        this.specialAttack = "none";
        this.location = 0;
        this.zone = "";
    }

    getMonsterInformation() {
        let informationText = `Type: ${this.type} \n`;
        informationText += `Name: ${this.monsterName} \n`;
        informationText += `Base Power: ${this.power} \n`;
        informationText += `Extra Power: ${this.extraPower} \n`;
        informationText += `Special Attack: ${this.specialAttack} \n`;

        if (this.TypeArms) {
            informationText += `Arm Type: ${this.TypeArms} \n`;
        }

        if (this.AmountArms) {
            informationText += `Amount Arms: ${this.AmountArms} \n`;
        }

        if (this.AmountFeet) {
            informationText += `Amount Feet: ${this.AmountFeet} \n`;
        }

        if (this.AmountEyes) {
            informationText += `Amount Eyes: ${this.AmountEyes} \n`;
        }

        if (this.FurType) {
            informationText += `Fur Type: ${this.FurType} \n`;
        }

        if (this.CanFly) {
            informationText += `Can Fly: ${this.CanFly} \n`;
        }

        if (this.CanSwim) {
            informationText += `Can Swim: ${this.CanSwim} \n`;
        }

        if (this.Color) {
            informationText += `Color: ${this.Color} \n`;
        }
        return informationText;
    }

    calculateSpecialStats(temperature, zone, windStrength, weatherCondition) {

    }

    saveInLocalStorage() {
        localStorage.setItem(this.monsterName, JSON.stringify(this));
    }


}

