"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/ideas", async function () {
  if (window.localStorage.getItem("token")) {
    // await kwm.model.getAllDateIdeas();
    await this.rendering();
    let myUser = await kwm.model.getOwnUserId();
    let partner = await kwm.model.getPartner();

    let favs = document.getElementsByClassName("favs");
    // console.log(favs);

    // event listener for favoriting post.
    for (let fav of favs) {
      fav.addEventListener("click", function () {
        let idea = fav.parentElement.parentElement.parentElement.parentElement;
        let id = idea.getAttribute("data-id");
        let heart = document.querySelector(".dateIdea[data-id='" + id + "'] .favs");
        /*console.log(idea);
        console.log(id);
        console.log(heart);
        console.log("Me: "+user1+" and my partner: "+user2.id);*/
        console.log("Me: ", myUser, " Partner: ", partner.ID, " want to favorite Idea ", id);

        if (kwm.model.ideaIsFavorite(id)) {
          kwm.model.deleteIdeaFromFavorites(idea.getAttribute("data-parent"));
          // TODO: delte idea from favorites but don't delete Idea
          kwm.model.removeFavouriteIdea(id);
          heart.classList.remove("fa-solid");
          heart.classList.add("fa-regular");
        } else {
          kwm.model.addIdeaToFavorites(myUser, partner, id);
          kwm.model.addFavoriteIdea(id);
          heart.classList.remove("fa-regular");
          heart.classList.add("fa-solid");
        }
      });
    }

    /* POST idea*/
    btn_submit_idea.addEventListener("click", async function (e) {
      e.preventDefault();
      let img_id = await kwm.model.uploadMedia();
      // console.warn("IMG ID: ", img_id);
      // console.log(idea_link.value);
      let checkboxes = document.querySelectorAll("input[type='checkbox']");
      console.log(checkboxes);
      let checkboxArr = [];
      for (let checkbox of checkboxes) {
        console.log(checkbox.value);
        checkboxArr.push(checkbox.value);
      }
      console.log(checkboxArr);
      let post = {
        title: idea_title.value,
        fields: {
          title: idea_title.value,
          description: idea_description.value,
          image: img_id,
          link: idea_link.value
        },
        status: "publish",
        categories: checkboxArr
      };
      console.log("POST ", post);

      fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea", {
        method: "POST",
        headers: await kwm.model.getHeader(),
        body: JSON.stringify(post)
      }).then(function (response) {
        if (response.status !== 201) {
          alert("Fehlgeschlagen: " + response.status);
          console.error(response);
          return false;
        }
        return response;
      }).then(response => response.json())
      .then(posts => {
        console.log(posts);
        kwm.model.dateIdeas.push(posts);
        idea_title.value = "";
        idea_description.value = "";
        idea_link.value = "";
        // kwm.router.changeView();
        //TODO: bessere Lösung?
        location.reload(true);
      });
    });
  }

});

view.rendering = async function () {
  kwm.templater.changeNavIcon("Idea");

  await kwm.templater.renderTemplate("ideas", document.getElementById("kwmJS"));
  // await kwm.model.getAllDateIdeas();
  await kwm.model.getAllDateIdeas();
  let ideas = kwm.model.dateIdeas;
  // console.table(ideas);
  for (let idea of ideas) {
    /*let ideaBox = document.createElement("div");
    ideaBox.classList.add("dateIdea");
    ideaBox.dataset.id = idea.id;
    // ideaBox.classList.add("card");
    ideaBox.classList.add("container");
    document.querySelector("#dateIdeas").append(ideaBox);
    // console.log("Idea: ", idea);
    idea = idea.acf;
    // console.log("ACF idea: ", idea);
    if (idea.image === false || kwm.utils.isEmpty(idea.image)) {
      idea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
    }
    if (kwm.utils.isEmpty(idea.link)) {
      idea.link = "";
    }
    await kwm.templater.renderTemplate("ideas.date-idea", ideaBox, idea);*/
    await this.renderPost(idea);
  }

  if (!kwm.utils.isEmpty(localStorage.favoriteIdeas)) {
    let favIdea = JSON.parse(localStorage.favoriteIdeas);
    for (let favId of favIdea) {
      let heart = document.querySelector(".dateIdea[data-id='" + favId + "'] .favs");
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

view.renderPost = async function (idea) {
  // console.log("RENDERING POST");
  let ideaBox = document.createElement("div");
  ideaBox.classList.add("dateIdea");
  // ideaBox.classList.add(categoryNames);
  ideaBox.dataset.id = idea.id;
  // ideaBox.classList.add("card");
  let categoryNames = " ";
  if (!kwm.utils.isEmpty(idea.categories)) {
    // console.log(idea);
    // console.info(idea.categories);
    for (let categorie of idea.categories) {
      ideaBox.classList.add(await kwm.model.getCategoryName(categorie));
      categoryNames += await kwm.model.getCategoryName(categorie) + "  ";
    }
    console.log(categoryNames);
  }
  ideaBox.classList.add("container");
  document.querySelector("#dateIdeas").append(ideaBox);
  // console.log("Idea: ", idea);
  idea = idea.acf;
  // console.log("ACF idea: ", idea);
  if (idea.image === false || kwm.utils.isEmpty(idea.image)) {
    idea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
  }
  if (kwm.utils.isEmpty(idea.link)) {
    idea.link = "";
  }
  console.log("Idea: ", idea);
  if (!kwm.utils.isEmpty(categoryNames)){
    let i = document.createElement("i");
    // i.classList.add("fa-solid");
    // i.classList.add("fa-tags");
    // idea.categories= i + categoryNames;
    idea.categories= categoryNames;
    // console.log("Idea with Categories: ", idea);
  } else {
    idea.categories="";
  }
  await kwm.templater.renderTemplate("ideas.date-idea", ideaBox, idea);
}