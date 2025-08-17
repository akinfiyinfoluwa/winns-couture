import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Color = {
  name: string;
  code: string;
};

// Define a type for the slice state
interface ProductsState {
  colorSelection: Color;
  sizeSelection: string;
  brands: string[];
}

// Define the initial state using that type
const initialState: ProductsState = {
  colorSelection: {
    name: "Brown",
    code: "bg-[#4F4631]",
  },
  sizeSelection: "Large",
  brands: [],
};

export const productsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setColorSelection: (state, action: PayloadAction<Color>) => {
      state.colorSelection = action.payload;
    },
    setSizeSelection: (state, action: PayloadAction<string>) => {
      state.sizeSelection = action.payload;
    },
    setBrands: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      if (state.brands.includes(brand)) {
        state.brands = state.brands.filter((b) => b !== brand);
      } else {
        state.brands.push(brand);
      }
    },
  },
});

export const { setColorSelection, setSizeSelection, setBrands } =
  productsSlice.actions;

export default productsSlice.reducer;
