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
    kwm.model.closedDateInvitation(myUser, partner);
    // console.table(kwm.model.invitations);

    /*let inviteImgs = document.getElementsByClassName("letter");
    for (let img of inviteImgs) {
      console.log("I am dumb");
      img.addEventListener("click", function () {
        console.log("clicked letter");
      })
    }*/

    openInviteForm.addEventListener("click", function () {
      inviteForm.classList.remove("hidden");
    })

    btn_cancel.addEventListener("click", function () {
      inviteForm.classList.add("hidden");
    })

    sync_invites.addEventListener("click", function (){
      location.reload(true);
    });

    let closeBtns = document.getElementsByClassName("closeBtn");
    for (let closeBtn of closeBtns) {
      closeBtn.addEventListener("click", function () {
        let id = closeBtn.getAttribute("data-id");
        console.log(id);
        changeLetterImg(id);
        kwm.model.setOpened(id, true);
      });
    }

    let acceptBtns = document.getElementsByClassName("acceptBtn");
    for (let acceptBtn of acceptBtns) {
      acceptBtn.addEventListener("click", markAsAccepted);
      /*acceptBtn.addEventListener("click", function () {
        let id = acceptBtn.getAttribute("data-id");
        console.log("NEW accepting ", id);
        let check = document.querySelector(".invitation[data-id='" + id + "']" +
          " .fa-circle-check");
        console.log(check);
        check.classList.remove("fa-regular");
        check.classList.add("fa-solid");
        kwm.model.setAccepted(id, true);
        acceptBtn.classList.remove("acceptBtn");
        acceptBtn.classList.add("revokeAcceptBtn");
        changeLetterImg(id);
        acceptBtn.innerHTML="Remove Accepted";
      });*/
    }

    let revokeAcceptBtns = document.getElementsByClassName("revokeAcceptBtn");
    console.log(revokeAcceptBtns);
    if (revokeAcceptBtns != null) {
      for (let revokeBtn of revokeAcceptBtns) {
        revokeBtn.addEventListener("click", revokeAcception);
      }
    }

    function markAsAccepted(){
      let id = this.getAttribute("data-id");
      console.log("NEW accepting ", id);
      let check = document.querySelector(".invitation[data-id='" + id + "']" +
        " .fa-circle-check");
      console.log(check);
      check.classList.remove("fa-regular");
      check.classList.add("fa-solid");
      kwm.model.setAccepted(id, true);
      this.classList.remove("acceptBtn");
      this.classList.add("revokeAcceptBtn");
      changeLetterImg(id);
      this.innerHTML = "Remove Accepted";
      this.removeEventListener("click", markAsAccepted);
      this.addEventListener("click", revokeAcception);

    }

    function revokeAcception() {
      console.log("removing Accepted in outer Btn");
      let id = this.getAttribute("data-id");
      // console.log(id);
      let check = document.querySelector(".invitation[data-id='" + id + "']" +
        " .fa-circle-check");
      // console.log(check);
      check.classList.add("fa-regular");
      check.classList.remove("fa-solid");
      kwm.model.setAccepted(id, false);
      this.classList.remove("revokeAcceptBtn");
      this.classList.add("acceptBtn");
      this.innerHTML = "Accept";

      this.removeEventListener("click", revokeAcception);
      this.addEventListener("click", markAsAccepted);
      // console.log(revokeAcceptBtns, revokeAcception);
    }

    function changeLetterImg(id) {
      let inviteImg = document.querySelector(".invitation[data-id='" + id + "'] img");
      // let src = inviteImg.src;
      // console.log(inviteImg, " with source ", src);
      if (inviteImg.src !==
        "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/receive_opened-letter.png") {
        inviteImg.src = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/receive_opened-letter.png";
      }
    }


    /*test_notification.addEventListener("click", function () {
      const title = "Date Invitation";
      const options = {
        body: "Hanna is inviting you on a date",
        vibrate: [200, 100, 200]
      }
      new Notification(title, options);
    });*/

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
        location.reload(true);
      });

    });


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
    let acfInvite = invite.acf;
    if (acfInvite.opened && acfInvite.invitor === myUser) {
      // I invited other person & it was opened
      acfInvite.ph = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/sent_opened-letter.png"
    } else if (acfInvite.opened && acfInvite.invited === myUser) {
      // letter opened but I didn't invite
      acfInvite.ph = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/receive_opened-letter.png";
    } else if (!acfInvite.opened && acfInvite.invitor === myUser) {
      // closed and I invited
      acfInvite.ph = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/sent_closed-letter.png";
    } else {
      // closed and I got invited
      acfInvite.ph = "http://api.s2010456026.student.kwmhgb.at/wp-content/uploads/2022/05/receive_closed-letter.png";
    }
    acfInvite.id = invite.id;

    // await kwm.templater.renderTemplate("invites.invitation-invited", div, acfInvite);

    if (acfInvite.invited === myUser) {
      // console.log(acfInvite.title);
      await kwm.templater.renderTemplate("invites.invitation-invited", div, acfInvite);
    } else
      await kwm.templater.renderTemplate("invites.invitation", div, acfInvite);

    if (acfInvite.accepted) {
      let check = document.querySelector(".invitation[data-id='" + acfInvite.id + "']" +
        " .fa-circle-check");
      // console.log(check);
      check.classList.remove("fa-regular");
      check.classList.add("fa-solid");

      if (acfInvite.invitor !== myUser) {
        let acceptBtn = document.querySelector(".acceptBtn[data-id='" + invite.id + "']");
        acceptBtn.classList.remove("acceptBtn");
        acceptBtn.classList.add("revokeAcceptBtn");
        acceptBtn.innerHTML = "Remove Accepted";
      }
    }

  }

};