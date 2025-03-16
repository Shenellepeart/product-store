import { create } from "zustand";
import { Product } from "../types";

type ProductState = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (
    newProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products", {});
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
  },
  updateProduct: async (id: string) => {},
}));
