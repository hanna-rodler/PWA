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
    console.info("log in");

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
        savePartner();
        // let partner = getPartner();
        // console.log(partner);
        user_display_name.innerHTML = "Willkommen zurück, " +
          window.localStorage.getItem("user_display_name")+"!";
        /*user_display_name.innerHTML = "Willkommen zurück, " +
          window.localStorage.getItem("user_display_name") + " with partner " +
          partner.display_name + "!";*/
        form_login.style.display = "none";
        // frm_submit_post.classList.add("visible");
      }
    )
  });
}

function getPartner() {
  if (!kwm.utils.isEmpty(localStorage.partner)) {
    console.log("partner not empty");
    // console.log(JSON.parse(localStorage.partner));
    return JSON.parse(localStorage.partner);
  } else {
    savePartner();
    return JSON.parse(localStorage.partner);
  }
}

function savePartner() {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/users/me", requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result.acf.partner);
    // console.log(result.acf.partner.ID);
    let partner = {
      "ID": result.acf.partner.ID,
      "display_name": result.acf.partner.display_name,
      "nickname": result.acf.partner.nickname
    }
    window.localStorage.setItem("partner", JSON.stringify(partner));
  })
  .catch(error => console.log('error', error));
}

/** POST Abschicken**/
btn_submit_invite.addEventListener("click", async function (e) {
  e.preventDefault();
  let img_id = await uploadMedia();
  console.warn("IMG ID:", img_id);
  let post = {
    title: invite_title.value,
    fields: {
      title: invite_title.value,
      text: invite_text.value,
      ph: img_id
    },
    status: "publish"
  };
  console.log("POST", post);
  fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/invitation", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Authorization": "Bearer " + window.localStorage.getItem("token"),
    },
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
    // renderPosts([posts]);
    invite_title.value = "";
    invite_text.value = "";
  });

});

async function uploadMedia() {
  let img_id = "";
  return new Promise(async function (resolve, reject) {
    const media = document.getElementById("post_media");
    console.warn("Media: ", media);
    const formData = new FormData();
    formData.append("file", media.files[0]);
    await fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/media", {
      method: "POST",
      headers: {
        //when using FormData(), the
        //'Content-Type' will automatically be set to 'form/multipart'
        //so there's no need to set it here
        "Authorization": "Bearer " + window.localStorage.getItem("token")
      },
      body: formData
    }).then(response => response.json())
    .then(data => {
      img_id = data.id;
      resolve(img_id);
    })
    .catch(err => {
      reject(err);
    });
    resolve(img_id);
  })

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
