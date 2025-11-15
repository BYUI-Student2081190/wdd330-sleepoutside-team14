// Import renderListWithTemplate
import { renderListWithTemplate } from "./utils.mjs";

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
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
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
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }

}
