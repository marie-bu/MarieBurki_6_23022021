// get data

const url = new URL(window.location);
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
const modalHeading = document.querySelector("#modal-heading");
const modalContact = document.querySelector(".modal-bg");
const totalLikes = document.querySelector("#total-likes");
const priceBottom = document.querySelector("#price-bottom");

const listbox = document.querySelector(".pic-sort-listbox");
const unrollSelect = document.querySelector(".unroll-select");
const rollupSelect = document.querySelector(".rollup-select");
const lineSeparate = document.querySelectorAll(".line-separate");
const popularity = document.querySelector("#popularity");
const date = document.querySelector("#date");
const Title = document.querySelector("#title");

const picGrid = document.querySelector(".pic-grid");
const lightbox = document.querySelector(".lightbox-bg");
const lightboxGallery = document.querySelector(".lightbox-gallery");

// insert data into profile, including contact modal title

function appendDataProfile(data){

  // add total of likes
  
    // 1) push likes values into one array
    const likesArray = new Array;
    for (i=0; i<data.media.length; i++) {
      if (data.media[i].photographerId==id) {
        likesArray.push(data.media[i].likes);
      }
    }
  
    // 2) add all likes values
    let total = 0;
    likesArray.forEach((like)=>{
      total += like;
    })

  for (i=0; i<data.photographers.length; i++){
    if (data.photographers[i].id==id) {
      titlePage.innerHTML += data.photographers[i].name;

      profile.innerHTML +=
        `<div class="profile-info">
          <h1 class="profile-info-name" role="heading">`+data.photographers[i].name+`</h1>
          <p class="profile-info-loc" role="text">`+data.photographers[i].city+`, `+data.photographers[i].country+`</p>
          <p class="profile-info-tagline" role="text">`+data.photographers[i].tagline+`</p>
          <div class="profile-info-tags"></div>
        </div>
        <div class="profile-contact">
          <button class="btn btn-contact" role="button" aria-label="Contactez-moi" onclick="openContactModal()">Contactez-moi</button>
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
        containTag[0].innerHTML += `<div class="tag tag-label profile-info-tag`+tag+`"><span class="sr-only">tag</span>#`+tag+`</div>`
      });
    }
  }
}

// modal contact ; open, close and console.log of entries

function openContactModal(){
  modalContact.style.display = "block";
}

function closeContactModal(){
  modalContact.style.display = "none";
  console.log("prénom: "+document.getElementById("First-name").value)
  console.log("nom: "+document.getElementById("Last-name").value)
  console.log("email: "+document.getElementById("Email").value)
  console.log("message: "+document.getElementById("Your-message").value)
}

// Unroll and rollup selection-menu, aria labels

function unroll() {
  date.classList.add("show");
  Title.classList.add("show");
  lineSeparate[0].classList.add("show");
  lineSeparate[1].classList.add("show");
  unrollSelect.style.display = "none";
  rollupSelect.style.display = "inline-block";
  unrollSelect.setAttribute("aria-expanded", "true");
}

function rollup() {
  date.classList.remove("show");
  Title.classList.remove("show");
  lineSeparate[0].classList.remove("show");
  lineSeparate[1].classList.remove("show");
  rollupSelect.style.display = "none";
  unrollSelect.style.display = "inline-block";
  unrollSelect.setAttribute("aria-expanded", "false");
}

function aria(el){
  popularity.setAttribute("aria-selected", "false");
  date.setAttribute("aria-selected", "false");
  Title.setAttribute("aria-selected", "false");
  
  listbox.setAttribute("aria-activedescendant", el.id);
  el.setAttribute("aria-selected", "true");
}

// insert data into grid pictures

function appendDataPic(data) {

  const mediaArray = new Array
  for (media of data.media){
    if (media.photographerId==id){
      mediaArray.push(media);
    }
  }

  for (i=0; i<mediaArray.length; i++){

      if (mediaArray[i].video) {
        picGrid.innerHTML += `
        <li class="pictures-item">
          <video src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].video+`" alt="`+mediaArray[i].desc+`" role="link" aria-label="ouvre lightbox, aggrandit image" tabindex="0" onkeydown="lightboxKeyboard(event, `+[i+1]+`)" onclick="openLightbox();toSlide(`+[i+1]+`)"></video>
          <div class="pictures-item-info">
            <p>`+mediaArray[i].desc+`</p>
            <p>`+mediaArray[i].price+` €</p>
            <p><span id="like-counter-${mediaArray[i].id}">`+mediaArray[i].likes+`</span> <em class="fas fa-heart" aria-label="likes" id="like-${mediaArray[i].id}"></em></p>
          </div>
        </li>`;
        lightboxGallery.innerHTML += `
          <li class="lightbox-gallery-item" id="`+mediaArray[i].id+`">
            <video src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].video+`" alt="`+mediaArray[i].desc+`" controls></video>
            <p class="pictures-item-info">`+mediaArray[i].desc+`</p>
          </li>`;
      } else {
        picGrid.innerHTML += `
        <li class="pictures-item">
          <img src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].image+`" alt="`+mediaArray[i].desc+`" role="link" aria-label="ouvre lightbox, aggrandit image" tabindex="0" onkeydown="lightboxKeyboard(event, `+[i+1]+`)" onclick="openLightbox();toSlide(`+[i+1]+`)">
          <div class="pictures-item-info">
            <p>`+mediaArray[i].desc+`</p>
            <p>`+mediaArray[i].price+` €</p>
            <p><span id="like-counter-${mediaArray[i].id}">`+mediaArray[i].likes+`</span> <em class="fas fa-heart" aria-label="likes" id="like-${mediaArray[i].id}"></em></p>
          </div>
        </li>`
        lightboxGallery.innerHTML += `
          <li class="lightbox-gallery-item" id="`+mediaArray[i].id+`">
            <img src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].image+`" alt="`+mediaArray[i].desc+`">
            <p class="pictures-item-info">`+mediaArray[i].desc+`</p>
          </li>`
      }
      

      // add likes when click and calculate total of likes
        
      const mediaID = `like-${mediaArray[i].id}`;
      const likeCounterID = `like-counter-${mediaArray[i].id}`;

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
}

