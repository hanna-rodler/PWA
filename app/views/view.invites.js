"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/invites", async function(){
  await this.rendering();
});

view.rendering = async function(){
  // kwm.templater.changeNavIcon("fa-envelope");
  kwm.templater.changeNavIcon("Invite");

  await kwm.templater.renderTemplate("invites", document.getElementById("kwmJS"));

  let invitations = await kwm.model.getAllInvitations();
  console.table(invitations);
  for(let invite of invitations){
    let div = document.createElement("div");
    div.classList.add("invitation");
    // div.classList.add("card");
    div.classList.add("container");
    document.querySelector("#invitations").append(div);
    console.log(invite);
    console.info(invite.ph);
    if(kwm.utils.isEmpty(invite.ph) || invite.ph === false){
      invite.ph = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/love-letter.png";
      console.log(invite.ph);
    }
    kwm.templater.renderTemplate("invites.invitation", div, invite);
  }

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
        "Content-Type" : 'application/json',
        "Authorization" : "Bearer "+window.localStorage.getItem("token"),
      },
      body : JSON.stringify(post)
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

};