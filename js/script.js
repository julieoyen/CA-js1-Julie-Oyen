const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";
const jacketListDiv = document.getElementById("jacket-list");
const genderFilterButton = document.getElementById("btnFilter");
const loadingDiv = document.getElementById("loader");
const dropdownJacketList = document.getElementById("jacketList");
const header1 = document.getElementsByClassName("newarrivals");

genderFilterButton.addEventListener("click", function () {
  filterByGender();
});

let jacketData = [];

loadingDiv.style.display = "block";

fetch(rainyDaysAPI)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then((jacketResultData) => {
    jacketData = jacketResultData;

    for (const jacket of jacketData) {
      displayJacket(jacket);
    }

    loadGenderIntoDropDown();
    loadingDiv.style.display = "none";
  })
  .catch((error) => {
    console.error(`Fetch operation failed: ${error.message}`);
    loadingDiv.style.display = "none"; //
    jacketListDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
  });

function displayJacket(jacket) {
  const jacketDiv = document.createElement("div");
  jacketDiv.classList.add("jacket-container");

  const jacketTitlePara = document.createElement("p");
  jacketTitlePara.classList.add("jacket-title");
  jacketTitlePara.innerText = jacket.title;
  jacketTitlePara.addEventListener("click", () => {
    sessionStorage.setItem("selectedJacket", JSON.stringify(jacket));
    window.location.href = "product.html";
  });

  const jacketQuantity = document.createElement("p");
  jacketQuantity.classList.add("jacket-quantity");
  jacketQuantity.innerText = `Quantity: ${jacket.quantity}`;

  const jacketPrice = document.createElement("p");
  jacketPrice.classList.add("jacket-price");
  jacketPrice.innerText = `Price: ${jacket.price}`;
  jacketPrice.addEventListener("click", () => {
    sessionStorage.setItem("selectedJacket", JSON.stringify(jacket));
    window.location.href = "product.html";
  });

  const discountedPrice = document.createElement("p");
  discountedPrice.classList.add("discounted-price");

  const oldPrice = document.createElement("p");
  oldPrice.classList.add("oldPrice");

  const jacketImg = document.createElement("img");
  jacketImg.classList.add("jacket-image");
  jacketImg.src = jacket.image;
  jacketImg.alt = "a picture of a jacket";

  jacketImg.addEventListener("click", () => {
    sessionStorage.setItem("selectedJacket", JSON.stringify(jacket));
    window.location.href = "product.html";
  });

  jacketDiv.appendChild(jacketImg);
  jacketDiv.appendChild(jacketTitlePara);

  if (jacket.onSale !== true) {
    jacketPrice.innerText = ` $${jacket.price}`;
    jacketDiv.appendChild(jacketPrice);
  } else {
    discountedPrice.innerText = `Discounted price: $${jacket.discountedPrice}`;
    oldPrice.innerText = `$${jacket.price}`;
    jacketDiv.appendChild(oldPrice);
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

    if (genderToFilterBy === "default") {
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
