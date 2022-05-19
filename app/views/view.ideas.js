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
  // kwm.templater.changeNavIcon("fa-lightbulb");

  await kwm.templater.renderTemplate("ideas", document.getElementById("kwmJS"));

  let ideas = await kwm.model.getAllDateIdeas();
  for(let idea of ideas){
    let div = document.createElement("div");
    // div.classList.add("card");
    div.classList.add("dateIdea");
    div.classList.add("container");
    document.querySelector("#dateIdeas").append(div);
   console.log(idea);
   if(idea.image === false){
     idea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
     // console.log(idea.title, "has no img");
     // console.log(idea.image);
   }
    // TODO: check if values are empty.
    kwm.templater.renderTemplate("ideas.date-idea", div, idea);
  }
};