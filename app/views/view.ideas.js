"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/ideas", async function () {
  if (window.localStorage.getItem("token")) {
    let myUser = await kwm.model.getOwnUserId();
    await kwm.model.getMyFavorites(myUser);
    let partner = await kwm.model.getPartner();
    await kwm.model.getAllDateIdeas();
    await this.rendering(true);
    // console.table(kwm.model.dateIdeas);
    // console.log(kwm.model.dateIdeas.length);

/*    if(kwm.model.isSortReverseActive()){
      console.log("wasn't sorted before click");
      localStorage.reverseIsActive = "active";
      sortReverse.classList.add("myBtn-filterActive");
      sortReverse.classList.remove("myBtn-secondary");

      let ideas = document.querySelectorAll(".dateIdea");
      for (let idea of ideas) {
        idea.remove();
      }
      *let reverseIdeas = kwm.model.reversedIdeas;
      for (let post of reverseIdeas) {
        await view.renderPost(post);
      }
    }*/

    // TODO: favorite gets rendered twice when reverse sorted.
    /* POST idea*/
    btn_submit_idea.addEventListener("click", async function (e) {
      e.preventDefault();
      let img_id = await kwm.model.uploadMedia();
      let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
      let checkboxArr = [];
      for (let checkbox of checkboxes) {
        checkboxArr.push(checkbox.value);
      }
      let linkUrl = ""
      if (idea_link.value !== "" || !kwm.utils.isEmpty(idea_link.value)) {
        if (idea_link.value.search("^https://") === -1) {
          linkUrl = "https://" + idea_link.value;
          linkUrl = linkUrl.split(" ").join("");
        }
      }
      let post = {
        title: idea_title.value,
        fields: {
          title: idea_title.value,
          description: idea_description.value,
          image: img_id,
          link: linkUrl
        },
        status: "publish",
        categories: checkboxArr
      };

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
        // view.renderPost(posts);
        kwm.model.dateIdeas.push(posts);
        idea_title.value = "";
        idea_description.value = "";
        idea_link.value = "";
        // kwm.router.changeView();
        //TODO: bessere Lösung?
        location.reload(true);
      });
    });
    addIdea.addEventListener("click", showIdeaForm);

    addIdea.addEventListener("touch", showIdeaForm);

    btn_cancel.addEventListener("click", function () {
      ideaForm.classList.add("hidden");
    })

    sortReverse.addEventListener("click", async function () {
      console.log("clicked sort reverse");
      await kwm.model.getReverseDateIdeas();
      /*      if (kwm.model.isSortReverseActive()) {
              console.log("was sorted reverse before click");
              sortReverse.classList.add("myBtn-secondary");
              sortReverse.classList.remove("myBtn-filterActive");
              localStorage.reverseIsActive = "inactive";

              // TODO: just switch between containers.
              let reverseIdeas = document.querySelectorAll(".dateIdea");
              for (let reverseIdea of reverseIdeas) {
                reverseIdea.remove();
              }
              let ideas = kwm.model.dateIdeas;
              for (let idea of ideas) {
                await view.renderPost(idea);
              }

            } else {
              console.log("wasn't sorted before click");
              localStorage.reverseIsActive = "active";
              sortReverse.classList.add("myBtn-filterActive");
              sortReverse.classList.remove("myBtn-secondary");

              let ideas = document.querySelectorAll(".dateIdea");
              for (let idea of ideas) {
                idea.remove();
              }
              let reverseIdeas = kwm.model.reversedIdeas;
              for (let post of reverseIdeas) {
                await view.renderPost(post);
              }
            }*/
      if (kwm.model.isSortReverseActive()) {
        console.log("reverse sorting INactive");
        sortReverse.classList.add("myBtn-secondary");
        sortReverse.classList.remove("myBtn-filterActive");
        localStorage.reverseIsActive = "inactive";

        // TODO: just switch between containers.
        let reverseIdeas = document.querySelectorAll(".dateIdea");
        let ideaContainer = document.querySelector("#dateIdeas");
        while(ideaContainer.hasChildNodes()){
          ideaContainer.firstChild.remove();
        }

        // console.log("Reverse Ideas", reverseIdeas);
        // either child nodes or really different container.
        // for (let reverseIdea of reverseIdeas) {
        //   console.log("got ", reverseIdea);
        //   reverseIdea.remove();
        // }
        let ideas = kwm.model.dateIdeas;
        // console.table("Model ideas", ideas);
        /*for (let idea of ideas) {
          await view.renderPost(idea);
        }*/

      } else {
        console.log("reverse sorting active");
        localStorage.reverseIsActive = "active";
        sortReverse.classList.add("myBtn-filterActive");
        sortReverse.classList.remove("myBtn-secondary");

        let ideaContainer = document.querySelector("#dateIdeas");
        while(ideaContainer.hasChildNodes()){
          ideaContainer.firstChild.remove();
        }
        console.log(ideaContainer);
        document.querySelectorAll("#dateIdeas");

        let ideas = document.querySelectorAll(".dateIdea");
        // console.log("Model Ideas", ideas);
        for (let idea of ideas) {
          console.log("remove ", idea);
          idea.remove();
        }
        let reverseIdeas = kwm.model.reversedIdeas;
        for (let post of reverseIdeas) {
          await view.renderPost(post);
        }
      }
      /*      console.log("clicked sort reverse");
            let ideaContainer = document.getElementById("dateIdeas");
            // ideaContainer.classList.add("hidden");
            while (ideaContainer.hasChildNodes()) {
              ideaContainer.removeChild(ideaContainer.firstChild);
            }
            let ideas = document.querySelectorAll(".dateIdea");
            for (let idea of ideas) {
              // idea.classList.add("hidden");
              idea.remove();
            }

            let reverseIdeas = kwm.model.reversedIdeas;
            for (let post of reverseIdeas) {
              await view.renderPost(post);
            }*/
    });

    document.querySelector("#categorySelect").addEventListener("change", async function () {
      // localStorage.category=this.value;
      // await view.rendering(false);
      document.querySelector("#categorySelect [value='" + this.value +
        "']").selected = true;
      if (this.value === "no categories") {
        showAllPosts();
      } else {
        filterByCategory(this.value);
      }
    })

    // addEventListenerToHeart(myUser, partner);

    // addHeartsToFavoritePosts();

  }

  function showIdeaForm() {
    ideaForm.classList.remove("hidden");
  }

  function filterByCategory(category) {
    let filteredPosts = document.querySelectorAll("." + category);
    let noFound = document.querySelector("#noFound");
    if (noFound !== null)
      noFound.remove();
    if (filteredPosts.length === 0) {
      console.info("Sorry, no posts with category " + category + " found");
      let p = document.createElement("p");
      let text = document.createTextNode("Sorry, no posts with category " + category +
        " found");
      p.classList.add("mt-3");
      p.id = "noFound";
      p.appendChild(text);
      dateIdeas.append(p);
    }
    let allPosts = document.querySelectorAll(".dateIdea");
    for (let post of allPosts) {
      post.classList.add("hidden");
    }
    for (let filteredPost of filteredPosts) {
      filteredPost.classList.remove("hidden");
    }
  }

  function showAllPosts() {
    let allPosts = document.querySelectorAll(".dateIdea");
    for (let post of allPosts) {
      post.classList.remove("hidden");
    }
  }

  /*function addEventListenerToHeart(myUser, partner){
    let favs = document.getElementsByClassName("favs");
    // console.log("Favs", favs);
    // console.log("Favs", favs.length);

    // event listener for favoriting post.
    for (let fav of favs) {
      fav.addEventListener("click", function () {
        let idea = fav.parentElement.parentElement.parentElement.parentElement;
        let id = idea.getAttribute("data-id");
        let heart = document.querySelector(".dateIdea[data-id='" + id + "'] .favs");
        // console.log(idea);
        /*console.log(id);
        console.log(heart);
        console.log("Me: "+user1+" and my partner: "+user2.id);*!/
        // console.log("Me: ", myUser, " Partner: ", partner.ID, " want to favorite Idea
        // ", id);

        if (kwm.model.ideaIsFavorite(id)) {
          console.log("Idea is favorite");
          let favoriteID = idea.getAttribute("data-parent");
          // console.log("Related to favorite ID: ",favoriteID);
          kwm.model.deleteIdeaFromFavorites(favoriteID);
          // kwm.model.removeFavouriteIdea(id);
          heart.classList.remove("fa-solid");
          heart.classList.add("fa-regular");
        } else {
          kwm.model.addIdeaToFavorites(myUser, partner, id);
          // kwm.model.addFavoriteIdea(id);
          heart.classList.remove("fa-regular");
          heart.classList.add("fa-solid");
        }
      });
    }

  }*/


  /*  for (let idea of kwm.model.dateIdeas) {
      console.log(idea.id);
      if (!kwm.model.ideaIsFavorite(idea.id)) {
        console.log(idea);
        let heart = document.querySelector(".dateIdea[data-id='" + idea.id + "'] .favs");
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
      }
    }*/

  /**
   * Add fa-solid to all ideas that are favorited by that user.
   */
  function addHeartsToFavoritePosts() {
    // add hearts to ideas that are favorites
    for (let idea of kwm.model.dateIdeas) {
      if (kwm.model.ideaIsFavorite(idea.id)) {
        console.log(document.querySelector(".dateIdea[data-id='" + idea.id + "']"));
        console.log(idea.id, " is Favorite");
        let heart = document.querySelector(".dateIdea[data-id='" + idea.id + "'] .favs");
        console.log(heart);
        heart.classList.add("fa-solid");
        heart.classList.remove("fa-regular");
      }
    }
  }

});

