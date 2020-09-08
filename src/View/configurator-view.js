'use strict';

export default class configuratorView {
    constructor(controller) {
        this.controller = controller;
        this.addDeleteEvent();
        this.generateTypeList();
    }

    generateNameField() {
        let controller = this.controller;
        let config = document.querySelector('#configurator');
        let field = document.createElement("INPUT");
        field.setAttribute("id", "Name");
        let nameLabel = document.createElement("LABEL");
        let text = document.createTextNode("Monster Name: ");
        nameLabel.appendChild(text);
        nameLabel.setAttribute("id", "formLabel");
        config.appendChild(nameLabel);
        config.appendChild(field);
    }

    generateMakeMonsterButton() {
        let controller = this.controller;
        let config = document.querySelector('#configurator')
        let button = document.createElement("BUTTON");
        button.setAttribute("id", "monsterMakeButton");
        let buttonLabel = document.createTextNode("Make Monster");
        button.appendChild(buttonLabel);

        let type = document.getElementById("typeSelect").value;

        let pokemon;
        switch (type) {
            case "WaterType":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/382';
                break;
            case "FireType":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/383';
                break;
            case "EarthType":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/95';
                break;
            case "WindType":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/384';
                break;
        }

        button.addEventListener("click", () => this.createMonster(controller, pokemon));
        config.appendChild(button);
    }

    RecoverMonster(monster) {
        let pokemon;
        switch (monster.type) {
            case "Water":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/382';
                break;
            case "Fire":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/383';
                break;
            case "Earth":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/95';
                break;
            case "Wind":
                pokemon = 'https://pokeapi.co/api/v2/pokemon/384';
                break;
        }
        let monsterToCreate = document.getElementById(monster.location);
        let dragAble = document.createElement("img");
        dragAble.setAttribute("id", "monster");
        dragAble.classList.add("monster");
        dragAble.setAttribute("draggable", "true");
        dragAble.addEventListener('dragstart', this.dragStart);
        monsterToCreate.appendChild(dragAble);
        dragAble.setAttribute("title", monster.getMonsterInformation());
        fetch(pokemon) //pokemon number
            .then(response => response.json())
            .then(data => {
                dragAble.setAttribute("src", data.sprites.front_default);
            })
            .catch(error => console.error(error));
    }

    generateForm() {
        let aArms = document.getElementById('AmountArms');
        if (typeof (aArms) != 'undefined' && aArms != null) {

            let aType = document.getElementById('ArmType');
            let aFeet = document.getElementById('AmountFeet');
            let aEyes = document.getElementById('AmountEyes');
            let furType = document.getElementById('FurType');
            let fly = document.getElementById('Fly');
            let canSwim = document.getElementById('Swim');
            let color = document.getElementById('Color');
            let textField = document.getElementById('Name');

            color.parentNode.removeChild(color);
            canSwim.parentNode.removeChild(canSwim);
            fly.parentNode.removeChild(fly);
            furType.parentNode.removeChild(furType);
            aEyes.parentNode.removeChild(aEyes);
            aFeet.parentNode.removeChild(aFeet);
            aArms.parentNode.removeChild(aArms);
            aType.parentNode.removeChild(aType);
            textField.parentNode.removeChild(textField);
            let img = document.getElementById('div1').firstChild;
            if (img != 'undefined' && img != null) {
                img.parentNode.removeChild(img);
            }
            let labels = document.getElementById("formLabel");

            while (labels != undefined || labels != null) {
                labels.parentElement.removeChild(labels);
                labels = document.getElementById("formLabel");
            }
            let btn = document.getElementById("monsterMakeButton");
            btn.parentElement.removeChild(btn);
        }

        this.generateSelects();
        this.generateAmountArmList();
        this.generateTypeArmsList();
        this.generateAmountFeetList();
        this.generateAmountEyesList();
        this.generateFurType();
        this.generateCanFlyButton();
        this.generateCanSwimButton();
        this.generateColorList();
        this.generateNameField();
        this.generateMakeMonsterButton();
    }

    checkNameInput() {
        return this.controller.checkMonsterName(document.getElementById("Name").value);
    }

