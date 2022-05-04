"use strict";

console.log("Hello, World");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
  .then(function () {
    console.log("Service Worker registered");
  });
}

// Hab ich schon einen Token?
if (window.localStorage.getItem("token")) {
  login_state.classList.remove("red");
  user_display_name.innerHTML = "Willkommen zurück, " +
    window.localStorage.getItem("user_display_name") + "!";
  form_login.style.display = "none";
  frm_submit_post.classList.add("visible");
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