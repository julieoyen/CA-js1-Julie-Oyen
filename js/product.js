const selectedJacket = JSON.parse(sessionStorage.getItem("selectedJacket"));
const jacketListDiv = document.getElementById("single-product");

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
  jacketSize.innerText = `Available sizes: ${selectedJacket.sizes}`;
  jacketSize.classList.add("jacket-size");

  const jacketGender = document.createElement("p");
  jacketGender.innerText = selectedJacket.gender;

  const jacketPrice = document.createElement("p");
  jacketPrice.innerText = selectedJacket.price;
  jacketPrice.classList.add("jacket-price");

  const discountedPrice = document.createElement("p");
  discountedPrice.classList.add("discounted-price");

  const oldPrice = document.createElement("p");
  oldPrice.classList.add("oldPrice");

  const selectJacketBtn = document.createElement("button");
  selectJacketBtn.classList.add("selectBTN");
  selectJacketBtn.addEventListener("click", () => {
    let currentCart = sessionStorage.getItem("collectedJackets");

    let jacketDetails = {
      id: jacket.id,
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
  if (jacket.onSale !== true) {
    jacketPrice.innerText = ` $${jacket.price}`;
    jacketDiv.appendChild(jacketPrice);
  } else {
    discountedPrice.innerText = `Discounted price: $${jacket.discountedPrice}`;
    oldPrice.innerText = `$${jacket.price}`;
    jacketDiv.appendChild(oldPrice);
    jacketDiv.appendChild(discountedPrice);
  }
  jacketDiv.appendChild(selectJacketBtn);
  jacketListDiv.appendChild(jacketDiv);
}

displayJacketDetails(selectedJacket);

function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}
