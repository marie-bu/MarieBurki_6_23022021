// get data

fetch('https://raw.githubusercontent.com/marie-bu/MarieBurki_6_23022021/main/FishEyeDataFR.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendDataProfile(data);
    appendDataPic(data);
    sortPics(data);
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });

// insert data into profile, including contact modal title

function appendDataProfile(data){

  const profile = document.querySelector(".profile");
  const modalHeading = document.querySelector(".modal-heading");

  for (i=0; i<data.photographers.length; i++){
    profile.innerHTML +=
    `<div class="profile-info">
    <h1 class="profile-info-name" role="heading">`+data.photographers[0].name+`</h1>
    <p class="profile-info-loc" role="text">`+data.photographers[0].city+`, `+data.photographers[0].country+`</p>
    <p class="profile-info-tagline" role="text">`+data.photographers[0].tagline+`</p>
    <div class="profile-info-tags" role="link"></div>
    <div class="profile-info-bottom" role="text">
      <p><span id="total-likes"></span> <i class="fas fa-heart"></i> </p>
      <p>`+data.photographers[0].price+`€/jour</p>
    </div>
    </div>
    <div class="profile-contact">
    <button class="btn btn-contact" role="button" onclick="openContactModal()">Contactez-moi</button>
    </div>
    <div class="profile-portrait">
    <img src="FishEye_Photos/Photographers_ID/`+data.photographers[0].portrait+`" alt="" role="img">
    </div>`;  

    modalHeading.innerHTML += `Contactez-moi</br>`+data.photographers[0].name;

    // add total of likes
    const totalLike = document.querySelector("#total-likes");
    for (i=0; i<data.media.length; i++) {
      if (data.media[i].photographerId==243) {
        console.log(Array.of(data.media[i].likes));
      }
    };

    // add tags
    const containTag = document.querySelectorAll(".profile-info-tags");

    Array.from(data.photographers[0].tags).forEach(tag=>{
      containTag[0].innerHTML += `<div class="tag tag-label profile-info-tag`+tag+`">#`+tag+`</div>`
    });
    break;
  };
};

// modal contact ; open, close and console.log of entries

const modalContact = document.querySelector(".modal-bg");

function openContactModal(){
  modalContact.style.display = "block";
};

function closeContactModal(){
  modalContact.style.display = "none";
  console.log("prénom: "+document.getElementById("first").value)
  console.log("nom: "+document.getElementById("last").value)
  console.log("email: "+document.getElementById("email").value)
  console.log("message: "+document.getElementById("message").value)
}

// insert data into grid pictures

function appendDataPic(data) {
  const picGrid = document.querySelector(".pic-grid");

  picGrid.innerHTML = ``;

  const titles =[
    "Solitude",
    "Falaise italienne",
    "Portrait fillette",
    "Femme à lunette",
    "Portrait de femme",
    "Mariage à la mer",
    "Mariage des Pinto",
    "Mariage des Benevides",
    "Chevaux sauvages",
    "Oiseau multicolor"
  ];

  for (i=0; i<data.media.length; i++) {
    if (data.media[i].photographerId==243){
      // !!! fonctionne mais process tous les medias (pas seulement ID 243, et en boucle !!!
      /*for (i=0; i<data.media.length; i++){
        for (j=0; j<titles.length; j++){
        data.media[i].title = titles[j];
        console.log(data.media[i]);
        }
      };*/
      picGrid.innerHTML += `
      <li class="pictures-item">
        <img src="FishEye_Photos/`+data.media[i].photographerId+`/`+data.media[i].image+`" alt="" onclick="openLightbox;currentPic(`+[i]+`)">
        <div class="pictures-item-info">
          <p>`+data.media[i].title+`</p>
          <p>`+data.media[i].price+` €</p>
          <p><span class="pic-likes">`+data.media[i].likes+`</span> <span class="heart"><i class="fas fa-heart"></i></span></p>
        </div>
      </li>`;

      // add likes when click and calculate total of likes
      // !!! fonctionne mais ne trouve pas la bonne valeur de base et remet à 0 tous les compteurs !!!
      
      const hearts = document.querySelectorAll(".heart");
      const picLikes = document.querySelectorAll(".pic-likes");

      Array.from(hearts).forEach(heart=>{
        let count = 0;
        let formerLikes = data.media[i].likes;
        heart.addEventListener("click", function(){
          count += 1;
          let totalPicLikes = formerLikes + count;
          for (i=0; i<picLikes.length; i++){
            picLikes[i].innerHTML = totalPicLikes;
          }
        });
      })

    /*console.log(Array.from(media.date));
    Array.from(media.date).forEach(e=>{
      date = new Date();
    })
    console.log(date)*/
    }
  };
};

// Reorder pictures according to selection
 
function sortPics(data) {

  const popularity = document.querySelector("#popularity");
  sortBy(popularity,byLikes);

  const date = document.querySelector("#date");
  sortBy(date,byDate);

  const title = document.querySelector("#title");
  sortBy(title,byTitle);

  function sortBy(selection,sortFunction) {

    const picGrid = document.querySelector(".pic-grid");

    selection.addEventListener("click", a => {
      data.media.sort(sortFunction);
      picGrid.innerHTML = ``;
      for (i=0; i<data.media.length; i++) {
        if (media[i].photographerId==243){
          picGrid.innerHTML += `<li class="pictures-item">
          <img src="FishEye_Photos/`+data.media[i].photographerId+`/`+data.media[i].image+`" alt="" onclick="openLightbox();currentPic(`+[i]+`)">
          <div class="pictures-item-info">
            <p>`+data.media[i].id+`</p>
            <p>`+data.media[i].price+` €</p>
            <p>`+data.media[i].likes+` <i class="fas fa-heart"></i></p>
          </div>
        </li>`;
        }
      }
    })
  }

  function byLikes(a,b){
    return a.likes - b.likes;
  };

  function byDate(a,b){
    return new Date(b.date) - new Date(a.date);
  };

  function byTitle(a,b){
    if (a.title>b.title){
      return 1;
    } else if (a.title<b.title){
      return -1;
    } else {
      return 0;
    }
  }
};

// lightbox ; open, close, scroll with tab

const lightbox = document.querySelector(".lightbox-bg");

function openLightbox(){
  lightbox.style.display = "block";
};

function closeLightbox(){
  lightbox.style.display = "none";
}

