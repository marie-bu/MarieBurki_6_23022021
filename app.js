// append data index page

fetch('https://raw.githubusercontent.com/marie-bu/MarieBurki_6_23022021/main/FishEyeDataFR.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendDataIndex(data);
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function appendDataIndex(data) {

    const section = document.querySelector(".photographes");
    const index = document.createElement("ul");
    index.classList.add("index");
    section.appendChild(index);

    for (let i = 0; i < data.photographers.length; i++) {
      index.innerHTML += `<li class="index-profile">
        <div role="link img" aria-label="aller sur le profile du photographe"><a href="">
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
    
    for (j=0 ; j<data.photographers[i].tags.length; j++) {
      containTag[i].innerHTML += `<div class="tag tag-label `+data.photographers[i].tags[j]+`">#`+data.photographers[i].tags[j]+`</div>`
    }
  }
};

// "passer au contenu" appear when scroll

window.onload = function() {
  const appearScroll = document.querySelector(".appear-when-scroll");

  window.addEventListener('scroll', appearance=>{
    if(window.scrollY>250) {
      appearScroll.style.opacity = "1";
    } else {
      appearScroll.style.opacity = "0";
    }
  })
};

// filter tags

function filterSelection(c) {

  const photographers = document.querySelectorAll(".index-profile");

  photographers.forEach((photographer) =>{
    photographer.classList.add("hide");
    const tags = photographer.querySelectorAll(".tag-label");
    Array.from(tags).forEach((tag)=>{
      if (tag.className.indexOf(c)!=-1){
        photographer.classList.remove("hide");
      }
    })
  });
};

