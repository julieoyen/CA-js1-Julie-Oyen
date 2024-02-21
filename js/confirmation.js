const thankYouPage = document.getElementById("thank-you-page");
const thankYouDiv = document.createElement("div");
const thankYouHeader = document.createElement("h1");
const thankYouMessage = document.createElement("p");
const ShopMoreBTN = document.createElement("button");

thankYouHeader.innerText = "THANK YOU";

thankYouMessage.innerText = `We are thrilled to confirm that we have received your order for our premium jackets. Your choice in our products is truly appreciated, and we are excited to be a part of keeping you stylish and warm.
Your order is now being processed, and you will receive a confirmation email shortly with the shipment details.
We sincerely thank you for choosing our jackets. Your satisfaction is our priority, and we look forward to delivering a fantastic shopping experience.

Warm regards,
Everyone at Rainy Days`;

ShopMoreBTN.innerText = "Return to the shop";
ShopMoreBTN.classList.add("shopMoreBTN");

ShopMoreBTN.addEventListener("click", () => {
  window.location.href = "index.html";
});

thankYouDiv.appendChild(thankYouHeader);
thankYouDiv.appendChild(thankYouMessage);
thankYouDiv.appendChild(ShopMoreBTN);
thankYouPage.appendChild(thankYouDiv);

document.body.appendChild(thankYouPage);
