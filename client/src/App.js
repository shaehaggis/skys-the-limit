import "./styles.css";
import React, { useState, useEffect } from "react";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import FoodPage from "./components/MenuPages/FoodPage";
import DrinksPage from "./components/MenuPages/DrinksPage";
import PaymentForm from "./components/PaymentForm";
import { ShoppingCartContext } from "./Context/ShoppingCartContext";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";

const CartContextProvider = ({ children }) => (
  <ShoppingCartContext.Provider value={useState([])}>
    {children}
  </ShoppingCartContext.Provider>
)

const App = () => {

  const items = axios.get('/items')
                     .then((response) => console.log(response))
                     .catch((err) => console.log(err));

  return (
    <CartContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/food" />}/>
        <Route path="/food" element={<FoodPage/>}/>
        <Route path="/drink" element={<DrinksPage/>}/>
        <Route path="/cart" element={<ShoppingCart />}/>
        <Route path="/payment" element={<PaymentForm />}/>
      </Routes>
    </CartContextProvider>
  );
};

export default App;
