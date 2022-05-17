"use strict";
/*******************************************************
 *
 *
 *     KWM - 2022-03-30
 *******************************************************/

export default class KWM_Templater{
    constructor(templatePath){
        this.templatePath = templatePath;
    }

    renderTemplate(templateName, container, values = false){
        /*console.info("Template Name:", templateName);
        console.log("Values: ", values);
        console.info(this.templatePath+templateName+".tpl");*/
        return new Promise((resolve, reject) => {
            fetch(this.templatePath+templateName+".tpl")
                .then(response => response.text())
                .then(template=> {
                    let translations = /<%>/gi,
                        data = /<&>/gi,
                        translations_open = [],
                        translations_close = [],
                        data_open = [],
                        data_close = [];

                    let rendered = this.findAndFillEscapings(data, data_open, data_close, "fill", template, values);
                    rendered = this.findAndFillEscapings(translations, translations_open, translations_close, "translate", rendered);
                    container.innerHTML = rendered;
                    resolve();
                });
        });
    }

    findAndFillEscapings(regex, open, close, mode, template, values = false){
        let even = true;
        let rendered = template;
        let result;
        while(result = regex.exec(template)){
            even ? open.push(result.index): close.push(result.index);
            even = !even;
        }
        for(let i = 0; i < open.length; i++){
            let toReplace = template.substring(open[i]+3, close[i]);
            let replacing = mode === "translate" ? kwm.translator.translate(toReplace) : values[toReplace];
            rendered = rendered.replace(template.substring(open[i], close[i]+3), replacing);
        }
        return rendered;
    }

    changeNavIcon(navItem){

        this.removeSolidIcon();
        switch(iconClass, navItem) {
            case "Favorite":
                this.renderSolidIcon("fa-heart");
                break;
            case "Idea":
                this.renderSolidIcon("fa-lightbulb");
                break;
            case "Inivte":
                this.renderSolidIcon("fa-envelope");
                break;
            case "Profile":
                console.log("Profile");
                this.renderSolidIcon("fa-user");
                break;
            default:
                console.error("Default Case");
        }
        /*let icons = document.getElementsByClassName(iconClass)
        for (let icon of icons) {
            icon.addEventListener("click", function (e) {
                let target = e.target;
                if(target.classList.contains("fa-regular")){
                    console.info("regular icon");
                    target.classList.remove("fa-regular");
                    target.classList.add("fa-solid");
                }
                else if(target.classList.contains("fa-solid")){
                    console.info("solid icon");
                    target.classList.remove("fa-solid");
                    target.classList.add("fa-regular");
                }
            })
        }*/
    }

    removeSolidIcon(){
        let icons = document.getElementsByClassName("fa-solid");
        for(let solid of icons){
            solid.classList.remove("fa-solid");
            solid.classList.add("fa-regular");
        }
    }

    renderSolidIcon(iconName){
        let icons = document.getElementsByClassName(iconName);
        for(let icon of icons){
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }
    }
}