// Re-sort pictures according to selection

function sortPics(data) {

  sortBy(popularity, byLikes);
  sortBy(date, byDate);
  sortBy(Title, byTitle);

  function sortBy(selection, sortFunction) {

    selection.addEventListener("click", ()=> {
      const mediaArray = new Array
      for (media of data.media){
        if (media.photographerId==id){
          mediaArray.push(media);
        }
      }

      mediaArray.sort(sortFunction);
      picGrid.innerHTML = ``;
      lightboxGallery.innerHTML =``;

      for (i=0; i<mediaArray.length; i++){
    
          if (mediaArray[i].video) {
            picGrid.innerHTML += `
            <li class="pictures-item">
              <video src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].video+`" alt="`+mediaArray[i].desc+`" role="link" aria-label="ouvre lightbox, aggrandit image" tabindex="0" onkeydown="lightboxKeyboard(event, `+[i+1]+`)" onclick="openLightbox();toSlide(`+[i+1]+`)"></video>
              <div class="pictures-item-info">
                <p>`+mediaArray[i].desc+`</p>
                <p>`+mediaArray[i].price+` €</p>
                <p><span id="like-counter-${mediaArray[i].id}">`+mediaArray[i].likes+`</span> <em class="fas fa-heart" aria-label="likes" id="like-${mediaArray[i].id}"></em></p>
              </div>
            </li>`;
            lightboxGallery.innerHTML += `
            <li class="lightbox-gallery-item" id="`+mediaArray[i].id+`">
              <video src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].video+`" alt="`+mediaArray[i].desc+`" controls></video>
              <p class="pictures-item-info">`+mediaArray[i].desc+`</p>
            </li>`;
          } else {
            picGrid.innerHTML += `
            <li class="pictures-item">
              <img src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].image+`" alt="`+mediaArray[i].desc+`" role="link" aria-label="ouvre lightbox, aggrandit image" tabindex="0" onkeydown="lightboxKeyboard(event, `+[i+1]+`)" onclick="openLightbox();toSlide(`+[i+1]+`)">
              <div class="pictures-item-info">
                <p>`+mediaArray[i].desc+`</p>
                <p>`+mediaArray[i].price+` €</p>
                <p><span id="like-counter-${mediaArray[i].id}">`+mediaArray[i].likes+`</span> <em class="fas fa-heart" aria-label="likes" id="like-${mediaArray[i].id}"></em></p>
              </div>
            </li>`
            lightboxGallery.innerHTML += `
              <li class="lightbox-gallery-item" id="`+mediaArray[i].id+`">
                <img src="FishEye_Photos/`+mediaArray[i].photographerId+`/`+mediaArray[i].image+`" alt="`+mediaArray[i].desc+`>
                <p class="pictures-item-info">`+mediaArray[i].desc+`</p>
              </li>`
          }
      }
    })
  }

  function byLikes(a, b){
    return b.likes - a.likes;
  }

  function byDate(a, b){
    return new Date(b.date) - new Date(a.date);
  }

  function byTitle(a, b){
    if (a.desc>b.desc){
      return 1;
    } else if (a.desc<b.desc){
      return -1;
    }
  }
}

// lightbox ; open, close and show appropriate media

function openLightbox(){
  lightbox.style.display = "block";
}

function closeLightbox(){
  lightbox.style.display = "none";
}

let slideIndex = 1;

function lightboxKeyboard(event, n){
  if(event.key=="Enter"){
    openLightbox()
    toSlide(n)
  }
  if(event.key=="ArrowRight") {
    changeSlide(1);
  }
  if(event.key=="ArrowLeft") {
    changeSlide(-1);
  }
}

function changeSlide(n) {
  showSlide(slideIndex += n)
}

function toSlide(n){
  showSlide(slideIndex = n)
}

function showSlide(n){
  const mediasArray = document.getElementsByClassName("lightbox-gallery-item");

  if (n<1){
    slideIndex = mediasArray.length;
  } else if (n>mediasArray.length){
    slideIndex = 1;
  }

  for (i=0; i<mediasArray.length; i++){
      mediasArray[i].style.display = "none";
    }

  mediasArray[slideIndex-1].style.display = "block";
}
