import Monster from "./Monster.js";
'use strict';
export default class WaterMonster extends Monster {
  constructor() {
    super();
    this.type = 'Water';
    this.CanSwim = true;
    this.CanFly = false;
    this.AmountArms = { ZERO: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8 };
    this.TypeArms = { TENTAKELS: "Tentakels", FINNS: "Finns" };
    // max 4  if amountArms is 4 or less, else 0
    this.AmountFeet = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
    this.AmountEyes = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };
    this.FurType = { SCALES: "Scales", SLIME: "Slime" };
    this.Color = { BLUE: "Blue", RED: "Red", GREEN: "Green" };
    this.audioFile = "../src/audioFiles/waterpump.wav";
    this.extraPower = 0;
  }

    updateMonster(parameter, value){
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
        default: break;
      }
      return this;
    }

    calculateSpecialStats(temperature, zone, windStrength, weatherCondition){
      if(weatherCondition.includes("Rain")  ){
        this.extraPower = 10;
      }
      if(zone == "Dessert"){
        this.power -= 5;
      }
      if(this.power + this.extraPower > 10){
        this.specialAttack ="Water Canon";
      }


    }



}






