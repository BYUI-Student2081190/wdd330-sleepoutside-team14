// Import ExternalServices into main.js to be used
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load the Header and Footer for this page
loadHeaderFooter();

// Get the category from the param
const category = getParam("category");

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

// Init productList to run it
productList.init();
