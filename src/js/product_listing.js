// Import productData into main.js to be used
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load the Header and Footer for this page
loadHeaderFooter();

// Get the category from the param
const category = getParam('category');

const dataSource = new ProductData();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

// Init productList to run it
productList.init();