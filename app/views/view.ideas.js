"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/ideas", async function () {
  if (window.localStorage.getItem("token")) {
    // await kwm.model.getAllDateIdeas();
    let myUser = await kwm.model.getOwnUserId();
    await kwm.model.getMyFavorites(myUser);
    // await kwm.model.getReverseDateIdeas();
    let partner = await kwm.model.getPartner();
    await this.rendering();
    // console.log(document.querySelectorAll(".dateIdea"));
    console.table(kwm.model.dateIdeas);
    console.log(kwm.model.dateIdeas.length);

    // add hearts to ideas that are favorites
    for (let idea of kwm.model.dateIdeas) {
      // console.log(idea.id);
      if (kwm.model.ideaIsFavorite(idea.id)) {
        // console.log(idea.id, " is Favorite");
        // console.log(document.querySelector(".dateIdea[data-id='" + idea.id + "']"));
        let heart = document.querySelector(".dateIdea[data-id='" + idea.id + "'] .favs");
        // console.log(heart);
        heart.classList.add("fa-solid");
        heart.classList.remove("fa-regular");
      }
    }

    let favs = document.getElementsByClassName("favs");
    console.log("Favs", favs);
    console.log("Favs", favs.length);

    // event listener for favoriting post.
    for (let fav of favs) {
      fav.addEventListener("click", function () {
        let idea = fav.parentElement.parentElement.parentElement.parentElement;
        let id = idea.getAttribute("data-id");
        let heart = document.querySelector(".dateIdea[data-id='" + id + "'] .favs");
        // console.log(idea);
        /*console.log(id);
        console.log(heart);
        console.log("Me: "+user1+" and my partner: "+user2.id);*/
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

    /* POST idea*/
    btn_submit_idea.addEventListener("click", async function (e) {
      e.preventDefault();
      let img_id = await kwm.model.uploadMedia();
      // console.warn("IMG ID: ", img_id);
      // console.log(idea_link.value);
      let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
      console.log(checkboxes);
      let checkboxArr = [];
      for (let checkbox of checkboxes) {
        checkboxArr.push(checkbox.value);
      }
      // console.log(checkboxArr);
      let linkUrl = ""
      if (idea_link.value !== "" || !kwm.utils.isEmpty(idea_link.value)) {
        if (idea_link.value.search("^https://") === -1) {
          console.log("no https//");
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
        // location.reload(true);
      });
    });

    addIdea.addEventListener("click", showIdeaForm);
    addIdea.addEventListener("touch", showIdeaForm);

    btn_cancel.addEventListener("click", function () {
      ideaForm.classList.add("hidden");
    })
    sortReverse.addEventListener("click", async function () {
      await kwm.model.getReverseDateIdeas()
      console.log("clicked sort reverse");
      let ideaContainer = document.getElementById("dateIdeas");
      // ideaContainer.classList.add("hidden");
      while (ideaContainer.hasChildNodes()){
        ideaContainer.removeChild(ideaContainer.firstChild);
      }
      let ideas = document.querySelectorAll(".dateIdea");
      for(let idea of ideas){
        idea.classList.add("hidden");
      }

      let reverseIdeas = kwm.model.reversedIdeas;
      for (let post of reverseIdeas) {
        console.log(post);
        view.renderPost(post);
      }

    });

    document.querySelector("#categorySelect").addEventListener("change", function () {
      console.log(this.value);
      if (this.value === "no categories") {
        showAllPosts();
      } else {
        filterByCategory(this.value);
      }
    })
  }

  function showIdeaForm() {
    ideaForm.classList.remove("hidden");
  }

  function filterByCategory(category) {
    let filteredPosts = document.querySelectorAll("." + category);
    // console.log(filteredPosts);
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

});

view.rendering = async function () {
  kwm.templater.changeNavIcon("Idea");

  await kwm.templater.renderTemplate("ideas", document.getElementById("kwmJS"));
  await kwm.model.getAllDateIdeas();
  let ideas = kwm.model.dateIdeas;
  for (let idea of ideas) {
    await this.renderPost(idea);
  }

  // FETCH POSTS WITH PAGINATE
  // await this.fetchPosts();


  if (!kwm.utils.isEmpty(localStorage.favoriteIdeas)) {
    let favIdea = JSON.parse(localStorage.favoriteIdeas);
    for (let favId of favIdea) {
      let heart = document.querySelector(".dateIdea[data-id='" + favId + "'] .favs");
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
    }
  }

};

view.fetchPosts = async function () {
  return new Promise(resolve => {
    console.log("fetching posts");
    fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea?per_page=5")
    .then(
      function (response) {
        console.log("total Pages: ", response.headers.get("X-WP-TotalPages"));
        view.paginate(response.headers.get("X-WP-TotalPages"));
        return response;
      }
    ).then(response => response.json())
    .then(posts => {
      for (let post of posts) {
        kwm.model.dateIdeas.push(post);
        view.renderPost(post)
      }
      console.log("Date Ideas", kwm.model.dateIdeas);
      resolve(posts);
    });
  });
}

view.paginate = function (totalPages) {
  if (totalPages > 1) {
    let button = document.createElement("button");
    button.innerHTML = "Mehr laden!";
    button.id = "load_more_posts";
    button.dataset.totalPages = totalPages;
    button.dataset.nextPage = 2;
    // button.removeEventListener("click");
    button.addEventListener("click", function () {
      fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea?per_page=5&page=" +
        this.dataset.nextPage).then(response => response.json())
      .then(posts => {
        console.log("rendering posts after btn click");
        for (let post of posts) {
          kwm.model.dateIdeas.push(post);
          view.renderPost(post);
        }
        button.dataset.nextPage++;
      })
    });
    document.getElementById("main_content").append(button);
  }
}

view.renderPost = async function (idea) {
  // console.log("RENDERING POST");
  let ideaBox = document.createElement("div");
  ideaBox.classList.add("dateIdea");
  // ideaBox.classList.add(categoryNames);
  ideaBox.dataset.id = idea.id;
  // console.log(idea.date);
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
  // console.log("Idea: ", idea);
  idea = idea.acf;
  // console.log("ACF idea: ", idea);
  if (idea.image === false || kwm.utils.isEmpty(idea.image)) {
    idea.image = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/anastasia-lysiak-3EY-p8uyNTg-unsplash_squareMini.jpg";
  }
  if (kwm.utils.isEmpty(idea.link)) {
    idea.link = "";
  }
  // console.log("Idea: ", idea);
  if (!kwm.utils.isEmpty(categoryNames)) {
    /*let i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-tags");
    idea.categories= i + categoryNames;*/
    idea.categories = categoryNames;
    // console.log("Idea with Categories: ", idea);
  } else {
    idea.categories = "";
  }
  await kwm.templater.renderTemplate("ideas.date-idea", ideaBox, idea);
}