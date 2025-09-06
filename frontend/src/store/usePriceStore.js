// usePriceStore.js
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

const usePriceStore = create((set) => ({
  prices: [],
  loading: false,
  error: null,

  fetchPrices: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/prices"); 
      set({ prices: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch Price List",
        loading: false,
      });
    }
  },

  createPriceItem: async (priceData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/prices", priceData);
      set((state) => ({
        prices: [...state.prices, res.data.data],
        loading: false,
      }));
      return res.data; 
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to create price item",
        loading: false,
      });
      throw err;
    }
  },
}));

export default usePriceStore;
