"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/invites", async function () {
  if (window.localStorage.getItem("token")) {
    let myUser = await kwm.model.getOwnUserId();
    let partner = await kwm.model.getPartner();
    await kwm.model.getMyInvitations(myUser);
    await this.rendering(myUser);
    if(kwm.model.closedDateInvitation(myUser, partner)){

    }


    test_notification.addEventListener("click", function () {
      const title = "Date Invitation";
      const options = {
        body: "Hanna is inviting you on a date",
        vibrate: [200, 100, 200]
      }
      new Notification(title, options);
    });

    send_invite.addEventListener("click", async function (e) {
      e.preventDefault();
      console.log(invite_dateTime.value);
      let linkUrl = ""
      if (meeting_link.value !== "" || !kwm.utils.isEmpty(meeting_link.value)) {
        if (meeting_link.value.search("^https://") === -1) {
          console.log("no https//");
          linkUrl = "https://" + meeting_link.value;
          linkUrl = linkUrl.split(" ").join("");
        }
      }
      let post = {
        title: invite_title.value,
        fields: {
          title: invite_title.value,
          text: invite_description.value,
          ph: "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/closed-letter.png",
          link: linkUrl,
          date: invite_dateTime.value,
          invitor: myUser,
          invited: partner.ID
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
        invite_description.value = "";
        meeting_link.value = "";
        invite_dateTime.value = "";
        // location.reload(true);
      });

    });

    /*let invitations = document.querySelectorAll(".invitation");
    for(let invite of invitations){
      invite.addEventListener("click", function (e){
        console.log(e.target);
        let invitationCard = e.target.closest(".invitation");
        console.log(invitationCard.getAttribute("data-id"));
      //  TODO detail View?
      })
    }*/

    let acceptionChecks = document.getElementsByClassName("acceptCheck");
    console.log("found", acceptionChecks);
    console.log("why?");
    for(let check of acceptionChecks){
      console.log("in loop");
      console.log("to", check);
      check.addEventListener("click", function (){
        console.log("clicked on accept");
      })
    }
  }
});

view.rendering = async function (myUser) {
  // kwm.templater.changeNavIcon("fa-envelope");
  kwm.templater.changeNavIcon("Invite");

  await kwm.templater.renderTemplate("invites", document.getElementById("kwmJS"));

  let invitations = await kwm.model.getAllInvitations();
  // console.table(invitations);
  for (let invite of invitations) {
    let div = document.createElement("div");
    div.classList.add("invitation");
    div.classList.add("container");
    div.dataset.id = invite.id;
    document.querySelector("#invitations").append(div);
    // console.log(invite);
    invite = invite.acf
    if(invite.opened){
      invite.ph="http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/opened-letter.png"
    }else{
      invite.ph = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/closed-letter.png";
    }


    if (invite.invited === myUser) {
      kwm.templater.renderTemplate("invites.invitation-invited", div, invite);
    } else
      kwm.templater.renderTemplate("invites.invitation", div, invite);
  }

};