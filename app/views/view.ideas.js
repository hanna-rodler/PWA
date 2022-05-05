"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/ideas", async function(){
  await this.rendering();
});

view.rendering = async function(){
  await kwm.templater.renderTemplate("ideas", document.getElementById("kwmJS"));

  let ideas = await kwm.model.getAllDateIdeas();
  for(let idea of ideas){
    let div = document.createElement("div");
    div.classList.add("dateIdea");
    document.querySelector("#dateIdeas").append(div);
    console.log(idea);
    kwm.templater.renderTemplate("ideas.date-idea", div, idea);
  }
};