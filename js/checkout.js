const currentCollection = sessionStorage.getItem("collectedJackets");
const cart = document.getElementById("cart");
const totalContainer = document.getElementById("totalprice-container");
const cartDetails = document.getElementById("cart-details");
const submitBTN = document.getElementById("submitbtn");
const wholePage = document.getElementsByClassName("whole-page");
const emptyCartMessage = document.createElement("p");
emptyCartMessage.classList.add("empty-cart");

if (currentCollection) {
  const items = currentCollection.split("#");
  items.shift();

  for (const jacket of items) {
    const jacketObj = JSON.parse(jacket) || {};

    const jacketDiv = document.createElement("div");
    jacketDiv.classList.add("jacket-div");

    const jacketTitle = document.createElement("p");
    jacketTitle.classList.add("jacket-title");

    const jacketImg = document.createElement("img");
    jacketImg.classList.add("jacket-image");

    const jacketPrice = document.createElement("p");
    jacketPrice.classList.add("jacket-price");

    const discountedPrice = document.createElement("p");
    discountedPrice.classList.add("discounted-price");

    const deleteBTN = document.createElement("button");
    deleteBTN.classList.add("delete-btn");
    deleteBTN.innerText = "Delete Item";
    deleteBTN.addEventListener("click", DeleteButtonClick);

    const identifier = jacketObj.id || jacketObj.title;
    jacketDiv.setAttribute("data-item", identifier);

    jacketTitle.innerText = jacketObj.title;
    jacketImg.src = jacketObj.image;
    jacketImg.alt = "Picture of a jacket";

    jacketDiv.appendChild(jacketTitle);
    jacketDiv.appendChild(jacketImg);

    if (jacketObj.onSale !== true) {
      jacketPrice.innerText = `$${jacketObj.price}`;
      jacketDiv.appendChild(jacketPrice);
    } else {
      discountedPrice.innerText = `$${jacketObj.discountedPrice}`;
      jacketDiv.appendChild(discountedPrice);
    }

    jacketDiv.appendChild(deleteBTN);
    cart.appendChild(jacketDiv);
  }

  function removeJacket(itemToRemove) {
    const itemIndex = items.findIndex((item) => item.includes(itemToRemove));
    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);
      const updatedCollection = items.join("#");
      sessionStorage.setItem("collectedJackets", updatedCollection);
    }
  }

  function DeleteButtonClick(event) {
    const deleteButton = event.target;
    const jacketDiv = deleteButton.closest(".jacket-div");

    if (jacketDiv) {
      const itemToRemove = jacketDiv.getAttribute("data-item");

      cart.removeChild(jacketDiv);

      removeJacket(itemToRemove);

      updateTotalDisplay();

      console.log("Item removed successfully");
    }
  }

  function updateTotalDisplay() {
    const currentCollection = sessionStorage.getItem("collectedJackets");

    if (!cartDetails) {
      console.log("Error: Element with class 'cartdetails' not found.");
      return;
    }

    const isMessageAdded = cart.contains(emptyCartMessage);

    if (!currentCollection) {
      console.log("No items in the cart");

      emptyCartMessage.innerText = "Your cart is empty.";

      cartDetails.style.display = "none";
      totalContainer.style.display = "none";

      if (!isMessageAdded) {
        cart.appendChild(emptyCartMessage);
      }

      return;
    } else {
      totalContainer.style.display = "block";
      cartDetails.style.display = "block";

      if (isMessageAdded) {
        cart.removeChild(emptyCartMessage);
      }

      emptyCartMessage.innerText = "";
    }

    const cartArray = Array.from(items);

    const total = cartArray.reduce((accumulator, item) => {
      const jacketObj = JSON.parse(item) || {};

      const price =
        jacketObj.discountedPrice !== undefined
          ? parseFloat(jacketObj.discountedPrice)
          : parseFloat(jacketObj.price) || 0;

      return accumulator + price;
    }, 0);

    totalContainer.innerText = `Total Price: $${total.toFixed(2)}`;
  }

  updateTotalDisplay();

  submitBTN.innerText = "Place Order";

  submitBTN.addEventListener("click", () => {
    sessionStorage.setItem("orderPlaced", "true");
    window.location.href = "confirmation.html";
    sessionStorage.clear();
  });
} else {
  emptyCartMessage.innerText = "Your cart is empty.";
  document.body.appendChild(emptyCartMessage);
  cartDetails.style.display = "none";
  totalContainer.style.display = "none";
}
