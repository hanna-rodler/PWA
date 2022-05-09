"use strict";

// console.log("Hello, I am PWA");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
  .then(function () {
    // console.log("Service Worker registered");
  });
}

// Hab ich schon einen Token?
if (window.localStorage.getItem("token")) {
  login_state.classList.remove("red");
  user_display_name.innerHTML = "Willkommen zurück, " +
    window.localStorage.getItem("user_display_name") + "!";
  form_login.style.display = "none";
  // frm_submit_post.classList.add("visible");
} else {
  // Bin leider nicht eingeloggt
  // btn_login.removeEventListener("click");
  btn_login.addEventListener("click", function (e) {
    e.preventDefault(); // prevent Submit of Form

    let credentials = {
      username: username.value,
      password: password.value
    }
    fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/jwt-auth/v1/token",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
      }).then(function (response) {
      if (response.status !== 200) {
        alert("Fehlgeschlagen! " + response.status)
        console.log(response);
        return false;
      }
      return response;
    }).then(response => response.json())
    .then(response => {
        window.localStorage.setItem("token", response.token)
        window.localStorage.setItem("user_display_name", response.user_display_name);
        login_state.classList.remove("red");
        user_display_name.innerHTML = "Willkommen zurück, " +
          window.localStorage.getItem("user_display_name") + "!";
        form_login.style.display = "none";
        frm_submit_post.classList.add("visible");
      }
    )
  });
}

/*** PAGINATION***/

/*
fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/posts?per_page=3")
.then(function (response) {
  paginate(response.headers.get("X-WP-TotalPages"));
  return response;
}).then(response => response.json())
.then(posts => renderPosts(posts));

function renderPosts(posts) {
  // TODO: render posts like I want them to be rendered.
  let posts_container = document.getElementById("posts");
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

function paginate(totalPages) {
  //TODO: change Pagination a little bit.
  if (totalPages > 1) {
    let button = document.createElement("button");
    button.innerHTML = "Mehr laden!";
    button.id = "load_more_posts";
    button.dataset.totalPages = totalPages;
    button.dataset.nextPage = 2;
    // button.removeEventListener("click");
    button.addEventListener("click", function () {
      fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/posts?per_page=3&page=" +
        this.dataset.nextPage).then(response => response.json())
      .then(posts => {
        renderPosts(posts);
        button.dataset.nextPage++;
      })
    });
    resources.append(button);
  }
}*/
