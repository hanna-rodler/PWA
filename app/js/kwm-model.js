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
          console.log("DateIdeas", this.dateIdeas);
          resolve(this.dateIdeas);
        }
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
          console.log("Invitations", this.invitations);
          resolve(this.invitations);
        }
      })
    })
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