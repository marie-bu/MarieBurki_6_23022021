// get data
const url = new URL(window.location); // new URL('http://google.com')
const id = url.searchParams.get('id');
console.log(id);

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

// DOM elements 

const titlePage = document.querySelector("title");

const profile = document.querySelector(".profile");
const modalHeading = document.querySelector(".modal-heading");
const modalContact = document.querySelector(".modal-bg");

const unrollSelect = document.querySelector(".unroll-select");
const rollupSelect = document.querySelector(".rollup-select");
const lineSeparate = document.querySelectorAll(".line-separate");
const popularity = document.querySelector(".popularity");
const date = document.querySelector(".date");
const title = document.querySelector(".title");

const picGrid = document.querySelector(".pic-grid");
const lightbox = document.querySelector(".lightbox-bg");

// insert data into profile, including contact modal title

function appendDataProfile(data){

  // add total of likes
  
    // 1) push likes values into one array
    const totalLike = document.querySelector("#total-likes");
    const likesArray = new Array;
    for (i=0; i<data.media.length; i++) {
      if (data.media[i].photographerId==id) {
        likesArray.push(data.media[i].likes);
      }
    };
  
    // 2) add all likes values
    let totalLikes = 0;
    likesArray.forEach((like)=>{
      totalLikes += like;
    })

  for (i=0; i<data.photographers.length; i++){
    if (data.photographers[i].id==id) {
    titlePage.innerHTML += data.photographers[i].name+` - Fisheye`;
    profile.innerHTML +=
    `<div class="profile-info">
      <h1 class="profile-info-name" role="heading">`+data.photographers[i].name+`</h1>
      <p class="profile-info-loc" role="text">`+data.photographers[i].city+`, `+data.photographers[i].country+`</p>
      <p class="profile-info-tagline" role="text">`+data.photographers[i].tagline+`</p>
      <div class="profile-info-tags" role="link"></div>
      <div class="profile-info-bottom" role="text">
        <p><span id="total-likes">`+totalLikes+`</span> <i class="fas fa-heart"></i> </p>
        <p>`+data.photographers[i].price+`€/jour</p>
      </div>
    </div>
    <div class="profile-contact">
      <button class="btn btn-contact" role="button" onclick="openContactModal()">Contactez-moi</button>
    </div>
    <div class="profile-portrait">
      <img src="FishEye_Photos/Photographers_ID/`+data.photographers[i].portrait+`" alt="" role="img">
    </div>`;  

    modalHeading.innerHTML += `Contactez-moi</br>`+data.photographers[i].name;

    // add tags
    const containTag = document.querySelectorAll(".profile-info-tags");

    Array.from(data.photographers[i].tags).forEach(tag=>{
      containTag[0].innerHTML += `<div class="tag tag-label profile-info-tag`+tag+`">#`+tag+`</div>`
    });
    }
  };
};

// modal contact ; open, close and console.log of entries

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

// Unroll and rollup selection-menu

function unroll() {
  date.classList.add("show");
  title.classList.add("show");
  lineSeparate[0].classList.add("show");
  lineSeparate[1].classList.add("show");
  unrollSelect.style.display = "none";
  rollupSelect.style.display = "inline-block";
}

function rollup() {
  date.classList.remove("show");
  title.classList.remove("show");
  lineSeparate[0].classList.remove("show");
  lineSeparate[1].classList.remove("show");
  rollupSelect.style.display = "none";
  unrollSelect.style.display = "inline-block";
}

// insert data into grid pictures

function appendDataPic(data) {

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
  picGrid.innerHTML = ``;

  for (media of data.media) {
    if (media.photographerId==id){

      // add titles to pictures
      // problème de boucle dans boucle, trop d'itérations.

      if (media.video) {
        picGrid.innerHTML += `
      <li class="pictures-item">
        <video src="FishEye_Photos/`+media.photographerId+`/`+media.video+`" alt="" onclick="openLightbox()" controls></video>
        <div class="pictures-item-info">
          <p>`+media.title+`</p>
          <p>`+media.price+` €</p>
          <p><span class="pic-likes">`+media.likes+`</span> <span class="heart"><i class="fas fa-heart"></i></span></p>
        </div>
      </li>`;
      } else {
      picGrid.innerHTML += `
      <li class="pictures-item">
        <img src="FishEye_Photos/`+media.photographerId+`/`+media.image+`" alt="" onclick="openLightbox()">
        <div class="pictures-item-info">
          <p>`+media.title+`</p>
          <p>`+media.price+` €</p>
          <p><span class="pic-likes">`+media.likes+`</span> <span class="heart"><i class="fas fa-heart"></i></span></p>
        </div>
      </li>`
      };

      // add likes when click and calculate total of likes
      // !!! fonctionne mais sur tous les compteurs et remet tout à 60likes !!!
      
      const hearts = document.querySelectorAll(".heart");
      const picLikes = document.querySelectorAll(".pic-likes");
      const totalLikes = document.querySelector("#total-likes");

      let formerLikes = media.likes;
      let count = 0;
      Array.from(hearts).forEach(heart=>{
        heart.addEventListener("click", function(){
          console.log(media.likes);
          count += 1;
          let totalPicLikes = formerLikes + count;
          picLikes.innerHTML = totalPicLikes;
        });
      })
    }
  };
};

// Re-sort pictures according to selection

function sortPics(data) {

  sortBy(popularity,byLikes);
  sortBy(date,byDate);
  sortBy(title,byTitle);

  function sortBy(selection,sortFunction) {

    selection.addEventListener("click", a => {
      data.media.sort(sortFunction);
      picGrid.innerHTML = ``;
      for (media of data.media) {
        if (media.photographerId==id){
          if (media.video) {
            picGrid.innerHTML += `
            <li class="pictures-item">
              <video src="FishEye_Photos/`+media.photographerId+`/`+media.video+`" alt="" onclick="openLightbox()" controls></video>
              <div class="pictures-item-info">
                <p>`+media.title+`</p>
                <p>`+media.price+` €</p>
                <p><span class="pic-likes">`+media.likes+`</span> <span class="heart"><i class="fas fa-heart"></i></span></p>
              </div>
            </li>`;
          } else {
            picGrid.innerHTML += `
            <li class="pictures-item">
              <img src="FishEye_Photos/`+media.photographerId+`/`+media.image+`" alt="" onclick="openLightbox()">
              <div class="pictures-item-info">
                <p>`+media.title+`</p>
                <p>`+media.price+` €</p>
                <p><span class="pic-likes">`+media.likes+`</span> <span class="heart"><i class="fas fa-heart"></i></span></p>
              </div>
            </li>`
          }
        }
      }
    })
  }

  function byLikes(a,b){
    return b.likes - a.likes;
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

function openLightbox(){
  lightbox.style.display = "block";
};

function closeLightbox(){
  lightbox.style.display = "none";
}

