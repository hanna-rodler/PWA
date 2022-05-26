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
  user_display_name.innerHTML = "Willkommen zurück, " +
    window.localStorage.getItem("user_display_name") + "!";
  form_login.style.display = "none";
  headerNav.classList.remove("hidden");
  kwmJS.classList.remove("hidden");
  Notification.requestPermission();
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
      savePartner();
      location.reload(true);
      // let partner = getPartner();
        // console.log(partner);
        user_display_name.innerHTML = "Willkommen zurück, " +
          window.localStorage.getItem("user_display_name") + "!";
        form_login.style.display = "none";
        headerNav.classList.remove("hidden");
        kwmJS.classList.remove("hidden");
      Notification.requestPermission();
      this.changeView();
      }
    )
  });
}

function getPartner() {
  if (!kwm.utils.isEmpty(localStorage.partner)) {
    // console.log(JSON.parse(localStorage.partner));
    return JSON.parse(localStorage.partner);
  } else {
    savePartner();
  }
}

async function savePartner() {
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
