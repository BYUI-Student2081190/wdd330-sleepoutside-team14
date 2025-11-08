export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        try {
            this.products = await this.dataSource.getData();
            console.log(`Loaded ${this.products.length} products for category: ${this.category}`);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }
}
