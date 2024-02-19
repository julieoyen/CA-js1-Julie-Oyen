const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";
const jacketListDiv = document.getElementById("jacket-list");
const genderFilterButton = document.getElementById("btnFilter");

const dropdownJacketList = document.getElementById("jacketList");

genderFilterButton.addEventListener("click", function () {
  filterByGender();
});

let jacketData = [];

fetch(rainyDaysAPI)
  .then((response) => {
    return response.json();
  })
  .then((jacketResultData) => {
    jacketData = jacketResultData;

    for (const jacket of jacketData) {
      displayJacket(jacket);
    }

    loadGenderIntoDropDown();
  });

function displayJacket(jacket) {
  const jacketDiv = document.createElement("div");
  jacketDiv.classList.add("jacket-container");

  const jacketTitlePara = document.createElement("p");
  jacketTitlePara.classList.add("jacket-title");
  jacketTitlePara.innerText = jacket.title;

  const jacketPrice = document.createElement("p");
  jacketPrice.classList.add("jacket-price");
  jacketPrice.innerText = `Price: ${jacket.price}`;

  const discountedPrice = document.createElement("p");

  if (jacket.onSale) {
    discountedPrice.classList.add("jacket-discounted-price");
    discountedPrice.innerText = `Discounted Price: ${jacket.discountedPrice}`;
    const oldPrice = document.createElement("p");
    oldPrice.classList.add("old-price");
    oldPrice.innerText = `Price: ${jacket.price}`;
  }

  const jacketImg = document.createElement("img");
  jacketImg.classList.add("jacket-image");
  jacketImg.src = jacket.image;
  jacketImg.alt = "a picture of a jacket";

  jacketImg.addEventListener("click", () => {
    sessionStorage.setItem("selectedJacket", JSON.stringify(jacket));
    window.location.href = "http://127.0.0.1:3004/product.html";
  });

  jacketDiv.appendChild(jacketImg);
  jacketDiv.appendChild(jacketTitlePara);
  jacketDiv.appendChild(jacketPrice);

  if (discountedPrice.innerText) {
    jacketDiv.appendChild(discountedPrice);
  }

  jacketListDiv.appendChild(jacketDiv);
}

function loadGenderIntoDropDown() {
  const allJacketsOption = document.createElement("option");
  allJacketsOption.value = "all";
  allJacketsOption.innerText = "View All Jackets";

  const maleOption = document.createElement("option");
  maleOption.value = "male";
  maleOption.innerText = "Men";

  const femaleOption = document.createElement("option");
  femaleOption.value = "female";
  femaleOption.innerText = "Women";

  dropdownJacketList.appendChild(maleOption);
  dropdownJacketList.appendChild(femaleOption);
  dropdownJacketList.appendChild(allJacketsOption);
}

function filterByGender() {
  try {
    const genderToFilterBy = dropdownJacketList.value.toLowerCase();

    if (genderToFilterBy === "") {
      throw new Error("Bad Filter");
    }

    let filteredResults = [];

    if (genderToFilterBy === "all") {
      filteredResults = jacketData;
    } else {
      filteredResults = jacketData.filter(
        (jacket) => jacket.gender.toLowerCase() === genderToFilterBy
      );
    }

    jacketListDiv.innerHTML = "";

    for (const jacket of filteredResults) {
      displayJacket(jacket);
    }
  } catch (error) {
    alert("Please select a gender");
  }
}
