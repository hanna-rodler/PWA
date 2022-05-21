export default class KWM_Model {
  constructor() {
    let obj = {
      age: "35",
      animal_type: "Kangaroo",
      pet_name: "Hopsi",
      picture: "https://api.neuwersch.kwmhgb.at/wp-content/uploads/2022/05/Bild_2022-05-02_222952929.png",
      price: "135.68",
      short_bio: "Hüpft total weit"
    }
    this.dateIdeas = [];
    this.invitations=[];
    this.favorites=[];
    this.partnerFavorites=[];
  }

/*  getAllPets(){
    return new Promise(resolve => {
      fetch('https://api.neuwersch.kwmhgb.at/wp-json/acf/v3/kwm_pet')
      .then(response => response.json())
      .then(data => {
        // let pets = [];
        if (kwm.utils.isEmpty(this.pets))
        for(let pet of data){
          this.pets.push(pet.acf);
        }

        console.log("Pets", this.pets);
        resolve(this.pets);
      });
    })
    // return this.pets;
  }*/

  getAllDateIdeas(){
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/acf/v3/datingIdea')
      .then(response => response.json())
      .then(data=>{
        if(kwm.utils.isEmpty(this.dateIdeas)){
          for(let idea of data){
            this.dateIdeas.push(idea.acf);
          }
          //console.log("DateIdeas", this.dateIdeas);
          resolve(this.dateIdeas);
        }else
          resolve(this.dateIdeas);
      })
    })
  }

  getAllInvitations(){
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/acf/v3/invitation')
      .then(response => response.json())
      .then(data=>{
        if(kwm.utils.isEmpty(this.invitations)){
          for(let invitation of data){
            this.invitations.push(invitation.acf);
          }
         // console.log("Invitations", this.invitations);
          resolve(this.invitations);
        }
        else
          resolve(this.invitations);
      })
    })
  }

  getAllFavorites(){
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/acf/v3/favorite')
      .then(response => response.json())
      .then(data=>{
        if(kwm.utils.isEmpty(this.favorites)){
          for(let favorite of data){
            /*this.favorites.push(favorite.acf.user_1.ID);
            this.favorites.push(favorite.acf.user_2.ID);
            this.favorites.push(favorite.acf.idea);*/
            this.favorites.push(favorite.acf);
          }
          console.log("Favorites", this.favorites);
          resolve(this.favorites);
        }
        else
          resolve(this.favorites);
      })
    })
  }

  getFavorites(){
    console.info("getting favorites");
    for(let fav of this.favorites){
      let userId = window.localStorage.getItem("user_display_name");
      if(fav.user_1 === userId || fav.user_2 === userId){
        console.log(fav);
      }
    }
  }

  getPartner(){
    if(!kwm.utils.isEmpty(localStorage.partner)){
      return JSON.parse(localStorage.partner);
    }
    else{
      savePartner();
    }
  }

  savePartner(){
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
      // console.table(result);
      console.log(result.acf.partner);
      console.log(result.acf.partner.ID);
      let partner = {
        "ID": result.acf.partner.ID,
        "display_name": result.acf.partner.display_name,
        "nickname": result.acf.partner.nickname
      }
      window.localStorage.setItem("partner", JSON.stringify(partner));
    })
    .catch(error => console.log('error', error));
  }

  logOut(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_display_name");
    window.localStorage.removeItem("partner");
    // form_login.classList.remove("display")
    login_state.classList.add("red");
    user_display_name.innerHTML = " ";
    form_login.style.display = "flex";
    username.value="";
    password.value="";
  }

/*  async getAllPets2(){
    const response = await fetch('https://api.neuwersch.kwmhgb.at/wp-json/acf/v3/kwm_pet');
    console.log(response);
    for(let pet of response){
      this.pets.push(pet.acf);
    }

    console.log("Pets:", this.pets);
  }*/

}