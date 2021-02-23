fetch('FishEyeDataFR.json',{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
   })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendDataIndex(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function appendDataIndex(data) {
    const indexProfile = document.querySelector(".index-profile");
    for (var i = 0; i < data.length; i++) {
      var profile = document.createElement("div");
      profile.innerHTML = 
        `<div><a href="">
            <h2 class="name">`+data[i].name+`</h2>
            <img class="portrait" src="`+data[i].portrait+`" alt="">
        </a></div>
        <div>
            <p class="location">`+data[i].city+`, `+data[i].country+`</p>
            <p class="tagline">`+data[i].tagline+`</p>
            <p class="price">`+data[i].price+`</p>
        </div>
        <div>
            <div class="tag"></div>
            <div class="tag"></div>
            <div class="tag"></div>
            <div class="tag"></div>
        </div> `
      indexProfile.appendChild(profile);
    }
  }
