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

    const main = document.querySelector("main");
    const profile = document.createElement("section");
    profile.classList.add("profile");
    main.appendChild(profile);

    for (let i = 0; i < data.photographers.length; i++) {
      profile.innerHTML +=
        `<div class="profile-info">
            <h1 class="profile-info-name" role="heading">`+data.photographers[0].name+`</h1>
            <p class="profile-info-loc" role="text">`+data.photographers[0].city+`, `+data.photographers[0].country+`</p>
            <p class="profile-info-tagline" role="text">`+data.photographers[0].tagline+`</p>
            <div class="profile-info-tags" role="link"></div>
            <div class="profile-info-bottom" role="text">
              <p>297081 <i class="fas fa-heart"></i> </p>
              <p>`+data.photographers[0].price+`€/jour</p>
            </div>
        </div>
        <div class="profile-contact">
            <button class="btn btn-contact" role="button">Contactez-moi</button>
        </div>
        <div class="profile-portrait">
            <img src="FishEye_Photos/Photographers_ID/`+data.photographers[0].portrait+`" alt="" role="img">
        </div>` 
        break; 
    }

    const containTag = document.querySelector(".profile-info-tags");
    for (let i = 0; i < data.photographers.length; i++) {
      console.log(photographers[0]);
      for (j=0 ; j<data.photographers[0].tags.length; j++) {
        console.log(tags[j]);
        containTag.innerHTML += `< class="tag tag-label `+data.photographers[0].tags[j]+`">#`+data.photographers[0].tags[j]+`</>`
      }
    }
};