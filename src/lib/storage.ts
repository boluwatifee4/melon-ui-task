import type { Product } from "../features/products/types";

const STORAGE_KEY = "products";

export function getInitialProducts(): Product[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw) as Product[];
    } catch {
        return [];
    }
}

export function saveProducts(products: Product[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}