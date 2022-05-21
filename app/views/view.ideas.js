"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/ideas", async function(){
  await kwm.model.getAllWPDateIdeas();
  console.log("got date Ideas")
  await this.rendering();
  console.log("rendered template");

  let favs = document.getElementsByClassName("favs");
  console.log(favs);
  for(let fav of favs){
    fav.addEventListener("click", function(){
      let idea = fav.parentElement.parentElement.parentElement.parentElement;
      let id = idea.getAttribute("data-id");
      let heart = document.querySelector(".dateIdea[data-id='"+id+"'] .favs");
      // console.log(idea);
      // console.log(id);
      // console.log(heart);
      if(kwm.model.ideaIsFavorite(id)){
        kwm.model.removeFavouritePet(id);
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
      }else {
        kwm.model.addFavoriteIdea(id);
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
      }
    });
  }

});

view.rendering = async function(){
  // kwm.templater.changeNavIcon("fa-lightbulb");
  kwm.templater.changeNavIcon("Idea");

  await kwm.templater.renderTemplate("ideas", document.getElementById("kwmJS"));

  let ideas = kwm.model.dateIdeas;
  // console.table(ideas);
  for(let idea of ideas){
    let ideaBox = document.createElement("div");
    ideaBox.classList.add("dateIdea");
    ideaBox.dataset.id = idea.id;
    // ideaBox.classList.add("card");
    ideaBox.classList.add("container");
    document.querySelector("#dateIdeas").append(ideaBox);
    // console.log("Idea: ", idea);
    idea = idea.acf;
    // console.log("ACF idea: ", idea);
    if(idea.image === false || kwm.utils.isEmpty(idea.image)){
      idea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
    }
    if(kwm.utils.isEmpty(idea.link)){
      idea.link = "";
    }
    await kwm.templater.renderTemplate("ideas.date-idea", ideaBox, idea);
  }

  if(!kwm.utils.isEmpty(localStorage.favoriteIdeas)){
    let favIdea = JSON.parse(localStorage.favoriteIdeas);
    for(let favId of favIdea){
      let heart = document.querySelector(".dateIdea[data-id='"+favId+"'] .favs");
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
    }
  }

  //ACF
  /*console.table(ideas);
  for(let idea of ideas){
    let ideaBox = document.createElement("div");
    ideaBox.classList.add("dateIdea");
    console.warn("Id", idea.id);
    ideaBox.dataset.id = idea.id;
    // ideaBox.classList.add("card");
    ideaBox.classList.add("container");
    document.querySelector("#dateIdeas").append(ideaBox);
   // console.log(idea);
   if(idea.image === false || kwm.utils.isEmpty(idea.image)){
     idea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
   }
   if(kwm.utils.isEmpty(idea.link)){
      idea.link = "";
   }
    // TODO: check if values are empty.
    kwm.templater.renderTemplate("ideas.date-idea", ideaBox, idea);
  }*/
};