    createMonster(controller, pokemon) {
        if(this.checkNameInput()){
            alert("please use another Monster name!");
            return;
        }
        if (document.getElementById('div1').firstChild != null) {
            let m = document.getElementById('div1').firstChild;
            m.parentElement.removeChild(m);
        }
        let dragAble = document.createElement("img");
        dragAble.setAttribute("id", "monster");
        let spawn = document.getElementsByName("spawn")[0];
        dragAble.classList.add("monster");
        dragAble.setAttribute("draggable", "true");
        dragAble.addEventListener('dragstart', this.dragStart);
        spawn.appendChild(dragAble);
        controller.updateMonster();
        dragAble.setAttribute("title", controller.monster.getMonsterInformation());

        fetch(pokemon) //pokemon number
            .then(response => response.json())
            .then(data => {
                dragAble.setAttribute("src", data.sprites.front_default);
            })
            .catch(error => console.error(error));
        this.controller.updateMonster();
    }

    addDeleteEvent() {
        let beginPoint = document.getElementById('div1');
        beginPoint.addEventListener('dragover', this.dragOver);
        beginPoint.addEventListener('drop', this.spawnDrop.bind(this));
    }

    dragStart(e) {
        e.target.classList.add("draggedMonster");
    }

    dragOver(e) {
        e.preventDefault()
    }

    spawnDrop(e) {
        let element = document.querySelector(".draggedMonster");
        if (!e.target.classList.contains("monster")) {
            e.target.append(element);
            this.makeDeleteButton();
        }
        element.classList.remove("draggedMonster");




    }

    makeDeleteButton() {
        let controller = this.controller;
        let config = document.querySelector('#configurator')
        let button = document.createElement("BUTTON");
        button.setAttribute("id", "deleteButton");
        let buttonLabel = document.createTextNode("Delete Monster");
        button.appendChild(buttonLabel);

        button.addEventListener("click", () => this.deleteMonster());
        config.appendChild(button);
    }

    deleteMonster() {

        let monsterHolder = document.getElementById("div1").firstChild;
        if (monsterHolder != undefined) {

            this.controller.deleteMonster(monsterHolder.title);
            monsterHolder.parentElement.removeChild(monsterHolder);
            let btn = document.getElementById('deleteButton');
            btn.parentElement.removeChild(btn);
        }
    }

    generateTypeList() {

        let controller = this.controller;
        let config = document.querySelector('#configurator')
        let label = document.createElement("LABEL");
        let labelText = document.createTextNode("Type: ");
        label.appendChild(labelText);
        config.appendChild(label);
        let select = document.createElement("SELECT");

        select.setAttribute("id", "typeSelect");
        select.addEventListener('change', function () {
            controller.CreateMonsterConfigurator(this.value);

        });
        config.appendChild(select);
        select.addEventListener("change", this.generateForm.bind(this));
        let zeroOpt = document.createElement("option");
        zeroOpt.setAttribute("value", "zeroType");
        let zeroText = document.createTextNode("choose a type");
        zeroOpt.appendChild(zeroText);
        select.appendChild(zeroOpt);
        let waterOpt = document.createElement("option");
        waterOpt.setAttribute("value", "WaterType");
        let waterText = document.createTextNode('Water');
        waterOpt.appendChild(waterText);
        select.appendChild(waterOpt);
        let fireOpt = document.createElement("option");
        fireOpt.setAttribute("value", "FireType");
        let fireText = document.createTextNode('Fire');
        fireOpt.appendChild(fireText);
        select.appendChild(fireOpt);
        let earthOpt = document.createElement("option");
        earthOpt.setAttribute("value", "EarthType");
        let earthText = document.createTextNode('Earth');
        earthOpt.appendChild(earthText);
        select.appendChild(earthOpt);
        let windOpt = document.createElement("option");
        windOpt.setAttribute("value", "WindType");
        let windText = document.createTextNode('Wind');
        windOpt.appendChild(windText);
        select.appendChild(windOpt);
    }

