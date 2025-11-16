// Import renderListWithTemplate
import { renderListWithTemplate } from "./utils.mjs";

// Card Template
function cartItemTemplate(item) {
  const newItem = 
  `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// ShoppingCart Class
export default class ShoppingCart {

  constructor(cart, listElement) {
    // Save the cart and listElements
    this.cart = cart; // The cart is what is in local storage
    this.listElement = listElement; // The list element is the HTML element we want it rendered in
  }

  init() {
    // Create a check to see if the cart is empty, we do this with a falsy value
    if (!this.cart) {
      this.renderCartContentsEmpty();
    } else {
      // The cart is not empty
      // Call the renderCartContents Function
      this.renderCartContents(this.cart);
    }
  }

  renderCartContents(cartItems) {
    // Now pass the items into the util function to render them
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, "afterbegin", true);
  }

  renderCartContentsEmpty() {
    this.listElement.innerHTML = "<li>The cart is empty, please come back after adding some items.</li>";
  }

}