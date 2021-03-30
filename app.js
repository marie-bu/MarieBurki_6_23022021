// append data index page

fetch('https://raw.githubusercontent.com/marie-bu/MarieBurki_6_23022021/main/FishEyeDataFR.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendDataIndex(data);
  })
  .catch(function (err) {
    console.log(err);
  });



// DOM elements

const index = document.querySelector(".index");
const appearScroll = document.querySelector(".appear-when-scroll");

// Add content

function appendDataIndex(data) {

    for(i=0; i<data.photographers.length; i++) {
      index.innerHTML += `<li class="index-profile">
        <div role="link" aria-label="`+data.photographers[i].name+`"><a href="photographer_profile.html?id=`+data.photographers[i].id+`">
            <h2 class="name">`+data.photographers[i].name+`</h2>
            <img class="portrait" src="FishEye_Photos/Photographers_ID/`+data.photographers[i].portrait+`" alt="">
        </a></div>
        <div role="text">
            <p class="location">`+data.photographers[i].city+`, `+data.photographers[i].country+`</p>
            <p class="tagline">`+data.photographers[i].tagline+`</p>
            <p class="price">`+data.photographers[i].price+`€/jour</p>
        </div>
        <div class="index-profile-tags">
        </div>
        </li>` 
    
      const containTag = document.querySelectorAll(".index-profile-tags");

      Array.from(data.photographers[i].tags).forEach(tag=>{
        containTag[i].innerHTML +=
        `<div class="tag tag-label `+tag+`"><span class="sr-only">tag</span>#`+tag+`</div>`
      });
  }
}

// "passer au contenu" appear when scroll

window.onload = function() {
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>250) {
      appearScroll.style.opacity = "1";
    } else {
      appearScroll.style.opacity = "0";
    }
  })
};

// filter tags

function filterSelection(c) {
  const selected = document.activeElement;
  selected.classList.add("stay-selected");

  const photographers = document.querySelectorAll(".index-profile");

  photographers.forEach((photographer) =>{
    photographer.classList.add("hide");
    const tags = photographer.querySelectorAll(".tag-label");
    Array.from(tags).forEach((tag) =>{
      if (tag.className.indexOf(c) != -1){
        photographer.classList.remove("hide");
        photographer.classList.add("stay-shown");
      }
    })
  });

}