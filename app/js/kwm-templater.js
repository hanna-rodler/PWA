"use strict";
/*******************************************************
 *
 *
 *     KWM - 2022-03-30
 *******************************************************/

export default class KWM_Templater {
  constructor(templatePath) {
    this.templatePath = templatePath;
  }

  renderTemplate(templateName, container, values = false) {
    /*console.info("Template Name:", templateName);
    console.log("Values: ", values);
    console.info(this.templatePath+templateName+".tpl");*/
    return new Promise((resolve, reject) => {
      fetch(this.templatePath + templateName + ".tpl")
      .then(response => response.text())
      .then(template => {
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

  findAndFillEscapings(regex, open, close, mode, template, values = false) {
    let even = true;
    let rendered = template;
    let result;
    while (result = regex.exec(template)) {
      even ? open.push(result.index) : close.push(result.index);
      even = !even;
    }
    for (let i = 0; i < open.length; i++) {
      let toReplace = template.substring(open[i] + 3, close[i]);
      let replacing = mode === "translate" ? kwm.translator.translate(toReplace) :
        values[toReplace];
      rendered = rendered.replace(template.substring(open[i], close[i] +
        3), replacing);
    }
    return rendered;
  }

  changeNavIcon(navItem) {
    this.removeSolidIcon();
    switch (navItem) {
      case "Favorite":
        this.renderSolidIcon("fa-heart");
        break;
      case "Idea":
        this.renderSolidIcon("fa-lightbulb");
        break;
      case "Invite":
        this.renderSolidIcon("fa-envelope");
        break;
      case "Profile":
        this.renderSolidIcon("fa-user");
        break;
      default:
        console.error("Default Case");
    }
  }

  removeSolidIcon() {
    let icons = document.getElementsByClassName("fa-solid");
    for (let solid of icons) {
      solid.classList.remove("fa-solid");
      solid.classList.remove("active");
      solid.parentElement
      solid.classList.add("fa-regular");
    }
  }

  renderSolidIcon(iconName) {
    let icons = document.getElementsByClassName(iconName);
    for (let icon of icons) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      icon.classList.add("active");
    }
  }

  fetchPosts(postType) {
    fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea?per_page=5")
    .then(
      function (response) {
        console.log(response.headers.get("X-WP-TotalPages"));
        kwm.templater.paginate(response.headers.get("X-WP-TotalPages"));
        return response;
      }
    ).then(response => response.json())
    .then(posts => this.renderPosts(posts));
  }

  paginate(totalPages) {
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
          kwm.templater.renderPosts(posts);
          button.dataset.nextPage++;
        })
      });
      document.getElementById("main_content").append(button);
    }

  }

  renderPosts(posts) {
    // TODO: render posts like I want them to be rendered.
    let posts_container = document.getElementById("main_content");
    for (let post of posts) {
      let post_container = document.createElement("div");
      post_container.classList.add("post");
      post_container.dataset.resourceid = post.id;
      let post_h3 = document.createElement("h3");
      post_h3.innerHTML = post.title.rendered;
      posts_container.append(post_h3);
      let post_content = document.createElement("p");
      post_content.innerHTML = post.content.rendered;
      post_container.append(post_content);
      posts_container.append(post_container);
    }
  }
}