    generateSelects() {
        let controller = this.controller;
        let config = document.querySelector('#configurator')
        let aArmLabel = document.createElement("LABEL");
        aArmLabel.setAttribute("id", "formLabel");
        let aArmText = document.createTextNode("Amount arms: ");
        aArmLabel.appendChild(aArmText);
        let amountArmSelect = document.createElement("SELECT");
        amountArmSelect.setAttribute("id", "AmountArms");
        let armTypeLabel = document.createElement("LABEL");
        armTypeLabel.setAttribute("id", "formLabel");

        let armTypeText = document.createTextNode("Arm type: ");
        armTypeLabel.appendChild(armTypeText);

        let armTypeSelect = document.createElement("SELECT");
        armTypeSelect.setAttribute("id", "ArmType");
        let amountFeetLabel = document.createElement("LABEL");
        amountFeetLabel.setAttribute("id", "formLabel");

        let amountFeetText = document.createTextNode("Amount Feet: ");
        amountFeetLabel.appendChild(amountFeetText);

        let amountFeet = document.createElement("SELECT");
        amountFeet.setAttribute("id", "AmountFeet");

        let eyesLabel = document.createElement("LABEL");
        eyesLabel.setAttribute("id", "formLabel");

        let eyesText = document.createTextNode("Amount Eyes: ");
        eyesLabel.appendChild(eyesText);

        let eyes = document.createElement("SELECT");
        eyes.setAttribute("id", "AmountEyes");

        let furLabel = document.createElement("LABEL");
        furLabel.setAttribute("id", "formLabel");

        let furText = document.createTextNode("Fur type: ");
        furLabel.appendChild(furText);

        let fur = document.createElement("SELECT");
        fur.setAttribute("id", "FurType");

        let flyLabel = document.createElement("LABEL");
        flyLabel.setAttribute("id", "formLabel");

        let flyText = document.createTextNode("Can fly: ");
        flyLabel.appendChild(flyText);

        let fly = document.createElement("SELECT");
        fly.setAttribute("id", "Fly");

        let swimLabel = document.createElement("LABEL");
        swimLabel.setAttribute("id", "formLabel");

        let swimText = document.createTextNode("Can swim: ");
        swimLabel.appendChild(swimText);

        let swim = document.createElement("SELECT");
        swim.setAttribute("id", "Swim");

        let colorLabel = document.createElement("LABEL");
        colorLabel.setAttribute("id", "formLabel");

        let colorText = document.createTextNode("Color: ");
        colorLabel.appendChild(colorText);

        let color = document.createElement("SELECT");
        color.setAttribute("id", "Color");

        config.appendChild(aArmLabel);
        config.appendChild(amountArmSelect);
        config.appendChild(armTypeLabel);
        config.appendChild(armTypeSelect);
        config.appendChild(amountFeetLabel);
        config.appendChild(amountFeet);
        config.appendChild(eyesLabel);
        config.appendChild(eyes);
        config.appendChild(furLabel);
        config.appendChild(fur);
        config.appendChild(flyLabel);
        config.appendChild(fly);
        config.appendChild(swimLabel);
        config.appendChild(swim);
        config.appendChild(colorLabel);
        config.appendChild(color);
    }

