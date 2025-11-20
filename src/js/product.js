import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer
loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

// Get the product details
const product = new ProductDetails(productId, dataSource);
product.init();
