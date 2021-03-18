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
const totalLikes = document.querySelector("#total-likes");
const priceBottom = document.querySelector("#price-bottom");

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
    const likesArray = new Array;
    for (i=0; i<data.media.length; i++) {
      if (data.media[i].photographerId==id) {
        likesArray.push(data.media[i].likes);
      }
    };
  
    // 2) add all likes values
    let total = 0;
    likesArray.forEach((like)=>{
      total += like;
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
        </div>
        <div class="profile-contact">
          <button class="btn btn-contact" role="button" onclick="openContactModal()">Contactez-moi</button>
        </div>
        <div class="profile-portrait">
          <img src="FishEye_Photos/Photographers_ID/`+data.photographers[i].portrait+`" alt="" role="img">
        </div>`;  

      modalHeading.innerHTML += `Contactez-moi</br>`+data.photographers[i].name;

      totalLikes.innerHTML += total;
      priceBottom.innerHTML += data.photographers[i].price;

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

// add titles to medias

/*function addTitle(data) {

  const Titles = [
    {
      photographerId: 82,
      titles: ["Portrait femme sportive",
      "Portrait femme sur pont",
      "Portrait mode",
      "Mariage des Gazebo",
      "Soirée chez les Sparklers",
      "Anniversaire",
      "Sculpture de cheval",
      "Street-art porte",
      "Street-art sous-voie",
      "Street-art mur"]
    },
    {
      photographerId: 195,
      titles: [ "Temple chinois",
      "Canal de Venise",
      "Lac et montagne",
      "Vélo dans rue française",
      "Porte ouverte sur paysage",
      "Dômes orientaux",
      "Village sur colline",
      "Tour de Pise",
      "Croisement de routes",
      "Haut d'immeuble"
      ]
    },
    {
      photographerId: 243,
      titles: [ "Randonneur en montage",
      "Village sur falaise italienne",
      "Portrait fillette",
      "Femme à lunette",
      "Portrait de femme",
      "Mariage à la mer",
      "Mariage des Pinto",
      "Mariage des Benevides",
      "Chevaux sauvages",
      "Oiseau multicolor"
      ]
    },
    {
      photographerId: 527, 
      titles: [
        "Crête de montagne",
        "Bains chauds naturels",
        "Route serpente dans les collines",
        "Pont dans les arbres",
        "Proue de bateau, lac et montagne",
        "Portrait femme rousse",
        "Portrait homme noir",
        "Portrait femme noire",
        "Portrait homme à la cigarette"
      ]
    },
    {
      photographerId: 925,
      titles: ["Rameurs",
      "Couple de danseurs",
      "Portrait mode",
      "Séance au travail",
      "Présentation commerciale",
      "Pianiste en concert",
      "Chanteuse en concert",
      "Cerf dans la forêt",
      "Chiot joue dans le sable"
      ]
    },
    {
      photographerId: 930,
      titles: [ "Acrobatie aérienne",
      "Escalade",
      "Surfeuse au centre de la vague",
      "Saut à ski",
      "Coureuses au stade",
      "Jeunes skateurs au bord de mer",
      "Hall blanc et rampe en colimaçon",
      "Toit ondulé",
      "Bâtiment en forme de fer à cheval",
      "Motif de croix entre deux buildings",
      "Ponts relient deux bâtiments"
      ]
    }
  ];

  const mediaArray = new Array;
    for (media of data.media) {
      if (media.photographerId==id) {
        mediaArray.push(media);
      }
    };

  for (j=0; j<mediaArray.length; j++){
    for (array of Titles){
      for (i=0; i<array.titles.length; i++){
        if (array.photographerId==id && j==i){
          mediaArray[j].title = array.titles[i];
        }        
      }
    }
  };

};*/

// insert data into grid pictures

function appendDataPic(data) {

  picGrid.innerHTML = ``;

  for (media of data.media) {
    if (media.photographerId==id){

      if (media.video) {
        picGrid.innerHTML += `
      <li class="pictures-item">
        <video src="FishEye_Photos/`+media.photographerId+`/`+media.video+`" alt="" onclick="openLightbox()" controls></video>
        <div class="pictures-item-info">
          <p>`+media.desc+`</p>
          <p>`+media.price+` €</p>
          <p><span id="like-counter-${media.id}">`+media.likes+`</span> <i class="fas fa-heart" id="like-${media.id}"></i></p>
        </div>
      </li>`;
      } else {
      picGrid.innerHTML += `
      <li class="pictures-item">
        <img src="FishEye_Photos/`+media.photographerId+`/`+media.image+`" alt="" onclick="openLightbox()">
        <div class="pictures-item-info">
          <p>`+media.desc+`</p>
          <p>`+media.price+` €</p>
          <p><span id="like-counter-${media.id}">`+media.likes+`</span> <i class="fas fa-heart" id="like-${media.id}"></i></p>
        </div>
      </li>`
      };

      // add likes when click and calculate total of likes
        
      const mediaID = `like-${media.id}`;
      const likeCounterID = `like-counter-${media.id}`;

      picGrid.addEventListener("click", function(e) {
        if (e.target && e.target.id == mediaID) {
          const likeCounter = document.getElementById(likeCounterID);
          const likeValue = parseInt(likeCounter.innerHTML);
          const TotalValue = parseInt(totalLikes.innerHTML);
          let NewLikeValue = likeValue + 1;
          let NewTotalValue = TotalValue + 1;
          likeCounter.innerHTML = NewLikeValue;
          totalLikes.innerHTML = NewTotalValue;
        }
      });
    }
  };
};

// Re-sort pictures according to selection

function sortPics(data) {

  sortBy(popularity,byLikes);
  sortBy(date,byDate);
  sortBy(title, byTitle);

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
                <p>`+media.desc+`</p>
                <p>`+media.price+` €</p>
                <p><span id="like-counter-${media.id}">`+media.likes+`</span> <i class="fas fa-heart" id="like-${media.id}"></i></p>
              </div>
            </li>`;
            } else {
            picGrid.innerHTML += `
            <li class="pictures-item">
              <img src="FishEye_Photos/`+media.photographerId+`/`+media.image+`" alt="" onclick="openLightbox()">
              <div class="pictures-item-info">
                <p>`+media.desc+`</p>
                <p>`+media.price+` €</p>
                <p><span id="like-counter-${media.id}">`+media.likes+`</span> <i class="fas fa-heart" id="like-${media.id}"></i></p>
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
    a.desc.localeCompare(b.desc, 'fr', {ignorePunctuation: true});
    /*if (a.title>b.title){
      return 1;
    } else if (a.title<b.title){
      return -1;
    } else {
      return 0;
    }*/
  }
};

// lightbox ; open, close, scroll with tab

function openLightbox(){
  lightbox.style.display = "block";
};

function closeLightbox(){
  lightbox.style.display = "none";
}

