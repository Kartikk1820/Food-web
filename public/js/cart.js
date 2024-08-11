function sendCartToServer() {
  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);

    fetch("/send-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cart }),
    })
      .then((response) => response.text())
      .then((html) => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Cart is empty.");
  }
}

// let recipieCount = document.querySelector(".recipiecount");
// let addBtn = document.querySelector(".addBtn");
// let subBtn = document.querySelector(".subBtn");

// console.log(recipieCount);

// //cart{
// let count = 0;
// let dishCount = 1;

// function addCount() {
//   dishCount++;
// }

// badge.style.display = "none";
// cartIcon.classList.remove("carticon");

// try {
//   addCart.addEventListener("click", cartUpdate);
// } catch (err) {
//   console.log(err);
// }
// function cartUpdate() {
//   count++;
//   badge.style.display = "block";
//   cartIcon.classList.add("carticon");
//   badge.innerHTML = count;
//   alert("Added to Cart");
//   updateCartHtml(recipieCount);
//   console.log(recipieCount);
// }

// // cartDiv.addEventListener("click", updateRecipieCount);
// //change the index file to cart.html to newCart.html
// function updateCartHtml() {
//   cartDiv.href = "newCart.html";
// }

// // recipie count updatation
// let newPrice = 200;
// let price = recipiePrice.innerHTML;
// addBtn.addEventListener("click", () => {
//   dishCount++;
//   recipieCount.innerHTML = dishCount;
//   const Price = Number(price);
//   newPrice = newPrice + Price;
//   recipiePrice.innerHTML = newPrice;
//   console.log(dishCount);
//   console.log(recipiePrice.innerHTML);
// });

// subBtn.addEventListener("click", () => {
//   dishCount--;
//   recipieCount.innerHTML = dishCount;
//   const Price = Number(price);
//   newPrice = newPrice - Price;
//   recipiePrice.innerHTML = newPrice;
//   console.log(dishCount);
//   console.log(recipiePrice.innerHTML);
// });
