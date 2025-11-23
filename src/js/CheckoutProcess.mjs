import { getLocalStorage, setLocalStorage, alertMessage, removeAlertMessages } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
    
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemAmount = 0;
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calcItemSubTotal();
  }

  calcItemSubTotal() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
    this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
    this.outputSelector + " #num-items"
    );

    // Calculate the amount of items in the cart, and the price
    let itemAmount = 0;
    let itemFinalPrice = 0;
    this.list.forEach((item) => {
      itemAmount += item.Quantity;
      itemFinalPrice += item.Quantity * item.FinalPrice;
    });

    // Set them in the object
    this.itemAmount = itemAmount;
    this.itemTotal = itemFinalPrice;

    // Display the numbers
    itemNumElement.innerText = this.itemAmount;
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;;
  }

  calcOrderTotal() {
    this.tax = (this.itemTotal * 0.06);
    this.shipping = 10 + (this.itemAmount - 1) * 2;
    this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.tax) +
        parseFloat(this.shipping)
    );
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    //console.log(order);

    try {
      const response = await services.checkout(order);
      console.log(response);
      // If these were okay keep going, clear the cart and also redirect the user
      setLocalStorage("so-cart", ""); // Send in an empty string to make it empty
      location.assign("/checkout/success.html");
    } catch (err) {
      // Remove all previous alerts
      removeAlertMessages();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      };
      console.log(err);
    }
  }
}