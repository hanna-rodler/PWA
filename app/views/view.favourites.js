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
  await this.rendering();
});


view.rendering = async function () {
  /*let hearts = document.getElementsByClassName("fa-heart")
  for (let h of hearts) {
    h.addEventListener("click", function (e) {
      let target = e.target;
      console.log(target);
      target.classList.remove("fa-regular");
      target.classList.add("fa-solid");
    })
  }*/
  /*let navChange = document.getElementsByClassName("navLink");
  for(let link of navChange){
    link.addEventListener("click", function (){
      kwm.templater.changeNavIcon("Favorite");
    })
  }*/

  // await kwm.templater.changeNavIcon("fa-heart");
  await kwm.templater.changeNavIcon("Favorite");

  await kwm.templater.renderTemplate("favourites", document.getElementById("kwmJS"));
  let favorites = await kwm.model.getAllFavorites();

  await kwm.model.getFavorites();
  /*for (let favorite of favorites) {
    let div = document.createElement("div");
    div.classList.add("favorite");
    document.querySelector("#favorites").append(div);
    console.log(favorite);
    // TODO: check if values are empty.
    kwm.templater.renderTemplate("favorites.favorite", div, favorite);
  }*/
}