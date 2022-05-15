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
  await kwm.templater.renderTemplate("invites", document.getElementById("kwmJS"));

  console.log("wir kommen hier her");
  let invitations = await kwm.model.getAllInvitations();
  console.table(invitations);
  for(let invite of invitations){
    let div = document.createElement("div");
    div.classList.add("invitation");
    document.querySelector("#invitations").append(div);
    // console.log(invite);
    kwm.templater.renderTemplate("invites.invitation", div, invite);
  }

};