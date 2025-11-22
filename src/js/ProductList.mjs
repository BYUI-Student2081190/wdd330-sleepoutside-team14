// Import renderListWithTemplate
import { renderListWithTemplate, generateBreadCrumbs } from "./utils.mjs";

// Card Template Function
function productCardTemplate(product) {
    // Check for discount
    let discountBadge = "";
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        const percent = Math.round(
            ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
        );
        discountBadge = `<span class="product-card__badge">-${percent}%</span>`;
    }
    return `
    <li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

// ProductList Class
export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        const pageList = ["Home", "Product List", this.category.charAt(0).toUpperCase() + this.category.slice(1), `(${list.length} Items)`];
        generateBreadCrumbs(pageList);
        document.querySelector("#product-type").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}
