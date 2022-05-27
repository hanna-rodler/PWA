"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';


/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/profile", async function(){
  if(window.localStorage.getItem("token")) {
    kwm.templater.changeNavIcon("Profile");

    await this.rendering();
    btn_log_out.addEventListener("click", async function (e) {
      kwm.model.logOut();
      /*window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_display_name");
      window.localStorage.removeItem("partner");
      // form_login.classList.remove("display")
      login_state.classList.add("red");
      user_display_name.innerHTML = " ";
      form_login.style.display = "flex";
      username.value="";
      password.value="";*/
    });
    /*let p = document.createElement("p");
    p.innerHTML = "Your partner is: "+partner.display_name;
    document.getElementById("kwmJS").append(p);*/
  }

});

view.rendering = async function(){
/*  if(!kwm.utils.isEmpty(localStorage.partner)){
    let partner = kwm.model.getPartner();
    let profileInfo={
      "partner": partner.display_name
    }
    await kwm.templater.renderTemplate("profile", document.getElementById("kwmJS"), profileInfo);
  }else {
    await kwm.templater.renderTemplate("profile", document.getElementById("kwmJS"));
  }*/

  let partner = await kwm.model.getPartner();
  let profileInfo={
    "partner": partner.display_name,
    "myName": localStorage.user_display_name
  }
  await kwm.templater.renderTemplate("profile", document.getElementById("kwmJS"), profileInfo);

};

view.renderLoginForm = async function(){


}