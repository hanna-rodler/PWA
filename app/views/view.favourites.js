"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Sample Home-View given with the framework. This view may well be edited.
 *
 *     How to use views:
 *     1.) Export a new KWM_Route. Give it two @params:
 *       - The slug for it's Url, relative to the webroot
 *       - The function that is called, when the view is initiated.
 *
 *     2.) Import the View to and add the view-name (view.NAME.js) to the views-
 *         property in kmw-config.js
 *
 *     3.) Edit the view as it pleases you. Most likely  you will want to render
 *         some Templates, as seen in this example.
 *
 *     Hint:
 *     You may give the variable "view" in this file a  different name  without
 *     consequences. It is recommended to be view, and then be renamed in the
 *     import-statement of the config-file.
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/", async function () {
  if(window.localStorage.getItem("token")){
    // TODO: show new ones also when loaded once.
    let myUser = await kwm.model.getOwnUserId();
    await kwm.model.getMyFavorites(myUser);
    await this.rendering();
    sync_favorites.addEventListener("click", function (){
      location.reload(true);
    })
  }
});


view.rendering = async function () {
  await kwm.templater.changeNavIcon("Favorite");

  await kwm.templater.renderTemplate("favourites", document.getElementById("kwmJS"));
  let favorites = kwm.model.favorites;

  for (let favorite of favorites) {
    let favBox = document.createElement("div");
    favBox.classList.add("favorite");
    favBox.dataset.id=favorite.id;
    favBox.classList.add("container");
    document.querySelector("#favorites").append(favBox);
    // console.log(favorite.idea);
    let idea = await kwm.model.getDateIdeaById(favorite.acf.idea);
    favBox.dataset.parent=idea.id;
    // console.log(idea);
    let acfIdea = idea.acf
    if(acfIdea.image === false || kwm.utils.isEmpty(acfIdea.image)){
      acfIdea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
    }
    if(kwm.utils.isEmpty(acfIdea.link)){
      acfIdea.link = "";
    }
    await kwm.templater.renderTemplate("favorites.favorite", favBox, acfIdea);

    let heart = document.querySelector(".favorite[data-id='"+favorite.id+"'] .favs");

    heart.addEventListener("click", function (){
      let favIdea = this.parentElement.parentElement.parentElement.parentElement;
      let id = favIdea.getAttribute("data-id");
      // console.log("Idea ", favIdea, " id: ", id);

      heart.classList.remove("fa-solid");
      heart.classList.add("fa-regular");
      kwm.model.deleteIdeaFromFavorites(id);
      // kwm.model.removeFavouriteIdea(favIdea.getAttribute("data-parent"));

      let favPost = document.querySelector(".favorite[data-id='"+id+"']");
      // console.log("removing", favPost);
      setTimeout(function (){
        favPost.remove();
      }, 200);
    })

  }
}