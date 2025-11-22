// Import renderListWithTemplate
import { renderListWithTemplate, setLocalStorage } from "./utils.mjs";

// Card Template
function cartItemTemplate(item) {
  const newItem = 
  `<li class="cart-card divider">
    <button class="cartBtn">❌</button>
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
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
  </li>`;

  return newItem;
}

// ShoppingCart Class
export default class ShoppingCart {

  constructor(cart, listElement) {
    // Save the cart and listElements
    this.cart = cart; // The cart is what is in local storage
    this.listElement = listElement; // The list element is the HTML element we want it rendered in
    this.cartTotal = 0; // Store the cart total

    // Call the calculate total function
    this.calculateTotal();
  }

  init() {
    // Create a check to see if the cart is empty, we do this with a falsy value
    if (!this.cart) {
      this.renderCartContentsEmpty();
    } else {
      if (this.cart.length <= 0) {
        this.renderCartContentsEmpty();
      } else {
        // The cart is not empty
        // Call the renderCartContents Function
        this.renderCartContents(this.cart);
      }
    }
  }

  calculateTotal() {
    // Calculate total
    let total = 0;
    // Check to see if the cart exists on site already if not render nothing
    if (this.cart) {
      if (this.cart.length > 0)
      {
        this.cart.forEach(element => {
            total += element.Quantity * element.FinalPrice;
        });
      }
    }
    // Get the total
    this.cartTotal = total;
    // Set the total
    document.querySelector(".list-total").textContent = `Total: $${this.cartTotal.toFixed(2)}`;
  }

  removeItem(index) {
    // Remove item from cart array
    this.cart.splice(index, 1);

    // Update localStorage
    setLocalStorage("so-cart", this.cart);

    // Re-render cart
    if (this.cart.length > 0) {
      this.renderCartContents(this.cart);
    } else {
      this.renderCartContentsEmpty();
    };
    // Re-render the total for the user
    this.calculateTotal();
  }

  addDeleteButtonsCode() {
    // Attach remove button listeners
    this.listElement.querySelectorAll(".cartBtn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.removeItem(index);
      });
    });
  }

  renderCartContents(cartItems) {
    // Now pass the items into the util function to render them
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, "afterbegin", true);
    // Now add the deleteButtonsCode
    this.addDeleteButtonsCode();
  }

  renderCartContentsEmpty() {
    this.listElement.innerHTML = "<li>The cart is empty, please come back after adding some items.</li>";
  }
}