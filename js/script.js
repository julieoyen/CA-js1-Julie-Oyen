const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";
const jacketsMain = document.getElementById("jackets-main-page");
const filterMaleBTN = document.getElementById("filter-male");
const filterFemaleBTN = document.getElementById("filter-female");

let jackets = [];

fetch(rainyDaysAPI)
  .then((response) => response.json())
  .then((jacketResultData) => {
    jackets = jacketResultData;
    for (const jacket of jackets) {
      displayJacket(jacket);
    }
  });

function filterJackets(filterParameter) {
  fetch(rainyDaysAPI)
    .then((response) => response.json())
    .then((jacketResultData) => {
      jackets = jacketResultData;

      for (let k = 0; k < jackets.length; k++) {
        let jacketTag = jackets[k].tags;
        for (let i = 0; i < jacketTag.length; i++) {
          if (jacketTag.tags === filterParameter && jackets.discountedPrice) {
            jacketsMain.innerHTML += `
          <div class="product-card">
              <p class="title"> ${jackets.title}</p>
              <img class ="product-img" src="${jackets.image}" alt="A picture of a jacket from Rainy Jacket">
              <p class="price">Price: ${jackets.price}</p>
              <p class="gender"> ${jackets.gender}
              <p> Discounted price: ${jackets.discountedPrice}</p>
          </div>
        `;
          } else if (
            (jacketTag.tags === filterParameter) !=
            jackets.discountedPrice
          ) {
            jacketsMain.innerHTML += `
          <div class="product-card">
              <p class="title"> ${jackets.title}</p>
              <img class ="product-img" src="${jackets.image}" alt="A picture of a jacket from Rainy Jacket">
              <p class="price">Price: ${jackets.price}</p>
              <p class="gender"> ${jackets.gender}
          </div>
      `;
          }
        }
      }
    });
}

function displayJacket(jacket) {
  if (jacket.onSale === false) {
    jacketsMain.innerHTML += `
          <div class="product-card">
              <p class="title"> ${jacket.title}</p>
              <img class ="product-img" src="${jacket.image}" alt="A picture of a jacket from Rainy Jacket">
              <p class="price">Price: ${jacket.price}</p>
              <p class="gender"> ${jacket.gender}
          </div>
      `;
  } else {
    jacketsMain.innerHTML += `
  <div class="product-card">
      <p class="title"> ${jacket.title}</p>
      <img class ="product-img" src="${jacket.image}" alt="A picture of a jacket from Rainy Jacket">
      <p class="price">Price: ${jacket.price}</p>
      <p class="gender"> ${jacket.gender}
      <p> Discounted price: ${jacket.discountedPrice}</p>
  </div>
`;
  }
}

filterFemaleBTN.innerHTML = "Female";
filterMaleBTN.innerHTML = "Male";

filterFemaleBTN.addEventListener("click", function () {
  filterJackets("womens");
});

filterMaleBTN.addEventListener("click", function () {
  filterJackets("mens");
});
// addEventListener filter
