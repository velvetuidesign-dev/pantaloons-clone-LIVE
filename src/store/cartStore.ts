import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

interface CartState {
  cart: Product[];
  savedLocation: { state: string, city: string } | null; // NEW: Memory for location
  addToCart: (item: Product) => void;
  clearCart: () => void;
  setLocation: (state: string, city: string) => void; // NEW: Action to save location
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  savedLocation: null, // Starts empty
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  clearCart: () => set({ cart: [] }),
  setLocation: (state, city) => set({ savedLocation: { state, city } }), // Saves it!
}));