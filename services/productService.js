import { products } from "../data/productsData";

export async function getProducts() {
    return products;
}

export async function getProduct(slug) {
    return products.find(p => p.slug === slug);
}