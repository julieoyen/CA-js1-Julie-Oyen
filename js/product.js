const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";
const selectedJacket = JSON.parse(sessionStorage.getItem("selectedJacket"));
const jacketListDiv = document.getElementById("single-product");

displayJacketDetails(selectedJacket);

function displayJacketDetails(jacket) {
  const jacketDiv = document.createElement("div");
  const jacketTitle = document.createElement("p");
  jacketTitle.innerText = selectedJacket.title;
  jacketTitle.classList.add("jacket-title");
  const jacketImg = document.createElement("img");
  jacketImg.src = selectedJacket.image;
  jacketImg.alt = "a picture of a jacket";
  jacketImg.classList.add("jacket-image");

  const jacketDescription = document.createElement("p");
  jacketDescription.innerText = selectedJacket.description;
  jacketDescription.classList.add("jacket-description");

  const jacketSize = document.createElement("p");
  jacketSize.innerText = selectedJacket.sizes;
  jacketSize.classList.add("jacket-size");

  const jacketGender = document.createElement("p");
  jacketGender.innerText = selectedJacket.gender;

  const selectJacketBtn = document.createElement("button");
  selectJacketBtn.addEventListener("click", () => {
    let currentCart = sessionStorage.getItem("collectedJackets");

    let jacketDetails = {
      title: jacket.title,
      image: jacket.image,
      price: jacket.price,
      discountedPrice: jacket.discountedPrice,
      sizes: jacket.sizes,
      onSale: jacket.onSale,
    };

    let jacketDetailsString = JSON.stringify(jacketDetails);

    let updateCart = currentCart + `#${jacketDetailsString}`;

    sessionStorage.setItem("collectedJackets", updateCart);
  });

  selectJacketBtn.innerText = "Add to cart";

  jacketDiv.appendChild(jacketTitle);
  jacketDiv.appendChild(jacketImg);
  jacketDiv.appendChild(jacketDescription);
  jacketDiv.appendChild(jacketSize);
  jacketDiv.appendChild(jacketGender);
  jacketDiv.appendChild(selectJacketBtn);
  jacketListDiv.appendChild(jacketDiv);
}