view.rendering = async function (paginated) {
  kwm.templater.changeNavIcon("Idea");

  await kwm.templater.renderTemplate("ideas", document.getElementById("kwmJS"));
  /*if(!kwm.utils.isEmpty(localStorage.category)){
    document.querySelector("#categorySelect [value='"+this.value+"']").selected = true;
  }*/

  // FETCH POSTS WITH PAGINATE
  if (paginated) {
    await this.fetchPosts();
    // console.info("paginated posts")
  } else {
    // Fetch all posts
    let ideas = kwm.model.dateIdeas;
    for (let idea of ideas) {
      await view.renderPost(idea);
    }
  }
  /*  if (!kwm.utils.isEmpty(localStorage.favoriteIdeas)) {
      let favIdea = JSON.parse(localStorage.favoriteIdeas);
      for (let favId of favIdea) {
        let heart = document.querySelector(".dateIdea[data-id='" + favId + "'] .favs");
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
      }
    }*/

};

view.fetchPosts = function () {
  fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea?per_page=5")
  .then(
    function (response) {
      // console.log("total Pages: ", response.headers.get("X-WP-TotalPages"));
      view.paginate(response.headers.get("X-WP-TotalPages"));
      return response;
    }
  )/*.then(response => response.json())
  .then(posts => {
    for (let post of posts) {
      kwm.model.dateIdeas.push(post);
      view.renderPost(post)
    }
    console.log("Date Ideas:", kwm.model.dateIdeas);
  });*/
}

