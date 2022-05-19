"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *
 *     KWM - 2022-03-26
 *******************************************************************************/

export let view = new KWM_Route("/profile", async function(){
  await this.rendering();
  btn_log_out.addEventListener("click", async function(e){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_display_name");
    // form_login.classList.remove("display")
    login_state.classList.add("red");
    user_display_name.innerHTML = " ";
    form_login.style.display = "flex";
    username.value="";
    password.value="";
  });
});

view.rendering = async function(){
  // kwm.templater.changeNavIcon("fa-user");
  await kwm.templater.renderTemplate("profile", document.getElementById("kwmJS"));
};

view.renderLoginForm = async function(){


}