'use strict';
import configuratorView from "./configurator-view";

export default class MonsterZooView {
    constructor(controller) {
        this.controller = controller;
        this.gridSelector = document.querySelector(".gridSelector");
        let playSpace = document.querySelector(".playSpace");

        this.gridSelector.append(new Option("Jungle", "Jungle"), new Option("Desert", "Desert"), new Option("North Pole", "North Pole"));
        this.gridSelector.addEventListener("change", () => this.changeZone(playSpace, this.gridSelector.value));

        this.fillZone(playSpace, "Jungle");
    }

    changeZone(playSpace, value) {
        while (playSpace.firstChild) {
            playSpace.removeChild(playSpace.firstChild);
        }
        if (value === "Jungle") {
            this.fillZone(playSpace, "Jungle");
            this.controller.recoverBoard(value);
        }
        if (value === "Desert") {
            this.fillZone(playSpace, "Desert");
            this.controller.recoverBoard(value);
        }
        if (value === "North Pole") {
            this.fillZone(playSpace, "North Pole");
            this.controller.recoverBoard(value);
        }
    }

    fillZone(zone, name) {
        let arr = this.getZone(name);
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === "1") {
                zone.append(this.makeSprite(name, index));
            } else {
                let droppable = this.makeBlank(index);
                droppable.addEventListener('dragover', this.dragOver);

                droppable.addEventListener('drop', this.dragDrop.bind(this));
                zone.append(droppable);
            }
        }
    }

    dragOver(e) {
        e.preventDefault()
    }

    dragDrop(e) {
        let element = document.querySelector(".draggedMonster");
        if (!e.target.classList.contains("monster")) {
            e.target.append(element);
        }
        element.classList.remove("draggedMonster");
        let id = e.target.id;
        // let b = document.createElement("AUDIO");
        // let m = this.controller.getMonsterInformation(element.title)
        // b.setAttribute("src", m.audioFile);
        // element.appendChild(b);
        // b.play();

        this.checkNeighbours(id);
        let loc = element.parentElement.id;
        let m = this.controller.getMonsterInformation(element.title);
        this.controller.updateMonsterLocation(loc,m);
        this.controller.saveMonstersInLocalStorage();
        this.deleteDeleteButton();
    }

    deleteDeleteButton(){
        let btn = document.getElementById("deleteButton");
        if( btn != null){
            btn.parentElement.removeChild(btn);
        }
    }

    checkNeighbours(id) {
        let i = parseInt(id);
        let top = document.getElementById(i - 10);
        let topRight = document.getElementById(i - 9);
        let right = document.getElementById(i + 1);
        let bottomRight = document.getElementById(i + 11);
        let bottom = document.getElementById(i + 10);
        let bottomLeft = document.getElementById(i + 9);
        let left = document.getElementById(i - 1);
        let topLeft = document.getElementById(i - 11);


        let neighbours = [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];

        for (let i = 0; i < neighbours.length; i++) {
            if (neighbours[i] != null) {


                let ntc = neighbours[i].firstChild;
                if (ntc != null) {
                    let type = ntc.title;
                    let monsters = this.controller.monstersInZoo;
                    for (let i = 0; i < monsters.length; i++) {

                        if (type === monsters[i].getMonsterInformation()) {
                            this.animateCSS(ntc, 'bounce');
                        }
                    }

                }
            }
        }
    }

    animateCSS(element, animationName, callback) {
        let node = element;
        node.classList.add('animated', animationName)

        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)

            if (typeof callback === 'function') callback()
        }

        node.addEventListener('animationend', handleAnimationEnd)
    }

    getZone(zone) {
        var array;
        switch (zone) {
            case "Jungle":
                array = ["0", "1", "0", "0", "1", "1", "0", "0", "0", "1", "1", "0", "0", "1", "0", "0", "1", "0", "0", "1", "1", "0", "1", "0", "0", "0", "0", "1", "0", "1", "1", "1", "0", "0", "0", "0", "0", "0", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "1", "1", "0", "1", "0", "0", "0", "0", "0", "0", "1", "1", "0", "0", "1", "0", "0", "0", "0", "0", "1", "1", "0", "0", "0", "1", "1", "0", "0", "0", "1"];
                break;
            case "Desert":
                array = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
                break;
            case "North Pole":
                array = ["0", "0", "0", "0", "1", "1", "0", "0", "0", "1", "0", "0", "0", "1", "0", "0", "1", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "1", "0", "0", "0", "0"];
                break;
        }
        return array;
    }

    makeSprite(zone, id) {
        let undroppable = document.createElement('canvas');
        let ctx = undroppable.getContext("2d");
        ctx.canvas.height = 100;
        ctx.canvas.width = 100;
        let grd = ctx.createRadialGradient(70, 50, 5, 90, 60, 100);
        switch (zone) {
            case "Jungle":
                grd.addColorStop(0, "green");
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, 98, 98);
                break;
            case "Desert":
                grd.addColorStop(0, "yellow");
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, 98, 98);
                break;
            case "North Pole":
                grd.addColorStop(0, "cyan");
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, 98, 98);
                break;
        }
        let div = document.createElement('div');
        div.classList.add("undroppable");
        div.setAttribute("id", id);

        div.append(undroppable);
        return div;
    }

    makeBlank(id) {
        let div = document.createElement('div');
        div.classList.add("droppable");
        div.setAttribute("id", id);
        return div;
    }
}