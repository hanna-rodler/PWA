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
    this.invitations = [];
    this.favorites = [];
    this.partnerFavorites = [];
  }

  getAllACFDateIdeas() {
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/acf/v3/datingIdea')
      .then(response => response.json())
      .then(data => {
        if (kwm.utils.isEmpty(this.dateIdeas)) {
          for (let idea of data) {
            this.dateIdeas.push(idea.acf);
          }
          //console.log("DateIdeas", this.dateIdeas);
          resolve(this.dateIdeas);
        } else
          resolve(this.dateIdeas);
      })
    })
  }

  getAllDateIdeas() {
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea')
      .then(response => response.json())
      .then(data => {
        if (kwm.utils.isEmpty(this.dateIdeas)) {
          // console.table(data);
          for (let idea of data) {
            // console.log(idea);
            this.dateIdeas.push(idea);
          }
          //console.log("DateIdeas", this.dateIdeas);
          resolve(this.dateIdeas);
        } else
          resolve(this.dateIdeas);
      })
    })
  }

  getDateIdeaById(id) {
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/datingIdea/' + id)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
    })
  }

  getAllInvitations() {
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/acf/v3/invitation')
      .then(response => response.json())
      .then(data => {
        if (kwm.utils.isEmpty(this.invitations)) {
          for (let invitation of data) {
            this.invitations.push(invitation.acf);
          }
          // console.log("Invitations", this.invitations);
          resolve(this.invitations);
        } else
          resolve(this.invitations);
      })
    })
  }

  getMyFavorites(myUser) {
    return new Promise(resolve => {
      fetch('https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/favorite')
      .then(response => response.json())
      .then(data => {
        if (kwm.utils.isEmpty(this.favorites)) {
          for (let favorite of data) {
            /*this.favorites.push(favorite.acf.user_1.ID);
            this.favorites.push(favorite.acf.user_2.ID);
            this.favorites.push(favorite.acf.idea);*/
            if (favorite.acf.user_1 === myUser || favorite.acf.user_2 === myUser) {
              this.favorites.push(favorite);
            }
          }
          // console.log("Favorites", this.favorites);
          resolve(this.favorites);
        } else
          resolve(this.favorites);
      })
    })
  }

  getPartner() {
    if (!kwm.utils.isEmpty(localStorage.partner)) {
      return JSON.parse(localStorage.partner);
    } else {
      this.savePartner();
    }
  }

  savePartner() {
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

  logOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_display_name");
    window.localStorage.removeItem("partner");
    window.localStorage.removeItem("favoriteIdeas");
    user_display_name.innerHTML = " ";
    form_login.style.display = "flex";
    headerNav.classList.add("hidden");
    document.querySelector("#main_content").remove();
    username.value = "";
    password.value = "";
  }

  /**
   * Receives an id and returns, whether or not this id is already a favourite.
   * @param id
   */
  ideaIsFavorite(id) {
    if (!kwm.utils.isEmpty(localStorage.favoriteIdeas))
      return JSON.parse(localStorage.favoriteIdeas).includes(id);
    return false;
  }


  /**
   * If the idea is NOT already a favourite, then add it.
   * @param id
   */
  addFavoriteIdea(id) {
    if (kwm.utils.isEmpty(localStorage.favoriteIdeas)) {
      let favoriteIdeas = [id];
      localStorage.favoriteIdeas = JSON.stringify(favoriteIdeas);
    } else {
      let favIdeas = JSON.parse(localStorage.favoriteIdeas);
      favIdeas.push(id);
      localStorage.favoriteIdeas = JSON.stringify(favIdeas);
    }
  }

  /**
   * if the idea is a favourite, change that.
   * @param id
   */
  removeFavouriteIdea(id) {
    let favIdeas = JSON.parse(localStorage.favoriteIdeas);
    // console.log("removing idea " + id);
    let index = favIdeas.indexOf(id);
    // console.log(index);
    favIdeas.splice(index, 1);
    localStorage.favoriteIdeas = JSON.stringify(favIdeas);
    // console.info(localStorage.favoriteIdeas);
  }


  getOwnUserId() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return new Promise(resolve => {
      fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/users/me", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.id);
        resolve(result.id);
      })
    })
  }

  // TODO: write so it finds favorites without local Storage
  ideaIsFavoritePost(id){
    if(kwm.utils.isEmpty(this.favorites)){
      this.getMyFavorites(this.getOwnUserId());
    }

  }

  addIdeaToFavorites(myUser, partner, ideaID) {
    let post = {
      title: ideaID,
      fields: {
        user_1: myUser,
        user_2: partner,
        idea: ideaID
      },
      status: "publish"
    };
    console.log("Post ", post);
    fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/favorite", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify(post)
    }).then(function (response) {
      if (response.status !== 201) {
        alert("Fehgeschlagen " + response.status);
        console.error(response);
        return false;
      }
      console.log(response);
      return response;
    }).then(response => response.json())
    .then(result => {
      let el = document.querySelector(".dateIdea[data-id='" + ideaID + "']");
      console.log(el);
      el.dataset.parent = result.id;
    });
  }

  deleteIdeaFromFavorites(ideaID) {
    console.log("deleting idea ", ideaID);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    let index = this.favorites.indexOf(ideaID);
    this.favorites.splice(index, 1);
    // console.table(this.favorites);

    fetch("https://api.s2010456026.student.kwmhgb.at/wp-json/wp/v2/favorite/" +
      ideaID, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
  }


  async uploadMedia() {
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

  async getHeader(){
    return {
      "Content-Type": 'application/json',
      "Authorization": "Bearer " + window.localStorage.getItem("token"),
    }
  }

  async getRequestOptions(post){
    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
      },
      redirect: 'follow',
      body: JSON.stringify(post)
    };
    return requestOptions;
  }
}