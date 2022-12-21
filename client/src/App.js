import "./styles.css";
import React, { useState} from "react";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import FoodPage from "./components/MenuPages/FoodPage";
import DrinksPage from "./components/MenuPages/DrinksPage";
import PaymentForm from "./components/PaymentForm";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";
import { Route, Routes } from "react-router-dom";

const CartContextProvider = ({ children }) => (
  <ShoppingCartContext.Provider value={useState([])}>
    {children}
  </ShoppingCartContext.Provider>
)

const App = () => {
  return (
    <CartContextProvider>
      <Routes>
        <Route path="/food" element={<FoodPage/>}/>
        <Route path="/drink" element={<DrinksPage/>}/>
        <Route path="/cart" element={<ShoppingCart />}/>
        <Route path="/payment" element={<PaymentForm />}/>
      </Routes>
    </CartContextProvider>
  );
};

export default App;
