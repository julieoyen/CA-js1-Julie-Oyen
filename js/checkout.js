const currentCollection = sessionStorage.getItem("collectedJackets");
const cart = document.getElementById("cart");

let jacketDetails = currentCollection.split("#");
jacketDetails.shift();

for (const jacket of jacketDetails) {
  const jacketDiv = document.createElement("div");
  jacketDiv.classList.add("jacket-div");

  const jacketTitle = document.createElement("p");
  jacketTitle.classList.add("jacket-title");

  const jacketImg = document.createElement("img");
  jacketImg.classList.add("jacket-image");

  const jacketPrice = document.createElement("p");
  jacketPrice.classList.add("jacket-price");

  const discountedPrice = document.createElement("p");
  discountedPrice.classList.add("jacket-discounted-price");

  const jacketObj = JSON.parse(jacket);
  jacketTitle.innerText = jacketObj.title;
  jacketImg.src = jacketObj.image;
  jacketImg.alt = "Picture of a jacket";
  jacketPrice.innerText = jacketObj.price;

  jacketDiv.appendChild(jacketTitle);
  jacketDiv.appendChild(jacketImg);
  jacketDiv.appendChild(jacketPrice);
  if (jacketObj.onSale === true) {
    discountedPrice.innerText = `Discounted price: ${jacketObj.discountedPrice}`;
    jacketDiv.appendChild(discountedPrice);
  }

  cart.appendChild(jacketDiv);
}