    generateAmountArmList() {
        let select = document.getElementById("AmountArms");
        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let type = document.getElementById("typeSelect").value;
        select.addEventListener("change", this.generateAmountFeetList.bind(this));
        switch (type) {
            case "WaterType":
                let array = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"]
                for (let i = 0; i < array.length; i++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", i);
                    let text = document.createTextNode(i);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            case "FireType":
                let array2 = ["zero", "one", "two", "three", "four", "five", "six"]
                for (let i = 0; i < array2.length; i++) {
                    let option2 = document.createElement("option");
                    option2.setAttribute("value", i);
                    let text2 = document.createTextNode(i);
                    option2.appendChild(text2);
                    select.appendChild(option2);
                }
                break;
            case "EarthType":
                let option3 = document.createElement("option");
                option3.setAttribute("value", "2");
                let text3 = document.createTextNode(2);
                option3.appendChild(text3);
                select.appendChild(option3);
                break;
            case "WindType":
                let option4 = document.createElement("option");
                option4.setAttribute("value", "2");
                let text4 = document.createTextNode(2);
                option4.appendChild(text4);
                select.appendChild(option4);
                break;
            default:
        }
    }

    generateTypeArmsList() {
        let select = document.getElementById("ArmType");

        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let selectedType = document.getElementById("typeSelect").value

        switch (selectedType) {
            case "WaterType":
                let array = ["Tentakels", "Finns"]
                for (let i = 0; i < array.length; i++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", array[i]);
                    let text = document.createTextNode(array[i]);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            case "FireType":
                let array2 = ["Tentakels", "Claws", "Claw-Wings"]
                for (let i = 0; i < array2.length; i++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", array2[i]);
                    let text = document.createTextNode(array2[i]);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            case "EarthType":
                let option = document.createElement("option");
                option.setAttribute("value", "Claws");
                let text = document.createTextNode("Claws");
                option.appendChild(text);
                select.appendChild(option);
                break;
            case "WindType":
                let array3 = ["Wings", "Claw-Wings"]
                for (let i = 0; i < array3.length; i++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", array3[i]);
                    let text = document.createTextNode(array3[i]);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            default:
        }
    }

    generateAmountFeetList() {
        let select = document.getElementById("AmountFeet");
        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let selectedType = document.getElementById("typeSelect").value

        switch (selectedType) {
            case "WaterType":

                if (document.getElementById("AmountArms").value <= 4) {
                    let array = ["one", "two", "three", "four"];
                    for (let i = 0; i < array.length; i++) {
                        let option = document.createElement("option");
                        option.setAttribute("value", array[i]);
                        let text = document.createTextNode(array[i]);
                        option.appendChild(text);
                        select.appendChild(option);
                    }
                } else {
                    let option = document.createElement("option");
                    option.setAttribute("value", "zero");
                    let text = document.createTextNode(0);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            case "FireType":
                if (document.getElementById("AmountArms").value <= 2) {
                    let option2 = document.createElement("option");
                    option2.setAttribute("value", "two");
                    let text2 = document.createTextNode(2);
                    option2.appendChild(text2);
                    select.appendChild(option2);
                } else {
                    let option2 = document.createElement("option");
                    option2.setAttribute("value", "zero");
                    let text2 = document.createTextNode(0);
                    option2.appendChild(text2);
                    select.appendChild(option2);
                }
                break;
            case "EarthType":
                let array2 = ["two", "four", "six"];
                for (let i = 0; i < array2.length; i++) {
                    let option3 = document.createElement("option");
                    option3.setAttribute("value", array2[i]);
                    let text3 = document.createTextNode(array2[i]);
                    option3.appendChild(text3);
                    select.appendChild(option3);
                }
                break;
            case "WindType":
                let array3 = ["zero", "two"];
                for (let i = 0; i < array3.length; i++) {
                    let option4 = document.createElement("option");
                    option4.setAttribute("value", array3[i]);
                    let text4 = document.createTextNode(array3[i]);
                    option4.appendChild(text4);
                    select.appendChild(option4);
                }
                break;
            default:
        }
    }

    generateAmountEyesList() {

        let select = document.getElementById("AmountEyes");
        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let type = document.getElementById("typeSelect").value;
        switch (type) {
            case "WaterType":
                let array = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"]
                for (let i = 0; i < array.length; i++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", i);
                    let text = document.createTextNode(i);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            case "FireType":
                let array2 = ["zero", "one", "two", "three", "four"]
                for (let i = 0; i < array2.length; i++) {
                    let option2 = document.createElement("option");
                    option2.setAttribute("value", i);
                    let text2 = document.createTextNode(i);
                    option2.appendChild(text2);
                    select.appendChild(option2);
                }
                break;
            case "EarthType":
                let option3 = document.createElement("option");
                option3.setAttribute("value", "two");
                let text3 = document.createTextNode(2);
                option3.appendChild(text3);
                select.appendChild(option3);
                break;
            case "WindType":
                let option4 = document.createElement("option");
                option4.setAttribute("value", "two");
                let text4 = document.createTextNode(2);
                option4.appendChild(text4);
                select.appendChild(option4);
                break;
            default:
        }
    }

    generateFurType() {
        let select = document.getElementById("FurType");
        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let type = document.getElementById("typeSelect").value;
        switch (type) {
            case "WaterType":
                let array = ["Scales", "Slime"]
                for (let i = 0; i < array.length; i++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", array[i]);
                    let text = document.createTextNode(array[i]);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            case "FireType":
                let array2 = ["Scales", "Feathers"]
                for (let i = 0; i < array2.length; i++) {
                    let option2 = document.createElement("option");
                    option2.setAttribute("value", array2[i]);
                    let text2 = document.createTextNode(array2[i]);
                    option2.appendChild(text2);
                    select.appendChild(option2);
                }
                select.addEventListener("change", this.generateCanFlyButton.bind(this));

                break;
            case "EarthType":
                let array3 = ["Hair", "Scales", "Slime"]
                for (let i = 0; i < array3.length; i++) {
                    let option3 = document.createElement("option");
                    option3.setAttribute("value", array3[i]);
                    let text3 = document.createTextNode(array3[i]);
                    option3.appendChild(text3);
                    select.appendChild(option3);
                }
                break;
            case "WindType":
                let array4 = ["Feathers", "Hair", "Scales"]
                for (let i = 0; i < array4.length; i++) {
                    let option4 = document.createElement("option");
                    option4.setAttribute("value", array4[i]);
                    let text4 = document.createTextNode(array4[i]);
                    option4.appendChild(text4);
                    select.appendChild(option4);
                }
                select.addEventListener("change", this.generateCanSwimButton.bind(this));
                break;
            default:
        }
    }

    generateCanFlyButton() {
        let select = document.getElementById("Fly");
        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let type = document.getElementById("typeSelect").value;
        switch (type) {
            case "WaterType":
                let option = document.createElement("option");
                option.setAttribute("value", 0);
                let text = document.createTextNode("no");
                option.appendChild(text);
                select.appendChild(option);
                break;
            case "FireType":
                if (document.getElementById("FurType").value == "Feathers") {
                    let array = ["no", "yes"];
                    for (let i = 0; i < array.length; i++) {
                        let option2 = document.createElement("option");
                        option2.setAttribute("value", i);
                        let text2 = document.createTextNode(array[i]);
                        option2.appendChild(text2);
                        select.appendChild(option2);
                    }
                }
                else{
                    let option2 = document.createElement("option");
                    option2.setAttribute("value",1 );
                    let text2 = document.createTextNode("no");
                    option2.appendChild(text2);
                    select.appendChild(option2);
                }
                break;
            case "EarthType":
                let option3 = document.createElement("option");
                option3.setAttribute("value", 0);
                let text3 = document.createTextNode("no");
                option3.appendChild(text3);
                select.appendChild(option3);
                break;
            case "WindType":
                let option4 = document.createElement("option");
                option4.setAttribute("value", 1);
                let text4 = document.createTextNode("yes");
                option4.appendChild(text4);
                select.appendChild(option4);
                break;
            default:
        }
    }

    generateCanSwimButton() {
        let select = document.getElementById("Swim");
        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let type = document.getElementById("typeSelect").value;
        switch (type) {
            case "WaterType":
                let option = document.createElement("option");
                option.setAttribute("value", 1);
                let text = document.createTextNode("yes");
                option.appendChild(text);
                select.appendChild(option);
                break;
            case "FireType":
                let option2 = document.createElement("option");
                option2.setAttribute("value", 0);
                let text2 = document.createTextNode("no");
                option2.appendChild(text2);
                select.appendChild(option2);
                break;
            case "EarthType":
                let option3 = document.createElement("option");
                option3.setAttribute("value", 0);
                let text3 = document.createTextNode("no");
                option3.appendChild(text3);
                select.appendChild(option3);
                break;
            case "WindType":
                if (document.getElementById("FurType").value === "Hair" || document.getElementById("FurType").value === "Scales") {
                    let array = ["no", "yes"];
                    for (let i = 0; i < array.length; i++) {
                        let option4 = document.createElement("option");
                        option4.setAttribute("value", i);
                        let text4 = document.createTextNode(array[i]);
                        option4.appendChild(text4);
                        select.appendChild(option4);
                    }
                } else {
                    let option4 = document.createElement("option");
                    option4.setAttribute("value", 0);
                    let text4 = document.createTextNode("no");
                    option4.appendChild(text4);
                    select.appendChild(option4);
                }
                break;
            default:
        }
    }

    generateColorList() {
        let select = document.getElementById("Color");
        if (select.hasChildNodes()) {
            let myNode = select
            let firstChild = myNode.firstChild;

            while (firstChild) {
                myNode.removeChild(firstChild);
                firstChild = myNode.firstChild;
            }
        }
        let type = document.getElementById("typeSelect").value;
        switch (type) {
            case "WaterType":
                let array = ["Blue", "Red", "Green"];
                for (let i = 0; i < array.length; i++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", array[i]);
                    let text = document.createTextNode(array[i]);
                    option.appendChild(text);
                    select.appendChild(option);
                }
                break;
            case "FireType":
                let array2 = ["Red", "Orange", "Brown"];
                for (let i = 0; i < array2.length; i++) {
                    let option2 = document.createElement("option");
                    option2.setAttribute("value", array2[i]);
                    let text2 = document.createTextNode(array2[i]);
                    option2.appendChild(text2);
                    select.appendChild(option2);
                }
                break;
            case "EarthType":
                let array3 = ["Purple", "Ornage", "White"];
                for (let i = 0; i < array3.length; i++) {
                    let option3 = document.createElement("option");
                    option3.setAttribute("value", array3[i]);
                    let text3 = document.createTextNode(array3[i]);
                    option3.appendChild(text3);
                    select.appendChild(option3);
                }
                break;
            case "WindType":
                let array4 = ["White", "Blue", "Purple"];
                for (let i = 0; i < array4.length; i++) {
                    let option4 = document.createElement("option");
                    option4.setAttribute("value", array4[i]);
                    let text4 = document.createTextNode(array4[i]);
                    option4.appendChild(text4);
                    select.appendChild(option4);
                }
                break;
            default:
        }
    }
}