view.paginate = function (totalPages) {
  fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea?per_page=5").then(
    response => response.json()
  ).then(posts => {
    for (let post of posts) {
      view.renderPost(post);
    }
    if (totalPages > 1) {
      let button = document.createElement("button");
      button.innerHTML = "Load more";
      button.id = "load_more_posts";
      button.classList.add("myBtn-secondary");
      button.dataset.totalPages = totalPages;
      button.dataset.nextPage = 2;
      // button.removeEventListener("click");
      button.addEventListener("click", function () {
        fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea?per_page=5&page=" +
          this.dataset.nextPage).then(response => response.json())
        .then(posts => {
          for (let post of posts) {
            kwm.model.dateIdeas.push(post);
            view.renderPost(post);
            // console.log("rendered post in pagination ", post);
          }
          button.dataset.nextPage++;
          if (Number(totalPages) === button.dataset.nextPage - 1) {
            button.classList.add("hidden");
          }
        })
      });
      document.getElementById("main_content").append(button);
    }
  });
}

view.renderPost = async function (idea) {
  let ideaBox = document.createElement("div");
  ideaBox.classList.add("dateIdea");
  ideaBox.dataset.id = idea.id;

  ideaBox.dataset.published = idea.date;
  if (kwm.model.ideaIsFavorite(idea.id)) {
    ideaBox.dataset.parent = kwm.model.getRelatedFavoriteID(idea.id);
  }
  let categoryNames = "";
  if (!kwm.utils.isEmpty(idea.categories)) {
    for (let categoryID of idea.categories) {
      let categoryName = await kwm.model.getCategoryName(categoryID);
      categoryNames += categoryName + ",  ";
      categoryName = categoryName.split(" ").join("");
      ideaBox.classList.add(categoryName);
    }
  }
  ideaBox.classList.add("container");
  document.querySelector("#dateIdeas").append(ideaBox);
  let acfIdea = idea.acf;
  if (acfIdea.image === false || kwm.utils.isEmpty(acfIdea.image)) {
    acfIdea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
  }
  if (kwm.utils.isEmpty(acfIdea.link)) {
    acfIdea.link = "";
  }
  if (!kwm.utils.isEmpty(categoryNames)) {
    acfIdea.categories = categoryNames;
  } else {
    acfIdea.categories = "";
  }

  await kwm.templater.renderTemplate("ideas.date-idea", ideaBox, acfIdea);

  let heart = document.querySelector(".dateIdea[data-id='" + idea.id + "'] .favs");

  if (kwm.model.ideaIsFavorite(idea.id)) {
    heart.classList.add("fa-solid");
    heart.classList.remove("fa-regular");
  }

  heart.addEventListener("click", async function () {
    let idea = this.parentElement.parentElement.parentElement.parentElement;
    let id = idea.getAttribute("data-id");
    let heart = document.querySelector(".dateIdea[data-id='" + id + "'] .favs");

    if (kwm.model.ideaIsFavorite(id)) {
      // console.log("Idea is favorite");
      let favoriteID = idea.getAttribute("data-parent");
      kwm.model.deleteIdeaFromFavorites(favoriteID);
      heart.classList.remove("fa-solid");
      heart.classList.add("fa-regular");
    } else {
      kwm.model.addIdeaToFavorites(await kwm.model.getOwnUserId(), kwm.model.getPartner(), id);
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
    }
  });

}